export type PaintedChurchPreservationTopic = {
  slug: string;
  name: string;
  answer: string;
  principles: string[];
  churchSlugs: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const paintedChurchPreservationTopics: PaintedChurchPreservationTopic[] = [
  {
    slug: "whitewashing-and-recovery",
    name: "Whitewashing and Recovery",
    answer: "Some Texas Painted Church interiors were covered rather than destroyed. Dubina is the clearest example: the earlier decorative work was whitewashed in the 1950s, then surviving traces and recovered stencils helped guide a community restoration in the 1980s.",
    principles: ["Covered paint may survive beneath later finishes.", "Recovery should be distinguished from untouched original survival.", "Surviving traces, photographs and stencils can provide evidence for restoration."],
    churchSlugs: ["dubina-saints-cyril-methodius"],
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
  },
  {
    slug: "reconstruction-from-stencils",
    name: "Reconstruction from Surviving Stencils",
    answer: "Reconstruction from surviving stencils uses physical evidence from an earlier decorative scheme to recreate lost or obscured patterns. At Dubina, recovered stencils and visible traces informed the restored interior, while participants acknowledged some artistic license where evidence was incomplete.",
    principles: ["Reconstruction is not identical to untouched original paint.", "Recovered templates can provide unusually strong evidence for pattern and placement.", "Uncertain areas should be disclosed rather than presented as fully original."],
    churchSlugs: ["dubina-saints-cyril-methodius", "plantersville-st-marys-catholic-church"],
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
  },
  {
    slug: "repainting-vs-restoration",
    name: "Repainting vs. Restoration",
    answer: "Repainting introduces new or substantially renewed decorative work; restoration aims to recover, stabilize or interpret an earlier scheme. Texas Painted Churches include both, so Texas Defined labels them separately instead of treating all colorful interiors as equally original.",
    principles: ["A repaint can be historically important without being original.", "Restoration may include retouching, stabilization or reconstruction.", "Modern devotional campaigns should be dated and credited independently from historic paint."],
    churchSlugs: ["plantersville-st-marys-catholic-church", "bandera-st-stanislaus-catholic-church", "fredericksburg-st-marys-catholic-church", "shiner-saints-cyril-methodius"],
    sourceLabel: "Texas Defined Painted Churches methodology",
    sourceUrl: "https://texasdefined.com/explore/painted-churches/methodology",
  },
  {
    slug: "preserving-original-programs",
    name: "Preserving Original Decorative Programs",
    answer: "Some interiors retain unusually large portions of their historic decorative programs. Moravia is especially valuable because Austin PBS describes its Donecker-family interior as comparatively little altered; Wesley preserves an unfinished 1889 program left incomplete after Rev. Bohuslav Laciak's death.",
    principles: ["Integrity includes survival of historic paint, not merely survival of the building.", "An unfinished program can be historically significant because it preserves process evidence.", "Later cleaning or stabilization should not automatically be equated with repainting."],
    churchSlugs: ["moravia-ascension-of-our-lord", "wesley-brethren-church"],
    sourceLabel: "Austin PBS — Painted Churches profiles and updates",
    sourceUrl: "https://austinpbs.org/paintedchurches/filmupdates",
  },
  {
    slug: "disaster-rebuilding-and-continuity",
    name: "Disaster, Rebuilding and Decorative Continuity",
    answer: "Storms, fires and lightning repeatedly reshaped Texas Painted Church history. Ammannsville, Plantersville, Panna Maria and other communities rebuilt after destructive events, often carrying parish identity and decorative ambition into a new building rather than preserving one uninterrupted structure.",
    principles: ["Building continuity and congregation continuity are different historical questions.", "A replacement church can preserve community identity while changing architecture and decoration.", "Disaster dates should be kept separate from construction and painting dates."],
    churchSlugs: ["ammannsville-st-john-the-baptist", "plantersville-st-marys-catholic-church", "panna-maria-immaculate-conception", "dubina-saints-cyril-methodius"],
    sourceLabel: "Texas Painted Churches church-specific primary and parish records",
    sourceUrl: "https://texasdefined.com/explore/painted-churches",
  },
];

export const paintedChurchPreservationBySlug = new Map(paintedChurchPreservationTopics.map((topic) => [topic.slug, topic]));
