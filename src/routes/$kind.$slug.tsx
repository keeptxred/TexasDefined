import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { AutoEntityLinks } from '@/components/content/AutoEntityLinks';
import { CountyGuideSections } from '@/components/content/CountyGuideSections';
import { Container } from '@/components/layout/Container';
import { loadCountyProfile } from '@/data/county-profile';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import {
  canonicalEntityPath,
  isIndexableEntityPage,
  rankRelatedEntities,
  type RankedRelatedEntity,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { loadLocalGovernmentProfile } from '@/data/local-government-profile';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';
const localGovernmentKinds = new Set(['county', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);

export const Route = createFileRoute('/$kind/$slug')({
  loader: async ({ params }) => {
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(`${params.kind}:${params.slug}`) ?? await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== params.kind) throw notFound();
    const related = rankRelatedEntities(entity, graph, 12);
    if (entity.kind !== 'county') return { entity, related, countyProfile: null, localGovernment: null };
    const [countyProfile, localGovernment] = await Promise.all([
      loadCountyProfile(entity.slug, entity.name),
      loadLocalGovernmentProfile(entity.slug, entity.name),
    ]);
    return { entity, related, countyProfile, localGovernment };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = canonicalEntityPath(loaderData.entity);
    const description = pageDescription(loaderData.entity);
    const indexable = isIndexableEntityPage(loaderData.entity);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: loaderData.entity.name,
        description,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: EntityPage,
});

function EntityPage() {
  const { entity, related, countyProfile, localGovernment } = Route.useLoaderData();
  const visibleRelated = relatedForDisplay(entity, related);
  const relatedEntities = visibleRelated.map((item) => item.entity);
  const description = pageDescription(entity);
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
        description: entity.description,
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
            <Fact label="Source status" value={sourceStatus(entity)} />
            {entity.sourceCheckedAt && <Fact label="Details reviewed" value={formatCheckedDate(entity.sourceCheckedAt)} />}
          </dl>
        </header>

        {incomplete ? <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Guide status</p>
            <h2 className="mt-2 font-display text-3xl">{statusHeading(entity.kind)}</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground">{statusMessage(entity)}</p>
          </div>
        </section> : null}

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">{officialLinkLabel(entity.kind)} ↗</a>}
          {entity.coordinates && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open in maps ↗</a>}
        </div>

        {entity.kind === 'county' && countyProfile && localGovernment ? <CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} /> : null}

        {entity.kind !== 'county' && entity.tags?.length ? <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">{notesEyebrow(entity.kind)}</p>
            <h2 className="mt-2 font-display text-3xl">{notesHeading(entity.kind)}</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {entity.tags.map((tag) => <li key={tag} className="border-t border-border py-3 text-sm font-medium">{title(tag)}</li>)}
          </ul>
        </section> : null}

        {entity.kind !== 'county' && visibleRelated.length ? <section className="py-12">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <div>
              <p className="eyebrow text-primary">{relatedEyebrow(entity.kind)}</p>
              <h2 className="mt-2 font-display text-4xl">{relatedHeading(entity.kind)}</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {visibleRelated.map(({ entity: candidate }, index) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className={`group py-6 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''} border-b border-border`}>
              <span className="eyebrow text-primary">{readerLabel(candidate.kind)}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{candidate.name}</strong>
              <small className="mt-3 block text-sm leading-6 text-muted-foreground">{relatedActionLabel(candidate.kind)} →</small>
            </a>)}
          </div>
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

function statusHeading(kind: string) {
  if (kind === 'county') return 'Verified county guide';
  if (kind === 'appraisal-district') return 'Office details are being verified';
  if (kind === 'tax-office') return 'Service details are being verified';
  if (localGovernmentKinds.has(kind)) return 'Public-service details are being verified';
  return 'This guide is being expanded';
}

function statusMessage(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return `${entity.name} is built from verified state, federal and county sources. Sections only appear when supporting data is available, so missing facts are omitted rather than filled with generic copy.`;
  if (entity.kind === 'appraisal-district') return `This is a reference page for ${entity.name}, not a finished editorial guide. We are verifying the district's official contact and property-appraisal resources before presenting them as authoritative.`;
  if (entity.kind === 'tax-office') return `This is a reference page for ${entity.name}. We are verifying official taxpayer, registration, and local service information before presenting a complete service guide.`;
  if (localGovernmentKinds.has(entity.kind)) return `This public-service reference is intentionally limited while Texas Defined verifies the official local information. Unverified details are not presented as complete.`;
  return `Texas Defined is still building this reference from verified sources. We would rather show a clearly incomplete guide than pad the page with generic information.`;
}

function sourceStatus(entity: TexasEntityRecord) {
  if (entity.status === 'pending-source-verification') return 'Verification in progress';
  if (entity.sourceConfidence === 'official') return 'Official source checked';
  if (entity.sourceConfidence === 'high') return 'High-confidence source';
  return 'Reference source';
}

function officialLinkLabel(kind: string) {
  if (kind === 'county') return 'Official county website';
  if (kind === 'appraisal-district') return 'Official appraisal district';
  if (kind === 'tax-office') return 'Official tax office';
  if (kind === 'county-clerk') return 'Official county clerk';
  if (kind === 'dps-office') return 'Official DPS information';
  return 'Official information';
}

function notesEyebrow(kind: string) { return localGovernmentKinds.has(kind) ? 'Reference notes' : 'Field notes'; }
function notesHeading(kind: string) {
  if (kind === 'county') return 'What defines this county';
  if (localGovernmentKinds.has(kind)) return 'What this office handles';
  return 'Why it belongs in the guide';
}
function relatedEyebrow(kind: string) { return localGovernmentKinds.has(kind) ? 'Useful connections' : 'Continue exploring'; }
function relatedHeading(kind: string) {
  if (kind === 'county') return 'County services and places';
  if (localGovernmentKinds.has(kind)) return 'Related county resources';
  return 'Nearby and related';
}
function relatedActionLabel(kind: string) { return localGovernmentKinds.has(kind) ? 'Open reference page' : 'Open the field guide'; }
function breadcrumbSection(kind: string) { return localGovernmentKinds.has(kind) ? 'Texas reference' : 'Explore'; }

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
    'appraisal-district': 'Property Appraisal', 'tax-office': 'County Tax Office', 'county-clerk': 'County Clerk', 'dps-office': 'DPS Office',
    museum: 'Museum Guide', 'historic-site': 'Then & Now', mission: 'Texas History', battlefield: 'Texas History',
    attraction: 'Worth the Drive', fair: 'Texas Calendar', rodeo: 'Texas Calendar', festival: 'Texas Calendar',
    'holiday-event': 'Seasonal Guide', 'sporting-event': 'The Texas Game',
  };
  return labels[kind] ?? title(kind);
}
function schemaType(kind: string) {
  if (kind === 'city') return 'City';
  if (['county','region','metro-area'].includes(kind)) return 'AdministrativeArea';
  if (kind === 'museum') return 'Museum';
  if (['historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Event';
  return 'Place';
}
