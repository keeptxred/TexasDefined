import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const goliadHistoryWeekendGuideArticle: Article = {
  id: "evergreen-goliad-history-weekend-guide",
  brandId: "texasdefined",
  slug: "goliad-history-weekend-guide",
  title: "A Goliad History Weekend: Fannin Battleground to Presidio La Bahía",
  dek: "Follow the Goliad campaign in the right order—from the Coleto battlefield to Presidio La Bahía—then slow down enough to see the Spanish, Mexican and Republic-era layers around the story.",
  category: "road-trips",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Presidio_Nuestra_Senora_de_Loreto_de_la_Bahia%2C_commonly_known_as_Presidio_La_Bahia%2C_Goliad%2C_Texas.jpg?width=1600",
    alt: "Presidio La Bahía in Goliad, Texas",
    width: 1600,
    height: 1195,
    credit: "Jkulick · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 11,
  tags: ["goliad texas", "fannin battleground", "presidio la bahia", "texas revolution road trip", "goliad weekend", "texas history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/historic-sites/presidio-la-bahia",
  internalLinks: [
    { href: "/destination/fannin-battleground", label: "Fannin Battleground", description: "Start at the Coleto battlefield before following the surrendered command back toward Goliad." },
    { href: "/destination/presidio-la-bahia", label: "Presidio La Bahía", description: "Continue the chronology inside the presidio associated with imprisonment and the Goliad Massacre." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Place Goliad between Washington-on-the-Brazos and San Jacinto in the larger 1836 campaign." },
    { href: "/explore/historic-sites", label: "Texas historic sites", description: "Browse more battlefields, missions, forts and museums statewide." },
  ],
  relatedCollections: [],
  relatedDestinations: ["fannin-battleground", "presidio-la-bahia"],
  body: [
    p("Goliad is one of the best places in Texas to let chronology determine the route. The story is easier to understand when you begin where James Fannin's command was surrounded at Coleto Creek, then drive toward Presidio La Bahía and follow what happened after the surrender. Reversing the order still produces a worthwhile visit, but it removes the geographic logic that makes the campaign unusually legible."),
    p("The town also rewards more than a battlefield checklist. Spanish colonial history, Mexican-era military use, the Texas Revolution and later commemoration overlap in a compact region. A weekend gives you enough time to separate those layers instead of forcing every site into one dramatic 1836 narrative."),
    h("Day 1 morning: Fannin Battleground first"),
    p("Begin east of Goliad at Fannin Battleground State Historic Site. The open terrain is the main artifact. Stand in the landscape before focusing on the monument and ask why a moving column became vulnerable there. Distance, visibility and exposure make more sense on the ground than they do on a map."),
    p("The Texas Historical Commission currently lists a free public interpretation of about 30 minutes and longer guided group options. Even without a scheduled group tour, give yourself time to walk the grounds and read the interpretation rather than treating the obelisk as the entire visit."),
    h("Drive the story back toward Goliad"),
    p("The short regional drive to Presidio La Bahía is part of the experience. Fannin's surrendered command was taken back toward Goliad, so moving from battlefield to presidio helps establish the scale between combat, captivity and the events that followed."),
    p("Use the drive as a reset rather than rushing to the next parking lot. The Texas Revolution unfolded across roads, river crossings and settlements; the physical distance between sites is historical evidence in its own right."),
    h("Day 1 afternoon: Presidio La Bahía"),
    p("Presidio La Bahía deserves the largest block of the day because its story begins long before the Goliad Massacre. The Spanish colonial presidio was established at this location in the eighteenth century and later became part of Mexican and Texian military history. That longer chronology keeps the site from becoming a single-event memorial."),
    p("For the 1836 sequence, the presidio is where the surrender at Coleto leads into imprisonment and execution. Walk the walls, chapel and courtyards with the battlefield still fresh in mind. The architecture changes the scale of the story from open terrain to confinement."),
    p("The current THC schedule lists Presidio La Bahía as open daily, with last admission before closing. Its overnight Quarters are temporarily unavailable because of plumbing renovations, so do not build a trip around staying inside the presidio unless the official page confirms that rentals have resumed."),
    h("Day 2: widen the lens"),
    p("Use the second day to move beyond the famous battle cry. Goliad's colonial and mission-era landscape predates the Revolution, and the region's value comes from seeing Spanish, Mexican and Texian histories in the same place rather than imagining clean breaks between them."),
    p("A slower second morning also makes room for the town itself, local historical interpretation and any special programming at the presidio. The annual living-history program can change the experience dramatically, but special-event schedules should be checked directly rather than assumed."),
    h("Where to stay"),
    p("Goliad is the logical base because it minimizes backtracking between the battlefield and presidio. Victoria is a larger alternative if you want a broader hotel and restaurant base, but it adds driving and weakens the advantage of waking up inside the historical geography you came to study."),
    h("A strong two-day order"),
    list(
      "Saturday morning: Fannin Battleground and the Coleto landscape.",
      "Saturday afternoon: Presidio La Bahía, with enough time for the full site rather than only the chapel.",
      "Saturday evening: stay in or near Goliad and review the chronology before adding more sites.",
      "Sunday morning: return to the Goliad-area colonial and mission context, town history or scheduled interpretation.",
      "Extension: continue the larger Revolution route toward San Jacinto rather than adding an unrelated distant attraction."
    ),
    h("Family pacing"),
    p("The battlefield and presidio naturally alternate open outdoor space with architecture and exhibits, which helps families avoid museum fatigue. Bring water and sun protection for the battlefield, and save the more detailed narrative discussion for the presidio where there are more physical features to anchor attention."),
    h("What the weekend adds to the Revolution story"),
    p("Goliad changes the Texas Revolution from a collection of famous slogans into a sequence of military decisions and landscapes. Coleto explains the surrender. The road explains the return to Goliad. The presidio explains captivity and memory. The older Spanish setting reminds visitors that the same walls had already belonged to a much longer borderlands history."),
    p("That is why Goliad is worth an overnight rather than a quick detour. The sites are close enough to connect, but the history is dense enough that rushing them together makes the story smaller instead of larger."),
  ],
};
