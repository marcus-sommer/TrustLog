export type EmployeeBand = "1-9" | "10-49" | "50-249" | "250+";

export type DataSensitivity = "standard" | "special" | "criminal";

export type LegalBasis =
  | "contract"
  | "legal_obligation"
  | "legitimate_interest"
  | "consent"
  | "vital_interest"
  | "public_task";

export type TransferMechanism =
  | "none"
  | "adequacy"
  | "dpf"
  | "sccs"
  | "bcrs"
  | "derogation";

export type HostingRegion = "eu" | "eea" | "uk" | "us" | "mixed" | "unknown";

export type CollaboratorRole = "owner" | "editor" | "viewer";

export type ReminderType =
  | "annual_review"
  | "processor_review"
  | "retention_review"
  | "custom";

export interface Organization {
  name: string;
  registrationNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  employeeBand: EmployeeBand | "";
  industry: string;
  hasDpo: boolean;
  dpoName: string;
  dpoEmail: string;
  hasEuRepresentative: boolean;
  representativeName: string;
  representativeEmail: string;
}

export interface SystemRecord {
  id: string;
  catalogId?: string;
  name: string;
  vendor: string;
  category: string;
  purpose: string;
  dataTypes: string[];
  dataSubjects: string[];
  whoHasAccess: string;
  hostingRegion: HostingRegion;
  hostingNotes: string;
  isProcessor: boolean;
  dpaInPlace: boolean;
  transfersOutsideEea: boolean;
  transferMechanism: TransferMechanism;
}

export interface ProcessingActivity {
  id: string;
  catalogId?: string;
  name: string;
  department: string;
  purpose: string;
  dataSubjects: string[];
  personalData: string[];
  sensitivity: DataSensitivity[];
  legalBases: LegalBasis[];
  legalBasisNotes: string;
  systemIds: string[];
  recipients: string[];
  transfersOutsideEea: boolean;
  transferCountries: string;
  transferMechanism: TransferMechanism;
  retention: string;
}

export interface Tom {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: CollaboratorRole;
}

export interface Reminder {
  id: string;
  title: string;
  type: ReminderType;
  dueDate: string;
  notes: string;
  completedAt?: string;
}

export interface Workspace {
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  organization: Organization;
  systems: SystemRecord[];
  activities: ProcessingActivity[];
  toms: Tom[];
  collaborators: Collaborator[];
  reminders: Reminder[];
  interviewStep: number;
  interviewComplete: boolean;
}

export interface SystemTemplate {
  id: string;
  name: string;
  vendor: string;
  category: string;
  purpose: string;
  dataTypes: string[];
  dataSubjects: string[];
  hostingRegion: HostingRegion;
  hostingNotes: string;
  isProcessor: boolean;
  transfersOutsideEea: boolean;
  transferMechanism: TransferMechanism;
  suggestedActivityIds: string[];
}

export interface ActivityTemplate {
  id: string;
  name: string;
  department: string;
  purpose: string;
  dataSubjects: string[];
  personalData: string[];
  sensitivity: DataSensitivity[];
  legalBases: LegalBasis[];
  legalBasisNotes: string;
  recipients: string[];
  transfersOutsideEea: boolean;
  transferCountries: string;
  transferMechanism: TransferMechanism;
  retention: string;
}
