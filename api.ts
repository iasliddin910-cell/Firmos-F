type Headers = Record<string, string>;

function baseUrl() {
  // If NEXT_PUBLIC_API_BASE is set => use external backend
  // Else => use Next route handlers (same origin)
  const raw = process.env.NEXT_PUBLIC_API_BASE;
  if (!raw) return "";
  return raw.replace(/\/+$/, "");
}

function authHeaders(): Headers {
  if (typeof window === "undefined") return {};
  const role = localStorage.getItem("firmos_role") || "OWNER";
  const actorId = localStorage.getItem("firmos_actor_id") || "user-1";
  const orgId = localStorage.getItem("firmos_org_id") || "default-org";
  return { "x-role": role, "x-actor-id": actorId, "x-org-id": orgId };
}

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { raw: text };
  }
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) {
    const body = await parseJson(res);
    throw new Error(`GET ${path} failed: ${res.status} ${JSON.stringify(body)}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T = any>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...authHeaders() },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const b = await parseJson(res);
    throw new Error(`POST ${path} failed: ${res.status} ${JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}

export async function apiPut<T = any>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    method: "PUT",
    headers: { "content-type": "application/json", ...authHeaders() },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const b = await parseJson(res);
    throw new Error(`PUT ${path} failed: ${res.status} ${JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) {
    const b = await parseJson(res);
    throw new Error(`DELETE ${path} failed: ${res.status} ${JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}


export async function apiUploadFile<T = any>(path: string, file: File, fieldName: string = "file"): Promise<T> {
  const fd = new FormData();
  fd.append(fieldName, file);
  const res = await fetch(`${baseUrl()}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: fd
  });
  if (!res.ok) {
    const b = await parseJson(res);
    throw new Error(`UPLOAD ${path} failed: ${res.status} ${JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}
