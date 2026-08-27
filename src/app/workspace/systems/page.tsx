"use client";

import Link from "next/link";
import { regionLabel, transferLabel } from "@/lib/catalog";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button } from "@/components/ui";

export default function SystemsPage() {
  const { workspace, ready } = useWorkspace();
  if (!ready) return <p className="text-muted">Loading…</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
            Data flows
          </p>
          <h1 className="mt-2 font-serif text-[32px] tracking-tight">Systems</h1>
          <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
            Every tool that holds personal data in the day-to-day running of the business.
          </p>
        </div>
        <Link href="/setup">
          <Button variant="secondary">Edit in interview</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-ink/20 text-[12px] uppercase tracking-wide text-muted">
              {["System", "Purpose", "Hosting", "Data", "Processor", "Transfers"].map((h) => (
                <th key={h} className="py-2 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workspace.systems.map((system) => (
              <tr key={system.id} className="border-b border-line align-top">
                <td className="py-3 pr-4">
                  <div className="font-medium">{system.name}</div>
                  <div className="text-[12.5px] text-muted">{system.vendor}</div>
                </td>
                <td className="py-3 pr-4 text-ink-soft">{system.purpose}</td>
                <td className="py-3 pr-4">{regionLabel(system.hostingRegion)}</td>
                <td className="py-3 pr-4 text-ink-soft">{system.dataTypes.join(", ") || "—"}</td>
                <td className="py-3 pr-4">
                  {system.isProcessor ? "Yes" : "Independent"}
                  {system.isProcessor ? ` · DPA ${system.dpaInPlace ? "yes" : "no"}` : ""}
                </td>
                <td className="py-3 pr-4">
                  {system.transfersOutsideEea
                    ? transferLabel(system.transferMechanism)
                    : "EEA only"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
