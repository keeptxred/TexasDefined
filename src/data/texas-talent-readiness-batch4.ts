import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH4: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "don-henley": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://capitol.texas.gov/tlodocs/85R/billtext/html/HR01731F.htm",
        "https://www.thc.texas.gov/blog/caddo-lake-state-park-don-henley-and-east-texas-conservation",
      ],
      note: "Texas legislative and Texas Historical Commission sources were rechecked for Gilmer birth, Linden upbringing, North Texas education and Henley's long-running East Texas/Caddo Lake conservation connection.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Don Henley (2088057840).jpg"),
        alt: "Don Henley performing in 2007",
        credit: "Alan Light",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Don_Henley_(2088057840).jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Upshur County", href: "/county/upshur", kind: "county" },
        { label: "Cass County", href: "/county/cass", kind: "county" },
        { label: "Denton County", href: "/county/denton", kind: "county" },
        { label: "Harrison County", href: "/county/harrison", kind: "county" },
      ],
      note: "Gilmer, Linden, Denton and the Caddo Lake area now connect to county authority pages. City, lake and Texas-rock topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "kelly-clarkson": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/kelly-clarkson/20427",
        "https://www.burlesontx.com/Archive.aspx?ADID=387",
      ],
      note: "GRAMMY's official artist record confirms Fort Worth birth and career milestones, while the City of Burleson's contemporary community report documents Clarkson as one of Burleson's own during her American Idol breakthrough.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Kelly Clarkson.jpg"),
        alt: "Kelly Clarkson performing onstage",
        credit: "Philip Nelson",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Kelly_Clarkson.jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Tarrant County", href: "/county/tarrant", kind: "county" },
        { label: "Johnson County", href: "/county/johnson", kind: "county" },
      ],
      note: "Fort Worth and Burleson geography is connected at the county-authority level. City and Texas-pop topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "kacey-musgraves": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.grammy.com/artists/kacey-musgraves/18266"],
      note: "GRAMMY's official artist record was rechecked for Golden birthplace, major releases and awards, with the profile retaining East Texas context already documented in its research draft.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Kacey Musgraves - Palace Theatre St. Paul (46248441824) (cropped).jpg"),
        alt: "Kacey Musgraves performing at the Palace Theatre in St. Paul",
        credit: "Andy Witchger",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Kacey_Musgraves_-_Palace_Theatre_St._Paul_(46248441824)_(cropped).jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Wood County", href: "/county/wood", kind: "county" }],
      note: "Golden and Mineola geography is connected through the Wood County authority page. East Texas and Texas-songwriting topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "leon-bridges": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/leon-bridges/18743",
        "https://www.fortworth.com/blog/post/the-fort-worth-five/",
      ],
      note: "GRAMMY's artist record establishes Bridges's career and Atlanta birthplace, while Visit Fort Worth documents Fort Worth as the community and creative environment that shaped his sound and identity. The profile therefore remains correctly classified as a raised/career Texas connection rather than Texas-born.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Leon-Bridges (cropped again).jpg"),
        alt: "Leon Bridges performing onstage",
        credit: "Cal Quinn",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Leon-Bridges_(cropped_again).jpg",
        licenseLabel: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        rightsNote: "Wikimedia Commons records the photograph as CC BY-SA 4.0. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Tarrant County", href: "/county/tarrant", kind: "county" }],
      note: "Fort Worth geography is connected at the county-authority level. Fort Worth city, North Texas and Texas-soul topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "erykah-badu": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/erykah-badu/10475",
        "https://www.dart.org/about/news-and-events/newsreleases/newsrelease-detail/dart-announces-upcoming-partnership-to-get-movin--and-groovin--with-erykah-badu",
        "https://dallasculture.org/2025/07/music-history-across-dallas/",
      ],
      note: "GRAMMY establishes Badu's national career, while DART explicitly identifies her as a Dallas native and the City of Dallas Office of Arts and Culture places her within Dallas's music history. This provides independent support for the profile's strong Dallas cultural connection.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("ErykahBadu.jpg"),
        alt: "Erykah Badu performing onstage",
        credit: "Najmudeen",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:ErykahBadu.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Dallas County", href: "/county/dallas", kind: "county" }],
      note: "Dallas geography is connected at the county-authority level. Dallas city, Deep Ellum and Texas R&B/hip-hop topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
