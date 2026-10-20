import type { TexasCity, TexasCounty } from '@/data/texas-places';

// The shared city registry keeps one editorial/primary county for navigation.
// This relationship layer supplements it with additional counties for cities
// whose municipal or census-place footprint crosses county lines.
// Official boundary references for confirmed additions:
// Abilene: https://www.abilenetx.gov/m/faq
// Corpus Christi: https://www.tdi.texas.gov/rules/2026/documents/59501finalredline.pdf
// Dallas: https://citysecretary2.dallascityhall.com/resolutions/2024/09-25-24/24-1459.pdf
// Fort Worth: https://www.fortworthtexas.gov/files/assets/public/v/1/the-fwlab/documents/planning/comprehensive-planning/adopted/25-intergovernmental-cooperation-final-2023.pdf
// Grand Prairie's Johnson County annexations: 2025 City Planning and Development approvals
// https://www.gptx.org/Departments/Planning-and-Development
// San Antonio also includes a small incorporated-city portion in Medina County
// (U.S. Census Population Estimates Program place-county parts, 2024/2025).
// https://usafacts.org/answers/how-many-people-live-in-the-us/county/medina-county-tx/
// Wichita Falls: the Census 2025 place polygon and Texas Comptroller-verified
// 2026 municipal city boundary both place it in Wichita and Clay, NOT Archer.
// https://feature.geographic.texas.gov/arcgis/rest/services/City_Boundaries/Texas_City_Boundaries/MapServer/0
// A historical attempted annexation into Archer County was annulled by the court.
// https://openjurist.org/526/sw2d/618/city-of-wichita-falls-v-state-ex-rel-vogtsberger
// Mesquite, San Antonio (Comal), Port Arthur:
// https://www.tdi.texas.gov/rules/2026/documents/59501finalredline.pdf
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
  'Grand Prairie': ['Ellis', 'Johnson', 'Tarrant'],
  Houston: ['Fort Bend', 'Montgomery'],
  Katy: ['Fort Bend', 'Waller'],
  'League City': ['Harris'],
  Lewisville: ['Dallas'],
  Longview: ['Harrison'],
  Midland: ['Martin'],
  Mesquite: ['Kaufman'],
  'Missouri City': ['Harris'],
  'New Braunfels': ['Guadalupe'],
  Odessa: ['Midland'],
  Pearland: ['Fort Bend', 'Harris'],
  Plano: ['Denton'],
  'Port Arthur': ['Orange'],
  Richardson: ['Collin'],
  'Round Rock': ['Travis'],
  'San Antonio': ['Comal', 'Medina'],
  'San Marcos': ['Caldwell', 'Guadalupe'],
  'The Woodlands': ['Harris'],
  'Wichita Falls': ['Clay'],
};

// The Woodlands is an unincorporated Census-designated place, not a city.
const CENSUS_DESIGNATED_PLACES = new Set(['The Woodlands']);

export type CityCountyRelationship = {
  city: TexasCity;
  placeType: 'incorporated_city' | 'census_designated_place';
  primaryCounty: TexasCounty | null;
  counties: Array<{ name: string; county: TexasCounty | null }>;
};

export function buildCityCountyRelationships(cities: TexasCity[], counties: TexasCounty[]): CityCountyRelationship[] {
  const countyByName = new Map(counties.map((county) => [county.name.replace(/ County$/, ''), county] as const));
  return cities.map((city) => {
    const countyNames = [city.county, ...(ADDITIONAL_COUNTIES_BY_CITY[city.name] ?? [])];
    return {
      city,
      placeType: CENSUS_DESIGNATED_PLACES.has(city.name) ? 'census_designated_place' : 'incorporated_city',
      primaryCounty: countyByName.get(city.county) ?? null,
      counties: countyNames.map((name) => ({ name, county: countyByName.get(name) ?? null })),
    };
  });
}
