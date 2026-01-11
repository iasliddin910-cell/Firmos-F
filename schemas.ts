import { z } from "zod";

export const RiskLevelSchema = z.enum(["LOW", "MED", "HIGH"]);
export const RoleSchema = z.enum(["ANALYST", "OPERATOR", "ADMIN", "OWNER"]);
export const AgentNameSchema = z.enum(["SALES", "MARKETING", "CASHFLOW", "TAX", "COMPLIANCE", "CYBER", "COMPANY_BRAIN"]);

export const LegalBasisSchema = z.object({
  legal_source_id: z.string(),
  citation_label: z.string(),
  article: z.string().optional(),
  paragraph: z.string().optional(),
  clause: z.string().optional()
});

export const AgentSignalSchema = z.object({
  id: z.string(),
  agent: AgentNameSchema,
  title: z.string(),
  created_at: z.string(),
  riskLevel: RiskLevelSchema,
  confidence: z.number().min(0).max(1),
  why: z.array(z.string()),
  insight: z.unknown(),
  legal_basis: z.array(LegalBasisSchema).optional()
});

export const ThreeSectionChatSchema = z.object({
  HOLAT: z.string(),
  QONUNIY_ASOS: z.string(),
  OQIBAT_XAVF: z.string(),
  citations: z.array(LegalBasisSchema).optional(),
  disclaimer: z.string()
});
