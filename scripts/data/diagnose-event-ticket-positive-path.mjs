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
  const item = calendarModule.buildTexasEventCarouselItemsServer([target])[0];
  console.log(JSON.stringify({ slug: target.slug, ticketing: target.ticketing ?? null, ticketCta: item?.ticketCta ?? null }, null, 2));
  if (!target.ticketing?.links?.length) throw new Error("GrapeFest canonical record has no ticketing links");
  if (!item?.ticketCta) throw new Error("GrapeFest canonical record does not resolve a ticket CTA");
  if (item.ticketCta.label !== "Official Tickets →") throw new Error(`unexpected GrapeFest CTA label: ${item.ticketCta.label}`);
  if (item.ticketCta.href !== expectedTicketUrl) throw new Error(`unexpected GrapeFest CTA URL: ${item.ticketCta.href}`);
} finally {
  await server.close();
}

const marker = `ticket-smoke-${Date.now()}`;
const liveUrl = `https://texasdefined.com/events?featured=${encodeURIComponent(marker)}&location=&start=&end=&category=&venue=`;
const response = await fetch(liveUrl, {
  redirect: "follow",
  cache: "no-store",
  headers: { "user-agent": "TexasDefined-Ticket-Positive-Path-Diagnostic/1.0" },
  signal: AbortSignal.timeout(30_000),
});
const html = await response.text();
console.log(JSON.stringify({ liveUrl: response.url, status: response.status, hasOfficialTickets: html.includes("Official Tickets"), hasExpectedTicketUrl: html.includes(expectedTicketUrl) }, null, 2));
if (!response.ok) throw new Error(`production events request returned HTTP ${response.status}`);
if (!html.includes("Official Tickets")) throw new Error("cache-busted production /events does not render Official Tickets CTA");
if (!html.includes(expectedTicketUrl)) throw new Error("cache-busted production /events does not render the verified GrapeFest ticket URL");

console.log("PASS: canonical and cache-busted production GrapeFest paths render Official Tickets CTA.");
process.exit(0);
