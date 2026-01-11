"use client";

import React, { useMemo, useState } from "react";
import { Page } from "@/components/Page";
import { Tabs } from "@/components/ui/tabs";
import { Section } from "@/components/blocks/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { apiGet, apiPost, apiUploadFile } from "@/lib/api";
import { InsightPanel } from "@/components/tax/InsightPanel";
import { Badge } from "@/components/ui/badge";

type TabKey =
  | "summary"
  | "upload"
  | "regime"
  | "penalty"
  | "vat"
  | "overpayment"
  | "deductibility"
  | "vat-exit"
  | "what-if"
  | "cabinet"
  | "report"
  | "chat";

export default function TaxPage() {
  const [tab, setTab] = useState<TabKey>("summary");

  const summaryQ = useQuery({
    queryKey: ["tax", "summary"],
    queryFn: async () => apiGet("/api/v1/agents/tax/insights/summary")
  });

  const docQ = useQuery({
    queryKey: ["tax", "documents"],
    queryFn: async () => apiGet("/api/v1/agents/tax/documents")
  });

  const tabs = useMemo(
    () => [
      { key: "summary", label: "Summary" },
      { key: "upload", label: "Uploads" },
      { key: "regime", label: "Regime" },
      { key: "penalty", label: "Penalty" },
      { key: "vat", label: "VAT" },
      { key: "overpayment", label: "Overpayment" },
      { key: "deductibility", label: "Deductibility" },
      { key: "vat-exit", label: "VAT Exit (Sim)" },
      { key: "what-if", label: "What‑if" },
      { key: "cabinet", label: "Cabinet Guidance" },
      { key: "report", label: "Report Prep" },
      { key: "chat", label: "Chat" }
    ],
    []
  );

  return (
    <Page title="Tax Optimizer">
      <Tabs tabs={tabs as any} value={tab} onChange={(v) => setTab(v as TabKey)} />

      {tab === "summary" ? <TaxSummary data={summaryQ.data} /> : null}
      {tab === "upload" ? <TaxUploads documents={docQ.data?.documents || []} onRefresh={() => docQ.refetch()} /> : null}
      {tab === "regime" ? <TaxInsight endpoint="/api/v1/agents/tax/insights/regime" title="Tax Regime Validator" /> : null}
      {tab === "penalty" ? <TaxInsight endpoint="/api/v1/agents/tax/insights/penalty-risk" title="Penalty Risk Scanner" /> : null}
      {tab === "vat" ? <TaxInsight endpoint="/api/v1/agents/tax/insights/vat-obligation" title="VAT Obligation Monitor" /> : null}
      {tab === "overpayment" ? <TaxInsight endpoint="/api/v1/agents/tax/insights/overpayment" title="Overpayment Finder" /> : null}
      {tab === "deductibility" ? <TaxInsight endpoint="/api/v1/agents/tax/insights/deductibility" title="Expense Deductibility Audit" /> : null}
      {tab === "vat-exit" ? <VatExitSim /> : null}
      {tab === "what-if" ? <WhatIfSim /> : null}
      {tab === "cabinet" ? <CabinetGuidance /> : null}
      {tab === "report" ? <ReportPrep documents={docQ.data?.documents || []} /> : null}
      {tab === "chat" ? <TaxChat /> : null}
    </Page>
  );
}

function TaxSummary({ data }: { data: any }) {
  const k = data?.kpis || {};
  return (
    <Section title="Summary" subtitle="Tax Optimizer advisory only (no submit / no sign / no login)">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm muted">Basis coverage</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-2xl font-semibold">{k.basis_coverage ?? "—"}</div>
            <Badge tone="neutral">OFFICIAL ONLY</Badge>
          </div>
          <div className="mt-2 text-xs muted">Legal sources registry bo‘lmasa hisoblash cheklanadi.</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm muted">Risk signals</div>
          <div className="mt-1 text-2xl font-semibold">{k.risks ?? 0}</div>
          <div className="mt-2 text-xs muted">Jarima / rejim / QQS majburiyati signallari.</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm muted">Documents</div>
          <div className="mt-1 text-2xl font-semibold">{k.documents ?? 0}</div>
          <div className="mt-2 text-xs muted">PDF/XLSX/CSV upload + manual fallback.</div>
        </Card>
      </div>
    </Section>
  );
}

