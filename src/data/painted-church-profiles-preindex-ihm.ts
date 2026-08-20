import type { PaintedChurchProfile } from "./painted-church-profiles";

const profile: PaintedChurchProfile = {
  slug: "san-antonio-immaculate-heart-of-mary",
  quickAnswer: "Immaculate Heart of Mary in San Antonio is a 1912 Byzantine Romanesque Claretian church whose famous patterned walls are a documented historical and preservation sequence rather than one untouched campaign: a Mexican artist identified in the Claretian archives as Bartola executed the original stencil decoration in 1944; Fr. Alberto Domingo led a major restoration beginning in the 1980s; a 1991 arson fire destroyed part of the work; and the renewed restoration was completed in 1994.",
  foundedYear: 1912,
  builtYear: 1912,
  paintedYear: 1944,
  architecture: "Byzantine Romanesque",
  architect: "Leo M. J. Dielmann",
  artists: ["Bartola — fuller identity unresolved", "Fr. Alberto Domingo, C.M.F. — restoration campaign"],
  heritage: "Hispanic Catholic and Claretian Missionary community with a documented Mexican artistic contribution",
  facts: [
    { label: "Church blessed", value: "August 11, 1912" },
    { label: "Architect", value: "Leo M. J. Dielmann, documented by the Claretian Missionaries Archives" },
    { label: "Architecture", value: "Byzantine Romanesque" },
    { label: "Original decorative campaign", value: "January–May 1944" },
    { label: "Original painter", value: "A Mexican artist from Los Angeles identified in the parish chronicle as Bartola; fuller identity remains unresolved" },
    { label: "Original method", value: "Stencil patterns used to decorate the church walls" },
    { label: "Major restorer", value: "Fr. Alberto Domingo, C.M.F., who began restoring the ornate interior in the 1980s" },
    { label: "1991 fire", value: "Arson damaged the sacristy and a large portion of the painted walls then under restoration" },
    { label: "Post-fire work", value: "Visible patterns were repainted by hand and destroyed patterns reconstructed by a local restoration specialist" },
    { label: "Restoration completed", value: "1994" },
    { label: "Current city designation", value: "The parish identifies the building as a City of San Antonio Historic Exceptional Landmark" },
  ],
  history: [
    {
      heading: "A Claretian landmark near downtown San Antonio",
      paragraphs: [
        "Claretian missionaries arrived in San Antonio from Mexico in 1902. Permission to establish Immaculate Heart of Mary parish followed in 1909; construction began in 1911, and the church was blessed on August 11, 1912.",
        "The Claretian Missionaries Archives identifies Leo M. J. Dielmann with the 1912 church. The parish describes the building as Byzantine Romanesque and emphasizes its continuing Hispanic cultural identity, stained glass, historic statues and painted walls.",
      ],
    },
  ],
  paintings: [
    {
      heading: "The 1944 Bartola stencil campaign",
      paragraphs: [
        "The Claretian archives recovered the original decorative chronology from the parish chronicle. A Mexican artist from Los Angeles identified only as Bartola was contracted in January 1944 to decorate the interior. Using stencils to build the intricate wall patterns, he completed the work in May 1944.",
        "That archival discovery matters because the current parish history highlights Fr. Alberto Domingo's later hand-painted restoration work. Texas Defined preserves both layers: Bartola as the original documented 1944 decorator and Domingo as a later restorer and artistic interpreter rather than silently merging the two campaigns.",
      ],
    },
  ],
  preservation: [
    {
      heading: "Domingo restoration, arson and reconstruction",
      paragraphs: [
        "Fr. Alberto Domingo, C.M.F., who had studied art in Spain, undertook a major restoration of the darkened walls and ceiling during the 1980s. After his 1989 transfer, laborers continued the project.",
        "An arson fire on June 30, 1991 damaged the sacristy and destroyed a substantial portion of the painted walls under restoration. Where patterns remained visible beneath soot, workers restored them by hand; where fire had obliterated the design, a local restoration specialist reconstructed the patterns. The work was completed in 1994.",
        "Because the present interior contains original-pattern evidence, restoration and reconstructed post-fire areas, Texas Defined classifies the church as a restored original scheme rather than untouched original paint.",
      ],
    },
  ],
  visitorNotes: [
    "The official parish currently says visitors are welcome during regular business hours.",
    "Published hours are subject to change for meetings, holidays, feast days and special events; worship and parish activity take priority over sightseeing.",
  ],
  sources: [
    { label: "Immaculate Heart of Mary — official parish history", url: "https://ihmsatx.org/our-history-1" },
    { label: "Claretian Missionaries Archives — A Work of Heart", url: "https://claretianmissionariesarchives.org/a-work-of-heart-a-history-of-the-painted-walls-of-immaculate-heart-of-mary-church/" },
    { label: "Immaculate Heart of Mary — official visitor/contact information", url: "https://ihmsatx.org/contact-us" },
  ],
};

export function immaculateHeartOfMaryPaintedChurchProfileBySlug(slug: string) {
  return slug === profile.slug ? profile : undefined;
}
