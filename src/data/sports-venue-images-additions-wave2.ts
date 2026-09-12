import type { SportsVenuePhoto } from './sports-venue-images';

export const sportsVenuePhotoAdditionsWave2: Record<string, SportsVenuePhoto> = {
  'extraco-events-center': {
    slug: 'extraco-events-center',
    alt: "Extraco Events Center in Waco, photographed while the venue was named Heart O' Texas Coliseum",
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Heart_O%27_Texas_Coliseum-cropped.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Heart_O%27_Texas_Coliseum-cropped.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'HuecoBear',
    licenseName: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    width: 1600,
    height: 780,
  },
  'jamail-texas-swimming-center': {
    slug: 'jamail-texas-swimming-center',
    alt: 'Lee and Joe Jamail Texas Swimming Center at the University of Texas at Austin',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jamailswim.jpg?width=1023',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Jamailswim.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'Enoch Lai',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    width: 1023,
    height: 685,
  },
  'eagles-canyon-raceway': {
    slug: 'eagles-canyon-raceway',
    alt: 'Aerial orthophoto of Eagles Canyon Raceway in Decatur, Texas',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Eagles_Canyon_Raceway_orthophoto_20220710.jpg?width=1600',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Eagles_Canyon_Raceway_orthophoto_20220710.jpg',
    sourceName: 'Wikimedia Commons',
    author: 'United States Geological Survey',
    licenseName: 'Public domain',
    licenseUrl: 'https://commons.wikimedia.org/wiki/Commons:Public_domain',
    width: 1600,
    height: 1382,
  },
  'freeman-coliseum': {
    slug: 'freeman-coliseum',
    alt: 'San Antonio Stock Show and Rodeo activity on the grounds of Freeman Coliseum in San Antonio',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Carnival_scene_outside_the_San_Antonio_Stock_Show_and_Rodeo_on_the_grounds_of_the_Freeman_Coliseum,_San_Antonio,_Texas_LCCN2014631343.tif?width=1200',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Carnival_scene_outside_the_San_Antonio_Stock_Show_and_Rodeo_on_the_grounds_of_the_Freeman_Coliseum,_San_Antonio,_Texas_LCCN2014631343.tif',
    sourceName: 'Wikimedia Commons',
    author: 'Carol M. Highsmith',
    licenseName: 'Public domain',
    licenseUrl: 'https://commons.wikimedia.org/wiki/Commons:Public_domain',
    width: 991,
    height: 1200,
  },
};

export function getSportsVenuePhotoAdditionWave2(slug: string) {
  return sportsVenuePhotoAdditionsWave2[slug];
}
