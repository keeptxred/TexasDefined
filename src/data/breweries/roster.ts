import snapshot from './texas-breweries.generated.json';

export type TexasBrewery = {
  licenseId: string;
  slug: string;
  name: string;
  city: string;
  county: string;
  address: string;
  zip: string;
  phone: string;
  licenseStatus: string;
  licenseType: 'BW' | 'BP';
  expirationDate: string;
};

export const texasBrewerySnapshot = snapshot as {
  source: string;
  sourceUrl: string;
  fetchedAt: string | null;
  breweries: TexasBrewery[];
};

export const texasBreweries = texasBrewerySnapshot.breweries;
export const texasBreweryBySlug = new Map(texasBreweries.map((item) => [item.slug, item]));

export const breweryFieldGuides = [
  { name: 'K. Spoetzl Brewery / Shiner', city: 'Shiner', county: 'Lavaca', href: '/destination/spoetzl-brewery', summary: 'Historic production brewery, touring experience and a Shiner-area trip-planning anchor.' },
  { name: 'Real Ale Brewing Company', city: 'Blanco', county: 'Blanco', href: '/destination/real-ale-brewing-company-blanco', summary: 'Hill Country brewery visit guide with its published taproom and tour information.' },
  { name: 'Pecan Street Brewing', city: 'Johnson City', county: 'Blanco', href: '/destination/pecan-street-brewing-johnson-city', summary: 'Downtown brewpub, food, local events and Johnson City itinerary context.' },
] as const;

const clean = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export function breweryDestinationHref(brewery: TexasBrewery): string | null {
  const name = clean(brewery.name);
  const city = clean(brewery.city);
  if (city === 'shiner' && (name.includes('spoetzl') || name.includes('shiner'))) return '/destination/spoetzl-brewery';
  if (city === 'blanco' && name.includes('real ale')) return '/destination/real-ale-brewing-company-blanco';
  if (city === 'johnson city' && name.includes('pecan street')) return '/destination/pecan-street-brewing-johnson-city';
  return null;
}

export function breweryCountySlug(county: string) {
  return county.toLowerCase().replace(/\s+county$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
