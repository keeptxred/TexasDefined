import type { Destination, DestinationAreaGuide } from "./types";

const guides: Record<string, DestinationAreaGuide> = {
  "wonder-world-cave": {
    intro: "Wonder World Cave is easiest to build into a San Marcos day. Pair the cave with Spring Lake and the San Marcos River, then use downtown San Marcos for food and lodging so the trip does not become a sequence of long drives.",
    nearbyAttractions: [
      { name: "San Marcos Springs at Spring Lake", description: "The headwaters of the San Marcos River add a spring-fed outdoor stop and a strong geology-and-water pairing after the cave.", proximity: "About 3 miles north-east", href: "/destination/san-marcos-springs-spring-lake" },
    ],
    foodAndDrink: [
      { name: "Downtown San Marcos", description: "The courthouse-square and university-adjacent core has the broadest concentration of local restaurants, coffee and casual food close to the cave.", proximity: "A few minutes away" },
    ],
    lodging: [
      { name: "Central San Marcos", description: "Staying near downtown or the interstate keeps both Wonder World Cave and Spring Lake within a short drive.", proximity: "San Marcos" },
    ],
    neighborhoods: [
      { name: "Downtown and Texas State University area", description: "Walkable blocks, local businesses and the university give the cave visit a stronger sense of place than treating it as an isolated roadside attraction.", proximity: "Central San Marcos" },
    ],
    familyStops: [
      { name: "Spring Lake", description: "Glass-bottom-boat and nature-center experiences make a practical family complement to the underground cave tour.", proximity: "North San Marcos", href: "/destination/san-marcos-springs-spring-lake" },
    ],
    sideTrips: [
      { name: "Gruene Historic District", description: "Historic Gruene adds shops, river-country atmosphere and a different kind of Central Texas stop on a longer day.", proximity: "About 18 miles south-west", href: "/destination/gruene-historic-district" },
    ],
  },
  "gorman-cave": {
    intro: "Gorman Cave should be planned as part of a Colorado Bend State Park day, not as a stand-alone cave-entry trip. The River Trail cave view, Gorman Falls, the Colorado River and the park's other designated cave experiences all belong to the same itinerary.",
    nearbyAttractions: [
      { name: "Colorado Bend State Park", description: "The cave sits inside the park, so the broader state-park page is the main planning hub for trails, Gorman Falls, river access and current alerts.", proximity: "Same park", href: "/destination/colorado-bend-state-park" },
    ],
    foodAndDrink: [
      { name: "Bend and Lampasas-area supplies", description: "Services near the park are limited. Bring food and water, and treat larger nearby towns as supply stops rather than expecting a dense restaurant district at the trailhead.", proximity: "Plan before entering the park" },
    ],
    lodging: [
      { name: "Colorado Bend camping or Lampasas-area lodging", description: "Camping keeps you inside the park; conventional lodging is easier to find farther out in the Lampasas area.", proximity: "Park or regional base" },
    ],
    neighborhoods: [
      { name: "Colorado River corridor", description: "The river, springs, limestone terrain and cave systems are the real geographic context here rather than an urban neighborhood.", proximity: "Inside Colorado Bend State Park" },
    ],
    familyStops: [
      { name: "Gorman Falls route", description: "For families able to handle the hike, the travertine waterfall is the park's signature above-ground counterpart to the protected cave landscape.", proximity: "Inside the park", href: "/destination/colorado-bend-state-park" },
    ],
    sideTrips: [
      { name: "Longhorn Cavern State Park", description: "A developed guided show-cave experience provides a useful contrast with Gorman Cave's protected, limited-access habitat model.", proximity: "Highland Lakes region", href: "/destination/longhorn-cavern-state-park" },
    ],
  },
  "westcave-preserve": {
    intro: "Westcave Preserve works best as part of a western Travis County and eastern Hill Country route. Its reservation-only canyon hike pairs naturally with Hamilton Pool and Pedernales Falls, but each site has separate access rules that should be checked before the day is built.",
    nearbyAttractions: [
      { name: "Hamilton Pool Preserve", description: "A nearby Travis County preserve with its own reservation system, limestone grotto and spring-fed landscape.", proximity: "About 4 miles east", href: "/destination/hamilton-pool-preserve" },
      { name: "Pedernales Falls State Park", description: "A larger state-park landscape adds river overlooks, trails and a very different scale of Hill Country geology.", proximity: "About 20 miles west", href: "/destination/pedernales-falls-state-park" },
    ],
    foodAndDrink: [
      { name: "Dripping Springs corridor", description: "Dripping Springs has the strongest nearby concentration of restaurants, coffee, breweries and wineries for building a meal around a preserve reservation.", proximity: "East of the preserve" },
    ],
    lodging: [
      { name: "Dripping Springs and western Austin", description: "Dripping Springs keeps the preserve close, while western Austin provides a larger lodging inventory for travelers combining nature stops with city time.", proximity: "Regional base" },
    ],
    neighborhoods: [
      { name: "Hamilton Pool Road corridor", description: "This rural Hill Country corridor connects preserves, ranchland and destination dining between Austin and the Pedernales River country.", proximity: "Immediate area" },
    ],
    familyStops: [
      { name: "Hamilton Pool Preserve", description: "For families comfortable with trail requirements and reservation rules, Hamilton Pool adds another dramatic limestone-and-water landscape nearby.", proximity: "Nearby", href: "/destination/hamilton-pool-preserve" },
    ],
    sideTrips: [
      { name: "Pedernales Falls State Park", description: "Extend the day west for broader river scenery and hiking, especially when the Westcave tour is only one part of the itinerary.", proximity: "West on the same Hill Country route", href: "/destination/pedernales-falls-state-park" },
    ],
  },
};

export function enrichCavernAreaGuide(destination: Destination): Destination {
  if (destination.category !== "caverns" || destination.areaGuide) return destination;
  const areaGuide = guides[destination.slug];
  return areaGuide ? { ...destination, areaGuide } : destination;
}
