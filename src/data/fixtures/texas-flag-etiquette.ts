import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasFlagEtiquetteArticle: Article = {
  id: "evergreen-texas-flag-etiquette",
  brandId: "texasdefined",
  slug: "texas-flag-etiquette-display-guide",
  title: "Texas Flag Etiquette: How to Display the Lone Star Flag Correctly",
  dek: "A practical guide to Texas flag position, vertical display, half-staff, the U.S. flag, the state pledge, folding and retirement—grounded in the Texas Flag Code rather than folklore.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag-of-Texas.jpg?width=1600",
    alt: "The Texas state flag flying outdoors in Austin",
    width: 1600,
    height: 1067,
    credit: "Makaristos · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 8,
  tags: [
    "texas flag etiquette",
    "texas flag rules",
    "texas flag display",
    "texas flag half staff",
    "texas flag pledge",
    "texas flag code",
    "lone star flag",
  ],
  featured: false,
  sourceName: "Texas State Library and Archives Commission · Texas Flag Code",
  sourceUrl: "https://www.tsl.texas.gov/ref/abouttx/flagcode.html",
  internalLinks: [
    {
      href: "/article/history-of-the-texas-flag",
      label: "Read the history of the Texas flag",
      description: "Follow the Lone Star from revolution-era proposals and the Burnet flag through the Republic's 1839 design and modern law.",
    },
    {
      href: "/texas-symbols",
      label: "Explore official Texas symbols",
      description: "Continue from the flag into the animals, plants, foods, traditions and other symbols Texas recognizes by law.",
    },
    {
      href: "/article/six-flags-over-texas-meaning",
      label: "What the Six Flags Over Texas mean",
      description: "Separate the modern state flag from the six governments represented in the familiar Texas historical phrase.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas flag etiquette is easier to understand once one fact is clear: Texas does not rely on a collection of informal traditions alone. Chapter 3100 of the Texas Government Code sets out a state flag code covering the flag's design, outdoor and indoor display, position with other flags, half-staff, processions, folding, the state pledge and retirement. Federal flag rules also matter whenever the United States flag is displayed beside it."),
    p("That legal framework also clears up one of the most repeated Texas myths. Texas does not have a special right, inherited from its years as an independent republic, to place its flag on equal footing with or above the United States flag. State flags can be flown on adjacent staffs at the same physical height, but the United States flag keeps the position of honor and no state flag may be displayed above it."),

    h("The quick answer: Texas flag rules most people need"),
    list(
      "On adjacent flagpoles, the Texas and U.S. flags may be on poles of the same height and be approximately the same size, but the U.S. flag occupies the position of honor.",
      "On one halyard, the U.S. flag belongs above the Texas flag.",
      "When the Texas flag is displayed vertically, orient it according to the Texas Flag Code rather than simply rotating a horizontal flag at random.",
      "When a half-staff order applies, raise the flag to the top first and then lower it to half-staff; raise it to the top again before lowering it for the day.",
      "A damaged or worn Texas flag should be retired respectfully rather than thrown away as ordinary trash.",
      "For a current half-staff directive, check the Office of the Texas Governor's flag-status page rather than relying on an old social-media post.",
    ),

    h("Texas flag and U.S. flag on separate poles"),
    p("This is the arrangement behind the famous 'same height' question. The practical rule is not that Texas received a unique privilege. When the U.S. flag and a state flag are displayed from adjacent staffs, federal law gives the U.S. flag precedence: it is hoisted first and lowered last, and the state flag may not be placed above it or to the U.S. flag's right."),
    p("That still allows two adjacent poles to be the same height. What matters is the position of honor and the prohibition on putting a state flag above the national flag. Similar-height poles are ordinary flag practice across the country, not a special exception reserved for Texas because it was once a republic."),

    h("Texas flag and U.S. flag on the same pole"),
    p("If both flags are flown from the same halyard, the United States flag belongs at the peak, above the Texas flag. A state flag does not share the top position on the same line. This is one of the simplest ways to spot the difference between equal-height adjacent staffs and two flags on one staff."),
    p("The same principle carries into larger displays. If a group of state and local flags is arranged with the United States flag, the national flag receives the superior position specified by federal flag rules. Texas identity does not override federal precedence."),

    h("How to hang the Texas flag vertically"),
    p("A flag that looks obvious horizontally can become confusing when turned vertically. Chapter 3100 contains specific instructions for horizontal and vertical display, including display against a wall or in a window. The safest practice is to follow the statutory orientation rather than assuming that rotating the flag 90 degrees in either direction produces an equivalent display."),
    p("That matters because the Lone Star design has a distinct blue field and star orientation. A vertical installation should preserve the flag's intended visual order instead of leaving the star or color fields in an arbitrary position. Permanent installations at schools, businesses and public buildings are worth checking against the current Texas Flag Code before hardware is fixed in place."),

    h("When should the Texas flag be at half-staff?"),
    p("Half-staff is not something an institution needs to guess from national headlines. The Texas governor can direct or authorize the Texas flag to be flown at half-staff, and the Governor's Office maintains an official Flag Status page that shows the current statewide status and posts instructions when a directive is in effect."),
    p("The basic motion is deliberate: first raise the flag briskly to full-staff, then lower it slowly to the half-staff position. Before taking the flag down, raise it to full-staff again and then lower it. When the United States flag is also under a half-staff order, no Texas flag should remain positioned above it."),
    p("Because half-staff orders can be statewide, local or tied to a defined period, an evergreen article should never tell you that the flag is 'currently' at half-staff. Check the Governor's official status page for the date you are displaying it."),

    h("What about rain, darkness and everyday outdoor display?"),
    p("Texas law contains its own display provisions, while federal law supplies familiar rules for the United States flag. For the U.S. flag, the federal code describes sunrise-to-sunset display as the universal custom, permits 24-hour display when properly illuminated at night and advises against display in inclement weather unless an all-weather flag is used."),
    p("When Texas and U.S. flags are displayed together, following the more protective practice is a sensible way to keep the entire display consistent. Permanent home and business installations should also use secure poles and hardware so the flags can fly freely without dragging against roofs, trees, signs or the ground."),

    h("Can the Texas flag touch the ground?"),
    p("A flag touching the ground is widely treated as something to avoid, but one accidental contact does not magically require destruction of an otherwise serviceable flag. The practical question is condition. If the flag becomes soiled, damaged or unfit for respectful display, clean it when appropriate or retire it when it has reached the end of its useful life."),
    p("The larger principle of flag etiquette is respect, not superstition. Keep the flag clean, secure it so it does not repeatedly strike rough surfaces, and replace it when fading, tearing or fraying makes the display look neglected."),

    h("Folding the Texas flag"),
    p("Texas goes further than many people realize: the state flag code includes a section specifically addressing folding the Texas flag. That means a ceremonial Texas flag fold should not simply be assumed to be identical to the familiar triangular fold associated with the United States flag."),
    p("For schools, honor guards, civic organizations and public ceremonies, use the procedure in the current Texas Government Code or official state guidance rather than an unsourced diagram circulating online. The code is the controlling reference when local custom and internet instructions disagree."),

    h("Retiring a worn Texas flag"),
    p("Chapter 3100 also addresses retirement and provides a recommended retirement ceremony. The goal is a dignified end for a flag that is no longer suitable for display. That is different from treating an old flag as ordinary household waste."),
    p("Veterans organizations, civic groups, scouting organizations and some public facilities periodically collect worn flags for respectful retirement. When using a third-party collection program, confirm that it actually follows a respectful flag-retirement process rather than assuming every drop box does the same thing."),

    h("The Texas flag pledge"),
    p("The current pledge is: 'Honor the Texas flag; I pledge allegiance to thee, Texas, one state under God, one and indivisible.' Texas law addresses the pledge in Sections 3100.101 through 3100.104."),
    p("The wording has its own history. The 1933 version referred to the 'Texas Flag of 1836,' even though the familiar Lone Star flag was adopted in 1839. The Legislature removed 'of 1836' in 1965, and the phrase 'one state under God' was added in 2007. That history is a useful reminder that flag etiquette and flag history overlap: even official rituals can change as the state corrects or revises its law."),

    h("Is Texas the only state that can fly its flag as high as the U.S. flag?"),
    p("No. This is one of the most durable pieces of Texas folklore, but federal flag rules do not give Texas a once-a-republic exception. State flags on adjacent staffs can appear at the same physical height while the United States flag retains precedence. The rule is about honor and placement, not about forcing every state flagpole to be physically shorter."),
    p("The myth probably survives because the true history is close enough to sound plausible: Texas really was an independent republic, and today's state flag really was its national flag. But that historical fact does not create a modern exception to the United States Flag Code."),

    h("A practical home-display checklist"),
    list(
      "Use a clean, serviceable Texas flag with the star and color fields oriented correctly.",
      "If the U.S. flag is present, give it the required position of honor and never put the Texas flag above it.",
      "For one halyard, put the U.S. flag above the Texas flag.",
      "For adjacent staffs, follow the hoisting, lowering and position rules rather than the 'Texas can fly equal because it was a republic' myth.",
      "Check the Texas Governor's official flag-status page before acting on a half-staff notice.",
      "For a vertical wall or window display, confirm the orientation in Chapter 3100.",
      "Replace or respectfully retire a flag that is too worn for dignified display.",
    ),

    h("The source to use when you are unsure"),
    p("For Texas-specific questions, start with Chapter 3100 of the Texas Government Code. The Texas State Library and Archives Commission maintains a plain-language flag-code reference that points to the relevant sections for display, half-staff, carrying, folding, the pledge and retirement. For current half-staff status, use the Office of the Texas Governor. When the U.S. flag is part of the display, Title 4 of the United States Code supplies the federal rules for its position and manner of display."),
    p("That combination—Texas law for the Lone Star flag, federal law for the U.S. flag and the Governor's current status page for temporary directives—answers almost every ordinary flag-display question without relying on folklore."),
  ],
};