function TaxInsight({ endpoint, title }: { endpoint: string; title: string }) {
  const q = useQuery({
    queryKey: ["tax", endpoint],
    queryFn: async () => apiGet(endpoint)
  });
  const d = q.data || {};
  return (
    <Section title={title} subtitle="Har insight: HOLAT / QONUNIY ASOS / OQIBAT-XAVF">
      <InsightPanel
        title={title}
        status={d.status}
        holat={d.holat || "—"}
        qonuniyAsos={d.qonuniy_asos || "—"}
        oqibatXavf={d.oqibat_xavf || "—"}
        citations={d.citations}
      />
      {q.error ? <div className="mt-3 text-sm text-rose-700">{String(q.error)}</div> : null}
    </Section>
  );
}

function TaxUploads({ documents, onRefresh }: { documents: any[]; onRefresh: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  async function upload() {
  if (!file) return;
  await apiUploadFile("/api/v1/agents/tax/uploads", file, "file");
  setFile(null);
  onRefresh();
}

  return (
    <Section title="Upload center" subtitle="PDF/XLSX/CSV (PDF OCR yo‘q — manual fallback bor)">
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="w-full">
            <div className="text-sm font-medium mb-1">File</div>
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <div className="mt-1 text-xs muted">
              PDF parsing best-effort. Agar parse bo‘lmasa: “Manual totals entry”.
            </div>
          </div>
          <Button onClick={upload} disabled={!file}>
            Upload
          </Button>
        </div>
      </Card>

      <Section title="Documents" subtitle="Upload qilingan hujjatlar">
        <div className="grid gap-3">
          {documents.map((d) => (
            <Card key={d.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{d.filename}</div>
                  <div className="text-sm muted">
                    {d.file_type} • status: {d.parse_status} • uploaded_at: {d.uploaded_at}
                  </div>
                </div>
                <Badge tone={d.parse_status === "PARSED" ? "ok" : d.parse_status === "NEEDS_MANUAL" ? "med" : "neutral"}>
                  {d.parse_status}
                </Badge>
              </div>
            </Card>
          ))}
          {documents.length === 0 ? <div className="muted text-sm">Hozircha hujjat yo‘q.</div> : null}
        </div>
      </Section>
    </Section>
  );
}

function VatExitSim() {
  const [monthlyTurnover, setMonthlyTurnover] = useState("100000000");
  const [res, setRes] = useState<any>(null);

  async function run() {
    const r = await apiPost("/api/v1/agents/tax/insights/vat-exit/simulate", {
      monthly_turnover: Number(monthlyTurnover)
    });
    setRes(r);
  }

  return (
    <Section title="VAT Exit Simulation" subtitle="Simulyatsiya xolos (buyruq emas)">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">Monthly turnover (UZS)</div>
            <Input value={monthlyTurnover} onChange={(e) => setMonthlyTurnover(e.target.value)} />
            <div className="mt-2">
              <Button onClick={run}>Simulate</Button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-3 text-sm">
            <div className="text-xs font-semibold">Natija</div>
            <div className="mt-2 muted whitespace-pre-wrap">{res ? JSON.stringify(res, null, 2) : "—"}</div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function WhatIfSim() {
  const [scenario, setScenario] = useState(
    JSON.stringify({ change: "ACTIVITY_CODE", from: "47.91", to: "62.01" }, null, 2)
  );
  const [res, setRes] = useState<any>(null);

  async function run() {
    const r = await apiPost("/api/v1/agents/tax/what-if", { scenario: JSON.parse(scenario) });
    setRes(r);
  }

  return (
    <Section title="What‑if simulator" subtitle="Qaror oldidan oqibatni ko‘rsatadi (official basis bo‘lmasa hisoblamaydi)">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">Scenario JSON</div>
            <Textarea rows={10} value={scenario} onChange={(e) => setScenario(e.target.value)} />
            <div className="mt-2">
              <Button onClick={run}>Run</Button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-3 text-sm">
            <div className="text-xs font-semibold">Result</div>
            <div className="mt-2 muted whitespace-pre-wrap">{res ? JSON.stringify(res, null, 2) : "—"}</div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function CabinetGuidance() {
  const [topic, setTopic] = useState("QQS_REPORT");
  const [res, setRes] = useState<any>(null);

  async function run() {
    const r = await apiPost("/api/v1/agents/tax/cabinet/guidance", { topic });
    setRes(r);
  }

  return (
    <Section title="Guided Cabinet Access" subtitle="Yo‘naltirish xolos. Login / imzo / submit YO‘Q.">
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="w-full">
            <div className="text-sm font-medium mb-1">Topic</div>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
            <div className="mt-1 text-xs muted">Example: QQS_REPORT, TURNOVER_CHECK, PAYMENT_RECONCILIATION</div>
          </div>
          <Button onClick={run}>Get guidance</Button>
        </div>

        {res ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-3">
              <div className="text-xs font-semibold">Steps</div>
              <ol className="mt-2 list-decimal pl-5 text-sm muted">
                {(res.steps || []).map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-3">
              <div className="text-xs font-semibold">Warnings</div>
              <ul className="mt-2 list-disc pl-5 text-sm muted">
                {(res.warnings || []).map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Card>
    </Section>
  );
}

function ReportPrep({ documents }: { documents: any[] }) {
  const [documentId, setDocumentId] = useState("");
  const [reportType, setReportType] = useState("VAT");
  const [res, setRes] = useState<any>(null);

  async function run() {
    const r = await apiPost("/api/v1/agents/tax/reports/prepare", { document_id: documentId, report_type: reportType });
    setRes(r);
  }

  return (
    <Section title="Report Preparation" subtitle="Validate + ready flag. Submission yo‘q.">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-sm font-medium mb-1">Document</div>
            <Input
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              placeholder={documents[0]?.id || "doc-id"}
            />
            <div className="mt-1 text-xs muted">Tip: documents tab’dan ID oling.</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Report type</div>
            <Input value={reportType} onChange={(e) => setReportType(e.target.value)} placeholder="VAT / INCOME / ..." />
          </div>
          <div className="flex items-end">
            <Button onClick={run}>Prepare</Button>
          </div>
        </div>

        {res ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-3 text-sm">
            <div className="text-xs font-semibold">PreparedReport</div>
            <div className="mt-2 muted whitespace-pre-wrap">{JSON.stringify(res, null, 2)}</div>
          </div>
        ) : null}
      </Card>
    </Section>
  );
}

function TaxChat() {
  const [message, setMessage] = useState("QQSdan chiqish mumkinmi?");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    try {
      const r = await apiPost("/api/v1/agents/tax/chat", { message, context: {} });
      setResp(r);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section title="Tax Chat" subtitle="Javob har doim 3 bo‘limda: HOLAT / QONUNIY ASOS / OQIBAT-XAVF">
      <Card className="p-4">
        <div className="grid gap-3">
          <Textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={send} disabled={loading}>
              Send
            </Button>
            <Button variant="secondary" onClick={() => setMessage("Ortiqcha soliq to'lab qo'ymadikmi?")}>
              Example
            </Button>
          </div>

          {resp ? (
            <div className="grid gap-3">
              <InsightPanel
                title="Chat Response"
                status="OK"
                holat={resp.HOLAT}
                qonuniyAsos={resp.QONUNIY_ASOS}
                oqibatXavf={resp.OQIBAT_XAVF}
                citations={resp.citations}
              />
            </div>
          ) : (
            <div className="text-sm muted">Savol yozing va “Send” bosing.</div>
          )}
        </div>
      </Card>
    </Section>
  );
}
