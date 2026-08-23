import { redirectToPricing } from "@/lib/redirect-to-pricing";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  redirectToPricing(await searchParams);
}
