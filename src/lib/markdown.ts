import {
  legalBasisLabel,
  regionLabel,
  sensitivityLabel,
  transferLabel,
} from "./catalog";
import { formatDate } from "./ids";
import type { Workspace } from "./types";

function join(values: string[]): string {
  return values.filter(Boolean).join(", ") || "—";
}

export function workspaceToMarkdown(workspace: Workspace): string {
  const org = workspace.organization;
  const address = [org.address, org.postalCode, org.city, org.country]
    .filter(Boolean)
    .join(", ");

  const systemRows = workspace.systems
    .map(
      (system) =>
        `| ${system.name} | ${system.vendor || "—"} | ${regionLabel(system.hostingRegion)} | ${join(system.dataTypes)} | ${join(system.dataSubjects)} | ${system.isProcessor ? "Processor" : "Independent"} | ${system.dpaInPlace ? "Yes" : "No"} | ${system.transfersOutsideEea ? transferLabel(system.transferMechanism) : "EEA only"} |`,
    )
    .join("\n");

  const activityBlocks = workspace.activities
    .map((activity, index) => {
      const systems = workspace.systems
        .filter((system) => activity.systemIds.includes(system.id))
        .map((system) => system.name);
      return [
        `### ${index + 1}. ${activity.name || "Untitled activity"}`,
        "",
        `| Field | Record |`,
        `| --- | --- |`,
        `| Department | ${activity.department || "—"} |`,
        `| Purpose | ${activity.purpose || "—"} |`,
        `| Data subjects | ${join(activity.dataSubjects)} |`,
        `| Personal data | ${join(activity.personalData)} |`,
        `| Data categories | ${activity.sensitivity.map((item) => sensitivityLabel(item)).join("; ") || "—"} |`,
        `| Legal basis | ${activity.legalBases.map((basis) => legalBasisLabel(basis)).join("; ") || "—"} |`,
        `| Notes | ${activity.legalBasisNotes || "—"} |`,
        `| Systems | ${join(systems)} |`,
        `| Recipients | ${join(activity.recipients)} |`,
        `| Transfers | ${activity.transfersOutsideEea ? `${activity.transferCountries || "Outside EEA"} — ${transferLabel(activity.transferMechanism)}` : "No intended transfers outside the EU/EEA"} |`,
        `| Retention | ${activity.retention || "—"} |`,
        "",
      ].join("\n");
    })
    .join("\n");

  const tomRows = workspace.toms
    .map((tom) => `| ${tom.label} | ${tom.enabled ? "Yes" : "Not yet"} | ${tom.description} |`)
    .join("\n");

  const reminderRows = workspace.reminders
    .map(
      (reminder) =>
        `| ${reminder.title} | ${formatDate(reminder.dueDate)} | ${reminder.completedAt ? `Done ${formatDate(reminder.completedAt)}` : "Open"} | ${reminder.notes || "—"} |`,
    )
    .join("\n");

  return `# Record of Processing Activities

**GDPR Article 30 · Controller record**

Generated with TrustLog on ${formatDate(new Date().toISOString())}. Last edited by ${workspace.updatedBy}.

> Store this file in your own archive. It is a working compliance record, not legal advice.

## 1. Controller details

| Field | Value |
| --- | --- |
| Controller | ${org.name || "—"} |
| CVR / registration number | ${org.registrationNumber || "—"} |
| Address | ${address || "—"} |
| Contact email | ${org.contactEmail || "—"} |
| Phone | ${org.contactPhone || "—"} |
| Website | ${org.website || "—"} |
| Employees | ${org.employeeBand || "—"} |
| Industry | ${org.industry || "—"} |
| Data Protection Officer | ${org.hasDpo ? `${org.dpoName || "Named"} (${org.dpoEmail || "—"})` : "Not designated"} |
| EU representative | ${org.hasEuRepresentative ? `${org.representativeName || "Named"} (${org.representativeEmail || "—"})` : "Not applicable"} |

## 2. Systems and data flows

| System | Vendor | Hosting | Data | People | Role | DPA | Transfers |
| --- | --- | --- | --- | --- | --- | --- | --- |
${systemRows || "| — | — | — | — | — | — | — | — |"}

## 3. Processing activities

${activityBlocks || "_No activities recorded yet._"}

## 4. Technical and organisational measures (Art. 32)

| Measure | In place | Description |
| --- | --- | --- |
${tomRows}

## 5. Review schedule

| Reminder | Due | Status | Notes |
| --- | --- | --- | --- |
${reminderRows}
`;
}

export function downloadMarkdown(workspace: Workspace): void {
  const blob = new Blob([workspaceToMarkdown(workspace)], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = (workspace.organization.name || "organisation")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);
  link.href = url;
  link.download = `ropa-${slug}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
