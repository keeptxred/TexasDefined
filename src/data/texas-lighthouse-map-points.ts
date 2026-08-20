export type TexasLighthouseStatus = "visit" | "view-only" | "relocated" | "historic";

export type TexasLighthouseMapPoint = {
  slug: string;
  name: string;
  county: string;
  lat: number;
  lon: number;
  status: TexasLighthouseStatus;
  era: string;
  note: string;
  sourceUrl: string;
  sourceLabel: string;
  articleHref?: string;
  countyHref: string;
};

export const texasLighthouseMapPoints: TexasLighthouseMapPoint[] = [
  {
    slug: "sabine-pass-lighthouse",
    name: "Sabine Pass Lighthouse",
    county: "Cameron Parish, Louisiana / Texas border approach",
    lat: 29.716509,
    lon: -93.849881,
    status: "view-only",
    era: "1850s",
    note: "Historic Sabine Pass light at the eastern gateway to the Texas coast. It stands on the Louisiana side of the Sabine but belongs to the maritime story of the Texas-Louisiana boundary and the Sabine-Neches approach.",
    sourceUrl: "https://data.ngdc.noaa.gov/platforms/ocean/nos/coast/F00001-F02000/F00351/DR/F00351.pdf",
    sourceLabel: "NOAA Coast and Geodetic Survey position record",
    articleHref: "/article/sabine-pass-lighthouse-texas-border",
    countyHref: "/county/jefferson",
  },
  {
    slug: "point-bolivar-lighthouse",
    name: "Point Bolivar Lighthouse",
    county: "Galveston County",
    lat: 29.367835,
    lon: -94.765722,
    status: "view-only",
    era: "1873 tower",
    note: "The black cast-iron tower at Bolivar Point guarded the entrance to Galveston Bay and sheltered residents during the 1900 and 1915 storms. The property is not a public climb site.",
    sourceUrl: "https://atlas.thc.texas.gov/Details/2077001445",
    sourceLabel: "Texas Historical Commission National Register record",
    articleHref: "/article/point-bolivar-lighthouse-history",
    countyHref: "/county/galveston",
  },
  {
    slug: "halfmoon-reef-lighthouse",
    name: "Halfmoon Reef Lighthouse",
    county: "Calhoun County",
    lat: 28.6369,
    lon: -96.61724,
    status: "relocated",
    era: "1858",
    note: "Originally a screw-pile light in Matagorda Bay, Halfmoon Reef was moved onshore and preserved at Port Lavaca, making it one of the easiest historic Texas lighthouse structures to see from land.",
    sourceUrl: "https://www.wikidata.org/wiki/Q14710479",
    sourceLabel: "Wikidata coordinate record for the relocated lighthouse",
    articleHref: "/article/halfmoon-reef-lighthouse-port-lavaca",
    countyHref: "/county/calhoun",
  },
  {
    slug: "matagorda-island-lighthouse",
    name: "Matagorda Island Lighthouse",
    county: "Calhoun County",
    lat: 28.337939,
    lon: -96.424031,
    status: "view-only",
    era: "19th century",
    note: "A major middle-coast light on Matagorda Island, preserved in a remote barrier-island setting where the difficulty of access is part of the story.",
    sourceUrl: "https://www.wikidata.org/wiki/Q6785980",
    sourceLabel: "Texas Historic Sites Atlas-backed Wikidata coordinate",
    articleHref: "/article/matagorda-island-lighthouse-history",
    countyHref: "/county/calhoun",
  },
  {
    slug: "lydia-ann-lighthouse",
    name: "Lydia Ann Lighthouse",
    county: "Aransas County",
    lat: 27.86419,
    lon: -97.05554,
    status: "view-only",
    era: "1857",
    note: "The former Aransas Pass Light survives on Harbor Island as a private aid to navigation. It can be appreciated from public waterways and the Lighthouse Lakes paddling area but is not a public tower.",
    sourceUrl: "https://www.history.uscg.mil/Browse-by-Topic/Assets/Land/All/Article/2014937/aransas-pass-light-station-lydia-ann-lighthouse/",
    sourceLabel: "U.S. Coast Guard Historian's Office",
    articleHref: "/article/lydia-ann-lighthouse-port-aransas",
    countyHref: "/county/aransas",
  },
  {
    slug: "port-isabel-lighthouse",
    name: "Port Isabel Lighthouse",
    county: "Cameron County",
    lat: 26.077984,
    lon: -97.207133,
    status: "visit",
    era: "1852–1853",
    note: "The last Texas lighthouse open to the public. Visitors can climb the tower when weather permits and see the reproduction third-order Fresnel lens installed in 2022.",
    sourceUrl: "https://www.thc.texas.gov/public/upload/publications/Port%20Isabel%20Lighthouse_Rack%20Card.pdf",
    sourceLabel: "Texas Historical Commission visitor map",
    articleHref: "/article/port-isabel-lighthouse-guide",
    countyHref: "/county/cameron",
  },
];

export const texasLighthouseMapPointBySlug = new Map(texasLighthouseMapPoints.map((point) => [point.slug, point]));
