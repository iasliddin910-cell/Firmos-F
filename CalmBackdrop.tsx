"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * CalmBackdrop: CSS “3D” background that is light on CPU/GPU.
 * It gives a 3D-parallax feel using perspective + blur + gradients.
 */
export function CalmBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ perspective: 1000 }}>
        <motion.div
          className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.85), rgba(56,189,248,0.25), rgba(255,255,255,0))",
            transformStyle: "preserve-3d"
          }}
          animate={{ rotateX: [0, 8, 0], rotateY: [0, -10, 0], y: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-10 right-[-140px] h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(16,185,129,0.8), rgba(34,211,238,0.18), rgba(255,255,255,0))",
            transformStyle: "preserve-3d"
          }}
          animate={{ rotateX: [0, -10, 0], rotateY: [0, 8, 0], y: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-180px] left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl opacity-55"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(56,189,248,0.65), rgba(16,185,129,0.18), rgba(255,255,255,0))",
            transformStyle: "preserve-3d"
          }}
          animate={{ rotateX: [0, 6, 0], rotateY: [0, 6, 0], y: [0, 14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
    </div>
  );
}
