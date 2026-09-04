export interface DogBreedProfile {
  slug: string;
  name: string;
  shortName: string;
  deck: string;
  personality: string;
  texasFit: string;
  designHooks: string[];
  keywords: string[];
}

export interface DogDesignCollection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
}

export const dogDesignCollections: DogDesignCollection[] = [
  {
    slug: "retro-dogs",
    name: "Retro Dogs",
    tagline: "Old-school color, new-school dog obsession",
    description: "Vintage travel-poster shapes, seventies sunsets, varsity lettering and throwback graphics built around recognizable breed personalities.",
    examples: ["Lake Day Labrador", "Golden Hour Golden", "Low Rider Dachshund", "Weekend Beagle"],
  },
  {
    slug: "distinguished-dogs",
    name: "Distinguished Dogs",
    tagline: "Glasses on. Standards high.",
    description: "Dogs in glasses, ties and serious-looking poses paired with office titles and absurdly important responsibilities.",
    examples: ["Senior Treat Analyst", "Chief Barketing Officer", "Director of Human Resources", "Neighborhood Intelligence"],
  },
  {
    slug: "dogs-with-jobs",
    name: "Dogs With Jobs",
    tagline: "Every household has management",
    description: "Breed-specific workplace humor for the dog who has appointed itself lifeguard, ranch manager, security department or quality-control inspector.",
    examples: ["Labrador Lifeguard", "Border Collie Ranch Manager", "German Shepherd Security", "Beagle Quality Control"],
  },
  {
    slug: "dogs-with-attitude",
    name: "Dogs With Attitude",
    tagline: "Small patience. Big personality.",
    description: "Deadpan expressions, side-eye and the kind of breed humor dog owners recognize immediately.",
    examples: ["Professional Side-Eye", "I Heard You", "Treat Inspector", "My Human Works for Me"],
  },
  {
    slug: "texas-dogs",
    name: "Texas Dogs",
    tagline: "Dogs, Texas style",
    description: "Porch dogs, ranch dogs, lake dogs, road-trip dogs and breed graphics with a distinctly Texas setting rather than a generic state-outline treatment.",
    examples: ["Hill Country Hound", "West Texas Heeler", "Gulf Coast Golden", "Texas Lake Dog"],
  },
  {
    slug: "lake-dogs",
    name: "Lake Dogs",
    tagline: "Wet dog. No regrets.",
    description: "Water-loving breeds, dock life, boats, towels, tennis balls and the particular chaos of taking a dog to the lake.",
    examples: ["Lake Hair, Don’t Care", "Dock Supervisor", "Certified Boat Dog", "Swim. Shake. Repeat."],
  },
  {
    slug: "seasonal-dogs",
    name: "Seasonal Dogs",
    tagline: "Holiday trouble, by breed",
    description: "Halloween, Christmas, football season, summer lake days and other limited-run ideas that can rotate without changing the core breed pages.",
    examples: ["Santa’s Treat Inspector", "Spooky Good Boy", "Game Day Dog", "Summer Shed Club"],
  },
];

