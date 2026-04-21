"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Picture from "../common/Picture";
import Link from "next/link";
import { useScrollingUp } from "../../lib/hooks/useScrollingUp";
import { Event } from "@prisma/client";
import { useScrolled } from "@/app/lib/hooks/useScrolled";
import { subscribeToNewsletter } from "@/app/lib/actions/newsletter-subscriber/subscribeToNewsletter";
import { unsaveEvent } from "@/app/lib/actions/saved-event/unsaveEvent";
import { saveEvent } from "@/app/lib/actions/saved-event/saveEvent";
import { useSession } from "next-auth/react";

const STREAM_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/4E39TiZAnl2g2uCpWI9L96",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/the-iron-roses/1654902863",
  },
  {
    label: "Bandcamp",
    href: "https://theironroses.bandcamp.com/album/agitpop",
  },
  { label: "Tidal", href: "https://tidal.com/album/299942666/track/299942682" },
  {
    label: "YouTube Music",
    href: "https://music.youtube.com/search?q=the+iron+roses",
  },
];

const NAV_LINKS = [
  { label: "Listen", href: "#listen" },
  { label: "Tour", href: "#tour" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/theironroses/",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@theironroses",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/TheIronRoses/",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TheIronRoses",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="#060212"
        />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@theironroses",
    icon: "/images/threads.png",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Rose SVG glyph ────────────────────────────────────────────────────────────
function RoseGlyph({ className = "" }) {
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
          transform={`rotate(${deg} ${
            30 + 12 * Math.cos((deg * Math.PI) / 180)
          } ${30 + 12 * Math.sin((deg * Math.PI) / 180)})`}
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

// ── Section divider label ─────────────────────────────────────────────────────
function SectionLabel({ children }: any) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="h-px flex-1 bg-border-dark" />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stat-label-dark">
        {children}
      </span>
      <div className="h-px flex-1 bg-border-dark" />
    </div>
  );
}

// ── Announcement Bar ──────────────────────────────────────────────────────────
function AnnouncementBar({
  siteContent,
}: {
  siteContent: Record<string, string>;
}) {
  return (
    <div
      className="w-full py-1.5 px-3 flex items-center justify-center bg-topbar-dark"
      role="region"
      aria-label="Site announcement"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 justify-center min-w-0"
      >
        <RoseGlyph className="w-3 h-3 shrink-0 text-primary-dark" />

        <Link
          href="#listen"
          className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-center text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-1 rounded leading-tight"
        >
          {siteContent.announcement_text}
        </Link>
        <RoseGlyph className="w-3 h-3 shrink-0 text-primary-dark" />
      </motion.div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={[
          "w-full transition-all duration-300",
          "bg-navbar-dark",
          scrolled ? "border-b border-border-dark/30 backdrop-blur-md" : "",
        ].join(" ")}
        role="banner"
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-auto md:h-57.5">
          {/* Logo */}
          <div className="flex justify-center pt-4 md:pt-6 pb-2 md:pb-4">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="The Iron Roses — home"
            >
              {/* Pink logo for dark mode */}
              <Picture
                src="/images/light-logo.png"
                alt="The Iron Roses"
                width={320}
                height={80}
                className="block w-auto h-16 sm:h-20 md:h-28"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul
              className="flex items-center justify-center gap-10 pb-4"
              role="list"
            >
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded px-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block absolute top-4 right-4">
            <Link
              href="/login"
              className="text-[9px] font-mono tracking-[0.14em] uppercase text-muted-dark/40 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="Sign in"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden absolute top-4 right-4">
            <button
              className="flex flex-col gap-1.5 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block w-6 h-0.5 bg-on-dark"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-6 h-0.5 bg-on-dark"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block w-6 h-0.5 bg-on-dark"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden sticky top-0 z-40 overflow-hidden bg-navbar-dark border-b border-border-dark"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col px-6 py-4 gap-4" role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="block text-sm font-mono font-bold tracking-[0.14em] uppercase py-1 text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border-dark pt-3 mt-1">
                <Link
                  href="/login"
                  className="block text-[9px] font-mono tracking-[0.14em] uppercase py-1 text-muted-dark/40 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StickyNav() {
  const scrollingUp = useScrollingUp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {scrollingUp && (
        <motion.header
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-navbar-dark border-b border-border-dark/30 backdrop-blur-md"
          role="banner"
          aria-label="Sticky navigation"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              aria-label="The Iron Roses — home"
            >
              <Picture
                priority
                src="/images/light-logo.png"
                alt="The Iron Roses"
                width={160}
                height={40}
                className="block w-auto h-8"
              />
            </Link>

            <nav aria-label="Sticky navigation links">
              <ul className="hidden md:flex items-center gap-8" role="list">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[11px] font-bold tracking-[0.18em] uppercase  text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded px-1"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                className="flex flex-col gap-1.5 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="sticky-mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                  className="block w-6 h-0.5 g-on-dark"
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block w-6 h-0.5 g-on-dark"
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                  className="block w-6 h-0.5 g-on-dark"
                />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="sticky-mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden bg-navbar-dark border-t border-border-dark"
                role="navigation"
                aria-label="Sticky mobile navigation"
              >
                <ul className="flex flex-col px-6 py-4 gap-4" role="list">
                  {NAV_LINKS.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block text-sm font-bold tracking-[0.14em] uppercase py-1  text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function Hero({ siteContent }: { siteContent: Record<string, string> }) {
  return (
    <section
      className="relative h-52 sm:h-100 md:h-125 flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
      aria-label="Hero — The Iron Roses"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/img-2.JPG')" }}
        role="img"
        aria-label="The Iron Roses hero image"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-dark/50" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-3">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="h-px w-6 sm:w-16 bg-primary-dark opacity-60" />
          <span className="text-[9px] sm:text-xs font-mono font-bold tracking-[0.14em] sm:tracking-[0.22em] uppercase text-primary-dark whitespace-nowrap">
            {siteContent?.hero_label}
          </span>
          <div className="h-px w-6 sm:w-16 bg-primary-dark opacity-60" />
        </motion.div>
      </div>

      {/* Scroll cue — hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-6 sm:h-8 bg-linear-to-b from-primary-dark to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ── Listen ────────────────────────────────────────────────────────────────────
function ListenSection({
  siteContent,
}: {
  siteContent: Record<string, string>;
}) {
  return (
    <section
      id="listen"
      className="py-20 sm:py-28 px-4 bg-surface-dark"
      aria-labelledby="listen-heading"
    >
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <SectionLabel>Listen</SectionLabel>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            id="listen-heading"
            className="text-3xl sm:text-5xl font-mono font-black uppercase tracking-[-0.02em] mb-3 text-center text-text-dark"
          >
            {siteContent.listen_album_title}
          </h2>
          <p className="text-center text-sm font-mono mb-12 text-muted-dark">
            {siteContent.listen_album_subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="overflow-hidden border border-border-dark">
            {STREAM_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className={[
                  "flex items-center justify-between px-6 py-4 border-b border-border-dark last:border-b-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-dark",
                  i % 2 === 0 ? "bg-button-dark/30" : "bg-surface-dark",
                ].join(" ")}
                aria-label={`Stream on ${link.label}`}
              >
                <span className="text-sm font-mono font-bold tracking-[0.08em] uppercase text-text-dark">
                  {link.label}
                </span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary-dark">
                  Stream →
                </span>
              </motion.a>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="text-center text-[10px] font-mono font-bold tracking-[0.16em] uppercase mt-8 text-muted-dark">
            {siteContent.listen_physical_text}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function SaveEventButton({
  eventId,
  initialSaved,
}: {
  eventId: string;
  initialSaved: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const res = saved ? await unsaveEvent(eventId) : await saveEvent(eventId);
    if (res.success) setSaved((p) => !p);
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={[
        "text-[10px] font-mono font-black tracking-[0.14em] uppercase px-3 py-1 shrink-0 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark disabled:opacity-40",
        saved
          ? "border-primary-dark text-primary-dark hover:bg-primary-dark/10"
          : "border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark",
      ].join(" ")}
      aria-label={saved ? `Unsave ${eventId}` : `Save ${eventId}`}
      aria-pressed={saved}
    >
      {loading ? "..." : saved ? "✓ Saved" : "Save"}
    </button>
  );
}

// ── Tour ──────────────────────────────────────────────────────────────────────
function TourSection({
  events,
  siteContent,
  savedEventIds,
}: {
  events: Event[];
  siteContent: Record<string, string>;
  savedEventIds: string[];
}) {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  return (
    <section
      id="tour"
      className="py-20 sm:py-28 px-4 bg-bg-dark"
      aria-labelledby="tour-heading"
    >
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <SectionLabel>Tour Dates</SectionLabel>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            id="tour-heading"
            className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.02em] mb-12 text-center text-text-dark"
          >
            {siteContent.tour_heading}
          </h2>
        </FadeUp>

        <div className="flex flex-col" role="list" aria-label="Tour dates">
          {events.map((show, i) => (
            <FadeUp key={i} delay={Math.min(0.05 * i, 0.3)}>
              <div
                role="listitem"
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-4 sm:px-5 py-4 border-b border-border-dark hover:hover:bg-surface-dark transition-colors duration-200"
              >
                <span className="text-xs font-black tracking-[0.14em] uppercase shrink-0 sm:w-16 text-primary-dark">
                  {new Date(show.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-sm sm:text-base text-text-dark">
                    {show.city}
                  </span>
                  <span className="text-xs ml-2 sm:ml-3 text-muted-dark">
                    {show.venue}
                  </span>
                </div>
                {show.soldOut ? (
                  <span
                    className="text-[10px] font-black tracking-[0.14em] uppercase px-3 py-1 shrink-0 border border-border-dark text-muted-dark"
                    aria-label={`${show.city} ${show.date} — sold out`}
                  >
                    Sold Out
                  </span>
                ) : (
                  <a
                    href={show.ticketUrl ?? "#"}
                    target="_blank"
                    className="text-[10px] font-black tracking-[0.14em] uppercase px-3 py-1 shrink-0 bg-primary-dark text-bg-dark hover:bg-primary-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                    aria-label={`Get tickets for ${show.city} on ${show.date}`}
                  >
                    Tickets
                  </a>
                )}

                {isLoggedIn && (
                  <SaveEventButton
                    eventId={show.id}
                    initialSaved={savedEventIds.includes(show.id)}
                  />
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection({
  siteContent,
}: {
  siteContent: Record<string, string>;
}) {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-4 relative overflow-hidden bg-surface-dark"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-secondary-dark" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-[80px] bg-secondary-dark" />
      </div>

      <div className="relative max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeUp>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-border-dark" aria-hidden="true" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-stat-label-dark">
                About
              </span>
            </div>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] mb-6 text-text-dark"
            >
              {siteContent.about_heading_line_1}
              <br />
              <span className="text-primary-dark">
                {siteContent.about_heading_line_2}
              </span>
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4 text-muted-dark">
              {siteContent.about_body_1}
            </p>
            <p className="text-sm font-mono leading-relaxed text-muted-dark">
              {siteContent.about_body_2}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Years Active", value: siteContent.about_stat_years },
              { label: "Shows Played", value: siteContent.about_stat_shows },
              { label: "Albums", value: siteContent.about_stat_albums },
              { label: "Cities", value: siteContent.about_stat_cities },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-border-dark bg-button-dark/40"
              >
                <div className="text-3xl sm:text-4xl font-black mb-1 text-primary-dark">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase text-stat-label-dark">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Mailing List ──────────────────────────────────────────────────────────────
function MailingSection({
  siteContent,
}: {
  siteContent: Record<string, string>;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "already"
  >("idle");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const res = await subscribeToNewsletter(email);

    if (res.success) {
      if (res.alreadySubscribed) {
        setStatus("already");
      } else {
        setSubmitted(true);
        setStatus("idle");
      }
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 bg-bg-dark"
      aria-labelledby="mailing-heading"
    >
      <div className="max-w-xl mx-auto text-center">
        <FadeUp>
          <RoseGlyph
            className="w-10 h-10 mx-auto mb-6 text-primary-dark"
            aria-hidden="true"
          />
          <h2
            id="mailing-heading"
            className="text-2xl sm:text-4xl font-black uppercase tracking-[-0.02em] mb-3 text-text-dark"
          >
            {siteContent.mailing_heading}
          </h2>
          <p className="text-sm font-mono mb-8 text-muted-dark">
            {siteContent.mailing_subtext}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                  noValidate
                  aria-label="Mailing list sign-up"
                >
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus("idle");
                    }}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    disabled={status === "loading"}
                    className="flex-1 px-4 py-3 text-sm font-mono bg-surface-dark border border-border-dark text-text-dark placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="px-8 py-3 text-xs font-mono font-black tracking-[0.14em] uppercase bg-primary-dark text-bg-dark hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-dark shrink-0"
                  >
                    {status === "loading" ? "Saving..." : "Subscribe"}
                  </button>
                </form>

                {/* Inline status messages */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-[10px] font-mono text-red-400"
                      role="alert"
                    >
                      ✗ Something went wrong. Please try again.
                    </motion.p>
                  )}
                  {status === "already" && (
                    <motion.p
                      key="already"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-[10px] font-mono text-muted-dark"
                      role="status"
                    >
                      ◆ You're already subscribed.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-6"
                role="status"
                aria-live="polite"
              >
                <RoseGlyph
                  className="w-8 h-8 mx-auto mb-3 text-primary-dark"
                  aria-hidden="true"
                />
                <p className="font-black text-lg uppercase tracking-[0.08em] text-primary-dark">
                  You're in.
                </p>
                <p className="text-sm font-mono mt-1 text-muted-dark">
                  We'll be in touch soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navbar-dark" aria-label="Site footer">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
        {/* Top row */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Picture
            src="/images/light-logo.png"
            className="w-28 sm:w-36"
            priority={false}
          />

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-6"
              role="list"
            >
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <ul
            className="flex items-center flex-wrap justify-center gap-3 sm:gap-4"
            role="list"
            aria-label="Social media links"
          >
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-on-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
                  aria-label={s.label}
                >
                  {typeof s.icon === "string" ? (
                    <Picture
                      priority={false}
                      src={s.icon}
                      alt={s.label}
                      width={18}
                      height={18}
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 hover:opacity-100 transition-opacity duration-200"
                    />
                  ) : (
                    s.icon
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border-dark/40 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.08em] text-on-dark text-center">
              © {new Date().getFullYear()} The Iron Roses. All rights reserved.
            </p>
            <span className="text-on-dark/20 text-[9px] hidden sm:inline">
              ·
            </span>
            <div className="flex items-center gap-3">
              <a
                href="/privacy"
                className="text-[9px] font-mono tracking-[0.08em] text-on-dark/50 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              >
                Privacy
              </a>
              <span className="text-on-dark/20 text-[9px]">·</span>

              <a
                href="/terms"
                className="text-[9px] font-mono tracking-[0.08em] text-on-dark/50 hover:text-muted-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              >
                Terms
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-[9px] sm:text-[10px] font-mono text-on-dark/60 text-center">
              Management:{" "}
              <a
                href="mailto:jason@unchainedhq.com"
                className="underline text-muted-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              >
                jason@unchainedhq.com
              </a>
            </p>
            <p className="text-[9px] font-mono text-on-dark/30">
              Crafted with{" "}
              <span className="text-primary-dark" aria-hidden="true">
                ♦
              </span>{" "}
              by{" "}
              <a
                href="https://sqysh.io?lead_source=the_iron_roses"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black tracking-widest uppercase text-primary-dark/60 hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
              >
                Sqysh
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Skip link ─────────────────────────────────────────────────────────────────
function SkipLink() {
  return (
    <a
      href="#listen"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-100 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:bg-primary-dark focus:text-bg-dark"
    >
      Skip to main content
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomeClient({
  events,
  siteContent,
  savedEventIds,
}: {
  events: Event[];
  siteContent: any;
  savedEventIds: string[];
}) {
  return (
    <div className="min-w-[320px]" lang="en">
      <SkipLink />
      <AnnouncementBar siteContent={siteContent} />
      <Nav />
      <StickyNav />

      <main id="main-content">
        <Hero siteContent={siteContent} />
        <ListenSection siteContent={siteContent} />
        <TourSection
          events={events}
          siteContent={siteContent}
          savedEventIds={savedEventIds}
        />
        <AboutSection siteContent={siteContent} />
        <MailingSection siteContent={siteContent} />
      </main>

      <Footer />
    </div>
  );
}
