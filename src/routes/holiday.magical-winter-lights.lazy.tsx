import { createLazyFileRoute } from "@tanstack/react-router";

const canonicalPath = "/holiday/magical-winter-lights";
const title = "Magical Winter Lights in Rosenberg: Visitor Guide and 2026 Status";
const description = "The 2026–27 Magical Winter Lights opening is on hold, according to the organizer's November 23 announcement reported November 24. Its ticket portal lists conflicting venue and date information. Do not travel or purchase until a new official opening is confirmed.";
const sections = [
  {
    "heading": "What is Magical Winter Lights?",
    "description": "The attraction is a large-scale lantern-art walk rather than a simple drive-through neighborhood light show. Historical editions combine enormous glowing sculptures, cultural installations, food and separately operated fair-style activities. The exact annual offering changes."
  },
  {
    "heading": "What dates can you actually book?",
    "description": "The organizer's 2025–26 season ran November 21, 2025 through January 4, 2026. Those dates have expired. The Houston Chronicle and Chron reported on November 24 that the organizer had suspended the opening indefinitely because of difficulties securing travel visas for its international performers and artisans. A later holiday opening or spring celebration is being considered, but neither has a confirmed date. The organizer's Facebook announcement could not be opened directly during our November 27 review; these reports attribute the delay to the organizer."
  },
  {
    "heading": "Where is it located?",
    "description": "The last confirmed location is Fort Bend County Fairgrounds at 4310 State Highway 36 in Rosenberg, southwest of central Houston. The ticket portal contact page still lists Rosenberg, while its tickets page advertises November 13, 2026–January 3, 2027 at Katy Mills. Those pages conflict with one another and the newer opening-delay announcement. Neither establishes an operating venue for this season."
  },
  {
    "heading": "Tickets and affiliate policy",
    "description": "Do not purchase tickets or make a trip based on the existing checkout text. Confirm the new opening and venue directly with the organizer; if you already purchased, request instructions for your order from the official contact page. We do not link an unrelated Ticketmaster event or pretend an affiliate listing is verified admission."
  },
  {
    "heading": "Planning for families",
    "description": "Historical editions required several hours for the displays and add-ons. Dress for a fully outdoor evening, confirm which rides and shows are included, and check stroller/wheelchair information and weather rules after a new calendar is published."
  },
  {
    "heading": "Make a Fort Bend County holiday weekend",
    "description": "If a new Rosenberg season is announced, visitors can combine the evening lanterns with Rosenberg's historic downtown, nearby Sugar Land destinations, and southwest Houston lodging. The holiday calendar has other confirmed choices while this attraction remains pending."
  }
];
const related = [
  {
    "href": "/county/fort-bend",
    "label": "Fort Bend County guide"
  },
  {
    "href": "/event/houston-zoo-lights",
    "label": "Houston Zoo Lights"
  },
  {
    "href": "/event/galaxy-lights-space-center-houston",
    "label": "Galaxy Lights"
  },
  {
    "href": "/events/christmas-events",
    "label": "Texas Christmas events"
  }
];
const sources = [
  { href: "https://www.houstonchronicle.com/neighborhood/fort-bend/article/visa-troubles-international-artisans-threaten-22548328.php", label: "Houston Chronicle, November 24 — organizer opening-delay announcement" },
  { href: "https://www.chron.com/culture/article/holiday-lights-houston-22548126.php", label: "Chron, November 24 — reported organizer delay and possible later season" },
  { href: "https://tickets.magicalwinterlights.com/tickets", label: "Organizer ticket-page text — conflicting older information, not verified current inventory" },
  {
    "href": "https://tickets.magicalwinterlights.com/contact.aspx",
    "label": "Organizer ticket portal / last listed venue"
  },
  {
    "href": "https://stylemagazine.com/news/2025/oct/14/magical-winter-lights-returns-to-fort-bend-county/",
    "label": "2025–26 event announcement (historical dates only)"
  }
];

export const Route = createLazyFileRoute("/holiday/magical-winter-lights")({ component: HolidayStatusGuide });

function HolidayStatusGuide() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-7 text-sm text-muted-foreground">
        <a href="/events" className="underline">Texas Events</a> / <a href="/events/christmas-events" className="underline">Christmas Events</a> / Event status
      </nav>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">2026 Christmas event status · checked November 27, 2026</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
      <section className="mt-8 border-y border-border py-6" aria-label="Status and essentials">
        <h2 className="font-display text-2xl">Event status and location</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><dt className="font-semibold">2026 status</dt><dd className="mt-1 text-muted-foreground">Opening on hold; 2026–27 dates not yet verified</dd></div>
          <div><dt className="font-semibold">Location</dt><dd className="mt-1 text-muted-foreground">Fort Bend County Fairgrounds, 4310 State Highway 36, Rosenberg, TX 77471 (last confirmed venue)</dd></div>
          <div><dt className="font-semibold">Area</dt><dd className="mt-1 text-muted-foreground">Fort Bend County and southwest Houston</dd></div>
          <div><dt className="font-semibold">Official organizer</dt><dd className="mt-1"><a className="text-primary underline" href="https://tickets.magicalwinterlights.com/contact.aspx" target="_blank" rel="noopener noreferrer">Confirm live status with the organizer ↗</a></dd></div>
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
