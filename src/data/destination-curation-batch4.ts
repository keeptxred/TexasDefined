import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curated: Record<string, Partial<Destination>> = {
  "mckinney-falls-state-park": {
    summary: "An Austin state park where Onion Creek drops over broad limestone ledges at Upper and Lower Falls, with swimming holes, trails, camping and reminders of Central Texas history only minutes from the city.",
    nearestTown: "Austin",
    bestSeason: "Spring and fall for hiking; swimming depends on current creek conditions",
    entryNote: "Reserve a day pass for busy weekends and check creek, swimming and trail conditions after heavy rain.",
    highlights: [
      "Upper and Lower Falls on Onion Creek",
      "Swimming and fishing when water conditions allow",
      "Rock Shelter Trail and traces of early Central Texas settlement",
      "Camping and easy access from Austin",
    ],
    body: [
      "McKinney Falls is one of Austin’s most useful escapes because the landscape changes quickly once you enter the park. Onion Creek crosses shelves of limestone and drops at Upper and Lower Falls, creating broad pools and shaded stretches that feel removed from the city despite the short drive.",
      "The falls are the obvious first stop, but trails connect prairie, creek bottom and historic features across the park. Swimming is popular when conditions are safe, while fishing, cycling and camping make McKinney Falls more than a quick overlook.",
      "Water is the variable to watch. Heavy rain can change creek conditions rapidly, and drought can reduce flow. Check current park alerts and swimming conditions before leaving, and reserve entry ahead for popular weekends.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/mckinney-falls",
  },
  "tyler-state-park": {
    summary: "A wooded East Texas park centered on a spring-fed lake, with tall pines, CCC-era character, paddling, fishing, swimming and trails close enough to Tyler for an easy weekend escape.",
    nearestTown: "Tyler",
    bestSeason: "Fall through spring for hiking; summer is popular for lake activities",
    entryNote: "Day-use and camping can fill on popular weekends. Reserve ahead and confirm current swimming and boating conditions.",
    highlights: [
      "Spring-fed lake for paddling, fishing and swimming",
      "Pine and hardwood forest trails",
      "Civilian Conservation Corps-era park features",
      "Cabins, camping and family-friendly day use",
    ],
    body: [
      "Tyler State Park delivers the classic Piney Woods combination of tall trees and quiet water. The spring-fed lake sits at the center of the park, with trails and campsites tucked into pine and hardwood forest around it.",
      "Warm-weather visits revolve around swimming, paddling and fishing, while cooler months make the trail system the main attraction. The park’s CCC legacy adds stonework and a sense of age that separates it from a simple lakeside recreation area.",
      "Because Tyler State Park works equally well as a day trip or overnight stop, weekends can become busy. Reserve ahead when possible and check current lake, trail and facility notices before departure.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/tyler",
  },
  "stephen-f-austin-state-park": {
    summary: "A Brazos River bottomland park west of Houston with shaded trails, camping, wildlife and a direct historical connection to Stephen F. Austin’s nearby colonial headquarters at San Felipe de Austin.",
    nearestTown: "San Felipe",
    bestSeason: "Fall through spring for comfortable hiking and camping",
    entryNote: "Low-lying trails can be affected by wet weather and Brazos River conditions. Check park alerts before traveling.",
    highlights: [
      "Shaded Brazos River bottomland forest",
      "Easy hiking and biking trails with frequent wildlife sightings",
      "Camping and cabins convenient to the Houston area",
      "Close connection to the San Felipe de Austin State Historic Site",
    ],
    body: [
      "Stephen F. Austin State Park is less about a single dramatic landmark than the feel of the Brazos bottomlands. Large trees, shaded trails and river-country wildlife make it a practical close-to-Houston place for camping, walking and slowing down.",
      "Its historical setting matters. The park sits near San Felipe de Austin, the headquarters of Stephen F. Austin’s colony and one of the most important sites in early Anglo-American Texas. Pairing the park with the nearby historic site turns a simple outdoor stop into a fuller look at the region.",
      "The Brazos floodplain can be wet and muddy after storms, so check current trail and park conditions before leaving. Cooler months are generally the most comfortable for longer walks and camping.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/stephen-f-austin",
  },
  "village-creek-state-park": {
    summary: "A quiet Big Thicket-area park near Lumberton where Village Creek winds through bottomland hardwoods and cypress, offering paddling, fishing, camping and shaded trails in humid Southeast Texas forest.",
    nearestTown: "Lumberton",
    bestSeason: "Fall through spring for cooler trails and paddling weather",
    entryNote: "Creek levels and flooding can affect paddling and trails. Check current water and park conditions before traveling.",
    highlights: [
      "Paddling on scenic Village Creek",
      "Bottomland hardwood and cypress forest",
      "Fishing, camping and shaded nature trails",
      "Convenient access to the broader Big Thicket region",
    ],
    body: [
      "Village Creek State Park captures Southeast Texas at water level. The creek bends through a forest of hardwoods, pines and cypress, creating a landscape that feels more like the Deep South than the dry Texas stereotype.",
      "Paddling is the signature experience when water levels cooperate, but the park also works for fishing, short hikes and camping beneath dense tree cover. It makes a useful base for exploring the greater Big Thicket region without requiring a complicated itinerary.",
      "Rainfall can reshape the visit. High water may close trails or make paddling unsafe, while low water can expose sandbars and make some routes harder. Check current creek and park conditions before setting out.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/village-creek",
  },
  "sea-rim-state-park": {
    summary: "A remote Gulf Coast park where marsh meets beach near Sabine Pass, combining more than five miles of shoreline with paddling trails, birding, fishing and primitive coastal camping.",
    nearestTown: "Sabine Pass",
    bestSeason: "Fall through spring for birding and milder beach weather",
    entryNote: "Coastal weather, tides and storms can affect beach and marsh access. Check park alerts and marine conditions before the drive.",
    highlights: [
      "Gulf beach and coastal marsh in the same park",
      "Paddling trails through marsh habitat",
      "Strong birding during migration",
      "Beach camping, fishing and expansive coastal sunsets",
    ],
    body: [
      "Sea Rim sits at one of the most interesting ecological edges in Texas: salt marsh on one side and open Gulf beach on the other. The park feels remote, flat and exposed, with weather and water shaping almost every part of the experience.",
      "Visitors can move between beach walking, fishing and camping on the shoreline and paddling routes through the marsh. Migration seasons can bring exceptional birdlife, while the open horizon makes even a simple sunset feel like a destination event.",
      "This is a place to plan around conditions rather than a fixed schedule. Tropical systems, high tides, wind and heavy rain can change access quickly, so check current park and coastal alerts before leaving.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/sea-rim",
  },
  "goose-island-state-park": {
    summary: "A Rockport-area coastal park on Aransas Bay known for fishing, birding, bayside camping and the massive centuries-old Big Tree, one of Texas’s most famous live oaks.",
    nearestTown: "Rockport",
    bestSeason: "Fall through spring for birding and comfortable coastal weather",
    entryNote: "Swimming is not the main attraction here; fishing, birding and coastal scenery are. Check storm and bay conditions before visiting.",
    highlights: [
      "The Big Tree, a centuries-old coastal live oak",
      "Fishing from shore and pier areas on Aransas Bay",
      "Birding along a major migration corridor",
      "Bayside and wooded camping near Rockport",
    ],
    body: [
      "Goose Island is a coastal park where the water and the trees compete for attention. Aransas Bay brings fishing, wind and migrating birds, while inland sections hold oak habitat and the park’s celebrated Big Tree, a live oak that has survived centuries of Gulf Coast weather.",
      "The park is especially useful for anglers and birders. Shoreline access and nearby bays support fishing, while seasonal migration can fill the surrounding coastal habitat with waterfowl and songbirds. Camping ranges from sites close to the bay to more protected wooded areas.",
      "Coastal conditions matter year-round. Check weather, wind and park alerts before arrival, especially during storm season, and treat the Big Tree area as a natural landmark rather than just a quick roadside photo stop.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/goose-island",
  },
  "seminole-canyon-state-park-historic-site": {
    summary: "A Lower Pecos canyon park near Comstock where limestone shelters preserve ancient rock art, with guided tours, desert trails and overlooks above rugged canyon country near the Rio Grande.",
    nearestTown: "Comstock",
    bestSeason: "Fall through spring for desert hiking and guided rock-art tours",
    entryNote: "Access to major rock-art sites is by guided tour. Tour schedules, heat and trail conditions should be checked in advance.",
    highlights: [
      "Guided tours to Lower Pecos rock-art shelters",
      "Fate Bell Shelter and thousands of years of human history",
      "Canyon-rim trails and desert overlooks",
      "Visitor center interpreting Lower Pecos archaeology and culture",
    ],
    body: [
      "Seminole Canyon is one of the most important cultural landscapes in the Texas state-park system. Rock shelters in the Lower Pecos country preserve pictographs created by people who lived in this region thousands of years ago, giving the park a depth of human history that goes far beyond scenery.",
      "The major rock-art areas are protected and visited on guided tours, which is part of what keeps them intact. Above the shelters, desert trails follow canyon rims and open views toward the rugged country around the Rio Grande.",
      "Plan around the tour schedule first, then the weather. Summer heat can be severe, and distances in this part of Texas are deceptive. Carry water, reserve or confirm tours when needed and check current park notices before making the drive.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/seminole-canyon",
  },
  "kickapoo-cavern-state-park": {
    summary: "A remote western Hill Country park near Brackettville with wild-cave tours, rugged trails and seasonal evening flights of Mexican free-tailed bats from Stuart Bat Cave.",
    nearestTown: "Brackettville",
    bestSeason: "Spring and fall for hiking; bat flights are seasonal",
    entryNote: "Cave access is by scheduled guided tour, and bat-viewing opportunities are seasonal. Reserve tours and check current schedules before traveling.",
    highlights: [
      "Guided wild-cave tours in Kickapoo Cavern",
      "Seasonal bat flights from Stuart Bat Cave",
      "Rugged limestone hiking and mountain biking",
      "Remote dark skies and low-crowd camping",
    ],
    body: [
      "Kickapoo Cavern is intentionally less polished than a commercial show cave. Tours take visitors into a natural cavern environment where uneven footing, darkness and geology are the point rather than paved paths and theatrical lighting.",
      "Above ground, the park’s dry limestone country supports hiking and biking, while Stuart Bat Cave can produce impressive seasonal evening flights of Mexican free-tailed bats. The combination makes the park feel more like an expedition than a roadside attraction.",
      "Reservations and timing matter. Cavern tours run on schedules, bat activity is seasonal and services are limited in this remote part of Texas. Confirm current tours, park alerts and weather before making the drive.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/kickapoo-cavern",
  },
  "lake-tawakoni-state-park": {
    summary: "A wooded park east of Dallas on a large reservoir, with fishing, swimming, paddling, camping and shoreline trails that make it an easy water-focused escape from North Texas cities.",
    nearestTown: "Wills Point",
    bestSeason: "Spring through fall for water activities; cooler months are comfortable for hiking and camping",
    entryNote: "Lake levels, weather and boat conditions can affect water access. Reserve ahead for busy weekends and check current park alerts.",
    highlights: [
      "Reservoir fishing and boating",
      "Swimming beach and paddling access",
      "Oak woodland and shoreline trails",
      "Camping within an easy drive of Dallas-Fort Worth",
    ],
    body: [
      "Lake Tawakoni State Park is built around straightforward lake time. The reservoir is broad enough for serious fishing and boating, while the state-park shoreline adds swimming, paddling, trails and campsites without the feel of a developed marina complex.",
      "The wooded interior makes the park useful even when getting on the water is not the plan. Short trails and shaded campsites provide a low-effort North Texas getaway, particularly for families or weekend campers coming from the Dallas-Fort Worth area.",
      "As with any reservoir destination, wind, lake levels and storms can change conditions quickly. Check current park and water notices before arrival and reserve popular dates in advance.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-tawakoni",
  },
  "ray-roberts-lake-state-park": {
    summary: "A large North Texas state-park complex around Ray Roberts Lake, with swimming, fishing, paddling, camping and extensive trails across the Isle du Bois and Johnson Branch units north of Dallas.",
    nearestTown: "Pilot Point",
    bestSeason: "Spring and fall for trails; late spring through early fall for lake activities",
    entryNote: "The park has multiple units, so confirm which entrance matches your activity or reservation. Busy weekends can reach capacity.",
    highlights: [
      "Isle du Bois and Johnson Branch units with distinct access points",
      "Swimming, fishing, boating and paddling on Ray Roberts Lake",
      "Greenbelt and park trails for hiking, biking and horseback riding",
      "Large camping network within reach of Dallas-Fort Worth",
    ],
    body: [
      "Ray Roberts Lake State Park is large enough that choosing the right unit is part of planning the trip. Isle du Bois and Johnson Branch each provide lake access, camping and trails, while the broader greenbelt system connects the reservoir landscape to a much larger recreation network.",
      "Water activities are the main draw in warm weather, but the park also has enough trail mileage for cycling, hiking and horseback riding to stand on its own in cooler months. That range makes Ray Roberts one of the more flexible outdoor destinations close to Dallas-Fort Worth.",
      "Check your reservation and entrance before leaving because the units are not interchangeable once you are on the road. Capacity, storms and lake conditions can also affect the day, so review current park alerts in advance.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
  },
};

export function applyCuratedDestinationBatch4(destination: Destination): Destination {
  const override = curated[destination.slug];
  if (!override) return destination;
  return { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero };
}

export function applyCuratedDestinationsBatch4(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch4);
}
