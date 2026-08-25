import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH8: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "sandra-cisneros": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.loc.gov/item/n84021632/sandra-cisneros/",
        "https://www.arts.gov/honors/medals/sandra-cisneros",
      ],
      note: "Library of Congress records Cisneros's Chicago birth, major works and a long San Antonio residence, while the National Endowment for the Arts identifies her as a 2015 National Medal of Arts recipient associated with San Antonio, Texas. Because her current residence is no longer assumed to be San Antonio, the profile's Texas connection should remain framed as a major long-term creative and civic chapter rather than a present-residence claim.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("NBF2024-sandra-cisneros.jpg"),
        alt: "Sandra Cisneros at the 2024 National Book Festival",
        credit: "Fuzheado",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:NBF2024-sandra-cisneros.jpg",
        licenseLabel: "CC BY 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
        rightsNote: "Wikimedia Commons records this 2024 National Book Festival photograph as the uploader's own work under CC BY 4.0. Attribution, a license link and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Bexar County", href: "/county/bexar", kind: "county" }],
      note: "San Antonio's geographic connection is anchored to the Bexar County authority page. San Antonio city, Mexican American culture and Texas-literature topical routes still need verification before public launch.",
    },
    launchStatus: "editorial-review",
  },
  "cormac-mccarthy": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://archivesspace.library.txstate.edu/repositories/4/resources/507",
        "https://www.nationalbook.org/people/cormac-mccarthy/",
      ],
      note: "Texas State University's Wittliff Collections records that McCarthy was living in El Paso by the publication of Suttree, that his move southwest shifted the setting of his fiction, and that his later work developed from that borderlands period. The National Book Foundation independently verifies the 1992 National Book Award for All the Pretty Horses. The profile correctly treats Texas as a mature cultural/geographic connection rather than a birthplace claim.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Cormac McCarthy (The Orchard Keeper author portrait).jpg"),
        alt: "Cormac McCarthy in the 1965 author portrait for The Orchard Keeper",
        credit: "Joe Blackwell / Random House dust jacket / Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Cormac_McCarthy_(The_Orchard_Keeper_author_portrait).jpg",
        licenseLabel: "Public domain in the United States",
        rightsNote: "Wikimedia Commons documents the 1965 dust-jacket portrait as public domain in the United States because the jacket was published without a valid copyright notice; the hosted scan is treated as a mechanical reproduction. Keep the determination U.S.-specific and retain photographer and publication provenance.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "El Paso County", href: "/county/el-paso", kind: "county" }],
      note: "El Paso is anchored to the El Paso County authority page. El Paso city, West Texas, borderlands and Texas-literature topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "benjamin-alire-saenz": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.utep.edu/liberalarts/news/april-2022/2022-04-22-liberal-arts-hosts-homenaje-to-ben-saenz.html",
        "https://www.penfaulkner.org/2013/03/25/benjamin-alire-saenz-wins-2013-penfaulkner-award/",
      ],
      note: "UTEP documents Sáenz as a celebrated border writer and retired Professor of Creative Writing whose career was closely tied to El Paso. PEN/Faulkner verifies his 2013 Award for Fiction for Everything Begins and Ends at the Kentucky Club, a collection centered on El Paso and Juárez. These sources strongly support a Texas connection based on career, institution and borderlands subject matter rather than birth.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Benjamin Saenz 2016.jpg"),
        alt: "Benjamin Alire Sáenz at the 2016 Texas Book Festival in Austin",
        credit: "Larry D. Moore",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Benjamin_Saenz_2016.jpg",
        licenseLabel: "CC BY 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
        rightsNote: "Wikimedia Commons records Larry D. Moore's own photograph as CC BY 4.0. Attribution, a license link and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "El Paso County", href: "/county/el-paso", kind: "county" }],
      note: "El Paso geography is connected through the county-authority page. El Paso city, UTEP, borderlands and Texas-literature topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "robert-rauschenberg": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://rauschenbergfoundation.org/artist/chronology",
        "https://www.rauschenbergfoundation.org/",
      ],
      note: "The Robert Rauschenberg Foundation's chronology records his 1925 birth in Port Arthur, Texas, childhood there, brief University of Texas attendance and later return to Port Arthur, while the Foundation describes him as a native Texan. This provides unusually strong first-party support for the Gulf Coast origin in the profile.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Robert Rauschenberg (1968).jpg"),
        alt: "Robert Rauschenberg at the Stedelijk Museum in Amsterdam in 1968",
        credit: "Jac. de Nijs / Anefo / Nationaal Archief",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Robert_Rauschenberg_(1968).jpg",
        licenseLabel: "CC BY-SA 3.0 NL",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/nl/",
        rightsNote: "Wikimedia Commons records the Anefo/Nationaal Archief photograph under Creative Commons Attribution-ShareAlike 3.0 Netherlands. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Jefferson County", href: "/county/jefferson", kind: "county" }],
      note: "Port Arthur is anchored to the Jefferson County authority page. Port Arthur city, Gulf Coast and Texas-art topical routes remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "steve-martin": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.oscars.org/governors-awards/ceremonies/honoree-bio/steve-martin",
        "https://www.televisionacademy.com/bios/steve-martin",
      ],
      note: "The Academy of Motion Picture Arts and Sciences records Martin's 1945 birth in Waco and move to California in 1950, while the Television Academy independently lists Waco as his birthplace and documents his television career. The profile therefore correctly limits the Texas connection primarily to birthplace rather than upbringing or career base.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Steve Martin 2011.jpg"),
        alt: "Steve Martin at the 120th anniversary of Carnegie Hall in 2011",
        credit: "Joella Marano",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Steve_Martin_2011.jpg",
        licenseLabel: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        rightsNote: "Wikimedia Commons records Joella Marano's Flickr photograph as CC BY-SA 2.0 and license-reviewed. Attribution, modification notice and compatible share-alike terms are required for adaptations.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "McLennan County", href: "/county/mclennan", kind: "county" }],
      note: "Waco geography is connected through the McLennan County authority page. Waco city and Texas comedy/performance topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
