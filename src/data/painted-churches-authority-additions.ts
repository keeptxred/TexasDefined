import type { PaintedChurch } from "./painted-churches";

export type PaintedChurchAuthorityAddition = {
  church: PaintedChurch;
  interiorIntegrity: "largely-original" | "restored-original-scheme" | "reconstructed-from-evidence" | "extensively-repainted" | "modern-decorative-campaign" | "uncertain";
  culturalHeritage: string[];
  techniques: Array<"stenciling" | "infill" | "freehand" | "marbling" | "graining" | "pouncing" | "gilding-metallic-accents" | "trompe-loeil-architectural-illusion" | "canvas-applied-decoration" | "decorative-murals">;
};

export const paintedChurchAuthorityAdditions: PaintedChurchAuthorityAddition[] = [
  {
    church: {
      slug: "palestine-first-presbyterian-church",
      name: "First Presbyterian Church",
      shortName: "First Presbyterian at Palestine",
      city: "Palestine",
      county: "Anderson",
      address: "410 Avenue A, Palestine, TX 75801",
      denomination: "Presbyterian Church (U.S.A.)",
      summary: "An 1888 Gothic Revival sanctuary whose hand-painted ceiling, leaded stained glass and Tiffany memorial windows are documented by the Palestine Historic Resources Survey and preserved within an active congregation.",
      significance: "Primary historic-survey records state that an itinerant German craftsman hand-painted the sanctuary ceiling and that it had not been retouched when documented in the 1989–1991 Palestine survey. The same records document leaded stained glass and Tiffany memorial windows; THC records the property as a Recorded Texas Historic Landmark, and PC(USA) confirms the congregation remains active at the exact historic address.",
      visitNote: "First Presbyterian remains an active congregation. Verify current worship and visitor access with the church before making a special sightseeing trip; the historic survey documents the painted ceiling but does not establish a present-day touring schedule.",
      sourceUrl: "https://texashistory.unt.edu/ark:/67531/metapth25684/",
      secondarySourceUrl: "https://pcusa.org/congregation/first-church-palestine-tx",
      sourceCheckedAt: "2026-08-20",
      recordedTexasHistoricLandmark: true,
    },
    interiorIntegrity: "uncertain",
    culturalHeritage: ["East Texas Presbyterian", "German decorative craftsman contribution"],
    techniques: ["freehand"],
  },
  {
    church: {
      slug: "houston-annunciation-catholic-church",
      name: "Church of the Annunciation",
      shortName: "Annunciation at Houston",
      city: "Houston",
      county: "Harris",
      address: "1618 Texas Ave, Houston, TX 77003",
      denomination: "Roman Catholic",
      summary: "Houston's historic Annunciation Catholic Church combines a nineteenth-century Romanesque Revival building with stained glass, frescoed interior decoration and a sanctuary dome documented with a replica of Raphael's Transfiguration.",
      significance: "Annunciation is individually listed in the National Register and remains an active downtown Houston parish. The Handbook of Texas documents the historic sanctuary expansion and the Transfiguration image inside the dome, while Houston historic-preservation sources describe surviving stained glass and frescoes. Buie Harwood's archive independently includes Annunciation in church-specific decorative-painting research.",
      visitNote: "Annunciation is an active parish that publishes current visitor, parking and worship information. Liturgies and parish events take priority; use the official Plan Your Visit page before traveling specifically to study the historic interior.",
      sourceUrl: "https://annunciationcc.org/about",
      secondarySourceUrl: "https://annunciationcc.org/visit",
      sourceCheckedAt: "2026-08-20",
      nationalRegister: { referenceNumber: "75001988", listed: "November 3, 1975", multipleProperty: false },
      recordedTexasHistoricLandmark: true,
    },
    interiorIntegrity: "uncertain",
    culturalHeritage: ["Houston Catholic", "Gulf Coast immigrant and civic heritage"],
    techniques: ["decorative-murals"],
  },
];
