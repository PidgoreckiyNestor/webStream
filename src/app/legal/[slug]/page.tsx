import { StubPage } from "@/components/StubPage";

const titles: Record<string, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  refunds: "Refund Policy",
};

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <StubPage title={titles[slug] ?? "Legal"} />;
}
