import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function wildlifePlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function wildlifeDestination(
  input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt">,
): Destination {
  return {
    ...input,
    id: `wildlife-destination-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wildlifePlaceholder(input.name),
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * High-value Texas wildlife destinations missing from the preserved catalog.
 * Placeholder heroes intentionally keep these records behind the normal
 * destination SEO-readiness gate until subject-specific licensed imagery is
 * attached.
 */
export const wildlifeDestinationExpansionWave1: Destination[] = [
  wildlifeDestination({
    slug: "fossil-rim-wildlife-center",
    name: "Fossil Rim Wildlife Center",
    summary: "A nonprofit conservation center near Glen Rose where visitors drive through expansive habitats supporting threatened and endangered species, including giraffes, rhinos, cheetahs and other hoofstock and carnivores.",
    region: "prairies-lakes",
    nearestTown: "Glen Rose",
    county: "Somervell County",
    coordinates: { lat: 32.1807, lng: -97.8058 },
    address: "2299 County Road 2008, Glen Rose, TX 76043",
    managingAuthority: "Fossil Rim Wildlife Center",
    bestSeason: "Fall through spring for cooler driving conditions; mornings generally offer the best chance to see active animals year-round.",
    entryNote: "Advance tickets are recommended. Visitors should review current drive rules, seasonal admission hours and vehicle restrictions before arrival; pets are not allowed.",
    highlights: [
      "Drive-through wildlife experience",
      "Threatened and endangered species conservation",
      "Giraffes, rhinos and cheetahs",
      "Animal Discoveries and conservation education",
    ],
    body: [
      "Fossil Rim is a conservation organization first and a visitor attraction second. Its large pastures and specialized facilities support breeding and management programs for threatened and endangered wildlife while giving travelers a rare chance to observe many species from their own vehicle on a long scenic drive.",
      "The experience differs from a traditional zoo because animals occupy broad, open habitats and the visit unfolds along a controlled driving route. Giraffes and hoofstock are among the most visible animals, while carnivore and specialized conservation areas are managed separately for animal welfare and safety.",
      "A visit requires more planning than a quick roadside stop. Admission windows, last-vehicle times and road rules change seasonally, and the center recommends morning visits for animal activity. Travelers should purchase or confirm tickets before driving to the rural Glen Rose entrance.",
    ],
    officialUrl: "https://fossilrim.org/",
  }),
  wildlifeDestination({
    slug: "armand-bayou-nature-center",
    name: "Armand Bayou Nature Center",
    summary: "A nonprofit nature center southeast of Houston preserving coastal prairie, forest and wetland habitat along Armand Bayou, with trails, wildlife viewing, guided paddling, pontoon trips and environmental education.",
    region: "gulf-coast",
    nearestTown: "Pasadena",
    county: "Harris County",
    coordinates: { lat: 29.5998, lng: -95.0716 },
    address: "8500 Bay Area Blvd, Pasadena, TX 77507",
    managingAuthority: "Armand Bayou Nature Center",
    bestSeason: "Fall through spring for cooler hiking and birding; early mornings are productive year-round for wildlife observation.",
    entryNote: "The center is closed Monday and Tuesday under its current schedule. Admission is charged, pets are not allowed, and some guided kayak, pontoon and night programs require separate reservations.",
    highlights: [
      "Coastal prairie and wetland habitat",
      "Self-guided nature trails",
      "Guided kayak and pontoon programs",
      "Birding and native Gulf Coast wildlife",
    ],
    body: [
      "Armand Bayou Nature Center protects one of the Houston region's most important remaining natural landscapes, where coastal prairie, bottomland forest, wetlands and bayou habitat meet within a heavily developed metropolitan area.",
      "Visitors can explore on foot through a network of nature trails or reserve guided experiences that reach farther into the bayou system. Birding, reptiles, mammals, wetland wildlife and seasonal wildflowers make the center useful for both first-time nature travelers and repeat local visits.",
      "Because the property is managed for conservation and education, visitor rules are more restrictive than at a general city park. Travelers should confirm current admission hours and reserve limited-capacity programs before arrival, especially on weekends and during special events.",
    ],
    officialUrl: "https://www.abnc.org/",
  }),
  wildlifeDestination({
    slug: "baytown-nature-center",
    name: "Baytown Nature Center",
    summary: "A 500-acre peninsula east of Houston with roughly seven miles of trails, tidal marshes, wetlands, fishing piers and habitat used by more than 300 resident and migratory bird species.",
    region: "gulf-coast",
    nearestTown: "Baytown",
    county: "Harris County",
    coordinates: { lat: 29.75485, lng: -95.03547 },
    address: "6213 Bayway Drive, Baytown, TX 77520",
    managingAuthority: "City of Baytown Parks and Recreation",
    bestSeason: "Fall and spring for migration; winter for waterbirds; dawn and dusk provide strong wildlife-viewing conditions throughout the year.",
    entryNote: "The center is open daily except Thanksgiving, Christmas and extreme-weather closures. A modest admission fee applies; pets, drones and overnight camping are prohibited.",
    highlights: [
      "Great Texas Coastal Birding Trail site",
      "More than 300 recorded bird species",
      "Seven miles of trails and wetland habitat",
      "Fishing piers, overlooks and butterfly garden",
    ],
    body: [
      "Baytown Nature Center occupies a peninsula surrounded by Burnet, Crystal and Scott bays. Hardwood uplands, tidal marsh and freshwater wetlands now cover land that once held the Brownwood residential subdivision, turning a flood-prone neighborhood into a major public nature and recreation site.",
      "The center is especially valuable for birding because its coastal position provides feeding, nesting and migration habitat for hundreds of species. Trails, overlooks and shoreline access also create opportunities to see butterflies, reptiles, aquatic life and other native Gulf Coast wildlife without leaving the Houston metro area.",
      "The site combines conservation with accessible recreation, including fishing, biking, hiking, photography and family nature areas. Visitors should still check weather before traveling because exposed coastal conditions and extreme storms can affect access and operating status.",
    ],
    officialUrl: "https://baytown.org/708/Baytown-Nature-Center",
  }),
];
