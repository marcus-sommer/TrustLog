"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-raised">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-serif text-[16px] tracking-tight text-ink">{t.brand}</p>
          <p className="mt-1 text-[13px] text-muted">{t.footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          <Link href="/om" className="text-ink-soft hover:text-ink">
            {t.footer.about}
          </Link>
          <Link href="/privatlivspolitik" className="text-ink-soft hover:text-ink">
            {t.footer.privacy}
          </Link>
          <span className="text-muted">
            © {year} {t.brand}
          </span>
        </nav>
      </div>
    </footer>
  );
}
