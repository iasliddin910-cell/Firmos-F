"use client";

import { useEffect, useMemo, useState } from "react";
import type { Role } from "@firmos/shared";

const LS_ROLE = "firmos_role";
const LS_ACTOR = "firmos_actor_id";
const LS_ORG = "firmos_org_id";

function readLS(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) || fallback;
}

export function setAuthLocal(role: Role, actorId: string, orgId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_ROLE, role);
  window.localStorage.setItem(LS_ACTOR, actorId);
  window.localStorage.setItem(LS_ORG, orgId);
}

export function clearAuthLocal() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LS_ROLE);
  window.localStorage.removeItem(LS_ACTOR);
  window.localStorage.removeItem(LS_ORG);
}

export function useAuth() {
  const [role, setRole] = useState<Role>("OWNER");
  const [actorId, setActorId] = useState<string>("user-1");
  const [orgId, setOrgId] = useState<string>("default-org");

  useEffect(() => {
    setRole(readLS(LS_ROLE, "OWNER") as Role);
    setActorId(readLS(LS_ACTOR, "user-1"));
    setOrgId(readLS(LS_ORG, "default-org"));
  }, []);

  const apiHeaders = useMemo(
    () => ({ "x-role": role, "x-actor-id": actorId, "x-org-id": orgId }),
    [role, actorId, orgId]
  );

  function logout() {
    clearAuthLocal();
    if (typeof window !== "undefined") window.location.href = "/login";
  }

  return { role, actorId, orgId, apiHeaders, setRole, setActorId, setOrgId, logout };
}
