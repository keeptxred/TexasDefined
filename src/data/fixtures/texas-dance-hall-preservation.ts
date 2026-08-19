import smallTown from "@/assets/small-town.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasDanceHallPreservationArticle: Article = {
  id: "ar-7",
  brandId: "texasdefined",
  slug: "texas-dance-hall-survival",
  title: "The Last Dance Halls",
  dek: "Why historic Texas dance halls survive only when communities can keep roofs dry, floors sound, events active and old buildings useful enough to earn another generation of care.",
  category: "texas-history",
  region: "hill-country",
  hero: { src: smallTown, alt: "A historic Texas town at golden hour representing the communities that sustain old dance halls", width: 1600, height: 1067 },
  authorId: "a-hollis",
  publishedAt: "2026-01-28",
  readingMinutes: 10,
  tags: ["history", "music", "dance halls", "preservation"],
  internalLinks: [
    { href: "/texas-dance-halls-honky-tonks", label: "Texas dance halls and honky-tonks", description: "Use the broader TexasDefined guide for music traditions, two-step culture and planning a dance-hall weekend." },
    { href: "/things-unique-to-texas/culture-music", label: "Texas culture and music traditions", description: "Place dance halls alongside the music, rituals and community traditions that make Texas culture distinctive." },
    { href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Trace the immigrant communities, churches, foodways and social institutions that built many Central Texas halls." },
    { href: "https://texasdancehall.org/", label: "Texas Dance Hall Preservation", description: "Statewide nonprofit preservation organization providing education, technical assistance and support for historic Texas dance halls." },
    { href: "https://texasdancehall.org/dance-hall-owners/preservation-fund-grants/", label: "Texas Dance Hall Preservation Fund", description: "Current preservation-fund information for critical repairs and professional building assessments." },
    { href: "https://thc.texas.gov/preserve/grants-tax-credits-and-funding/additional-funding-sources-preservation-projects", label: "Texas Historical Commission preservation funding resources", description: "Official state preservation funding directory that includes historic-building and Texas dance-hall resources." },
    { href: "https://texasdancehall.org/dance-hall-owners/historic-designations/", label: "Historic designation options for Texas dance halls", description: "Guidance on National Register, state-marker and local historic designations that can support recognition and preservation." },
  ],
  relatedCollections: [],
  relatedDestinations: ["gruene-historic-district"],
  body: [
    p("A historic Texas dance hall does not survive because people agree it is charming. It survives because someone keeps rain out of the roof, moisture away from the floor, wiring and exits safe, ownership stable, the calendar active and enough community attention on the building that the next repair is worth making."),
    p("That is what separates dance-hall preservation from nostalgia. The music matters, but so do foundations, roofs, ventilation, drainage, insurance, accessibility, volunteer labor, nonprofit organization and the unglamorous economics of maintaining a large old room in a small community."),
    h("Many halls began as community infrastructure"),
    p("German, Czech and other Central European communities built halls for more than dancing. Agricultural societies, fraternal groups, mutual-aid organizations, singing societies and local clubs used them for meetings, celebrations, fundraisers and social life. Dancing fit naturally into buildings already designed to gather a community under one roof."),
    p("That mixed use is important to preservation. A building that can still host weddings, dances, meetings, festivals, benefits and community events has more ways to justify repairs than a building preserved only as a static artifact."),
    h("The building itself is part of the cultural record"),
    p("Historic halls often rely on long wooden floors, high ceilings, broad rooms and openings designed for ventilation before modern air conditioning. Those features shaped how crowds moved, how musicians sounded in the room and how a summer dance actually felt. Replacing every old feature with a modern equivalent can keep a venue functional while slowly erasing the physical character that made it historically important."),
    p("Preservation therefore becomes a balancing act. Owners and nonprofit boards need buildings that are safe and usable, but repairs should respect historic materials and character where practical. Qualified architects, engineers and preservation professionals can help distinguish ordinary maintenance from work that might damage a significant structure."),
    h("Water is one of the most ordinary threats"),
    p("A leaking roof does not look as dramatic as demolition, but repeated water intrusion can damage framing, ceilings, wall materials and dance floors. Drainage problems can undermine foundations or keep crawl spaces wet. Texas Dance Hall Preservation explicitly focuses its grant program on critical repairs and professional condition assessments because small building failures become expensive preservation crises when they are deferred."),
    h("A dance floor is not just another floor"),
    p("The floor carries both the building's use and much of its identity. Generations of shoes, dances, repairs and refinishing become part of the hall's physical history. Buckling, moisture, failed supports or inappropriate replacement can threaten both safety and character. Preserving a floor may require structural work below it rather than simply sanding what visitors can see."),
    h("Historic designation can help, but it is not a maintenance plan"),
    p("National Register listing, Recorded Texas Historic Landmark status or local designation can document significance and may open doors to certain incentives, grants or technical support. Texas Dance Hall Preservation notes that different designations carry different effects and that not every designation automatically prevents alteration or demolition."),
    p("Recognition works best when paired with a realistic building plan: who owns the hall, who makes decisions, what condition the building is in, what repairs are urgent, what events generate revenue and who will still be involved five or ten years from now."),
    h("The halls that survive usually remain useful"),
    p("Continuing use is one of the strongest forms of preservation. A hall with regular dances, concerts, weddings, community events or rentals keeps people physically connected to the building. That creates ticket buyers, volunteers, donors, memories and political support for preservation that an empty landmark rarely develops on its own."),
    p("Use also creates wear, of course. Preservation is not the absence of use; it is the management of use so the building can keep doing the job that made it important."),
    h("Nonprofits and volunteers fill the gap between history and economics"),
    p("Many halls are too locally important to abandon but too financially marginal to maintain like a commercial venue. Volunteer boards, family owners, local historical groups and preservation nonprofits often bridge that gap. Texas Dance Hall Preservation has worked statewide since 2007, offering technical assistance, education, outreach and preservation support specifically for these buildings."),
    h("A preservation grant is leverage, not a substitute for a community"),
    p("Matching grants can help pay for a roof, structural work or a professional assessment, but a match still requires local fundraising and organizational capacity. That design reflects a basic truth: outside preservation money works best when a local group is already committed enough to organize the project and maintain the result."),
    h("What visitors can do that actually helps"),
    list(
      "Attend a public dance, concert or fundraiser when the hall has one.",
      "Buy tickets, food or merchandise from the hall rather than treating the building only as a photo stop.",
      "Respect private events, neighboring property and rules about access.",
      "Donate to a hall or preservation organization when a specific repair campaign is credible and transparent.",
      "Learn the hall's history from local or preservation sources instead of repeating folklore as fact.",
      "Support the broader town—restaurants, lodging and local businesses—when a dance-hall trip brings you there."
    ),
    h("Preservation is the continuation of a relationship"),
    p("A dance hall can be architecturally important and still disappear if nobody has a reason to unlock it. The strongest surviving halls remain places where history is not separated from ordinary use: people still arrive, hear music, dance, volunteer, repair a roof, clean the floor and argue about what the building needs next."),
    p("That is why the survival story is different from a list of famous halls. The broader Texas dance-hall guide can tell you where the music still lives. Preservation explains why some of those rooms are still standing when the next generation arrives."),
  ],
};
