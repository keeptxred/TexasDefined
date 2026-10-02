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
      src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/images/2024-10/ocelot_steve-sinclair.JPG?itok=UWArY5_u',
      alt: 'Color portrait of an ocelot facing the camera at Laguna Atascosa National Wildlife Refuge',
      caption: 'A close look at the ocelot’s facial stripes, rosettes and golden coat. This USFWS image was made at Laguna Atascosa National Wildlife Refuge for an education program.',
      credit: 'Steve Sinclair / USFWS — public domain',
      sourceUrl: 'https://www.fws.gov/media/ocelot-2',
    },
    cards: [
      {
        src: 'https://cdn.pixabay.com/photo/2016/02/14/20/35/ocelot-1200175_1280.jpg',
        alt: 'Color photograph of an ocelot lying on grass',
        caption: 'Identification: this side view makes the chain-like rosettes, body proportions and long ringed tail easier to study.',
        credit: 'joelfotos / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/ocelot-feline-animal-wild-1200175/',
      },
      {
        src: 'https://cdn.pixabay.com/photo/2018/10/18/09/13/costa-rica-3755840_1280.jpg',
        alt: 'Color photograph of an ocelot moving through dense vegetation in Costa Rica',
        caption: 'Habitat context: dense vegetation shows how an ocelot’s spotted coat breaks up its outline in heavy cover. This photograph is from Costa Rica, not Texas.',
        credit: 'gabi_mai_fuwa / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/costa-rica-ocelot-la-catarata-3755840/',
      },
      {
        src: 'https://cdn.pixabay.com/photo/2014/06/27/22/48/ocelot-378555_1280.jpg',
        alt: 'Color close-up photograph of an ocelot',
        caption: 'Markings: the dark cheek stripes, eye lines and spotted golden coat are among the features that distinguish an ocelot from Texas bobcats.',
        credit: 'PFG60 / Pixabay',
        sourceUrl: 'https://pixabay.com/photos/ocelot-feline-378555/',
      },
    ],
  },
};
