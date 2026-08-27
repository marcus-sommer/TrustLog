import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatlivspolitik — TrustLog",
  description:
    "Sådan behandler TrustLog personoplysninger, når du besøger siden, bruger interviewet eller deler et arbejdsområde.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
