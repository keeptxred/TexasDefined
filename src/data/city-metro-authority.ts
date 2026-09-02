import type { TexasEntityRecord } from './knowledge-graph/types';

const checkedAt = '2026-09-01';

type AuthorityOverride = Partial<Pick<TexasEntityRecord,
  'aliases' | 'description' | 'countySlug' | 'region' | 'coordinates' | 'officialUrl' | 'sourceId' | 'sourceConfidence' | 'sourceCheckedAt' | 'status' | 'relationships' | 'tags'
>>;

const statewideServiceRelationships = [
  { type: 'public-service-reference', targetId: 'agency:texas-dps' },
  { type: 'vehicle-service-reference', targetId: 'agency:texas-dmv' },
  { type: 'property-tax-reference', targetId: 'agency:texas-comptroller' },
  { type: 'utility-reference', targetId: 'agency:public-utility-commission' },
];

const city = (
  description: string,
  officialUrl: string,
  region: string,
  metroId: string | undefined,
  tags: string[],
  extraRelationships: TexasEntityRecord['relationships'] = [],
): AuthorityOverride => ({
  description,
  officialUrl,
  region,
  sourceConfidence: 'official',
  sourceCheckedAt: checkedAt,
  status: 'active',
  relationships: [
    { type: 'located-in-region', targetId: `region:${region}` },
    ...(metroId ? [{ type: 'part-of-metro', targetId: metroId }] : []),
    ...statewideServiceRelationships,
    ...extraRelationships,
  ],
  tags: ['city-authority', 'relocation', 'travel', 'property', 'utilities', 'transportation', 'health-care', 'schools', 'parks', 'museums', 'food', 'events', ...tags],
});

const CITY_OVERRIDES: Record<string, AuthorityOverride> = {
  houston: city(
    'Houston is TexasDefined’s Gulf Coast city authority hub for Houston and Harris County, connecting relocation, property and tax resources, utilities, transportation, airports, major employment sectors, health systems, schools, neighborhoods, parks, museums, food, annual events and nearby destinations. The guide keeps city, county and state responsibilities distinct so readers can move from a broad Houston reference into the correct local or statewide resource.',
    'https://www.houstontx.gov/', 'gulf-coast', 'metro-area:greater-houston', ['major-city', 'metro-core', 'airports', 'energy', 'port-logistics', 'aerospace'],
  ),
  dallas: city(
    'Dallas is TexasDefined’s North Texas city authority hub for Dallas and Dallas County, connecting relocation, property and tax resources, utilities, transportation, airports, employment, health systems, schools, neighborhoods, parks, museums, food, annual events and nearby destinations. The page is a durable local-reference node rather than a generic moving article, with clear paths into county, metro and statewide service coverage.',
    'https://dallascityhall.com/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metro-core', 'airports', 'finance', 'professional-services', 'technology'],
  ),
  'fort-worth': city(
    'Fort Worth is TexasDefined’s western Dallas–Fort Worth city authority hub for Fort Worth and Tarrant County, connecting relocation, property and tax resources, utilities, transportation, airports, employment, health systems, schools, neighborhoods, parks, museums, food, annual events and nearby destinations. It preserves Fort Worth’s distinct local identity while linking readers into the larger DFW metro and the correct county and state service systems.',
    'https://www.fortworthtexas.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metro-core', 'airports', 'aviation', 'aerospace', 'manufacturing', 'logistics'],
  ),
  austin: city(
    'Austin is TexasDefined’s Central Texas city authority hub for Austin and Travis County, connecting relocation, property and tax resources, utilities, transportation, the airport, major employment sectors, health systems, schools, neighborhoods, parks, museums, food, annual events and nearby destinations. The city node separates broad Austin reference intent from relocation-only coverage and connects readers to county, metro and statewide public-service resources.',
    'https://www.austintexas.gov/', 'central-texas', 'metro-area:greater-austin', ['major-city', 'state-capital', 'metro-core', 'airport', 'technology', 'semiconductors', 'government', 'higher-education'],
  ),
  'san-antonio': city(
    'San Antonio is TexasDefined’s South Texas city authority hub for San Antonio and Bexar County, connecting relocation, property and tax resources, utilities, transportation, the airport, employment, health systems, schools, neighborhoods, parks, museums, food, annual events, history and nearby destinations. The city node connects practical local-reference needs with San Antonio’s major travel and heritage coverage while keeping county and state services clearly separated.',
    'https://www.sa.gov/', 'south-texas', 'metro-area:greater-san-antonio', ['major-city', 'metro-core', 'airport', 'texas-history', 'military', 'cybersecurity', 'tourism'],
  ),
  'el-paso': city(
    'El Paso is TexasDefined’s Far West Texas city authority hub for El Paso and El Paso County, connecting relocation, property and tax resources, utilities, transportation, El Paso International Airport, schools, health systems, neighborhoods, parks, museums, food, events and border-region travel context. City services, county responsibilities and state resources remain separated so residents and visitors can verify the jurisdiction that controls a service or record.',
    'https://www.elpasotexas.gov/', 'west-texas', undefined, ['major-city', 'border', 'international-trade', 'airport', 'military', 'desert'],
  ),
  arlington: city(
    'Arlington is TexasDefined’s Tarrant County city authority node between Dallas and Fort Worth, connecting relocation, property and tax resources, utilities, transportation, schools, health systems, neighborhoods, parks, major sports and entertainment destinations, events and nearby DFW communities. The page gives Arlington its own local-reference identity while connecting readers to Tarrant County and broader North Texas resources instead of treating the Metroplex as one jurisdiction.',
    'https://www.arlingtontx.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'sports', 'entertainment', 'metroplex', 'tourism'],
  ),
  'corpus-christi': city(
    'Corpus Christi is TexasDefined’s Coastal Bend city authority hub for Corpus Christi and Nueces County, connecting relocation, property and tax resources, utilities, transportation, schools, health systems, neighborhoods, beaches, parks, museums, food, events, port activity and nearby Gulf Coast destinations. The page links practical city information with coastal travel and outdoor discovery while keeping municipal, county and state responsibilities distinct.',
    'https://www.corpuschristitx.gov/', 'gulf-coast', undefined, ['major-city', 'coast', 'beaches', 'port', 'energy', 'tourism', 'fishing'],
  ),
  plano: city(
    'Plano is TexasDefined’s Collin County city authority node for one of North Texas’s largest suburban employment and residential centers, connecting relocation, property and tax resources, municipal utilities, transportation, schools, health systems, neighborhoods, parks, food, events and nearby DFW communities. The guide distinguishes Plano city services from Collin County, regional and state systems so readers can reach the correct source for each task.',
    'https://www.plano.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metroplex', 'corporate-employment', 'technology', 'suburban'],
  ),
  lubbock: city(
    'Lubbock is TexasDefined’s South Plains city authority hub for Lubbock and Lubbock County, connecting relocation, property and tax resources, utilities, transportation, schools, health systems, neighborhoods, parks, museums, food, events, higher education and the regional economy. The page serves both residents and travelers while connecting city-level information to county and statewide resources without padding the guide with unsourced statistics.',
    'https://www.mylubbock.us/', 'south-plains', undefined, ['major-city', 'south-plains', 'higher-education', 'agriculture', 'health-care', 'regional-hub'],
  ),
};

