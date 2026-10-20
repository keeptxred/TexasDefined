import { historicSiteSeeds } from "./historic-sites";
import type { Destination, DestinationAuthorityGuide, DestinationAreaItem, DestinationEditorialAssessment } from "./types";

// The statewide, source-grounded baseline is intentionally driven by the entire
// historic-site seed catalog rather than a handpicked batch of ten.
// A generic statewide collection link does not substitute for independent
// site-specific source verification; see docs/historic-sites/AUTHORITY_STANDARD.md.
const seeds = new Map(historicSiteSeeds.map((seed) => [seed.slug, seed]));
// Distinct on-site visitor profiles; unlike generic authority-guide defaults,
// these distinguish monuments, cemeteries, furnished homes, long hikes and towers.
// Exact-operator, site-specific research replaces three generic itineraries for these
// four historic houses/plantations. Hours and admissions remain controlled by THC.
const OPERATOR_RESEARCH_ITINERARIES: Record<string, DestinationAuthorityGuide["itineraries"]> = {
  "levi-jordan-plantation": [
    {
      "label": "Read the plantation through archaeology",
      "duration": "About one hour",
      "steps": [
        "Check in at the visitor center for the site's current self-guided route and archaeology interpretation.",
        "Follow the surviving plantation landscape and exhibits through the experiences of enslaved residents and their descendants, not just the Jordan family's house.",
        "The visitor center and archaeology lab are wheelchair accessible, but the historic house is not; its approach crosses unpaved ground."
      ]
    },
    {
      "label": "Book a deeper history tour",
      "duration": "At least one hour plus travel",
      "steps": [
        "Request a guided visit through THC in advance, rather than assuming a group tour is available on arrival.",
        "Compare archaeology lab findings with the two-story plantation house and accounts of enslaved labor, emancipation and Reconstruction.",
        "Plan around the separate access limitations of the house and grounds, including weather and unpaved walking surfaces."
      ]
    },
    {
      "label": "Compare two Brazoria County plantations",
      "duration": "Half-day or longer",
      "steps": [
        "Use THC's current admissions policy: one admission grants access to both Levi Jordan and Varner-Hogg plantation historic sites.",
        "Treat Levi Jordan as the archaeology, plantation labor and Reconstruction stop.",
        "Visit Varner-Hogg separately for its changes from sugar production to ranching and oil; confirm operating days and do not assume the sites share a tour timetable."
      ]
    }
  ],
  "varner-hogg-plantation": [
    {
      "label": "Follow the property's changing uses",
      "duration": "About 90 minutes",
      "steps": [
        "THC lists a 90-minute self-guided route, including both floors of the main house, outbuildings and the plantation landscape. Check the current admission policy.",
        "Trace sugarcane production, enslaved labor, cattle ranching and later oil extraction as distinct chapters rather than a single elegant-house story.",
        "Explore permitted interpretive grounds only, watching for historic surfaces and seasonal conditions."
      ]
    },
    {
      "label": "Compare households and labor",
      "duration": "Unhurried visit",
      "steps": [
        "Read the landscape through the experiences of the enslaved and paid workers whose labor sustained each phase of the property.",
        "Compare the Varner, Patton and Hogg periods and identify later preservation changes, rather than treating every building as an untouched early-Texas artifact.",
        "The visitor center, Ima's cottage, smokehouse, kitchen and barn are wheelchair accessible. The main house has entrance steps; several outdoor features lie in grass but can be viewed from the road."
      ]
    },
    {
      "label": "Brazoria County's two-plantation history",
      "duration": "Half-day or longer",
      "steps": [
        "THC currently permits one paid admission to cover Varner-Hogg and Levi Jordan Plantation State Historic Sites.",
        "Give Levi Jordan additional time for its archaeology lab, the lives of enslaved residents and Reconstruction history.",
        "Check both sites' Wednesday–Sunday public schedules and separate tour arrangements before traveling between West Columbia and Brazoria."
      ]
    }
  ],
  "starr-family-home": [
    {
      "label": "Explore Maplecroft independently",
      "duration": "About 30 minutes",
      "steps": [
        "Choose the operator's self-guided Maplecroft experience during published Tuesday–Saturday visitor hours.",
        "Use furnished rooms and displays to connect Dr. James Harper Starr, his son Frank and the family's land-business work to Marshall's development.",
        "The second floor is not wheelchair accessible; the operator lists accessible facilities elsewhere on the grounds."
      ]
    },
    {
      "label": "Take a guided house-history tour",
      "duration": "About 45 minutes",
      "steps": [
        "Arrange group or specialist guided access in advance; THC requests reservations around two weeks ahead.",
        "Follow the 1870 Maplecroft house and its nineteenth-century household technology, family relationships and roles of women and children.",
        "Verify access to the particular rooms and program before promising a fully accessible guided route."
      ]
    },
    {
      "label": "Read the grounds and Marshall context",
      "duration": "Thirty-minute grounds visit plus town time",
      "steps": [
        "Use the operator's free outdoor interpretive-panel walk when open; it is separate from paid interior touring.",
        "Compare the original domestic setting, gardens and the other Starr-family structures.",
        "Continue to independently open Marshall museums or downtown heritage sites after checking their hours and admissions."
      ]
    }
  ],
  "sam-bell-maxey-house": [
    {
      "label": "Join a house-history tour",
      "duration": "About 45 minutes",
      "steps": [
        "The THC offers guided and visitor-led house experiences; confirm the actual admission and first available tour time on the visit date.",
        "Follow Maxey's post–Civil War career, Reconstruction politics and three generations of the household through furnished rooms and artifacts.",
        "The first floor is accessible; a photo notebook offers an alternative for guests who cannot use the stairs to the second floor."
      ]
    },
    {
      "label": "Explore the Victorian domestic landscape",
      "duration": "One to two hours",
      "steps": [
        "Compare restored indoor artifacts with the gardens and grounds, noting that uneven brick pathways present mobility and trip hazards.",
        "Consider how 1868 household life and later generations intersected with Reconstruction-era Paris and Texas politics.",
        "Use the operator's separate school/group reservation process when traveling with a larger party."
      ]
    },
    {
      "label": "Make a Paris history half-day",
      "duration": "Half-day or longer",
      "steps": [
        "Visit the Maxey house when its operator confirms an available tour.",
        "Walk the permitted grounds, then examine the surrounding historic residential landscape without treating private properties as public attractions.",
        "Explore downtown Paris or the Lamar County Historical Society Museum separately after checking their own current hours."
      ]
    }
  ]
};

