"use client";

import { useId } from "react";
import { useLocale } from "@/context/LocaleContext";

function DanishFlag() {
  return (
    <svg viewBox="0 0 37 28" className="h-4 w-[21px] rounded-[2px]" aria-hidden="true">
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="10" width="5" height="28" fill="#fff" />
      <rect y="11.5" width="37" height="5" fill="#fff" />
    </svg>
  );
}

function BritishFlag({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 60 30" className="h-4 w-[21px] rounded-[2px]" aria-hidden="true">
      <clipPath id={clipId}>
        <rect width="60" height="30" rx="1" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="10" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="6" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const clipId = `gb-${useId().replace(/:/g, "")}`;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLocale("da")}
        aria-label={t.lang.switchToDanish}
        title={t.lang.da}
        aria-pressed={locale === "da"}
        className={`grid h-8 w-9 place-items-center rounded-md border transition ${
          locale === "da" ? "border-accent bg-accent-soft" : "border-transparent hover:bg-paper"
        }`}
      >
        <DanishFlag />
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label={t.lang.switchToEnglish}
        title={t.lang.en}
        aria-pressed={locale === "en"}
        className={`grid h-8 w-9 place-items-center rounded-md border transition ${
          locale === "en" ? "border-accent bg-accent-soft" : "border-transparent hover:bg-paper"
        }`}
      >
        <BritishFlag clipId={clipId} />
      </button>
    </div>
  );
}
