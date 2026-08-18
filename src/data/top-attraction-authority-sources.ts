import type { DestinationAuthoritySource } from "./types";
import type { TopTexasAttractionSlug } from "./top-texas-attractions";

/**
 * Supporting authority sources for the Top 25 collection.
 *
 * The destination's official visitor URL and reservation URL are added by the
 * base authority layer. These sources add history, conservation, accessibility,
 * geology, designation or institutional context from attraction operators,
 * public agencies, universities and UNESCO. They are deliberately not review
 * sites or generic travel blogs.
 */
const SUPPLEMENTAL_SOURCES: Record<TopTexasAttractionSlug, DestinationAuthoritySource[]> = {
  "the-alamo": [
    { label: "The Alamo — Mission Valero history", url: "https://www.thealamo.org/remember/mission-valero", scope: "Operator history of Mission San Antonio de Valero, including founding, relocation, mission life and secularization." },
    { label: "The Alamo — archaeology and preservation updates", url: "https://www.thealamo.org/support/preservation/updates", scope: "Operator updates on archaeology, conservation and preservation work at the historic site." },
  ],
  "san-antonio-river-walk": [
    { label: "San Antonio River Authority — river improvement history", url: "https://www.sariverauthority.org/about/history/", scope: "Public-agency history of the San Antonio River Improvements Project, including Museum Reach and Mission Reach development." },
    { label: "San Antonio River Authority — Museum Reach", url: "https://www.sariverauthority.org/parks-trails/san-antonio-river-walk-museum-reach/", scope: "Public-agency details for Museum Reach trails, public art, lock-and-dam infrastructure, management and visitor context." },
  ],
  "space-center-houston": [
    { label: "NASA — History of Johnson Space Center", url: "https://www.nasa.gov/history/history-of-johnson-space-center/", scope: "NASA institutional history for the working human-spaceflight center interpreted through Space Center Houston." },
    { label: "Space Center Houston — accessibility options", url: "https://spacecenter.org/accessibility-options/", scope: "Operator accessibility resources and visitor accommodations." },
  ],
  "big-bend-national-park": [
    { label: "National Park Service — Human History of Big Bend", url: "https://www.nps.gov/bibe/learn/historyculture/human-history-of-big-bend.htm", scope: "NPS cultural-history context for the Big Bend landscape." },
    { label: "National Park Service — Big Bend geology", url: "https://www.nps.gov/bibe/learn/nature/rocks.htm", scope: "NPS geology and landscape interpretation supporting the park's Texas significance." },
  ],
  "sixth-floor-museum-at-dealey-plaza": [
    { label: "The Sixth Floor Museum — accessibility", url: "https://www.jfk.org/accessibility/", scope: "Museum accessibility, sensory and visitor-accommodation guidance." },
  ],
  "fort-worth-stockyards": [
    { label: "Fort Worth Stockyards — history", url: "https://www.fortworthstockyards.org/history", scope: "Official district history covering the Stockyards' livestock, railroad and Western-heritage development." },
  ],
  "texas-state-capitol": [
    { label: "Texas State Preservation Board — Capitol Visitors Center history", url: "https://tspb.texas.gov/prop/tcvc/cvc-history/index.html", scope: "State Preservation Board history and institutional context for the Capitol visitor complex." },
  ],
  "guadalupe-mountains-national-park": [
    { label: "National Park Service — geologic formations", url: "https://www.nps.gov/gumo/learn/nature/geologicformations.htm", scope: "NPS interpretation of the fossil reef, geology and mountain landscape." },
    { label: "National Park Service — history and culture", url: "https://www.nps.gov/gumo/learn/historyculture/index.htm", scope: "NPS cultural-history context for Guadalupe Mountains National Park." },
  ],
  "palo-duro-canyon-state-park": [
    { label: "Texas Parks and Wildlife — Palo Duro history", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/history", scope: "State-park history covering human use, conservation and park development." },
    { label: "Texas Parks and Wildlife — Palo Duro nature", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/nature", scope: "TPWD geology, plants, wildlife and natural-resource interpretation." },
  ],
  "padre-island-national-seashore": [
    { label: "National Park Service — Padre Island nature and science", url: "https://www.nps.gov/pais/learn/nature/index.htm", scope: "NPS barrier-island ecology, wildlife, Laguna Madre and conservation context." },
    { label: "National Park Service — Padre Island management", url: "https://www.nps.gov/pais/learn/management/index.htm", scope: "NPS park purpose, resource-protection mission and management context." },
  ],
  "san-antonio-missions-national-historical-park": [
    { label: "UNESCO World Heritage Centre — San Antonio Missions", url: "https://whc.unesco.org/en/list/1466/", scope: "UNESCO statement of Outstanding Universal Value and World Heritage designation context." },
    { label: "National Park Service — San Antonio Missions World Heritage Site", url: "https://www.nps.gov/saan/learn/historyculture/world-heritage-site.htm", scope: "NPS explanation of the World Heritage property and mission landscape." },
  ],
  "moody-gardens": [
    { label: "Moody Gardens — mission and institutional history", url: "https://www.moodygardens.com/visitor-info", scope: "Nonprofit mission, institutional history and visitor-purpose context." },
    { label: "Moody Gardens — conservation", url: "https://www.moodygardens.com/get-involved/conservation", scope: "Operator conservation programs and conservation-fund context." },
  ],
  "galveston-island-historic-pleasure-pier": [
    { label: "Galveston Island Historic Pleasure Pier — history", url: "https://www.pleasurepier.com/history", scope: "Operator history of the original pier, storm damage, Flagship Hotel era and modern Pleasure Pier." },
  ],
  "dallas-arboretum-and-botanical-garden": [
    { label: "Dallas Arboretum — about and history", url: "https://www.dallasarboretum.org/about/", scope: "Institutional history, horticultural mission, research and garden context." },
    { label: "Dallas Arboretum — accessibility", url: "https://www.dallasarboretum.org/visitor-information/planning-your-visit/accessibility/", scope: "Official mobility, tram, sensory and accessibility guidance." },
  ],
  "houston-museum-of-natural-science": [
    { label: "Houston Museum of Natural Science — about", url: "https://www.hmns.org/about/", scope: "Museum history, collections, permanent exhibitions and institutional mission." },
    { label: "Houston Museum of Natural Science — visit", url: "https://www.hmns.org/visit/", scope: "Official visitor-planning, location and museum-experience guidance." },
  ],
  "cadillac-ranch": [
    { label: "Visit Amarillo — Cadillac Ranch", url: "https://www.visitamarillo.com/listing/cadillac-ranch/625/", scope: "Official destination-organization location, access and visitor context for Cadillac Ranch." },
    { label: "Visit Amarillo — Cadillac Ranch history and Route 66 context", url: "https://www.visitamarillo.com/blog/post/cadillac-ranch/", scope: "Official destination-organization history and Route 66 context for the public-art installation." },
  ],
  "natural-bridge-caverns": [
    { label: "Natural Bridge Caverns — our story", url: "https://naturalbridgecaverns.com/our-story/", scope: "Operator history covering the 1960 discovery, public opening, exploration and preservation." },
    { label: "Natural Bridge Caverns — cave science", url: "https://naturalbridgecaverns.com/cave-science/", scope: "Operator geology and cave-formation interpretation." },
  ],
  "hamilton-pool-preserve": [
    { label: "Travis County — Balcones Canyonlands Preserve", url: "https://www.traviscountytx.gov/bcp", scope: "County conservation context for the preserve system and endangered-species habitat that includes Hamilton Pool lands." },
    { label: "Visit Austin — Hamilton Pool Preserve", url: "https://www.austintexas.org/listings/hamilton-pool-preserve/3946/", scope: "Official destination-organization visitor context, reservation caveat and natural-feature summary." },
  ],
  "bullock-texas-state-history-museum": [
    { label: "Bullock Museum — museum information", url: "https://www.thestoryoftexas.com/press/media-kits/museum-information", scope: "Official institutional history, state-museum role, galleries and State Preservation Board governance." },
    { label: "Bullock Museum — Becoming Texas", url: "https://www.thestoryoftexas.com/visit/exhibits/first-floor-galleries", scope: "Official exhibition interpretation covering more than 16,000 years of early Texas history." },
  ],
  "houston-zoo": [
    { label: "Houston Zoo — about and mission", url: "https://www.houstonzoo.org/about/", scope: "Zoo mission, governance, animal-care and institutional context." },
    { label: "Houston Zoo — conservation", url: "https://www.houstonzoo.org/conservation/", scope: "Official wildlife-conservation partnerships and field-program context." },
    { label: "Houston Zoo — accessibility", url: "https://www.houstonzoo.org/plan-your-visit/accessibility/", scope: "Official mobility, sensory and accessibility guidance." },
  ],
  "fredericksburg-historic-district": [
    { label: "Visit Fredericksburg — German heritage", url: "https://www.visitfredericksburgtx.com/things-to-do/museums-history/german-heritage/", scope: "Official destination-organization history of Fredericksburg's 1846 founding and German-Texan heritage." },
    { label: "Texas Historical Commission Atlas — Fredericksburg Historic District", url: "https://atlas.thc.texas.gov/Details/2070000749", scope: "State historic-preservation record for the National Register district, boundaries, significance and listing status." },
  ],
  "inner-space-cavern": [
    { label: "Inner Space Cavern — discovery history", url: "https://innerspacecavern.com/about-us/", scope: "Operator history of the 1963 highway-drilling discovery, exploration and 1966 public opening." },
  ],
  "natural-bridge-wildlife-ranch": [
    { label: "Natural Bridge Wildlife Ranch — conservation", url: "https://www.wildliferanchtexas.com/conservation", scope: "Operator conservation partnerships and animal-and-ranchland stewardship context." },
    { label: "Natural Bridge Wildlife Ranch — self-guided safari", url: "https://www.wildliferanchtexas.com/selfguidedtour", scope: "Official description of the drive-through safari format, route and visitor experience." },
  ],
  "lady-bird-johnson-wildflower-center": [
    { label: "University of Texas — Wildflower Center field station", url: "https://fieldstations.utexas.edu/field-stations/wildflower-center", scope: "University research, conservation, native-plant collections and field-station context." },
    { label: "University of Texas — state botanic garden designation", url: "https://news.utexas.edu/2017/06/13/lady-bird-johnson-wildflower-center-designated-texas-state/", scope: "University history and official State Botanic Garden and Arboretum of Texas designation context." },
  ],
  "gruene-historic-district": [
    { label: "Gruene Historic District — history", url: "https://www.gruenetexas.com/history/", scope: "Official district history covering settlement, cotton economy, Gruene Hall and preservation." },
    { label: "Gruene Historic District — visitor map", url: "https://www.gruenetexas.com/map/", scope: "Official district map and current visitor-oriented context for the historic core." },
  ],
};

export function topAttractionSupplementalSources(slug: string): DestinationAuthoritySource[] {
  return SUPPLEMENTAL_SOURCES[slug as TopTexasAttractionSlug] ?? [];
}

export function hasSupplementalAuthoritySources(slug: TopTexasAttractionSlug): boolean {
  return SUPPLEMENTAL_SOURCES[slug].length > 0;
}
