import { apiPost } from "./api";

export async function audit(action: string, payload?: unknown) {
  try {
    await apiPost("/api/v1/audit", { action, payload });
  } catch {
    // do not block UI
  }
}
