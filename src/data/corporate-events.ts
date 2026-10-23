export type GroupEventCategory = 'team-building' | 'company-parties' | 'private-dining' | 'meetings' | 'outdoor-adventure' | 'client-entertainment';
export type CorporateEventProvider = {
  slug: string;
  name: string;
  city: string;
  area: string;
  categories: GroupEventCategory[];
  description: string;
  format: string;
  maxGroup: number | null;
  minGroup?: number;
  capacityDetail: string;
  startingPricePerPerson: number | null;
  officialUrl: string;
  sourceUrl: string;
  verifiedOn: string;
  ageLimit?: string;
};

export const corporateEventCategories: { value: GroupEventCategory; label: string }[] = [
  { value: 'team-building', label: 'Team building' },
  { value: 'company-parties', label: 'Company parties' },
  { value: 'private-dining', label: 'Private dining' },
  { value: 'meetings', label: 'Meetings & retreats' },
  { value: 'outdoor-adventure', label: 'Outdoor adventures' },
  { value: 'client-entertainment', label: 'Client entertainment' },
];

// Provider-published capacities are not live booking availability.
// This independent editorial directory is not a list of paid partners.
// Do not introduce negotiated discounts until contracts are actually signed.
export const corporateEventProviders: CorporateEventProvider[] = [
  {
    slug: 'beat-the-bomb-houston', name: 'Beat The Bomb Houston', city: 'Houston', area: 'Fifth Ward',
    categories: ['team-building', 'company-parties', 'client-entertainment'],
    description: 'Cooperative game missions and hosted corporate events, with optional food and drink packages.',
    format: 'Indoor games', minGroup: 13, maxGroup: 200,
    capacityDetail: 'Large events up to 150–200 participants; event team coordinates groups of 13+.',
    startingPricePerPerson: null, officialUrl: 'https://www.beatthebomb.com/events',
    sourceUrl: 'https://www.beatthebomb.com/faqs', verifiedOn: '2026-10-23',
  },
  {
    slug: 'the-escape-game-houston', name: 'The Escape Game Houston', city: 'Houston', area: 'CityCentre',
    categories: ['team-building', 'company-parties'],
    description: 'Collaborative escape-room games with group packages and optional facilitation.',
    format: 'Indoor games', minGroup: 8, maxGroup: 60,
    capacityDetail: 'Group team-building packages advertised for 8–60+ guests; games may run in teams.',
    startingPricePerPerson: 40, officialUrl: 'https://theescapegame.com/houston/parties-and-events/',
    sourceUrl: 'https://theescapegame.com/houston/parties-and-events/', verifiedOn: '2026-10-23',
  },
  {
    slug: 'pkl-social', name: 'PKL Social', city: 'Houston', area: 'Washington Avenue / Heights',
    categories: ['team-building', 'company-parties', 'client-entertainment'],
    description: 'Pickleball courts, patio games, food and space for a casual group tournament or company social.',
    format: 'Pickleball & social', maxGroup: 150,
    capacityDetail: 'The Stage: 25–50; Courtside Patio: 50–75; Fieldhouse: up to 150.',
    startingPricePerPerson: null, officialUrl: 'https://pklsocial.com/private-events/',
    sourceUrl: 'https://pklsocial.com/private-events/', verifiedOn: '2026-10-23',
  },
  {
    slug: 'meow-wolf-houston', name: 'Meow Wolf Houston', city: 'Houston', area: 'Fifth Ward',
    categories: ['team-building', 'company-parties', 'client-entertainment'],
    description: 'Immersive art experiences with group rates and private spaces for gatherings.',
    format: 'Immersive arts', maxGroup: 50,
    capacityDetail: 'Cowboix Hevvven event space lists capacity up to 50 guests.',
    startingPricePerPerson: null, officialUrl: 'https://meowwolf.com/visit/houston/private-events',
    sourceUrl: 'https://meowwolf.com/visit/houston/private-events', verifiedOn: '2026-10-23',
  },
  {
    slug: 'trill-on-wheels', name: 'Trill On Wheels', city: 'Houston', area: 'Third Ward',
    categories: ['team-building', 'company-parties'],
    description: 'Hip-hop themed group party-bike experience with simultaneous coordinated bikes.',
    format: 'Group bike tour', minGroup: 16, maxGroup: 54,
    capacityDetail: 'Corporate tours accommodate 16–54 guests across multiple party bikes.',
    startingPricePerPerson: null, ageLimit: '21+', officialUrl: 'https://trillonwheels.com/trill-for-teams/',
    sourceUrl: 'https://trillonwheels.com/trill-for-teams/', verifiedOn: '2026-10-23',
  },
  {
    slug: 'houston-zoo-events', name: 'Houston Zoo', city: 'Houston', area: 'Museum District',
    categories: ['company-parties', 'meetings', 'client-entertainment'],
    description: 'Unusual indoor and outdoor event spaces alongside wildlife exhibits, with customizable company events.',
    format: 'Zoo venue', maxGroup: 60,
    capacityDetail: 'Several spaces seat 60 or more; individual venue capacity and layout vary.',
    startingPricePerPerson: null, officialUrl: 'https://www.houstonzoo.org/host-an-event/corporate-events/',
    sourceUrl: 'https://www.houstonzoo.org/host-an-event/corporate-events/', verifiedOn: '2026-10-23',
  },
  {
    slug: 'geronimo-adventure-park', name: 'Geronimo Adventure Park', city: 'Houston', area: 'Spring / North Houston',
    categories: ['team-building', 'outdoor-adventure', 'company-parties'],
    description: 'Facilitated team challenges, ziplining, axe throwing and outdoor activities for corporate groups.',
    format: 'Outdoor adventure', minGroup: 10, maxGroup: 300,
    capacityDetail: 'Advertises groups from 10 to 300+ guests.',
    startingPricePerPerson: null, officialUrl: 'https://www.geronimoadventurepark.com/groups-and-events',
    sourceUrl: 'https://www.geronimoadventurepark.com/groups-and-events', verifiedOn: '2026-10-23',
  },
  {
    slug: 'le-bistro-lenotre', name: 'Le Bistro at Culinary Institute Lenotre', city: 'Houston', area: 'North Houston',
    categories: ['team-building', 'private-dining', 'company-parties'],
    description: 'Interactive chef-led cooking experiences and private dining for company teams.',
    format: 'Cooking & dining', minGroup: 10, maxGroup: 200,
    capacityDetail: 'Chef-led team-building offered for groups of 10–200; formats vary.',
    startingPricePerPerson: null, officialUrl: 'https://www.lebistro-houston.com/private-corporate-events',
    sourceUrl: 'https://www.lebistro-houston.com/private-corporate-events', verifiedOn: '2026-10-23',
  },
  {
    slug: 'sam-houston-race-park', name: 'Sam Houston Race Park', city: 'Houston', area: 'Northwest Houston',
    categories: ['company-parties', 'meetings', 'client-entertainment'],
    description: 'Flexible meeting, banquet and corporate event spaces with event catering options.',
    format: 'Event venue', maxGroup: 50,
    capacityDetail: 'The Paddock Room seats up to 50; other spaces handle much larger groups.',
    startingPricePerPerson: null, officialUrl: 'https://www.shrp.com/event',
    sourceUrl: 'https://www.shrp.com/event', verifiedOn: '2026-10-23',
  },
  {
    slug: 'mexquite-vintage-park', name: 'Mexquite', city: 'Houston', area: 'Vintage Park',
    categories: ['private-dining', 'company-parties', 'client-entertainment'],
    description: 'Northern Mexican dining and business gatherings in a private-event setting.',
    format: 'Private dining', maxGroup: 50,
    capacityDetail: 'Corporate private events advertised for up to 50 guests.',
    startingPricePerPerson: null, officialUrl: 'https://mexquitegroup.com/corporate-event-venue-houston',
    sourceUrl: 'https://mexquitegroup.com/corporate-event-venue-houston', verifiedOn: '2026-10-23',
  },
  {
    slug: 'palace-social', name: 'Palace Social', city: 'Houston', area: 'Bellaire',
    categories: ['team-building', 'company-parties', 'private-dining'],
    description: 'Bowling, arcade entertainment and a private dining room for group celebrations.',
    format: 'Bowling & arcade', maxGroup: 45,
    capacityDetail: 'Private dining room listed with seating for up to 45; confirm combined entertainment capacity.',
    startingPricePerPerson: null, officialUrl: 'https://palacesocial.com/',
    sourceUrl: 'https://palacesocial.com/', verifiedOn: '2026-10-23',
  },
  {
    slug: 'buffalo-bayou-venue-rentals', name: 'Buffalo Bayou Partnership', city: 'Houston', area: 'Downtown',
    categories: ['company-parties', 'meetings', 'client-entertainment'],
    description: 'Rooftop and indoor venues for receptions and off-sites overlooking Houston waterways.',
    format: 'Event venue', maxGroup: 125,
    capacityDetail: 'Sunset Coffee Building rooftop: 80 seated or 125 standing; other spaces available.',
    startingPricePerPerson: null, officialUrl: 'https://buffalobayou.org/venue-rentals/',
    sourceUrl: 'https://buffalobayou.org/venue-rentals/', verifiedOn: '2026-10-23',
  },
];
