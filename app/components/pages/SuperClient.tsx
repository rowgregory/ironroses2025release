"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  Users,
  Calendar,
  ScrollText,
  Trash2,
  LogOut,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { JsonValue } from "@prisma/client/runtime/library";
import { deleteLog } from "@/app/lib/actions/log/deleteLog";
import Link from "next/link";
import { formatDate } from "@/app/lib/utils/date.utls";

// ── Types ─────────────────────────────────────────────────────────────────────
type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  createdAt: Date;
};

type Event = {
  id: string;
  date: Date;
  city: string;
  venue: string;
  ticketUrl: string | null;
  soldOut: boolean;
};

type Log = {
  id: string;
  level: string;
  message: string;
  createdAt: Date;
  metadata: JsonValue;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const LEVEL_CLASSES: Record<string, string> = {
  info: "text-secondary-light dark:text-secondary-dark border-secondary-light/30 dark:border-secondary-dark/30",
  warn: "text-yellow-500 dark:text-yellow-400 border-yellow-500/30 dark:border-yellow-400/30",
  error:
    "text-red-500 dark:text-red-400 border-red-500/30 dark:border-red-400/30",
};

export const ROLE_CLASSES: Record<string, string> = {
  SUPERUSER:
    "text-primary-light dark:text-primary-dark border-primary-light/30 dark:border-primary-dark/30",
  ADMIN:
    "text-secondary-light dark:text-secondary-dark border-secondary-light/30 dark:border-secondary-dark/30",
  ROSEBUD:
    "text-muted-light dark:text-muted-dark border-border-light dark:border-border-dark",
};

// ── Panel ─────────────────────────────────────────────────────────────────────
function Panel({
  title,
  label,
  count,
  icon: Icon,
  children,
}: {
  title: string;
  label: string;
  count: number;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
        <div className="flex items-center gap-2">
          <Icon
            size={11}
            className="text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          <div>
            <p className="text-[8px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark leading-none mb-0.5">
              {label}
            </p>
            <h2 className="text-xs font-mono font-black uppercase tracking-[0.08em] text-text-light dark:text-text-dark leading-none">
              {title}
            </h2>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black text-muted-light dark:text-muted-dark">
          {count}
        </span>
      </div>
      <div className="h-105 overflow-y-auto">{children}</div>
    </div>
  );
}

// ── Empty ─────────────────────────────────────────────────────────────────────
function Empty({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-light dark:text-muted-dark">
      <Icon size={22} aria-hidden="true" />
      <p className="text-[9px] font-mono tracking-[0.14em] uppercase">
        {label}
      </p>
    </div>
  );
}

// ── Users Panel ───────────────────────────────────────────────────────────────
function UsersPanel({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) {
  if (!users.length) return <Empty icon={Users} label="No users" />;

  return (
    <ul
      role="list"
      aria-label="Users"
      className="divide-y divide-border-light dark:divide-border-dark"
    >
      {users.map((user, i) => (
        <motion.li
          key={user.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.02 }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[11px] font-mono font-bold text-text-light dark:text-text-dark truncate">
                {[user.firstName, user.lastName].filter(Boolean).join(" ") ||
                  "—"}
              </span>
              <span
                className={`text-[7px] font-mono font-black tracking-widest uppercase px-1.5 py-0.5 border ${ROLE_CLASSES[user.role] ?? ROLE_CLASSES.ROSEBUD}`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-[9px] font-mono text-muted-light dark:text-muted-dark truncate">
              {user.email}
            </p>
            <p className="text-[8px] font-mono text-muted-light/50 dark:text-muted-dark/50 mt-0.5">
              {formatDate(user.createdAt)}
            </p>
          </div>
          <button
            onClick={() => onDelete(user.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-light dark:text-muted-dark hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded shrink-0"
            aria-label={`Delete user ${user.email}`}
          >
            <Trash2 size={12} aria-hidden="true" />
          </button>
        </motion.li>
      ))}
    </ul>
  );
}

// ── Events Panel ──────────────────────────────────────────────────────────────
function EventsPanel({
  events,
  onDelete,
}: {
  events: Event[];
  onDelete: (id: string) => void;
}) {
  if (!events.length) return <Empty icon={Calendar} label="No events" />;

  return (
    <ul
      role="list"
      aria-label="Events"
      className="divide-y divide-border-light dark:divide-border-dark"
    >
      {events.map((event, i) => (
        <motion.li
          key={event.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.02 }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
        >
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.08em] text-primary-light dark:text-primary-dark shrink-0 w-10">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono font-bold text-text-light dark:text-text-dark truncate">
              {event.city}
            </p>
            <p className="text-[9px] font-mono text-muted-light dark:text-muted-dark truncate">
              {event.venue}
            </p>
          </div>
          {event.soldOut && (
            <span className="text-[7px] font-mono font-black tracking-widest uppercase px-1.5 py-0.5 border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark shrink-0">
              Sold Out
            </span>
          )}
          <button
            onClick={() => onDelete(event.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-light dark:text-muted-dark hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded shrink-0"
            aria-label={`Delete event in ${event.city}`}
          >
            <Trash2 size={12} aria-hidden="true" />
          </button>
        </motion.li>
      ))}
    </ul>
  );
}

// ── Logs Panel ────────────────────────────────────────────────────────────────
function LogsPanel({
  logs,
  onDelete,
}: {
  logs: Log[];
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!logs.length) return <Empty icon={ScrollText} label="No logs" />;

  return (
    <ul
      role="list"
      aria-label="Logs"
      className="divide-y divide-border-light dark:divide-border-dark"
    >
      {logs.map((log, i) => (
        <motion.li
          key={log.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.02 }}
          className="px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
        >
          <div className="flex items-start gap-2">
            <span
              className={`shrink-0 text-[7px] font-mono font-black tracking-[0.1em] uppercase px-1.5 py-0.5 border mt-0.5 ${LEVEL_CLASSES[log.level] ?? LEVEL_CLASSES.info}`}
            >
              {log.level}
            </span>
            <button
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              className="flex-1 min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-expanded={expanded === log.id}
            >
              <p className="text-[10px] font-mono text-text-light dark:text-text-dark line-clamp-1">
                {log.message}
              </p>
              <p className="text-[8px] font-mono text-muted-light/60 dark:text-muted-dark/60 mt-0.5">
                {formatDateTime(log.createdAt)}
              </p>
            </button>
            <div className="flex items-center gap-1.5 shrink-0">
              <ChevronDown
                size={11}
                className={`text-muted-light dark:text-muted-dark transition-transform duration-200 cursor-pointer ${expanded === log.id ? "rotate-180" : ""}`}
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                aria-hidden="true"
              />
              <button
                onClick={async () => {
                  await deleteLog(log.id);
                  onDelete(log.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-light dark:text-muted-dark hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                aria-label="Delete log"
              >
                <Trash2 size={11} aria-hidden="true" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {expanded === log.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <pre className="mt-2 p-2.5 text-[8px] font-mono bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark overflow-x-auto leading-relaxed">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      ))}
    </ul>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function SuperDashboardClient({
  currentUser,
  users: initialUsers,
  events: initialEvents,
  logs: initialLogs,
}: {
  currentUser: any;
  users: User[];
  events: Event[];
  logs: Log[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [events, setEvents] = useState(initialEvents);
  const [logs, setLogs] = useState(initialLogs);

  const firstName = currentUser?.firstName ?? "friend";

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-mono">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-8 blur-[120px] bg-primary-dark" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full opacity-6 blur-[100px] bg-secondary-dark" />
      </div>

      <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={16}
              className="text-primary-light dark:text-primary-dark shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-[8px] font-mono tracking-[0.22em] uppercase text-primary-light dark:text-primary-dark leading-none mb-1">
                ◆ {getTodayLabel()}
              </p>
              <h1 className="text-xl sm:text-2xl font-mono font-black text-text-light dark:text-text-dark leading-none">
                {getGreeting()}, {firstName || currentUser.email}.
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Inline stats */}
            <div className="hidden sm:flex items-center gap-5">
              {[
                { label: "Users", value: users.length, icon: Users },
                { label: "Events", value: events.length, icon: Calendar },
                { label: "Logs", value: logs.length, icon: ScrollText },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon
                    size={10}
                    className="text-muted-light dark:text-muted-dark"
                    aria-hidden="true"
                  />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-muted-light dark:text-muted-dark">
                    {label}
                  </span>
                  <span className="text-sm font-mono font-black text-primary-light dark:text-primary-dark">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              <LayoutDashboard size={15} />
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            ◆ Super Dashboard
          </span>
          <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />
        </div>

        {/* Panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Panel
            title="Users"
            label="Registry"
            count={users.length}
            icon={Users}
          >
            <UsersPanel
              users={users}
              onDelete={(id) => setUsers((p) => p.filter((u) => u.id !== id))}
            />
          </Panel>

          <Panel
            title="Tour Dates"
            label="Events"
            count={events.length}
            icon={Calendar}
          >
            <EventsPanel
              events={events}
              onDelete={(id) => setEvents((p) => p.filter((e) => e.id !== id))}
            />
          </Panel>

          <Panel
            title="System Logs"
            label="Activity"
            count={logs.length}
            icon={ScrollText}
          >
            <LogsPanel
              logs={logs}
              onDelete={(id) => setLogs((p) => p.filter((l) => l.id !== id))}
            />
          </Panel>
        </div>

        <p className="text-center text-[8px] font-mono tracking-[0.12em] uppercase text-muted-light/40 dark:text-muted-dark/40">
          © {new Date().getFullYear()} The Iron Roses — Super
        </p>
      </div>
    </div>
  );
}
