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

function validHttpsUrl(value: string | undefined) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isTexasDefinedHost(host: string) {
  return host === "texasdefined.com" || host.endsWith(".texasdefined.com");
}

export function isCompliantMajorEventImage(image: EventSchemaImage | undefined): image is EventSchemaImage {
  if (!image?.url?.trim() || !image.alt?.trim() || !image.sourceUrl?.trim()) return false;
  if (!validHttpsUrl(image.url) || !validHttpsUrl(image.sourceUrl)) return false;

  const sourceHost = new URL(image.sourceUrl).hostname.toLowerCase();
  if (PROHIBITED_IMAGE_SOURCE_HOSTS.some((host) => sourceHost === host || sourceHost.endsWith(`.${host}`))) return false;

  const rightsDocumented = Boolean(image.licenseName?.trim() || image.rightsNote?.trim());
  const commercialReviewComplete = image.approvedForCommercialUse === true
    && Boolean(image.sourceType)
    && typeof image.exactLocation === "boolean"
    && rightsDocumented;
  if (!commercialReviewComplete) return false;

  if (image.sourceType === "ai-generated") {
    return isTexasDefinedHost(sourceHost)
      && image.aiGenerated === true
      && Boolean(image.rightsNote?.trim())
      && /\bAI[- ]generated\b/i.test(image.alt);
  }

  // A real-source hero must depict the actual event location rather than act as a
  // permanent representative or generic substitute. If no such reusable image exists,
  // the governed fallback is a documented photorealistic AI image instead.
  if (image.aiGenerated === true || image.exactLocation !== true) return false;

  if (image.sourceType === "wikimedia") {
    return sourceHost === "commons.wikimedia.org"
      && Boolean(image.licenseName?.trim())
      && validHttpsUrl(image.licenseUrl);
  }

  if (image.sourceType === "flickr-cc") {
    return Boolean(image.licenseName?.trim()) && validHttpsUrl(image.licenseUrl);
  }

  // Owner-provided, government-open and other licensed-real sources are accepted only
  // after the shared commercial-use, exact-location and rights-documentation checks above.
  return image.sourceType === "owner-provided"
    || image.sourceType === "government-open"
    || image.sourceType === "licensed-real";
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
