import { formatDateRange } from "@/domain/utils/format";
import { buildHotelsComEvergreenClick, hotelsComPageSid, PALESTINE_HOTELS_SID } from "@/lib/cj-hotels-evergreen";
import { getPalestinePolarExpressRollover } from "./palestine-polar-express-rollover.server";
import { applyVerifiedMardiGrasSourceFacts } from "./events/mardi-gras-auto-published.server";
import { resolveSportsVenueEventLink } from "@/data/sports-venue-event-links";
import { isRecurrenceDerivedMajorEventSlug } from "./major-event-date-confidence";
import { hasExpiredConfirmedEventOccurrence } from "./event-occurrence-lifecycle";
import { loadTicketmasterEventsServer } from "./events/ticketmaster-events.server";
import { resolveEventTicketCta } from "./events/ticketing";
import { expandFestivalGuide } from "./festival-visitor-guide-extras.server";
import { buildViatorAffiliateUrl } from "../lib/viator-affiliate";
import { verifiedViatorMarketUrl, hasVerifiedViatorMarketUrl } from "./viator-destination-links";
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
import { getExpandedMajorEventAuthorityTranche43Server } from "./major-event-expanded-authority-tranche43.server";
import { getExpandedMajorEventAuthorityTranche44Server } from "./major-event-expanded-authority-tranche44.server";
import { getExpandedMajorEventAuthorityTranche45Server } from "./major-event-expanded-authority-tranche45.server";
import { getExpandedMajorEventAuthorityTranche46Server } from "./major-event-expanded-authority-tranche46.server";
import { getExpandedMajorEventAuthorityTranche47Server } from "./major-event-expanded-authority-tranche47.server";
import { getExpandedMajorEventAuthorityTranche48Server } from "./major-event-expanded-authority-tranche48.server";
import { getExpandedMajorEventAuthorityTranche49Server } from "./major-event-expanded-authority-tranche49.server";
import { getExpandedMajorEventAuthorityTranche50Server } from "./major-event-expanded-authority-tranche50.server";
import { getExpandedMajorEventAuthorityTranche51Server } from "./major-event-expanded-authority-tranche51.server";
import { getExpandedMajorEventAuthorityTranche52Server } from "./major-event-expanded-authority-tranche52.server";
import { getExpandedMajorEventAuthorityTranche53Server } from "./major-event-expanded-authority-tranche53.server";
import { getExpandedMajorEventAuthorityTranche54Server } from "./major-event-expanded-authority-tranche54.server";
import { getExpandedMajorEventAuthorityTranche55Server } from "./major-event-expanded-authority-tranche55.server";
import { getExpandedMajorEventAuthorityTranche56Server } from "./major-event-expanded-authority-tranche56.server";
import { getExpandedMajorEventAuthorityTranche57Server } from "./major-event-expanded-authority-tranche57.server";
import { getExpandedMajorEventAuthorityTranche58Server } from "./major-event-expanded-authority-tranche58.server";
import { getExpandedMajorEventAuthorityTranche59Server } from "./major-event-expanded-authority-tranche59.server";
import {
  eventSchemaStatusUrl,
  getMajorEventSchemaEnrichmentServer,
  getMajorEventSchemaOccurrenceEnrichmentServer,
  type EventSchemaLifecycleStatus,
  type EventSchemaOffer,
  isCompliantMajorEventImage,
} from "./major-event-schema-enrichment.server";

