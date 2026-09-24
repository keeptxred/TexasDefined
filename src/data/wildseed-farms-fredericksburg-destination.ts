import type { Destination } from "./types";

const CHECKED = "2026-09-24";

export const wildseedFarmsFredericksburgDestinations: Destination[] = [
  {
    id: "attraction-wildseed-farms-fredericksburg",
    brandId: "texasdefined",
    slug: "wildseed-farms-fredericksburg",
    name: "Wildseed Farms",
    summary:
      "Wildseed Farms east of Fredericksburg is a working Hill Country wildflower farm and vineyard with more than 200 acres of wildflower fields, accessible walking trails, butterfly gardens, a nursery, seed and gift shopping, casual food and an onsite Texas-wine tasting room.",
    category: "outdoors",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["gillespie"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Fredericksburg",
    county: "Gillespie",
    coordinates: { lat: 30.222862, lng: -98.767694 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Part%20the%20Wildseed%20Farms%20wildflower%20farm%20complex%20in%20Fredericksburg%2C%20Texas%20LCCN2014633182.tif?width=1600",
      alt: "Wildseed Farms wildflower farm complex near Fredericksburg, Texas",
      width: 1600,
      height: 1068,
      credit: "Carol M. Highsmith · Library of Congress · no known restrictions on publication",
    },
    bestSeason:
      "Spring and early summer are the strongest periods for broad wildflower displays, while fall is important for seed planting and the nursery, and the market, gardens, food and wine components make the farm useful beyond peak bloom season.",
    entryNote:
      "The farm currently publishes daily visitor hours and notes that a trail-entry fee may be charged during peak bloom periods. Bloom timing, tasting-room hours, food service and trail access can change, so check the live farm pages before making a flower-focused trip.",
    highlights: [
      "More than 200 acres of wildflower fields at the Hill Country headquarters",
      "Half-mile walking trail through production crops and gardens",
      "Wide wheelchair-accessible paths",
      "Butterfly gardens, water features and seasonal trial plots",
      "Working vineyard and onsite Texas-wine tasting room",
      "Plant nursery, pottery, seeds, gifts and home decor",
      "Brewbonnet food and drink stop",
      "Family-friendly alternative to an all-winery Fredericksburg itinerary",
    ],
    body: [
      "Wildseed Farms works as a real attraction because the flower fields are part of a working agricultural business rather than a decorative garden planted only for visitors. The Fredericksburg visitor bureau describes more than 200 acres of wildflower fields at the Hill Country headquarters, while the farm's own visitor material centers production fields, gardens, vineyard blocks, seed sales and plant growing. That agricultural layer gives the stop a different purpose from a roadside photo field.",
      "The public walking experience is deliberately low-commitment. Wildseed Farms says its butterfly gardens are surrounded by about a half mile of walking trails through the production crops, with vineyard blocks visible along the route. The paths are wide and wheelchair accessible, and the farm also calls out water features, trial plots and seasonal garden areas. Visitors should still expect the landscape to change with weather and bloom cycles rather than assuming every field will be at peak color.",
      "The farm is also a substantial shopping and food stop. Its market and gift areas sell wildflower seed, home and garden items, specialty foods and gifts, while the nursery carries native and adaptive plants plus pottery and gardening products. That makes Wildseed useful in seasons when flower displays are modest: gardeners and plant shoppers can still spend meaningful time on the property without relying on a single bloom window.",
      "Wine has become another layer of the property rather than the entire identity. Wildseed Farms says grape planting began in 2015 and that its current wines use 100% Texas grapes, primarily from estate vineyards. The tasting room can therefore fit naturally into a Fredericksburg wine-country day, but families and travelers who do not drink still have trails, gardens, food, shopping and nursery areas on the same property.",
      "For a broader Fredericksburg trip, Wildseed Farms is easiest to use as the non-winery anchor in an eastern U.S. 290 cluster. It sits along the same general corridor as major tasting properties and is near Fredericksburg Trade Days. A practical half day can pair the farm with one winery, while a family or no-alcohol itinerary can connect Wildseed with Fort Martin Scott, LBJ history, shopping or a later Main Street block without making the day revolve around tasting rooms.",
    ],
    managingAuthority: "Wildseed Farms",
    officialUrl: "https://wildseedfarms.com/",
    address: "100 Legacy Dr, Fredericksburg, TX 78624",
    directions:
      "Wildseed Farms is east of Fredericksburg near the U.S. 290 wine corridor. Use the published 100 Legacy Drive address rather than a generic Fredericksburg wildflower pin.",
    accessibilityNotes:
      "Wildseed Farms states that its public walking trail is wide and wheelchair accessible and can accommodate strollers and wagons. Individual retail, food and tasting areas may have different layouts, so contact the farm if a visit depends on a specific accommodation.",
    sourceCheckedAt: CHECKED,
    areaGuide: {
      intro:
        "Use Wildseed Farms as the farm-and-garden anchor in an eastern Fredericksburg day, then add only the wine, history, market or town stops that fit the group's interests.",
      nearbyAttractions: [
        {
          name: "Fredericksburg",
          description: "Main Street, museums, restaurants, shopping and lodging make town the natural western anchor for the same trip.",
          proximity: "West",
          href: "/destination/fredericksburg",
        },
        {
          name: "Fredericksburg Trade Days",
          description: "The large recurring antiques and vendor market at Sunday Farms is just across the broader eastern corridor and can materially change traffic on market weekends.",
          proximity: "Nearby",
          href: "https://www.visitfredericksburgtx.com/directory/fredericksburg-trade-days/",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description: "Continue east toward Stonewall for presidential, ranch and Pedernales River history.",
          proximity: "East",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      foodAndDrink: [
        {
          name: "Wildseed Farms tasting room",
          description: "The farm currently pours Texas wines and offers structured tasting experiences; use the live page for current hours and formats.",
          proximity: "Onsite",
          href: "https://wildseedfarms.com/pages/tasting-room",
        },
        {
          name: "Brewbonnet",
          description: "The onsite food-and-drink stop gives visitors an easy break without leaving the farm.",
          proximity: "Onsite",
          href: "https://wildseedfarms.com/pages/things-to-do",
        },
        {
          name: "Fredericksburg wine-country guide",
          description: "Compare the broader winery, tasting-room, brewery and distillery network before building an alcohol-focused route.",
          proximity: "Regional",
          href: "/article/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      lodging: [
        {
          name: "Fredericksburg",
          description: "Stay in town for the widest mix of lodging, evening dining, museums, events and walkability.",
          proximity: "West",
          href: "/destination/fredericksburg",
        },
      ],
      neighborhoods: [
        {
          name: "Eastern U.S. 290 corridor",
          description: "A rural visitor corridor where wildflowers, vineyards, farm retail and tasting properties sit between Fredericksburg and Stonewall.",
          proximity: "At the farm",
          href: "/article/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      familyStops: [
        {
          name: "Wildseed walking trail and gardens",
          description: "Accessible paths, butterflies, seasonal flowers and garden areas give mixed-age groups a non-alcohol-focused activity on the property.",
          proximity: "Onsite",
          href: "https://wildseedfarms.com/pages/walking-trails-and-gardens",
        },
        {
          name: "National Museum of the Pacific War",
          description: "A major museum in Fredericksburg that can anchor the indoor/history part of a family itinerary.",
          proximity: "Fredericksburg",
          href: "/destination/national-museum-pacific-war",
        },
      ],
      sideTrips: [
        {
          name: "Stonewall and LBJ country",
          description: "Continue east for orchards, ranch landscapes and state and national historic sites.",
          proximity: "East",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "Gillespie County",
          description: "Use the county guide to connect the farm to peaches, ranching, German settlement, wine and the Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/gillespie",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Wildseed Farms gives Fredericksburg a major farm, garden, nursery and outdoor attraction that stands on its own without wine, while its vineyard and tasting room still connect naturally to the region's wine-country economy.",
      assessment: {
        recommendedVisit:
          "Allow about 1.5 to 2.5 hours for the trail, gardens and shopping; allow longer if adding food, nursery browsing or a wine tasting.",
        physicalEffort: "Low",
        weatherExposure: "Mostly outdoors",
        planningLevel: "Low",
        familyFit:
          "Strong. The walking trail, gardens, nursery, shopping and food make the farm useful for mixed-age groups, though bloom conditions and heat can affect the outdoor experience.",
        firstTimeValue:
          "High for visitors who want a Fredericksburg stop that explains Hill Country wildflowers and working agriculture without requiring a winery-focused itinerary.",
      },
      itineraries: [
        {
          label: "First Wildseed visit",
          duration: "1.5–2.5 hours",
          steps: [
            "Start with the walking trail while weather and light are comfortable.",
            "Browse the gardens, nursery and market after the outdoor loop.",
            "Add food or a tasting only if it fits the group's interests and driving plan.",
          ],
        },
        {
          label: "Family half day",
          duration: "3–4 hours",
          steps: [
            "Give the trail and butterfly gardens the first block.",
            "Use the nursery, seed shop and food stop as a slower middle section.",
            "Return to Fredericksburg for a museum, Marktplatz or an early dinner rather than stacking alcohol-focused stops.",
          ],
        },
        {
          label: "Eastern corridor day",
          duration: "Full day",
          steps: [
            "Start at Wildseed Farms.",
            "Choose one nearby winery or Trade Days when the market is operating.",
            "Continue to Stonewall/LBJ country or return to Fredericksburg for history and dinner.",
          ],
        },
      ],
      sources: [
        {
          label: "Wildseed Farms — Visit the farm",
          url: "https://wildseedfarms.com/pages/visit-farm",
          scope:
            "Current address, visitor hours, gardens, trails, wheelchair-friendly paths, vineyard views and tasting-room context.",
        },
        {
          label: "Wildseed Farms — Walking trails and gardens",
          url: "https://wildseedfarms.com/pages/walking-trails-and-gardens",
          scope:
            "Half-mile trail, butterfly gardens, accessibility, production-crop setting, vineyard blocks and peak-bloom fee notice.",
        },
        {
          label: "Wildseed Farms — Tasting room",
          url: "https://wildseedfarms.com/pages/tasting-room",
          scope:
            "2015 vineyard planting, Texas-grape wine program and current tasting-room positioning.",
        },
        {
          label: "Visit Fredericksburg — Wildseed Farms",
          url: "https://www.visitfredericksburgtx.com/directory/wildseed-farms-venue/",
          scope:
            "More than 1,000 cultivated acres in Texas, 200+ wildflower acres at the Fredericksburg headquarters, visitor amenities and current location.",
        },
        {
          label: "Carol M. Highsmith / Library of Congress — Wildseed Farms",
          url: "https://www.loc.gov/pictures/item/2014633182/",
          scope:
            "Exact-subject 2014 photograph of the Wildseed Farms complex; Library of Congress record reports no known restrictions on publication.",
        },
      ],
    },
    featured: true,
  },
];
