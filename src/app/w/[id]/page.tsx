"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWorkspace } from "@/lib/storage";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button } from "@/components/ui";

export default function SharedWorkspacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { replace } = useWorkspace();
  const [status, setStatus] = useState("Opening shared workspace…");

  useEffect(() => {
    const id = params.id;
    if (!id) return;
    void fetchWorkspace(id).then((remote) => {
      if (!remote) {
        setStatus("This share link was not found on the server. Ask the owner to publish it again.");
        return;
      }
      replace(remote);
      router.replace("/workspace");
    });
  }, [params.id, replace, router]);

  return (
    <div className="grid min-h-full place-items-center bg-paper px-5">
      <div className="max-w-md text-center">
        <p className="font-serif text-[28px]">TrustLog</p>
        <p className="mt-3 text-[15px] leading-7 text-ink-soft">{status}</p>
        {status.startsWith("This share") ? (
          <Button className="mt-6" onClick={() => router.push("/")}>
            Go home
          </Button>
        ) : null}
      </div>
    </div>
  );
}
