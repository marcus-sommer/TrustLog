"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sampleWorkspace } from "@/lib/workspace";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui";
import { MarketingHeader } from "@/components/MarketingHeader";

function FileTextIcon() {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function LayoutIcon() {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function ShieldCheckIcon() {
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
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const BENEFIT_ICONS = [LayoutIcon, FileTextIcon, ShieldCheckIcon];

function HomeBridge({ active }: { active: boolean }) {
  return (
    <div className={active ? "home-field home-field-on" : "home-field"} aria-hidden="true">
      <span className="home-field-shift" />
      <svg className="home-field-svg" viewBox="0 0 1440 240" preserveAspectRatio="none">
        <path className="home-field-wave home-field-wave-a" d="M0 150 C180 90 360 210 540 140 C720 70 900 200 1080 130 C1260 60 1350 170 1440 120 L1440 240 L0 240 Z">
          {active ? (
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="M0 150 C180 90 360 210 540 140 C720 70 900 200 1080 130 C1260 60 1350 170 1440 120 L1440 240 L0 240 Z;M0 130 C200 200 380 70 560 160 C740 230 920 80 1100 150 C1280 210 1360 90 1440 140 L1440 240 L0 240 Z;M0 150 C180 90 360 210 540 140 C720 70 900 200 1080 130 C1260 60 1350 170 1440 120 L1440 240 L0 240 Z"
            />
          ) : null}
        </path>
        <path className="home-field-wave home-field-wave-b" d="M0 180 C240 120 480 220 720 160 C960 100 1200 200 1440 150 L1440 240 L0 240 Z">
          {active ? (
            <animate
              attributeName="d"
              dur="11s"
              repeatCount="indefinite"
              values="M0 180 C240 120 480 220 720 160 C960 100 1200 200 1440 150 L1440 240 L0 240 Z;M0 165 C240 220 480 110 720 185 C960 240 1200 90 1440 170 L1440 240 L0 240 Z;M0 180 C240 120 480 220 720 160 C960 100 1200 200 1440 150 L1440 240 L0 240 Z"
            />
          ) : null}
        </path>
      </svg>
      <span className="home-field-orb home-field-orb-a" />
      <span className="home-field-orb home-field-orb-b" />
      <span className="home-field-orb home-field-orb-c" />
      <span className="home-field-sweep" />
    </div>
  );
}

function useOnceInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function HomePage() {
  const router = useRouter();
  const { replace, reset } = useWorkspace();
  const { t } = useLocale();
  const story = useOnceInView<HTMLDivElement>();

  return (
    <div className="bg-paper">
      <MarketingHeader />

      <main className="mx-auto max-w-6xl px-5 pt-12 lg:px-8 lg:pt-16">
        <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h1 className="max-w-xl font-serif text-[48px] leading-[1.12] tracking-tight text-ink">
              {t.home.title}
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-8 text-ink-soft">{t.home.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Button
                variant="blue"
                onClick={() => {
                  reset();
                  router.push("/setup");
                }}
              >
                {t.home.startScratch}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  replace(sampleWorkspace());
                  router.push("/workspace");
                }}
              >
                {t.home.previewSample}
              </Button>
            </div>
            <p className="mt-4 text-[13px] text-muted">{t.home.noAccount}</p>
          </div>
          <aside className="rounded-2xl border border-line bg-raised px-8 py-9">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
              {t.home.whatYouGet}
            </p>
            <ul className="mt-8 space-y-7">
              {t.home.get.map((item, index) => {
                const Icon = BENEFIT_ICONS[index];
                return (
                  <li key={item} className="flex items-start gap-4 text-[15.5px] leading-6 text-ink">
                    <span className="mt-0.5 text-accent">{Icon ? <Icon /> : null}</span>
                    {item}
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      </main>

      <div
        ref={story.ref}
        className={story.visible ? "home-story home-story-on" : "home-story"}
      >
        <HomeBridge active={story.visible} />
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-12 lg:px-8">
          <h2 className="mb-8 font-serif text-[28px] tracking-tight text-ink">
            {t.home.processTitle}
          </h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {t.home.cards.map((card) => (
              <article
                key={card.step}
                className="home-card rounded-2xl border border-line bg-raised p-8"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
                  {card.step}
                </p>
                <h3 className="mt-3 font-serif text-[22px] leading-7">{card.title}</h3>
                <p className="mt-4 text-[14.5px] leading-7 text-ink-soft">{card.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-28 lg:px-8">
        <section className="rounded-2xl border border-line bg-accent px-6 py-10 text-white md:px-10">
          <h2 className="font-serif text-[28px]">{t.home.whyTitle}</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/85">{t.home.whyBody}</p>
        </section>
      </section>
    </div>
  );
}
