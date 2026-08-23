"use server";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { captureServerEvent } from "@/lib/posthog/server";
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
    await resend.emails.send({
      from,
      to: email,
      subject: "You're on the MindVault Lab beta list",
      text: [
        "You're on the list for the Lab beta — LSL, OSC, API, and markers on the desk.",
        "",
        "We'll write when it opens.",
        "",
        "— MindVault",
      ].join("\n"),
    });
  } catch (err) {
    console.error("waitlist email failed", err);
  }
}
