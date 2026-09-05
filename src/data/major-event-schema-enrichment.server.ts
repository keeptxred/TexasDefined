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
