"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  ACTIVITY_TEMPLATES,
  DATA_SUBJECT_OPTIONS,
  DATA_TYPE_OPTIONS,
  EMPLOYEE_BANDS,
  INDUSTRIES,
  LEGAL_BASIS_OPTIONS,
  SENSITIVITY_OPTIONS,
  SYSTEM_TEMPLATES,
  TRANSFER_OPTIONS,
} from "@/lib/catalog";
import { completeness } from "@/lib/completeness";
import { downloadPdf } from "@/lib/pdf";
import { downloadMarkdown } from "@/lib/markdown";
import { fill } from "@/lib/messages";
import {
  activityName,
  activityText,
  dataLabel,
  subjectLabel,
  systemNotes,
  systemPurpose,
  tomCopy,
} from "@/lib/localize";
import {
  activityFromCatalog,
  createCustomActivity,
  createCustomSystem,
  INTERVIEW_STEPS,
  suggestActivitiesForSystems,
  systemFromCatalog,
} from "@/lib/workspace";
import type {
  DataSensitivity,
  LegalBasis,
  ProcessingActivity,
  SystemRecord,
  TransferMechanism,
} from "@/lib/types";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useLocale } from "@/context/LocaleContext";
import {
  Button,
  Chip,
  ChoiceCard,
  SectionTitle,
  SelectField,
  TextArea,
  TextField,
  Tip,
} from "./ui";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function InterviewWizard() {
  const router = useRouter();
  const { workspace, update, reset } = useWorkspace();
  const { t, locale } = useLocale();
  const step = Math.min(workspace.interviewStep, INTERVIEW_STEPS.length - 1);
  const meta = t.interview.steps[step];
  const { score, items } = completeness(workspace);
  const [customTools, setCustomTools] = useState<Record<string, string>>({});
  const [openActivity, setOpenActivity] = useState<string | null>(
    workspace.activities[0]?.id ?? null,
  );

  const groupedSystems = useMemo(() => {
    const groups = new Map<string, typeof SYSTEM_TEMPLATES>();
    for (const template of SYSTEM_TEMPLATES) {
      const list = groups.get(template.category) ?? [];
      list.push(template);
      groups.set(template.category, list);
    }
    return Array.from(groups.entries());
  }, []);

  function go(next: number) {
    update({ interviewStep: Math.max(0, Math.min(INTERVIEW_STEPS.length - 1, next)) });
  }

  function applySuggestedActivities() {
    const suggested = suggestActivitiesForSystems(workspace.systems);
    const existing = new Set(workspace.activities.map((a) => a.catalogId).filter(Boolean));
    const added = suggested
      .filter((id) => !existing.has(id))
      .map((id) => activityFromCatalog(id, workspace.systems));
    if (added.length === 0) return;
    const next = [...workspace.activities, ...added];
    update({ activities: next });
    setOpenActivity(added[0]?.id ?? openActivity);
  }

  function patchOrg<K extends keyof typeof workspace.organization>(
    key: K,
    value: (typeof workspace.organization)[K],
  ) {
    update({ organization: { ...workspace.organization, [key]: value } });
  }

  function patchSystem(id: string, patch: Partial<SystemRecord>) {
    update({
      systems: workspace.systems.map((system) =>
        system.id === id ? { ...system, ...patch } : system,
      ),
    });
  }

  function patchActivity(id: string, patch: Partial<ProcessingActivity>) {
    update({
      activities: workspace.activities.map((activity) =>
        activity.id === id ? { ...activity, ...patch } : activity,
      ),
    });
  }

  function finish() {
    update({ interviewComplete: true, interviewStep: INTERVIEW_STEPS.length - 1 });
    router.push("/workspace");
  }

  function closeInterview() {
    if (!window.confirm(t.setup.closeInterviewConfirm)) return;
    reset();
    router.push("/");
  }

  return (
    <div className="mx-auto flex min-h-full max-w-6xl gap-12 px-5 py-10 lg:px-8">
      <ol className="sticky top-10 hidden h-fit w-52 shrink-0 lg:block">
        {INTERVIEW_STEPS.map((item, index) => {
          const active = index === step;
          const done = index < step || workspace.interviewComplete;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(index)}
                className={`flex w-full items-start gap-3 border-l py-2.5 pl-4 text-left ${
                  active ? "border-accent" : "border-line"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${
                    active
                      ? "bg-accent text-white"
                      : done
                        ? "bg-accent-soft text-accent"
                        : "bg-line text-muted"
                  }`}
                >
                  {done && !active ? "✓" : index + 1}
                </span>
                <span>
                  <span className={`block text-[13px] ${active ? "font-medium text-ink" : "text-muted"}`}>
                    {t.interview.steps[index].title}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="min-w-0 flex-1 pb-24">
        <p className="text-[13px] text-muted lg:hidden">
          {fill(t.setup.stepOf, { current: step + 1, total: INTERVIEW_STEPS.length })}
        </p>
        <SectionTitle
          kicker={fill(t.setup.stepOf, { current: step + 1, total: INTERVIEW_STEPS.length })}
          title={meta.title}
        >
          {meta.blurb}
        </SectionTitle>

        <div className="mt-10 max-w-3xl space-y-8">
          {step === 0
            ? CompanyStep()
            : step === 1
              ? PeopleStep()
              : step === 2
                ? ToolsStep({ groupedSystems, customTools, setCustomTools })
                : step === 3
                  ? FlowsStep({ patchSystem })
                  : step === 4
                    ? ActivitiesStep({
                        openActivity,
                        setOpenActivity,
                        applySuggestedActivities,
                        patchActivity,
                      })
                    : step === 5
                      ? ProtectionStep()
                      : ReviewStep({ score, items, onFinish: finish })}
        </div>

        <div className="mt-10 flex max-w-3xl items-center justify-between gap-3 border-t border-line pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
              {t.setup.back}
            </Button>
            <Button variant="ghost" onClick={closeInterview}>
              {t.setup.closeInterview}
            </Button>
          </div>
          {step < INTERVIEW_STEPS.length - 1 ? (
            <Button
              onClick={() => {
                if (step === 2) applySuggestedActivities();
                go(step + 1);
              }}
            >
              {t.setup.continue}
            </Button>
          ) : (
            <Button onClick={finish}>{t.setup.openWorkspace}</Button>
          )}
        </div>
      </div>
    </div>
  );

  function CompanyStep() {
    const org = workspace.organization;
    const i = t.interview;
    return (
      <>
        <TextField
          label={i.companyName}
          hint={i.companyNameHint}
          value={org.name}
          onChange={(e) => patchOrg("name", e.target.value)}
          placeholder={i.companyPlaceholder}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label={i.cvr}
            value={org.registrationNumber}
            onChange={(e) => patchOrg("registrationNumber", e.target.value)}
            placeholder="12345678"
          />
          <SelectField
            label={i.industry}
            value={org.industry}
            onChange={(e) => patchOrg("industry", e.target.value)}
          >
            <option value="">{i.selectOne}</option>
            {INDUSTRIES.map((item) => (
              <option key={item} value={item}>
                {t.industries[item] ?? item}
              </option>
            ))}
          </SelectField>
        </div>
        <TextField
          label={i.street}
          value={org.address}
          onChange={(e) => patchOrg("address", e.target.value)}
          placeholder="Havnegade 12"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <TextField
            label={i.postal}
            value={org.postalCode}
            onChange={(e) => patchOrg("postalCode", e.target.value)}
          />
          <TextField
            label={i.city}
            value={org.city}
            onChange={(e) => patchOrg("city", e.target.value)}
          />
          <TextField
            label={i.country}
            value={org.country}
            onChange={(e) => patchOrg("country", e.target.value)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label={i.contactEmail}
            type="email"
            hint={i.contactEmailHint}
            value={org.contactEmail}
            onChange={(e) => patchOrg("contactEmail", e.target.value)}
            placeholder="privacy@company.com"
          />
          <TextField
            label={i.phone}
            value={org.contactPhone}
            onChange={(e) => patchOrg("contactPhone", e.target.value)}
          />
        </div>
        <TextField
          label={i.website}
          value={org.website}
          onChange={(e) => patchOrg("website", e.target.value)}
          placeholder="https://"
        />
        <div>
          <p className="text-[13px] font-medium text-ink">{i.employeesQ}</p>
          <p className="mt-0.5 text-[12.5px] text-muted">{i.employeesHint}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {EMPLOYEE_BANDS.map((band) => (
              <ChoiceCard
                key={band.value}
                selected={org.employeeBand === band.value}
                title={band.label}
                hint={t.employeeHints[band.value]}
                onClick={() => patchOrg("employeeBand", band.value)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  function PeopleStep() {
    const org = workspace.organization;
    const i = t.interview;
    return (
      <>
        <Tip>{i.peopleTip}</Tip>
        <div className="grid gap-2 sm:grid-cols-2">
          <ChoiceCard
            selected={!org.hasDpo}
            title={i.noDpo}
            hint={i.noDpoHint}
            onClick={() => patchOrg("hasDpo", false)}
          />
          <ChoiceCard
            selected={org.hasDpo}
            title={i.hasDpo}
            hint={i.hasDpoHint}
            onClick={() => patchOrg("hasDpo", true)}
          />
        </div>
        {org.hasDpo ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={i.dpoName}
              value={org.dpoName}
              onChange={(e) => patchOrg("dpoName", e.target.value)}
            />
            <TextField
              label={i.dpoEmail}
              type="email"
              value={org.dpoEmail}
              onChange={(e) => patchOrg("dpoEmail", e.target.value)}
            />
          </div>
        ) : null}
        <div>
          <p className="text-[13px] font-medium text-ink">{i.euRep}</p>
          <p className="mt-0.5 text-[12.5px] text-muted">{i.euRepHint}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <ChoiceCard
              selected={!org.hasEuRepresentative}
              title={i.euNotNeeded}
              hint={i.euNotNeededHint}
              onClick={() => patchOrg("hasEuRepresentative", false)}
            />
            <ChoiceCard
              selected={org.hasEuRepresentative}
              title={i.euHas}
              onClick={() => patchOrg("hasEuRepresentative", true)}
            />
          </div>
        </div>
        {org.hasEuRepresentative ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={i.repName}
              value={org.representativeName}
              onChange={(e) => patchOrg("representativeName", e.target.value)}
            />
            <TextField
              label={i.repEmail}
              type="email"
              value={org.representativeEmail}
              onChange={(e) => patchOrg("representativeEmail", e.target.value)}
            />
          </div>
        ) : null}
      </>
    );
  }

  function ToolsStep({
    groupedSystems,
    customTools,
    setCustomTools,
  }: {
    groupedSystems: [string, typeof SYSTEM_TEMPLATES][];
    customTools: Record<string, string>;
    setCustomTools: Dispatch<SetStateAction<Record<string, string>>>;
  }) {
    const selected = new Set(workspace.systems.map((s) => s.catalogId).filter(Boolean));
    const knownCategories = new Set(groupedSystems.map(([category]) => category));
    const leftoverCustom = workspace.systems.filter(
      (system) => !system.catalogId && !knownCategories.has(system.category),
    );

    function toggleTemplate(id: string) {
      const existing = workspace.systems.find((s) => s.catalogId === id);
      if (existing) {
        removeSystem(existing.id);
        return;
      }
      update({ systems: [...workspace.systems, systemFromCatalog(id)] });
    }

    function removeSystem(id: string) {
      update({
        systems: workspace.systems.filter((system) => system.id !== id),
        activities: workspace.activities.map((activity) => ({
          ...activity,
          systemIds: activity.systemIds.filter((systemId) => systemId !== id),
        })),
      });
    }

    function addCustom(category: string) {
      const name = (customTools[category] ?? "").trim();
      if (!name) return;
      update({ systems: [...workspace.systems, createCustomSystem(name, category)] });
      setCustomTools((current) => ({ ...current, [category]: "" }));
    }

    function categoryExtras(category: string) {
      const value = customTools[category] ?? "";
      const added = workspace.systems.filter(
        (system) => !system.catalogId && system.category === category,
      );
      return (
        <>
          <div className="mt-3 flex gap-2">
            <div className="flex-1">
              <TextField
                label={t.interview.somethingElse}
                value={value}
                onChange={(e) =>
                  setCustomTools((current) => ({ ...current, [category]: e.target.value }))
                }
                placeholder={t.interview.somethingElsePlaceholder}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  e.preventDefault();
                  addCustom(category);
                }}
              />
            </div>
            <Button variant="secondary" className="mt-7" onClick={() => addCustom(category)}>
              {t.interview.add}
            </Button>
          </div>
          {added.length > 0 ? (
            <ul className="mt-2 text-[14px] text-ink-soft">
              {added.map((system) => (
                <li key={system.id} className="flex items-center justify-between py-1">
                  {system.name}
                  <button
                    type="button"
                    className="text-[13px] text-muted hover:text-danger"
                    onClick={() => removeSystem(system.id)}
                  >
                    {t.interview.remove}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );
    }

    return (
      <>
        <Tip>{t.interview.toolsTip}</Tip>
        {groupedSystems.map(([category, templates]) => (
          <div key={category}>
            <h2 className="mb-2 text-[13px] font-medium text-muted">
              {t.categories[category] ?? category}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {templates.map((template) => (
                <ChoiceCard
                  key={template.id}
                  selected={selected.has(template.id)}
                  title={template.name}
                  hint={t.systemCopy[template.id]?.purpose ?? template.purpose}
                  onClick={() => toggleTemplate(template.id)}
                />
              ))}
            </div>
            {categoryExtras(category)}
          </div>
        ))}
        {leftoverCustom.length > 0 ? (
          <div>
            <h2 className="mb-2 text-[13px] font-medium text-muted">
              {t.categories.Other ?? "Other"}
            </h2>
            <ul className="text-[14px] text-ink-soft">
              {leftoverCustom.map((system) => (
                <li key={system.id} className="flex items-center justify-between py-1">
                  {system.name}
                  <button
                    type="button"
                    className="text-[13px] text-muted hover:text-danger"
                    onClick={() => removeSystem(system.id)}
                  >
                    {t.interview.remove}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }

  function FlowsStep({
    patchSystem,
  }: {
    patchSystem: (id: string, patch: Partial<SystemRecord>) => void;
  }) {
    if (workspace.systems.length === 0) {
      return (
        <Tip>{t.interview.flowsEmpty}</Tip>
      );
    }
    return (
      <>
        <Tip>{t.interview.flowsTip}</Tip>
        <div className="space-y-6">
          {workspace.systems.map((system) => (
            <article key={system.id} className="rounded-2xl border border-line bg-raised p-6">
              <h2 className="font-serif text-[22px] leading-7 text-ink">{system.name}</h2>
              <p className="mt-1 text-[13px] text-muted">
                {t.categories[system.category] ?? system.category}
              </p>
              <div className="mt-6 space-y-5">
                <TextField
                  label={t.interview.vendor}
                  value={system.vendor}
                  onChange={(e) => patchSystem(system.id, { vendor: e.target.value })}
                />
                <TextArea
                  label={t.interview.usedFor}
                  hint={t.interview.usedForHint}
                  value={systemPurpose(locale, system)}
                  onChange={(e) => patchSystem(system.id, { purpose: e.target.value })}
                  className="min-h-[72px]"
                />
                <div>
                  <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.whoseData}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Set([...DATA_SUBJECT_OPTIONS, ...system.dataSubjects])).map(
                      (item) => (
                        <Chip
                          key={item}
                          selected={system.dataSubjects.includes(item)}
                          onClick={() =>
                            patchSystem(system.id, {
                              dataSubjects: toggleValue(system.dataSubjects, item),
                            })
                          }
                        >
                          {subjectLabel(locale, item)}
                        </Chip>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.dataInSystem}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Set([...DATA_TYPE_OPTIONS, ...system.dataTypes])).map((item) => (
                      <Chip
                        key={item}
                        selected={system.dataTypes.includes(item)}
                        onClick={() =>
                          patchSystem(system.id, { dataTypes: toggleValue(system.dataTypes, item) })
                        }
                      >
                        {dataLabel(locale, item)}
                      </Chip>
                    ))}
                  </div>
                </div>
                <TextField
                  label={t.interview.whoHasAccess}
                  hint={t.interview.whoHasAccessHint}
                  value={system.whoHasAccess ?? ""}
                  onChange={(e) => patchSystem(system.id, { whoHasAccess: e.target.value })}
                />
                <div>
                  <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.thirdCountry}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <ChoiceCard
                      selected={!system.transfersOutsideEea}
                      title={t.interview.no}
                      onClick={() =>
                        patchSystem(system.id, {
                          transfersOutsideEea: false,
                          transferMechanism: "none",
                        })
                      }
                    />
                    <ChoiceCard
                      selected={system.transfersOutsideEea}
                      title={t.interview.yes}
                      onClick={() =>
                        patchSystem(system.id, {
                          transfersOutsideEea: true,
                          transferMechanism:
                            system.transferMechanism === "none" ? "sccs" : system.transferMechanism,
                        })
                      }
                    />
                  </div>
                </div>
                {system.transfersOutsideEea ? (
                  <SelectField
                    label={t.interview.thirdCountryBasis}
                    value={system.transferMechanism}
                    onChange={(e) =>
                      patchSystem(system.id, {
                        transferMechanism: e.target.value as TransferMechanism,
                        transfersOutsideEea: true,
                      })
                    }
                  >
                    {TRANSFER_OPTIONS.filter((option) => option.value !== "none").map((option) => (
                      <option key={option.value} value={option.value}>
                        {t.transfers[option.value].label}
                      </option>
                    ))}
                  </SelectField>
                ) : null}
                <TextArea
                  label={t.interview.extraNotes}
                  value={systemNotes(locale, system)}
                  onChange={(e) => patchSystem(system.id, { hostingNotes: e.target.value })}
                  className="min-h-[140px]"
                />
              </div>
            </article>
          ))}
        </div>
      </>
    );
  }

  function ActivitiesStep({
    openActivity,
    setOpenActivity,
    applySuggestedActivities,
    patchActivity,
  }: {
    openActivity: string | null;
    setOpenActivity: (id: string | null) => void;
    applySuggestedActivities: () => void;
    patchActivity: (id: string, patch: Partial<ProcessingActivity>) => void;
  }) {
    const used = new Set(workspace.activities.map((a) => a.catalogId));
    return (
      <>
        <Tip>{t.interview.activitiesTip}</Tip>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={applySuggestedActivities}>
            {t.interview.suggestFromTools}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const created = createCustomActivity();
              created.name = t.interview.newActivity;
              update({ activities: [...workspace.activities, created] });
              setOpenActivity(created.id);
            }}
          >
            {t.interview.addBlank}
          </Button>
        </div>
        <div>
          <p className="mb-2 text-[13px] font-medium text-muted">{t.interview.commonForSmes}</p>
          <div className="flex flex-wrap gap-1.5">
            {ACTIVITY_TEMPLATES.map((template) => (
              <Chip
                key={template.id}
                selected={used.has(template.id)}
                onClick={() => {
                  const existing = workspace.activities.find((a) => a.catalogId === template.id);
                  if (existing) {
                    update({
                      activities: workspace.activities.filter((a) => a.id !== existing.id),
                    });
                    return;
                  }
                  const created = activityFromCatalog(template.id, workspace.systems);
                  update({ activities: [...workspace.activities, created] });
                  setOpenActivity(created.id);
                }}
              >
                {t.activityCopy[template.id]?.name ?? template.name}
              </Chip>
            ))}
          </div>
        </div>
        {workspace.activities.map((activity) => (
          <details
            key={activity.id}
            open={openActivity === activity.id}
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) setOpenActivity(activity.id);
            }}
            className="rounded-xl border border-line bg-raised px-4 py-3"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-ink">{activityName(locale, activity)}</div>
                  <div className="text-[12.5px] text-muted">
                    {activity.legalBases.length
                      ? activity.legalBases.map((b) => t.legalBasis[b]?.label).join(" · ")
                      : t.interview.basisNotSet}
                    {activity.retention
                      ? ` · ${t.interview.retentionSet}`
                      : ` · ${t.interview.addRetention}`}
                  </div>
                </div>
                <button
                  type="button"
                  className="text-[13px] text-muted hover:text-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    update({
                      activities: workspace.activities.filter((item) => item.id !== activity.id),
                    });
                  }}
                >
                  {t.interview.remove}
                </button>
              </div>
            </summary>
            <div className="mt-4 grid gap-4 border-t border-line pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label={t.interview.name}
                  value={activityName(locale, activity)}
                  onChange={(e) => patchActivity(activity.id, { name: e.target.value })}
                />
                <TextField
                  label={t.interview.department}
                  value={activityText(locale, activity, "department")}
                  onChange={(e) => patchActivity(activity.id, { department: e.target.value })}
                />
              </div>
              <TextArea
                label={t.interview.purpose}
                hint={t.interview.purposeHint}
                value={activityText(locale, activity, "purpose")}
                onChange={(e) => patchActivity(activity.id, { purpose: e.target.value })}
              />
              <div>
                <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.whose}</p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set([...DATA_SUBJECT_OPTIONS, ...activity.dataSubjects])).map(
                    (item) => (
                      <Chip
                        key={item}
                        selected={activity.dataSubjects.includes(item)}
                        onClick={() =>
                          patchActivity(activity.id, {
                            dataSubjects: toggleValue(activity.dataSubjects, item),
                          })
                        }
                      >
                        {subjectLabel(locale, item)}
                      </Chip>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.whatData}</p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set([...DATA_TYPE_OPTIONS, ...activity.personalData])).map(
                    (item) => (
                      <Chip
                        key={item}
                        selected={activity.personalData.includes(item)}
                        onClick={() =>
                          patchActivity(activity.id, {
                            personalData: toggleValue(activity.personalData, item),
                          })
                        }
                      >
                        {dataLabel(locale, item)}
                      </Chip>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.howSensitive}</p>
                <div className="grid gap-2">
                  {SENSITIVITY_OPTIONS.map((option) => (
                    <ChoiceCard
                      key={option.value}
                      selected={activity.sensitivity.includes(option.value)}
                      title={t.sensitivity[option.value].label}
                      hint={t.sensitivity[option.value].hint}
                      onClick={() =>
                        patchActivity(activity.id, {
                          sensitivity: toggleValue(
                            activity.sensitivity,
                            option.value as DataSensitivity,
                          ),
                        })
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.legalBasis}</p>
                <div className="grid gap-2">
                  {LEGAL_BASIS_OPTIONS.map((option) => (
                    <ChoiceCard
                      key={option.value}
                      selected={activity.legalBases.includes(option.value)}
                      title={t.legalBasis[option.value].label}
                      hint={t.legalBasis[option.value].hint}
                      onClick={() =>
                        patchActivity(activity.id, {
                          legalBases: toggleValue(activity.legalBases, option.value as LegalBasis),
                        })
                      }
                    />
                  ))}
                </div>
              </div>
              <TextArea
                label={t.interview.basisNote}
                value={activityText(locale, activity, "legalBasisNotes")}
                onChange={(e) => patchActivity(activity.id, { legalBasisNotes: e.target.value })}
              />
              <div>
                <p className="mb-2 text-[13px] font-medium text-ink">{t.interview.systemsForActivity}</p>
                <div className="flex flex-wrap gap-1.5">
                  {workspace.systems.length === 0 ? (
                    <p className="text-[13px] text-muted">{t.interview.addToolsFirst}</p>
                  ) : (
                    workspace.systems.map((system) => (
                      <Chip
                        key={system.id}
                        selected={activity.systemIds.includes(system.id)}
                        onClick={() =>
                          patchActivity(activity.id, {
                            systemIds: toggleValue(activity.systemIds, system.id),
                          })
                        }
                      >
                        {system.name}
                      </Chip>
                    ))
                  )}
                </div>
              </div>
              <TextArea
                label={t.interview.whoReceives}
                hint={t.interview.whoReceivesHint}
                value={activity.recipients.join("\n")}
                onChange={(e) =>
                  patchActivity(activity.id, {
                    recipients: e.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <ChoiceCard
                  selected={!activity.transfersOutsideEea}
                  title={t.interview.staysEea}
                  onClick={() =>
                    patchActivity(activity.id, {
                      transfersOutsideEea: false,
                      transferMechanism: "none",
                    })
                  }
                />
                <ChoiceCard
                  selected={activity.transfersOutsideEea}
                  title={t.interview.leavesEea}
                  onClick={() =>
                    patchActivity(activity.id, {
                      transfersOutsideEea: true,
                      transferMechanism:
                        activity.transferMechanism === "none" ? "sccs" : activity.transferMechanism,
                    })
                  }
                />
              </div>
              {activity.transfersOutsideEea ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label={t.interview.whereGoes}
                    value={activityText(locale, activity, "transferCountries")}
                    onChange={(e) =>
                      patchActivity(activity.id, { transferCountries: e.target.value })
                    }
                    placeholder={t.interview.whereGoesPlaceholder}
                  />
                  <SelectField
                    label={t.interview.transferSafeguard}
                    value={activity.transferMechanism}
                    onChange={(e) =>
                      patchActivity(activity.id, {
                        transferMechanism: e.target.value as TransferMechanism,
                      })
                    }
                  >
                    {TRANSFER_OPTIONS.filter((o) => o.value !== "none").map((option) => (
                      <option key={option.value} value={option.value}>
                        {t.transfers[option.value].label}
                      </option>
                    ))}
                  </SelectField>
                </div>
              ) : null}
              <TextArea
                label={t.interview.howLong}
                hint={t.interview.howLongHint}
                value={activityText(locale, activity, "retention")}
                onChange={(e) => patchActivity(activity.id, { retention: e.target.value })}
              />
            </div>
          </details>
        ))}
      </>
    );
  }

  function ProtectionStep() {
    return (
      <>
        <Tip>{t.interview.protectionTip}</Tip>
        <div className="grid gap-2">
          {workspace.toms.map((tom) => {
            const copy = tomCopy(locale, tom);
            return (
            <ChoiceCard
              key={tom.id}
              selected={tom.enabled}
              title={copy.label}
              hint={copy.description}
              onClick={() =>
                update({
                  toms: workspace.toms.map((item) =>
                    item.id === tom.id ? { ...item, enabled: !item.enabled } : item,
                  ),
                })
              }
            />
            );
          })}
        </div>
      </>
    );
  }

  function ReviewStep({
    score,
    items,
    onFinish,
  }: {
    score: number;
    items: { id: string; label: string; done: boolean; hint: string }[];
    onFinish: () => void;
  }) {
    const missing = items.filter((item) => !item.done);
    return (
      <>
        <div className="flex items-end justify-between gap-6 rounded-2xl border border-line bg-raised px-6 py-5">
          <div>
            <p className="text-[13px] text-muted">{t.interview.readyForExport}</p>
            <p className="font-serif text-[40px] leading-none text-ink">{score}%</p>
            <p className="mt-2 text-[14px] text-ink-soft">
              {missing.length === 0
                ? t.interview.allFilled
                : fill(t.interview.stillUseful, { count: missing.length })}
            </p>
          </div>
        </div>
        {missing.length > 0 ? (
          <ul className="space-y-2 text-[14px]">
            {missing.map((item) => (
              <li key={item.id} className="rounded-lg border border-warn-soft bg-warn-soft/40 px-3 py-2">
                <span className="font-medium text-ink">
                  {t.completeness[item.id]?.label ?? item.label}
                </span>
                <span className="block text-[12.5px] text-muted">
                  {t.completeness[item.id]?.hint ?? item.hint}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => downloadPdf(workspace, locale, score)}>{t.interview.downloadPdf}</Button>
          <Button variant="secondary" onClick={() => downloadMarkdown(workspace)}>
            {t.interview.downloadMarkdown}
          </Button>
          <Button variant="secondary" onClick={onFinish}>
            {t.interview.goWorkspace}
          </Button>
        </div>
        <p className="text-[13px] leading-5 text-muted">{t.interview.reviewNext}</p>
      </>
    );
  }
}
