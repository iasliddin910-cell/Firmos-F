"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
  value,
  onChange,
  className
}: {
  tabs: Array<{ key: string; label: string }>;
  value: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm border transition",
              active ? "bg-slate-900 text-white border-slate-900" : "bg-white/60 border-slate-200 hover:bg-white/80"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
