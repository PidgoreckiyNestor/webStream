import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function LoginPage() {
  return <StubPage title="Sign in" />;
}
