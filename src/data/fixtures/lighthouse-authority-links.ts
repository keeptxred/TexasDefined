import { articleInternalLinks } from "../article-internal-links";
import type { ArticleInternalLink } from "../types";

const mapLink: ArticleInternalLink = {
  href: "/explore/lighthouses",
  label: "Explore the Texas lighthouse map",
  description: "Compare surviving, relocated and border lights along the Gulf Coast and jump into the relevant county stories.",
};

const completeGuide: ArticleInternalLink = {
  href: "/article/texas-lighthouses-complete-guide",
  label: "Read the complete Texas lighthouse guide",
  description: "See how the surviving towers, lost lights, ports, passes and navigation systems fit together coastwide.",
};

const bestToVisit: ArticleInternalLink = {
  href: "/article/best-lighthouses-to-visit-in-texas",
  label: "Best Texas lighthouses to visit",
  description: "Compare the strongest lighthouse experiences by public access, trip style and the amount of planning each stop requires.",
};

const civilWar: ArticleInternalLink = {
  href: "/article/texas-civil-war-sites-guide",
  label: "Texas Civil War sites and Gulf Coast fighting",
  description: "Connect lighthouse damage and shutdowns with Sabine Pass, Galveston, blockades and the wider wartime coast.",
};

const additions: Record<string, ArticleInternalLink[]> = {
  "best-lighthouses-to-visit-in-texas": [
    mapLink,
    completeGuide,
    { href: "/article/texas-lighthouse-road-trip", label: "Turn the ranking into a Gulf Coast road trip", description: "Use the coast-spanning itinerary when you want to connect several lighthouse stories in one trip." },
    { href: "/article/port-isabel-lighthouse-guide", label: "Go deeper on Port Isabel Lighthouse", description: "Read the history and visitor context behind the best traditional lighthouse visit in Texas." },
    { href: "/destination/port-isabel-lighthouse-state-park", label: "Plan the Port Isabel stop", description: "Use the destination guide for the public lighthouse experience, nearby places and current planning context." },
    { href: "/texas-lighthouses.json", label: "Download the Texas lighthouse reference JSON", description: "Use the machine-readable source, location, access and visitor-planning records behind the lighthouse authority collection." },
  ],
  "texas-lighthouses-complete-guide": [bestToVisit],
  "texas-lighthouse-road-trip": [bestToVisit],
  "port-isabel-lighthouse-guide": [bestToVisit],
  "point-bolivar-lighthouse-history": [
    mapLink,
    completeGuide,
    bestToVisit,
    civilWar,
    { href: "/article/galveston-county-island-port-juneteenth-texas", label: "Galveston County: island, harbor and storms", description: "Place Point Bolivar beside the ferry, port, hurricane history and Galveston Bay." },
    { href: "/article/texas-lighthouse-road-trip", label: "Add Point Bolivar to the lighthouse road trip", description: "Use the ferry crossing as one of the strongest maritime-history legs on the Texas coast." },
  ],
  "lydia-ann-lighthouse-port-aransas": [
    mapLink,
    completeGuide,
    bestToVisit,
    civilWar,
    { href: "/article/aransas-county-rockport-fulton-bays-coastal-heritage-texas", label: "Aransas County coastal heritage", description: "Connect Lydia Ann with the bays, Rockport-Fulton, wildlife and Coastal Bend maritime history." },
    { href: "/article/texas-lighthouse-road-trip", label: "Build the Port Aransas lighthouse leg", description: "Pair the historic tower with channels, ferries and Lighthouse Lakes." },
  ],
  "matagorda-island-lighthouse-history": [
    mapLink,
    completeGuide,
    bestToVisit,
    civilWar,
    { href: "/article/calhoun-county-port-lavaca-indianola-seadrift-bays-texas", label: "Calhoun County and Matagorda Bay", description: "Connect the island light with Port Lavaca, Indianola, Port O'Connor, Pass Cavallo and the bays." },
    { href: "/article/halfmoon-reef-lighthouse-port-lavaca", label: "Halfmoon Reef Lighthouse", description: "Compare Calhoun County's remote cast-iron tower with its relocated screw-pile light." },
  ],
  "halfmoon-reef-lighthouse-port-lavaca": [
    mapLink,
    completeGuide,
    bestToVisit,
    { href: "/article/calhoun-county-port-lavaca-indianola-seadrift-bays-texas", label: "Calhoun County and the bays", description: "Use Port Lavaca and Matagorda Bay to understand why Halfmoon Reef needed a light." },
    { href: "/article/matagorda-island-lighthouse-history", label: "Matagorda Island Lighthouse", description: "See the other major surviving lighthouse story in Calhoun County." },
  ],
  "sabine-pass-lighthouse-texas-border": [
    mapLink,
    completeGuide,
    bestToVisit,
    civilWar,
    { href: "/article/texas-lighthouse-road-trip", label: "Start the lighthouse road trip at Sabine Pass", description: "Use the eastern border waterway as the historical starting point before following the coast southwest." },
  ],
  "cameron-county-brownsville-harlingen-south-padre-rio-grande": [
    { href: "/article/port-isabel-lighthouse-guide", label: "Port Isabel Lighthouse", description: "Go deeper on the public historic lighthouse that anchors the lower Texas coast." },
    bestToVisit,
    mapLink,
  ],
  "galveston-county-island-port-juneteenth-texas": [
    { href: "/article/point-bolivar-lighthouse-history", label: "Point Bolivar Lighthouse", description: "Explore the black cast-iron tower across the bay and its role in Galveston navigation and hurricane survival." },
    bestToVisit,
    mapLink,
  ],
  "aransas-county-rockport-fulton-bays-coastal-heritage-texas": [
    { href: "/article/lydia-ann-lighthouse-port-aransas", label: "Lydia Ann Lighthouse", description: "Follow the historic Aransas Pass light through Civil War damage, reconstruction and modern private navigation use." },
    bestToVisit,
    mapLink,
  ],
  "calhoun-county-port-lavaca-indianola-seadrift-bays-texas": [
    { href: "/article/matagorda-island-lighthouse-history", label: "Matagorda Island Lighthouse", description: "Trace the cast-iron Pass Cavallo light from 1852 through war, rebuilding and restoration." },
    { href: "/article/halfmoon-reef-lighthouse-port-lavaca", label: "Halfmoon Reef Lighthouse", description: "See the bay light that was moved ashore and preserved in Port Lavaca." },
    bestToVisit,
    mapLink,
  ],
  "texas-civil-war-sites-guide": [
    { href: "/article/point-bolivar-lighthouse-history", label: "Point Bolivar Lighthouse in wartime and storms", description: "See how Civil War disruption led to the present 1873 tower at Galveston Bay." },
    { href: "/article/lydia-ann-lighthouse-port-aransas", label: "Lydia Ann Lighthouse and Civil War damage", description: "Follow the Aransas Pass light through demolition attempts and postwar rebuilding." },
    { href: "/article/matagorda-island-lighthouse-history", label: "Matagorda Island Lighthouse after the Civil War", description: "See how wartime damage and shoreline change produced the 1873 rebuilt tower." },
    { href: "/article/sabine-pass-lighthouse-texas-border", label: "Sabine Pass lighthouse and border waterway", description: "Connect the eastern lighthouse story with the 1863 battle and Sabine-Neches corridor." },
    bestToVisit,
  ],
};

for (const [slug, links] of Object.entries(additions)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...links.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
