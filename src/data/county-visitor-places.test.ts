import { describe, expect, it } from 'vitest';

import { TEXAS_COUNTIES } from './texas-places';
import { COUNTY_VISITOR_PLACES, countyVisitorPlaces } from './county-visitor-places';

const validCountySlugs = new Set(TEXAS_COUNTIES.map((county) => county.slug));

describe('unranked county visitor places', () => {
  it('only references real Texas counties and individual HTTPS research sources', () => {
    for (const place of COUNTY_VISITOR_PLACES) {
      expect(validCountySlugs.has(place.county), place.name).toBe(true);
      expect(place.name.trim().length, place.county).toBeGreaterThan(3);
      expect(place.description.trim().length, place.name).toBeGreaterThan(24);
      expect(() => new URL(place.sourceUrl), place.name).not.toThrow();
      expect(new URL(place.sourceUrl).protocol, place.name).toBe('https:');
      expect(new URL(place.sourceUrl).hostname, place.name).not.toBe('texasdefined.com');
      // The former Groom cross organization's domain now serves unrelated gambling content.
      expect(new URL(place.sourceUrl).hostname.replace(/^www\./, ''), place.name).not.toBe('crossministries.net');
      if (place.relatedGuideHref) {
        expect(place.relatedGuideHref, place.name).toMatch(/^\/(?!\/)[a-z0-9\-/]+$/);
        expect(place.relatedGuideHref, place.name).not.toBe('/destination/');
      }
    }
  });

  it('has no duplicate places within a county and no site-generated page requirement', () => {
    const keys = COUNTY_VISITOR_PLACES.map((place) => `${place.county}:${place.name.trim().toLowerCase()}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const place of COUNTY_VISITOR_PLACES) {
      expect('rank' in place, place.name).toBe(false);
      expect('destinationSlug' in place, place.name).toBe(false);
    }
  });

  it('does not duplicate dedicated county spotlights or existing museum-guide identities', () => {
    const names = new Set(COUNTY_VISITOR_PLACES.map((p) => p.county + ':' + p.name));
    // First Monday is published in the Van Zandt County spotlight and
    // the Heard wildlife sanctuary is already represented by a museum record.
    expect(names.has('van-zandt:First Monday Trade Days in Canton')).toBe(false);
    expect(names.has('collin:Heard Wildlife Sanctuary Nature Trails')).toBe(false);
  });

  it('shows only county-specific, alphabetically sorted attractions', () => {
    for (const county of TEXAS_COUNTIES) {
      const places = countyVisitorPlaces(county.slug);
      expect(places.every((place) => place.county === county.slug), county.slug).toBe(true);
      expect(places.map((place) => place.name)).toEqual(
        [...places.map((place) => place.name)].sort((a, b) => a.localeCompare(b)),
      );
    }
  });
});
