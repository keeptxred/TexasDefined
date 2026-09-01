import type { ImageRef } from "./types";

/**
 * Destination-specific hero overrides used to graduate preserved catalog records
 * from the generic staging placeholder without changing their researched copy.
 * Wikimedia Commons `Special:FilePath` URLs resolve to the original media file;
 * credit remains visible with each image reference.
 */
export const destinationHeroOverrides: Record<string, ImageRef> = {
  "jocelyn-nungaray-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Anahuac%20National%20Wildlife%20Refuge%20%285A%29%20Chambers%20Co.%20TX%3B%201%20Dec%202018.jpg",
    alt: "Coastal wetland habitat at Jocelyn Nungaray National Wildlife Refuge, formerly Anahuac National Wildlife Refuge",
    width: 1800,
    height: 900,
    credit: "William L. Farr · Wikimedia Commons",
  },
  "aransas-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aransas%20National%20Wildlife%20Refuge%2C%20Aransas%20County%2C%20Texas%2C%20USA%20%2827%20November%202011%29.jpg",
    alt: "Coastal habitat at Aransas National Wildlife Refuge on the Texas Gulf Coast",
    width: 1800,
    height: 900,
    credit: "William L. Farr · Wikimedia Commons",
  },
  "attwater-prairie-chicken-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Attwater%20Prairie%20Chicken%20National%20Wildlife%20Refuge%20in%20February.jpg",
    alt: "Native coastal prairie at Attwater Prairie Chicken National Wildlife Refuge in Colorado County",
    width: 1800,
    height: 1200,
    credit: "William L. Farr · Wikimedia Commons",
  },
  "balcones-canyonlands-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Balcones-canyonlands-nat-wildlife-refuge.jpg",
    alt: "Limestone hills and wooded canyon landscape at Balcones Canyonlands National Wildlife Refuge",
    width: 4416,
    height: 3312,
    credit: "Matthewrutledge · Public domain · Wikimedia Commons",
  },
  "caddo-lake-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Caddo%20Lake%20National%20Wildlife%20Refuge%2C%20TX%20%285169475023%29.jpg",
    alt: "Wetland and forest habitat at Caddo Lake National Wildlife Refuge in East Texas",
    width: 3968,
    height: 2976,
    credit: "U.S. Fish and Wildlife Service Headquarters · CC BY 2.0 · Wikimedia Commons",
  },
  "hagerman-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hagerman%20NWR%2C%20Harris%20Trail%2C%20Grayson%20Co.%2C%20Texas%2C%20USA.jpg",
    alt: "Harris Trail landscape at Hagerman National Wildlife Refuge in Grayson County",
    width: 1800,
    height: 1200,
    credit: "William L. Farr · Wikimedia Commons",
  },
  "lower-rio-grande-valley-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/El%20Sal%20Del%20Rey.jpg",
    alt: "El Sal del Rey salt lake within Lower Rio Grande Valley National Wildlife Refuge in South Texas",
    width: 4000,
    height: 3000,
    credit: "Loslazos · Wikimedia Commons",
  },
  "neches-river-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Entrance%20Sign%20Neches%20River%20NWR.jpg",
    alt: "Entrance to Neches River National Wildlife Refuge in East Texas",
    width: 2250,
    height: 1500,
    credit: "Wikimedia Commons",
  },
  "san-bernard-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/American%20alligator%20in%20Moccasin%20Pond%2C%20San%20Bernard%20National%20Wildlife%20Refuge.jpg",
    alt: "American alligator in Moccasin Pond at San Bernard National Wildlife Refuge",
    width: 1800,
    height: 1200,
    credit: "William L. Farr · Wikimedia Commons",
  },
  "santa-ana-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Santa%20Ana%20National%20Wildlife%20Refuge.jpg",
    alt: "Wildlife habitat at Santa Ana National Wildlife Refuge in the Lower Rio Grande Valley",
    width: 5760,
    height: 3840,
    credit: "CC BY 2.0 · Wikimedia Commons",
  },
  "texas-point-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Texas%20Point%20National%20Wildlife%20Refuge.jpg",
    alt: "Coastal refuge landscape at Texas Point National Wildlife Refuge near Sabine Pass",
    width: 1200,
    height: 1600,
    credit: "Wikimedia Commons",
  },
  "trinity-river-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Trinity%20River%20National%20Wildlife%20Refuge%2C%20Brierwood%20Unit%2C%20Tanner%20Bayou.jpg",
    alt: "Tanner Bayou in the Brierwood Unit of Trinity River National Wildlife Refuge",
    width: 1800,
    height: 1200,
    credit: "Wikimedia Commons",
  },
  "brazoria-national-wildlife-refuge": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sea%20Of%20Grass%20Near%20Brazoria%20Nwr%20Texas%20%2829566713%29.jpeg",
    alt: "Coastal prairie grassland at Brazoria National Wildlife Refuge on the Texas Gulf Coast",
    width: 2000,
    height: 734,
    credit: "Charles Skip Martin · CC BY 3.0 · Wikimedia Commons",
  },
  "buffalo-lake-national-wildlife-refuge": {
    src: "https://www.fws.gov/sites/default/files/banner_images/2022-01/Buffalo%20Lake%20NWR%20Patrick%20Alexander%20CC.jpg",
    alt: "Shortgrass prairie landscape at Buffalo Lake National Wildlife Refuge in the Texas Panhandle",
    width: 3600,
    height: 2400,
    credit: "Patrick Alexander · Public domain · U.S. Fish and Wildlife Service",
  },
  "laguna-atascosa-national-wildlife-refuge": {
    src: "https://www.fws.gov/sites/default/files/images/2009-02/9567.jpg",
    alt: "Panoramic coastal wetland habitat at Laguna Atascosa National Wildlife Refuge in South Texas",
    width: 4064,
    height: 2704,
    credit: "Steve Hillebrand/USFWS · Public domain",
  },
  "mcfaddin-national-wildlife-refuge": {
    src: "https://www.fws.gov/sites/default/files/2021-06/RESILIENCE-McFaddin-Refuge-TX-after-Hurricane-Harvey-2017-%28USFWS%29.jpg",
    alt: "Coastal wetland landscape at McFaddin National Wildlife Refuge on the upper Texas coast",
    width: 1280,
    height: 959,
    credit: "USFWS · Public domain",
  },
  "muleshoe-national-wildlife-refuge": {
    src: "https://www.fws.gov/sites/default/files/images/2024-03-1/642.jpg",
    alt: "Prairie and playa landscape at Muleshoe National Wildlife Refuge on the Southern High Plains",
    width: 1200,
    height: 857,
    credit: "Wyman Meinzer · Public domain · U.S. Fish and Wildlife Service",
  },
};
