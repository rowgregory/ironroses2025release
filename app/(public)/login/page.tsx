"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-dark font-mono relative overflow-x-hidden flex items-center justify-center px-4">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-10 blur-[120px] bg-primary-dark" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-10 blur-[100px] bg-secondary-dark" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto min-w-70">
        {/* Rose glyph / seal */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border border-dashed border-primary-dark/30"
              style={{ width: 120, height: 120 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute rounded-full border border-dashed border-secondary-dark/20"
              style={{ width: 144, height: 144 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <div
              className="w-24 h-24 rounded-full border-2 border-primary-dark flex flex-col items-center justify-center text-center relative"
              style={{
                boxShadow:
                  "0 0 40px rgba(188,96,155,0.3), 0 0 80px rgba(167,139,250,0.15), inset 0 0 30px rgba(167,139,250,0.08)",
              }}
            >
              <svg
                viewBox="0 0 60 60"
                fill="none"
                className="w-8 h-8 text-primary-dark mb-0.5"
                aria-hidden="true"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="6"
                  fill="currentColor"
                  opacity="0.9"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <ellipse
                    key={i}
                    cx={30 + 12 * Math.cos((deg * Math.PI) / 180)}
                    cy={30 + 12 * Math.sin((deg * Math.PI) / 180)}
                    rx="7"
                    ry="4"
                    fill="currentColor"
                    opacity={0.55 - i * 0.03}
                    transform={`rotate(${deg} ${
                      30 + 12 * Math.cos((deg * Math.PI) / 180)
                    } ${30 + 12 * Math.sin((deg * Math.PI) / 180)})`}
                  />
                ))}
                <line
                  x1="30"
                  y1="36"
                  x2="30"
                  y2="56"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[8px] font-bold tracking-wider text-primary-dark leading-tight px-2 uppercase">
                Iron
                <br />
                Roses
              </span>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-[10px] tracking-[0.24em] uppercase text-primary-dark mb-3">
            ◆ Fan Portal ◆
          </p>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-text-dark mb-2">
            Welcome, Rosebud.
          </h1>
          <p className="text-xs text-muted-dark tracking-[0.06em] leading-relaxed">
            Sign in to access your fan dashboard, save shows, and get your
            exclusive access code.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="border border-border-dark bg-surface-dark p-6 sm:p-8"
          style={{
            boxShadow: "0 0 60px rgba(188,96,155,0.06)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border-dark" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">
              Sign In
            </span>
            <div className="h-px flex-1 bg-border-dark" />
          </div>

          <button
            onClick={() =>
              signIn("google", { redirect: true, redirectTo: "/login" })
            }
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border-dark text-sm font-mono font-bold tracking-[0.08em] uppercase text-text-dark hover:bg-border-dark/30 hover:border-primary-dark/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-[9px] font-mono text-muted-dark tracking-[0.08em] mt-6 leading-relaxed">
            New here? Sign in with Google and you'll be set up automatically.
          </p>

          {/* Privacy + Terms */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link
              href="/privacy-policy"
              className="text-[9px] font-mono tracking-widest uppercase text-muted-dark/40 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-dark/20 text-[9px]">·</span>
            <Link
              href="/terms"
              className="text-[9px] font-mono tracking-widest uppercase text-muted-dark/40 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-[9px] font-mono text-muted-dark/50 tracking-widest mt-8 uppercase"
        >
          © {new Date().getFullYear()} The Iron Roses
        </motion.p>
      </div>
    </div>
  );
}
