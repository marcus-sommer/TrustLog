"use client";

import { useState } from "react";
import { createId } from "@/lib/ids";
import { pushWorkspace } from "@/lib/storage";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button, TextField, Tip } from "@/components/ui";
import type { CollaboratorRole } from "@/lib/types";

export default function TeamPage() {
  const { workspace, update, editorName, setEditorName, ready } = useWorkspace();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CollaboratorRole>("editor");
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window === "undefined"
      ? `/w/${workspace.id}`
      : `${window.location.origin}/w/${workspace.id}`;

  if (!ready) return <p className="text-muted">Loading…</p>;

  async function publishAndCopy() {
    await pushWorkspace({
      ...workspace,
      updatedAt: new Date().toISOString(),
      updatedBy: editorName,
    });
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function addMember() {
    if (!name.trim()) return;
    update({
      collaborators: [
        ...workspace.collaborators,
        {
          id: createId("col"),
          name: name.trim(),
          email: email.trim(),
          role,
        },
      ],
    });
    setName("");
    setEmail("");
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          Collaborative editing
        </p>
        <h1 className="mt-2 font-serif text-[32px] tracking-tight">Team</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink-soft">
          Add the people who should help keep the record honest — typically finance, HR, and whoever
          buys the software. Share the link so they open the same workspace.
        </p>
      </div>

      <Tip>
        There is no login. Anyone with the link can open this record on a computer that can reach
        this TrustLog instance. Say who you are below so edits are labelled.
      </Tip>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="You are editing as"
          value={editorName}
          onChange={(e) => setEditorName(e.target.value)}
        />
        <div className="grid gap-1.5">
          <span className="text-[13px] font-medium">Share link</span>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="h-11 flex-1 rounded-lg border border-line bg-raised px-3 text-[13px]"
            />
            <Button onClick={() => void publishAndCopy()}>
              {copied ? "Copied" : "Publish & copy"}
            </Button>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-line rounded-2xl border border-line bg-raised">
        {workspace.collaborators.map((person) => (
          <li key={person.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <div className="text-[14px] font-medium">{person.name}</div>
              <div className="text-[12.5px] text-muted">
                {person.email || "No email"} · {person.role}
              </div>
            </div>
            {person.role !== "owner" ? (
              <button
                type="button"
                className="text-[13px] text-muted hover:text-danger"
                onClick={() =>
                  update({
                    collaborators: workspace.collaborators.filter((item) => item.id !== person.id),
                  })
                }
              >
                Remove
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <section className="max-w-xl space-y-4">
        <h2 className="font-serif text-[22px]">Add a colleague</h2>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="grid gap-1.5">
          <span className="text-[13px] font-medium">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as CollaboratorRole)}
            className="h-11 rounded-lg border border-line bg-raised px-3"
          >
            <option value="editor">Editor</option>
            <option value="viewer">Viewer (listed only)</option>
          </select>
        </label>
        <Button onClick={addMember}>Add to workspace</Button>
      </section>
    </div>
  );
}
