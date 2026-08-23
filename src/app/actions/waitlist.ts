"use server";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resend } from "resend";
import { labBetaJoinEmail, LOGO_CONTENT_ID } from "@/lib/email/lab-beta-join";
import { captureServerEvent } from "@/lib/posthog/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPlanIntent, isRole, parseEmail, type WaitlistInput } from "@/lib/waitlist";

export type JoinWaitlistResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; error: "invalid" | "not_configured" | "failed" };

export async function joinWaitlist(input: WaitlistInput): Promise<JoinWaitlistResult> {
  if (input.honeypot) {
    return { ok: true, duplicate: false };
  }

  const email = parseEmail(input.email);
  if (!email) return { ok: false, error: "invalid" };

  const role = isRole(input.role) ? input.role : null;
  const planIntent = isPlanIntent(input.planIntent) ? input.planIntent : null;
  const os = input.os?.trim().slice(0, 32) || null;

  const supabase = createAdminClient();
  if (!supabase) return { ok: false, error: "not_configured" };

  const { error } = await supabase.from("waitlist").insert({
    email,
    role,
    plan_intent: planIntent,
    os,
    utm_source: input.utmSource?.slice(0, 200) || null,
    utm_medium: input.utmMedium?.slice(0, 200) || null,
    utm_campaign: input.utmCampaign?.slice(0, 200) || null,
    referrer: input.referrer?.slice(0, 500) || null,
  });

  const duplicate = Boolean(error?.message?.toLowerCase().includes("duplicate") || error?.code === "23505");
  if (error && !duplicate) {
    console.error("waitlist insert failed", error.message);
    return { ok: false, error: "failed" };
  }

  captureServerEvent(
    duplicate ? "lab_beta_duplicate" : "lab_beta_submit",
    { role, plan_intent: planIntent, os },
    email,
  );

  if (!duplicate) {
    await sendJoinEmail(email);
  }

  return { ok: true, duplicate };
}

async function sendJoinEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !from) return;

  try {
    const resend = new Resend(apiKey);
    const letter = labBetaJoinEmail();
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
