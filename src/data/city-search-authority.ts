import type { TexasEntityRecord } from './knowledge-graph/types';

const checkedAt = '2026-09-09';

type CitySearchAuthority = {
  description: string;
  officialUrl: string;
  tags: string[];
};

const CITY_SEARCH_AUTHORITY: Record<string, CitySearchAuthority> = {
  edinburg: {
    description: 'Edinburg is the county seat of Hidalgo County and a core Rio Grande Valley city. This TexasDefined city reference connects Edinburg with Hidalgo County, Valley-wide relocation and travel context, property and school research, transportation planning, local government resources, museums and nearby South Texas destinations.',
    officialUrl: 'https://cityofedinburg.com/',
    tags: ['rio-grande-valley', 'county-seat', 'south-texas', 'relocation', 'local-government', 'higher-education', 'museums'],
  },
  mcallen: {
    description: 'McAllen is a core Hidalgo County city in the Rio Grande Valley and an important South Texas center for travel, shopping, health care and cross-border commerce. This TexasDefined city reference connects McAllen with Hidalgo County, Valley-wide relocation and travel context, property and school research, transportation planning, the airport and nearby destinations.',
    officialUrl: 'https://www.mcallen.net/',
    tags: ['rio-grande-valley', 'south-texas', 'relocation', 'airport', 'health-care', 'shopping', 'international-trade'],
  },
};

export function enrichCitySearchAuthority(entity: TexasEntityRecord): TexasEntityRecord {
  if (entity.kind !== 'city') return entity;
  const authority = CITY_SEARCH_AUTHORITY[entity.slug];
  if (!authority) return entity;

  const countyRelationship = entity.countySlug
    ? { type: 'located-in-county', targetId: `county:${entity.countySlug}` }
    : null;
  const relationships = [...entity.relationships];
  if (countyRelationship && !relationships.some((item) => item.type === countyRelationship.type && item.targetId === countyRelationship.targetId)) {
    relationships.push(countyRelationship);
  }

  return {
    ...entity,
    description: authority.description,
    officialUrl: authority.officialUrl,
    sourceConfidence: 'official',
    sourceCheckedAt: checkedAt,
    status: 'active',
    relationships,
    tags: [...new Set([...(entity.tags ?? []), ...authority.tags])],
  };
}

export function citySearchIntentTitle(entity: TexasEntityRecord) {
  const county = entity.countySlug ? `${title(entity.countySlug)} County` : null;
  const region = entity.region ? title(entity.region) : null;
  const context = [county, region].filter(Boolean).join(' & ');
  return `${entity.name}, Texas${context ? `: ${context} Guide` : ' City Guide'}`;
}

export function citySearchSnippetDescription(entity: TexasEntityRecord) {
  const county = entity.countySlug ? `${title(entity.countySlug)} County` : null;
  const region = entity.region ? title(entity.region) : null;
  const location = [county, region].filter(Boolean).join(' and ');
  const locationCopy = location ? ` in ${location}` : '';
  return `Explore ${entity.name}, Texas${locationCopy}: county and region context, official resources, relocation tools, property guidance, schools, transportation planning and nearby places.`;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
