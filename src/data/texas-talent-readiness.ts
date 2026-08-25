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
      verifiedSources: ["https://www.mylubbock.us/220/Buddy-Holly-Center"],
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
      verifiedSources: ["https://www.grammy.com/artists/beyonce-knowles/12474/"],
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
  "george-strait": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.countrymusichalloffame.org/hall-of-fame/george-strait"],
      note: "Country Music Hall of Fame material was rechecked for Poteet birthplace, Pearsall upbringing, ranching background, San Marcos/Ace in the Hole years and traditional Texas-country influence.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("George Strait on stage.jpg"),
        alt: "George Strait performing onstage in 2008",
        credit: "Craig ONeal",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:George_Strait_on_stage.jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Atascosa County", href: "/county/atascosa", kind: "county" },
        { label: "Frio County", href: "/county/frio", kind: "county" },
        { label: "Hays County", href: "/county/hays", kind: "county" },
        { label: "Bexar County", href: "/county/bexar", kind: "county" },
      ],
      note: "County authority links now cover Poteet, Pearsall, San Marcos and San Antonio geography. City and dance-hall authority links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "stevie-ray-vaughan": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://rockhall.com/inductees/stevie-ray-vaughan-double-trouble/",
        "https://www.rockhall.com/wp-content/uploads/2024/03/Stevie_Ray_Vaughan___Double_Trouble_2015.pdf",
      ],
      note: "Rock & Roll Hall of Fame material was rechecked for Oak Cliff/Dallas roots, the move into Austin's club scene and Vaughan's role in reviving blues for rock audiences.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Stevie Ray Vaughan and Double Trouble (1983 publicity photo by Don Hunstein).jpg"),
        alt: "Stevie Ray Vaughan and Double Trouble in a 1983 publicity photograph",
        credit: "Don Hunstein / publicity photograph",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Stevie_Ray_Vaughan_and_Double_Trouble_(1983_publicity_photo_by_Don_Hunstein).jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons documents publication between 1978 and March 1, 1989 without a valid copyright notice and no required registration within five years. Treat the determination as U.S.-specific.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Dallas County", href: "/county/dallas", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "Dallas and Austin geography is connected at the county-authority level. Austin city, blues-history and memorial links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "janis-joplin": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://rockhall.com/inductees/janis-joplin/",
        "https://rockhall.com/wp-content/uploads/2024/03/Janis_Joplin_1995.pdf",
      ],
      note: "Rock & Roll Hall of Fame material was rechecked for Port Arthur origins, Austin study/performance years, blues influences and her breakthrough with Big Brother and the Holding Company.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Janis Joplin 1969.JPG"),
        alt: "Janis Joplin in a 1969 publicity portrait",
        credit: "Ashley Famous Agency / Albert B. Grossman management",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Janis_Joplin_1969.JPG",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons records the 1969 U.S. publicity photograph as public domain because it was published without a copyright notice. The determination may differ outside the United States.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Jefferson County", href: "/county/jefferson", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "Port Arthur and Austin geography is connected at the county-authority level. City, UT and Texas-blues links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "waylon-jennings": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.countrymusichalloffame.org/hall-of-fame/waylon-jennings"],
      note: "Country Music Hall of Fame material was rechecked for Littlefield birthplace, Lubbock radio work, Buddy Holly collaboration and Jennings's fight for artistic control in outlaw country.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Waylon Jennings in 1976.jpg"),
        alt: "Waylon Jennings performing in concert in 1976",
        credit: "RCA Records / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Waylon_Jennings_in_1976.jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons records the RCA publicity photograph as public domain in the United States because it was published before 1978 without a copyright notice.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Lamb County", href: "/county/lamb", kind: "county" },
        { label: "Lubbock County", href: "/county/lubbock", kind: "county" },
      ],
      note: "Littlefield and Lubbock geography is connected at the county-authority level. West Texas and country-music topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "roy-orbison": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: ["https://www.tshaonline.org/handbook/entries/orbison-roy-kelton"],
      note: "The Handbook of Texas entry was rechecked for Vernon birthplace, Wink upbringing, early West Texas radio/band activity and the Teen Kings' regional development.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("1965 Roy Orbison.jpg"),
        alt: "Roy Orbison in a 1965 MGM Records trade advertisement",
        credit: "MGM Records / Billboard trade advertisement",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:1965_Roy_Orbison.jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons records the 1965 advertisement image as public domain because the U.S. collective-work advertisement was published without a copyright notice specific to the ad.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Wilbarger County", href: "/county/wilbarger", kind: "county" },
        { label: "Winkler County", href: "/county/winkler", kind: "county" },
        { label: "Ector County", href: "/county/ector", kind: "county" },
      ],
      note: "Vernon, Wink and Odessa geography is connected at the county-authority level. West Texas and early-rock topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
