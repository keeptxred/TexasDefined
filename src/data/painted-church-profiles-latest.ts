import type { PaintedChurchProfile } from "./painted-church-profiles";

const latestProfiles: PaintedChurchProfile[] = [
  {
    slug: "castroville-st-louis-catholic-church",
    quickAnswer: "St. Louis Catholic Church in Castroville belongs in the broader Texas Painted Churches tradition because the parish itself publishes interior imagery identified as the painted inside church, the Texas Historical Commission documents the 1870 limestone church and Recorded Texas Historic Landmark status, and the Buie Harwood archive includes St. Louis in its decorative-painting field research.",
    foundedYear: 1844,
    builtYear: 1870,
    architecture: "Nineteenth-century limestone Catholic church in historic Castroville",
    heritage: "Alsatian Catholic immigrant community in Castroville",
    facts: [
      { label: "Present church", value: "The current limestone church dates to 1870" },
      { label: "Heritage", value: "The parish grew from Castroville's Alsatian Catholic settlement" },
      { label: "Historic designation", value: "Recorded Texas Historic Landmark" },
      { label: "Decorative evidence", value: "The parish history publishes interior imagery identified as the painted inside church, while the Buie Harwood archive independently includes St. Louis in decorative-painting field research" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [{ heading: "An Alsatian Catholic landmark in Castroville", paragraphs: ["St. Louis Catholic Church is rooted in the Alsatian settlement of Castroville. The parish history and Texas Historical Commission document the church as part of the community's nineteenth-century Catholic and architectural legacy, with the present stone church dating to 1870."] }],
    paintings: [{ heading: "A documented painted interior, with chronology still under study", paragraphs: ["The parish's own historical material includes an interior image identified as the painted inside church. Separately, the Buie Harwood decorative-painting archive includes St. Louis among church-specific field-research materials. Those independent records establish a defensible decorative-interior connection, while Texas Defined leaves the exact painting chronology and authorship unresolved until stronger primary evidence is located."] }],
    preservation: [{ heading: "Conservative integrity classification", paragraphs: ["Texas Defined currently marks St. Louis's interior integrity as uncertain. That is intentional: the evidence supports a historic painted program, but it does not yet support a precise claim about how much visible decoration is original, restored, repainted or reconstructed."] }],
    visitorNotes: ["St. Louis is an active parish in Castroville. Verify current church access, Masses and parish events through the official parish before making a sightseeing trip."],
    sources: [
      { label: "St. Louis Catholic Church — official parish history", url: "https://www.saintlouisdaycastroville.org/history" },
      { label: "Texas Historical Commission — St. Louis Catholic Church", url: "https://atlas.thc.texas.gov/Details/5325005051" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
      { label: "St. Louis Catholic Church — official parish", url: "https://www.saintlouisdaycastroville.org/" },
    ],
  },
  {
    slug: "lacoste-our-lady-of-grace",
    quickAnswer: "Our Lady of Grace Catholic Church in La Coste belongs in the broader Texas Painted Churches tradition because the Buie Harwood archive preserves a dedicated 21-slide decorative-painting study of the church from 1978, while the active parish and Texas Historical Commission independently identify the same 1911 red-brick Gothic church at 15825 Bexar Street.",
    foundedYear: 1911,
    builtYear: 1911,
    architecture: "Red-brick Gothic Catholic church",
    heritage: "Medina County Catholic community with historic ties to the Castroville-La Coste corridor",
    facts: [
      { label: "Present church", value: "Completed in 1911" },
      { label: "Address", value: "15825 Bexar St., La Coste, Texas 78039" },
      { label: "Decorative-painting archive", value: "Buie Harwood's archive contains 21 church-specific slides dated 1978" },
      { label: "Historic marker", value: "Texas Historical Commission marker 17850, erected 2014" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [{ heading: "A 1911 Catholic landmark in La Coste", paragraphs: ["The parish and Texas Historical Commission both trace Our Lady of Grace to a 1910 petition and the completion of the red-brick Gothic church in 1911. Emil Zinsmeyer donated land for the church, school and cemetery, and the building became a long-lived center of Catholic community life in La Coste."] }],
    paintings: [{ heading: "A scholarly decorative-painting record without invented details", paragraphs: ["The strongest inclusion evidence is the Buie Harwood archive's dedicated 21-slide Our Lady of Grace research group from 1978. That establishes church-specific decorative-painting research, but the currently verified source set does not yet establish a named artist, precise painting date or documented technique set. Texas Defined leaves those fields blank instead of deriving them from modern photographs alone."] }],
    preservation: [{ heading: "Integrity remains an open research question", paragraphs: ["The public record confirms that the church interior has experienced later work, but the verified primary and scholarly sources do not yet support a precise original-versus-restored classification. The canonical record therefore uses an uncertain integrity label until better documentation is located."] }],
    visitorNotes: ["Our Lady of Grace is an active parish. Use the official parish website for current Masses, office hours and contact information and verify sightseeing access before making a special trip."],
    sources: [
      { label: "Our Lady of Grace — official parish history", url: "https://olgtx.org/about-us" },
      { label: "Texas Historical Commission — Our Lady of Grace Catholic Church", url: "https://atlas.thc.texas.gov/Details/5507017850" },
      { label: "Buie Harwood and Anna Brightman archive", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
      { label: "Our Lady of Grace — official parish", url: "https://olgtx.org/" },
    ],
  },
  {
    slug: "mason-st-joseph-catholic-church",
    quickAnswer: "St. Joseph Catholic Church in Mason is an 1876 red-sandstone Hill Country church with a documented historic painted interior. Local artist Manuel Lopez painted the sanctuary and beadboard ceiling in 1916 with a light-blue sky, clouds, stars, angels and a dove above the altar. A 1963 expansion covered the painted ceiling with acoustical tile; the historic work was later rediscovered, documented and restored during the church's 2024 renovation, with the recovered design extended across the newer portion of the vault.",
    foundedYear: 1873,
    builtYear: 1876,
    paintedYear: 1916,
    architecture: "Nineteenth-century red-sandstone Catholic church; enlarged to a modified-cross plan in 1963",
    artists: ["Manuel Lopez"],
    heritage: "Mason County Catholic community and Texas Hill Country parish history",
    facts: [
      { label: "Congregation organized", value: "February 1873 after earlier Masses in local homes" },
      { label: "Present church", value: "Completed in September 1876 from locally quarried red sandstone" },
      { label: "Historic painter", value: "Manuel Lopez, a local artist and parishioner" },
      { label: "Historic painting", value: "1916" },
      { label: "1916 imagery", value: "Light-blue sky, clouds, stars, angels and a dove above the altar" },
      { label: "1963 expansion", value: "The west wall was removed and the church roughly doubled in floor area; acoustical tile covered the painted angels" },
      { label: "Paint rediscovery", value: "The concealed ceiling was rediscovered before the 2024 restoration; restoration documentation identifies an accidental rediscovery in 1989" },
      { label: "2024 restoration", value: "Murals by Jericho restored the historic ceiling imagery and extended the documented design across the newer vault" },
      { label: "2024 rededication", value: "October 6, 2024" },
      { label: "Current address", value: "216 N Ave B, Mason, Texas 76856" },
      { label: "Classification", value: "Broader historic Painted Churches tradition; not claimed as part of the formal 1983 National Register decorative-interior group" },
    ],
    history: [
      {
        heading: "A frontier Catholic church built from Mason County stone",
        paragraphs: [
          "Catholic worship in the Mason area preceded the formal parish. The church's own history records Mass being celebrated in local homes before the congregation organized in February 1873. The surviving church was completed in September 1876, using red sandstone quarried about a mile from the site and hauled with other materials by wagon.",
          "The original building was a compact rectangular sanctuary with thick stone walls and a beadboard ceiling that followed the roof slope. Its local stone construction makes the later painted interior especially important: the church joined a distinctly Hill Country exterior to an interior decorative language intended to evoke a more expansive sacred sky.",
        ],
      },
      {
        heading: "The 1963 enlargement changed the building and hid the ceiling",
        paragraphs: [
          "A major 1963 project removed the west wall and added approximately as much floor area as the original church, producing a modified-cross plan with a new sanctuary, sacristy and Guadalupe Chapel. The project also introduced terrazzo flooring and acoustical ceiling tile.",
          "Those ceiling tiles concealed Lopez's angels and other 1916 imagery. This makes Mason an unusually clear example of a historic decorative program that survived because it was covered rather than deliberately stripped away.",
        ],
      },
    ],
    paintings: [
      {
        heading: "Manuel Lopez painted a celestial interior in 1916",
        paragraphs: [
          "The parish's 1983 historical account names Manuel Lopez as the artist who painted the church interior in 1916. He turned the ceiling light blue and filled it with clouds, stars and angels. Behind the altar, the painted sky appeared to open around a hovering dove, a traditional symbol of the Holy Spirit.",
          "The program belongs to the broader Painted Churches tradition because the painting is integrated with the architecture rather than limited to a movable devotional object. Its ceiling-wide celestial field changes how the stone church is experienced, visually opening the timber vault into an imagined sacred sky.",
        ],
      },
      {
        heading: "The 2024 campaign restored evidence and extended the scheme",
        paragraphs: [
          "The Diocese of Austin reports that the renovation team photographed the surviving ceiling in detail and preserved intact painted fragments as damaged material was removed. Murals by Jericho used that evidence to restore the historic images and extend the visual language across the portion of the ceiling added in 1963.",
          "The project also introduced new decorative work rather than presenting every visible surface as 1916 material. Studio io documents new stencil motifs and sanctuary imagery inspired by the church's historic character. Texas Defined therefore distinguishes the restored Lopez ceiling from the complementary twenty-first-century additions.",
        ],
      },
    ],
    preservation: [
      {
        heading: "Covered, rediscovered and restored",
        paragraphs: [
          "Mason demonstrates why 'original,' 'restored' and 'newly painted' cannot be treated as interchangeable labels. The 1916 program was covered by the 1963 renovation, later rediscovered, and then used as documentary evidence for the 2024 restoration.",
          "The 2024 work also addressed the building envelope and structure, including roofing, belfry, steeple, waterproofing and deteriorated interior materials. The Diocese reported an approximately $500,000 improvement program, underscoring that decorative-paint conservation often depends on first stabilizing the building that carries it.",
        ],
      },
    ],
    visitorNotes: [
      "St. Joseph remains an active Catholic parish. Worship, confession, parish events and private religious use take priority over sightseeing.",
      "The official parish address is 216 N Ave B, Mason, TX 76856.",
      "Texas Time Travel advises visitors to call ahead to arrange viewing outside the church's regular worship schedule.",
      "No reusable rights-cleared Mason church photograph was located during the September 24 image review, so Texas Defined does not substitute an unrelated or generic church image.",
    ],
    sources: [
      { label: "St. Joseph Catholic Church Mason — official parish history", url: "https://www.stjosephmason.org/about-us" },
      { label: "St. Joseph Catholic Church Mason — official contact", url: "https://www.stjosephmason.org/contact-us" },
      { label: "Diocese of Austin — 2024 renovation and painted-ceiling restoration", url: "https://austindiocese.news/st-joseph-mason-celebrates-more-150-years-nurturing-faith" },
      { label: "Studio io — St. Joseph Mason restoration", url: "https://www.studioiodesign.com/st-joseph-mason" },
      { label: "Texas Time Travel — St. Joseph's Catholic Church Mason", url: "https://texastimetravel.com/directory/st-josephs-catholic-church/" },
      { label: "Mason County Chamber — Manuel Lopez and 2024 ceiling restoration", url: "https://masontx.org/walking-tour/" },
    ],
  },
];

export function latestPaintedChurchProfileBySlug(slug: string) {
  return latestProfiles.find((profile) => profile.slug === slug);
}
