import { toggleSiteLive } from "@/app/lib/actions/site-content/toggleSiteLive";
import { useState } from "react";
import { motion } from "framer-motion";

export function SiteLiveToggle({ initialIsLive }: { initialIsLive: boolean }) {
  const [isLive, setIsLive] = useState(initialIsLive);
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleToggle = async () => {
    setStatus("loading");
    const res = await toggleSiteLive(!isLive);
    if (res.success) setIsLive((v) => !v);
    setStatus("idle");
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Site Status
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          {isLive ? "Live" : "Offline"}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[9px] font-mono tracking-widest uppercase text-muted-dark">
          {isLive ? "Go Offline" : "Go Live"}
        </span>
        <button
          role="switch"
          aria-checked={isLive}
          aria-label={isLive ? "Take site offline" : "Go live"}
          onClick={handleToggle}
          disabled={status === "loading"}
          className={[
            "relative w-12 h-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark disabled:opacity-40",
            isLive
              ? "bg-green-500/30 border border-green-500/50"
              : "bg-border-dark border border-border-dark",
          ].join(" ")}
        >
          <motion.span
            animate={{ x: isLive ? 6 : -18 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "absolute top-0.75 right-2.25 w-4 h-4 transition-colors duration-300",
              isLive ? "bg-green-400" : "bg-muted-dark",
            ].join(" ")}
          />
        </button>
      </div>
    </div>
  );
}
