import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const hoggFamilyTexasLegacyArticle: Article = {
  id: "evergreen-hogg-family-texas-legacy",
  brandId: "texasdefined",
  slug: "hogg-family-texas-legacy",
  title: "The Hogg Family in Texas: Politics, Oil, Philanthropy and Preservation",
  dek: "James and Sallie Hogg and their children Will, Ima, Mike and Tom became one of Texas's most consequential civic families, linking reform-era politics, oil wealth, mental-health philanthropy, River Oaks, Bayou Bend and historic preservation.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Varner-Hogg_Plantation_-_West_Columbia%2C_Texas_16.jpg?width=1600",
    alt: "Varner-Hogg Plantation State Historic Site in West Columbia, Texas",
    width: 1600,
    height: 652,
    credit: "Robert Gray · CC BY 2.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-25",
  readingMinutes: 10,
  tags: ["Hogg family", "James Hogg", "Ima Hogg", "Will Hogg", "Mike Hogg", "Varner-Hogg Plantation", "Bayou Bend", "Texas philanthropy"],
  featured: false,
  sourceName: "Hogg Foundation for Mental Health — Hogg History",
  sourceUrl: "https://hogg.utexas.edu/about/history",
  internalLinks: [
    { href: "/article/ima-hogg-texas-legacy", label: "Ima Hogg's Texas legacy", description: "Follow the arts, mental-health and preservation work that made Ima Hogg a major Texas civic figure in her own right." },
    { href: "/texas-icons/james-hogg", label: "James Stephen Hogg", description: "Read the Texas Icons profile of the reform-era governor at the start of the family's statewide public story." },
    { href: "/destination/varner-hogg-plantation", label: "Varner-Hogg Plantation", description: "Visit the Brazoria County property whose Hogg-era oil rights helped reshape the family's finances and philanthropy." },
    { href: "/article/brazoria-plantations-slavery-emancipation-history", label: "Brazoria County plantation history", description: "Keep the Hogg-era story connected to the much older histories of slavery, convict leasing, sharecropping and Black labor on the same land." },
    { href: "/destination/museum-of-fine-arts-houston", label: "Museum of Fine Arts, Houston", description: "Connect Will and Ima Hogg's arts patronage to the institution that now operates Bayou Bend." },
  ],
  relatedCollections: [],
  relatedDestinations: ["varner-hogg-plantation", "museum-of-fine-arts-houston"],
  body: [
    p("The Hogg family occupies an unusual place in Texas history because its influence crosses politics, oil, real estate, philanthropy, mental health, music, museums and historic preservation. The story begins with James Stephen Hogg and Sarah Ann 'Sallie' Stinson Hogg, but it becomes a family story through their four children: William Clifford 'Will' Hogg, Ima Hogg, Michael 'Mike' Hogg and Thomas Elisha 'Tom' Hogg."),
    p("Treating the Hoggs only as the family of a governor misses what happened after James Hogg left office. The family participated in Houston's oil-era growth, gained wealth from mineral rights associated with property near West Columbia and redirected substantial resources into public institutions. The result is a network of Texas places and organizations that still carry the family's imprint."),
    h("James and Sallie Hogg established the family's public-service culture"),
    p("James Hogg rose from East Texas newspaper and legal work to attorney general and then governor. He became the first native-born Texan to serve as governor and is most closely associated with railroad regulation, antitrust enforcement and creation of the Texas Railroad Commission. His public career made the Hogg name statewide long before the family's later wealth."),
    p("Sallie Stinson Hogg was not simply a background figure in that political biography. The Handbook of Texas records that James and Sallie married in 1874 and raised Will, Ima, Mike and Tom as James's career moved the household through Quitman, Mineola, Tyler, Austin and other Texas communities. Family histories preserved by the Hogg Foundation emphasize Sallie's expectation that the children had responsibilities to the communities around them."),
    p("Sallie died in 1895. James died in 1906. By then their children were entering adulthood at the same moment Houston and the Gulf Coast were being transformed by oil, urban growth and new cultural institutions."),
    h("The four Hogg children"),
    list(
      "William Clifford 'Will' Hogg, born in 1875, became a lawyer, businessman, civic reformer and major supporter of education and the arts.",
      "Ima Hogg, born in 1882, became the family's best-known philanthropist, with lasting influence in music, mental health, museums, education and preservation.",
      "Michael 'Mike' Hogg, born in 1885, participated in the family's business and real-estate work and helped establish the Hogg Foundation using Will's estate.",
      "Thomas Elisha 'Tom' Hogg, born in 1887, was the youngest sibling and was part of the family whose gifts and estates supported the foundation's early work."
    ),
    h("Varner-Hogg connected the family to oil wealth—but the property's history began much earlier"),
    p("James Hogg bought the property later known as Varner-Hogg Plantation in 1901 because he believed oil lay beneath it. He died before the family's mineral rights produced major wealth. The Texas Historical Commission records that his will advised the children not to sell those rights for at least fifteen years; within that period the heirs struck oil and became wealthy."),
    p("That oil story is important, but it belongs at the end of a much longer property history. Before the Hoggs, the land had been shaped by colonization, plantation slavery, sugar production, convict leasing, sharecropping and ranching. Modern Varner-Hogg interpretation centers those layers rather than presenting the site as though its history began with a famous political family."),
    p("The Hogg children did not make the plantation their permanent home, but they used it as a country property. Ima later furnished and restored the house and donated it to the State of Texas in 1958. That gift preserved a place where Texas can examine both the Hogg family's oil-era chapter and the difficult labor systems that preceded it."),
    h("Will, Ima and Mike helped shape modern Houston"),
    p("The family's Houston influence reached beyond philanthropy. Will and Mike were involved in the development of River Oaks, one of the city's best-known planned residential communities. Bayou Bend, designed in the 1920s for Ima, Will and Mike, stood within that new landscape and eventually became one of the family's most important public gifts."),
    p("Will also supported Houston cultural institutions, including the early Museum of Fine Arts. Ima's collecting later transformed Bayou Bend into a major center for American decorative arts. The Museum of Fine Arts, Houston opened Bayou Bend to the public in 1966 after years of preparation led by Ima."),
    p("The contrast is useful: private development and oil-era wealth gave the family resources, while public institutions determined much of the family's lasting reputation. Their name endured less because of one business venture than because money was repeatedly transferred into universities, museums, music, preservation and public-service programs."),
    h("The Hogg Foundation made family philanthropy permanent"),
    p("Will Hogg died in 1930 and left the bulk of his estate for public-benefit purposes. The Hogg Foundation for Mental Health traces its founding to that bequest and to the work of Ima and Mike in placing the endowment at the University of Texas. The foundation began in 1940 as the Hogg Foundation for Mental Hygiene."),
    p("The Handbook of Texas describes the foundation as created by the children of Governor James Hogg, with Will's estate supplying the principal early endowment and Ima, Tom, Mike and family members contributing to its establishment. Ima became the strongest public champion of a preventive, community-oriented approach to mental health."),
    p("That institutional structure is one reason the Hogg family deserves treatment as a family rather than only through individual biographies. A single person's life does not explain how inherited property, sibling decisions, wills and university partnerships combined to create an organization that still operates generations later."),
    h("Ima extended the family legacy into preservation and the arts"),
    p("Ima Hogg carried the family's public-service tradition into an especially broad range of institutions. She helped launch the Houston Symphony, founded the Houston Child Guidance Center, served on the Houston school board, built one of the country's significant collections of early American decorative arts and gave Bayou Bend to the Museum of Fine Arts, Houston."),
    p("Her preservation work linked the family to places across the state. Beyond Varner-Hogg, she restored Winedale near Round Top and gave it to the University of Texas. She served on the state historical-survey body that preceded the Texas Historical Commission and became one of the state's best-known advocates for preserving buildings, objects and landscapes as evidence."),
    h("Five places and institutions that explain the Hogg family"),
    list(
      "The James Hogg Texas Icons profile explains the reform politics that first made the family name statewide.",
      "Varner-Hogg Plantation near West Columbia connects the family to oil wealth, preservation and a much older labor history.",
      "Bayou Bend in Houston connects Will, Ima and Mike to River Oaks, collecting and the Museum of Fine Arts, Houston.",
      "The Hogg Foundation for Mental Health at the University of Texas shows how Will's estate and sibling decisions became a permanent statewide institution.",
      "Winedale near Round Top shows how Ima Hogg extended family philanthropy into historic preservation and public education."
    ),
    h("Why the family matters as a Texas story"),
    p("The Hogg story captures a major transition in Texas history: political reform in the late nineteenth century, oil wealth in the early twentieth, rapid growth in Houston and the creation of private institutions intended to serve the public. It also demonstrates why family history is more useful when it is connected to land, labor, wealth and institutions rather than presented as a genealogy of famous names."),
    p("TexasDefined therefore treats James Hogg as an individual Texas Icon while also treating the Hogg family and Ima Hogg as separate historical subjects. The three pages answer different questions: what James Hogg did in public office, how the family's resources moved across generations, and how Ima Hogg turned those resources into cultural, preservation and mental-health institutions."),
  ],
};