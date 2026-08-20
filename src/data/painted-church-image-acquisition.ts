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
  {
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    subject: "interior",
    label: "Immaculate Heart of Mary current parish interior photographs",
    sourceUrl: "https://ihmsatx.org/our-history-1",
    sourceOwner: "Immaculate Heart of Mary Catholic Church",
    status: "permission-needed",
    nextAction: "Request written permission from the parish for one current full-interior image and one detail image, with creator/credit terms if known.",
    note: "The parish publishes exact current interior imagery and is the best controlling visual source, but the page does not publish an open reuse license.",
  },
  {
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    subject: "interior",
    label: "Painted Churches exhibit interior photograph",
    sourceUrl: "https://www.expressnews.com/news/religion/article/New-exhibit-pays-tribute-to-the-immigrant-10598560.php",
    sourceOwner: "San Antonio Express-News / exhibit photographer",
    status: "permission-needed",
    nextAction: "Do not republish from the news page. Trace the exhibit photograph's original creator and request a reusable license if it materially improves the visual record.",
    note: "Exact richly painted IHM interior; useful discovery evidence but not a publication license.",
  },
  {
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    subject: "exterior",
    label: "Immaculate Heart of Mary bell-tower restoration photograph",
    sourceUrl: "https://sunbeltllc.com/portfolio/immaculate-heart-of-mary-bell-tower",
    sourceOwner: "Sunbelt LLC",
    status: "permission-needed",
    nextAction: "Request reuse permission only if a restoration-project exterior is useful; otherwise prioritize parish or original Texas Defined field photography.",
    note: "Exact church exterior associated with a documented restoration contractor; no open license published.",
  },
  {
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    subject: "interior",
    label: "Possible Wikimedia Commons IHM image set",
    sourceUrl: "https://commons.wikimedia.org/",
    sourceOwner: "Wikimedia Commons contributors",
    status: "rights-unclear",
    nextAction: "Resolve the exact Commons file-description pages, creator names and item-level licenses before adding any file to the canonical gallery.",
    note: "A third-party church index reports several exact IHM images as CC BY-SA 3.0 and attributes them to Wikimedia Commons, but Texas Defined will not rely on that secondary license claim without the underlying Commons item pages.",
  },
  {
    churchSlug: "san-antonio-immaculate-heart-of-mary",
    subject: "exterior",
    label: "Original Texas Defined field photograph",
    sourceUrl: "https://texasdefined.com/explore/painted-churches/san-antonio-immaculate-heart-of-mary",
    sourceOwner: "Texas Defined",
    status: "fieldwork-needed",
    nextAction: "Capture an original exterior, full-interior, stencil-detail and restoration-detail survey during documented fieldwork.",
    note: "Preferred long-term visual solution because it can document the current 2026-restored condition with controlled rights and exact object captions.",
  },
  {
    churchSlug: "galveston-st-joseph-church",
    subject: "exterior",
    label: "Texas Time Travel St. Joseph's exterior",
    sourceUrl: "https://texastimetravel.com/directory/st-joseph-catholic-church-tour/",
    sourceOwner: "Texas Time Travel / underlying photographer",
    status: "rights-unclear",
    nextAction: "Trace the image to its underlying file/photographer and verify the original license before embedding; the tourism page itself is not a reuse grant.",
    note: "Exact current exterior of the 1859 Galveston church. The delivery filename suggests a wiki-origin asset, but Texas Defined will not infer rights from a filename.",
  },
  {
    churchSlug: "galveston-st-joseph-church",
    subject: "interior",
    label: "Galveston Historical Foundation St. Joseph's imagery",
    sourceUrl: "https://www.galvestonhistory.org/sites/ghf-managed-properties",
    sourceOwner: "Galveston Historical Foundation",
    status: "permission-needed",
    nextAction: "Request reuse permission for a current full-interior image and a grained-pew/painted-ceiling detail, or arrange original Texas Defined field photography with GHF access.",
    note: "GHF is the controlling steward and therefore the preferred source for current-condition photography and access permission.",
  },
  {
    churchSlug: "galveston-st-joseph-church",
    subject: "exterior",
    label: "Original Texas Defined field photograph",
    sourceUrl: "https://texasdefined.com/explore/painted-churches/galveston-st-joseph-church",
    sourceOwner: "Texas Defined",
    status: "fieldwork-needed",
    nextAction: "Arrange a documented visit with Galveston Historical Foundation and capture exterior, interior, painted ceiling, faux-grained pews, German Stations and altar/reredos details.",
    note: "Original fieldwork would simultaneously solve image rights, current-condition documentation and several object-level research gaps.",
  },
];

export function paintedChurchOpenImageLeads(slug: string) {
  return paintedChurchImageAcquisitionLeads.filter((lead) => lead.churchSlug === slug && lead.status !== "rights-cleared");
}
