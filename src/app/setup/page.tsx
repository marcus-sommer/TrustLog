"use client";

import Link from "next/link";
import { InterviewWizard } from "@/components/InterviewWizard";
import { MarketingHeader } from "@/components/MarketingHeader";
import { useLocale } from "@/context/LocaleContext";

export default function SetupPage() {
  const { t } = useLocale();
  return (
    <div className="bg-paper">
      <MarketingHeader compact>
        <Link href="/workspace" className="text-[13px] text-muted hover:text-ink">
          {t.setup.skip}
        </Link>
      </MarketingHeader>
      <InterviewWizard />
    </div>
  );
}
