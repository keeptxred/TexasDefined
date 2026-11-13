// Independently sourced Batch018 second cohort; campus county, not postal city or district footprint.
// These edges must be wired in BOTH school and county routes before marking IMPLEMENTED.
export const BATCH018_SECOND_FIVE_COUNTY_EDGES = [
  { slug: 'farwell', name: 'Farwell Steers', county: 'parmer', context: 'Farwell High School at 801 Avenue G, Parmer County; school-announced Nov 13 neutral-site Spearman playoff in Canyon, Farwell designated home team.' },
  { slug: 'ferris', name: 'Ferris Yellowjackets', county: 'ellis', context: 'Ferris High School at 1025 E 8th St, Ellis County; school-listed Tony Castillo and varsity Yellowjacket Stadium calendar.' },
  { slug: 'first-baptist-dallas', name: 'First Baptist Academy Saints', county: 'dallas', context: 'TAPPS private-school Saints at 7898 Samuell Blvd., Dallas County; school-documented 2013 and 2023 TAPPS titles, not a UIL district program.' },
  { slug: 'flatonia', name: 'Flatonia Bulldogs', county: 'fayette', context: 'Flatonia Secondary School at 400 E 4th St, Fayette County; UIL 2026–28 2A Division I District 15 and school Rank One athletics resources.' },
  { slug: 'florence', name: 'Florence Buffaloes', county: 'williamson', context: 'Florence High School at 401 FM 970, Williamson County; UIL 2026–28 3A Division II District 13 and school-listed head coach Quentin Posey.' },
] as const;
