import { PostHog } from "posthog-node";

export function captureServerEvent(
  event: string,
  properties: Record<string, string | number | boolean | null | undefined>,
  distinctId: string,
) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  const client = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://t.usemindvault.com",
  });
  client.capture({ distinctId, event, properties });
  void client.shutdown().catch(() => undefined);
}
