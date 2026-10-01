export interface DestinationTimelineEvent {
  date: string;
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
}

const TIMELINES: Record<string, DestinationTimelineEvent[]> = {
  "the-alamo": [
    { date: "1718", title: "Mission San Antonio de Valero is founded", description: "Franciscan missionaries established the mission that would later become known as the Alamo.", sourceLabel: "The Alamo — Remember", sourceUrl: "https://www.thealamo.org/remember" },
    { date: "1724", title: "The mission moves to its present site", description: "After earlier relocations, the mission community moved to the location occupied by the Alamo today.", sourceLabel: "National Park Service — Mission San Antonio de Valero", sourceUrl: "https://www.nps.gov/subjects/travelspanishmissions/mission-san-antonio-de-valero-the-alamo.htm" },
    { date: "March 6, 1836", title: "Battle of the Alamo ends", description: "Mexican forces captured the fortified mission after the siege, making the site a defining place in the Texas Revolution and later public memory.", sourceLabel: "The Alamo — Battle and Revolution", sourceUrl: "https://www.thealamo.org/remember/battle-and-revolution" },
  ],
  "space-center-houston": [
    { date: "October 16, 1992", title: "Space Center Houston opens", description: "The nonprofit visitor and learning center opened as the official visitor center of NASA Johnson Space Center.", sourceLabel: "Space Center Houston — About Us", sourceUrl: "https://spacecenter.org/about-us/" },
    { date: "2012–2014", title: "Shuttle and carrier aircraft arrive", description: "The shuttle replica reached Houston, Space Center Houston acquired historic NASA 905, and the two vehicles were assembled into the future Independence Plaza configuration.", sourceLabel: "Space Center Houston — Independence Plaza history", sourceUrl: "https://spacecenter.org/this-day-in-history-independence-plaza-opens/" },
    { date: "January 23, 2016", title: "Independence Plaza opens", description: "Visitors gained access to the shuttle replica Independence mounted atop the historic NASA 905 shuttle carrier aircraft.", sourceLabel: "Space Center Houston — Independence Plaza", sourceUrl: "https://spacecenter.org/exhibits-and-experiences/independence/" },
  ],
  "sixth-floor-museum-at-dealey-plaza": [
    { date: "1901", title: "The present building is completed", description: "The structure later known as the Texas School Book Depository was built on the foundation of an earlier warehouse damaged by fire.", sourceLabel: "The Sixth Floor Museum — The Site", sourceUrl: "https://www.jfk.org/the-site/" },
    { date: "November 22, 1963", title: "President Kennedy is assassinated in Dealey Plaza", description: "The building and plaza became inseparable from the assassination and the investigations and public memory that followed.", sourceLabel: "The Sixth Floor Museum — The Site", sourceUrl: "https://www.jfk.org/the-site/" },
    { date: "February 20, 1989", title: "The Sixth Floor exhibit opens", description: "After years of community debate and development, the historical exhibition opened to the public in the former depository building.", sourceLabel: "The Sixth Floor Museum — Museum Opens", sourceUrl: "https://www.jfk.org/our-history/the-museum-opens-to-the-public/" },
  ],
  "fort-worth-stockyards": [
    { date: "1876", title: "The railroad reaches Fort Worth", description: "Arrival of the Texas and Pacific Railway helped shift the cattle economy from trail drives toward rail shipment and permanent livestock facilities.", sourceLabel: "Handbook of Texas — Fort Worth Stockyards", sourceUrl: "https://www.tshaonline.org/handbook/entries/fort-worth-stockyards" },
    { date: "March 23, 1893", title: "Fort Worth Stock Yards are incorporated", description: "The organized stockyards business became the industrial center of a rapidly expanding livestock market.", sourceLabel: "Handbook of Texas — Fort Worth Stockyards", sourceUrl: "https://www.tshaonline.org/handbook/entries/fort-worth-stockyards" },
    { date: "1902", title: "Armour and Swift arrive", description: "Agreements with two major meatpackers brought large packing plants beside the stockyards and accelerated Fort Worth's rise as a national livestock center.", sourceLabel: "Handbook of Texas — Fort Worth Stockyards", sourceUrl: "https://www.tshaonline.org/handbook/entries/fort-worth-stockyards" },
  ],
  "texas-state-capitol": [
    { date: "1839", title: "Austin becomes the Republic's capital", description: "The Republic of Texas established Austin as its capital and used an early log structure as the seat of government.", sourceLabel: "Texas State Preservation Board — Capitol History", sourceUrl: "https://tspb.texas.gov/prop/tc/tc-history/history/index.html" },
    { date: "March 2, 1885", title: "The cornerstone is laid", description: "Texas officials and civic leaders marked construction of the present Capitol with a cornerstone ceremony.", sourceLabel: "Texas State Preservation Board — Capitol History", sourceUrl: "https://tspb.texas.gov/prop/tc/tc-history/history/index.html" },
    { date: "May 16, 1888", title: "The new Capitol is dedicated", description: "The present red-granite Capitol was formally dedicated after a week of public festivities in Austin.", sourceLabel: "Texas State Preservation Board — Capitol History", sourceUrl: "https://tspb.texas.gov/prop/tc/tc-history/history/index.html" },
  ],
  "san-antonio-missions-national-historical-park": [
    { date: "1718", title: "San Antonio's first mission community forms", description: "Mission San Antonio de Valero and the early San Antonio settlement began the mission landscape along the river.", sourceLabel: "National Park Service — San Antonio Missions history", sourceUrl: "https://www.nps.gov/saan/learn/historyculture/index.htm" },
    { date: "February 23, 1720", title: "Mission San José is founded", description: "Founding ceremonies and the Writ of Possession established San José y San Miguel de Aguayo south of Mission Valero.", sourceLabel: "National Park Service — Mission San José", sourceUrl: "https://www.nps.gov/saan/planyourvisit/sanjose.htm" },
    { date: "2015", title: "The mission landscape becomes a UNESCO World Heritage Site", description: "Five San Antonio-area Spanish colonial missions, including the Alamo and most of the national historical park, were inscribed as a World Heritage Site.", sourceLabel: "National Park Service — World Heritage Site", sourceUrl: "https://www.nps.gov/saan/learn/historyculture/world-heritage-site.htm" },
  ],
  "fredericksburg-historic-district": [
    { date: "May 8, 1846", title: "Fredericksburg is founded", description: "German settlers established Fredericksburg as the second Texas town founded by the Adelsverein immigration society.", sourceLabel: "Visit Fredericksburg — German Heritage", sourceUrl: "https://www.visitfredericksburgtx.com/things-to-do/museums-history/german-heritage/" },
    { date: "March 2, 1847", title: "Meusebach-Comanche peace negotiations", description: "Fredericksburg's historical interpretation commemorates negotiations between German pioneers led by John O. Meusebach and Comanche leaders.", sourceLabel: "Visit Fredericksburg — Maibaum", sourceUrl: "https://www.visitfredericksburgtx.com/blog/the-fredericksburg-maibaum/" },
    { date: "October 14, 1970", title: "Historic district enters the National Register", description: "The Fredericksburg Historic District was listed for its significance in settlement, European ethnic heritage, art and architecture.", sourceLabel: "Texas Historical Commission Atlas", sourceUrl: "https://atlas.thc.texas.gov/Details/2070000749" },
  ],
  "gruene-historic-district": [
    { date: "1845", title: "German settlers establish the community", description: "The Gruene family's settlement began just downstream from New Braunfels and grew around farming along the Guadalupe River.", sourceLabel: "Gruene Historic District — History", sourceUrl: "https://www.gruenetexas.com/history/" },
    { date: "1878", title: "Gruene's commercial and music core takes shape", description: "The first mercantile store and Gruene Hall date to the period when cotton prosperity was expanding the settlement.", sourceLabel: "Gruene Historic District — History", sourceUrl: "https://www.gruenetexas.com/history/" },
    { date: "1974–1975", title: "Preservation effort protects the district", description: "Documentation of the historic buildings helped stop demolition plans, and new preservation-minded owners began restoring and reusing the district's structures.", sourceLabel: "Gruene Historic District — History", sourceUrl: "https://www.gruenetexas.com/history/" },
  ],
};

export function topAttractionTimeline(slug: string): DestinationTimelineEvent[] {
  return TIMELINES[slug] ?? [];
}

export const TOP_ATTRACTION_TIMELINE_SLUGS = Object.keys(TIMELINES);
