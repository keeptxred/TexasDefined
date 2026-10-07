import type { TexasEntityRecord } from './knowledge-graph/types';

const checkedAt = '2026-09-01';
const wave2CheckedAt = '2026-09-02';
const wave3CheckedAt = '2026-09-19';

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
    'Houston is a Gulf Coast metropolis shaped by bayous, the Houston Ship Channel, energy, medicine, aerospace, international trade and one of the country’s most diverse food and cultural landscapes. Downtown, the Museum District, the Texas Medical Center, neighborhoods inside the Loop and far-reaching suburban corridors make Houston a collection of distinct activity centers rather than a single compact core; local taxes, schools, flood exposure, utilities and services still depend on the exact address.',
    'https://www.houstontx.gov/', 'gulf-coast', 'metro-area:greater-houston', ['major-city', 'metro-core', 'airports', 'energy', 'port-logistics', 'aerospace'],
  ),
  dallas: city(
    'Dallas is a North Texas city built around a major corporate and transportation center, with downtown and the Arts District, established neighborhoods, large employment corridors, professional sports nearby and regional connections across the wider Metroplex. The useful way to plan Dallas is to distinguish the city from the rest of Dallas–Fort Worth and then verify the exact county, school district, tax jurisdiction, transit access and commute tied to an address.',
    'https://dallascityhall.com/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metro-core', 'airports', 'finance', 'professional-services', 'technology'],
  ),
  'fort-worth': city(
    'Fort Worth is the western anchor of Dallas–Fort Worth, pairing Stockyards cattle and rail history with a nationally significant Cultural District, downtown and Sundance Square, major aviation and defense employment, the Trinity River and a fast-growing urban footprint. Tarrant County is the city’s primary county context, but Fort Worth’s incorporated limits also extend into Denton, Parker, Johnson and Wise counties, so taxes, schools, records and services must be verified by exact address.',
    'https://www.fortworthtexas.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metro-core', 'airports', 'aviation', 'aerospace', 'manufacturing', 'logistics'],
    [
      { type: 'jurisdiction-overlap', targetId: 'county:tarrant' },
      { type: 'jurisdiction-overlap', targetId: 'county:denton' },
      { type: 'jurisdiction-overlap', targetId: 'county:parker' },
      { type: 'jurisdiction-overlap', targetId: 'county:johnson' },
      { type: 'jurisdiction-overlap', targetId: 'county:wise' },
    ],
  ),
  austin: city(
    'Austin is the Texas capital on the Colorado River, where state government, the University of Texas, technology and semiconductor employers, live music and outdoor recreation meet at the eastern edge of the Hill Country. Downtown is only one part of the city: neighborhoods, employment centers and fast-growing suburban corridors spread across Central Texas, making commute, school, utility and tax questions dependent on the exact address.',
    'https://www.austintexas.gov/', 'central-texas', 'metro-area:greater-austin', ['major-city', 'state-capital', 'metro-core', 'airport', 'technology', 'semiconductors', 'government', 'higher-education'],
  ),
  'san-antonio': city(
    'San Antonio is a South Texas city whose identity spans the Alamo and Spanish colonial missions, the River Walk, Tejano culture, military installations, major health-care and cybersecurity employers and a large network of distinct neighborhoods. Visitors can build a history-and-food trip around the urban core, while residents and movers need address-level checks for schools, taxes, utilities and rapidly changing outer growth corridors.',
    'https://www.sa.gov/', 'south-texas', 'metro-area:greater-san-antonio', ['major-city', 'metro-core', 'airport', 'texas-history', 'military', 'cybersecurity', 'tourism'],
  ),
  'el-paso': city(
    'El Paso is a Far West Texas border city framed by the Franklin Mountains, the Rio Grande and a binational relationship with Ciudad Juárez. Its geography shapes nearly everything: neighborhoods stretch along mountain passes and east-west corridors, Fort Bliss is a major presence, desert recreation sits close to the city and the Mountain Time setting distinguishes El Paso from most of Texas; practical services still depend on the exact address and jurisdiction.',
    'https://www.elpasotexas.gov/', 'west-texas', 'metro-area:el-paso-metro', ['major-city', 'border', 'international-trade', 'airport', 'military', 'desert'],
  ),
  arlington: city(
    'Arlington sits between Dallas and Fort Worth and is one of the Metroplex’s major sports and entertainment centers, anchored by AT&T Stadium, Globe Life Field, Six Flags Over Texas and the University of Texas at Arlington. It is its own city rather than a Dallas or Fort Worth district, and planning works best when visitors account for event traffic and residents verify address-level schools, utilities, taxes and transportation options.',
    'https://www.arlingtontx.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'sports', 'entertainment', 'metroplex', 'tourism'],
  ),
  hurst: {
    ...city(
      'Hurst is a compact Mid-Cities community in Tarrant County between Fort Worth, Arlington and the DFW Airport corridor. Its practical strengths are regional access, established neighborhoods, parks and recreation, nearby employment and shopping, plus Trinity Railway Express access at Bell Station; school-district boundaries, utilities and property-tax jurisdictions should still be checked for the exact address.',
      'https://www.hursttx.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['mid-cities', 'metroplex', 'family-recreation', 'regional-rail', 'suburban'],
    ),
    sourceCheckedAt: wave3CheckedAt,
  },
  'corpus-christi': city(
    'Corpus Christi is a Coastal Bend city on Corpus Christi Bay where port activity, energy, the Gulf Coast, beaches, fishing, naval aviation and family attractions all shape daily life and travel. Downtown, North Beach, Padre Island access and inland neighborhoods create very different trip and housing contexts, while storm exposure, school districts, utilities and taxes need to be checked at the address level.',
    'https://www.corpuschristitx.gov/', 'gulf-coast', 'metro-area:corpus-christi-metro', ['major-city', 'coast', 'beaches', 'port', 'energy', 'tourism', 'fishing'],
  ),
  plano: city(
    'Plano is a major North Texas employment and residential center north of Dallas, with corporate campuses, established neighborhoods, parks and trails, DART connections and dense mixed-use districts such as Legacy. Most of Plano is in Collin County and part extends into Denton County, so property taxes, appraisal records, schools and other local systems should be verified against the exact address rather than the city name alone.',
    'https://www.plano.gov/', 'north-texas', 'metro-area:dallas-fort-worth', ['major-city', 'metroplex', 'corporate-employment', 'technology', 'suburban'],
  ),
  lubbock: city(
    'Lubbock is the South Plains’ primary urban hub, shaped by Texas Tech University, health care, agriculture, cotton, music history and a regional role that reaches far beyond the city limits. The broad street grid and surrounding plains make travel patterns different from Texas’s larger metros, while schools, utilities, property taxes and other household decisions still require address-level verification.',
    'https://www.mylubbock.us/', 'south-plains', 'metro-area:lubbock-metro', ['major-city', 'south-plains', 'higher-education', 'agriculture', 'health-care', 'regional-hub'],
  ),
};

