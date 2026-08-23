"use server";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { after } from "next/server";
import { Resend } from "resend";
import { labBetaJoinEmail, LOGO_CONTENT_ID } from "@/lib/email/lab-beta-join";
import { captureServerEvent } from "@/lib/posthog/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  isPlanIntent,
  isRole,
  normalizeOperatingSystem,
  parseEmail,
  shouldSendAccessConfirmation,
  type PlanIntent,
  type WaitlistInput,
} from "@/lib/waitlist";

export type JoinWaitlistResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; error: "invalid" | "invalid_os" | "not_configured" | "failed" };

export async function joinWaitlist(input: WaitlistInput): Promise<JoinWaitlistResult> {
  try {
    if (input.honeypot) {
      return { ok: true, duplicate: false };
    }

    const email = parseEmail(input.email);
    if (!email) return { ok: false, error: "invalid" };

    const role = isRole(input.role) ? input.role : null;
    const planIntent = isPlanIntent(input.planIntent) ? input.planIntent : null;
    const os = normalizeOperatingSystem(input.os);
    if (!os) return { ok: false, error: "invalid_os" };
    const utmSource = input.utmSource?.slice(0, 200) || null;
    const utmMedium = input.utmMedium?.slice(0, 200) || null;
    const utmCampaign = input.utmCampaign?.slice(0, 200) || null;
    const referrer = input.referrer?.slice(0, 500) || null;

    const supabase = createAdminClient();
    if (!supabase) return { ok: false, error: "not_configured" };

    const { error } = await supabase.from("waitlist").insert({
      email,
      role,
      plan_intent: planIntent,
      os,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer,
    });

    const duplicate = Boolean(
      error?.message?.toLowerCase().includes("duplicate") || error?.code === "23505",
    );
    if (error && !duplicate) {
      console.error("waitlist insert failed", error.message);
      return { ok: false, error: "failed" };
    }

    if (duplicate) {
      const updates: Record<string, string> = {};
      if (role) updates.role = role;
      if (planIntent) updates.plan_intent = planIntent;
      if (os) updates.os = os;
      if (utmSource) updates.utm_source = utmSource;
      if (utmMedium) updates.utm_medium = utmMedium;
      if (utmCampaign) updates.utm_campaign = utmCampaign;
      if (referrer) updates.referrer = referrer;

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from("waitlist")
          .update(updates)
          .eq("email", email);
        if (updateError) {
          console.error("waitlist update failed", updateError.message);
          return { ok: false, error: "failed" };
        }
      }
    }

    try {
      captureServerEvent(
        duplicate ? "early_access_duplicate" : "early_access_submit",
        { role, plan_intent: planIntent, os },
        email,
      );
    } catch {
      /* analytics must not block join */
    }

    if (shouldSendAccessConfirmation(duplicate)) {
      after(() => sendJoinEmail(email, planIntent));
    }

    return { ok: true, duplicate };
  } catch (err) {
    console.error("waitlist join failed", err);
    return { ok: false, error: "failed" };
  }
}

async function sendJoinEmail(email: string, planIntent: PlanIntent | null) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !from) return;

  try {
    const resend = new Resend(apiKey);
    const letter = labBetaJoinEmail(planIntent);
    const logo = await readLogoPng();
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: letter.subject,
      text: letter.text,
      html: letter.html,
      attachments: logo
        ? [
            {
              filename: "logo-mindvault-email.png",
              content: logo,
              contentType: "image/png",
              contentId: LOGO_CONTENT_ID,
            },
          ]
        : undefined,
    });
    if (error) console.error("waitlist email failed", error.message);
  } catch (err) {
    console.error("waitlist email failed", err);
  }
}

async function readLogoPng(): Promise<Buffer | null> {
  try {
    return await readFile(join(process.cwd(), "public/images/logo-mindvault-email.png"));
  } catch {
    return null;
  }
}
