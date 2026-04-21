import { useState } from "react";
import { motion } from "framer-motion";
import { createEvent } from "@/app/lib/actions/event/createEvent";
import { useRouter } from "next/navigation";

export function CreateEventModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    date: "",
    city: "",
    venue: "",
    ticketUrl: "",
  });
  const router = useRouter();

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    await createEvent(form);
    router.refresh();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-dark/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
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
              id="modal-title"
              className="text-base font-mono font-black uppercase tracking-widest text-text-dark"
            >
              Add Event
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
                htmlFor={`event-${f.id}`}
                className="block text-[9px] font-mono font-bold tracking-[0.14em] uppercase mb-1.5 text-stat-label-dark"
              >
                {f.label}
              </label>
              <input
                id={`event-${f.id}`}
                type={f.type}
                value={(form as any)[f.id]}
                onChange={(e) => set(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 text-sm font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-[10px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-text-dark hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 text-[10px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            Save Event
          </button>
        </div>
      </motion.div>
    </div>
  );
}
