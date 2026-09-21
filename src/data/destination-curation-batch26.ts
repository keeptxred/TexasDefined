import type { Destination } from "./types";

const NPS = "National Park Service";
const THC = "Texas Historical Commission";
const curated: Record<string, Partial<Destination>> = {
  "chamizal-national-memorial": {
    summary: "An El Paso national memorial telling the story of a century-long U.S.–Mexico boundary dispute resolved peacefully in 1963, with museum exhibits, cultural programs and broad lawns beside the international border.", nearestTown: "El Paso", bestSeason: "Fall through spring for comfortable outdoor walking; indoor exhibits make the site useful year-round", entryNote: "The grounds and cultural center have separate operating patterns. Check NPS hours, performances and temporary closures before building a visit around a program.", highlights: ["U.S.–Mexico boundary history", "Chamizal Cultural Center and museum", "Public art and performance programs", "Open grounds near the international border"], body: ["Chamizal National Memorial preserves a diplomatic story rather than a battlefield. Changes in the Rio Grande created a disputed tract between El Paso and Ciudad Juárez, and the eventual settlement became a rare example of a long international boundary disagreement resolved through negotiation.", "The cultural center explains the geography, politics and human consequences of the dispute while also hosting visual and performing arts that reflect the borderlands communities surrounding the memorial. The grounds provide room to walk and understand how closely the site sits within the modern binational city.", "This is a place where context matters more than acreage. Start with the exhibits, then walk the grounds with the river, downtown El Paso and Ciudad Juárez in mind. Check the NPS calendar before traveling because performances and special programs can add substantially to a visit."], managingAuthority: NPS, officialUrl: "https://www.nps.gov/cham/",
  },
  "fanthorp-inn-state-historic-site": {
    summary: "A restored 1850s stagecoach inn in Anderson where travelers on early Texas roads ate, slept and exchanged news, interpreted today through the surviving inn, period rooms and stagecoach-era transportation history.", nearestTown: "Anderson", bestSeason: "Fall through spring for comfortable historic-site touring", entryNote: "Interior access and guided interpretation follow site hours. Check the Texas Historical Commission calendar before traveling, especially for stagecoach programs and special events.", highlights: ["Restored nineteenth-century stagecoach inn", "Early Texas travel and mail-route history", "Period-furnished rooms", "Stagecoach and living-history programs"], body: ["Fanthorp Inn makes early Texas travel tangible. Before railroads reorganized movement across the state, inns like this one were essential stops where passengers, mail carriers and drivers could eat, rest, change horses and gather information about the road ahead.", "The preserved building lets visitors move through the spaces that supported that traffic, from public rooms to sleeping quarters. Interpretation connects the inn to the broader network of stage routes that linked settlements across the young state.", "Plan enough time to read the room-by-room interpretation instead of treating the inn as a quick exterior photo stop. Special stagecoach and living-history programs can change the experience considerably, so verify the current schedule before making a dedicated trip."], managingAuthority: THC, officialUrl: "https://www.thc.texas.gov/historic-sites/fanthorp-inn-state-historic-site",
  },
  "fort-davis-national-historic-site": {
    summary: "One of the Southwest's best-preserved frontier Army posts, set beneath the Davis Mountains with restored barracks, officers' quarters and exhibits interpreting soldiers, civilians and Buffalo Soldiers on the nineteenth-century Texas frontier.", nearestTown: "Fort Davis", bestSeason: "Fall through spring for mild temperatures; summer mornings are more comfortable for walking the open post grounds", entryNote: "Most of the site is explored on foot across exposed high-desert terrain. Check NPS alerts, building access and program schedules before arrival.", highlights: ["Restored frontier military buildings", "Buffalo Soldier history", "Davis Mountains setting", "Museum exhibits and self-guided post walk"], body: ["Fort Davis National Historic Site preserves an unusually complete frontier post in a dramatic mountain setting. The Army established the fort to protect travelers and commerce moving through West Texas, and many of its surviving buildings help visitors understand the scale of that military presence.", "The story includes the Black soldiers of the 9th and 10th U.S. Cavalry and 24th and 25th U.S. Infantry, commonly known as Buffalo Soldiers, as well as officers' families, civilian workers, local communities and the Indigenous peoples affected by U.S. expansion.", "Walk the post slowly rather than rushing between structures. The surrounding Davis Mountains are part of the historical geography, and combining Fort Davis with Davis Mountains State Park, Indian Lodge or McDonald Observatory can turn the site into the anchor of a full West Texas itinerary."], managingAuthority: NPS, officialUrl: "https://www.nps.gov/foda/",
  },
  "lyndon-b-johnson-national-historical-park": {
    summary: "A free two-district national historical park linking Lyndon B. Johnson's childhood in Johnson City with the LBJ Ranch near Stonewall, where visitors can tour the Boyhood Home, walk the Johnson Settlement and take a self-guided ranch drive past presidential, family and working-ranch sites.",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area", "san-antonio-area"],
      countySlugs: ["blanco", "gillespie"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["Austin & Central Texas", "San Antonio & Hill Country"],
    },
    nearestTown: "Johnson City",
    county: "Blanco",
    coordinates: { lat: 30.276, lng: -98.411 },
    bestSeason: "Fall through spring for the most comfortable walking and ranch driving; summer remains viable with heat precautions, especially because the Boyhood Home is not air-conditioned.",
    entryNote: "There is no entrance fee. The Johnson City Visitor Center is open daily 9 a.m.-5 p.m. except Thanksgiving, Christmas and New Year's Day. To enter the LBJ Ranch, visitors must first obtain a free driving permit at Lyndon B. Johnson State Park & Historic Site near Stonewall; the current permit window is 8:30 a.m.-4 p.m. The Texas White House Complex, including the Texas White House, Hangar Visitor Center, Lockheed JetStar and Klein Shop vehicle display, remains closed during rehabilitation.",
    highlights: [
      "Free admission to both Johnson City and LBJ Ranch districts",
      "Dedicated LBJ Boyhood Home programs in Johnson City",
      "One-mile Johnson Settlement trail with family and frontier history",
      "Self-guided LBJ Ranch driving route with a free permit",
      "Junction School, reconstructed birthplace and Johnson Family Cemetery",
      "Working ranch and Show Barn with Hereford cattle",
      "Texas White House landscape and rehabilitation story",
      "Two districts separated by about 14 miles of U.S. 290 Hill Country",
    ],
    body: [
      "Lyndon B. Johnson National Historical Park is best understood as two connected places rather than one gated attraction. The Johnson City district preserves Johnson's childhood and family roots; the ranch district near Stonewall preserves the working landscape he returned to throughout his political career and presidency. The two districts are about 14 miles apart on U.S. 290.",
      "Start in Johnson City if you want the most chronological version of the story. The National Park Service Visitor Center is open daily from 9 a.m. to 5 p.m. except Thanksgiving, Christmas and New Year's Day, with exhibits, films, a bookstore and staff orientation. The same district includes the LBJ Boyhood Home and the Johnson Settlement.",
      "The Boyhood Home now has its own TexasDefined guide because its visitor logistics are specific. Current National Park Service programs are free and begin from the Johnson City visitor center. The restored home is not air-conditioned, so summer access can be limited by interior heat even when the broader park is open.",
      "The Johnson Settlement adds the older family story. A roughly one-mile trail leads through the nineteenth-century settlement landscape associated with Johnson's grandparents, with historic structures, barns, longhorns and interpretation of frontier and ranching life. Visitors with mobility needs can ask at the visitor center about driving access into the settlement.",
      "The LBJ Ranch is a separate driving experience. Before entering, visitors must stop at Lyndon B. Johnson State Park & Historic Site near Stonewall for a free driving permit. The current National Park Service guidance says permits are issued between 8:30 a.m. and 4 p.m.; the ranch inbound gate opens at 9 a.m. and closes at 4:30 p.m., with the exit gate closing at 5 p.m.",
      "The ranch route remains open even though the Texas White House Complex is under rehabilitation. Open ranch stops include Junction School, the reconstructed birthplace, the Johnson Family Cemetery viewing area and the Show Barn. These sites make the ranch worth visiting even without interior access to the Texas White House.",
      "The Texas White House Complex itself remains closed. The closure includes the Texas White House, Hangar Visitor Center, Lockheed JetStar and Klein Shop vehicle display. Visitors drive past the fenced construction area but are not permitted to park, walk the grounds or stop along the active construction zone. The National Park Service currently describes the White House rehabilitation as a multi-year project.",
      "That closure changes the best itinerary. Do not plan the ranch around a house tour; plan it around the self-guided driving route, Junction School, birthplace, cemetery, Show Barn and the Pedernales landscape. If seeing the Texas White House interior is essential, verify the current rehabilitation status immediately before travel rather than relying on an older guide or cached search result.",
      "The park is also easier to understand when paired with the adjacent state park. Texas Parks and Wildlife manages LBJ State Park & Historic Site and the Sauer-Beckmann Living History Farm; the National Park Service manages the federal historical park. The state park is where ranch driving permits are issued and adds German-Texan farm life, longhorns, bison and a broader regional story.",
      "A strong full-day visit moves from childhood to presidency: Johnson City Visitor Center, Boyhood Home and Johnson Settlement in the morning; then U.S. 290 west to LBJ State Park for the ranch permit, followed by the ranch drive. Johnson City, Hye, Stonewall and Fredericksburg all fit naturally around that route depending on food, lodging and additional interests.",
    ],
    managingAuthority: "National Park Service",
    officialUrl: "https://www.nps.gov/lyjo/",
    sourceCheckedAt: "2026-09-20",
    address: "Visitor Center: 100 Ladybird Lane, Johnson City, TX 78636",
    directions: "Use the Johnson City Visitor Center for the Boyhood Home and Johnson Settlement. For the ranch district, drive west on U.S. 290 and stop first at Lyndon B. Johnson State Park & Historic Site, 199 Park Road 52 near Stonewall, to obtain the required free ranch driving permit.",
    accessibilityNotes: "The Johnson City visitor center and settlement include accessible facilities, and visitors with disabilities may request a permit to drive into the Johnson Settlement. Ranch buildings and historic sites vary by surface and access. Check current NPS accessibility guidance or contact the park when a specific accommodation is essential.",
    areaGuide: {
      intro: "Plan the park as a two-district Hill Country route: childhood and family roots in Johnson City, then the ranch and presidential landscape near Stonewall.",
      nearbyAttractions: [
        {
          name: "LBJ Boyhood Home",
          description: "A focused Johnson City stop with free NPS programs inside Johnson's restored 1920s childhood home.",
          proximity: "Johnson City district",
          href: "/destination/lbj-boyhood-home-johnson-city",
        },
        {
          name: "LBJ State Park & Sauer-Beckmann Farm",
          description: "The adjacent state park issues ranch driving permits and adds German-Texan living history, longhorns, bison and Pedernales River context.",
          proximity: "Stonewall corridor",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "Johnson City",
          description: "Use the county seat for food, museums, Science Mill, the courthouse square and lodging around the Johnson City district.",
          proximity: "At the eastern district",
          href: "/destination/johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Johnson City",
          description: "Downtown restaurants, cafes, tasting rooms and Pecan Street Brewing work well before or after the Johnson City district.",
          proximity: "In town",
          href: "/destination/johnson-city",
        },
        {
          name: "Hye",
          description: "Continue west on U.S. 290 for Garrison Brothers and the Hye wine-and-spirits corridor before or after the ranch.",
          proximity: "Between Johnson City and Stonewall",
          href: "/destination/hye",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description: "Best for visitors prioritizing the Boyhood Home, Settlement and eastern Blanco County attractions.",
          proximity: "Eastern district",
          href: "/destination/johnson-city",
        },
        {
          name: "Fredericksburg",
          description: "The largest lodging and dining base west of the ranch, useful for pairing the park with wineries and Gillespie County attractions.",
          proximity: "West of Stonewall",
          href: "/destination/fredericksburg",
        },
      ],
      neighborhoods: [
        {
          name: "Johnson City district",
          description: "Visitor center, Boyhood Home and Johnson Settlement form the eastern park cluster.",
          proximity: "Johnson City",
        },
        {
          name: "LBJ Ranch / Stonewall corridor",
          description: "The ranch, state park, Sauer-Beckmann Farm and U.S. 290 visitor corridor form the western cluster.",
          proximity: "Stonewall",
        },
      ],
      familyStops: [
        {
          name: "Johnson Settlement",
          description: "The one-mile trail, longhorns and historic structures add a more active outdoor component to the presidential-history visit.",
          proximity: "Johnson City district",
        },
        {
          name: "Sauer-Beckmann Living History Farm",
          description: "The adjacent state-park farm gives families a working-history experience with demonstrations and livestock.",
          proximity: "Stonewall corridor",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
      ],
      sideTrips: [
        {
          name: "Hye and Garrison Brothers",
          description: "Add a working bourbon distillery and small-town U.S. 290 stop between Johnson City and Stonewall.",
          proximity: "U.S. 290 corridor",
          href: "/destination/garrison-brothers-distillery-hye",
        },
        {
          name: "Fredericksburg",
          description: "Continue west for German-Texan history, museums, restaurants, wineries and Hill Country lodging.",
          proximity: "West of Stonewall",
          href: "/destination/fredericksburg",
        },
      ],
    },
    authorityGuide: {
      whyItMatters: "The park preserves the full geographic arc of Lyndon Johnson's life in the Hill Country—from childhood and family settlement in Johnson City to the working ranch where presidential politics, family life and Texas identity converged.",
      assessment: {
        recommendedVisit: "Plan at least half a day for one district and a full day for both Johnson City and the LBJ Ranch.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit: "Strong for families interested in U.S. history, ranching and Texas culture, especially when the Boyhood Home and Sauer-Beckmann Farm are included.",
        firstTimeValue: "Very high for visitors who want a place-based understanding of LBJ rather than a single museum or house tour.",
      },
      itineraries: [
        {
          label: "Johnson City district",
          duration: "2–4 hours",
          steps: [
            "Start at the National Park Service Visitor Center for orientation and current program times.",
            "Join a Boyhood Home program when available.",
            "Walk the Johnson Settlement trail and historic structures.",
          ],
        },
        {
          label: "LBJ Ranch district",
          duration: "2–4 hours",
          steps: [
            "Stop first at LBJ State Park & Historic Site for the required free ranch driving permit.",
            "Drive the ranch route and stop at Junction School, reconstructed birthplace, cemetery viewing area and Show Barn.",
            "Treat the Texas White House Complex as closed unless NPS has explicitly announced a reopening.",
          ],
        },
        {
          label: "Full LBJ corridor",
          duration: "Full day",
          steps: [
            "Begin in Johnson City with the visitor center, Boyhood Home and Johnson Settlement.",
            "Drive west on U.S. 290 and stop at LBJ State Park / Sauer-Beckmann Farm.",
            "Use the free permit for the ranch drive, then finish in Hye, Stonewall or Fredericksburg.",
          ],
        },
      ],
      sources: [
        {
          label: "National Park Service — Basic Information",
          url: "https://www.nps.gov/lyjo/planyourvisit/basicinfo.htm",
          scope: "Current free admission, two-district layout, ranch-permit requirement and principal open sites.",
        },
        {
          label: "National Park Service — Alerts & Conditions",
          url: "https://www.nps.gov/lyjo/planyourvisit/conditions.htm",
          scope: "Current Johnson City hours, ranch gate times, open ranch stops and Texas White House Complex closure.",
        },
        {
          label: "National Park Service — Texas White House Rehabilitation",
          url: "https://www.nps.gov/lyjo/texas-white-house-closure.htm",
          scope: "Current rehabilitation closure, affected buildings and what remains open on the ranch.",
        },
        {
          label: "National Park Service — Directions",
          url: "https://www.nps.gov/lyjo/planyourvisit/directions.htm",
          scope: "Current two-district geography, Johnson City access and relationship between the park districts.",
        },
      ],
    },
  },
  "san-antonio-missions-national-historical-park": {
    summary: "Four Spanish colonial missions along the San Antonio River—Concepción, San José, San Juan and Espada—preserved as active cultural landscapes and part of the San Antonio Missions UNESCO World Heritage Site.", nearestTown: "San Antonio", bestSeason: "Fall through spring for walking and biking between missions; summer visits are best early in the day", entryNote: "The missions remain active religious sites as well as national park properties. Check NPS visitor-center hours and respect worship services and parish activities.", highlights: ["Mission San José", "Mission Concepción", "Missions San Juan and Espada", "Mission Reach walking and biking connections"], body: ["San Antonio Missions National Historical Park protects four missions that are best understood as a connected landscape rather than four isolated buildings. Their churches, compounds, irrigation systems and surrounding communities grew from Spanish colonial efforts that profoundly changed Indigenous life in South Texas.", "Mission San José contains the park's main visitor center and some of the most complete architecture, while Concepción, San Juan and Espada each retain distinct character. The Mission Reach of the San Antonio River provides a modern walking and biking spine between much of the system.", "Give the missions more than a single quick stop and remember that the churches still serve parish communities. Pairing the four NPS missions with the Alamo provides the broader UNESCO mission story, but check service schedules and visitor-center hours before planning interior access."], managingAuthority: NPS, officialUrl: "https://www.nps.gov/saan/",
  },
  "san-jacinto-battleground-state-historic-site": {
    summary: "The Houston Ship Channel battlefield where the Texian army defeated Santa Anna's forces on April 21, 1836, interpreted through the landscape, museum collections and the towering San Jacinto Monument.", nearestTown: "La Porte", bestSeason: "Fall through spring for comfortable walking across the exposed battlefield", entryNote: "Museum, monument and elevator operations can change independently of battlefield access. Check current San Jacinto Museum and Texas Historical Commission information before arrival.", highlights: ["San Jacinto Monument", "1836 battlefield landscape", "San Jacinto Museum", "Views over the Houston Ship Channel"], body: ["San Jacinto Battleground preserves the landscape of the decisive April 1836 battle that secured Texas independence from Mexico. The open ground matters because orientation to bayous, marshes and troop positions makes the short battle easier to understand than dates alone.", "The San Jacinto Monument rises above the battlefield and the museum adds artifacts, maps and interpretation that place the fighting within the broader Texas Revolution. The modern Houston Ship Channel surrounding the site creates a striking contrast with the nineteenth-century landscape.", "Start with interpretation before driving or walking the battlefield so the terrain has meaning. Battleship Texas is no longer berthed here, so travelers should not rely on older itineraries that treat the ship and battleground as a single two-attraction stop."], managingAuthority: THC, officialUrl: "https://www.thc.texas.gov/historic-sites/san-jacinto-battleground-state-historic-site",
  },
  "waco-mammoth-national-monument": {
    summary: "A Waco paleontology site protecting an in-place concentration of Columbian mammoth fossils, where a climate-controlled dig shelter lets visitors look directly down onto bones preserved where they were discovered.", nearestTown: "Waco", bestSeason: "Year-round; the principal fossil experience is protected indoors", entryNote: "The grounds are free to enter, while access to the fossil dig shelter may require a paid guided tour or ticket. Check NPS and site-partner information before arrival.", highlights: ["In-place Columbian mammoth fossils", "Climate-controlled dig shelter", "Paleontology and Ice Age interpretation", "Short trails along the Bosque River landscape"], body: ["Waco Mammoth National Monument protects a fossil site rather than a reconstructed museum display. The main shelter was built over the excavation so visitors can see mammoth and other Ice Age remains in the positions where paleontologists uncovered them.", "The concentration includes Columbian mammoths and other animals, giving the site scientific importance beyond a single skeleton. Guided interpretation explains how the fossils were found, what researchers can infer from the deposit and why the bones were left in place.", "Plan the visit around access to the dig shelter because that is the essential experience. The outdoor grounds add short walks and context, but checking current tour and ticket procedures before arrival avoids missing the fossil viewing area."], managingAuthority: NPS, officialUrl: "https://www.nps.gov/waco/",
  },
  "washington-on-the-brazos-state-historic-site": {
    summary: "The Brazos River site where delegates declared Texas independence in March 1836, now a major historic complex with Independence Hall interpretation, museums and the adjacent Barrington living-history farm.", nearestTown: "Washington", bestSeason: "Fall through spring for comfortable walking across the historic complex", entryNote: "The complex has undergone major redevelopment, so museum access, tickets and individual attractions can change. Check the Texas Historical Commission before traveling.", highlights: ["Independence Hall site", "Texas independence history", "Star of the Republic Museum complex", "Barrington living-history farm"], body: ["Washington-on-the-Brazos is one of the central geographic reference points of the Texas Revolution. Delegates met here in March 1836 to declare independence and frame the new Republic while military events were unfolding elsewhere across Texas.", "The site is larger than the reconstructed Independence Hall alone. Museums, archaeological and landscape interpretation, river geography and nearby Barrington Farm broaden the story from political documents to daily life in the Republic era.", "Recent redevelopment has changed how visitors move through the property, so consult current THC information before arrival. Give the complex several hours if you want the political, museum and living-history pieces to connect rather than reducing the stop to a single building."], managingAuthority: THC, officialUrl: "https://www.thc.texas.gov/historic-sites/washington-brazos-state-historic-site",
  },
};

export function applyCuratedDestinationBatch26(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch26(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch26);
}
