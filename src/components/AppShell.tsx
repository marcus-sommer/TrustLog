"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { completeness } from "@/lib/completeness";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useLocale } from "@/context/LocaleContext";
import { LanguageToggle } from "@/components/LanguageToggle";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { workspace, ready } = useWorkspace();
  const { t } = useLocale();
  const score = ready ? completeness(workspace).score : 0;
  const name = workspace.organization.name || t.yourOrganisation;
  const nav = [
    { href: "/workspace", label: t.nav.overview },
    { href: "/workspace/ropa", label: t.nav.ropa },
    { href: "/workspace/systems", label: t.nav.systems },
    { href: "/workspace/reminders", label: t.nav.reminders },
    { href: "/workspace/team", label: t.nav.team },
  ];

  return (
    <div className="bg-paper text-ink">
      <header className="border-b border-line bg-raised">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <Link href="/" className="font-serif text-[18px] tracking-tight">
            {t.brand}
          </Link>
          <div className="hidden items-center gap-6 text-[13px] sm:flex">
            {nav.map((item) => {
              const active =
                item.href === "/workspace"
                  ? pathname === "/workspace"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "font-medium text-ink" : "text-muted hover:text-ink"}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/om"
              className="hidden text-[13px] text-muted hover:text-ink sm:inline"
            >
              {t.nav.about}
            </Link>
            <LanguageToggle />
            <div className="text-right">
              <div className="text-[13px] font-medium text-ink">{name}</div>
              <div className="text-[12px] text-muted">
                {score}
                {t.completePct}
              </div>
            </div>
          </div>
        </div>
        <nav className="flex gap-4 overflow-x-auto border-t border-line px-5 py-2.5 text-[13px] sm:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-muted">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">{children}</main>
    </div>
  );
}
