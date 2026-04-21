import { createAdminUser } from "@/app/lib/actions/user/createAdminUser";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAdminUser() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    const res = await createAdminUser(email.trim());

    if (res.success && res.data) {
      router.refresh();
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMsg(res.error ?? "Something went wrong");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
          ◆ Access
        </p>
        <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
          Add Admin User
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="admin-email" className="sr-only">
            Email address
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="email@example.com"
            autoComplete="off"
            className="w-full px-3 py-2.5 text-xs font-mono bg-surface-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "loading" || !email.trim()}
          className="shrink-0 px-5 py-2.5 text-[9px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
        >
          {status === "loading" ? "Creating..." : "Add Admin"}
        </button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono text-green-400"
          >
            ✓ Admin user created. They can now sign in with Google.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono text-red-400"
          >
            ✗ {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
