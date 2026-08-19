export type PaintedChurchArchivalImageReference = {
  slug: string;
  label: string;
  source: string;
  url: string;
  subject: string;
  credit?: string;
  rightsStatus: "no-known-restrictions" | "item-review-required" | "collection-lead";
  rightsNote: string;
};

export const paintedChurchArchivalImageReferences: PaintedChurchArchivalImageReference[] = [
  {
    slug: "praha-st-marys-assumption",
    label: "Interior looking north (May 1977)",
    source: "The Portal to Texas History / Texas Historical Commission",
    url: "https://texashistory.unt.edu/ark:/67531/metapth677874/",
    subject: "Historic black-and-white interior view of St. Mary's Church of the Assumption.",
    credit: "Michael D. Yancey; Texas Historical Commission",
    rightsStatus: "item-review-required",
    rightsNote: "Exact church-specific primary-source photograph. Portal item links to its own responsibilities/licensing controls, so Texas Defined links the record but does not republish the image without a clear reuse grant.",
  },
  {
    slug: "praha-st-marys-assumption",
    label: "World War II Memorial Chapel (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28405/",
    subject: "Color photograph of the World War II memorial chapel inside St. Mary's at Praha.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Exact-subject Photographing Texas record. The Portal exposes separate Licensing & Permissions controls rather than a blanket reusable license on the item page.",
  },
  {
    slug: "praha-st-marys-assumption",
    label: "Exterior view (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28438/",
    subject: "Color exterior view of St. Mary's Church of the Assumption in Praha.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Useful exact-subject archival record; reuse requires the item-level Portal permissions review.",
  },
  {
    slug: "praha-st-marys-assumption",
    label: "Monuments in front of church (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28446/",
    subject: "Monuments and church-front context at Praha.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Retained as a contextual archival source; item-level permissions control republication.",
  },
  {
    slug: "high-hill-nativity-of-mary",
    label: "High Hill sanctuary (2014)",
    source: "Library of Congress — Carol M. Highsmith Archive",
    url: "https://www.loc.gov/item/2014631554/",
    subject: "Color sanctuary photograph of Nativity of Mary, Blessed Virgin Catholic Church at High Hill.",
    credit: "Carol M. Highsmith",
    rightsStatus: "no-known-restrictions",
    rightsNote: "Library of Congress record LC-DIG-highsm-27354 states 'No known restrictions on publication' and provides downloadable digital files.",
  },
  {
    slug: "ammannsville-st-john-the-baptist",
    label: "Sanctuary reredo detail (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28494/",
    subject: "Exact interior detail of the Ammannsville sanctuary reredo.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Exact-subject record with separate Portal licensing/permissions controls; linked for research until reuse is explicitly cleared.",
  },
  {
    slug: "ammannsville-st-john-the-baptist",
    label: "Church sign (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28487/",
    subject: "Church-identification sign at St. John the Baptist in Ammannsville.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Useful location/context record; item-level permissions control image reuse.",
  },
  {
    slug: "ammannsville-st-john-the-baptist",
    label: "Church sign, alternate view (2006)",
    source: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/ark:/67531/metapth28504/",
    subject: "Alternate church-sign view at Ammannsville.",
    credit: "Dreanna L. Belden",
    rightsStatus: "item-review-required",
    rightsNote: "Retained as a direct archival reference rather than republished without an explicit item-level license.",
  },
  {
    slug: "shiner-saints-cyril-methodius",
    label: "Texas Historical Commission photograph",
    source: "The Portal to Texas History",
    url: "https://texashistory.unt.edu/ark:/67531/metapth669971/",
    subject: "Direct Shiner church photograph surfaced through the Portal/THC collections.",
    rightsStatus: "item-review-required",
    rightsNote: "Direct record retained for research and source triangulation; Texas Defined does not assume reuse rights without the item's permissions statement.",
  },
  {
    slug: "serbin-st-paul-lutheran-church",
    label: "St. Paul Lutheran Church Commons category",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:St._Paul_Lutheran_Church_(Serbin,_Texas)",
    subject: "Collection of exterior and interior photographs of St. Paul Lutheran Church at Serbin.",
    rightsStatus: "collection-lead",
    rightsNote: "Category contains multiple files. Each file must be checked individually for creator and reuse license before it is added to a Texas Defined gallery.",
  },
  {
    slug: "paris-first-united-methodist-church",
    label: "First United Methodist Church Commons category",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:First_United_Methodist_Church_(Paris,_Texas)",
    subject: "Five exact-subject photographs of the National Register First United Methodist Church in Paris.",
    rightsStatus: "collection-lead",
    rightsNote: "The category is exact-subject and confirms five files, but each individual file remains subject to its own description-page license review before embedding.",
  },
  {
    slug: "umbarger-st-marys-catholic-church",
    label: "St. Mary's Umbarger Commons category",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:St._Mary%27s_Catholic_church_(Umbarger,_Texas)",
    subject: "Seven exact exterior/cornerstone files for the 1929 church at Umbarger.",
    rightsStatus: "collection-lead",
    rightsNote: "One southeast exterior is already cleared into the Texas Defined gallery under CC0; the category is retained for additional angle-by-angle review.",
  },
  {
    slug: "corn-hill-holy-trinity-catholic-church",
    label: "Holy Trinity Catholic Church of Corn Hill Commons category",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:Holy_Trinity_Catholic_Church_of_Corn_Hill",
    subject: "Dedicated exact-subject category containing one file for Holy Trinity at Corn Hill.",
    rightsStatus: "collection-lead",
    rightsNote: "The category is exact-subject, but the individual file's creator/license still needs to be confirmed before embedding it in the gallery.",
  },
  {
    slug: "bandera-st-stanislaus-catholic-church",
    label: "St. Stanislaus Catholic Church Commons category",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:St._Stanislaus_Catholic_Church_(Bandera,_Texas)",
    subject: "Two exact-subject files for the 1876 St. Stanislaus church at Bandera.",
    rightsStatus: "collection-lead",
    rightsNote: "Both exact files are now tracked for item-level license review; unrelated St. Stanislaus files from other cities are explicitly excluded.",
  },
  {
    slug: "st-marys-immaculate-conception-lavaca",
    label: "Immaculate Conception, St. Mary's Lavaca exact Commons file",
    source: "Wikimedia Commons / Wikidata",
    url: "https://commons.wikimedia.org/wiki/File:Church_of_the_Immaculate_Conception_of_Blessed_Virgin_mary.JPG",
    subject: "Exact exterior photograph of the Church of the Immaculate Conception of Blessed Virgin Mary on FM 2672 in St. Mary's, Lavaca County.",
    rightsStatus: "item-review-required",
    rightsNote: "Wikidata confirms this exact file depicts NRHP 83003150 and secondary mirrors identify a CC BY-SA license; Texas Defined retains it as an archival lead until the Commons file page itself is reviewed directly.",
  },
  {
    slug: "plantersville-st-marys-catholic-church",
    label: "Plantersville exact-image search lead",
    source: "Wikimedia Commons / archival search",
    url: "https://commons.wikimedia.org/w/index.php?search=St.+Mary%27s+Catholic+Church+Plantersville+Texas&title=Special:MediaSearch&type=image",
    subject: "Exact-subject search for St. Mary's Catholic Church at Plantersville.",
    rightsStatus: "collection-lead",
    rightsNote: "No individual Commons file was promoted in this pass because an exact item-level license and subject match were not both confirmed.",
  },
];

export function paintedChurchArchivalImagesBySlug(slug: string) {
  return paintedChurchArchivalImageReferences.filter((item) => item.slug === slug);
}
