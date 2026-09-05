import { formatDateRange } from "@/domain/utils/format";
import { resolveSportsVenueEventLink } from "@/data/sports-venue-event-links";
import { getMajorEventAuthorityServer } from "./major-event-authority.server";
import { getExpandedMajorEventAuthorityServer } from "./major-event-expanded-authority.server";
import { getExpandedMajorEventAuthorityTranche3Server } from "./major-event-expanded-authority-tranche3.server";
import { getExpandedMajorEventAuthorityTranche4Server } from "./major-event-expanded-authority-tranche4.server";
import { getExpandedMajorEventAuthorityTranche5Server } from "./major-event-expanded-authority-tranche5.server";
import { getExpandedMajorEventAuthorityTranche6Server } from "./major-event-expanded-authority-tranche6.server";
import { getExpandedMajorEventAuthorityTranche7Server } from "./major-event-expanded-authority-tranche7.server";
import { getExpandedMajorEventAuthorityTranche8Server } from "./major-event-expanded-authority-tranche8.server";
import { getExpandedMajorEventAuthorityTranche9Server } from "./major-event-expanded-authority-tranche9.server";
import { getExpandedMajorEventAuthorityTranche10Server } from "./major-event-expanded-authority-tranche10.server";
import { getExpandedMajorEventAuthorityTranche11Server } from "./major-event-expanded-authority-tranche11.server";
import { getExpandedMajorEventAuthorityTranche12Server } from "./major-event-expanded-authority-tranche12.server";
import { getExpandedMajorEventAuthorityTranche13Server } from "./major-event-expanded-authority-tranche13.server";
import { getExpandedMajorEventAuthorityTranche14Server } from "./major-event-expanded-authority-tranche14.server";
import { getExpandedMajorEventAuthorityTranche15Server } from "./major-event-expanded-authority-tranche15.server";
import { getExpandedMajorEventAuthorityTranche16Server } from "./major-event-expanded-authority-tranche16.server";
import { getExpandedMajorEventAuthorityTranche17Server } from "./major-event-expanded-authority-tranche17.server";
import { getExpandedMajorEventAuthorityTranche18Server } from "./major-event-expanded-authority-tranche18.server";
import { getExpandedMajorEventAuthorityTranche19Server } from "./major-event-expanded-authority-tranche19.server";
import { getExpandedMajorEventAuthorityTranche20Server } from "./major-event-expanded-authority-tranche20.server";
import { getExpandedMajorEventAuthorityTranche21Server } from "./major-event-expanded-authority-tranche21.server";
import { getExpandedMajorEventAuthorityTranche22Server } from "./major-event-expanded-authority-tranche22.server";
import { getExpandedMajorEventAuthorityTranche23Server } from "./major-event-expanded-authority-tranche23.server";
import { getExpandedMajorEventAuthorityTranche24Server } from "./major-event-expanded-authority-tranche24.server";
import { getExpandedMajorEventAuthorityTranche25Server } from "./major-event-expanded-authority-tranche25.server";
import { getExpandedMajorEventAuthorityTranche26Server } from "./major-event-expanded-authority-tranche26.server";
import { getExpandedMajorEventAuthorityTranche27Server } from "./major-event-expanded-authority-tranche27.server";
import { getExpandedMajorEventAuthorityTranche28Server } from "./major-event-expanded-authority-tranche28.server";
import { getExpandedMajorEventAuthorityTranche29Server } from "./major-event-expanded-authority-tranche29.server";
import { getExpandedMajorEventAuthorityTranche30Server } from "./major-event-expanded-authority-tranche30.server";
import { getExpandedMajorEventAuthorityTranche31Server } from "./major-event-expanded-authority-tranche31.server";
import { getExpandedMajorEventAuthorityTranche32Server } from "./major-event-expanded-authority-tranche32.server";
import { getExpandedMajorEventAuthorityTranche33Server } from "./major-event-expanded-authority-tranche33.server";
import { getExpandedMajorEventAuthorityTranche34Server } from "./major-event-expanded-authority-tranche34.server";
import { getExpandedMajorEventAuthorityTranche35Server } from "./major-event-expanded-authority-tranche35.server";
import { getExpandedMajorEventAuthorityTranche36Server } from "./major-event-expanded-authority-tranche36.server";
import { getExpandedMajorEventAuthorityTranche37Server } from "./major-event-expanded-authority-tranche37.server";
import { getExpandedMajorEventAuthorityTranche38Server } from "./major-event-expanded-authority-tranche38.server";
import { getExpandedMajorEventAuthorityTranche39Server } from "./major-event-expanded-authority-tranche39.server";
import { getExpandedMajorEventAuthorityTranche40Server } from "./major-event-expanded-authority-tranche40.server";
import { getExpandedMajorEventAuthorityTranche41Server } from "./major-event-expanded-authority-tranche41.server";
import { getExpandedMajorEventAuthorityTranche42Server } from "./major-event-expanded-authority-tranche42.server";
import {
  getMajorEventSchemaEnrichmentServer,
  getMajorEventSchemaOccurrenceEnrichmentServer,
} from "./major-event-schema-enrichment.server";