const OPERATOR_RESEARCH_VISIT_NOTES: Record<string, Pick<Destination, "entryNote" | "accessibilityNotes">> = {
  "levi-jordan-plantation": {
    "entryNote": "THC lists Wednesday–Sunday 9 a.m.–5 p.m., with admission also valid at Varner-Hogg Plantation. Allow about one hour for the self-guided visit; booked guided experiences have their own availability.",
    "accessibilityNotes": "The THC says the visitor center and archaeology lab are wheelchair accessible, but the historic plantation house is not, and its approach crosses unpaved terrain."
  },
  "varner-hogg-plantation": {
    "entryNote": "THC lists Wednesday–Sunday 9 a.m.–5 p.m. Budget 90 minutes for Varner-Hogg's self-guided history route; paid admission also covers Levi Jordan. Reserve guided groups approximately four weeks in advance.",
    "accessibilityNotes": "THC lists accessible parking/restrooms and wheelchair access to the visitor center, Ima Hogg's cottage, smokehouse, kitchen and barn. The main house has entrance steps; only its first floor is listed as accessible. Several outdoor attractions have grass surfaces."
  },
  "starr-family-home": {
    "entryNote": "THC lists Tuesday–Saturday 10 a.m.–4 p.m. Paid Maplecroft house tours and a free outdoor panel walk are different experiences; guided groups should request reservations at least two weeks ahead.",
    "accessibilityNotes": "The grounds and principal public facilities are wheelchair accessible, but the second floor of historic Maplecroft is not."
  },
  "sam-bell-maxey-house": {
    "entryNote": "THC currently lists Tuesday–Sunday 10 a.m.–4 p.m. with the last tour at 3 p.m. Its detailed program page contains partly differing start-time information; confirm a specific guided slot before arrival.",
    "accessibilityNotes": "The first floor of the home, public parking and restrooms are wheelchair accessible. The second floor requires stairs, so a photo notebook is offered instead. Garden brickwork is uneven."
  }
};

