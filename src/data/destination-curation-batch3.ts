import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curatedBatch3: Record<string, Partial<Destination>> = {
  "franklin-mountains-state-park": {
    summary: "A vast desert-mountain park rising above El Paso with more than 100 miles of trails, rugged ridgelines, rock climbing and high-desert views across the city and borderlands.",
    nearestTown: "El Paso",
    bestSeason: "Fall through spring for hiking and climbing; summer heat is severe",
    entryNote: "Trail difficulty varies widely and exposed desert conditions demand water and sun protection. Check current alerts and unit access before visiting.",
    highlights: [
      "More than 100 miles of hiking and biking trails",
      "Tom Mays Unit access to desert ridges and family-friendly nature walks",
      "Rock climbing and rugged high-desert terrain",
      "Broad views across El Paso and the surrounding borderlands",
    ],
    body: [
      "Franklin Mountains State Park gives El Paso something rare for a major Texas city: true mountain terrain directly on its doorstep. Desert slopes and rocky ridges rise above the urban basin, creating a park where a short drive can lead to serious hiking, biking and climbing.",
      "With more than 100 miles of trails, the park works for everything from a short nature walk to a demanding full-day route. The Tom Mays Unit is a useful starting point for first-time visitors, while more experienced hikers and riders can build longer routes through exposed desert country and higher ridges.",
      "This is an environment where heat, sun and limited shade matter more than mileage alone. Carry ample water, choose routes that match your experience and check current park alerts before setting out, especially during hot or windy weather.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains",
  },
  "davis-mountains-state-park": {
    summary: "A high-desert mountain park near Fort Davis where CCC-built roads and structures, Skyline Drive and rugged trails climb from Limpia Creek toward broad West Texas overlooks.",
    nearestTown: "Fort Davis",
    bestSeason: "Spring and fall for hiking and riding; summer is cooler than the low desert but still exposed",
    entryNote: "Check current trail and weather alerts before heading into the backcountry. Elevation, sun and fast-changing mountain weather can affect conditions.",
    highlights: [
      "4.5-mile Skyline Drive Trail across mountain ridges and valleys",
      "CCC Trail connection toward Fort Davis National Historic Site",
      "Historic Civilian Conservation Corps landscape and Indian Lodge",
      "Horseback riding and primitive routes in Limpia Canyon",
    ],
    body: [
      "Davis Mountains State Park feels different from most Texas parks because elevation changes the entire atmosphere. The air is cooler, the vegetation shifts, and ridges rise above the Chihuahuan Desert in a landscape shaped as much by mountain weather as by desert sun.",
      "The 4.5-mile Skyline Drive Trail is the signature route, moving across ridges and valleys to broad overlooks. The shorter CCC Trail links the park’s 1930s history with a route toward Fort Davis National Historic Site, while Limpia Canyon adds equestrian and primitive camping options for visitors looking for a rougher experience.",
      "Plan for elevation and exposure rather than assuming West Texas always means flat desert. Carry water, check trail conditions and weather, and leave time to explore the park’s CCC-built structures as part of the visit rather than treating them as background scenery.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/davis-mountains",
  },
  "government-canyon-state-natural-area": {
    summary: "A protected canyon-and-grassland preserve on San Antonio’s northwest edge with nearly 40 miles of trails and the only known dinosaur tracks on public land in Bexar County.",
    nearestTown: "San Antonio",
    coordinates: { lat: 29.549316, lng: -98.764715 },
    bestSeason: "Fall through spring for hiking; some protected-habitat trails are seasonal",
    entryNote: "The natural area often reaches capacity. Reserve ahead and check trail closures, weather and protected-habitat access before visiting.",
    highlights: [
      "Nearly 40 miles of hiking and biking trails",
      "Five-mile hike to roughly 104-million-year-old dinosaur tracks",
      "Protected canyonlands and grasslands surprisingly close to San Antonio",
      "Seasonal Protected Habitat Area with special access rules",
    ],
    body: [
      "Government Canyon exists first to protect a sensitive landscape and second to invite people into it. That conservation mission gives the natural area a wilder feel than a typical city-edge park, even though San Antonio is only minutes away.",
      "Nearly 40 miles of trails cross grasslands, limestone uplands and canyon country. The best-known destination is a roughly five-mile hike to dinosaur tracks attributed to Acrocanthosaurus and Sauroposeidon, preserved in rock about 104 million years old and notable as the only known dinosaur footprints on public land in Bexar County.",
      "Trail access is deliberately managed to protect habitat, and closures can follow poor weather. Reserve entry, check the current trail report and note that pets are restricted to front-country areas rather than the backcountry route to the dinosaur tracks.",
    ],
    county: "Bexar",
    address: "12861 Galm Rd, San Antonio, TX 78254",
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/government-canyon",
    accessibilityNotes: "An all-terrain wheelchair is available by request; contact the natural area before arrival for current availability.",
  },
  "huntsville-state-park": {
    summary: "A Piney Woods park north of Houston centered on 210-acre Lake Raven, with 21 miles of trails, paddling, fishing, swimming and a forested campground landscape shared with alligators and abundant birdlife.",
    nearestTown: "Huntsville",
    bestSeason: "Fall through spring for trails; warm months are popular for Lake Raven swimming and paddling",
    entryNote: "Reserve ahead on busy weekends and follow posted alligator-safety guidance around Lake Raven and wetland areas.",
    highlights: [
      "210-acre Lake Raven for paddling, fishing and designated swimming",
      "21 miles of hiking and biking trails through Piney Woods forest",
      "Kayak rentals, fishing piers and idle-speed boating",
      "Bird blind, nature center and frequent wildlife sightings",
    ],
    body: [
      "Huntsville State Park is close enough to Houston for a day trip but wooded enough to feel like a real Piney Woods escape. Lake Raven anchors the park, while tall forest, wetland edges and long trail loops give visitors several different ways to spend a day outside.",
      "The 210-acre lake supports fishing, paddling and a designated swimming area, and the park maintains kayak rentals and multiple fishing access points. Away from the water, 21 miles of trails offer enough distance for serious hikers and cyclists without requiring a remote backcountry trip.",
      "Alligators live in the park, so wildlife awareness is part of normal trip planning rather than a novelty. Follow park guidance, stay alert near water and reserve ahead for popular camping and day-use dates.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/huntsville",
  },
  "lake-mineral-wells-state-park": {
    summary: "A North Texas Cross Timbers park combining a 640-acre lake, 12-plus miles of park trails, the 20-mile Mineral Wells Trailway and one of the region’s few natural rock-climbing areas at Penitentiary Hollow.",
    nearestTown: "Mineral Wells",
    coordinates: { lat: 32.812655, lng: -98.043368 },
    bestSeason: "Fall through spring for trails and climbing; spring through fall is popular for lake activities",
    entryNote: "The park often reaches capacity. Climbers must check in and sign required forms, and climbing or trails may close in wet conditions.",
    highlights: [
      "Penitentiary Hollow natural rock climbing and rappelling area",
      "640-acre lake for paddling, fishing and swimming",
      "More than 12 miles of Cross Timbers park trails",
      "20-mile rails-to-trails corridor linking toward Mineral Wells and Weatherford",
    ],
    body: [
      "Lake Mineral Wells is unusually versatile for a North Texas state park. The lake supports paddling, fishing and swimming, while the surrounding Cross Timbers landscape adds rocky trails, horseback riding and a separate long-distance trailway built on an old railroad corridor.",
      "Penitentiary Hollow is the standout feature for climbers and rappellers, with steep natural rock walls rare in this part of the state. Beyond the climbing area, more than 12 miles of park trails connect lakefront and wooded terrain, while the 20-mile Trailway extends the experience well beyond park boundaries on gentle former railroad grades.",
      "Wet weather can close both trails and climbing areas, and climbers have specific check-in and safety requirements. Reserve entry on busy dates and confirm current conditions before making the drive for a specific activity.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
  },
  "mustang-island-state-park": {
    summary: "More than five miles of Gulf beach south of Port Aransas, with drive-up coastal camping, surf and bay fishing, migration-season birding and a 20-mile paddling trail along the island’s protected western shoreline.",
    nearestTown: "Corpus Christi",
    coordinates: { lat: 27.672162, lng: -97.175309 },
    bestSeason: "Spring and fall for birding and milder weather; summer is busiest for beach trips",
    entryNote: "The park often reaches capacity in spring and summer. Reserve ahead and check surf, weather and beach-driving conditions before arrival.",
    highlights: [
      "More than five miles of Gulf of Mexico coastline",
      "20-mile paddling trail along the Corpus Christi Bay side",
      "Beach camping plus developed water-and-electric campsites",
      "Excellent spring and fall migration birding and shallow-water fishing",
    ],
    body: [
      "Mustang Island State Park gives visitors a relatively undeveloped stretch of barrier-island coast between Port Aransas and Corpus Christi. The Gulf side is built around beach time, surf fishing and camping, while the bay side offers a quieter network of shallow water and marsh habitat.",
      "The Mustang Island State Park Paddling Trail follows the western shoreline in three segments totaling about 20 miles. Those protected bay waters are particularly well suited to fishing, birding and wildlife watching, providing a completely different experience from the open Gulf beach only a short distance away.",
      "Coastal conditions change quickly. Check surf, wind, tides and storm forecasts, understand current beach-driving rules and reserve entry during busy spring and summer periods rather than assuming space will be available on arrival.",
    ],
    county: "Nueces",
    address: "9394 State Highway 361, Corpus Christi, TX 78418",
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/mustang-island",
  },
};

export function applyCuratedDestinationBatch3(destination: Destination): Destination {
  const override = curatedBatch3[destination.slug];
  if (!override) return destination;
  return {
    ...destination,
    ...override,
    hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero,
  };
}

export function applyCuratedDestinationsBatch3(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch3);
}
