import type {
  PaintedChurchResearchDossier,
  PaintedChurchResearchSection,
  PaintedChurchResearchSource,
} from "./painted-church-research";

type TshaEnrichment = {
  communityContext: PaintedChurchResearchSection;
  source: PaintedChurchResearchSource;
  recordNotes?: string[];
};

const source = (label: string, url: string, use: string): PaintedChurchResearchSource => ({
  label,
  url,
  tier: "scholarly",
  use,
});

const enrichments: Record<string, TshaEnrichment> = {
  "high-hill-nativity-of-mary": {
    communityContext: { heading: "The settlement behind the church", paragraphs: [
      "The Handbook of Texas traces High Hill to the neighboring German settlements of Blum Hill and Oldenburg and documents an unusually dense cultural life around schools, singing societies, an orchestra and other community institutions. That context helps explain why the church became more than a rural worship space: it was the durable focal point of a community that invested heavily in preserving German-language and Central European traditions.",
    ]},
    source: source("Handbook of Texas — High Hill", "https://www.tshaonline.org/handbook/entries/high-hill-tx", "Blum Hill and Oldenburg settlement roots, schools, music societies and community history"),
  },
  "ammannsville-st-john-the-baptist": {
    communityContext: { heading: "Andrew Ammann, the school and the first parish institutions", paragraphs: [
      "The Handbook of Texas adds an earlier civic layer to Ammannsville's church story: German and Czech immigrant farmers settled the area in the 1870s, and first settler Andrew Ammann was both a farmer and a noted architect. A Catholic church and school opened in 1890 under Father Jules Vrana, tying parish formation directly to education before the later storm and fire cycles that produced the present building.",
    ]},
    source: source("Handbook of Texas — Ammannsville", "https://www.tshaonline.org/handbook/entries/ammannsville-tx", "Andrew Ammann, German and Czech settlement, 1890 Catholic church and school, and Father Jules Vrana"),
  },
  "dubina-saints-cyril-methodius": {
    communityContext: { heading: "A gateway settlement with organized Czech Catholic life", paragraphs: [
      "The Handbook of Texas describes Dubina as the first Czech settlement in Texas and a stopover for later Czech immigrants entering the state. By 1900 the church served more than 600 families, while a Czech Catholic Union lodge, St. Ann's Society and a Czech-Roman Catholic women's aid society anchored an organized social world around the parish. Those institutions make the painted church easier to read as the center of a much larger immigrant network rather than an isolated architectural landmark.",
    ]},
    source: source("Handbook of Texas — Dubina", "https://www.tshaonline.org/handbook/entries/dubina-tx", "Czech migration gateway, parish scale and Catholic social organizations"),
  },
  "praha-st-marys-assumption": {
    communityContext: { heading: "The Assumption feast as living community continuity", paragraphs: [
      "The Handbook of Texas records an annual Feast of the Assumption celebration in Praha dating to 1855. It also documents the Czech Catholic school established in 1896 and the way the August 15 celebration continued to draw thousands of visitors for Mass, Czech food and Czech music. That continuity makes St. Mary's not only a preserved painted interior but the center of a recurring cultural practice spanning generations.",
    ]},
    source: source("Handbook of Texas — Praha", "https://www.tshaonline.org/handbook/entries/praha-tx", "Feast of the Assumption tradition, Czech Catholic school and community continuity"),
  },
  "moravia-ascension-of-our-lord": {
    communityContext: { heading: "Language, schooling and a source-level attribution conflict", paragraphs: [
      "The Handbook of Texas documents a community in which a Moravian dialect was once taught in school and still survived in prayers and hymns into the late twentieth century. It also attributes the church design to first pastor Emil Schindler, construction to Koch and Sons, and interior work to Ponecker and Sons. That attribution does not line up perfectly with every historic-register description, so Texas Defined preserves the disagreement rather than silently forcing the sources into one version.",
    ]},
    recordNotes: [
      "TSHA attributes the 1912 church design to Emil Schindler, construction to Koch and Sons, and interior work to Ponecker and Sons; other historic documentation uses different architect/interior-worker wording. Preserve the source conflict unless stronger primary records resolve it.",
    ],
    source: source("Handbook of Texas — Moravia", "https://www.tshaonline.org/handbook/entries/moravia-tx", "Moravian-language continuity, schooling, church design/build attribution and interior-work attribution"),
  },
  "serbin-st-paul-lutheran-church": {
    communityContext: { heading: "Ninety-five acres set aside for church and school", paragraphs: [
      "The Handbook of Texas records that the Wendish colony purchased about 4,000 acres in the Serbin area and that the Kilian Lutheran congregation acquired ninety-five acres specifically for a church and school. That land allocation shows how early the congregation treated worship and education as permanent settlement infrastructure, strengthening the connection between St. Paul's unusual interior and the community institutions created by the 1854 immigrant colony.",
    ]},
    source: source("Handbook of Texas — Serbin", "https://www.tshaonline.org/handbook/entries/serbin-tx", "1854 Wendish colony, land acquisition and ninety-five-acre church-and-school tract"),
  },
  "umbarger-st-marys-catholic-church": {
    communityContext: { heading: "A Panhandle parish with a direct Schulenburg connection", paragraphs: [
      "The Handbook of Texas adds a striking migration link between two Painted Churches regions: Pius Friemel helped pioneer Umbarger's German Catholic community in 1902 after bringing his family and several neighbors from the Schulenburg area. The Panhandle church therefore belongs to the same broader chain of German Catholic movement and parish building that shaped communities much farther south.",
    ]},
    source: source("Handbook of Texas — Umbarger", "https://www.tshaonline.org/handbook/entries/umbarger-tx", "Pius Friemel and the 1902 migration of German Catholic families from the Schulenburg area"),
  },
  "lindsay-st-peters-catholic-church": {
    communityContext: { heading: "A planned German Catholic colony before the painted church", paragraphs: [
      "The Handbook of Texas places St. Peter's within a deliberately promoted German Catholic colony organized by Anton and August Flusche. The community dates its founding to the first Mass on March 25, 1892, and nearly eight acres were donated for a church, school and cemetery. Benedictines from Subiaco assumed parish duties in 1899; a 1903 brick church was destroyed by the May 31, 1917 tornado, and the replacement was dedicated October 12, 1919.",
    ]},
    source: source("Handbook of Texas — Lindsay", "https://www.tshaonline.org/handbook/entries/lindsay-tx", "German Catholic colony planning, first Mass, church-school-cemetery land, Benedictines and tornado chronology"),
  },
  "sweet-home-queen-of-peace": {
    communityContext: { heading: "Immigration and the railroad reshaped Sweet Home", paragraphs: [
      "The Handbook of Texas dates significant Czech and German migration into Sweet Home to about 1873. When the San Antonio and Aransas Pass Railway built south of the original settlement in 1887, businesses and residents shifted toward the tracks. The painted church's immigrant identity therefore sits within a community whose geography was itself remade by late-nineteenth-century transportation.",
    ]},
    source: source("Handbook of Texas — Sweet Home", "https://www.tshaonline.org/handbook/entries/sweet-home-tx-lavaca-county", "Czech and German migration and the 1887 railroad-driven relocation of the community"),
  },
  "panna-maria-immaculate-conception": {
    communityContext: { heading: "A modern Polish national-memory layer inside the church", paragraphs: [
      "The Handbook of Texas documents a major 1966 commemoration of a millennium of Polish Christianity and nationhood that drew about 10,000 people to Panna Maria. President Lyndon B. Johnson's gift for the occasion was a 12,000-piece mosaic of the Virgin of Czestochowa by Polish artist Jan E. Krantz, placed on permanent display in the church. The mosaic adds a twentieth-century national-memory layer to a parish already central to Polish-American settlement history.",
    ]},
    source: source("Handbook of Texas — Panna Maria", "https://www.tshaonline.org/handbook/entries/panna-maria-tx", "1966 Polish millennium gathering and Jan E. Krantz Virgin of Czestochowa mosaic"),
  },
  "wesley-brethren-church": {
    communityContext: { heading: "Texas Czech education and Protestant organization began here", paragraphs: [
      "The Handbook of Texas records that Josef Masik founded the first Czech school in Texas at Veseli in 1859 and that the first Czech Protestant and Moravian Brethren congregation in North America was organized there in 1864. It also dates Pastor Bohuslav Emil Lacjak's painted interior designs to 1889. Together those facts place the church at the intersection of Texas Czech education, Protestant institution-building and decorative art.",
    ]},
    source: source("Handbook of Texas — Wesley", "https://www.tshaonline.org/handbook/entries/wesley-tx", "first Czech school in Texas, early Czech Protestant congregation and Lacjak's 1889 interior painting"),
  },
  "wallis-guardian-angel": {
    communityContext: { heading: "Railroads preceded the Czech Catholic community", paragraphs: [
      "The Handbook of Texas shows that Wallis developed around competing rail lines before Czech immigration accelerated around 1890. That chronology adds useful context to Guardian Angel: the parish's Czech identity formed in a transportation-linked town whose rail connections helped create the settlement conditions in which the later church community grew.",
    ]},
    source: source("Handbook of Texas — Wallis", "https://www.tshaonline.org/handbook/entries/wallis-tx", "railroad development and Czech immigration beginning around 1890"),
  },
  "fredericksburg-st-marys-catholic-church": {
    communityContext: { heading: "From shared town church to a distinct Catholic landmark", paragraphs: [
      "The Handbook of Texas documents an early Fredericksburg period when Catholics, Lutherans, Methodists and other congregations shared the Vereins-Kirche. Catholics built their own church in 1848, then replaced it in 1860 with the Marienkirche now known as Old St. Mary's. That sequence clarifies why the later painted St. Mary's belongs to a longer story of German community institutions becoming increasingly denominational and architecturally distinct.",
    ]},
    source: source("Handbook of Texas — Fredericksburg", "https://www.tshaonline.org/handbook/entries/fredericksburg-tx", "shared Vereins-Kirche worship, 1848 Catholic church and 1860 Marienkirche lineage"),
  },
  "shiner-saints-cyril-methodius": {
    communityContext: { heading: "Czech identity extended beyond the parish", paragraphs: [
      "The Handbook of Texas describes Czech and German immigrants as Shiner's dominant ethnic groups and identifies organizations such as the National Sokol Society and the Slavonic Benevolent Order of the State of Texas as part of a cohesive Czech community. The church's Slavic patronage and interior program therefore sit inside a wider network of social, cultural and mutual-aid institutions rather than representing Czech identity by themselves.",
    ]},
    source: source("Handbook of Texas — Shiner", "https://www.tshaonline.org/handbook/entries/shiner-tx", "Czech and German settlement plus Sokol and SPJST community institutions"),
  },
  "castroville-st-louis-catholic-church": {
    communityContext: { heading: "Catholic Alsatian settlement came before the landmark church", paragraphs: [
      "The Handbook of Texas describes Castroville as Texas's 'little Alsace' and traces its founding to mostly Catholic Alsatian farming families brought to the region under Henri Castro's colonization effort. That settlement history gives St. Louis a more precise cultural setting: its architecture and painted interior developed within a town intentionally established by an Alsatian Catholic immigrant community.",
    ]},
    source: source("Handbook of Texas — Castroville", "https://www.tshaonline.org/handbook/entries/castroville-tx", "founding by mostly Catholic Alsatian farming families and the town's Alsatian identity"),
  },
};

export const tshaPaintedChurchEnrichmentSlugs = Object.freeze(Object.keys(enrichments));

export function enrichPaintedChurchResearchWithTsha(
  dossier: PaintedChurchResearchDossier | undefined,
): PaintedChurchResearchDossier | undefined {
  if (!dossier) return undefined;
  const enrichment = enrichments[dossier.slug];
  if (!enrichment) return dossier;
  const sourceAlreadyPresent = dossier.sources.some((existing) => existing.url === enrichment.source.url);

  return {
    ...dossier,
    communityContext: [...dossier.communityContext, enrichment.communityContext],
    recordNotes: [...(dossier.recordNotes ?? []), ...(enrichment.recordNotes ?? [])],
    sources: sourceAlreadyPresent ? dossier.sources : [...dossier.sources, enrichment.source],
  };
}
