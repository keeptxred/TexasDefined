export type WeddingVenueLicensedImage = {
  src: string;
  sourceUrl: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  creator: string;
  credit: string;
  license: string;
  licenseUrl: string;
  verifiedAt: string;
  actualLocation: true;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const verifiedAt = '2026-09-05';

/**
 * Item-level image rights registry for TexasDefined wedding-venue profiles.
 *
 * Rules:
 * - Every entry must depict the named venue/location itself.
 * - Every entry must have an item-level commercial-reuse license or public-domain dedication.
 * - Search-result thumbnails, business-directory photos and social-media images are never sufficient evidence.
 * - sourceUrl must point to the page where the creator/license can be independently checked.
 */
export const WEDDING_VENUE_LICENSED_IMAGES: Readonly<Record<string, WeddingVenueLicensedImage>> = {
  'laguna-gloria': {
    src: commons('AMOA-Laguna Gloria.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:AMOA-Laguna_Gloria.jpg',
    alt: 'Facade of Laguna Gloria in Austin, Texas',
    caption: 'The historic Laguna Gloria facade in Austin.',
    width: 2368,
    height: 1891,
    creator: 'Matthew Fuller',
    credit: 'Matthew Fuller · Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'the-dallas-arboretum': {
    src: commons('Dallas Arboretum and Botanical Garden September 2017 10 (Paseo de Flores).jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dallas_Arboretum_and_Botanical_Garden_September_2017_10_(Paseo_de_Flores).jpg',
    alt: 'Paseo de Flores at the Dallas Arboretum and Botanical Garden in Dallas, Texas',
    caption: 'Paseo de Flores at the Dallas Arboretum and Botanical Garden.',
    width: 6000,
    height: 4000,
    creator: 'Michael Barera',
    credit: 'Michael Barera · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'perot-museum-of-nature-and-science': {
    src: commons('Perot Museum of Nature and Science 01.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Perot_Museum_of_Nature_and_Science_01.jpg',
    alt: 'Perot Museum of Nature and Science in Dallas, Texas',
    caption: 'The Perot Museum of Nature and Science in Dallas.',
    width: 2848,
    height: 4288,
    creator: 'Joe Mabel',
    credit: 'Joe Mabel · Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'the-adolphus-hotel': {
    src: commons('Adolphus Hotel, Dallas, Texas.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Adolphus_Hotel,_Dallas,_Texas.jpg',
    alt: 'Reception area inside The Adolphus Hotel in Dallas, Texas',
    caption: 'Reception area inside The Adolphus Hotel in Dallas.',
    width: 2933,
    height: 3911,
    creator: 'The44thEditor',
    credit: 'The44thEditor · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'texas-discovery-gardens': {
    src: commons('Texas Discovery Gardens August 2016 03.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Texas_Discovery_Gardens_August_2016_03.jpg',
    alt: 'Texas Discovery Gardens at Fair Park in Dallas, Texas',
    caption: 'Texas Discovery Gardens at Fair Park in Dallas.',
    width: 6000,
    height: 4000,
    creator: 'Michael Barera',
    credit: 'Michael Barera · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'fort-worth-botanic-garden': {
    src: commons('Fort Worth Botanic Garden October 2019 26 (Victor and Cleyone Tinsley Rock Springs Garden).jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Worth_Botanic_Garden_October_2019_26_(Victor_and_Cleyone_Tinsley_Rock_Springs_Garden).jpg',
    alt: 'Victor and Cleyone Tinsley Rock Springs Garden at the Fort Worth Botanic Garden in Fort Worth, Texas',
    caption: 'Victor and Cleyone Tinsley Rock Springs Garden at the Fort Worth Botanic Garden.',
    width: 6000,
    height: 4000,
    creator: 'Michael Barera',
    credit: 'Michael Barera · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'george-r-brown-convention-center': {
    src: commons('George R. Brown Convention Center.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:George_R._Brown_Convention_Center.jpg',
    alt: 'George R. Brown Convention Center in Houston, Texas',
    caption: 'George R. Brown Convention Center in downtown Houston.',
    width: 1075,
    height: 900,
    creator: 'BrianReading',
    credit: 'BrianReading · Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'hotel-galvez': {
    src: commons('Hotel Galvez, Galveston, Texas.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hotel_Galvez,_Galveston,_Texas.jpg',
    alt: 'Historic Hotel Galvez in Galveston, Texas',
    caption: 'Historic view of Hotel Galvez in Galveston.',
    width: 748,
    height: 471,
    creator: 'Seawall Specialty Co.',
    credit: 'Seawall Specialty Co. · University of Houston Libraries · Wikimedia Commons',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    verifiedAt,
    actualLocation: true,
  },
  'the-bryan-museum': {
    src: commons('Galveston Texas - The Bryan Museum - January 2025 - 1.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg',
    alt: 'The Bryan Museum in Galveston, Texas',
    caption: 'The Bryan Museum in Galveston.',
    width: 5367,
    height: 3354,
    creator: 'Alexander Hatley',
    credit: 'Alexander Hatley · Wikimedia Commons',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    verifiedAt,
    actualLocation: true,
  },
  'julia-ideson-library': {
    src: commons('Houston Public Library Julia Ideson Building.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Houston_Public_Library_Julia_Ideson_Building.jpg',
    alt: 'Julia Ideson Building of the Houston Public Library in Houston, Texas',
    caption: 'The historic Julia Ideson Building of the Houston Public Library.',
    width: 3572,
    height: 2299,
    creator: 'Jim Evans',
    credit: 'Jim Evans · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'witte-museum': {
    src: commons('Entrance to Witte Museum, San Antonio, TX IMG 3113.JPG'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Entrance_to_Witte_Museum,_San_Antonio,_TX_IMG_3113.JPG',
    alt: 'Entrance to the Witte Museum in San Antonio, Texas',
    caption: 'Entrance to the Witte Museum in San Antonio.',
    width: 4320,
    height: 3240,
    creator: 'Billy Hathorn',
    credit: 'Billy Hathorn · Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'the-mcnay-art-museum': {
    src: commons('McNayArtMuseum.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:McNayArtMuseum.jpg',
    alt: 'McNay Art Museum in San Antonio, Texas',
    caption: 'The McNay Art Museum in San Antonio.',
    width: 1600,
    height: 1200,
    creator: 'Csyberblue',
    credit: 'Csyberblue · Wikimedia Commons',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    verifiedAt,
    actualLocation: true,
  },
  'san-antonio-botanical-garden': {
    src: commons('Entrance to San Antonio Botanical Garden, TX IMG 5308.JPG'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Entrance_to_San_Antonio_Botanical_Garden,_TX_IMG_5308.JPG',
    alt: 'Entrance to the San Antonio Botanical Garden in San Antonio, Texas',
    caption: 'Entrance to the San Antonio Botanical Garden.',
    width: 4272,
    height: 2848,
    creator: 'Billy Hathorn',
    credit: 'Billy Hathorn · Wikimedia Commons',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    verifiedAt,
    actualLocation: true,
  },
  'hotel-emma': {
    src: commons('Hotel-Emma-Exterior.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hotel-Emma-Exterior.jpg',
    alt: 'Exterior of Hotel Emma from the San Antonio River Walk',
    caption: 'Hotel Emma viewed from the San Antonio River Walk.',
    width: 5432,
    height: 3622,
    creator: 'Sarahstrunk',
    credit: 'Sarahstrunk · Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'gage-hotel': {
    src: commons('Marathon - Gage Hotel.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Marathon_-_Gage_Hotel.jpg',
    alt: 'Front entrance of the Gage Hotel in Marathon, Texas',
    caption: 'Front entrance of the Gage Hotel in Marathon.',
    width: 4019,
    height: 5096,
    creator: 'P. Hughes',
    credit: 'P. Hughes · Wikimedia Commons',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    verifiedAt,
    actualLocation: true,
  },
  'llano-estacado-winery': {
    src: commons('Wine stored in barrels at Llano Estacado Winery, Lubbock, Texas. (24490539663).jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wine_stored_in_barrels_at_Llano_Estacado_Winery,_Lubbock,_Texas._(24490539663).jpg',
    alt: 'Wine barrels stored inside Llano Estacado Winery near Lubbock, Texas',
    caption: 'Wine barrels inside Llano Estacado Winery.',
    width: 4209,
    height: 2801,
    creator: 'USDA NRCS Texas',
    credit: 'USDA NRCS Texas · Wikimedia Commons',
    license: 'Public domain / CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    verifiedAt,
    actualLocation: true,
  },
};

export function weddingVenueLicensedImage(slug: string): WeddingVenueLicensedImage | undefined {
  return WEDDING_VENUE_LICENSED_IMAGES[slug];
}

export const WEDDING_VENUE_LICENSED_IMAGE_COUNT = Object.keys(WEDDING_VENUE_LICENSED_IMAGES).length;
