import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-04";

function sanctuaryPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function sanctuary(
  input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt">,
): Destination {
  return {
    ...input,
    id: `animal-sanctuary-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: sanctuaryPlaceholder(input.name),
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * Public-facing Texas wildlife conservation, sanctuary and rehabilitation
 * destinations verified against their operators' current visitor information.
 *
 * These records intentionally retain the destination-photo placeholder until a
 * subject-specific licensed image is attached. Existing destination-quality
 * gates therefore keep them out of indexable/public Explore surfaces while the
 * researched identity, official source and visitor context remain preserved.
 */
export const animalSanctuaryDestinations: Destination[] = [
  sanctuary({
    slug: "fossil-rim-wildlife-center",
    name: "Fossil Rim Wildlife Center",
    summary: "Fossil Rim Wildlife Center is a 1,800-acre nonprofit conservation center near Glen Rose where visitors can experience threatened and endangered wildlife on a 7.2-mile self-drive route, guided safari tours and conservation-focused programs.",
    region: "hill-country",
    nearestTown: "Glen Rose",
    county: "Somervell County",
    coordinates: { lat: 32.17946, lng: -97.7972 },
    address: "2299 County Road 2008, Glen Rose, TX 76043",
    bestSeason: "Open year-round except Thanksgiving Day, Christmas Eve and Christmas Day; mornings and cooler seasons generally offer more comfortable wildlife viewing.",
    entryNote: "Admission is ticketed and advance purchase is recommended. Hours, tour availability and animal visibility vary with season, weather and animal-care needs; verify current details before traveling.",
    highlights: ["7.2-mile self-drive wildlife route", "Guided safari tours", "Threatened and endangered species conservation", "Animal Discoveries and nature trails"],
    body: [
      "Fossil Rim combines a major conservation mission with one of Texas's most distinctive wildlife visitor experiences. The nonprofit center manages roughly 1,800 acres near Glen Rose and works with threatened and endangered species through conservation breeding, research, professional training, education and habitat stewardship.",
      "Visitors can drive the Gosdin Scenic Drive in their own vehicle or reserve guided and behind-the-scenes experiences. The route crosses broad Hill Country pastures where many animals move in large herds, while the Overlook provides a place to stop for educational exhibits, food, a nature store and short walking trails.",
      "Fossil Rim is a conservation center rather than a conventional petting attraction. Animal sightings are never guaranteed, visitor rules are designed around animal welfare, and heat or other conditions can affect both animal activity and tour operations.",
    ],
    managingAuthority: "Fossil Rim Wildlife Center",
    officialUrl: "https://fossilrim.org/",
  }),
  sanctuary({
    slug: "black-beauty-ranch",
    name: "Black Beauty Ranch",
    summary: "Black Beauty Ranch in Murchison is a 1,400-acre animal sanctuary operated by Humane World for Animals, providing lifelong care for hundreds of rescued domestic and exotic animals and offering limited scheduled and private educational tours.",
    region: "piney-woods",
    nearestTown: "Murchison",
    county: "Henderson County",
    coordinates: { lat: 32.32154, lng: -95.71804 },
    address: "12526 County Road 3806, Murchison, TX 75778",
    bestSeason: "Tours are scheduled rather than offered as daily walk-in admission; choose a published tour date and prepare for East Texas heat or rain according to the season.",
    entryNote: "Black Beauty Ranch is a sanctuary first, not a walk-in zoo. Public bus tours are offered on limited scheduled dates and private tours depend on availability; reservations and age restrictions apply.",
    highlights: ["1,400-acre animal sanctuary", "Hundreds of rescued animals", "Scheduled educational bus tours", "Private sanctuary tours"],
    body: [
      "Founded by author and animal advocate Cleveland Amory, Black Beauty Ranch provides permanent sanctuary to animals rescued from cruelty, neglect, laboratories, roadside zoos, the exotic-pet trade and other circumstances where returning to the wild is not possible.",
      "The ranch is intentionally different from a conventional zoo. Animals live across expansive, species-appropriate habitats and the visitor program is built around guided education rather than guaranteed close-up encounters or direct interaction.",
      "Public access is limited to scheduled tours, with private tours also available by arrangement. Because tour dates, capacity, pricing and age requirements can change, visitors should reserve directly with Humane World for Animals before making the drive to rural Henderson County.",
    ],
    managingAuthority: "Humane World for Animals",
    officialUrl: "https://www.humaneworld.org/costa-rica/en/black-beauty-ranch",
  }),
  sanctuary({
    slug: "texas-sealife-center",
    name: "Texas Sealife Center",
    summary: "Texas Sealife Center in Corpus Christi is a nonprofit coastal-wildlife rescue and rehabilitation center where public tours introduce visitors to sea turtle patients, permanent education animals and the center's conservation work.",
    region: "gulf-coast",
    nearestTown: "Corpus Christi",
    county: "Nueces County",
    coordinates: { lat: 27.6247, lng: -97.2207 },
    address: "14220 S Padre Island Dr, Corpus Christi, TX 78418",
    bestSeason: "Public tours are offered on selected days throughout the year; coastal weather is generally most comfortable from fall through spring.",
    entryNote: "The center is an active wildlife rehabilitation facility. Tour days, times, admission and the animals currently in care can change, so confirm the current visitor schedule before arrival.",
    highlights: ["Sea turtle rehabilitation", "Coastal and aquatic wildlife rescue", "Public educational tours", "Nature trail and education ambassadors"],
    body: [
      "Texas Sealife Center was created to expand rehabilitation capacity for injured and stranded coastal wildlife in South Texas. Its work includes rescue, supportive care, rehabilitation and release of native animals, along with public education about marine and coastal conservation.",
      "The visitor experience is structured around guided tours rather than unrestricted access to a rehabilitation hospital. Tours can include the nature trail, permanent education ambassadors and views of sea turtle patients currently receiving care, followed by time in the education room.",
      "Because patient welfare comes first, the animals visible on any given visit depend on current rescue and rehabilitation needs. Visitors should follow staff instructions closely and treat the center as a working conservation facility rather than an aquarium-style attraction.",
    ],
    managingAuthority: "Texas Sealife Center",
    officialUrl: "https://www.texassealifecenter.org/visit/",
  }),
  sanctuary({
    slug: "in-sync-exotics",
    name: "In-Sync Exotics Wildlife Rescue & Educational Center",
    summary: "In-Sync Exotics in Wylie is a nonprofit sanctuary for rescued exotic cats, with weekend public hours, self-guided visitor access and educational programs centered on lifelong care rather than breeding or animal contact.",
    region: "prairies-lakes",
    nearestTown: "Wylie",
    county: "Collin County",
    coordinates: { lat: 33.03582, lng: -96.49229 },
    address: "3430 Skyview Drive, Wylie, TX 75098",
    bestSeason: "Open to general visitors on weekends; spring and fall are typically most comfortable for an outdoor sanctuary walk, while special events and tour offerings vary through the year.",
    entryNote: "Current public hours are Saturday and Sunday, and the sanctuary also offers special events and arranged tours. Confirm current hours, requested donations and visitor rules before arrival; direct animal contact is not part of the experience.",
    highlights: ["Rescued lions, tigers and other exotic cats", "Self-guided sanctuary visits", "Educational rescue stories", "Non-breeding lifetime sanctuary model"],
    body: [
      "In-Sync Exotics was established to provide permanent care for exotic cats that were abused, neglected, abandoned or otherwise unable to live safely outside professional care. The organization does not buy, sell, trade or breed its animals, and its public education focuses on the consequences of irresponsible exotic-animal ownership and breeding.",
      "Visitors walk the outdoor sanctuary at their own pace, read individual rescue stories and can speak with volunteers about species, husbandry and the circumstances that brought animals into care. The setting is intentionally simpler than a conventional zoo because resources are directed toward veterinary care, food, habitats and enrichment.",
      "The experience depends on animal choice and weather. Cats may rest out of view, and visitors should follow sanctuary rules, remain outside all barriers and check the current schedule before making the drive to Wylie.",
    ],
    managingAuthority: "In-Sync Exotics Wildlife Rescue & Educational Center",
    officialUrl: "https://www.insyncexotics.org/tours/",
  }),
  sanctuary({
    slug: "austin-zoo",
    name: "Austin Zoo",
    summary: "Austin Zoo is a nonprofit rescue zoo on the southwest edge of Austin whose mission centers on rescue, conservation and education, with a public collection of rescued and rehabilitated animals in a rustic Hill Country setting.",
    region: "hill-country",
    nearestTown: "Austin",
    county: "Travis County",
    coordinates: { lat: 30.26175, lng: -97.93719 },
    address: "10808 Rawhide Trail, Austin, TX 78736",
    bestSeason: "Open year-round; cooler fall-through-spring weather is generally more comfortable for walking the outdoor grounds, while summer visits are best earlier in the day.",
    entryNote: "Austin Zoo is open to the public with ticketed admission. Hours differ between weekdays, weekends and holidays, so confirm the current schedule and ticket guidance directly with the zoo before visiting.",
    highlights: ["Nonprofit rescue-zoo mission", "Big cats, primates and native wildlife", "Hill Country outdoor setting", "Family-oriented animal education"],
    body: [
      "Austin Zoo describes itself as a rescue zoo, with a mission to assist animals in need through rescue, conservation and education. Its residents include animals that arrived from a range of circumstances and now receive long-term professional care at the nonprofit facility.",
      "The visitor experience is an outdoor walk through a compact, rustic zoo rather than a large metropolitan campus. Families can see a broad mix of mammals, birds and reptiles while learning about the animals and the rescue mission supporting their care.",
      "Because much of the experience is outdoors, heat and weather matter. Visitors should check the current hours and admission details, bring water during warm months and plan the visit around the animals' activity rather than expecting every resident to be visible at all times.",
    ],
    managingAuthority: "Austin Zoo",
    officialUrl: "https://austinzoo.org/",
  }),
  sanctuary({
    slug: "sharkarosa-zoo",
    name: "Sharkarosa Zoo",
    summary: "Sharkarosa Zoo in Pilot Point is a 126-acre North Texas wildlife facility with more than 180 animals, self-guided public days, educational presentations, private tours and conservation-oriented encounters with rare and exotic species.",
    region: "prairies-lakes",
    nearestTown: "Pilot Point",
    county: "Denton County",
    coordinates: { lat: 33.37749, lng: -96.97026 },
    address: "11670 Massey Road, Pilot Point, TX 76258",
    bestSeason: "Public days run year-round with expanded summer hours; spring and fall usually provide the most comfortable conditions for an outdoor ranch visit.",
    entryNote: "Regular public days and summer hours vary by season and weather, while private tours and encounters require advance reservations. Check the zoo's current visitor guidance or social updates before traveling.",
    highlights: ["126-acre wildlife ranch", "More than 180 animals", "Self-guided public days", "Educational presentations and private tours"],
    body: [
      "Sharkarosa is an educational wildlife ranch and zoo built around public access to rare, endangered and exotic animals in a large North Texas ranch setting. The organization says it is not formally a rescue organization, although it may assist exotic-animal rescues with expertise, supplies or housing when needed.",
      "On public days, visitors move through the facility at their own pace with informational signs, staff support and recurring educational presentations. Private tours, animal encounters, field trips and a walk-through petting area create additional ways to experience the collection beyond a standard zoo loop.",
      "Weather can change operations quickly, and the zoo specifically directs visitors to current updates for closures and special hours. The most reliable plan is to verify the operating calendar before departure and treat scheduled encounters or private experiences as separate reservations.",
    ],
    managingAuthority: "Sharkarosa Zoo",
    officialUrl: "https://sharkarosa.com/",
  }),
];
