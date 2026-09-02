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
    sources: [
      { label: "Chappell Hill Historical Society official 2027 Bluebonnet Festival page", url: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/" },
    ],
    verifiedAt: "2026-09-01",
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
