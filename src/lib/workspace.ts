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
  { id: "activities", title: "What you use data for", blurb: "Each purpose becomes a row in your Article 30 record." },
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

export function systemFromCatalog(catalogId: string): SystemRecord {
  const template = SYSTEM_TEMPLATES.find((item) => item.id === catalogId);
  if (!template) {
    throw new Error(`Unknown system template: ${catalogId}`);
  }
  return {
    id: createId("sys"),
    catalogId: template.id,
    name: template.name,
    vendor: template.vendor,
    category: template.category,
    purpose: template.purpose,
    dataTypes: [...template.dataTypes],
    dataSubjects: [...template.dataSubjects],
    whoHasAccess: "",
    hostingRegion: template.hostingRegion,
    hostingNotes: template.hostingNotes,
    isProcessor: template.isProcessor,
    dpaInPlace: true,
    transfersOutsideEea: template.transfersOutsideEea,
    transferMechanism: template.transferMechanism,
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
  const defaults = SYSTEM_CATEGORY_DEFAULTS[category];
  return {
    id: createId("sys"),
    name,
    vendor: "",
    category,
    purpose: defaults?.purpose ?? "",
    dataTypes: defaults?.dataTypes ? [...defaults.dataTypes] : [],
    dataSubjects: defaults?.dataSubjects ? [...defaults.dataSubjects] : [],
    whoHasAccess: "",
    hostingRegion: "unknown",
    hostingNotes: "",
    isProcessor: true,
    dpaInPlace: false,
    transfersOutsideEea: false,
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

export function sampleWorkspace(): Workspace {
  const systems = ["m365", "economic", "danlon", "pipedrive", "wordpress", "cookiebot"].map(
    systemFromCatalog,
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
    interviewStep: INTERVIEW_STEPS.length - 1,
    interviewComplete: true,
    updatedBy: "Maja Holm",
    collaborators: [
      { id: createId("col"), name: "Maja Holm", email: "maja@nordlys.example", role: "owner" },
      { id: createId("col"), name: "Jonas Berg", email: "jonas@nordlys.example", role: "editor" },
    ],
  });
}
