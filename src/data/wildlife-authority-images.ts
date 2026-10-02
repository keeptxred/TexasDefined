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
      alt: 'Ocelot facing the camera in brush at Laguna Atascosa National Wildlife Refuge',
      caption: 'Ocelot photographed for a Laguna Atascosa National Wildlife Refuge education program.',
      credit: 'Steve Sinclair / USFWS — Public Domain',
      sourceUrl: 'https://www.fws.gov/media/ocelot-2',
    },
    cards: [
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2021-09/Ocelot%20kitten_remote%20camera.jpeg?itok=i0LMRL2X',
        alt: 'Ocelot kitten captured by a remote wildlife camera in dense South Texas vegetation',
        caption: 'A remote camera recorded this ocelot kitten at Laguna Atascosa National Wildlife Refuge.',
        credit: 'USFWS — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/ocelot-kitten',
      },
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2021-09/Ocelot%20with%20kittens_remote%20camera.jpeg?itok=PRgo8NUb',
        alt: 'Adult ocelot with two kittens photographed at night by a remote camera in South Texas',
        caption: 'Mother ocelot and kittens on the Yturria Conservation Easement in South Texas.',
        credit: 'USFWS — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/ocelot-kittens',
      },
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2022-03/ocelot-underpass-usfws-txdot-1.jpg?itok=47EJyS3Z',
        alt: 'Ocelot using a wildlife underpass beneath a roadway in South Texas',
        caption: 'Wildlife crossings help reduce road mortality and reconnect fragmented ocelot habitat.',
        credit: 'USFWS / TxDOT — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/ocelot-underpass-usfws-txdot-1jpg',
      },
    ],
  },
};