const SITE_VISIT_PROFILES: Record<string, Pick<DestinationEditorialAssessment, "physicalEffort" | "weatherExposure" | "planningLevel" | "recommendedVisit">> = {
  "battleship-texas": {
    "physicalEffort": "Not applicable — ship closed",
    "weatherExposure": "Not applicable — ship closed",
    "planningLevel": "High",
    "recommendedVisit": "Battleship Texas is closed for regular boarding during its Galveston restoration. The Foundation's current visitor notice governs access. Explore documented history or separately open Galveston attractions now; only plan an onboard visit after the operator announces reopening and ticketing."
  },
  "acton-state-historic-site": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "THC lists the Elizabeth Crockett cemetery monument open daily 9 a.m.–5 p.m. and free; this is a respectful outdoor memorial, not a staffed museum."
  },
  "barrington-living-history-farm": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Barrington is ticketed Wednesday–Sunday 10 a.m.–4:30 p.m. within the Washington-on-the-Brazos complex. Monday–Tuesday grounds/visitor center access does NOT include the closed farm or museum."
  },
  "bush-family-home": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Treat this as a guided historic-house experience, not a full presidential museum; confirm how to access the interior."
  },
  "caddo-mounds-state-historic-site": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "The operator currently opens Tuesday–Sunday, 8:30 a.m.–4:30 p.m. Start in the museum and consider the 0.7-mile Mound Trail, the shorter Camino Real Trail, or longer natural trails as mobility permits. Mounds remain sacred to Caddo people; follow marked paths."
  },
  "casa-navarro": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Concentrate on José Antonio Navarro’s restored home and Tejano political context before adding other downtown San Antonio sites."
  },
  "confederate-reunion-grounds": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "High",
    "recommendedVisit": "THC's overview currently says Wednesday–Sunday 8 a.m.–5 p.m. while its separate visit planner describes daily access. Confirm days before travel; allow 30 minutes by car or several hours on longer walking trails, with free entry."
  },
  "eisenhower-birthplace": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Allow for an interpretive house visit and surrounding grounds; confirm scheduled tour or interior access before traveling."
  },
  "fannin-battleground": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "The outdoor battlefield memorial is free and generally takes 30 minutes; THC lists daily 8 a.m.–5 p.m., accessible grounds and restrooms, but no visitor center. Goliad's presidio is a separate stop."
  },
  "fanthorp-inn": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Fanthorp Inn is currently open Friday–Sunday, 10 a.m.–4:30 p.m., with free self-guided public tours and on-site interpretation. Group and school tours have separate reservation policies; a stagecoach demonstration is an event, not a daily entitlement."
  },
  "first-capitol-of-texas": {
    "physicalEffort": "Not applicable — site closed",
    "weatherExposure": "Not applicable — site closed",
    "planningLevel": "High",
    "recommendedVisit": "Not open to visitors: the Texas Historical Commission currently lists the First Capitol State Historic Site as Coming Soon, with hours Not Open and no tickets. Do not plan an interior or on-site tour until the operator announces opening; West Columbia's existing public history places remain separate stops."
  },
  "fort-martin-scott": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "Read the early Army post layout and preserved or reconstructed features, then compare with Fredericksburg’s historic center."
  },
  "french-legation": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "The Austin grounds open Tuesday–Saturday 9 a.m.–5 p.m., but paid museum access begins 11 a.m. and last admission is 4:15 p.m. Parking is at 900 East 9th Street."
  },
  "fulton-mansion": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Allow about 45 minutes for the self-guided public house tour, beginning at the Education Center. THC lists Tuesday–Saturday 10 a.m.–4 p.m. and Sunday 1–4 p.m., with the last ticket at 3:15 p.m. Individual public visits are walk-in only; group tours have separate advance booking."
  },
  "goodnight-ranch": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "High",
    "recommendedVisit": "THC lists Tuesday–Saturday 10 a.m.–5 p.m. access and historic house tours at 11 a.m., 1 p.m. and 3 p.m. The ground floor and visitor center are accessible, but there is no elevator to the upper floor."
  },
  "iwo-jima-museum-monument": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Allow separate time for the memorial sculpture and museum interpretation; verify current museum access."
  },
  "kreische-brewery": {
    "physicalEffort": "Moderate to high",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "High",
    "recommendedVisit": "Grounds open daily 8 a.m.–4:30 p.m., visitor center 9 a.m.–4:30 p.m. The scheduled 0.75-mile brewery ruins walk includes steep slopes and historic stone steps; the separate bluff/visitor center trail is more accessible."
  },
  "landmark-inn": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "High",
    "recommendedVisit": "Castroville's Landmark Inn currently opens daily 9 a.m.–4:30 p.m.; guided tours have their own Wednesday–Saturday schedules. Eight historic guest rooms are available through operator-managed advance reservations, not automatically with daytime admission; same-day lodging cannot generally be booked."
  },
  "levi-jordan-plantation": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "THC lists Wednesday–Sunday, 9 a.m.–5 p.m. A one-hour self-guided route covers the archaeology lab and plantation landscape; the historic house is not wheelchair accessible. Admission also covers Varner-Hogg, but guided visits need advance booking."
  },
  "lipantitlan": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "This is a brief outdoor marker stop with no staff, exhibits or visitor facilities. THC posts daily 9 a.m.–5 p.m. access and free admission; confirm before traveling."
  },
  "magoffin-home": {
    "physicalEffort": "Low",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "The historic house is closed for restoration through 2027; the visitor center is open. Plan around current visitor-center programs and publicly accessible grounds only; confirm actual access with the Texas Historical Commission."
  },
  "mission-dolores": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "THC lists Tuesday–Saturday 8 a.m.–5 p.m. and paid admission. Visit the museum, archaeological site and trails: NO original mission architecture survives above ground. RV campsites require separate planning."
  },
  "monument-hill": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "Plan to read the Republic-era commemorative memorial and Colorado River overlook, then compare the adjacent brewery ruins."
  },
  "national-museum-pacific-war": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Allow substantial time for galleries and any separate outdoor features; special programs may have distinct reservations."
  },
  "official-texas-longhorn-herd": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Combine the historic Fort Griffin setting with the state herd when animals are visible; cattle sightings cannot be guaranteed."
  },
  "old-socorro-mission": {
    "physicalEffort": "Not applicable — site closed",
    "weatherExposure": "Not applicable — site closed",
    "planningLevel": "High",
    "recommendedVisit": "The Old Socorro Mission State Historic Site is CLOSED to the public, with no services or facilities, according to the Texas Historical Commission. It is the former mission site and must not be confused with the separately operating present-day Socorro Mission. Do not plan entry into the closed archaeological site."
  },
  "palmito-ranch-battlefield": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "This is a remote landscape-and-marker visit; use reliable directions, water and historical maps rather than expecting staffed indoor exhibits."
  },
  "port-isabel-lighthouse": {
    "physicalEffort": "Moderate to high",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "A tower climb is physically different from viewing the lighthouse at ground level; verify whether climbing is permitted and consider stair tolerance."
  },
  "sabine-pass-battleground": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "Use the coastal battlefield grounds and maps to understand channels, artillery and changing shoreline conditions."
  },
  "sam-bell-maxey-house": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "THC currently lists Tuesday–Sunday 10 a.m.–4 p.m., last tour starts at 3 p.m.; the detailed planner has partly different session wording, so confirm your actual slot. The first floor is wheelchair accessible, with a photo notebook for the upstairs."
  },
  "sam-rayburn-house": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Focus on Rayburn’s furnished home and work-life history; confirm interior tour arrangements."
  },
  "san-felipe-de-austin": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "Use the museum and reconstructed townsite together to understand Stephen F. Austin’s colony before 1836."
  },
  "slaton-harvey-house": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Check public opening times and private-event use before planning an interior railroad-hospitality history visit."
  },
  "star-of-the-republic-museum": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Treat this as the artifact-based museum stop in the Washington complex; confirm separate museum hours."
  },
  "starr-family-home": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly indoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "THC lists Tuesday–Saturday, 10 a.m.–4 p.m. Self-guided house interpretation takes about 30 minutes; guided programs take about 45 minutes and groups should reserve roughly two weeks ahead. The second floor is not wheelchair accessible."
  },
  "stephen-f-austin-memorial": {
    "physicalEffort": "Low",
    "weatherExposure": "Fully outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "Read the small memorial in its West Columbia location and connect it with the First Capitol and early Republic sites."
  },
  "varner-hogg-plantation": {
    "physicalEffort": "Low to moderate",
    "weatherExposure": "Mixed indoor/outdoor",
    "planningLevel": "Moderate",
    "recommendedVisit": "THC lists Wednesday–Sunday, 9 a.m.–5 p.m. and a 90-minute self-guided route. One admission covers Varner-Hogg and Levi Jordan; arrange guided group visits four weeks ahead."
  },
  "zaragoza-birthplace": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Low",
    "recommendedVisit": "This is a focused Goliad-area birthplace-history stop; pair it with the mission and presidio while distinguishing their periods."
  },
  "fort-sam-houston-national-cemetery": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Visit quietly and respectfully, avoiding any interference with services; use VA guidance for grave locations and ceremony times."
  },
  "houston-national-cemetery": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Check VA cemetery access, ceremonies and grave-locator details; remember that this is an active burial ground."
  },
  "dallas-fort-worth-national-cemetery": {
    "physicalEffort": "Low",
    "weatherExposure": "Mostly outdoors",
    "planningLevel": "Moderate",
    "recommendedVisit": "Plan a respectful purpose-driven visit using VA hours and grave-location guidance, not a recreational walking itinerary."
  }
};


