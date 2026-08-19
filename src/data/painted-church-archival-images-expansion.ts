import type { PaintedChurchArchivalImageReference } from "./painted-church-archival-images";

const expansionArchival: PaintedChurchArchivalImageReference[] = [
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
