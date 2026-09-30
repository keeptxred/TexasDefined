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
import { majorEventSchemaEnrichmentBatch21 } from "./major-event-schema-enrichment-batch21.server";
import { majorEventSchemaEnrichmentBatch22 } from "./major-event-schema-enrichment-batch22.server";
import { majorEventSchemaEnrichmentBatch23 } from "./major-event-schema-enrichment-batch23.server";
import { majorEventSchemaEnrichmentBatch24 } from "./major-event-schema-enrichment-batch24.server";
import { majorEventSchemaEnrichmentBatch25 } from "./major-event-schema-enrichment-batch25.server";
import { majorEventSchemaEnrichmentOverrides } from "./major-event-schema-enrichment-overrides.server";

export type EventSchemaEntityType = "Organization" | "Person" | "PerformingGroup";
export type EventSchemaLifecycleStatus = "scheduled" | "cancelled" | "postponed" | "rescheduled";
export type EventSchemaOfferAvailability =
  | "https://schema.org/InStock"
  | "https://schema.org/SoldOut"
  | "https://schema.org/PreOrder";
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
  availability?: EventSchemaOfferAvailability;
  validFrom?: string;
  validThrough?: string;
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

export interface EventSchemaLifecycle {
  status: EventSchemaLifecycleStatus;
  previousStartDate?: string | string[];
  sourceUrl: string;
  verifiedAt: string;
}

export interface EventSchemaOccurrenceEnrichment {
  offers?: EventSchemaOffer[];
  performers?: EventSchemaEntity[];
  lifecycle?: EventSchemaLifecycle;
}

export interface MajorEventSchemaEnrichment {
  slug: string;
  organizer?: EventSchemaEntity;
  offers?: EventSchemaOffer[];
  performers?: EventSchemaEntity[];
  image?: EventSchemaImage;
  lifecycle?: EventSchemaLifecycle;
  occurrences?: Record<string, EventSchemaOccurrenceEnrichment>;
  sources: Array<{ label: string; url: string }>;
  verifiedAt: string;
}

const EVENT_STATUS_URLS: Record<EventSchemaLifecycleStatus, string> = {
  scheduled: "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
  postponed: "https://schema.org/EventPostponed",
  rescheduled: "https://schema.org/EventRescheduled",
};

const EVENT_OFFER_AVAILABILITY = new Set<EventSchemaOfferAvailability>([
  "https://schema.org/InStock",
  "https://schema.org/SoldOut",
  "https://schema.org/PreOrder",
]);

export function eventSchemaStatusUrl(status: EventSchemaLifecycleStatus | undefined) {
  return EVENT_STATUS_URLS[status ?? "scheduled"];
}

function validHttpsUrl(value: string | undefined) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function validEventDateLike(value: string | undefined) {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?)?$/.test(value);
}

export function isValidEventSchemaEntity(entity: EventSchemaEntity | undefined) {
  if (!entity || !entity.name.trim()) return false;
  if (!(["Organization", "Person", "PerformingGroup"] as const).includes(entity.type)) return false;
  return entity.url === undefined || validHttpsUrl(entity.url);
}

export function isValidEventSchemaOffer(offer: EventSchemaOffer | undefined) {
  if (!offer || !offer.name.trim() || !validHttpsUrl(offer.url)) return false;
  if (offer.priceCurrency !== "USD" || !Number.isFinite(offer.price) || offer.price < 0) return false;
  if (offer.availability && !EVENT_OFFER_AVAILABILITY.has(offer.availability)) return false;
  if (offer.validFrom && !validEventDateLike(offer.validFrom)) return false;
  if (offer.validThrough && !validEventDateLike(offer.validThrough)) return false;
  return true;
}

export function isValidEventSchemaLifecycle(lifecycle: EventSchemaLifecycle | undefined) {
  if (!lifecycle) return true;
  if (!validHttpsUrl(lifecycle.sourceUrl) || !/^\d{4}-\d{2}-\d{2}$/.test(lifecycle.verifiedAt)) return false;
  const previous = Array.isArray(lifecycle.previousStartDate)
    ? lifecycle.previousStartDate
    : lifecycle.previousStartDate ? [lifecycle.previousStartDate] : [];
  if (previous.some((value) => !validEventDateLike(value))) return false;
  if (lifecycle.status === "rescheduled" && previous.length === 0) return false;
  if (lifecycle.status !== "rescheduled" && previous.length > 0) return false;
  return true;
}

const PROHIBITED_IMAGE_SOURCE_HOSTS = [
  "facebook.com",
  "instagram.com",
  "tripadvisor.com",
  "yelp.com",
  "googleusercontent.com",
  "google.com",
];

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

  if (image.aiGenerated === true || image.exactLocation !== true) return false;

  if (image.sourceType === "wikimedia") {
    return sourceHost === "commons.wikimedia.org"
      && Boolean(image.licenseName?.trim())
      && validHttpsUrl(image.licenseUrl);
  }

  if (image.sourceType === "flickr-cc") {
    return Boolean(image.licenseName?.trim()) && validHttpsUrl(image.licenseUrl);
  }

  return image.sourceType === "owner-provided"
    || image.sourceType === "government-open"
    || image.sourceType === "licensed-real";
}

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
  ...majorEventSchemaEnrichmentBatch21,
  ...majorEventSchemaEnrichmentBatch22,
  ...majorEventSchemaEnrichmentBatch23,
  ...majorEventSchemaEnrichmentBatch24,
  ...majorEventSchemaEnrichmentBatch25,
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
  const lifecycle = occurrence?.lifecycle ?? record.lifecycle;
  const organizer = isValidEventSchemaEntity(record.organizer) ? record.organizer : undefined;
  const image = isCompliantMajorEventImage(record.image) ? record.image : undefined;
  const offers = (occurrence?.offers ?? record.offers)?.filter(isValidEventSchemaOffer);
  const performers = (occurrence?.performers ?? record.performers)?.filter(isValidEventSchemaEntity);
  return {
    organizer,
    image,
    offers: offers?.length ? offers : undefined,
    performers: performers?.length ? performers : undefined,
    lifecycle: isValidEventSchemaLifecycle(lifecycle) ? lifecycle : undefined,
  };
}
