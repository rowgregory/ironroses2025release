import { updateSiteContent } from "@/app/lib/actions/site-content/updateSiteContent";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Site Content Editor ───────────────────────────────────────────────────────
const CONTENT_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "announcement_text", label: "Announcement Bar" },
  { key: "hero_label", label: "Hero Label" },
  { key: "listen_album_title", label: "Album Title" },
  { key: "listen_album_subtitle", label: "Album Subtitle" },
  { key: "listen_physical_text", label: "Physical Copies Text" },
  { key: "tour_heading", label: "Tour Heading" },
  { key: "about_heading_line_1", label: "About Heading Line 1" },
  { key: "about_heading_line_2", label: "About Heading Line 2" },
  { key: "about_body_1", label: "About Body 1", multiline: true },
  { key: "about_body_2", label: "About Body 2", multiline: true },
  { key: "about_stat_years", label: "Stat — Years Active" },
  { key: "about_stat_shows", label: "Stat — Shows Played" },
  { key: "about_stat_albums", label: "Stat — Albums" },
  { key: "about_stat_cities", label: "Stat — Cities" },
  { key: "mailing_heading", label: "Mailing Heading" },
  { key: "mailing_subtext", label: "Mailing Subtext" },
];

export function SiteContentEditor({
  initialContent,
}: {
  initialContent: Record<string, string>;
}) {
  const [content, setContent] =
    useState<Record<string, string>>(initialContent);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [dirty, setDirty] = useState(false);
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setStatus("idle");
  };

  const handleSave = async () => {
    setStatus("loading");
    const res = await updateSiteContent(content);
    setStatus(res.success ? "success" : "error");
    if (res.success) setDirty(false);
    router.refresh();
    setTimeout(() => setStatus((s) => (s !== "idle" ? "idle" : s)), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
            ◆ CMS
          </p>
          <h2 className="text-sm font-mono font-black uppercase tracking-[0.08em] text-text-dark">
            Site Content
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] font-mono text-green-400"
              >
                ✓ Saved
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] font-mono text-red-400"
              >
                ✗ Failed
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={handleSave}
            disabled={status === "loading" || !dirty}
            className="px-4 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
          >
            {status === "loading" ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="border border-border-dark divide-y divide-border-dark">
        {CONTENT_FIELDS.map((field) => (
          <div
            key={field.key}
            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-4 py-3 hover:bg-surface-dark transition-colors"
          >
            <label
              htmlFor={`content-${field.key}`}
              className="shrink-0 sm:w-44 text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-stat-label-dark pt-1"
            >
              {field.label}
            </label>

            {field.multiline ? (
              <textarea
                id={`content-${field.key}`}
                value={content[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="flex-1 px-3 py-2 text-xs font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark resize-none"
              />
            ) : (
              <input
                id={`content-${field.key}`}
                type="text"
                value={content[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono bg-bg-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-[8px] font-mono tracking-widest text-muted-dark/50">
        Changes are saved to the database and reflected on the site immediately.
      </p>
    </div>
  );
}
