export type PaintedChurchImageAcquisitionStatus =
  | "rights-cleared"
  | "permission-needed"
  | "all-rights-reserved"
  | "rights-unclear"
  | "archive-link-only"
  | "fieldwork-needed";

export type PaintedChurchImageAcquisitionLead = {
  churchSlug: string;
  subject: "exterior" | "interior" | "detail" | "archival";
  label: string;
  sourceUrl: string;
  sourceOwner: string;
  status: PaintedChurchImageAcquisitionStatus;
  nextAction: string;
  note: string;
};

/**
 * Open or recently cleared visual leads discovered during the pre-index audit.
 * A record here never grants publication rights by itself; only item-level rights
 * verified in a canonical gallery record are treated as reusable photography.
 */
export const paintedChurchImageAcquisitionLeads: PaintedChurchImageAcquisitionLead[] = [
  {
    churchSlug: "houston-annunciation-catholic-church",
    subject: "exterior",
    label: "Annunciation Church Houston Texas.JPG",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Annunciation_Church_Houston_Texas.JPG",
    sourceOwner: "Ed Uthman / Wikimedia Commons",
    status: "rights-cleared",
    nextAction: "Published through the canonical pre-index gallery with creator, source and CC BY 3.0 license metadata.",
    note: "Exact church at 1618 Texas Avenue; original file 3155×4743.",
  },
  {
    churchSlug: "palestine-first-presbyterian-church",
    subject: "exterior",
    label: "FirstPresbyterianChurch (1 of 1).jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:FirstPresbyterianChurch_(1_of_1).jpg",
    sourceOwner: "Renelibrary / Wikimedia Commons",
    status: "rights-cleared",
    nextAction: "Published through the canonical pre-index gallery with creator, source and CC BY-SA 4.0 license metadata.",
    note: "Exact First Presbyterian Church in Palestine; original file 858×714.",
  },
  {
    churchSlug: "waco-st-francis-on-the-brazos",
    subject: "exterior",
    label: "St. Francis on the Brazos — Ken Erfurth photograph",
    sourceUrl: "https://www.flickr.com/photos/83379080@N00/49781431596/",
    sourceOwner: "Ken Erfurth / Flickr",
    status: "all-rights-reserved",
    nextAction: "Do not publish unless the creator grants Texas Defined reusable permission or changes the license.",
    note: "Exact 2017 Waco church photograph; Flickr explicitly marks the item all rights reserved.",
  },
  {
    churchSlug: "waco-st-francis-on-the-brazos",
    subject: "interior",
    label: "St. Francis sanctuary and Stations — Spiritus / Diocese of Austin",
    sourceUrl: "https://austindiocese.news/reflecting-stations-cross-st-francis-brazos-waco",
    sourceOwner: "Diocese of Austin / Spiritus",
    status: "permission-needed",
    nextAction: "Request written reuse permission for one sanctuary/interior image with creator credit and publication terms before embedding.",
    note: "Excellent current church-specific interior evidence, but no reusable license is published on the item page.",
  },
  {
    churchSlug: "waco-st-francis-on-the-brazos",
    subject: "exterior",
    label: "St. Francis on the Brazos — Destination Waco exterior",
    sourceUrl: "https://destinationwaco.org/places/st-francis-on-the-brazos/",
    sourceOwner: "Destination Waco",
    status: "permission-needed",
    nextAction: "Request reusable permission or locate the underlying photographer/license record before embedding.",
    note: "Exact current church exterior; tourism publication does not itself establish a reuse license.",
  },
  {
    churchSlug: "waco-st-francis-on-the-brazos",
    subject: "exterior",
    label: "Texas Over Time — Geoff Hunt 2018 comparison photograph",
    sourceUrl: "https://blogs.baylor.edu/texascollection/2019/11/15/st-francis-on-the-brazos/",
    sourceOwner: "Geoff Hunt / The Texas Collection, Baylor University",
    status: "permission-needed",
    nextAction: "Ask The Texas Collection whether the 2018 Geoff Hunt photograph may be reused with attribution, or obtain a replacement under an open license.",
    note: "Strong then-and-now research image with known photographer; no open reuse license is stated on the page.",
  },
  {
    churchSlug: "waco-st-francis-on-the-brazos",
    subject: "exterior",
    label: "Original Texas Defined field photograph",
    sourceUrl: "https://texasdefined.com/explore/painted-churches/waco-st-francis-on-the-brazos",
    sourceOwner: "Texas Defined",
    status: "fieldwork-needed",
    nextAction: "Capture original Texas Defined exterior, interior and artwork-detail photographs during documented fieldwork if third-party reusable rights remain unavailable.",
    note: "Preferred long-term solution because original field photography also strengthens E-E-A-T and artwork-level documentation.",
  },
];

export function paintedChurchOpenImageLeads(slug: string) {
  return paintedChurchImageAcquisitionLeads.filter((lead) => lead.churchSlug === slug && lead.status !== "rights-cleared");
}
