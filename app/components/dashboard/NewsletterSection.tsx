import { deleteNewsletterSubscriber } from "@/app/lib/actions/newsletter-subscriber/deleteNewsletterSubscriber";
import { NewsletterSubscriber } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewsletterSection({
  subscribers,
}: {
  subscribers: NewsletterSubscriber[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCopyAll = async () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    await navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteNewsletterSubscriber(id);
    if (res.success) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Newsletter
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Subscribers
        </h2>
      </div>

      <button
        onClick={handleCopyAll}
        disabled={subscribers.length === 0}
        className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
        aria-label="Copy all subscriber emails"
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
              Copy All
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Search */}
      <div className="relative">
        <label htmlFor="subscriber-search" className="sr-only">
          Search subscribers
        </label>
        <input
          id="subscriber-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
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
      <div className="border border-border-dark h-80 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-dark">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p className="text-[9px] font-mono tracking-[0.14em] uppercase">
              {search ? "No subscribers match" : "No subscribers yet"}
            </p>
          </div>
        ) : (
          <ul
            role="list"
            aria-label="Newsletter subscribers"
            className="divide-y divide-border-dark"
          >
            <AnimatePresence initial={false}>
              {filtered.map((sub, i) => (
                <motion.li
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-dark transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-text-dark truncate">
                      {sub.email}
                    </p>
                    <p className="text-[8px] font-mono text-muted-dark/60 mt-0.5">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-dark hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded shrink-0"
                    aria-label={`Unsubscribe ${sub.email}`}
                  >
                    <Trash2 size={12} aria-hidden="true" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <p className="text-[8px] font-mono tracking-widest text-muted-dark/50 text-right">
        {filtered.length} of {subscribers.length} subscriber
        {subscribers.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
