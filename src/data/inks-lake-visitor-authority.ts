import type { Destination } from "./types";

/**
 * Inks Lake visitors need to distinguish actual lake access, campground loop,
 * primitive backcountry and dated hunting closures. Official source review
 * 2026-10-17; no blanket closure inferred from partial TPWD notice.
 */
export function applyInksLakeVisitorAuthority(destination: Destination): Destination {
  if (destination.slug !== "inks-lake-state-park"
    || !/^https:\/\/tpwd\.texas\.gov\/state-parks\/inks-lake\/?/.test(destination.officialUrl ?? "")) return destination;

  const sourceUrl = "https://tpwd.texas.gov/state-parks/inks-lake/alert";
  const updatedBody = [
    "Inks Lake State Park in the Texas Hill Country is a lake-and-granite destination where the name of the actual recreation area determines the outing. A day swimming or paddling near the developed shoreline is quite different from hiking toward Devils Waterhole or carrying gear to remote primitive campsites. The park's permanent lake character supports year-round recreation, but that does not guarantee that every trail, rental, campsite or fire ring is available on a particular date. Begin with the TPWD park and trails maps, then select a reservation and arrival gate that match the day.",
    "Campground details have real consequences. TPWD lists 114 electric campsites for ordinary RV and tent use, four separate 20-amp tent-only electric sites requiring a short walk from parking, 42 water-only sites whose RV size and generator restrictions matter, and nine primitive hike-in campsites. The primitive area is reached by a substantial walk with no drinking water at the campsites; pets and ground fires are prohibited there. Do not advertise those primitive sites as waterfront RV spots, and do not assume that an accessible numbered electric campsite has the same layout as a backcountry tent site.",
    "The October 14, 2026 TPWD burn ban is a restriction on both WOOD and CHARCOAL fires—not a ban on propane and similar containerized fuel stoves used for cooking. The rule applies even to visitors who normally expect a campground grill or fire ring to be available. Check current notices before arrival because Texas fire restrictions change with local conditions; do not infer that a supplier selling charcoal or firewood establishes permission to burn it.",
    "TPWD also identifies PARTIAL hunting-related closures. Some hiking trails, some west-loop campsites and the primitive campsites are affected December 3–6 and December 14–17, 2026, plus January 4–7, January 11–14 and January 18–21, 2027. Affected areas close at 5 p.m. on their first date and reopen at 2 p.m. on their last date. Only permitted hunters can enter the affected closed areas during the posted windows. This notice does not say the entire park is closed: check the precise campsite and trail with TPWD before cancelling a different reservation or recommending an alternate outing.",
    "For a practical first visit, pick a developed lakeside activity and allow time for a short signed walk rather than stringing together every landmark. TPWD warns that camping and day-use capacity can sell out on weekends, holidays and school breaks; make reservations directly through its official booking process before a long drive. Inspect the specific official alerts before departure and avoid treating a scenic picture of Devils Waterhole as evidence of safe swimming, open trails or permission to enter a restricted unit."
  ];
  const existing = (destination.body ?? []).filter(Boolean);
  const extra = existing.length && existing.join(" ").length >= 2000
    ? updatedBody.filter((p) => !existing.join(" ").includes(p.slice(0,80)))
    : updatedBody;
  return {
    ...destination,
    sourceCheckedAt: "2026-10-17",
    entryNote: "TPWD October 14 burn ban: neither wood nor charcoal fires allowed, but containerized fuel stoves are permitted for cooking. Selected west-loop sites, primitive campsites and trails have partial hunting closures December 2026–January 2027, NOT a whole-park closure. Check exact dates and areas before reserving.",
    highlights: [
      "Inks Lake swimming, paddling and shoreline recreation",
      "Devils Waterhole and mapped Hill Country hiking",
      "Developed campsites with distinct electrical and vehicle restrictions",
      "Primitive hike-in sites and partial winter access limitations"
    ],
    body: existing.join(" ").length >= 2000 ? [...existing, ...extra] : updatedBody,
    visitorFaqs: [
      ...(destination.visitorFaqs ?? []).filter((q) => !/campfire|charcoal|hunt|closed|hunting|fire ban/i.test(q.question)),
      { question: "Can I use charcoal or build a wood fire at Inks Lake?", answer: "No. TPWD's October 14, 2026 burn ban prohibits ash-producing wood and charcoal fires, but allows containerized cooking-fuel stoves such as propane. Verify the latest alert before travel.", sourceUrl },
      { question: "Is Inks Lake State Park completely closed during the winter hunts?", answer: "No blanket park closure is stated. The TPWD alert applies only to specified west-loop campsites, primitive campsites and trails during five December 2026 and January 2027 windows. Call TPWD to confirm your chosen reservation or trail.", sourceUrl },
      { question: "Can I bring an RV to an Inks Lake primitive campsite?", answer: "No. The primitive hike-in campsites are reached on foot, have no drinking water and prohibit pets and ground fires. Choose one of the separately listed developed sites if you need vehicle access.", sourceUrl: "https://tpwd.texas.gov/state-parks/inks-lake/fees-facilities/campsites" }
    ]
  };
}
