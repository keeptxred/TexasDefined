import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH10: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "j-frank-dobie": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/dobie-james-frank",
        "https://research.hrc.utexas.edu/fasearch/findingaid.cfm?eadid=01082&showrequest=0",
      ],
      note: "The Handbook of Texas and Harry Ransom Center independently verify Dobie's 1888 birth on a Live Oak County ranch, his ranching and literary influences, his University of Texas career and his central role in preserving Texas and Southwestern folklore. Those sources support the profile's Live Oak County and Austin anchors.",
    },
    imageReview: {
      status: "pending",
      reviewedAt,
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Live Oak County", href: "/county/live-oak", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "The Live Oak County birthplace and Austin/UT career are anchored to county-authority pages. A reusable portrait with sufficiently clear publication rights, plus Austin, UT, folklore and ranching topical links, still need prelaunch verification.",
    },
    launchStatus: "editorial-review",
  },
  "horton-foote": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/foote-horton-jr",
        "https://www.pulitzer.org/winners/horton-foote",
        "https://www.arts.gov/honors/medals/horton-foote",
      ],
      note: "The Handbook of Texas verifies Foote's 1916 Wharton birth, upbringing and repeated use of Wharton as the imaginative source for his work. Pulitzer verifies the 1995 Drama prize for The Young Man from Atlanta, while the National Endowment for the Arts verifies his 2000 National Medal of Arts.",
    },
    imageReview: {
      status: "pending",
      reviewedAt,
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Wharton County", href: "/county/wharton", kind: "county" }],
      note: "Wharton is anchored to the Wharton County authority page. A clearly reusable portrait and route-verified Wharton city, Texas theater, literature and film links remain before public launch.",
    },
    launchStatus: "editorial-review",
  },
  "dorothy-hood": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://emuseum.mfah.org/people/75/dorothy-hood",
        "https://findingaids.lib.uh.edu/repositories/2/resources/404",
      ],
      note: "The Museum of Fine Arts, Houston records Hood's 1918 birth in Bryan, her Texas activity and her death in Houston. University of Houston Libraries preserves the Dorothy Hood Papers and independently establishes the depth of the archival record around her career. Together they support the Bryan and Houston profile anchors without relying on an unsourced artist biography.",
    },
    imageReview: {
      status: "pending",
      reviewedAt,
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Brazos County", href: "/county/brazos", kind: "county" },
        { label: "Harris County", href: "/county/harris", kind: "county" },
      ],
      note: "Bryan and Houston are anchored to county-authority pages. Museum collection images are not assumed reusable; a separately rights-cleared portrait plus Bryan, Houston and Texas-art topical routes still need verification.",
    },
    launchStatus: "editorial-review",
  },
  "donald-judd": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://juddfoundation.org/donald-judd/biography/",
        "https://juddfoundation.org/chronology/1965-1974/",
        "https://chinati.org/wp-content/uploads/2021/07/Finding-Aid-to-the-Donald-Judd-Records.pdf",
      ],
      note: "Judd Foundation documents Judd's first Marfa visit in 1971, property purchases beginning in 1973 and the permanent installation work that made Marfa central to his mature career. The Chinati Foundation archives independently document his biography and the institutional record of his Marfa projects. The profile correctly treats Texas as a career and place-making connection rather than a birthplace claim.",
    },
    imageReview: {
      status: "pending",
      reviewedAt,
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Presidio County", href: "/county/presidio", kind: "county" }],
      note: "Marfa geography is anchored to the Presidio County authority page. Because many Commons files depict Judd's still-copyrighted artworks rather than a freely reusable portrait, image review remains intentionally pending; Marfa, Chinati, West Texas and architecture routes also require verification.",
    },
    launchStatus: "editorial-review",
  },
  "larry-mcmurtry": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/mcmurtry-larry-jeff",
        "https://www.pulitzer.org/winners/larry-mcmurtry",
      ],
      note: "The Handbook of Texas verifies Wichita Falls as McMurtry's birthplace, followed by early childhood on the family ranch in Archer County and a move to Archer City before second grade. The server-side Texas Talent profile correction now reflects that sequence exactly; Pulitzer independently verifies Lonesome Dove as the 1986 Fiction winner.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Larry McMurtry Photo Last Picture Show 1966.png"),
        alt: "Larry McMurtry in a 1966 dust-jacket portrait",
        credit: "Unknown photographer / Dial Press dust jacket / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Larry_McMurtry_Photo_Last_Picture_Show_1966.png",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons documents the 1966 dust-jacket portrait as public domain in the United States because it was published without a valid copyright notice; the hosted scan is treated as a mechanical reproduction. Keep the determination U.S.-specific and retain provenance.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Wichita County", href: "/county/wichita", kind: "county" },
        { label: "Archer County", href: "/county/archer", kind: "county" },
      ],
      note: "Wichita Falls birthplace and Archer County/Archer City upbringing are now represented correctly and connected to county-authority pages. Archer City, Texas literature and Texas history topical routes still require verification before launch.",
    },
    launchStatus: "editorial-review",
  },
};
