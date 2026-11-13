/**
 * Source-anchored milestones used by the Texas music history collection.
 * Never treat a current venue schedule as historical evidence.
 * Research sources checked 2026-11-13; this is not a first-publication date.
 */
export const musicSourceReviewedAt = "2026-11-13";

export type MusicMilestone = {
  period: string;
  event: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const musicHistoryMilestones: Record<string, readonly MusicMilestone[]> = {
  "broken-spoke-austin-history": [
    { period: "November 10, 1964", event: "James White opens the Broken Spoke as a cafe on South Lamar; dancing becomes central to the business.", sourceUrl: "https://www.tshaonline.org/handbook/entries/broken-spoke", sourceLabel: "Handbook of Texas" },
    { period: "1960s–1970s", event: "Country and Western-swing figures including Bob Wills and Ernest Tubb play the room as Austin's music audience broadens.", sourceUrl: "https://www.txst.edu/ctmh/publications/hartman-series/broken-spoke.html", sourceLabel: "Texas State music history center" },
    { period: "2021 marker record", event: "The Texas Historical Commission records a marker recognizing the venue's role in Austin's country-music and dance history.", sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=5000023384&fn=print", sourceLabel: "Texas Historical Commission" },
    { period: "April 2023 dedication", event: "Texas officials dedicate the Broken Spoke historical marker, distinct from the 2021 year in the state marker record.", sourceUrl: "https://gov.texas.gov/news/post/first-lady-abbott-dedicates-broken-spoke-texas-historical-marker-in-austin", sourceLabel: "Texas Governor's Office" },
  ],
  "continental-club-austin-history": [
    { period: "1955", event: "The Continental Club opens as a supper club on South Congress, before its later burlesque and neighborhood-bar phases.", sourceUrl: "https://continentalclub.com/about/", sourceLabel: "Continental Club history" },
    { period: "Late 1970s–1980s", event: "The stage hosts Stevie Ray Vaughan, Joe Ely, punk and roots-rock performers during successive music eras.", sourceUrl: "https://continentalclub.com/about/", sourceLabel: "Continental Club history" },
    { period: "1987", event: "Restoration work returns the club toward its 1950s appearance and brings the original murals back into view.", sourceUrl: "https://continentalclub.com/about/", sourceLabel: "Continental Club history" },
  ],
  "antones-austin-history": [
    { period: "July 15, 1975", event: "Clifford Antone opens his blues club on Sixth Street, with Clifton Chenier as the first act.", sourceUrl: "https://www.tshaonline.org/handbook/entries/antones", sourceLabel: "Handbook of Texas" },
    { period: "1980–1997", event: "Antone's relocates through Anderson Lane, Guadalupe Street and West Fifth Street, showing that the institution outlived any single address.", sourceUrl: "https://www.tshaonline.org/handbook/entries/antones", sourceLabel: "Handbook of Texas" },
    { period: "December 31, 2015", event: "Antone\'s reopens on East Fifth Street with C. J. Chenier, returning the club near its original downtown neighborhood.", sourceUrl: "https://antonesnightclub.com/history/", sourceLabel: "Antone\'s official chronology" },
  ],
  "billy-bobs-texas-history": [
    { period: "1910", event: "The future Billy Bob's building begins as an open-air cattle barn at the Fort Worth Stockyards.", sourceUrl: "https://www.billybobstexas.com/about/history", sourceLabel: "Billy Bob's official history" },
    { period: "1936–1943", event: "Fort Worth encloses the building for the Texas Centennial, and livestock use continues until the stock show moves.", sourceUrl: "https://www.billybobstexas.com/about/history", sourceLabel: "Billy Bob's official history" },
    { period: "April 1, 1981", event: "Billy Bob's opens as a large-scale country venue; its first week includes Waylon Jennings, Janie Fricke and Willie Nelson.", sourceUrl: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas", sourceLabel: "Handbook of Texas" },
    { period: "January–November 1988", event: "Financial troubles force Billy Bob's to close in January; Fort Worth investors reopen the honky-tonk on November 28, linking its survival to Stockyards renewal.", sourceUrl: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas", sourceLabel: "Handbook of Texas" },
    { period: "1998", event: "Billy Bob's and Smith Music Group start the Live at Billy Bob's recording series, making the club a recording venue as well as a concert destination.", sourceUrl: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas", sourceLabel: "Handbook of Texas" },
  ],
  "austin-music-history": [
    { period: "Early 1970s", event: "Progressive country joins folk, rock and traditional country audiences in Austin's growing club network.", sourceUrl: "https://www.tshaonline.org/handbook/entries/country-music", sourceLabel: "Handbook of Texas" },
    { period: "1974–1976", event: "Austin City Limits films its Willie Nelson pilot, then develops the first broadcast season featuring Texas and roots performers.", sourceUrl: "https://www.tshaonline.org/handbook/entries/austin-city-limits", sourceLabel: "Handbook of Texas" },
    { period: "1975", event: "Clifford Antone establishes the blues club that connects touring masters with younger Austin players.", sourceUrl: "https://www.tshaonline.org/handbook/entries/antones", sourceLabel: "Handbook of Texas" },
  ],
  "houston-music-history": [
    { period: "1949", event: "Don Robey starts Peacock Records, named for his Bronze Peacock nightclub in Houston's Fifth Ward.", sourceUrl: "https://www.tshaonline.org/handbook/entries/duke-peacock-records", sourceLabel: "Handbook of Texas" },
    { period: "1953", event: "Robey acquires Duke Records and consolidates label operations around Houston's music businesses.", sourceUrl: "https://www.tshaonline.org/handbook/entries/duke-peacock-records", sourceLabel: "Handbook of Texas" },
    { period: "1990s", event: "DJ Screw's slowed-down mixtapes and the Screwed Up Click help build an independent Houston hip-hop market.", sourceUrl: "https://www.tshaonline.org/handbook/entries/rap-and-hip-hop", sourceLabel: "Handbook of Texas" },
  ],
  "san-antonio-music-history": [
    { period: "Late 1950s", event: "San Antonio's West Side Sound develops through neighborhood bands and venues mixing R&B, rock and borderland styles.", sourceUrl: "https://www.tshaonline.org/handbook/entries/west-side-sound", sourceLabel: "Handbook of Texas" },
    { period: "Early innovators", event: "Sunny and the Sunliners, the Royal Jesters, the Pharaohs and other local groups help establish the music's distinctive identity.", sourceUrl: "https://www.tshaonline.org/handbook/entries/west-side-sound", sourceLabel: "Handbook of Texas" },
    { period: "Longer tradition", event: "Accordion and bajo sexto in Texas-Mexican conjunto belong to a related but distinct history; neither style should be collapsed into the other.", sourceUrl: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto", sourceLabel: "Handbook of Texas" },
  ],
  "corpus-christi-music-history": [
    { period: "1961", event: "Johnny Herrera opens House of Music, a Spanish-language record store that becomes a meeting place for Corpus Christi musicians.", sourceUrl: "https://www.tshaonline.org/handbook/entries/herrera-juan-william-johnny", sourceLabel: "Handbook of Texas" },
    { period: "Late 1970s", event: "Hacienda Records adds significant regional recording capacity, including a 24-track studio in South Texas.", sourceUrl: "https://www.tshaonline.org/handbook/entries/recording-industry", sourceLabel: "Handbook of Texas" },
    { period: "1982", event: "The Quintanilla family relocates to Corpus Christi, where Selena y Los Dinos develop through the South Texas circuit.", sourceUrl: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena", sourceLabel: "Handbook of Texas" },
  ],
  "lubbock-music-history": [
    { period: "1953", event: "Buddy Holly and Bob Montgomery perform on Lubbock radio station KDAV, an important early local platform.", sourceUrl: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly", sourceLabel: "Handbook of Texas" },
    { period: "1957", event: "Holly and the Crickets record in Norman Petty's Clovis, New Mexico studio, showing how Lubbock's scene depended on regional links.", sourceUrl: "https://www.tshaonline.org/handbook/entries/crickets", sourceLabel: "Handbook of Texas" },
    { period: "May 27, 1957", event: "The Crickets release 'That'll Be the Day,' which helps carry a West Texas sound to national audiences.", sourceUrl: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly", sourceLabel: "Handbook of Texas" },
  ],
};

export const musicCitiesComparison = [
  { name: "Austin", href: "/austin-music-history", signature: "Progressive country, blues, national broadcasting", infrastructure: "Dance halls, Antone's, Austin City Limits", sourceUrl: "https://www.tshaonline.org/handbook/entries/austin-city-limits" },
  { name: "Houston", href: "/houston-music-history", signature: "Blues, R&B, gospel, hip-hop", infrastructure: "Fifth Ward labels and studios; independent mixtape distribution", sourceUrl: "https://www.tshaonline.org/handbook/entries/duke-peacock-records" },
  { name: "San Antonio", href: "/san-antonio-music-history", signature: "Conjunto, Tejano, West Side Sound", infrastructure: "Neighborhood bands, dance circuits, multilingual music markets", sourceUrl: "https://www.tshaonline.org/handbook/entries/west-side-sound" },
  { name: "Lubbock", href: "/lubbock-music-history", signature: "Rock and roll, rockabilly, country", infrastructure: "KDAV radio and regional Clovis recording connections", sourceUrl: "https://www.tshaonline.org/handbook/entries/crickets" },
  { name: "Dallas–Fort Worth", href: "/dallas-fort-worth-music-history", signature: "Deep Ellum blues, jazz, western swing", infrastructure: "Black commercial districts, recording businesses, North Texas stages", sourceUrl: "https://www.tshaonline.org/handbook/entries/deep-ellum" },
  { name: "Corpus Christi", href: "/corpus-christi-music-history", signature: "Conjunto, Tejano, border-music crossover", infrastructure: "House of Music, Freddie and Hacienda recording and distribution", sourceUrl: "https://www.tshaonline.org/handbook/entries/recording-industry" },
] as const;

/**
 * Licensed, exact-subject documentary photographs. These are photographs of
 * buildings at the dated moment indicated, not simulated archival scenes.
 * Keep original author/license attribution attached to each rendering.
 */
export const musicVenuePhotography: Record<string, {
  src: string; alt: string; caption: string; credit: string; sourcePage: string;
  license: string; licenseUrl: string;
}> = {
  "broken-spoke-austin-history": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Broken_Spoke_Austin_Texas_2024.jpg?width=1200",
    alt: "The Broken Spoke honky-tonk building on South Lamar in Austin photographed in 2024",
    caption: "The Broken Spoke in 2024, decades after its 1964 opening. This is a modern documentary photograph, not an opening-day image.",
    credit: "Larry D. Moore",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Broken_Spoke_Austin_Texas_2024.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "continental-club-austin-history": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Continental_Club_Austin_2019.jpg?width=1200",
    alt: "Exterior of the Continental Club in Austin on South Congress Avenue, photographed in 2019",
    caption: "The Continental Club on South Congress in 2019. The building has carried several musical identities since opening in 1955.",
    credit: "Larry D. Moore",
    sourcePage: "https://commons.wikimedia.org/wiki/File:The_Continental_Club_Austin_2019.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "antones-austin-history": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Antone%27s_on_Lavaca_%285224333547%29.jpg?width=1200",
    alt: "Exterior of the former Antone's blues club location on Lavaca Street in 2010, before the move to East Fifth Street",
    caption: "Antone's former Lavaca Street location photographed in 2010. The club later moved; this is not the present East Fifth Street entrance.",
    credit: "Seth Anderson / B12 Partners",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Antone%27s_on_Lavaca_(5224333547).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "billy-bobs-texas-history": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Billy_Bobs_Texas_%282%29.jpg?width=1200",
    alt: "Billy Bob's Texas honky-tonk in the Fort Worth Stockyards, photographed in 2005",
    caption: "Billy Bob's Texas photographed in 2005. The present music venue opened in 1981 in a much older Stockyards building.",
    credit: "David Herrera",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Billy_Bobs_Texas_(2).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
};
