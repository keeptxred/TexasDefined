/**
 * Distinctive, source-checked editorial framing for the four public culture
 * chapters. These are interpretive explanations, not duplicated entry blurbs.
 * Reviewed 2026-11-13. Do not claim personal visits or original interviews.
 */
export type ChapterEvidence = {
  title: string;
  introduction: string;
  findings: Array<{ heading: string; paragraphs: string[]; sources: Array<{ label: string; url: string }> }>;
};
export const TEXAS_CHAPTER_EVIDENCE: Record<string, ChapterEvidence> = {
  "food-drink": {
    title: "How geography and migration shaped the Texas table",
    introduction: "These dishes are connected by place, not by a single invented Texas cuisine. The useful questions are who cooked them, where the ingredients came from and how a regional preparation became familiar across the state.",
    findings: [
      {
        heading: "Barbecue and the meat-market economy",
        paragraphs: [
          "Central Texas brisket is not the whole history of Texas barbecue. Cattle raising made beef prominent, while Central European butchers and meat markets helped build a style of slow-cooked meats sold by weight. East Texas barbecue retained stronger Southern traditions, and South Texas barbacoa has its own borderlands history. A plate of brisket, smoked sausage and pickles is therefore evidence of overlapping regional practices, not a statewide rule.",
          "The clearest way to compare a barbecue stop is by its cut, wood, cooking method and regional history rather than declaring one style to be the original Texas barbecue. The broader Texas food and barbecue guides supply regional context; individual restaurants still require independent reporting."
        ],
        sources: [{ label: "TexasDefined: regional barbecue styles", url: "/article/texas-barbecue-styles-explained" }]
      },
      {
        heading: "Texas-born, Texas-adopted and disputed origins",
        paragraphs: [
          "Chicken-fried steak is a Texas staple, but the Handbook of Texas explains that its exact invention story is disputed. The famous Lamesa accident story should be treated as a legend rather than settled fact. The dish belongs on this list because it became central to Texas menus, not because there is a proven single birthplace.",
          "The same distinction matters for tres leches cake, fresh pico de gallo and other dishes shared across Mexico and the American Southwest. Calling a food important to Texas does not mean Texans invented it. Dr Pepper, by contrast, has a specific Waco origin; the cultural comparison becomes richer when the categories stay separate."
        ],
        sources: [{ label: "Handbook of Texas: chicken-fried steak", url: "https://www.tshaonline.org/handbook/entries/chicken-fried-steak" }, { label: "TexasDefined: Dr Pepper's Waco history", url: "/dr-pepper-texas-history" }]
      },
      {
        heading: "Czech baking, border cooking and regional vocabulary",
        paragraphs: [
          "A sweet fruit-or-cheese kolache and a sausage-filled klobasnek are not the same pastry, even though signs and everyday speech sometimes use kolache for both. Explaining the distinction reveals how Central Texas communities preserved immigrant traditions while adapting them to American meat markets and highway travel.",
          "South Texas barbacoa, San Antonio puffy tacos and the breakfast-taco culture of Central and South Texas also belong to different histories. Rather than listing them as interchangeable Tex-Mex, the linked guides explain ingredients, preparation, locally documented origins and disputed claims."
        ],
        sources: [{ label: "TexasDefined: kolaches and klobasneks", url: "/article/kolache-or-klobasnek-texas-story" }, { label: "TexasDefined: San Antonio puffy tacos", url: "/san-antonio-puffy-taco-history" }]
      }
    ]
  },
  "texas-brands": {
    title: "What makes a company a Texas brand?",
    introduction: "A headquarters address, the place where a product was invented, a Texas factory and a loyal Texas audience are four different claims. This chapter concentrates on identifiable businesses and tells readers which connection applies.",
    findings: [
      {
        heading: "Birthplace versus ownership today",
        paragraphs: [
          "H-E-B, Whataburger, Buc-ee's and Dr Pepper are associated with different chapters of business history. Their founding places and early markets are historical facts; today's ownership, organizational structure and store footprints may change. A brand's Texas roots cannot by themselves establish that it is currently Texas-owned or that everything it sells is made here.",
          "In the accompanying origin-story guides, TexasDefined follows the communities and commercial decisions that shaped each company rather than ranking it by nostalgia. This also prevents a famous brand from receiving a misleading claim of statewide manufacturing."
        ],
        sources: [{ label: "TexasDefined: Texas brand origin stories", url: "/texas-brand-origin-stories" }, { label: "TexasDefined: H-E-B history", url: "/article/heb-texas-grocery-history-culture" }]
      },
      {
        heading: "Retail formats are part of cultural history",
        paragraphs: [
          "A Buc-ee's travel center and an H-E-B grocery are not alike in size or business model. They do, however, show how companies responded to particular Texas patterns: long interstate drives, neighborhood shopping routines and customers who expect regional products. Their value as subjects comes from that relationship to place, not promotional claims about being the 'best.'",
          "Working-class brands such as Dickies and Western bootmakers tell another story, one tied to trades, ranch work, manufacturing history and changing fashion. The place where a brand began and the place where particular goods are now produced should be verified separately."
        ],
        sources: [{ label: "TexasDefined: Buc-ee's origins", url: "/article/bucees-texas-road-trip-history" }, { label: "TexasDefined: Made in Texas classifications", url: "/made-in-texas" }]
      },
      {
        heading: "Editorial inclusion is not an advertisement",
        paragraphs: [
          "This chapter lists identifiable companies and retail institutions with documented Texas ties. Generic leather goods, Texas-shaped souvenirs and pecan candy are cultural or product categories rather than brands; they belong elsewhere in the collection. Topo Chico originated in Mexico and is discussed with Texas food and drink because Texas consumption does not change its birthplace.",
          "The selection is not a ranking, endorsement, sponsorship benefit or claim about a product's present quality. Purchasing decisions should use current product information; historic descriptions alone are not customer reviews."
        ],
        sources: [{ label: "TexasDefined: editorial methodology", url: "/things-unique-to-texas/methodology" }, { label: "TexasDefined: regional foods", url: "/things-unique-to-texas/food-drink" }]
      }
    ]
  },
  "natural-wonders": {
    title: "Four very different ways Texas landscapes were made",
    introduction: "The canyon walls of the Panhandle, ancient Permian reef mountains, limestone Hill Country springs and coastal barrier islands do not share a single origin story. Knowing the geology and ecology makes them more distinctive than generic sightseeing descriptions.",
    findings: [
      {
        heading: "Desert mountains are not just empty country",
        paragraphs: [
          "Big Bend National Park covers 801,163 acres according to the National Park Service. In its desert basins, Chisos Mountain woodlands and Rio Grande canyons, climate and elevation change over relatively short distances. A visitor who sees only a desert panorama misses much of the park's biological range.",
          "Guadalupe Mountains National Park illustrates another West Texas story: exposed remnants of a fossil reef system. The two parks are connected by the Chihuahuan Desert but should not be described as interchangeable mountain scenery."
        ],
        sources: [{ label: "NPS: Big Bend park statistics", url: "https://home.nps.gov/bibe/learn/management/statistics.htm" }, { label: "NPS: Big Bend biodiversity", url: "https://home.nps.gov/im/chdn/bibe.htm" }]
      },
      {
        heading: "Limestone country creates springs and sensitive access",
        paragraphs: [
          "Hamilton Pool, Jacob's Well, Barton Springs and Pedernales Falls are linked through Hill Country limestone, aquifers and flowing water, but their water sources, permitted activities and conservation rules differ. It is unsafe to infer that a swimming location is open merely because water is pictured.",
          "TexasDefined's destination guides handle present-day reservations, closures and water-access notices; this chapter explains the physical landscapes. The responsible county, municipal authority or state park remains the source for conditions on the day of a visit."
        ],
        sources: [{ label: "TPWD: state parks", url: "https://tpwd.texas.gov/state-parks/" }, { label: "TexasDefined: Hamilton Pool Preserve", url: "/destination/hamilton-pool-preserve" }]
      },
      {
        heading: "A barrier island, a cypress wetland and a reservoir are not one type of lake",
        paragraphs: [
          "Padre Island National Seashore protects a long Gulf barrier-island landscape where dunes and tidal waters shape habitat. Caddo Lake, on the Texas-Louisiana border, supports a cypress wetland landscape with entirely different water and vegetation. Lake Travis and Canyon Lake are engineered reservoirs whose water levels and access points reflect water management as well as natural topography.",
          "Caddo Mounds is primarily a Caddo archaeological and historical site, not a natural wonder; San Antonio's River Walk is an engineered urban cultural landscape. Those entries appear in the landmarks chapter so the categories do not suggest that an archaeological site or a built river corridor is an untouched natural formation."
        ],
        sources: [{ label: "NPS: Padre Island National Seashore", url: "https://www.nps.gov/pais/index.htm" }, { label: "TexasDefined: Caddo Mounds", url: "/destination/caddo-mounds-state-historic-site" }]
      }
    ]
  },
  "landmarks": {
    title: "How to evaluate a Texas landmark beyond a photo",
    introduction: "A museum, preserved mission, nineteenth-century hotel, oil discovery site and modern visitor attraction require different historical claims. This chapter distinguishes formally designated properties from places that are culturally recognizable without a special legal designation.",
    findings: [
      {
        heading: "Recorded history and legal designation are separate questions",
        paragraphs: [
          "The Texas Historical Commission's historical marker program commemorates a wide range of people, sites and events, while the National Register of Historic Places recognizes historically significant properties through federal criteria. An interesting old building does not automatically qualify for either designation, and a marker is not the same thing as a National Historic Landmark.",
          "For every specific site with a designation claim, consult the applicable Texas Historical Commission Atlas or National Park Service record. This list includes recognizable landmarks that are not all legally protected or listed in the same way."
        ],
        sources: [{ label: "Texas Historical Commission: historical markers", url: "https://thc.texas.gov/preserve/preservation-programs/historical-markers" }, { label: "Texas Historical Commission: National Register criteria", url: "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places" }]
      },
      {
        heading: "Texas's layered past is visible in its buildings",
        paragraphs: [
          "The Alamo cannot be understood only through the 1836 battle: its mission origins and the Indigenous, Spanish and Mexican histories of San Antonio came first. The San Antonio Missions form a larger cultural landscape, while Presidio La Bahía and Mission Espíritu Santo place Goliad inside a different regional story.",
          "The Texas State Capitol, opened in 1888, connects the state's political institutions to nineteenth-century building technology, granite quarries and land-based financing. Those details explain far more than the building's familiar silhouette."
        ],
        sources: [{ label: "State Preservation Board: Texas Capitol history", url: "https://tspb.texas.gov/prop/tc/tc-history/index.html" }, { label: "NPS: San Antonio Missions", url: "https://www.nps.gov/saan/index.htm" }]
      },
      {
        heading: "Oil, commerce and modern civic memory",
        paragraphs: [
          "Spindletop's Beaumont oil discovery belongs to industrial history; Fair Park's 1930s art-deco ensemble belongs to architecture and exposition history. They answer different questions about how Texas became economically connected to the wider world. A responsible guide gives the event or construction era, the place and why preservation matters.",
          "The San Antonio River Walk is a designed urban corridor, not a spontaneous natural river formation. Caddo Mounds is an important Caddo cultural site, not scenery detached from the people who built and used it. Both belong here with that distinction explicit. Before visiting any landmark, use the site steward's current access rules rather than treating a historic fact as an opening-hours promise."
        ],
        sources: [{ label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/" }, { label: "TexasDefined: Caddo Mounds historic site", url: "/destination/caddo-mounds-state-historic-site" }, { label: "TexasDefined: River Walk guide", url: "/destination/san-antonio-river-walk" }]
      }
    ]
  }
};
