"use client";

import { createWorkspace } from "./workspace";
import {
  loadEditorName,
  loadLocalWorkspace,
  pushWorkspace,
  saveEditorName,
  saveLocalWorkspace,
} from "./storage";
import type { Workspace } from "./types";

const serverWorkspace = createWorkspace({
  id: "ws_local",
  collaborators: [{ id: "col_you", name: "You", email: "", role: "owner" }],
  reminders: [
    {
      id: "rem_annual",
      title: "Annual RoPA review",
      type: "annual_review",
      dueDate: "2027-08-27",
      notes: "Re-read the record, add new tools, and confirm retention still matches practice.",
    },
    {
      id: "rem_processors",
      title: "Review processor list & DPAs",
      type: "processor_review",
      dueDate: "2027-02-27",
      notes: "Check that every vendor still has a signed data processing agreement.",
    },
  ],
});
let workspace: Workspace = serverWorkspace;
let editorName = "You";
let hydrated = false;
const listeners = new Set<() => void>();
let pushTimer: ReturnType<typeof setTimeout> | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  workspace = loadLocalWorkspace() ?? createWorkspace();
  editorName = loadEditorName();
  hydrated = true;
}

export function subscribeStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWorkspaceSnapshot(): Workspace {
  hydrate();
  return workspace;
}

export function getServerWorkspaceSnapshot(): Workspace {
  return serverWorkspace;
}

export function getEditorSnapshot(): string {
  hydrate();
  return editorName;
}

export function getServerEditorSnapshot(): string {
  return "You";
}

export function getReadySnapshot(): boolean {
  hydrate();
  return hydrated;
}

export function getServerReadySnapshot(): boolean {
  return false;
}

export function writeWorkspace(next: Workspace, options?: { skipPush?: boolean }) {
  workspace = next;
  saveLocalWorkspace(next);
  emit();
  if (options?.skipPush) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    void pushWorkspace(next);
  }, 600);
}

export function writeEditorName(name: string) {
  editorName = name.trim() || "You";
  saveEditorName(editorName);
  emit();
}
