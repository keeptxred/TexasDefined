import { formatDateRange } from "@/domain/utils/format";
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

const siteUrl = "https://texasdefined.com";
const esc = (value: string | undefined) => (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

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
    ?? getExpandedMajorEventAuthorityTranche27Server(slug);
  if (!event || event.slug !== "texas-renaissance-festival") return event;
  return {
    ...event,
    countySlug: "grimes",
    countyName: "Grimes County",
    sources: [
      ...event.sources,
      { label: "Grimes County local governments — City of Todd Mission", url: "https://grimescountytexas.gov/index.asp?DE=3022B303-9FE9-41DE-A0CF-258F294C1D5F&SEC=FCB69960-DFD0-4FC5-BD10-AF5392EB0EF8" },
    ],
  };
}

export function loadMajorEventPageServer(slug: string) {
  const event = getMajorEventRecordServer(slug);
  if (!event) return null;
  const dateLabel = formatDateRange(event.startDate, event.endDate, "en-US");
  const canonicalUrl = `${siteUrl}/event/${event.slug}`;
  const placeLine = [event.city && `${event.city}, Texas`, event.countyName].filter(Boolean).join(" · ");
  const planning = event.planningSections.map((item) => `<section class="mt-8"><h2 class="font-display text-2xl">${esc(item.title)}</h2><p class="mt-3 leading-7 text-muted-foreground">${esc(item.body)}</p></section>`).join("");
  const countyHref = event.countySlug ? `/browse/counties#county-${event.countySlug}` : null;
  const relatedItems = countyHref && !event.relatedLinks.some((item) => item.href === countyHref)
    ? [{ href: countyHref, label: `Explore ${event.countyName ?? "the county"}`, description: `Continue from ${event.name} into the county guide for places, communities and local resources.` }, ...event.relatedLinks]
    : event.relatedLinks;
  const related = relatedItems.map((item) => `<li><a class="font-semibold text-primary underline" href="${esc(item.href)}">${esc(item.label)}</a><span class="text-muted-foreground"> — ${esc(item.description)}</span></li>`).join("");
  const sources = event.sources.map((source) => `<li><a class="font-semibold text-primary underline" href="${esc(source.url)}" target="_blank" rel="noreferrer noopener">${esc(source.label)} ↗</a></li>`).join("");
  const html = `<nav class="mb-8 text-sm text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / ${esc(event.name)}</nav><header class="border-b border-border pb-8"><p class="eyebrow text-primary">Major Texas event</p><h1 class="mt-3 font-display text-5xl sm:text-6xl">${esc(event.name)}</h1><p class="mt-5 text-lg text-muted-foreground">${esc(dateLabel)} · ${esc(placeLine)}</p>${event.dateNote ? `<p class="mt-4 text-sm text-muted-foreground">${esc(event.dateNote)}</p>` : ""}<p class="mt-5"><a class="font-semibold text-primary underline" href="${esc(event.officialUrl)}" target="_blank" rel="noreferrer noopener">Official event information ↗</a></p></header><section class="mt-12"><h2 class="font-display text-3xl">Why plan around ${esc(event.name)}?</h2><p class="mt-4 leading-7 text-muted-foreground">${esc(event.whyItMatters)}</p></section><section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Plan the visit</h2>${planning}</section><section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Keep exploring</h2><ul class="mt-4 space-y-3">${related}</ul></section><section class="mt-10 border-t border-border pt-8"><h2 class="font-display text-3xl">Official sources</h2><ul class="mt-4 space-y-3">${sources}</ul></section>`;
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "Event", name: event.name, description: event.whyItMatters, url: canonicalUrl, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", sameAs: event.officialUrl, location: { "@type": "Place", name: event.venue || event.city, address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } } });
  return {
    slug: event.slug,
    name: event.name,
    city: event.city,
    title: `${event.name}: Dates & Texas Travel Guide`,
    description: `${event.name} in ${event.city}: dates, official sources and practical trip planning.`,
    html,
    jsonLd,
  };
}