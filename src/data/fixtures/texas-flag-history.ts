import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasFlagHistoryArticle: Article = {
  id: "evergreen-texas-flag-history",
  brandId: "texasdefined",
  slug: "history-of-the-texas-flag",
  title: "The Texas Flag: A History of the Lone Star",
  dek: "Texas did not begin with the familiar blue, white and red Lone Star flag. Its path runs through revolution-era proposals, the Burnet flag, a Republic-era redesign, annexation, a decades-long legal gap and the modern Texas Flag Code.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag_of_Texas_(1839%E2%80%931879).svg?width=1600",
    alt: "Historical 1839 Lone Star flag of the Republic of Texas with a blue hoist, white star, white upper stripe and red lower stripe",
    width: 1600,
    height: 1067,
    credit: "Peter Krag design · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 11,
  tags: [
    "texas flag history",
    "lone star flag",
    "republic of texas",
    "burnet flag",
    "peter krag",
    "texas state symbols",
    "texas history",
  ],
  featured: true,
  sourceName: "Texas State Library and Archives Commission",
  sourceUrl: "https://www.tsl.texas.gov/treasures/flagsandmaps/flag-design.html",
  internalLinks: [
    {
      href: "/article/six-flags-over-texas-meaning",
      label: "What the Six Flags Over Texas actually mean",
      description: "Put the Lone Star flag inside the longer sequence of governments that claimed or governed Texas.",
    },
    {
      href: "/texas-history",
      label: "Explore more Texas history",
      description: "Continue through the people, places, conflicts and turning points that shaped the state.",
    },
    {
      href: "/article/texas-revolution-historic-sites-road-trip",
      label: "Follow the Texas Revolution on the ground",
      description: "Visit the places where independence was organized, declared, fought for and secured.",
    },
    {
      href: "/explore/historic-sites",
      label: "Explore Texas historic sites",
      description: "Find missions, forts, battlegrounds, homes and museums connected to the state's past.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Few state symbols are as immediately recognizable as the Texas flag: one white Lone Star on a vertical blue field, with white over red to the right. It looks inevitable now, as if Texas had always used it. The real history is much more interesting. The familiar Lone Star flag did not become the Republic of Texas flag until 1839, three years after independence, and it followed several proposed and official designs."),
    p("The flag's history also contains a useful warning about Texas legend. Some stories repeated for generations do not match the surviving record. The Texas State Library and Archives Commission preserves the original 1839 artwork, while the Handbook of Texas traces the legislation behind it. Together, those records let us separate what is documented from what is tradition."),

    h("Before the Lone Star flag: Texas in revolution"),
    p("When the Texas Revolution began in 1835, there was no single official flag representing an independent Texas because independence was not initially the declared goal. The Consultation of 1835 supported the federal Mexican Constitution of 1824 while resisting the increasingly centralized government of Antonio López de Santa Anna. That is why some early revolutionary banners used the number 1824 or blended Mexican, Anglo-American and local symbols."),
    p("Stephen F. Austin and fellow commissioners William H. Wharton and Branch T. Archer discussed proposed national designs while seeking support in the United States. Surviving descriptions show how unsettled the visual identity of Texas still was: stripes, an English-style jack, Mexican colors, a Lone Star and even a proposed image of George Washington all appeared in different concepts. These proposals are historically important, but they were not the flag Texans know today."),

    h("What about the so-called de Zavala flag?"),
    p("One of the best-known early Texas flag stories credits Lorenzo de Zavala with a blue flag bearing a white star and the letters T-E-X-A-S arranged around it. Versions of that design appear in books, museums and souvenir art. The surviving records of the Convention of 1836, however, do not establish that familiar design as an adopted official flag."),
    p("The Handbook of Texas notes that the convention journals do not describe de Zavala's proposal in enough detail to reconstruct it, and the record attributes the suggestion to place the letters TEXAS around a star to Charles Stanfield Taylor rather than de Zavala. That makes the popular de Zavala flag better understood as a later reconstruction or tradition than as a securely documented first official flag."),

    h("1836: the Burnet flag becomes the first official national standard"),
    p("The Republic's first clearly documented official national standard came later in 1836. President David G. Burnet proposed a simple design: an azure or blue field with one large golden star in the center. Congress approved it on December 10, 1836, and President Sam Houston signed the measure."),
    p("Known today as the Burnet flag, it served as the Republic's national flag until January 25, 1839. Its most important element was already in place: a single star representing Texas. The star would survive even as nearly everything around it changed."),
    {
      type: "image",
      image: {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag_of_the_Republic_of_Texas_(1836%E2%80%931839).svg?width=1280",
        alt: "The Burnet flag of the Republic of Texas, a blue field with a large gold five-pointed star in the center",
        width: 900,
        height: 600,
        credit: "Public domain · Wikimedia Commons",
      },
      caption: "The Burnet flag served as the Republic of Texas national standard from December 10, 1836, until January 25, 1839.",
    },
    p("The Republic also adopted a separate national flag for naval service. That flag looked much closer to the United States flag, with thirteen alternating stripes and a blue canton containing one white star. The coexistence of a national standard and a naval flag helps explain why accounts of early Texas flags can seem contradictory: more than one official design was in use for different purposes."),

    h("1838–1839: the modern Lone Star design takes shape"),
    p("By late 1838, the Republic's leaders wanted a national flag that more clearly represented an independent Texas. Senator William H. Wharton introduced a bill on December 28, 1838, containing the basic design that survives today. The measure went to a Senate committee chaired by Oliver Jones, and a substitute bill carrying the same flag design advanced through the Third Congress of the Republic."),
    p("The Congress passed the measure in January 1839, and President Mirabeau B. Lamar approved it on January 25, 1839. The law described a blue perpendicular stripe taking up one-third of the flag's length, a white five-pointed star centered on that blue field, and two equal horizontal stripes covering the remaining two-thirds: white above and red below."),
    p("That is essentially the Texas flag we still recognize. It was not created as a state flag. It was the national flag of the independent Republic of Texas."),
    {
      type: "image",
      image: {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag_of_Texas_(1839%E2%80%931879).svg?width=1280",
        alt: "Historical rendering of the 1839 Lone Star flag of the Republic of Texas with a blue hoist, white star, white upper stripe and red lower stripe",
        width: 1080,
        height: 720,
        credit: "Peter Krag design · Public domain · Wikimedia Commons",
      },
      caption: "A public-domain rendering based on Peter Krag's 1839 artwork. The structure of the Lone Star flag has endured into the present state flag.",
    },

    h("Who designed the Texas flag?"),
    p("The surviving official color drawing of the 1839 flag was made by Austin artist Peter Krag. The original artwork is preserved by the Texas State Library and Archives Commission and bears the approval date of January 25, 1839, along with the signatures of President Mirabeau Lamar, House Speaker John M. Hansford and Senate President David G. Burnet."),
    p("Krag's role is well documented: he produced the official artwork. The harder question is who actually conceived the flag's design. For years, Charles Bellinger Stewart was widely credited as the designer, and the Texas Legislature itself repeated that attribution in 1989. But the documentary record does not prove it. In 1992, the Legislature corrected the earlier recognition and acknowledged that the actual designer is unknown, while recognizing Wharton and Jones for their roles in the flag legislation."),
    p("That distinction matters. Peter Krag drew the surviving official design; William H. Wharton introduced the legislative design; Oliver Jones chaired the committee that advanced it; but no surviving evidence conclusively identifies one person as the original designer."),

    h("The Lone Star becomes a state flag"),
    p("Texas accepted annexation to the United States in 1845 and was admitted as the 28th state on December 29 of that year. The formal transfer of government came on February 19, 1846, when Republic president Anson Jones watched the Lone Star flag lowered and the United States flag raised in Austin."),
    p("The Republic had ended, but its national flag did not disappear from Texas identity. The same 1839 design became the state flag. That continuity is unusual and helps explain why the Texas flag carries more historical weight than a typical state banner: it once represented a sovereign republic in international affairs."),

    h("The strange legal gap from 1879 to 1933"),
    p("One of the least-known chapters in the flag's history is that Texas technically went more than half a century without an operative statutory flag law. When Texas adopted revised civil statutes in 1879, older general laws not carried forward were repealed. The 1839 flag law was not included."),
    p("Texans did not suddenly stop using the Lone Star flag. It remained the de facto state flag, deeply established by custom and history. But from September 1, 1879, until a new flag law took effect in 1933, the familiar design lacked the same explicit statutory foundation it had previously possessed."),
    p("The Forty-Third Legislature fixed that in 1933 by restoring and clarifying the flag's legal specifications without fundamentally changing the 1839 design."),

    h("The modern Texas flag by law"),
    p("Today the Texas flag is defined in Chapter 3100 of the Texas Government Code. The law preserves the 1839 structure while giving precise proportions. The flag has a width-to-length ratio of two to three. The blue vertical stripe occupies one-third of the flag's length. The remaining two-thirds is divided into equal horizontal white and red stripes."),
    p("The white five-pointed star is centered in the blue stripe with one point facing upward. The current statute also standardizes the red and blue to match the colors used in the United States flag."),
    list(
      "Blue represents loyalty.",
      "White represents purity.",
      "Red represents bravery.",
      "The single star is the defining Lone Star symbol of Texas.",
    ),
    p("An 1839 committee recommendation proposed different color meanings—white for peace, red for war and blue for friendship—but that language was not adopted by Congress. The meanings recognized today are the ones set out in modern Texas law."),

    h("Can the Texas flag fly at the same height as the U.S. flag?"),
    p("Yes, when the Texas and United States flags are displayed together on separate flagpoles, Texas guidance calls for flagpoles of the same height and flags of approximately equal size. But this is not a special privilege Texas received because it was once an independent republic. Federal flag rules do not give Texas a unique exemption, and the Texas flag may not be displayed above the United States flag."),
    p("When the two flags are flown from the same halyard, the United States flag belongs above the Texas flag. On adjacent poles, the United States flag takes the position of honor. The popular claim that Texas is the only state allowed to fly its flag at the same height as the U.S. flag is a myth."),

    h("The Texas flag pledge changed, too"),
    p("Texas adopted a formal flag pledge in 1933, but the original wording contained a historical mistake: it referred to the 'Texas Flag of 1836.' The Lone Star flag being pledged to was adopted in 1839, not 1836. The erroneous date survived for decades before the Legislature removed the words 'of 1836' in 1965."),
    p("The pledge changed again in 2007 when the words 'one state under God' were added. The current pledge reads: 'Honor the Texas flag; I pledge allegiance to thee, Texas, one state under God, one and indivisible.'"),

    h("A compact timeline of the Texas flag"),
    list(
      "1835: Revolutionary Texas uses multiple banners and proposed designs while the political goal shifts from federalism within Mexico toward independence.",
      "March 1836: Texas declares independence; flag proposals circulate, but the familiar modern Lone Star flag does not yet exist.",
      "December 10, 1836: The Republic adopts the blue Burnet flag with a large golden star as its national standard and separately recognizes a striped naval flag.",
      "December 28, 1838: Senator William H. Wharton introduces legislation containing the design that becomes the modern Lone Star flag.",
      "January 25, 1839: President Mirabeau B. Lamar approves the new national flag; Peter Krag's official color artwork survives in the Texas State Archives.",
      "December 29, 1845: Texas is admitted to the United States, and the former national flag becomes the enduring state flag.",
      "February 19, 1846: The Republic's government formally transfers authority to the State of Texas in Austin.",
      "1879: Revised statutes inadvertently leave the state without an operative flag statute, although the Lone Star design remains in common use.",
      "1915: Texas Independence Day, March 2, is designated Texas Flag Day.",
      "1933: The Legislature restores detailed statutory recognition of the flag and establishes a state flag pledge.",
      "1965: The inaccurate words 'of 1836' are removed from the pledge.",
      "1992: The Legislature corrects earlier claims that definitively named Charles B. Stewart as designer and acknowledges that the actual designer is unknown.",
      "2007: 'One state under God' is added to the Texas flag pledge.",
    ),

    h("Why the Lone Star endured"),
    p("The flag works because the design is visually simple and historically layered. A single star had already appeared across revolutionary and Republic-era Texas symbolism. The 1839 flag turned that symbol into a clean national design that was easy to identify at a distance and easy to reproduce."),
    p("More importantly, statehood did not erase the Republic-era symbol. Texans kept using the same flag through annexation, the Civil War era, Reconstruction, industrialization and the growth of modern Texas. Generations that never knew the Republic still inherited its national emblem as their state flag."),
    p("That is why the Lone Star is more than a nickname stamped onto a flag. The star predates the modern design; the modern design predates Texas statehood; and the state has carried that Republic-era flag forward ever since. The history behind it is not perfectly tidy, but that is exactly what makes it worth knowing."),
  ],
};
