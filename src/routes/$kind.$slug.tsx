import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { loadCountyProfile } from '@/data/county-profile';
import { loadCountySeriesArticle } from '@/data/county-series';
import {
  canonicalEntityPath,
  isIndexableEntityPage,
  rankRelatedEntities,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { loadLocalGovernmentProfile } from '@/data/local-government-profile';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/$kind/$slug')({
  loader: async ({ params }) => {
    const { findCompleteTexasEntity, loadTexasKnowledgeGraph } = await import('@/data/knowledge-graph');
    const graph = await loadTexasKnowledgeGraph();
    const graphEntity = graph.find((candidate) => candidate.kind === params.kind && candidate.slug === params.slug);
    const entity = graphEntity ?? await findCompleteTexasEntity(`${params.kind}:${params.slug}`) ?? await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== params.kind) throw notFound();
    const related = rankRelatedEntities(entity, graph, 12);
    const countySportsVenues = entity.kind === 'county'
      ? graph
        .filter((candidate) => candidate.kind === 'sports-venue' && candidate.countySlug === entity.slug && isIndexableEntityPage(candidate))
        .sort((left, right) => sportsVenuePriority(left) - sportsVenuePriority(right) || left.name.localeCompare(right.name))
      : [];
    const foodDestinationsPromise = entity.kind === 'county' || entity.kind === 'city'
      ? import('@/data/food-destination-entity-index').then(({ loadEntityFoodDestinations }) => loadEntityFoodDestinations(entity.kind, entity.slug))
      : Promise.resolve([]);
    if (entity.kind !== 'county') {
      const foodDestinations = await foodDestinationsPromise;
      return { entity, related, countyProfile: null, localGovernment: null, countySeriesArticle: null, countySportsVenues, foodDestinations };
    }
    const countyRvParksPromise = import('@/data/rv-parks/county-index').then(({ loadCountyRvParksSnapshot }) => loadCountyRvParksSnapshot(entity.slug));
    const countyMajorEventsPromise = import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug));
    const [countyProfile, localGovernment, countySeriesArticle, countyRvParks, countyMajorEvents, foodDestinations] = await Promise.all([
      loadCountyProfile(entity.slug, entity.name),
      loadLocalGovernmentProfile(entity.slug, entity.name),
      loadCountySeriesArticle(entity.slug),
      countyRvParksPromise,
      countyMajorEventsPromise,
      foodDestinationsPromise,
    ]);
    const countyEntity = { ...entity, rvParks: countyRvParks, majorEvents: countyMajorEvents };
    return { entity: countyEntity, related, countyProfile, localGovernment, countySeriesArticle, countySportsVenues, foodDestinations };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = canonicalEntityPath(loaderData.entity);
    const countySeriesArticle = loaderData.countySeriesArticle;
    let description = searchSnippetDescription(loaderData.entity);
    if (loaderData.entity.kind === 'county' && countySeriesArticle?.dek) description = countySeriesArticle.dek;
    const indexable = isIndexableEntityPage(loaderData.entity);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: searchIntentTitle(loaderData.entity),
        description,
        image: countySeriesArticle?.hero.src,
        imageAlt: countySeriesArticle?.hero.alt,
        imageWidth: countySeriesArticle?.hero.width,
        imageHeight: countySeriesArticle?.hero.height,
        type: countySeriesArticle ? 'article' : 'website',
        publishedTime: countySeriesArticle?.publishedAt,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});

function sportsVenuePriority(entity: TexasEntityRecord) {
  const tags = new Set(entity.tags ?? []);
  if (tags.has('professional')) return 0;
  if (tags.has('major-tourist-draw')) return 1;
  if (tags.has('college')) return 2;
  if (tags.has('motorsports')) return 3;
  if (tags.has('golf')) return 4;
  if (tags.has('high-school')) return 5;
  return 6;
}

function searchIntentTitle(entity: TexasEntityRecord) {
  if (entity.kind === 'appraisal-district' && entity.countySlug) return `${title(entity.countySlug)} County Appraisal District`;
  if (entity.kind === 'tax-office' && entity.countySlug) return `${title(entity.countySlug)} County Tax Office`;
  if (entity.kind === 'agency') return `${entity.name}: Services`;
  return entity.name;
}

function searchSnippetDescription(entity: TexasEntityRecord) {
  if (entity.kind === 'agency') {
    const topics = entity.tags?.slice(0, 3).join(', ');
    const topicCopy = topics ? `Find information on ${topics}` : 'See what the agency handles';
    const officialCopy = entity.officialUrl ? ' and a verified link to its official Texas website' : '';
    return `${entity.name}: ${topicCopy}${officialCopy}. Independent Texas Defined guide.`;
  }
  if (entity.kind === 'appraisal-district' && entity.countySlug) {
    const countyName = `${title(entity.countySlug)} County`;
    const officialCopy = entity.officialUrl ? ', plus a verified link to the official district website' : '';
    if (entity.description) return `Find ${countyName} Appraisal District information for property search, appraisal records, exemptions and protests, with verified office details${officialCopy}. Independent Texas Defined guide.`;
    return `${countyName} Appraisal District guide from Texas Defined. Office and property-appraisal details are published as authoritative sources are verified.`;
  }
  return pageDescription(entity);
}

function pageDescription(entity: TexasEntityRecord) {
  if (entity.description) return entity.description;
  if (entity.kind === 'county') return `${entity.name} county guide from Texas Defined, combining verified geography, communities, Census facts and official local resources.`;
  if (entity.kind === 'appraisal-district') return `${entity.name} property appraisal guide from Texas Defined. Office details and service links are published only as they are verified against authoritative sources.`;
  if (entity.kind === 'tax-office') return `${entity.name} county tax office guide from Texas Defined. Taxpayer and vehicle-service details are published only after source verification.`;
  if (entity.kind === 'county-clerk') return `${entity.name} county clerk guide from Texas Defined. Public-service details are added after they are checked against authoritative local sources.`;
  if (entity.kind === 'dps-office') return `${entity.name} public-service guide from Texas Defined. Location and service information is added only after it is verified.`;
  return `${entity.name} is part of the Texas Defined guide collection. We are adding checked details before expanding this page.`;
}

function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
