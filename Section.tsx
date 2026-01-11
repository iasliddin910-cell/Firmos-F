import React from "react";
import { cn } from "@/lib/cn";

export function Section({
  title,
  subtitle,
  right,
  children,
  className
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-6", className)}>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{title}</div>
          {subtitle ? <div className="text-sm muted">{subtitle}</div> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}
