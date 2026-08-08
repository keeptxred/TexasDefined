import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "san-antonio-river-walk": {
    summary: "San Antonio's signature pedestrian corridor, following the river below downtown streets past historic bridges, restaurants, public art and connections toward the city's mission landscape.",
    nearestTown: "San Antonio",
    bestSeason: "Fall through spring for comfortable walking; evenings are especially atmospheric year-round",
    entryNote: "The central River Walk is free to enter. Boat cruises, museums and attractions along the route charge separately, and major holidays can bring heavy crowds.",
    highlights: ["Downtown river promenade", "Historic bridges and public art", "River cruises", "Connections to the Museum Reach and Mission Reach"],
    body: [
      "The San Antonio River Walk works best as a district rather than a single attraction. The downtown loop is the most famous section, but the river corridor extends north toward museums and south toward neighborhoods and the missions.",
      "Walking reveals details easy to miss from street level: stone bridges, landscaped bends, public art and architecture layered across different eras of the city.",
      "Crowds peak around weekends, conventions and holidays. Start early for quieter photographs, return after dark for the lights, and use the river as a spine for a broader downtown itinerary rather than trying to see everything in one pass."
    ],
    officialUrl: "https://www.thesanantonioriverwalk.com/"
  },
  "dallas-arboretum-and-botanical-garden": {
    summary: "A 66-acre garden on White Rock Lake combining formal landscapes, seasonal displays, shaded paths and broad lake views just east of downtown Dallas.",
    nearestTown: "Dallas",
    bestSeason: "Spring for azaleas and flowering displays; fall for cooler weather and seasonal gardens",
    entryNote: "Timed admission and parking can sell out during major seasonal events. Check current ticketing and event information before arrival.",
    highlights: ["Seasonal flower displays", "White Rock Lake views", "Formal and family gardens", "Major spring and autumn festivals"],
    body: [
      "The Dallas Arboretum is one of the city's strongest outdoor attractions because the gardens are designed to change noticeably with the season rather than look the same all year.",
      "Paths move through formal plantings, lawns, shaded garden rooms and lake overlooks, with enough variety to fill several hours without feeling repetitive.",
      "Spring and fall events draw substantial crowds, so reserve tickets and parking early when visiting during headline displays. Summer visits are most comfortable in the morning before heat builds."
    ],
    officialUrl: "https://www.dallasarboretum.org/"
  },
  "fort-worth-botanic-garden": {
    summary: "Texas' oldest major botanic garden, with Japanese, rose, native and conservatory collections spread across a large cultural-district landscape in Fort Worth.",
    nearestTown: "Fort Worth",
    bestSeason: "Spring and fall for comfortable walking and peak garden color",
    entryNote: "Admission policies vary by garden area and event. Check current hours, ticketing and conservatory access before visiting.",
    highlights: ["Japanese Garden", "Rose Garden", "Native and seasonal plant collections", "Cultural District location"],
    body: [
      "Fort Worth Botanic Garden rewards visitors who treat it as several distinct landscapes rather than one continuous flower bed. The Japanese Garden, rose areas, native plantings and conservatory each create a different pace and atmosphere.",
      "Its location in the Cultural District makes the garden easy to pair with nearby museums, but a rushed museum-and-garden sprint undersells both.",
      "Allow at least a few hours, wear comfortable shoes and check seasonal closures or event schedules before arrival. Morning and late-afternoon visits are best in warmer months."
    ],
    officialUrl: "https://fwbg.org/"
  },
  "fort-worth-zoo": {
    summary: "One of Texas' flagship zoos, combining large animal habitats, major conservation programs and family-focused exhibits near the Trinity River south of downtown Fort Worth.",
    nearestTown: "Fort Worth",
    bestSeason: "Fall through spring; arrive early during hot months when animals are often more active",
    entryNote: "Weekends, school breaks and special events can be crowded. Check current admission, parking and exhibit notices before arrival.",
    highlights: ["Texas Wild!", "Predators and African species", "Conservation-focused exhibits", "Family-friendly full-day layout"],
    body: [
      "The Fort Worth Zoo is large enough to justify planning rather than casual wandering. Major habitat zones are spread across a substantial site, and seeing everything can take most of a day.",
      "The zoo's strongest sections combine animal viewing with regional or ecological storytelling, including Texas-focused exhibits and large habitat complexes.",
      "Arrive near opening for cooler temperatures, lighter crowds and better chances of active animals. Review the day's keeper talks, construction notices and habitat closures before choosing your route."
    ],
    officialUrl: "https://www.fortworthzoo.org/"
  },
  "houston-zoo": {
    summary: "A major conservation-focused zoo inside Hermann Park, pairing more than a century of Houston history with modern habitats, family exhibits and easy access to the Museum District.",
    nearestTown: "Houston",
    bestSeason: "Fall through spring; summer visits are best early in the morning",
    entryNote: "Timed tickets are commonly used and parking around Hermann Park can fill quickly. Check current admission and transit options before visiting.",
    highlights: ["Galápagos Islands exhibit", "African Forest", "Texas Wetlands", "Hermann Park and Museum District location"],
    body: [
      "Houston Zoo sits in the middle of one of the city's densest visitor districts, making it easy to combine with Hermann Park, the Museum of Natural Science and other nearby museums.",
      "Modern habitat areas emphasize conservation and ecosystem context rather than rows of isolated enclosures, with the Galápagos complex among the most distinctive recent additions.",
      "Houston heat changes the experience considerably. Visit near opening in warm months, reserve admission ahead and consider METRORail or other transit when parking demand is high."
    ],
    officialUrl: "https://www.houstonzoo.org/"
  },
  "lady-bird-johnson-wildflower-center": {
    summary: "The University of Texas' native-plant garden and research center in South Austin, showcasing Texas wildflowers, ecological landscapes, trails and sustainable garden design.",
    nearestTown: "Austin",
    bestSeason: "March through May for spring wildflowers; fall for comfortable trails and native grasses",
    entryNote: "Bloom timing varies with rainfall and temperature. Check current garden conditions, admission and event information before making a flower-focused trip.",
    highlights: ["Texas native-plant gardens", "Seasonal wildflowers", "Nature trails", "Sustainable landscape design"],
    body: [
      "The Wildflower Center is more than a spring bluebonnet stop. Its gardens demonstrate how native Texas plants work across prairie, woodland, meadow and designed landscapes throughout the year.",
      "Trails extend beyond the formal gardens, while interpretation connects plant beauty with water conservation, habitat and ecological restoration.",
      "Spring bloom is weather-dependent, so avoid assuming a specific flower will peak on a fixed calendar date. Check current conditions and visit early in the day during warm weather."
    ],
    officialUrl: "https://www.wildflower.org/"
  }
};

export function applyCuratedDestinationBatch47(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}
