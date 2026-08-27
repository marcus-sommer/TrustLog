import type { Workspace } from "./types";

const LOCAL_KEY = "trustlog.workspace";
const EDITOR_KEY = "trustlog.editorName";

export function loadLocalWorkspace(): Workspace | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Workspace;
  } catch {
    return null;
  }
}

export function saveLocalWorkspace(workspace: Workspace): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(workspace));
}

export function clearLocalWorkspace(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_KEY);
}

export function loadEditorName(): string {
  if (typeof window === "undefined") return "You";
  return localStorage.getItem(EDITOR_KEY) || "You";
}

export function saveEditorName(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(EDITOR_KEY, name.trim() || "You");
}

export async function fetchWorkspace(id: string): Promise<Workspace | null> {
  try {
    const response = await fetch(`/api/workspaces/${id}`);
    if (!response.ok) return null;
    return (await response.json()) as Workspace;
  } catch {
    return null;
  }
}

export async function pushWorkspace(workspace: Workspace): Promise<void> {
  try {
    await fetch(`/api/workspaces/${workspace.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workspace),
    });
  } catch {
    // Local save still applies if the share server is unavailable.
  }
}
