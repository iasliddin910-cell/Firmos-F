"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  BrainCircuit,
  BadgeDollarSign,
  Megaphone,
  Wallet,
  Landmark,
  ShieldCheck,
  ShieldAlert,
  PlugZap,
  FileText
} from "lucide-react";

const NAV = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/company-brain", label: "Company Brain", icon: BrainCircuit },
  { href: "/dashboard/sales", label: "Sales Agent", icon: BadgeDollarSign },
  { href: "/dashboard/marketing", label: "Marketing Agent", icon: Megaphone },
  { href: "/dashboard/cashflow", label: "Cashflow Agent", icon: Wallet },
  { href: "/dashboard/tax", label: "Tax Optimizer", icon: Landmark },
  { href: "/dashboard/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/dashboard/cyber", label: "Cybersecurity", icon: ShieldAlert },
  { href: "/admin/integrations", label: "Integrations", icon: PlugZap },
  { href: "/admin/legal-sources", label: "Legal Sources", icon: FileText }
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="glass-strong soft-shadow hidden lg:flex lg:w-72 lg:flex-col lg:gap-2 lg:p-4 lg:rounded-2xl lg:h-[calc(100vh-32px)] lg:sticky lg:top-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="text-lg font-semibold">Firmos</div>
          <div className="text-xs muted">Autonomous agents, controlled by you</div>
        </div>
        <Badge tone="ok">Advanced+</Badge>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = path?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition border",
                active ? "bg-slate-900 text-white border-slate-900" : "bg-white/50 border-slate-200 hover:bg-white/80"
              )}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto rounded-xl border border-slate-200 bg-white/50 p-3 text-xs muted">
        <div className="font-semibold text-slate-900 mb-1">Advice-only & Safe</div>
        Agentlar qaror qabul qilmaydi. Har doim “simulyatsiya → pilot → tasdiq”.
      </div>
    </aside>
  );
}
