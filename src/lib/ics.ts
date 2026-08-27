import { formatDate } from "./ids";
import type { Locale } from "./locale";
import { fill, messages } from "./messages";
import type { Reminder } from "./types";

function icsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

export function reminderToIcs(reminder: Reminder, orgName: string): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const description = (reminder.notes || "TrustLog compliance reminder")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TrustLog//GDPR Reminders//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${reminder.id}@trustlog`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(reminder.dueDate)}`,
    `SUMMARY:${orgName ? orgName + " · " : ""}${reminder.title}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(reminder: Reminder, orgName: string): void {
  const blob = new Blob([reminderToIcs(reminder, orgName)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${reminder.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export function dueState(dueDate: string, completedAt?: string): "done" | "overdue" | "soon" | "upcoming" {
  if (completedAt) return "done";
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inTwoWeeks = new Date(today);
  inTwoWeeks.setDate(today.getDate() + 14);
  if (due < today) return "overdue";
  if (due <= inTwoWeeks) return "soon";
  return "upcoming";
}

export function dueLabel(
  dueDate: string,
  completedAt: string | undefined,
  locale: Locale = "da",
): string {
  const state = dueState(dueDate, completedAt);
  const t = messages[locale].reminders;
  if (state === "done") return fill(t.completed, { date: formatDate(completedAt || dueDate, locale) });
  if (state === "overdue") return fill(t.overdue, { date: formatDate(dueDate, locale) });
  if (state === "soon") return fill(t.dueSoon, { date: formatDate(dueDate, locale) });
  return fill(t.due, { date: formatDate(dueDate, locale) });
}
