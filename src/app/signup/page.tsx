import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function SignupPage() {
  return <StubPage title="Get Started" />;
}
