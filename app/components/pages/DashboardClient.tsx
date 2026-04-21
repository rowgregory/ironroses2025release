"use client";

import { NewsletterSubscriber } from "@/app/types/newsletter-subscriber";
import { EventsPanel } from "../dashboard/EventsPanel";
import { Greeting } from "../dashboard/Greeting";
import { SiteContentEditor } from "../dashboard/SiteContentEditor";
import { UpdateNameSection } from "../dashboard/UpdateNameSection";
import { UsersList } from "../dashboard/UsersList";
import { NewsletterSection } from "../dashboard/NewsletterSection";
import { AccessCodeSection } from "../dashboard/AccessCodeSection";
import { AccessCode } from "@prisma/client";
import { SiteLiveToggle } from "../dashboard/SiteLiveToggle";

export default function DashboardClient({
  currentUser,
  users,
  events,
  userName,
  siteContent,
  subscribers,
  accessCode,
  isLive,
}: {
  currentUser: any;
  users: any;
  events: any;
  userName: any;
  siteContent: any;
  subscribers: NewsletterSubscriber[];
  accessCode: AccessCode | null;
  isLive: boolean;
}) {
  return (
    <div className="min-h-screen bg-bg-dark font-mono relative overflow-x-hidden">
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
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 blur-[120px] bg-primary-dark" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-8 blur-[100px] bg-secondary-dark" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 pb-16 flex flex-col gap-8">
        <Greeting currentUser={currentUser} />

        <SiteLiveToggle initialIsLive={isLive} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Dashboard
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <UpdateNameSection userName={userName} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            ◆ Events
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <EventsPanel events={events} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            ◆ Content
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <SiteContentEditor initialContent={siteContent} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            ◆ Users
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <UsersList users={users} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">
            ◆ Newsletter
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <NewsletterSection subscribers={subscribers} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">
            ◆ Access
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        <AccessCodeSection
          code={accessCode?.code ?? null}
          lastRotated={accessCode?.lastRotatedAt ?? null}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">
            ◆ Analytics
          </span>
          <div className="h-px flex-1 bg-border-dark" />
        </div>

        {/* Analytics link */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-primary-dark mb-0.5">
              ◆ Google Analytics
            </p>
            <p className="text-xs font-mono text-muted-dark">
              View traffic, sessions, and audience data.
            </p>
          </div>

          <a
            href="https://analytics.google.com/analytics/web/#/a392121314p534023717/reports/intelligenthome"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-[9px] font-mono font-black tracking-[0.14em] uppercase border border-border-dark text-muted-dark hover:text-primary-dark hover:border-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            aria-label="Open Google Analytics in a new tab"
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
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
