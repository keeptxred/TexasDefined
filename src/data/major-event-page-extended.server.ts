import { formatDateRange } from "@/domain/utils/format";
import { getExpandedMajorEventAuthorityTranche42Server } from "./major-event-extra-authority-sep5.server";
import { loadMajorEventPageServer } from "./major-event-page.server";

const siteUrl = "https://texasdefined.com";
const esc = (value: string | undefined) => (value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

export function loadMajorEventPageExtendedServer(slug: string) {
  const existing = loadMajorEventPageServer(slug);
  if (existing) return existing;

  const event = getExpandedMajorEventAuthorityTranche42Server(slug);
  if (!event) return null;

  const dateLabel = formatDateRange(event.startDate, event.endDate, "en-US");
  const canonicalUrl = `${siteUrl}/event/${event.slug}`;
  const placeLine = [event.city && `${event.city}, Texas`, event.countyName].filter(Boolean).join(" · ");
  const planning = event.planningSections
    .map((item) => `<section class="mt-8"><h2 class="font-display text-2xl">${esc(item.title)}</h2><p class="mt-3 leading-7 text-muted-foreground">${esc(item.body)}</p></section>`)
    .join("");
  const countyHref = event.countySlug ? `/browse/counties#county-${event.countySlug}` : null;
  const relatedItems = countyHref && !event.relatedLinks.some((item) => item.href === countyHref)
    ? [{ href: countyHref, label: `Explore ${event.countyName ?? "the county"}`, description: `Continue from ${event.name} into the county guide for places, communities and local resources.` }, ...event.relatedLinks]
    : event.relatedLinks;
  const related = relatedItems
    .map((item) => `<li><a class="font-semibold text-primary underline" href="${esc(item.href)}">${esc(item.label)}</a><span class="text-muted-foreground"> — ${esc(item.description)}</span></li>`)
    .join("");
  const sources = event.sources
    .map((source) => `<li><a class="font-semibold text-primary underline" href="${esc(source.url)}" target="_blank" rel="noreferrer noopener">${esc(source.label)} ↗</a></li>`)
    .join("");

  const html = `<nav class="mb-8 text-sm text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / ${esc(event.name)}</nav><header class="border-b border-border pb-8"><p class="eyebrow text-primary">Major Texas event</p><h1 class="mt-3 font-display text-5xl sm:text-6xl">${esc(event.name)}</h1><p class="mt-5 text-lg text-muted-foreground">${esc(dateLabel)} · ${esc(placeLine)}</p>${event.dateNote ? `<p class="mt-4 text-sm text-muted-foreground">${esc(event.dateNote)}</p>` : ""}<p class="mt-5"><a class="font-semibold text-primary underline" href="${esc(event.officialUrl)}" target="_blank" rel="noreferrer noopener">Official event information ↗</a></p></header><section class="mt-12"><h2 class="font-display text-3xl">Why plan around ${esc(event.name)}?</h2><p class="mt-4 leading-7 text-muted-foreground">${esc(event.whyItMatters)}</p></section><section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Plan the visit</h2>${planning}</section><section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Keep exploring</h2><ul class="mt-4 space-y-3">${related}</ul></section><section class="mt-10 border-t border-border pt-8"><h2 class="font-display text-3xl">Official sources</h2><ul class="mt-4 space-y-3">${sources}</ul></section>`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    url: canonicalUrl,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sameAs: event.officialUrl,
    location: {
      "@type": "Place",
      name: event.venue || event.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
  });

  return {
    slug: event.slug,
    name: event.name,
    city: event.city,
    title: `${event.name}: Dates & Texas Travel Guide`,
    description: `${event.name} in ${event.city}: verified dates, official sources and practical trip planning.`,
    html,
    jsonLd,
  };
}
