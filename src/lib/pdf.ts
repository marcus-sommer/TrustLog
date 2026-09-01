import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "./ids";
import {
  legalBasisLabel,
  regionLabel,
  sensitivityLabel,
  transferLabel,
} from "./catalog";
import type { Locale } from "./locale";
import { dateLocale } from "./locale";
import { fill, messages } from "./messages";
import {
  activityName,
  activityRecipients,
  activityText,
  industryLabel,
  joinData,
  joinSubjects,
  reminderNotes,
  reminderTitle,
  systemNotes,
  systemPurpose,
  systemVendor,
  tomCopy,
} from "./localize";
import type { Workspace } from "./types";

function lastY(doc: jsPDF): number {
  const extended = doc as jsPDF & { lastAutoTable?: { finalY: number } };
  return extended.lastAutoTable?.finalY ?? 40;
}

function fileSafe(name: string): string {
  return (name || "organisation")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function downloadPdf(
  workspace: Workspace,
  locale: Locale = "en",
  score = 0,
): void {
  const t = messages[locale];
  const p = t.pdf;
  const r = t.ropa;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const org = workspace.organization;
  const generated = new Date().toLocaleString(dateLocale(locale));
  const coverScore = score;

  const drawFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i += 1) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(
        fill(p.footer, { name: org.name || t.yourOrganisation }),
        margin,
        287,
      );
      doc.text(`${i} / ${pageCount}`, pageWidth - margin, 287, { align: "right" });
    }
  };

  doc.setFillColor(33, 85, 68);
  doc.rect(0, 0, pageWidth, 42, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(p.confidential, margin, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(p.title, margin, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(p.subtitle, margin, 32);

  doc.setTextColor(28, 25, 23);
  let y = 54;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(org.name || t.untitledOrg, margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const coverLines = [
    org.registrationNumber ? `${r.cvr}: ${org.registrationNumber}` : null,
    [org.address, org.postalCode, org.city, org.country].filter(Boolean).join(", ") || null,
    org.contactEmail ? `${r.email}: ${org.contactEmail}` : null,
    org.contactPhone ? `${r.phone}: ${org.contactPhone}` : null,
    org.employeeBand ? `${r.employees}: ${org.employeeBand}` : null,
    org.industry ? `${r.industry}: ${industryLabel(locale, org.industry)}` : null,
    fill(p.generated, { date: generated }),
    fill(p.lastEdited, { name: workspace.updatedBy }),
    fill(p["completeness"], { score: coverScore }),
  ].filter((line): line is string => Boolean(line));

  for (const line of coverLines) {
    doc.text(line, margin, y);
    y += 5.5;
  }

  y += 4;
  doc.setFontSize(9);
  doc.setTextColor(80);
  const disclaimer = p.disclaimer;
  const split = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
  doc.text(split, margin, y);
  y += split.length * 4.2 + 8;

  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(p.section1, margin, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 2.2, textColor: [28, 25, 23] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 52 } },
    body: [
      [r.controller, org.name || t.dash],
      [r.cvr, org.registrationNumber || t.dash],
      [
        r.address,
        [org.address, `${org.postalCode} ${org.city}`.trim(), org.country]
          .filter(Boolean)
          .join(", ") || t.dash,
      ],
      [r.email, org.contactEmail || t.dash],
      [r.website, org.website || t.dash],
      [r.employees, org.employeeBand || t.dash],
      [
        r.dpo,
        org.hasDpo
          ? `${org.dpoName || p.named} (${org.dpoEmail || p.emailNotSet})`
          : p.dpoNone,
      ],
      [
        r.euRep,
        org.hasEuRepresentative
          ? `${org.representativeName || p.named} (${org.representativeEmail || p.emailNotSet})`
          : p.euNone,
      ],
    ],
  });

  y = lastY(doc) + 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(p.section2, margin, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [[r.system, r.vendor, r.hosting, r.data, r.people, `${p.processor} / DPA`, r.transfers]],
    body: workspace.systems.map((system) => [
      system.name,
      systemVendor(locale, system) || t.dash,
      regionLabel(system.hostingRegion, locale),
      joinData(locale, system.dataTypes),
      joinSubjects(locale, system.dataSubjects),
      `${system.isProcessor ? p.processor : p.independent} / DPA ${system.dpaInPlace ? p.dpaYes : p.dpaNo}`,
      system.transfersOutsideEea ? transferLabel(system.transferMechanism, locale) : p.eeaOnly,
    ]),
    styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
    headStyles: { fillColor: [33, 85, 68], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [246, 243, 236] },
  });

  y = lastY(doc) + 12;
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(p.section3, margin, y);
  y += 4;

  workspace.activities.forEach((activity, index) => {
    const systems = workspace.systems
      .filter((system) => activity.systemIds.includes(system.id))
      .map((system) => system.name)
      .join(", ");

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      theme: "grid",
      styles: { fontSize: 8.5, cellPadding: 2.4, overflow: "linebreak", textColor: [28, 25, 23] },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 48, fillColor: [244, 240, 232] } },
      body: [
        [t.workspace.colActivity, `${index + 1}. ${activityName(locale, activity)}`],
        [r.department, activityText(locale, activity, "department") || t.dash],
        [r.purpose, activityText(locale, activity, "purpose") || t.dash],
        [r.subjects, joinSubjects(locale, activity.dataSubjects)],
        [r.personalData, joinData(locale, activity.personalData)],
        [
          r.categories,
          activity.sensitivity.map((item) => sensitivityLabel(item, locale)).join("; ") || t.dash,
        ],
        [
          r.legalBasis,
          activity.legalBases.map((item) => legalBasisLabel(item, locale)).join("; ") || t.dash,
        ],
        [r.notes, activityText(locale, activity, "legalBasisNotes") || t.dash],
        [r.systems, systems || t.dash],
        [r.recipients, activityRecipients(locale, activity).join(", ") || t.dash],
        [
          r.transfers,
          activity.transfersOutsideEea
            ? `${activityText(locale, activity, "transferCountries") || t.dash} — ${transferLabel(activity.transferMechanism, locale)}`
            : p.noTransfers,
        ],
        [r.retention, activityText(locale, activity, "retention") || t.dash],
      ],
    });
    y = lastY(doc) + 8;
    if (y > 240 && index < workspace.activities.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(p.section4, margin, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [[r.measure, r.inPlace, r.description]],
    body: workspace.toms.map((tom) => {
      const copy = tomCopy(locale, tom);
      return [copy.label, tom.enabled ? p.yes : p.notYet, copy.description];
    }),
    styles: { fontSize: 8.5, cellPadding: 2.2 },
    headStyles: { fillColor: [33, 85, 68], textColor: 255 },
    alternateRowStyles: { fillColor: [246, 243, 236] },
    columnStyles: { 1: { cellWidth: 22 } },
  });

  y = lastY(doc) + 12;
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(p.section5, margin, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [[t.reminders.fieldTitle, t.reminders.dueDate, "Status", t.reminders.notes]],
    body: workspace.reminders.map((reminder) => [
      reminderTitle(locale, reminder),
      formatDate(reminder.dueDate, locale),
      reminder.completedAt
        ? fill(p.done, { date: formatDate(reminder.completedAt, locale) })
        : p.open,
      reminderNotes(locale, reminder) || t.dash,
    ]),
    styles: { fontSize: 8.5, cellPadding: 2.2 },
    headStyles: { fillColor: [33, 85, 68], textColor: 255 },
    alternateRowStyles: { fillColor: [246, 243, 236] },
  });

  y = lastY(doc) + 12;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(90);
  const closing = doc.splitTextToSize(
    fill(p.closing, {
      date: formatDate(workspace.updatedAt, locale),
      name: workspace.updatedBy,
    }),
    pageWidth - margin * 2,
  );
  doc.text(closing, margin, y);

  drawFooter();
  doc.save(`ropa-${fileSafe(org.name)}-${workspace.id.slice(-6)}.pdf`);
}
