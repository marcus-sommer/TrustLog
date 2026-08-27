import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustLog — GDPR-fortegnelse til SMV’er",
  description:
    "Et enkelt interview, der skaber en fortegnelse over behandlingsaktiviteter efter GDPR artikel 30, som I kan downloade som PDF og gemme i jeres eget arkiv.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <LocaleProvider>
          <WorkspaceProvider>
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </WorkspaceProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
