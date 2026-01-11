import type { NextRequest } from "next/server";
import type { Role } from "@firmos/shared";

const ORDER: Record<Role, number> = {
  ANALYST: 1,
  OPERATOR: 2,
  ADMIN: 3,
  OWNER: 4
};

export function getRole(req: NextRequest): Role {
  const r = (req.headers.get("x-role") || "OWNER").toUpperCase();
  if (r === "ANALYST" || r === "OPERATOR" || r === "ADMIN" || r === "OWNER") return r;
  return "OWNER";
}

export function requireRole(req: NextRequest, min: Role) {
  const role = getRole(req);
  if (ORDER[role] < ORDER[min]) {
    return { ok: false as const, role };
  }
  return { ok: true as const, role };
}
