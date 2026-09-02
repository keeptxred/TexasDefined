import type { TexasEntityRecord } from './types';

const checkedAt = '2026-09-02';
const managedByTpwd = [{ type: 'managed-by', targetId: 'agency:texas-parks-wildlife' }];

export const TEXAS_WILDLIFE_SPECIES: TexasEntityRecord[] = [
  {
    id: 'wildlife-species:white-tailed-deer', kind: 'wildlife-species', name: 'White-tailed Deer in Texas', slug: 'white-tailed-deer',
    aliases: ['White-tailed deer', 'Whitetail deer', 'Odocoileus virginianus'],
    description: 'White-tailed deer are widespread across Texas and occupy habitats ranging from brush country and oak-juniper landscapes to forests, prairies and agricultural edges. Texas Parks and Wildlife Department manages the species through habitat, population and harvest programs; current hunting rules should always be checked directly with TPWD because county regulations can change.',
    region: 'statewide', officialUrl: 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'deer', 'habitat', 'game-animal', 'outdoors'],
  },
  {
    id: 'wildlife-species:mule-deer', kind: 'wildlife-species', name: 'Mule Deer in Texas', slug: 'mule-deer', aliases: ['Mule deer', 'Odocoileus hemionus'],
    description: 'Mule deer are a characteristic big-game species of western and northwestern Texas, with important populations in the Trans-Pecos and portions of the Panhandle and Rolling Plains. Their large ears, black-tipped tail and branching antlers distinguish them from white-tailed deer. TPWD habitat and hunting resources are the authoritative place to confirm current distribution and regulations.',
    region: 'west-texas', officialUrl: 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/mule-deer', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'deer', 'trans-pecos', 'panhandle', 'game-animal'],
  },
  {
    id: 'wildlife-species:javelina', kind: 'wildlife-species', name: 'Javelina in Texas', slug: 'javelina', aliases: ['Javelina', 'Collared peccary', 'Pecari tajacu'],
    description: 'Javelina, or collared peccaries, are native wildlife of the drier parts of Texas and are especially associated with South Texas brush country, the Trans-Pecos and portions of the Edwards Plateau. They travel in family groups and feed on desert and brush-country foods including prickly pear and other plants. TPWD provides the authoritative Texas habitat and hunting guidance for the species.',
    region: 'south-and-west-texas', officialUrl: 'https://tpwd.texas.gov/landwater/land/habitats/trans_pecos/big_game/javelina/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'peccary', 'south-texas', 'trans-pecos', 'brush-country'],
  },
  {
    id: 'wildlife-species:american-alligator', kind: 'wildlife-species', name: 'American Alligator in Texas', slug: 'american-alligator', aliases: ['American alligator', 'Alligator mississippiensis', 'Texas alligator'],
    description: 'American alligators occur in and near swamps, rivers, bayous, marshes and other waters across eastern Texas and the Gulf Coast, including freshwater and some brackish habitats. The species recovered after historic protections and remains closely managed in Texas. Visitors should keep a safe distance and use current TPWD guidance for encounters and any regulated activity.',
    region: 'east-texas-and-gulf-coast', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/americanalligator/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'reptiles', 'wetlands', 'rivers', 'gulf-coast', 'east-texas'],
  },
  {
    id: 'wildlife-species:ocelot', kind: 'wildlife-species', name: 'Ocelot in Texas', slug: 'ocelot', aliases: ['Ocelot', 'Leopardus pardalis', 'Texas ocelot'],
    description: 'Ocelots are endangered wild cats whose remaining Texas habitat is concentrated in dense thornscrub of South Texas and the Lower Rio Grande Valley. Their survival depends heavily on conserving and reconnecting thick brush habitat. Because the Texas population is exceptionally limited, distribution claims should stay conservative and tied to current TPWD and U.S. Fish and Wildlife Service information.',
    region: 'lower-rio-grande-valley', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/ocelot/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'wild-cats', 'endangered-species', 'south-texas', 'lower-rio-grande-valley'],
  },
  {
    id: 'wildlife-species:whooping-crane', kind: 'wildlife-species', name: 'Whooping Crane in Texas', slug: 'whooping-crane', aliases: ['Whooping crane', 'Grus americana'],
    description: 'Whooping cranes are endangered migratory birds that winter on the Texas coast, with the Aransas area forming the core wintering landscape for the historic wild population. They migrate between northern breeding grounds and Texas coastal wetlands. Wildlife watchers should observe from appropriate distances and rely on TPWD and U.S. Fish and Wildlife Service updates for current conservation and viewing guidance.',
    region: 'texas-gulf-coast', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/whooper/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'seasonal', relationships: managedByTpwd,
    tags: ['wildlife', 'birds', 'birding', 'migration', 'endangered-species', 'gulf-coast', 'aransas'],
  },
  {
    id: 'wildlife-species:painted-bunting', kind: 'wildlife-species', name: 'Painted Bunting in Texas', slug: 'painted-bunting', aliases: ['Painted bunting', 'Passerina ciris'],
    description: 'Painted buntings are colorful migratory songbirds found in many parts of Texas during the warmer months. They favor dense understory, brush, stream edges and similar cover, and males may briefly perch in exposed spots to sing. Their seasonal presence makes them a popular Texas birding target, especially where healthy brush and edge habitat is preserved.',
    region: 'statewide-seasonal', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/paintedbunting/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'seasonal', relationships: managedByTpwd,
    tags: ['wildlife', 'birds', 'birding', 'songbirds', 'migration', 'brush-habitat'],
  },
  {
    id: 'wildlife-species:roseate-spoonbill', kind: 'wildlife-species', name: 'Roseate Spoonbill in Texas', slug: 'roseate-spoonbill', aliases: ['Roseate spoonbill', 'Platalea ajaja', 'Spoonbill'],
    description: 'Roseate spoonbills are distinctive pink wading birds associated with bays, marshes and estuaries along the Texas Gulf Coast. They feed by sweeping their spoon-shaped bills through shallow water for small aquatic prey. Coastal wetlands and rookery habitat make the species an important part of Texas birding and wildlife-viewing trips.',
    region: 'texas-gulf-coast', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/spoonbill/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'birds', 'birding', 'wading-birds', 'wetlands', 'gulf-coast'],
  },
  {
    id: 'wildlife-species:bobcat', kind: 'wildlife-species', name: 'Bobcat in Texas', slug: 'bobcat', aliases: ['Bobcat', 'Lynx rufus'],
    description: 'Bobcats are adaptable native wild cats distributed across Texas. They use habitats ranging from rocky canyons and outcrops to thickets and other areas with secure cover, and they feed primarily on small mammals and birds. Their secretive behavior makes sightings uncommon even where they are present, so Texas distribution and natural-history claims are best grounded in TPWD species information.',
    region: 'statewide', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/bobcat/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'wild-cats', 'predators', 'habitat', 'outdoors'],
  },
  {
    id: 'wildlife-species:nine-banded-armadillo', kind: 'wildlife-species', name: 'Nine-banded Armadillo in Texas', slug: 'nine-banded-armadillo', aliases: ['Nine-banded armadillo', 'Armadillo', 'Dasypus novemcinctus'],
    description: 'The nine-banded armadillo is a familiar Texas mammal and the state small mammal. It is a prolific digger that feeds heavily on insects and other invertebrates and uses burrows for shelter. TPWD reports the species across most of Texas outside the far western Trans-Pecos, with distribution influenced in part by soils that are suitable for digging.',
    region: 'most-of-texas', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/dillo/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'armadillo', 'state-symbol', 'insectivore', 'outdoors'],
  },
  {
    id: 'wildlife-species:black-bear', kind: 'wildlife-species', name: 'Black Bear in Texas', slug: 'black-bear', aliases: ['Black bear', 'American black bear', 'Ursus americanus'],
    description: 'Black bears are returning to parts of Texas, but a sighting does not by itself establish a local population. TPWD identifies the resident breeding population in the Trans-Pecos and in Val Verde and Crockett counties, while dispersing bears may appear elsewhere. Black bears are state-threatened and protected in Texas, so sightings and safety questions should be checked against current TPWD guidance.',
    region: 'west-texas', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/index.phtml?o=blackbear', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'bears', 'threatened-species', 'trans-pecos', 'west-texas', 'bear-safety'],
  },
  {
    id: 'wildlife-species:mountain-lion', kind: 'wildlife-species', name: 'Mountain Lion in Texas', slug: 'mountain-lion', aliases: ['Mountain lion', 'Cougar', 'Puma', 'Panther', 'Puma concolor'],
    description: 'Mountain lions are uncommon, secretive native predators most strongly associated in Texas with the Trans-Pecos, South Texas brushlands and portions of the Hill Country. They use remote mountains, canyonlands and other landscapes with adequate cover and prey. Because Texas monitoring and regulations can change, natural-history and legal guidance should be checked against current TPWD resources rather than inferred from old sighting maps.',
    region: 'west-and-south-texas', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/mlion/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'wild-cats', 'predators', 'trans-pecos', 'south-texas', 'hill-country'],
  },
  {
    id: 'wildlife-species:wild-turkey', kind: 'wildlife-species', name: 'Wild Turkey in Texas', slug: 'wild-turkey', aliases: ['Wild turkey', 'Rio Grande turkey', 'Eastern turkey', 'Meleagris gallopavo'],
    description: 'Wild turkeys occupy much of Texas, with Rio Grande turkeys widespread across large parts of South, Central and North Texas and Eastern wild turkeys associated with forested East Texas. Restoration and habitat management helped recover the species after major historic declines. Hunting seasons and county rules are time-sensitive, so this evergreen profile points readers to current TPWD regulations rather than hardcoding dates or limits.',
    region: 'much-of-texas', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/game_management/turkey/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'birds', 'game-birds', 'turkey', 'rio-grande-turkey', 'eastern-turkey', 'hunting', 'birding'],
  },
  {
    id: 'wildlife-species:texas-bats', kind: 'wildlife-species', name: 'Bats in Texas', slug: 'texas-bats', aliases: ['Texas bats', 'Bats', 'Mexican free-tailed bat', 'Brazilian free-tailed bat', 'Tadarida brasiliensis'],
    description: 'Texas supports a diverse bat fauna, and Mexican free-tailed bats are among the state’s most familiar seasonal wildlife spectacles. Many colonies use caves, tunnels and bridges, while other species occupy forests, deserts and buildings. TPWD maintains current bat-watching and conservation guidance, including seasonal viewing information and protections intended to reduce disturbance at important roosts.',
    region: 'statewide', officialUrl: 'https://tpwd.texas.gov/huntwild/wild/species/bats/bat-watching-sites/', sourceId: 'tpwd-wildlife-species', sourceConfidence: 'official', sourceCheckedAt: checkedAt, status: 'active', relationships: managedByTpwd,
    tags: ['wildlife', 'mammals', 'bats', 'bat-watching', 'caves', 'bridges', 'migration', 'mexican-free-tailed-bat'],
  },
];
