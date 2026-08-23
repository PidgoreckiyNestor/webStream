import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

const titles: Record<string, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  refunds: "Refund Policy",
};

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <StubPage title={titles[slug] ?? "Legal"} />;
}
