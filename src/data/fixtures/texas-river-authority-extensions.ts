import type { Article, ArticleBlock } from "../types";
import { sharedRiverPlanningLinks } from "./texas-river-shared-links";

const h = (text: string): ArticleBlock => ({type: "heading", text});
const p = (text: string): ArticleBlock => ({type: "paragraph", text});
export const existingRiverAuthorityEnhancements = {
  "texas-guadalupe-river-guide": {
    "segments": "Upper Guadalupe trip choices differ: Kerrville-area river parks support town-based access, Guadalupe River State Park provides a managed state-park anchor, the Canyon Lake vicinity changes access and flow, and the lower river becomes wider through Seguin, Gonzales and Victoria. Below Canyon Lake Dam, tailwater conditions and seasonal trout programs call for a separate fishing plan. Use one identified reach and its managing operator rather than merging an upper-river day with a tailwater float as though they share the same launch.",
    "access": "TPWD maps the Guadalupe River State Park Paddling Trail from the state park toward Nichol's Landing, and a separate Upper Guadalupe trail downstream of Nichol's Landing. Its official Come and Take It trail near Gonzales includes the San Marcos confluence and is a different, longer corridor. Those mapped access points are better anchors than an arbitrary bridge. Check site gates, privately operated shuttle and parking terms and flow advisories before travel. Releases below Canyon Lake Dam, flood runoff and local restrictions can change both fishing and float access.",
    "fishing": "The TPWD Guadalupe paddling trail describes Guadalupe, largemouth, smallmouth, white and striped bass as well as panfish and catfish in its reach. Tailwater trout near the Canyon Lake dam involves a different seasonal fishery and may have special regulations. Confirm the exact reach against the current TPWD species and waterbody tables. An angler should not assume that a species documented upstream is abundant or legal to retain in every downstream section.",
    "camp": "Guadalupe River State Park provides an official managed base for day use and camping; nearby commercial river camps and Hill Country lodging vary significantly. Compare site boundaries, reservations, river-frontage rights, showers, potable water, accessible facilities, RV hookups, parking and shuttle availability. The river is not one continuous campground. Families choosing a shore-based day should prefer locations with a clearly marked entrance, safe return and known facilities.",
    "faq": [
      [
        "Where should a first-time visitor access the Guadalupe?",
        "Begin with a managing authority such as Guadalupe River State Park or an officially mapped TPWD paddling trail, then verify local opening and parking details."
      ],
      [
        "Is fishing below Canyon Lake Dam the same as the upper Guadalupe?",
        "No. Tailwater conditions, stocking and fishing rules differ from upstream reaches; check current TPWD trout guidance."
      ],
      [
        "Can you camp anywhere on the Guadalupe?",
        "No. Use an authorized park, campsite or property with explicit permission; public navigation rights do not authorize private-bank camping."
      ]
    ],
    "links": [
      [
        "/destination/guadalupe-river-state-park",
        "Guadalupe River State Park"
      ],
      [
        "/county/kerr",
        "Kerr County"
      ],
      [
        "/county/comal",
        "Comal County"
      ],
      [
        "/destination/new-braunfels",
        "New Braunfels"
      ],
      [
        "/article/texas-comal-river-guide",
        "Comal tributary"
      ],
      [
        "/article/texas-san-marcos-river-guide",
        "San Marcos confluence"
      ]
    ],
    "official": [
      [
        "TPWD Guadalupe paddling trail",
        "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/"
      ],
      [
        "TPWD Upper Guadalupe trail",
        "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/"
      ],
      [
        "TPWD Come and Take It trail",
        "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/come-and-take-it/"
      ]
    ],
    "verifiedAccess": [
      {
        "name": "Come and Take It Paddling Trail near Gonzales",
        "access": "TPWD charts an approximately 11-mile, 4–6-hour Guadalupe route from Lake Wood Park (29.4707, -97.4899) to the Come and Take It Dock (29.4978, -97.4558). This passes the San Marcos confluence and ends before the hydroelectric dam; obey the posted caution sign and use the designated exit dock. A lengthy route for more experienced paddlers, not a universal family float.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/come-and-take-it/"
      }
    ]
  },
  "texas-colorado-river-guide": {
    "segments": "The Texas Colorado needs at least four different trip-planning maps: the upper river and Lake Buchanan approaches, the Highland Lakes and Austin dam chain, the more free-flowing Bastrop and Columbus corridor, and the lower coastal river toward Matagorda Bay. A reservoir shoreline, a managed dam release and a lower river boat launch do not have interchangeable current, parking, access or fishing rules. Keep the Colorado River of Texas distinct from the separate Colorado River running through the Grand Canyon.",
    "access": "For public-land recreation, Colorado Bend State Park is a named upper-basin park and the Colorado River below Austin has multiple locality-managed river parks and paddling routes. Before recommending any put-in, verify its exact location, public status, parking limits, launch type, exit plan and upstream dam conditions. TPWD's leased river access viewer is useful, but leases have dates and should not be presented as permanent. County road crossings are not an automatic right to drive onto private banks.",
    "fishing": "Seasonal white bass runs can attract anglers upstream of Lake Buchanan, including Colorado Bend State Park, but timing depends on temperature and flow; this is a trip goal rather than a guaranteed catch. Highland Lakes bass and crappie fisheries involve reservoir-specific regulations; lower-river catfish or bass fishing uses different habitats. TPWD's current freshwater rules and consumption advisories must be consulted by waterbody before publishing limits or recommending a harvest.",
    "camp": "Colorado Bend State Park, Highland Lakes communities and Bastrop-area public parks can anchor different weekend plans. Choose the campsite by the actual reach, since driving between them can take substantial time. Check campsite type, potable water, restroom location, electricity, seasonal access, launch proximity and wildfire or flood restrictions. The Texas Colorado should not be marketed as one continuous camp-and-float trail.",
    "faq": [
      [
        "Is this the Colorado River that flows through Arizona?",
        "No. The Texas Colorado is a separate river system that flows through Texas toward Matagorda Bay."
      ],
      [
        "Can I paddle from Austin to the coast as a beginner?",
        "Not as one simple day trip. Plan specific mapped reaches, access permissions, water releases and supported take-outs."
      ],
      [
        "Where are public camping bases?",
        "Select a verified state park or public/commercial campground for the intended reach, such as Colorado Bend for upper-basin context."
      ]
    ],
    "links": [
      [
        "/destination/colorado-bend-state-park",
        "Colorado Bend State Park"
      ],
      [
        "/county/bastrop",
        "Bastrop County"
      ],
      [
        "/county/llano",
        "Llano County"
      ],
      [
        "/county/matagorda",
        "Matagorda County"
      ],
      [
        "/article/texas-llano-river-guide",
        "Llano tributary"
      ]
    ],
    "official": [
      [
        "TPWD Colorado River access",
        "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/"
      ],
      [
        "TPWD Colorado Bend State Park",
        "https://tpwd.texas.gov/state-parks/colorado-bend"
      ],
      [
        "TPWD 2026 white bass access",
        "https://tpwd.texas.gov/newsmedia/releases/?req=20260223a"
      ],
      [
        "Bastrop El Camino Real Paddling Trail primary map",
        "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/"
      ]
    ],
    "verifiedAccess": [
      {
        "name": "Bastrop El Camino Real Paddling Trail",
        "access": "TPWD maps an approximately six-mile Colorado River trail from Fisherman's Park, Bastrop (30.1119, -97.3250) to Lost Pines Recreational Trails (30.0735, -97.3106). Its published 1.5–4-hour estimate varies with water releases, weather and stops. Post-flood access may change; verify both sites before launch.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/"
      }
    ]
  },
  "texas-brazos-river-guide": {
    "segments": "The Brazos crosses dramatically different sections: North Texas tributary country and major reservoirs, central recreation around Lake Whitney and Waco, the College Station–Washington-on-the-Brazos corridor, and broad lower floodplains toward the Gulf. Use a reach-based itinerary. An itinerary for a Waco riverwalk family visit is not the same as a boat launch on an isolated lower Brazos reach or a tailwater trip below a lake dam.",
    "access": "An official TPWD river-access search and local park authority should identify the exact boat ramp or bank fishing area. Commercial leased public access sites in upper Brazos reaches have changing agreements; confirm present-day eligibility before advertising one. Navigability does not give visitors the right to cross a private ranch or park on a bridge. Evaluate dams and reservoir releases, which make some river stretches substantially different from open-water lake recreation.",
    "fishing": "The upper Brazos system can offer spring white bass access when flow conditions are suitable; TPWD has discussed managed access near the Lake Granbury river corridor. Lake Whitney and Lake Waco fisheries should be researched on their specific reservoir pages, not simply copied onto the river. For main-stem fishing consider reach, clarity, bank rights, local advisories and current license and harvest limits. No fishing spot is guaranteed productive because a nearby reservoir has the same species.",
    "camp": "Separate shoreline campgrounds on the Brazos, state-park accommodations within the watershed and managed reservoir parks. On-site river access, legal overnight camping and riverboat launching are three different amenities. A Waco weekend can include cultural sites and managed parks; a remote boating trip needs more precise access information, rescue planning and local weather monitoring.",
    "faq": [
      [
        "Does the Brazos have one best float route?",
        "No. The river is long, dam-influenced and variable; choose a specific officially mapped reach and verify take-outs."
      ],
      [
        "Can you fish the river near Lake Granbury?",
        "There are documented TPWD access and seasonal white bass opportunities in the corridor, but confirm which leased sites are currently open."
      ],
      [
        "Is every Brazos riverbank public?",
        "No. Permission and legal access routes matter even where navigable streambeds have public-use rights."
      ]
    ],
    "links": [
      [
        "/explore/near/waco",
        "Waco"
      ],
      [
        "/county/brazos",
        "Brazos County"
      ],
      [
        "/county/fort-bend",
        "Fort Bend County"
      ],
      [
        "/county/bosque",
        "Bosque County"
      ]
    ],
    "official": [
      [
        "TPWD river fishing and access",
        "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/"
      ],
      [
        "TPWD white bass report",
        "https://tpwd.texas.gov/newsmedia/releases/?req=20260223a"
      ],
      [
        "Brazos Bridges Paddling Trail in Waco primary map",
        "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/"
      ]
    ],
    "verifiedAccess": [
      {
        "name": "Brazos Bridges Paddling Trail in Waco",
        "access": "TPWD offers a 4.8-mile loop from Brazos Park East Kayak/Canoe Ramp (31.5879, -97.1534) to Bledsoe Miller Community Center Dock (31.5628, -97.1293) and back. It differs from the separate Bosque Bluffs loop; documented options range around 1–3 hours depending on route, wind, current and stops.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/"
      }
    ]
  },
  "texas-neches-river-guide": {
    "segments": "The Neches runs through distinct East Texas landscapes. A practical first fishing itinerary uses Chandler River Park on the upper Neches near Lake Palestine; a larger reservoir-focused trip uses the Angelina tributary and Sam Rayburn region; a forest-and-wetland trip explores the Big Thicket and lower basin through permitted recreation corridors. Keep Neches main-stem access distinct from nearby reservoirs and the Angelina watershed.",
    "access": "TPWD identifies Chandler River Park near the Highway 31 crossing as an established public fishing, paddling and launch anchor on the Neches upstream of Lake Palestine, with separate parking and ramp arrangements on both sides of the highway. Its TPWD source expressly says no overnight camping or fires there. That concrete restriction matters more than a generic assertion that a river park is camp-friendly. Other reaches require individual mapping and access verification.",
    "fishing": "The official Chandler guide highlights a seasonal white bass run, blue and channel catfish in warmer months, plus largemouth bass and sunfish. It also identifies special catfish rules for Lake Palestine and the Neches upstream to the FM 279 bridge; never copy the general statewide catfish rules without checking that exception. Check fish consumption advisories in East Texas and current TPWD river regulations before harvesting fish.",
    "camp": "A Chandler River Park fishing day should not be described as an overnight camping stay. Instead compare officially designated state parks and campgrounds around Lake Palestine, the Angelina tributary or Sam Rayburn, with clear driving distances. Determine whether each site gives lakefront, bayou, tributary or main-stem Neches access before naming it a Neches river campsite.",
    "faq": [
      [
        "Where can anglers use a documented upper Neches river access?",
        "TPWD's Chandler River Park site near Highway 31 is a named launch and bank-fishing resource; check current site notices."
      ],
      [
        "Can you camp at Chandler River Park?",
        "TPWD specifically says no overnight camping or fires at the leased access area."
      ],
      [
        "Are all Neches catfish bag limits the same?",
        "No. Special local rules can apply, including the Lake Palestine–FM 279 reach; review the current official table."
      ]
    ],
    "links": [
      [
        "/fishing/lakes/lake-palestine",
        "Lake Palestine"
      ],
      [
        "/fishing/lakes/sam-rayburn-reservoir",
        "Sam Rayburn Reservoir"
      ],
      [
        "/county/henderson",
        "Henderson County"
      ],
      [
        "/article/texas-sabine-river-guide",
        "Nearby Sabine system"
      ]
    ],
    "official": [
      [
        "TPWD Chandler River Park",
        "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/chandler.phtml"
      ],
      [
        "TPWD Neches rules",
        "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=1402"
      ],
      [
        "Neches–Davy Crockett Paddling Trail primary map",
        "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/neches-davy-crockett/"
      ]
    ],
    "verifiedAccess": [
      {
        "name": "Neches–Davy Crockett Paddling Trail",
        "access": "TPWD describes a 9.2-mile Neches trip from Anderson Crossing (31.4446, -95.0344) to State Highway 7 (31.3967, -94.9655), with a published 3–6-hour estimate. The upper put-in uses rural forest roads and limited parking. Fallen timber and changes after storms require fresh local inspection; this is not the same as Chandler River Park upstream of Lake Palestine.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/neches-davy-crockett/"
      }
    ]
  },
  "texas-sabine-river-guide": {
    "segments": "The Sabine begins in northeast Texas and forms part of the Texas–Louisiana border farther downstream. Recreational decisions differ among upper Sabine white bass routes, Toledo Bend Reservoir and lower basin wetland and lake waters. A Toledo Bend bass-fishing trip is a reservoir trip, not necessarily a trip on the narrow main-stem Sabine above the lake. Border waters can have reach-specific regulatory differences.",
    "access": "TPWD describes the Sabine Sandbar Paddling Trail with FM 2517 and documented county-road landings as access anchors for alternative paddles, but route lengths and weather suitability vary. TPWD's Grand Bluff leased-access page listed a lease ending August 31, 2026; do NOT represent the site as currently open without renewed authorization. Check the current leased-access viewer and managing entity instead of repeating obsolete access descriptions.",
    "fishing": "The upper river can offer seasonal white bass and catfish fishing where legally accessible. TPWD publishes Sabine-specific fishing rules that distinguish the reach above Toledo Bend from waters downstream of the dam; this is precisely why a one-line generic bag-limit table would mislead. Identify your bank or boat location on the correct reach and check the current applicable rules, border agreements and consumption advisories.",
    "camp": "Toledo Bend supports reservoir-oriented parks and campgrounds; other authorized public or private camps may serve specific upper or lower Sabine reaches. Do not assume every roadside landing has overnight facilities. Compare ramp access, RV hookups, boat-trailer parking, restrooms and whether the property sits in Texas or Louisiana, since management and licensing can differ.",
    "faq": [
      [
        "Is Toledo Bend the same as the Sabine River?",
        "Toledo Bend is a major reservoir on the Sabine system, with different boating, fishing and lodging logistics than a free-flowing stretch."
      ],
      [
        "Is Grand Bluff Boat Ramp open in October 2026?",
        "The TPWD page lists a lease ending August 31, 2026, so access must be reconfirmed rather than advertised as open."
      ],
      [
        "Do Sabine fishing rules change below the dam?",
        "Yes. TPWD lists reach-specific special rules; consult the current Sabine River regulations for your exact location."
      ]
    ],
    "links": [
      [
        "/fishing/lakes/toledo-bend-reservoir",
        "Toledo Bend Reservoir"
      ],
      [
        "/county/sabine",
        "Sabine County"
      ],
      [
        "/county/newton",
        "Newton County"
      ],
      [
        "/article/texas-neches-river-guide",
        "Nearby Neches system"
      ]
    ],
    "official": [
      [
        "TPWD Sabine Sandbar trail",
        "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/sabine-sandbar/"
      ],
      [
        "TPWD Sabine-specific fishing regulations",
        "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=1512"
      ],
      [
        "TPWD Grand Bluff lease record",
        "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/grand_bluff.phtml"
      ]
    ],
    "verifiedAccess": [
      {
        "name": "Sabine Sandbar Paddling Trail near Carthage",
        "access": "TPWD documents FM 2517 Public Boat Ramp (32.1256, -94.2022) as the starting point; McFadden Landing at CR 438 (32.0026, -94.1323) is a 15-mile take-out, while Yellow Dog County Park at CR 455 (32.0043, -94.0922) is a 19-mile route. An alternative four-mile connection links the take-outs. Longer portions require roughly 7–10 hours in published guidance, so confirm flows, launch status and daylight.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/sabine-sandbar/"
      }
    ]
  }
} as const;
export function enhanceExistingRiverGuide(article: Article): Article {
 const supplement = (existingRiverAuthorityEnhancements as Record<string, {
  segments:string;access:string;fishing:string;camp:string;faq:readonly (readonly [string,string])[];
  links:readonly (readonly [string,string])[];official:readonly (readonly [string,string])[];
  verifiedAccess: readonly {name:string;access:string;source:string}[];
 }>)[article.slug];
 if (!supplement) return article;
 const extra:ArticleBlock[] = [
   h("Plan a river trip by reach, not by river name"),p(supplement.segments),
   h("Mapped paddling or visitor-access example"),
   ...supplement.verifiedAccess.flatMap((site)=>[h(site.name),p(site.access+" Official map and notes: "+site.source)]),
   h("Legal access, mapped launch points and parking"),p(supplement.access),
   h("Where to fish and which rules apply"),p(supplement.fishing),
   h("Camping, facilities, lodging and a second-day plan"),p(supplement.camp),
   h("Frequently asked questions about this river"),
   ...supplement.faq.flatMap(([question,answer])=>[h(question),p(answer)]),
   h("2026 recreation source review and trip-day verification"),
   p("Research update October 12, 2026. Access and fishing notes are grounded in linked TPWD primary sources, with known lease expirations, reach-specific rules and conditions identified. The reader must check the current operator notices, NWS flood products, USGS gauges and fishing regulations before travel. Published facts do not constitute a real-time opening or water-safety clearance.")
 ];
 const extraLinks = [...sharedRiverPlanningLinks,...supplement.links.map(([href,label])=>({href,label,description:"Continue the itinerary through a locally relevant TexasDefined authority page."})),
  ...supplement.official.map(([label,href])=>({href,label,description:"Primary agency reference for access, fishery or mapped paddling conditions."}))];
 const existing=new Set((article.internalLinks||[]).map(x=>x.href));
 return {...article,updatedAt:"2026-10-12",readingMinutes: Math.max(article.readingMinutes||10,15),
 body:[...article.body,...extra], internalLinks:[...(article.internalLinks||[]),...extraLinks.filter(l=>!existing.has(l.href))]};
}
