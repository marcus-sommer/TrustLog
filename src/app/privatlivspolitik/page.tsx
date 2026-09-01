"use client";

import { useLocale } from "@/context/LocaleContext";
import { MarketingHeader } from "@/components/MarketingHeader";
import { privacy } from "@/lib/privacy";

export default function PrivacyPage() {
  const { locale, t } = useLocale();
  const doc = privacy[locale];

  return (
    <div className="bg-paper">
      <MarketingHeader />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-12 lg:px-8 lg:pt-16">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          {t.footer.privacy}
        </p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.12] tracking-tight text-ink">
          {doc.title}
        </h1>
        <p className="mt-3 text-[14px] text-muted">{doc.updated}</p>
        <p className="mt-8 text-[16.5px] leading-8 text-ink-soft">{doc.intro}</p>

        <div className="mt-12 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[24px] tracking-tight text-ink">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[16px] leading-8 text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-8 text-ink-soft">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mt-8">
                  <h3 className="text-[16px] font-medium text-ink">{sub.heading}</h3>
                  {sub.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-[16px] leading-8 text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                  {sub.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[16px] leading-8 text-ink-soft">
                      {sub.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
