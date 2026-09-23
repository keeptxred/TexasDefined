import { lazy, Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { AutoEntityLinks } from '@/components/content/AutoEntityLinks';
import { CountyCoastalPlaces } from '@/components/content/CountyCoastalPlaces';
import { CountyGuideSections } from '@/components/content/CountyGuideSections';
import { EntityDepthSections } from '@/components/content/EntityDepthSections';
import { Container } from '@/components/layout/Container';
import { CountySportsDestinations } from '@/components/sports/CountySportsDestinations';
import {
  canonicalEntityPath,
  type RankedRelatedEntity,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

const CityPassContextualCallout = lazy(() =>
  import('@/components/monetization/CityPassContextualCallout').then((module) => ({
    default: module.CityPassContextualCallout,
  })),
);
const EntityFoodDestinations = lazy(() =>
  import('@/components/content/EntityFoodDestinations').then((module) => ({
    default: module.EntityFoodDestinations,
  })),
);
const CountyHighSchoolFootball = lazy(() =>
  import('@/components/sports/CountyHighSchoolFootball').then((module) => ({
    default: module.CountyHighSchoolFootball,
  })),
);

const siteUrl = 'https://texasdefined.com';
const localGovernmentKinds = new Set(['county', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);
const referenceKinds = new Set([...localGovernmentKinds, 'agency']);

export const Route = createLazyFileRoute('/$kind/$slug')({ component: EntityPage });

function EntityPage() {
  const { entity, related, countyProfile, localGovernment, countySeriesArticle, countySportsVenues, foodDestinations } = Route.useLoaderData();
  const visibleRelated = relatedForDisplay(entity, related);
  const relatedEntities = visibleRelated.map((item) => item.entity);
  const description = entity.kind === 'county' && countySeriesArticle?.dek ? countySeriesArticle.dek : pageDescription(entity);
  const canonicalPath = canonicalEntityPath(entity);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const incomplete = !entity.description;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schemaType(entity.kind),
        '@id': `${canonicalUrl}#entity`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description,
        url: canonicalUrl,
        sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
        geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
        containedInPlace: entity.countySlug ? { '@type': 'AdministrativeArea', name: `${title(entity.countySlug)} County` } : entity.region ? { '@type': 'Place', name: title(entity.region) } : undefined,
        ...(entity.kind === 'county' && countyProfile ? {
          additionalProperty: [
            countyProfile.countySeat ? { '@type': 'PropertyValue', name: 'County seat', value: countyProfile.countySeat } : undefined,
            countyProfile.population2020 != null ? { '@type': 'PropertyValue', name: '2020 Census population', value: countyProfile.population2020 } : undefined,
            countyProfile.landAreaSquareMiles != null ? { '@type': 'PropertyValue', name: 'Land area (square miles)', value: Math.round(countyProfile.landAreaSquareMiles) } : undefined,
          ].filter(Boolean),
        } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbSection(entity.kind), item: `${siteUrl}/explore` },
          { '@type': 'ListItem', position: 3, name: entity.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/explore" className="hover:text-foreground">{breadcrumbSection(entity.kind)}</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{entity.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{readerLabel(entity.kind)}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{entity.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              <AutoEntityLinks text={description} entities={relatedEntities} maxLinks={4} policy={{ excludedEntityIds: [entity.id] }} />
            </p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label={entity.kind === 'county' ? 'Guide type' : 'County'} value={entity.kind === 'county' ? 'Texas county guide' : entity.countySlug ? `${title(entity.countySlug)} County` : undefined} />
            {entity.kind === 'county' && countyProfile?.countySeat && <Fact label="County seat" value={countyProfile.countySeat} />}
            <Fact label="Part of Texas" value={entity.region ? title(entity.region) : undefined} />
            <Fact label="Source check" value={sourceStatus(entity)} />
            {entity.sourceCheckedAt && <Fact label="Last reviewed" value={formatCheckedDate(entity.sourceCheckedAt)} />}
          </dl>
        </header>

        {incomplete ? <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[14rem_1fr]">
          <div>
            {entity.kind === 'county'
              ? <span className="inline-flex rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">County guide</span>
              : <p className="eyebrow text-primary">Guide status</p>}
            <h2 className="mt-3 font-display text-3xl">{statusHeading(entity)}</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground">{statusMessage(entity)}</p>
          </div>
        </section> : null}

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">{officialLinkLabel(entity.kind)} ↗</a>}
          {entity.coordinates && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open in maps ↗</a>}
        </div>

        {entity.kind === 'city' ? <Suspense fallback={null}><CityPassContextualCallout surface="city" slug={entity.slug} /></Suspense> : null}
        {entity.kind === 'county' && countyProfile && localGovernment ? <CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} countySeriesArticle={countySeriesArticle} /> : null}
        {(entity.kind === 'city' || entity.kind === 'county') && foodDestinations.length ? <Suspense fallback={null}><EntityFoodDestinations entity={entity} destinations={foodDestinations} /></Suspense> : null}
        {entity.kind === 'county' ? <CountyCoastalPlaces county={entity} /> : null}
        {entity.kind === 'county' ? <CountySportsDestinations county={entity} venues={countySportsVenues} /> : null}
        {entity.kind === 'county' ? <Suspense fallback={null}><CountyHighSchoolFootball county={entity} /></Suspense> : null}
        {entity.kind !== 'county' ? <EntityDepthSections entity={entity} related={visibleRelated} /> : null}

        {entity.kind !== 'county' && entity.tags?.length ? <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">{notesEyebrow(entity.kind)}</p>
            <h2 className="mt-2 font-display text-3xl">{notesHeading(entity)}</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {entity.tags.map((tag) => <li key={tag} className="border-t border-border py-3 text-sm font-medium">{title(tag)}</li>)}
          </ul>
        </section> : null}

      </article>
    </Container>
  </>;
}

function relatedForDisplay(entity: TexasEntityRecord, related: RankedRelatedEntity[]) {
  if (!localGovernmentKinds.has(entity.kind)) return related;
  const explicitTargets = new Set(entity.relationships.map((relationship) => relationship.targetId));
  return related.filter(({ entity: candidate }) =>
    explicitTargets.has(candidate.id)
    || candidate.relationships.some((relationship) => relationship.targetId === entity.id)
    || Boolean(entity.countySlug && (candidate.countySlug === entity.countySlug || (candidate.kind === 'county' && candidate.slug === entity.countySlug)))
    || (entity.kind === 'county' && (candidate.countySlug === entity.slug || explicitTargets.has(candidate.id))),
  ).slice(0, 6);
}

function pageDescription(entity: TexasEntityRecord) {
  if (entity.description) return entity.description;
  if (entity.kind === 'county') return `${entity.name} county guide from Texas Defined, combining verified geography, communities, Census facts and official local resources.`;
  if (entity.kind === 'appraisal-district') return `${entity.name} property appraisal reference from Texas Defined. Office details and service links are published only as they are verified against authoritative sources.`;
  if (entity.kind === 'tax-office') return `${entity.name} county tax office reference from Texas Defined. Taxpayer and vehicle-service details are published only after source verification.`;
  if (entity.kind === 'county-clerk') return `${entity.name} county clerk reference from Texas Defined. Public-service details are added after they are checked against authoritative local sources.`;
  if (entity.kind === 'dps-office') return `${entity.name} public-service reference from Texas Defined. Location and service information is added only after it is verified.`;
  return `${entity.name} is part of the Texas Defined reference guide. We are adding verified details before expanding this page into a full guide.`;
}

function statusHeading(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return `About ${countyDisplayName(entity.name)}`;
  if (entity.kind === 'appraisal-district') return 'Verified office details';
  if (entity.kind === 'tax-office') return 'Verified service details';
  if (localGovernmentKinds.has(entity.kind)) return 'Verified public-service details';
  return 'What we can confirm';
}

function statusMessage(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return `This guide begins with checked county information, official resources and the local details that are useful now. Additional history, places and community context are added only when they can be supported well.`;
  if (entity.kind === 'appraisal-district') return `This guide shows the district information Texas Defined can support from authoritative sources. Use the official district link for current records, deadlines and office details.`;
  if (entity.kind === 'tax-office') return `This guide shows the taxpayer, registration and local service information Texas Defined can support from authoritative sources. Use the official office link for current requirements and hours.`;
  if (localGovernmentKinds.has(entity.kind)) return `This public-service guide includes checked local information and leaves unsupported details out. Use the linked official source for the most current service requirements.`;
  return `This guide includes the details Texas Defined can support from checked sources. Unsupported filler is intentionally left out.`;
}

function countyDisplayName(value: string) {
  return / County$/i.test(value) ? value : `${value} County`;
}

function sourceStatus(entity: TexasEntityRecord) {
  if (entity.status === 'pending-source-verification') return 'Still being checked';
  if (entity.sourceConfidence === 'official') return 'Official source checked';
  if (entity.sourceConfidence === 'high') return 'Source checked';
  return 'Additional source';
}

function officialLinkLabel(kind: string) {
  if (kind === 'county') return 'Official county website';
  if (kind === 'agency') return 'Official agency website';
  if (kind === 'appraisal-district') return 'Official appraisal district';
  if (kind === 'tax-office') return 'Official tax office';
  if (kind === 'county-clerk') return 'Official county clerk';
  if (kind === 'dps-office') return 'Official DPS information';
  return 'Official information';
}

function notesEyebrow(kind: string) { return referenceKinds.has(kind) ? 'Guide notes' : 'Field notes'; }
function notesHeading(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return 'What defines this county';
  if (entity.kind === 'agency') return 'What this agency handles';
  if (localGovernmentKinds.has(entity.kind)) return 'What this office handles';
  return `What defines ${entity.name}`;
}
function breadcrumbSection(kind: string) { return referenceKinds.has(kind) ? 'Texas reference' : 'Explore'; }

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function readerLabel(kind: string) {
  const labels: Record<string, string> = {
    county: 'County Guide', city: 'City Guide', region: 'Around the State', 'metro-area': 'City Life',
    agency: 'Texas State Agency',
    'appraisal-district': 'Property Appraisal', 'tax-office': 'County Tax Office', 'county-clerk': 'County Clerk', 'dps-office': 'DPS Office',
    museum: 'Museum Guide', 'historic-site': 'Then & Now', mission: 'Texas History', battlefield: 'Texas History',
    attraction: 'Worth the Drive', fair: 'Texas Calendar', rodeo: 'Texas Calendar', festival: 'Texas Calendar',
    'holiday-event': 'Seasonal Guide', 'sporting-event': 'The Texas Game',
  };
  return labels[kind] ?? title(kind);
}
function schemaType(kind: string) {
  if (kind === 'agency') return 'GovernmentOrganization';
  if (kind === 'city') return 'City';
  if (['county','region','metro-area'].includes(kind)) return 'AdministrativeArea';
  if (kind === 'museum') return 'Museum';
  if (['historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  // Generic knowledge-graph records do not carry occurrence dates/locations.
  // Reserve Schema.org Event for dedicated /event/:slug pages with verified occurrence data.
  if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Thing';
  return 'Place';
}
