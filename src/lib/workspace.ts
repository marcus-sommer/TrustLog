import {
  ACTIVITY_TEMPLATES,
  DEFAULT_TOMS,
  SYSTEM_CATEGORY_DEFAULTS,
  SYSTEM_TEMPLATES,
} from "./catalog";
import { addMonths, createId, todayIso } from "./ids";
import type {
  Organization,
  ProcessingActivity,
  SystemRecord,
  Workspace,
} from "./types";

export const INTERVIEW_STEPS = [
  { id: "company", title: "Your company", blurb: "The basics that go on the cover of the record." },
  { id: "people", title: "Who is responsible", blurb: "Contact person, DPO, and EU representative." },
  { id: "tools", title: "Tools you use", blurb: "Tick the systems that run the business day to day." },
  { id: "flows", title: "Data in each tool", blurb: "For each system: vendor, purpose, people, data, access, and whether anything leaves the EU." },
  { id: "activities", title: "What you use data for", blurb: "How would you rather explain why you use people’s information? Pick the way that feels natural — you can change it later." },
  { id: "protection", title: "How you protect it", blurb: "A short list of security measures (GDPR Art. 32)." },
  { id: "review", title: "Review & export", blurb: "Download the PDF and set a reminder to keep it current." },
] as const;

export function emptyOrganization(): Organization {
  return {
    name: "",
    registrationNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Danmark",
    contactEmail: "",
    contactPhone: "",
    website: "",
    employeeBand: "",
    industry: "",
    hasDpo: false,
    dpoName: "",
    dpoEmail: "",
    hasEuRepresentative: false,
    representativeName: "",
    representativeEmail: "",
  };
}

export function createWorkspace(partial?: Partial<Workspace>): Workspace {
  const now = new Date().toISOString();
  return {
    id: createId("ws"),
    createdAt: now,
    updatedAt: now,
    updatedBy: "You",
    organization: emptyOrganization(),
    systems: [],
    activities: [],
    toms: DEFAULT_TOMS.map((tom) => ({
      ...tom,
      enabled: ["mfa", "encryption-transit", "encryption-rest", "access-control", "backups", "dpas"].includes(
        tom.id,
      ),
    })),
    collaborators: [
      {
        id: createId("col"),
        name: "You",
        email: "",
        role: "owner",
      },
    ],
    reminders: [
      {
        id: createId("rem"),
        title: "Annual RoPA review",
        type: "annual_review",
        dueDate: addMonths(todayIso(), 12),
        notes: "Re-read the record, add new tools, and confirm retention still matches practice.",
      },
      {
        id: createId("rem"),
        title: "Review processor list & DPAs",
        type: "processor_review",
        dueDate: addMonths(todayIso(), 6),
        notes: "Check that every vendor still has a signed data processing agreement.",
      },
    ],
    interviewStep: 0,
    interviewComplete: false,
    activityMode: "",
    catalogPrefillCleared: true,
    ...partial,
  };
}

export function hasOpenDraft(workspace: Workspace): boolean {
  return (
    Boolean(workspace.organization.name.trim()) ||
    workspace.interviewComplete ||
    workspace.interviewStep > 0 ||
    workspace.systems.length > 0 ||
    workspace.activities.length > 0
  );
}

export function systemFromCatalog(
  catalogId: string,
  options?: { prefill?: boolean },
): SystemRecord {
  const template = SYSTEM_TEMPLATES.find((item) => item.id === catalogId);
  if (!template) {
    throw new Error(`Unknown system template: ${catalogId}`);
  }
  const prefill = options?.prefill ?? false;
  return {
    id: createId("sys"),
    catalogId: template.id,
    name: template.name,
    vendor: prefill ? template.vendor : "",
    category: template.category,
    purpose: prefill ? template.purpose : "",
    dataTypes: prefill ? [...template.dataTypes] : [],
    dataSubjects: prefill ? [...template.dataSubjects] : [],
    whoHasAccess: "",
    hostingRegion: template.hostingRegion,
    hostingNotes: prefill ? template.hostingNotes : "",
    isProcessor: template.isProcessor,
    dpaInPlace: prefill,
    sharedExternally: prefill ? template.isProcessor : false,
    sharedExternallyAnswered: prefill,
    externalParties: prefill && template.isProcessor ? template.vendor : "",
    transfersOutsideEea: prefill ? template.transfersOutsideEea : false,
    thirdCountryAnswered: prefill,
    transferMechanism: prefill ? template.transferMechanism : "none",
  };
}

