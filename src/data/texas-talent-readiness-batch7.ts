import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH7: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "sissy-spacek": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.televisionacademy.com/bios/sissy-spacek",
        "https://www.oscars.org/oscars/ceremonies/1981",
      ],
      note: "The Television Academy explicitly records Spacek's birthplace as Quitman, Texas, and summarizes the career that followed. The Academy Awards record independently verifies her 1981 Best Actress win for Coal Miner's Daughter, supporting the profile's East Texas origin and major-career claims.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Sissy Spacek by David Shankbone.jpg"),
        alt: "Sissy Spacek at the 2010 Tribeca Film Festival",
        credit: "David Shankbone",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Sissy_Spacek_by_David_Shankbone.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Wood County", href: "/county/wood", kind: "county" }],
      note: "Quitman geography is connected through the Wood County authority page. Quitman city, East Texas and Texas-film topical links remain to be verified before launch.",
    },
    launchStatus: "editorial-review",
  },
  "forest-whitaker": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.biography.com/actors/forest-whitaker",
        "https://www.oscars.org/oscars/ceremonies/2007",
      ],
      note: "A&E Biography explicitly records Whitaker's 1961 birth in Longview, Texas, and subsequent move to California, which keeps the profile's Texas claim properly limited to origin rather than upbringing. The Academy record verifies his Best Actor win for The Last King of Scotland.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Forest Whitaker.jpg"),
        alt: "Forest Whitaker photographed in 2007",
        credit: "pmo / Flickr; crop by Wikimedia Commons user Conti",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Forest_Whitaker.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications, including the existing crop, are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Gregg County", href: "/county/gregg", kind: "county" }],
      note: "Longview geography is connected through the Gregg County authority page. Longview city, East Texas and Texas-film topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "richard-linklater": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.austinfilm.org/our-story/",
        "https://gov.texas.gov/film/trail/richard-linklater-trail",
        "https://txculturaltrust.org/bio/richard-linklater/",
      ],
      note: "Austin Film Society confirms Linklater founded AFS in 1985 and remains central to Austin's film ecosystem. The Texas Film Commission documents his extensive use of Texas locations, while Texas Cultural Trust identifies his Houston/Huntsville roots and Austin Film Society leadership. This strongly supports both the Houston origin and Austin career anchors.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Richard Linklater April 2015.jpg"),
        alt: "Richard Linklater at the LBJ Presidential Library in 2015",
        credit: "Lauren Gerson / LBJ Foundation",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Richard_Linklater_April_2015.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the LBJ Foundation Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Harris County", href: "/county/harris", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "Houston and Austin geography is connected through county-authority pages. Austin city, Austin Film Society and Texas-film topical links remain to be route-verified.",
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
      note: "The Handbook of Texas confirms McMurtry was born in Wichita Falls in 1936, lived on his family's Archer County ranch and moved to Archer City before second grade; the current research draft's wording that he was born near Archer City is therefore flagged for editorial correction before launch. Pulitzer records independently verify Lonesome Dove as the 1986 Fiction winner.",
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
        { label: "Archer County", href: "/county/archer", kind: "county" },
        { label: "Wichita County", href: "/county/wichita", kind: "county" },
      ],
      note: "Archer City/ranch-country and Wichita Falls birthplace geography are connected through county-authority pages. The underlying profile's birthplace sentence and timeline must be corrected before this profile can become launch-ready.",
    },
    launchStatus: "editorial-review",
  },
  "katherine-anne-porter": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.tshaonline.org/handbook/entries/porter-katherine-anne",
        "https://www.nationalbook.org/people/katherine-anne-porter/",
        "https://www.pulitzer.org/winners/katherine-anne-porter",
      ],
      note: "The Handbook of Texas verifies Porter's 1890 birth in Indian Creek, Brown County, and childhood move to Kyle in Hays County. The National Book Foundation confirms her Texas upbringing and 1966 National Book Award, while Pulitzer verifies the same year's Fiction prize for Collected Stories.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Katherne Anne Porter (cropped).jpg"),
        alt: "Katherine Anne Porter in her writing room in 1947",
        credit: "Hulton Archive / Library of America / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Katherne_Anne_Porter_(cropped).jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "The Wikimedia Commons licensing section marks this 1947 image public domain in the United States based on publication without copyright notice. Treat the determination as U.S.-specific, preserve the Hulton Archive/Library of America provenance and recheck the file page immediately before public launch because embedded metadata is not itself the controlling rights statement.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Brown County", href: "/county/brown", kind: "county" },
        { label: "Hays County", href: "/county/hays", kind: "county" },
      ],
      note: "Indian Creek and Kyle geography is connected through county-authority pages. Kyle city and Texas-literature topical links remain to be verified before launch.",
    },
    launchStatus: "editorial-review",
  },
};
