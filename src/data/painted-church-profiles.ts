export type PaintedChurchFact = {
  label: string;
  value: string;
};

export type PaintedChurchSection = {
  heading: string;
  paragraphs: string[];
};

export type PaintedChurchSource = {
  label: string;
  url: string;
};

export type PaintedChurchProfile = {
  slug: string;
  quickAnswer: string;
  builtYear?: number;
  paintedYear?: number;
  foundedYear?: number;
  architecture?: string;
  architect?: string;
  builder?: string;
  artists?: string[];
  heritage?: string;
  facts: PaintedChurchFact[];
  history: PaintedChurchSection[];
  paintings: PaintedChurchSection[];
  preservation?: PaintedChurchSection[];
  visitorNotes?: string[];
  sources: PaintedChurchSource[];
};

const highHill: PaintedChurchProfile = {
  slug: "high-hill-nativity-of-mary",
  quickAnswer:
    "St. Mary’s at High Hill is the third Catholic church built on the parish site and one of Texas’s most elaborate painted churches. The present Gothic Revival building was completed in 1906 to a design by Leo M. J. Dielmann, built by Frank Bohlmann, and decorated in 1912 by San Antonio painters Ferdinand Stockert and Hermann Kern. Its interior uses painted canvas, stenciling, faux-marble columns, metallic-gold accents, floral ornament and religious imagery to create the visual effect of a much more structurally elaborate European Gothic church.",
  foundedYear: 1870,
  builtYear: 1906,
  paintedYear: 1912,
  architecture: "Gothic Revival",
  architect: "Leo M. J. Dielmann",
  builder: "Frank Bohlmann",
  artists: ["Ferdinand Stockert", "Hermann Kern"],
  heritage: "German Catholic and Moravian Czech settlement in High Hill",
  facts: [
    { label: "Parish site", value: "Original nine-acre church site deeded in 1868" },
    { label: "First church", value: "Log church blessed September 8, 1870" },
    { label: "Second church", value: "Larger wooden church built in 1875" },
    { label: "Present church", value: "Completed and blessed in 1906" },
    { label: "Interior decoration", value: "Executed in 1912" },
    { label: "Architectural style", value: "Gothic Revival" },
    { label: "Architect", value: "Leo M. J. Dielmann" },
    { label: "Builder", value: "Frank Bohlmann" },
    { label: "Decorators", value: "Ferdinand Stockert and Hermann Kern" },
    { label: "National Register", value: "Listed June 21, 1983; reference 83003136" },
  ],
  history: [
    {
      heading: "From immigrant settlement to parish",
      paragraphs: [
        "High Hill developed from German and Moravian Czech settlement in the nineteenth century. The church became the religious center of the community, and the current building is the third church erected on the original parish site.",
        "The first church was a log building, blessed on September 8, 1870. A larger wooden church followed in 1875 as the congregation grew. When the present church was constructed in 1906, some materials from the earlier building were reused, continuing a physical connection between the generations of the parish.",
      ],
    },
    {
      heading: "The 1906 church",
      paragraphs: [
        "The present church was designed by San Antonio architect Leo M. J. Dielmann, who had studied architecture in Germany and became an important designer of Catholic churches in Texas. Texas Historical Commission and National Park Service records identify the building as Gothic Revival and credit Frank Bohlmann as builder.",
        "Dielmann used the vocabulary of European Gothic churches—vertical emphasis, pointed forms, a prominent tower and a richly articulated interior—but adapted it to a rural Texas congregation and available materials. The result is a church whose architectural effect depends heavily on painted illusion as well as physical construction.",
      ],
    },
  ],
  paintings: [
    {
      heading: "An interior designed to create Gothic illusion",
      paragraphs: [
        "Ferdinand Stockert and Hermann Kern painted the interior in 1912. At High Hill, decorative painting is not simply surface ornament. It helps create the illusion of Gothic groin vaults, ribs and joints, giving the wooden interior the visual depth and complexity of a more expensive masonry or plaster-vaulted church.",
        "Much of the decoration was painted on canvas and then attached to the wooden walls and ceilings. That technique can still be read in the surface of the interior and is one of the distinctive features of High Hill among Texas painted churches.",
      ],
    },
    {
      heading: "What the paintings depict",
      paragraphs: [
        "The decorative program combines religious symbols with floral, geometric and Arts-and-Crafts-inspired ornament. The dominant palette includes sky blue, off-white, green, ochre, red accents and metallic gold. Stylized flowering vines run along painted ribs and borders, while the columns are marbled to imitate polished stone and capped with gilded Corinthian capitals.",
        "The apse contains one of the most important religious images in the scheme: the Lamb of God set within a quatrefoil and flanked by kneeling angels against a cloud background. Elsewhere, the painted vaults and aisle ceilings incorporate repeating religious motifs, medallions, floral borders and gold-highlighted bands that visually organize the ceiling like a Gothic rib-vault system.",
      ],
    },
    {
      heading: "Stained glass and inherited fabric",
      paragraphs: [
        "The painted decoration works together with historic stained glass and furnishings rather than standing alone. The present church incorporated stained-glass windows and other material from the earlier parish church, so the interior reads as a layered record of High Hill’s nineteenth- and early-twentieth-century Catholic community.",
      ],
    },
  ],
  preservation: [
    {
      heading: "A nationally recognized decorative interior",
      paragraphs: [
        "The church was listed in the National Register of Historic Places in 1983 as part of the statewide Churches with Decorative Interior Painting multiple-property group. The listing identifies statewide significance in art, architecture and religion and recognizes the years 1906 and 1912 as significant dates.",
        "Because much of the ornament is on applied canvas, preservation has required specialized treatment. Later restoration work addressed areas where canvas had begun to separate from the substrate, reinforcing how closely the survival of the church depends on conserving both the building and its decorative surfaces.",
      ],
    },
  ],
  visitorNotes: [
    "The church remains an active Roman Catholic place of worship; services, funerals, weddings and parish events take priority over sightseeing.",
    "The Schulenburg Chamber currently promotes Painted Churches touring Monday through Saturday and advises visitors to confirm current access before traveling.",
    "Interior photography should follow posted parish rules and avoid disrupting worship or private events.",
  ],
  sources: [
    { label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003136" },
    { label: "National Park Service National Register record", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003136" },
    { label: "Austin PBS Painted Churches project", url: "https://austinpbs.org/paintedchurches/highhill" },
    { label: "Schulenburg Chamber Painted Churches", url: "https://www.schulenburgchamber.org/painted-churches" },
    { label: "Society of Architectural Historians Archipedia", url: "https://sah-archipedia.org/buildings/TX-01-PF45" },
  ],
};

const ammannsville: PaintedChurchProfile = {
  slug: "ammannsville-st-john-the-baptist",
  quickAnswer:
    "St. John the Baptist at Ammannsville is the community’s third church and one of the best-known Painted Churches of Texas. The present building followed two disasters: a hurricane destroyed the first church in 1909 and fire destroyed the second in 1917. The replacement was designed by John F. Bujnoch, completed in 1918–1919, and decorated in 1919 by San Antonio painter Fred Donecker and his sons. Its pale rose interior, open nave, stenciling, infill, pounce work and faux-marble effects give the church its familiar nickname, the “pink church.”",
  builtYear: 1919,
  paintedYear: 1919,
  architecture: "Gothic Revival / simplified rural Gothic",
  architect: "John F. Bujnoch",
  artists: ["Fred Donecker", "Donecker and Sons"],
  heritage: "Czech Catholic community in rural Fayette County",
  facts: [
    { label: "First church lost", value: "Destroyed by hurricane in 1909" },
    { label: "Second church lost", value: "Destroyed by fire in 1917" },
    { label: "Present church", value: "Built 1918–1919 on the second church’s concrete footprint" },
    { label: "Interior decoration", value: "Painted in 1919" },
    { label: "Architect", value: "John F. Bujnoch" },
    { label: "Decorative painter", value: "Fred Donecker and sons" },
    { label: "National Register", value: "Listed June 21, 1983; reference 83003137" },
    { label: "Recognition", value: "State significance in art, architecture and religion" },
  ],
  history: [
    {
      heading: "A church rebuilt twice after disaster",
      paragraphs: [
        "The present St. John the Baptist is the third church to serve Ammannsville. A hurricane destroyed the first building in 1909. The congregation then built a more elaborate second church associated with architect Leo M. J. Dielmann, but that building burned only eight years later in 1917.",
        "Rather than abandon the site, parishioners rebuilt almost immediately. The third church rose on the concrete footprint of the second. Compared with its ornate predecessor, the replacement was deliberately simpler and more practical, reflecting both the congregation’s determination and the realities of rebuilding after repeated loss.",
      ],
    },
    {
      heading: "John Bujnoch’s open interior",
      paragraphs: [
        "Texas Historical Commission records identify John F. Bujnoch as architect and classify the church within the Gothic Revival tradition. Unlike the earlier building, the present church eliminated interior support columns, producing a more open, airy nave and leaving broad wall and ceiling surfaces for decorative painting.",
      ],
    },
  ],
  paintings: [
    {
      heading: "Why it is called the pink church",
      paragraphs: [
        "The interior is dominated by a pale rosy-pink color scheme that has made Ammannsville immediately recognizable on the Painted Churches route. The color creates a warm background for repeating ornamental bands, religious decoration, statuary and stained glass rather than the darker, highly architectural illusion used at High Hill.",
      ],
    },
    {
      heading: "Stenciling, infill and pounce work",
      paragraphs: [
        "The decorative program uses several techniques associated with professional church painters of the period. Stenciled patterns repeat along walls and ceiling areas; infill painting creates larger hand-filled motifs; pounce transfer allowed more complex designs to be laid out consistently before painting. Faux-marble treatment adds the appearance of costlier materials to selected architectural surfaces.",
        "Austin PBS research attributes the surviving decorative scheme to Fred Donecker and his sons. Donecker’s authorship was identified through later scholarly comparison of technique and style with other documented church interiors in the region.",
      ],
    },
    {
      heading: "Religious imagery and restored devotional objects",
      paragraphs: [
        "The painted setting frames the church’s altars, statues, stained glass and devotional objects. Two angel figures used as holy-water holders at the entrance were later rediscovered in poor condition and restored by local artist Gene A. Mikulik, tying the preservation of the interior to generations of local care.",
      ],
    },
  ],
  preservation: [
    {
      heading: "From forgotten artist to documented interior",
      paragraphs: [
        "For years local tradition treated the decorator as an unknown itinerant painter. Research by decorative-painting scholar Buie Harwood compared Ammannsville with documented examples elsewhere and identified Fred Donecker as the artist. That research helped move the church from local legend into a better documented statewide decorative-arts context.",
        "The church was listed in the National Register of Historic Places in 1983 as part of the Churches with Decorative Interior Painting multiple-property group, recognizing its importance in art, architecture and religion.",
      ],
    },
  ],
  visitorNotes: [
    "The church remains an active Catholic parish, so worship and private parish events take priority over touring.",
    "Current Schulenburg Chamber guidance places Ammannsville on the Painted Churches circuit and recommends confirming access before travel.",
    "Visitors should treat the decorative surfaces, statuary, pews and devotional areas as active sacred-space furnishings rather than museum exhibits.",
  ],
  sources: [
    { label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003137" },
    { label: "Austin PBS Painted Churches project", url: "https://austinpbs.org/paintedchurches/ammansville" },
    { label: "Austin PBS decorative painting techniques", url: "https://austinpbs.org/paintedchurches/decorative" },
    { label: "Schulenburg Chamber Painted Churches", url: "https://schulenburgchamber.org/painted-churches/" },
  ],
};

export const paintedChurchProfiles: Record<string, PaintedChurchProfile> = {
  [highHill.slug]: highHill,
  [ammannsville.slug]: ammannsville,
};

export function paintedChurchProfileBySlug(slug: string) {
  return paintedChurchProfiles[slug];
}
