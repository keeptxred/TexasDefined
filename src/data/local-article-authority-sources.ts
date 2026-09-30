export interface LocalArticleAuthoritySource {
  label: string;
  url: string;
  scope: string;
}

/**
 * Multi-source research trails for source-backed local cornerstone articles.
 * Keep these separate from the governed remote-evergreen cohort: local articles
 * already own their primary source metadata and only need the richer visible
 * "Sources and further reading" panel.
 */
export const localArticleAuthoritySources: Readonly<Record<string, readonly LocalArticleAuthoritySource[]>> = {
  "indigenous-texas-history-native-nations": [
    { label: "Texas Historical Commission — Indigenous Texas and Exploration", url: "https://learning.thc.texas.gov/texas-history/indigenous-texas/", scope: "Statewide framework for early peoples, regional cultures and European contact." },
    { label: "Texas Historical Commission — Caddo Mounds", url: "https://thc.texas.gov/historic-sites/caddo-mounds", scope: "Ancestral Caddo village, sacred mounds, current interpretation and Caddo Nation collaboration." },
    { label: "Texas Parks & Wildlife — Hueco Tanks History", url: "https://tpwd.texas.gov/state-parks/hueco-tanks/history", scope: "Long-term human use, Jornada Mogollon history, pictographs and protected cultural resources." },
    { label: "Texas Parks & Wildlife — Seminole Canyon History", url: "https://tpwd.texas.gov/state-parks/seminole-canyon/history", scope: "About 12,000 years of human history and Lower Pecos rock-art context." },
    { label: "National Park Service — Caddo Nation: The Sacred Landscape", url: "https://www.nps.gov/elte/learn/historyculture/caddo-nation-introduction.htm", scope: "Caddo mound centers, Native trail networks and the routes later reused by El Camino Real." },
    { label: "Texas Beyond History — Caddo Ancestors", url: "https://www.texasbeyondhistory.net/tejas/ancestors/", scope: "Archaeological synthesis from early peoples through Caddo cultural development and the early historic era." },
    { label: "Texas Beyond History — Native Peoples of the South Texas Plains", url: "https://www.texasbeyondhistory.net/st-plains/peoples/index.html", scope: "South Texas peoples, lifeways, languages and the limits of colonial naming." },
    { label: "Texas Beyond History — Lower Pecos Rock Art", url: "https://www.texasbeyondhistory.net/plateaus/prehistory/images/lp.html", scope: "Lower Pecos rock-art chronology and the deep precolonial cultural record." },
    { label: "Handbook of Texas — Karankawa Indians", url: "https://www.tshaonline.org/handbook/entries/karankawa-indians", scope: "Karankawa homelands, coastal lifeways, colonial violence and descendant continuity." },
    { label: "Handbook of Texas — Coahuiltecan Indians", url: "https://www.tshaonline.org/handbook/entries/coahuiltecan-indians", scope: "Why Coahuiltecan is a broad historical label rather than one unified tribe or language." },
    { label: "Handbook of Texas — Lipan Apache Indians", url: "https://www.tshaonline.org/handbook/entries/lipan-apache-indians", scope: "Lipan Apache history across the South Plains, Hill Country, South Texas and northern Mexico." },
    { label: "Handbook of Texas — Comanche Indians", url: "https://www.tshaonline.org/handbook/entries/comanche-indians", scope: "Comanche migration, Southern Plains power, diplomacy, warfare and reservation-era transition." },
    { label: "Handbook of Texas — Tonkawa Indians", url: "https://www.tshaonline.org/handbook/entries/tonkawa-indians", scope: "Tonkawa history in Central and western Texas." },
    { label: "Handbook of Texas — Wichita Indians", url: "https://www.tshaonline.org/handbook/entries/wichita-indians", scope: "Wichita-speaking peoples, farming villages, trade and Plains relationships." },
    { label: "Handbook of Texas — Jumano Indians", url: "https://www.tshaonline.org/handbook/entries/jumano-indians", scope: "Jumano history and debated identity across West Texas, the Plains and northern Mexico." },
    { label: "Alabama-Coushatta Tribe of Texas — Our History", url: "https://www.alabama-coushatta.com/about-us/our-history/", scope: "First-person tribal history, East Texas homeland and present-day sovereign government." },
    { label: "Ysleta del Sur Pueblo — About Us", url: "https://www.ysletadelsurpueblo.org/about-us", scope: "First-person Tigua history, sovereignty and more than three centuries in the El Paso region." },
    { label: "Kickapoo Traditional Tribe of Texas", url: "https://kickapootexas.org/", scope: "Current tribal government and reservation community in Maverick County." },
    { label: "Caddo Nation — History", url: "https://mycaddonation.com/history-1", scope: "First-person Caddo origins, mound-building traditions, removal and present-day identity." },
    { label: "Comanche Nation — History", url: "https://www.comanchenation.com/about/page/history", scope: "First-person Comanche migration, horses, bison, bands and present-day government." },
    { label: "Tonkawa Tribe of Oklahoma — Tribal History", url: "https://tonkawatribe.com/language-culture/history/", scope: "First-person Tonkawa history, Texas homelands and the 1884 removal from Fort Griffin." },
    { label: "Texas Historical Commission — Collaborating with Texas Tribes", url: "https://thc.texas.gov/preserve/preservation-programs/museum-services/collaborating-texas-tribes", scope: "Current Texas guidance for tribal collaboration, Indigenous voice, sovereignty and cultural-resource interpretation." },
  ],
  "caddo-texas-history-homelands-mounds-removal": [
    { label: "Caddo Nation — History", url: "https://mycaddonation.com/history-1", scope: "Caddo origins, mound traditions, forced removal and present-day identity in the Nation's own words." },
    { label: "Texas Historical Commission — Caddo Mounds", url: "https://thc.texas.gov/historic-sites/caddo-mounds", scope: "Caddo Mounds settlement, sacred landscape and current visitor interpretation." },
    { label: "National Park Service — Caddo Nation: The Sacred Landscape", url: "https://www.nps.gov/elte/learn/historyculture/caddo-nation-introduction.htm", scope: "Caddo trails, mound centers and El Camino Real context." },
    { label: "Texas Beyond History — Caddo Ancestors", url: "https://www.texasbeyondhistory.net/tejas/ancestors/", scope: "Archaeological synthesis of Caddo cultural development from early periods through European contact." },
    { label: "Texas Historical Commission — Mission Dolores", url: "https://thc.texas.gov/historic-sites/mission-dolores", scope: "Spanish mission strategy and Ais history in East Texas." },
  ],
  "comanche-texas-history-comancheria-red-river-war": [
    { label: "Comanche Nation — History", url: "https://www.comanchenation.com/about/page/history", scope: "First-person Comanche migration, horse culture, buffalo, bands and modern government." },
    { label: "Texas Historical Commission — Red River War Battle Sites Project", url: "https://thc.texas.gov/learn/archeological-spotlight/red-river-war-battle-sites-project", scope: "Archaeology and military geography of the 1874–1875 campaign." },
    { label: "National Park Service — Comanche", url: "https://www.nps.gov/foda/learn/historyculture/comanche.htm", scope: "Comanche history in the Fort Davis and Trans-Pecos frontier context." },
    { label: "Handbook of Texas — Comanche Indians", url: "https://www.tshaonline.org/handbook/entries/comanche-indians", scope: "Migration, Comanchería, diplomacy, warfare and reservation transition." },
    { label: "Texas Historical Commission — Collaborating with Texas Tribes", url: "https://thc.texas.gov/preserve/preservation-programs/museum-services/collaborating-texas-tribes", scope: "Current interpretation guidance shaped with tribal advisers including the Comanche Nation." },
  ],
  "living-tribal-nations-texas-today": [
    { label: "Alabama-Coushatta Tribe of Texas — Our History", url: "https://www.alabama-coushatta.com/about-us/our-history/", scope: "Official history and current sovereign-government context for the Alabama-Coushatta Tribe of Texas." },
    { label: "Ysleta del Sur Pueblo — About Us", url: "https://www.ysletadelsurpueblo.org/about-us", scope: "Official Tigua history, sovereignty, self-governance and contemporary Pueblo community." },
    { label: "Kickapoo Traditional Tribe of Texas", url: "https://kickapootexas.org/", scope: "Official tribal government, reservation and community information." },
    { label: "Tonkawa Tribe of Oklahoma — Tribal History", url: "https://tonkawatribe.com/language-culture/history/", scope: "A nation headquartered outside Texas today with documented Texas homelands and removal history." },
    { label: "Texas Historical Commission — Collaborating with Texas Tribes", url: "https://thc.texas.gov/preserve/preservation-programs/museum-services/collaborating-texas-tribes", scope: "Guidance on sovereignty, first-person tribal interpretation and respectful collaboration." },
  ],
  "texas-red-river-war-guide": [
    { label: "Texas Historical Commission — Red River War Battle Sites Project", url: "https://thc.texas.gov/learn/archeological-spotlight/red-river-war-battle-sites-project", scope: "Archaeological evidence and mapped campaign context." },
    { label: "Comanche Nation — History", url: "https://www.comanchenation.com/about/page/history", scope: "Comanche history and present-day Nation perspective." },
    { label: "Handbook of Texas — Comanche Indians", url: "https://www.tshaonline.org/handbook/entries/comanche-indians", scope: "Broader Comanche and Comanchería context." },
    { label: "National Park Service — Comanche", url: "https://www.nps.gov/foda/learn/historyculture/comanche.htm", scope: "Fort Davis and western Texas context for Comanche-U.S. relations." },
  ],
  "texas-borderlands-historic-sites-guide": [
    { label: "Ysleta del Sur Pueblo — About Us", url: "https://www.ysletadelsurpueblo.org/about-us", scope: "First-person Tigua history and sovereignty in the El Paso region." },
    { label: "Texas Parks & Wildlife — Hueco Tanks History", url: "https://tpwd.texas.gov/state-parks/hueco-tanks/history", scope: "Protected West Texas cultural landscape and pictograph history." },
    { label: "Texas Historical Commission — Mission Dolores", url: "https://thc.texas.gov/historic-sites/mission-dolores", scope: "Ais and Spanish mission history in East Texas." },
    { label: "Handbook of Texas — Lipan Apache Indians", url: "https://www.tshaonline.org/handbook/entries/lipan-apache-indians", scope: "Lipan Apache history across Texas and northern Mexico." },
  ],
  "spanish-texas-military-battle-medina": [
    { label: "Texas Historical Commission — Military in Spanish Texas", url: "https://thc.texas.gov/learn/military-history/military-spanish-texas", scope: "Spanish colonial military chronology, presidios and imperial rivalry." },
    { label: "Texas Historical Commission — Indigenous Texas and Exploration", url: "https://learning.thc.texas.gov/texas-history/indigenous-texas/", scope: "Native societies and the contact context Spanish expeditions entered." },
    { label: "National Park Service — Caddo Nation: The Sacred Landscape", url: "https://www.nps.gov/elte/learn/historyculture/caddo-nation-introduction.htm", scope: "Caddo homelands and trail networks beneath East Texas colonial routes." },
    { label: "Texas Historical Commission — Mission Dolores", url: "https://thc.texas.gov/historic-sites/mission-dolores", scope: "Spanish mission policy and Ais history." },
  ],
  "mexican-texas-military-history": [
    { label: "Texas Historical Commission — Military in Mexican Texas", url: "https://thc.texas.gov/learn/military-history/military-mexican-texas", scope: "Military and political chronology from 1821 to 1835." },
    { label: "Alabama-Coushatta Tribe of Texas — Our History", url: "https://www.alabama-coushatta.com/about-us/our-history/", scope: "Tribal history across Mexican independence, early Texas and continuing East Texas presence." },
    { label: "Handbook of Texas — Comanche Indians", url: "https://www.tshaonline.org/handbook/entries/comanche-indians", scope: "Comanche power and diplomacy during the Mexican Texas era." },
    { label: "Caddo Nation — History", url: "https://mycaddonation.com/history-1", scope: "Caddo continuity and removal-era context spanning the end of Mexican Texas." },
  ],
  "texas-before-united-states-how-texas-began": [
    {
      label: "Texas Historical Commission — Indigenous Texas and Exploration",
      url: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
      scope: "Indigenous cultures, early European contact and the exploration context before colonial Texas.",
    },
    {
      label: "Texas Historical Commission — Military in Spanish Texas",
      url: "https://thc.texas.gov/learn/military-history/military-spanish-texas",
      scope: "Spanish Texas from early mapping through La Salle, presidios, imperial rivalry and the 1821 transition.",
    },
    {
      label: "Texas Historical Commission — Military in Mexican Texas",
      url: "https://thc.texas.gov/learn/military-history/military-mexican-texas",
      scope: "Mexican Texas, settler militias, immigration enforcement, Anahuac and other precursors to revolution.",
    },
    {
      label: "Texas State Library and Archives Commission — Texas Declaration of Independence",
      url: "https://www.tsl.texas.gov/declaration-independence.html",
      scope: "Primary-document context for the Convention of 1836 and the March 2 declaration at Washington-on-the-Brazos.",
    },
    {
      label: "Texas Historical Commission — Texas Revolution and Republic",
      url: "https://thc.texas.gov/learn/military-history/texas-revolution-and-republic",
      scope: "The 1835–1836 military sequence, San Jacinto, the unsettled peace and Republic-era armed forces.",
    },
    {
      label: "Handbook of Texas — Republic of Texas",
      url: "https://www.tshaonline.org/handbook/entries/republic-of-texas",
      scope: "Independent-republic government, diplomacy, finance, territorial claims and the road toward annexation.",
    },
    {
      label: "Texas State Library and Archives Commission — Statehood",
      url: "https://www.tsl.texas.gov/lobbyexhibits/homefortexashistory/statehood",
      scope: "Annexation debate, the 1845 admission process and the February 19, 1846 transfer of governmental authority.",
    },
    {
      label: "Texas State Library and Archives Commission — Ordinance of Annexation",
      url: "https://www.tsl.texas.gov/ref/abouttx/annexation/4july1845.html",
      scope: "Primary-source text of the Texas Convention ordinance accepting the United States annexation terms on July 4, 1845.",
    },
    {
      label: "Texas Historical Commission — Texas in the Mexican War",
      url: "https://thc.texas.gov/learn/military-history/texas-mexican-war",
      scope: "The disputed Nueces Strip, the 1846 war and the postwar Rio Grande boundary context following annexation.",
    },
  ],
};
