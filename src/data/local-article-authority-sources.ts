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
    {
      label: "Texas Historical Commission — Indigenous Texas and Exploration",
      url: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
      scope: "Statewide Indigenous-history framework, early peoples, regional cultures and the context for European exploration.",
    },
    {
      label: "Texas Historical Commission — Caddo Mounds History",
      url: "https://thc.texas.gov/state-historic-sites/caddo-mounds/caddo-mounds-history",
      scope: "Ancestral Caddo settlement, civic-ceremonial mounds, regional trade, forced removal and the continuing Caddo Nation.",
    },
    {
      label: "Texas Parks & Wildlife — Hueco Tanks History",
      url: "https://tpwd.texas.gov/state-parks/hueco-tanks/history",
      scope: "Ten thousand years of human use, Jornada Mogollon agriculture, rock imagery and living tribal connections to Hueco Tanks.",
    },
    {
      label: "National Park Service — Caddo Nation: The Sacred Landscape",
      url: "https://www.nps.gov/elte/learn/historyculture/caddo-nation-introduction.htm",
      scope: "Caddo mound centers, Indigenous trail networks and the Native routes later incorporated into El Camino Real de los Tejas.",
    },
    {
      label: "Handbook of Texas — Karankawa Indians",
      url: "https://www.tshaonline.org/handbook/entries/karankawa-indians",
      scope: "Karankawa homelands, coastal lifeways, colonial violence and the persistence of Karankawa descendants into the present.",
    },
    {
      label: "Alabama-Coushatta Tribe of Texas",
      url: "https://www.alabama-coushatta.com/",
      scope: "First-person tribal history and present-day government of the Alabama-Coushatta Tribe of Texas.",
    },
    {
      label: "Ysleta del Sur Pueblo",
      url: "https://www.ysletadelsurpueblo.org/",
      scope: "First-person Tigua history, sovereign Pueblo government, cultural preservation and the Ysleta del Sur community established in 1682.",
    },
    {
      label: "Kickapoo Traditional Tribe of Texas",
      url: "https://kickapootexas.org/",
      scope: "First-person tribal information on the federally recognized Kickapoo community and reservation near Eagle Pass.",
    },
    {
      label: "Caddo Nation",
      url: "https://mycaddonation.com/",
      scope: "Present-day Caddo Nation government and community information from the Nation itself.",
    },
    {
      label: "Comanche Nation",
      url: "https://www.comanchenation.com/",
      scope: "Present-day Comanche Nation government and community information from the Nation itself.",
    },
    {
      label: "Tonkawa Tribe of Oklahoma",
      url: "https://tonkawatribe.com/",
      scope: "Present-day Tonkawa tribal government, reservation and community information from the Tribe itself.",
    },
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
