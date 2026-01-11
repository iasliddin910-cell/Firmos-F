"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { LogOut, UserCircle2 } from "lucide-react";

export function Topbar({ title }: { title: string }) {
  const { role, actorId, orgId, logout } = useAuth();

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm muted">Role: {role} • Actor: {actorId} • Org: {orgId}</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white/60 px-3 py-2">
          <UserCircle2 size={18} />
          <span className="text-sm font-medium">{role}</span>
        </div>
        <Button variant="secondary" onClick={logout}>
          <LogOut size={16} /> Logout
        </Button>
      </div>
    </div>
  );
}
