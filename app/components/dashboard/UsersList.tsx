import { User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";
import { useState } from "react";
import { ROLE_CLASSES } from "../pages/SuperClient";
import { formatDate } from "@/app/lib/utils/date.utls";
import { CreateAdminUser } from "./CreateAdminUser";

// ── Users List ────────────────────────────────────────────────────────────────
export function UsersList({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    const name = [u.firstName, u.lastName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Registry
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Users
        </h2>
      </div>

      {/* Search */}
      <div className="relative">
        <label htmlFor="user-search" className="sr-only">
          Search users
        </label>
        <input
          id="user-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full px-3 py-2.5 text-xs font-mono bg-surface-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            aria-label="Clear search"
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
        )}
      </div>

      {/* List */}
      <div className="border border-border-dark">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-dark">
            <Users size={22} aria-hidden="true" />
            <p className="text-[9px] font-mono tracking-[0.14em] uppercase">
              {search ? "No users match your search" : "No users yet"}
            </p>
          </div>
        ) : (
          <ul
            role="list"
            aria-label="Users"
            className="divide-y divide-border-dark"
          >
            <AnimatePresence initial={false}>
              {filtered.map((user, i) => (
                <motion.li
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-dark transition-colors"
                >
                  {/* Avatar */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono font-black border border-border-dark text-primary-dark bg-surface-dark"
                    aria-hidden="true"
                  >
                    {[user.firstName?.[0], user.lastName?.[0]]
                      .filter(Boolean)
                      .join("") || "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-mono font-bold text-text-dark truncate">
                        {[user.firstName, user.lastName]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </span>
                      <span
                        className={`text-[7px] font-mono font-black tracking-widest uppercase px-1.5 py-0.5 border ${ROLE_CLASSES[user.role] ?? ROLE_CLASSES.ROSEBUD}`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <p className="text-[9px] font-mono text-muted-dark truncate">
                      {user.email}
                    </p>
                    <p className="text-[8px] font-mono text-muted-dark/50 mt-0.5">
                      Joined {formatDate(user.createdAt)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {/* Add Admin — sits right below the list */}
      <div className="border-t border-border-dark pt-4">
        <CreateAdminUser />
      </div>

      <p className="text-[8px] font-mono tracking-widest text-muted-dark/50 text-right">
        {filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
