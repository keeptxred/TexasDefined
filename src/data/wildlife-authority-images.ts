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
      alt: 'Ocelot facing the camera in sunlit brush at Laguna Atascosa National Wildlife Refuge',
      caption: 'A color portrait of an ocelot at Laguna Atascosa National Wildlife Refuge.',
      credit: 'Steve Sinclair / USFWS — Public Domain',
      sourceUrl: 'https://www.fws.gov/media/ocelot-2',
    },
    cards: [
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2021-09/3%20week%20old%20celot%20kitten_USFWS.jpeg?itok=9gEcPiSC',
        alt: 'Three-week-old male ocelot kitten found at a den site in South Texas',
        caption: 'A three-week-old male ocelot kitten documented by biologists at Laguna Atascosa National Wildlife Refuge.',
        credit: 'USFWS — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/3-week-old-ocelot-kitten',
      },
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/images/2024-04/tract-341_coastal-prairie-and-occupied-habitat-for-endangered-northern-aplomado-falcons.JPG?itok=3Y-OiBKO',
        alt: 'Coastal prairie habitat at Laguna Atascosa National Wildlife Refuge in South Texas',
        caption: 'Coastal prairie at Laguna Atascosa National Wildlife Refuge, part of the broader South Texas landscape surrounding ocelot habitat.',
        credit: 'USFWS — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/coastal-prairie-laguna-atascosa-national-wildlife-refuge',
      },
      {
        src: 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/images/2009-02/9567.jpg?itok=Gd9j61tk',
        alt: 'Panoramic coastal habitat at Laguna Atascosa National Wildlife Refuge in South Texas',
        caption: 'Laguna Atascosa and Bahia Grande show the refuge-scale habitat restoration work supporting South Texas wildlife.',
        credit: 'Steve Hillebrand / USFWS — Public Domain',
        sourceUrl: 'https://www.fws.gov/media/laguna-atascosa-national-wildlife-refuge',
      },
    ],
  },
};
