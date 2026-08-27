"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createWorkspace } from "@/lib/workspace";
import {
  getEditorSnapshot,
  getReadySnapshot,
  getServerEditorSnapshot,
  getServerReadySnapshot,
  getServerWorkspaceSnapshot,
  getWorkspaceSnapshot,
  subscribeStore,
  writeEditorName,
  writeWorkspace,
} from "@/lib/store";
import type { Workspace } from "@/lib/types";

interface WorkspaceContextValue {
  ready: boolean;
  workspace: Workspace;
  editorName: string;
  setEditorName: (name: string) => void;
  update: (patch: Partial<Workspace> | ((current: Workspace) => Workspace)) => void;
  replace: (next: Workspace) => void;
  reset: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const workspace = useSyncExternalStore(
    subscribeStore,
    getWorkspaceSnapshot,
    getServerWorkspaceSnapshot,
  );
  const editorName = useSyncExternalStore(
    subscribeStore,
    getEditorSnapshot,
    getServerEditorSnapshot,
  );
  const ready = useSyncExternalStore(subscribeStore, getReadySnapshot, getServerReadySnapshot);

  const update = useCallback(
    (patch: Partial<Workspace> | ((current: Workspace) => Workspace)) => {
      const current = getWorkspaceSnapshot();
      const next = typeof patch === "function" ? patch(current) : { ...current, ...patch };
      writeWorkspace({
        ...next,
        updatedAt: new Date().toISOString(),
        updatedBy: getEditorSnapshot(),
      });
    },
    [],
  );

  const replace = useCallback((next: Workspace) => {
    writeWorkspace(next, { skipPush: true });
  }, []);

  const reset = useCallback(() => {
    writeWorkspace(createWorkspace(), { skipPush: true });
  }, []);

  const setEditorName = useCallback((name: string) => {
    writeEditorName(name);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      workspace,
      editorName,
      setEditorName,
      update,
      replace,
      reset,
    }),
    [ready, workspace, editorName, setEditorName, update, replace, reset],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
