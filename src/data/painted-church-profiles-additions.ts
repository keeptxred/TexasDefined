import type { PaintedChurchProfile } from "./painted-church-profiles";

const profiles: PaintedChurchProfile[] = [
  {
    slug: "plantersville-st-marys-catholic-church",
    quickAnswer: "St. Mary’s at Plantersville is a 1917 Gothic Revival church built for a growing Polish and German-Russian Catholic community. Its painted ceiling, applied-canvas sanctuary imagery, historic altars and layered restoration history make it a strong example of the broader Painted Churches tradition outside the formal 1983 THC decorative-interior group.",
    foundedYear: 1873,
    builtYear: 1917,
    architecture: "Gothic Revival rural Catholic church",
    heritage: "Polish, German and German-Russian Catholic settlement in Grimes County",
    facts: [
      { label: "First church", value: "1873" },
      { label: "Present church", value: "1917, after the previous building burned following a lightning strike" },
      { label: "State designation", value: "Recorded Texas Historic Landmark" },
      { label: "Historic painting", value: "Victorious Lamb with incensing angels painted on canvas above the sanctuary arch" },
    ],
    history: [{ heading: "A growing immigrant parish", paragraphs: ["Texas Historical Commission records trace Catholic worship in Plantersville to the nineteenth century and document major growth as Polish and German-Russian immigrants settled the area. The surviving 1917 building replaced an earlier church destroyed by fire."] }],
    paintings: [{ heading: "A layered decorative interior", paragraphs: ["Historic descriptions document original stenciling, a blue starry sanctuary ceiling, applied-canvas imagery and later repainting. Some decorative evidence survived beneath later wall coverings and helped guide restoration work, making the interior valuable for understanding change over time rather than a single untouched paint campaign."] }],
    preservation: [{ heading: "Restoration informed by surviving evidence", paragraphs: ["Later parish work recovered original color and stencil evidence and restored altars, furnishings and painted details while retaining visible layers from different periods."] }],
    visitorNotes: ["Verify current access before traveling; the church remains active and parish events take priority."],
    sources: [
      { label: "Texas Historical Commission marker record", url: "https://atlas.thc.texas.gov/Details/5185012792" },
      { label: "National Catholic Register feature", url: "https://www.ncregister.com/blog/take-a-peek-inside-a-historic-painted-church-of-texas" },
    ],
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    quickAnswer: "Holy Trinity at Corn Hill is a 1913 twin-spired Catholic church rooted in Czech and Moravian settlement. Texas Defined includes it in the broader modern Painted Churches tradition because current travel and parish sources document its decorated interior, while clearly distinguishing it from the formal THC National Register painted-interior group.",
    foundedYear: 1889,
    builtYear: 1913,
    architecture: "Twin-spired early-20th-century Catholic church",
    heritage: "Czech and Moravian Catholic community in Williamson County",
    facts: [
      { label: "Parish founded", value: "1889" },
      { label: "Present church", value: "1913" },
      { label: "Classification", value: "Broader Painted Churches tradition; not represented as part of THC's 1983 decorative-interior group" },
    ],
    history: [{ heading: "A Central Texas immigrant parish", paragraphs: ["The parish's own history and county records establish a Czech- and Moravian-rooted congregation whose current church became a major landmark in the Corn Hill community."] }],
    paintings: [{ heading: "A decorated living church", paragraphs: ["Modern Painted Churches coverage identifies Holy Trinity for its mural-decorated interior. Texas Defined preserves that classification while keeping formal historic-register claims separate."] }],
    visitorNotes: ["Check the parish website for current Masses and contact information before visiting."],
    sources: [
      { label: "Holy Trinity Catholic Church official site", url: "https://holytrinityofcornhill.org/" },
      { label: "Traveller’s Elixir Painted Churches road trip", url: "https://www.travellerselixir.com/texas-painted-churches-road-trip/" },
    ],
  },
  {
    slug: "palestine-sacred-heart-catholic-church",
    quickAnswer: "Sacred Heart Catholic Church in Palestine belongs in a comprehensive Painted Churches resource because primary-source photographs preserved by the Portal to Texas History show a decorated sanctuary with religious murals and stained glass, while Buie Harwood's decorative-painting research archive separately documents the church as a Texas decorative-painting site.",
    architecture: "Historic brick Catholic church with timber ceiling and decorated sanctuary",
    heritage: "Catholic parish history in Palestine and East Texas",
    facts: [
      { label: "Address", value: "503 N Queen St., Palestine" },
      { label: "Interior evidence", value: "Portal to Texas History photographs document a religious mural above the altar and extensive stained glass" },
      { label: "Decorative-painting archive", value: "Included in the Buie Harwood decorative-painting slide collection" },
      { label: "Visitor policy", value: "Not open for sightseeing outside scheduled worship, Confession and Adoration without arranging access" },
    ],
    history: [{ heading: "A documented East Texas decorative interior", paragraphs: ["Historic photographs from the Palestine Public Library collection preserved by UNT show that Sacred Heart's decorative character is not a modern travel-blog invention. The sanctuary combines stained glass, a painted religious scene and a distinctive historic interior envelope."] }],
    paintings: [{ heading: "The sanctuary mural", paragraphs: ["Portal photographs identify a mural of Jesus and angels over the altar area. Later visitor material describes the Transfiguration of Christ image and its twentieth-century retouching history, reinforcing the church's value as a painted sacred interior."] }],
    visitorNotes: ["The parish asks sightseeing visitors to call or email ahead; do not rely on historic self-guided-tour schedules."],
    sources: [
      { label: "Sacred Heart official visit guidance", url: "https://shpalestine.org/visit" },
      { label: "Portal to Texas History interior photograph", url: "https://texashistory.unt.edu/ark:/67531/metapth26520/" },
      { label: "Buie Harwood and Anna Brightman archive finding aid", url: "https://txarchives.org/utaaa/finding_aids/00136.xml" },
    ],
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    quickAnswer: "St. Stanislaus at Bandera is an 1876 native-limestone church founded by Silesian Polish immigrants and recognized as a Recorded Texas Historic Landmark. Its current painted interior is especially valuable because the parish itself documents who painted the modern program, what the scenes depict and when the work was completed.",
    foundedYear: 1855,
    builtYear: 1876,
    architecture: "Native-limestone historic Catholic church with later Gothic detailing",
    heritage: "Silesian Polish Catholic settlement in Bandera",
    facts: [
      { label: "Present church", value: "1876" },
      { label: "Steeple completed", value: "1906" },
      { label: "Modern painted campaign", value: "Completed during the 2003–2008 interior renovation" },
      { label: "State designation", value: "Recorded Texas Historic Landmark" },
    ],
    history: [{ heading: "One of Texas's earliest Polish Catholic communities", paragraphs: ["The parish traces its origins to Silesian Polish immigrants who arrived in Bandera in 1855 under the broader migration associated with Father Leopold Moczygemba. The present native-limestone church dates to 1876, with later additions including the steeple and stained glass."] }],
    paintings: [{ heading: "A church with unusually well-documented modern iconography", paragraphs: ["The parish credits Fr. Antoni Polaniak with designing and painting the ceiling, including symbols of the four evangelists. Cezary and Eva Sienkiel painted wall and sanctuary scenes, including the Coronation of the Blessed Mother, episodes from St. Stanislaus's life, the Ten Commandments and choir-loft angels. Tomek Tederko painted Christ welcoming visitors at the entrance."] }],
    preservation: [{ heading: "Historic fabric plus a living decorative campaign", paragraphs: ["The church's painted identity is not frozen in the nineteenth century. The parish documents major interior renewal completed in 2008, making Bandera useful for explaining how the Painted Churches tradition can continue through later devotional art rather than only survive as original immigrant-era paint."] }],
    visitorNotes: ["Check the active parish schedule before visiting."],
    sources: [
      { label: "St. Stanislaus official church history", url: "https://www.ststanislausbandera.com/history-of-the-church.html" },
      { label: "Texas Historical Commission RTHL record", url: "https://atlas.thc.texas.gov/Details/5019005081" },
    ],
  },
];

export function paintedChurchAdditionProfileBySlug(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}
