import { rotateAccessCode } from "@/app/lib/actions/access-code/rotateAccessCode";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AccessCodeSection({
  code,
  lastRotated,
}: {
  code: string | null;
  lastRotated: Date | null;
}) {
  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRotate = async () => {
    setRotating(true);
    const res = await rotateAccessCode();
    if (res.success && res.data) {
      router.refresh();
    }
    setRotating(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Fan Access
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Access Code
        </h2>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Code display */}
        <div className="px-4 py-2 h-9 flex items-center border border-border-dark bg-surface-dark">
          <span className="text-sm font-mono font-black tracking-[0.2em] text-text-dark">
            {code ?? "—"}
          </span>
        </div>

        {/* Copy */}
        <button
          onClick={handleCopy}
          disabled={!code}
          className="h-9 flex items-center gap-1.5 px-3 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          aria-label="Copy access code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-green-400"
              >
                ✓ Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Rotate */}
        <button
          onClick={handleRotate}
          disabled={rotating}
          className="h-9 flex items-center gap-1.5 px-3 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-red-400 hover:border-red-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          aria-label="Rotate access code — this will invalidate the current code"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {rotating ? "Rotating..." : "Rotate"}
        </button>
      </div>

      {lastRotated && (
        <p className="text-[8px] font-mono text-muted-dark/50 tracking-widest">
          Last rotated{" "}
          {new Date(lastRotated).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          at{" "}
          {new Date(lastRotated).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
    </div>
  );
}
