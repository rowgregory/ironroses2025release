"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getGreeting } from "@/app/lib/utils/getGreeting";
import { getTodayLabel } from "@/app/lib/utils/getTodayLabel";

export function Greeting({ currentUser }: { currentUser: any }) {
  const firstName = currentUser?.firstName?.split(" ")[0] ?? "friend";
  const greeting = getGreeting();
  const today = getTodayLabel();

  return (
    <div className="flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 pr-2">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-1"
          >
            ◆ {today}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-mono font-black text-[22px] sm:text-[28px] text-text-dark tracking-tight leading-[1.1] truncate"
          >
            {greeting}, {firstName}.
          </motion.h1>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="shrink-0 mt-1 text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
          aria-label="Sign out"
        >
          <LogOut size={15} />
        </button>
      </div>

      {/* Nav pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5"
      >
        {[{ label: "Site", href: "/" }].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="shrink-0 text-[9px] font-mono font-bold tracking-[0.16em] uppercase px-3 py-1.5 border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            {l.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
