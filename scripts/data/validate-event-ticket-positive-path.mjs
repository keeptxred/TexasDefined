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
} finally {
  await server.close();
}

console.log("PASS: GrapeFest withholds off-sale 2027 tickets, and Wurstfest deduplicates official ticket URLs with a valid CTA.");
process.exit(0);
