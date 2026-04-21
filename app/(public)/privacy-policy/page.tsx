"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 bg-border-dark" />
      <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-stat-label-dark shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-border-dark" />
    </div>
  );
}

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="mb-8">
        <h2 className="text-xs font-mono font-black tracking-[0.2em] uppercase text-primary-dark mb-3">
          {title}
        </h2>
        <div className="text-sm font-mono leading-relaxed text-muted-dark space-y-2">
          {children}
        </div>
      </div>
    </FadeUp>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark font-mono relative overflow-x-hidden min-w-[320px]">
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-8 blur-[120px] bg-primary-dark" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-6 blur-[100px] bg-secondary-dark" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        {/* Back link */}
        <FadeUp>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-muted-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded mb-10 block"
            aria-label="Back to home"
          >
            ← Home
          </Link>
        </FadeUp>

        {/* Header */}
        <FadeUp delay={0.05}>
          <div className="mb-10">
            <p className="text-[9px] font-mono tracking-[0.24em] uppercase text-primary-dark mb-2">
              ◆ Legal
            </p>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.02em] text-text-dark leading-[0.9] mb-4">
              Privacy
              <br />
              <span className="text-primary-dark">Policy</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-dark/60 tracking-[0.1em]">
              Last updated: April 21, 2026
            </p>
          </div>
        </FadeUp>

        <SectionDivider label="Policy" />

        <Section title="Who We Are" delay={0.1}>
          <p>
            This website is operated by The Iron Roses. When we say "we," "us,"
            or "our," we mean The Iron Roses and this website.
          </p>
        </Section>

        <Section title="What We Collect and Why" delay={0.15}>
          <p>
            When you create an account, we collect your name and email address.
            We use this information solely to provide you access to your fan
            dashboard and to communicate with you about shows and music.
          </p>
          <p>
            If you subscribe to our newsletter, we store your email address for
            that purpose only.
          </p>
          <p>
            We use Google Analytics to understand how visitors use our site.
            This collects anonymized data such as pages visited, time on site,
            and general location. No personally identifiable information is
            shared with Google Analytics.
          </p>
          <p>
            We use Google OAuth for sign-in. When you sign in with Google, we
            receive your name and email address from Google. We do not receive
            your Google password or payment information.
          </p>
        </Section>

        <Section title="What We Don't Do" delay={0.2}>
          <p>We do not sell your data.</p>
          <p>We do not share your personal information with third parties.</p>
          <p>
            We do not send unsolicited emails beyond what you have opted into.
          </p>
        </Section>

        <Section title="Data Retention" delay={0.25}>
          <p>
            You may request deletion of your account and associated data at any
            time by contacting us at{" "}
            <a
              href="mailto:booking@theironroses.com"
              className="text-primary-dark hover:text-primary-light transition-colors duration-200 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              booking@theironroses.com
            </a>
            . Newsletter subscribers may unsubscribe at any time.
          </p>
        </Section>

        <Section title="Cookies" delay={0.3}>
          <p>
            This site uses cookies solely for authentication and session
            management. We do not use advertising cookies or tracking pixels.
          </p>
        </Section>

        <Section title="Contact" delay={0.35}>
          <p>
            Questions about this policy can be directed to{" "}
            <a
              href="mailto:booking@theironroses.com"
              className="text-primary-dark hover:text-primary-light transition-colors duration-200 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              booking@theironroses.com
            </a>
            .
          </p>
        </Section>

        <SectionDivider label="End" />

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Link
              href="/terms"
              className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-muted-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              Terms of Service →
            </Link>
            <p className="text-[8px] font-mono text-muted-dark/40 tracking-[0.1em] uppercase">
              © {new Date().getFullYear()} The Iron Roses
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