const METRO_OVERRIDES: Record<string, AuthorityOverride> = {
  'greater-houston': {
    description: 'Greater Houston is TexasDefined’s metro-level discovery node for the Houston region, connecting the core city with Harris County, Gulf Coast communities, regional transportation and practical relocation and travel coverage. It provides a layer above individual city guides so nearby destinations, county resources and metro-scale planning can be discovered without collapsing distinct local jurisdictions into one city page.',
    officialUrl: 'https://www.h-gac.com/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'gulf-coast',
    relationships: [{ type: 'has-core-city', targetId: 'city:houston' }, { type: 'regional-county', targetId: 'county:harris' }, { type: 'located-in-region', targetId: 'region:gulf-coast' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'dallas-fort-worth': {
    description: 'Dallas–Fort Worth is TexasDefined’s North Texas metro discovery node, connecting Dallas, Fort Worth and major Metroplex communities while preserving their separate city and county identities. The metro page gives readers a regional layer for relocation, travel, transportation and nearby-place discovery without treating Dallas County, Tarrant County or surrounding communities as a single local jurisdiction.',
    officialUrl: 'https://www.nctcog.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'north-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:dallas' }, { type: 'has-core-city', targetId: 'city:fort-worth' }, { type: 'regional-county', targetId: 'county:dallas' }, { type: 'regional-county', targetId: 'county:tarrant' }, { type: 'located-in-region', targetId: 'region:north-texas' }],
    tags: ['metro', 'metroplex', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'greater-austin': {
    description: 'Greater Austin is TexasDefined’s Central Texas metro discovery node, connecting Austin with Travis County and surrounding communities for relocation, commuting, transportation, travel and nearby-destination discovery. It creates a metro-scale authority layer while keeping city services, county services and fast-growing neighboring communities attached to their own canonical local pages.',
    officialUrl: 'https://www.campotexas.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'central-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:austin' }, { type: 'regional-county', targetId: 'county:travis' }, { type: 'located-in-region', targetId: 'region:central-texas' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'greater-san-antonio': {
    description: 'Greater San Antonio is TexasDefined’s metro-level discovery node for San Antonio and the surrounding South Texas region, linking the core city with Bexar County, regional transportation, relocation context and nearby destinations. The metro layer supports broader trip and moving decisions without confusing municipal services with county, regional or state responsibilities.',
    officialUrl: 'https://www.alamoareampo.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'south-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:san-antonio' }, { type: 'regional-county', targetId: 'county:bexar' }, { type: 'located-in-region', targetId: 'region:south-texas' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
};

function relationshipsWithAuthorityRegion(entity: TexasEntityRecord, override: AuthorityOverride) {
  const overrideRelationships = override.relationships ?? [];
  const replacesRegionRelationship = overrideRelationships.some((relationship) => relationship.type === 'located-in-region');
  const merged = replacesRegionRelationship
    ? entity.relationships.filter((relationship) => relationship.type !== 'located-in-region')
    : [...entity.relationships];
  for (const relationship of overrideRelationships) {
    if (!merged.some((item) => item.type === relationship.type && item.targetId === relationship.targetId)) merged.push(relationship);
  }
  return merged;
}

export function enrichCityMetroAuthorityEntity(entity: TexasEntityRecord): TexasEntityRecord {
  const override = entity.kind === 'city' ? CITY_OVERRIDES[entity.slug] : entity.kind === 'metro-area' ? METRO_OVERRIDES[entity.slug] : undefined;
  if (!override) return entity;
  return {
    ...entity,
    ...override,
    aliases: [...new Set([...(entity.aliases ?? []), ...(override.aliases ?? [])])],
    relationships: relationshipsWithAuthorityRegion(entity, override),
    tags: [...new Set([...(entity.tags ?? []), ...(override.tags ?? [])])],
  };
}
