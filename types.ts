export type AgentName =
  | "SALES"
  | "MARKETING"
  | "CASHFLOW"
  | "TAX"
  | "COMPLIANCE"
  | "CYBER"
  | "COMPANY_BRAIN";

export type RiskLevel = "LOW" | "MED" | "HIGH";

export type Role = "ANALYST" | "OPERATOR" | "ADMIN" | "OWNER";

export type LegalBasis = {
  legal_source_id: string;
  citation_label: string;
  article?: string;
  paragraph?: string;
  clause?: string;
};

export type AgentSignal<TInsight = unknown> = {
  id: string;
  agent: AgentName;
  title: string;
  created_at: string;
  riskLevel: RiskLevel;
  confidence: number;
  why: string[];
  insight: TInsight;
  legal_basis?: LegalBasis[];
};

export type ThreeSectionChat = {
  HOLAT: string;
  QONUNIY_ASOS: string;
  OQIBAT_XAVF: string;
  citations?: LegalBasis[];
  disclaimer: string;
};