function authoritySources(officialUrl: string, siteName: string): DestinationAuthorityGuide["sources"] {
  const primary = { label: `${siteName} — official managing authority`, url: officialUrl, scope: "Site-specific location, interpretation, entry rules, facilities, visitor alerts and official current access; confirm on the operator's page." };
  const siteTourSources: Record<string, {label:string;url:string;scope:string}[]> = {
    "levi-jordan-plantation": [
      {label:"THC — Levi Jordan visitor tours, accessibility and archaeology",url:"https://thc.texas.gov/state-historic-sites/levi-jordan-plantation/plan-your-visit-levi-jordan",scope:"Self-guided and advance-booked tours, archaeology lab, inaccessible house and unpaved approach."},
      {label:"THC — Levi Jordan plantation history and archaeological evidence",url:"https://thc.texas.gov/state-historic-sites/levi-jordan-plantation/levi-jordan-history",scope:"Enslaved labor, 92-acre state site, house restoration and over 600,000 excavated artifacts."},
    ],
    "varner-hogg-plantation": [
      {label:"THC — Varner-Hogg public tours, group bookings and accessible spaces",url:"https://thc.texas.gov/state-historic-sites/varner-hogg-plantation/plan-your-visit-varner-hogg-plantation",scope:"90-minute self-guided visit, four-week adult group reservation, accessible outbuildings and entrance steps to the main house."},
    ],
    "starr-family-home": [
      {label:"THC — Starr Family Home public tours, grounds and accessibility",url:"https://thc.texas.gov/state-historic-sites/starr-family-home/plan-your-visit-starr-family-home",scope:"Thirty-minute self-guided visits, 45-minute guided tours, two-week group reservations, free grounds panels and inaccessible second floor."},
    ],
    "sam-bell-maxey-house": [
      {label:"THC — Sam Bell Maxey tours and accessible alternatives",url:"https://thc.texas.gov/state-historic-sites/sam-bell-maxey-house/plan-your-visit-sam-bell-maxey-house",scope:"Forty-five-minute tours, first-floor wheelchair access, upstairs photo notebook and uneven garden paths. Check tour times against the site homepage."},
    ],
    "old-socorro-mission": [{label:"THC — Old Socorro Mission history and early Pueblo settlement",url:"https://thc.texas.gov/state-historic-sites/old-socorro-mission/old-socorro-mission-history",scope:"Operator chronology: mission established in 1680, first church location unknown, temporary church at this site by 1684, 1691 adobe mission, Rio Grande floods and later relocation."}],
    "goodnight-ranch": [{label:"THC — Goodnight Ranch tours and accessible rooms",url:"https://thc.texas.gov/state-historic-sites/goodnight-ranch/plan-your-visit-goodnight-ranch",scope:"Scheduled guided house tours, ticketing, first-floor access, second-floor stair barrier and group booking."}],
    "fulton-mansion": [{label:"THC — Fulton Mansion public tours, groups and accessible floors",url:"https://thc.texas.gov/state-historic-sites/fulton-mansion/plan-your-visit-fulton-mansion",scope:"Official 45-minute public walk-in tour; Tuesday–Sunday hours, admissions, group reservations, wheelchair lift to first floor, stairs to upper floor and photo-based access alternative."}],
    "french-legation": [{label:"THC — French Legation tour and visitor information",url:"https://thc.texas.gov/state-historic-sites/french-legation/plan-your-visit-french-legation",scope:"Interior tour schedule, historic kitchen reconstruction and separate ticketing/group experiences."}],
    "fannin-battleground": [{label:"THC — Fannin Battleground self-guided visit",url:"https://thc.texas.gov/state-historic-sites/fannin-battleground/plan-your-visit-fannin-battleground",scope:"Free outdoor visits, accessibility, lack of visitor center and distinct group tour arrangements."}],
    "kreische-brewery": [
      {label:"THC — Kreische Brewery and Monument Hill tour options",url:"https://thc.texas.gov/state-historic-sites/kreische-brewery/plan-your-visit-kreische-brewery",scope:"Steep 0.75-mile ruins route, separate accessible trail, onsite restrooms and seasonal guided tours."},
      {label:"Historic-site photo: source, original creator and usage rights",url:"https://commons.wikimedia.org/wiki/File:Kreische_Brewery_Ruins_Lower_View.jpg",scope:"Exact Kreische Brewery ruins photographed 18 September 2015 by Larry D. Moore; CC BY 4.0 https://creativecommons.org/licenses/by/4.0/. Not a photograph of Monument Hill's memorial."},
    ],
    "monument-hill": [
      {label:"Historic-site photo: source, original creator and usage rights",url:"https://commons.wikimedia.org/wiki/File:Monument_hill_monument.jpg",scope:"Exact Mier Expedition and Dawson's Men Monument, 2006 photograph by Larry D. Moore, 2021 perspective correction by Jim Evans; CC BY 4.0 https://creativecommons.org/licenses/by/4.0/."},
    ],
    "confederate-reunion-grounds": [{label:"THC — Reunion Grounds visitor details",url:"https://thc.texas.gov/state-historic-sites/confederate-reunion-grounds/plan-your-visit-confederate-reunion-grounds",scope:"Tour lengths, pavilion access, Navasota walking trails and conflicting published opening days to reconfirm."}],

    "barrington-living-history-farm": [{ label: "THC — Barrington Living History Farm, public access", url: "https://thc.texas.gov/historic-sites/barrington-living-history-farm", scope: "Farm closures Monday–Tuesday, ticketed Wednesday–Sunday visit, Anson Jones household and enslaved agricultural labor." }],
    "fort-mckavett": [{ label: "THC — Fort McKavett tours and accessibility", url: "https://thc.texas.gov/state-historic-sites/fort-mckavett/plan-your-visit-fort-mckavett", scope: "Opening schedule, visit duration, group tours, wheelchair limitations, golf-cart alternatives and visitor facilities." }],
    "fort-lancaster": [{ label: "THC — Fort Lancaster tours and access", url: "https://thc.texas.gov/state-historic-sites/fort-lancaster/plan-your-visit-fort-lancaster", scope: "Self-guided and scheduled battlefield tours, gravel grounds, accessible transport alternatives and ruins." }],
    "mission-dolores": [{ label: "THC — Mission Dolores history and archaeology", url: "https://thc.texas.gov/state-historic-sites/mission-dolores/mission-dolores-history", scope: "Ais mission, archaeology, absence of original aboveground structures, trails and separate visitor facilities." }],

    "caddo-mounds": [
      { label: "THC — Caddo Mounds visitor access and accessible trails", url: "https://thc.texas.gov/state-historic-sites/caddo-mounds/plan-your-visit-caddo-mounds", scope: "Tuesday–Sunday schedule, museum access, 0.7-mile Mound Trail, trail limitations, visitor fees and accessibility." },
    ],
    "fanthorp-inn": [
      { label: "THC — Fanthorp Inn public and group visits", url: "https://thc.texas.gov/state-historic-sites/fanthorp-inn/plan-your-visit-fanthorp-inn", scope: "Free Friday–Sunday public visits, separate group tours, school tours, reservation timing and site facilities." },
    ],
    "landmark-inn": [
      { label: "THC — Landmark Inn public tours", url: "https://thc.texas.gov/state-historic-sites/landmark-inn/plan-your-visit-landmark-inn", scope: "Daytime admission, guided tour schedule, visitor facilities, parking and accessibility." },
      { label: "THC — Landmark Inn historic lodging", url: "https://thc.texas.gov/state-historic-sites/landmark-inn/overnight-accommodations-landmark-inn", scope: "Operator-managed historic guest rooms, reservation lead time, room features and the distinction between tours and overnight stays." },
    ],
    "fort-griffin": [
      { label: "THC — Fort Griffin visitor activities and tours", url: "https://thc.texas.gov/state-historic-sites/fort-griffin/plan-your-visit-fort-griffin", scope: "One- to two-hour tours, day-use activities, separate program times, hiking and visitor activities." },
    ],
  };
  for (const [needle, additions] of Object.entries(siteTourSources)) {
    if (officialUrl.includes(needle)) return [primary, ...additions];
  }
  if (officialUrl.includes("first-capitol-texas")) {
    return [primary, {
      label: "THC Atlas — 1979 First Capitol historical marker",
      url: "https://atlas.thc.texas.gov/Details/5039009560",
      scope: "Historical marker 9560 records the early Republic offices, 1837 transfer to Houston, the 1900 destruction of the original building, and construction of the 1976–77 replica. Not a claim of current visitor access.",
    }];
  }
  if (officialUrl.includes("lipantitlan")) {
    return [primary, {
      label: "Handbook of Texas — Lipantitlán State Historic Site",
      url: "https://www.tshaonline.org/handbook/entries/lipantitlan-state-historic-site",
      scope: "Site establishment, 1835 surrender, land donation, administration and historical-marker landscape; independent historical context.",
    }, {
      label: "THC Historic Sites Atlas — Fort Lipantitlán Centennial marker",
      url: "https://atlas.thc.texas.gov/Details/5355006315",
      scope: "1936 Centennial marker documenting the 1835 capture, distinct June 1842 assault, historic land donation and site identification; not a surviving 1830s building.",
    }];
  }
  if (officialUrl.includes("thc.texas.gov")) {
    return [
      primary,
      { label: "Texas Historical Commission — statewide historic-site directory", url: "https://thc.texas.gov/historic-sites", scope: "Texas statewide site administration and nearby historic-site discovery; this directory is not independent confirmation of individual historical dates." },
    ];
  }
  if (officialUrl.includes("cem.va.gov")) {
    return [
      primary,
      { label: "National Cemetery Administration — official visitor resources", url: "https://www.cem.va.gov/", scope: "Cemetery etiquette, national memorial programming, burial eligibility and visitor-services background, not a site-specific historical source." },
    ];
  }
  return [primary];
}

