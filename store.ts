import fs from "node:fs";
import path from "node:path";

export type LocalDb = {
  audit_logs: Array<any>;
  legal_sources: Array<any>;
  tax_documents: Array<any>;
  tax_guidance_templates: Record<string, { steps: string[]; warnings: string[] }>;
  signals: Array<any>;
  company_brain: {
    decisions: Array<any>;
    conflicts: Array<any>;
    priority: Array<any>;
  };
  integrations: Record<string, any>;
};

const DATA_DIR = path.join(process.cwd(), ".local-data");
const DATA_PATH = path.join(DATA_DIR, "firmos.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadDb(): LocalDb {
  ensureDir();
  if (!fs.existsSync(DATA_PATH)) {
    const initial = seedDb();
    fs.writeFileSync(DATA_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as LocalDb;
}

export function saveDb(db: LocalDb) {
  ensureDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function seedDb(): LocalDb {
  const now = new Date().toISOString();
  const legal_sources = [
    {
      id: id("LS"),
      jurisdiction: "UZ",
      source_type: "TAX_CODE",
      title: "Soliq kodeksi (demo): QQS majburiyati threshold",
      reference_code: "VAT_THRESHOLD",
      effective_from: "2025-01-01",
      effective_to: null,
      text_content: "Bu demo matn. Production’da Lex.uz’dan rasmiy matn qo‘yiladi.",
      metadata_json: { threshold_12m_turnover: 1000000000 }
    }
  ];

  const signals = [
    {
      id: id("SIG"),
      agent: "CYBER",
      title: "Data leak risk: tunda katta eksport",
      created_at: now,
      riskLevel: "HIGH",
      confidence: 0.78,
      why: ["Tunda 1.2GB eksport", "Oddiy ish vaqtida bunday bo‘lmagan", "IP: 203.0.113.9"],
      insight: { type: "DATA_LEAK_RISK", est_loss: 0 },
      legal_basis: []
    },
    {
      id: id("SIG"),
      agent: "CASHFLOW",
      title: "Runway 53 kun: pul bosimi kuchaymoqda",
      created_at: now,
      riskLevel: "MED",
      confidence: 0.74,
      why: ["Oxirgi 5 kun minus", "Marketing spend yuqori", "Leads to‘lovga bormayapti"],
      insight: { type: "RUNWAY", days: 53 },
      legal_basis: []
    }
  ];

  const company_brain = {
    conflicts: [
      {
        id: "C_001",
        description: "Marketing 60% chegirma taklif qildi, Compliance esa cheklov borligini aytyapti.",
        involved_agents: ["MARKETING", "COMPLIANCE"],
        severity: "HIGH"
      }
    ],
    decisions: [],
    priority: [
      { id: "P1", title: "Cyber incident risk", money_impact: "HIGH", risk: "HIGH", agent: "CYBER" },
      { id: "P2", title: "Runway short", money_impact: "MED", risk: "MED", agent: "CASHFLOW" }
    ]
  };

  const tax_guidance_templates = {
    QQS_REPORT: {
      steps: ["Soliq kabinetiga kiring (o‘zingiz).", "Hisobotlar → QQS bo‘limini oching.", "Davrni tanlang va summa/rekvizitlarni tekshiring."],
      warnings: ["Agent login qilmaydi.", "Agent imzo qo‘ymaydi.", "Yuborishdan oldin buxgalter bilan tekshiring."]
    },
    TURNOVER_CHECK: {
      steps: ["Aylanma bo‘limini oching.", "Oxirgi 12 oy aylanmani ko‘ring.", "QQS threshold bilan solishtiring."],
      warnings: ["Raqamlar hujjatlar bilan mos bo‘lishi kerak."]
    }
  };

  return {
    audit_logs: [],
    legal_sources,
    tax_documents: [],
    tax_guidance_templates,
    signals,
    company_brain,
    integrations: {}
  };
}

export function makeId(prefix: string) {
  return id(prefix);
}