const siteUrl = "https://texasdefined.com";
const esc = (value: string | undefined) => (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

export interface MajorEventOccurrenceWindow {
  label?: string;
  startDate: string;
  endDate?: string;
}

type MajorEventDateShape = {
  startDate: string;
  endDate?: string;
  occurrenceWindows?: MajorEventOccurrenceWindow[];
};

export function getMajorEventOccurrenceWindowsServer(event: MajorEventDateShape): MajorEventOccurrenceWindow[] {
  return event.occurrenceWindows?.length
    ? event.occurrenceWindows
    : [{ startDate: event.startDate, endDate: event.endDate }];
}

export function formatMajorEventDateLabelServer(event: MajorEventDateShape) {
  const windows = getMajorEventOccurrenceWindowsServer(event);
  if (windows.length === 1) return formatDateRange(windows[0].startDate, windows[0].endDate, "en-US");
  if (windows.length <= 3) {
    return windows
      .map((window) => `${window.label ? `${window.label}: ` : ""}${formatDateRange(window.startDate, window.endDate, "en-US")}`)
      .join(" · ");
  }
  return `${formatDateRange(event.startDate, event.endDate, "en-US")} · ${windows.length} scheduled windows`;
}

export function getMajorEventRecordServer(slug: string) {
  const event = getMajorEventAuthorityServer(slug)
    ?? getExpandedMajorEventAuthorityServer(slug)
    ?? getExpandedMajorEventAuthorityTranche3Server(slug)
    ?? getExpandedMajorEventAuthorityTranche4Server(slug)
    ?? getExpandedMajorEventAuthorityTranche5Server(slug)
    ?? getExpandedMajorEventAuthorityTranche6Server(slug)
    ?? getExpandedMajorEventAuthorityTranche7Server(slug)
    ?? getExpandedMajorEventAuthorityTranche8Server(slug)
    ?? getExpandedMajorEventAuthorityTranche9Server(slug)
    ?? getExpandedMajorEventAuthorityTranche10Server(slug)
    ?? getExpandedMajorEventAuthorityTranche11Server(slug)
    ?? getExpandedMajorEventAuthorityTranche12Server(slug)
    ?? getExpandedMajorEventAuthorityTranche13Server(slug)
    ?? getExpandedMajorEventAuthorityTranche14Server(slug)
    ?? getExpandedMajorEventAuthorityTranche15Server(slug)
    ?? getExpandedMajorEventAuthorityTranche16Server(slug)
    ?? getExpandedMajorEventAuthorityTranche17Server(slug)
    ?? getExpandedMajorEventAuthorityTranche18Server(slug)
    ?? getExpandedMajorEventAuthorityTranche19Server(slug)
    ?? getExpandedMajorEventAuthorityTranche20Server(slug)
    ?? getExpandedMajorEventAuthorityTranche21Server(slug)
    ?? getExpandedMajorEventAuthorityTranche22Server(slug)
    ?? getExpandedMajorEventAuthorityTranche23Server(slug)
    ?? getExpandedMajorEventAuthorityTranche24Server(slug)
    ?? getExpandedMajorEventAuthorityTranche25Server(slug)
    ?? getExpandedMajorEventAuthorityTranche26Server(slug)
    ?? getExpandedMajorEventAuthorityTranche27Server(slug)
    ?? getExpandedMajorEventAuthorityTranche28Server(slug)
    ?? getExpandedMajorEventAuthorityTranche29Server(slug)
    ?? getExpandedMajorEventAuthorityTranche30Server(slug)
    ?? getExpandedMajorEventAuthorityTranche31Server(slug)
    ?? getExpandedMajorEventAuthorityTranche32Server(slug)
    ?? getExpandedMajorEventAuthorityTranche33Server(slug)
    ?? getExpandedMajorEventAuthorityTranche34Server(slug)
    ?? getExpandedMajorEventAuthorityTranche35Server(slug)
    ?? getExpandedMajorEventAuthorityTranche36Server(slug)
    ?? getExpandedMajorEventAuthorityTranche37Server(slug)
    ?? getExpandedMajorEventAuthorityTranche38Server(slug)
    ?? getExpandedMajorEventAuthorityTranche39Server(slug)
    ?? getExpandedMajorEventAuthorityTranche40Server(slug)
    ?? getExpandedMajorEventAuthorityTranche41Server(slug)
    ?? getExpandedMajorEventAuthorityTranche42Server(slug);
  if (!event) return event;
  if (event.slug === "texas-renaissance-festival") {
    return {
      ...event,
      countySlug: "grimes",
      countyName: "Grimes County",
      occurrenceWindows: [
        { label: "Weekend 1", startDate: "2026-10-10", endDate: "2026-10-11" },
        { label: "Weekend 2", startDate: "2026-10-17", endDate: "2026-10-18" },
        { label: "Weekend 3", startDate: "2026-10-24", endDate: "2026-10-25" },
        { label: "Weekend 4", startDate: "2026-10-31", endDate: "2026-11-01" },
        { label: "Weekend 5", startDate: "2026-11-07", endDate: "2026-11-08" },
        { label: "Weekend 6", startDate: "2026-11-14", endDate: "2026-11-15" },
        { label: "Weekend 7", startDate: "2026-11-21", endDate: "2026-11-22" },
        { label: "Thanksgiving weekend", startDate: "2026-11-27", endDate: "2026-11-29" },
      ],
      sources: [
        ...event.sources,
        { label: "Grimes County local governments — City of Todd Mission", url: "https://grimescountytexas.gov/index.asp?DE=3022B303-9FE9-41DE-A0CF-258F294C1D5F&SEC=FCB69960-DFD0-4FC5-BD10-AF5392EB0EF8" },
      ],
    };
  }
  if (event.slug === "mardi-gras-galveston") {
    return {
      ...event,
      occurrenceWindows: [
        { label: "First weekend", startDate: "2027-01-29", endDate: "2027-01-31" },
        { label: "Second weekend", startDate: "2027-02-05", endDate: "2027-02-07" },
        { label: "Fat Tuesday", startDate: "2027-02-09", endDate: "2027-02-09" },
      ],
    };
  }
  return event;
}

export function loadMajorEventPageServer(slug: string) {
  const event = getMajorEventRecordServer(slug);
  if (!event) return null;
  const occurrenceWindows = getMajorEventOccurrenceWindowsServer(event);
  const dateLabel = formatMajorEventDateLabelServer(event);
  const eventYear = new Date(occurrenceWindows[0]?.startDate ?? event.startDate).getUTCFullYear();
  const canonicalUrl = `${siteUrl}/event/${event.slug}`;
  const placeLine = [event.city && `${event.city}, Texas`, event.countyName].filter(Boolean).join(" · ");
  const planning = event.planningSections.map((item) => `<section class="mt-8"><h2 class="font-display text-2xl">${esc(item.title)}</h2><p class="mt-3 leading-7 text-muted-foreground">${esc(item.body)}</p></section>`).join("");
  const countyHref = event.countySlug ? `/browse/counties#county-${event.countySlug}` : null;
  const relatedItems = countyHref && !event.relatedLinks.some((item) => item.href === countyHref)
    ? [{ href: countyHref, label: `Explore ${event.countyName ?? "the county"}`, description: `Continue from ${event.name} into the county guide for places, communities and local resources.` }, ...event.relatedLinks]
    : event.relatedLinks;
  const related = relatedItems.map((item) => `<li><a class="font-semibold text-primary underline" href="${esc(item.href)}">${esc(item.label)}</a><span class="text-muted-foreground"> — ${esc(item.description)}</span></li>`).join("");
  const schemaEnrichment = getMajorEventSchemaEnrichmentServer(event.slug);
  const displayOffers = [
    ...(schemaEnrichment?.offers ?? []),
    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.offers ?? []),
  ].filter((offer, index, offers) => offers.findIndex((candidate) => `${candidate.name}|${candidate.url}|${candidate.price}` === `${offer.name}|${offer.url}|${offer.price}`) === index);
  const displayPerformers = [
    ...(schemaEnrichment?.performers ?? []),
    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.performers ?? []),
  ].filter((item, index, performers) => performers.findIndex((candidate) => `${candidate.type}|${candidate.name}|${candidate.url ?? ""}` === `${item.type}|${item.name}|${item.url ?? ""}`) === index);
  const organizerMarkup = schemaEnrichment?.organizer
    ? `<p><strong>Organizer:</strong> <a class="font-semibold text-primary underline" href="${esc(schemaEnrichment.organizer.url)}" target="_blank" rel="noreferrer noopener">${esc(schemaEnrichment.organizer.name)} ↗</a></p>`
    : "";
  const offersMarkup = displayOffers.length
    ? `<div><h3 class="font-display text-xl">Verified admission options</h3><ul class="mt-2 space-y-2">${displayOffers.map((offer) => `<li><a class="font-semibold text-primary underline" href="${esc(offer.url)}" target="_blank" rel="noreferrer noopener">${esc(offer.name)} — $${offer.price.toFixed(2)} ${offer.priceCurrency} ↗</a></li>`).join("")}</ul></div>`
    : "";
  const performersMarkup = displayPerformers.length
    ? `<div><h3 class="font-display text-xl">Announced performers</h3><p class="mt-2 text-muted-foreground">${displayPerformers.map((item) => item.url ? `<a class="font-semibold text-primary underline" href="${esc(item.url)}" target="_blank" rel="noreferrer noopener">${esc(item.name)} ↗</a>` : esc(item.name)).join(", ")}</p></div>`
    : "";
  const imageMarkup = schemaEnrichment?.image
    ? `<figure><img class="w-full rounded-xl" src="${esc(schemaEnrichment.image.url)}" alt="${esc(schemaEnrichment.image.alt)}" loading="lazy" decoding="async" /><figcaption class="mt-2 text-sm text-muted-foreground"><a class="underline" href="${esc(schemaEnrichment.image.sourceUrl)}" target="_blank" rel="noreferrer noopener">Image source ↗</a></figcaption></figure>`
    : "";
  const enrichmentMarkup = schemaEnrichment
    ? `<section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Verified event details</h2><div class="mt-4 space-y-5">${imageMarkup}${organizerMarkup}${offersMarkup}${performersMarkup}<p class="text-sm text-muted-foreground">Official-source details checked ${esc(schemaEnrichment.verifiedAt)}. Ticket prices and lineups can change; confirm the linked official source before purchasing or traveling.</p></div></section>`
    : "";
  const mergedSources = [...event.sources, ...(schemaEnrichment?.sources ?? [])]
    .filter((source, index, sources) => sources.findIndex((candidate) => candidate.url === source.url) === index);
  const sources = mergedSources.map((source) => `<li><a class="font-semibold text-primary underline" href="${esc(source.url)}" target="_blank" rel="noreferrer noopener">${esc(source.label)} ↗</a></li>`).join("");
  const html = `<nav class="mb-8 text-sm text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / ${esc(event.name)}</nav><header class="border-b border-border pb-8"><p class="eyebrow text-primary">Major Texas event</p><h1 class="mt-3 font-display text-5xl sm:text-6xl">${esc(event.name)}</h1><p class="mt-5 text-lg text-muted-foreground">${esc(dateLabel)} · ${esc(placeLine)}</p>${event.dateNote ? `<p class="mt-4 text-sm text-muted-foreground">${esc(event.dateNote)}</p>` : ""}<p class="mt-5"><a class="font-semibold text-primary underline" href="${esc(event.officialUrl)}" target="_blank" rel="noreferrer noopener">Official event information ↗</a></p></header><section class="mt-12"><h2 class="font-display text-3xl">Why plan around ${esc(event.name)}?</h2><p class="mt-4 leading-7 text-muted-foreground">${esc(event.whyItMatters)}</p></section>${enrichmentMarkup}<section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Plan the visit</h2>${planning}</section><section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Keep exploring</h2><ul class="mt-4 space-y-3">${related}</ul></section><section class="mt-10 border-t border-border pt-8"><h2 class="font-display text-3xl">Official sources</h2><ul class="mt-4 space-y-3">${sources}</ul></section>`;
  const venueGuide = resolveSportsVenueEventLink(event.venue);
  const defaultLocation = {
    "@type": "Place",
    name: event.venue || event.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: event.city,
      addressRegion: "TX",
      addressCountry: "US",
    },
  };
  const location = venueGuide
    ? { ...defaultLocation, name: event.venue, url: `${siteUrl}${venueGuide.href}` }
    : defaultLocation;
  const schemaEvents = occurrenceWindows.map((window) => {
    const occurrenceEnrichment = getMajorEventSchemaOccurrenceEnrichmentServer(event.slug, window.label);
    const organizer = occurrenceEnrichment?.organizer
      ? {
          "@type": occurrenceEnrichment.organizer.type,
          name: occurrenceEnrichment.organizer.name,
          ...(occurrenceEnrichment.organizer.url ? { url: occurrenceEnrichment.organizer.url } : {}),
        }
      : undefined;
    const offers = occurrenceEnrichment?.offers?.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      url: offer.url,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
    }));
    const performers = occurrenceEnrichment?.performers?.map((item) => ({
      "@type": item.type,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    }));
    return {
      "@type": "Event",
      name: window.label ? `${event.name} — ${window.label}` : event.name,
      description: event.whyItMatters,
      url: canonicalUrl,
      startDate: window.startDate,
      endDate: window.endDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      sameAs: event.officialUrl,
      location,
      ...(occurrenceEnrichment?.image ? { image: [occurrenceEnrichment.image.url] } : {}),
      ...(organizer ? { organizer } : {}),
      ...(offers?.length ? { offers } : {}),
      ...(performers?.length ? { performer: performers } : {}),
    };
  });
  const jsonLd = JSON.stringify(schemaEvents.length === 1
    ? { "@context": "https://schema.org", ...schemaEvents[0] }
    : { "@context": "https://schema.org", "@graph": schemaEvents });
  return {
    slug: event.slug,
    name: event.name,
    city: event.city,
    title: `${event.name} ${eventYear}: Dates & Texas Travel Guide`,
    description: `${event.name} ${eventYear} in ${event.city}, Texas: dates, official sources and practical trip planning.`,
    html,
    jsonLd,
  };
}
