export type CitySocialImage = {
  src: string;
  alt: string;
};

const CITY_SOCIAL_IMAGES: Readonly<Record<string, CitySocialImage>> = import.meta.env.SSR ? {
  houston: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_texas_usa_skyline.jpg?width=1600', alt: 'Houston skyline viewed across the city' },
  dallas: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Texas_Skyline.jpg?width=1600', alt: 'Dallas skyline viewed across the Trinity River corridor' },
  'fort-worth': { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1600', alt: 'Entrance sign and historic buildings in the Fort Worth Stockyards' },
  austin: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Austin%2C_TX_skyline_2026.jpg?width=1600', alt: 'Austin skyline in 2026' },
  'san-antonio': { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/San_Antonio_Skyline_2026.jpg?width=1600', alt: 'San Antonio skyline in 2026' },
  'el-paso': { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/El_Paso_skyline.jpg?width=1600', alt: 'El Paso skyline beneath the Franklin Mountains' },
  arlington: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arlington_Texas_Entertainment_District.jpg?width=1600', alt: 'Arlington entertainment district in Texas' },
  hurst: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cityhallathurst.jpg?width=1600', alt: 'Hurst City Hall in Hurst, Texas' },
  'corpus-christi': { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Corpus_Christi_skyline.jpg?width=1600', alt: 'Corpus Christi skyline and waterfront' },
  plano: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hdr_plano.jpg?width=1600', alt: 'Historic downtown Plano streetscape' },
  lubbock: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lubbock%2C_Texas_skyline.jpg?width=1600', alt: 'Lubbock skyline on the South Plains' },
} : {};

export function getCitySocialImage(slug: string): CitySocialImage | undefined {
  return CITY_SOCIAL_IMAGES[slug];
}
