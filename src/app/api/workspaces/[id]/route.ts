import { NextResponse } from "next/server";
import { readWorkspaceFile, writeWorkspaceFile } from "@/lib/server-store";
import type { Workspace } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const workspace = await readWorkspaceFile(id);
  if (!workspace) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(workspace);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Workspace;
  if (!body || body.id !== id) {
    return NextResponse.json({ error: "Workspace id mismatch" }, { status: 400 });
  }
  await writeWorkspaceFile(body);
  return NextResponse.json({ ok: true });
}
