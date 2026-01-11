import * as React from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "low" | "med" | "high" | "ok" }) {
  const tones: Record<string, string> = {
    neutral: "bg-slate-900/5 text-slate-700 border-slate-200",
    low: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    med: "bg-amber-500/10 text-amber-800 border-amber-200",
    high: "bg-rose-500/10 text-rose-700 border-rose-200",
    ok: "bg-cyan-500/10 text-cyan-700 border-cyan-200"
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
