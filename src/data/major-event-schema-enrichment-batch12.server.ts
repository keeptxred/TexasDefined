import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string): EventSchemaEntity => ({ type: "PerformingGroup", name });

// Final supplemental dedicated Event-leaf research wave.
// Recurrence-derived future leaves do not inherit prior-year prices or performers.
// Occurrence-specific free admission is scoped to the matching occurrence labels.
// Rights-unclear promotional imagery remains omitted.
export const majorEventSchemaEnrichmentBatch12: MajorEventSchemaEnrichment[] = [
  {
    slug: "seguin-pecan-fest",
    organizer: organization("City of Seguin", "https://www.seguintexas.gov/"),
    offers: [usdOffer("Pecan Fest admission", 0, "https://visitseguin.com/pecan-fest/plan-your-visit/faqs/")],
    sources: [
      { label: "Destination Seguin official 2026 Pecan Fest listing", url: "https://visitseguin.com/events/2026-pecan-fest/" },
      { label: "Destination Seguin official Pecan Fest FAQ — free admission", url: "https://visitseguin.com/pecan-fest/plan-your-visit/faqs/" },
      { label: "City of Seguin / Seguin Main Street official Pecan Fest vendor guidance", url: "https://visitseguin.com/pecan-fest/get-involved/vendors/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "hopkins-county-stew-contest",
    organizer: organization("Hopkins County Chamber of Commerce", "https://hopkinschamber.org/"),
    sources: [
      { label: "Hopkins County Chamber official World Champion Hopkins County Stew Contest page", url: "https://hopkinschamber.org/hopkins-county-stew-contest/" },
      { label: "Hopkins County Chamber of Commerce official site", url: "https://hopkinschamber.org/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-state-championship-fiddlers-frolics",
    organizer: organization("Fiddlers' Frolics", "https://fiddlersfrolics.com/"),
    sources: [
      { label: "Texas State Championship Fiddlers' Frolics official site", url: "https://fiddlersfrolics.com/" },
      { label: "Fiddlers' Frolics official nonprofit terms", url: "https://fiddlersfrolics.com/terms-of-service/" },
      { label: "Fiddlers' Frolics official event schedule", url: "https://fiddlersfrolics.com/event-schedule/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-citrus-fiesta",
    organizer: organization("Texas Citrus Fiesta", "https://www.texascitrusfiesta.com/"),
    sources: [
      { label: "Texas Citrus Fiesta official site", url: "https://www.texascitrusfiesta.com/" },
      { label: "Texas Citrus Fiesta official 2027 event list", url: "https://www.texascitrusfiesta.com/event-list" },
      { label: "Texas Citrus Fiesta official 2027 Parade of Oranges page", url: "https://www.texascitrusfiesta.com/parade-of-oranges" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "caldwell-kolache-festival",
    organizer: organization("Burleson County Chamber of Commerce", "https://www.burlesoncountytx.com/"),
    sources: [
      { label: "Burleson County Chamber official 2026 Kolache Festival notice", url: "https://www.burlesoncountytx.com/" },
      { label: "Burleson County Chamber official 2026 Kolache Festival vendor application", url: "https://business.burlesoncountytx.com/form/view/37596" },
      { label: "City of Caldwell official Kolache Festival history", url: "https://caldwelltx.gov/history" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-czech-heritage-fest",
    organizer: organization("Texas Czech Heritage and Cultural Center", "https://czechtexas.org/"),
    performers: [
      group("Dujka Brothers"),
      group("Czech and Then Some"),
      group("Lost Cause"),
      group("Texas Dutchmen Legendary Orchestra"),
    ],
    sources: [
      { label: "Texas Czech Heritage and Cultural Center official Heritage Fest & Muziky 2026 announcement", url: "https://czechtexas.org/celebrate-czech-heritage-at-heritage-fest-muziky-2026/" },
      { label: "Texas Czech Heritage and Cultural Center official 2026 festival sponsorship announcement", url: "https://czechtexas.org/sponsorship-opportunities-now-available-for-heritage-fest-muziky-2026/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "floresville-peanut-festival",
    organizer: organization("Floresville Peanut Festival Association", "https://floresvillepeanutfestival.org/"),
    occurrences: {
      "Friday festival and Kiddie Parade": {
        offers: [usdOffer("Festival grounds admission", 0, "https://floresvillepeanutfestival.org/faq")],
      },
      "Saturday festival and Grand Parade": {
        offers: [usdOffer("Festival grounds admission", 0, "https://floresvillepeanutfestival.org/faq")],
      },
    },
    sources: [
      { label: "Floresville Peanut Festival official 2026 site", url: "https://floresvillepeanutfestival.org/" },
      { label: "Floresville Peanut Festival official FAQ — free grounds admission", url: "https://floresvillepeanutfestival.org/faq" },
      { label: "Floresville Peanut Festival Association official board page", url: "https://floresvillepeanutfestival.org/members" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "crossroads-of-texas-country-festival",
    organizer: organization("Waxahachie Convention & Visitors Bureau", "https://www.waxahachiecvb.com/"),
    sources: [
      { label: "Visit Waxahachie official 2026 Crossroads of Texas GO TEXAN Country Festival page", url: "https://www.waxahachiecvb.com/events/2026/crossroads-of-texas-country-festival" },
      { label: "Waxahachie CVB official 2026 Crossroads vendor application", url: "https://www.waxahachiecvb.com/f/69" },
    ],
    verifiedAt: "2026-09-03",
  },
];
