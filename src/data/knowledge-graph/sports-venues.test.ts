import { describe, expect, it } from 'vitest';

import { CURATED_KNOWLEDGE_GRAPH_SEED } from '@/data/knowledge-graph/seed';
import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from '@/data/knowledge-graph/sports-venues-tier2';

const sportsVenues = CURATED_KNOWLEDGE_GRAPH_SEED.filter((entity) => entity.kind === 'sports-venue');

describe('Texas sports venue coverage', () => {
  it('keeps the statewide major sports-tourism inventory substantial', () => {
    expect(sportsVenues.length).toBeGreaterThanOrEqual(80);
    expect(new Set(sportsVenues.map((venue) => venue.id)).size).toBe(sportsVenues.length);
    expect(new Set(sportsVenues.map((venue) => venue.slug)).size).toBe(sportsVenues.length);
  });

  it('preserves the second-tier tourism expansion', () => {
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES).toHaveLength(29);
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES.filter((venue) => venue.tags?.includes('golf')).length).toBeGreaterThanOrEqual(4);
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES.filter((venue) => venue.tags?.includes('high-school')).length).toBeGreaterThanOrEqual(7);
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES.filter((venue) => venue.tags?.includes('college-baseball')).length).toBeGreaterThanOrEqual(5);
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES.filter((venue) => venue.tags?.includes('motorsports')).length).toBeGreaterThanOrEqual(4);
    expect(TEXAS_SPORTS_VENUE_TIER2_ENTITIES.filter((venue) => venue.tags?.includes('equestrian')).length).toBeGreaterThanOrEqual(4);
  });

  it('keeps venue pages eligible for the site quality gate', () => {
    for (const venue of sportsVenues) {
      expect(venue.status).toBe('active');
      expect(venue.sourceConfidence).toBe('official');
      expect(venue.sourceCheckedAt).toBeTruthy();
      expect(venue.officialUrl?.startsWith('https://')).toBe(true);
      expect(venue.description?.trim().length ?? 0).toBeGreaterThanOrEqual(180);
      expect(venue.countySlug).toBeTruthy();
      expect(venue.region).toBeTruthy();
      expect(venue.relationships.length).toBeGreaterThan(0);
      expect(venue.tags?.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  });

  it('retains representative destination anchors in every major sports-travel category', () => {
    const ids = new Set(sportsVenues.map((venue) => venue.id));
    expect(ids).toContain('sports-venue:att-stadium');
    expect(ids).toContain('sports-venue:circuit-of-the-americas');
    expect(ids).toContain('sports-venue:texas-motor-speedway');
    expect(ids).toContain('sports-venue:pga-frisco-fields-ranch');
    expect(ids).toContain('sports-venue:eagle-stadium-allen');
    expect(ids).toContain('sports-venue:kyle-field');
    expect(ids).toContain('sports-venue:will-rogers-memorial-center');
    expect(ids).toContain('sports-venue:national-shooting-complex');
  });
});
