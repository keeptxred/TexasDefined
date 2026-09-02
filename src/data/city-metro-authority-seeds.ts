import type { TexasEntityRecord } from './knowledge-graph/types';
import { enrichCityMetroAuthorityEntity } from './city-metro-authority';

const metroSeeds: TexasEntityRecord[] = [
  {
    id: 'metro-area:greater-houston', kind: 'metro-area', name: 'Greater Houston', slug: 'greater-houston',
    aliases: ['Houston metro', 'Houston metropolitan area'], region: 'gulf-coast', sourceId: 'texas-metro-planning',
    sourceConfidence: 'official', sourceCheckedAt: '2026-09-01', status: 'pending-source-verification',
    relationships: [{ type: 'has-core-city', targetId: 'city:houston' }, { type: 'located-in-region', targetId: 'region:gulf-coast' }],
  },
  {
    id: 'metro-area:dallas-fort-worth', kind: 'metro-area', name: 'Dallas–Fort Worth', slug: 'dallas-fort-worth',
    aliases: ['DFW', 'Dallas Fort Worth metroplex', 'Dallas–Fort Worth metroplex'], region: 'north-texas', sourceId: 'texas-metro-planning',
    sourceConfidence: 'official', sourceCheckedAt: '2026-09-01', status: 'pending-source-verification',
    relationships: [{ type: 'has-core-city', targetId: 'city:dallas' }, { type: 'has-core-city', targetId: 'city:fort-worth' }, { type: 'located-in-region', targetId: 'region:north-texas' }],
  },
  {
    id: 'metro-area:greater-austin', kind: 'metro-area', name: 'Greater Austin', slug: 'greater-austin',
    aliases: ['Austin metro', 'Austin metropolitan area'], region: 'central-texas', sourceId: 'texas-metro-planning',
    sourceConfidence: 'official', sourceCheckedAt: '2026-09-01', status: 'pending-source-verification',
    relationships: [{ type: 'has-core-city', targetId: 'city:austin' }, { type: 'located-in-region', targetId: 'region:central-texas' }],
  },
  {
    id: 'metro-area:greater-san-antonio', kind: 'metro-area', name: 'Greater San Antonio', slug: 'greater-san-antonio',
    aliases: ['San Antonio metro', 'San Antonio metropolitan area'], region: 'south-texas', sourceId: 'texas-metro-planning',
    sourceConfidence: 'official', sourceCheckedAt: '2026-09-01', status: 'pending-source-verification',
    relationships: [{ type: 'has-core-city', targetId: 'city:san-antonio' }, { type: 'located-in-region', targetId: 'region:south-texas' }],
  },
];

export function cityMetroAuthoritySeedEntities() {
  return metroSeeds.map(enrichCityMetroAuthorityEntity);
}

export function findCityMetroAuthoritySeed(value: string) {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const seed = metroSeeds.find((entity) => entity.id === value || entity.slug === normalized || entity.aliases.some((alias) => alias.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === normalized));
  return seed ? enrichCityMetroAuthorityEntity(seed) : undefined;
}

export { enrichCityMetroAuthorityEntity };
