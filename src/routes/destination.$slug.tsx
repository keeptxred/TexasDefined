import { LEGACY_EDITORIAL_REDIRECTS } from "@/lib/legacy-editorial-redirects";
import { DESTINATION_LAKE_GUIDE_LINKS } from "@/data/fishing/destination-lake-crosslinks";
import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";

import caddoLake from "@/assets/caddo-lake.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { heritagePhotoRightsForPath } from "@/data/heritage-photo-license-links";
import { verifiedLocalParkCredit } from "@/data/verified-local-state-park-photo-credits";
import { commonsHeroAttribution } from "@/lib/commons-hero-attribution";
import { verifiedDevilsRiverPhotoRights } from "@/data/verified-devils-river-landscape";
import { relatedDestinationHeroSrc } from "@/data/related-destination-hero";
import { AutoEntityLinks } from "@/components/content/AutoEntityLinks";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { DestinationRelationships } from "@/components/editorial/DestinationRelationships";
import { DestinationVisitPlanner } from "@/components/editorial/DestinationVisitPlanner";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import YsletaDelSurMuseumAuthority from "@/components/editorial/YsletaDelSurMuseumAuthority";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { destinationLocationAnswer } from "@/data/destination-location-answer";
import { auditDestination } from "@/data/destination-audit";
import { distanceMiles } from "@/data/destination-relationships";
import { getDestinationRelationshipGroups } from "@/data/destination-relationships.functions";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { articlesQuery, categoriesQuery, destinationQuery, regionsQuery } from "@/data/queries";
import { isTopTexasAttraction } from "@/data/top-texas-attractions";
import { museumAuthoritySlugs } from "@/data/museum-authority-slugs";
import { coastalHeritageAuthoritySlugs } from "@/data/coastal-heritage-discovery";
import { hideImageFallbackLabel, recoverOrHideImage } from "@/lib/image-fallback";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";
import { INTERNAL_LINK_POLICIES, policyForSurface } from "@/platform/internal-link-policies";

const CoastalBeachFieldGuide = lazy(() => import("@/components/content/CoastalBeachFieldGuide"));

const FranklinMountainsAuthority = lazy(() => import("@/components/editorial/FranklinMountainsAuthority"));

const DestinationViatorBooking = lazy(() =>
  import("@/components/editorial/DestinationViatorBooking").then((module) => ({
    default: module.DestinationViatorBooking,
  })),
);

const CityPassContextualCallout = lazy(() =>
  import("@/components/monetization/CityPassContextualCallout").then((module) => ({
    default: module.CityPassContextualCallout,
  })),
);

const ShinerBreweryAuthority = lazy(() =>
  import("@/components/editorial/ShinerBreweryAuthority")
);

const MaybornMuseumAuthority = lazy(() =>
  import("@/components/editorial/MaybornMuseumAuthority")
);

const ZapataCountyMuseumAuthority = lazy(() =>
  import("@/components/editorial/ZapataCountyMuseumAuthority")
);

const YoungCountyMuseumAuthority = lazy(() =>
  import("@/components/editorial/YoungCountyMuseumAuthority")
);

const DallasBlackHistoryAuthority = lazy(() => import("@/components/editorial/DallasBlackHistoryAuthority").then((m) => ({ default: m.DallasBlackHistoryAuthority })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function hasValidCoordinates(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !(lat === 0 && lng === 0);
}

function validExternalUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function checkedDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}


function destinationAutoLinkGraph(
  destination: { nearestTown: string; body: string[] },
  graph: Awaited<ReturnType<typeof loadTexasKnowledgeGraph>>,
) {
  const text = [destination.nearestTown, ...destination.body].join("\n");
  if (!text.trim()) return [];

  return graph.filter((entity) =>
    [entity.name, ...entity.aliases].some((rawLabel) => {
      const label = rawLabel.trim();
      if (label.length < 4) return false;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`\\b${escaped}\\b`, "i").test(text);
    }),
  );
}

function countyDisplayName(value: string) {
  const trimmed = value.trim();
  return /\bcount(?:y|ies)\b/i.test(trimmed) ? trimmed : `${trimmed} County`;
}