export function activityFromCatalog(
  catalogId: string,
  systems: SystemRecord[],
): ProcessingActivity {
  const template = ACTIVITY_TEMPLATES.find((item) => item.id === catalogId);
  if (!template) {
    throw new Error(`Unknown activity template: ${catalogId}`);
  }
  const linked = SYSTEM_TEMPLATES.filter((item) =>
    item.suggestedActivityIds.includes(catalogId),
  ).map((item) => systems.find((system) => system.catalogId === item.id)?.id)
    .filter((id): id is string => Boolean(id));

  const transfer = systems
    .filter((system) => linked.includes(system.id) && system.transfersOutsideEea)
    .map((system) => system.transferMechanism);

  const transfersOutsideEea = transfer.length > 0;
  const transferMechanism = transfersOutsideEea
    ? (transfer.includes("sccs") ? "sccs" : transfer[0])
    : template.transferMechanism;

  const extraRecipients = systems
    .filter((system) => linked.includes(system.id) && system.isProcessor)
    .map((system) => system.vendor || system.name);

  return {
    id: createId("act"),
    catalogId: template.id,
    name: template.name,
    department: template.department,
    purpose: template.purpose,
    dataSubjects: [...template.dataSubjects],
    personalData: [...template.personalData],
    sensitivity: [...template.sensitivity],
    legalBases: [...template.legalBases],
    legalBasisNotes: template.legalBasisNotes,
    systemIds: linked,
    recipients: Array.from(new Set([...template.recipients, ...extraRecipients])),
    transfersOutsideEea,
    transferCountries: transfersOutsideEea ? "United States (vendor cloud)" : template.transferCountries,
    transferMechanism,
    retention: template.retention,
  };
}

export function suggestActivitiesForSystems(systems: SystemRecord[]): string[] {
  const ids = new Set<string>();
  for (const system of systems) {
    const template = SYSTEM_TEMPLATES.find((item) => item.id === system.catalogId);
    const fromCatalog = template?.suggestedActivityIds;
    const fromCategory = SYSTEM_CATEGORY_DEFAULTS[system.category]?.suggestedActivityIds;
    (fromCatalog ?? fromCategory ?? []).forEach((id) => ids.add(id));
  }
  if (systems.length > 0 && ids.size === 0) {
    ids.add("it-admin");
  }
  return Array.from(ids);
}

export function createCustomSystem(name: string, category = "Other"): SystemRecord {
  return {
    id: createId("sys"),
    name,
    vendor: "",
    category,
    purpose: "",
    dataTypes: [],
    dataSubjects: [],
    whoHasAccess: "",
    hostingRegion: "unknown",
    hostingNotes: "",
    isProcessor: true,
    dpaInPlace: false,
    sharedExternally: false,
    sharedExternallyAnswered: false,
    externalParties: "",
    transfersOutsideEea: false,
    thirdCountryAnswered: false,
    transferMechanism: "none",
  };
}

export function createCustomActivity(): ProcessingActivity {
  return {
    id: createId("act"),
    name: "",
    department: "",
    purpose: "",
    dataSubjects: [],
    personalData: [],
    sensitivity: ["standard"],
    legalBases: [],
    legalBasisNotes: "",
    systemIds: [],
    recipients: [],
    transfersOutsideEea: false,
    transferCountries: "",
    transferMechanism: "none",
    retention: "",
  };
}

