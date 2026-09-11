import type { ReactNode } from "react";

import {
  TexasEventCarousel,
  type TexasEventCarouselItem,
} from "@/components/editorial/TexasEventCarousel";
import { Container } from "@/components/layout/Container";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import type { TexasEntityRecord } from "@/data/knowledge-graph/types";
import type { SportsVenueEnrichment } from "@/data/sports-venue-enrichment";
import type { SportsVenueGuidePilot } from "@/data/sports-venue-guide-pilots";
import type { SportsVenuePhoto } from "@/data/sports-venue-images";

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
  nearbyAttractions?: readonly TexasEntityRecord[];
  upcomingEvents?: readonly TexasEventCarouselItem[];
  eventCalendarHref?: string;
};

export function SportsVenueGuidePage({
  entity,
  guide,
  enrichment,
  photo,
  nearbyAttractions = [],
  upcomingEvents = [],
  eventCalendarHref = "/events",
}: SportsVenueGuidePageProps) {
  const canonicalUrl = `${siteUrl}${guide.canonicalPath}`;
  const officialUrl = guide.officialUrl ?? entity.officialUrl;
  const directionsUrl = buildDirectionsUrl(entity, guide);
  const reviewedAt = guide.reviewedAt ?? enrichment?.verifiedAt ?? entity.sourceCheckedAt;
  const attractions = nearbyAttractions.slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "StadiumOrArena",
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
          </header>

          <div className="grid gap-6 border-b border-border pb-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <VenuePhoto photo={photo} venueName={entity.name} />
            <QuickFacts guide={guide} directionsUrl={directionsUrl} officialUrl={officialUrl} />
          </div>

          <TexasEventCarousel
            events={upcomingEvents}
            eyebrow="Upcoming events"
            title={`What’s happening at ${entity.name}`}
            viewAllHref={eventCalendarHref}
            emptyMessage={`No source-verified upcoming events are currently listed for ${entity.name}. Use the statewide calendar to explore other Texas events.`}
          />

          {enrichment ? (
            <KnowBeforeYouGo
              venueName={entity.name}
              parking={enrichment.parking}
              arrival={enrichment.arrival}
            />
          ) : null}

          <div data-stay-nearby-slot />

          {enrichment?.history ? (
            <EditorialSection eyebrow="Venue story" title={`The story of ${entity.name}`}>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {enrichment.history}
              </p>
            </EditorialSection>
          ) : null}

          {attractions.length >= 2 ? <NearbyAttractionsSection items={attractions} /> : null}

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
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <a href="/sports" className="hover:text-foreground">
        Texas Sports
      </a>
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <a href="/sports-venues" className="hover:text-foreground">
        Sports Venues
      </a>
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <span aria-current="page" className="text-foreground">
        {venueName}
      </span>
    </nav>
  );
}

