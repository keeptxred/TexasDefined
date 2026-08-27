import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayWeatherEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
}

const newcomerWeather: ArticleBlock[] = [
  { type: "heading", text: "Texas weather makes more sense when you plan by region and hazard" },
  { type: "paragraph", text: "The first surprise for many newcomers is that 'Texas weather' is not one climate. A Gulf Coast forecast can be dominated by humidity, tropical rainfall and coastal wind while the Panhandle is dealing with dry air, strong fronts, hail or winter weather. West Texas can combine intense sun, large day-night temperature swings and blowing dust. North and Central Texas can move from warm afternoons to severe thunderstorms or a sharp cold front quickly. The practical habit is to follow the National Weather Service office that covers the place where you actually live or travel rather than relying on statewide shorthand." },
  { type: "paragraph", text: "Build household plans around the hazards that apply locally. Know how you receive watches and warnings, identify a sturdy interior shelter location for severe storms, understand which roads or low-water crossings flood first, and know what the house needs before a freeze or prolonged heat event. A weather app is useful, but it should not be the only warning path. Wireless Emergency Alerts, local emergency notifications, NOAA Weather Radio and trusted local media provide redundancy when storms or outages disrupt normal routines." },
  { type: "heading", text: "Heat is a duration problem, not only a peak-temperature problem" },
  { type: "paragraph", text: "Texas heat can become dangerous because exposure accumulates across the day and because warm nights reduce recovery. Humidity can slow evaporative cooling, while dry heat can make sweat disappear so quickly that dehydration is easy to underestimate. Newcomers should plan outdoor work, exercise and sightseeing around conditions rather than pride: shift strenuous activity toward cooler hours, carry more water than a short outing seems to require, use shade and cooling breaks, and watch people who are older, very young, pregnant, ill or taking medications that can increase heat risk." },
  { type: "paragraph", text: "A heat plan also belongs inside the house. Know what you will do if air conditioning fails during an extreme-heat period or a power outage. Identify a safe cooled location before you need one, keep phones charged, and never rely on a parked vehicle as a cooling space for a child, dependent adult or pet. If someone develops confusion, loss of consciousness or other signs of severe heat illness, treat it as a medical emergency rather than simply moving the person to shade and waiting." },
  { type: "heading", text: "Thunderstorms can create several hazards at the same time" },
  { type: "paragraph", text: "A severe-weather day is not only a tornado day. National Weather Service guidance for Texas offices emphasizes damaging straight-line wind, large hail, lightning and flooding alongside tornadoes. That matters because people sometimes wait for a tornado warning before taking a storm seriously. If a severe thunderstorm warning covers your location, move away from windows and use a sturdy building. Hail can damage roofs and vehicles, while straight-line wind can bring down trees and power lines even when no tornado forms." },
  { type: "paragraph", text: "For tornado warnings, use the shelter plan rather than going outside to look. A small interior room on the lowest level, away from windows, is a common option when a purpose-built safe room or storm shelter is not available. Protect your head from debris and keep shoes, a flashlight and warning information nearby. Do not drive toward a storm to get a better view, and do not treat an overpass as a preferred tornado shelter." },
  { type: "heading", text: "Flash flooding is a road decision before it is a water-depth calculation" },
  { type: "paragraph", text: "Texas flash flooding can occur far from where the heaviest rain fell because water moves downstream through creeks, draws and drainage systems. A familiar low-water crossing can become dangerous quickly, especially at night when depth and current are hard to judge. The safe rule is not to test the water with the vehicle. If water covers the roadway or a barricade is in place, turn around and use another route. A successful crossing by another driver does not prove the road is safe for your vehicle." },
  { type: "paragraph", text: "Homeowners should learn how rainfall behaves on their own property as well. Watch where roof water drains, where streets pond and which approach roads are vulnerable. Flood insurance and home insurance are separate planning questions, and mapped flood zones do not describe every possible flood. Weather awareness therefore includes both immediate safety and understanding the property-specific consequences of heavy rain." },
  { type: "heading", text: "Cold fronts and freezes reward advance preparation" },
  { type: "paragraph", text: "A mild Texas winter can make a hard freeze feel more surprising, not less damaging. Monitor forecasts when strong fronts approach and prepare exposed plumbing, pets, plants and outdoor equipment before temperatures fall. Pool and irrigation systems should follow manufacturer-specific freeze guidance instead of generic valve or draining instructions. If the household relies on electric heat or circulation-based freeze protection, include power loss in the plan rather than assuming electricity will remain available through the coldest hours." },
  { type: "paragraph", text: "Ice can be more disruptive than snow because a thin glaze affects bridges, ramps and untreated roads quickly. Delay travel when conditions are hazardous, especially when local authorities or the National Weather Service advise against it. If travel is unavoidable, check current road conditions, slow down and leave far more stopping distance than normal. A four-wheel-drive vehicle can improve traction in some situations, but it does not shorten braking distance on ice." },
  { type: "heading", text: "Coastal storms and inland severe weather require different checklists" },
  { type: "paragraph", text: "Along the Gulf Coast, tropical-weather planning includes storm surge, wind, heavy rain, tornadoes and long power outages. People well inland can still receive flooding, wind and tornado impacts from tropical systems. Evacuation decisions should follow local emergency-management instructions rather than a generic distance from the shoreline. Know the evacuation zone if one applies, keep vehicle fuel or charging margin, protect essential documents and medications, and decide where household members will reconnect if communications are unreliable." },
  { type: "paragraph", text: "In drier parts of Texas, drought and strong wind can shift the concern toward wildfire and blowing dust. Do not assume a cloudless sky means low weather risk. Follow burn bans and fire restrictions, avoid actions that can ignite dry vegetation, and use local road guidance when visibility collapses in dust. The broader lesson is that Texas weather preparation works best as a set of regional playbooks rather than one universal emergency checklist." },
  { type: "heading", text: "The habit newcomers learn fastest is to check conditions before committing to the day" },
  { type: "paragraph", text: "Weather changes travel, yard work, outdoor events and home maintenance in Texas often enough that checking the forecast becomes routine. Before a long drive, park visit or outdoor event, look at the hourly forecast, hazard outlook and current warnings for the specific route and destination. Before severe weather, make decisions while roads are still passable and daylight remains. The goal is not to fear Texas weather; it is to stop treating heat, floods, hail, wind, freezes and tropical systems as surprises that can only be dealt with after they arrive." },
];

export const texasGatewayBatch5WeatherEnrichment: Record<string, GatewayWeatherEnrichment> = {
  "texas-weather-surprises-newcomers": {
    body: newcomerWeather,
    sourceName: "National Weather Service Fort Worth/Dallas — Preparedness & Safety",
    sourceUrl: "https://www.weather.gov/fwd/safety",
    internalLinks: [
      { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze" },
      { href: "/article/texas-hurricane-home-prep-checklist", label: "Texas hurricane home-prep checklist" },
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
      { href: "/article/what-to-keep-in-car-for-texas-road-trip", label: "What to keep in the car on a Texas road trip" },
      { href: "/moving-to-texas", label: "Moving to Texas" },
    ],
  },
};
