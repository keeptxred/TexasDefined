import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH5: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "t-bone-walker": {
    sourceReview: { status: "reviewed", reviewedAt, verifiedSources: ["https://www.tshaonline.org/handbook/entries/walker-aaron-thibeaux-t-bone", "https://www.rockhall.com/inductees/t-bone-walker"], note: "Handbook of Texas and Rock & Roll Hall of Fame material were rechecked for Linden birth, Dallas/Deep Ellum upbringing, Blind Lemon Jefferson influence and Walker's foundational role in electric blues guitar." },
    imageReview: { status: "verified", reviewedAt, heroImage: { src: commonsRedirect("T-Bone Walker 1972.jpg"), alt: "T-Bone Walker performing in 1972", credit: "Heinrich Klaffs", sourceUrl: "https://commons.wikimedia.org/wiki/File:T-Bone_Walker_1972.jpg", licenseLabel: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations." } },
    internalLinkReview: { status: "partial", links: [{ label: "Cass County", href: "/county/cass", kind: "county" }, { label: "Dallas County", href: "/county/dallas", kind: "county" }], note: "Linden and Dallas geography is connected at the county-authority level. Deep Ellum and Texas-blues topical links remain to be verified." },
    launchStatus: "editorial-review",
  },
  "jamie-foxx": {
    sourceReview: { status: "reviewed", reviewedAt, verifiedSources: ["https://www.terrelltexas.com/58738-2-copy/", "https://www.oscars.org/oscars/ceremonies/2005"], note: "Terrell's official visitor/chamber source was rechecked for Eric Bishop's 1967 Terrell birth, upbringing and local schooling, while the Academy record verifies the 2005 Best Actor win for Ray and supporting nomination for Collateral." },
    imageReview: { status: "verified", reviewedAt, heroImage: { src: commonsRedirect("Jamie Foxx.jpg"), alt: "Jamie Foxx during a U.S. Navy visit", credit: "U.S. Navy / Photographer's Mate 2nd Class LaQuisha S.", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jamie_Foxx.jpg", licenseLabel: "Public domain — U.S. Navy", rightsNote: "Wikimedia Commons identifies the photograph as a work of a U.S. Navy sailor made as part of official duties and therefore public domain in the United States under federal-government work rules." } },
    internalLinkReview: { status: "partial", links: [{ label: "Kaufman County", href: "/county/kaufman", kind: "county" }], note: "Terrell geography is connected through the Kaufman County authority page. Terrell city and Texas-film/performance topical links remain to be verified." },
    launchStatus: "editorial-review",
  },
  "woody-harrelson": {
    sourceReview: { status: "reviewed", reviewedAt, verifiedSources: ["https://www.televisionacademy.com/bios/woody-harrelson"], note: "The Television Academy biography was rechecked for Midland birthplace and major television/film milestones, providing an authoritative baseline for the profile's concise West Texas origin claim." },
    imageReview: { status: "verified", reviewedAt, heroImage: { src: commonsRedirect("Woody Harrelson 2005.jpg"), alt: "Woody Harrelson photographed in 2005", credit: "Tony Shek", sourceUrl: "https://commons.wikimedia.org/wiki/File:Woody_Harrelson_2005.jpg", licenseLabel: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0. Attribution and an indication of modifications are required." } },
    internalLinkReview: { status: "partial", links: [{ label: "Midland County", href: "/county/midland", kind: "county" }], note: "Midland geography is connected at the county-authority level. Midland city and Texas-film topical links remain to be verified." },
    launchStatus: "editorial-review",
  },
  "tommy-lee-jones": {
    sourceReview: { status: "reviewed", reviewedAt, verifiedSources: ["https://www.biography.com/actors/tommy-lee-jones", "https://www.oscars.org/oscars/ceremonies/1994"], note: "A&E's Biography record was rechecked for San Saba birth, Midland and Dallas upbringing and enduring Texas ranch connection, while the Academy record verifies his Best Supporting Actor win for The Fugitive." },
    imageReview: { status: "verified", reviewedAt, heroImage: { src: commonsRedirect("Tommy Lee Jones 2017.jpg"), alt: "Tommy Lee Jones photographed in 2017", credit: "Dick Thomas Johnson", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tommy_Lee_Jones_2017.jpg", licenseLabel: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0. Attribution and an indication of modifications are required." } },
    internalLinkReview: { status: "partial", links: [{ label: "San Saba County", href: "/county/san-saba", kind: "county" }, { label: "Midland County", href: "/county/midland", kind: "county" }, { label: "Dallas County", href: "/county/dallas", kind: "county" }], note: "San Saba, Midland and Dallas geography is connected at the county-authority level. The profile's listed San Antonio connection still needs specific source and route verification before it becomes a live internal link." },
    launchStatus: "editorial-review",
  },
  "wes-anderson": {
    sourceReview: { status: "reviewed", reviewedAt, verifiedSources: ["https://rtf.utexas.edu/about/notable-alumni", "https://www.biography.com/movies-tv/wes-anderson"], note: "UT Austin's Radio-Television-Film alumni record and A&E's Biography profile were rechecked for Houston birth/upbringing and UT Austin attendance, supporting the Texas origin of Anderson's filmmaking career and early collaborations." },
    imageReview: { status: "verified", reviewedAt, heroImage: { src: commonsRedirect("Wes Anderson.JPG"), alt: "Filmmaker Wes Anderson", credit: "Popperipopp", sourceUrl: "https://commons.wikimedia.org/wiki/File:Wes_Anderson.JPG", licenseLabel: "Public domain — dedicated by copyright holder", rightsNote: "Wikimedia Commons records that the copyright holder released the photograph into the public domain worldwide, allowing reuse without copyright restrictions while retaining source provenance in the editorial record." } },
    internalLinkReview: { status: "partial", links: [{ label: "Harris County", href: "/county/harris", kind: "county" }, { label: "Travis County", href: "/county/travis", kind: "county" }], note: "Houston and Austin geography is connected at the county-authority level. City, UT Austin and Texas-film topical links remain to be verified." },
    launchStatus: "editorial-review",
  },
};
