import type { PaintedChurchFeature } from "./painted-church-features";

const THEMATIC_NOMINATION = "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13";
const GHF = "https://www.galveston.com/whattodo/tours/self-guided-tours/historic-architecture/stjosephchurch/";

/**
 * Object-level evidence added during the final pre-index authority audit.
 * These records deliberately distinguish observed/documented historic objects from
 * inferred symbolism or undocumented restoration assumptions.
 */
export const paintedChurchPreindexFeatures: PaintedChurchFeature[] = [
  {
    id: "galveston-st-joseph-grained-pews",
    churchSlug: "galveston-st-joseph-church",
    name: "Faux-grained wooden pews",
    type: "ornament",
    location: "Nave seating",
    description: "The 1982 thematic nomination identifies St. Joseph's pews as the only documented example of graining among the fifteen churches in the statewide study. The technique used paint to make less expensive wood resemble more costly species and finishes.",
    dateOrPeriod: "Historic decorative program documented in the 1982 thematic study",
    techniqueSlugs: ["graining"],
    integrity: "historic-modified",
    sourceLabel: "1982 National Register thematic nomination",
    sourceUrl: THEMATIC_NOMINATION,
    sourceDetail: "Thematic discussion of graining; St. Joseph's is identified as the sole example among the fifteen churches.",
  },
  {
    id: "galveston-st-joseph-painted-coffered-ceiling",
    churchSlug: "galveston-st-joseph-church",
    name: "Painted coffered ceiling and Gothic-symbol program",
    type: "ornament",
    location: "Nave ceiling",
    description: "Galveston heritage documentation describes the surviving interior as softly painted, with a coffered ceiling, painted quatrefoils and other Gothic symbols. The ceiling belongs to an interior that also experienced post-1900-Storm repair and later preservation, so Texas Defined does not assign every visible layer to a single untouched campaign.",
    integrity: "historic-modified",
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: GHF,
  },
  {
    id: "galveston-st-joseph-german-stations",
    churchSlug: "galveston-st-joseph-church",
    name: "German-inscription Stations of the Cross",
    type: "furnishing",
    location: "Nave walls",
    description: "The preserved interior includes early twentieth-century plaster Stations of the Cross with German inscriptions, a direct material link between the church's devotional furnishings and Galveston's German Catholic immigrant community.",
    dateOrPeriod: "Early twentieth century",
    integrity: "historic-modified",
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: GHF,
  },
  {
    id: "galveston-st-joseph-altars-reredoses",
    churchSlug: "galveston-st-joseph-church",
    name: "Main and side altars with reredoses",
    type: "altar-reredos",
    location: "Sanctuary and side altars",
    description: "The preserved ensemble includes the elaborate main and side altars, reredoses, statues and related altar furnishings. These objects should be interpreted together with the painted ceiling and pew finishes as one historic decorative interior rather than as unrelated furnishings.",
    integrity: "restored",
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: GHF,
  },
  {
    id: "galveston-st-joseph-1900-storm",
    churchSlug: "galveston-st-joseph-church",
    name: "1900 Storm repair, enlargement and redecoration",
    type: "restoration-evidence",
    location: "Whole church",
    description: "The church was damaged by the 1900 Galveston Storm and was repaired, enlarged and redecorated within the following year while retaining its overall architectural character. That event is a documented reason not to describe every present decorative surface as untouched 1859–1860 fabric.",
    dateOrPeriod: "1900–1901",
    integrity: "historic-modified",
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: GHF,
  },
  {
    id: "galveston-st-joseph-1968-ghf-recovery",
    churchSlug: "galveston-st-joseph-church",
    name: "1968 closure, auction and furnishing recovery",
    type: "restoration-evidence",
    location: "Whole church and movable furnishings",
    description: "After the Catholic Diocese closed St. Joseph's in 1968 and sold its contents at public auction, Galveston Historical Foundation intervened when the building faced warehouse use. Heritage documentation states that most original furnishings were recovered and reinstalled and the structure stabilized. This makes provenance of the present furnishings a preservation story in its own right.",
    dateOrPeriod: "1968 onward",
    integrity: "restored",
    sourceLabel: "Galveston heritage profile — 1859 St. Joseph's Church",
    sourceUrl: GHF,
  },
];
