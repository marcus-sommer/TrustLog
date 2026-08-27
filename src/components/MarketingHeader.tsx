"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useLocale } from "@/context/LocaleContext";
import { LanguageToggle } from "@/components/LanguageToggle";

export function MarketingHeader({
  compact = false,
  children,
}: {
  compact?: boolean;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLocale();
  const aboutActive = pathname === "/om";

  return (
    <header className={compact ? "border-b border-line bg-raised" : undefined}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 lg:px-8 ${
          compact ? "py-3.5" : "py-5"
        }`}
      >
        <Link
          href="/"
          className={`font-serif tracking-tight ${compact ? "text-[18px]" : "text-[20px]"}`}
        >
          {t.brand}
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/om"
            className={`text-[14px] ${
              aboutActive ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.nav.about}
          </Link>
          <LanguageToggle />
          {children}
        </div>
      </div>
    </header>
  );
}
