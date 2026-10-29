import type { HuntingAuthorityTopic } from "./authority";
import turkeyCalendar from "./turkey-season-calendar.json";

// Editor-reviewed against TPWD's 2026–27 Outdoor Annual and turkey-management sources.
// Do not advance this date automatically from a scheduled source check.
export const TURKEY_GUIDE_LAST_VERIFIED = "2026-10-29";
export const TURKEY_GUIDE_VERIFIED_LABEL = "October 29, 2026";

export const TURKEY_SEASONS_2026_27 = turkeyCalendar.rows;
const seasonDates = (id: string): string => {
  const row = TURKEY_SEASONS_2026_27.find((item) => item.id === id);
  if (!row) throw new Error(`Missing verified TPWD turkey season: ${id}`);
  return row.dates;
};

const source = (label: string, href: string) => ({ label, href, external: true });
const link = (label: string, href: string) => ({ label, href });
const tpwdTurkey = source("TPWD: 2026–27 wild turkey rules, county lookup and zone maps", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey");
const tpwdDates = source("TPWD: 2026–27 hunting season dates", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates");
const tpwdReport = source("TPWD: harvest reporting instructions and statewide data", "https://tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml");
const tpwdBiology = source("TPWD: wild turkey management, habitat and 2026 survey", "https://tpwd.texas.gov/huntwild/wild/game_management/turkey/");
const texasAgriLife = source("Texas A&M AgriLife: Rio Grande and other Texas wild turkey subspecies", "https://wildlife.tamu.edu/wildlifemanagement/turkeys/");
const tpwdDrawn = source("TPWD: 2026–27 National Refuge Spring Turkey drawings", "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-category-details.phtml?OCat=NTS");
const tpwdAPHFinder = source("TPWD: public hunt Area / Legal Game Search", "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml");
const tpwdAPHPermit = source("TPWD: 2026–27 Annual Public Hunting Permit access", "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/");
const tpwdHarvestData = source("TPWD: official turkey harvest data by county", "https://tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml");
const tpwdHagerman = source("TPWD: Hagerman NWR 2027 turkey draw", "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UP");
const tpwdEastLake = source("TPWD: Lower Rio Grande Valley NWR–East Lake 2027 turkey draw", "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UE");
const tpwdChange = source("TPWD: 2026–27 regulation changes", "https://tpwd.texas.gov/newsmedia/releases/?req=20260401b");

export const TURKEY_HUNTING_TOPIC: HuntingAuthorityTopic = {
  slug: "turkey-hunting",
  reviewedOn: TURKEY_GUIDE_LAST_VERIFIED,
  reviewedLabel: TURKEY_GUIDE_VERIFIED_LABEL,
  eyebrow: "Texas wild turkey hunting · 2026–27",
  title: "Texas Turkey Hunting: 2026–27 Seasons, Regulations & Where to Hunt",
  description: "Texas turkey hunting guide with 2026–27 TPWD season dates, zone differences, bag limits, tagging and harvest reporting, habitat, public hunts and planning advice.",
  quickAnswer: `Texas turkey seasons depend on the county and hunt type. Fall archery only: ${seasonDates("archery-fall")} in counties with open fall seasons. Fall North: ${seasonDates("fall-north")}; fall South: ${seasonDates("fall-south")}. Spring South: ${seasonDates("spring-south")}; North: ${seasonDates("spring-north")}; one-turkey counties: ${seasonDates("spring-one")}; East: ${seasonDates("spring-east")}. An appropriate hunting license and upland-game-bird endorsement are required; harvests must be tagged and reported. Matagorda and Wharton are closed for 2026–27.`,
  about: ["Texas turkey hunting", "Rio Grande wild turkey hunting Texas", "Eastern wild turkey hunting Texas", "2026 2027 turkey hunting season Texas", "Texas turkey hunting zones", "wild turkey harvest reporting"],
  sections: [
    {
      heading: "Choose a county before choosing a date",
      paragraphs: [
        "The dates above are season frameworks, not blanket permission to hunt everywhere in the zone. TPWD lists wild turkey seasons in 175 of Texas's 254 counties in its 2026–27 Outdoor Annual. Open counties may have fall and spring hunts, spring-only opportunities, one-gobbler restrictions, youth seasons or special East Zone rules. A county boundary — and in some counties a highway boundary — can change the regulations.",
        "Start with the TPWD turkey page's county selector and official spring/fall zone maps. Confirm that the exact address, hunting property, season type, permitted bird and method are eligible. Do not assume a general zone table overrides a closed county or a public-property hunt notice.",
        "Important 2026–27 closure: Matagorda and Wharton counties have no wild turkey hunting season. Older statewide and one-gobbler-zone lists may still name these counties; the newly adopted closure controls. Never rely on a historical map without checking the current county rule.",
      ],
      links: [tpwdTurkey, tpwdChange, link("Browse Texas counties", "/browse/counties")],
    },
    {
      heading: "Bag limits, sex restrictions and East Texas exceptions",
      paragraphs: [
        "TPWD's annual turkey bag limit is four birds in aggregate across the state's turkey subspecies and counties, with no more than one from the East Zone. That is an overall ceiling, not four birds in every county. The county-specific bag limit can be lower, including one-gobbler spring counties. In the Western One-Gobbler Zone no more than one gobbler may be harvested annually per county; verify current county rules and remember that Matagorda and Wharton are closed.",
        "A major 2026–27 change prohibits harvesting unbearded hens statewide. Depending on the county and season, the lawful composition is gobblers only or gobblers and bearded hens. A beard does not by itself establish that every bearded hen is lawful in a gobblers-only hunt. Check the county listing and, on a public hunt, the legal-game restrictions.",
        "The East Zone has additional spring requirements: shotgun and lawful archery equipment are the permitted methods, and hunting over bait is not allowed. TPWD names Bowie, Fannin, Lamar and Red River only north of U.S. 82, along with the other listed East Zone counties; the agency's current Jasper/Angelina National Forest wording should be checked for the exact property.",
      ],
      links: [tpwdTurkey],
    },
    {
      heading: "License, upland-bird endorsement and hunter education",
      paragraphs: [
        "For turkey, obtain the appropriate valid Texas hunting license and upland game bird endorsement before the hunt. License eligibility and endorsements differ for residents, nonresidents, youth and certain packages. Licenses do not create access to another person's land, and the endorsement does not replace permission or a public-hunt permit.",
        "Texas hunter-education rules are a separate check. TPWD generally requires certification for hunters born on or after September 2, 1971, subject to age-related accompaniment and deferral provisions. Youth-only season eligibility is not the same as the age at which a child can purchase a youth license. Read both sets of rules before planning a mentored or family hunt.",
      ],
      links: [link("Texas hunting license guide", "/hunting/texas-hunting-license"), link("Hunter education requirements", "/hunting/hunter-education"), link("Youth-only hunting guide", "/hunting/youth-hunting"), tpwdTurkey],
    },
    {
      heading: "Tagging, proof of sex and mandatory harvest reporting",
      paragraphs: [
        "Immediately after a successful hunt, securely attach the required tag from a physical hunting license to the turkey. Digital-license hunters must follow TPWD's separate digital tagging instructions; they should not assume a physical paper tag is used. Before leaving for the hunt, check which license and tagging method you will actually have available.",
        "Every wild turkey harvested in an open Texas county must be reported. TPWD requires reporting within 24 hours for physical-license hunters; its turkey-management guidance specifies immediate reporting for digital-license hunters. Reporting can be completed through the Texas Hunt & Fish app or TPWD's official online portal. A harvest report does not replace tagging.",
        "Where sex restrictions apply, retain the required proof of sex until final processing. TPWD describes proof for gobblers as a leg including the spur or a patch of skin with breast feathers and beard attached; for lawful bearded hens it describes a patch of skin with breast feathers and beard attached. Familiarize yourself with the original rule before field dressing a bird.",
      ],
      links: [tpwdTurkey, tpwdReport],
    },
    {
      heading: "Where Rio Grande and Eastern turkeys live in Texas",
      paragraphs: [
        "Rio Grande wild turkeys are the main hunting subspecies through much of the Hill Country, Edwards Plateau, North Texas and South Texas. Productive landscapes combine large roost trees, water, open ground for feeding, brush and grasses for nesting, and corridors that let birds move among those features. The abundance at any one ranch or public parcel is not guaranteed by regional reputation.",
        "Eastern wild turkeys occupy selected wooded areas of East Texas and are generally less widespread and harder to locate. Hardwood bottomlands, mixed timber, openings and connected forest cover can be important, but spring seasons and legal methods are more narrowly regulated in the East Zone. TPWD's habitat material explains why large, connected landscapes matter.",
        "West Texas habitat is patchy. River drainages, dependable roost trees and suitable cover can support local Rio Grande flocks, but broad desert geography is not a reliable proxy for huntable turkey abundance. Historical records and recent observations describe Merriam's-type birds in localized West Texas mountain habitats, but introductions and interbreeding can complicate subspecies identification; current genetic identity and distribution deserve caution. A mountain range is not proof of a huntable Merriam's population. The hunting regulations still depend on the exact county, date and property.",
      ],
      links: [tpwdBiology, texasAgriLife, link("Wild turkey species profile", "/wildlife-species/wild-turkey"), link("Texas wildlife destinations", "/explore/wildlife")],
    },
    {
      heading: "Scouting a spring turkey hunt",
      paragraphs: [
        "Scout for fresh tracks and scratching in leaf litter, droppings, feathers and observed feeding routes without disturbing roosts. At a distance, listen at first light and around sunset to learn where birds use the landscape; do not assume the first gobble marks a safe or accessible approach. A legal approach and permission matter as much as finding birds.",
        "In spring, toms may respond to calls while moving among hens. A deliberate, restrained calling plan can be more useful than constant calling; wind, hunting pressure and flock behavior change the response. Do not stalk an unseen caller or shoot at sound or movement. Clearly identify the entire bird and a safe background before taking any shot.",
        "Rainfall influences nesting cover, insect availability and recruitment. TPWD's 2026 summer survey found 1.82 poults per hen statewide, down from recent years, while observed turkeys per 1,000 miles increased from 9.21 in 2025 to 11.38 in 2026. These are monitoring indicators, not a prediction that a specific field or county will hold birds on opening morning.",
      ],
      links: [tpwdReport, tpwdBiology],
    },
    {
      heading: "Planning a fall turkey hunt",
      paragraphs: [
        "Fall Rio Grande turkeys commonly use feeding areas and larger seasonal flocks. Rather than assuming the spring calling pattern will work, concentrate on travel corridors, roosting habitat, food such as acorns and seeds, and current water sources. Weather, drought and hunting pressure can quickly change where birds spend the day.",
        "October's archery-only period and the regular November openings are separate season types. Archery equipment must meet TPWD's current legal-method rules; a fall date shown for one zone does not establish that a particular county or public unit is open. Do not shoot roosting birds: TPWD prohibits hunting roosting turkeys at any time.",
      ],
      links: [tpwdTurkey, link("Texas archery hunting guide", "/hunting/archery-hunting")],
    },
    {
      heading: "Public turkey hunting: access is not automatic",
      paragraphs: [
        "Most turkey habitat in Texas is on private or otherwise access-controlled land. Never mistake a state park, national forest, wildlife refuge or wildlife management area for an unrestricted hunting opportunity. Each unit can impose a permit system, separate hunt dates, allowable methods, hunt boundaries, check-in or drawn selection.",
        "For 2027, TPWD lists Hagerman NWR (April 22–24; 24 permits; one gobbler only; designated compartments; archery or birdshot shotgun with non-toxic shot no larger than #4) and Lower Rio Grande Valley NWR–East Lake (April 2–4 and April 9–11; eight permits; one gobbler or bearded hen; birdshot shotgun). Both require a successful National Refuge Spring Turkey draw. TPWD lists a November 1, 2026 application deadline, a $3 adult application fee and an $80 adult permit fee if selected. Check actual hunt catalog entries before applying.",
        "To pursue walk-in access, open TPWD's 2026–27 Area / Legal Game Search, select turkey as legal game and read the specific unit's map, legal-game box, season dates, permitted methods and registration rules. The $48 Annual Public Hunting Permit applies only to participating areas where turkey is listed; the $12 Limited Public Use Permit does not authorize hunting. Some areas require drawn, postcard or youth selection instead, and the official finder may require JavaScript.",
      ],
      links: [tpwdAPHFinder, tpwdAPHPermit, tpwdDrawn, tpwdHagerman, tpwdEastLake, link("Texas drawn hunts", "/hunting/drawn-hunts"), link("Annual Public Hunting Permit", "/hunting/annual-public-hunting-permit"), link("Find public hunting areas", "/hunting/public-hunting")],
    },
    {
      heading: "South Texas, Hill Country, North Texas and East Texas trip choices",
      paragraphs: [
        "Hill Country and Edwards Plateau: evaluate river-bottom and oak-savanna corridors, nearby water, roosting trees and permission on the exact parcel. Junction and the South Llano corridor are useful for learning about Rio Grande turkey habitat, but visiting a state park to see turkeys does not confer a right to hunt there.",
        "South Texas brush country: focus on a mix of wooded draws, water, grazed openings and suitable roost trees. Confirm whether the county is in the standard South Zone or one of the four with a longer fall season. A hunting outfitter's advertised package does not replace a license or county-rule check.",
        "North Texas: creek bottoms, pasture–woodland edges and river corridors can support Rio Grande birds. Public access is often a more important constraint than habitat; investigate official draw and walk-in catalogs before traveling. East Texas: favor connected woodland and hardwood habitat, then check special spring-only, East Zone and bait/method restrictions.",
      ],
      links: [tpwdTurkey, tpwdBiology, link("Texas state parks and habitat destinations", "/explore/state-parks"), link("Plan a Texas trip", "/explore/trip-planner")],
    },
    {
      heading: "Using TPWD turkey harvest numbers responsibly",
      paragraphs: [
        "TPWD publishes statewide summer turkey observations and historical county-level harvest reports. These provide useful broad trends but are not live population counts. Hunter effort, compliance with reporting, property ownership and legal access influence the figures.",
        "Compare the official TPWD harvest data with the current county regulations and Area / Legal Game Search. A county with more reported harvests does not guarantee good public access; a historical harvest number or map cannot authorize hunting any property.",
      ],
      links: [tpwdHarvestData, tpwdAPHFinder, tpwdTurkey],
    },
    {
      heading: "Equipment, field safety and ethical harvest",
      paragraphs: [
        "Pack the essentials for the specific legal hunt: license and endorsement, proof of access or drawing selection, offline map, water, first-aid supplies, weather protection, blaze-orange gear where required by the property, and a way to file the TPWD harvest report. For a legal shotgun or bow hunt, confirm the equipment and ammunition restrictions for that zone and hunt notice rather than assuming a general statewide setup.",
        "Never imitate a turkey by moving through another hunter's calling area, and never identify a target solely from a sound, color patch or movement. Confirm what is beyond the bird, follow safe firearm or bow-handling practices, and avoid approaching a bird or decoy when other hunters could be present. TPWD also prohibits hunting a turkey on the roost.",
        "Take only a legal bird and comply with tagging, proof-of-sex and reporting requirements before transport. Preserve usable meat promptly and use the current official regulations for all after-harvest obligations.",
      ],
      links: [tpwdTurkey, link("Texas hunting hub", "/hunting")],
    },
    {
      heading: "How TexasDefined verifies this guide",
      paragraphs: [
        "This guide was reviewed October 29, 2026 against TPWD's live 2026–27 wild turkey regulation page, 2026–27 hunting date table, April 2026 adopted-regulation announcement, turkey-management reporting page, and the public-draw and individual hunt listings, the current public-access catalog, and turkey harvest data. It is an independent trip-planning article, not a government publication or substitute for the Outdoor Annual.",
        "The official TPWD species page and county selector control the hunting dates and limits for your chosen county. If TPWD revises a season, closes a county, changes reporting procedures, or updates a hunt catalog after the editorial verification date, that newer official rule controls. TexasDefined checks official regulation sources weekly, reviews public access and harvest data quarterly, and uses a two-source updater for verified same-season date corrections. Legal restrictions and new season years require editorial verification, not automatic publication.",
      ],
      links: [tpwdTurkey, tpwdDates, tpwdChange, tpwdReport, tpwdBiology, tpwdDrawn, tpwdAPHFinder, tpwdHarvestData],
    },
  ],
  related: [
    link("Turkey ecology and identification", "/wildlife-species/wild-turkey"),
    link("2026–27 hunting seasons", "/hunting/hunting-seasons"),
    link("Licenses and endorsements", "/hunting/texas-hunting-license"),
    link("Youth hunting", "/hunting/youth-hunting"),
    link("Public land hunting", "/hunting/public-hunting"),
    link("Drawn hunts", "/hunting/drawn-hunts"),
    link("Find wildlife destinations", "/explore/wildlife"),
    link("Texas camping trips", "/best-places-to-go-camping-in-texas"),
  ],
  faq: [
    { question: "When does turkey season open in Texas in 2026–27?", answer: `Where allowed, archery-only fall season is ${seasonDates("archery-fall")}, and regular fall dates begin ${seasonDates("fall-north")} in the North Zone or ${seasonDates("fall-south")} in the South Zone. Spring: South ${seasonDates("spring-south")}, North ${seasonDates("spring-north")}, one-turkey counties ${seasonDates("spring-one")}, and East ${seasonDates("spring-east")}. Check the actual county, special restrictions and hunt type.` },
    { question: "Do I need a special endorsement to hunt turkey in Texas?", answer: "Yes. TPWD requires an Upland Game Bird Endorsement as well as the appropriate hunting license. Additional public-property permits and hunter-education requirements may apply." },
    { question: "How many turkeys may I harvest in Texas?", answer: "The statewide annual aggregate ceiling is four turkeys, with no more than one from the East Zone. Some counties and hunts have a one-gobbler or other lower bag limit. Do not apply the statewide ceiling as a per-county allowance." },
    { question: "Can I harvest a hen turkey in 2026–27?", answer: "Unbearded hens are prohibited statewide. Some seasons allow gobblers and bearded hens while others allow gobblers only; check the current county and property-specific bag composition." },
    { question: "Which Texas counties are closed to turkey hunting in 2026–27?", answer: "Matagorda and Wharton are closed under the 2026–27 TPWD changes. Other counties may also lack a turkey season; check TPWD's county selector before making plans." },
    { question: "Do I have to report a Texas turkey harvest?", answer: "Yes. TPWD requires mandatory statewide reporting. Hunters using a physical license must report within 24 hours; digital-license users must follow TPWD's immediate reporting instructions. Tagging is also required." },
    { question: "Is it legal to hunt wild turkey over bait in East Texas?", answer: "No in the special East Zone spring season. TPWD explicitly prohibits hunting over bait in those East Zone counties and restricts methods to shotguns and lawful archery equipment. Confirm the county boundary and other applicable rules." },
    { question: "Where can I hunt turkey on public land in Texas?", answer: "Start with TPWD's Area / Legal Game Search, select turkey and inspect the individual area's legal-game box, map and required permit. Hagerman NWR and Lower Rio Grande Valley NWR–East Lake offer specific 2027 spring turkey drawn-hunt opportunities, not walk-in access." },
    { question: "Are wild turkeys common in every part of Texas?", answer: "No. Rio Grande birds occupy much of Central, North and South Texas; Eastern birds occupy selected East Texas woodlands; small western reports of Merriam's-type birds warrant caution because subspecies identity and distribution are not conclusively established. Local habitat, rainfall, seasons and lawful access vary considerably." },
    { question: "Can I hunt turkey at a Texas state park?", answer: "Not merely because turkeys live there. A state park is not automatically open to hunting. Only a specifically authorized hunt with its required permit and instructions would permit it." },
  ],
};
