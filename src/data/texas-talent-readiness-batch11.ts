import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH11: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "megan-thee-stallion": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/news/megan-thee-stallion-2021-grammys/",
        "https://www.grammy.com/news/megan-thee-stallion-wins-best-new-artist-2021-grammy-awards-show/",
        "https://www.tsu.edu/about/",
        "https://www.biography.com/musicians/megan-thee-stallion",
      ],
      note: "Biography.com records Megan Pete's San Antonio birth and Houston South Park upbringing. The Recording Academy independently documents her Houston rap development, Prairie View-era freestyles, major releases and 2021 Grammy wins. Texas Southern University lists Megan Thee Stallion among its notable alumni. The profile keeps the Texas story centered on San Antonio origin, Houston upbringing and the Texas university path rather than generic celebrity biography.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Megan Thee Stallion 2019.jpg"),
        alt: "Megan Thee Stallion in a 2019 interview still",
        credit: "HOTSPOTATL / YouTube / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Megan_Thee_Stallion_2019.jpg",
        licenseLabel: "CC BY 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
        rightsNote: "Wikimedia Commons records this 2019 still as Creative Commons Attribution 3.0 and documents that the source video's license was reviewed while the Creative Commons grant was active. Attribution, a license link and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Bexar County", href: "/county/bexar", kind: "county" },
        { label: "Harris County", href: "/county/harris", kind: "county" },
        { label: "Waller County", href: "/county/waller", kind: "county" },
      ],
      note: "San Antonio, Houston and Prairie View geography is anchored through county-authority pages. Houston city, Prairie View, Texas Southern University and Houston hip-hop/topic routes still require route-level verification before launch.",
    },
    launchStatus: "editorial-review",
  },
};
