export type TexasContentCluster = {
  id: string;
  title: string;
  hubPath: string;
  section: 'Home & Garden' | 'Outdoors' | 'Explore Texas';
  pillarTitle: string;
  supportingTitles: string[];
  sourceIds: string[];
  crossLinkTargets: string[];
  seasonal?: string[];
};

export const TEXAS_HOME_NATURE_CLUSTERS: TexasContentCluster[] = [
  {
    id: 'hurricane-preparedness', title: 'Texas Hurricane Preparedness', hubPath: '/guides/texas-hurricane-preparedness', section: 'Home & Garden',
    pillarTitle: 'Texas Hurricane Preparedness: The Complete Home Guide',
    supportingTitles: [
      'How to Prepare Your Home for a Hurricane in Texas',
      'Texas Hurricane Preparedness Checklist: 72, 48 and 24 Hours Before Landfall',
      'How to Prepare a Swimming Pool for a Hurricane',
      'What to Do With Patio Furniture, Fences and Outdoor Equipment Before a Hurricane',
      'Generator Safety and Power-Outage Preparation for Texas Homes',
      'What to Check Around Your Home After a Hurricane',
      'Texas Hurricane Supplies: What You Actually Need',
      'How Hurricane Preparation Differs Along the Texas Gulf Coast',
    ],
    sourceIds: ['nws-hurricanes','noaa-hurricanes','tdem-emergency'], crossLinkTargets: ['/texas-weather','/guides','/county'], seasonal: ['May','June','July','August','September','October','November'],
  },
  {
    id: 'texas-pools', title: 'Texas Pool Guide', hubPath: '/guides/texas-pool-guide', section: 'Home & Garden',
    pillarTitle: 'The Complete Texas Swimming Pool Guide',
    supportingTitles: [
      'Do You Need to Close a Pool for Winter in Texas?',
      'How to Winterize a Pool in Texas',
      'How to Protect Pool Equipment During a Texas Freeze',
      'How to Open Your Pool for Summer in Texas',
      'Texas Pool Maintenance Month by Month',
      'How Much Water Does a Texas Pool Lose to Evaporation?',
      'How to Prepare Your Pool for a Hurricane',
      'North Texas vs Houston vs South Texas Pool Winterization',
      'Spring Pool Startup Checklist for Texas Homeowners',
    ],
    sourceIds: ['pool-manufacturers','nws-freeze','texas-water-development-board'], crossLinkTargets: ['/home-garden','/tools','/texas-weather'], seasonal: ['January','February','March','April','May','October','November','December'],
  },
  {
    id: 'texas-pests', title: 'Texas Pests', hubPath: '/guides/texas-pests', section: 'Home & Garden',
    pillarTitle: 'Texas Pests: Identification, Prevention and What to Do',
    supportingTitles: [
      'Fire Ants in Texas', 'Mosquitoes in Texas', 'Termites in Texas', 'Scorpions in Texas', 'Cockroaches in Texas',
      'Ticks in Texas', 'Fleas in Texas', 'Wasps and Hornets in Texas', 'Carpenter Ants in Texas', 'Texas Spiders',
      'Chiggers in Texas', 'Rodents Around Texas Homes', 'Common Invasive Pests in Texas',
    ],
    sourceIds: ['texas-am-agrilife','texas-am-fire-ants','cdc-vector'], crossLinkTargets: ['/home-garden','/county','/texas-wildlife'], seasonal: ['spring','summer','fall'],
  },
  {
    id: 'texas-snakes', title: 'Texas Snakes', hubPath: '/guides/texas-snakes', section: 'Outdoors',
    pillarTitle: 'Texas Snakes: Identification, Safety and What to Do When You See One',
    supportingTitles: [
      'Venomous Snakes of Texas', 'Copperheads in Texas', 'Cottonmouths in Texas', 'Rattlesnakes in Texas', 'Coral Snakes in Texas',
      'Harmless Texas Snakes Commonly Mistaken for Venomous Snakes', 'What to Do When You Encounter a Snake',
      'Snakes Around Pools and Backyards', 'What to Do if Your Dog Encounters a Snake', 'What to Do After a Snakebite',
    ],
    sourceIds: ['tpwd-wildlife','texas-am-agrilife','poison-control'], crossLinkTargets: ['/outdoors','/state-parks','/county'], seasonal: ['spring','summer','fall'],
  },
  {
    id: 'texas-wildlife', title: 'Texas Wildlife', hubPath: '/guides/texas-wildlife', section: 'Outdoors',
    pillarTitle: 'Texas Wildlife: Identification, Habitat and Encounter Safety',
    supportingTitles: [
      'Armadillos in Texas', 'Coyotes in Texas', 'Bobcats in Texas', 'Mountain Lions in Texas', 'Black Bears in Texas',
      'Alligators in Texas', 'Javelinas in Texas', 'Feral Hogs in Texas', 'Deer in Texas', 'Foxes in Texas', 'Bats in Texas',
      'Raccoons in Texas', 'Opossums in Texas', 'Porcupines in Texas', 'Skunks in Texas', 'Nutria in Texas',
      'What to Do When You Encounter Texas Wildlife',
    ],
    sourceIds: ['tpwd-wildlife','usda-wildlife-services'], crossLinkTargets: ['/outdoors','/state-parks','/county','/explore'],
  },
  {
    id: 'texas-birds', title: 'Texas Birds', hubPath: '/guides/texas-birds', section: 'Outdoors',
    pillarTitle: 'Texas Birds: A Guide to the Birds You Are Most Likely to See',
    supportingTitles: [
      '100 Common Texas Birds', 'Backyard Birds of Texas', 'Texas Birds by Region', 'Migratory Birds in Texas', 'Texas Hummingbirds',
      'Birds of Prey in Texas', 'Texas Waterbirds', 'Why Are There So Many Grackles in Texas?', 'Rare and Threatened Texas Birds',
      'Best Birding Destinations in Texas', 'What Bird Is This? A Texas Identification Guide',
    ],
    sourceIds: ['tpwd-wildlife','ebird','usfws-birds'], crossLinkTargets: ['/outdoors','/state-parks','/explore','/county'], seasonal: ['spring','fall'],
  },
  {
    id: 'texas-flowers', title: 'Texas Flowers and Native Plants', hubPath: '/guides/texas-flowers', section: 'Explore Texas',
    pillarTitle: 'Texas Flowers and Wildflowers: What Blooms, Where and When',
    supportingTitles: [
      'Texas Bluebonnets', 'Indian Paintbrush in Texas', 'Evening Primrose in Texas', 'Winecups in Texas', 'Firewheel in Texas',
      'Prickly Pear in Texas', 'Yucca in Texas', 'Texas Sage', 'Best Native Plants for Texas Landscaping',
      'Texas Pollinator Plants', 'Poisonous Plants in Texas', 'Texas Wildflowers by Month', 'Texas Wildflowers by Region',
      'What Is Blooming in Texas Right Now?', 'Best Texas Wildflower Road Trips',
    ],
    sourceIds: ['tpwd-plants','lady-bird-johnson-wildflower-center','usda-plants'], crossLinkTargets: ['/explore','/road-trips','/state-parks','/county'], seasonal: ['spring','summer'],
  },
];

export const TEXAS_HOME_NATURE_ARTICLE_COUNT = TEXAS_HOME_NATURE_CLUSTERS.reduce(
  (total, cluster) => total + 1 + cluster.supportingTitles.length,
  0,
);
