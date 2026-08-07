import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curatedBatch2: Record<string, Partial<Destination>> = {
  "enchanted-rock-state-natural-area": {
    summary: "A massive pink-granite dome north of Fredericksburg with nearly 21 miles of hiking, a famous summit climb, rock climbing, stargazing and a newly opened backcountry trail system.",
    nearestTown: "Fredericksburg",
    bestSeason: "Fall through spring for cooler hiking; summer heat and exposed granite can be intense",
    entryNote: "Day-use reservations are strongly recommended. The Summit Trail may close in wet weather, and most trails close 30 minutes after sunset.",
    highlights: [
      "Summit Trail to broad Hill Country views from the granite dome",
      "Nearly 21 miles of hiking trails, including new backcountry routes",
      "Rock climbing and bouldering with required check-in at headquarters",
      "Dark-sky stargazing and distinctive granite formations",
    ],
    body: [
      "Enchanted Rock is one of the Hill Country’s defining landscapes: a huge dome of exposed pink granite rising abruptly above oak-covered country north of Fredericksburg. The short climb to the summit is the classic first experience, but the natural area extends well beyond the dome itself.",
      "Nearly 21 miles of hiking trails now include a larger backcountry area with ponds, wildlife habitat and views that spread visitors beyond the Summit Trail. Rock climbing and bouldering are also major draws, while clear nights make the exposed granite and dark sky a memorable combination after the heat of the day is gone.",
      "The rock can be punishing in summer and dangerously slick when wet. Bring drinking water, reserve entry for busy dates, and check current trail status before leaving. Pets are restricted to designated areas and the Loop Trail rather than the full trail system.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock",
  },
  "palo-duro-canyon-state-park": {
    summary: "Texas Panhandle canyon country where a steep park road drops from the plains to red-and-cream cliffs, CCC history and the iconic Lighthouse formation on one of the state’s best-known trails.",
    nearestTown: "Canyon",
    bestSeason: "Spring and fall for hiking; summer temperatures on the canyon floor can be dangerous",
    entryNote: "Reserve entry on busy dates, carry ample water and check heat and trail alerts before hiking. The canyon floor is often significantly hotter than the rim.",
    highlights: [
      "Lighthouse Trail to the park’s signature hoodoo formation",
      "CCC Trail descending about 500 feet from rim to canyon floor",
      "Layered red, orange and cream geology across the canyon walls",
      "Hiking, biking, horseback riding, camping and historic CCC features",
    ],
    body: [
      "Palo Duro Canyon feels almost impossible after miles of flat Panhandle horizon. The land suddenly opens into a deep network of colorful cliffs, mesas and drainages, and the park road carries visitors from the rim down through layers of geologic history to the canyon floor.",
      "The 2.8-mile one-way Lighthouse Trail is the park’s signature hike, ending at the formation that has become Palo Duro’s visual symbol. Other routes range from easier riverside and biking trails to the difficult CCC Trail, which drops roughly 500 feet and crosses historic bridges built during the park’s early development.",
      "Heat is the central planning issue. Summer conditions on the canyon floor can become dangerous quickly, and shade is limited on many trails. Start early, carry more water than you think you need, and check park alerts before committing to a long hike.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    accessibilityNotes: "The park has an all-terrain wheelchair available by reservation; contact the park before arrival for current availability.",
  },
  "caddo-lake-state-park": {
    summary: "A cypress-and-Spanish-moss East Texas park on the maze-like waters of Caddo Lake, with paddling, fishing, CCC cabins and easy access to one of the state’s most distinctive wetland landscapes.",
    nearestTown: "Karnack",
    bestSeason: "Fall through spring for cooler paddling and hiking; spring is especially good for birding",
    entryNote: "Reserve day use or cabins in advance for busy periods. Canoe rentals are available through park headquarters when conditions and operations allow.",
    highlights: [
      "Bald cypress forest draped in Spanish moss",
      "Canoeing and kayaking through marked bayous and boat roads",
      "CCC-era cabins and historic park structures",
      "Fishing, birding and wetland wildlife viewing",
    ],
    body: [
      "Caddo Lake State Park is the gateway to a landscape that looks unlike almost anywhere else in Texas. Bald cypress trunks rise from dark water, Spanish moss hangs from branches, and narrow channels lead into a broad wetland maze shared by Texas and Louisiana.",
      "Paddling is the defining experience, whether from a rented canoe or your own kayak. The park also gives visitors a dry-land base with trails, fishing access and CCC-built cabins, making it possible to experience the lake at first and last light instead of treating it as a quick stop.",
      "Navigation and weather deserve respect here. Stay on marked routes, carry a map or downloaded navigation, and check current lake and park conditions before launching. Cabins and popular campsites can book well ahead during pleasant-weather months.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake",
  },
  "balmorhea-state-park": {
    summary: "A West Texas oasis built around San Solomon Springs and the world’s largest spring-fed swimming pool, where clear 72-to-76-degree water fills a historic CCC-era park in the desert.",
    nearestTown: "Balmorhea",
    bestSeason: "Year-round for the spring-fed pool; summer is busiest, while spring and fall pair swimming with milder desert weather",
    entryNote: "The pool is open on a schedule and can be affected by maintenance or park alerts. Reserve day use in advance; swimming has no extra charge beyond park entry.",
    highlights: [
      "1.3-acre spring-fed swimming pool supplied by San Solomon Springs",
      "Crystal-clear water typically 72 to 76 degrees year-round",
      "Swimming and scuba diving in water up to about 25 feet deep",
      "CCC history, desert wetlands and San Solomon Springs Courts lodging",
    ],
    body: [
      "Balmorhea State Park exists because San Solomon Springs pushes an extraordinary volume of clear water into an otherwise dry West Texas landscape. The Civilian Conservation Corps shaped that water into a 1.3-acre pool in the 1930s, and the result still feels both improbable and completely at home in the desert.",
      "More than 15 million gallons of spring water flow through the pool each day. The water stays roughly 72 to 76 degrees year-round and reaches depths of about 25 feet, making the park a destination for swimmers, snorkelers and scuba divers as well as travelers looking for a memorable break between long West Texas drives.",
      "Check active alerts before making a special trip because pool operations can change for maintenance or repairs. There are no lifeguards, younger swimmers require supervision, and divers have additional rules and fees beyond normal park entry.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/balmorhea",
  },
  "guadalupe-river-state-park": {
    summary: "Four miles of Guadalupe River frontage between San Antonio and the Hill Country, pairing cypress-lined swimming and paddling water with trails, camping and access to the protected Honey Creek landscape.",
    nearestTown: "Spring Branch",
    bestSeason: "Late spring through early fall for river time; fall through spring for comfortable hiking",
    entryNote: "River conditions and park access can change after storms. Reserve day use for busy warm-weather dates and check current alerts before swimming or paddling.",
    highlights: [
      "Four miles of Guadalupe River frontage",
      "Swimming, tubing, paddling and fishing when river conditions allow",
      "Hill Country trails through prairie, oak woodland and river corridor",
      "Guided access to nearby Honey Creek State Natural Area",
    ],
    body: [
      "Guadalupe River State Park is one of the easiest places to understand why the river is central to Hill Country life. Cypress trees shade clear stretches of water, limestone shelves create natural gathering places, and the park gives visitors several miles of river instead of a single crowded access point.",
      "Swimming and tubing are the warm-weather draw, but the park also works well for hiking, biking, fishing and camping. Trails move away from the river through prairie and oak woodland, while interpretive programs and guided opportunities connected with Honey Creek add a quieter natural-history side to the visit.",
      "The Guadalupe changes with rainfall, releases and storms, so check current river and park conditions before leaving. Busy summer weekends can fill, making advance day-use reservations worthwhile even for a simple afternoon swim.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/guadalupe-river",
    accessibilityNotes: "The park offers accessible facilities and an all-terrain wheelchair by request; contact the park before arrival for availability.",
  },
  "inks-lake-state-park": {
    summary: "A constant-level Highland Lakes park northwest of Austin with pink granite outcrops, more than 12 miles of trails and the popular Devil’s Waterhole swimming and paddling area.",
    nearestTown: "Burnet",
    bestSeason: "Spring through fall for water activities; cooler months are excellent for hiking and camping",
    entryNote: "Day-use passes can sell out on warm weekends. Swim at your own risk and check current park alerts and water conditions before arrival.",
    highlights: [
      "Devil’s Waterhole for swimming, kayaking and canoeing",
      "More than 12 miles of Hill Country trails over ancient rock",
      "Valley Spring Creek waterfall when the creek is flowing",
      "Fishing, camping, paddling and scenic granite shoreline",
    ],
    body: [
      "Inks Lake combines dependable water with some of the most distinctive geology in the Highland Lakes. Pink and gray rock outcrops frame the shoreline, while coves and low ridges make the park feel more intimate than the larger reservoirs around it.",
      "Devil’s Waterhole is the best-known stop, where Spring Creek meets Inks Lake and creates a scenic swimming and paddling destination. More than 12 miles of trails lead through rocky uplands, along fishing access and to overlooks, birding spots and a seasonal waterfall on Valley Spring Creek.",
      "Warm weekends are busy, so reserve day use before making the drive. Swimming is unsupervised, and creek flow and water conditions vary, so check current alerts rather than assuming every water feature will look the same as it does in peak-season photographs.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/inks-lake",
    accessibilityNotes: "The park has accessible campsites and an all-terrain wheelchair available by request; contact the park for current availability.",
  },
  "lost-maples-state-natural-area": {
    summary: "A rugged Sabinal River canyon preserve west of San Antonio protecting rare Uvalde bigtooth maples, with more than 10 miles of trails, steep overlooks and one of Texas’s most anticipated fall-color displays.",
    nearestTown: "Vanderpool",
    coordinates: { lat: 29.807719, lng: -99.570697 },
    bestSeason: "October and November for fall color; spring is excellent for wildflowers and hiking",
    entryNote: "October and November regularly reach capacity. Reserve before visiting, and check the fall foliage report and trail closures before the drive.",
    highlights: [
      "Uvalde bigtooth maples and variable but often striking fall color",
      "More than 10 miles of rugged canyon and ridge trails",
      "Sabinal River, steep canyon walls and scenic woodland",
      "A high loop reaching the top of a roughly 2,200-foot cliff",
    ],
    body: [
      "Lost Maples is famous for autumn, but the preserve is more than a seasonal photo stop. Sheltered canyons along the Sabinal River protect a stand of Uvalde bigtooth maples, while steep limestone terrain, springs and mixed woodland create a landscape that feels noticeably different from the surrounding Hill Country.",
      "The trail system covers more than 10 miles, ranging from the short Maple Trail to demanding routes that climb toward high canyon rims. Fall color depends on weather rather than a fixed calendar, so TPWD’s foliage reports are more useful than picking a date based on previous years.",
      "October and November are extremely busy and can reach capacity daily. Reserve before leaving, bring what you need because cell service is absent in the natural area, and stay on designated trails to protect shallow-rooted maples and fragile canyon habitat.",
    ],
    county: "Bandera",
    address: "37221 F.M. 187, Vanderpool, TX 78885",
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/lost-maples",
  },
  "monahans-sandhills-state-park": {
    summary: "A West Texas field of wind-shaped dunes where visitors can roam without marked trails, rent sand discs, camp beneath wide skies and watch the landscape change after every strong wind.",
    nearestTown: "Monahans",
    bestSeason: "Fall through spring for comfortable dune exploration; summer sand and air temperatures can be extreme",
    entryNote: "There are no marked trails on the dunes. Carry water, protect yourself from sun and wind, and check current park alerts before setting out.",
    highlights: [
      "Open dune field shaped constantly by West Texas wind",
      "Sand-disc rentals for sledding the dunes",
      "No fixed trails, allowing free exploration across the sand",
      "Dunagan Visitor Center, camping and broad sunset views",
    ],
    body: [
      "Monahans Sandhills is less a single landmark than a moving landscape. Wind continuously reshapes the dunes into ridges, bowls and slopes, so the park can look different from one visit to the next even though the underlying sand field has been here for thousands of years.",
      "There are no marked hiking trails across the dunes. Visitors are free to explore on foot, and the park rents sand discs for sledding from headquarters. The Dunagan Visitor Center explains the ecology and history of a place that appears empty at first glance but supports specialized plants and animals.",
      "The open sand offers almost no protection from heat, sun or strong wind. Cooler months are the easiest time to explore, and even then it is smart to carry water, note the direction back to developed areas and check current alerts before heading deep into the dunes.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/monahans-sandhills",
  },
};

export function applyCuratedDestinationBatch2(destination: Destination): Destination {
  const override = curatedBatch2[destination.slug];
  if (!override) return destination;
  return {
    ...destination,
    ...override,
    hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero,
  };
}

export function applyCuratedDestinationsBatch2(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch2);
}
