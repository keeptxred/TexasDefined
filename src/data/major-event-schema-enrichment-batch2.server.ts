import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string, url?: string): EventSchemaEntity => ({ type: "PerformingGroup", name, ...(url ? { url } : {}) });
const person = (name: string, url?: string): EventSchemaEntity => ({ type: "Person", name, ...(url ? { url } : {}) });

// Research pass completed against official event, organizer, municipal, venue, and ticket sources.
// Optional properties are intentionally omitted when the current event year has no stable public value.
export const majorEventSchemaEnrichmentBatch2: MajorEventSchemaEnrichment[] = [

  {
    slug: "greenville-armed-forces-day-fly-in",
    organizer: organization("Greenville Municipal Airport / City of Greenville", "https://www.greenvilleflyin.org/"),
    sources: [
      { label: "Organizer-confirmed May 8, 2027 free fly-in and aircraft rides", url: "https://www.greenvilleflyin.org/" },
      { label: "Greenville Majors Field official aviation history", url: "https://www.greenvilletx.gov/193/About-Majors-Field-Airport" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "tyler-magnificent-warbird-expo",
    organizer: organization("Cedar Creek Veterans Foundation", "https://ccveteransfoundation.org/"),
    sources: [
      { label: "Official 2026 Tyler Warbird Expo", url: "https://ccveteransfoundation.org/the-warbird-expo/" },
      { label: "Official 2026 participating aircraft", url: "https://ccveteransfoundation.org/lineup-warbird-expo/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "thunder-over-cedar-creek-lake-airshow",
    organizer: organization("Cedar Creek Veterans Foundation", "https://ccveteransfoundation.org/"),
    sources: [{ label: "CCVF — July 4, 2026 at 6 p.m. over Cedar Creek Lake", url: "https://ccveteransfoundation.org/thunder-over-cedar-creek-lake-airshow/" }],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "stephanie-nichols-georgetown-car-plane-show",
    organizer: organization("Stephanie Nichols", "https://www.eventbrite.com/e/stephanie-nichols-15th-annual-car-plane-show-at-georgetown-airport-tickets-1966964740488"),
    sources: [
      { label: "Organizer's 2026 Georgetown Car & Plane Show event page", url: "https://www.eventbrite.com/e/stephanie-nichols-15th-annual-car-plane-show-at-georgetown-airport-tickets-1966964740488" },
      { label: "Devil Dog Squadron archived 2026 bomber ride details", url: "https://www.devildogsquadron.com/lhfe_flights/177" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "biplanes-breakfast-rockport",
    organizer: organization("Wings Over Rockport", "https://www.facebook.com/events/s/biplanes-and-breakfast-a-wings/830516746248487/"),
    sources: [
      { label: "Organizer 2026 Biplanes & Breakfast post", url: "https://www.facebook.com/events/s/biplanes-and-breakfast-a-wings/830516746248487/" },
      { label: "Aviation event archive — May 23, 2026 date and ride registration details", url: "https://av8maps.com/event/biplanes-and-breakfast-a-wings-over-rockport-fundraiser-2/" },
    ],
    verifiedAt: "2026-10-17",
  },

  {
    slug: "ranger-old-school-fly-in-airshow",
    organizer: organization("Ranger Airfield Foundation", "https://www.rangerairfield.org/"),
    sources: [
      { label: "Ranger Airfield Foundation — 2027 verified dates, tickets, flying windows", url: "https://www.rangerairfield.org/airshow" },
      { label: "Ranger Airfield preservation mission", url: "https://www.rangerairfield.org/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "fall-festival-of-flight-gainesville",
    organizer: organization("Texas Chapter, Antique Airplane Association", "https://texasantiqueairplane.com/"),
    sources: [{ label: "Texas Antique Airplane Association — 65th Fall Festival of Flight, September 18, 2027", url: "https://texasantiqueairplane.com/flyin.html" }],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "fiesta-of-flight-laughlin",
    organizer: organization("47th Flying Training Wing, Laughlin Air Force Base", "https://www.laughlin.af.mil/"),
    image: {
      url: "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2604/9651994/1000w_q95.jpg",
      alt: "U.S. Air Force F-35A Lightning II and P-51 Mustang heritage flight at Fiesta of Flight, Laughlin Air Force Base, March 28, 2026 (archival)",
      sourceUrl: "https://www.dvidshub.net/image/9651994/f-35a-demonstration-team-laughlin-afb",
      sourceType: "government-open",
      rightsNote: "Official public-domain U.S. Air Force photograph by Staff Sgt. Zachary Rufus, March 28, 2026, at Fiesta of Flight; archival 2026 event scene, not evidence of a future announced lineup.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Laughlin AFB public affairs — 2026 program", url: "https://www.laughlin.af.mil/News/News/Display/Article/4404606/laughlin-afb-releases-initial-performer-list-for-2026-fiesta-of-flight/" },
      { label: "Laughlin AFB official 2026 portal", url: "https://www.laughlin.af.mil/Fiesta-of-Flight-2026/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "thunder-over-east-texas-athens",
    organizer: organization("Cedar Creek Veterans Foundation", "https://athenstx.gov/"),
    sources: [{ label: "City of Athens — July 3, 2026 schedule, admission, parking", url: "https://athenstx.gov/Calendar.aspx?EID=1370" }],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "caf-high-sky-wing-airsho",
    organizer: organization("Commemorative Air Force High Sky Wing", "https://www.airsho.org/"),
    sources: [
      { label: "City of Midland — September 12–13, 2026 AIRSHO", url: "https://www.midlandtexas.gov/Calendar.aspx?EID=3935&calType=0&day=29&month=9&year=2026" },
      { label: "CAF 35-year AIRSHO post-event aircraft recap", url: "https://www.commemorativeairforce.org/news/airsho-celebrates-35-years" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "dallas-warbird-weekend",
    organizer: organization("Commemorative Air Force National Aviation Education Center", "https://flynaec.org/"),
    sources: [
      { label: "CAF — Dallas Warbird Weekend April 11, 2026", url: "https://commemorativeairforce.org/events/663" },
      { label: "CAF AirPower History Tour — flight options in 2026", url: "https://commemorativeairforce.org/events/662" },
      { label: "NAEC Warbird Weekend organizer", url: "https://flynaec.org/warbird-weekend/" },
    ],
    verifiedAt: "2026-10-17",
  },

  {
    slug: "rose-city-airfest",
    organizer: organization("Rose City Airfest / CampV", "https://www.rosecityairfest.com/"),
    sources: [
      { label: "Official Rose City Airfest 2026 event dates and performers", url: "https://www.rosecityairfest.com/" },
      { label: "Official 2026 tickets, age categories and final-sale terms", url: "https://www.rosecityairfest.com/tickets/airshow" },
      { label: "Official 2026 parking and shuttles", url: "https://www.rosecityairfest.com/info/map/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "corsicana-airsho",
    organizer: organization("Commemorative Air Force Coyote Squadron", "https://commemorativeairforce.org/units/26"),
    sources: [
      { label: "Official 2026 Corsicana Airsho listing", url: "https://commemorativeairforce.org/events/865" },
      { label: "CAF Coyote Squadron Corsicana heritage", url: "https://commemorativeairforce.org/units/26" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "addison-kaboom-town-airshow",
    organizer: organization("Town of Addison", "https://visitaddison.com/kaboom-town/"),
    sources: [
      { label: "Official Addison Kaboom Town 2026 air show timing", url: "https://visitaddison.com/kaboom-town/activities/" },
      { label: "Official viewing, tickets, travel, and hotel policy", url: "https://visitaddison.com/kaboom-town/event-info/" },
      { label: "Official organizer hotel packages", url: "https://visitaddison.com/kaboom-town/addison-kaboom-town-hotel-packages/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "laredo-stars-stripes-airshow",
    organizer: organization("Washington's Birthday Celebration Association", "https://wbcalaredo.org/"),
    sources: [
      { label: "Official WBCA 2026 Stars and Stripes schedule and vendor location", url: "https://wbcalaredo.org/wp-content/uploads/2025/10/2025_2026-Vendor-Application-2.pdf" },
      { label: "Official WBCA 2026 festival program", url: "https://wbcalaredo.org/wp-content/uploads/2026/02/By-George-2026_Final.pdf" },
    ],
    verifiedAt: "2026-10-17",
  },

  {
    slug: "great-texas-airshow",
    organizer: organization("Joint Base San Antonio, 502d Air Base Wing", "https://www.jbsa.mil/GreatTexasAirshow/"),
    image: {
      url: "https://media.defense.gov/2022/Apr/26/2002984190/-1/-1/0/220423-F-FD742-0173.JPG",
      alt: "U.S. Air Force Thunderbirds flying at the Great Texas Airshow at JBSA-Randolph in 2022; historical image, not an announced future lineup",
      sourceUrl: "https://www.jbsa.mil/News/News/Article/3010427/great-texas-airshow-thrills-more-than-half-million-attendees/",
      sourceType: "government-open",
      rightsNote: "Official U.S. Air Force photo, Great Texas Airshow at JBSA-Randolph, April 2022. Archival government photograph, not the 2026 or any future program.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Official JBSA 2026 event release", url: "https://www.jbsa.mil/News/News/Article/4376885/press-release-the-great-texas-airshow-returns-to-jbsa-randolph-may-2-3/" },
      { label: "Official JBSA 2026 event traffic guidance", url: "https://www.jbsa.mil/News/News/Article/4463066/the-great-texas-airshow-kicks-off-at-jbsa-randolph-may-2-3/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "wings-over-south-texas",
    organizer: organization("Naval Air Station Kingsville", "https://www.wingsoversouthtexas.com/"),
    image: {
      url: "https://d2cto119c3bgok.cloudfront.net/thumbs/photos/2605/9666893/1000w_q95.jpg",
      alt: "Blue Angels over Naval Air Station Kingsville at the 2026 Wings Over South Texas Air Show, April 18, 2026; archival photograph",
      sourceUrl: "https://www.dvidshub.net/image/9666893/us-navy-blue-angels-headline-2026-wings-over-south-texas-air-show-naval-air-station-kingsville-texas",
      sourceType: "government-open",
      rightsNote: "U.S. Marine Corps public-domain photo by Cpl. Christian Salazar, taken April 18, 2026 at Naval Air Station Kingsville; DVIDS photo ID 9666893.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Official NAS Kingsville Wings Over South Texas site", url: "https://www.wingsoversouthtexas.com/" },
      { label: "Official 2026 public dates and military access", url: "https://www.wingsoversouthtexas.com/modules/media/?do=inline&id=ca201fc1-61f4-4420-a095-bfd5e9747542" },
      { label: "Organizer visitor questions", url: "https://www.wingsoversouthtexas.com/information/faqs" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "wasp-homecoming-fly-in",
    organizer: organization("National WASP WWII Museum", "https://waspmuseum.org/"),
    sources: [
      { label: "Official 2026 Homecoming", url: "https://waspmuseum.org/events/2026-wasp-homecoming/" },
      { label: "Homecoming heritage and itinerary", url: "https://waspmuseum.org/wasp-heritage-events/" },
    ],
    verifiedAt: "2026-10-17",
  },  {
    slug: "amigo-airsho",
    organizer: organization("Amigo Airsho", "https://www.amigoairsho.com/home"),
    image: {
      url: "https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2410/8695491/1000w_q95.jpg",
      alt: "Vanguard Squadron aerobatic aircraft performing at Amigo Airsho on Fort Bliss, October 12, 2024; archival photo, not a 2026 performer announcement",
      sourceUrl: "https://www.dvidshub.net/image/8695491/amigo-airsho-returns-fort-bliss",
      sourceType: "government-open",
      rightsNote: "U.S. Army photo by Sgt. Charlie Duke at Amigo Airsho, Oct. 12, 2024; DVIDS identifies the photograph as public domain; historical, not current-year lineup.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Amigo Airsho 2026 official schedule", url: "https://www.amigoairsho.com/home" },
      { label: "Amigo Airsho 2026 tickets", url: "https://www.amigoairsho.com/tickets" },
      { label: "Amigo Airsho visitor and base access FAQ", url: "https://www.amigoairsho.com/faqs" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "texas-capital-air-show",
    organizer: organization("Texas Capital Air Show", "https://texascapitalairshow.com/"),
    sources: [
      { label: "Texas Capital Air Show 2026 schedule", url: "https://texascapitalairshow.com/guest-information/schedule/" },
      { label: "Texas Capital Air Show admission and parking", url: "https://texascapitalairshow.com/tickets/" },
      { label: "Texas Capital Air Show accessibility information", url: "https://texascapitalairshow.com/guest-information/accessibility/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "bluebonnet-airshow",
    organizer: organization("Commemorative Air Force Highland Lakes Squadron", "https://www.bluebonnetairshow.com/"),
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/49/C-47B_Skytrain_-serial_43-49942_Bluebonnet_Belle-26Oct2008.jpg",
      alt: "The Commemorative Air Force Highland Lakes Squadron's Bluebonnet Belle C-47 at Burnet Airport in 2008; archival photo, not a 2027 show image",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:C-47B_Skytrain_-serial_43-49942_Bluebonnet_Belle-26Oct2008.jpg",
      sourceType: "wikimedia",
      licenseName: "Creative Commons Attribution-ShareAlike 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      rightsNote: "Photo: Jim Thompson (2008); unmodified archival aircraft photo at Burnet Airport, not a 2027 performer confirmation.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Bluebonnet Airshow 2027 schedule", url: "https://www.bluebonnetairshow.com/" },
      { label: "Archive photo attribution, context and CC BY-SA 2.0 license", url: "https://commons.wikimedia.org/wiki/File:C-47B_Skytrain_-serial_43-49942_Bluebonnet_Belle-26Oct2008.jpg" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "wings-over-cowtown-airshow",
    organizer: organization("Wings Over Cowtown Air Show", "https://www.wingsovercowtown.com/"),
    image: {
      url: "https://media.defense.gov/2024/Apr/17/2003441602/-1/-1/0/240411-N-DN159-2536.JPG",
      alt: "U.S. Navy Blue Angels flying at Wings Over Cowtown at Naval Air Station Joint Reserve Base Fort Worth on April 13, 2024; archival image, not 2027",
      sourceUrl: "https://www.navy.mil/Resources/Photo-Gallery/igphoto/2003441602/",
      sourceType: "government-open",
      rightsNote: "U.S. Navy photo by Mass Communication Specialist 2nd Class Crayton Agnew (April 2024); U.S. federal government official image. This documents the 2024 event, not the 2027 program.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Wings Over Cowtown organizer website", url: "https://www.wingsovercowtown.com/" },
      { label: "Official U.S. Navy Blue Angels 2027 air-show schedule", url: "https://www.blueangels.navsea.cloud.navy.mil/show/" },
      { label: "U.S. Navy archival photo and credit", url: "https://www.navy.mil/Resources/Photo-Gallery/igphoto/2003441602/" },
    ],
    verifiedAt: "2026-10-17",
  },
  {
    slug: "texas-sandfest",
    organizer: organization("Texas SandFest", "https://www.texassandfest.org/"),
    offers: [
      usdOffer("3-day adult general admission", 30, "https://www.texassandfest.org/knowbeforeyougo"),
      usdOffer("3-day youth general admission", 5, "https://www.texassandfest.org/knowbeforeyougo"),
      usdOffer("Child age 5 and under admission", 0, "https://www.texassandfest.org/knowbeforeyougo"),
      usdOffer("1-day VIP Experience", 250, "https://www.texassandfest.org/knowbeforeyougo"),
    ],
    sources: [
      { label: "Texas SandFest official 2027 visitor and ticket information", url: "https://www.texassandfest.org/knowbeforeyougo" },
      { label: "Texas SandFest official history and nonprofit background", url: "https://www.texassandfest.org/history" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "austin-film-festival",
    organizer: organization("Austin Film Festival, Inc.", "https://austinfilmfestival.com/"),
    offers: [
      usdOffer("Film Pass", 80, "https://shop.austinfilmfestival.com/"),
      usdOffer("Lone Star Badge", 175, "https://shop.austinfilmfestival.com/"),
      usdOffer("Weekend Badge", 340, "https://shop.austinfilmfestival.com/"),
      usdOffer("Conference Badge", 480, "https://shop.austinfilmfestival.com/"),
      usdOffer("Producers Badge", 710, "https://shop.austinfilmfestival.com/"),
    ],
    sources: [
      { label: "Austin Film Festival official site", url: "https://austinfilmfestival.com/" },
      { label: "Austin Film Festival official badge and pass shop", url: "https://shop.austinfilmfestival.com/" },
      { label: "Austin Film Festival official policies", url: "https://austinfilmfestival.com/policies/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "dickens-on-the-strand",
    organizer: organization("Galveston Historical Foundation", "https://www.galvestonhistory.org/"),
    sources: [
      { label: "Galveston Historical Foundation official Dickens on The Strand page", url: "https://www.galvestonhistory.org/events/dickens-on-the-strand" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "scarborough-renaissance-festival",
    organizer: organization("Southwest Festivals, LLC", "https://www.srfestival.com/"),
    sources: [
      { label: "Scarborough Renaissance Festival official site", url: "https://www.srfestival.com/" },
      { label: "Scarborough Renaissance Festival official tickets", url: "https://www.srfestival.com/tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "kerrville-folk-festival",
    organizer: organization("Kerrville Folk Festival Foundation", "https://www.kerrvillefolkfestival.org/"),
    sources: [
      { label: "Kerrville Folk Festival Foundation official site", url: "https://www.kerrvillefolkfestival.org/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "wings-over-houston-airshow",
    organizer: organization("CAF Wings Over Houston Airshow", "https://wingsoverhouston.com/"),
    performers: [
      group("USAF Thunderbirds", "https://www.afthunderbirds.com/"),
      group("NASA Freedom 250 F-5 team", "https://www.nasa.gov/freedom250/"),
      group("United Airlines 777 Demo", "https://www.united.com/"),
      group("F-4D Phantom II — The Collings Foundation", "https://www.collingsfoundation.org/aircrafts/f-4d-phantom/"),
      group("NextGen Eagles", "https://thenextgeneagles.com/"),
      group("The Pink Jet", "https://thepinkjet.org/"),
      group("F-100 Super Sabre — The Collings Foundation", "https://www.collingsfoundation.org/aircrafts/north-american-f-100f-super-sabre/"),
    ],
    sources: [
      { label: "Wings Over Houston official 2026 performer list", url: "https://wingsoverhouston.com/show-info/performers/" },
      { label: "Wings Over Houston official event information", url: "https://wingsoverhouston.com/show-info/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "central-texas-state-fair",
    organizer: organization("Central Texas State Fair Association", "https://www.centraltexasstatefair.com/"),
    sources: [
      { label: "Central Texas State Fair official association background", url: "https://www.centraltexasstatefair.com/about.aspx" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "bandera-round-up-cattle-drive",
    organizer: organization("Bandera County Chamber of Commerce", "https://www.banderachamber.com/"),
    offers: [usdOffer("Public admission", 0, "https://www.banderachamber.com/2026/09/05/501345/bandera-round-up-longhorn-cattle-drive-parade-2/")],
    sources: [
      { label: "Bandera County Chamber official Round-Up event page", url: "https://www.banderachamber.com/2026/09/05/501345/bandera-round-up-longhorn-cattle-drive-parade-2/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "addison-oktoberfest",
    organizer: organization("Town of Addison", "https://www.addisontx.gov/"),
    sources: [
      { label: "Addison Oktoberfest official site", url: "https://www.addisonoktoberfest.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "fort-bend-county-fair-rodeo",
    organizer: organization("Fort Bend County Fair Association", "https://www.fortbendcountyfair.com/"),
    offers: [usdOffer("2026 Season Pass", 54, "https://www.fortbendcountyfair.com/p/tickets--deals")],
    performers: [person("David Lewis"), person("Josh Meloy"), person("Pat Green"), person("Vincent Mason"), person("Gary P. Nunn")],
    sources: [
      { label: "Fort Bend County Fair Association official background", url: "https://www.fortbendcountyfair.com/p/about" },
      { label: "Fort Bend County Fair official 2026 tickets and concert admissions", url: "https://www.fortbendcountyfair.com/p/tickets--deals" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "mckinney-oktoberfest",
    organizer: organization("McKinney Main Street", "https://www.mckinneytexas.org/115/Main-Street"),
    offers: [usdOffer("General festival admission", 0, "https://www.mckinneytexas.org/400/Holiday-Activities-and-Camps")],
    sources: [
      { label: "City of McKinney official 2026 Oktoberfest listing", url: "https://www.mckinneytexas.org/400/Holiday-Activities-and-Camps" },
      { label: "City of McKinney Main Street special-event information", url: "https://www.mckinneytexas.org/1343/Special-Event-Vendor-Opportunities" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "fort-worth-oktoberfest",
    organizer: organization("Prost Production", "https://fortworthoktoberfest.com/"),
    offers: [
      usdOffer("3-day festival admission", 20, "https://fortworthoktoberfest.com/tickets/"),
      usdOffer("Thursday single-day admission", 10, "https://fortworthoktoberfest.com/tickets/"),
      usdOffer("Friday single-day admission", 15, "https://fortworthoktoberfest.com/tickets/"),
      usdOffer("Saturday single-day admission", 15, "https://fortworthoktoberfest.com/tickets/"),
    ],
    sources: [
      { label: "Fort Worth Oktoberfest official site", url: "https://fortworthoktoberfest.com/" },
      { label: "Fort Worth Oktoberfest official ticket information", url: "https://fortworthoktoberfest.com/tickets/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "west-texas-fair-rodeo",
    organizer: organization("Expo Center of Taylor County", "https://www.taylorcountyexpocenter.com/"),
    offers: [
      usdOffer("PRCA Rodeo reserved box seat", 25, "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo"),
      usdOffer("PRCA Rodeo adult reserved balcony seat", 20, "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo"),
      usdOffer("PRCA Rodeo child through college reserved admission", 7, "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo"),
    ],
    sources: [
      { label: "Expo Center of Taylor County official West Texas Fair & Rodeo page", url: "https://www.taylorcountyexpocenter.com/events/wtfr" },
      { label: "Official 2026 PRCA Rodeo ticket information", url: "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo" },
      { label: "Expo Center of Taylor County nonprofit background", url: "https://www.taylorcountyexpocenter.com/p/about/history" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "denton-blues-festival",
    organizer: organization("Denton Black Chamber of Commerce", "https://dentonblackchamberonline.org/"),
    offers: [usdOffer("Festival admission", 0, "https://www.dentonbluesfest.com/")],
    performers: [person("Mathias Lattin"), person("EJ Mathews"), person("Mz Connie Mo")],
    sources: [
      { label: "Denton Blues Festival official site", url: "https://www.dentonbluesfest.com/" },
      { label: "Denton Blues Festival official FAQ", url: "https://www.dentonbluesfest.com/faq" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-sounds-country-music-awards",
    organizer: organization("East Texas Performing Arts, Inc.", "https://www.texassounds.org/"),
    offers: [
      usdOffer("3-Night Festival Pass", 129, "https://www.texassounds.org/"),
      usdOffer("VIP All-Access", 249, "https://www.texassounds.org/"),
    ],
    performers: [
      person("Ally Joyce"),
      person("Amber Rae"),
      group("Crooks & Straights"),
      person("Daniel Borge"),
      person("Joe Fields"),
      group("Alamo Country Band"),
    ],
    sources: [
      { label: "Texas Sounds official 2026 lineup and ticket information", url: "https://www.texassounds.org/" },
      { label: "Texas Sounds official organization contact", url: "https://www.texassounds.org/contact/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "terlingua-international-chili-championship",
    organizer: organization("Chili Appreciation Society International, Inc.", "https://www.casichili.net/"),
    sources: [
      { label: "CASI official Terlingua International Chili Championship", url: "https://www.casichili.net/ticc-home-page.html" },
      { label: "CASI official organization information", url: "https://www.casichili.net/about-casi.html" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "austin-celtic-festival",
    organizer: organization("Austin Celtic Association & Celtic Cultural Center of Texas", "https://www.austincelticfestival.com/"),
    offers: [
      usdOffer("Adult daily admission", 25, "https://www.austincelticfestival.com/tickets"),
      usdOffer("Child age 5–16 daily admission", 12, "https://www.austincelticfestival.com/tickets"),
      usdOffer("Child under 5 admission", 0, "https://www.austincelticfestival.com/tickets"),
      usdOffer("Adult weekend pass", 40, "https://www.austincelticfestival.com/tickets"),
      usdOffer("Child weekend pass", 20, "https://www.austincelticfestival.com/tickets"),
    ],
    sources: [
      { label: "Austin Celtic Festival official 2026 tickets", url: "https://www.austincelticfestival.com/tickets" },
      { label: "Austin Celtic Festival official site", url: "https://www.austincelticfestival.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "houston-thanksgiving-day-parade",
    organizer: organization("City of Houston Mayor's Office of Special Events", "https://www.houstontx.gov/specialevents/"),
    sources: [
      { label: "City of Houston official H-E-B Thanksgiving Day Parade page", url: "https://www.houstontx.gov/thanksgivingparade/index.html" },
      { label: "City of Houston Mayor's Office of Special Events", url: "https://www.houstontx.gov/specialevents/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "charro-days-fiesta",
    organizer: organization("Charro Days, Inc.", "https://www.charrodaysfiesta.com/"),
    performers: [
      person("Jay Perez"),
      group("Y Luna"),
      group("The Spazzmatics"),
      group("The Latin Breed"),
      group("Mariachi 7 Leguas"),
      group("Little Joe y La Familia"),
      person("Gary Hobbs"),
    ],
    sources: [
      { label: "Charro Days official 2027 events and entertainment", url: "https://www.charrodaysfiesta.com/copy-of-images-1" },
      { label: "Charro Days official site", url: "https://www.charrodaysfiesta.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "chappell-hill-bluebonnet-festival",
    organizer: organization("Chappell Hill Historical Society", "https://chappellhillhistoricalsociety.com/"),
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas%20Bluebonnets%20%2825085818956%29.jpg",
      alt: "Texas bluebonnets blooming in spring, shown as a representative wildflower image for the Chappell Hill Bluebonnet Festival guide",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_Bluebonnets_(25085818956).jpg",
    },
    sources: [
      { label: "Chappell Hill Historical Society official 2027 Bluebonnet Festival page", url: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/" },
      { label: "Wikimedia Commons — USDA public-domain Texas bluebonnets photograph", url: "https://commons.wikimedia.org/wiki/File:Texas_Bluebonnets_(25085818956).jpg" },
    ],
    verifiedAt: "2026-09-12",
  },
  {
    slug: "burnet-bluebonnet-festival",
    organizer: organization("Burnet Chamber of Commerce", "https://burnetchamber.org/"),
    offers: [usdOffer("General festival admission", 0, "https://bluebonnetfestival.org/faqs/")],
    sources: [
      { label: "Bluebonnet Festival official site", url: "https://bluebonnetfestival.org/" },
      { label: "Bluebonnet Festival official admission FAQ", url: "https://bluebonnetfestival.org/faqs/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "main-st-fort-worth-arts-festival",
    organizer: organization("Downtown Fort Worth Initiatives, Inc.", "https://mainstreetartsfest.org/"),
    offers: [usdOffer("Festival admission", 0, "https://mainstreetartsfest.org/")],
    sources: [
      { label: "MAIN ST. Fort Worth Arts Festival official site", url: "https://mainstreetartsfest.org/" },
      { label: "MAIN ST. official contact and presenter information", url: "https://mainstreetartsfest.org/contact-us/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "buc-days",
    organizer: organization("Buccaneer Commission", "https://bucdays.com/"),
    sources: [
      { label: "Buc Days official site", url: "https://bucdays.com/" },
      { label: "Buc Days official history and Buccaneer Commission background", url: "https://bucdays.com/history/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "houston-auto-show",
    organizer: organization("Houston Automobile Dealers Association", "https://www.houstoncardealers.com/"),
    sources: [
      { label: "Houston Auto Show official site", url: "https://www.houstonautoshow.com/" },
      { label: "Houston Automobile Dealers Association official site", url: "https://www.houstoncardealers.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "fulton-oysterfest",
    organizer: organization("Fulton Volunteer Fire Department", "https://fultonoysterfest.org/"),
    sources: [
      { label: "Fulton Oysterfest official 2027 site", url: "https://fultonoysterfest.org/" },
      { label: "Fulton Oysterfest official organizer and event background", url: "https://fultonoysterfest.org/oysterfest-about/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "parker-county-peach-festival",
    organizer: organization("Weatherford Chamber of Commerce", "https://weatherford-chamber.com/"),
    sources: [
      { label: "Parker County Peach Festival official site", url: "https://www.parkercountypeachfestival.org/" },
      { label: "Parker County Peach Festival official sponsorship information", url: "https://www.parkercountypeachfestival.org/sponsors.html" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "valero-texas-open",
    organizer: organization("Valero Energy Foundation", "https://valerotexasopen.com/"),
    sources: [
      { label: "Valero Texas Open official 2027 fact sheet", url: "https://valerotexasopen.com/facts/" },
      { label: "Valero Texas Open official tournament staff and management", url: "https://valerotexasopen.com/staff/" },
      { label: "Valero Texas Open official tickets", url: "https://valerotexasopen.com/tickets/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "red-river-rivalry",
    performers: [
      organization("Texas Longhorns", "https://texaslonghorns.com/"),
      organization("Oklahoma Sooners", "https://soonersports.com/"),
    ],
    sources: [
      { label: "Texas Longhorns official Red River Rivalry game page", url: "https://texaslonghorns.com/game-center/22498" },
      { label: "Oklahoma Sooners official athletics site", url: "https://soonersports.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "formula-1-united-states-grand-prix",
    organizer: organization("Circuit of the Americas LLC", "https://circuitoftheamericas.com/"),
    offers: [usdOffer("3-day General Admission Grounds Pass", 450, "https://circuitoftheamericas.com/ticket/f1-general-admission/")],
    performers: [group("Maroon 5"), person("Post Malone"), person("Alesso")],
    sources: [
      { label: "Circuit of The Americas official 2026 Formula 1 event page", url: "https://circuitoftheamericas.com/event/f1/" },
      { label: "Circuit of The Americas official 2026 F1 ticket policy naming the promoter", url: "https://circuitoftheamericas.com/ticket-policy/" },
      { label: "Circuit of The Americas official 3-day GA ticket price", url: "https://circuitoftheamericas.com/ticket/f1-general-admission/" },
      { label: "Formula 1 official 2026 United States Grand Prix page", url: "https://www.formula1.com/en/racing/2026/united-states" },
    ],
    verifiedAt: "2026-09-01",
  },
];