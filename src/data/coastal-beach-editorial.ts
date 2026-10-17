/** Beach-by-beach first-party verified visitor decisions, October 17, 2026.
 * Operator fees and operating conditions are quoted as date-bound facts and
 * must never be presented as live availability. Extend only with real sources.
 */
export interface CoastalEditorialDetail {
  headline: string;
  arrival: string;
  rules: string;
  visitorDecision: string;
  sourceUrl: string;
  extraUrl: string;
}

export const COASTAL_BEACH_EDITORIAL: Readonly<Record<string, CoastalEditorialDetail>> = {
  "crystal-beach": {
    "headline": "Bolivar Peninsula parking is not the same as beach admission",
    "arrival": "Crystal Beach Road is a central public entry to the peninsula's Gulf-facing shore. Galveston County provides permanent restrooms and rinse stations there; seasonal restroom trailers and rinse stations are also listed at Alma and Gilmore streets. Exact availability changes.",
    "rules": "Galveston County says pedestrian and through-driving beach access do not require a sticker, but most vehicles parked on sand do; specified free-parking stretches are exceptions. The county currently lists a $10 annual sticker after February and a $5 early purchase period. Driving is limited to 15 mph, glass is prohibited and dunes are protected.",
    "visitorDecision": "Crystal Beach is suited to a drive-on sand trip, but the vehicle rules are different from Stewart Beach or a fee-gate city park. Verify legal camping restrictions and any special-event closures with the county rather than assuming overnight camping is always available.",
    "sourceUrl": "https://www.galvestoncountytx.gov/county-offices/parks-cultural-services/bolivar-peninsula/beach-rules/faq/-fsiteid-1",
    "extraUrl": "https://www.galvestoncountytx.gov/county-offices/parks-cultural-services/bolivar-peninsula/bolivar-beach-stickers"
  },
  "retillion-road-beach-access": {
    "headline": "Use the county's free-parking boundary—not a separate invented beach",
    "arrival": "This western Bolivar access is near Retillion Road and the Bolivar Flats shoreline. Galveston County identifies a free beach-parking section extending east from Retillion Road to the first washout, not the entire peninsula.",
    "rules": "A parking sticker is generally required outside the county's listed free areas; walking and driving through the public beach do not in themselves require a parking permit. Wildlife limits and safe driving rules still apply near the flats and other habitat.",
    "visitorDecision": "Treat Retillion as an access corridor to the existing Bolivar shore, especially for wildlife viewing, not as a staffed family swimming park or a second, privately managed beach.",
    "sourceUrl": "https://www.galvestoncountytx.gov/county-offices/parks-cultural-services/bolivar-peninsula/bolivar-beach-stickers",
    "extraUrl": "https://www.galvestoncountytx.gov/county-offices/parks-cultural-services/bolivar-peninsula/beach-rules"
  },
  "east-beach-galveston": {
    "headline": "R.A. Apffel Park is a managed East End beach, not an ordinary seawall access",
    "arrival": "East Beach is at Galveston Island's eastern tip, close to the East End Lagoon and shipping-channel views. The Park Board lists a pavilion, showers, restrooms, volleyball, seasonal concessions, rentals, beach wheelchairs and lifeguard services.",
    "rules": "The operator currently advertises a $15 per-vehicle admission and 6 a.m.–8 p.m. daily park hours. It also says alcohol is permitted here, unlike most Galveston public beaches. Do not treat operator hours and staffing as unchanging; check current notices.",
    "visitorDecision": "Choose East Beach for a developed, event-friendly public beach with operator amenities. It is not the same as Stewart Beach's family orientation or free foot access to the wider island shoreline.",
    "sourceUrl": "https://www.galvestonparkboard.org/161/RA-Apffel-East-Beach",
    "extraUrl": "https://www.galvestonparkboard.org/353/Park-Rules-and-Regulations"
  },
  "stewart-beach": {
    "headline": "Family-oriented lifeguard beach at the Broadway–Seawall end",
    "arrival": "Stewart Beach sits where Broadway Avenue meets the Galveston Seawall. The Park Board advertises restrooms, showers, weather-dependent chair and umbrella rentals, and trained lifeguard supervision.",
    "rules": "The published operator schedule currently says 6 a.m.–8 p.m. and $15 per vehicle with no paid re-entry. East Beach and Stewart share a separately priced seasonal parking pass. Alcohol consumption is prohibited here under the Park Board's public-beach rules.",
    "visitorDecision": "Stewart is a more suitable first comparison for families who prioritize managed beach amenities, but lifeguards should only be presumed on duty when their current operator confirms staffing.",
    "sourceUrl": "https://galvestonparkboard.org/165/Stewart-Beach",
    "extraUrl": "https://www.galvestonparkboard.org/353/Park-Rules-and-Regulations"
  },
  "surfside-beach": {
    "headline": "Surfside Beach separates drive-on sand from pedestrian Gulf access",
    "arrival": "The Village of Surfside Beach says drive-on beach areas lie east of Highway 332, and vehicle traffic on the sand moves one-way eastbound. The village also maintains separate pedestrian-oriented shoreline rules.",
    "rules": "The May 2026 city rules specify street-legal vehicles only, 15 mph on sand, a valid beach permit when driving or parking on the drive-on beach, dune-side parking only where authorized, leashed pets, no glass or fireworks and limits on holes and campfires.",
    "visitorDecision": "Choose Surfside only after deciding whether you want an authorized vehicle-on-sand experience or a walk-on beach trip. Do not cross protected dunes or rely on an older permit price or operating rule.",
    "sourceUrl": "https://www.surfsidetx.org/page/city.beach_rules",
    "extraUrl": "https://www.surfsidetx.org/page/city.home"
  },
  "quintana-beach-county-park": {
    "headline": "A pedestrian beach and county park with overnight facilities",
    "arrival": "Brazoria County locates the park at 330 5th Street in Quintana, with paved parking and pedestrian beach access. The developed site also includes showers, RV campsites, cabins, picnic shelters, a fishing pier and jetty access.",
    "rules": "The county's posted seasonal policy charges $5 per vehicle for day-use parking from Memorial Day weekend through Labor Day weekend and notes that registered overnight guests are exempt. Its reservation page currently instructs visitors to call the office rather than book online.",
    "visitorDecision": "Quintana is a good choice for a family wanting an organized county park without driving across the beach. The beach, pier, jetty, overnight lodging and reservations are different experiences with separate conditions.",
    "sourceUrl": "https://www.brazoriacountytx.gov/departments/parks-department/quintana-beach",
    "extraUrl": "https://www.brazoriacountytx.gov/departments/parks-department"
  },
  "rockport-beach": {
    "headline": "Managed Aransas Bay beach with no overnight camping or pets",
    "arrival": "Rockport Beach is at 210 Seabreeze Drive near Little Bay and Aransas Bay. The Aransas County Navigation District describes a shallow-water family beach, public restrooms, a fishing pier and a Blue Wave beach management program.",
    "rules": "The operator lists $10 daily vehicle parking, a $20 resident annual vehicle pass and a $50 nonresident annual pass; walking and self-propelled bicycle entry are free. Pets, glass, overnight camping and fireworks are prohibited; fires are allowed only in designated grills.",
    "visitorDecision": "Rockport is a bay beach rather than open Gulf surf. Its animal prohibition and gate parking system matter when comparing it with Port Aransas and other pet-friendly Gulf beaches.",
    "sourceUrl": "https://www.rockportbeach-texas.com/about",
    "extraUrl": "https://www.rockportbeach-texas.com/things-to-do"
  },
  "whitecap-beach": {
    "headline": "North Padre Island has pedestrian-only and vehicle-access zones",
    "arrival": "Whitecap Beach is reached at the end of Whitecap Boulevard on North Padre Island, where Corpus Christi identifies both a pedestrian-only shoreline and a vehicle-access section. The city provides a Whitecap Beach Access webcam/arrival reference at 14802 Whitecap Boulevard.",
    "rules": "Driving, parking permits, marker boundaries and current surf risk must be checked with Corpus Christi's official Gulf Beaches guidance. Do not assume the entire Whitecap shore allows vehicle traffic simply because cars are allowed in one section.",
    "visitorDecision": "Whitecap provides open-Gulf surf on North Padre Island, unlike protected Corpus Christi Bay beaches such as McGee or North Beach. Families seeking walking-only sand should choose the appropriate section rather than the vehicle corridor.",
    "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/gulf-beaches/",
    "extraUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/gulf-beach-webcams/"
  },
  "galveston-seawall-beaches": {
    "headline": "Galveston Seawall parking is metered separately from park admission",
    "arrival": "The Seawall beaches run along the urban Gulf-facing shore where visitors can walk onto sand from Seawall Boulevard. This is not a single managed gated park and beach amenities change by access point.",
    "rules": "The City of Galveston currently lists Seawall paid parking enforcement daily from 10 a.m. to 6 p.m., with $2 per hour, a two-hour minimum and a $16 daily maximum. Payment is tied to vehicle license plate. These prices are parking fees, not beach-entry tickets.",
    "visitorDecision": "Choose a Seawall access point by nearby facilities, sand availability and accessible parking. Do not confuse Seawall meter payment with the separate East Beach or Stewart Beach day-use gates.",
    "sourceUrl": "https://galvestontx.gov/473/Seawall-Paid-Parking/QuickLinks",
    "extraUrl": "https://www.galvestontx.gov/1372/Beach-Access"
  }
};
