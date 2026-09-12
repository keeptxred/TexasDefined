import path from "node:path";
import process from "node:process";
import { createServer } from "vite";

const expectedTicketUrl = "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/";
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
  const records = recordsModule.loadUpcomingTexasEventRecordsServer({ limit: 200 });
  const target = records.find((event) => event.slug === "grapefest");
  if (!target) throw new Error("canonical GrapeFest event record was not found");
  if (target.ticketing?.links?.length !== 1) throw new Error(`GrapeFest must deduplicate identical official ticket URLs to one link; got ${target.ticketing?.links?.length ?? 0}`);
  const item = calendarModule.buildTexasEventCarouselItemsServer([target])[0];
  if (!item?.ticketCta) throw new Error("GrapeFest canonical record does not resolve a ticket CTA");
  if (item.ticketCta.label !== "Official Tickets →") throw new Error(`unexpected GrapeFest CTA label: ${item.ticketCta.label}`);
  if (item.ticketCta.href !== expectedTicketUrl) throw new Error(`unexpected GrapeFest CTA URL: ${item.ticketCta.href}`);
  if (item.ticketCta.isAffiliate) throw new Error("official GrapeFest ticket source must not be marked affiliate");
} finally {
  await server.close();
}

console.log("PASS: canonical GrapeFest event record deduplicates official ticket URLs and resolves Official Tickets CTA.");
process.exit(0);
