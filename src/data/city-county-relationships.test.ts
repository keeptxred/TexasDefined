import { describe, expect, it } from 'vitest';
import { buildCityCountyRelationships } from './city-county-relationships';
import { TEXAS_CITIES, TEXAS_COUNTIES } from './texas-places';

const relationships = buildCityCountyRelationships(TEXAS_CITIES, TEXAS_COUNTIES);
const byCity = new Map(relationships.map((relationship) => [relationship.city.name, relationship]));

describe('city-to-county relationship reference', () => {
  it.each([
    ['Abilene', ['Taylor', 'Jones']],
    ['Corpus Christi', ['Nueces', 'Aransas', 'Kleberg', 'San Patricio']],
    ['Dallas', ['Dallas', 'Collin', 'Denton', 'Kaufman', 'Rockwall']],
    ['Fort Worth', ['Tarrant', 'Denton', 'Johnson', 'Parker', 'Wise']],
    ['Houston', ['Harris', 'Fort Bend', 'Montgomery']],
    ['Katy', ['Harris', 'Fort Bend', 'Waller']],
    ['Austin', ['Travis', 'Hays', 'Williamson']],
    ['Pearland', ['Brazoria', 'Fort Bend', 'Harris']],
    ['Frisco', ['Collin', 'Denton']],
    ['Plano', ['Collin', 'Denton']],
    ['San Marcos', ['Hays', 'Caldwell', 'Guadalupe']],
    ['New Braunfels', ['Comal', 'Guadalupe']],
    ['Mesquite', ['Dallas', 'Kaufman']],
    ['San Antonio', ['Bexar', 'Comal']],
    ['Grand Prairie', ['Dallas', 'Ellis', 'Tarrant']],
    ['The Woodlands', ['Montgomery', 'Harris']],
  ])('%s resolves every documented county', (name, expected) => {
    expect(byCity.get(name)?.counties.map(({ name }) => name)).toEqual(expected);
  });

  it('identifies the unincorporated Woodlands CDP separately from cities', () => {
    expect(byCity.get('The Woodlands')?.placeType).toBe('census_designated_place');
    expect(byCity.get('Houston')?.placeType).toBe('incorporated_city');
  });

  it('does not duplicate counties or include unresolved registry names', () => {
    expect(relationships).toHaveLength(TEXAS_CITIES.length);
    for (const { city, counties, primaryCounty } of relationships) {
      expect(primaryCounty, `Primary county for ${city.name}`).not.toBeNull();
      expect(counties.length).toBeGreaterThan(0);
      expect(new Set(counties.map(({ name }) => name)).size).toBe(counties.length);
      expect(counties.every(({ county }) => Boolean(county)), `Unmatched county for ${city.name}`).toBe(true);
    }
  });
});
