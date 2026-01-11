import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function KpiCard({
  title,
  value,
  sub,
  tone = "neutral",
  className
}: {
  title: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "low" | "med" | "high" | "ok";
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm muted">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          {sub ? <div className="mt-1 text-xs muted">{sub}</div> : null}
        </div>
        <Badge tone={tone}>{tone.toUpperCase()}</Badge>
      </div>
    </Card>
  );
}
