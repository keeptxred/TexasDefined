export type DogEditorialCluster =
  | 'texas-dog-life'
  | 'travel-with-dogs'
  | 'outdoors-with-dogs'
  | 'breed-culture'
  | 'dog-friendly-texas'
  | 'seasonal-dog-life';

export type DogEditorialStatus = 'research' | 'brief-ready' | 'draft-next';

export interface DogEditorialPlanItem {
  slug: string;
  title: string;
  cluster: DogEditorialCluster;
  status: DogEditorialStatus;
  searchIntent: string;
  texasAngle: string;
  internalLinkTargets: string[];
  merchandiseBridge: string[];
}

/**
 * Publishing queue for Texas Dogs Defined.
 *
 * These are intentionally not published automatically. Each story should be
 * researched against current first-party rules, access information and safety
 * guidance before it becomes a public article. Product concepts are attached
 * to the story only when they are a natural extension of the reader's intent.
 */
export const texasDogsEditorialPlan: DogEditorialPlanItem[] = [
  {
    slug: 'dog-friendly-texas-road-trips',
    title: 'The Texas Road Trips That Are Better With a Dog in the Back Seat',
    cluster: 'travel-with-dogs',
    status: 'draft-next',
    searchIntent: 'dog friendly Texas road trips and destinations',
    texasAngle: 'Build several realistic Texas driving loops around outdoor stops, shade, water, breaks and dog-friendly overnight options.',
    internalLinkTargets: ['/explore/road-trips', '/explore', '/dogs'],
    merchandiseBridge: ['retro-dogs', 'texas-dogs'],
  },
  {
    slug: 'texas-lake-day-with-dog',
    title: 'How to Build a Texas Lake Day Around Your Dog',
    cluster: 'outdoors-with-dogs',
    status: 'draft-next',
    searchIntent: 'taking a dog to a lake in Texas',
    texasAngle: 'Connect lake access, heat, shoreline etiquette and travel planning to Texas lake weekends.',
    internalLinkTargets: ['/explore/lakes-rivers', '/explore/outdoors', '/dogs'],
    merchandiseBridge: ['lake-dogs', 'retro-dogs'],
  },
  {
    slug: 'dog-friendly-texas-weekend',
    title: 'A Texas Weekend With the Dog: What Actually Makes a Trip Work',
    cluster: 'travel-with-dogs',
    status: 'brief-ready',
    searchIntent: 'Texas weekend trips with dogs',
    texasAngle: 'A planning-first guide to drive time, lodging rules, outdoor time, meals, heat and backup plans.',
    internalLinkTargets: ['/explore/trip-planner', '/explore/road-trips', '/dogs'],
    merchandiseBridge: ['texas-dogs', 'dogs-with-jobs'],
  },
  {
    slug: 'texas-heat-dogs-guide',
    title: 'Texas Heat Changes the Rules for a Day Out With Your Dog',
    cluster: 'seasonal-dog-life',
    status: 'research',
    searchIntent: 'dogs Texas heat summer safety',
    texasAngle: 'Translate current veterinary and public-safety guidance into practical Texas summer planning without pretending every dog handles heat the same way.',
    internalLinkTargets: ['/dogs', '/explore/outdoors', '/texas-blue-norther-weather-guide'],
    merchandiseBridge: ['lake-dogs'],
  },
  {
    slug: 'dog-friendly-texas-state-parks',
    title: 'Taking Your Dog to a Texas State Park: The Rules and the Better Ways to Plan It',
    cluster: 'outdoors-with-dogs',
    status: 'research',
    searchIntent: 'Texas state parks dogs pet rules',
    texasAngle: 'Use current Texas Parks and Wildlife rules and park-specific access details, then connect readers to the right park pages.',
    internalLinkTargets: ['/explore/state-parks', '/explore/outdoors', '/dogs'],
    merchandiseBridge: ['retro-dogs', 'texas-dogs'],
  },
  {
    slug: 'dog-friendly-texas-beaches',
    title: 'A Dog-and-Beach Weekend on the Texas Coast',
    cluster: 'dog-friendly-texas',
    status: 'research',
    searchIntent: 'dog friendly beaches Texas',
    texasAngle: 'Compare current pet rules, access, shade and practical logistics across Texas Gulf Coast destinations.',
    internalLinkTargets: ['/explore/beaches-coast', '/explore/road-trips', '/dogs'],
    merchandiseBridge: ['lake-dogs', 'retro-dogs'],
  },
  {
    slug: 'texas-patio-dog-etiquette',
    title: 'The Texas Patio Dog: How to Make the Outing Better for Everybody',
    cluster: 'texas-dog-life',
    status: 'brief-ready',
    searchIntent: 'dog friendly patios Texas etiquette',
    texasAngle: 'A light lifestyle piece about heat, space, water, restaurant rules and knowing when the dog would rather stay home.',
    internalLinkTargets: ['/dogs', '/texas-living', '/explore/food-bbq'],
    merchandiseBridge: ['dogs-with-attitude', 'distinguished-dogs'],
  },
  {
    slug: 'texas-porch-dogs',
    title: 'The Unofficial Job Description of a Texas Porch Dog',
    cluster: 'breed-culture',
    status: 'draft-next',
    searchIntent: 'funny dog culture Texas porch dog',
    texasAngle: 'A humor-forward essay about supervision, delivery alerts, squirrels, neighbors and the sacred patch of shade by the front door.',
    internalLinkTargets: ['/dogs', '/texas-living', '/home-garden'],
    merchandiseBridge: ['dogs-with-jobs', 'dogs-with-attitude', 'texas-dogs'],
  },
  {
    slug: 'texas-ranch-dogs-working-dogs',
    title: 'Ranch Dog, Yard Manager, Family Coworker: The Dogs With Jobs Side of Texas',
    cluster: 'breed-culture',
    status: 'research',
    searchIntent: 'Texas ranch dogs working dog breeds',
    texasAngle: 'Separate real working-dog roles from the suburban jokes they inspire and avoid presenting every herding or guardian breed as interchangeable.',
    internalLinkTargets: ['/dogs', '/explore/outdoors', '/texas-living'],
    merchandiseBridge: ['dogs-with-jobs', 'texas-dogs'],
  },
  {
    slug: 'small-dogs-big-texas-attitude',
    title: 'Small Dogs, Big Texas Attitude',
    cluster: 'breed-culture',
    status: 'brief-ready',
    searchIntent: 'funny small dog personalities shirts gifts',
    texasAngle: 'A playful collection story connecting Chihuahuas, Yorkies, Corgis and Dachshunds to the size-versus-confidence humor behind the designs.',
    internalLinkTargets: ['/dogs', '/dogs/chihuahua', '/dogs/yorkshire-terrier', '/dogs/dachshund'],
    merchandiseBridge: ['dogs-with-attitude', 'distinguished-dogs'],
  },
  {
    slug: 'big-dogs-texas-sized',
    title: 'The Dogs That Take “Everything’s Bigger in Texas” Personally',
    cluster: 'breed-culture',
    status: 'brief-ready',
    searchIntent: 'funny big dog shirts giant dog gifts',
    texasAngle: 'Use Great Danes and other large-dog household logistics as the joke instead of relying on a generic Texas slogan.',
    internalLinkTargets: ['/dogs', '/dogs/great-dane', '/everything-bigger-in-texas'],
    merchandiseBridge: ['dogs-with-attitude', 'retro-dogs', 'texas-dogs'],
  },
  {
    slug: 'texas-dog-road-trip-packing-list',
    title: 'The Dog Road-Trip Packing List for Texas Miles',
    cluster: 'travel-with-dogs',
    status: 'research',
    searchIntent: 'dog road trip packing list Texas',
    texasAngle: 'A practical checklist shaped around long drives, heat, water, overnight stops and changing weather across the state.',
    internalLinkTargets: ['/explore/road-trips', '/explore/trip-planner', '/dogs'],
    merchandiseBridge: ['retro-dogs', 'texas-dogs'],
  },
  {
    slug: 'texas-dog-adoption-starting-points',
    title: 'Thinking About Adopting a Dog in Texas? Start Local',
    cluster: 'texas-dog-life',
    status: 'research',
    searchIntent: 'adopt a dog Texas shelters rescues',
    texasAngle: 'Point readers toward current municipal shelters, humane organizations and responsible local adoption resources without turning the page into an unverified directory.',
    internalLinkTargets: ['/dogs', '/browse/cities', '/browse/counties'],
    merchandiseBridge: [],
  },
  {
    slug: 'texas-dog-events-calendar-guide',
    title: 'Dog Days Out: Finding Dog-Friendly Events Around Texas',
    cluster: 'dog-friendly-texas',
    status: 'research',
    searchIntent: 'dog events Texas dog friendly festivals',
    texasAngle: 'Use the TexasDefined events system to surface current dog-friendly events only when organizer rules are verified.',
    internalLinkTargets: ['/events', '/dogs', '/explore'],
    merchandiseBridge: ['seasonal-dogs', 'texas-dogs'],
  },
  {
    slug: 'why-dog-breed-shirts-work',
    title: 'Why the Best Dog Shirt Joke Feels Like Your Dog and Nobody Else’s',
    cluster: 'breed-culture',
    status: 'draft-next',
    searchIntent: 'funny dog breed shirts gifts',
    texasAngle: 'Explain the Texas Dogs Defined approach: start with recognizable breed behavior, then build the setting, joke and design language around it.',
    internalLinkTargets: ['/dogs', '/shop', '/texas-living'],
    merchandiseBridge: ['retro-dogs', 'distinguished-dogs', 'dogs-with-jobs', 'dogs-with-attitude'],
  },
];

export const texasDogsLaunchDrafts = texasDogsEditorialPlan.filter((item) => item.status === 'draft-next');
