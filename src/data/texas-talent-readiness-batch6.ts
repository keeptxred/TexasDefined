import type { TexasTalentReadinessRecord } from "@/data/texas-talent-readiness";

const commonsRedirect = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const reviewedAt = "2026-08-25";

export const TEXAS_TALENT_READINESS_BATCH6: Readonly<Record<string, TexasTalentReadinessRecord>> = {
  "robert-rodriguez": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.austinfilm.org/press/austin-film-society-announces-new-board-members-2019/",
        "https://rtf.utexas.edu/about/notable-alumni",
        "https://www.encyclopedia.com/books/culture-magazines/rodriguez-robert",
      ],
      note: "Austin Film Society documents Rodriguez as an Austin-based filmmaker and Troublemaker Studios founder, UT Austin lists him among its film/TV alumni, and the biographical reference was rechecked for his San Antonio birth and Texas education. Together they support the profile's San Antonio-to-Austin origin and production-base claims.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Robert Rodriguez.jpg"),
        alt: "Robert Rodriguez at the 2007 Grindhouse premiere in Austin",
        credit: "Jason McELweenie",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Robert_Rodriguez.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Bexar County", href: "/county/bexar", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "San Antonio and Austin geography is connected at the county-authority level. City, UT Austin and Texas-film topical links remain to be verified before launch.",
    },
    launchStatus: "editorial-review",
  },
  "eva-longoria": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.televisionacademy.com/bios/eva-longoria",
        "https://www.tamuk.edu/employee-services/_files/HR/newsletters/May-2021-Newsletter---Accessible.pdf",
      ],
      note: "The Television Academy identifies Longoria's birthplace as Corpus Christi and documents her acting, producing and directing career. Texas A&M University-Kingsville independently records her Corpus Christi birth and Bachelor of Science in kinesiology from the university, supporting both South Texas anchors in the draft profile.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Eva Longoria.jpg"),
        alt: "Eva Longoria photographed in Cannes in 2008",
        credit: "Alain Zirah",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Eva_Longoria.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Nueces County", href: "/county/nueces", kind: "county" },
        { label: "Kleberg County", href: "/county/kleberg", kind: "county" },
      ],
      note: "Corpus Christi and Kingsville geography is connected at the county-authority level. City and Texas television/film topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "renee-zellweger": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://rtf.utexas.edu/about/notable-alumni",
        "https://www.biography.com/actors/renee-zellweger",
        "https://www.oscars.org/oscars/ceremonies/2020",
      ],
      note: "UT Austin lists Zellweger among its notable film/TV alumni, A&E Biography was rechecked for Katy birth, Katy High School and UT Austin attendance, and the Academy record confirms her later Best Actress win for Judy. The profile's Katy-to-Austin origin is well supported.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Renée Zellweger.jpg"),
        alt: "Renée Zellweger photographed in 2010",
        credit: "David Shankbone",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ren%C3%A9e_Zellweger.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [
        { label: "Harris County", href: "/county/harris", kind: "county" },
        { label: "Fort Bend County", href: "/county/fort-bend", kind: "county" },
        { label: "Travis County", href: "/county/travis", kind: "county" },
      ],
      note: "Katy and Austin are connected through county-authority pages. Katy city, UT Austin and Texas-film topical links remain to be verified before launch.",
    },
    launchStatus: "editorial-review",
  },
  "ethan-hawke": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.biography.com/actors/ethan-hawke",
        "https://www.oscars.org/sites/oscars/files/87th_noms_fact_sheet.pdf",
      ],
      note: "A&E Biography was rechecked for Hawke's Austin birth and early biography, while the Academy fact sheet verifies his major acting and screenplay nominations through Boyhood. The draft correctly treats Austin as both birthplace and a later creative connection through Richard Linklater collaborations rather than claiming a Texas upbringing.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Ethan Hawke Austin Texas.jpg"),
        alt: "Ethan Hawke at the 2007 premiere of The Hottest State in Austin",
        credit: "Austinist Dot Com",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ethan_Hawke_Austin_Texas.jpg",
        licenseLabel: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        rightsNote: "Wikimedia Commons records the Austin Flickr photograph as CC BY 2.0 and license-reviewed. Attribution and an indication of modifications are required.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Travis County", href: "/county/travis", kind: "county" }],
      note: "Austin geography is connected through the Travis County authority page. Austin city, Richard Linklater and Texas-film topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
  "dennis-quaid": {
    sourceReview: {
      status: "reviewed",
      reviewedAt,
      verifiedSources: [
        "https://www.biography.com/actors/dennis-quaid",
        "https://www.uh.edu/commencement/undergeaduate-comm-program-sp-13.pdf",
      ],
      note: "A&E Biography was rechecked for Quaid's Houston birth and University of Houston attendance, while the university's own commencement record documents his 1970s drama study under Cecil Pickett and Distinguished Alumnus recognition. This supports the profile's Houston arts-education connection.",
    },
    imageReview: {
      status: "verified",
      reviewedAt,
      heroImage: {
        src: commonsRedirect("Dennis Quaid by Gage Skidmore.jpg"),
        alt: "Dennis Quaid photographed at CinemaCon in 2024",
        credit: "Gage Skidmore",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Dennis_Quaid_by_Gage_Skidmore.jpg",
        licenseLabel: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        rightsNote: "Wikimedia Commons records the photograph as CC BY-SA 3.0 with required attribution to Gage Skidmore. Adaptations require attribution, modification notice and compatible share-alike terms.",
      },
    },
    internalLinkReview: {
      status: "partial",
      links: [{ label: "Harris County", href: "/county/harris", kind: "county" }],
      note: "Houston geography is connected at the county-authority level. Houston city, University of Houston and Texas-film topical links remain to be verified.",
    },
    launchStatus: "editorial-review",
  },
};
