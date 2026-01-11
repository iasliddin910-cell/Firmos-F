# Firmos — Frontend Advanced+ (Calm UI + 3D + Animations)

This ZIP is a **fully working** Next.js frontend for the Firmos product:
- Calm “anti-stress” UI (glass + gradient + subtle noise)
- Smooth animations (Framer Motion)
- Lightweight “3D” background (CSS 3D parallax orbs; no GPU-heavy WebGL required)
- Full dashboard IA: Overview, Sales, Marketing, Cashflow, Tax, Compliance, Cybersecurity, Company Brain
- Admin: Legal Sources Registry, Integrations Center
- Built-in **local mock API** via Next Route Handlers under `/api/v1/*` so the UI works immediately.

## Run (recommended)
Requirements: Node 18+ (Node 20/22 works), pnpm

```bash
pnpm install
pnpm dev
```

Open:
- http://localhost:3000

## Connect to a real backend later
Set:
- `NEXT_PUBLIC_API_BASE=http://localhost:4000`

Then the frontend will call that API instead of local mocks.

## Demo auth (localStorage)
Login page allows selecting role:
- OWNER / ADMIN / OPERATOR / ANALYST

This sets headers for API calls:
- x-role, x-actor-id, x-org-id

## Notes
- This is frontend-only. “Integrations” are represented as connectors UI + test flows.
- For production integrations (bank/payments/ads/marketplaces), a backend is required.