export function activityFromSystem(system: SystemRecord): ProcessingActivity {
  return {
    ...createCustomActivity(),
    name: system.name,
    department: system.category,
    purpose: system.purpose,
    dataSubjects: [...system.dataSubjects],
    personalData: [...system.dataTypes],
    systemIds: [system.id],
    recipients: system.sharedExternally
      ? (system.externalParties ?? "")
          .split(/[,;\n]/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    transfersOutsideEea: system.transfersOutsideEea,
    transferMechanism: system.transferMechanism,
  };
}

function emptySystemInterviewFields(system: SystemRecord): SystemRecord {
  return {
    ...system,
    vendor: "",
    purpose: "",
    dataTypes: [],
    dataSubjects: [],
    whoHasAccess: "",
    hostingNotes: "",
    dpaInPlace: false,
    sharedExternally: false,
    sharedExternallyAnswered: false,
    externalParties: "",
    transfersOutsideEea: false,
    thirdCountryAnswered: false,
    transferMechanism: "none",
  };
}

export function systemCardProgress(system: SystemRecord): number {
  const checks = [
    Boolean((system.vendor ?? "").trim()),
    Boolean((system.purpose ?? "").trim()),
    (system.dataSubjects ?? []).length > 0,
    (system.dataTypes ?? []).length > 0,
    Boolean((system.whoHasAccess ?? "").trim()),
    Boolean(system.sharedExternallyAnswered),
    Boolean(system.thirdCountryAnswered),
  ];
  if (system.sharedExternallyAnswered && system.sharedExternally) {
    checks.push(Boolean((system.externalParties ?? "").trim()));
  }
  if (system.thirdCountryAnswered && system.transfersOutsideEea) {
    checks.push(system.transferMechanism !== "none");
  }
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export function clearCatalogPrefill(workspace: Workspace): Workspace {
  if (workspace.catalogPrefillCleared || workspace.interviewComplete) {
    return workspace;
  }
  return {
    ...workspace,
    catalogPrefillCleared: true,
    systems: workspace.systems.map(emptySystemInterviewFields),
  };
}

export function ensureSystemActivities(workspace: Workspace): ProcessingActivity[] {
  const next = [...workspace.activities];
  let added = false;
  for (const system of workspace.systems) {
    const exists = next.some(
      (activity) => activity.systemIds.length === 1 && activity.systemIds[0] === system.id,
    );
    if (exists) continue;
    next.push(activityFromSystem(system));
    added = true;
  }
  return added ? next : workspace.activities;
}

export function sampleWorkspace(): Workspace {
  const systems = ["m365", "economic", "danlon", "pipedrive", "wordpress", "cookiebot"].map(
    (id) => systemFromCatalog(id, { prefill: true }),
  );
  const activityIds = suggestActivitiesForSystems(systems);
  const activities = activityIds.map((id) => activityFromCatalog(id, systems));

  return createWorkspace({
    organization: {
      name: "Nordlys Design ApS",
      registrationNumber: "12345678",
      address: "Havnegade 12",
      city: "Aarhus",
      postalCode: "8000",
      country: "Denmark",
      contactEmail: "privacy@nordlys.example",
      contactPhone: "+45 12 34 56 78",
      website: "https://nordlys.example",
      employeeBand: "10-49",
      industry: "Creative / agency",
      hasDpo: false,
      dpoName: "",
      dpoEmail: "",
      hasEuRepresentative: false,
      representativeName: "",
      representativeEmail: "",
    },
    systems,
    activities,
    activityMode: "topic",
    interviewStep: INTERVIEW_STEPS.length - 1,
    interviewComplete: true,
    updatedBy: "Maja Holm",
    collaborators: [
      { id: createId("col"), name: "Maja Holm", email: "maja@nordlys.example", role: "owner" },
      { id: createId("col"), name: "Jonas Berg", email: "jonas@nordlys.example", role: "editor" },
    ],
  });
}
