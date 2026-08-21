export type ShopCollectionGuide = {
  intro: string;
  principles: { title: string; text: string }[];
  checklist: string[];
  useItFor: string;
  relatedLinks: { href: string; label: string; description: string }[];
};

const guides: Record<string, ShopCollectionGuide> = {
  'campfire-kitchen': {
    intro: 'Campfire Kitchen is the practical side of Texas outdoor cooking: fewer novelty gadgets, more durable tools that earn a place in a truck box, campsite bin, tailgate setup, or backyard cook station. The collection is built around the way Texans actually cook outside—cast iron that can move from stove to coals, mugs and containers that tolerate being knocked around, simple coffee gear, and kitchen pieces that still make sense when the nearest counter is a picnic table. The point is not to recreate a home kitchen outdoors. It is to carry a small set of equipment that works repeatedly, cleans up without drama, and survives heat, dust, rain, river banks, and long weekends.',
    principles: [
      { title: 'Durability before novelty', text: 'Outdoor cookware and camp accessories should tolerate heat cycles, rough storage, imperfect cleaning, and repeated use. We favor simple materials, replaceable parts, and products that do not depend on a fragile proprietary system.' },
      { title: 'Useful at home too', text: 'The strongest camp-kitchen pieces are not single-purpose camping props. A good skillet, kettle, mug, grinder, towel, or serving tool should work on a porch, at a tailgate, beside a smoker, and in the everyday kitchen.' },
      { title: 'Easy to clean and pack', text: 'A campsite rarely offers unlimited hot water and counter space. Smooth surfaces, straightforward shapes, compact storage, and tools that can be wiped or rinsed quickly matter more than an extra feature that sounds impressive on a product page.' },
      { title: 'Texas conditions count', text: 'Heat, dust, wind, hard water, river sand, and sudden weather are part of outdoor cooking here. Materials and finishes should be selected with those conditions in mind, especially for pieces that live in a vehicle or outdoor storage.' },
    ],
    checklist: [
      'Ask whether the item replaces something you already own or merely duplicates it in a “camping” version.',
      'For cookware, check the heat source you actually use: camp stove, grill grate, charcoal, open coals, induction at home, or a combination.',
      'Favor pieces that nest, stack, hang, or pack without requiring a protective case bigger than the item itself.',
      'If the product touches food or drink, choose materials you understand and cleaning instructions you will realistically follow.',
      'For cast iron, plan for drying and a light protective oil film after washing; rust prevention matters more in humid storage than perfect seasoning aesthetics.'
    ],
    useItFor: 'Use this collection as a starting point for river weekends, state-park camping, deer-lease cooking, tailgates, backyard fires, and anyone building a small outdoor kitchen from scratch. If you are buying for a first trip, start with the few pieces that solve heat, coffee, food handling, and serving before adding specialty gear.',
    relatedLinks: [
      { href: '/best-places-to-go-camping-in-texas', label: 'Best places to go camping in Texas', description: 'Build the trip first, then decide what gear the destination actually requires.' },
      { href: '/explore/state-parks', label: 'Texas state parks', description: 'Compare parks, seasons, reservations, trails, and camping options.' },
      { href: '/article/hill-country-two-lane-loop', label: 'The Two-Lane Loop', description: 'A Texas road-trip story built around the kind of simple gear that belongs in the vehicle.' },
    ],
  },
  'wildflower-house': {
    intro: 'Wildflower House translates Texas landscape and spring color into things that can live indoors or around the yard without turning the house into a themed souvenir shop. The collection starts with native-plant culture—bluebonnets, Indian blanket, Mexican hat, prairie color, limestone, clay, warm wood, handmade pottery, paper goods, and botanical art—but the standard is still usefulness. Seeds should be appropriate for Texas conditions and planted at the right time. Vessels should work after the flowers are gone. Prints and textiles should feel at home in a room year-round rather than only during bluebonnet season.',
    principles: [
      { title: 'Texas-specific, not generic western', text: 'We look for products connected to actual Texas plants, materials, landscapes, makers, or visual traditions. A cactus silhouette by itself is not enough; the collection should feel rooted in the state rather than interchangeable with the entire Southwest.' },
      { title: 'Seasonal color without seasonal clutter', text: 'Bluebonnet blue, Indian-paintbrush red, limestone neutrals, warm clay, and prairie greens can carry the feeling of spring without requiring temporary decorations that spend eleven months in a storage bin.' },
      { title: 'Native planting with realistic expectations', text: 'Wildflower seed is not instant lawn color. Species, region, drainage, sun, seed-to-soil contact, timing, and patience matter. We favor products that make those limitations clear rather than promising a guaranteed field from one packet.' },
      { title: 'Objects that age well', text: 'Handmade ceramics, prints, baskets, planters, linens, and garden pieces should improve with ordinary use or at least tolerate it. The goal is a Texas house with texture and memory, not a shelf of untouchable props.' },
    ],
    checklist: [
      'For seed, verify the species list and planting region instead of buying solely by the photograph on the package.',
      'Texas wildflowers are commonly seeded in fall, not when spring flowers are already blooming. Follow species-specific and regional guidance.',
      'If an item is marketed as made in Texas, check where it is actually designed, printed, grown, assembled, or manufactured.',
      'For art and prints, look for subject specificity, artist attribution, paper or print method, and dimensions that work in a real room.',
      'For planters and outdoor ceramics, confirm drainage, freeze exposure, and whether the material can remain outside through local weather.'
    ],
    useItFor: 'Use Wildflower House for native-garden starters, housewarming gifts, spring table settings, understated Texas wall art, porch and patio accents, and anyone who wants the state’s landscape inside the house without leaning on flags and slogans. For actual planting, pair the collection with official regional guidance and a realistic plan for sun, soil, drainage, and irrigation.',
    relatedLinks: [
      { href: '/article/bluebonnet-season-field-guide', label: 'Bluebonnet season field guide', description: 'See the flower in context before trying to recreate the look at home.' },
      { href: '/article/texas-native-garden-that-survives-august', label: 'A garden that survives August', description: 'Build a Texas landscape around plants and watering habits that can handle summer.' },
      { href: '/home-garden', label: 'Texas home and garden', description: 'Browse practical home, yard, weather, pool, pest, and landscape guidance.' },
    ],
  },
  'smoke-and-salt': {
    intro: 'Smoke & Salt is for barbecue people who care more about repeatable results than branded gadgets. Texas barbecue does not require a giant pile of accessories, but the few tools that matter get used hard: pepper and salt with the right grind, butcher paper, thermometers, knives, gloves, trays, towels, fire-management tools, and storage that can handle grease and smoke. The collection focuses on the work around the pit—seasoning, fire, wrapping, resting, slicing, and serving—rather than decorative gear that happens to have a brisket printed on it.',
    principles: [
      { title: 'Fire management beats gadget collecting', text: 'A stable fire, clean smoke, airflow, fuel choice, and time matter more than a drawer full of specialty tools. We prioritize equipment that helps measure, handle, move, wrap, rest, and serve food without pretending it can replace fire management.' },
      { title: 'Simple seasoning is still specific', text: 'Salt and pepper sound basic until grind size, salt crystal size, application rate, and surface coverage change the bark. Seasonings should be described clearly enough that a cook can understand what is in the container and how it behaves.' },
      { title: 'Wrapping and resting are part of the cook', text: 'Butcher paper, foil, towels, pans, coolers, and holding equipment are not afterthoughts. A finished brisket can lose quality through poor handling after it leaves the pit, so the collection treats the rest and slice as part of the process.' },
      { title: 'Food-contact gear should be boringly reliable', text: 'Thermometers should be readable, knives should hold an edge, gloves should fit the task, and surfaces should clean easily. Barbecue creates enough variables already; the supporting tools should remove uncertainty rather than add it.' },
    ],
    checklist: [
      'Buy a reliable instant-read or leave-in thermometer before buying decorative pit accessories.',
      'Match paper, pans, racks, and trays to the actual size of meat you cook and the space available in the smoker.',
      'Treat seasoning blends as ingredients: read the label, understand salt content, and adjust application rather than assuming every rub is interchangeable.',
      'Keep raw-meat handling tools separate from finished-food tools when practical, especially during long cooks with repeated handling.',
      'Plan the holding and resting setup before the meat is done. The last two hours should not become an improvised search for towels, pans, or cooler space.'
    ],
    useItFor: 'Use Smoke & Salt for a new pit owner, someone building a first serious brisket setup, backyard cooks replacing worn basics, and gifts for people who would rather receive a useful thermometer or roll of proper paper than another novelty apron. Start with measurement, handling, seasoning, wrapping, and slicing; add specialty pieces only after the cooking routine exposes a real need.',
    relatedLinks: [
      { href: '/article/what-defines-texas-barbecue', label: 'What defines Texas barbecue', description: 'The culture, method, and patience behind Central Texas barbecue.' },
      { href: '/article/beginners-guide-ordering-texas-barbecue', label: 'Beginner’s guide to ordering barbecue', description: 'Understand the counter, cuts, sausage, sides, and by-the-pound tradition.' },
      { href: '/texas-barbecue-styles-explained', label: 'Texas barbecue styles explained', description: 'Compare Central, East, South, and West Texas barbecue traditions.' },
    ],
  },
};

export function shopCollectionGuideFor(slug: string) {
  return guides[slug];
}
