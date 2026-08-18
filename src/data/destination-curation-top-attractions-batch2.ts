import type { Destination, DestinationAreaGuide, DestinationAreaItemList } from "./types";

type TopAttractionExpansion = {
  summary: string;
  nearestTown: string;
  hero: Destination["hero"];
  bestSeason: string;
  entryNote: string;
  highlights: string[];
  body: string[];
  officialUrl: string;
  sourceCheckedAt: string;
  areaGuide: DestinationAreaGuide;
  managingAuthority?: string;
  reservationUrl?: string;
  county?: string;
  address?: string;
  directions?: string;
  accessibilityNotes?: string;
  featured?: boolean;
};

function items(...rows: Array<[string, string, string, string?]>): DestinationAreaItemList {
  return rows.map(([name, proximity, description, href]) => ({
    name,
    proximity,
    description,
    ...(href ? { href } : {}),
  })) as DestinationAreaItemList;
}

const curated: Record<string, TopAttractionExpansion> = {
  "big-bend-national-park": {
    summary:
      "A vast Chihuahuan Desert national park where the Rio Grande, the Chisos Mountains and some of Texas's most dramatic canyon country meet, with scenic drives, long-distance hiking, dark skies and enough geographic range to reward several days rather than a single overlook stop.",
    nearestTown: "Terlingua",
    bestSeason:
      "Fall through spring for hiking and lower-elevation exploring; summer heat can be extreme, so warm-season plans should favor early starts, higher elevations and conservative distances",
    entryNote:
      "An entrance pass is required, but the park does not require a reservation simply to enter. Campgrounds, backcountry use and some river or overnight plans have separate reservation or permit requirements. Check road, weather, fire and river conditions before driving into this remote park.",
    highlights: [
      "Santa Elena Canyon and the Rio Grande",
      "Chisos Basin, the Window and high-country trails",
      "Ross Maxwell Scenic Drive and desert geology",
      "Panther Junction and Fossil Discovery Exhibit",
      "International Dark Sky country and broad desert night views",
    ],
    body: [
      "Big Bend National Park is a landscape-scale destination rather than a conventional attraction. The park protects a huge sweep of the Chihuahuan Desert along the Rio Grande, then rises abruptly into the Chisos Mountains at its center. That vertical range is why a single day can include low desert, mountain forest, river canyons and viewpoints that feel completely different from one another.",
      "For a first visit, Panther Junction is the practical orientation point before choosing a direction. Ross Maxwell Scenic Drive leads toward some of the park's most recognizable geology and Santa Elena Canyon, while the Chisos Basin road climbs into cooler mountain country and trailheads around the Window. The distances between these areas are substantial, so itinerary planning matters more here than at most Texas parks.",
      "Santa Elena Canyon is the visual shorthand for Big Bend: limestone walls rise sharply above the Rio Grande as the river cuts through the mesa. The short canyon approach is one of the park's most accessible headline experiences when river conditions allow, but the drive there also passes overlooks, volcanic formations and historic ranching sites that make Ross Maxwell Scenic Drive worth treating as a destination in its own right.",
      "The Chisos Mountains create Big Bend's other essential experience. Higher elevations offer cooler temperatures, forested slopes and trails that look back across the desert for enormous distances. Ambitious hikers can tackle long mountain routes, while shorter walks and the accessible Window View Trail give travelers a useful taste of the basin without committing to a strenuous day.",
      "Big Bend rewards caution as much as ambition. Summer heat at lower elevations can become life-threatening, water sources are unreliable, cell service is limited and flash flooding can quickly change roads or washes. Carry more water and fuel than a city trip would require, tell someone your plans and treat official weather, road and trail advisories as part of the itinerary rather than an afterthought.",
      "The park also works best as part of a wider Big Bend region trip. Terlingua and Study Butte provide the closest visitor services outside the western entrance, Big Bend Ranch State Park continues the desert-and-river scenery west toward Presidio, and Marathon is the classic eastern gateway. Alpine, Marfa and Fort Davis can extend the trip into a broader West Texas route when there is time for several days.",
    ],
    managingAuthority: "National Park Service",
    officialUrl: "https://www.nps.gov/bibe/planyourvisit/index.htm",
    sourceCheckedAt: "2026-08-17",
    county: "Brewster",
    directions:
      "Big Bend is remote. The western approach runs through Alpine, Study Butte and Terlingua toward Maverick Entrance; the northern approach reaches Persimmon Gap from Marathon. Fill the tank before entering, carry water and food, download maps offline and expect long drives between major park districts.",
    accessibilityNotes:
      "Panther Junction Visitor Center has accessible parking and facilities, and the Window View Trail is a short paved, wheelchair-accessible loop in the Chisos Basin. Accessibility varies sharply on backcountry trails and primitive roads, so review the National Park Service accessibility information for the specific district you plan to use.",
    areaGuide: {
      intro:
        "Big Bend's remoteness makes the surrounding towns and public lands part of the experience. The most useful bases are Terlingua and Study Butte on the west side, Marathon to the north-east, and Alpine farther out for a larger service center; Big Bend Ranch State Park is the natural scenic extension.",
      nearbyAttractions: items(
        ["Terlingua Ghost Town", "Near the western entrance", "Historic mining ruins, a small cemetery, restaurants and desert views make Terlingua the most distinctive settlement to pair with a park day."],
        ["Big Bend Ranch State Park", "West of the national park", "Texas's largest state park continues the Rio Grande and desert-mountain landscape toward Presidio, with scenic FM 170, hiking and rugged backcountry.", "/destination/big-bend-ranch-state-park"],
        ["Barton Warnock Visitor Center", "Near Lajitas", "A useful introduction to Chihuahuan Desert natural history and the western Big Bend region before continuing into state-park country."],
        ["Marathon", "North-east gateway", "A small railroad-era town with lodging, food and a strong sense of arrival for travelers approaching Big Bend from US 90."]
      ),
      foodAndDrink: items(
        ["Terlingua and Study Butte", "Closest west-side services", "The largest concentration of restaurants, coffee and basic groceries near the park's western entrance."],
        ["Chisos Basin", "Inside the park", "Limited in-park food service can be useful on mountain-focused days, but travelers should still carry their own water and backup meals."],
        ["Marathon", "North-east of the park", "A compact collection of cafes, restaurants and lodging dining for travelers using the Persimmon Gap approach."],
        ["Alpine", "About 80 miles north-west", "The region's larger service center offers the broadest restaurant and grocery selection before or after a multi-day park stay."]
      ),
      lodging: items(
        ["Chisos Basin", "Inside the park", "The only developed lodging district inside the park puts visitors in the mountain basin, but availability is limited and planning ahead is important."],
        ["Terlingua and Study Butte", "Near Maverick Entrance", "Cabins, motels, casitas and desert rentals make this the most flexible base for the western side of Big Bend."],
        ["Marathon", "North-east gateway", "Historic lodging and small-town stays work well for travelers entering through Persimmon Gap."],
        ["Lajitas", "West of the park", "A more resort-oriented base on the Rio Grande for travelers combining the national park with FM 170 and Big Bend Ranch State Park."]
      ),
      neighborhoods: items(
        ["Terlingua", "Western gateway", "A dispersed desert community built around mining history, tourism and the dramatic Chisos skyline."],
        ["Marathon", "North-east gateway", "A walkable small-town stop along US 90 with historic architecture, galleries and a slower approach to the park."],
        ["Alpine", "Regional hub", "A university town with museums, restaurants and services that makes a practical staging point for a longer West Texas loop."],
        ["Lajitas", "Rio Grande west of the park", "A tiny borderland community positioned between the national park and the River Road through Big Bend Ranch State Park."]
      ),
      familyStops: items(
        ["Fossil Discovery Exhibit", "North of Panther Junction", "Open-air exhibits and fossil replicas explain the ancient animals and changing environments of Big Bend in a format that works especially well with children."],
        ["Window View Trail", "Chisos Basin", "A short paved accessible loop provides mountain scenery and a sunset-friendly viewpoint without requiring a strenuous hike."],
        ["Panther Junction Visitor Center", "Central park", "Ranger information, exhibits and orientation maps give families a useful planning reset before committing to long drives."],
        ["Santa Elena Canyon overlook and approach", "Ross Maxwell Scenic Drive", "The canyon is a memorable family objective when conditions permit, with plenty of scenic stops available even if a full trail is not practical."]
      ),
      sideTrips: items(
        ["Big Bend Ranch State Park", "Immediately west", "Extend the desert trip along FM 170 for river overlooks, trailheads and a wilder state-park landscape.", "/destination/big-bend-ranch-state-park"],
        ["Marfa", "Roughly 100 miles north-west", "Art, architecture and high-desert culture make Marfa a natural contrast to several days of wilderness."],
        ["Fort Davis and Davis Mountains", "Roughly 120 miles north-west", "Historic Fort Davis, mountain scenery and McDonald Observatory can turn Big Bend into a broader West Texas road trip."],
        ["Alpine", "About 80 miles north-west", "Use Alpine for a museum, restaurants and a comfortable resupply day between remote park segments."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Big_Bend_National_Park_PB112571.jpg?width=1600",
      alt: "Santa Elena Canyon rising above the Rio Grande in Big Bend National Park",
      width: 1600,
      height: 1197,
      credit: "National Park Service · Public domain · Wikimedia Commons",
    },
  },

  "sixth-floor-museum-at-dealey-plaza": {
    summary:
      "A Dallas history museum inside the former Texas School Book Depository that examines President John F. Kennedy's life, the November 22, 1963 assassination in Dealey Plaza, the investigations that followed and the event's lasting place in American memory.",
    nearestTown: "Dallas",
    bestSeason:
      "Year-round; weekday mornings are useful for a quieter gallery visit, while mild fall and spring weather make it easier to spend time outside in Dealey Plaza afterward",
    entryNote:
      "Admission uses timed-entry tickets and advance purchase is strongly recommended, especially on weekends and busy travel dates. Leave extra time for security, the permanent sixth-floor exhibition and Dealey Plaza outside the building.",
    highlights: [
      "John F. Kennedy and the Memory of a Nation permanent exhibition",
      "The former Texas School Book Depository and sixth-floor historical setting",
      "Dealey Plaza and the assassination landscape outside",
      "Photographs, films, oral histories and investigative material",
      "Easy walking connection to the West End and other downtown Dallas museums",
    ],
    body: [
      "The Sixth Floor Museum at Dealey Plaza occupies one of the most historically charged buildings in Texas: the former Texas School Book Depository overlooking the route President John F. Kennedy's motorcade traveled on November 22, 1963. The museum's value comes from placing that event within a broader story of Kennedy's presidency, the political climate of the early 1960s and the national shock that followed his death.",
      "The permanent exhibition, John F. Kennedy and the Memory of a Nation, uses photographs, documentary footage, artifacts, oral histories and investigative material to build a chronological account. The setting matters as much as the objects. Visitors move through the sixth floor while looking toward Dealey Plaza, making the geography of Elm Street, the grassy areas and the former depository legible in a way that a conventional history gallery could not reproduce.",
      "A thoughtful visit should not rush directly to the assassination evidence. The earlier galleries establish Kennedy's public image, domestic politics, civil rights pressures, the Cold War and the atmosphere surrounding the 1963 Texas trip. That context makes the later sections on the assassination, investigations, conspiracy culture and public memory more useful than treating the museum as a collection of isolated details.",
      "Dealey Plaza is effectively the museum's outdoor companion. After the timed indoor visit, walk the plaza and historic district to understand the sightlines and scale for yourself. The National Historic Landmark district also makes it easy to connect the museum with nearby downtown history stops rather than leaving immediately after the galleries.",
      "The subject can be emotionally heavy for children and for visitors with personal memories of 1963, so families should decide how much time to spend in the later galleries. The museum offers sensory resources, and its downtown location makes it easy to balance the day with a lighter family stop such as the Perot Museum or Klyde Warren Park.",
      "The West End setting is one of the museum's strengths for trip planning. Dallas Holocaust and Human Rights Museum, the Old Red courthouse area, JFK Memorial Plaza and central Downtown are all close, while the Arts District and Victory Park are a short ride away. That density supports a full Dallas history-and-culture day without repeatedly moving the car.",
    ],
    managingAuthority: "Dallas County Historical Foundation",
    officialUrl: "https://www.jfk.org/plan-your-visit/",
    sourceCheckedAt: "2026-08-17",
    county: "Dallas",
    address: "411 Elm Street, Dallas, TX 75202",
    directions:
      "The museum is in Downtown Dallas's West End overlooking Dealey Plaza. Paid parking is available nearby, and the West End DART station is a few blocks away; walking from other central-Dallas attractions is often easier than moving a vehicle between stops.",
    accessibilityNotes:
      "The museum provides accessibility assistance and sensory bags for visitors who need them. Because needs and exhibit conditions vary, review the museum's current accessibility information or contact visitor services before arrival for specific mobility, sensory or communication accommodations.",
    areaGuide: {
      intro:
        "Dealey Plaza sits at the western edge of Downtown Dallas, where history museums, the West End, the central business district and family attractions are close together. A strong itinerary keeps the car parked and uses walking or a short transit hop for most of the day.",
      nearbyAttractions: items(
        ["Dealey Plaza", "Outside the museum", "Walk the National Historic Landmark district after the galleries to understand the physical setting of the 1963 motorcade and assassination."],
        ["Dallas Holocaust and Human Rights Museum", "About a 5-minute walk", "A major human-rights museum in the West End that can anchor a broader history-focused day."],
        ["JFK Memorial Plaza", "About a 5-minute walk", "Philip Johnson's stark downtown memorial gives visitors a separate civic place for reflection on Kennedy's legacy."],
        ["Old Red Museum / former courthouse", "Across the plaza area", "The distinctive red-sandstone former Dallas County courthouse adds another layer of downtown civic history."]
      ),
      foodAndDrink: items(
        ["West End Historic District", "Steps away", "Casual restaurants and visitor-oriented dining make this the easiest meal area without leaving the museum district."],
        ["Main Street District", "About 10–15 minutes on foot", "Downtown restaurants, coffee and bars broaden the choices beyond the West End while keeping the day walkable."],
        ["Victory Park", "About 1 mile north", "Restaurants around the arena and Perot Museum work well when the afternoon itinerary shifts toward family attractions or an evening event."]
      ),
      lodging: items(
        ["West End and Downtown", "Walkable", "The best base for a history-heavy visit, with easy access to Dealey Plaza, Main Street and downtown transit."],
        ["Arts District", "About 1–2 miles east", "A strong option for travelers combining the museum with Dallas's major performing-arts and visual-arts institutions."],
        ["Victory Park", "About 1 mile north", "Convenient for the Perot Museum, arena events and quick access back to the West End."]
      ),
      neighborhoods: items(
        ["West End Historic District", "Immediate area", "Brick warehouses, Dealey Plaza and museums make the West End the natural walking district around the Sixth Floor Museum."],
        ["Main Street District", "East of the museum", "Historic towers, hotels and restaurants show a different layer of Downtown Dallas beyond the assassination landscape."],
        ["Dallas Arts District", "About 1–2 miles east", "Museums, performance halls and Klyde Warren Park create a cultural extension for a full downtown day."]
      ),
      familyStops: items(
        ["Perot Museum of Nature and Science", "About 1 mile north", "Hands-on science, fossils and family exhibits provide a useful change of tone after a serious history museum."],
        ["Dallas World Aquarium", "About a 10-minute walk", "Indoor animal exhibits and aquarium spaces are close enough to pair with the West End without another long drive."],
        ["Klyde Warren Park", "About 1.5 miles east", "A deck park with lawns, food and programming gives families outdoor downtime between downtown museums."]
      ),
      sideTrips: items(
        ["Dallas Arboretum and Botanical Garden", "About 7 miles east", "Gardens along White Rock Lake provide a completely different half-day experience after central-Dallas history."],
        ["George W. Bush Presidential Center", "About 6 miles north-east", "A presidential museum on the SMU campus can extend a Dallas trip into a broader study of modern American political history."],
        ["Bishop Arts District", "About 4 miles south", "Independent shops, restaurants and neighborhood streets offer an evening contrast to the downtown museum core."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/View,_in_2014,_of_Dealey_Plaza_and_the_Texas_School_Book_Depository_in_Dallas,_Texas.jpg?width=1600",
      alt: "Dealey Plaza and the former Texas School Book Depository in Downtown Dallas",
      width: 1600,
      height: 1053,
      credit: "Carol M. Highsmith · Public domain · Library of Congress/Wikimedia Commons",
    },
  },

  "fort-worth-stockyards": {
    summary:
      "Fort Worth's preserved livestock district, where brick streets, historic stock pens, the twice-daily Fort Worth Herd, rodeo traditions, Western museums, live music and Mule Alley keep the city's cattle-market history active rather than frozen behind glass.",
    nearestTown: "Fort Worth",
    bestSeason:
      "Fall through spring for comfortable outdoor walking; summer visits work best with indoor breaks and cattle-drive viewing planned around the day's heat",
    entryNote:
      "Walking the district and watching the Fort Worth Herd cattle drive are free, while rodeos, museums, tours and some attractions require separate tickets. The cattle drive is scheduled twice daily when weather and operations permit, so verify the day's schedule before arrival.",
    highlights: [
      "Fort Worth Herd longhorn cattle drive along East Exchange Avenue",
      "Historic Livestock Exchange Building and stockyards district",
      "Cowtown Coliseum and year-round rodeo culture",
      "Mule Alley dining, shopping and restored horse-and-mule barns",
      "Western museums, honky-tonks and live music around the district",
    ],
    body: [
      "The Fort Worth Stockyards work because the district still behaves like a place, not simply a themed attraction. Fort Worth grew into a major livestock market after rail connections transformed the cattle trade, and the preserved brick buildings, pens, exchange structures and rail infrastructure let visitors read that history while restaurants, rodeos and music venues keep the neighborhood active.",
      "The Fort Worth Herd is the easiest first-time anchor. Texas longhorns move along East Exchange Avenue in a public cattle drive scheduled twice each day when weather and operations allow. Arrive early enough to choose a viewing spot and remember that the drive is brief; the larger value is using it as the opening to explore the Stockyards Museum, Livestock Exchange and surrounding historic blocks.",
      "Cowtown Coliseum keeps the rodeo story connected to the district's working identity. Depending on the calendar, visitors can see rodeo events, Western sports and arena programming rather than only museum interpretation. Nearby Western-history attractions broaden the story from cattle commerce to cowboy culture, performers and the mythology that Fort Worth deliberately embraced as 'Cowtown.'",
      "Mule Alley shows the Stockyards' more recent reinvention. Restored horse-and-mule barns now hold restaurants, shops and hospitality venues, creating a polished counterpoint to the older exchange buildings. Travelers looking for a more traditional honky-tonk experience can continue through the district to live-music venues rather than treating Mule Alley as the entire Stockyards.",
      "A half day is enough for the cattle drive, historic core and one museum, but a full day makes more sense if the itinerary includes a rodeo, dinner or evening music. Weekends are substantially busier, restaurants can fill and parking can become part of the experience, so arriving before the first major event gives more flexibility.",
      "The Stockyards are also a useful gateway into the rest of Fort Worth. Downtown and Sundance Square are only a short drive south, while the Cultural District holds the Kimbell Art Museum, Modern Art Museum, National Cowgirl Museum and major family attractions. That makes the city unusually easy to divide into a Western-history day and an arts-and-museums day.",
    ],
    managingAuthority: "Fort Worth Stockyards National Historic District",
    officialUrl: "https://www.fortworthstockyards.org/visitor-experience",
    sourceCheckedAt: "2026-08-17",
    county: "Tarrant",
    address: "131 E Exchange Avenue, Fort Worth, TX 76164",
    directions:
      "The historic district centers on East Exchange Avenue and the Livestock Exchange Building north of Downtown Fort Worth. Multiple paid parking areas serve the district; on busy weekends and event nights, arriving early or using rideshare can be easier than circulating for a closer space.",
    accessibilityNotes:
      "The district mixes modern venues with historic brick streets and older buildings, so surfaces and accessibility vary by property. The Stockyards does not provide wheelchair rentals; contact individual attractions or venues for specific seating, mobility and entrance information.",
    areaGuide: {
      intro:
        "The Stockyards can fill most of a day on its own, but its location also makes it easy to connect Western history with Downtown Fort Worth and the Cultural District. Use the immediate district for cattle, rodeo and music, then shift south for museums, gardens or city-center dining.",
      nearbyAttractions: items(
        ["Stockyards Museum and Livestock Exchange", "In the district", "Small-scale exhibits inside the historic exchange building explain the livestock market and the people who worked here."],
        ["Cowtown Coliseum", "On East Exchange Avenue", "Historic arena programming keeps rodeo and Western sports tied directly to the Stockyards experience."],
        ["Texas Cowboy Hall of Fame", "In the Stockyards", "Collections and inductee stories extend the district's ranching, rodeo and Western-performance themes."],
        ["Mule Alley", "A few minutes on foot", "Restored barns now hold restaurants, shops and lodging, making this the district's polished dining-and-evening hub."]
      ),
      foodAndDrink: items(
        ["East Exchange Avenue", "In the historic core", "Steakhouses, barbecue, saloons and casual visitor dining keep meals close to the cattle-drive route."],
        ["Mule Alley", "In the district", "A more contemporary cluster of restaurants and bars inside restored Stockyards buildings."],
        ["Near Southside", "About 4 miles south", "Independent restaurants, breweries and bars offer a more local neighborhood alternative after the Western district."],
        ["Sundance Square and Downtown", "About 3 miles south", "Downtown dining works well when the Stockyards day continues into theaters, hotels or city-center attractions."]
      ),
      lodging: items(
        ["Stockyards and Mule Alley", "Walkable", "Best for travelers who want cattle-drive access, Western atmosphere and nightlife without driving at the end of the day."],
        ["Downtown and Sundance Square", "About 3 miles south", "A broader hotel base for combining the Stockyards with central Fort Worth restaurants and attractions."],
        ["Cultural District", "About 4 miles south-west", "Useful for travelers prioritizing museums, Will Rogers Memorial Center and a quieter arts-focused second day."]
      ),
      neighborhoods: items(
        ["Stockyards National Historic District", "Immediate area", "Historic commercial blocks, pens and entertainment venues form Fort Worth's best-known Western district."],
        ["Northside", "Surrounding the Stockyards", "Longstanding residential and commercial neighborhoods add local Mexican and Texan food beyond the visitor core."],
        ["Downtown and Sundance Square", "About 3 miles south", "Historic towers, theaters and public spaces show Fort Worth's urban center beyond its cattle-town identity."],
        ["Near Southside", "About 4 miles south", "Restaurants, creative businesses and neighborhood nightlife make this a useful evening extension."]
      ),
      familyStops: items(
        ["Fort Worth Herd", "East Exchange Avenue", "The free longhorn drive is short, visual and easy to build into a family day when the weather cooperates."],
        ["Fort Worth Museum of Science and History", "About 4 miles south-west", "Hands-on science and Texas history in the Cultural District balance a Stockyards morning."],
        ["Fort Worth Zoo", "About 6 miles south", "One of the city's major family attractions can anchor a separate half day after Western-history stops."],
        ["Fort Worth Botanic Garden", "About 4 miles south-west", "Gardens and outdoor space provide a quieter family break near the museum district."]
      ),
      sideTrips: items(
        ["Fort Worth Cultural District", "About 4 miles south-west", "Kimbell, the Modern, National Cowgirl Museum and other institutions create one of Texas's strongest museum clusters."],
        ["Sundance Square and Downtown", "About 3 miles south", "Add architecture, restaurants and the Water Gardens for a broader look at Fort Worth beyond the Stockyards."],
        ["Grapevine", "About 25 miles north-east", "Historic Main Street, wineries and seasonal events make a natural DFW side trip for travelers with an extra day."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1600",
      alt: "Entrance sign and historic buildings in the Fort Worth Stockyards",
      width: 1600,
      height: 1019,
      credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons",
    },
  },

  "texas-state-capitol": {
    summary:
      "Austin's landmark pink-granite Capitol, where free public tours, legislative chambers, historic grounds and exhibits connect Texas government with the architecture and civic history of the state in the center of Downtown Austin.",
    nearestTown: "Austin",
    bestSeason:
      "Year-round; spring and fall are especially comfortable for combining the interior with the Capitol grounds and nearby museums on foot",
    entryNote:
      "The Capitol is open to the public subject to security procedures, and free guided tours are offered on a regular daily schedule. Large groups should arrange tours in advance. Legislative sessions, ceremonies and security needs can affect access, so confirm current visitor information before arrival.",
    highlights: [
      "Texas Senate and House chambers",
      "Rotunda, dome and historic portraits",
      "Free guided Capitol tours",
      "Capitol grounds, monuments and historic landscape",
      "Capitol Visitors Center and nearby Texas history museums",
    ],
    body: [
      "The Texas State Capitol is both a working seat of government and one of Austin's defining pieces of architecture. Completed in the 1880s and faced in distinctive Texas pink granite, the building was designed to project the scale and confidence of a growing state. That civic symbolism is easiest to understand inside the rotunda, where the dome, portraits and branching corridors organize the building around Texas political history.",
      "A free guided tour is the best introduction for most first-time visitors because guides can explain the architecture, legislative chambers, major artworks and practical workings of the building in a compact visit. Self-guided exploration is also possible during public hours, but access to specific rooms can change when the Legislature, official events or security operations are using them.",
      "The House and Senate chambers make the Capitol more than a monument. Seeing the desks, galleries and floor layouts gives context to how Texas law is debated and passed, while exhibits and portraits connect present-day institutions with the Republic, statehood, Reconstruction and later political eras. Visitors interested in current politics should remember that this remains an active government workplace rather than a museum set.",
      "The grounds deserve time of their own. Monuments, mature trees and long views down Congress Avenue help place the Capitol within Austin's street plan, while the Capitol Visitors Center occupies a historic building nearby and provides additional orientation. The grounds also make an easy link between Downtown and the museum corridor immediately north.",
      "Accessibility and visitor support are stronger than the building's nineteenth-century appearance might suggest. The State Preservation Board publishes accessible visitor guidance, including large-print and Braille materials and advance arrangements for sign-language tours. Visitors with specific needs should confirm the best entrance and tour arrangements before arrival.",
      "The Capitol is one of TexasDefined's easiest attractions to turn into a full urban itinerary. The Bullock Texas State History Museum and Blanton Museum are within walking distance toward the University of Texas, while Downtown restaurants, Waterloo Park and the Congress Avenue corridor extend south. A separate half day can reach the LBJ Presidential Library, Barton Springs or the Lady Bird Johnson Wildflower Center.",
    ],
    managingAuthority: "Texas State Preservation Board",
    officialUrl: "https://tspb.texas.gov/plan/tours/tours.html",
    sourceCheckedAt: "2026-08-17",
    county: "Travis",
    address: "1100 Congress Avenue, Austin, TX 78701",
    directions:
      "The Capitol occupies the north end of Congress Avenue in central Austin. A public visitor parking garage is available east of the complex, and the site is walkable from much of Downtown; allow time for security screening before a tour.",
    accessibilityNotes:
      "The State Preservation Board provides accessible routes and visitor assistance, including large-print and Braille publications. American Sign Language tours can be arranged with advance notice; visitors with specific mobility or communication needs should review the current accessibility guidance before arrival.",
    areaGuide: {
      intro:
        "The Capitol sits between Downtown Austin and the University of Texas museum corridor, making it one of the easiest major Texas attractions to build into a car-light day. History museums are immediately north, while restaurants, parks and entertainment districts spread south and east.",
      nearbyAttractions: items(
        ["Capitol Visitors Center", "On the Capitol grounds", "Exhibits and visitor information in a historic state building add context before or after the main Capitol tour."],
        ["Bullock Texas State History Museum", "About a 10-minute walk north", "Three floors of Texas history make the Bullock the strongest museum companion to a Capitol visit."],
        ["Blanton Museum of Art", "About a 10–15-minute walk north", "The University of Texas art museum provides a visual-arts counterpoint beside the state-history corridor."],
        ["Waterloo Park", "About a 10-minute walk east", "Downtown lawns, trails and event space offer an outdoor break close to the Capitol."]
      ),
      foodAndDrink: items(
        ["Congress Avenue and Downtown", "South of the Capitol", "Restaurants, coffee and hotels line the central corridor for the easiest meal without moving the car."],
        ["West Campus and the Drag", "North-west toward UT", "Casual student-oriented restaurants and cafes work well with a Bullock or university museum visit."],
        ["Red River Cultural District", "About a 10-minute walk east", "Music venues, bars and casual food make this a useful evening extension from the government district."],
        ["East Austin", "Short ride east", "A deeper restaurant and nightlife bench makes East Austin a good choice when the day moves beyond the immediate Capitol area."]
      ),
      lodging: items(
        ["Capitol and Downtown core", "Walkable", "The most convenient base for the Capitol, Congress Avenue, downtown restaurants and central cultural attractions."],
        ["University of Texas area", "About 1 mile north", "Useful for travelers combining the Capitol with the Bullock, Blanton and campus attractions."],
        ["Red River and eastern Downtown", "About 0.5–1 mile east", "A practical choice for live music, Waterloo Park and quick access back to the Capitol."]
      ),
      neighborhoods: items(
        ["Downtown and Congress Avenue", "Immediate area", "Austin's civic spine links the Capitol with historic commercial buildings, hotels and the riverfront farther south."],
        ["University of Texas and West Campus", "North", "Museums, campus landmarks and student life create a second walkable district beyond the government complex."],
        ["Red River Cultural District", "East", "Live music and nightlife provide a distinctly Austin transition after daytime history and government stops."],
        ["East Austin", "Short ride east", "Restaurants, bars, galleries and neighborhood streets add a more local evening layer to the trip."]
      ),
      familyStops: items(
        ["Bullock Texas State History Museum", "About a 10-minute walk", "Interactive exhibits, major artifacts and Texas stories make the history corridor more engaging for school-age visitors."],
        ["Texas Science & Natural History Museum", "On the UT campus", "Dinosaurs, fossils and Texas natural history create an easy family-oriented extension north of the Capitol."],
        ["Waterloo Park", "About a 10-minute walk", "Open lawns and paths give families space to reset between indoor stops."],
        ["Barton Springs Pool and Zilker Park", "About 3 miles south-west", "Swimming and park space offer a strong warm-weather contrast to museums and government buildings."]
      ),
      sideTrips: items(
        ["LBJ Presidential Library", "About 2 miles north-east", "Presidential history and major twentieth-century events make a natural political-history extension."],
        ["Lady Bird Johnson Wildflower Center", "About 12 miles south", "Native Texas landscapes and gardens create an outdoor half-day beyond central Austin."],
        ["Barton Springs and Zilker Park", "About 3 miles south-west", "Pair the city's civic center with its best-known spring-fed pool and major urban park."],
        ["Mount Bonnell", "About 5 miles north-west", "A short climb to a Colorado River overlook adds a classic Austin landscape stop."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_State_Capitol_-_Austin,_Texas_-_DSC08253.jpg?width=1600",
      alt: "Texas State Capitol and its pink-granite facade in Austin",
      width: 1600,
      height: 1067,
      credit: "Daderot · CC0 1.0 · Wikimedia Commons",
    },
  },

  "guadalupe-mountains-national-park": {
    summary:
      "A remote West Texas national park protecting the fossilized Capitan Reef, Guadalupe Peak—the highest point in Texas—McKittrick Canyon, El Capitan and rugged desert-to-mountain trails near the New Mexico line.",
    nearestTown: "Salt Flat",
    bestSeason:
      "Spring and fall for hiking; fall is especially popular for McKittrick Canyon color, while winter can bring strong winds and summer demands conservative heat planning",
    entryNote:
      "An entrance pass is required, but no general entry reservation is needed. Overnight wilderness travel requires a permit, and this remote park has limited services, so carry food, water and fuel and check wind, fire, trail and road conditions before arrival. The park operates on Mountain Time.",
    highlights: [
      "Guadalupe Peak, the highest point in Texas",
      "El Capitan and the exposed fossilized Capitan Reef",
      "McKittrick Canyon and fall foliage",
      "Pinery Trail, Frijole Ranch and desert history",
      "Remote mountain wilderness and exceptional night skies",
    ],
    body: [
      "Guadalupe Mountains National Park protects a landscape that looks like a mountain range but also tells the story of an ancient sea. The Guadalupe Mountains are built from the fossilized Capitan Reef, a massive Permian-age reef complex whose limestone now rises above the Chihuahuan Desert. El Capitan makes that geology visible from the highway, while the park's trails reveal how abruptly desert, canyon and high-country ecosystems meet.",
      "Guadalupe Peak is the headline challenge. At 8,751 feet, it is the highest natural point in Texas, reached by a strenuous trail that gains substantial elevation from Pine Springs. The summit is rewarding, but it should not define the entire park; strong winds, heat, winter weather or fitness can make shorter routes the smarter choice on a given day.",
      "McKittrick Canyon provides the park's most famous seasonal contrast. The canyon supports trees and vegetation that produce striking fall color, drawing heavy interest during peak weeks. Even outside autumn, the route's limestone walls, historic structures and changing plant communities make it one of the best places to understand how elevation and water create pockets of very different habitat in West Texas.",
      "For a shorter visit, Pine Springs, the Pinery Trail and Frijole Ranch give useful geology and human-history context without requiring an all-day summit hike. The National Park Service identifies accessible visitor facilities and paved accessible trails at several developed areas, making it possible to experience meaningful parts of the park even when rugged backcountry routes are not suitable.",
      "Preparation matters because Guadalupe Mountains has fewer visitor services than many famous national parks. There is no gateway resort town immediately outside the entrance, weather can change rapidly, winds can be severe and cell service is unreliable. Bring what you need for the day before leaving Carlsbad, Van Horn or El Paso, and remember that the park uses Mountain Time even though much of Texas does not.",
      "The location creates one of the best two-national-park combinations in the Southwest. Carlsbad Caverns National Park is a straightforward drive north in New Mexico, while Hueco Tanks and El Paso extend the Texas side of the itinerary west. Van Horn provides a practical Texas base to the south, and the long approach through Culberson County reinforces just how remote this mountain landscape remains.",
    ],
    managingAuthority: "National Park Service",
    officialUrl: "https://www.nps.gov/gumo/planyourvisit/index.htm",
    sourceCheckedAt: "2026-08-17",
    county: "Culberson",
    address: "400 Pine Canyon Drive, Salt Flat, TX 79847",
    directions:
      "Pine Springs is reached from US 62/180 in far West Texas between El Paso and Carlsbad. Services near the park are extremely limited; fuel up before the final approach, download maps and remember that park operations follow Mountain Time.",
    accessibilityNotes:
      "Developed visitor facilities at Pine Springs, Dog Canyon and McKittrick Canyon have accessible features. The paved Pinery Trail and Manzanita Spring Trail provide accessible outdoor options, while most mountain and wilderness routes are rugged; review the NPS accessibility page for current details.",
    areaGuide: {
      intro:
        "Guadalupe Mountains has almost no conventional tourist district at its doorstep. The useful surrounding geography is a triangle between Van Horn, Carlsbad and El Paso, with small desert communities and Carlsbad Caverns forming the closest extensions to the park.",
      nearbyAttractions: items(
        ["Frijole Ranch Cultural Museum", "Inside the park", "Historic ranch buildings and exhibits add human history to a landscape often visited primarily for hiking."],
        ["McKittrick Canyon", "North-east park district", "A separate trailhead and canyon experience known for geology, vegetation and fall color deserves its own half day."],
        ["Carlsbad Caverns National Park", "About 35 miles north in New Mexico", "One of the world's great cave systems makes the strongest two-park pairing with Guadalupe Mountains."],
        ["Salt Basin Dunes", "Western park district", "Bright gypsum dunes and views back toward the mountains reveal another side of the park's desert geology."]
      ),
      foodAndDrink: items(
        ["Carlsbad, New Mexico", "About 55 miles north", "The broadest nearby concentration of restaurants and groceries for travelers approaching from the north."],
        ["Van Horn", "About 65 miles south", "Texas-side restaurants, fuel and groceries make Van Horn the practical resupply point for the southern approach."],
        ["El Paso", "About 110 miles west", "A major-city food scene is useful when Guadalupe Mountains is part of a larger far-West-Texas itinerary."],
        ["Pack your own park meals", "At the park", "There is no full-service food district at the entrance, so self-sufficiency is part of a realistic day plan."]
      ),
      lodging: items(
        ["Van Horn", "About 65 miles south", "A practical Texas lodging base with highway services for travelers continuing toward Big Bend or central Texas."],
        ["Carlsbad, New Mexico", "About 55 miles north", "The most convenient full-service base for combining Guadalupe Mountains with Carlsbad Caverns."],
        ["Whites City, New Mexico", "North toward Carlsbad Caverns", "Closer lodging options can reduce driving for a two-national-park itinerary, though services are more limited."],
        ["El Paso", "About 110 miles west", "Best for travelers who want major-city lodging and are treating the park as a long day trip or road-trip segment."]
      ),
      neighborhoods: items(
        ["Van Horn", "South on US 54/90", "A historic highway and railroad town that functions as the main Texas service stop south of the park."],
        ["Dell City", "West of the park", "A small agricultural desert community near the Salt Basin offers a very different view of far-West-Texas life."],
        ["Carlsbad", "North in New Mexico", "A regional service center and cave gateway for visitors combining the two national parks."],
        ["El Paso", "Farther west", "West Texas's major city adds food, museums and borderland culture to a remote mountain trip."]
      ),
      familyStops: items(
        ["Pinery Trail", "Pine Springs", "A short paved accessible trail leads to historic Butterfield stage-route ruins and broad views of El Capitan."],
        ["Frijole Ranch", "Near Pine Springs", "Historic buildings and interpretive exhibits offer a low-mileage alternative to a strenuous hiking day."],
        ["McKittrick Canyon lower trail", "McKittrick district", "Families can choose a shorter out-and-back distance rather than committing to the canyon's longer objectives."],
        ["Carlsbad Caverns", "North in New Mexico", "Elevators, ranger information and spectacular cave rooms make a strong family companion to the mountain park."]
      ),
      sideTrips: items(
        ["Carlsbad Caverns National Park", "About 35 miles north", "Build a two-park itinerary around the fossilized reef above ground and the cave system developed within the same regional geology."],
        ["Hueco Tanks State Park & Historic Site", "About 90 miles west", "Rock basins, pictographs and desert climbing history make a culturally rich Texas extension toward El Paso.", "/destination/hueco-tanks-state-park-and-historic-site"],
        ["El Paso", "About 110 miles west", "Museums, food and borderland culture provide a city reset after several days in remote park country."],
        ["Van Horn", "About 65 miles south", "Use the town as a bridge toward Big Bend, Marfa or other West Texas road-trip destinations."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Guadalupe_Mountains_National_Park_GUMO4307.jpg?width=1600",
      alt: "El Capitan and rugged desert terrain in Guadalupe Mountains National Park",
      width: 1600,
      height: 1067,
      credit: "National Park Service · Public domain · Wikimedia Commons",
    },
  },

  "palo-duro-canyon-state-park": {
    summary:
      "The Panhandle's immense red-rock canyon state park, often called the Grand Canyon of Texas, with more than 30 miles of hiking, biking and equestrian trails, dramatic rim-to-floor drives, CCC history and the iconic Lighthouse formation near Canyon and Amarillo.",
    nearestTown: "Canyon",
    bestSeason:
      "Spring and fall for hiking; winter can be excellent on mild days, while summer requires early starts, heat awareness and frequent water breaks on exposed canyon trails",
    entryNote:
      "Day-use reservations are strongly recommended because the park can reach capacity. Trail access can change with heat, rain and maintenance, and camping, cabins or glamping require separate reservations. Check current alerts before driving into the canyon.",
    highlights: [
      "Lighthouse Trail and the park's signature rock formation",
      "Canyon rim overlooks and scenic drive to the floor",
      "More than 30 miles of hiking, biking and equestrian trails",
      "CCC-built cabins and park history",
      "Seasonal TEXAS Outdoor Musical in the canyon amphitheater",
    ],
    body: [
      "Palo Duro Canyon State Park is where the flat scale of the Texas Panhandle suddenly breaks open. The canyon exposes layers of red, orange and pale rock carved by the Prairie Dog Town Fork of the Red River, creating a landscape so different from the surrounding plains that the descent from the rim feels like entering another region.",
      "The Lighthouse Trail is the park's best-known hike, leading toward a tall hoodoo formation that has become Palo Duro's visual symbol. Its popularity should not obscure the rest of the trail system: shorter canyon-floor walks, rim views, mountain-bike routes and equestrian trails let visitors choose a day based on weather, ability and how much time they want to spend away from the car.",
      "Driving into the canyon is itself part of the attraction. The park road drops from broad rim overlooks to the floor, passing trailheads, campgrounds and CCC-era structures. Visitors who cannot tackle a long trail can still understand the canyon's scale by combining overlooks, the visitor center, short walks and carefully chosen roadside stops.",
      "Heat is the main planning constraint. Canyon-floor temperatures can climb quickly, shade is limited and exposed trails become dangerous when hikers underestimate water needs or start too late. Texas Parks and Wildlife can close trails because of excessive heat or wet conditions, so the best summer strategy is an early start followed by indoor or shaded attractions around Canyon and Amarillo.",
      "Palo Duro also has a strong cultural layer. Civilian Conservation Corps crews built roads, cabins and park infrastructure in the 1930s, while the seasonal TEXAS Outdoor Musical uses the canyon walls as a dramatic backdrop for a long-running Panhandle production. Those experiences make the park more than a geology stop, especially for an overnight visitor.",
      "Canyon is the nearest town and home to the Panhandle-Plains Historical Museum, one of the best companions to the park because it explains the region's Indigenous, ranching, transportation and settlement history. Amarillo is close enough to provide a larger lodging and dining base, and a longer Panhandle route can add Cadillac Ranch, Caprock Canyons, Lake Meredith and Alibates Flint Quarries.",
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    sourceCheckedAt: "2026-08-17",
    reservationUrl: "https://texasstateparks.reserveamerica.com/",
    county: "Randall",
    address: "11450 Park Road 5, Canyon, TX 79015",
    directions:
      "The park is east of Canyon and south-east of Amarillo. The entrance road descends steeply from the rim to the canyon floor; check weather and park alerts before arrival, especially after heavy rain or during extreme heat.",
    accessibilityNotes:
      "Texas Parks and Wildlife offers accessible facilities and an all-terrain wheelchair program that can expand access to some rugged areas with advance arrangements. Individual trails vary widely in grade, surface and exposure, so review current accessibility details for the specific experience you want.",
    areaGuide: {
      intro:
        "Palo Duro is close enough to Canyon and Amarillo that the best trip mixes canyon time with Panhandle museums, Route 66 culture and regional landmarks. Canyon is the history-focused base; Amarillo adds the largest lodging, dining and family-attraction selection.",
      nearbyAttractions: items(
        ["Panhandle-Plains Historical Museum", "About 15 miles west in Canyon", "A major regional museum at West Texas A&M explains Panhandle archaeology, ranching, petroleum, art and settlement history."],
        ["TEXAS Outdoor Musical", "Inside the park seasonally", "The long-running outdoor production uses the canyon amphitheater as its backdrop and can turn a day visit into an evening experience."],
        ["Cadillac Ranch", "About 30 miles north-west", "The famous row of buried Cadillacs west of Amarillo adds a quick Route 66-era art stop to the same trip."],
        ["Route 66 Historic District", "Amarillo", "Neon, shops, restaurants and vintage roadside character along Sixth Avenue provide an urban contrast to the canyon."]
      ),
      foodAndDrink: items(
        ["Canyon town center", "About 15 miles west", "Local restaurants and cafes are the closest broad meal option outside the park."],
        ["Amarillo Route 66 / Sixth Avenue", "About 30 miles north", "Independent restaurants, bars and coffee pair food with a historic roadside district."],
        ["Downtown Amarillo", "About 30 miles north", "A larger restaurant selection works well for travelers staying in the city."],
        ["Park Trading Post", "Inside the park", "Limited food and supplies can be useful during a long park day, but carrying water and backup snacks remains essential."]
      ),
      lodging: items(
        ["Palo Duro Canyon cabins and campsites", "Inside the park", "Staying in the canyon maximizes sunrise, sunset and trail time; book well ahead for popular dates."],
        ["Canyon", "About 15 miles west", "The closest town base keeps the park and Panhandle-Plains Historical Museum convenient."],
        ["Amarillo", "About 30 miles north", "The largest selection of hotels and services works best for visitors combining several Panhandle attractions."],
        ["Glamping options near the park", "Canyon area", "Private and park-area glamping can preserve the outdoor feel for travelers who do not want conventional camping."]
      ),
      neighborhoods: items(
        ["Canyon", "Nearest town", "A compact university town with a historic center and regional museum makes the natural community companion to the park."],
        ["Amarillo Route 66 District", "About 30 miles north", "Historic Sixth Avenue adds neon, shops, restaurants and old-road character."],
        ["Downtown Amarillo", "About 30 miles north", "Civic buildings, entertainment and restaurants provide a city base for a multi-attraction Panhandle weekend."]
      ),
      familyStops: items(
        ["Panhandle-Plains Historical Museum", "Canyon", "Large collections and regional history give families a substantial indoor option during midday heat."],
        ["Don Harrington Discovery Center", "Amarillo", "Hands-on science and space exhibits make a useful family day component away from exposed canyon trails."],
        ["Amarillo Zoo", "Amarillo", "A manageable family attraction can fill a few hours before or after a shorter park visit."],
        ["Short rim overlooks and visitor center", "Inside the park", "Families can experience the canyon's scale without committing young hikers to a long, exposed trail."]
      ),
      sideTrips: items(
        ["Cadillac Ranch", "West of Amarillo", "Add one of Texas's best-known roadside-art landmarks to the same Panhandle itinerary."],
        ["Caprock Canyons State Park", "About 90 miles south-east", "Bison, rugged trails and another dramatic break in the plains reward travelers extending the trip beyond Palo Duro."],
        ["Lake Meredith National Recreation Area", "About 65 miles north", "Reservoir scenery, hiking and boating introduce a different Panhandle landscape."],
        ["Alibates Flint Quarries National Monument", "North-east of Amarillo", "Ranger-led archaeology and the story of high-quality flint connect the Panhandle landscape to thousands of years of human use."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Palo_Duro_Canyon_State_Park.jpg?width=1600",
      alt: "Layered red canyon walls and open landscape in Palo Duro Canyon State Park",
      width: 1600,
      height: 898,
      credit: "Gail Frederick · CC BY 2.0 · Wikimedia Commons",
    },
  },

  "padre-island-national-seashore": {
    summary:
      "A long protected barrier-island coastline south of Corpus Christi where undeveloped Gulf beaches, dunes, tidal flats, sea-turtle conservation, bird migration and miles of beach driving preserve a much wilder Texas coast than the resort districts nearby.",
    nearestTown: "Corpus Christi",
    bestSeason:
      "Fall through spring for mild beach weather and birding; summer brings heat, humidity and storm risk but also seasonal sea-turtle activity, so conditions should guide every visit",
    entryNote:
      "An entrance pass is required, but no general entry reservation is needed. Camping is first-come, first-served and has limited services. Driving south on the beach becomes increasingly remote; four-wheel drive may be necessary depending on distance and conditions, so check tides, weather and beach-driving advisories first.",
    highlights: [
      "Malaquite Beach and Visitor Center",
      "Miles of undeveloped Gulf shoreline and dunes",
      "Seasonal Kemp's ridley sea-turtle conservation programs",
      "Birding along a globally important barrier-island migration corridor",
      "South Beach driving and primitive camping for prepared visitors",
    ],
    body: [
      "Padre Island National Seashore protects a long stretch of barrier island where the Texas coast still feels genuinely wild. Unlike the developed resort areas farther north, the seashore is dominated by dunes, open Gulf beach, tidal flats and hypersaline Laguna Madre habitat. That undeveloped scale is the reason to come, whether the plan is a few hours at Malaquite Beach or a remote drive far down-island.",
      "Malaquite Visitor Center is the sensible first stop. It provides current conditions, beach access, ranger information and orientation before visitors decide how far south to travel. The developed area also gives families and travelers with mobility needs a more manageable introduction to the seashore before the road transitions onto open beach.",
      "Beach driving is one of Padre Island's defining experiences and one of its biggest planning responsibilities. South Beach continues for dozens of miles, but conditions change with tides, storms, soft sand and traffic. The farther a vehicle travels, the less forgiving a breakdown becomes. Carry recovery equipment, water, food and a realistic fuel margin, and do not treat a two-wheel-drive vehicle as a guarantee of access simply because the first miles look easy.",
      "Wildlife gives the seashore another identity. Padre Island is internationally important for birds moving along the Gulf, and the park's Kemp's ridley sea-turtle recovery work has made seasonal hatchling releases one of the best-known conservation experiences on the Texas coast. Wildlife programs are never guaranteed on a given date, so visitors should follow current park announcements rather than building an entire trip around an expected release.",
      "Camping is intentionally simple. Developed and primitive camp areas provide access to the coast, but reservations are not the organizing system used here and services become minimal away from Malaquite. Wind, salt, insects and sudden Gulf weather can turn an easy beach night into a demanding one, so preparation matters even when the campsite is close to the water.",
      "The seashore pairs naturally with Corpus Christi and the rest of the Coastal Bend. North Padre Island has restaurants and lodging just outside the park, Mustang Island and Port Aransas extend the beach trip north, and Downtown Corpus Christi adds the Texas State Aquarium and USS Lexington. That lets travelers combine a protected natural coastline with classic family attractions without giving up the wilder beach experience.",
    ],
    managingAuthority: "National Park Service",
    officialUrl: "https://www.nps.gov/pais/planyourvisit/index.htm",
    sourceCheckedAt: "2026-08-17",
    county: "Nueces",
    address: "20420 Park Road 22, Corpus Christi, TX 78418",
    directions:
      "The seashore entrance is at the south end of North Padre Island via Park Road 22. There is no public transit to the park. Once pavement ends on South Beach, travel is directly on sand; check current beach conditions and know your vehicle's limits before continuing far down-island.",
    accessibilityNotes:
      "Malaquite Visitor Center and its main facilities are accessible, with an accessible route toward the beach. The park has beach wheelchairs and walkers available for visitor use, and the Grasslands Nature Trail provides an accessible nature option. Primitive beach areas are much less predictable for mobility access.",
    areaGuide: {
      intro:
        "Padre Island National Seashore sits at the wild southern end of the Corpus Christi barrier-island corridor. North Padre provides the closest services, while Mustang Island, Port Aransas and Downtown Corpus Christi let travelers add family attractions, restaurants and developed beach-town experiences around the protected shoreline.",
      nearbyAttractions: items(
        ["North Padre Island beaches", "Just north of the seashore", "Developed public beach areas and neighborhood services provide a more conventional beach-day option close to the park."],
        ["Mustang Island State Park", "About 25 miles north", "Camping, paddling and Gulf beach access create a state-park companion to the national seashore.", "/destination/mustang-island-state-park"],
        ["Packery Channel", "North Padre Island", "Jetties, fishing and Gulf views give visitors another coastal access point between the seashore and Corpus Christi."],
        ["Oso Bay Wetlands Preserve", "Corpus Christi", "Trails and wetland interpretation add a mainland birding and family-nature stop before or after the island."]
      ),
      foodAndDrink: items(
        ["North Padre Island", "Closest dining area", "Casual seafood, tacos and beach-oriented restaurants are the easiest meal stop outside park boundaries."],
        ["Flour Bluff", "Across the JFK Causeway", "A larger mainland concentration of everyday restaurants and groceries is useful for resupply before entering the seashore."],
        ["Downtown Corpus Christi", "About 25 miles north-west", "Waterfront restaurants and a broader food scene pair well with museums, the aquarium and bayfront attractions."],
        ["Port Aransas", "Farther north on Mustang Island", "Seafood, bars and beach-town dining make Port Aransas a destination meal area on a longer Coastal Bend trip."]
      ),
      lodging: items(
        ["North Padre Island", "Closest base", "Vacation rentals, condos and hotels keep visitors near the seashore entrance while preserving easy access to restaurants."],
        ["Corpus Christi", "About 20–30 miles away", "The broadest hotel selection is useful for families combining the national seashore with city attractions."],
        ["Port Aransas", "North on Mustang Island", "A classic beach-town base works well for a multi-day island trip that includes both developed and protected coastline."],
        ["Park camping", "Inside the seashore", "First-come camp areas put visitors on the coast itself, but services are limited and weather preparation is essential."]
      ),
      neighborhoods: items(
        ["North Padre Island / Padre Isles", "Immediately north", "Canals, beach neighborhoods and visitor services form the developed gateway to the national seashore."],
        ["Flour Bluff", "Mainland side of the causeway", "A practical Corpus Christi district for groceries, fuel and everyday services before island travel."],
        ["Downtown Corpus Christi", "Bayfront", "Museums, the marina and family attractions create the urban side of a Coastal Bend itinerary."],
        ["Port Aransas", "North on Mustang Island", "A walkable beach-town center adds shops, restaurants, fishing culture and a livelier evening scene."]
      ),
      familyStops: items(
        ["Malaquite Visitor Center and beach", "Inside the park", "Ranger information, an accessible developed area and immediate Gulf access make this the best first family stop."],
        ["Texas State Aquarium", "Downtown Corpus Christi", "Marine-life exhibits and conservation programs provide a major indoor family attraction tied directly to the Gulf."],
        ["USS Lexington", "Corpus Christi bayfront", "The preserved aircraft carrier adds naval and aviation history beside the aquarium."],
        ["Mustang Island State Park", "North of the seashore", "A more developed state-park beach day can complement the national seashore's remote feel.", "/destination/mustang-island-state-park"]
      ),
      sideTrips: items(
        ["Port Aransas", "North on Mustang Island", "Fishing, restaurants and beach-town culture make the strongest developed-island contrast to Padre Island National Seashore."],
        ["Mustang Island State Park", "About 25 miles north", "Add paddling, camping and another Gulf beach landscape without leaving the barrier-island route.", "/destination/mustang-island-state-park"],
        ["Corpus Christi bayfront", "About 25 miles north-west", "The aquarium, USS Lexington, museums and waterfront parks can fill a separate city day."],
        ["Rockport and Fulton", "Farther north in the Coastal Bend", "Art, bays, birding and fishing communities provide a quieter coastal extension for travelers continuing beyond Corpus Christi."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Padre_Island_National_Seashore_-_sand_dunes3.jpg?width=1600",
      alt: "Sand dunes and coastal vegetation at Padre Island National Seashore",
      width: 1600,
      height: 1200,
      credit: "National Park Service · Public domain · Wikimedia Commons",
    },
  },
};

export function applyCuratedTopAttractionsBatch2(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? {
        ...destination,
        ...override,
        hero: { ...destination.hero, ...override.hero },
      }
    : destination;
}
