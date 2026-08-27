import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Workspace } from "@/lib/types";

const DIR = path.join(process.cwd(), "data", "workspaces");

function fileFor(id: string): string {
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(DIR, `${safe}.json`);
}

export async function readWorkspaceFile(id: string): Promise<Workspace | null> {
  try {
    const raw = await readFile(fileFor(id), "utf8");
    return JSON.parse(raw) as Workspace;
  } catch {
    return null;
  }
}

export async function writeWorkspaceFile(workspace: Workspace): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await writeFile(fileFor(workspace.id), JSON.stringify(workspace, null, 2), "utf8");
}
