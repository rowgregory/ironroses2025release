"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Lock, FileText } from "lucide-react";

const CASE_NUMBER = "DOJ-HSI-2026-CR-00847-USDC-SDFL";
const SEIZED_DATE = "February 26, 2026 — 04:17:33 EST";

const statutes = [
  { label: "Authority", value: "18 U.S.C. § 981(b)" },
  { label: "Act", value: "USA PATRIOT Act, Title III" },
  { label: "Order", value: "USDC-SDFL No. 26-MJ-4471" },
  { label: "Division", value: "Cyber & IP Crimes Unit" },
  { label: "Jurisdiction", value: "Southern District of Florida" },
  { label: "Classification", value: "UNCLASSIFIED // FOR OFFICIAL USE ONLY" },
];

const agencies = [
  "Dept. of Homeland Security",
  "Dept. of Justice",
  "FBI — Cyber Division",
  "HSI — Digital Crimes",
  "U.S. Attorney's Office",
];

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`relative inline-block ${glitch ? "translate-x-0.5" : ""} transition-transform`}
    >
      {glitch && (
        <>
          <span className="absolute inset-0 text-pink-500 translate-x-1 opacity-70">
            {text}
          </span>
          <span className="absolute inset-0 text-purple-500 -translate-x-1 opacity-70">
            {text}
          </span>
        </>
      )}
      <span className="relative">{text}</span>
    </span>
  );
}

function BlinkCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 bg-pink-500 ml-1 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function SeizedPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-[#e8e0ff] font-mono relative overflow-x-hidden">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
        }}
      />

      {/* Alert bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 text-center py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-white"
        style={{
          background: "linear-gradient(90deg, #ff2d78, #9b30ff, #ff2d78)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        ⚠ THIS DOMAIN HAS BEEN SEIZED BY THE FEDERAL GOVERNMENT ⚠
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 pt-20 pb-24 relative z-10">
        {/* Seal */}
        <motion.div
          className="flex justify-center mt-10 mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-pink-500/30"
              style={{ margin: "-12px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-purple-500/20"
              style={{ margin: "-22px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="w-28 h-28 rounded-full border-2 border-pink-500 flex flex-col items-center justify-center text-center relative"
              style={{
                boxShadow:
                  "0 0 40px rgba(255,45,120,0.4), 0 0 80px rgba(155,48,255,0.2), inset 0 0 30px rgba(155,48,255,0.1)",
              }}
            >
              <Shield className="w-8 h-8 text-pink-500 mb-1" />
              <span className="text-[9px] font-bold tracking-wider text-pink-400 leading-tight px-2">
                SEIZED
                <br />
                PROPERTY
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="rounded-sm border border-[#2a0045] border-t-0 relative overflow-hidden"
          style={{
            background: "#0d0d14",
            boxShadow: "0 0 80px rgba(155,48,255,0.12)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Animated top border */}
          <motion.div
            className="h-[3px] w-full"
            style={{
              background: "linear-gradient(90deg, #ff2d78, #9b30ff, #ff2d78)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="p-6 sm:p-10">
            {/* Case number */}
            <motion.div
              className="text-[10px] text-purple-500/60 tracking-[0.15em] mb-5 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FileText className="w-3 h-3" />
              CASE NO. {CASE_NUMBER}
              <div className="flex-1 h-px bg-gradient-to-r from-purple-900/40 to-transparent" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-['Oswald',sans-serif] text-4xl sm:text-6xl font-bold uppercase leading-tight tracking-tight mb-2"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #ff2d78 50%, #9b30ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlitchText text="WEBSITE SEIZED" />
            </motion.h1>

            <motion.p
              className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              United States Federal Government
            </motion.p>

            <div className="h-px bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-transparent mb-8" />

            {/* Body */}
            <motion.div
              className="space-y-4 text-sm text-[#c4b8e0] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>
                This domain and all associated digital assets have been seized
                and are now under the custody of the
                <strong className="text-pink-400">
                  {" "}
                  United States Department of Justice
                </strong>{" "}
                and the
                <strong className="text-pink-400">
                  {" "}
                  Department of Homeland Security
                </strong>{" "}
                pursuant to a federal court order.
              </p>
              <p>
                The seizure was executed under authority granted by the
                <strong className="text-purple-400">
                  {" "}
                  Uniting and Strengthening America by Providing Appropriate
                  Tools Required to Intercept and Obstruct Terrorism Act (USA
                  PATRIOT Act)
                </strong>
                , Title III, as well as applicable federal statutes governing
                criminal forfeiture.
              </p>
              <p>
                If you are the registered owner or operator of this domain, you
                have the right to contest this seizure. Contact the U.S.
                Attorney&apos;s Office, Southern District of Florida within{" "}
                <strong className="text-pink-400">30 days</strong> of this
                notice.
              </p>
            </motion.div>

            {/* Statutes grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {statutes.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="border border-purple-500/20 border-l-2 border-l-purple-500 p-3 rounded-sm"
                  style={{ background: "rgba(155,48,255,0.04)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.05 }}
                >
                  <div className="text-[10px] text-purple-500/60 tracking-[0.15em] uppercase mb-1">
                    {s.label}
                  </div>
                  <div className="text-xs text-[#e8e0ff]">{s.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Warning box */}
            <motion.div
              className="border border-pink-500/25 border-l-2 border-l-pink-500 p-4 rounded-sm mb-8"
              style={{ background: "rgba(255,45,120,0.04)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-xs font-bold text-pink-500 tracking-[0.1em] uppercase">
                  Warning
                </span>
              </div>
              <p className="text-xs text-pink-200/70 leading-relaxed">
                Attempting to circumvent, restore, or access the contents of
                this domain without prior written authorization from the U.S.
                Attorney&apos;s Office constitutes a federal crime punishable by
                up to{" "}
                <strong className="text-pink-400">10 years imprisonment</strong>{" "}
                and fines up to{" "}
                <strong className="text-pink-400">$500,000</strong> per
                violation under 18 U.S.C. § 1030.
              </p>
            </motion.div>

            {/* Timestamp */}
            <motion.div
              className="flex items-center gap-2 text-[11px] text-purple-500/50 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Lock className="w-3 h-3" />
              Executed: {SEIZED_DATE}
              <BlinkCursor />
            </motion.div>

            {/* Agencies */}
            <motion.div
              className="border border-[#2a0045] p-5 rounded-sm"
              style={{ background: "rgba(13,13,20,0.6)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <p className="text-[10px] text-purple-500/40 tracking-[0.2em] uppercase text-center mb-4">
                Coordinating Agencies
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {agencies.map((a, i) => (
                  <motion.span
                    key={a}
                    className="text-[11px] border border-purple-500/15 text-purple-300/40 px-3 py-1.5 rounded-sm tracking-wider uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + i * 0.07 }}
                  >
                    {a}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-[10px] text-purple-500/25 tracking-[0.15em] uppercase mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          U.S. Department of Justice • Washington, D.C. 20530 • justice.gov
        </motion.p>
      </div>
    </div>
  );
}
