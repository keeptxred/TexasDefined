import type { Destination } from "./types";

export const nationalCemeteryDestinations: Destination[] = [
  {
    id: "national-cemetery-fort-sam-houston",
    brandId: "texasdefined",
    slug: "fort-sam-houston-national-cemetery",
    name: "Fort Sam Houston National Cemetery",
    summary: "San Antonio's historic VA national cemetery, established from an Army post cemetery and expanded during the interwar growth of the National Cemetery System.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "San Antonio",
    coordinates: { lat: 29.4756, lng: -98.4242 },
    hero: {
      src: "https://cem.va.gov/CEM/images/cemphotos/846_FtSamHouston.jpg",
      alt: "Flag pavilion and assembly area at Fort Sam Houston National Cemetery in San Antonio",
      width: 1200,
      height: 800,
      credit: "U.S. Department of Veterans Affairs · Public domain",
    },
    bestSeason: "Year-round. Spring and fall are usually the most comfortable seasons for walking the grounds; summer heat can be intense.",
    entryNote: "This is an active national cemetery and place of burial, not a conventional attraction. VA lists visitation daily from sunrise to sunset. Office hours are Monday–Friday, 8 a.m.–4:30 p.m., with federal-holiday exceptions. Use the visitor kiosk for gravesite information and observe VA floral, grounds and weapons policies.",
    highlights: ["National Cemetery Administration", "Interwar national cemetery", "Fort Sam Houston military history", "Veterans memorial landscape", "Medal of Honor burials"],
    body: [
      "Fort Sam Houston National Cemetery adjoins one of the most important military installations in Texas. The post cemetery dates to the 1920s, and the site became a national cemetery in 1937 during the first major expansion of the National Cemetery System since the Civil War.",
      "The landscape connects San Antonio's long military history with the twentieth-century growth of federal veterans institutions. The cemetery includes veterans and eligible family members from multiple generations of service, as well as World War II prisoner-of-war burials consolidated from other camps after the war.",
      "Visit quietly and with purpose. Funerals and committal services take priority, graves and memorials should not be treated as photo props, and recreational activities are inappropriate. The VA kiosk and cemetery map are the best tools when locating a specific veteran's grave.",
    ],
    officialUrl: "https://www.cem.va.gov/CEM/cems/nchp/ftsamhouston.asp",
    managingAuthority: "U.S. Department of Veterans Affairs · National Cemetery Administration",
    address: "1520 Harry Wurzbach Road, San Antonio, TX 78209",
    sourceCheckedAt: "2026-08-21",
    county: "Bexar",
    areaGuide: {
      intro: "Treat Fort Sam Houston National Cemetery as a remembrance stop within San Antonio's larger military-history landscape. Allow time for the cemetery itself and avoid building a rushed sightseeing schedule around an active burial service.",
      nearbyAttractions: [
        { name: "Fort Sam Houston and Joint Base San Antonio", proximity: "Adjacent", description: "The active military landscape explains why this became one of Texas's most important national cemeteries." },
        { name: "The Alamo", proximity: "About 5 miles southwest", description: "Connect nineteenth-century Texas military memory with the modern federal military city.", href: "/destination/the-alamo" },
        { name: "San Antonio Missions National Historical Park", proximity: "South of downtown", description: "Adds the Spanish-colonial layer of San Antonio history.", href: "/destination/san-antonio-missions-national-historical-park" },
      ],
      foodAndDrink: [
        { name: "Broadway and Alamo Heights", proximity: "West and northwest", description: "Convenient meal options before or after a respectful cemetery visit." },
      ],
      lodging: [
        { name: "Downtown San Antonio", proximity: "About 5 miles southwest", description: "Best base when combining the cemetery with the Alamo and central-city history." },
        { name: "Airport / Northeast San Antonio", proximity: "North", description: "Convenient for Fort Sam Houston and the broader military corridor." },
      ],
      neighborhoods: [
        { name: "Fort Sam Houston", proximity: "Adjacent", description: "The military district that gives the cemetery its historical context." },
        { name: "Alamo Heights", proximity: "Nearby", description: "A practical nearby district for food and lodging without treating the cemetery itself as a leisure stop." },
      ],
      familyStops: [
        { name: "Veterans gravesite kiosk", proximity: "On site", description: "Use the VA kiosk to locate a specific grave and teach younger visitors how national cemeteries preserve individual service histories." },
      ],
      sideTrips: [
        { name: "Texas Medal of Honor stories", description: "Connect cemetery remembrance with Texas service members recognized for valor.", href: "/article/texas-medal-of-honor-heroes" },
        { name: "San Antonio military aviation history", description: "Continue through the military institutions that made San Antonio one of the country's major defense centers.", href: "/article/san-antonio-military-aviation-history" },
        { name: "Texas military cemeteries and memorials", description: "Compare Fort Sam Houston with Houston and Dallas–Fort Worth national cemeteries.", href: "/article/texas-military-cemeteries-memorials-guide" },
      ],
    },
  },
  {
    id: "national-cemetery-houston",
    brandId: "texasdefined",
    slug: "houston-national-cemetery",
    name: "Houston National Cemetery",
    summary: "A 419-acre VA national cemetery northwest of Houston, dedicated in 1965 and distinguished by its monumental hemicycle, chapel and carillon.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Houston",
    coordinates: { lat: 29.9292, lng: -95.4535 },
    hero: {
      src: "https://www.cem.va.gov/CEM/images/cemphotos/851_Houston.jpg",
      alt: "Hemicycle memorial and carillon at Houston National Cemetery",
      width: 1200,
      height: 800,
      credit: "U.S. Department of Veterans Affairs · Public domain",
    },
    bestSeason: "Year-round. Cooler fall through spring weather is most comfortable for walking the memorial landscape.",
    entryNote: "Houston National Cemetery is an active place of burial and remembrance. VA lists visitation daily from 6 a.m.–9 p.m. and office hours Monday–Friday, 8 a.m.–4:30 p.m. The cemetery prohibits recreational uses such as picnicking and exercise activities; service dogs are allowed, but pets are not.",
    highlights: ["Houston National Cemetery Hemicycle", "1965 VA cemetery design", "National Register of Historic Places", "Medal of Honor burials", "Veterans memorial landscape"],
    body: [
      "Houston National Cemetery was dedicated December 7, 1965. The VA describes it as the only government cemetery constructed in the United States during the 1960s and the largest facility of its kind at the time, designed entirely by Veterans Administration staff.",
      "Its defining architectural feature is the hemicycle: a semicircular memorial complex with chapel, speaker's stand and a 75-foot carillon tower. The VA identifies it as the only hemicycle memorial managed by the National Cemetery Administration. The cemetery was listed in the National Register of Historic Places in 2017.",
      "Several Medal of Honor recipients are interred here, including Macario Garcia. If you come to locate a specific veteran, use the VA kiosk or Veterans Legacy Memorial rather than wandering burial sections casually. Funeral services, grieving families and cemetery operations always take precedence over historical sightseeing.",
    ],
    officialUrl: "https://www.cem.va.gov/CEM/cems/nchp/houston.asp",
    managingAuthority: "U.S. Department of Veterans Affairs · National Cemetery Administration",
    address: "10410 Veterans Memorial Drive, Houston, TX 77038",
    sourceCheckedAt: "2026-08-21",
    county: "Harris",
    areaGuide: {
      intro: "Houston National Cemetery is best approached as a focused remembrance and architectural-history visit. The hemicycle is historically significant, but the grounds remain an active cemetery where services and family visits come first.",
      nearbyAttractions: [
        { name: "Houston", proximity: "About 15 miles southeast to downtown", description: "Use the city as the broader base rather than trying to turn the cemetery into a conventional attraction stop." },
        { name: "Buffalo Soldiers National Museum", proximity: "Central Houston", description: "A complementary place to continue African American military history after leaving the cemetery." },
      ],
      foodAndDrink: [
        { name: "North Houston", proximity: "Short drive", description: "Plan meals off cemetery grounds; picnicking and tailgating are not permitted inside the national cemetery." },
      ],
      lodging: [
        { name: "North Houston / IAH corridor", proximity: "Northeast", description: "Convenient for the cemetery and Bush Intercontinental Airport." },
        { name: "Central Houston", proximity: "South", description: "Better for combining the cemetery with museums and broader Houston history." },
      ],
      neighborhoods: [
        { name: "Veterans Memorial corridor", proximity: "On approach", description: "The practical access corridor for the cemetery." },
      ],
      familyStops: [
        { name: "Hemicycle and memorial landscape", proximity: "On site", description: "A setting for teaching respectful remembrance, military service and national cemetery traditions." },
      ],
      sideTrips: [
        { name: "Texas Medal of Honor stories", description: "Read about Macario Garcia and other Texas-connected Medal of Honor recipients before or after a remembrance visit.", href: "/article/texas-medal-of-honor-heroes" },
        { name: "Buffalo Soldiers in Texas", description: "Continue into the history of Black Regular Army regiments and African American military service in Texas.", href: "/article/buffalo-soldiers-texas-frontier-guide" },
        { name: "Texas military cemeteries and memorials", description: "Compare Houston with Fort Sam Houston and Dallas–Fort Worth national cemeteries.", href: "/article/texas-military-cemeteries-memorials-guide" },
      ],
    },
  },
  {
    id: "national-cemetery-dallas-fort-worth",
    brandId: "texasdefined",
    slug: "dallas-fort-worth-national-cemetery",
    name: "Dallas–Fort Worth National Cemetery",
    summary: "A modern VA national cemetery overlooking Mountain Creek Lake in southwest Dallas, dedicated and opened for burials in 2000.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Dallas",
    coordinates: { lat: 32.7150, lng: -96.9372 },
    hero: {
      src: "https://www.cem.va.gov/cem/images/cemphotos/916_DallasFtWorth.jpg",
      alt: "Entrance gate at Dallas–Fort Worth National Cemetery in Dallas",
      width: 1200,
      height: 800,
      credit: "U.S. Department of Veterans Affairs · Public domain",
    },
    bestSeason: "Year-round. Spring and fall offer the most comfortable temperatures for walking the large, open memorial landscape.",
    entryNote: "Dallas–Fort Worth National Cemetery is an active national cemetery. VA lists visitation daily from sunrise to sunset and office hours Monday–Friday, 8 a.m.–4:30 p.m. A visitor kiosk provides gravesite information and mapping. Respect funeral processions, committal shelters and grieving families at all times.",
    highlights: ["Mountain Creek Lake setting", "Modern national cemetery", "Veterans gravesite kiosk", "Medal of Honor burials", "Committal shelters"],
    body: [
      "Dallas–Fort Worth National Cemetery was dedicated and opened for burials on May 12, 2000. The VA developed the cemetery on more than 600 acres in southwest Dallas overlooking Mountain Creek Lake to serve the large North Texas veteran population.",
      "Its broad rolling landscape represents a newer generation of national cemetery design than Fort Sam Houston or Houston. The cemetery remains open for casketed and cremated remains and continues to serve families across the Dallas–Fort Worth region.",
      "The appropriate visitor focus is remembrance, locating an individual grave or understanding the national-cemetery system—not recreation. Use the public information building and kiosk near the entrance for help, remain clear of active funeral services and follow VA grounds and floral policies.",
    ],
    officialUrl: "https://www.cem.va.gov/cems/nchp/DallasFtWorth.asp",
    managingAuthority: "U.S. Department of Veterans Affairs · National Cemetery Administration",
    address: "2000 Mountain Creek Parkway, Dallas, TX 75211",
    sourceCheckedAt: "2026-08-21",
    county: "Dallas",
    areaGuide: {
      intro: "Dallas–Fort Worth National Cemetery is a working cemetery rather than a tourism stop. Build any historical visit around a specific remembrance purpose, then leave the grounds before continuing to ordinary Dallas attractions.",
      nearbyAttractions: [
        { name: "Mountain Creek Lake", proximity: "Adjacent landscape", description: "The lake shapes the cemetery setting; recreation should remain outside cemetery grounds." },
        { name: "Dallas", proximity: "East and northeast", description: "Continue ordinary museum, dining and sightseeing plans only after leaving the cemetery." },
      ],
      foodAndDrink: [
        { name: "Southwest Dallas", proximity: "Short drive", description: "Use off-site restaurants; eating, tailgating and leisure activity are inappropriate on cemetery grounds." },
      ],
      lodging: [
        { name: "Dallas", proximity: "East", description: "The broadest lodging base for a North Texas history itinerary." },
        { name: "Arlington / Grand Prairie", proximity: "West", description: "Convenient when approaching from the mid-cities side of DFW." },
      ],
      neighborhoods: [
        { name: "Mountain Creek", proximity: "Around the cemetery", description: "The southwest Dallas setting surrounding the national cemetery and lake." },
      ],
      familyStops: [
        { name: "Veterans gravesite kiosk", proximity: "Near the entrance", description: "Use it to locate an individual veteran and keep a family visit focused on remembrance rather than casual sightseeing." },
      ],
      sideTrips: [
        { name: "Texas Medal of Honor stories", description: "Connect North Texas burials with the broader history of valor and military remembrance.", href: "/article/texas-medal-of-honor-heroes" },
        { name: "Texas in recent wars", description: "Connect the modern cemetery to the generations who served from Desert Storm through Iraq and Afghanistan.", href: "/article/texas-recent-wars-military-history" },
        { name: "Texas military cemeteries and memorials", description: "Compare the modern DFW landscape with Houston and Fort Sam Houston national cemeteries.", href: "/article/texas-military-cemeteries-memorials-guide" },
      ],
    },
  },
];