const siteUrl = "https://texasdefined.com";
const HOTELS_COM_AFFILIATE_URL = "https://www.hotels.com/";
// CJ-generated Hotels.com Evergreen Link ID 15734399 (PID 101876465).
// Preserve the Palestine city destination and the same year-free SID for every season.
const PALESTINE_HOTELS_AFFILIATE_URL = buildHotelsComEvergreenClick("https://www.hotels.com/de1634643/hotels-palestine-texas/", PALESTINE_HOTELS_SID);
const esc = (value: string | undefined) => (value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE = "Use the county wildflower map before chasing roadside photos";
const CHAPPELL_HILL_WILDFLOWER_MAP_MARKUP = `<div data-map="chappell-hill-wildflower" class="mt-5">
  <div class="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[16/9]">
    <iframe
      title="Visit Brenham Wildflower Driving Map for Washington County"
      src="https://www.google.com/maps/d/u/0/embed?ehbc=2E312F&amp;mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="h-full w-full"
      allowfullscreen
    ></iframe>
  </div>
  <div class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/things/wildflower-watch/wildflower-driving-map/" target="_blank" rel="noreferrer noopener">Open the live Wildflower Driving Map ↗</a>
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/wp-content/uploads/2018/03/20180323105225204_0001.pdf" target="_blank" rel="noreferrer noopener">Open or download the Washington County road map (PDF) ↗</a>
  </div>
  <p class="mt-3 text-xs leading-6 text-muted-foreground">The live Visit Brenham map is updated during wildflower season with current flower reports and the Bluebonnet Trail Scenic Drive. The PDF is a static county road map for offline reference.</p>
</div>`;

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
    ?? getExpandedMajorEventAuthorityTranche42Server(slug)
    ?? getExpandedMajorEventAuthorityTranche43Server(slug)
    ?? getExpandedMajorEventAuthorityTranche44Server(slug)
    ?? getExpandedMajorEventAuthorityTranche45Server(slug)
    ?? getExpandedMajorEventAuthorityTranche46Server(slug)
    ?? getExpandedMajorEventAuthorityTranche47Server(slug)
    ?? getExpandedMajorEventAuthorityTranche48Server(slug)
    ?? getExpandedMajorEventAuthorityTranche49Server(slug)
    ?? getExpandedMajorEventAuthorityTranche50Server(slug)
    ?? getExpandedMajorEventAuthorityTranche51Server(slug)
    ?? getExpandedMajorEventAuthorityTranche52Server(slug)
    ?? getExpandedMajorEventAuthorityTranche53Server(slug)
    ?? getExpandedMajorEventAuthorityTranche54Server(slug)
    ?? getExpandedMajorEventAuthorityTranche55Server(slug)
    ?? getExpandedMajorEventAuthorityTranche56Server(slug)
    ?? getExpandedMajorEventAuthorityTranche57Server(slug)
    ?? getExpandedMajorEventAuthorityTranche58Server(slug)
    ?? getExpandedMajorEventAuthorityTranche59Server(slug);
  if (!event) return event;
  if (event.slug === "texas-renaissance-festival") {
    return expandFestivalGuide({
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
    });
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
  if (event.slug === "kemah-yachty-gras") {
    return {
      ...event,
      occurrenceWindows: [
        { label: "Yachty Gras boat parade", startDate: "2027-02-06", endDate: "2027-02-06" },
        { label: "Grand Mardi Gras street parade", startDate: "2027-02-09", endDate: "2027-02-09" },
      ],
    };
  }
  if (event.slug === "polar-express-palestine") {
    const verified = getPalestinePolarExpressRollover().next;
    if (verified) {
      // All event indexes share this same official season range; never roll
      // calendar cards forward based only on last year's recurring dates.
      return expandFestivalGuide({
        ...event,
        startDate: verified.startDate,
        endDate: verified.endDate,
        sourceCheckedAt: verified.verifiedAt,
        dateNote: "Dates sourced to the organizer's official 2027 calendars; actual seat inventory is only confirmed by railroad checkout.",
      });
    }
  }
  return expandFestivalGuide(applyVerifiedMardiGrasSourceFacts(event));
}

const officialAirshowTicketPages: Record<string, string> = {
  "wings-over-houston-airshow": "https://wingsoverhouston.com/2026-woha-tickets-sasp/",
  "amigo-airsho": "https://www.amigoairsho.com/tickets",
  "texas-capital-air-show": "https://texascapitalairshow.com/tickets/",
  // Official organizer's current March 20, 2027 TicketSignup event checkout.
  // This is the exact airshow, not the generic Bluebonnet homepage or 2026 show.
  "bluebonnet-airshow": "https://www.ticketsignup.io/TicketEvent/BluebonnetAirshow",
};

// Only verified Viator city catalogs are eligible. These are complementary local
// activities, never event tickets or a claim that a festival is sold on Viator.
const festivalExperienceMarkets: Record<string, { marketSlug: string; cityLabel: string; idea: string }> = {
  "houston-livestock-show-rodeo": { marketSlug: "houston", cityLabel: "Houston", idea: "sightseeing, museums and city experiences before or after the rodeo" },
  "san-antonio-stock-show-rodeo": { marketSlug: "san-antonio", cityLabel: "San Antonio", idea: "historical tours and missions experiences on a separate day" },
  "sxsw": { marketSlug: "austin", cityLabel: "Austin", idea: "city and culture tours between conference commitments" },
  "austin-city-limits-music-festival": { marketSlug: "austin", cityLabel: "Austin", idea: "sightseeing outside your festival days" },
  "fiesta-san-antonio": { marketSlug: "san-antonio", cityLabel: "San Antonio", idea: "local heritage and missions experiences between Fiesta events" },
  "texas-sandfest": { marketSlug: "port-aransas", cityLabel: "Port Aransas", idea: "island and coastal experiences outside the sculpture grounds" },
  "dickens-on-the-strand": { marketSlug: "galveston", cityLabel: "Galveston", idea: "historic neighborhood tours and other island attractions" },
  "polar-express-galveston": { marketSlug: "galveston", cityLabel: "Galveston", idea: "historic downtown tours and family-friendly activities before or after your separately ticketed train ride" },
  "galveston-juneteenth-celebrations": { marketSlug: "galveston", cityLabel: "Galveston", idea: "African American history and other local heritage experiences" },
  // Verified city-level Viator inventories complement holiday outings; never mislabel city tours as event admission.
  "grapevine-christmas-capital-of-texas": { marketSlug: "dallas", cityLabel: "Dallas", idea: "Dallas sightseeing on a separate DFW trip day; this is not Grapevine festival admission" },
  "austin-trail-of-lights": { marketSlug: "austin", cityLabel: "Austin", idea: "Austin museums and sightseeing before the evening trail" },
  "houston-zoo-lights": { marketSlug: "houston", cityLabel: "Houston", idea: "Museum District and Houston sightseeing outside the Zoo Lights ticket window" },
  "moody-gardens-ice-land": { marketSlug: "galveston", cityLabel: "Galveston", idea: "island sightseeing and history tours on another part of the holiday weekend" },
  "holiday-at-the-dallas-arboretum": { marketSlug: "dallas", cityLabel: "Dallas", idea: "Dallas city tours beyond the Arboretum admission" },
  "galaxy-lights-space-center-houston": { marketSlug: "houston", cityLabel: "Houston", idea: "Houston sightseeing outside the space-themed evening event" },
  "ford-holiday-river-parade": { marketSlug: "san-antonio", cityLabel: "San Antonio", idea: "River Walk, mission and history tours on a separate day from the parade" },
  "gaylord-texan-ice": { marketSlug: "dallas", cityLabel: "Dallas", idea: "independent Dallas-area tours on another day, not resort or ICE! admission" },
  "grand-prairie-prairie-lights": { marketSlug: "dallas", cityLabel: "Dallas", idea: "Dallas-area sightseeing before a separately ticketed Grand Prairie lights drive" },
  "moody-gardens-holiday-in-the-gardens": { marketSlug: "galveston", cityLabel: "Galveston", idea: "historic Galveston tours separate from Moody Gardens holiday attraction admission" },
  "grapevine-north-pole-express": { marketSlug: "dallas", cityLabel: "Dallas", idea: "DFW history or sightseeing outside your separately timed Grapevine train excursion" },
  "dallas-zoo-lights": { marketSlug: "dallas", cityLabel: "Dallas", idea: "Dallas history and sightseeing on a different part of the holiday trip" },
};

function buildFestivalNearbyExperiencesMarkupServer(slug: string) {
  const match = festivalExperienceMarkets[slug];
  if (!match || !hasVerifiedViatorMarketUrl(match.marketSlug)) return "";
  const href = buildViatorAffiliateUrl(verifiedViatorMarketUrl(match.marketSlug), `td-festival-${slug}`);
  return `<section data-festival-nearby-experiences class="mt-10 border-y border-border py-8"><p class="eyebrow text-primary">Explore beyond the festival</p><h2 class="mt-2 font-display text-3xl">Tours and experiences in ${esc(match.cityLabel)}</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Consider ${esc(match.idea)}. These independent Viator listings are <strong>not festival tickets</strong>; operators, availability, prices, meeting points and accessibility must be checked before booking.</p><p class="mt-5"><a class="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90" href="${esc(href)}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="viator" data-affiliate-placement="festival-nearby-experiences" data-commercial-partner="viator" data-commercial-placement="festival-nearby-experiences">Explore ${esc(match.cityLabel)} tours on Viator →</a></p><p class="mt-3 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying bookings. Admission to the festival itself is not included.</p></section>`;
}

export function buildOfficialAirshowTicketMarkupServer(slug: string, now = new Date()) {
  const href = officialAirshowTicketPages[slug];
  const event = getMajorEventRecordServer(slug);
  // Date comes from the Texas venue, not UTC midnight. Expired or lifecycle-
  // changed shows must not promote old admission even when an organizer link
  // still responds or its historic checkout is visible.
  const texasParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: "year" | "month" | "day") => texasParts.find((item) => item.type === type)?.value ?? "00";
  const today = [part("year"), part("month"), part("day")].join("-");
  const lifecycle = getMajorEventSchemaOccurrenceEnrichmentServer(slug)?.lifecycle;
  if (!href || !event || (event.endDate ?? event.startDate) < today
    || (lifecycle && lifecycle.status !== "scheduled")) return "";

  return `<section data-airshow-official-tickets class="mt-10 border-y border-border py-8"><p class="eyebrow text-primary">Tickets</p><h2 class="mt-2 font-display text-3xl">Check official air-show ticket options</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The official event-specific ticket page lists any available admission, age rules and purchase conditions. Availability, final fees and cancellation policies are controlled by the organizer; TexasDefined does not hold seats. This is not a Ticketmaster or affiliate offer.</p><p class="mt-5"><a class="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90" href="${esc(href)}" target="_blank" rel="noopener noreferrer">Official tickets and admission →</a></p></section>`;
}

