import type { PaintedChurchArchivalImageReference } from "./painted-church-archival-images";

const expansionArchival: PaintedChurchArchivalImageReference[] = [
  {
    slug: "dubina-saints-cyril-methodius",
    label: "Dubina interior detail — Portal record metapth28467",
    source: "The Portal to Texas History / Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28467/",
    subject: "Exact interior detail of Saints Cyril & Methodius Catholic Church in Dubina photographed by Dreanna L. Belden on October 7, 2006.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "The Portal identifies this as a primary-source church photograph. Texas Defined links the record and does not assume a blanket reuse license from collection membership.",
  },
  {
    slug: "dubina-saints-cyril-methodius",
    label: "Dubina interior detail — Portal record metapth28473",
    source: "The Portal to Texas History / Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28473/",
    subject: "Second exact interior detail of Saints Cyril & Methodius Catholic Church in Dubina from the 2006 Photographing Texas series.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Exact church-specific archival evidence; item-level permissions remain controlling for republication.",
  },
  {
    slug: "dubina-saints-cyril-methodius",
    label: "Dubina interior detail — Portal record metapth28471",
    source: "The Portal to Texas History / Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28471/",
    subject: "Additional exact interior detail of Saints Cyril & Methodius Catholic Church in Dubina from the same documented 2006 survey.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Linked as primary-source visual evidence; no republication occurs without item-level reuse confirmation.",
  },
  {
    slug: "san-antonio-st-joseph-catholic-church",
    label: "St. Joseph apse and frescoed interior",
    source: "The Portal to Texas History / San Antonio Conservation Society",
    url: "https://texashistory.unt.edu/ark:/67531/metapth460055/",
    subject: "Historic interior photograph documenting the apse, ceiling and column frescoes at St. Joseph Catholic Church in San Antonio.",
    rightsStatus: "item-review-required",
    rightsNote: "Exact church-specific archival evidence. Texas Defined links the Portal item but does not republish it without an item-level reuse grant.",
  },
  {
    slug: "fredericksburg-st-marys-catholic-church",
    label: "St. Mary's Fredericksburg interior detail — 1980 THC National Register survey",
    source: "The Portal to Texas History / Texas Historical Commission",
    url: "https://texashistory.unt.edu/ark:/67531/metapth943229/",
    subject: "Exact interior-detail photograph of St. Mary's Catholic Church at 306 W. San Antonio Street in Fredericksburg, created by the Texas Historical Commission on October 1, 1980 during National Register documentation.",
    credit: "Texas Historical Commission",
    rightsStatus: "item-review-required",
    rightsNote: "The Portal identifies the exact church and THC National Register provenance. Texas Defined links the primary-source item and pairs it with a separately licensed modern interior without assuming the THC photograph is freely reusable.",
  },
  {
    slug: "anderson-st-stanislaus-kostka",
    label: "Official parish old-church photo albums",
    source: "St. Stanislaus Kostka Catholic Church — Anderson",
    url: "https://saintstans.org/photoalbums",
    subject: "Official parish photo-album collection containing historic church photographs and parish visual history.",
    rightsStatus: "collection-lead",
    rightsNote: "The parish collection is a direct historical lead, but no blanket reuse license is assumed. Individual images remain linked rather than republished until permission or reusable rights are established.",
  },
  {
    slug: "corpus-christi-sacred-heart-catholic-church",
    label: "Antonio E. Garcia Sacred Heart mural documentation",
    source: "Diocese of Corpus Christi",
    url: "https://diocesecc.org/news/marker-at-sacred-heart-honors-life-of-catholic-artist",
    subject: "Diocesan historical documentation of Antonio E. Garcia's Sacred Heart church paintings and artist legacy.",
    rightsStatus: "collection-lead",
    rightsNote: "Official historical documentation is retained as an image/research lead. Texas Defined does not republish diocesan photography without explicit reuse terms.",
  },
];

export function expansionPaintedChurchArchivalImagesBySlug(slug: string) {
  return expansionArchival.filter((item) => item.slug === slug);
}
