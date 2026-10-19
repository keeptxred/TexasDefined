import type { DestinationTimelineEvent } from "./destination-timelines-top-attractions";

// Curated historic-site chronology. Use primary operators as citation authorities, not unsourced dates.
const HISTORIC_SITE_TIMELINES: Record<string, DestinationTimelineEvent[]> = {
  "magoffin-home": [
    { date: "1875–1877", title: "The Magoffin homestead is built and occupied", description: "The Texas Historical Commission’s district walking-tour brochure dates the Magoffin family homestead to around 1875. Its house history records Joseph and Octavia moving into their new adobe residence in 1877.", sourceLabel: "THC — Magoffin Home history", sourceUrl: "https://thc.texas.gov/state-historic-sites/magoffin-home/magoffin-home-history" },
    { date: "1881", title: "Railroads transform the district", description: "The arrival of railroads accelerated residential and commercial development around the Magoffin home, changing a formerly rural neighborhood. The official walking-tour brochure documents the transition.", sourceLabel: "THC — Magoffin Historic District walking tour", sourceUrl: "https://thc.texas.gov/sites/default/files/2025-01/Magoffin_walking_tour_new.pdf" },
    { date: "1971", title: "National Register recognition", description: "The home was added to the National Register of Historic Places, acknowledging the significance of the surviving adobe building.", sourceLabel: "THC — Magoffin Home history", sourceUrl: "https://thc.texas.gov/state-historic-sites/magoffin-home/magoffin-home-history" },
    { date: "2007", title: "Texas Historical Commission takes ownership", description: "The Texas Historical Commission became the managing owner, supporting preservation and historical interpretation of the home.", sourceLabel: "THC — Magoffin Home history", sourceUrl: "https://thc.texas.gov/state-historic-sites/magoffin-home/magoffin-home-history" },
  ],
  "lipantitlan": [
    { date: "1831", title: "Mexican forces build a picket fort", description: "A small garrison establishes a fort near the former Lipan Apache camping area in anticipation of expanding Anglo settlement.", sourceLabel: "Texas Historical Commission — Lipantitlán", sourceUrl: "https://thc.texas.gov/historic-sites/lipantitlan" },
    { date: "November 1835", title: "The garrison surrenders", description: "Texian volunteers take control of the fort during the Revolution, before a later Mexican counterattack in the region.", sourceLabel: "Texas Historic Sites Atlas — Fort Lipantitlán", sourceUrl: "https://atlas.thc.texas.gov/Details/5507018022" },
    { date: "1937", title: "The historic site becomes public land", description: "The Bluntzer family donates land around the former fort location to the state; later agencies oversee the small park.", sourceLabel: "Handbook of Texas — Lipantitlán", sourceUrl: "https://www.tshaonline.org/handbook/entries/lipantitlan-state-historic-site" },
  ],
  "fort-davis-national-historic-site": [
    { date: "1854", title: "The Army establishes Fort Davis", description: "The first post occupies a strategically watered mountain location on the San Antonio–El Paso Road.", sourceLabel: "NPS — Frontier Post", sourceUrl: "https://www.nps.gov/foda/fortdavisfrontierpost.htm" },
    { date: "1867", title: "The 9th Cavalry returns after the Civil War", description: "Black Regular Army cavalry soldiers reoccupy the site and help build the larger post seen today.", sourceLabel: "NPS — Frontier Post", sourceUrl: "https://www.nps.gov/foda/fortdavisfrontierpost.htm" },
    { date: "1891", title: "Fort Davis closes as an Army post", description: "Army consolidation ends the military installation after nearly four decades of changing frontier duty.", sourceLabel: "NPS — Frontier Post", sourceUrl: "https://www.nps.gov/foda/fortdavisfrontierpost.htm" },
  ],
  "san-jacinto-battleground": [
    { date: "April 21, 1836", title: "Battle of San Jacinto", description: "Sam Houston's Texian army defeats Santa Anna's force, changing the course of the Texas Revolution.", sourceLabel: "THC — San Jacinto", sourceUrl: "https://thc.texas.gov/historic-sites/san-jacinto-battleground" },
    { date: "1836", title: "The victory drives negotiations", description: "The battle helps end the immediate campaign, although Mexican recognition of Texas independence is a different and much longer diplomatic story.", sourceLabel: "THC — San Jacinto", sourceUrl: "https://thc.texas.gov/historic-sites/san-jacinto-battleground" },
  ],
  "goliad-state-park": [
    { date: "18th century", title: "Mission Espíritu Santo relocates to Goliad", description: "The Spanish colonial mission becomes part of the San Antonio River mission-and-presidio landscape.", sourceLabel: "TPWD — Goliad State Park", sourceUrl: "https://tpwd.texas.gov/state-parks/goliad" },
    { date: "1930s", title: "CCC workers restore the mission complex", description: "Much of the visible mission architecture reflects Depression-era conservation and restoration work rather than untouched colonial construction.", sourceLabel: "TPWD — Goliad State Park", sourceUrl: "https://tpwd.texas.gov/state-parks/goliad" },
  ],
  "fort-lancaster": [
    { date: "August 20, 1855", title: "Camp Lancaster is established", description: "Army infantry troops establish a post by Live Oak Creek along the San Antonio–El Paso Road.", sourceLabel: "THC — Fort Lancaster history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-lancaster/fort-lancaster-history" },
    { date: "August 21, 1856", title: "Camp becomes Fort Lancaster", description: "The military formally designates a permanent fort after its first year of operation.", sourceLabel: "THC — Fort Lancaster history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-lancaster/fort-lancaster-history" },
    { date: "December 26, 1867", title: "Battle at the frontier post", description: "Troops of Company K, 9th U.S. Cavalry fight a major attack; interpretation must include the attacking Indigenous groups and the soldiers' perspectives.", sourceLabel: "THC — Fort Lancaster history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-lancaster/fort-lancaster-history" },
  ],
  "fort-griffin": [
    { date: "July 31, 1867", title: "Camp Wilson is founded", description: "Lt. Col. Samuel Sturgis establishes the post, later renamed Fort Griffin, above the Clear Fork of the Brazos.", sourceLabel: "THC — Fort Griffin history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-griffin/fort-griffin-history" },
    { date: "1874–1875", title: "The Red River War", description: "Fort Griffin supplies soldiers and operations in the campaign that transformed Southern Plains Native nations and Texas settlement.", sourceLabel: "THC — Fort Griffin history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-griffin/fort-griffin-history" },
    { date: "May 1881", title: "The Army abandons Fort Griffin", description: "Military closure and shifting rail and cattle routes contribute to the decline of the boomtown known as the Flat.", sourceLabel: "THC — Fort Griffin history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-griffin/fort-griffin-history" },
  ],
  "fort-mckavett": [
    { date: "March 1852", title: "The 8th Infantry establishes the fort", description: "The U.S. Army builds the post near the San Saba headwaters as a military outpost and rest stop for westbound immigrants; the land was part of a much older Native landscape.", sourceLabel: "THC — Fort McKavett history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history" },
    { date: "1859–April 1862", title: "First closure and Civil War reuse", description: "The Army leaves in 1859. Texas forces briefly occupy the post during the Civil War and use it as a prisoner-of-war camp before withdrawing in April 1862.", sourceLabel: "THC — Fort McKavett history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history" },
    { date: "1868–1883", title: "Reoccupation and Buffalo Soldier service", description: "The Army returns and uses Fort McKavett as a major supply depot. Soldiers from all four Buffalo Soldier regiments serve at the post; Army campaigns are tied to the forced relocation of Native peoples.", sourceLabel: "THC — Fort McKavett history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history" },
    { date: "1883", title: "Army departs; a civilian town develops", description: "After the final Army withdrawal, civilian residents begin occupying some former military buildings, connecting the garrison's fabric to the later settlement.", sourceLabel: "THC — Fort McKavett history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history" },
    { date: "1968–1973", title: "State preservation and final historic residents", description: "The site is designated a state historic site on May 17, 1968; the last residents leave its original historic buildings in 1973.", sourceLabel: "THC — Fort McKavett history", sourceUrl: "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history" },
  ],
  "washington-on-the-brazos": [
    { date: "March 2, 1836", title: "The Texas Declaration of Independence", description: "Delegates sign a declaration at Washington while fighting continues elsewhere in Mexican Texas.", sourceLabel: "THC — Washington-on-the-Brazos", sourceUrl: "https://thc.texas.gov/historic-sites/washington-brazos" },
    { date: "March 1836", title: "An independent republic is organized", description: "The convention creates an interim constitutional framework and government amid the Texas Revolution.", sourceLabel: "THC — Washington-on-the-Brazos", sourceUrl: "https://thc.texas.gov/historic-sites/washington-brazos" },
  ],
  "presidio-la-bahia": [
    { date: "1749", title: "Presidio La Bahía moves to this site", description: "Spanish officials place the presidio near the mission system beside the San Antonio River.", sourceLabel: "THC — Presidio La Bahía", sourceUrl: "https://thc.texas.gov/historic-sites/presidio-la-bahia" },
    { date: "March 1836", title: "Goliad campaign and executions", description: "The presidio is central to the detention of Texian prisoners and the executions following Fannin's surrender.", sourceLabel: "THC — Presidio La Bahía history", sourceUrl: "https://thc.texas.gov/state-historic-sites/presidio-la-bahia/presidio-la-bahia-history" },
    { date: "20th century", title: "Restoration preserves the fort complex", description: "Surviving and reconstructed parts of the presidio were preserved through major twentieth-century restoration work.", sourceLabel: "THC — Presidio La Bahía history", sourceUrl: "https://thc.texas.gov/state-historic-sites/presidio-la-bahia/presidio-la-bahia-history" },
  ],
  "palo-alto-battlefield-national-historical-park": [
    { date: "1845", title: "The United States annexes Texas", description: "Annexation makes the unresolved Nueces–Rio Grande border dispute an international military crisis.", sourceLabel: "NPS — Palo Alto history", sourceUrl: "https://www.nps.gov/paal/learn/historyculture/index.htm" },
    { date: "May 8, 1846", title: "Battle of Palo Alto", description: "U.S. and Mexican forces fight on open prairie; artillery and visibility shape the engagement.", sourceLabel: "NPS — Palo Alto Battlefield", sourceUrl: "https://www.nps.gov/paal/index.htm" },
    { date: "May 9, 1846", title: "Battle of Resaca de la Palma", description: "The campaign shifts to brushier terrain near Brownsville, altering the tactical character of the fighting.", sourceLabel: "NPS — Palo Alto history", sourceUrl: "https://www.nps.gov/paal/learn/historyculture/index.htm" },
  ],
};

export function historicSiteAuthorityTimeline(slug: string): DestinationTimelineEvent[] {
  const canonicalSources: Record<string, string> = {
    "goliad-state-park-and-historic-site": "goliad-state-park",
    "san-jacinto-battleground-state-historic-site": "san-jacinto-battleground",
    "washington-on-the-brazos-state-historic-site": "washington-on-the-brazos",
  };
  return HISTORIC_SITE_TIMELINES[canonicalSources[slug] ?? slug] ?? [];
}