const METRO_OVERRIDES: Record<string, AuthorityOverride> = {
  'greater-houston': {
    description: 'Greater Houston connects the core city with Harris County, Gulf Coast communities, regional transportation and practical relocation and travel planning. Use the metro view to understand nearby destinations and county resources without treating distinct local jurisdictions as one city.',
    officialUrl: 'https://www.h-gac.com/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'gulf-coast',
    relationships: [{ type: 'has-core-city', targetId: 'city:houston' }, { type: 'regional-county', targetId: 'county:harris' }, { type: 'located-in-region', targetId: 'region:gulf-coast' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'dallas-fort-worth': {
    description: 'Dallas–Fort Worth connects Dallas, Fort Worth and major Metroplex communities while preserving their separate city and county identities. The metro view helps with relocation, travel, transportation and nearby-place planning without treating Dallas County, Tarrant County or surrounding communities as a single local jurisdiction.',
    officialUrl: 'https://www.nctcog.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'north-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:dallas' }, { type: 'has-core-city', targetId: 'city:fort-worth' }, { type: 'regional-county', targetId: 'county:dallas' }, { type: 'regional-county', targetId: 'county:tarrant' }, { type: 'located-in-region', targetId: 'region:north-texas' }],
    tags: ['metro', 'metroplex', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'greater-austin': {
    description: 'Greater Austin connects Austin with Travis County and surrounding communities for relocation, commuting, transportation, travel and nearby-destination planning. The metro view provides regional context while keeping city services, county services and fast-growing neighboring communities distinct.',
    officialUrl: 'https://www.campotexas.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'central-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:austin' }, { type: 'regional-county', targetId: 'county:travis' }, { type: 'located-in-region', targetId: 'region:central-texas' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'greater-san-antonio': {
    description: 'Greater San Antonio links the core city with Bexar County, regional transportation, relocation context and nearby destinations. The metro view supports broader trip and moving decisions without confusing municipal services with county, regional or state responsibilities.',
    officialUrl: 'https://www.alamoareampo.org/', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', region: 'south-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:san-antonio' }, { type: 'regional-county', targetId: 'county:bexar' }, { type: 'located-in-region', targetId: 'region:south-texas' }],
    tags: ['metro', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'el-paso-metro': {
    description: 'The El Paso Metropolitan Area connects the core city with El Paso County, border-region mobility, relocation research, travel planning and nearby places across Far West Texas. It also keeps municipal and county services distinct from the broader cross-jurisdictional planning role of the El Paso Metropolitan Planning Organization.',
    officialUrl: 'https://www.elpasompo.org/', sourceConfidence: 'official', sourceCheckedAt: wave2CheckedAt, status: 'active', region: 'west-texas',
    relationships: [{ type: 'has-core-city', targetId: 'city:el-paso' }, { type: 'regional-county', targetId: 'county:el-paso' }, { type: 'located-in-region', targetId: 'region:west-texas' }],
    tags: ['metro', 'border-region', 'relocation', 'travel', 'regional-discovery', 'transportation'],
  },
  'corpus-christi-metro': {
    description: 'The Corpus Christi Metropolitan Area links the core city with Nueces County, Gulf Coast mobility, relocation context, travel planning and nearby coastal destinations. It preserves the distinction between city government, county government and the federally designated regional transportation-planning role of the Corpus Christi MPO.',
    officialUrl: 'https://www.corpuschristi-mpo.org/', sourceConfidence: 'official', sourceCheckedAt: wave2CheckedAt, status: 'active', region: 'gulf-coast',
    relationships: [{ type: 'has-core-city', targetId: 'city:corpus-christi' }, { type: 'regional-county', targetId: 'county:nueces' }, { type: 'located-in-region', targetId: 'region:gulf-coast' }],
    tags: ['metro', 'coastal-bend', 'relocation', 'travel', 'regional-discovery', 'transportation', 'coast'],
  },
  'lubbock-metro': {
    description: 'The Lubbock Metropolitan Area connects the core city with Lubbock County, commuting and mobility context, relocation research, regional travel and nearby places across the South Plains. It keeps municipal and county responsibilities distinct from the Lubbock Metropolitan Planning Organization’s regional planning and transportation-funding role.',
    officialUrl: 'https://www.mylubbock.us/503/Lubbock-Metropolitan-Planning-Organizati', sourceConfidence: 'official', sourceCheckedAt: wave2CheckedAt, status: 'active', region: 'south-plains',
    relationships: [{ type: 'has-core-city', targetId: 'city:lubbock' }, { type: 'regional-county', targetId: 'county:lubbock' }, { type: 'located-in-region', targetId: 'region:south-plains' }],
    tags: ['metro', 'south-plains', 'relocation', 'travel', 'regional-discovery', 'transportation'],
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
