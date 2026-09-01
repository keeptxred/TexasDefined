import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-08-31";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Twelfth statewide museum wave. These South Texas destinations have current
 * institutional evidence plus address/coordinate records strong enough for
 * the canonical destination layer. Nearby museums with unresolved geospatial
 * records remain queued rather than being added with guessed coordinates.
 */
export const statewideMuseumExpansionWave12Destinations: Destination[] = [
  {
    id: "museum-statewide-wave12-freddy-fender",
    brandId: "texasdefined",
    slug: "freddy-fender-museum-san-benito",
    name: "Freddy Fender Museum",
    summary: "San Benito's Freddy Fender Museum celebrates hometown singer Baldemar Huerta—internationally known as Freddy Fender—through personal artifacts, instruments, awards, photographs and exhibits tracing his path across country, rock, Tejano and border music.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "San Benito",
    county: "Cameron County",
    coordinates: { lat: 26.131973, lng: -97.629471 },
    hero: museumPlaceholder("Freddy Fender Museum"),
    bestSeason: "Year-round cultural stop; fall through spring is most comfortable for combining it with San Benito's downtown cultural district and other Rio Grande Valley museums.",
    entryNote: "CURRENT 2026 STATUS: the City of San Benito and the Freddy Fender Estate reopened the museum on June 13, 2026, at 210 E Heywood Street. Because the exhibition was newly reopened and programming may evolve, verify current public hours and ticket arrangements through the city's Cultural Arts Department before a special trip.",
    highlights: ["Freddy Fender instruments and memorabilia", "Grammy-winning border-music legacy", "Reopened June 2026", "San Benito music heritage"],
    body: [
      "Freddy Fender was born Baldemar Garza Huerta in San Benito and built a career that crossed musical categories more easily than most Texas performers. Songs such as Before the Next Teardrop Falls and Wasted Days and Wasted Nights carried his voice to national audiences, while later work with the Texas Tornados and Los Super Seven kept him closely connected to Tejano and border music.",
      "The museum translates that career into a hometown visitor experience through instruments, awards, photographs and family-held material. Its 2026 reopening followed renewed collaboration between the City of San Benito and the Freddy Fender Estate, giving the collection a current public home after earlier museum arrangements changed.",
      "For TexasDefined, the museum should stand on its own while cross-linking the Texas Conjunto Music Hall of Fame, San Benito cultural sites and broader Texas music authority content. Fender's career is distinctive enough to support a dedicated destination rather than being reduced to one room inside a generic city-history page."
    ],
    officialUrl: "https://www.cityofsanbenito.com/m/FAQ",
    managingAuthority: "City of San Benito Cultural Arts Department / Freddy Fender Estate",
    address: "210 E Heywood St, San Benito, TX 78586",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave12-texas-conjunto",
    brandId: "texasdefined",
    slug: "texas-conjunto-music-hall-of-fame-museum-san-benito",
    name: "Texas Conjunto Music Hall of Fame & Museum",
    summary: "The Texas Conjunto Music Hall of Fame & Museum in San Benito preserves the people, instruments, recordings and dance-hall culture behind conjunto, the border-region sound built from Mexican musical traditions and European accordion influences.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "San Benito",
    county: "Cameron County",
    coordinates: { lat: 26.133119, lng: -97.635396 },
    hero: museumPlaceholder("Texas Conjunto Music Hall of Fame & Museum"),
    bestSeason: "Year-round museum; festival and live-music dates can add context, while fall through spring provides the easiest weather for a wider San Benito cultural itinerary.",
    entryNote: "The City of San Benito currently identifies the museum at 402 W Robertson Street, and the Texas Historical Commission lists it as an active San Benito museum. Locally operated schedules can change, so verify current hours directly before traveling.",
    highlights: ["Conjunto Hall of Fame", "Historic instruments and recordings", "Narciso Martínez and regional pioneers", "South Texas dance-hall culture"],
    body: [
      "Conjunto is one of Texas's most distinctive regional music traditions, formed as Mexican and European musical practices met along the border. Accordion, bajo sexto and dance rhythms became the foundation of a sound associated with working-class communities across South Texas and northern Mexico.",
      "The San Benito museum preserves that story through hall-of-fame recognition, archival material, instruments, costumes and memorabilia connected to musicians, promoters and recording figures. San Benito is an especially fitting location because the city and surrounding Valley produced important conjunto artists and venues, including Narciso Martínez and the once-famous La Villita Dance Hall.",
      "For TexasDefined, this destination belongs in both museum and Texas-music discovery paths. It can cross-link the Freddy Fender Museum, San Benito cultural authority, Tejano/conjunto history and regional festivals without collapsing separate musical legacies into one generic music page."
    ],
    officialUrl: "https://www.cityofsanbenito.com/249/Cultural-Arts-Department",
    managingAuthority: "Texas Conjunto Music Hall of Fame & Museum",
    address: "402 W Robertson St, San Benito, TX 78586",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave12-iwo-jima",
    brandId: "texasdefined",
    slug: "iwo-jima-museum-monument-harlingen",
    name: "Iwo Jima Museum and Monument State Historic Site",
    summary: "Harlingen's Iwo Jima site preserves Felix de Weldon's full-size working model of the iconic Marine Corps flag-raising monument and interprets the Battle of Iwo Jima, Marine service and the six men depicted in Joe Rosenthal's famous photograph.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Harlingen",
    county: "Cameron County",
    coordinates: { lat: 26.217319, lng: -97.667793 },
    hero: museumPlaceholder("Iwo Jima Museum and Monument State Historic Site"),
    bestSeason: "Fall through spring for the most comfortable outdoor monument visit; museum access currently depends on the site's renovation/closure status.",
    entryNote: "TEMPORARY CLOSURE ALERT: the Texas Historical Commission currently says the visitor center and gift shop are closed until further notice. The site is in a transition/renovation period, so confirm museum access and monument-ground conditions with the Texas Historical Commission or Marine Military Academy before traveling.",
    highlights: ["Felix de Weldon Iwo Jima monument model", "Battle of Iwo Jima interpretation", "Harlon Block memorial connection", "Marine Military Academy campus"],
    body: [
      "The monument at Harlingen is directly connected to one of the most reproduced images of World War II. Sculptor Felix de Weldon created the full-size working model that preceded the Marine Corps War Memorial in Arlington, preserving the pose of the six servicemen raising the flag on Mount Suribachi in February 1945.",
      "The site also has a South Texas connection through Corporal Harlon Block, a Rio Grande Valley native depicted in the flag raising. His remains were eventually reinterred near the monument at the Marine Military Academy, giving the memorial a personal regional link as well as national military significance.",
      "TexasDefined should preserve the destination even during its current visitor-center closure because the historic site remains significant and has a stable state-authority identity. The page must, however, put the closure alert ahead of normal trip-planning language so users are not sent to a museum facility that may be inaccessible."
    ],
    officialUrl: "https://thc.texas.gov/historic-sites/iwo-jima-museum-and-monument",
    managingAuthority: "Texas Historical Commission / Marine Military Academy partners",
    address: "320 Iwo Jima Blvd, Harlingen, TX 78550",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
