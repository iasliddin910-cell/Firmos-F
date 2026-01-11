"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { CalmBackdrop } from "@/components/calm/CalmBackdrop";
import { motion } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-4">
      <CalmBackdrop />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[288px_1fr]">
          <Sidebar />
          <motion.main
            className="glass-strong soft-shadow rounded-2xl p-4 md:p-6 min-h-[calc(100vh-32px)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
