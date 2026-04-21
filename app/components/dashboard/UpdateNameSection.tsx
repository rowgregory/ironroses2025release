import { updateUserName } from "@/app/lib/actions/user/updateUserName";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Update Name ───────────────────────────────────────────────────────────────
export function UpdateNameSection({ userName }: { userName: any }) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(userName?.firstName ?? "");
  const [lastName, setLastName] = useState(userName?.lastName ?? "");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const router = useRouter();

  const hasName = firstName.trim() || lastName.trim();

  const handleSubmit = async () => {
    setStatus("loading");
    const res = await updateUserName({ firstName, lastName });
    if (res.success) {
      router.refresh();
      setStatus("success");
      setEditing(false);
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleCancel = () => {
    setFirstName(userName?.firstName ?? "");
    setLastName(userName?.lastName ?? "");
    setEditing(false);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark">
        ◆ Profile
      </p>

      <AnimatePresence mode="wait">
        {!editing ? (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-3"
          >
            {hasName ? (
              <div>
                <p className="text-lg font-mono font-black text-text-dark leading-none">
                  {[firstName, lastName].filter(Boolean).join(" ")}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-mono font-bold text-muted-dark">
                  No name set
                </p>
                <p className="text-[9px] font-mono text-muted-dark/60 mt-0.5">
                  Add your name so others can identify you
                </p>
              </div>
            )}

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
                strokeLinejoin="round"
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
                  htmlFor="firstName"
                  className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First"
                  autoFocus
                  className="w-full px-3 py-2.5 text-sm font-mono bg-surface-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-[9px] font-mono font-bold tracking-[0.16em] uppercase mb-1.5 text-stat-label-dark"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last"
                  className="w-full px-3 py-2.5 text-sm font-mono bg-surface-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="px-5 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              >
                {status === "loading" ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono tracking-widest text-green-400"
          >
            ✓ Name updated successfully.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
