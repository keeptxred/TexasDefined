import { createLazyFileRoute } from "@tanstack/react-router";

const canonicalPath = "/holiday/enchant-christmas-arlington";
const title = "Enchant Christmas in Arlington: Is It Returning for 2026?";
const description = "Enchant Christmas has previously operated a Texas-area holiday light maze, but the organizer's live 2026 city list does not include Arlington or Dallas. This guide preserves the destination's history and explains how to verify a future Texas return without advertising nonexistent 2026 dates or tickets.";
const sections = [
  {
    "heading": "The current 2026 status",
    "description": "As reviewed October 21, 2026, the organizer's official 2026 city list features Arcadia, Las Vegas, St. Petersburg and Washington, DC, but no Texas market. Consequently, this is a historic-event status page, NOT a current event listing."
  },
  {
    "heading": "What made Enchant distinctive?",
    "description": "Historically the brand has offered a walk-through holiday light maze, festive market spaces, food, themed activities and ice-skating opportunities in selected markets. The exact entertainment, ticket offerings and host venues differ by city and season."
  },
  {
    "heading": "Do not confuse archived Dallas pages with current ticket inventory",
    "description": "Search engines can still surface older promotional pages listing Dallas, and a residual or staging website can show old location options. That is insufficient to promise a 2026 Texas event; use the current organizer city list and official live checkout."
  },
  {
    "heading": "No invented 2026 prices or dates",
    "description": "With no verified Arlington edition, there are no Texas dates, times, ticket prices, parking or skating amenities to publish as current. Ticketmaster and third-party searches should not be presented as official 2026 Enchant Arlington admission."
  },
  {
    "heading": "Alternative North Texas Christmas experiences for 2026",
    "description": "For confirmed local seasonal options, compare Grapevine's Christmas Capital of Texas, Holiday at the Dallas Arboretum, and the broader Texas Defined holiday calendar. Those are different organizers, not substitute tickets for Enchant."
  },
  {
    "heading": "How to plan if Enchant returns",
    "description": "When an official Texas city and venue are announced, reconfirm dates, ticket tiers, skating requirements, parking and accessibility before booking travel. This page should then be updated rather than publishing a second duplicate historical URL."
  }
];
const related = [
  {
    "href": "/event/grapevine-christmas-capital-of-texas",
    "label": "Grapevine Christmas Capital"
  },
  {
    "href": "/event/holiday-at-the-dallas-arboretum",
    "label": "Holiday at the Arboretum"
  },
  {
    "href": "/events/christmas-events",
    "label": "Texas Christmas events"
  },
  {
    "href": "/county/tarrant",
    "label": "Tarrant County guide"
  }
];
const sources = [
  {
    "href": "https://www.enchantchristmas.com/",
    "label": "Enchant Christmas official current city list"
  },
  {
    "href": "https://prod.enchantchristmas.com/",
    "label": "Enchant archived promotional domain (not current 2026 evidence)"
  }
];

export const Route = createLazyFileRoute("/holiday/enchant-christmas-arlington")({ component: HolidayStatusGuide });

function HolidayStatusGuide() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-7 text-sm text-muted-foreground">
        <a href="/events" className="underline">Texas Events</a> / <a href="/events/christmas-events" className="underline">Christmas Events</a> / Event status
      </nav>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">2026 Christmas event status · checked October 21, 2026</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
      <section className="mt-8 border-y border-border py-6" aria-label="Status and essentials">
        <h2 className="font-display text-2xl">Event status and location</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><dt className="font-semibold">2026 status</dt><dd className="mt-1 text-muted-foreground">No 2026 Arlington/Dallas event announced on current organizer site</dd></div>
          <div><dt className="font-semibold">Location</dt><dd className="mt-1 text-muted-foreground">Arlington / Dallas–Fort Worth, Texas (historical market; no verified 2026 venue)</dd></div>
          <div><dt className="font-semibold">Area</dt><dd className="mt-1 text-muted-foreground">North Texas</dd></div>
          <div><dt className="font-semibold">Official organizer</dt><dd className="mt-1"><a className="text-primary underline" href="https://www.enchantchristmas.com/" target="_blank" rel="noopener noreferrer">Confirm live status with the organizer ↗</a></dd></div>
        </dl>
      </section>
      <div className="mt-10 space-y-9">
        {sections.map(section => <section key={section.heading}>
          <h2 className="font-display text-2xl font-semibold">{section.heading}</h2>
          <p className="mt-3 leading-8 text-muted-foreground">{section.description}</p>
        </section>)}
      </div>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-2xl">More Texas Christmas planning</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map(link => <li key={link.href}><a className="text-primary underline" href={link.href}>{link.label} →</a></li>)}
        </ul>
      </section>
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-display text-xl">Organizer and source references</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {sources.map(source => <li key={source.href}><a className="text-primary underline" href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">These pages are editorial event-status guides. No unconfirmed occurrence is represented as a scheduled event and no speculative ticket checkout is provided.</p>
      </section>
    </main>
  );
}
