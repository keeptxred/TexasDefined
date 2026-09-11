import process from "node:process";
import { createServer } from "vite";

const server = await createServer({
  configFile: false,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const recordsModule = await server.ssrLoadModule("/src/data/events/texas-event-records.server.ts");
  const calendarModule = await server.ssrLoadModule("/src/data/events/texas-event-calendar.server.ts");
  const records = recordsModule.loadUpcomingTexasEventRecordsServer({ limit: 200 });
  const target = records.find((event) => event.slug === "grapefest");
  if (!target) throw new Error("canonical GrapeFest event record was not found");
  const item = calendarModule.buildTexasEventCarouselItemsServer([target])[0];
  console.log(JSON.stringify({
    slug: target.slug,
    ticketing: target.ticketing ?? null,
    ticketCta: item?.ticketCta ?? null,
  }, null, 2));
  if (!target.ticketing?.links?.length) throw new Error("GrapeFest canonical record has no ticketing links");
  if (!item?.ticketCta) throw new Error("GrapeFest canonical record does not resolve a ticket CTA");
  if (item.ticketCta.label !== "Official Tickets →") throw new Error(`unexpected GrapeFest CTA label: ${item.ticketCta.label}`);
} finally {
  await server.close();
}

console.log("PASS: canonical GrapeFest event record resolves Official Tickets CTA.");
process.exit(0);
