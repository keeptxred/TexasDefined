import type { TexasCity, TexasCounty } from '@/data/texas-places';

// The shared city registry keeps one editorial/primary county for navigation.
// This relationship layer supplements it with additional counties for cities
// whose municipal or census-place footprint crosses county lines.
// Official boundary references for confirmed additions:
// Abilene: https://www.abilenetx.gov/m/faq
// Corpus Christi: https://www.tdi.texas.gov/rules/2026/documents/59501finalredline.pdf
// Dallas: https://citysecretary2.dallascityhall.com/resolutions/2024/09-25-24/24-1459.pdf
// Fort Worth: https://www.fortworthtexas.gov/files/assets/public/v/1/the-fwlab/documents/planning/comprehensive-planning/adopted/25-intergovernmental-cooperation-final-2023.pdf
const ADDITIONAL_COUNTIES_BY_CITY: Record<string, string[]> = {
  Abilene: ['Jones'],
  Amarillo: ['Randall'],
  Austin: ['Hays', 'Williamson'],
  Baytown: ['Chambers'],
  Carrollton: ['Collin', 'Denton'],
  'Corpus Christi': ['Aransas', 'Kleberg', 'San Patricio'],
  Dallas: ['Collin', 'Denton', 'Kaufman', 'Rockwall'],
  'Fort Worth': ['Denton', 'Johnson', 'Parker', 'Wise'],
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
