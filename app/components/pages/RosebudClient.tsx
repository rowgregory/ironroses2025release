"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { updateUserName } from "@/app/lib/actions/user/updateUserName";
import { getTodayLabel } from "@/app/lib/utils/getTodayLabel";
import { getGreeting } from "@/app/lib/utils/getGreeting";
import { Event } from "@prisma/client";
import Link from "next/link";
import { unsaveEvent } from "@/app/lib/actions/saved-event/unsaveEvent";
import { useRouter } from "next/navigation";

// ── Rose Glyph ────────────────────────────────────────────────────────────────
function RoseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse
          key={i}
          cx={30 + 12 * Math.cos((deg * Math.PI) / 180)}
          cy={30 + 12 * Math.sin((deg * Math.PI) / 180)}
          rx="7"
          ry="4"
          fill="currentColor"
          opacity={0.55 - i * 0.03}
          transform={`rotate(${deg} ${30 + 12 * Math.cos((deg * Math.PI) / 180)} ${30 + 12 * Math.sin((deg * Math.PI) / 180)})`}
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
      <path
        d="M24 46 Q27 44 30 46 Q33 44 36 46"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Force Name Modal ──────────────────────────────────────────────────────────
function ForceNameModal({
  onComplete,
}: {
  onComplete: (firstName: string, lastName: string) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) return;
    setStatus("loading");
    const res = await updateUserName({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
    if (res.success) {
      onComplete(firstName.trim(), lastName.trim());
      router.refresh();
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-dark/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="name-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm bg-surface-dark border border-border-dark p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <RoseGlyph className="w-10 h-10 text-primary-dark mb-4" />
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-1">
            ◆ Welcome
          </p>
          <h2
            id="name-modal-title"
            className="text-xl font-black uppercase tracking-[-0.02em] text-text-dark mb-2"
          >
            One quick thing.
          </h2>
          <p className="text-xs font-mono text-muted-dark leading-relaxed">
            Tell us your name before we let you in.
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 mb-6">
          <div>
            <label
              htmlFor="force-first"
              className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
            >
              First Name
            </label>
            <input
              id="force-first"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First"
              autoFocus
              autoComplete="given-name"
              className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            />
          </div>
          <div>
            <label
              htmlFor="force-last"
              className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
            >
              Last Name
            </label>
            <input
              id="force-last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last"
              autoComplete="family-name"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            />
          </div>
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-mono text-red-400 mb-3"
              role="alert"
            >
              ✗ Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          disabled={
            status === "loading" || !firstName.trim() || !lastName.trim()
          }
          className="w-full px-4 py-3 text-[10px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
        >
          {status === "loading" ? "Saving..." : "Let Me In"}
        </button>
      </motion.div>
    </div>
  );
}

// ── Access Code Card ──────────────────────────────────────────────────────────
function AccessCodeCard({ code }: { code: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="border border-border-dark bg-surface-dark p-5 flex flex-col gap-4">
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Fan Access
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Your Access Code
        </h2>
        <p className="text-[10px] font-mono text-muted-dark mt-1 leading-relaxed">
          Your fan access code. Valid until the next rotation.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="h-9 flex items-center px-4 border border-border-dark bg-bg-dark flex-1 min-w-0">
          <span className="text-sm font-mono font-black tracking-[0.2em] text-text-dark truncate">
            {code ?? "—"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          disabled={!code}
          className="h-9 flex items-center gap-1.5 px-3 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark shrink-0"
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
      </div>
    </div>
  );
}

// ── Profile Card ──────────────────────────────────────────────────────────────
function ProfileCard({ currentUser }: { currentUser: any }) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName ?? "");
  const [lastName, setLastName] = useState(currentUser?.lastName ?? "");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSave = async () => {
    setStatus("loading");
    const res = await updateUserName({ firstName, lastName });
    setStatus(res.success ? "success" : "error");
    if (res.success) setEditing(false);
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="border border-border-dark bg-surface-dark p-5 flex flex-col gap-4">
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Profile
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Your Info
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!editing ? (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-base font-black uppercase tracking-[-0.01em] text-text-dark">
                {[firstName, lastName].filter(Boolean).join(" ") || "—"}
              </p>
              <p className="text-[10px] font-mono text-muted-dark mt-0.5">
                {currentUser?.email}
              </p>
              <p className="text-[8px] font-mono text-muted-dark/50 mt-0.5">
                Member since{" "}
                {new Date(currentUser?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono font-bold tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              aria-label="Edit name"
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
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label
                  htmlFor="rb-first"
                  className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
                >
                  First Name
                </label>
                <input
                  id="rb-first"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="rb-last"
                  className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
                >
                  Last Name
                </label>
                <input
                  id="rb-last"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={status === "loading"}
                className="px-5 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              >
                {status === "loading" ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setFirstName(currentUser?.firstName ?? "");
                  setLastName(currentUser?.lastName ?? "");
                  setEditing(false);
                  setStatus("idle");
                }}
                className="px-5 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              >
                Cancel
              </button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] font-mono text-red-400"
                    role="alert"
                  >
                    ✗ Failed to save.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono text-green-400"
            role="status"
          >
            ✓ Name updated.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Saved Events ──────────────────────────────────────────────────────────────
function SavedEventsCard({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState(initialEvents);

  const handleUnsave = async (eventId: string) => {
    const res = await unsaveEvent(eventId);
    if (res.success) setEvents((p) => p.filter((e) => e.id !== eventId));
  };

  return (
    <div className="border border-border-dark bg-surface-dark flex flex-col">
      <div className="px-5 pt-5 pb-3 border-b border-border-dark">
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Shows
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Saved Events
        </h2>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-dark px-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-[9px] font-mono tracking-[0.14em] uppercase text-center text-muted-dark">
            No saved shows yet
          </p>

          <Link
            href="/#tour"
            className="text-[9px] font-mono tracking-[0.14em] uppercase text-primary-dark hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
          >
            Browse Tour Dates →
          </Link>
        </div>
      ) : (
        <ul
          role="list"
          aria-label="Saved events"
          className="divide-y divide-border-dark"
        >
          <AnimatePresence initial={false}>
            {events.map((event, i) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-bg-dark transition-colors group"
              >
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-dark shrink-0 w-10">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono font-bold text-text-dark truncate">
                    {event.city}
                  </p>
                  <p className="text-[9px] font-mono text-muted-dark truncate">
                    {event.venue}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {event.soldOut ? (
                    <span className="text-[8px] font-mono font-black tracking-widest uppercase px-2 py-0.5 border border-border-dark text-muted-dark">
                      Sold Out
                    </span>
                  ) : event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-mono font-black tracking-widest uppercase px-2 py-1 border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                      aria-label={`Get tickets for ${event.city}`}
                    >
                      Tickets
                    </a>
                  ) : null}

                  <button
                    onClick={() => handleUnsave(event.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-dark hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                    aria-label={`Remove ${event.city} from saved events`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

// ── Rosebud Dashboard ─────────────────────────────────────────────────────────
export default function RosebudClient({
  currentUser,
  accessCode,
  needsName,
  savedEvents,
}: {
  currentUser: any;
  accessCode: string | null;
  needsName: boolean;
  savedEvents: Event[];
}) {
  const [showModal, setShowModal] = useState(needsName);
  const [name, setName] = useState({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
  });

  const displayName =
    [name.firstName, name.lastName].filter(Boolean).join(" ") || "Rosebud";

  return (
    <div className="min-h-screen bg-bg-dark font-mono relative overflow-x-hidden">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 blur-[120px] bg-primary-dark" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-8 blur-[100px] bg-secondary-dark" />
      </div>

      {/* Force name modal */}
      <AnimatePresence>
        {showModal && (
          <ForceNameModal
            onComplete={(first, last) => {
              setName({ firstName: first, lastName: last });
              setShowModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 pb-16 flex flex-col gap-6 min-w-[320px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-1">
              ◆ {getTodayLabel()}
            </p>
            <h1 className="font-black text-[22px] sm:text-[28px] text-text-dark tracking-tight leading-[1.1] truncate">
              {getGreeting()}, {displayName.split(" ")[0]}.
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 mt-1">
            <Link
              href="/"
              className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="Back to home"
            >
              ← Home
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <RoseGlyph className="w-4 h-4 text-primary-dark" />
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        {/* Access code */}
        <AccessCodeCard code={accessCode} />

        <SavedEventsCard initialEvents={savedEvents} />

        {/* Profile */}
        <ProfileCard currentUser={{ ...currentUser, ...name }} />

        {/* Footer */}
        <p className="text-center text-[8px] font-mono tracking-widest text-muted-dark/40 uppercase">
          © {new Date().getFullYear()} The Iron Roses — Rosebuds
        </p>
      </div>
    </div>
  );
}
