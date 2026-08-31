import sixFlagsHero from "@/assets/six-flags-hero-photo.jpg";

import type { Article, ArticleBlock } from "../types";

const p=(text:string):ArticleBlock=>({type:"paragraph",text});
const h=(text:string):ArticleBlock=>({type:"heading",text});
const list=(...items:string[]):ArticleBlock=>({type:"list",items});

export const sixFlagsOverTexasMeaningArticle: Article = {
  id:"evergreen-six-flags-over-texas-meaning", brandId:"texasdefined", slug:"six-flags-over-texas-meaning",
  title:"What the Six Flags Over Texas Actually Mean",
  dek:"The six flags are more than a theme-park name. They trace the governments that claimed Texas across centuries—and explain why the phrase still carries so much weight here.",
  category:"texas-history", hero:{src:sixFlagsHero,alt:"The Texas State Capitol in Austin with flags flying on poles out front",width:1600,height:900},
  authorId:"a-marisol", publishedAt:"2026-08-07", readingMinutes:10,
  tags:["six flags over texas","texas history","texas flags","republic of texas","texas identity"], featured:true,
  sourceName:"Texas State Library and Archives Commission — Six Flags of Texas",
  sourceUrl:"https://www.tsl.texas.gov/ref/abouttx/sixflags.html",
  internalLinks:[
    {href:"/texas-history",label:"Keep exploring Texas history",description:"More stories about the people, places and turning points that shaped the state."},
    {href:"/article/why-texas-has-254-counties",label:"Why Texas has 254 counties",description:"See how distance and settlement shaped another part of the Texas map."},
    {href:"/explore/historic-sites",label:"Explore historic Texas sites",description:"Find forts, missions, courthouses and landmarks across the state."},
    {href:"/explore",label:"Explore Texas",description:"Turn the history into a road trip."},
    {href:"https://www.tsl.texas.gov/ref/abouttx/sixflags.html",label:"Texas State Library — Six Flags of Texas",description:"Official state reference for the six governments, their chronology and the standardized historical flag designs."},
    {href:"https://www.tsl.texas.gov/ref/abouttx/secession/2feb1861.html",label:"Texas Declaration of Causes, February 2, 1861",description:"Texas State Library transcription of the primary secession record used to document the state's stated reasons for leaving the Union."}
  ], relatedCollections:[], relatedDestinations:[],
  body:[
    p("Most Texans know the phrase before they know the history. Six Flags Over Texas sounds like a brand, a theme park and a piece of state shorthand all at once. But the phrase came first. It refers to the six national governments whose flags have flown over territory that became Texas."),
    p("Those six are Spain, France, Mexico, the Republic of Texas, the United States and the Confederate States of America. The sequence is often presented as a tidy parade of flags. The real story is messier: overlapping claims, distant empires, revolutions, annexation, civil war and generations of people living through political changes they did not always control."),
    h("Spain: the longest colonial chapter"),
    p("Spain claimed Texas for centuries and left the deepest early European institutional footprint. Missions, presidios, ranching traditions, place names and legal customs all grew from the Spanish colonial period. San Antonio became the most enduring center of Spanish Texas, and the mission system tied religion, settlement and imperial defense together."),
    p("Spanish control was never equally strong across the entire region. Huge distances, Indigenous nations and limited settlement made Texas a difficult northern frontier. Still, Spain's influence survives in the language of the map and in traditions that became part of Texas culture long after Spanish rule ended."),
    h("France: a brief claim with an outsized legacy"),
    p("France's place among the six flags comes largely from René-Robert Cavelier, Sieur de La Salle, whose expedition established Fort Saint Louis on the Texas coast in the 1680s. The colony failed, but the French presence alarmed Spain enough to spur a stronger Spanish response in East Texas."),
    p("That is why the French flag belongs in the story even though French control was brief and fragile. Sometimes a failed colony can still change what rival empires do next."),
    h("Mexico: independence changes the government over Texas"),
    p("When Mexico won independence from Spain in 1821, Texas became part of the new Mexican nation. The Mexican period brought new immigration policies, empresarios such as Stephen F. Austin and rapid settlement from the United States alongside Tejano communities already rooted in the region."),
    p("Tensions over immigration, federalism, slavery, political authority and military control eventually helped drive the Texas Revolution. By 1836, the government over Texas changed again."),
    h("The Republic of Texas: the flag Texans remember most"),
    p("Texas existed as an independent republic from 1836 until annexation by the United States in 1845. That short period has had an enormous effect on Texas identity. It produced its own presidents, diplomats, currency problems, border disputes and national ambitions."),
    p("The familiar Lone Star flag dates to the republic era and became the state flag after annexation. That continuity helps explain why Texas state identity can feel unusually national in tone even when the history is more complicated than the myth."),
    h("The United States: annexation and statehood"),
    p("Texas joined the United States in 1845 as the 28th state. Annexation intensified tensions with Mexico and helped lead to the Mexican-American War. After the war, the boundaries of modern Texas took shape through federal agreements and the Compromise of 1850."),
    p("The United States flag has therefore flown over Texas for most of the time since statehood, interrupted by the Civil War era."),
    h("The Confederacy: a difficult flag in the sequence"),
    p("Texas seceded from the United States in 1861 and joined the Confederate States of America. The Confederacy defended slavery, and Texas's secession declaration explicitly tied its decision to the preservation of a slaveholding social order."),
    p("That history matters when discussing the six flags today. Treating the Confederate flag as merely one colorful step in a branding sequence strips away the reason the government existed and the human cost attached to it."),
    h("The United States again"),
    p("After the Civil War, Texas went through Reconstruction and was readmitted to representation in Congress in 1870. From then forward, the United States flag again represented the national government over Texas."),
    h("How a history phrase became a theme-park name"),
    p("When Six Flags Over Texas opened in Arlington in 1961, the name borrowed this already familiar historical idea. The original park organized themed areas around different periods of Texas history, turning a state-history phrase into one of the most recognizable amusement-park brands in the country."),
    p("The irony is that the corporate name eventually became more famous nationally than the history behind it. Plenty of visitors know Six Flags as roller coasters first and Texas history second."),
    h("What the phrase gets right—and what it hides"),
    list("It correctly points to six national governments commonly associated with political control or claim over Texas territory.","It compresses centuries of change into an easy symbol.","It does not capture Indigenous sovereignty, which predates and overlaps every European and national claim on the list.","It can make transitions look cleaner than they were.","It can also flatten very different governments into equivalent pieces of heritage."),
    p("That does not make the phrase useless. It makes it a starting point. The six flags are a compact way to remember that Texas identity was built through layers of empire, nationhood, revolution and statehood."),
    h("Why the six flags still matter"),
    p("Texas is full of symbols that seem simple until you pull on the thread. The six flags are one of them. They explain why Spanish missions sit near German towns, why Mexican and Anglo traditions overlap, why the Lone Star carries such political weight and why debates over memory remain part of the state's public life."),
    p("The phrase endures because it captures something true: Texas has belonged to different political worlds. Understanding what each flag meant makes the story richer than the logo ever could.")
  ]
};