function VenuePhoto({ photo, venueName }: { photo?: SportsVenuePhoto; venueName: string }) {
  if (!photo) {
    return (
      <div
        className="flex min-h-[32rem] items-center justify-center bg-muted px-8 text-center text-sm text-muted-foreground"
        role="img"
        aria-label={`${venueName} image unavailable`}
      >
        A verified venue photograph is not available yet.
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
        className="h-full min-h-[32rem] w-full object-cover"
      />
    </figure>
  );
}

function QuickFacts({
  guide,
  directionsUrl,
  officialUrl,
}: {
  guide: SportsVenueGuidePilot;
  directionsUrl: string;
  officialUrl?: string;
}) {
  return (
    <aside
      className="flex h-full flex-col border border-border px-5 py-5 sm:px-6"
      aria-labelledby="venue-quick-facts-heading"
    >
      <div>
        <p className="eyebrow text-primary">Quick facts</p>
        <h2 id="venue-quick-facts-heading" className="mt-2 font-display text-3xl">
          At the venue
        </h2>
      </div>
      <dl className="mt-5 text-sm">
        <Fact label="Capacity" value={guide.capacity} />
        <Fact label="Venue type" value={guide.venueType} />
        <Fact label="Home team" value={guide.homeTeam} />
        <Fact label="Playing surface" value={guide.playingSurface} />
        <Fact label="Opened" value={guide.opened} />
        <Fact label="Address" value={guide.address} />
      </dl>
      <div className="mt-auto grid gap-3 pt-6">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Get Directions
        </a>
        {officialUrl ? (
          <a
            href={officialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-3 text-center text-sm font-semibold hover:border-primary hover:text-primary"
          >
            Official Venue Site
          </a>
        ) : null}
      </div>
    </aside>
  );
}

function KnowBeforeYouGo({
  venueName,
  parking,
  arrival,
}: {
  venueName: string;
  parking: string;
  arrival: string;
}) {
  return (
    <EditorialSection eyebrow="Know before you go" title={`Planning for ${venueName}`}>
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <GuideItem title="Parking" body={parking} />
        <GuideItem title="Arrival" body={arrival} />
      </div>
    </EditorialSection>
  );
}

function NearbyAttractionsSection({ items }: { items: readonly TexasEntityRecord[] }) {
  return (
    <EditorialSection eyebrow="Nearby attractions" title="More to do around the venue">
      <div className="grid gap-x-8 border-t border-border sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={canonicalEntityPath(item)}
            className="group border-b border-border py-5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {humanize(item.kind)}
            </span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">
              {item.name}
            </strong>
            {item.description ? (
              <span className="mt-2 block line-clamp-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </EditorialSection>
  );
}

function SourcesSection({
  entity,
  guide,
  enrichment,
  photo,
  reviewedAt,
}: {
  entity: TexasEntityRecord;
  guide: SportsVenueGuidePilot;
  enrichment?: SportsVenueEnrichment;
  photo?: SportsVenuePhoto;
  reviewedAt?: string;
}) {
  const sourceLinks = dedupeLinks([
    ...guide.sources,
    ...(enrichment?.planningLinks ?? []).map((link) => ({ label: link.label, href: link.url })),
    ...(entity.officialUrl
      ? [{ label: "Knowledge-graph official venue source", href: entity.officialUrl }]
      : []),
  ]);

  return (
    <section className="py-10 sm:py-12" aria-labelledby="venue-sources-heading">
      <div className="grid gap-7 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Sources</p>
          <h2 id="venue-sources-heading" className="mt-2 font-display text-3xl">
            Verification & review
          </h2>
          {reviewedAt ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Last reviewed {formatDate(reviewedAt)}.
            </p>
          ) : null}
        </div>
        <div className="min-w-0">
          {sourceLinks.length ? (
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {sourceLinks.map((link) => (
                <li key={link.href} className="border-t border-border py-4 text-sm font-semibold">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-primary/40 underline-offset-4 hover:text-primary"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {photo ? (
            <p className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
              Photo:{" "}
              <a
                href={photo.sourcePage}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {photo.sourceName}
              </a>
              , {photo.author}.{" "}
              <a
                href={photo.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {photo.licenseName}
              </a>
              .
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function EditorialSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
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
  return (
    <div className="border-t border-border pt-4">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? (
    <div className="border-b border-border py-3 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium leading-5">{value}</dd>
    </div>
  ) : null;
}

function buildDirectionsUrl(entity: TexasEntityRecord, guide: SportsVenueGuidePilot) {
  const query = entity.coordinates
    ? `${entity.coordinates.latitude},${entity.coordinates.longitude}`
    : (guide.address ?? `${entity.name}, ${guide.city}, Texas`);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function postalAddress(address: string) {
  const [streetAddress, cityPart, statePart] = address.split(",").map((part) => part.trim());
  const [addressRegion, postalCode] = (statePart ?? "").split(/\s+/, 2);
  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: cityPart,
    addressRegion: addressRegion || "TX",
    postalCode,
    addressCountry: "US",
  };
}

function dedupeLinks(links: readonly SportsVenueGuideLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

function humanize(value: string) {
  return value
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}
