import { majorEventSchemaEnrichmentBatch1 } from "./major-event-schema-enrichment-batch1.server";
import { majorEventSchemaEnrichmentBatch2 } from "./major-event-schema-enrichment-batch2.server";
import { majorEventSchemaEnrichmentBatch3 } from "./major-event-schema-enrichment-batch3.server";
import { majorEventSchemaEnrichmentBatch4 } from "./major-event-schema-enrichment-batch4.server";
import { majorEventSchemaEnrichmentBatch5 } from "./major-event-schema-enrichment-batch5.server";
import { majorEventSchemaEnrichmentBatch6 } from "./major-event-schema-enrichment-batch6.server";
import { majorEventSchemaEnrichmentBatch7 } from "./major-event-schema-enrichment-batch7.server";
import { majorEventSchemaEnrichmentBatch8 } from "./major-event-schema-enrichment-batch8.server";
import { majorEventSchemaEnrichmentBatch9 } from "./major-event-schema-enrichment-batch9.server";
import { majorEventSchemaEnrichmentBatch10 } from "./major-event-schema-enrichment-batch10.server";
import { majorEventSchemaEnrichmentBatch11 } from "./major-event-schema-enrichment-batch11.server";
import { majorEventSchemaEnrichmentBatch12 } from "./major-event-schema-enrichment-batch12.server";
import { majorEventSchemaEnrichmentBatch13 } from "./major-event-schema-enrichment-batch13.server";
import { majorEventSchemaEnrichmentBatch14 } from "./major-event-schema-enrichment-batch14.server";
import { majorEventSchemaEnrichmentBatch15 } from "./major-event-schema-enrichment-batch15.server";
import { majorEventSchemaEnrichmentBatch16 } from "./major-event-schema-enrichment-batch16.server";
import { majorEventSchemaEnrichmentBatch17 } from "./major-event-schema-enrichment-batch17.server";
import { majorEventSchemaEnrichmentBatch18 } from "./major-event-schema-enrichment-batch18.server";
import { majorEventSchemaEnrichmentBatch19 } from "./major-event-schema-enrichment-batch19.server";
import { majorEventSchemaEnrichmentBatch20 } from "./major-event-schema-enrichment-batch20.server";
import { majorEventSchemaEnrichmentOverrides } from "./major-event-schema-enrichment-overrides.server";

export type EventSchemaEntityType = "Organization" | "Person" | "PerformingGroup";
export type EventImageSourceType = "licensed-real" | "owner-provided" | "government-open" | "wikimedia" | "flickr-cc" | "ai-generated";

export interface EventSchemaEntity {
  type: EventSchemaEntityType;
  name: string;
  url?: string;
}

export interface EventSchemaOffer {
  name: string;
  url: string;
  price: number;
  priceCurrency: "USD";
}

export interface EventSchemaImage {
  url: string;
  alt: string;
  sourceUrl: string;
  sourceType?: EventImageSourceType;
  licenseName?: string;
  licenseUrl?: string;
  rightsNote?: string;
  exactLocation?: boolean;
  approvedForCommercialUse?: boolean;
  aiGenerated?: boolean;
}

export interface EventSchemaOccurrenceEnrichment {
  offers?: EventSchemaOffer[];
  performers?: EventSchemaEntity[];
}

export interface MajorEventSchemaEnrichment {
  slug: string;
  organizer?: EventSchemaEntity;
  offers?: EventSchemaOffer[];
  performers?: EventSchemaEntity[];
  image?: EventSchemaImage;
  occurrences?: Record<string, EventSchemaOccurrenceEnrichment>;
  sources: Array<{ label: string; url: string }>;
  verifiedAt: string;
}

const PROHIBITED_IMAGE_SOURCE_HOSTS = [
  "facebook.com",
  "instagram.com",
  "tripadvisor.com",
  "yelp.com",
  "googleusercontent.com",
  "google.com",
];

function validHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function isCompliantMajorEventImage(image: EventSchemaImage | undefined): image is EventSchemaImage {
  if (!image?.url?.trim() || !image.alt?.trim() || !image.sourceUrl?.trim()) return false;
  if (!validHttpsUrl(image.url) || !validHttpsUrl(image.sourceUrl)) return false;

  const sourceHost = new URL(image.sourceUrl).hostname.toLowerCase();
  if (PROHIBITED_IMAGE_SOURCE_HOSTS.some((host) => sourceHost === host || sourceHost.endsWith(`.${host}`))) return false;

  // Wikimedia Commons is a free-media repository and remains the preferred external source.
  if (sourceHost === "commons.wikimedia.org") return true;

  // Existing internally generated event assets are accepted only when they are explicitly
  // described as AI-generated editorial imagery. This preserves the current Chappell Hill
  // pattern while rejecting generic placeholders and unlabeled generated graphics.
  if (sourceHost === "texasdefined.com" && /\bAI[- ]generated\b/i.test(image.alt)) return true;

  // Other owner/government/licensed sources must carry explicit commercial-use review metadata.
  return image.approvedForCommercialUse === true
    && Boolean(image.sourceType)
    && Boolean(image.licenseName?.trim() || image.rightsNote?.trim());
}

// Optional Google Event properties are only emitted when an official source supports a
// truthful current value. Do not use the site's generic Open Graph fallback as Event imagery.
const records: MajorEventSchemaEnrichment[] = [
  ...majorEventSchemaEnrichmentBatch1,
  ...majorEventSchemaEnrichmentBatch2,
  ...majorEventSchemaEnrichmentBatch3,
  ...majorEventSchemaEnrichmentBatch4,
  ...majorEventSchemaEnrichmentBatch5,
  ...majorEventSchemaEnrichmentBatch6,
  ...majorEventSchemaEnrichmentBatch7,
  ...majorEventSchemaEnrichmentBatch8,
  ...majorEventSchemaEnrichmentBatch9,
  ...majorEventSchemaEnrichmentBatch10,
  ...majorEventSchemaEnrichmentBatch11,
  ...majorEventSchemaEnrichmentBatch12,
  ...majorEventSchemaEnrichmentBatch13,
  ...majorEventSchemaEnrichmentBatch14,
  ...majorEventSchemaEnrichmentBatch15,
  ...majorEventSchemaEnrichmentBatch16,
  ...majorEventSchemaEnrichmentBatch17,
  ...majorEventSchemaEnrichmentBatch18,
  ...majorEventSchemaEnrichmentBatch19,
  ...majorEventSchemaEnrichmentBatch20,
  ...majorEventSchemaEnrichmentOverrides,
];

const bySlug = new Map(records.map((record) => [record.slug, record]));

export function getMajorEventSchemaEnrichmentServer(slug: string): MajorEventSchemaEnrichment | null {
  return bySlug.get(slug) ?? null;
}

export function hasCompliantMajorEventImageServer(slug: string) {
  return isCompliantMajorEventImage(getMajorEventSchemaEnrichmentServer(slug)?.image);
}

export function getMajorEventSchemaOccurrenceEnrichmentServer(slug: string, label?: string) {
  const record = getMajorEventSchemaEnrichmentServer(slug);
  if (!record) return null;
  const occurrence = label ? record.occurrences?.[label] : undefined;
  return {
    organizer: record.organizer,
    image: record.image,
    offers: occurrence?.offers ?? record.offers,
    performers: occurrence?.performers ?? record.performers,
  };
}
