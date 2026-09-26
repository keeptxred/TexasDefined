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
  "indigenous-texas-history-native-nations": [
    {
      label: "Texas Historical Commission — Indigenous Texas and Exploration",
      url: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
      scope: "Statewide introduction to Indigenous cultures, early contact and the fact that Texas was inhabited long before European colonization.",
    },
    {
      label: "Texas Historical Commission — Caddo Mounds History",
      url: "https://thc.texas.gov/state-historic-sites/caddo-mounds/caddo-mounds-history",
      scope: "Ancestral Caddo settlement, agriculture, ceremonial mounds, trade networks, forced removal and continuing Caddo connections to East Texas.",
    },
    {
      label: "Texas Historical Commission — Caddo Culture",
      url: "https://learning.thc.texas.gov/caddo-culture/",
      scope: "Caddo-centered interpretation, contemporary voices and cultural continuity at Caddo Mounds.",
    },
    {
      label: "Handbook of Texas — Caddo Indians",
      url: "https://www.tshaonline.org/handbook/entries/caddo-indians",
      scope: "Regional Caddo history across East Texas and the wider Caddo cultural landscape.",
    },
    {
      label: "Handbook of Texas — Karankawa Indians",
      url: "https://www.tshaonline.org/handbook/entries/karankawa-indians",
      scope: "Gulf Coast Karankawa homelands, related coastal groups and the limits of treating Karankawa as one centralized nation.",
    },
    {
      label: "Handbook of Texas — Tonkawa Indians",
      url: "https://www.tshaonline.org/handbook/entries/tonkawa-indians",
      scope: "Tonkawa life, mobility, subsistence and shifting alliances across Central Texas and the Plains.",
    },
    {
      label: "Handbook of Texas — Comanche Indians",
      url: "https://www.tshaonline.org/handbook/entries/comanche-indians",
      scope: "Comanche migration, horse culture, Comanchería, diplomacy and control across the Southern Plains.",
    },
    {
      label: "Handbook of Texas — Lipan Apache Indians",
      url: "https://www.tshaonline.org/handbook/entries/lipan-apache-indians",
      scope: "Lipan Apache presence across the South Plains, Hill Country, South Texas, West Texas and northern Mexico.",
    },
    {
      label: "Texas Beyond History — Native Peoples and Archaeology",
      url: "https://www.texasbeyondhistory.net/plateaus/prehistory/images/intro.html",
      scope: "Archaeological evidence for more than 13,000 years of human life in Central and Southwest Texas and a caution that Native histories also existed outside written records.",
    },
    {
      label: "Alabama-Coushatta Tribe of Texas — Our History",
      url: "https://www.alabama-coushatta.com/about-us/our-history/",
      scope: "First-person tribal history of the Alabama-Coushatta community, migration to East Texas, reservation history and modern sovereignty.",
    },
    {
      label: "Ysleta del Sur Pueblo — About Us",
      url: "https://www.ysletadelsurpueblo.org/about-us",
      scope: "First-person Pueblo history, the 1680 Pueblo Revolt context, establishment of Ysleta del Sur and continuing Tigua government and culture.",
    },
    {
      label: "Kickapoo Traditional Tribe of Texas — Official Site",
      url: "https://kickapootexas.org/",
      scope: "Current tribal identity, reservation community near Eagle Pass and government information from the Kickapoo Traditional Tribe of Texas.",
    },
    {
      label: "U.S. Bureau of Indian Affairs — Southern Plains Tribes Served",
      url: "https://www.bia.gov/regional-offices/southern-plains/tribes-served",
      scope: "Federal reference connecting Texas-based tribes with Caddo, Comanche, Tonkawa and other federally recognized nations whose histories extend across Texas.",
    },
  ],
};
