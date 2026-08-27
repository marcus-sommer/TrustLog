import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bag TrustLog — TrustLog",
  description:
    "Marcus Sommer, stifteren bag TrustLog — GDPR-praktiker og webdesigner, der gør artikel 30-fortegnelsen brugbar for SMV’er.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
