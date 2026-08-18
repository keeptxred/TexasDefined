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

export const paintedChurchProfiles: Record<string, PaintedChurchProfile> = {
  [highHill.slug]: highHill,
};

export function paintedChurchProfileBySlug(slug: string) {
  return paintedChurchProfiles[slug];
}
