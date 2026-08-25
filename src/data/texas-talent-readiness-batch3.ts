import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH3: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "ornette-coleman": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.arts.gov/honors/jazz/ornette-coleman"],
      note: "The National Endowment for the Arts Jazz Masters biography was rechecked for Fort Worth birth, early local rhythm-and-blues performance, blues roots and Coleman's role as a major jazz innovator.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Ornette Coleman.jpg"),
        alt: "Ornette Coleman performing on saxophone in 1994",
        credit: "Geert Vandepoele",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ornette_Coleman.jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Tarrant County", href: "/county/tarrant", kind: "county" }],
      note: "Fort Worth geography is connected at the county-authority level. Fort Worth city, jazz-history and Black-music topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "townes-van-zandt": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.tshaonline.org/handbook/entries/van-zandt-john-townes"],
      note: "The Handbook of Texas entry was rechecked for Fort Worth birthplace, Houston club development, songwriting influence and burial in Tarrant County.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Townes Van Zandt.jpg"),
        alt: "Townes Van Zandt performing in concert in Germany in 1995",
        credit: "Michael Schwarz / Schorle",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Townes_Van_Zandt.jpg",
        licenseLabel: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        rightsNote: "Wikimedia Commons records VRT-confirmed permission and offers several licenses, including CC BY-SA 3.0. Attribution, modification notice and share-alike terms apply when using that license.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Tarrant County", href: "/county/tarrant", kind: "county" },
        { label: "Harris County", href: "/county/harris", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "Fort Worth, Houston and Austin geography is connected at the county-authority level. City and singer-songwriter topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "lightnin-hopkins": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.tshaonline.org/handbook/entries/hopkins-sam-lightnin"],
      note: "The Handbook of Texas entry was rechecked for Centerville birth, early Texas blues influences, Houston settlement and Hopkins's prolific recording career.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Lightnin' Hopkins.jpg"),
        alt: "Lightnin' Hopkins autographing a record",
        credit: "33stradale",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Lightnin%27_Hopkins.jpg",
        licenseLabel: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        rightsNote: "Wikimedia Commons records the photograph as the uploader's own work under CC BY-SA 3.0. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Leon County", href: "/county/leon", kind: "county" },
        { label: "Harris County", href: "/county/harris", kind: "county" },
      ],
      note: "Centerville and Houston geography is connected at the county-authority level. Houston city and Texas-blues topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "lead-belly": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://folkways.si.edu/artists/lead-belly"],
      note: "Smithsonian Folkways material was rechecked for Huddie Ledbetter's Texas prison and borderlands story, signature repertoire and lasting influence on American folk music.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Leadbelly NYWT.jpg"),
        alt: "Lead Belly in a New York World-Telegram portrait",
        credit: "New York World-Telegram and the Sun Newspaper Photograph Collection / Library of Congress",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Leadbelly_NYWT.jpg",
        licenseLabel: "Public domain",
        rightsNote: "Wikimedia Commons identifies the photograph as a World-Telegram staff work from the Library of Congress collection and states that the donation instrument placed qualifying staff photographs in the public domain.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Bowie County", href: "/county/bowie", kind: "county" },
        { label: "Harrison County", href: "/county/harrison", kind: "county" },
      ],
      note: "The northeast-Texas connection is linked through Bowie and Harrison county authority pages. East Texas and folk-music topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "billy-gibbons": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://rockhall.com/inductees/zz-top/",
        "https://rockhall.com/wp-content/uploads/2024/03/ZZ_Top_2004.pdf",
      ],
      note: "Rock & Roll Hall of Fame material was rechecked for Gibbons's Moving Sidewalks roots, the 1969 formation of ZZ Top and the band's Houston/Texas blues identity.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Billy Gibbons of ZZ Top (3421104739).jpg"),
        alt: "Billy Gibbons of ZZ Top performing in Houston in 2009",
        credit: "Randall Chancellor",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Billy_Gibbons_of_ZZ_Top_(3421104739).jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "Houston geography is connected at the county-authority level. Houston city, Texas blues and Texas-rock topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
