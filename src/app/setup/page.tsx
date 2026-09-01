"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { InterviewWizard } from "@/components/InterviewWizard";
import { MarketingHeader } from "@/components/MarketingHeader";
import { useLocale } from "@/context/LocaleContext";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function SetupPage() {
  const { t } = useLocale();
  const { reset } = useWorkspace();
  const router = useRouter();

  function closeInterview() {
    if (!window.confirm(t.setup.closeInterviewConfirm)) return;
    reset();
    router.push("/");
  }

  return (
    <div className="bg-paper">
      <MarketingHeader compact>
        <button
          type="button"
          onClick={closeInterview}
          className="text-[13px] text-muted hover:text-danger"
        >
          {t.setup.closeInterview}
        </button>
        <Link href="/workspace" className="text-[13px] text-muted hover:text-ink">
          {t.setup.skip}
        </Link>
      </MarketingHeader>
      <InterviewWizard />
    </div>
  );
}
