import { toggleSiteLive } from "@/app/lib/actions/site-content/toggleSiteLive";
import { useState } from "react";

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
          {isLive ? "Site is Live" : "Site is Seized"}
        </h2>
      </div>

      <button
        onClick={handleToggle}
        disabled={status === "loading"}
        className={[
          "flex items-center gap-2 px-4 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark disabled:opacity-40",
          isLive
            ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
            : "border-green-500/50 text-green-400 hover:bg-green-500/10",
        ].join(" ")}
        aria-label={isLive ? "Take site offline" : "Go live"}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"}`}
          aria-hidden="true"
        />
        {status === "loading"
          ? "Updating..."
          : isLive
            ? "Go Offline"
            : "Go Live"}
      </button>
    </div>
  );
}
