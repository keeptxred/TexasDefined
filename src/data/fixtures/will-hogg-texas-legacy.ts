import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const willHoggTexasLegacyArticle: Article = {
  id: "evergreen-will-hogg-texas-legacy",
  brandId: "texasdefined",
  slug: "will-hogg-texas-legacy",
  title: "Will Hogg: The Businessman, Civic Planner and Philanthropist Behind a Texas Family Legacy",
  dek: "William Clifford 'Will' Hogg carried the Hogg family from reform-era public life into Houston business, city planning, River Oaks, university advocacy, arts patronage and the estate that helped create the Hogg Foundation for Mental Health.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BayouBendHome.JPG?width=1600",
    alt: "Bayou Bend estate in Houston, home of Will, Ima and Mike Hogg in the late 1920s",
    width: 1600,
    height: 1200,
    credit: "Postoak · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  readingMinutes: 9,
  tags: ["Will Hogg", "William Clifford Hogg", "Hogg family", "River Oaks", "Bayou Bend", "Hogg Foundation", "Houston history", "University of Texas"],
  featured: false,
  sourceName: "Handbook of Texas — William Clifford Hogg",
  sourceUrl: "https://www.tshaonline.org/handbook/entries/hogg-william-clifford",
  internalLinks: [
    { href: "/article/hogg-family-texas-legacy", label: "The Hogg family in Texas", description: "Place Will Hogg inside the larger family story connecting James and Sallie Hogg, oil-era wealth, philanthropy and preservation." },
    { href: "/article/ima-hogg-texas-legacy", label: "Ima Hogg's Texas legacy", description: "Continue with Will's sister and her work in music, mental health, museums and historic preservation." },
    { href: "/article/hogg-foundation-mental-health-texas-history", label: "The Hogg Foundation for Mental Health", description: "Follow Will's estate into the statewide institution Ima and Mike helped establish at The University of Texas." },
    { href: "/texas-icons/james-hogg", label: "James Stephen Hogg", description: "Read the Texas Icons profile of Will Hogg's father and the reform-era political career that first made the family name statewide." },
    { href: "/destination/bayou-bend-collection-gardens", label: "Bayou Bend Collection and Gardens", description: "Visit the River Oaks home shared by Will, Ima and Mike that later became an MFAH house museum." },
    { href: "/destination/varner-hogg-plantation", label: "Varner-Hogg Plantation", description: "Connect the family story to the Brazoria County property whose mineral rights became a major source of Hogg wealth." },
  ],
  relatedCollections: [],
  relatedDestinations: ["bayou-bend-collection-gardens", "varner-hogg-plantation", "museum-of-fine-arts-houston"],
  body: [
    p("William Clifford 'Will' Hogg is the Hogg sibling whose career most clearly connects the family's nineteenth-century political prominence with twentieth-century Houston business, planning and philanthropy. Born in Quitman in 1875 to James Stephen Hogg and Sallie Stinson Hogg, he trained in law, worked in business and eventually became the principal manager of family interests after his father's death in 1906."),
    p("His historical importance is easy to miss because later public memory concentrated heavily on his father James and his sister Ima. Yet Will's business work, university advocacy, Houston civic projects and estate all became structural parts of the family's long-term influence."),
    h("Law, business and the move into Houston's oil economy"),
    p("Will Hogg studied at Southwestern University before earning a law degree from The University of Texas in 1897. He practiced law in San Antonio, later joined his father's Austin firm and spent time with the Mercantile Trust Company in St. Louis. After James Hogg died, Will returned to Texas to take a leading role in family business interests."),
    p("The Handbook of Texas records that Will worked with Joseph S. Cullinan and the Texas Company, later Texaco, and participated in a web of oil, trust, insurance and investment ventures. Those connections placed him inside the commercial expansion that accompanied Houston's rise as an oil-era city."),
    h("A civic planner as well as a businessman"),
    p("Will Hogg treated private development and civic organization as connected projects. He served as chairman of Houston's City Planning Commission, advocated long-range planning and zoning, and backed civic organizations ranging from the YMCA to cultural institutions. In 1922 he sponsored the River Oaks Corporation, helping launch the planned residential development that became one of Houston's most influential neighborhoods."),
    p("River Oaks matters to the Hogg story because the family did not merely invest in Houston from a distance. Will, Ima and Mike built Bayou Bend within the new neighborhood in the 1920s, making the house a family residence, a social setting and eventually the physical home of Ima's American decorative-arts collection."),
    h("The University of Texas was a lifelong cause"),
    p("Will's relationship with The University of Texas extended well beyond his law degree. He led alumni efforts, supported university facilities and student programs, served on the Board of Regents from 1914 to 1916 and remained involved in campaigns over the institution's independence and growth."),
    p("The Handbook of Texas also credits him with supporting student loan funds at Texas colleges. That pattern—using private wealth to strengthen public and educational institutions—anticipated the much larger bequest that followed his death."),
    h("Arts patronage connected Will to Houston's cultural institutions"),
    p("Will Hogg supported the Museum of Fine Arts, Houston and gave paintings and examples of Americana to the developing institution. Bayou Bend later became the most visible extension of that family interest in collecting and public culture, although Ima ultimately shaped its collection and conversion into a museum."),
    p("This is one reason Bayou Bend works best as a Hogg-family site rather than only an Ima Hogg site. Will helped select the River Oaks property, lived in the completed house and encouraged the landscape work that became part of the estate's identity."),
    h("His estate became the financial base for the Hogg Foundation"),
    p("Will Hogg died in 1930 while traveling in Europe with Ima. His will made bequests to Texas educational institutions and directed most of his estate toward public benefit. The Hogg Foundation for Mental Health records that the roughly $2.5 million estate became the principal endowment from which Ima and Mike helped establish the Hogg Foundation for Mental Hygiene at The University of Texas in 1940."),
    p("That sequence makes Will's philanthropy unusually consequential even though he did not live to see the foundation open. His estate supplied the financial base; Ima helped define the mental-health vision; Mike helped handle the bequest; and the university supplied the institutional home."),
    h("Where Will Hogg's story remains visible"),
    list(
      "Bayou Bend Collection and Gardens preserves the River Oaks home Will shared with Ima and Mike before it became a public museum.",
      "River Oaks preserves the urban-planning and real-estate development most closely associated with Will's Houston civic career.",
      "The Hogg Foundation for Mental Health continues the public-benefit mission financed primarily through Will's estate.",
      "The University of Texas preserves the institutional connection that ran from Will's education and alumni work through his regent service and final bequest.",
      "Varner-Hogg Plantation connects the family to the oil-era property interests that helped create the wealth later redirected into public institutions."
    ),
    h("Why Will Hogg deserves his own place in the story"),
    p("Will Hogg is not simply the bridge between James Hogg and Ima Hogg. His own career joined business, city planning, higher education, arts patronage and philanthropy at a moment when Houston was becoming a major modern city. The institutions that survived him make that influence visible."),
    p("TexasDefined keeps the broader family article as the place to understand how the siblings worked together, while this profile isolates Will's particular role: building and managing the resources that later supported some of the Hogg family's most durable public institutions."),
  ],
};
