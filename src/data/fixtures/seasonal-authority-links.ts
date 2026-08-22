import { articleInternalLinks } from "../article-internal-links";
import type { ArticleInternalLink } from "../types";

const lighthouseHub: ArticleInternalLink = {
  href: "/explore/lighthouses",
  label: "Explore the Texas lighthouse map",
  description: "See surviving and relocated lights on a sourced Gulf Coast map, check access status and jump into the relevant county guides.",
};

const bluebonnetHub: ArticleInternalLink = {
  href: "/article/texas-bluebonnets-complete-guide",
  label: "Texas bluebonnet season, explained",
  description: "Use the statewide guide for bloom timing, regions, etiquette, state-flower history and trip planning.",
};

const christmasHub: ArticleInternalLink = {
  href: "/article/christmas-in-texas-complete-guide",
  label: "The complete Christmas in Texas guide",
  description: "Compare holiday towns, lights, train rides, free events, coastal trips and Hill Country weekends.",
};

const fallHub: ArticleInternalLink = {
  href: "/article/fall-in-texas-complete-guide",
  label: "Where autumn shows up in Texas",
  description: "Use the statewide fall guide for timing, regions, parks, foliage reports and road trips.",
};

const additions: Record<string, ArticleInternalLink[]> = {
  "texas-lighthouses-complete-guide": [
    lighthouseHub,
    { href: "/article/texas-lighthouse-road-trip", label: "Drive the Texas Lighthouse Trail", description: "Turn the maritime history into a coast-spanning itinerary from Sabine Pass to Port Isabel." },
    { href: "/article/lost-lighthouses-of-texas", label: "Find the lost lighthouses", description: "Trace lights that vanished, moved or became obsolete as Texas ports and channels changed." },
    { href: "/article/point-bolivar-lighthouse-history", label: "Point Bolivar Lighthouse", description: "Go deeper on the black tower guarding the Galveston Bay entrance." },
    { href: "/article/lydia-ann-lighthouse-port-aransas", label: "Lydia Ann Lighthouse", description: "Follow the Aransas Pass light through Civil War damage and modern private navigation use." },
    { href: "/article/matagorda-island-lighthouse-history", label: "Matagorda Island Lighthouse", description: "Explore the remote cast-iron tower on the middle coast." },
  ],
  "texas-lighthouse-road-trip": [
    lighthouseHub,
    { href: "/article/texas-lighthouses-complete-guide", label: "Read the complete lighthouse history", description: "Know which towers survive, why they were built and what happened to the rest." },
  ],
  "port-isabel-lighthouse-guide": [
    lighthouseHub,
    { href: "/article/texas-lighthouses-complete-guide", label: "Put Port Isabel on the statewide lighthouse map", description: "Compare the lower-coast survivor with Bolivar, Matagorda, Lydia Ann and the lost Texas lights." },
    { href: "/county/cameron", label: "Explore Cameron County", description: "Connect the lighthouse with Brownsville, South Padre Island, Boca Chica and lower Rio Grande history." },
  ],
  "lost-lighthouses-of-texas": [
    lighthouseHub,
    { href: "/article/texas-lighthouses-complete-guide", label: "Compare the lost lights with the survivors", description: "Return to the full coastwide lighthouse guide and surviving towers." },
  ],

  "texas-bluebonnets-complete-guide": [
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Best places to see bluebonnets", description: "Compare the major viewing regions from Ennis and Brenham to the Highland Lakes and Big Bend." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Texas bluebonnet road trip", description: "Turn bloom reports into a flexible spring itinerary." },
    { href: "/article/texas-bluebonnet-festivals", label: "Texas bluebonnet festivals", description: "Pair flower viewing with Ennis, Burnet, Chappell Hill and other spring traditions." },
    { href: "/article/is-it-illegal-to-pick-bluebonnets-in-texas", label: "Is it illegal to pick bluebonnets?", description: "Separate the statewide myth from private-property, park and roadside rules." },
    { href: "/article/bluebonnets-near-austin", label: "Bluebonnets near Austin", description: "Plan around Lake Travis, the Highland Lakes and Hill Country options." },
    { href: "/article/bluebonnets-near-houston", label: "Bluebonnets near Houston", description: "Use Washington County and Brenham as the primary west-of-Houston strategy." },
    { href: "/article/bluebonnets-near-dallas-fort-worth", label: "Bluebonnets near Dallas–Fort Worth", description: "Use Ennis and North Texas' later bloom window." },
    { href: "/article/bluebonnets-near-san-antonio", label: "Bluebonnets near San Antonio", description: "Compare South Texas and Hill Country directions." },
  ],
  "best-places-to-see-bluebonnets-in-texas": [
    bluebonnetHub,
    { href: "/article/bluebonnets-near-austin", label: "Austin-area viewing", description: "Narrow the statewide list to Austin and the Hill Country." },
    { href: "/article/bluebonnets-near-houston", label: "Houston-area viewing", description: "Focus on Brenham, Chappell Hill and Washington County." },
    { href: "/article/bluebonnets-near-dallas-fort-worth", label: "Dallas–Fort Worth viewing", description: "Use Ennis trails and North Texas timing." },
    { href: "/article/bluebonnets-near-san-antonio", label: "San Antonio-area viewing", description: "Explore the South Texas–Hill Country transition." },
  ],
  "texas-bluebonnet-road-trip": [bluebonnetHub, { href: "/article/texas-bluebonnet-festivals", label: "Add a bluebonnet festival", description: "Use a festival as a dependable spring anchor even when bloom timing shifts." }],
  "texas-bluebonnet-festivals": [bluebonnetHub, { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Find the flower regions behind the festivals", description: "Separate fixed event dates from weather-driven bloom timing." }],
  "is-it-illegal-to-pick-bluebonnets-in-texas": [bluebonnetHub, { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Choose better public viewing locations", description: "Avoid questionable roadside and private-property access." }],
  "bluebonnets-near-austin": [bluebonnetHub, { href: "/article/texas-bluebonnet-road-trip", label: "Extend into a full spring road trip", description: "Continue from Austin toward the Highland Lakes and Washington County." }],
  "bluebonnets-near-houston": [bluebonnetHub, { href: "/article/texas-bluebonnet-road-trip", label: "Continue west from Washington County", description: "Build Brenham into a longer bluebonnet loop." }],
  "bluebonnets-near-dallas-fort-worth": [bluebonnetHub, { href: "/article/texas-bluebonnet-festivals", label: "Pair Ennis trails with festival weekend", description: "Use official event schedules alongside current bloom reports." }],
  "bluebonnets-near-san-antonio": [bluebonnetHub, { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Compare South Texas with the Hill Country", description: "Follow the bloom north as the season progresses." }],
  "bluebonnet-season-field-guide": [
    bluebonnetHub,
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Where to see bluebonnets across Texas", description: "Compare Ennis, Washington County, the Highland Lakes, Willow City, Lake Travis and Big Bend." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Plan a Texas bluebonnet road trip", description: "Build a flexible spring route with enough backup stops for an unpredictable bloom year." },
  ],
  "texas-wildflowers-guide": [
    bluebonnetHub,
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "The strongest bluebonnet regions", description: "Use a statewide shortlist when spring color is the main reason for the trip." },
  ],

  "christmas-in-texas-complete-guide": [
    { href: "/article/best-christmas-towns-in-texas", label: "Best Christmas towns in Texas", description: "Compare places where the whole community becomes part of the holiday experience." },
    { href: "/article/best-christmas-lights-in-texas", label: "Best Christmas lights in Texas", description: "Find destination-worthy river, courthouse-square and downtown light displays." },
    { href: "/article/texas-christmas-train-rides", label: "Christmas train rides in Texas", description: "Plan around established railroads and high-demand family experiences." },
    { href: "/article/free-christmas-events-in-texas", label: "Free Christmas events", description: "Anchor a holiday trip with public lights, squares and community traditions." },
    { href: "/article/texas-christmas-road-trip", label: "Hill Country Christmas road trip", description: "Connect Fredericksburg, Johnson City and Marble Falls." },
  ],
  "best-christmas-towns-in-texas": [christmasHub, { href: "/article/best-christmas-lights-in-texas", label: "Compare the strongest holiday light displays", description: "Choose towns where the setting makes the lights distinctive." }],
  "best-christmas-lights-in-texas": [christmasHub, { href: "/article/free-christmas-events-in-texas", label: "Find free holiday-light options", description: "Balance ticketed attractions with public traditions." }],
  "texas-christmas-train-rides": [christmasHub, { href: "/article/best-christmas-towns-in-texas", label: "Build a town weekend around the train", description: "Make the destination worth visiting before and after the ride." }],
  "free-christmas-events-in-texas": [christmasHub, { href: "/article/best-christmas-lights-in-texas", label: "Start with public holiday lights", description: "Use free displays as the anchor for a lower-cost trip." }],
  "texas-christmas-road-trip": [christmasHub, { href: "/article/best-christmas-lights-in-texas", label: "Add the strongest Hill Country light displays", description: "Time the route around current seasonal schedules." }],

  "fall-in-texas-complete-guide": [
    { href: "/article/best-places-for-fall-colors-in-texas", label: "Best places for fall color", description: "Compare the strongest statewide foliage destinations." },
    { href: "/article/east-texas-fall-colors", label: "East Texas fall colors", description: "Explore the Piney Woods, Caddo Lake, Daingerfield, Tyler and Lake Bob Sandlin." },
    { href: "/article/hill-country-fall-colors", label: "Hill Country fall colors", description: "Follow Lost Maples, the Frio and Guadalupe river corridors." },
    { href: "/article/best-texas-state-parks-for-fall-colors", label: "Best state parks for fall", description: "Choose public parks by tree type, region and scenery." },
    { href: "/article/texas-fall-foliage-road-trip", label: "Texas fall foliage road trip", description: "Turn current color reports into a flexible multi-day itinerary." },
  ],
  "best-places-for-fall-colors-in-texas": [fallHub, { href: "/article/east-texas-fall-colors", label: "Go deeper into East Texas", description: "Use the Piney Woods when broader forest color is the priority." }, { href: "/article/hill-country-fall-colors", label: "Go deeper into the Hill Country", description: "Focus on maples, cypress and river corridors." }],
  "east-texas-fall-colors": [fallHub, { href: "/article/caddo-lake-cypress-morning", label: "See Caddo Lake from the water", description: "Turn an East Texas foliage trip into a bayou and cypress experience." }],
  "hill-country-fall-colors": [fallHub, { href: "/article/texas-fall-foliage-road-trip", label: "Drive the Hill Country fall route", description: "Link Garner, Lost Maples and the Guadalupe corridor." }],
  "best-texas-state-parks-for-fall-colors": [fallHub, { href: "/explore/state-parks", label: "Browse all Texas state parks", description: "Add camping, hiking and nearby parks to the foliage trip." }],
  "texas-fall-foliage-road-trip": [fallHub, { href: "/article/best-texas-state-parks-for-fall-colors", label: "Compare state-park foliage stops", description: "Swap route stops based on current reports and reservations." }],

  "hill-country-two-lane-loop": [
    { href: "/article/texas-bluebonnet-road-trip", label: "Drive the loop during bluebonnet season", description: "Shift the route toward Brenham, the Highland Lakes and current spring bloom reports." },
    { href: "/article/texas-christmas-road-trip", label: "Return for a Hill Country Christmas", description: "Use Fredericksburg, Johnson City and Marble Falls for a compact December loop." },
    { href: "/article/texas-fall-foliage-road-trip", label: "Follow fall color through the Hill Country", description: "Build an autumn route around the Frio, Lost Maples and the Guadalupe corridor." },
  ],
  "caddo-lake-cypress-morning": [
    fallHub,
    { href: "/article/best-places-for-fall-colors-in-texas", label: "Texas fall-color destinations", description: "Compare Caddo with Lost Maples, Garner, Daingerfield, Lake Bob Sandlin and the Guadalupe." },
    { href: "/article/east-texas-fall-colors", label: "East Texas fall guide", description: "Build a wider Piney Woods itinerary around Caddo Lake." },
  ],
  "cameron-county-brownsville-harlingen-south-padre-rio-grande-texas": [
    lighthouseHub,
    { href: "/article/port-isabel-lighthouse-guide", label: "Port Isabel Lighthouse", description: "Visit the historic lower-coast lighthouse and connect it to Cameron County's shipping and military history." },
    { href: "/article/texas-lighthouses-complete-guide", label: "Texas lighthouses from Sabine to Port Isabel", description: "Place Cameron County's lighthouse story inside the full Gulf Coast network." },
    { href: "/article/texas-lighthouse-road-trip", label: "The Texas Lighthouse Trail", description: "Follow maritime history down the coast and finish in Port Isabel." },
  ],
  "texas-us-mexican-war-palo-alto-guide": [
    { href: "/article/port-isabel-lighthouse-guide", label: "Port Isabel Lighthouse and the military supply coast", description: "Continue south to the lighthouse site whose Point Isabel setting was tied to military traffic and Gulf shipping." },
  ],
};

for (const [slug, links] of Object.entries(additions)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...links.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
