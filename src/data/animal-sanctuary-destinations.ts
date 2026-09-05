import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-05";

function sanctuaryPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function sanctuary(
  input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt"> & { hero?: ImageRef },
): Destination {
  return {
    ...input,
    id: `animal-sanctuary-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: input.hero ?? sanctuaryPlaceholder(input.name),
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * Public-facing Texas wildlife conservation, sanctuary and rehabilitation
 * destinations verified against their operators' current visitor information.
 *
 * Records without a subject-specific licensed image intentionally retain the
 * destination-photo placeholder. Existing destination-quality gates therefore
 * keep those records out of indexable/public Explore surfaces until suitable
 * imagery is available.
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
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fossil_Rim_Wildlife_Center_(49193476352).jpg",
      alt: "Wildlife and open habitat at Fossil Rim Wildlife Center near Glen Rose, Texas",
      width: 1024,
      height: 974,
      credit: "runarut · CC BY 2.0 · Wikimedia Commons",
    },
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
    bestSeason: "Public tours are offered throughout much of the week; coastal weather is generally most comfortable from fall through spring.",
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
    slug: "center-for-animal-research-and-education",
    name: "Center for Animal Research and Education",
    summary: "The Center for Animal Research and Education, or CARE, is a nonprofit exotic-animal sanctuary in Bridgeport that provides lifelong individualized care for rescued big cats and other animals and offers guided public tours on scheduled days.",
    region: "prairies-lakes",
    nearestTown: "Bridgeport",
    county: "Wise County",
    coordinates: { lat: 33.21, lng: -97.75 },
    address: "245 County Road 3422, Bridgeport, TX 76426",
    bestSeason: "Public tours are scheduled seasonally; cooler spring and fall mornings are generally most comfortable for the roughly two-hour outdoor walking tour.",
    entryNote: "CARE is a working sanctuary, not a walk-through zoo. Public tours follow a published schedule, private tours may be arranged separately, and guests should verify the current calendar and weather policy before traveling.",
    highlights: ["Rescued exotic cats and lemurs", "Guided educational sanctuary tours", "Special-needs and senior animal care", "22-acre natural setting"],
    body: [
      "CARE provides individualized, lifelong care for rescued and non-releasable exotic animals, with a particular focus on animals that are elderly, ill or have special needs. The organization limits intake so it can maintain appropriate veterinary care, habitats and enrichment for each resident.",
      "Public visits are guided rather than self-directed. CARE's current visitor program uses approximately two-hour educational walking tours led by experienced staff or guides, with no unsupervised access and no direct visitor contact with sanctuary animals.",
      "Because the tour is outdoors on uneven ground and the sanctuary prioritizes animal welfare, weather, animal-care needs and seasonal scheduling can affect access. Visitors should confirm the current tour schedule before making the trip to Bridgeport.",
    ],
    managingAuthority: "Center for Animal Research and Education",
    officialUrl: "https://www.carerescuetexas.com/what-we-do/",
  }),
  sanctuary({
    slug: "in-sync-exotics",
    name: "In-Sync Exotics",
    summary: "In-Sync Exotics in Wylie is a nonprofit exotic-cat sanctuary and wildlife rescue providing lifelong care for rescued lions, tigers and other exotic cats, with weekend self-guided public visits and special educational events.",
    region: "prairies-lakes",
    nearestTown: "Wylie",
    county: "Collin County",
    coordinates: { lat: 33.02, lng: -96.52 },
    address: "3430 Skyview Drive, Wylie, TX 75098",
    bestSeason: "Weekend public hours are offered through the year; spring and fall are generally the most comfortable seasons for the outdoor sanctuary walk.",
    entryNote: "Visitor hours, requested donations and special-event access can change. Review the sanctuary's current tour page and visitor rules before arrival, and do not expect animal interaction.",
    highlights: ["Rescued lions and tigers", "Weekend self-guided sanctuary visits", "Individual rescue stories", "Nonprofit lifelong sanctuary care"],
    body: [
      "In-Sync Exotics was established to rescue and provide permanent sanctuary for exotic cats that cannot be returned to the wild. Its residents include animals displaced from private ownership and other situations where long-term specialized care is required.",
      "Unlike a conventional zoo visit, the sanctuary experience centers on the stories and welfare of individual rescued cats. Visitors walk the outdoor facility, read each resident's rescue history and learn about species behavior and responsible exotic-animal stewardship.",
      "Public access is generally offered on weekends, with additional events scheduled during the year. The facility remains an operating sanctuary first, so guests should check current hours, weather and visitor rules before traveling to Wylie.",
    ],
    managingAuthority: "In-Sync Exotics Wildlife Rescue and Educational Center",
    officialUrl: "https://www.insyncexotics.org/tours/",
  }),
  sanctuary({
    slug: "texas-wolfdog-project",
    name: "Texas Wolfdog Project",
    summary: "Texas Wolfdog Project in Montgomery is a nonprofit rescue and placement organization specializing in social wolfdogs, with scheduled guided tours that combine education about wolfdog behavior with supervised introductions to resident and adoptable animals.",
    region: "piney-woods",
    nearestTown: "Montgomery",
    county: "Montgomery County",
    coordinates: { lat: 30.39, lng: -95.7 },
    address: "24874 Weeren Rd, Montgomery, TX 77316",
    bestSeason: "Tours are primarily outdoors; cooler months and mild-weather Saturdays are generally most comfortable.",
    entryNote: "Tours are scheduled and guided, with age, waiver and animal-interaction rules. Confirm the current appointment schedule directly with Texas Wolfdog Project before traveling.",
    highlights: ["Guided wolfdog tours", "Wolfdog rescue and adoption", "Behavior and ownership education", "Volunteer-run nonprofit shelter"],
    body: [
      "Texas Wolfdog Project focuses on rescue, rehabilitation and responsible placement of wolfdogs while educating visitors about the behavioral differences and ownership demands associated with wolf content.",
      "Its visitor program is unusually interactive for a rescue but remains tightly supervised. Guided tours introduce guests to ambassador and adoptable animals while senior volunteers explain individual histories, wolfdog behavior and common misconceptions.",
      "Animal participation varies and visitors must follow enclosure, clothing, age and safety rules. Because the facility is volunteer-run and tours are scheduled, confirming an appointment before driving to Montgomery is essential.",
    ],
    managingAuthority: "Texas Wolfdog Project",
    officialUrl: "https://texaswolfdogproject.org/support/visit-the-shelter",
  }),
  sanctuary({
    slug: "tiger-creek-animal-sanctuary",
    name: "Tiger Creek Animal Sanctuary",
    summary: "Tiger Creek Animal Sanctuary near Tyler is a nonprofit rescue, rehabilitation and conservation facility known for rescued big cats and other animals, with public educational tours offered by advance booking during its visitor season.",
    region: "piney-woods",
    nearestTown: "Tyler",
    county: "Smith County",
    coordinates: { lat: 32.46, lng: -95.3 },
    address: "17552 FM 14, Tyler, TX 75706",
    bestSeason: "Public tours operate during the sanctuary's visitor season, generally March through October; spring and fall offer milder East Texas weather.",
    entryNote: "Current public tours are by appointment and tickets are sold online. The sanctuary closes seasonally for part of the year, so verify dates and reserve before traveling.",
    highlights: ["Rescued tigers and lions", "Advance-booked public tours", "Native wildlife rehabilitation", "Conservation and education programs"],
    body: [
      "Tiger Creek has operated in East Texas since the 1990s with a mission centered on rescue, rehabilitation, conservation and education. Its work includes lifelong care for non-releasable animals as well as rehabilitation efforts for native wildlife when release is possible.",
      "The public experience is built around scheduled educational tours rather than casual drop-in access. Visitors can learn about rescued big cats, animal care and the conservation challenges facing threatened and endangered species.",
      "Tour availability is seasonal and must be booked in advance. Guests should use the current visitor calendar rather than relying on older hours found elsewhere online, especially around the sanctuary's winter closure period.",
    ],
    managingAuthority: "Tiger Creek Animal Sanctuary",
    officialUrl: "https://www.tigercreek.org/visit",
  }),
  sanctuary({
    slug: "heard-natural-science-museum-wildlife-sanctuary",
    name: "Heard Natural Science Museum & Wildlife Sanctuary",
    summary: "The Heard in McKinney combines a natural science museum with a 289-acre wildlife sanctuary, nature trails, native habitat restoration, birding and an animal encounter trail featuring animals that cannot be released to the wild.",
    region: "prairies-lakes",
    nearestTown: "McKinney",
    county: "Collin County",
    coordinates: { lat: 33.15, lng: -96.61 },
    address: "1 Nature Place, McKinney, TX 75069",
    bestSeason: "Open most of the year; spring wildflowers and spring/fall migration are especially strong for trail walking and birding.",
    entryNote: "General admission provides access to the museum and sanctuary trail system during posted hours. Seasonal programs and weather can affect individual trails or activities, so check the current visitor page before arrival.",
    highlights: ["289-acre wildlife sanctuary", "Nature trails and wetlands", "Animal Encounter Trail", "Birding and Blackland Prairie habitat"],
    body: [
      "The Heard was founded to preserve a place where North Texans could experience native landscapes as the Dallas-Fort Worth region expanded. Its sanctuary protects forest, wetland and restored Blackland Prairie habitats alongside a natural science museum and environmental education programs.",
      "Visitors can explore the trail network, watch birds and other native wildlife, and use the Animal Encounter Trail to learn about resident animals that cannot safely return to the wild. Museum exhibits provide additional context on North Texas ecology, fossils and natural history.",
      "The sanctuary is a strong year-round nature destination, but spring wildflowers and migration periods add particular interest. Visitors should check current hours, trail notices and program schedules before traveling.",
    ],
    managingAuthority: "Heard Natural Science Museum & Wildlife Sanctuary",
    officialUrl: "https://www.heardmuseum.org/",
  }),
];
