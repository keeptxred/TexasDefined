import type { Destination } from "./types";

const NPS = "National Park Service";
const THC = "Texas Historical Commission";
const curated: Record<string, Partial<Destination>> = {
  "chamizal-national-memorial": {
    summary: "An El Paso national memorial telling the story of a century-long U.S.–Mexico boundary dispute resolved peacefully in 1963, with museum exhibits, cultural programs and broad lawns beside the international border.",
    nearestTown: "El Paso",
    bestSeason: "Fall through spring for comfortable outdoor walking; indoor exhibits make the site useful year-round",
    entryNote: "The grounds and cultural center have separate operating patterns. Check NPS hours, performances and temporary closures before building a visit around a program.",
    highlights: ["U.S.–Mexico boundary history", "Chamizal Cultural Center and museum", "Public art and performance programs", "Open grounds near the international border"],
    body: [
      "Chamizal National Memorial preserves a diplomatic story rather than a battlefield. Changes in the Rio Grande created a disputed tract between El Paso and Ciudad Juárez, and the eventual settlement became a rare example of a long international boundary disagreement resolved through negotiation.",
      "The cultural center explains the geography, politics and human consequences of the dispute while also hosting visual and performing arts that reflect the borderlands communities surrounding the memorial. The grounds provide room to walk and understand how closely the site sits within the modern binational city.",
      "This is a place where context matters more than acreage. Start with the exhibits, then walk the grounds with the river, downtown El Paso and Ciudad Juárez in mind. Check the NPS calendar before traveling because performances and special programs can add substantially to a visit."
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/cham/",
  },
  "fanthorp-inn-state-historic-site": {
    summary: "A restored 1850s stagecoach inn in Anderson where travelers on early Texas roads ate, slept and exchanged news, interpreted today through the surviving inn, period rooms and stagecoach-era transportation history.",
    nearestTown: "Anderson",
    bestSeason: "Fall through spring for comfortable historic-site touring",
    entryNote: "Interior access and guided interpretation follow site hours. Check the Texas Historical Commission calendar before traveling, especially for stagecoach programs and special events.",
    highlights: ["Restored nineteenth-century stagecoach inn", "Early Texas travel and mail-route history", "Period-furnished rooms", "Stagecoach and living-history programs"],
    body: [
      "Fanthorp Inn makes early Texas travel tangible. Before railroads reorganized movement across the state, inns like this one were essential stops where passengers, mail carriers and drivers could eat, rest, change horses and gather information about the road ahead.",
      "The preserved building lets visitors move through the spaces that supported that traffic, from public rooms to sleeping quarters. Interpretation connects the inn to the broader network of stage routes that linked settlements across the young state.",
      "Plan enough time to read the room-by-room interpretation instead of treating the inn as a quick exterior photo stop. Special stagecoach and living-history programs can change the experience considerably, so verify the current schedule before making a dedicated trip."
    ],
    managingAuthority: THC,
    officialUrl: "https://www.thc.texas.gov/historic-sites/fanthorp-inn-state-historic-site",
  },
  "fort-davis-national-historic-site": {
    summary: "One of the Southwest's best-preserved frontier Army posts, set beneath the Davis Mountains with restored barracks, officers' quarters and exhibits interpreting soldiers, civilians and Buffalo Soldiers on the nineteenth-century Texas frontier.",
    nearestTown: "Fort Davis",
    bestSeason: "Fall through spring for mild temperatures; summer mornings are more comfortable for walking the open post grounds",
    entryNote: "Most of the site is explored on foot across exposed high-desert terrain. Check NPS alerts, building access and program schedules before arrival.",
    highlights: ["Restored frontier military buildings", "Buffalo Soldier history", "Davis Mountains setting", "Museum exhibits and self-guided post walk"],
    body: [
      "Fort Davis National Historic Site preserves an unusually complete frontier post in a dramatic mountain setting. The Army established the fort to protect travelers and commerce moving through West Texas, and many of its surviving buildings help visitors understand the scale of that military presence.",
      "The story includes the Black soldiers of the 9th and 10th U.S. Cavalry and 24th and 25th U.S. Infantry, commonly known as Buffalo Soldiers, as well as officers' families, civilian workers, local communities and the Indigenous peoples affected by U.S. expansion.",
      "Walk the post slowly rather than rushing between structures. The surrounding Davis Mountains are part of the historical geography, and combining Fort Davis with Davis Mountains State Park, Indian Lodge or McDonald Observatory can turn the site into the anchor of a full West Texas itinerary."
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/foda/",
  },
  "lyndon-b-johnson-national-historical-park": {
    summary: "A two-part Hill Country national historical park connecting Lyndon B. Johnson's boyhood in Johnson City with the LBJ Ranch near Stonewall, where presidential history, ranch life and the Pedernales River landscape come together.",
    nearestTown: "Johnson City",
    bestSeason: "Fall through spring for comfortable walking and ranch touring",
    entryNote: "Johnson City and the LBJ Ranch are separate park districts. Check NPS for current ranch-road access, house-tour availability and temporary closures before planning the day.",
    highlights: ["LBJ Ranch and Texas White House landscape", "Johnson boyhood home", "Junction School and family history", "Presidential and Hill Country ranch interpretation"],
    body: [
      "Lyndon B. Johnson National Historical Park is spread across the Hill Country rather than contained behind one gate. The Johnson City district interprets his childhood and family roots, while the ranch district near Stonewall shows the working landscape he returned to throughout his political career.",
      "The ranch became a functioning presidential setting during Johnson's administration, earning the Texas White House nickname. Roads, barns, airstrip, cemetery and river landscape help explain how closely Johnson tied political identity to this part of Texas.",
      "Build the itinerary around both districts if time allows and coordinate the national park with adjacent LBJ State Park and Historic Site. Access to particular ranch buildings can change, so check NPS conditions before assuming every interior tour is operating."
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/lyjo/",
  },
  "monument-hill-kreische-brewery-state-historic-site": {
    summary: "A blufftop La Grange historic site combining the Monument Hill tomb of Texas soldiers with the ruins of German immigrant Heinrich Kreische's nineteenth-century brewery above the Colorado River.",
    nearestTown: "La Grange",
    bestSeason: "Fall through spring for comfortable trail walking and bluff views",
    entryNote: "The site combines outdoor ruins, memorial grounds and trails. Check current Texas Historical Commission hours and any construction or trail notices before visiting.",
    highlights: ["Monument Hill memorial and tomb", "Kreische Brewery ruins", "Colorado River bluff views", "German-Texan immigration and brewing history"],
    body: [
      "Monument Hill and Kreische Brewery bring two very different Texas stories together on the same bluff. The memorial holds the remains of men associated with the Dawson and Mier expeditions, while nearby brewery ruins document the life and enterprise of German immigrant Heinrich Kreische.",
      "Kreische built a substantial home and brewery into the hillside, using gravity and the slope itself as part of the brewing process. The surviving ruins make the industrial story unusually easy to read in the landscape.",
      "Allow time for both halves of the property and for the bluff overlooks above the Colorado River. The contrast between military memorial, immigrant family history and nineteenth-century industry is what makes this site stronger than either story would be alone."
    ],
    managingAuthority: THC,
    officialUrl: "https://www.thc.texas.gov/historic-sites/monument-hill-kreische-brewery-state-historic-site",
  },
  "san-antonio-missions-national-historical-park": {
    summary: "Four Spanish colonial missions along the San Antonio River—Concepción, San José, San Juan and Espada—preserved as active cultural landscapes and part of the San Antonio Missions UNESCO World Heritage Site.",
    nearestTown: "San Antonio",
    bestSeason: "Fall through spring for walking and biking between missions; summer visits are best early in the day",
    entryNote: "The missions remain active religious sites as well as national park properties. Check NPS visitor-center hours and respect worship services and parish activities.",
    highlights: ["Mission San José", "Mission Concepción", "Missions San Juan and Espada", "Mission Reach walking and biking connections"],
    body: [
      "San Antonio Missions National Historical Park protects four missions that are best understood as a connected landscape rather than four isolated buildings. Their churches, compounds, irrigation systems and surrounding communities grew from Spanish colonial efforts that profoundly changed Indigenous life in South Texas.",
      "Mission San José contains the park's main visitor center and some of the most complete architecture, while Concepción, San Juan and Espada each retain distinct character. The Mission Reach of the San Antonio River provides a modern walking and biking spine between much of the system.",
      "Give the missions more than a single quick stop and remember that the churches still serve parish communities. Pairing the four NPS missions with the Alamo provides the broader UNESCO mission story, but check service schedules and visitor-center hours before planning interior access."
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/saan/",
  },
  "san-jacinto-battleground-state-historic-site": {
    summary: "The Houston Ship Channel battlefield where the Texian army defeated Santa Anna's forces on April 21, 1836, interpreted through the landscape, museum collections and the towering San Jacinto Monument.",
    nearestTown: "La Porte",
    bestSeason: "Fall through spring for comfortable walking across the exposed battlefield",
    entryNote: "Museum, monument and elevator operations can change independently of battlefield access. Check current San Jacinto Museum and Texas Historical Commission information before arrival.",
    highlights: ["San Jacinto Monument", "1836 battlefield landscape", "San Jacinto Museum", "Views over the Houston Ship Channel"],
    body: [
      "San Jacinto Battleground preserves the landscape of the decisive April 1836 battle that secured Texas independence from Mexico. The open ground matters because orientation to bayous, marshes and troop positions makes the short battle easier to understand than dates alone.",
      "The San Jacinto Monument rises above the battlefield and the museum adds artifacts, maps and interpretation that place the fighting within the broader Texas Revolution. The modern Houston Ship Channel surrounding the site creates a striking contrast with the nineteenth-century landscape.",
      "Start with interpretation before driving or walking the battlefield so the terrain has meaning. Battleship Texas is no longer berthed here, so travelers should not rely on older itineraries that treat the ship and battleground as a single two-attraction stop."
    ],
    managingAuthority: THC,
    officialUrl: "https://www.thc.texas.gov/historic-sites/san-jacinto-battleground-state-historic-site",
  },
  "waco-mammoth-national-monument": {
    summary: "A Waco paleontology site protecting an in-place concentration of Columbian mammoth fossils, where a climate-controlled dig shelter lets visitors look directly down onto bones preserved where they were discovered.",
    nearestTown: "Waco",
    bestSeason: "Year-round; the principal fossil experience is protected indoors",
    entryNote: "The grounds are free to enter, while access to the fossil dig shelter may require a paid guided tour or ticket. Check NPS and site-partner information before arrival.",
    highlights: ["In-place Columbian mammoth fossils", "Climate-controlled dig shelter", "Paleontology and Ice Age interpretation", "Short trails along the Bosque River landscape"],
    body: [
      "Waco Mammoth National Monument protects a fossil site rather than a reconstructed museum display. The main shelter was built over the excavation so visitors can see mammoth and other Ice Age remains in the positions where paleontologists uncovered them.",
      "The concentration includes Columbian mammoths and other animals, giving the site scientific importance beyond a single skeleton. Guided interpretation explains how the fossils were found, what researchers can infer from the deposit and why the bones were left in place.",
      "Plan the visit around access to the dig shelter because that is the essential experience. The outdoor grounds add short walks and context, but checking current tour and ticket procedures before arrival avoids missing the fossil viewing area."
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/waco/",
  },
  "washington-on-the-brazos-state-historic-site": {
    summary: "The Brazos River site where delegates declared Texas independence in March 1836, now a major historic complex with Independence Hall interpretation, museums and the adjacent Barrington living-history farm.",
    nearestTown: "Washington",
    bestSeason: "Fall through spring for comfortable walking across the historic complex",
    entryNote: "The complex has undergone major redevelopment, so museum access, tickets and individual attractions can change. Check the Texas Historical Commission before traveling.",
    highlights: ["Independence Hall site", "Texas independence history", "Star of the Republic Museum complex", "Barrington living-history farm"],
    body: [
      "Washington-on-the-Brazos is one of the central geographic reference points of the Texas Revolution. Delegates met here in March 1836 to declare independence and frame the new Republic while military events were unfolding elsewhere across Texas.",
      "The site is larger than the reconstructed Independence Hall alone. Museums, archaeological and landscape interpretation, river geography and nearby Barrington Farm broaden the story from political documents to daily life in the Republic era.",
      "Recent redevelopment has changed how visitors move through the property, so consult current THC information before arrival. Give the complex several hours if you want the political, museum and living-history pieces to connect rather than reducing the stop to a single building."
    ],
    managingAuthority: THC,
    officialUrl: "https://www.thc.texas.gov/historic-sites/washington-brazos-state-historic-site",
  },
};

export function applyCuratedDestinationBatch26(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch26(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch26);
}
