"use client";

import {
  legalBasisLabel,
  regionLabel,
  sensitivityLabel,
  transferLabel,
} from "@/lib/catalog";
import type { Workspace } from "@/lib/types";

export function RopaView({ workspace }: { workspace: Workspace }) {
  const org = workspace.organization;
  const address = [org.address, org.postalCode, org.city, org.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="print-document space-y-10 text-ink">
      <header className="border-b border-line pb-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
          GDPR Article 30
        </p>
        <h1 className="mt-2 font-serif text-[34px] leading-tight">
          Record of Processing Activities
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-soft">
          Controller record for {org.name || "this organisation"}. Generated for the organisation’s
          own archive. Not legal advice.
        </p>
      </header>

      <section>
        <h2 className="font-serif text-[22px]">1. Controller details</h2>
        <Table
          headers={["Field", "Record"]}
          rows={[
            ["Controller", org.name || "—"],
            ["CVR / registration number", org.registrationNumber || "—"],
            ["Address", address || "—"],
            ["Contact email", org.contactEmail || "—"],
            ["Phone", org.contactPhone || "—"],
            ["Website", org.website || "—"],
            ["Employees", org.employeeBand || "—"],
            ["Industry", org.industry || "—"],
            [
              "Data Protection Officer",
              org.hasDpo
                ? `${org.dpoName || "Named"} (${org.dpoEmail || "email not set"})`
                : "Not designated",
            ],
            [
              "EU representative",
              org.hasEuRepresentative
                ? `${org.representativeName || "Named"} (${org.representativeEmail || "email not set"})`
                : "Not applicable",
            ],
          ]}
        />
      </section>

      <section>
        <h2 className="font-serif text-[22px]">2. Systems and data flows</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink/20 text-[12px] uppercase tracking-wide text-muted">
                {[
                  "System",
                  "Vendor",
                  "Hosting",
                  "Data",
                  "People",
                  "Role",
                  "DPA",
                  "Transfers",
                ].map((h) => (
                  <th key={h} className="py-2 pr-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workspace.systems.map((system) => (
                <tr key={system.id} className="border-b border-line align-top">
                  <td className="py-2.5 pr-4 font-medium">{system.name}</td>
                  <td className="py-2.5 pr-4">{system.vendor || "—"}</td>
                  <td className="py-2.5 pr-4">{regionLabel(system.hostingRegion)}</td>
                  <td className="py-2.5 pr-4">{system.dataTypes.join(", ") || "—"}</td>
                  <td className="py-2.5 pr-4">{system.dataSubjects.join(", ") || "—"}</td>
                  <td className="py-2.5 pr-4">{system.isProcessor ? "Processor" : "Independent"}</td>
                  <td className="py-2.5 pr-4">{system.dpaInPlace ? "Yes" : "No"}</td>
                  <td className="py-2.5 pr-4">
                    {system.transfersOutsideEea
                      ? transferLabel(system.transferMechanism)
                      : "EEA only"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-serif text-[22px]">3. Processing activities</h2>
        {workspace.activities.map((activity, index) => {
          const systems = workspace.systems
            .filter((system) => activity.systemIds.includes(system.id))
            .map((system) => system.name)
            .join(", ");
          return (
            <div key={activity.id}>
              <h3 className="text-[16px] font-medium">
                {index + 1}. {activity.name || "Untitled activity"}
              </h3>
              <Table
                headers={["Field", "Record"]}
                rows={[
                  ["Department", activity.department || "—"],
                  ["Purpose", activity.purpose || "—"],
                  ["Data subjects", activity.dataSubjects.join(", ") || "—"],
                  ["Personal data", activity.personalData.join(", ") || "—"],
                  [
                    "Data categories",
                    activity.sensitivity.map((item) => sensitivityLabel(item)).join("; ") || "—",
                  ],
                  ["Legal basis", activity.legalBases.map((basis) => legalBasisLabel(basis)).join("; ") || "—"],
                  ["Notes", activity.legalBasisNotes || "—"],
                  ["Systems", systems || "—"],
                  ["Recipients", activity.recipients.join(", ") || "—"],
                  [
                    "Transfers",
                    activity.transfersOutsideEea
                      ? `${activity.transferCountries || "Outside EEA"} — ${transferLabel(activity.transferMechanism)}`
                      : "No intended transfers outside the EU/EEA",
                  ],
                  ["Retention", activity.retention || "—"],
                ]}
              />
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="font-serif text-[22px]">4. Technical and organisational measures</h2>
        <Table
          headers={["Measure", "In place", "Description"]}
          rows={workspace.toms.map((tom) => [
            tom.label,
            tom.enabled ? "Yes" : "Not yet",
            tom.description,
          ])}
        />
      </section>
    </article>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="border-b border-ink/20 text-[12px] uppercase tracking-wide text-muted">
            {headers.map((header) => (
              <th key={header} className="py-2 pr-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row[0]}-${i}`} className="border-b border-line align-top">
              {row.map((cell, j) => (
                <td
                  key={`${i}-${j}`}
                  className={`py-2.5 pr-4 leading-6 ${j === 0 ? "w-[34%] font-medium text-ink" : "text-ink-soft"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
