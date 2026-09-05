export type WeddingVenueRegionSlug =
  | 'austin-hill-country'
  | 'dallas-fort-worth'
  | 'houston-gulf-coast'
  | 'san-antonio-south-texas'
  | 'east-west-panhandle';

export type WeddingVenueRegion = {
  slug: WeddingVenueRegionSlug;
  name: string;
  shortLabel: string;
  description: string;
};

export type WeddingVenue = {
  name: string;
  slug: string;
  regionSlug: WeddingVenueRegionSlug;
  regionName: string;
  position: number;
  city?: string;
  countySlug?: string;
  locationStatus: 'county-curated' | 'region-only';
};
