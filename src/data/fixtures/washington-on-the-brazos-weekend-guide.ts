import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const washingtonOnTheBrazosWeekendGuideArticle: Article = {
  id: "evergreen-washington-on-the-brazos-weekend-guide",
  brandId: "texasdefined",
  slug: "washington-on-the-brazos-weekend-guide",
  title: "A History Weekend at Washington-on-the-Brazos",
  dek: "Plan a history-first day or overnight around Independence Hall, the Star of the Republic Museum and Barrington Living History Farm without rushing the Brazos landscape that connects them.",
  category: "road-trips",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazos_River_at_Washington_on_the_Brazos.jpg?width=1600",
    alt: "The Brazos River at Washington-on-the-Brazos State Historic Site",
    width: 1600,
    height: 900,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 11,
  tags: ["washington on the brazos", "texas history weekend", "star of the republic museum", "barrington living history farm", "texas road trip", "washington county"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/historic-sites/washington-brazos",
  internalLinks: [
    { href: "/destination/washington-on-the-brazos", label: "Washington-on-the-Brazos", description: "Open the destination guide for the independence-convention landscape." },
    { href: "/destination/star-of-the-republic-museum", label: "Star of the Republic Museum", description: "Use the museum for the artifact-rich Republic context that makes the outdoor townsite easier to read." },
    { href: "/destination/barrington-living-history-farm", label: "Barrington Living History Farm", description: "Finish with the working and domestic world associated with Anson Jones." },
    { href: "/article/republic-of-texas-government-trail", label: "Republic of Texas government trail", description: "Expand the weekend into San Felipe, Columbia and Austin's diplomatic history." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Continue chronologically toward Goliad and San Jacinto." },
    { href: "/explore/historic-sites", label: "Texas historic sites", description: "Browse the full statewide historic-site collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["washington-on-the-brazos", "star-of-the-republic-museum", "barrington-living-history-farm", "san-felipe-de-austin", "fanthorp-inn"],
  body: [
    p("Washington-on-the-Brazos works best when you treat it as one connected historic landscape rather than three attractions to check off. Independence Hall and the townsite explain the political moment of March 1836. The Star of the Republic Museum broadens that moment into the nine-year Republic. Barrington Living History Farm shifts from constitutions and public figures to work, agriculture and household life."),
    p("The practical advantage is that the core experience is concentrated in one complex. You do not need to spend the day driving between distant sites, which makes Washington one of the easier Texas history trips for families, first-time visitors and anyone who wants time to read exhibits instead of watching the clock."),
    h("Choose the right day"),
    p("As of the current Texas Historical Commission schedule, the fullest experience is Wednesday through Sunday, when the museum, townsite and Barrington Farm are open along with the visitor center and grounds. On Monday and Tuesday the visitor center and grounds remain accessible but the other major facilities are closed. Always check the official page before departure because hours, programs and weather closures can change."),
    h("Morning: start with the townsite and Independence Hall"),
    p("Begin outside, before the museum fills in the details. The power of Washington is its scale: delegates who declared independence met in a small river settlement, not a monumental capital. Walking the townsite first gives the museum a geographic frame and makes the Brazos River, ferry crossing and roads feel like part of the story rather than background scenery."),
    p("Do not rush straight from the parking area to a single reconstructed building. Give the landscape time. Look toward the river, notice the distance between interpreted features and imagine the logistical problem of assembling delegates, carrying news and moving a government while armies were already in the field."),
    h("Late morning: use the Star of the Republic Museum for context"),
    p("The museum is the place to widen the lens. Instead of treating the Republic as the aftermath of a famous declaration, use the galleries to think about government, currency, trade, settlement, military affairs and daily life during an independent nation that existed from 1836 to 1845."),
    p("This order matters. Seeing the townsite first makes artifacts and political interpretation easier to place; the museum then gives you enough context to return outdoors and understand why Washington mattered again later in the Republic era."),
    h("Afternoon: Barrington Living History Farm"),
    p("Save a substantial block for Barrington. The farm centers the home and working world of Anson Jones, the final president of the Republic, but its larger value is that it changes the subject from politics to labor. Agriculture, tools, livestock, domestic routines and seasonal work show what Republic-era life required beyond government halls."),
    p("For children, this is often the best pacing move of the day because the experience changes from indoor exhibits to outdoor observation and demonstrations. For adults, it prevents the trip from becoming a sequence of documents and political names."),
    h("Where to base the trip"),
    p("Washington itself is rural, so many visitors will prefer to treat Brenham, Navasota or another nearby community as the practical meal and overnight base. That also makes it easier to turn one long museum day into an overnight without forcing a late drive home."),
    p("If the goal is history rather than a generic Hill Country-style getaway, keep the lodging decision simple. Choose the base that minimizes backtracking from your arrival direction and spend the saved time at the site."),
    h("A useful second day"),
    p("The strongest extension is San Felipe de Austin. Washington explains the declaration and Republic government; San Felipe explains the colonial administrative center and provisional government that came before it. Visiting both changes the story from a single founding moment into a sequence of political centers along the Brazos."),
    p("Fanthorp Inn near Anderson is another useful regional addition when you want transportation and travel history rather than another political site. The stagecoach-era inn helps explain how people, mail and news moved through early Texas before railroads transformed the map."),
    h("One-day and overnight versions"),
    list(
      "One day: townsite and Independence Hall in the morning, Star of the Republic Museum before lunch, Barrington Farm in the afternoon.",
      "Overnight: use the full first day at Washington, stay in a nearby community, then visit San Felipe de Austin the next morning.",
      "Family pace: alternate outdoor and indoor sections, carry water, and avoid trying to add a distant battlefield after a full museum day.",
      "History-deep pace: read the Republic government trail before arrival, then use the site to test the chronology against the landscape."
    ),
    h("What not to do"),
    p("Do not plan the visit as a quick monument stop. The value of Washington comes from the combination of political landscape, museum interpretation and living history. Cutting the visit down to a photograph at Independence Hall loses most of what makes the site unusually useful."),
    p("And do not assume every day offers the same access. The current weekly schedule makes Wednesday through Sunday the better choice for the full three-part experience. Check the Texas Historical Commission page before leaving, then give the place enough time to function as a historic landscape rather than a roadside stop."),
  ],
};
