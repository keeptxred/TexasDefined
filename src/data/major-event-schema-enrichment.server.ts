import { majorEventSchemaEnrichmentBatch1 } from "./major-event-schema-enrichment-batch1.server";
import { majorEventSchemaEnrichmentBatch2 } from "./major-event-schema-enrichment-batch2.server";

export type EventSchemaEntityType = "Organization" | "Person" | "PerformingGroup";

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

// Optional Google Event properties are only emitted when an official source supports a
// truthful current value. Do not use the site's generic Open Graph fallback as Event imagery.
const records: MajorEventSchemaEnrichment[] = [
  ...majorEventSchemaEnrichmentBatch1,
  ...majorEventSchemaEnrichmentBatch2,
];

const bySlug = new Map(records.map((record) => [record.slug, record]));

export function getMajorEventSchemaEnrichmentServer(slug: string): MajorEventSchemaEnrichment | null {
  return bySlug.get(slug) ?? null;
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
