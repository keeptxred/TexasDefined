import type { Destination } from "./types";

/**
 * Fort Leaton is a separately explorable historic trading post and the
 * WESTERN entrance to Big Bend Ranch State Park, not a generic campground.
 * Source checked against TPWD's official park, history and map pages
 * 2026-11-13. Hero is the site's existing Carol M. Highsmith public-domain
 * photograph (rights already governed by explore-hero-map.ts).
 */
export const fortLeatonHistoricSiteAuthority: Destination = {
  id: "gsc-restored-fort-leaton-historic-site",
  brandId: "texasdefined",
  slug: "fort-leaton-state-historic-site",
  name: "Fort Leaton State Historic Site",
  category: "historic-sites",
  region: "big-bend",
  nearestTown: "Presidio",
  county: "Presidio",
  coordinates: { lat: 29.542511, lng: -104.326348 },
  address: "16952 FM 170 East, Presidio, TX 79845",
  hero: {
    src: "/images/explore/historic-sites/fort-leaton-state-historic-site.jpg",
    alt: "Adobe structures at Fort Leaton State Historic Site near Presidio, Texas",
    width: 1600,
    height: 1068,
    credit: "Carol M. Highsmith · Public domain · Wikimedia Commons",
  },
  summary: "Walk a fortified nineteenth-century adobe trading post east of Presidio, learn about the older La Junta settlements, and use the site as Big Bend Ranch State Park's western permit and information gateway.",
  bestSeason: "September through April is the busier season; cooler weather is generally safer for a self-guided desert history visit.",
  entryNote: "TPWD lists the site open daily, with its park office 8 a.m.–4:30 p.m. and closed December 25. Adult day use is currently listed at $5, children 12 and under free. Check TPWD's live hours, admission, availability and alerts before driving.",
  highlights: [
    "Explore the surviving fortified adobe trading post built in 1848",
    "Read about Juana Pedrasa, Ben Leaton and the La Junta trading corridor",
    "Follow TPWD's self-guided historic-site walking tour",
    "Obtain Big Bend Ranch State Park west-side visitor information and required permits",
    "Continue east on FM 170's Rio Grande scenic drive with correct park access maps",
  ],
  body: [
    "Fort Leaton is about four miles southeast of Presidio on FM 170, close to the Rio Grande. Its adobe rooms and walled compound are the attraction: they tell a trading and settlement story that predates modern state-park tourism. The site also functions as the western entrance office for Big Bend Ranch State Park. Those are two different reasons to stop, and the visitor should not mistake a historic-site admission for a reservation at an interior backcountry campsite.",
    "The place stands in the La Junta de los Ríos region, where the Río Conchos meets the Rio Grande. Long before the adobe fort, Indigenous farming communities used fertile river soils and water to grow crops, settle permanently and exchange goods across the borderlands. TPWD places the fort in that much longer history rather than starting the region's story with nineteenth-century Anglo merchants. That matters when reading the exhibits: a trading post did not create the agricultural and cultural significance of La Junta.",
    "Ben Leaton and Juana Pedrasa established their fortified adobe commercial compound in 1848 as the Mexican-American War was ending. Traders, travelers and some military parties used the route between settlements in Texas and communities farther into northern Mexico. The site's thick-walled architecture reflects both the need for storage and the uncertainty of travel through the borderlands. TPWD records that its trading activity ended in 1884 and it was abandoned in 1925; the state acquired the property in 1967 and opened the historic site to visitors in 1978. Today, that physical continuity is what makes the fort different from a recreated frontier display.",
    "A first visit works best as a self-guided walk through the adobe compound paired with the state park's historic interpretation. TPWD publishes a specific Fort Leaton interpretive guide and walking tour; download the documents before leaving town if cellular service may be weak. Move carefully on uneven outdoor surfaces and observe all posted protections for the adobe fabric. Do not assume every room, tour or interpretive program is open on the same schedule as the entrance office.",
    "The office's second role is logistics. Big Bend Ranch State Park is divided between the River District and the remote Interior District. Fort Leaton is the WEST gateway near Presidio; Barton Warnock Visitor Center on FM 170 east of Lajitas is the EAST gateway. The Sauceda Ranger Station is another 27 miles of rugged dirt road into the interior and its office is closed under TPWD's current guidance. A camping or river itinerary must match the permitted area, check-in point, vehicle clearance and current closure alerts, not just a map pin for the sprawling park.",
    "For a short stop from Presidio, allow time to understand La Junta and take the adobe walking route instead of using the fort only as a permit counter. Visitors continuing east should follow FM 170's scenic corridor along the Rio Grande with water and fuel already aboard. The route is exposed to seasonal heat and storm runoff; the park warns of abrupt flash flooding in normally dry channels. Families can combine a historic visit with the river scenery without treating the remote park interior as an easy, paved drive.",
    "Fort Leaton is not an ordinary standalone state-park campground. TPWD's Big Bend Ranch visitor guidance places primitive overnight camping in designated River and Interior District areas, with permit and reservation rules that depend on the site. Before planning an overnight stay, open the official Big Bend Ranch complex map, identify the exact campground and confirm which permit is needed at Fort Leaton. If you only want to explore the adobe fort, plan a day-use historic-site stop rather than buying a camping trip you do not need.",
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/fort-leaton",
  sourceCheckedAt: "2026-11-13",
  updatedAt: "2026-11-13",
  directions: "Four miles southeast of downtown Presidio on FM 170 (River Road), at 16952 FM 170 East; GPS 29.542511, -104.326348. Fort Leaton is the Big Bend Ranch WEST visitor/permit entrance, not the Sauceda station.",
  accessibilityNotes: "This is a historic adobe site in desert terrain. Ask TPWD at 432-229-3613 about the accessibility of the specific rooms, surfaces, tours and restrooms before relying on step-free access; do not assume every historic interior is wheelchair accessible.",
  visitorFacts: [
    { topic: "hours", label: "Historic site and west entrance office", detail: "Listed open daily; office 8 a.m.–4:30 p.m., closed December 25. Verify seasonal programs and alert notices before visiting.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map", checkedAt: "2026-11-13" },
    { topic: "admission", label: "Published day-use fee", detail: "TPWD lists $5 for visitors 13 and older and free admission for children 12 and under; confirm current rates and capacity with the operator.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-leaton", checkedAt: "2026-11-13" },
    { topic: "access", label: "Western park gateway", detail: "Use the official Fort Leaton map and enter on FM 170 east of Presidio. Separate Big Bend Ranch River/Interior campsite and permit rules still apply.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-leaton/map", checkedAt: "2026-11-13" },
    { topic: "reservations", label: "Separate camping and day passes", detail: "Do not treat the fort as a developed campground. TPWD recommends advance reservations for park day access and camping; some backcountry permits are obtained on arrival.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch", checkedAt: "2026-11-13" },
  ],
  visitorFaqs: [
    { question: "Is Fort Leaton the same place as Big Bend Ranch State Park?", answer: "No. Fort Leaton is a historic adobe attraction and the park's western visitor/permit gateway. Big Bend Ranch stretches far beyond it, with separate River and Interior districts, campsites and entrances.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-leaton/map" },
    { question: "Can I camp at Fort Leaton?", answer: "Do not plan the adobe fort as an ordinary developed campsite. Big Bend Ranch camping takes place in separately permitted park locations; check the exact TPWD campsite and permit details before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch" },
    { question: "Where is the other Big Bend Ranch visitor center?", answer: "Barton Warnock Visitor Center is the eastern entrance on FM 170 at 21800 FM 170, Terlingua, near Lajitas. Fort Leaton is the western entrance near Presidio.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map" },
  ],
};
