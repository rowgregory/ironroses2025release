import { updateEvent } from "@/app/lib/actions/event/updateEvent";
import { Event } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function EditEventModal({
  event,
  onClose,
  onSave,
}: {
  event: Event;
  onClose: () => void;
  onSave: (updated: Event) => void;
}) {
  const [form, setForm] = useState({
    date: new Date(event.date).toISOString().split("T")[0],
    city: event.city,
    venue: event.venue,
    ticketUrl: event.ticketUrl ?? "",
    soldOut: event.soldOut,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    setStatus("loading");
    const res = await updateEvent(event.id, form);
    if (res.success && res.data) {
      onSave(res.data);
      onClose();
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-dark/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-surface-dark border border-border-dark p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark mb-0.5">
              ◆ Management
            </p>
            <h2
              id="edit-modal-title"
              className="text-base font-mono font-black uppercase tracking-widest text-text-dark"
            >
              Edit Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
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

        <div className="flex flex-col gap-4">
          {[
            { id: "date", label: "Date", type: "date", placeholder: "" },
            {
              id: "city",
              label: "City",
              type: "text",
              placeholder: "Boston, MA",
            },
            {
              id: "venue",
              label: "Venue",
              type: "text",
              placeholder: "Roadrunner",
            },
            {
              id: "ticketUrl",
              label: "Ticket URL",
              type: "url",
              placeholder: "https://...",
            },
          ].map((f) => (
            <div key={f.id}>
              <label
                htmlFor={`edit-${f.id}`}
                className="block text-[9px] font-mono font-bold tracking-[0.14em] uppercase mb-1.5 text-stat-label-dark"
              >
                {f.label}
              </label>
              <input
                id={`edit-${f.id}`}
                type={f.type}
                value={(form as any)[f.id]}
                onChange={(e) => set(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              />
            </div>
          ))}

          {/* Sold out toggle */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="edit-soldout"
              className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-stat-label-dark"
            >
              Sold Out
            </label>
            <button
              id="edit-soldout"
              role="switch"
              aria-checked={form.soldOut}
              onClick={() => set("soldOut", !form.soldOut)}
              className={[
                "relative w-10 h-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded-full",
                form.soldOut ? "bg-primary-dark" : "bg-border-dark",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-bg-dark rounded-full transition-transform duration-200",
                  form.soldOut ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-mono text-red-400 mt-4"
              role="alert"
            >
              ✗ Failed to update event.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-[10px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-text-dark hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={status === "loading"}
            className="flex-1 px-4 py-2.5 text-[10px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            {status === "loading" ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