/** Show-date comparisons must use Texas-local midnight, not UTC rollover. */
export function majorEventTicketTexasToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (kind: "year" | "month" | "day") => parts.find((item) => item.type === kind)?.value ?? "00";
  return [part("year"), part("month"), part("day")].join("-");
}

/** The guide's verified cancellation wins over a stale provider sale flag. */
export function majorEventGuideTicketsAllowed(lifecycleStatus?: EventSchemaLifecycleStatus) {
  return lifecycleStatus === undefined || lifecycleStatus === "scheduled";
}

/** Admission offers must obey the reviewed lifecycle and the Texas-local occurrence day. */
export function majorEventGuideOffersAllowed(
  status?: EventSchemaLifecycleStatus,
  occurrenceEndDate?: string,
  now = new Date(),
) {
  return majorEventGuideTicketsAllowed(status)
    && (!occurrenceEndDate || occurrenceEndDate >= majorEventTicketTexasToday(now));
}

/** A dated or explicitly sold-out price is not an actionable booking offer. */
export function majorEventOfferIsActionable(offer: EventSchemaOffer, now = new Date()) {
  const today = majorEventTicketTexasToday(now);
  return offer.availability !== "https://schema.org/SoldOut"
    && (!offer.validFrom || offer.validFrom.slice(0, 10) <= today)
    && (!offer.validThrough || offer.validThrough.slice(0, 10) >= today);
}

/** Preserve the provider's published venue-local wall clock; never invent a time. */
export function majorEventSessionTimeLabel(time?: string) {
  if (!time) return "Time to confirm with provider";
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return "Time to confirm with provider";
  const hour = Number(match[1]);
  if (hour > 23 || Number(match[2]) > 59) return "Time to confirm with provider";
  return `${hour % 12 || 12}:${match[2]} ${hour < 12 ? "AM" : "PM"}`;
}

// South Pole's verified organizer season starts November 28, 2026; a
// provider-side Nov 27 session must not be promoted as festival admission.
// Narrow the guard to this reconciled conflict so unrelated previews or
// early admission at other events are not silently removed.
export function majorEventTicketInsideVerifiedSeasonServer(slug: string, candidateDate: string) {
  if (slug !== "south-pole-illuminated-festival") return true;
  const authority = getMajorEventRecordServer(slug);
  return Boolean(authority && candidateDate >= authority.startDate
    && candidateDate <= (authority.endDate ?? authority.startDate));
}

