import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-26";

export const TEXAS_TALENT_READINESS_BATCH12: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "miranda-lambert": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/miranda-lambert/4851/",
        "https://www.grammy.com/news/and-the-grammy-went-to-miranda-lambert/",
        "https://countrymusichalloffame.org/press/releases/miranda-lambert-backstage-access-exhibition-to-open-may-16-at-the-country-music-hall-of-fame-and-museum-2/",
      ],
      note: "The Recording Academy confirms Lambert's 1983 Longview birth, Grammy history and Pistol Annies membership. A separate Recording Academy feature documents her Lindale upbringing, 2003 Nashville Star finish and 2005 Kerosene breakthrough, while the Country Music Hall of Fame identifies Lindale as her hometown. The Texas framing is therefore supported by independent music-industry authority sources rather than generic celebrity biography.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Miranda Lambert.jpg"),
        alt: "Miranda Lambert performing with an acoustic guitar in Dallas in 2007",
        credit: "Lukelambert / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Miranda_Lambert.jpg",
        licenseLabel: "Public domain",
        rightsNote: "Wikimedia Commons records this 2007 Dallas performance photograph as the uploader's own work released into the public domain worldwide, with an unrestricted fallback grant where public-domain dedication is not legally possible.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Gregg County", href: "/county/gregg", kind: "county" },
        { label: "Smith County", href: "/county/smith", kind: "county" },
        { label: "Texas Music", href: "/texas-music", kind: "culture" },
      ],
      note: "Longview and Lindale are anchored through their county authority pages, and the new Texas Music authority hub provides a safe statewide cultural destination. Dedicated Longview, Lindale and Texas-country-history routes can be added later without blocking the current hidden profile review.",
    },
    launchStatus: "editorial-review",
  },
};
