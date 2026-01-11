"use client";

import React, { useEffect } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { audit } from "@/lib/audit";

export function Page({ title, children }: { title: string; children: React.ReactNode }) {
  useEffect(() => {
    audit("VIEW_PAGE", { title }).catch(() => {});
  }, [title]);

  return (
    <div className="flex flex-col gap-6">
      <Topbar title={title} />
      <div>{children}</div>
    </div>
  );
}
