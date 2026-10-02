export type WildlifeImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
};

export type WildlifeImageSet = {
  hero: WildlifeImage;
  cards: [WildlifeImage, WildlifeImage, WildlifeImage];
};

export const WILDLIFE_AUTHORITY_IMAGES: Record<string, WildlifeImageSet> = {
  ocelot: {
    hero: {
      src: 'https://cdn.pixabay.com/photo/2015/02/08/03/14/ocelot-628109_1280.jpg',
      alt: 'Color close-up of an ocelot resting and facing the camera',
      caption: 'Ocelot portrait showing the species’ distinctive rosettes, facial stripes and spotted coat.',
      credit: 'LucasFZ70 / Pixabay',
      sourceUrl: 'https://pixabay.com/photos/ocelot-animal-ounce-zoo-628109/',
    },
    cards: [
      {
        src: 'https://cdn.pixabay.com/photo/2016/02/14/20/35/ocelot-1200175_1280.jpg',
        alt: 'Color photograph of an ocelot lying on grass',
        caption: 'A full-color view of an ocelot at rest, useful for seeing the body pattern and proportions.',
        credit: 'joelfotos / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/ocelot-feline-animal-wild-1200175/',
      },
      {
        src: 'https://cdn.pixabay.com/photo/2018/10/18/09/13/costa-rica-3755840_1280.jpg',
        alt: 'Color photograph of an ocelot in tropical vegetation in Costa Rica',
        caption: 'An ocelot photographed in Costa Rica; the image highlights the cat’s coat pattern and camouflage rather than Texas range.',
        credit: 'gabi_mai_fuwa / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/costa-rica-ocelot-la-catarata-3755840/',
      },
      {
        src: 'https://cdn.pixabay.com/photo/2014/06/27/22/48/ocelot-378555_1280.jpg',
        alt: 'Color close-up photograph of an ocelot',
        caption: 'Close-up ocelot portrait showing the dark facial markings and spotted golden coat.',
        credit: 'PFG60 / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/ocelot-feline-378555/',
      },
    ],
  },
};