function firstLinkedItem(items: DestinationAreaItem[] | undefined): DestinationAreaItem | undefined {
  return items?.find((item) => Boolean(item.href)) ?? items?.[0];
}

export function enrichFullHistoricSiteAuthority(destination: Destination): Destination {
  // The closed battleship has an operator-verified, closure-aware visitor
  // guide. Older resolved/remote records can already carry a generic
  // authorityGuide, which must not bypass the closed-ship instructions.
  // Preserve normal first-writer precedence for every other historic site.
  const forceClosedBattleshipGuide = destination.slug === "battleship-texas";
  const researchItineraries = OPERATOR_RESEARCH_ITINERARIES[destination.slug];
  const operatorVisit = OPERATOR_RESEARCH_VISIT_NOTES[destination.slug];
  // Preserve a richer existing guide while incorporating newly verified
  // tour plans, official source links and practical access information.
  if (researchItineraries && destination.authorityGuide) {
    const operatorSources = authoritySources(destination.officialUrl || "", destination.name);
    const existing = destination.authorityGuide.sources;
    return {
      ...destination,
      ...operatorVisit,
      sourceCheckedAt: "2026-10-19",
      authorityGuide: {
        ...destination.authorityGuide,
        itineraries: researchItineraries,
        sources: [...existing, ...operatorSources.filter((source) => !existing.some((item) => item.url === source.url))],
      },
    };
  }
  if (!forceClosedBattleshipGuide && (destination.category !== "historic-sites" || destination.authorityGuide)) return destination;
  const establishedSeed = seeds.get(destination.slug);
  // Cover independently authored historic-site records outside the 46 seeds,
  // but only when enough source and unique planning data already exist.
  // Thin/missing records go to the audit queue; never fabricate historical facts.
  const derivedSeed = !establishedSeed && destination.officialUrl &&
    destination.areaGuide && destination.body.join(" ").length >= 260
    ? {
        slug: destination.slug,
        name: destination.name,
        county: destination.county || "",
        nearestTown: destination.nearestTown,
        officialUrl: destination.officialUrl,
        significance: destination.body[0] || destination.summary,
        visitAngle: destination.areaGuide.intro,
        themes: [
          destination.highlights[0] || "the site's history",
          destination.highlights[1] || "the preserved landscape",
          destination.highlights[2] || "local and regional history",
        ] as [string, string, string],
      } : undefined;
  const seed = establishedSeed ?? derivedSeed;
  if (!seed?.officialUrl) return destination;
  const nearby = firstLinkedItem(destination.areaGuide?.nearbyAttractions);
  const further = firstLinkedItem(destination.areaGuide?.sideTrips);
  const operator = seed.officialUrl.includes("cem.va.gov");
  const visit = SITE_VISIT_PROFILES[seed.slug];
  const focus = seed.themes.map((item) => item.trim()).filter(Boolean);
  const visitIntro = destination.areaGuide?.intro || seed.visitAngle;
  const nearbyLabel = nearby?.name || seed.nearestTown;
  const furtherLabel = further?.name || seed.county;

  const firstCapitolIsClosed = seed.slug === "first-capitol-of-texas";
  const closedSiteItineraries: DestinationAuthorityGuide["itineraries"] = [
    {
      label: "Understand the capital before the trip",
      duration: "At-home history research",
      steps: [
        "The Texas Historical Commission currently lists the First Capitol State Historic Site as Not Open; do not plan admission, a tour, or grounds access.",
        "Use the THC Atlas record of historical marker 9560 to distinguish the early Republic government buildings from the 1976–77 replica.",
        "Read why Sam Houston's government moved to Houston in 1837 and what happened to the original Columbia capitol building.",
      ],
    },
    {
      label: "Explore existing West Columbia history",
      duration: "Short public-area circuit",
      steps: [
        "Use public West Columbia historic-district streets and marked locations where access is legally permitted; the state-managed First Capitol site itself is not open.",
        "Explore the Stephen F. Austin Memorial as a separate site and verify its current access before traveling.",
        "Consult the Columbia Historical Museum's current schedule for indoor context; do not assume it shares the future THC site's hours.",
      ],
    },
    {
      label: "Follow the Republic's government history",
      duration: "Regional history itinerary",
      steps: [
        "Start with San Felipe de Austin to understand Austin's colonial settlement and early government.",
        "Plan a separate Washington-on-the-Brazos day around the independence convention and its currently ticketed museum/townsite hours.",
        "Compare the later seat of government in Houston with the West Columbia historical markers and the proposed First Capitol development.",
      ],
    },
  ];

  const oldSocorroIsClosed = seed.slug === "old-socorro-mission";
  const oldSocorroHistoryItineraries: DestinationAuthorityGuide["itineraries"] = [
    {
      label: "Read the former mission site",
      duration: "At-home historical research",
      steps: [
        "The original Old Socorro Mission State Historic Site is closed to the public, with no public services or facilities. Do not enter the protected archaeological location.",
        "Read the Texas Historical Commission's account of the 1682 Franciscan mission and Piro Pueblo community formed after the Pueblo Revolt.",
        "Trace the Rio Grande's flooding and the mission's nineteenth-century relocation before assuming the present-day church occupies the first site.",
      ],
    },
    {
      label: "Explore living Socorro heritage",
      duration: "Separate local visit",
      steps: [
        "Research visiting rules for the distinct, present-day Socorro Mission; it is an active religious site with its own operator.",
        "Use public interpretation on the El Paso Mission Trail to understand Ysleta, Socorro and San Elizario as connected but separate communities.",
        "Respect worship schedules and private property rather than using a map pin for the closed archaeological site as a visitor entrance.",
      ],
    },
    {
      label: "Follow the Pueblo Revolt aftermath",
      duration: "Regional history itinerary",
      steps: [
        "Study the 1680 Pueblo Revolt and the resettlement of displaced Piro and other Pueblo communities.",
        "Visit separately operated public mission or museum sites only when their current operator permits entry.",
        "Connect the mission-history account to Ysleta del Sur Pueblo's contemporary presence, not just a vanished colonial structure.",
      ],
    },
  ];

  // This ship is currently closed. Never reapply walk-up visitor steps from
  // the general historic-site fallback while restoration access is restricted.
  const battleshipTexasIsClosed = seed.slug === "battleship-texas";
  const battleshipTexasClosedItineraries: DestinationAuthorityGuide["itineraries"] = [
    {
      label: "Learn about Texas before traveling",
      duration: "At-home history research",
      steps: [
        "The Battleship Texas Foundation currently marks the ship CLOSED during restoration; do not plan ordinary boarding, an on-deck tour or walk-up access.",
        "Read the ship's 1914 commissioning, World War I Grand Fleet service, Normandy operations and Pacific campaigns in the linked historical guide.",
        "Explore the Foundation's official virtual exhibits and current restoration updates before assuming an announced reopening target is confirmed.",
      ],
    },
    {
      label: "Explore Galveston without boarding",
      duration: "Separate public-area trip",
      steps: [
        "Use only publicly permitted waterfront viewpoints; confirm whether the Pier 21 view and harbor access are available on the actual travel date.",
        "Visit independently operating Galveston harbor museums or the Strand, confirming each attraction's opening hours, location and admission separately.",
        "Do not navigate to the old San Jacinto berth or enter Gulf Copper's working shipyard to reach the closed vessel.",
      ],
    },
    {
      label: "Plan the future museum visit",
      duration: "After access is announced",
      steps: [
        "Follow the Battleship Texas Foundation for a confirmed Pier 15 opening and current public-access instructions; 2027 is a target rather than a guaranteed date.",
        "Confirm tickets, accessibility, entry location and any guided-tour restrictions before committing to an onboard visit.",
        "Only after reopening is confirmed, combine the ship with other Galveston maritime-history stops.",
      ],
    },
  ];

  const guide: DestinationAuthorityGuide = {
    whyItMatters: [
      seed.significance,
      visitIntro,
      ...(operator ? ["This is an active national cemetery. Burials, visiting families and committal services take precedence over sightseeing."] : []),
    ].filter(Boolean).join(" "),
    assessment: {
      recommendedVisit: visit?.recommendedVisit ?? (operator
        ? "A respectful cemetery visit takes priority over tourism. Confirm the VA’s current visitor rules before arrival."
        : "Choose a visit around the destination’s actual operating conditions and preserved features; check the operator for public access."),
      physicalEffort: visit?.physicalEffort ?? "Low to moderate",
      weatherExposure: visit?.weatherExposure ?? "Mixed indoor/outdoor",
      planningLevel: visit?.planningLevel ?? "Moderate",
      familyFit: firstCapitolIsClosed
        ? "The First Capitol property is not open. For families, use public West Columbia history resources or separately operating museums instead of planning access to the closed site."
        : battleshipTexasIsClosed
        ? "The ship is closed for ordinary boarding. Families can use the Foundation's virtual exhibits and open Galveston museums rather than planning entry to the restoration site."
        : oldSocorroIsClosed
        ? "Teach families about Piro Pueblo history and the 1680 Pueblo Revolt through public historical interpretation; the original site cannot be entered."
        : operator
        ? "Families can use the memorial landscape for age-appropriate conversations about service, remembrance and respectful behavior; active ceremonies must not be interrupted."
        : (destination.areaGuide?.familyStops?.[0]?.description ?? `Use ${focus[0] || seed.name} as the starting question, then connect one exhibit, building or landscape feature to the region's wider history. Check whether the operator offers family activities.`),
      firstTimeValue: firstCapitolIsClosed
        ? "Begin with the THC's historical marker record and current Not Open notice; use separately open public venues to explore West Columbia history."
        : battleshipTexasIsClosed
        ? "Start with the Foundation's current CLOSED notice and virtual exhibits; use only public waterfront viewpoints or separately open museums until a future ship reopening is confirmed."
        : oldSocorroIsClosed
        ? "Read the THC account of the protected original mission site, then plan any in-person visit only at the distinct operating Socorro Mission or other public Mission Trail venues."
        : `Start with the operator's interpretive information to understand ${focus[0] || "the history"}, then follow the site itself instead of relying only on a photo or commemorative marker.`,
    },
    itineraries: battleshipTexasIsClosed ? battleshipTexasClosedItineraries : firstCapitolIsClosed ? closedSiteItineraries : oldSocorroIsClosed ? oldSocorroHistoryItineraries : OPERATOR_RESEARCH_ITINERARIES[seed.slug] ?? [
      {
        label: "The focused visit",
        duration: "Short visit",
        steps: [
          `Check ${seed.name}'s official access arrangements and any active preservation or closure notice.`,
          `Orient to the site's central story: ${focus[0] || "its historical role"}.`,
          `Locate the main preserved feature, memorial or interpretive setting; do not enter restricted spaces.`,
        ],
      },
      {
        label: "Read the place more deeply",
        duration: "Unhurried visit",
        steps: [
          `Begin with the full historical background: ${seed.significance}`,
          `Compare the site's interpretation of ${focus[1] || focus[0] || "the historical period"} with its physical setting.`,
          `Look for context on ${focus[2] || "regional change"} and distinguish original features from later preservation or commemoration.`,
        ],
      },
      {
        label: "Regional history route",
        duration: "Half-day or longer",
        steps: [
          `Visit ${seed.name} when the site's actual access schedule permits.`,
          `Continue to ${nearbyLabel}; confirm whether it is a separate site with different hours and admission.`,
          `If time and distance allow, add ${furtherLabel} as a distinct history stop rather than compressing every destination into one visit.`,
        ],
      },
    ],
    sources: authoritySources(seed.officialUrl, seed.name),
  };

  return {
    ...destination,
    authorityGuide: guide,
    ...(operatorVisit ? { ...operatorVisit, sourceCheckedAt: "2026-10-19" } : {}),
  };
}

export const fullHistoricSiteAuthoritySeeds = historicSiteSeeds.map((site) => site.slug);
