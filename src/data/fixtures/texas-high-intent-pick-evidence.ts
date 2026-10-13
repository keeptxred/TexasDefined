/**
 * Item-level official documentation: link each best-of recommendation back to
 * its own lake-specific agency fishery, not just one generic statewide homepage.
 *
 * SOURCE COVERAGE IS NOT FULL EDITORIAL APPROVAL. Each pick still requires
 * factual field-by-field and photography review before a public release.
 */
export interface GuidePickEvidence {
  title: string;
  officialUrl: string;
  internalHref: string;
  sourceCheckedAt: string;
  reviewingAuthority: string;
}
export const texasGuidePickEvidence: Record<number, GuidePickEvidence[]> = {
  106: [
    { title: "Lake Fork — trophy largemouth bass", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/", internalHref: "/fishing/lakes/lake-fork", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Texoma — striped bass and broad-water fishing", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/", internalHref: "/fishing/lakes/lake-texoma", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Sam Rayburn Reservoir — a multi-species East Texas trip", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/", internalHref: "/fishing/lakes/sam-rayburn-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Toledo Bend Reservoir — destination bass fishing", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/", internalHref: "/fishing/lakes/toledo-bend-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Livingston — white bass and catfish priorities", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/", internalHref: "/fishing/lakes/lake-livingston", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Canyon Lake — Hill Country striped and white bass", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/", internalHref: "/fishing/lakes/canyon-lake", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Choke Canyon Reservoir — South Texas bass and catfish", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/", internalHref: "/fishing/lakes/choke-canyon-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Conroe — a Houston-area multi-species option", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/", internalHref: "/fishing/lakes/lake-conroe", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Amistad Reservoir — a remote border-lake experience", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/", internalHref: "/fishing/lakes/amistad-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Possum Kingdom Reservoir — rocky scenery with a fishery", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/", internalHref: "/fishing/lakes/possum-kingdom-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
  ],
  107: [
    { title: "Palo Duro Canyon State Park — camp near canyon trails", officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", internalHref: "/destination/palo-duro-canyon-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — canyon camping and site types" },
    { title: "Garner State Park — a Frio River vacation", officialUrl: "https://tpwd.texas.gov/state-parks/garner", internalHref: "/destination/garner-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — park camping and Frio River facilities" },
    { title: "Mustang Island State Park — beach-oriented camping", officialUrl: "https://tpwd.texas.gov/state-parks/mustang-island", internalHref: "/destination/mustang-island-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — coastal camping and beach access" },
    { title: "Caddo Lake State Park — East Texas water and woods", officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake", internalHref: "/destination/caddo-lake-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — developed RV/campground choices" },
    { title: "Brazos Bend State Park — an outdoor base near Houston", officialUrl: "https://tpwd.texas.gov/state-parks/brazos-bend", internalHref: "/destination/brazos-bend-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — campsite and wildlife logistics" },
    { title: "Inks Lake State Park — central Hill Country water", officialUrl: "https://tpwd.texas.gov/state-parks/inks-lake", internalHref: "/destination/inks-lake-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — lake camping and swimming" },
    { title: "Balmorhea State Park — a distinctive West Texas overnight", officialUrl: "https://tpwd.texas.gov/state-parks/balmorhea/fees-facilities/campsites", internalHref: "/destination/balmorhea-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — individual RV-site electrical service and campsite inventory" },
    { title: "Atlanta State Park — a Northeast Texas lake base", officialUrl: "https://tpwd.texas.gov/state-parks/atlanta", internalHref: "/destination/atlanta-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — RV camping and Wright Patman Lake" },
    { title: "Abilene State Park — an accessible West-Central Texas stop", officialUrl: "https://tpwd.texas.gov/state-parks/abilene", internalHref: "/destination/abilene-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks & Wildlife — reservable camping and facility details" },
    { title: "Andy Bowie County Park — South Padre Island coastal access", officialUrl: "https://www.cameroncountytx.gov/parks-coastal-parks/parks-andy-bowie/", internalHref: "/explore/rv-parks", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Cameron County Parks — reservations, renovation closure warning and current operations" },
  ],
  114: [
    { title: "Bullock Texas State History Museum — broad Texas storytelling", officialUrl: "https://tickets.thestoryoftexas.com/mainstore?categoryId=1237&vid=0", internalHref: "/destination/bullock-texas-state-history-museum", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Bullock Museum official admission and current visitor rules" },
    { title: "Perot Museum of Nature and Science — family science day", officialUrl: "https://www.perotmuseum.org/visit/", internalHref: "/destination/perot-museum-nature-science-dallas", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Perot Museum exhibits, accessibility, hours and ticket rules" },
    { title: "Witte Museum — nature, people and regional heritage", officialUrl: "https://www.wittemuseum.org/plan-your-visit/", internalHref: "/destination/witte-museum", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Witte Museum operator current admissions and visitor access" },
    { title: "National Museum of the Pacific War — focused military history", officialUrl: "https://www.pacificwarmuseum.org/visit", internalHref: "/destination/national-museum-pacific-war", sourceCheckedAt: "2026-10-12", reviewingAuthority: "NMPW official gallery access, separate Pacific Combat Zone hours and operator rules" },
    { title: "Museum of the Big Bend — understand Far West Texas", officialUrl: "https://www.museumofthebigbend.com/visit/", internalHref: "/destination/museum-of-the-big-bend-alpine", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Museum of the Big Bend Sul Ross campus entrance, hours, accessibility" },
    { title: "Panhandle–Plains Historical Museum — Panhandle regional depth", officialUrl: "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates", internalHref: "/destination/panhandle-plains-historical-museum-canyon", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Museum official closure notice — museum building NOT currently admitting visitors" },
    { title: "George Ranch Historical Park — interpreted rural history", officialUrl: "https://www.georgeranch.org/visit/hours-admissions-directions/", internalHref: "/destination/george-ranch-historical-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "The George Ranch operator: Saturday general admission, weekday prebooked visits" },
    { title: "Kimbell Art Museum — a concentrated art visit", officialUrl: "https://kimbellart.org/visit", internalHref: "/explore/museums", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Kimbell Art Museum free permanent collection, exhibition ticket rules" },
    { title: "Museum of Fine Arts, Houston — major art collections", officialUrl: "https://www.mfah.org/visit", internalHref: "/explore/museums", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Museum of Fine Arts Houston Sarofim campus, tickets and accessibility" },
    { title: "Texas State Aquarium — marine education and conservation", officialUrl: "https://www.texasstateaquarium.org/plan-your-visit/visitor-information/", internalHref: "/explore/museums", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas State Aquarium operator: separate aquarium and wildlife conservation institution, cashless payment and seasonal amenities" },
  ],
  110: [
    { title: "Inks Lake State Park — classic Highland Lakes swimming", officialUrl: "https://tpwd.texas.gov/state-parks/inks-lake", internalHref: "/destination/inks-lake-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park swimming access" },
    { title: "Tyler State Park — wooded lake swimming", officialUrl: "https://tpwd.texas.gov/state-parks/tyler", internalHref: "/destination/tyler-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park lake access and activities" },
    { title: "Lake Tawakoni State Park — a North Texas reservoir outing", officialUrl: "https://tpwd.texas.gov/state-parks/lake-tawakoni", internalHref: "/destination/lake-tawakoni-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park designated recreation and water safety" },
    { title: "Lake Whitney State Park — limestone shores and lake views", officialUrl: "https://tpwd.texas.gov/state-parks/lake-whitney", internalHref: "/destination/lake-whitney-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park waterfront and swimming" },
    { title: "Lake Brownwood State Park — swimming with historic park character", officialUrl: "https://tpwd.texas.gov/state-parks/lake-brownwood", internalHref: "/destination/lake-brownwood-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park swimming and CCC facilities" },
    { title: "Lake Casa Blanca International State Park — South Texas option", officialUrl: "https://tpwd.texas.gov/state-parks/lake-casa-blanca", internalHref: "/destination/lake-casa-blanca-international-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD designated swim area and visitor rules" },
    { title: "Bonham State Park — a smaller lake experience", officialUrl: "https://tpwd.texas.gov/state-parks/bonham", internalHref: "/destination/bonham-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park 65-acre lake, water safety and swimming" },
    { title: "Lake Meredith National Recreation Area — Panhandle water trip", officialUrl: "https://www.nps.gov/lamr/planyourvisit", internalHref: "/explore/lakes-rivers", sourceCheckedAt: "2026-10-12", reviewingAuthority: "NPS visitor information — Spring Canyon swimming area" },
    { title: "Lake Corpus Christi State Park — water recreation near Mathis", officialUrl: "https://tpwd.texas.gov/state-parks/lake-corpus-christi", internalHref: "/destination/lake-corpus-christi-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD park swimming and current water recreation" },
    { title: "Possum Kingdom State Park — scenic reservoir access", officialUrl: "https://tpwd.texas.gov/state-parks/possum-kingdom", internalHref: "/destination/possum-kingdom-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "TPWD lake recreation and swimming" },
  ],
  109: [
    { title: "Palo Duro Canyon — dramatic canyon camping", officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", internalHref: "/destination/palo-duro-canyon-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Garner State Park — family trips centered on the Frio", officialUrl: "https://tpwd.texas.gov/state-parks/garner", internalHref: "/destination/garner-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Mustang Island — Gulf Coast nights", officialUrl: "https://tpwd.texas.gov/state-parks/mustang-island", internalHref: "/destination/mustang-island-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Caddo Lake — cypress landscape and paddling", officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake", internalHref: "/destination/caddo-lake-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Brazos Bend — wildlife and short Houston-area travel", officialUrl: "https://tpwd.texas.gov/state-parks/brazos-bend", internalHref: "/destination/brazos-bend-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Inks Lake — water recreation from a developed base", officialUrl: "https://tpwd.texas.gov/state-parks/inks-lake", internalHref: "/destination/inks-lake-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Caprock Canyons — bison country and hiking", officialUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons", internalHref: "/destination/caprock-canyons-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Martin Dies, Jr. — forest and East Texas water", officialUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr", internalHref: "/destination/martin-dies-jr-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Tyler State Park — compact lake and woods", officialUrl: "https://tpwd.texas.gov/state-parks/tyler", internalHref: "/destination/tyler-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
    { title: "Big Bend Ranch State Park — prepared backcountry trips", officialUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch", internalHref: "/destination/big-bend-ranch-state-park", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — park facilities, reservations and current visitor operations" },
  ],
};
export function sourceForGuidePick(number: number, title: string): GuidePickEvidence | undefined {
  return texasGuidePickEvidence[number]?.find((row) => row.title === title);
}
export function allGuidePicksIndividuallySourced(number: number, titles: string[]): boolean {
  if (!titles.length || new Set(titles).size !== titles.length) return false;
  const sources = texasGuidePickEvidence[number] ?? [];
  return sources.length === titles.length
    && titles.every((title) => {
      const item = sourceForGuidePick(number, title);
      return Boolean(item
        && /^https:\/\/[^\s]+$/.test(item.officialUrl)
        && (item.internalHref.startsWith("/fishing/lakes/") || item.internalHref.startsWith("/destination/") || item.internalHref === "/explore/rv-parks" || item.internalHref === "/explore/lakes-rivers" || item.internalHref === "/explore/museums")
        && /^\d{4}-\d{2}-\d{2}$/.test(item.sourceCheckedAt));
    });
}