export function buildMajorEventTicketingMarkupServer(slug: string, now = new Date()) {
  // An official event can be cancelled, postponed, or rescheduled while its
  // Ticketmaster Discovery listing still carries old on-sale metadata.
  // Preserve source/organizer content elsewhere on the guide, but do not
  // render misleading event-specific admission or sponsored affiliate CTAs.
  const lifecycle = getMajorEventSchemaOccurrenceEnrichmentServer(slug)?.lifecycle;
  if (!majorEventGuideTicketsAllowed(lifecycle?.status)) return "";
  const matches = loadTicketmasterEventsServer(undefined, now)
    .filter((record) => record.guidePath === `/event/${slug}`
      && majorEventTicketInsideVerifiedSeasonServer(slug, record.startDate));
  const actionable = matches.flatMap((record) => {
    const cta = resolveEventTicketCta(record.ticketing);
    return cta ? [{ record, cta }] : [];
  });

  if (actionable.length === 1) {
    const { record, cta } = actionable[0];
    const affiliateAttributes = cta.isAffiliate
      ? ` data-affiliate-partner="${esc(cta.provider)}" data-affiliate-placement="major-event-guide-ticket" data-affiliate-event-id=\"${esc(record.id)}\" data-commercial-partner="${esc(cta.provider)}" data-commercial-placement="major-event-guide-ticket"`
      : "";
    const disclosure = cta.disclosure
      ? `<p class="mt-3 text-xs text-muted-foreground">${esc(cta.disclosure)}</p>`
      : "";
    const officialPrimaryNote = slug === "big-12-football-championship"
      ? '<p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The Big 12 Conference identifies SeatGeek as its official primary public ticketing channel. This Ticketmaster listing is an additional commercial option, not a representation that Ticketmaster is the conference\'s primary box office. Compare seller terms and ticket availability with the conference\'s official ticket page before purchasing.</p>'
      : "";
    return `<section data-event-ticketing class="mt-10 border-y border-border py-8"><p class="eyebrow text-primary">Tickets</p><h2 class="mt-2 font-display text-3xl">Check ticket options</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The provider lists an event-specific ticket destination for ${esc(record.title)}. Confirm current availability, prices and fees directly with the seller; TexasDefined does not hold seats.</p><p class="mt-5"><a class="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90" href="${esc(cta.href)}" target="_blank" rel="${esc(cta.rel)}"${affiliateAttributes}>${esc(cta.label)}</a></p>${officialPrimaryNote}${disclosure}</section>`;
  }

  if (actionable.length > 1) {
    const upcoming = actionable
      .filter(({ record }) => record.startDate >= majorEventTicketTexasToday(now))
      .sort((a, b) => a.record.startDate.localeCompare(b.record.startDate))
      .slice(0, 6);
    if (!upcoming.length) return "";
    const dates = upcoming.map(({ record }) => record.startDate).sort();
    const first = dates[0];
    const last = dates.at(-1) ?? first;
    const rows = upcoming.map(({ record, cta }) => {
      const tracking = cta.isAffiliate
        ? ` data-affiliate-partner="${esc(cta.provider)}" data-affiliate-placement="major-event-guide-session" data-affiliate-event-id=\"${esc(record.id)}\" data-commercial-partner="${esc(cta.provider)}" data-commercial-placement="major-event-guide-session"`
        : "";
      const performanceTime = majorEventSessionTimeLabel(record.startTime);
      const performanceLocation = record.venueName ? ` · ${esc(record.venueName)}` : "";
      const accessibleLabel = `${cta.label.replace(" →", "")}: ${record.title}, ${record.startDate}, ${performanceTime}${record.venueName ? ", " + record.venueName : ""}`;
      return `<li class="flex flex-col gap-2 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between"><span><strong>${esc(record.startDate)}</strong> · ${esc(performanceTime)}${performanceLocation} · ${esc(record.title)}</span><a class="font-semibold text-primary underline" aria-label="${esc(accessibleLabel)}" href="${esc(cta.href)}" target="_blank" rel="${esc(cta.rel)}"${tracking}>${esc(cta.label)}</a></li>`;
    }).join("");
    const hasAffiliate = upcoming.some(({ cta }) => cta.isAffiliate);
    return `<section data-event-ticketing class="mt-10 border-y border-border py-8"><p class="eyebrow text-primary">Tickets</p><h2 class="mt-2 font-display text-3xl">Choose the exact ticketed session</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The current live event feed contains multiple sessions. Confirm the artist, date, venue and ticket type before checkout; a parking pass is not arena admission.</p><ul class="mt-5">${rows}</ul><p class="mt-4"><a class="font-semibold text-primary underline" href="/events?start=${esc(first)}&amp;end=${esc(last)}">Compare ticketed sessions →</a></p>${hasAffiliate ? '<p class="mt-3 text-xs text-muted-foreground">Affiliate links · ticket checkout is handled by the provider. TexasDefined may earn a commission from qualifying purchases.</p>' : ""}</section>`;
  }

  return "";
}

