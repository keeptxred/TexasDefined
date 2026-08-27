import type { TexasEvent, TexasRegion } from "./types";

export interface MajorEventIndexRecord {
  slug: string;
  name: string;
  city: string;
  countySlug?: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  startDate: string;
  endDate?: string;
  dateNote?: string;
  venue?: string;
  officialUrl: string;
  sourceCheckedAt: string;
}

// Client-safe occurrence metadata. Long-form guide copy stays server-only.
export const majorEventIndexRecords: MajorEventIndexRecord[] = [
  { slug: "grapefest", name: "GrapeFest", city: "Grapevine", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "food", startDate: "2026-09-17", endDate: "2026-09-20", venue: "Historic Downtown Grapevine", officialUrl: "https://www.grapevinetexasusa.com/grapefest/general-information/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-renaissance-festival", name: "Texas Renaissance Festival", city: "Todd Mission", region: "prairies-lakes", category: "culture", startDate: "2026-10-10", endDate: "2026-11-29", dateNote: "Open Saturdays and Sundays during the published season, plus Thanksgiving Friday; check the official calendar before traveling.", venue: "Texas Renaissance Festival", officialUrl: "https://www.texrenfest.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-rose-festival", name: "Texas Rose Festival", city: "Tyler", countySlug: "smith", countyName: "Smith County", region: "piney-woods", category: "culture", startDate: "2026-10-15", endDate: "2026-10-18", venue: "Tyler", officialUrl: "https://www.texasrosefestival.org/", sourceCheckedAt: "2026-08-26" },
  { slug: "wurstfest", name: "Wurstfest", city: "New Braunfels", countySlug: "comal", countyName: "Comal County", region: "hill-country", category: "food", startDate: "2026-11-06", endDate: "2026-11-15", venue: "Wurstfest grounds", officialUrl: "https://wurstfest.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "fort-worth-stock-show-rodeo", name: "Fort Worth Stock Show & Rodeo", city: "Fort Worth", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "rodeo", startDate: "2027-01-15", endDate: "2027-02-06", venue: "Will Rogers Memorial Center and Dickies Arena", officialUrl: "https://www.fwssr.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "san-antonio-stock-show-rodeo", name: "San Antonio Stock Show & Rodeo", city: "San Antonio", countySlug: "bexar", countyName: "Bexar County", region: "south-texas", category: "rodeo", startDate: "2027-02-11", endDate: "2027-02-28", venue: "Frost Bank Center and Freeman Coliseum grounds", officialUrl: "https://www.sarodeo.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "sxsw", name: "South by Southwest (SXSW)", city: "Austin", countySlug: "travis", countyName: "Travis County", region: "hill-country", category: "culture", startDate: "2027-03-15", endDate: "2027-03-21", venue: "Downtown Austin venues", officialUrl: "https://sxsw.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-sandfest", name: "Texas SandFest", city: "Port Aransas", countySlug: "nueces", countyName: "Nueces County", region: "gulf-coast", category: "culture", startDate: "2027-04-16", endDate: "2027-04-18", venue: "Port Aransas beach festival grounds", officialUrl: "https://www.texassandfest.org/", sourceCheckedAt: "2026-08-26" },
  { slug: "austin-film-festival", name: "Austin Film Festival", city: "Austin", countySlug: "travis", countyName: "Travis County", region: "hill-country", category: "culture", startDate: "2026-10-29", endDate: "2026-11-05", venue: "Downtown Austin and partner venues", officialUrl: "https://austinfilmfestival.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "dickens-on-the-strand", name: "Dickens on The Strand", city: "Galveston", countySlug: "galveston", countyName: "Galveston County", region: "gulf-coast", category: "culture", startDate: "2026-12-04", endDate: "2026-12-06", venue: "The Strand National Historic Landmark District", officialUrl: "https://www.galvestonhistory.org/events/dickens-on-the-strand", sourceCheckedAt: "2026-08-27" },
  { slug: "houston-livestock-show-rodeo", name: "Houston Livestock Show and Rodeo", city: "Houston", countySlug: "harris", countyName: "Harris County", region: "gulf-coast", category: "rodeo", startDate: "2027-03-02", endDate: "2027-03-21", venue: "NRG Park", officialUrl: "https://www.rodeohouston.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "fiesta-san-antonio", name: "Fiesta San Antonio", city: "San Antonio", countySlug: "bexar", countyName: "Bexar County", region: "south-texas", category: "culture", startDate: "2027-04-15", endDate: "2027-04-25", venue: "Citywide San Antonio venues", officialUrl: "https://fiestasanantonio.org/", sourceCheckedAt: "2026-08-27" },
  { slug: "scarborough-renaissance-festival", name: "Scarborough Renaissance Festival", city: "Waxahachie", countySlug: "ellis", countyName: "Ellis County", region: "prairies-lakes", category: "culture", startDate: "2027-04-10", endDate: "2027-05-31", dateNote: "The official season runs weekends and Memorial Day; check the organizer calendar for exact operating days before traveling.", venue: "Scarborough Renaissance Festival", officialUrl: "https://www.srfestival.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "kerrville-folk-festival", name: "Kerrville Folk Festival", city: "Kerrville", countySlug: "kerr", countyName: "Kerr County", region: "hill-country", category: "music", startDate: "2027-05-27", endDate: "2027-06-13", venue: "Quiet Valley Ranch", officialUrl: "https://www.kerrvillefolkfestival.org/", sourceCheckedAt: "2026-08-27" },
  { slug: "wings-over-houston-airshow", name: "Wings Over Houston Airshow", city: "Houston", countySlug: "harris", countyName: "Harris County", region: "gulf-coast", category: "culture", startDate: "2026-10-31", endDate: "2026-11-01", venue: "Ellington Airport", officialUrl: "https://wingsoverhouston.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "central-texas-state-fair", name: "Central Texas State Fair", city: "Belton", countySlug: "bell", countyName: "Bell County", region: "prairies-lakes", category: "seasonal", startDate: "2026-09-03", endDate: "2026-09-06", venue: "Cadence Bank Center fairgrounds", officialUrl: "https://www.centraltexasstatefair.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "bandera-round-up-cattle-drive", name: "Bandera Round-Up Longhorn Cattle Drive & Parade", city: "Bandera", countySlug: "bandera", countyName: "Bandera County", region: "hill-country", category: "culture", startDate: "2026-09-05", endDate: "2026-09-05", venue: "Main Street and Bandera County Courthouse", officialUrl: "https://www.banderachamber.com/2026/09/05/501345/bandera-round-up-longhorn-cattle-drive-parade-2/", sourceCheckedAt: "2026-08-27" },
  { slug: "addison-oktoberfest", name: "Addison Oktoberfest", city: "Addison", countySlug: "dallas", countyName: "Dallas County", region: "prairies-lakes", category: "food", startDate: "2026-09-17", endDate: "2026-09-20", venue: "Addison Circle Park", officialUrl: "https://www.addisonoktoberfest.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "fort-bend-county-fair-rodeo", name: "Fort Bend County Fair & Rodeo", city: "Rosenberg", countySlug: "fort-bend", countyName: "Fort Bend County", region: "gulf-coast", category: "rodeo", startDate: "2026-09-24", endDate: "2026-10-04", dateNote: "The fair and rodeo run September 24 through October 4; the separate BBQ weekend begins September 18.", venue: "Fort Bend County Fairgrounds", officialUrl: "https://www.fortbendcountyfair.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "mckinney-oktoberfest", name: "McKinney Oktoberfest", city: "McKinney", countySlug: "collin", countyName: "Collin County", region: "prairies-lakes", category: "food", startDate: "2026-09-25", endDate: "2026-09-27", venue: "Historic Downtown McKinney Square", officialUrl: "https://www.mckinneytexas.org/calendar.aspx?CID=34%2C40%2C44%2C30&month=9&view=list&year=2026", sourceCheckedAt: "2026-08-27" },
  { slug: "fort-worth-oktoberfest", name: "Fort Worth Oktoberfest", city: "Fort Worth", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "food", startDate: "2026-09-24", endDate: "2026-09-26", venue: "Trinity Park", officialUrl: "https://fortworthoktoberfest.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "west-texas-fair-rodeo", name: "West Texas Fair & Rodeo", city: "Abilene", countySlug: "taylor", countyName: "Taylor County", region: "prairies-lakes", category: "rodeo", startDate: "2026-09-10", endDate: "2026-09-19", dateNote: "The fair runs September 10-19; the 2026 PRCA Pro Rodeo is scheduled September 15-19 at 7:30 p.m.", venue: "Expo Center of Taylor County", officialUrl: "https://www.taylorcountyexpocenter.com/events/wtfr", sourceCheckedAt: "2026-08-27" },
  { slug: "denton-blues-festival", name: "Denton Blues Festival", city: "Denton", countySlug: "denton", countyName: "Denton County", region: "prairies-lakes", category: "music", startDate: "2026-09-19", endDate: "2026-09-19", venue: "Quakertown Park", officialUrl: "https://www.dentonbluesfest.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "texas-sounds-country-music-awards", name: "Texas Sounds International Country Music Awards Festival", city: "Marshall", countySlug: "harrison", countyName: "Harrison County", region: "piney-woods", category: "music", startDate: "2026-10-01", endDate: "2026-10-04", dateNote: "Competitive performances run October 1-3, followed by the awards program October 4; a downtown welcome event is scheduled September 30.", venue: "Memorial City Hall Performance Center", officialUrl: "https://www.texassounds.org/", sourceCheckedAt: "2026-08-27" },
  { slug: "terlingua-international-chili-championship", name: "CASI Terlingua International Chili Championship", city: "Terlingua", countySlug: "brewster", countyName: "Brewster County", region: "big-bend", category: "food", startDate: "2026-11-03", endDate: "2026-11-07", venue: "Rancho CASI de los Chisos", officialUrl: "https://www.casichili.net/ticc-home-page.html", sourceCheckedAt: "2026-08-27" },
  { slug: "austin-celtic-festival", name: "Austin Celtic Festival", city: "Austin", countySlug: "travis", countyName: "Travis County", region: "hill-country", category: "culture", startDate: "2026-11-07", endDate: "2026-11-08", venue: "Pioneer Farms", officialUrl: "https://www.austincelticfestival.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "houston-thanksgiving-day-parade", name: "H-E-B Thanksgiving Day Parade", city: "Houston", countySlug: "harris", countyName: "Harris County", region: "gulf-coast", category: "seasonal", startDate: "2026-11-26", endDate: "2026-11-26", venue: "Downtown Houston", officialUrl: "https://www.houstontx.gov/thanksgivingparade/index.html", sourceCheckedAt: "2026-08-27" },
  { slug: "charro-days-fiesta", name: "Charro Days Fiesta", city: "Brownsville", countySlug: "cameron", countyName: "Cameron County", region: "south-texas", category: "culture", startDate: "2027-02-25", endDate: "2027-02-27", dateNote: "Core 2027 parade and festival dates run February 25-27; related Charro Days programming begins earlier and the carnival continues into March, so check the official schedule for the event you plan to attend.", venue: "Downtown Brownsville and partner venues", officialUrl: "https://www.charrodaysfiesta.com/", sourceCheckedAt: "2026-08-27" },
  { slug: "chappell-hill-bluebonnet-festival", name: "Official State of Texas Bluebonnet Festival", city: "Chappell Hill", countySlug: "washington", countyName: "Washington County", region: "prairies-lakes", category: "seasonal", startDate: "2027-04-10", endDate: "2027-04-11", venue: "Historic Downtown Chappell Hill", officialUrl: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/", sourceCheckedAt: "2026-08-27" },
  { slug: "burnet-bluebonnet-festival", name: "Bluebonnet Festival of Texas", city: "Burnet", countySlug: "burnet", countyName: "Burnet County", region: "hill-country", category: "seasonal", startDate: "2027-04-09", endDate: "2027-04-11", venue: "Historic Burnet Square", officialUrl: "https://bluebonnetfestival.org/", sourceCheckedAt: "2026-08-27" },
  { slug: "main-st-fort-worth-arts-festival", name: "MAIN ST. Fort Worth Arts Festival", city: "Fort Worth", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "culture", startDate: "2027-04-15", endDate: "2027-04-18", venue: "Main Street in Downtown Fort Worth", officialUrl: "https://mainstreetartsfest.org/", sourceCheckedAt: "2026-08-27" },
  { slug: "buc-days", name: "Buc Days", city: "Corpus Christi", countySlug: "nueces", countyName: "Nueces County", region: "gulf-coast", category: "rodeo", startDate: "2027-04-29", endDate: "2027-05-09", venue: "Buc Days Festival Grounds and Hilliard Center Arena", officialUrl: "https://bucdays.com/", sourceCheckedAt: "2026-08-27" },
];

export const verifiedMajorEventOccurrences: TexasEvent[] = majorEventIndexRecords.map((event) => ({
  id: `authority:${event.slug}`,
  brandId: "texasdefined",
  slug: event.slug,
  name: event.name,
  blurb: `Major annual event in ${event.city}. Confirm current details with the organizer before traveling.`,
  city: event.city,
  region: event.region,
  startDate: event.startDate,
  endDate: event.endDate,
  category: event.category,
  venue: event.venue,
  officialUrl: event.officialUrl,
  sourceName: "Official organizer",
  sourceCheckedAt: event.sourceCheckedAt,
}));

export const majorEventsForCounty = (countySlug: string) => majorEventIndexRecords
  .filter((event) => event.countySlug === countySlug)
  .sort((a, b) => a.startDate.localeCompare(b.startDate));
