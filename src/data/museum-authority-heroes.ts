import type { Destination } from "./types";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";

/** Lightweight exact-site photo sources. Never bundle long museum research dossiers in core destination discovery. */
export const museumLicensedHeroes: Record<string, Destination["hero"]> = {
  "texas-country-music-hall-of-fame-carthage": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Country_Music_Hall_of_Fame_and_Tex_Ritter_Museum_IMG_2956.JPG?width=1600",
    alt: "Texas Country Music Hall of Fame and Tex Ritter Museum building in Carthage, photographed May 20, 2011",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · 20 May 2011 · CC BY-SA 3.0 · Wikimedia Commons · Texas Country Music Hall of Fame and Tex Ritter Museum IMG 2956.JPG"
  },
  "bryan-museum-galveston": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg?width=1600",
    alt: "The Bryan Museum in Galveston, photographed January 2025 in the historic former Galveston Orphans Home building",
    width: 1600, height: 1000,
    credit: "Alexander Hatley · 5 January 2025 · CC BY 2.0 · Wikimedia Commons · Galveston Texas - The Bryan Museum - January 2025 - 1.jpg"
  },
  "east-texas-oil-museum-kilgore": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/East_Texas_Oil_Museum_building,_Kilgore,_TX_IMG_5900.JPG?width=1600",
    alt: "East Texas Oil Museum exterior and oil-derrick structure on the Kilgore College campus, photographed in 2012",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · 24 October 2012 · CC BY-SA 3.0 · Wikimedia Commons · East Texas Oil Museum building, Kilgore, TX IMG 5900.JPG",
  },
  "alvin-historical-museum": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Former_alvin_tx_post_office.jpg?width=1600",
    alt: "The former 1940 U.S. Post Office building at 300 West Sealy Street in Alvin, Texas, now home of Alvin Historical Museum, photographed May 12, 2015",
    width: 1600, height: 1067,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Former alvin tx post office.jpg · 2015 museum-building exterior",
  },
  "museum-of-the-american-railroad-frisco": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Frisco_June_2019_28_%28Museum_of_the_American_Railroad%29.jpg?width=1600",
    alt: "Full-size historic locomotives displayed at the Museum of the American Railroad in Frisco, Texas, photographed on June 14, 2019",
    width: 1600, height: 1067,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · File:Frisco June 2019 28 (Museum of the American Railroad).jpg · 2019 on-site view",
  },
  "the-history-center-diboll": {
    // The History Center collection item (1994:004) depicts the historic
    // Diboll–Lufkin lumber railroad. Genuine 1500px archive original, not an
    // upscaled version of the previously used 660px sawmill scan.
    src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Texas_South-Eastern_Railroad_Engine_4.jpg",
    alt: "Archival 1907 Texas South-Eastern Railroad steam locomotive hauling pine logs; a photograph from The History Center's Diboll lumber-industry collection, not the present-day museum building",
    width: 1500, height: 1137,
    credit: "J. D. Cress · American Lumberman, 1907 · The History Center, Diboll / UNT Portal, collection 1994:004 · US public domain · Wikimedia Commons · File:Texas South-Eastern Railroad Engine 4.jpg · archival railroad photo, not museum exterior",
  },
  "the-agricultural-museum-arts-center-boerne": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boerne_ag_museum_2013.jpg?width=1600",
    alt: "Antique farm equipment on display at the AgriCultural Museum in Boerne, Texas, photographed in 2013",
    width: 1600, height: 1067,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Boerne ag museum 2013.jpg",
  },
  "crow-museum-asian-art-dallas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Crow_Museum_of_Asian_Art.jpg?width=1600",
    alt: "Entrance of the Crow Museum of Asian Art at the Dallas Arts District photographed in 2022",
    width: 1600, height: 1200,
    credit: "LittleT889 · CC BY-SA 4.0 · Wikimedia Commons · File:Crow Museum of Asian Art.jpg",
  },
  "bell-county-museum-belton": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Carnegie%20Museum%20in%20Belton%2C%20TX%20IMG%202412.JPG?width=1600",
    alt: "Exterior of the historic Carnegie Library building housing Bell County Museum in downtown Belton",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · 2009",
  },
  "brenham-heritage-museum": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brenham%20Heritage%20Museum.jpg?width=1600",
    alt: "Historic former federal post office now housing Brenham Heritage Museum in downtown Brenham",
    width: 1600, height: 1128,
    credit: "Jim Evans · CC BY-SA 4.0 · Wikimedia Commons · 2014",
  },
  "audie-murphy-american-cotton-museum-greenville": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audie%20Murphy%20American%20Cotton%20Museum%20July%202015%2052%20(Audie%20Murphy%20Hunt%20County%20War%20Memorial).jpg?width=1600",
    alt: "Audie Murphy and Hunt County War Memorial on the grounds of the Audie Murphy American Cotton Museum in Greenville, photographed in 2015",
    width: 1600, height: 1067,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · historic exterior grounds view",
  },
  "brazos-valley-museum-natural-history-bryan": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazos%20valley%20museum%20of%20natural%20history.jpg?width=1600",
    alt: "Exterior of the Brazos Valley Museum of Natural History in Bryan, Texas",
    width: 1600, height: 987,
    credit: "Larry D. Moore · CC BY-SA 3.0 · Wikimedia Commons · original museum-specific image",
  },
  "czech-heritage-museum-genealogy-center-temple": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Czech%20dolls%2C%20including%20some%20donated%20by%20the%20Czech%20embassy%20in%20Washington%2C%20D.C.%2C%20displayed%20at%20the%20Czech%20Heritage%20Museum%20%26%20Genealogy%20Center%20in%20Temple%2C%20Texas%20LCCN2014633953.tif?width=1600",
    alt: "Czech traditional dolls displayed at the Czech Heritage Museum and Genealogy Center in Temple, photographed in 2014; historic exhibit image",
    width: 1600, height: 1067,
    credit: "Carol M. Highsmith · Library of Congress Carol Highsmith Collection · no known restrictions; historic exhibit photo",
  },
  "buffalo-soldiers-national-museum-houston": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Buffalo%20Soldiers%20National%20Museum%20entrance.jpg?width=1600",
    alt: "Exterior of the former Houston Light Guard Armory housing Buffalo Soldiers National Museum in 2024; museum currently closed for renovations",
    width: 1600, height: 1067,
    credit: "Kenneth C. Zirkel · CC BY 4.0 · Wikimedia Commons · museum entrance photographed February 2024, before renovation closure",
  },
  "texas-prison-museum-huntsville": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/TexasPrisonMuseum.JPG?width=1600",
    alt: "Texas Prison Museum building in Huntsville, Texas, in a historic public-domain photo",
    width: 1600, height: 1200,
    credit: "WhisperToMe · public domain · Wikimedia Commons · Texas Prison Museum building photographed 2010",
  },
  "eisenhower-birthplace": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Denison%20July%202016%2016%20(Eisenhower%20Birthplace%20State%20Historic%20Site).jpg?width=1600",
    alt: "Restored two-story white-frame Eisenhower birthplace house in Denison, Texas, photographed in 2016",
    width: 1600, height: 1125,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · actual Eisenhower birthplace in Denison, 2016",
  },
  "1919-san-augustine-county-jail-museum": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/San_augustine_county_tx_former_jail.jpg?width=1600",
    alt: "Exterior of the restored 1919 San Augustine County Jail building in San Augustine, Texas, photographed in April 2015",
    width: 1600, height: 1067,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:San augustine county tx former jail.jpg",
  },
  "port-isabel-historical-museum": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Part_of_an_elaborate_%22fish_mural,%22_painted_in_1906_by_a_local_(reputedly_one-armed)_fisherman_on_the_acade_of_the_Champion_Building,_Port_Isabel,_Texas_LCCN2014630503.tif?width=1200",
    alt: "Fish mural across the historic 1899 Charles Champion Building facade, home of the Port Isabel Historical Museum, photographed in 2014",
    width: 1200, height: 443,
    credit: "Carol M. Highsmith · 2014 · Library of Congress, Lyda Hill Texas Collection · LC-DIG-highsm-26303 · no known restrictions on publication",
  },

  "museum-of-the-big-bend-alpine": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Museum_of_the_Big_Bend_%28Alpine%2C_Texas%29.jpg?width=1600",
    alt: "Museum of the Big Bend building and landscape on the Sul Ross State University campus in Alpine",
    width: 1600, height: 1198,
    credit: "Seth Tisue · CC BY-SA 2.0 · Wikimedia Commons · File:Museum of the Big Bend (Alpine, Texas).jpg",
  },
  "panhandle-plains-historical-museum-canyon": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Panhandle-Plains_Historical_Museum_in_Canyon_Texas_USA.jpg?width=1280",
    alt: "Historic Panhandle-Plains Historical Museum stone building in Canyon, Texas",
    width: 1280, height: 960,
    credit: "Who What Where Nguyen Why · Public domain · Wikimedia Commons · 2006",
  },
  "texas-maritime-museum-rockport": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Maritime_Museum_Rockport_Texas_2024.jpg?width=1600",
    alt: "Texas Maritime Museum exterior in Rockport, Texas, photographed in 2024",
    width: 1600, height: 1066,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Texas Maritime Museum Rockport Texas 2024.jpg",
  },
  "texas-energy-museum-beaumont": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Energy_Museum%2C_front_entrance.jpg?width=1600",
    alt: "Front entrance of the Texas Energy Museum in downtown Beaumont",
    width: 1600, height: 901,
    credit: "JJonahJackalope · CC BY-SA 4.0 · Wikimedia Commons · File:Texas Energy Museum, front entrance.jpg",
  },
  "1940-air-terminal-museum-houston": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1940sAirTerminalMuseumHobby.JPG?width=1600",
    alt: "Historic 1940 Air Terminal Museum building at Houston Hobby Airport, with the Art Deco terminal exterior",
    width: 1600, height: 1200,
    credit: "WhisperToMe · CC0 1.0 · Wikimedia Commons · File:1940sAirTerminalMuseumHobby.JPG",
  },
  "african-american-museum-dallas-fair-park": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/African_American_Museum_August_2016_03.jpg?width=1600",
    alt: "Exterior of the African American Museum at Fair Park in Dallas, photographed in 2016",
    width: 1600, height: 1067,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · File:African American Museum August 2016 03.jpg",
  },
  "texas-forestry-museum-lufkin": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Forestry_Museum%2C_Lufkin%2C_TX_IMG_8594.JPG?width=1600",
    alt: "The Texas Forestry Museum building in Lufkin, Texas",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · File:Texas Forestry Museum, Lufkin, TX IMG 8594.JPG",
  },

  "babe-didrikson-zaharias-museum-beaumont": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zaharias_museum.jpg?width=1280",
    alt: "Circular Babe Didrikson Zaharias Museum and Visitor Center building in Beaumont, photographed in 2007",
    width: 1280, height: 1066,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Zaharias museum.jpg (2007)",
  },
  "20th-century-technology-museum-wharton": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wharton_County_Museum_IMG_1054.JPG?width=1600",
    alt: "Wharton County Historical Museum building, shared with the 20th Century Technology Museum",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · File:Wharton County Museum IMG 1054.JPG",
  },

  "elisabet-ney-museum-austin": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Austin_-_Elisabet_Ney_Museum_-_20201006000619.jpg?width=1600",
    alt: "Historic limestone Formosa studio and Elisabet Ney Museum in Austin, photographed in October 2020",
    width: 1600, height: 1067,
    credit: "MarkJGilmore · CC BY-SA 4.0 · Wikimedia Commons · File:Austin - Elisabet Ney Museum - 20201006000619.jpg",
  },

  "amarillo-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amarillo_Texas_Amarillo_Museum_of_Art_2005-05-15.jpg?width=1600",
    alt: "Amarillo Museum of Art building on the Amarillo College campus, photographed in 2005",
    width: 1600, height: 1124,
    credit: "Who What Where Nguyen Why · CC BY-SA 3.0 · Wikimedia Commons · File:Amarillo Texas Amarillo Museum of Art 2005-05-15.jpg",
  },

  "modern-art-museum-fort-worth": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Courtyard_of_the_Modern_Art_Museum_of_Fort_Worth.jpg?width=1600",
    alt: "Courtyard and exterior architecture of the Modern Art Museum of Fort Worth",
    width: 1600, height: 1066,
    credit: "Andrewnward · CC BY-SA 4.0 · Wikimedia Commons · File:Courtyard of the Modern Art Museum of Fort Worth.jpg",
  },

  "american-quarter-horse-hall-of-fame-museum-amarillo": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amarillo_Texas_-_AQHA_-_Outside.jpg?width=1500",
    alt: "Historical exterior view of American Quarter Horse Hall of Fame and Museum in Amarillo, photographed in 2006",
    width: 1500, height: 1200,
    credit: "J. Nguyen · CC BY-SA 3.0 · Wikimedia Commons · File:Amarillo Texas - AQHA - Outside.jpg (2006 historical exterior)",
  },

  "art-museum-south-texas-corpus-christi": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Art_Museum_of_South_Texas_--_Corpus.jpg?width=1600",
    alt: "Art Museum of South Texas waterfront museum exterior in Corpus Christi, photographed in 2018",
    width: 1600,
    height: 1280,
    credit: "Jim Evans · CC BY-SA 4.0 · Wikimedia Commons · File:Art Museum of South Texas -- Corpus.jpg (2018)",
  },

  "houston-museum-of-natural-science": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_Museum_of_Natural_Science%2C_entrance_in_2012.JPG?width=1600",
    alt: "Houston Museum of Natural Science entrance in Hermann Park, photographed in 2012",
    width: 1600, height: 1200,
    credit: "Another Believer · CC BY-SA 3.0 · Wikimedia Commons · File:Houston Museum of Natural Science, entrance in 2012.JPG",
  },

  "el-paso-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/El_Paso_Museum_of_Art_Migrant_Worker_Exhibit.jpg?width=1600",
    alt: "An exhibition at El Paso Museum of Art photographed in 2015, showing the museum's gallery environment, not a current 2026 exhibit",
    width: 1600, height: 900,
    credit: "Susan Barnum · CC BY-SA 4.0 · Wikimedia Commons · File:El Paso Museum of Art Migrant Worker Exhibit.jpg · historical 2015 gallery photograph",
  },
  "arlington-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Richard_Greene_Linear_Park_%28Esports_Stadium_Arlington%29_%28cropped%29.jpg?width=1600",
    alt: "Arlington Entertainment District's former convention center and Esports Stadium complex in 2020, before Arlington Museum of Art opened there in 2024",
    width: 1600, height: 1117,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · File:Richard Greene Linear Park (Esports Stadium Arlington) (cropped).jpg · Pbrks crop; not a museum entrance photo",
  },

  "art-museum-southeast-texas-beaumont": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/AMSET_exterior.jpg?width=1600", alt: "Art Museum of Southeast Texas museum exterior, Beaumont", width: 1600, height: 1236, credit: "Ktimberlake · CC BY-SA 4.0 · Wikimedia Commons · File:AMSET exterior.jpg" },

  "fire-museum-of-texas-beaumont": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fire_Museum_of_Texas%2C_Beaumont%2C_Texas.jpg?width=1600", alt: "Fire Museum of Texas historic fire station and exterior in downtown Beaumont", width: 1600, height: 904, credit: "JJonahJackalope · CC BY-SA 4.0 · Wikimedia Commons · File:Fire Museum of Texas, Beaumont, Texas.jpg" },
  "spindletop-gladys-city-boomtown-museum-beaumont": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Spindletop-Gladys_City_Boomtown_Museum.jpg?width=1600", alt: "Recreated oil-boom town buildings at Spindletop Gladys City Boomtown Museum, Beaumont", width: 1600, height: 987, credit: "i_am_jim · CC BY-SA 3.0 · Wikimedia Commons · File:The Spindletop-Gladys City Boomtown Museum.jpg" },

  "texas-transportation-museum-san-antonio": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1911_Baldwin_2-8-0_Steam_at_Texas_Transportation_museum.jpg?width=1600",
    alt: "Historic Baldwin steam locomotive on outdoor display at the Texas Transportation Museum in San Antonio, photographed in 2012",
    width: 1600, height: 1062,
    credit: "TParis · CC BY-SA 3.0 · Wikimedia Commons · File:1911 Baldwin 2-8-0 Steam at Texas Transportation museum.jpg (2012; static display, not a currently operating train)",
  },

  "austin-nature-and-science-center": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Austin_nature_center_entrance.jpg?width=1600",
    alt: "Entrance to the Austin Nature and Science Center photographed in 2012",
    width: 1600, height: 1067,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Austin nature center entrance.jpg (2012)",
  },

  "el-paso-museum-of-archaeology": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Entrance_to_the_El_Paso_Museum_of_Archaeology.jpg?width=1600",
    alt: "Entrance to El Paso Museum of Archaeology on Transmountain Road, photographed in 2016",
    width: 1600, height: 1200,
    credit: "Susan Barnum · CC BY-SA 4.0 · Wikimedia Commons · File:Entrance to the El Paso Museum of Archaeology.jpg",
  },

};

/** Exact subject, attribution-cleared media may enhance discovery without importing every long museum dossier. */
export function enrichMuseumMedia(destination: Destination): Destination {
  const hero = museumLicensedHeroes[destination.slug];
  return hero && isDestinationPhotoPlaceholder(destination.hero.src) ? { ...destination, hero } : destination;
}
