import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH9: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "tom-lea": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://americanart.si.edu/artist/tom-lea-27711",
        "https://www.tomlea.com/biography",
      ],
      note: "Smithsonian American Art Museum records Lea's 1907 El Paso birth, El Paso upbringing, 1936 return and later El Paso-centered career. The Tom Lea Institute independently documents the same El Paso origin and lifelong borderlands connection. The draft's core Texas claims are well supported.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Tom Lea 1938 cropped.jpg"),
        alt: "Tom Lea at the United States Court House in El Paso in 1938",
        credit: "Photographer not credited / U.S. Department of the Treasury / National Archives",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Tom_Lea_1938_cropped.jpg",
        licenseLabel: "Public domain — U.S. Department of the Treasury",
        rightsNote: "Wikimedia Commons identifies the 1938 National Archives image as a U.S. Department of the Treasury work made as part of an employee's official duties, public domain in the United States. NARA identifier 70170352; local identifier 121-CMS-5A-66.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "El Paso County", href: "/county/el-paso", kind: "county" }],
      note: "El Paso is connected through the El Paso County authority page. El Paso city, borderlands, Texas art and Texas-history topical routes remain to be verified before launch.",
    },
    launchStatus: "editorial-review",
  },
  "julian-onderdonk": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.tshaonline.org/handbook/entries/onderdonk-julian"],
      note: "The Handbook of Texas verifies Onderdonk's 1882 San Antonio birth, 1909 return to San Antonio, Bexar County hill-country painting practice, bluebonnet landscapes and 1922 death in San Antonio. This directly supports the draft's San Antonio/Hill Country framing.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Julian Onderdonk - Self-portrait (c.1902).jpg"),
        alt: "Julian Onderdonk self-portrait, circa 1902",
        credit: "Julian Onderdonk / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Julian_Onderdonk_-_Self-portrait_(c.1902).jpg",
        licenseLabel: "Public domain",
        rightsNote: "Wikimedia Commons identifies the circa-1902 self-portrait as a faithful reproduction of a two-dimensional public-domain work. Onderdonk died in 1922, and the work is public domain in the United States because it was published or registered before 1931.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Bexar County", href: "/county/bexar", kind: "county" }],
      note: "San Antonio geography is connected through the Bexar County authority page. San Antonio city, Hill Country, wildflower and Texas-art topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "carol-burnett": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.televisionacademy.com/bios/carol-burnett",
        "https://www.pbs.org/wnet/americanmasters/carol-burnett-career-timeline/91/",
      ],
      note: "The Television Academy identifies San Antonio as Burnett's birthplace and documents her six-decade television career and The Carol Burnett Show. PBS American Masters independently records her April 26, 1933 San Antonio birth and 1940 move to Hollywood. The draft correctly treats Texas primarily as her birthplace and earliest-childhood connection rather than her career base.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Carol Burnett 1958.JPG"),
        alt: "Carol Burnett performing a comedy routine in 1958",
        credit: "Elmer Holloway / NBC publicity photograph",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Carol_Burnett_1958.JPG",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons documents the NBC publicity photograph as published in the United States in 1958 without a copyright notice, placing it in the public domain in the United States. The hosted copy has been cropped and lightly corrected; preserve source provenance.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Bexar County", href: "/county/bexar", kind: "county" }],
      note: "San Antonio geography is connected through the Bexar County authority page. San Antonio city and Texas television/comedy topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "debbie-allen": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.televisionacademy.com/bios/debbie-allen",
        "https://www.televisionacademy.com/features/emmy-magazine/articles/foundation-interviews-debbie-allen",
      ],
      note: "The Television Academy identifies Allen's birthplace as Houston and explicitly calls her a Houston native while documenting her work as performer, director, choreographer and producer. The Television Academy Foundation interview independently describes her youth in segregated Texas and her family's move from Houston to Mexico. These sources support both the Houston origin and formative arts context in the draft.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Debbie Allen.jpg"),
        alt: "Debbie Allen photographed in 2012",
        credit: "Mingle MediaTV",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Debbie_Allen.jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr-derived 2012 photograph as CC BY-SA 2.0. Attribution, a license link, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "Houston geography is connected through the Harris County authority page. Houston city and Texas dance, theater and television topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "bill-hicks": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.billhicks.com/bio.html",
        "https://www.houstonchronicle.com/explained/article/houston-standup-comedy-texas-outlaws-19823378.php",
      ],
      note: "The Hicks family biography records his 1961 Valdosta, Georgia birth, move to Houston at age seven, Memorial-area upbringing and teenage start at Houston's Comedy Workshop. Houston Chronicle's history of the city's stand-up scene independently identifies Hicks as a Georgia-born transplant and a Comedy Workshop regular in the Texas Outlaw Comics scene. The draft correctly classifies him as raised in Texas, not Texas-born.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Bill Hicks at the Laff Stop in Austin, Texas, 1991 (2).jpg"),
        alt: "Bill Hicks performing at the Laff Stop in Austin, Texas, in 1991",
        credit: "Angela Davis (Angela D.)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Bill_Hicks_at_the_Laff_Stop_in_Austin,_Texas,_1991_(2).jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and notes a trusted-user license review. Attribution, a license link and an indication of modifications are required. The photograph was taken at the Laff Stop in Austin in autumn 1991.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "Houston upbringing and career origin are connected through the Harris County authority page. Houston city, Comedy Workshop, Houston nightlife and Texas-comedy topical routes remain to be verified; the Austin performance photograph does not by itself justify adding Austin as a biographical geography link.",
    },
    launchStatus: "editorial-review",
  },
};
