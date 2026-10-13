// Only exact lake recreation destinations with an independently established relation.
// Do not infer affiliation from a park's name or a shared city alone.
export const DESTINATION_LAKE_GUIDE_LINKS: Record<string, { slug: string; name: string }> = {
  "caddo-lake-state-park": {
    "slug": "caddo-lake",
    "name": "Caddo Lake"
  },
  "lake-bob-sandlin-state-park": {
    "slug": "lake-bob-sandlin",
    "name": "Lake Bob Sandlin"
  },
  "lake-brownwood-state-park": {
    "slug": "lake-brownwood",
    "name": "Lake Brownwood"
  },
  "lake-corpus-christi-state-park": {
    "slug": "lake-corpus-christi",
    "name": "Lake Corpus Christi"
  },
  "lake-livingston-state-park": {
    "slug": "lake-livingston",
    "name": "Lake Livingston"
  },
  "lake-mineral-wells-state-park": {
    "slug": "lake-mineral-wells",
    "name": "Lake Mineral Wells"
  },
  "lake-somerville-birch-creek-unit": {
    "slug": "lake-somerville",
    "name": "Lake Somerville"
  },
  "lake-somerville-nails-creek-unit": {
    "slug": "lake-somerville",
    "name": "Lake Somerville"
  },
  "lake-tawakoni-state-park": {
    "slug": "lake-tawakoni",
    "name": "Lake Tawakoni"
  },
  "lake-whitney-state-park": {
    "slug": "lake-whitney",
    "name": "Lake Whitney"
  },
  "possum-kingdom-state-park": {
    "slug": "possum-kingdom-reservoir",
    "name": "Possum Kingdom Reservoir"
  },
  "ray-roberts-lake-isle-du-bois-unit": {
    "slug": "ray-roberts-lake",
    "name": "Ray Roberts Lake"
  },
  "ray-roberts-lake-johnson-branch-unit": {
    "slug": "ray-roberts-lake",
    "name": "Ray Roberts Lake"
  },
  "amistad-national-recreation-area": {
    "slug": "amistad-reservoir",
    "name": "Amistad Reservoir"
  },
  "lake-meredith-national-recreation-area": {
    "slug": "lake-meredith",
    "name": "Lake Meredith"
  },
  "cedar-hill-state-park": {
    "slug": "joe-pool-lake",
    "name": "Joe Pool Lake"
  },
  "eisenhower-state-park": {
    "slug": "lake-texoma",
    "name": "Lake Texoma"
  },
  "choke-canyon-state-park": {
    "slug": "choke-canyon-reservoir",
    "name": "Choke Canyon Reservoir"
  },
  "falcon-state-park": {
    "slug": "falcon-international-reservoir",
    "name": "Falcon International Reservoir"
  },
  "lake-arrowhead-state-park": {
    "slug": "lake-arrowhead",
    "name": "Lake Arrowhead"
  },
  "lake-casa-blanca-international-state-park": {
    "slug": "lake-casa-blanca",
    "name": "Lake Casa Blanca"
  },
  "lake-colorado-city-state-park": {
    "slug": "lake-colorado-city",
    "name": "Lake Colorado City"
  }
}; 
export const LAKE_VISITOR_DESTINATIONS: Record<string, {slug:string; label:string}[]> = {
  "caddo-lake": [
    {
      "slug": "caddo-lake-state-park",
      "label": "Caddo Lake State Park"
    }
  ],
  "lake-bob-sandlin": [
    {
      "slug": "lake-bob-sandlin-state-park",
      "label": "Lake Bob Sandlin State Park"
    }
  ],
  "lake-brownwood": [
    {
      "slug": "lake-brownwood-state-park",
      "label": "Lake Brownwood State Park"
    }
  ],
  "lake-corpus-christi": [
    {
      "slug": "lake-corpus-christi-state-park",
      "label": "Lake Corpus Christi State Park"
    }
  ],
  "lake-livingston": [
    {
      "slug": "lake-livingston-state-park",
      "label": "Lake Livingston State Park"
    }
  ],
  "lake-mineral-wells": [
    {
      "slug": "lake-mineral-wells-state-park",
      "label": "Lake Mineral Wells State Park"
    }
  ],
  "lake-somerville": [
    {
      "slug": "lake-somerville-birch-creek-unit",
      "label": "Lake Somerville Birch Creek Unit"
    },
    {
      "slug": "lake-somerville-nails-creek-unit",
      "label": "Lake Somerville Nails Creek Unit"
    }
  ],
  "lake-tawakoni": [
    {
      "slug": "lake-tawakoni-state-park",
      "label": "Lake Tawakoni State Park"
    }
  ],
  "lake-whitney": [
    {
      "slug": "lake-whitney-state-park",
      "label": "Lake Whitney State Park"
    }
  ],
  "possum-kingdom-reservoir": [
    {
      "slug": "possum-kingdom-state-park",
      "label": "Possum Kingdom State Park"
    }
  ],
  "ray-roberts-lake": [
    {
      "slug": "ray-roberts-lake-isle-du-bois-unit",
      "label": "Ray Roberts Lake Isle du Bois Unit"
    },
    {
      "slug": "ray-roberts-lake-johnson-branch-unit",
      "label": "Ray Roberts Lake Johnson Branch Unit"
    }
  ],
  "amistad-reservoir": [
    {
      "slug": "amistad-national-recreation-area",
      "label": "Amistad National Recreation Area"
    }
  ],
  "lake-meredith": [
    {
      "slug": "lake-meredith-national-recreation-area",
      "label": "Lake Meredith National Recreation Area"
    }
  ],
  "joe-pool-lake": [
    {
      "slug": "cedar-hill-state-park",
      "label": "Cedar Hill State Park"
    }
  ],
  "lake-texoma": [
    {
      "slug": "eisenhower-state-park",
      "label": "Eisenhower State Park"
    }
  ],
  "choke-canyon-reservoir": [
    {
      "slug": "choke-canyon-state-park",
      "label": "Choke Canyon State Park"
    }
  ],
  "falcon-international-reservoir": [
    {
      "slug": "falcon-state-park",
      "label": "Falcon State Park"
    }
  ],
  "lake-arrowhead": [
    {
      "slug": "lake-arrowhead-state-park",
      "label": "Lake Arrowhead State Park"
    }
  ],
  "lake-casa-blanca": [
    {
      "slug": "lake-casa-blanca-international-state-park",
      "label": "Lake Casa Blanca International State Park"
    }
  ],
  "lake-colorado-city": [
    {
      "slug": "lake-colorado-city-state-park",
      "label": "Lake Colorado City State Park"
    }
  ]
};