function countyRouteSlug(value?: string) {
  if (!value) return "";
  const label = countyDisplayName(value);
  if (/\bcounties\b|[,;&]|\band\b/i.test(label)) return "";
  return label.replace(/\s+County$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function destinationExperienceTitle(name: string, categoryName: string) {
  const category = categoryName.toLowerCase();
  if (category.includes("outdoors") || category.includes("wildlife")) return `Exploring ${name}`;
  if (category.includes("state park") || category.includes("natural area")) return `Visiting ${name}`;
  if (category.includes("lake") || category.includes("river")) return `On the water at ${name}`;
  if (category.includes("historic")) return `The story of ${name}`;
  return `What to know about ${name}`;
}

// Exact topic-specific metadata for long museum/historic names that previously
// exceeded the internal 90-character live audit limit after brand suffixing.
// Preserve the full institutional names in H1, schema and body copy.
const DESTINATION_EDITORIAL_SEO_TITLES: Readonly<Record<string,string>> = {
  "babe-didrikson-zaharias-museum-beaumont": "Babe Didrikson Zaharias Museum: Hours & Exhibits",
  "booker-t-washington-high-school-dallas": "Booker T. Washington Arts High School: Dallas History",
  "crow-museum-asian-art-dallas": "Crow Museum of Asian Art: Dallas Exhibits & Visit",
  "tenth-street-historic-district-oak-cliff": "Tenth Street Freedmen's Town: Dallas History & Heritage",
  "hotel-paso-del-norte": "Hotel Paso del Norte El Paso: History & Stay Guide",
  "franklin-mountains-state-park": "Franklin Mountains State Park: Trails, Fees & Camping",
};

function destinationSeoTitle(name: string, categoryName: string) {
  const category = categoryName.toLowerCase();
  if (category.includes("state park") || category.includes("natural area")) return `${name} | Texas State Park Guide`;
  if (category.includes("lake") || category.includes("river")) return `${name} | Texas Lake & River Guide`;
  if (category.includes("historic")) return `${name} | Texas Historic Site Guide`;
  if (name.toLowerCase().includes("brewery")) return `${name}: Tours, Beers & Visitor Guide`;
  return `${name} | Texas Travel Guide`;
}

const HISTORIC_DUPLICATE_SLUGS: Record<string, string> = {
  "lyndon-b-johnson-state-park-and-historic-site": "lyndon-b-johnson-state-park-historic-site",
  "lyndon-b-johnson-state-park-state-historic-site": "lyndon-b-johnson-state-park-historic-site",
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "san-jacinto-battleground-state-historic-site": "san-jacinto-battleground",
  "washington-on-the-brazos-state-historic-site": "washington-on-the-brazos",
  "battleship-texas-state-historic-site": "battleship-texas",
};

export const Route = createFileRoute("/destination/$slug")({
  beforeLoad: ({ params, location }) => {
    const legacy = LEGACY_EDITORIAL_REDIRECTS[`/destination/${params.slug}`];
    if (legacy) throw redirect({ href: `${legacy}${location.searchStr || ""}`, statusCode: 301 });
    const primary = HISTORIC_DUPLICATE_SLUGS[params.slug];
    if (primary) throw redirect({ to: "/destination/$slug", params: { slug: primary }, statusCode: 301 });
  },
  loader: async ({ context, params }) => {
    let destination = await context.queryClient.ensureQueryData(destinationQuery(params.slug));
    if (!destination) throw notFound();
    if (isTopTexasAttraction(destination.slug)) {
      const { resolveTopAttractionAuthority } = await import("@/data/top-attraction-authority-resolver");
      destination = resolveTopAttractionAuthority(destination);
    }
    if (museumAuthoritySlugs.has(destination.slug)) {
      const { enrichMuseumAuthority } = await import("@/data/museum-authority-network");
      destination = enrichMuseumAuthority(destination);
    }
    if (coastalHeritageAuthoritySlugs.has(destination.slug)) {
      const { resolveCoastalHeritageAuthority } = await import("@/data/coastal-heritage-authority");
      destination = resolveCoastalHeritageAuthority(destination);
    }
    const [completeGraph, categories, relationshipGroups, regions, relatedArticles] = await Promise.all([
      loadTexasKnowledgeGraph(),
      context.queryClient.ensureQueryData(categoriesQuery()),
      getDestinationRelationshipGroups({ data: { slug: params.slug } }),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: destination.category, limit: 3 })),
    ]);
    const graph = destinationAutoLinkGraph(destination, completeGraph);
    const dallasHeritage = destination.nearestTown === "Dallas" && destination.category === "historic-sites" ? (await import("@/data/dallas-black-history-research")).dallasBlackHistoryFor(destination.slug) : undefined;
    return { destination, graph, categories, regions, relatedArticles, relationshipGroups, dallasHeritage };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { destination, categories, relationshipGroups, dallasHeritage } = loaderData;
    const isZapataMuseum = destination.slug === "zapata-county-museum-history";
    const isAuthorityMuseum = museumAuthoritySlugs.has(destination.slug);
    const isYsletaMuseum = destination.slug === "ysleta-del-sur-pueblo-cultural-center-museum-el-paso";
    const isYoungCountyMuseum = destination.slug === "young-county-museum-of-history-and-culture";
    const isHotelPasoDelNorte = destination.slug === "hotel-paso-del-norte";
    const authorityGuide = destination.authorityGuide;
    const authorityCitations = [...(authorityGuide?.sources.map((source) => source.url) ?? []), ...(dallasHeritage?.sources.map((source) => source.url) ?? [])].filter(validExternalUrl);
    const audit = auditDestination(destination);
    const isHistoricalMuseumReference = ["1940-air-terminal-museum-houston", "elisabet-ney-museum-austin", "buffalo-soldiers-national-museum-houston", "first-capitol-of-texas", "battleship-texas"].includes(destination.slug);
// This closed museum's researched historical guide is indexable even though the
// institution must remain excluded from visit planning and attraction recommendations.
// The normal editorial quality gate still applies; this is NOT a trip-planner override.
const indexable = audit.readyForIndexing && (isPrimaryTripPlannerDestination(destination) || isHistoricalMuseumReference);
    const hasUsableHero = !audit.issues.some((issue) => issue.code === "hero-placeholder");
    const canonicalPath = `/destination/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const imageUrl = hasUsableHero ? absoluteUrl(texasDefinedBrand, destination.hero.src) : undefined;
    const categoryName = destination.category === "sports" ? "Texas Sports" : categories.find((category) => category.slug === destination.category)?.name ?? destination.category.replace(/-/g, " ");
    const categoryPath = destination.category === "sports" ? "/sports" : destination.category === "guides" ? "/guides" : `/explore/${destination.category}`;
    const validGeo = hasValidCoordinates(destination.coordinates.lat, destination.coordinates.lng);
    const relatedPlaces = [...new Map(relationshipGroups.flatMap((group) => group.destinations).map((item) => [item.slug, item])).values()];
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: destination.name, description: destination.summary, isPartOf: { "@id": `${siteUrl}/#website` }, ...(hasUsableHero ? { primaryImageOfPage: { "@id": `${url}#primaryimage` } } : {}), mainEntity: { "@id": `${url}#attraction` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, ...(relatedPlaces.length > 0 ? { hasPart: { "@id": `${url}#related-places` } } : {}), ...(authorityCitations.length > 0 ? { citation: authorityCitations } : validExternalUrl(destination.officialUrl) ? { citation: destination.officialUrl } : {}), ...(authorityGuide ? { author: { "@type": "Organization", "@id": `${siteUrl}/authors/a-hollis#desk`, name: "Texas Defined Editorial Desk", url: `${siteUrl}/authors/a-hollis` }, ...(isTopTexasAttraction(destination.slug) ? { isBasedOn: `${siteUrl}/explore/top-attractions/methodology` } : {}) } : {}), ...(destination.sourceCheckedAt ? { dateModified: destination.sourceCheckedAt } : {}) };
    const attractionSchema = { "@type": isHotelPasoDelNorte ? ["Hotel", "TouristAttraction"] : (isZapataMuseum || isYsletaMuseum || isYoungCountyMuseum || isAuthorityMuseum ? ["Museum", "TouristAttraction"] : "TouristAttraction"), "@id": `${url}#attraction`, url, mainEntityOfPage: { "@id": url }, name: destination.name, description: destination.summary, ...(isHotelPasoDelNorte ? { telephone: "+1-915-534-3000" } : {}), ...(isZapataMuseum ? { telephone: "+1-956-765-8983", openingHoursSpecification: ["Tuesday", "Wednesday", "Thursday", "Friday"].map((dayOfWeek) => ({ "@type": "OpeningHoursSpecification", dayOfWeek, opens: "10:00", closes: "16:00" })) } : {}), ...(isYoungCountyMuseum ? { telephone: "+1-940-282-2887", openingHoursSpecification: ["Wednesday", "Thursday", "Friday", "Saturday"].map((dayOfWeek) => ({ "@type": "OpeningHoursSpecification", dayOfWeek, opens: "10:00", closes: "16:00" })) } : {}), ...(hasUsableHero && imageUrl ? { image: [{ "@type": "ImageObject", "@id": `${url}#primaryimage`, url: imageUrl, caption: destination.hero.alt, width: destination.hero.width, height: destination.hero.height, ...(destination.hero.credit ? { creditText: destination.hero.credit } : {}) }] } : {}), ...(validGeo ? { geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng } } : {}), address: { "@type": "PostalAddress", addressRegion: "TX", addressLocality: destination.nearestTown, addressCountry: "US", ...(destination.address ? { streetAddress: isZapataMuseum ? "805 N U.S. Highway 83" : isHotelPasoDelNorte ? "10 Henry Trost Ct" : destination.address, ...(isHotelPasoDelNorte ? { postalCode: "79901" } : {}) } : {}) }, containedInPlace: { "@type": "State", name: "Texas" }, touristType: categoryName, ...(destination.managingAuthority ? { provider: { "@type": "Organization", name: destination.managingAuthority } } : {}), ...(validExternalUrl(destination.officialUrl) ? { sameAs: destination.officialUrl } : {}) };
    const relatedSchema = {
      "@type": "ItemList",
      "@id": `${url}#related-places`,
      name: `Places related to ${destination.name}`,
      numberOfItems: relatedPlaces.length,
      itemListElement: relatedPlaces.map((item, index) => {
        const sourceImage = relatedDestinationHeroSrc(item.slug, item.hero.src);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "TouristAttraction",
            name: item.name,
            description: item.summary,
            url: `${siteUrl}/destination/${item.slug}`,
            ...(sourceImage ? { image: absoluteUrl(texasDefinedBrand, sourceImage) } : {}),
          },
        };
      }),
    };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` }, { "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}${categoryPath}` }, { "@type": "ListItem", position: 4, name: destination.name, item: url }] };
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: destination.slug === "mayborn-museum-waco" ? "Mayborn Museum Waco: Hours, Tickets & Exhibits" : isZapataMuseum ? "Zapata County Museum of History: Exhibits, Hours & Admission" : isYsletaMuseum ? "Ysleta del Sur Pueblo Museum: Exhibits, Hours & Tigua History" : isYoungCountyMuseum ? "Young County Museum Graham: Exhibits, Hours & History" : (DESTINATION_EDITORIAL_SEO_TITLES[destination.slug] ?? destinationSeoTitle(destination.name, categoryName)),
        description: destination.slug === "fort-mckavett"
          ? "Explore Fort McKavett State Historic Site in Menard County: Buffalo Soldier history, restored barracks, admission, accessibility and tour tips."
          : destination.summary,
        canonicalPath,
        robots: indexable ? undefined : "noindex, follow",
        ...(hasUsableHero ? { image: destination.hero.src, imageAlt: destination.hero.alt } : {}),
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, attractionSchema, ...(relatedPlaces.length > 0 ? [relatedSchema] : []), ...(dallasHeritage ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: dallasHeritage.faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []), ...(destination.slug === "franklin-mountains-state-park" && destination.visitorFaqs?.length ? [{ "@type": "FAQPage", "@id": `${url}#franklin-faq`, mainEntity: destination.visitorFaqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []), breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Destination guide</p><h1 className="mt-3 font-display text-4xl">This place isn’t in our guide yet</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Browse the places we have mapped in <Link to="/explore" className="border-b border-primary text-primary">Explore Texas</Link>.</p></Container>,
  component: DestinationPage,
});

