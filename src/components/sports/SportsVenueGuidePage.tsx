import { useState, type ReactNode } from "react";

import {
  TexasEventCarousel,
  type TexasEventCarouselItem,
} from "@/components/editorial/TexasEventCarousel";
import { Container } from "@/components/layout/Container";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";
import { MSRHoustonAuthoritySections, MSRHoustonStatusNotice } from "@/components/sports/MSRHoustonAuthoritySections";
import { SponsoredSportsPlacement } from "@/components/sports/SponsoredSportsPlacement";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { ParkingMapAsset } from "@/data/parking-map-model";
import type { SportsVenueEnrichment } from "@/data/sports-venue-enrichment";
import type { SportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import { isGeneratedSportsVenueImage } from "@/data/sports-venue-image-attribution";
import type { SportsVenuePhoto } from "@/data/sports-venue-images";
import type { PublicSportsSponsorPlacement } from "@/data/sports-sponsorship.types";

const siteUrl = "https://texasdefined.com";


export type SportsVenueGuideLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SportsVenueGuidePageProps = {
  entity: TexasEntityRecord;
  guide: SportsVenueGuidePilot;
  enrichment?: SportsVenueEnrichment;
  photo?: SportsVenuePhoto;
  parkingMap?: ParkingMapAsset;
  nearbyAttractions?: readonly TexasEntityRecord[];
  upcomingEvents?: readonly TexasEventCarouselItem[];
  eventCalendarHref?: string;
  sponsorPlacement?: PublicSportsSponsorPlacement | null;
};

export function SportsVenueGuidePage({
  entity,
  guide,
  enrichment,
  photo,
  parkingMap,
  nearbyAttractions = [],
  upcomingEvents = [],
  eventCalendarHref = "/events",
  sponsorPlacement,
}: SportsVenueGuidePageProps) {
  const canonicalUrl = `${siteUrl}${guide.canonicalPath}`;
  const officialUrl = guide.officialUrl ?? entity.officialUrl;
  const directionsUrl = buildDirectionsUrl(entity, guide);
  const reviewedAt = latestIsoDate([
    guide.reviewedAt,
    enrichment?.verifiedAt,
    entity.sourceCheckedAt,
    parkingMap?.verifiedAt,
    ...upcomingEvents.flatMap((event) => [event.lastVerifiedAt, event.lastUpdatedAt]),
  ]);
  const officialEventCalendarUrl = guide.eventScheduleUrl
    ?? guide.sources.find((source) => /event|calendar|schedule/i.test(source.label))?.href
    ?? enrichment?.planningLinks.find((link) => /event|calendar|schedule/i.test(link.label))?.url;
  // A city in the same county is not necessarily a nearby attraction.
  const attractions = nearbyAttractions.filter((item) => item.kind !== "city").slice(0, 4);
  const schemaType = sportsVenueSchemaType(entity);
  const eventSchemaNodes = upcomingEvents.slice(0, 6).map((event) => ({
    "@type": "Event",
    "@id": `${canonicalUrl}#event-${encodeURIComponent(event.id)}`,
    name: event.title,
    description: event.summary || undefined,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: schemaEventStatus(event.status),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: event.officialEventUrl,
    image: event.image?.displayAllowed ? event.image.url : undefined,
    location: { "@id": `${canonicalUrl}#venue` },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${entity.name} visitor guide`,
        dateModified: reviewedAt,
        mainEntity: { "@id": `${canonicalUrl}#venue` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": schemaType,
        "@id": `${canonicalUrl}#venue`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description: entity.description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        image: photo?.imageUrl,
        sameAs: officialUrl ? [officialUrl] : undefined,
        geo: entity.coordinates
          ? {
              "@type": "GeoCoordinates",
              latitude: entity.coordinates.latitude,
              longitude: entity.coordinates.longitude,
            }
          : undefined,
        address: guide.address
          ? postalAddress(guide.address)
          : {
              "@type": "PostalAddress",
              addressLocality: guide.city,
              addressRegion: "TX",
              addressCountry: "US",
            },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Texas Sports", item: `${siteUrl}/sports` },
          {
            "@type": "ListItem",
            position: 3,
            name: "Sports Venues",
            item: `${siteUrl}/sports-venues`,
          },
          { "@type": "ListItem", position: 4, name: entity.name, item: canonicalUrl },
        ],
      },
      ...eventSchemaNodes,
      ...(guide.faqs?.length
        ? [{
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            mainEntity: guide.faqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <article className="mx-auto max-w-7xl">
          <VenueBreadcrumb venueName={entity.name} />

          <header className="pb-7 pt-8 sm:pt-10">
            <p className="eyebrow text-primary">Texas venue guide</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              {entity.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground sm:text-xl">
              {guide.subtitle}
            </p>
            {entity.description ? (
              <p className="mt-5 max-w-4xl text-base leading-8 text-foreground/85 sm:text-lg">
                {entity.description}
              </p>
            ) : null}
          </header>

          <div className="grid items-start gap-6 border-b border-border pb-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <VenuePhoto photo={photo} venueName={entity.name} />
            <QuickFacts guide={guide} capacity={guide.capacity ?? enrichment?.capacity} directionsUrl={directionsUrl} officialUrl={officialUrl} />
          </div>

          {guide.canonicalPath === "/sports-venue/msr-houston" ? <MSRHoustonStatusNotice /> : null}

          {sponsorPlacement ? (
            <div className="border-b border-border py-8">
              <SponsoredSportsPlacement placement={sponsorPlacement} />
            </div>
          ) : null}

          <TexasEventCarousel
            events={upcomingEvents}
            eyebrow="Upcoming events"
            title={`What’s happening at ${entity.name}`}
            viewAllHref={eventCalendarHref}
            emptyMessage={`Texas Defined does not currently have a source-verified event listing in its calendar for ${entity.name}. This does not mean the venue has no events. Consult the official venue schedule.`}
          />

          {officialEventCalendarUrl ? (
            <div className="border-b border-border pb-7">
              <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
                Our event listings are a dated, source-verified selection, not a live mirror of every event or ticket change.
                Confirm dates and admission on the venue's official calendar.
              </p>
              <a className="mt-3 inline-block text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary"
                href={officialEventCalendarUrl} target="_blank" rel="noopener noreferrer">See the complete official event schedule ↗</a>
            </div>
          ) : null}

          {enrichment ? (
            <KnowBeforeYouGo
              venueName={entity.name}
              parking={enrichment.parking}
              arrival={enrichment.arrival}
              parkingMap={parkingMap}
              guide={guide}
              planningLinks={enrichment.planningLinks}
            />
          ) : null}

          {guide.gallery?.length ? (
            <EditorialSection eyebrow="Venue photo gallery" title={`${entity.name} in pictures`}>
              <p className="mb-6 max-w-3xl text-sm leading-7 text-muted-foreground">
                Historical photographs are labeled by date and should not be mistaken for the current field or seating configuration.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {guide.gallery.map((image) => (
                  <figure key={image.sourceUrl} className="min-w-0">
                    <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <img src={image.imageUrl} alt={image.alt} loading="lazy" decoding="async"
                        className="aspect-[4/3] w-full border border-border bg-muted object-cover" />
                    </a>
                    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                      {image.caption} Photo: <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{image.credit}</a>
                      {" · "}<a href={image.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{image.license}</a>.
                    </figcaption>
                  </figure>
                ))}
              </div>
            </EditorialSection>
          ) : null}

          <div data-stay-nearby-slot />

          {guide.canonicalPath === "/sports-venue/msr-houston" ? <MSRHoustonAuthoritySections /> : null}

          {enrichment?.history && guide.canonicalPath !== "/sports-venue/msr-houston" ? (
            <EditorialSection eyebrow="Venue story" title={`The story of ${entity.name}`}>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {enrichment.history}
              </p>
            </EditorialSection>
          ) : null}

          {guide.faqs?.length ? (
            <EditorialSection eyebrow="Visitor questions" title={`Questions about ${entity.name}`}>
              <dl className="grid gap-6 md:grid-cols-2">
                {guide.faqs.map(({ question, answer }) => (
                  <div key={question} className="border-t border-border pt-4">
                    <dt className="font-display text-xl leading-snug">{question}</dt>
                    <dd className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</dd>
                  </div>
                ))}
              </dl>
            </EditorialSection>
          ) : null}

          {guide.nearbyPlaces?.length ? (
            <NearbyPlacesSection items={guide.nearbyPlaces} />
          ) : attractions.length >= 2 ? (
            <NearbyAttractionsSection items={attractions} />
          ) : null}

          <SourcesSection
            entity={entity}
            guide={guide}
            enrichment={enrichment}
            photo={photo}
            reviewedAt={reviewedAt}
          />
        </article>
      </Container>
    </>
  );
}

function VenueBreadcrumb({ venueName }: { venueName: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"
    >
      <a href="/" className="hover:text-foreground">
        Front page
      </a>
      <span aria-hidden="true" className="mx-2">/</span>
      <a href="/sports" className="hover:text-foreground">Texas Sports</a>
      <span aria-hidden="true" className="mx-2">/</span>
      <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a>
      <span aria-hidden="true" className="mx-2">/</span>
      <span aria-current="page" className="text-foreground">{venueName}</span>
    </nav>
  );
}

function VenuePhoto({ photo, venueName }: { photo?: SportsVenuePhoto; venueName: string }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  if (!photo || failedUrl === photo.imageUrl) {
    return (
      <div
        className="flex items-center justify-center border border-border bg-muted px-8 py-12 text-center text-sm text-muted-foreground"
        role="img"
        aria-label={`${venueName} image unavailable`}
      >
        Venue details and planning information continue below.
      </div>
    );
  }

  return (
    <figure className="min-w-0 overflow-hidden bg-muted">
      <img
        src={photo.imageUrl}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block h-auto w-full object-contain"
        onError={() => setFailedUrl(photo.imageUrl)}
      />
    </figure>
  );
}

function QuickFacts({ guide, capacity, directionsUrl, officialUrl }: { guide: SportsVenueGuidePilot; capacity?: string; directionsUrl: string; officialUrl?: string }) {
  return (
    <aside className="flex h-full flex-col border border-border px-5 py-5 sm:px-6" aria-labelledby="venue-quick-facts-heading">
      <div>
        <p className="eyebrow text-primary">Quick facts</p>
        <h2 id="venue-quick-facts-heading" className="mt-2 font-display text-3xl">At the venue</h2>
      </div>
      <dl className="mt-5 text-sm">
        <Fact label="Capacity" value={capacity} />
        <Fact label="Venue type" value={guide.venueType} />
        <Fact label="Home team" value={guide.homeTeam} />
        <Fact label={/motorsports|road-racing|drag-racing|raceway/i.test(guide.venueType) ? "Track activities" : "League / conference"} value={guide.leagueOrConference} />
        <Fact label={/motorsports|road-racing|drag-racing|raceway/i.test(guide.venueType) ? "Circuit configuration" : "Playing surface"} value={guide.playingSurface} />
        <Fact label="Opened" value={guide.opened} />
        <Fact label="Address" value={guide.address} />
      </dl>
      <div className="mt-auto grid gap-3 pt-6">
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Get Directions</a>
        {officialUrl ? (
          <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-3 text-center text-sm font-semibold hover:border-primary hover:text-primary">Official Venue Site</a>
        ) : null}
      </div>
    </aside>
  );
}

function KnowBeforeYouGo({
  venueName,
  parking,
  arrival,
  parkingMap,
  guide,
  planningLinks,
}: {
  venueName: string;
  parking: string;
  arrival: string;
  parkingMap?: ParkingMapAsset;
  guide: SportsVenueGuidePilot;
  planningLinks: readonly { label: string; url: string }[];
}) {
  // Only display venue-specific policy claims where a vetted source supplied
  // them. For every other venue, link out instead of inventing rules.
  const policyLinks = planningLinks.filter((link) =>
    /bag|accessib|guest|fan guide|a.to.z|polic|seat|gate|entrance|parking|map/i.test(link.label));
  const sourcedGuideLinks = guide.sources.filter((link) =>
    /bag|accessib|guide|polic|seat|map|guest|entry/i.test(link.label));
  return (
    <EditorialSection eyebrow="Know before you go" title={`Planning your visit to ${venueName}`}>
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <GuideItem title="Parking" body={parking} />
        <GuideItem title="Arrival" body={arrival} />
        {guide.bagPolicy ? <GuideItem title="Bags and security" body={guide.bagPolicy} /> : null}
        {guide.accessibility ? <GuideItem title="Accessibility" body={guide.accessibility} /> : null}
        {guide.cashlessPolicy ? <GuideItem title="Payments and re-entry" body={guide.cashlessPolicy} /> : null}
      </div>
      {guide.stadiumMapUrl ? (
        <a className="mt-6 inline-flex min-h-11 items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
          href={guide.stadiumMapUrl} target="_blank" rel="noopener noreferrer">Official stadium and seating map ↗</a>
      ) : null}
      {!guide.bagPolicy || !guide.accessibility ? (
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
          Security screening, bag sizes, accessibility services, seating layouts and permitted items vary by venue and event.
          Check the official venue and event-specific guest guide before traveling; this page does not assume universal policies.
        </p>
      ) : null}
      {policyLinks.length || sourcedGuideLinks.length ? (
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          {dedupeLinks([
            ...sourcedGuideLinks,
            ...policyLinks.map((link) => ({ label: link.label, href: link.url })),
          ]).slice(0, 5).map((link) => (
            <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">{link.label} ↗</a></li>
          ))}
        </ul>
      ) : null}
      <ParkingMapPanel map={parkingMap} contextName={venueName} />
    </EditorialSection>
  );
}

function NearbyPlacesSection({ items }: { items: NonNullable<SportsVenueGuidePilot["nearbyPlaces"]> }) {
  return (
    <EditorialSection eyebrow="Around the venue" title="Nearby places worth pairing with a visit">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="group border border-border p-5 hover:border-primary"
            {...(item.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <strong className="block font-display text-2xl group-hover:text-primary">{item.label}</strong>
            <span className="mt-2 block text-sm leading-7 text-muted-foreground">{item.detail}</span>
          </a>
        ))}
      </div>
    </EditorialSection>
  );
}

function NearbyAttractionsSection({ items }: { items: readonly TexasEntityRecord[] }) {
  return (
    <EditorialSection eyebrow="Nearby attractions in the county" title="More visitor places to explore in the same county">
      <p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">These places share the venue's county, but may not be immediately adjacent. Check travel times before planning an event-day visit.</p>
      <div className="grid gap-x-8 border-t border-border sm:grid-cols-2">
        {items.map((item) => (
          <a key={item.id} href={canonicalEntityPath(item)} className="group border-b border-border py-5">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{humanize(item.kind)}</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{item.name}</strong>
            {item.description ? <span className="mt-2 block line-clamp-2 text-sm leading-6 text-muted-foreground">{item.description}</span> : null}
          </a>
        ))}
      </div>
    </EditorialSection>
  );
}

function SourcesSection({ entity, guide, enrichment, photo, reviewedAt }: { entity: TexasEntityRecord; guide: SportsVenueGuidePilot; enrichment?: SportsVenueEnrichment; photo?: SportsVenuePhoto; reviewedAt?: string }) {
  const sourceLinks = dedupeLinks([
    ...guide.sources,
    ...(enrichment?.planningLinks ?? []).map((link) => ({ label: link.label, href: link.url })),
    ...(entity.officialUrl ? [{ label: "Knowledge-graph official venue source", href: entity.officialUrl }] : []),
  ]);
  const generatedImage = isGeneratedSportsVenueImage(photo);

  return (
    <section className="py-10 sm:py-12" aria-labelledby="venue-sources-heading">
      <div className="grid gap-7 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Sources</p>
          <h2 id="venue-sources-heading" className="mt-2 font-display text-3xl">Sources & review</h2>
          {reviewedAt ? <p className="mt-3 text-sm leading-6 text-muted-foreground">Latest source verification {formatDate(reviewedAt)}.</p> : null}
        </div>
        <div className="min-w-0">
          {sourceLinks.length ? (
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {sourceLinks.map((link) => (
                <li key={link.href} className="border-t border-border py-4 text-sm font-semibold">
                  <a href={link.href} target="_blank" rel="noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{link.label} ↗</a>
                </li>
              ))}
            </ul>
          ) : null}
          {photo && generatedImage ? (
            <p className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
              Editorial illustration by {photo.author} for TexasDefined; not documentary photography.
            </p>
          ) : photo ? (
            <p className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
              Photo: <a href={photo.sourcePage} target="_blank" rel="noreferrer" className="underline underline-offset-4">{photo.sourceName}</a>, {photo.author}. <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">{photo.licenseName}</a>.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function EditorialSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="border-b border-border py-10 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function GuideItem({ title, body }: { title: string; body: string }) {
  return <div className="border-t border-border pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></div>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 first:pt-0 last:border-b-0 last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium leading-5">{value}</dd></div> : null;
}

function buildDirectionsUrl(entity: TexasEntityRecord, guide: SportsVenueGuidePilot) {
  const query = entity.coordinates ? `${entity.coordinates.latitude},${entity.coordinates.longitude}` : (guide.address ?? `${entity.name}, ${guide.city}, Texas`);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function postalAddress(address: string) {
  const [streetAddress, cityPart, statePart] = address.split(",").map((part) => part.trim());
  const [addressRegion, postalCode] = (statePart ?? "").split(/\s+/, 2);
  return { "@type": "PostalAddress", streetAddress, addressLocality: cityPart, addressRegion: addressRegion || "TX", postalCode, addressCountry: "US" };
}

function dedupeLinks(links: readonly SportsVenueGuideLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function latestIsoDate(values: readonly (string | undefined)[]) {
  return values
    .map((value) => value?.slice(0, 10))
    .filter((value): value is string => Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value)))
    .sort()
    .at(-1);
}

function schemaEventStatus(status: TexasEventCarouselItem["status"]) {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  if (status === "postponed") return "https://schema.org/EventPostponed";
  if (status === "rescheduled") return "https://schema.org/EventRescheduled";
  return "https://schema.org/EventScheduled";
}

function sportsVenueSchemaType(entity: TexasEntityRecord) {
  const tags = new Set(entity.tags ?? []);
  if (tags.has("golf")) return "GolfCourse";
  if (tags.has("motorsports") || tags.has("horse-racing") || tags.has("shooting-sports") || tags.has("action-sports") || tags.has("tournament-complex") || tags.has("aquatics")) return "SportsActivityLocation";
  return "StadiumOrArena";
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

function humanize(value: string) {
  return value.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ");
}