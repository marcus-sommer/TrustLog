"use client";

import { RopaView } from "@/components/RopaView";
import { Button } from "@/components/ui";
import { completeness } from "@/lib/completeness";
import { downloadMarkdown } from "@/lib/markdown";
import { downloadPdf } from "@/lib/pdf";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function RopaPage() {
  const { workspace, ready } = useWorkspace();
  if (!ready) return <p className="text-muted">Loading…</p>;
  const score = completeness(workspace).score;

  return (
    <div className="space-y-8">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
            Export-ready
          </p>
          <h1 className="mt-2 font-serif text-[32px] tracking-tight">Article 30 record</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => downloadPdf(workspace, undefined, score)}>Download PDF</Button>
          <Button variant="secondary" onClick={() => downloadMarkdown(workspace)}>
            Download Markdown
          </Button>
          <Button variant="ghost" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>
      <RopaView workspace={workspace} />
    </div>
  );
}
