import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayBatch7RegionalEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
  relatedCollections?: string[];
  relatedDestinations?: string[];
}

const westTexas: ArticleBlock[] = [
  { type: "heading", text: "West Texas is a collection of landscapes, not one empty desert" },
  { type: "paragraph", text: "The most common misconception about West Texas is geographic. The region includes desert basins, mountain ranges, grasslands, irrigated agricultural areas, oil-producing cities, ranch country and border communities. Big Bend National Park alone combines Chihuahuan Desert lowlands with the Chisos Mountains, while the Davis Mountains and Guadalupe Mountains create still more elevation and climate contrast. Describing all of that as flat desert erases the feature that makes western Texas worth a dedicated trip: the landscape changes dramatically over long distances." },
  { type: "paragraph", text: "The National Park Service describes Big Bend as remote but increasingly popular, with scenic vistas, wildlife, historic sites, dark skies and border culture among the reasons people visit. That combination is a better model for understanding West Texas than the idea of an empty space between cities. Remoteness is real, but it changes planning rather than eliminating things to see." },
  { type: "heading", text: "Distance is infrastructure, not an inconvenience to ignore" },
  { type: "paragraph", text: "NPS warns Big Bend visitors that distances between towns and services are considerable. That lesson extends well beyond the park. In large western counties, fuel, food, lodging, cell coverage and repair services may be farther apart than metro-area travelers expect. Build fuel or charging margin before leaving a larger town, carry water, and avoid an itinerary that depends on every rural service being open late." },
  { type: "paragraph", text: "A slower route is not necessarily wasted time. Scenic highways, ranch roads, railroad towns, historic markers and broad changes in geology are part of the experience. Plan fewer anchors per day and leave enough daylight to reach the next stop comfortably. When a road is remote, current weather and road-condition information matter more than squeezing one extra attraction into the schedule." },
  { type: "heading", text: "Big Bend is important, but it is not a synonym for West Texas" },
  { type: "paragraph", text: "Big Bend is a powerful first trip because it makes desert and mountain geography obvious, but it should not become the only reference point. El Paso is a major border city with its own food, history and mountain setting. Fort Davis combines mountain country with frontier and astronomy history. The Permian Basin tells a different energy and urban-growth story. Alpine, Marathon, Marfa and smaller communities each occupy different roles in the regional travel network." },
  { type: "paragraph", text: "The same distinction matters culturally. Borderlands, Mexican and Mexican American history, Indigenous history, ranching, railroads, military history, oil and gas, astronomy, agriculture and contemporary art all overlap without making any one town representative of the entire region. A good West Texas itinerary chooses a theme or corridor instead of treating Marfa or Big Bend as a complete explanation." },
  { type: "heading", text: "Elevation makes weather more complicated than the desert stereotype" },
  { type: "paragraph", text: "The National Park Service notes substantial temperature differences between Big Bend's desert areas and the Chisos Mountains. A hot desert afternoon can coexist with much cooler mountain conditions, and winter can bring freezing temperatures. Travelers should check the actual elevation and forecast for the planned activity rather than packing for an abstract idea of desert weather." },
  { type: "paragraph", text: "Summer heat is a serious planning constraint. NPS advises avoiding midday hiking during extreme heat and carrying substantial water. Thunderstorms can create flash flooding in dry washes even when rain is not falling directly overhead. Wind, wildfire conditions and winter weather can also change road or outdoor plans. West Texas rewards flexibility more than a rigid timetable." },
  { type: "heading", text: "Dark skies and quiet are real attractions, but they require responsible planning" },
  { type: "paragraph", text: "Low population density makes parts of West Texas unusually valuable for night-sky viewing. That does not mean every roadside is a safe astronomy pull-off. Use established parks, observatories, campgrounds or legal public access where possible. Preserve dark adaptation with low-intensity light, avoid blocking roads and respect private property. In remote areas, tell someone where you are going and when you expect to return." },
  { type: "paragraph", text: "The best correction to the empty-West-Texas stereotype is to travel it deliberately. Give the region enough days, choose one corridor, keep fuel and water margins, and allow the scale of the landscape to become part of the trip rather than something to race across." },
];

