import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Plus, Ticket, Trash2 } from "lucide-react";
import { CreateEventModal } from "../modals/CreateEventeModal";
import { useState } from "react";
import { Event } from "@prisma/client";
import { deleteEvent } from "@/app/lib/actions/event/deleteEvent";
import { useRouter } from "next/navigation";
import { EditEventModal } from "../modals/EditEventModal";

export function EventsPanel({ events }: { events: Event[] }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    router.refresh();
  };

  const handleCreated = () => {
    setShowCreateModal(false);
  };

  const handleUpdated = (updated: Event) => {
    router.refresh();
  };

  return (
    <>
      <div id="events" className="flex flex-col">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark mb-0.5">
              ◆ Management
            </p>
            <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
              Tour Dates
            </h2>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            aria-label="Add event"
          >
            <Plus size={12} aria-hidden="true" />
            Add
          </button>
        </div>

        {/* Events list — fixed height scrollable */}
        <div className="h-105 overflow-y-auto border border-border-dark">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-dark">
              <Calendar size={24} aria-hidden="true" />
              <p className="text-[10px] font-mono tracking-[0.14em] uppercase">
                No events yet
              </p>
            </div>
          ) : (
            <ul role="list" aria-label="Tour dates">
              {events.map((event: Event, i: number) => (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-3 px-4 py-3 border-b border-border-dark last:border-b-0 hover:bg-surface-dark transition-colors duration-150 group"
                >
                  {/* Date */}
                  <div className="shrink-0 pt-0.5">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-dark">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        timeZone: "UTC",
                      })}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <MapPin
                        size={10}
                        className="text-muted-dark shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-mono font-bold text-text-dark truncate">
                        {event.city}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-muted-dark truncate pl-4">
                      {event.venue}
                    </p>
                    {event.ticketUrl && (
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1 pl-4 text-[9px] font-mono tracking-widest uppercase text-secondary-dark hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark rounded"
                      >
                        <Ticket size={9} aria-hidden="true" />
                        Tickets
                      </a>
                    )}
                  </div>

                  {/* Sold out badge + delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    {event.soldOut && (
                      <span className="text-[8px] font-mono font-black tracking-widest uppercase px-2 py-0.5 border border-border-dark text-muted-dark">
                        Sold Out
                      </span>
                    )}
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-dark hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                      aria-label={`Edit ${event.city} event`}
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
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-dark hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                      aria-label={`Delete ${event.city} event`}
                    >
                      <Trash2 size={13} aria-hidden="true" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-[9px] font-mono tracking-widest text-muted-dark mt-2 text-right">
          {events.length} event{events.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && <CreateEventModal onClose={handleCreated} />}
        {editingEvent && (
          <EditEventModal
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onSave={handleUpdated}
          />
        )}
      </AnimatePresence>
    </>
  );
}
