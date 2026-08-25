export type TexasTalentVerifiedInternalLink = {
  label: string;
  href: string;
  kind: "county" | "city" | "culture" | "destination" | "article";
};

export type TexasTalentHeroImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  licenseLabel: string;
  licenseUrl?: string;
  rightsNote: string;
  kind?: "portrait" | "place-context";
  contextNote?: string;
};

export type TexasTalentReadinessRecord = {
  sourceReview: {
    status: "reviewed" | "pending";
    reviewedAt?: string;
    verifiedSources: readonly string[];
    note: string;
  };
  imageReview: {
    status: "verified" | "pending";
    reviewedAt?: string;
    heroImage?: TexasTalentHeroImage;
  };
  internalLinkReview: {
    status: "partial" | "verified" | "pending";
    links: readonly TexasTalentVerifiedInternalLink[];
    note: string;
  };
  launchStatus: "researching" | "editorial-review" | "launch-ready";
};

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "willie-nelson": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.countrymusichalloffame.org/hall-of-fame/willie-nelson",
        "https://www.tsl.texas.gov/ref/abouttx/musicians.html",
      ],
      note: "Core Texas-origin and outlaw-country claims were checked against the Country Music Hall of Fame and Texas State Library before image work began.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Willie Nelson.jpg"),
        alt: "Willie Nelson performing onstage in 2006",
        credit: "Dwight McCann / Chumash Casino Resort / www.DwightMcCann.com",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Willie_Nelson.jpg",
        licenseLabel: "CC BY-SA 2.5",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
        rightsNote: "Wikimedia Commons records the photograph as CC BY-SA 2.5 with attribution required. Any crop or other adaptation must retain compatible share-alike licensing and attribution.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Hill County", href: "/county/hill", kind: "county" }],
      note: "The county authority link is live. Abbott, Austin, Luck and music-history links still need route-level verification before public launch.",
    },
    launchStatus: "editorial-review",
  },
  selena: {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena"],
      note: "The Handbook of Texas entry was rechecked for birthplace, Corpus Christi career development, Tejano milestones and Texas legacy claims.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Selena Quintanilla 1987 (1).jpg"),
        alt: "Selena Quintanilla at the 1987 Tejano Music Awards",
        credit: "Unknown photographer / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Selena_Quintanilla_1987_(1).jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons documents U.S. publication in 1987 without a copyright notice and no subsequent registration within the statutory period. Treat the public-domain determination as U.S.-specific.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Nueces County", href: "/county/nueces", kind: "county" }],
      note: "The county authority link is live. Corpus Christi city, Selena Museum and Tejano-music links still need route-level verification before public launch.",
    },
    launchStatus: "editorial-review",
  },
  "buddy-holly": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/holly-buddy",
        "https://www.rockhall.com/inductees/buddy-holly",
      ],
      note: "The Handbook of Texas and Rock & Roll Hall of Fame support Holly's Lubbock upbringing, early career and foundational rock-and-roll influence.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Buddy Holly publicity portrait.jpg"),
        alt: "Buddy Holly in a publicity portrait",
        credit: "Coral Records / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Buddy_Holly_publicity_portrait.jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons records the publicity photograph as public domain in the United States. Preserve the source provenance and recheck the file page before public launch.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Lubbock County", href: "/county/lubbock", kind: "county" }],
      note: "The Lubbock County authority link is live. Lubbock city, Buddy Holly Center and Texas-rock topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  beyonce: {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/beyonce-knowles/12474",
        "https://www.britannica.com/biography/Beyonce",
      ],
      note: "The Recording Academy and Britannica were checked for Houston origins, Destiny's Child, solo-career milestones and major awards.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Beyoncé - Tottenham Hotspur Stadium - 1st June 2023 (13 of 118) (52944704018) (cropped).jpg"),
        alt: "Beyoncé performing in 2023",
        credit: "Raph_PH / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_(13_of_118)_(52944704018)_(cropped).jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the underlying Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "Harris County is linked. Houston city, Third Ward and Houston-music topical routes still need route verification.",
    },
    launchStatus: "editorial-review",
  },
  "matthew-mcconaughey": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.britannica.com/biography/Matthew-McConaughey",
        "https://moody.utexas.edu/alumni/matthew-mcconaughey",
      ],
      note: "Britannica and the University of Texas were checked for Uvalde birth, Texas upbringing, UT education and career milestones.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Matthew McConaughey 2019 (48648344772).jpg"),
        alt: "Matthew McConaughey speaking in 2019",
        credit: "LBJ Library photo by Jay Godwin / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Matthew_McConaughey_2019_(48648344772).jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the LBJ Library Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Uvalde County", href: "/county/uvalde", kind: "county" },
        { label: "Gregg County", href: "/county/gregg", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "County authority links for Uvalde, Longview and Austin are live. City and UT/Austin-film topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
