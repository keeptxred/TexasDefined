/**
 * Independently researched nine-site World Birding Center trip guide.
 * Operator links and site access checked 2026-10-09 from TPWD, local city
 * operators, FWS, and the individual nonprofit visitor centers.
 *
 * This is visitor-planning editorial, not a synthetic destination inventory.
 * It must not inflate the index-ready destination/category counts or make
 * driving-time claims from the metro's straight-line distance data.
 */
export const MCALLEN_WBC_SITES = [
  {
    name: "Roma Bluffs World Birding Center",
    location: "Roma · Starr County",
    fit: "Rio Grande views + historic border town",
    plan: "A western Valley outing that pairs the bluff overlook and birding center with the historic plaza. The riverfront landscape and nineteenth-century town center are the point, not a long trail.",
    before: "Confirm visitor-center hours; the city and federal refuge information are the authoritative starting points.",
    official: "https://www.cityofroma.net/residents/birding-center",
  },
  {
    name: "Bentsen-Rio Grande Valley State Park",
    location: "Mission · Hidalgo County",
    fit: "Dedicated birding + hawk tower",
    plan: "Start early for Valley specialty birds, woodland walks, a hawk-tower visit and the World Birding Center headquarters. A strong choice for a wildlife-focused morning.",
    before: "Private vehicles cannot tour the park interior. Confirm trail access and whether trams are operating.",
    official: "https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley/",
  },
  {
    name: "Quinta Mazatlán",
    location: "McAllen · Hidalgo County",
    fit: "Historic adobe home + urban thornforest",
    plan: "Choose this for an approachable city outing with gardens, forest paths, birdwatching and the historic house rather than a long-distance excursion.",
    before: "Closed Sunday and Monday under the published schedule. On-site parking is limited during the Center for Urban Ecology expansion.",
    official: "https://quintamazatlan.com/visit-explore/park-hours-admission",
  },
  {
    name: "Old Hidalgo Pumphouse Museum & World Birding Center",
    location: "Hidalgo · Hidalgo County",
    fit: "Irrigation heritage + butterfly gardens",
    plan: "Connect how water shaped Valley agriculture with the historic pumps, landscaped grounds, short trails and nearby river ecology.",
    before: "Verify museum-tour availability before planning around machinery or a guided interpretation session.",
    official: "https://cityofhidalgo.net/old-hidalgo-pump-housemuseum-and-world-birding-center",
  },
  {
    name: "Edinburg Scenic Wetlands & World Birding Center",
    location: "Edinburg · Hidalgo County",
    fit: "Wetland ponds + butterflies",
    plan: "Follow the wetland overlooks, viewing docks and native butterfly habitat. A particularly good contrasting habitat to Quinta Mazatlán's drier thornforest.",
    before: "Confirm admission and holiday opening updates with the center; bring sun protection for exposed walks.",
    official: "https://edinburgwbc.org/plan-your-visit",
  },
  {
    name: "Estero Llano Grande State Park",
    location: "Weslaco · Hidalgo County",
    fit: "Shallow water + wetland wildlife",
    plan: "Spend a morning around ponds, decks and nature trails looking for waterbirds, shorebirds and other Valley wildlife.",
    before: "Cars stay at park headquarters. Check Texas Parks & Wildlife alerts and day-pass availability.",
    official: "https://tpwd.texas.gov/state-parks/estero-llano-grande",
  },
  {
    name: "Harlingen Arroyo Colorado / Hugh Ramsey Nature Park",
    location: "Harlingen · Cameron County",
    fit: "Urban riparian woodland + native birds",
    plan: "Walk the native-brush trails and look along the Arroyo Colorado for kingfishers. Pair with Harlingen rather than rushing toward the coast.",
    before: "Hugh Ramsey is a city nature park, not a full-service state-park visitor center; verify access and conditions locally.",
    official: "https://visitharlingentexas.com/birding/",
  },
  {
    name: "Resaca de la Palma State Park",
    location: "Brownsville · Cameron County",
    fit: "Old Rio Grande channels + native woodland",
    plan: "Explore the resaca landscape using viewing decks, woodland trails and ranger activities. It is distinct from the wider Laguna Madre beach experience.",
    before: "No private-vehicle touring within the park. Check current hunting closures, park alerts and tram availability.",
    official: "https://tpwd.texas.gov/state-parks/resaca-de-la-palma/",
  },
  {
    name: "South Padre Island Birding, Nature Center & Alligator Sanctuary",
    location: "South Padre Island · Cameron County",
    fit: "Coastal wetlands + bayfront boardwalks",
    plan: "Make it a coastal wildlife visit, scanning saltwater and freshwater wetland habitat from boardwalks; allow enough time for the bridge and beach traffic.",
    before: "A long coastal outing from McAllen, not a quick city stop. Confirm current admission, tours and weather.",
    official: "https://www.spibirding.org/",
  },
] as const;

export const MCALLEN_WBC_SOURCES = {
  network: "https://tpwd.texas.gov/publications/pwdpubs/media/pwd_br_p4502_0058q.pdf",
  lowerCoast: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/",
  federalValley: "https://www.fws.gov/refuge/lower-rio-grande-valley/visit-us",
} as const;
