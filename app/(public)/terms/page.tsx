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

export default function TermsPage() {
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
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-8 blur-[120px] bg-secondary-dark" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-6 blur-[100px] bg-primary-dark" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        {/* Back link */}
        <FadeUp>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-muted-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded mb-10"
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
              Terms of
              <br />
              <span className="text-primary-dark">Service</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-dark/60 tracking-widest">
              Last updated: April 21, 2026
            </p>
          </div>
        </FadeUp>

        <SectionDivider label="Terms" />

        <Section title="Acceptance" delay={0.1}>
          <p>
            By accessing or using this website, you agree to these terms. If you
            do not agree, please do not use the site.
          </p>
        </Section>

        <Section title="Your Account" delay={0.15}>
          <p>
            You are responsible for maintaining the confidentiality of your
            account.
          </p>
          <p>You must provide accurate information when creating an account.</p>
          <p>Accounts are for individual use only and may not be shared.</p>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </Section>

        <Section title="Access Codes" delay={0.2}>
          <p>
            Access codes are issued to verified fans and are non-transferable.
            Sharing or distributing your access code is prohibited and may
            result in account termination.
          </p>
        </Section>

        <Section title="Acceptable Use" delay={0.25}>
          <p>You agree not to use this site for any unlawful purpose.</p>
          <p>You agree not to impersonate any person or entity.</p>
          <p>
            You agree not to attempt to gain unauthorized access to any part of
            the site.
          </p>
          <p>
            You agree not to interfere with the proper functioning of the site.
          </p>
        </Section>

        <Section title="Intellectual Property" delay={0.3}>
          <p>
            All content on this site including text, images, logos, and music is
            the property of The Iron Roses or their respective owners. You may
            not reproduce, distribute, or use any content without express
            written permission.
          </p>
        </Section>

        <Section title="Disclaimer" delay={0.35}>
          <p>
            This site is provided as-is. We make no warranties regarding
            availability, accuracy, or fitness for a particular purpose. We are
            not liable for any damages arising from your use of the site.
          </p>
        </Section>

        <Section title="Changes" delay={0.4}>
          <p>
            We may update these terms at any time. Continued use of the site
            after changes constitutes acceptance of the new terms.
          </p>
        </Section>

        <Section title="Contact" delay={0.45}>
          <p>
            Questions about these terms can be directed to{" "}
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

        <FadeUp delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Link
              href="/privacy"
              className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase text-muted-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark rounded"
            >
              ← Privacy Policy
            </Link>
            <p className="text-[8px] font-mono text-muted-dark/40 tracking-widest uppercase">
              © {new Date().getFullYear()} The Iron Roses
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
