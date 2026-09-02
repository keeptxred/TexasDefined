import type { EventSchemaEntity, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string): EventSchemaEntity => ({ type: "PerformingGroup", name });
const person = (name: string): EventSchemaEntity => ({ type: "Person", name });

// Supplemental dedicated Event leaves, official-source research wave 2.
// Recurrence-derived 2027 leaves do not inherit prior-year ticket prices or lineups.
// Event imagery remains omitted unless Texas Defined can publish a representative image with clear reuse rights.
export const majorEventSchemaEnrichmentBatch4: MajorEventSchemaEnrichment[] = [
  {
    slug: "sandhills-stock-show-rodeo",
    organizer: organization("SandHills Stock Show & Rodeo", "https://sandhillsssr.com/"),
    sources: [
      { label: "SandHills Stock Show & Rodeo official site", url: "https://sandhillsssr.com/" },
      { label: "SandHills Stock Show & Rodeo official rules", url: "https://sandhillsssr.com/wp-content/uploads/2025/09/2026-General-Rules.pdf" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "sweetwater-rattlesnake-roundup",
    organizer: organization("Sweetwater Jaycees", "http://www.rattlesnakeroundup.net/"),
    sources: [
      { label: "City of Sweetwater visitor guide — Sweetwater Jaycees Rattlesnake Roundup", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
      { label: "City of Sweetwater annual events — Sweetwater Jaycees Annual Rattlesnake Roundup", url: "https://www.sweetwatertx.gov/375/Events" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "granbury-founders-day-jubilee",
    organizer: organization("Historic Granbury Merchants Association", "https://granburysquare.com/"),
    sources: [
      { label: "Historic Granbury Merchants Association annual festivals — Founder's Day", url: "https://granburysquare.com/annual-festivals-events/" },
      { label: "Historic Granbury Merchants Association organization page", url: "https://granburysquare.com/about/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "galveston-juneteenth-celebrations",
    sources: [
      { label: "Visit Galveston official Juneteenth celebrations guide", url: "https://www.visitgalveston.com/events/annual-events/juneteenth/" },
      { label: "Visit Galveston official Juneteenth events directory", url: "https://www.visitgalveston.com/events/annual-events/juneteenth/events/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "larry-joe-taylor-texas-music-festival",
    organizer: organization("LJT Texas Music Festival", "https://ljtfest.com/"),
    sources: [
      { label: "LJT Fest official 2027 festival and ticket page", url: "https://ljtfest.com/" },
      { label: "Larry Joe Taylor official tour schedule", url: "https://www.larryjoetaylor.com/tour.htm" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "san-antonio-marathon",
    organizer: organization("San Antonio Sports", "https://sanantoniosports.org/"),
    sources: [
      { label: "San Antonio Marathon official 2026 media center", url: "https://sanantoniomarathon.com/media-center/" },
      { label: "San Antonio Sports official marathon listing", url: "https://sanantoniosports.org/event/san-antonio-marathon/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "rockport-art-festival",
    organizer: organization("Rockport Center for the Arts", "https://www.rockportartcenter.com/"),
    sources: [
      { label: "Rockport Center for the Arts official 2026 Art Festival page", url: "https://www.rockportartcenter.com/artfest" },
      { label: "Rockport Center for the Arts official 2026 festival announcement", url: "https://www.rockportartcenter.com/news-press-releases/58thannualartfest" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "viva-el-paso",
    organizer: organization("El Paso International & Cultural Arts (EPIC Arts)", "https://epicartsvivaelpaso.org/"),
    sources: [
      { label: "Viva! El Paso official About page — EPIC Arts focal project", url: "https://vivaelpaso.org/about" },
      { label: "Viva! El Paso official production information", url: "https://vivaelpaso.org/auditions" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-shakespeare-festival",
    organizer: organization("Texas Shakespeare Festival", "https://www.texasshakespeare.com/"),
    sources: [
      { label: "Texas Shakespeare Festival official site", url: "https://www.texasshakespeare.com/" },
      { label: "Texas Shakespeare Festival official history and Kilgore College relationship", url: "https://www.texasshakespeare.com/about" },
      { label: "Texas Shakespeare Festival official ticket page", url: "https://www.texasshakespeare.com/purchase-tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "poteet-strawberry-festival",
    organizer: organization("Poteet Strawberry Festival Association", "https://poteetstrawberryfestival.com/home/"),
    performers: [
      person("Kevin Fowler"),
      person("Tracy Byrd"),
      group("David Lee Garza y Los Musicales"),
      person("Jay Perez"),
      group("Los Traileros del Norte"),
      group("Huser Brothers"),
      group("Ole 60"),
      person("Little Joe"),
      group("Pesado"),
      person("Braxton Keith"),
      group("Secretto"),
    ],
    sources: [
      { label: "Poteet Strawberry Festival Association official 2026 schedule", url: "https://poteetstrawberryfestival.com/schedule/" },
      { label: "Poteet Strawberry Festival official 2026 schedule PDF", url: "https://poteetstrawberryfestival.com/wp-content/uploads/2026/03/PSFA-Schedule-1.pdf" },
      { label: "Poteet Strawberry Festival official ticket portal", url: "https://tickets.poteetstrawberryfestival.com/p/tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
];
