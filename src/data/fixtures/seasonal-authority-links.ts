import { articleInternalLinks } from "../article-internal-links";
import type { ArticleInternalLink } from "../types";

const lighthouseHub: ArticleInternalLink = {
  href: "/explore/lighthouses",
  label: "Explore the Texas lighthouse map",
  description: "See surviving and relocated lights on a sourced Gulf Coast map, check access status and jump into the relevant county guides.",
};

const additions: Record<string, ArticleInternalLink[]> = {
  "texas-lighthouses-complete-guide": [
    lighthouseHub,
    { href: "/article/texas-lighthouse-road-trip", label: "Drive the Texas Lighthouse Trail", description: "Turn the maritime history into a coast-spanning itinerary from Sabine Pass to Port Isabel." },
    { href: "/article/lost-lighthouses-of-texas", label: "Find the lost lighthouses", description: "Trace lights that vanished, moved or became obsolete as Texas ports and channels changed." },
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
  "bluebonnet-season-field-guide": [
    { href: "/article/texas-bluebonnets-complete-guide", label: "The complete Texas bluebonnet guide", description: "Go deeper on bloom timing, state-flower history, etiquette, regions and current-season planning." },
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "Where to see bluebonnets across Texas", description: "Compare Ennis, Washington County, the Highland Lakes, Willow City, Lake Travis and Big Bend." },
    { href: "/article/texas-bluebonnet-road-trip", label: "Plan a Texas bluebonnet road trip", description: "Build a flexible spring route with enough backup stops for an unpredictable bloom year." },
  ],
  "texas-wildflowers-guide": [
    { href: "/article/texas-bluebonnets-complete-guide", label: "Bluebonnet season, explained", description: "Zoom in on Texas' state flower with bloom timing, viewing regions, etiquette and trip planning." },
    { href: "/article/best-places-to-see-bluebonnets-in-texas", label: "The strongest bluebonnet regions", description: "Use a statewide shortlist when spring color is the main reason for the trip." },
  ],
  "hill-country-two-lane-loop": [
    { href: "/article/texas-bluebonnet-road-trip", label: "Drive the loop during bluebonnet season", description: "Shift the route toward Brenham, the Highland Lakes and current spring bloom reports." },
    { href: "/article/texas-christmas-road-trip", label: "Return for a Hill Country Christmas", description: "Use Fredericksburg, Johnson City and Marble Falls for a compact December loop." },
    { href: "/article/texas-fall-foliage-road-trip", label: "Follow fall color through the Hill Country", description: "Build an autumn route around the Frio, Lost Maples and the Guadalupe corridor." },
  ],
  "caddo-lake-cypress-morning": [
    { href: "/article/fall-in-texas-complete-guide", label: "Where autumn shows up in Texas", description: "Put Caddo Lake inside a statewide guide to fall color, timing and regional trips." },
    { href: "/article/best-places-for-fall-colors-in-texas", label: "Texas fall-color destinations", description: "Compare Caddo with Lost Maples, Garner, Daingerfield, Lake Bob Sandlin and the Guadalupe." },
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
