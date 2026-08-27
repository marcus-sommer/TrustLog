"use client";

import { useState } from "react";
import { addMonths, createId, todayIso } from "@/lib/ids";
import { downloadIcs, dueLabel, dueState } from "@/lib/ics";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button, TextArea, TextField } from "@/components/ui";
import type { Reminder } from "@/lib/types";

export default function RemindersPage() {
  const { workspace, update, ready } = useWorkspace();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(addMonths(todayIso(), 3));
  const [notes, setNotes] = useState("");
  const [notifyStatus, setNotifyStatus] = useState("");

  if (!ready) return <p className="text-muted">Loading…</p>;

  function addReminder() {
    if (!title.trim()) return;
    const reminder: Reminder = {
      id: createId("rem"),
      title: title.trim(),
      type: "custom",
      dueDate,
      notes,
    };
    update({ reminders: [...workspace.reminders, reminder] });
    setTitle("");
    setNotes("");
  }

  function complete(reminder: Reminder) {
    const nextDue =
      reminder.type === "annual_review"
        ? addMonths(todayIso(), 12)
        : reminder.type === "processor_review"
          ? addMonths(todayIso(), 6)
          : reminder.dueDate;
    update({
      reminders: workspace.reminders.map((item) =>
        item.id === reminder.id
          ? reminder.type === "custom"
            ? { ...item, completedAt: todayIso() }
            : { ...item, completedAt: undefined, dueDate: nextDue }
          : item,
      ),
    });
  }

  async function enableNotifications() {
    if (!("Notification" in window)) {
      setNotifyStatus("This browser does not support notifications.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setNotifyStatus("Notifications were not allowed.");
      return;
    }
    const dueSoon = workspace.reminders.filter((r) => {
      const state = dueState(r.dueDate, r.completedAt);
      return state === "overdue" || state === "soon";
    });
    if (dueSoon[0]) {
      new Notification("TrustLog compliance reminder", {
        body: `${dueSoon[0].title} · ${dueLabel(dueSoon[0].dueDate, dueSoon[0].completedAt)}`,
      });
    }
    setNotifyStatus("Reminders can now appear in this browser when you open TrustLog.");
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          Keep the record current
        </p>
        <h1 className="mt-2 font-serif text-[32px] tracking-tight">Audit reminders</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink-soft">
          A RoPA goes stale when a new tool is added and nobody updates the file. Set dates, add
          them to your calendar, and optionally allow browser notifications on this device.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => void enableNotifications()}>
          Allow browser reminders
        </Button>
        {notifyStatus ? <p className="self-center text-[13px] text-muted">{notifyStatus}</p> : null}
      </div>

      <ul className="space-y-2">
        {workspace.reminders.map((reminder) => {
          const state = dueState(reminder.dueDate, reminder.completedAt);
          return (
            <li
              key={reminder.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line bg-raised px-4 py-4"
            >
              <div>
                <div className="font-medium">{reminder.title}</div>
                <div
                  className={`mt-1 text-[13px] ${
                    state === "overdue"
                      ? "text-danger"
                      : state === "soon"
                        ? "text-warn"
                        : "text-muted"
                  }`}
                >
                  {dueLabel(reminder.dueDate, reminder.completedAt)}
                </div>
                {reminder.notes ? (
                  <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-ink-soft">
                    {reminder.notes}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => downloadIcs(reminder, workspace.organization.name)}
                >
                  Add to calendar
                </Button>
                {!reminder.completedAt ? (
                  <Button variant="ghost" onClick={() => complete(reminder)}>
                    {reminder.type === "custom" ? "Mark done" : "Complete & reschedule"}
                  </Button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <section className="max-w-xl space-y-4 rounded-2xl border border-line bg-raised p-5">
        <h2 className="font-serif text-[22px]">Custom reminder</h2>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField
          label="Due date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <TextArea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <Button onClick={addReminder}>Add reminder</Button>
      </section>
    </div>
  );
}