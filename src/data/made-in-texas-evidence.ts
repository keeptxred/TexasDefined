export interface MadeInTexasEvidence {
  entryName: string;
  claim: string;
  sourceLabel: string;
  sourceUrl: string;
  checkedAt: string;
}

/** Manufacturer and first-party evidence for the highest-confidence production claims. */
export const MADE_IN_TEXAS_EVIDENCE: MadeInTexasEvidence[] = [
  {
    entryName: 'Blue Bell Creameries',
    claim: 'Blue Bell operates an ice-cream production facility in Brenham, Texas.',
    sourceLabel: 'Blue Bell Creameries',
    sourceUrl: 'https://www.bluebell.com/visit-blue-bell/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Toyota Motor Manufacturing Texas',
    claim: 'Toyota assembles the Tundra and Sequoia at Toyota Motor Manufacturing Texas in San Antonio.',
    sourceLabel: 'Toyota USA Newsroom',
    sourceUrl: 'https://pressroom.toyota.com/facility/toyota-motor-manufacturing-texas/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Peterbilt',
    claim: 'Peterbilt operates its truck manufacturing plant in Denton, Texas.',
    sourceLabel: 'Peterbilt',
    sourceUrl: 'https://www.peterbilt.com/news-and-events/blog/here-for-you-leon-handt-enduring-craftsmanship',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Resistol',
    claim: 'Resistol says straw hat bodies are blocked, lacquered, shaped and finished at its Garland, Texas factory.',
    sourceLabel: 'Resistol',
    sourceUrl: 'https://resistol.com/products/20x-latigo-cowboy-hat',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Spoetzl Brewery / Shiner',
    claim: 'Shiner says its beer is brewed in Shiner, Texas, at the K. Spoetzl Brewery.',
    sourceLabel: 'Shiner / K. Spoetzl Brewery',
    sourceUrl: 'https://shiner.com/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: "Tito's Handmade Vodka",
    claim: "Tito's says its vodka is distilled and bottled in Austin, Texas.",
    sourceLabel: "Tito's Handmade Vodka",
    sourceUrl: 'https://www.titosvodka.com/about',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Saint Arnold Brewing Company',
    claim: 'Saint Arnold says its Houston brewery brews, filters, kegs and bottles its beers on site.',
    sourceLabel: 'Saint Arnold Brewing Company',
    sourceUrl: 'https://www.saintarnold.com/about-us/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Lucchese Bootmaker',
    claim: 'Lucchese says artisan boots are crafted through roughly 150 to 200 steps at its El Paso factory.',
    sourceLabel: 'Lucchese',
    sourceUrl: 'https://www.lucchese.com/blogs/the-last-word/the-story-of-the-twisted-cone-last',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Garrison Brothers Distillery',
    claim: 'Garrison Brothers says every bottle is milled, cooked, distilled, barreled and aged at its distillery in Hye, Texas.',
    sourceLabel: 'Garrison Brothers Distillery',
    sourceUrl: 'https://www.garrisonbros.com/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Real Ale Brewing Company',
    claim: 'Real Ale says its beer and spirits are brewed and distilled in Blanco, Texas.',
    sourceLabel: 'Real Ale Brewing Company',
    sourceUrl: 'https://realalebrewing.com/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'American Hat Company',
    claim: 'American Hat Company says its cowboy hats are made by hand in Bowie, Texas.',
    sourceLabel: 'American Hat Company',
    sourceUrl: 'https://americanhat.net/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Lockheed Martin Aeronautics',
    claim: 'Lockheed Martin says its Fort Worth, Texas manufacturing line produces the F-35.',
    sourceLabel: 'Lockheed Martin',
    sourceUrl: 'https://www.lockheedmartin.com/en-us/who-we-are/business-areas/aeronautics/virtual-site-tours.html',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Altstadt Brewery',
    claim: 'Altstadt identifies its Fredericksburg brewery as the place where its German-style beer is made.',
    sourceLabel: 'Altstadt Brewery',
    sourceUrl: 'https://www.altstadtbeer.com/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Pitts & Spitts',
    claim: 'Pitts & Spitts says its Houston fabrication shop builds smokers and grills with in-house craftsmen.',
    sourceLabel: 'Pitts & Spitts',
    sourceUrl: 'https://pittsandspitts.com/about/',
    checkedAt: '2026-08-19',
  },
];

export function evidenceForMadeInTexasEntry(entryName: string) {
  return MADE_IN_TEXAS_EVIDENCE.find((item) => item.entryName === entryName);
}