const eastTexas: ArticleBlock[] = [
  { type: "heading", text: "East Texas begins with forest and water, not the usual Texas stereotype" },
  { type: "paragraph", text: "Texas Parks and Wildlife describes the Pineywoods as a broad pine and hardwood forest region extending across eastern Texas, with rolling hills, bottomlands, bogs and cypress-tupelo swamps. Annual rainfall is much higher than in western Texas, supporting a landscape that can feel closer to parts of the southeastern United States than to the desert imagery many visitors associate with Texas." },
  { type: "paragraph", text: "That ecological difference changes travel. Shade, forest trails, lakes, wetlands, fishing and birding become central. Roads curve through trees instead of opening onto huge horizons. Humidity and rainfall affect comfort and trail conditions. A first East Texas trip should be designed around the region's water and forest systems rather than trying to recreate a Hill Country or West Texas itinerary." },
  { type: "heading", text: "Caddo Lake is dramatic, but it is one expression of a much larger region" },
  { type: "paragraph", text: "Caddo Lake State Park highlights bald cypress trees draped with Spanish moss, bayous, paddling, fishing, trails and historic Civilian Conservation Corps cabins. It is visually distinctive enough to dominate East Texas travel imagery, but the Piney Woods also contains reservoirs, national forest land, river corridors, state parks and many historic towns." },
  { type: "paragraph", text: "Use Caddo as an introduction rather than the only stop. Pair water with a nearby town, forest trail, heritage site or local food stop. Elsewhere in East Texas, a lake-focused weekend can center on fishing or boating, while another itinerary may emphasize timber history, railroad development, Black heritage, courthouse towns or forest ecology." },
  { type: "heading", text: "Rainfall and humidity should shape the daily schedule" },
  { type: "paragraph", text: "TPWD's Pineywoods guidance notes rainfall totals that are high by Texas standards. That supports the lush landscape but also means visitors should expect wet trails, mosquitoes, muddy access points and thunderstorms at times. Check current park and weather information rather than assuming a trail or paddling route will match photographs from another season." },
  { type: "paragraph", text: "Warm-season humidity changes exertion even when the thermometer is lower than in drier western parts of the state. Start outdoor activities earlier, bring water, use insect protection where appropriate and keep an indoor or low-exposure backup. During severe weather, wooded areas introduce hazards such as falling limbs in addition to lightning and flooding." },
  { type: "heading", text: "The region's economy is visible in the towns" },
  { type: "paragraph", text: "Timber, railroads, agriculture, oil, lakes and regional trade shaped East Texas communities differently from Central Texas courthouse and ranching corridors. Old depots, lumber history, brick downtowns, college towns and highway commercial centers reveal those economic layers. A small-town walk becomes more useful when it asks what industry or transportation route caused the town to grow where it did." },
  { type: "paragraph", text: "Food reflects the same connections. East Texas cooking overlaps broader Southern traditions while maintaining Texas barbecue, hunting, fishing and agricultural influences. Travelers should expect differences rather than asking which regional version is the one correct Texas style." },
  { type: "heading", text: "Wildlife and birding are stronger trip anchors than many first-time visitors expect" },
  { type: "paragraph", text: "TPWD notes substantial wildlife diversity in the Pineywoods, including woodland bird species associated with the region's pine forests and bottomlands. Lakes and wetlands add water birds, while forest edges create another habitat type. Even travelers who are not dedicated birders can improve a trip by spending one early morning at a park, wildlife trail or water edge before the day's town and food stops." },
  { type: "paragraph", text: "Dense vegetation also changes how wildlife encounters feel. Do not approach or feed animals, and pay attention to where hands and feet go around brush, downed wood and shorelines. Follow the managing park or public-land authority's current rules rather than assuming every forest or lake has the same access conditions." },
  { type: "heading", text: "East Texas deserves enough time to become its own destination" },
  { type: "paragraph", text: "Driving through on an interstate can hide the qualities that distinguish the region. A better first trip chooses one lake or forest anchor, one historic town and one regional food or cultural stop within a manageable radius. Once the traveler experiences cypress water, pine forest and the wetter climate directly, the idea that Texas is one mostly dry landscape becomes difficult to sustain." },
];

export const texasGatewayBatch7RegionalEnrichment: Record<string, GatewayBatch7RegionalEnrichment> = {
  "things-people-get-wrong-about-west-texas": {
    body: westTexas,
    sourceName: "National Park Service — Big Bend Plan Your Visit",
    sourceUrl: "https://www.nps.gov/bibe/planyourvisit/index.htm",
    internalLinks: [
      { href: "/article/texas-regions-that-feel-like-different-states", label: "Texas regions that feel completely different" },
      { href: "/article/best-texas-stargazing-weekend-trips", label: "Texas stargazing weekend trips" },
      { href: "/article/best-texas-trips-for-scenic-drives", label: "Texas scenic-drive trips" },
    ],
    relatedDestinations: ["big-bend-national-park", "guadalupe-mountains-national-park"],
  },
  "things-people-dont-expect-about-east-texas": {
    body: eastTexas,
    sourceName: "Texas Parks and Wildlife Department — East Texas Pineywoods",
    sourceUrl: "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/east-texas-pineywoods/",
    internalLinks: [
      { href: "/article/texas-regions-that-feel-like-different-states", label: "Texas regions that feel completely different" },
      { href: "/article/texas-birds-you-will-actually-notice", label: "Texas birds you will actually notice" },
      { href: "/article/best-texas-weekend-trips-for-outdoor-lovers", label: "Texas weekend trips for outdoor lovers" },
    ],
    relatedDestinations: ["caddo-lake-state-park", "martin-dies-jr-state-park"],
  },
};