export function loadMajorEventPageServer(slug: string) {
  const publishedEvent = getMajorEventRecordServer(slug);
  if (!publishedEvent) return null;
  const rollover = slug === "polar-express-palestine" ? getPalestinePolarExpressRollover() : null;
  const verifiedNext = rollover?.next ?? null;
  const awaitingNewSeason = Boolean(rollover?.awaiting);
  // The JSON artifact is updated only from independently validated official
  // calendar imagery by the protected GitHub refresh process. Never extrapolate.
  const event = verifiedNext ? {
    ...publishedEvent,
    startDate: verifiedNext.startDate,
    endDate: verifiedNext.endDate,
    sourceCheckedAt: verifiedNext.verifiedAt,
    seoTitle: "Palestine Polar Express 2027: Official Train Schedule & Visitor Guide",
    seoDescription: "Texas State Railroad's verified 2027 departure dates, train tickets, visitor planning and Palestine hotels. Check live checkout for seats.",
    dateNote: "2027 dates and times are transcribed from the Texas State Railroad's published November and December calendars. Individual trains can sell out; always check official ticket inventory.",
    sources: publishedEvent.sources.filter(source => !source.url.includes("visitpalestine.com/events/2026/")),
  } : awaitingNewSeason ? {
    ...publishedEvent,
    seoTitle: "Palestine Polar Express: 2027 Dates Not Yet Announced",
    seoDescription: "The 2026 Polar Express season has ended. The Texas State Railroad has not yet published a verified 2027 schedule. See official booking information and Palestine visitor tips.",
    dateNote: "The last confirmed Palestine Polar Express season ended December 28, 2026. The next season's dates are not yet published or verified; the past departure calendar is not a 2027 schedule.",
  } : publishedEvent;
  const isPalestinePolarExpress = event.slug === "polar-express-palestine";
  const occurrenceWindows = getMajorEventOccurrenceWindowsServer(event);
  const dateLabel = awaitingNewSeason ? "2027 schedule not yet announced" : formatMajorEventDateLabelServer(event);
  const ticketingMarkup = buildMajorEventTicketingMarkupServer(event.slug) || buildOfficialAirshowTicketMarkupServer(event.slug);
  const nearbyExperiencesMarkup = buildFestivalNearbyExperiencesMarkupServer(event.slug);
  const eventYear = new Date(occurrenceWindows[0]?.startDate ?? event.startDate).getUTCFullYear();
  const yearQualifiedEventName = event.name.includes(String(eventYear)) ? event.name : `${event.name} ${eventYear}`;
  const canonicalUrl = `${siteUrl}/event/${event.slug}`;
  const placeLine = [event.city && `${event.city}, Texas`, event.countyName].filter(Boolean).join(" · ");
  const recurrenceDerived = isRecurrenceDerivedMajorEventSlug(event.slug);
  const expiredConfirmedOccurrence = hasExpiredConfirmedEventOccurrence(event);
  const dateConfidenceMarkup = awaitingNewSeason
    ? '<div data-polar-express-season-pending="true" class="mt-5 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6"><strong>2027 departure dates are not yet announced.</strong> Do not book travel around an assumed date. The prior 2026 season has ended.</div>'
    : verifiedNext
      ? '<div data-polar-express-season-verified="2027" class="mt-5 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6"><strong>Railroad-published 2027 schedule.</strong> Published times are not a claim that tickets or seats remain available; check the official checkout.</div>'
      : recurrenceDerived
    ? `<div data-event-date-confidence="recurrence-derived" class="mt-5 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6"><strong>Planning dates, not yet year-specific.</strong> This date window is derived from the organizer's published recurrence pattern. Confirm the official year-specific schedule before booking nonrefundable travel.</div>`
    : expiredConfirmedOccurrence
      ? `<div data-event-date-confidence="expired-confirmed" class="mt-5 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6"><strong>Latest confirmed occurrence has ended.</strong> These are the most recent organizer-confirmed dates on file. Do not assume the next annual occurrence until the organizer publishes it.</div>`
      : "";
  const snapshotMarkup = isPalestinePolarExpress ? "" : `<section data-major-event-snapshot="true" class="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
    <div class="bg-background p-5"><p class="eyebrow text-muted-foreground">Dates</p><p class="mt-2 font-semibold">${esc(dateLabel)}</p></div>
    <div class="bg-background p-5"><p class="eyebrow text-muted-foreground">Venue</p><p class="mt-2 font-semibold">${esc(event.venue || event.city)}</p></div>
    <div class="bg-background p-5"><p class="eyebrow text-muted-foreground">Location</p><p class="mt-2 font-semibold">${esc(placeLine)}</p></div>
    <div class="bg-background p-5"><p class="eyebrow text-muted-foreground">Date status</p><p class="mt-2 font-semibold">${event.slug === "polar-express-palestine" ? (awaitingNewSeason ? "Awaiting organizer's 2027 dates" : verifiedNext ? "Official 2027 railroad calendar; verify seats" : "Railroad calendar; verify live checkout") : recurrenceDerived ? "Projected from organizer recurrence" : expiredConfirmedOccurrence ? "Last confirmed occurrence" : "Published event window"}</p></div>
  </section>`;
  const seasonSensitive = awaitingNewSeason || Boolean(verifiedNext);
  const quickFacts = seasonSensitive
    ? (event.quickFacts ?? []).filter(fact => !/2026|fare|premium|historical.preservation fee/i.test(fact.label + " " + fact.value))
    : event.quickFacts;
  // Palestine is an editorial travel guide, not a multi-card metrics dashboard.
  // Keep its extensive fares/accessibility detail in the booking + planning copy.
  // Other event guides retain their existing structured fact-grid presentation.
  const quickFactsMarkup = isPalestinePolarExpress
    ? `<section data-major-event-quick-facts="true" data-polar-express-editorial-essentials="true" aria-label="Plan your visit" class="mt-8 border-y border-border py-6">
        <h2 class="font-display text-2xl">Plan your visit</h2>
        <div class="mt-4 grid gap-x-10 gap-y-5 md:grid-cols-3">
          <p class="text-sm leading-6"><strong class="block text-foreground">Where to board</strong><span class="text-muted-foreground">Texas State Railroad, Palestine Depot<br />789 Park Road 70</span></p>
          <p class="text-sm leading-6"><strong class="block text-foreground">Allow enough time</strong><span class="text-muted-foreground">Approximately one-hour train ride. Arrive 45 minutes before departure.</span></p>
          <p class="text-sm leading-6"><strong class="block text-foreground">Accessibility and seating</strong><span class="text-muted-foreground">Call <a class="underline" href="tel:+18556327729">855-632-7729</a> for the accessible railcar. Compare coach, dome and premium cars below.</span></p>
        </div>
      </section>`
    : quickFacts?.length
      ? `<section data-major-event-quick-facts="true" aria-label="Visitor essentials" class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">${quickFacts.map((fact) => `<div class="rounded-xl border border-border bg-muted/20 px-5 py-4"><p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">${esc(fact.label)}</p><p class="mt-2 font-semibold leading-6">${esc(fact.value)}</p></div>`).join("")}</section>`
      : "";
  const seasonPlanning = seasonSensitive
    ? event.planningSections.filter(item =>
        !/2026|2027|fare tiers|published prices|diesel locomotive/i.test(item.title + " " + item.body))
    : event.planningSections;
  const planning = seasonPlanning.map((item) => {
    const supplement = event.slug === "chappell-hill-bluebonnet-festival"
      && item.title === CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE
      ? CHAPPELL_HILL_WILDFLOWER_MAP_MARKUP
      : "";
    return `<section class="mt-8"><h2 class="font-display text-2xl">${esc(item.title)}</h2><p class="mt-3 leading-7 text-muted-foreground">${esc(item.body)}</p>${supplement}</section>`;
  }).join("");
  const countyHref = event.countySlug ? `/county/${event.countySlug}` : null;
  const legacyCountyHref = event.countySlug ? `/browse/counties#county-${event.countySlug}` : null;
  const normalizedRelatedItems = event.relatedLinks
    .filter((item) => item.href !== legacyCountyHref)
    .filter((item, index, items) => items.findIndex((candidate) => candidate.href === item.href) === index);
  const relatedItems = countyHref
    ? [{ href: countyHref, label: `Explore ${event.countyName ?? "the county"}`, description: `Continue from ${event.name} into the county guide for places, communities and local resources.` }, ...normalizedRelatedItems.filter((item) => item.href !== countyHref)]
    : normalizedRelatedItems;
  const related = relatedItems.map((item) => `<li><a class="font-semibold text-primary underline" href="${esc(item.href)}">${esc(item.label)}</a><span class="text-muted-foreground"> — ${esc(item.description)}</span></li>`).join("");
  const hotelBookingHref = isPalestinePolarExpress ? PALESTINE_HOTELS_AFFILIATE_URL
    : buildHotelsComEvergreenClick(HOTELS_COM_AFFILIATE_URL, hotelsComPageSid(`/event/${event.slug}`));
  const hotelBookingLabel = isPalestinePolarExpress ? "Compare hotels in Palestine →" : "Search hotels on Hotels.com →";
  const palestineScheduleMarkup = isPalestinePolarExpress
    ? `<section data-polar-express-2026-schedule="true" class="mt-7 rounded-2xl border border-border bg-muted/20 p-6"><p class="eyebrow text-primary">Before booking</p><h2 class="mt-2 font-display text-2xl">2026 train departures and tickets</h2><p class="mt-3 leading-7">Texas State Railroad’s official November and December 2026 calendars confirm service on November 13 and December 28. Nov 13: 5:30 and 7:00 PM; Dec 28: 3:00, 4:30, 6:00 and 7:30 PM. December 18 is also scheduled. These are advertised trains, not guaranteed available seats: check the live booking calendar or call 855-632-7729 for current inventory.</p><p class="mt-3 text-sm leading-6 text-muted-foreground"><strong>Official railroad calendar:</strong> Nov 13–15, 19–24, 27–29; Dec 3–6, 9–13, 15–16, 18–23, 26–28. No departures shown Dec 24–25. Not every day in the season has service.</p><div class="mt-5 flex flex-wrap gap-3"><a class="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground" href="${esc(event.officialUrl)}" target="_blank" rel="noopener noreferrer" data-event-official-ticket-cta="true">Check live train tickets ↗</a><a class="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3 font-semibold text-primary" href="https://www.visitpalestine.com/events/2026/httpstexasstaterailroadnetevents2332" target="_blank" rel="noopener noreferrer">See city’s 2026 event listing ↗</a></div><p class="mt-4 text-sm text-muted-foreground">Train uses a diesel locomotive in 2026. Arrive at least 45 minutes early; collect boarding passes 15 minutes before departure. A $20-per-ticket cancellation fee applies to eligible cancellations 30+ days ahead; no refund within 30 days.</p></section>`
    : "";
  const rolloverPanel = awaitingNewSeason
    ? `<section data-polar-express-season-pending="true" class="mt-7 rounded-2xl border border-border bg-muted/20 p-6"><h2 class="font-display text-2xl">2027 departure calendar not yet announced</h2><p class="mt-3 leading-7">Texas State Railroad has not yet published a verified new-season calendar. Its last confirmed 2026 season is complete. Do not infer future dates from last year's trains.</p><p class="mt-4"><a class="font-semibold text-primary underline" href="https://texasstaterailroad.net/the-polar-express/" target="_blank" rel="noopener noreferrer">Check Texas State Railroad for schedule announcements ↗</a></p></section>`
    : verifiedNext
      ? `<section data-polar-express-season-verified="2027" class="mt-7 rounded-2xl border border-border bg-muted/20 p-6"><h2 class="font-display text-2xl">Official 2027 train departure calendar</h2><p class="mt-3 leading-7">Railroad-published departures from ${esc(verifiedNext.startDate)} through ${esc(verifiedNext.endDate)}. These are scheduled times, not an indication that tickets remain available.</p><ul class="mt-4 grid gap-2 sm:grid-cols-2">${verifiedNext.dates.map(day => `<li class="text-sm">${esc(day.date)} · ${esc(day.times.join(", "))}</li>`).join("")}</ul><p class="mt-4"><a data-event-official-ticket-cta="true" class="font-semibold text-primary underline" href="https://texasstaterailroad.net/the-polar-express/" target="_blank" rel="noopener noreferrer">Check current ticket availability ↗</a></p></section>`
      : palestineScheduleMarkup;
  const stayNearbyMarkup = `<div data-stay-nearby-slot class="my-10" aria-label="Places to stay near ${esc(event.name)}"><section class="border-y border-border py-8"><p class="eyebrow text-primary">Where to stay</p><h2 class="mt-2 font-display text-3xl">Places to stay in ${esc(event.city)}</h2><p class="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Compare lodging early for major event weekends, when the closest rooms can fill quickly. Check in-town options first, then widen the search to nearby communities if your preferred dates or price range are unavailable.</p><p class="mt-5"><a class="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90" href="${hotelBookingHref}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-affiliate-partner="hotels.com" data-affiliate-placement="event-stay-server-fallback" data-commercial-partner="hotels.com" data-commercial-placement="event-stay-server-fallback">${hotelBookingLabel}</a></p><p class="mt-3 text-xs text-muted-foreground">Affiliate disclosure: Texas Defined may earn a commission from qualifying Hotels.com bookings, at no additional cost to you.</p></section></div>`;
  const schemaEnrichment = getMajorEventSchemaEnrichmentServer(event.slug);
  const displayImage = isCompliantMajorEventImage(schemaEnrichment?.image) ? schemaEnrichment.image : undefined;
  // The historical enrichment catalog is not a live checkout feed. Never
  // resurrect a cancelled, past, or explicitly sold-out occurrence through the
  // secondary price list after its primary ticket CTA was suppressed.
  const eligibleOfferWindows = occurrenceWindows.filter((window) =>
    majorEventGuideOffersAllowed(
      getMajorEventSchemaOccurrenceEnrichmentServer(event.slug, window.label)?.lifecycle?.status,
      window.endDate ?? window.startDate,
    ));
  const displayOffers = !expiredConfirmedOccurrence
    && majorEventGuideTicketsAllowed(schemaEnrichment?.lifecycle?.status)
    && eligibleOfferWindows.length
    ? [
        ...(schemaEnrichment?.offers ?? []),
        ...Object.entries(schemaEnrichment?.occurrences ?? {}).flatMap(([label, item]) =>
          eligibleOfferWindows.some((window) => window.label === label) ? (item.offers ?? []) : []),
      ]
        .filter((offer) => majorEventOfferIsActionable(offer))
        .filter((offer, index, offers) => offers.findIndex((candidate) =>
          `${candidate.name}|${candidate.url}|${candidate.price}` === `${offer.name}|${offer.url}|${offer.price}`) === index)
    : [];
  const displayPerformers = [
    ...(schemaEnrichment?.performers ?? []),
    ...Object.values(schemaEnrichment?.occurrences ?? {}).flatMap((item) => item.performers ?? []),
  ].filter((item, index, performers) => performers.findIndex((candidate) => `${candidate.type}|${candidate.name}|${candidate.url ?? ""}` === `${item.type}|${item.name}|${item.url ?? ""}`) === index);
  const organizerMarkup = schemaEnrichment?.organizer
    ? `<p><strong>Organizer:</strong> <a class="font-semibold text-primary underline" href="${esc(schemaEnrichment.organizer.url)}" target="_blank" rel="noreferrer noopener">${esc(schemaEnrichment.organizer.name)} ↗</a></p>`
    : "";
  const offersMarkup = displayOffers.length
    ? `<div><h3 class="font-display text-xl">Tickets and admission</h3><ul class="mt-2 space-y-2">${displayOffers.map((offer) => `<li><a class="font-semibold text-primary underline" href="${esc(offer.url)}" target="_blank" rel="noreferrer noopener">${esc(offer.name)} — ${offer.price === 0 ? "Free" : offer.price.toFixed(2) + " " + offer.priceCurrency} ↗</a></li>`).join("")}</ul></div>`
    : "";
  const performersMarkup = displayPerformers.length
    ? `<div><h3 class="font-display text-xl">Announced performers</h3><p class="mt-2 text-muted-foreground">${displayPerformers.map((item) => item.url ? `<a class="font-semibold text-primary underline" href="${esc(item.url)}" target="_blank" rel="noreferrer noopener">${esc(item.name)} ↗</a>` : esc(item.name)).join(", ")}</p></div>`
    : "";
  const heroImageAttribution = displayImage
    ? [
        displayImage.rightsNote ? esc(displayImage.rightsNote) : "",
        displayImage.licenseName && displayImage.licenseUrl
          ? `<a class="underline" href="${esc(displayImage.licenseUrl)}" target="_blank" rel="noreferrer noopener">${esc(displayImage.licenseName)} ↗</a>`
          : "",
      ].filter(Boolean).join(" · ")
    : "";
  const heroImageMarkup = displayImage
    ? `<figure data-major-event-hero="true" class="mt-8"><div class="aspect-[16/9] overflow-hidden rounded-2xl bg-muted"><img data-major-event-enrichment-image="true" class="h-full w-full object-cover" src="${esc(displayImage.url)}" alt="${esc(displayImage.alt)}" loading="eager" decoding="async" /></div><figcaption class="mt-2 text-xs leading-5 text-muted-foreground">${heroImageAttribution ? `${heroImageAttribution} · ` : ""}<a class="underline" href="${esc(displayImage.sourceUrl)}" target="_blank" rel="noreferrer noopener">Image source ↗</a></figcaption></figure>`
    : "";
  const lifecycleRows = occurrenceWindows.flatMap((window) => {
    const lifecycle = getMajorEventSchemaOccurrenceEnrichmentServer(event.slug, window.label)?.lifecycle;
    if (!lifecycle || lifecycle.status === "scheduled") return [];
    const statusLabel = lifecycle.status === "cancelled"
      ? "Cancelled"
      : lifecycle.status === "postponed"
        ? "Postponed"
        : "Rescheduled";
    const occurrenceLabel = window.label ? `${window.label}: ` : "";
    const previous = lifecycle.previousStartDate
      ? ` Previous date: ${esc(Array.isArray(lifecycle.previousStartDate) ? lifecycle.previousStartDate.join(", ") : lifecycle.previousStartDate)}.`
      : "";
    return [`<li><strong>${esc(occurrenceLabel)}${statusLabel}.</strong>${previous} <a class="font-semibold text-primary underline" href="${esc(lifecycle.sourceUrl)}" target="_blank" rel="noreferrer noopener">Verify status ↗</a> <span class="text-muted-foreground">(checked ${esc(lifecycle.verifiedAt)})</span></li>`];
  });
  const lifecycleMarkup = lifecycleRows.length
    ? `<div data-event-lifecycle-status="true"><h3 class="font-display text-xl">Schedule status</h3><ul class="mt-2 space-y-2">${lifecycleRows.join("")}</ul></div>`
    : "";
  const enrichmentMarkup = schemaEnrichment
    ? `<section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Event details</h2><div class="mt-4 space-y-5">${lifecycleMarkup}${organizerMarkup}${offersMarkup}${performersMarkup}<p class="text-sm text-muted-foreground">Last reviewed ${esc(schemaEnrichment.verifiedAt)}. Ticket prices and lineups can change; confirm the linked official source before purchasing or traveling.</p></div></section>`
    : "";
  const mergedSources = [...event.sources, ...(schemaEnrichment?.sources ?? [])]
    .filter((source, index, sources) => sources.findIndex((candidate) => candidate.url === source.url) === index);
  const sources = mergedSources.map((source) => `<li><a class="font-semibold text-primary underline" href="${esc(source.url)}" target="_blank" rel="noreferrer noopener">${esc(source.label)} ↗</a></li>`).join("");
  const sourceReviewMarkup = event.sourceCheckedAt
    ? `<p class="mt-4 text-xs text-muted-foreground">Event facts last source-checked ${esc(event.sourceCheckedAt)}. Recheck the official organizer before traveling because dates, prices, access rules and lineups can change.</p>`
    : "";
  const html = `<nav class="mb-8 text-sm text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / ${esc(event.name)}</nav><header class="border-b border-border pb-8"${isPalestinePolarExpress ? ' data-polar-express-editorial-intro="true"' : ""}><p class="eyebrow text-primary">${isPalestinePolarExpress ? "Texas railroad experiences" : "Major Texas event"}</p><h1 class="mt-3 font-display ${isPalestinePolarExpress ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"}">${esc(event.name)}</h1><p class="mt-5 text-lg text-muted-foreground">${esc(dateLabel)} · ${esc(placeLine)}</p>${dateConfidenceMarkup}${!isPalestinePolarExpress && event.dateNote ? `<p class="mt-4 text-sm text-muted-foreground">${esc(event.dateNote)}</p>` : ""}${!isPalestinePolarExpress ? `<p class="mt-5"><a class="font-semibold text-primary underline" href="${esc(event.officialUrl)}" target="_blank" rel="noreferrer noopener">Visit the official event site ↗</a></p>` : ""}</header>${snapshotMarkup}${isPalestinePolarExpress ? `${rolloverPanel}${heroImageMarkup}${quickFactsMarkup}` : `${quickFactsMarkup}${rolloverPanel}${heroImageMarkup}`}${ticketingMarkup}<section class="mt-12"><h2 class="font-display text-3xl">About ${esc(event.name)}</h2><p class="mt-4 leading-7 text-muted-foreground">${esc(event.whyItMatters)}</p></section>${enrichmentMarkup}${stayNearbyMarkup}${nearbyExperiencesMarkup}<section class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">Planning your visit</h2>${planning}</section><section data-event-discovery-tail="true" class="mt-12 border-t border-border pt-8"><h2 class="font-display text-3xl">More to do in ${esc(event.city)}</h2><ul class="mt-4 space-y-3">${related}</ul></section><section class="mt-10 border-t border-border pt-8"><h2 class="font-display text-3xl">Official event links</h2><ul class="mt-4 space-y-3">${sources}</ul>${sourceReviewMarkup}</section>`;
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
    const offers = occurrenceEnrichment?.offers?.filter((offer) => majorEventOfferIsActionable(offer)).map((offer) => ({
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
      startDate: occurrenceWindows.length === 1 && event.startDateTime?.startsWith(window.startDate)
        ? event.startDateTime : window.startDate,
      endDate: occurrenceWindows.length === 1 && event.endDateTime?.startsWith(window.endDate ?? window.startDate)
        ? event.endDateTime : window.endDate,
      eventStatus: eventSchemaStatusUrl(occurrenceEnrichment?.lifecycle?.status),
      ...(occurrenceEnrichment?.lifecycle?.status === "rescheduled" && occurrenceEnrichment.lifecycle.previousStartDate
        ? { previousStartDate: occurrenceEnrichment.lifecycle.previousStartDate }
        : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      sameAs: event.officialUrl,
      location,
      ...(occurrenceEnrichment?.image ? { image: [occurrenceEnrichment.image.url] } : {}),
      ...(organizer ? { organizer } : {}),
      ...(!expiredConfirmedOccurrence && majorEventGuideOffersAllowed(occurrenceEnrichment?.lifecycle?.status, window.endDate ?? window.startDate) && offers?.length ? { offers } : {}),
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
    title: event.seoTitle ?? (recurrenceDerived
      ? `${yearQualifiedEventName}: Projected Dates & Texas Travel Guide`
      : expiredConfirmedOccurrence
        ? `${event.name}: Dates & Texas Travel Guide`
        : `${yearQualifiedEventName}: Dates & Texas Travel Guide`),
    description: event.seoDescription ?? (recurrenceDerived
      ? `${yearQualifiedEventName} in ${event.city}, Texas: projected planning dates, official sources and practical trip planning.`
      : expiredConfirmedOccurrence
        ? `${event.name} in ${event.city}, Texas: latest confirmed dates, official sources and practical planning while the next occurrence is pending.`
        : `${yearQualifiedEventName} in ${event.city}, Texas: dates, official sources and practical trip planning.`),
    html,
    jsonLd,
  };
}
