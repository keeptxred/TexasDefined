import path from "node:path";
import process from "node:process";
import { createServer } from "vite";

const expectedTicketUrl = "https://ticketing.roninpos.app/events/wfesttickets";
const server = await createServer({
  configFile: false,
  appType: "custom",
  logLevel: "error",
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  server: { middlewareMode: true },
});

try {
  const recordsModule = await server.ssrLoadModule("/src/data/events/texas-event-records.server.ts");
  const calendarModule = await server.ssrLoadModule("/src/data/events/texas-event-calendar.server.ts");
  // Verify one reviewed active official event checkout and fail-closed protection
  // for GrapeFest 2027 while official tickets remain unavailable.
  // Organizer-published ticket offers have independent sale windows; an old
  // Offer URL must not become a perpetual purchase CTA just because the event
  // is still listed. 2026-10-27 03:30 UTC is Oct 26 at the Texas venue.
  const time = new Date("2026-10-27T03:30:00Z");
  const sample = { name:"General admission", url:expectedTicketUrl, price:25, priceCurrency:"USD" };
  const variants = [
    { ...sample, validThrough:"2026-10-26" },
    { ...sample, validFrom:"2026-10-26" },
    { ...sample, availability:"https://schema.org/InStock" },
    { ...sample, validThrough:"2026-10-25" },
    { ...sample, validFrom:"2026-10-27" },
    { ...sample, availability:"https://schema.org/SoldOut" },
    { ...sample, validThrough:"2026-10-27T03:00:00Z" },
    { ...sample, validFrom:"2026-10-27T04:00:00Z" },
    { ...sample, validFrom:"not-a-date" },
  ];
  const filtered = recordsModule.currentSourceTicketOffers(variants, time);
  if (filtered.length !== 3 || filtered[0] !== variants[0]
    || filtered[1] !== variants[1] || filtered[2] !== variants[2]) {
    throw new Error("Source offer validity, sold-out status or Texas-local inclusive end date exposed expired/future admission");
  }
  if (recordsModule.currentSourceTicketOffers(variants, new Date("2026-10-27T15:00:00Z")).some((o) => o === variants[0])) {
    throw new Error("The source offer must expire after Texas-local midnight");
  }
  if (recordsModule.currentSourceTicketOffers(undefined, time).length) {
    throw new Error("Missing organizer offers cannot create admission");
  }
  const records = recordsModule.loadTexasEventRecordsServer();
  const grapefest = records.find((event) => event.slug === "grapefest");
  if (!grapefest) throw new Error("canonical GrapeFest record was not found");
  if (grapefest.ticketing?.links?.length) throw new Error("GrapeFest 2027 may not advertise 2026 ticket offers while sale is closed");
  const target = records.find((event) => event.slug === "wurstfest");
  if (!target) throw new Error("canonical Wurstfest event record was not found");
  if (target.ticketing?.links?.length !== 1) throw new Error(`Wurstfest must deduplicate identical official ticket URLs to one link; got ${target.ticketing?.links?.length ?? 0}`);
  const item = calendarModule.buildTexasEventCarouselItemsServer([target])[0];
  if (!item?.ticketCta) throw new Error("Wurstfest canonical record does not resolve a ticket CTA");
  if (item.ticketCta.label !== "Official Tickets →") throw new Error(`unexpected Wurstfest CTA label: ${item.ticketCta.label}`);
  if (item.ticketCta.href !== expectedTicketUrl) throw new Error(`unexpected Wurstfest CTA URL: ${item.ticketCta.href}`);
  if (item.ticketCta.isAffiliate) throw new Error("official Wurstfest ticket source must not be marked affiliate");
  // A cancelled, postponed or rescheduled editorial event can retain stale
  // source Offer metadata. Event-level lifecycle status must win over that
  // offer for BOTH statewide results and every shared event carousel.
  const search = { featured: "", location: "", start: target.startDate,
    end: target.startDate, category: "", venue: "" };
  for (const [status, label] of [
    ["cancelled", "Cancelled"],
    ["postponed", "Postponed"],
    ["rescheduled", "Rescheduled"],
  ]) {
    const changed = { ...target, id: "lifecycle-test:" + status, status };
    const card = calendarModule.buildTexasEventCarouselItemsServer([changed])[0];
    if (card.ticketCta !== null || !card.statusLabel.includes(label)) {
      throw new Error(status + " carousel exposed a stale official purchase link or hid the event status");
    }
    const view = calendarModule.buildGlobalEventCalendarServer([changed], search);
    if (view.results.length !== 1 || view.results[0].ticketCta !== null
      || !view.results[0].statusLabel.includes(label)) {
      throw new Error(status + " calendar exposed a stale official purchase link or hid the event status");
    }
  }
  const activeView = calendarModule.buildGlobalEventCalendarServer([target], search);
  if (!activeView.results[0]?.ticketCta) {
    throw new Error("valid scheduled primary-source tickets must remain usable");
  }

  // A reviewed exact-venue photograph is not an unlicensed generic stock image.
  // The event page and the shared calendar MUST honor the same commercial-use gate.
  const fiesta = records.find((event) => event.slug === "fiesta-de-palmas");
  if (!fiesta) throw new Error("Fiesta de Palmas event fixture missing");
  if (!fiesta.image?.displayAllowed || fiesta.image.rightsStatus !== "verified-reusable") {
    throw new Error("Fiesta de Palmas reviewed Wikimedia photograph was suppressed on the event carousel");
  }
  if (!fiesta.image.sourceUrl.includes("commons.wikimedia.org/wiki/File:McAllen_Convention_Center.jpg")
    || fiesta.image.licenseName !== "CC BY-SA 4.0"
    || !fiesta.image.licenseUrl?.endsWith("/by-sa/4.0/")
    || !fiesta.image.credit?.includes("Joel Pacheco")) {
    throw new Error("Fiesta de Palmas carousel is missing required image source/license/credit attribution");
  }
  const fiestaCard = calendarModule.buildTexasEventCarouselItemsServer([fiesta])[0];
  if (!fiestaCard.image?.displayAllowed) throw new Error("Event carousel projection lost approved image");

} finally {
  await server.close();
}

console.log("PASS: canonical GrapeFest ticket CTA and approved Fiesta de Palmas Wikimedia image credit survive shared event projection.");
process.exit(0);
