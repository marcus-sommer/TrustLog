import type { Workspace } from "./types";

export interface CompletenessItem {
  id: string;
  label: string;
  done: boolean;
  hint: string;
}

export function completeness(workspace: Workspace): {
  score: number;
  items: CompletenessItem[];
} {
  const org = workspace.organization;
  const items: CompletenessItem[] = [
    {
      id: "name",
      label: "Company name",
      done: Boolean(org.name.trim()),
      hint: "Shown on the cover of the PDF.",
    },
    {
      id: "cvr",
      label: "CVR / registration number",
      done: Boolean(org.registrationNumber.trim()),
      hint: "Helps identify the controller.",
    },
    {
      id: "address",
      label: "Address",
      done: Boolean(org.address.trim() && org.city.trim()),
      hint: "Required contact details for the controller.",
    },
    {
      id: "email",
      label: "Contact email",
      done: Boolean(org.contactEmail.trim()),
      hint: "Where people (and the DPA) can reach you.",
    },
    {
      id: "employees",
      label: "Number of employees",
      done: Boolean(org.employeeBand),
      hint: "Small companies still usually need a RoPA if they process data regularly.",
    },
    {
      id: "systems",
      label: "At least one system",
      done: workspace.systems.length > 0,
      hint: "List the tools that actually hold personal data.",
    },
    {
      id: "dpa",
      label: "DPA noted for processors",
      done: (() => {
        const processors = workspace.systems.filter((s) => s.isProcessor);
        return processors.length === 0 || processors.every((s) => s.dpaInPlace);
      })(),
      hint: "Tick DPA for each vendor that processes data for you.",
    },
    {
      id: "activities",
      label: "At least one processing activity",
      done: workspace.activities.length > 0,
      hint: "HR, accounting, and sales are typical starting points.",
    },
    {
      id: "purpose",
      label: "Each activity has a purpose",
      done:
        workspace.activities.length > 0 &&
        workspace.activities.every((a) => a.purpose.trim().length > 8),
      hint: "Say in one sentence why you process the data.",
    },
    {
      id: "subjects",
      label: "People and data types listed",
      done:
        workspace.activities.length > 0 &&
        workspace.activities.every(
          (a) => a.dataSubjects.length > 0 && a.personalData.length > 0,
        ),
      hint: "Who the data is about, and what kind of data.",
    },
    {
      id: "basis",
      label: "Legal basis on each activity",
      done:
        workspace.activities.length > 0 &&
        workspace.activities.every((a) => a.legalBases.length > 0),
      hint: "Contract, legal duty, legitimate interest, or consent.",
    },
    {
      id: "retention",
      label: "Retention period on each activity",
      done:
        workspace.activities.length > 0 &&
        workspace.activities.every((a) => a.retention.trim().length > 4),
      hint: "How long you keep it, then delete or archive.",
    },
    {
      id: "transfers",
      label: "Transfers explained",
      done: workspace.activities.every(
        (a) => !a.transfersOutsideEea || a.transferMechanism !== "none",
      ),
      hint: "If data goes outside the EU/EEA, name the safeguard (DPF or SCCs).",
    },
    {
      id: "toms",
      label: "Security measures selected",
      done: workspace.toms.filter((t) => t.enabled).length >= 4,
      hint: "MFA, access control, backups, and DPAs are a solid SME baseline.",
    },
  ];

  const score = Math.round(
    (items.filter((item) => item.done).length / items.length) * 100,
  );
  return { score, items };
}

export function missingSummary(workspace: Workspace): string[] {
  return completeness(workspace)
    .items.filter((item) => !item.done)
    .map((item) => item.label);
}
