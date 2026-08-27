import type { Locale } from "./locale";
import { messages } from "./messages";
import type { ProcessingActivity, Reminder, SystemRecord, Tom } from "./types";

export function dataLabel(locale: Locale, value: string): string {
  return messages[locale].dataTypes[value] ?? value;
}

export function subjectLabel(locale: Locale, value: string): string {
  return messages[locale].dataSubjects[value] ?? value;
}

export function industryLabel(locale: Locale, value: string): string {
  return messages[locale].industries[value] ?? value;
}

export function joinData(locale: Locale, items: string[]): string {
  if (!items.length) return messages[locale].dash;
  return items.map((item) => dataLabel(locale, item)).join(", ");
}

export function joinSubjects(locale: Locale, items: string[]): string {
  if (!items.length) return messages[locale].dash;
  return items.map((item) => subjectLabel(locale, item)).join(", ");
}

export function tomCopy(locale: Locale, tom: Tom): { label: string; description: string } {
  return messages[locale].toms[tom.id] ?? { label: tom.label, description: tom.description };
}

export function systemPurpose(locale: Locale, system: SystemRecord): string {
  const copy = system.catalogId ? messages[locale].systemCopy[system.catalogId] : undefined;
  const en = system.catalogId ? messages.en.systemCopy[system.catalogId] : undefined;
  const da = system.catalogId ? messages.da.systemCopy[system.catalogId] : undefined;
  if (
    copy &&
    (!system.purpose || system.purpose === en?.purpose || system.purpose === da?.purpose)
  ) {
    return copy.purpose;
  }
  return system.purpose;
}

export function systemNotes(locale: Locale, system: SystemRecord): string {
  const copy = system.catalogId ? messages[locale].systemCopy[system.catalogId] : undefined;
  const en = system.catalogId ? messages.en.systemCopy[system.catalogId] : undefined;
  const da = system.catalogId ? messages.da.systemCopy[system.catalogId] : undefined;
  if (
    copy &&
    (!system.hostingNotes ||
      system.hostingNotes === en?.hostingNotes ||
      system.hostingNotes === da?.hostingNotes)
  ) {
    return copy.hostingNotes;
  }
  return system.hostingNotes;
}

export function systemVendor(locale: Locale, system: SystemRecord): string {
  const copy = system.catalogId ? messages[locale].systemCopy[system.catalogId] : undefined;
  const en = system.catalogId ? messages.en.systemCopy[system.catalogId] : undefined;
  const da = system.catalogId ? messages.da.systemCopy[system.catalogId] : undefined;
  if (copy?.vendor && (!system.vendor || system.vendor === en?.vendor || system.vendor === da?.vendor)) {
    return copy.vendor;
  }
  return system.vendor;
}

export function activityName(locale: Locale, activity: ProcessingActivity): string {
  const copy = activity.catalogId ? messages[locale].activityCopy[activity.catalogId] : undefined;
  const en = activity.catalogId ? messages.en.activityCopy[activity.catalogId] : undefined;
  const da = activity.catalogId ? messages.da.activityCopy[activity.catalogId] : undefined;
  if (copy && (!activity.name || activity.name === en?.name || activity.name === da?.name)) {
    return copy.name;
  }
  return activity.name || messages[locale].interview.untitledActivity;
}

export function activityText(
  locale: Locale,
  activity: ProcessingActivity,
  field: "purpose" | "department" | "legalBasisNotes" | "retention" | "transferCountries",
): string {
  const copy = activity.catalogId ? messages[locale].activityCopy[activity.catalogId] : undefined;
  const en = activity.catalogId ? messages.en.activityCopy[activity.catalogId] : undefined;
  const da = activity.catalogId ? messages.da.activityCopy[activity.catalogId] : undefined;
  const stored = activity[field];
  if (copy && (!stored || stored === en?.[field] || stored === da?.[field])) {
    return copy[field];
  }
  return stored;
}

export function activityRecipients(locale: Locale, activity: ProcessingActivity): string[] {
  const copy = activity.catalogId ? messages[locale].activityCopy[activity.catalogId] : undefined;
  const en = activity.catalogId ? messages.en.activityCopy[activity.catalogId] : undefined;
  const da = activity.catalogId ? messages.da.activityCopy[activity.catalogId] : undefined;
  const stored = activity.recipients.join("|");
  if (
    copy &&
    (stored === (en?.recipients ?? []).join("|") || stored === (da?.recipients ?? []).join("|"))
  ) {
    return copy.recipients;
  }
  return activity.recipients;
}

export function reminderTitle(locale: Locale, reminder: Reminder): string {
  if (reminder.type === "annual_review") return messages[locale].reminders.annual;
  if (reminder.type === "processor_review") return messages[locale].reminders.processors;
  return reminder.title;
}

export function reminderNotes(locale: Locale, reminder: Reminder): string {
  if (reminder.type === "annual_review") return messages[locale].reminders.annualNotes;
  if (reminder.type === "processor_review") return messages[locale].reminders.processorNotes;
  return reminder.notes;
}
