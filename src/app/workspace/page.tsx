"use client";

import Link from "next/link";
import { legalBasisLabel } from "@/lib/catalog";
import { completeness } from "@/lib/completeness";
import { dueLabel, dueState } from "@/lib/ics";
import { downloadPdf } from "@/lib/pdf";
import { downloadMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/ids";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button } from "@/components/ui";

export default function WorkspaceHomePage() {
  const { workspace, ready } = useWorkspace();
  if (!ready) return <p className="text-muted">Loading workspace…</p>;

  const { score, items } = completeness(workspace);
  const missing = items.filter((item) => !item.done);
  const openReminders = workspace.reminders
    .filter((r) => !r.completedAt)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
            Workspace
          </p>
          <h1 className="mt-2 font-serif text-[34px] tracking-tight">
            {workspace.organization.name || "Untitled organisation"}
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Last edited by {workspace.updatedBy} on {formatDate(workspace.updatedAt)}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/setup">
            <Button variant="secondary">Continue interview</Button>
          </Link>
          <Button onClick={() => downloadPdf(workspace, undefined, score)}>Download PDF</Button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Completeness" value={`${score}%`} hint="Article 30 building blocks" />
        <Stat
          label="Activities"
          value={String(workspace.activities.length)}
          hint="Purposes in the record"
        />
        <Stat
          label="Systems"
          value={String(workspace.systems.length)}
          hint="Tools with personal data"
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <h2 className="font-serif text-[22px]">Still useful to complete</h2>
          {missing.length === 0 ? (
            <p className="mt-3 text-[15px] text-ink-soft">
              The record has the core Article 30 fields. Download the PDF and put a copy with your
              contracts.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {missing.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-line bg-raised px-4 py-3 text-[14px]"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="mt-0.5 block text-[12.5px] text-muted">{item.hint}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => downloadPdf(workspace, undefined, score)}>Download PDF</Button>
            <Button variant="secondary" onClick={() => downloadMarkdown(workspace)}>
              Download Markdown
            </Button>
            <Link href="/workspace/ropa">
              <Button variant="ghost">View full record</Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-[22px]">Upcoming reviews</h2>
          <ul className="mt-4 space-y-2">
            {openReminders.length === 0 ? (
              <li className="text-[14px] text-muted">No open reminders.</li>
            ) : (
              openReminders.map((reminder) => {
                const state = dueState(reminder.dueDate, reminder.completedAt);
                return (
                  <li
                    key={reminder.id}
                    className="rounded-xl border border-line bg-raised px-4 py-3"
                  >
                    <div className="text-[14px] font-medium">{reminder.title}</div>
                    <div
                      className={`mt-1 text-[12.5px] ${
                        state === "overdue"
                          ? "text-danger"
                          : state === "soon"
                            ? "text-warn"
                            : "text-muted"
                      }`}
                    >
                      {dueLabel(reminder.dueDate, reminder.completedAt)}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          <Link href="/workspace/reminders" className="mt-3 inline-block text-[13px] text-accent">
            Manage reminders
          </Link>
        </section>
      </div>

      <section>
        <h2 className="font-serif text-[22px]">Processing activities</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-ink/20 text-[12px] uppercase tracking-wide text-muted">
                <th className="py-2 pr-4 font-medium">Activity</th>
                <th className="py-2 pr-4 font-medium">People</th>
                <th className="py-2 pr-4 font-medium">Legal basis</th>
                <th className="py-2 pr-4 font-medium">Retention</th>
              </tr>
            </thead>
            <tbody>
              {workspace.activities.map((activity) => (
                <tr key={activity.id} className="border-b border-line align-top">
                  <td className="py-2.5 pr-4 font-medium">{activity.name}</td>
                  <td className="py-2.5 pr-4 text-ink-soft">
                    {activity.dataSubjects.join(", ") || "—"}
                  </td>
                  <td className="py-2.5 pr-4 text-ink-soft">
                    {activity.legalBases.map((basis) => legalBasisLabel(basis)).join(", ") || "—"}
                  </td>
                  <td className="py-2.5 pr-4 text-ink-soft">{activity.retention || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-line bg-raised px-5 py-4">
      <div className="text-[12px] uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 font-serif text-[32px] leading-none">{value}</div>
      <div className="mt-2 text-[12.5px] text-muted">{hint}</div>
    </div>
  );
}
