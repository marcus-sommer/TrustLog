"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { MarketingHeader } from "@/components/MarketingHeader";
import { Button } from "@/components/ui";
import { SITE } from "@/lib/site";

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-8 10.5C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6-2.5C12.5 3.8 15 5 17 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

const CARD_ICONS = [ShieldIcon, PenIcon, BookIcon];

export default function AboutPage() {
  const router = useRouter();
  const { t } = useLocale();
  const { reset } = useWorkspace();
  const copy = t.about;

  return (
    <div className="bg-paper">
      <MarketingHeader>
        <Link href="/setup">
          <Button>{t.home.startInterview}</Button>
        </Link>
      </MarketingHeader>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-12 lg:px-8 lg:pt-16">
        <section className="grid items-start gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
          <div
            className="grid h-36 w-36 shrink-0 place-items-center rounded-full bg-accent font-serif text-[36px] tracking-tight text-white ring-8 ring-accent-soft sm:h-40 sm:w-40"
            aria-hidden="true"
          >
            MS
          </div>
          <div className="max-w-2xl">
            <h1 className="font-serif text-[36px] leading-tight tracking-tight text-ink sm:text-[40px]">
              {SITE.controller}
            </h1>
            <p className="mt-2 text-[14px] text-muted">{copy.role}</p>
            <p className="mt-6 font-serif text-[26px] leading-8 tracking-tight text-ink sm:text-[28px]">
              {copy.missionTitle}
            </p>
            <p className="mt-5 text-[17px] leading-8 text-ink-soft">{copy.lead}</p>
            <div className="mt-5 space-y-5 text-[16.5px] leading-8 text-ink-soft">
              {copy.mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {copy.cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            return (
              <article key={card.title} className="rounded-2xl border border-line bg-raised p-7">
                <span className="text-accent">{Icon ? <Icon /> : null}</span>
                <h2 className="mt-5 font-serif text-[22px] leading-7 text-ink">{card.title}</h2>
                <p className="mt-3 text-[14.5px] leading-7 text-ink-soft">{card.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-16 rounded-2xl border border-line bg-accent px-6 py-10 text-white md:px-10">
          <h2 className="font-serif text-[28px]">{copy.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/85">{copy.ctaBody}</p>
          <div className="mt-7">
            <Button
              className="bg-white text-accent hover:bg-accent-soft"
              onClick={() => {
                reset();
                router.push("/setup");
              }}
            >
              {copy.cta}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
