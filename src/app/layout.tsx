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
  title: "TrustLog — GDPR made easy",
  description:
    "A guided interview that produces an Article 30 Record of Processing Activities your organisation can download as PDF and keep in its own archive.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
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
