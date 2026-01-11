import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function InsightPanel({
  title,
  status,
  holat,
  qonuniyAsos,
  oqibatXavf,
  citations
}: {
  title: string;
  status?: "OK" | "BASIS_MISSING" | "PARTIAL";
  holat: string;
  qonuniyAsos: string;
  oqibatXavf: string;
  citations?: Array<{ citation_label: string }>;
}) {
  const tone = status === "OK" ? "ok" : status === "BASIS_MISSING" ? "med" : "neutral";
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold">{title}</div>
        {status ? <Badge tone={tone}>{status}</Badge> : null}
      </div>

      <div className="mt-3 grid gap-3 text-sm">
        <div className="rounded-2xl border border-slate-200 bg-white/60 p-3">
          <div className="text-xs font-semibold">HOLAT</div>
          <div className="mt-1 muted whitespace-pre-wrap">{holat}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/60 p-3">
          <div className="text-xs font-semibold">QONUNIY ASOS</div>
          <div className="mt-1 muted whitespace-pre-wrap">{qonuniyAsos}</div>
          {citations?.length ? (
            <div className="mt-2 text-[11px] muted">
              Citations: {citations.map((c) => c.citation_label).join(" • ")}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/60 p-3">
          <div className="text-xs font-semibold">OQIBAT / XAVF</div>
          <div className="mt-1 muted whitespace-pre-wrap">{oqibatXavf}</div>
          <div className="mt-2 text-[11px] muted">
            Eslatma: Bu maslahat xarakterida. Buxgalter/yurist bilan tasdiqlang.
          </div>
        </div>
      </div>
    </Card>
  );
}