export const dogBreeds: DogBreedProfile[] = [
  {
    slug: "labrador-retriever",
    name: "Labrador Retriever",
    shortName: "Lab",
    deck: "The dog who treats every day like somebody just opened the back door to the lake.",
    personality: "Labs are widely associated with friendly, social, eager-to-join-in energy. That reputation gives the breed a huge visual vocabulary: tennis balls, docks, snacks, muddy paws and a complete inability to understand why the party would ever end.",
    texasFit: "The Lab fits naturally into Texas lake weekends, backyard life, hunting culture and road trips. The strongest Texas-themed designs feel lived-in — boat ramps, porches, coolers and water — rather than simply adding a flag to a generic dog graphic.",
    designHooks: ["lake dog", "dock supervisor", "tennis-ball department", "snack inspection", "retro outdoors", "weekend boat dog"],
    keywords: ["labrador shirt", "lab dog shirt", "funny lab shirt", "retro lab shirt", "labrador gift", "texas lab dog"],
  },
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    shortName: "Golden",
    deck: "Sunshine with a tail, usually carrying something it found five minutes ago.",
    personality: "Golden Retrievers have one of the clearest feel-good identities in dog culture: cheerful, people-focused, slightly goofy and always ready to participate. That makes them perfect for optimistic retro graphics and jokes built around enthusiasm rather than attitude.",
    texasFit: "Goldens work especially well with Hill Country weekends, lake trips, patios and sunset palettes. A Texas Golden design can feel regional without losing the universal appeal that makes the breed such a strong gift category.",
    designHooks: ["golden hour", "professional greeter", "retrieval department", "sunshine club", "lake weekend", "good-vibes retro"],
    keywords: ["golden retriever shirt", "funny golden retriever shirt", "retro golden shirt", "golden retriever gift", "golden dog tee"],
  },
  {
    slug: "dachshund",
    name: "Dachshund",
    shortName: "Dachshund",
    deck: "Low to the ground. Extremely high opinion of itself.",
    personality: "The Dachshund silhouette does half the creative work before a slogan is added. Long body, short legs and a reputation for determination create an unusually strong foundation for dry humor, retro graphics and exaggerated job titles.",
    texasFit: "Dachshunds pair naturally with porch humor, road-trip graphics and playful Western styling. The joke should stay centered on the breed’s unmistakable proportions and personality rather than turning every design into cowboy clip art.",
    designHooks: ["low rider", "long dog department", "porch patrol", "tiny legs big plans", "retro motel sign", "professional side-eye"],
    keywords: ["dachshund shirt", "wiener dog shirt", "funny dachshund shirt", "retro dachshund tee", "dachshund gift"],
  },
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    shortName: "Frenchie",
    deck: "Compact dog. Executive-level confidence.",
    personality: "Frenchies bring a naturally expressive face and compact silhouette that work especially well for character-driven graphics. The best concepts lean into confidence, dramatic reactions and the feeling that the dog has somehow become the most important person in the room.",
    texasFit: "For Texas-themed designs, Frenchies fit city patios, neighborhood walks and tongue-in-cheek luxury more naturally than ranch imagery. Think Austin brunch manager or Houston patio critic, not a forced cowboy costume on every shirt.",
    designHooks: ["middle management", "patio critic", "executive napper", "tiny boardroom", "dramatic side-eye", "distinguished glasses"],
    keywords: ["french bulldog shirt", "frenchie shirt", "funny frenchie tee", "french bulldog gift", "retro frenchie shirt"],
  },
  {
    slug: "german-shepherd",
    name: "German Shepherd",
    shortName: "German Shepherd",
    deck: "The household security department would like to know who just pulled into the driveway.",
    personality: "German Shepherds are strongly associated with alertness, loyalty, work and watchfulness. Humor works best when it turns that serious reputation into a household job description rather than making the dog look aggressive.",
    texasFit: "The breed fits ranch, acreage, truck and home-security humor naturally. Texas graphics can borrow from practical working-dog imagery while keeping the tone warm enough for everyday dog owners.",
    designHooks: ["security department", "driveway surveillance", "ranch security", "neighborhood watch", "shift supervisor", "working-dog retro"],
    keywords: ["german shepherd shirt", "funny german shepherd shirt", "german shepherd gift", "working dog shirt", "retro german shepherd tee"],
  },
  {
    slug: "australian-shepherd",
    name: "Australian Shepherd",
    shortName: "Aussie",
    deck: "Ranch energy, even when the ranch is a suburban backyard.",
    personality: "Aussies are commonly associated with motion, intelligence and having a project whether the humans assigned one or not. Their color patterns also make them visually distinctive, which opens the door to strong retro and outdoors collections.",
    texasFit: "Aussies make sense in Hill Country, ranch and trail themes because the context matches the breed’s active reputation. The humor can move between real working-dog energy and the suburban version: managing children, sprinklers and everyone else in the yard.",
    designHooks: ["ranch manager", "yard operations", "weekend trail crew", "herding department", "no off switch", "western retro"],
    keywords: ["australian shepherd shirt", "aussie dog shirt", "funny aussie shirt", "australian shepherd gift", "retro aussie tee"],
  },
  {
    slug: "pembroke-welsh-corgi",
    name: "Pembroke Welsh Corgi",
    shortName: "Corgi",
    deck: "Management has arrived, and management is six inches off the ground.",
    personality: "Corgis combine a recognizable outline with a naturally comic sense of authority. Their short legs, upright ears and confident expression make them ideal for office humor, royal-parody energy and designs where the dog clearly believes it runs the household.",
    texasFit: "Corgis work best in Texas when the setting is playful rather than literal: ranch management, porch supervision, road-trip command or tailgate operations. The contrast between tiny stature and oversized responsibility is the joke.",
    designHooks: ["middle management", "ranch management", "porch supervisor", "short legs long agenda", "operations director", "retro badge"],
    keywords: ["corgi shirt", "funny corgi shirt", "corgi gift", "retro corgi tee", "corgi dog shirt"],
  },
  {
    slug: "beagle",
    name: "Beagle",
    shortName: "Beagle",
    deck: "Quality control is currently following a smell into the next county.",
    personality: "Beagles are often associated with curiosity, scent-following and a cheerful willingness to investigate absolutely everything. That reputation creates easy humor around inspections, snacks and disappearing on an imaginary assignment.",
    texasFit: "Beagles fit small-town, porch and road-trip themes well. A Texas line can lean into roadside stops, barbecue aroma jokes and backyard investigations without turning the breed into a hunting stereotype only.",
    designHooks: ["quality control", "snack detection", "scent department", "porch investigator", "road-trip inspector", "retro scout"],
    keywords: ["beagle shirt", "funny beagle shirt", "beagle gift", "retro beagle tee", "beagle dog shirt"],
  },
  {
    slug: "boxer",
    name: "Boxer",
    shortName: "Boxer",
    deck: "Built like an athlete. Frequently behaving like a comedian.",
    personality: "Boxers have a strong, athletic silhouette paired with a famously expressive face. That contrast is useful creatively: serious-looking dog, unserious household behavior.",
    texasFit: "Boxers fit backyard, truck, patio and family-life humor better than polished show-dog styling. Texas designs can feel sturdy, casual and slightly mischievous.",
    designHooks: ["backyard athlete", "security-ish", "zoomies department", "patio bouncer", "serious face silly job", "vintage athletic"],
    keywords: ["boxer dog shirt", "funny boxer shirt", "boxer dog gift", "retro boxer tee", "boxer owner shirt"],
  },
  {
    slug: "chihuahua",
    name: "Chihuahua",
    shortName: "Chihuahua",
    deck: "Five pounds of dog. Forty pounds of opinion.",
    personality: "Chihuahuas are a natural fit for attitude-driven designs because the visual joke is built into the scale. Tiny frame, enormous confidence and expressive faces can carry a shirt with very little copy.",
    texasFit: "South Texas and city-life references can work especially well, but the strongest ideas avoid stereotypes and stay focused on size-versus-confidence humor, porch patrol and household authority.",
    designHooks: ["tiny security", "big opinion", "pocket management", "porch patrol", "small dog big meeting", "minimal retro"],
    keywords: ["chihuahua shirt", "funny chihuahua shirt", "chihuahua gift", "retro chihuahua tee", "small dog shirt"],
  },
  {
    slug: "great-dane",
    name: "Great Dane",
    shortName: "Great Dane",
    deck: "A horse-sized lap dog with absolutely no concept of personal space.",
    personality: "Great Danes create immediate visual comedy through scale. The breed works beautifully for deadpan designs about couches, laps, doorways and the assumption that an enormous dog can somehow become invisible in the house.",
    texasFit: "The old Texas line about everything being bigger gives Great Dane concepts an obvious opening, but the better designs push beyond the cliché into porch furniture, truck seats and oversized household logistics.",
    designHooks: ["lap dog allegedly", "couch department", "everything bigger", "doorway supervisor", "gentle giant", "oversized retro"],
    keywords: ["great dane shirt", "funny great dane shirt", "great dane gift", "retro great dane tee", "giant dog shirt"],
  },
  {
    slug: "yorkshire-terrier",
    name: "Yorkshire Terrier",
    shortName: "Yorkie",
    deck: "Tiny frame, salon-level confidence and no interest in being overlooked.",
    personality: "Yorkies lend themselves to polished, expressive graphics and humor built around confidence, grooming and household status. The breed works especially well in distinguished-dog and attitude collections.",
    texasFit: "A Texas Yorkie line can play with patio life, boutique-road-trip stops and tiny-dog bravado. The strongest designs keep the typography and illustration sharp instead of making every concept overly cute.",
    designHooks: ["tiny executive", "salon manager", "patio royalty", "travel-size authority", "distinguished glasses", "retro boutique"],
    keywords: ["yorkie shirt", "yorkshire terrier shirt", "funny yorkie tee", "yorkie gift", "retro yorkie shirt"],
  },
];

export function findDogBreed(slug: string) {
  return dogBreeds.find((breed) => breed.slug === slug);
}

export function relatedDogBreeds(slug: string, limit = 4) {
  const index = dogBreeds.findIndex((breed) => breed.slug === slug);
  if (index < 0) return dogBreeds.slice(0, limit);
  const reordered = [...dogBreeds.slice(index + 1), ...dogBreeds.slice(0, index)];
  return reordered.slice(0, limit);
}