function DestinationPage() {
  const { destination, graph, categories, regions, relatedArticles, relationshipGroups, dallasHeritage } = Route.useLoaderData();

  if (destination.slug === "mayborn-museum-waco") return <Suspense fallback={null}><MaybornMuseumAuthority /></Suspense>;
  if (destination.slug === "zapata-county-museum-history") return <Suspense fallback={null}><ZapataCountyMuseumAuthority /></Suspense>;
  if (destination.slug === "ysleta-del-sur-pueblo-cultural-center-museum-el-paso") return <YsletaDelSurMuseumAuthority />;
  if (destination.slug === "young-county-museum-of-history-and-culture") return <Suspense fallback={null}><YoungCountyMuseumAuthority /></Suspense>;

  const region = regions.find((item) => item.id === destination.region);
  const categoryName = destination.category === "sports" ? "Texas Sports" : categories.find((category) => category.slug === destination.category)?.name ?? destination.category.replace(/-/g, " ");
  const excludedEntityIds = [`${destination.category}:${destination.slug}`, `attraction:${destination.slug}`];
  const surfacePolicy = INTERNAL_LINK_POLICIES.destination;
  const destinationPolicy = policyForSurface("destination", { excludedEntityIds, region: destination.region });
  let remainingLinks = surfacePolicy.pageBudget;
  const limit = (requested: number) => Math.max(0, Math.min(requested, surfacePolicy.blockBudget, remainingLinks));
  const spend = (requested: number) => { const value = limit(requested); remainingLinks -= value; return value; };
  const verifiedLabel = checkedDate(destination.sourceCheckedAt);
  const authoritySourceLinks = [...new Map((destination.authorityGuide?.sources ?? [])
    .filter((source) => validExternalUrl(source.url))
    .map((source) => [source.url, source] as const)).values()];
  const documentaryPhotoSource = authoritySourceLinks.find((source) => source.label === "Historic-site photo: source, original creator and usage rights");
  const corridorHeroRights = heritagePhotoRightsForPath(`/destination/${destination.slug}`);
  const devilsRiverPhotoRights = verifiedDevilsRiverPhotoRights(destination.hero);
  const commonsHeroRights = commonsHeroAttribution(destination.hero.src, destination.hero.credit);
  const primaryPhotoSourceUrl = documentaryPhotoSource?.url ?? corridorHeroRights?.sourceUrl ?? devilsRiverPhotoRights?.sourceUrl ?? verifiedLocalParkCredit(destination.hero)?.fileUrl ?? commonsHeroRights?.sourceUrl;
  const countySlug = countyRouteSlug(destination.county);
  const countyLabel = destination.county ? countyDisplayName(destination.county) : "";
  const isChokeCanyon = destination.slug === "choke-canyon-state-park";
  const isHotelPasoDelNorte = destination.slug === "hotel-paso-del-norte";

  const locationAnswer = isChokeCanyon
    ? `${destination.name} has two public units west of Three Rivers: Calliham in McMullen County and South Shore in Live Oak County.`
    : destinationLocationAnswer({
        name: destination.name,
        nearestTown: destination.nearestTown,
        countyLabel,
        regionName: region?.name,
        address: destination.address,
      });
  const relationshipGroupsForPage = isChokeCanyon
    ? relationshipGroups
      .map((group) => ({
        ...group,
        destinations: group.destinations.filter((item) => {
          const miles = distanceMiles(destination, item);
          return miles !== null && miles <= 60;
        }).slice(0, 3),
      }))
      .filter((group) => group.destinations.length > 0)
      .slice(0, 3)
    : relationshipGroups;
  const mapMarkers = isChokeCanyon
    ? [
      { id: `${destination.id}-calliham`, label: "Calliham Unit — headquarters, camping and full-service facilities", point: destination.coordinates },
      { id: `${destination.id}-south-shore`, label: "South Shore Unit — day use, fishing and boating", point: { lat: 28.467458, lng: -98.246528 } },
    ]
    : [{ id: destination.id, label: destination.name, point: destination.coordinates }];
  const compactNearby = isChokeCanyon
    ? [...new Map(
      relationshipGroupsForPage
        .flatMap((group) => group.destinations)
        .map((item) => [item.slug, item]),
    ).values()]
      .sort((left, right) => (distanceMiles(destination, left) ?? Number.POSITIVE_INFINITY) - (distanceMiles(destination, right) ?? Number.POSITIVE_INFINITY))
      .slice(0, 3)
    : [];

  const heroFallback = destination.slug === "caddo-lake-national-wildlife-refuge"
    ? { src: caddoLake, alt: "Bald cypress trees draped in Spanish moss across the Caddo Lake ecosystem in East Texas" }
    : undefined;

  return <>
    <Container className="pt-10 sm:pt-14"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li>{destination.category === "sports" ? <Link to="/sports" className="hover:text-foreground">{categoryName}</Link> : destination.category === "guides" ? <Link to="/guides" className="hover:text-foreground">{categoryName}</Link> : <Link to="/explore/$category" params={{ category: destination.category }} className="hover:text-foreground">{categoryName}</Link>}</li></ol></nav></Container>

    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
      <div data-image-fallback-label aria-hidden className="absolute inset-0 bg-ink" />
      <img src={destination.hero.src} alt={destination.hero.alt} width={destination.hero.width} height={destination.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-65" onLoad={(event) => hideImageFallbackLabel(event.currentTarget)} onError={(event) => recoverOrHideImage(event.currentTarget, heroFallback)} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/15" />
      <Container className="relative flex flex-col justify-end" style={{ minHeight: "clamp(24rem, 52vw, 32rem)", paddingTop: "6rem", paddingBottom: "3rem" }}>
        <p className="eyebrow text-ink-foreground/80">{region?.name ?? "Texas"} · {categoryName}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{destination.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/85">{destination.summary}</p>
        {destination.hero.credit && <p className="mt-6 text-[0.7rem] uppercase tracking-[0.12em] text-ink-foreground/60">Photography: {primaryPhotoSourceUrl ? <a href={primaryPhotoSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">{destination.hero.credit}</a> : destination.hero.credit}{devilsRiverPhotoRights && <> · <a href={devilsRiverPhotoRights.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">CC BY-SA license and credit terms</a></>}{corridorHeroRights && <> · <a href={corridorHeroRights.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">License terms</a></>}{commonsHeroRights?.licenseUrl && !corridorHeroRights && !devilsRiverPhotoRights && <> · <a href={commonsHeroRights.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">{commonsHeroRights.licenseCode} license ↗</a></>}</p>}
      </Container>
    </section>

    <AnswerSummary
      eyebrow="Quick trip facts"
      title={`${destination.name} at a glance`}
      items={[
        { question: `Where is ${destination.name}?`, answer: locationAnswer },
        { question: `When is the best time to visit ${destination.name}?`, answer: destination.bestSeason },
        { question: `Do I need to plan ahead for ${destination.name}?`, answer: destination.entryNote },
        ...(destination.managingAuthority ? [{ question: `Who manages ${destination.name}?`, answer: destination.managingAuthority }] : []),
      ]}
    />

    {isHotelPasoDelNorte && destination.gallery?.[0] && (
      <section aria-labelledby="hotel-paso-dome-photos" className="border-b border-border bg-surface">
        <Container className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,.75fr)] lg:items-center">
          <figure className="min-w-0">
            <img
              src={editorialImageSrc(destination.gallery[0].image.src)}
              alt={destination.gallery[0].image.alt}
              width={destination.gallery[0].image.width}
              height={destination.gallery[0].image.height}
              loading="eager"
              decoding="async"
              className="h-auto w-full bg-background object-contain"
              onError={(event) => recoverOrHideImage(event.currentTarget)}
            />
            <figcaption className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <p>{destination.gallery[0].caption}</p>
              <a href={destination.gallery[0].sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                Library of Congress original, photographer credit and reuse information — {destination.gallery[0].image.credit}
              </a>
            </figcaption>
          </figure>
          <div className="min-w-0">
            <p className="eyebrow text-primary">Inside the Dome Bar</p>
            <h2 id="hotel-paso-dome-photos" className="mt-3 font-display text-3xl leading-tight md:text-4xl">Two views of the historic stained-glass dome</h2>
            <p className="mt-4 text-base leading-7 text-foreground/90">
              The opening photo is a 2015 CC0 overhead view. This wider Library of Congress photograph, taken by Carol M. Highsmith in 2014, shows how the dome relates to the room's ornate interior. Both predate the hotel's 2020 restoration and should not be confused with current booking photographs.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The El Paso Public Library also preserves an older black-and-white Ponsford/Trost dome-room image. Because its publication rights have not been independently established, we link to the archival record instead of copying the photo.
            </p>
            <a href="https://texashistory.unt.edu/ark:/67531/metapth613579/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-2">
              View the historic dome-room photograph at the Portal to Texas History ↗
            </a>
          </div>
        </Container>
      </section>
    )}

    {isChokeCanyon && <span data-stay-nearby-disabled="true" className="hidden" aria-hidden="true" />}
    <Container className={isChokeCanyon ? "grid gap-8 py-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,.75fr)] lg:py-16" : "grid gap-10 py-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,.75fr)] lg:gap-12 lg:py-16"}>
      <div className="min-w-0">
        <section aria-labelledby="why-go" className="border-t border-border pt-8">
          <p className="eyebrow text-primary">The experience</p>
          <h2 id="why-go" className="mt-3 font-display text-4xl leading-tight">{destinationExperienceTitle(destination.name, categoryName)}</h2>
          <div className="editorial-body mt-7 text-foreground/90">{destination.body.map((paragraph) => <p key={paragraph} className="mt-6 first:mt-0"><AutoEntityLinks text={paragraph} entities={graph} maxLinks={spend(4)} policy={destinationPolicy} /></p>)}</div>
        </section>
        {destination.gallery && destination.gallery.length > 0 && (
          <section aria-labelledby="destination-photo-archive" className="mt-12 border-t border-border pt-8">
            <p className="eyebrow text-primary">Documentary photographs</p>
            <h2 id="destination-photo-archive" className="mt-3 font-display text-3xl">{isHotelPasoDelNorte ? "Hotel Paso del Norte: historic exterior and postcard" : `Historical photographs of ${destination.name}`}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Images are individually dated and licensed. Archival views do not establish current amenities, renovations or visitor access.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {destination.gallery.filter((_, index) => !isHotelPasoDelNorte || index > 0).map((item) => (
                <figure key={item.image.src} className="min-w-0 overflow-hidden border border-border">
                  <img src={editorialImageSrc(item.image.src)} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full bg-surface object-contain" onError={(event) => recoverOrHideImage(event.currentTarget)} />
                  <figcaption className="space-y-2 p-4 text-sm leading-6">
                    <p>{item.caption}</p>
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline underline-offset-2">Image source and reuse terms — {item.image.credit}</a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {dallasHeritage && <Suspense fallback={null}><DallasBlackHistoryAuthority slug={destination.slug} /></Suspense>}
        {(destination.category === "beaches-coast" || destination.slug === "galveston-island-state-park" || destination.slug === "goose-island-state-park") && <Suspense fallback={null}><CoastalBeachFieldGuide destinationSlug={destination.slug} /></Suspense>}
        <section aria-labelledby="before-you-go" className={isChokeCanyon ? "mt-10 border-t border-border pt-6" : "mt-16 border-t border-border pt-8"}>
          <p className="eyebrow text-primary">The details</p>
          <h2 id="before-you-go" className="mt-3 font-display text-3xl">Planning your visit</h2>
          <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Area</dt><dd className="mt-2 text-base"><AutoEntityLinks text={destination.nearestTown} entities={graph} maxLinks={spend(1)} policy={destinationPolicy} />, Texas</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Best season</dt><dd className="mt-2 text-base">{destination.bestSeason}</dd></div>
            {destination.county && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">{isChokeCanyon ? "Counties" : "County"}</dt><dd className="mt-2 text-base">{isChokeCanyon ? "McMullen County (Calliham) · Live Oak County (South Shore)" : countySlug ? <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{countyLabel}</Link> : countyLabel}</dd></div>}
            {destination.address && <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-2 text-base">{destination.address}</dd></div>}
            <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Entry & reservations</dt><dd className="mt-2 text-base leading-7">{destination.entryNote}</dd></div>
            {destination.accessibilityNotes && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Accessibility</dt><dd className="mt-2 text-base leading-7">{destination.accessibilityNotes}</dd></div>}
            {destination.directions && <div className="border-t border-border py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Getting there</dt><dd className="mt-2 text-base leading-7">{destination.directions}</dd></div>}
          </dl>
          <div className="mt-7 flex flex-wrap gap-6">{validExternalUrl(destination.reservationUrl) && <a href={destination.reservationUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Reservations</a>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official visitor information</a>}{isChokeCanyon && <a href="https://tpwd.texas.gov/state-parks/choke-canyon/alert" target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Current park alerts</a>}</div>
        </section>
        {authoritySourceLinks.length > 0 && <section aria-labelledby="destination-research-sources" className="mt-10 border-t border-border pt-8">
          <p className="eyebrow text-primary">{documentaryPhotoSource ? "Evidence and photo credits" : "Evidence and citations"}</p>
          <h2 id="destination-research-sources" className="mt-3 font-display text-3xl">{documentaryPhotoSource ? "Research sources and image rights" : "Research sources"}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{documentaryPhotoSource ? "Read the original operator records, preservation research and documentary photography license for this guide." : "Read the original operator records and supporting research for this guide."}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {authoritySourceLinks.map((source) => <li key={source.url} className="border-l-2 border-border pl-4">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{source.label}</a>
              {source.scope && <p className="mt-1 text-xs leading-5 text-muted-foreground">{source.scope}</p>}
            </li>)}
          </ul>
        </section>}
        {destination.slug === "franklin-mountains-state-park" && <Suspense fallback={null}><FranklinMountainsAuthority /></Suspense>}
        {!isChokeCanyon && destination.slug !== "franklin-mountains-state-park" && <Suspense fallback={null}><DestinationViatorBooking destination={destination} /></Suspense>}
        {DESTINATION_LAKE_GUIDE_LINKS[destination.slug] ? <section className="mt-10 border-t border-border pt-8" aria-label="Related lake fishing and recreation guide"><p className="eyebrow text-primary">Explore this lake</p><h2 className="mt-3 font-display text-3xl">Fishing, boat ramps and lake conditions</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">This park is part of a larger lake trip. Our separate lake guide connects species, launch facilities, boating and nearby counties; confirm park admission, accessibility, overnight reservations and closures with the operator.</p><a href={`/fishing/lakes/${DESTINATION_LAKE_GUIDE_LINKS[destination.slug].slug}`} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">{DESTINATION_LAKE_GUIDE_LINKS[destination.slug].name} visitor and fishing guide →</a></section> : null}
        {destination.slug === "dallas-arboretum-and-botanical-garden" ? <section className="mt-10 border-t border-border pt-8"><p className="eyebrow text-primary">Explore the lake next door</p><h2 className="mt-3 font-display text-3xl">White Rock Lake — fishing, paths and boating</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">The Arboretum overlooks White Rock Lake. The wider lake is a City of Dallas recreation area with fishing piers and boating restrictions; garden admission does not grant lake boat access or overnight camping. For launch locations, public park rules and lake history, use the dedicated lake guide.</p><a className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary" href="/fishing/lakes/white-rock-lake">Read the White Rock Lake visitor guide →</a></section> : null}
        {!isChokeCanyon && isPrimaryTripPlannerDestination(destination) && <div className="mt-10"><DestinationVisitPlanner destination={destination} /></div>}
        {destination.slug === "spoetzl-brewery" && <Suspense fallback={null}><ShinerBreweryAuthority /></Suspense>}
      </div>

      <aside className={isChokeCanyon ? "space-y-6 lg:sticky lg:top-28 lg:self-start" : "space-y-8 lg:sticky lg:top-28 lg:self-start"}>
        {isChokeCanyon && <div className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Choose your unit</p><dl className="mt-5 divide-y divide-border text-sm"><div className="pb-4"><dt className="font-semibold">Calliham Unit</dt><dd className="mt-1 leading-6 text-muted-foreground">Park headquarters, camping, cabins and the broader set of developed facilities.</dd></div><div className="pt-4"><dt className="font-semibold">South Shore Unit</dt><dd className="mt-1 leading-6 text-muted-foreground">Separate day-use access for boating, fishing, birding and shoreline recreation.</dd></div></dl></div>}
        <MapPreview markers={mapMarkers} directionsLabel={isChokeCanyon ? "Choke Canyon State Park — Calliham Unit, Texas" : `${destination.name}, Texas`} />
        {!isChokeCanyon && <Suspense fallback={null}><CityPassContextualCallout surface="destination" slug={destination.slug} placement="rail" /></Suspense>}
        {(validExternalUrl(destination.officialUrl) || verifiedLabel) && <div className="border-t border-border pt-5 text-sm"><p className="eyebrow text-muted-foreground">Official information</p>{verifiedLabel && <p className="mt-3 leading-6 text-muted-foreground">Visitor details last reviewed {verifiedLabel}.</p>}{validExternalUrl(destination.officialUrl) && <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official source</a>}</div>}
      </aside>
    </Container>

    {isChokeCanyon ? compactNearby.length > 0 && <Section className="py-10 sm:py-12 lg:py-14" tone="surface"><Container><SectionHeader eyebrow="Nearby" title="Three practical additions near Choke Canyon" description="A short list of close-by stops instead of a long statewide recommendation feed." /><div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{compactNearby.map((item) => <DestinationCard key={item.id} destination={item} regionLabel={item.region === destination.region ? region?.name : undefined} />)}</div></Container></Section> : <DestinationRelationships destination={destination} groups={relationshipGroupsForPage} regionName={region?.name} />}
    {!isChokeCanyon && relatedArticles.length > 0 && <Section><SectionHeader eyebrow="Read next" title={`More from ${categoryName}`} /><div className="mt-8 grid gap-6 lg:grid-cols-3">{relatedArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div></Section>}
  </>;
}