"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white/70 p-3 text-sm outline-none transition " +
          "focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2 focus:ring-offset-transparent",
        className
      )}
      {...props}
    />
  );
}
