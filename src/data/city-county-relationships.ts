import type { TexasCity, TexasCounty } from '@/data/texas-places';

// The shared city registry keeps one editorial/primary county for navigation.
// This relationship layer supplements it with additional counties for cities
// whose municipal or census-place footprint crosses county lines.
const ADDITIONAL_COUNTIES_BY_CITY: Record<string, string[]> = {
  Amarillo: ['Randall'],
  Austin: ['Hays', 'Williamson'],
  Baytown: ['Chambers'],
  Carrollton: ['Collin', 'Denton'],
  Frisco: ['Denton'],
  Garland: ['Collin', 'Rockwall'],
  'Grand Prairie': ['Ellis', 'Tarrant'],
  Houston: ['Fort Bend', 'Montgomery'],
  Katy: ['Fort Bend', 'Waller'],
  'League City': ['Harris'],
  Lewisville: ['Dallas'],
  Longview: ['Harrison'],
  Midland: ['Martin'],
  'Missouri City': ['Harris'],
  'New Braunfels': ['Guadalupe'],
  Odessa: ['Midland'],
  Pearland: ['Fort Bend', 'Harris'],
  Plano: ['Denton'],
  Richardson: ['Collin'],
  'Round Rock': ['Travis'],
  'San Marcos': ['Caldwell', 'Guadalupe'],
  'The Woodlands': ['Harris'],
};

export type CityCountyRelationship = {
  city: TexasCity;
  primaryCounty: TexasCounty | null;
  counties: Array<{ name: string; county: TexasCounty | null }>;
};

export function buildCityCountyRelationships(cities: TexasCity[], counties: TexasCounty[]): CityCountyRelationship[] {
  const countyByName = new Map(counties.map((county) => [county.name.replace(/ County$/, ''), county] as const));
  return cities.map((city) => {
    const countyNames = [city.county, ...(ADDITIONAL_COUNTIES_BY_CITY[city.name] ?? [])];
    return {
      city,
      primaryCounty: countyByName.get(city.county) ?? null,
      counties: countyNames.map((name) => ({ name, county: countyByName.get(name) ?? null })),
    };
  });
}
