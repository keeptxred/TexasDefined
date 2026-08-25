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
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena",
      ],
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
      links: [
        { label: "Brazoria County", href: "/county/brazoria", kind: "county" },
        { label: "Nueces County", href: "/county/nueces", kind: "county" },
        { label: "Harris County", href: "/county/harris", kind: "county" },
      ],
      note: "County authority links are live. Corpus Christi, Houston and Texas-music-history links still need route-level verification before public launch.",
    },
    launchStatus: "editorial-review",
  },
  "buddy-holly": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.mylubbock.us/220/Buddy-Holly-Center",
      ],
      note: "The City of Lubbock's Buddy Holly Center was rechecked for the Lubbock/West Texas legacy and museum claims. Additional music-history sourcing remains in the draft source list.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Buddy Holly.jpg"),
        alt: "Buddy Holly in a Brunswick Records publicity portrait circa 1957",
        credit: "Brunswick Records / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Buddy_Holly.jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons records the U.S. publicity photograph as public domain because it was published without a copyright notice.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Lubbock County", href: "/county/lubbock", kind: "county" }],
      note: "The county authority link is live. Lubbock city, Buddy Holly Center and Texas-music-history links still need route-level verification.",
    },
    launchStatus: "editorial-review",
  },
  beyonce: {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.grammy.com/artists/beyonce-knowles/12474/",
      ],
      note: "GRAMMY's artist record was rechecked for Houston birthplace, Destiny's Child origins and major career milestones. Houston-specific cultural context still needs a second independent authority source before launch.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Beyonce 2016.jpg"),
        alt: "Beyoncé performing during the Formation World Tour in 2016",
        credit: "BBGunBilly",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Beyonce_2016.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and reviewed under that license. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "The Harris County authority link is live. Houston city and Texas-music/culture links still need route-level verification.",
    },
    launchStatus: "editorial-review",
  },
  "matthew-mcconaughey": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://moody.utexas.edu/faculty/matthew-mcconaughey",
        "https://moody.utexas.edu/news/mcconaughey-joins-moody-college-faculty",
      ],
      note: "UT Austin's Moody College faculty record and appointment announcement were rechecked for degree, teaching history and professor-of-practice status.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Matthew McConaughey.jpg"),
        alt: "Matthew McConaughey photographed in 2008",
        credit: "LD Cross",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Matthew_McConaughey.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and reviewed under that license. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Uvalde County", href: "/county/uvalde", kind: "county" },
        { label: "Gregg County", href: "/county/gregg", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "County authority links are live. Austin/UT Austin and Texas-film links still need route-level verification.",
    },
    launchStatus: "editorial-review",
  },
};
