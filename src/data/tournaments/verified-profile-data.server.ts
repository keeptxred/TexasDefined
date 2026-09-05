import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { verifiedTournamentBySlug } from "./verified-profiles";

const origin = `https://${texasDefinedBrand.identity.domain}`;

function buildVerifiedTournamentHead(profile: NonNullable<ReturnType<typeof verifiedTournamentBySlug>>) {
  const canonicalPath = `/tournament/${profile.slug}`;
  const pageUrl = `${origin}${canonicalPath}`;
  const description = `${profile.summary} Official source checked ${profile.sourceCheckedAt}.`;
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${pageUrl}#event`,
    name: profile.name,
    description: profile.summary,
    url: pageUrl,
    sameAs: profile.officialUrl,
    startDate: profile.startDate,
    endDate: profile.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: profile.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.city,
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: `${profile.name} — Texas Tournament Guide`,
    description,
    dateModified: profile.sourceCheckedAt,
    mainEntity: { "@id": `${pageUrl}#event` },
    isPartOf: { "@id": `${origin}/#website` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "Texas Events", item: `${origin}/events` },
      { "@type": "ListItem", position: 3, name: "Texas Tournaments", item: `${origin}/events/tournaments` },
      { "@type": "ListItem", position: 4, name: profile.categoryLabel, item: `${origin}${profile.categoryPath}` },
      { "@type": "ListItem", position: 5, name: profile.name, item: pageUrl },
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, {
      title: `${profile.name} — Dates, Venue & Texas Guide`,
      description,
      canonicalPath,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify([webPageJsonLd, eventJsonLd, breadcrumbJsonLd]) }],
  };
}

export function loadVerifiedTournamentProfileDataServer(slug: string) {
  const profile = verifiedTournamentBySlug(slug);
  if (!profile) return null;
  return {
    profile,
    canonicalPath: `/tournament/${profile.slug}`,
    countyPath: `/county/${profile.countySlug}`,
    head: buildVerifiedTournamentHead(profile),
  };
}

export type VerifiedTournamentProfileData = NonNullable<ReturnType<typeof loadVerifiedTournamentProfileDataServer>>;
