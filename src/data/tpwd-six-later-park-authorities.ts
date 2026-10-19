import type { Destination } from "./types";
/**
 * Six original, TPWD-grounded destination guides checked 2026-10-17.
 * Park-specific rules override stale generic general guidance; preserve
 * existing licensed hero, county, location, prior unique research and SEO gates.
 */
const PARK_AUTHORITY:Readonly<Record<string,{entryNote:string;body:string[];visitorFaqs:NonNullable<Destination["visitorFaqs"]>}>> = {
  "kickapoo-cavern-state-park": {
  "entryNote": "Open 8 a.m. Friday–4:30 p.m. Monday; closed to general visits the rest of the week. No trash service: carry out everything. Guided cave visits require separate arrangements; do not assume walk-in cave entry.",
  "body": [
    "Kickapoo Cavern State Park is a remote western Hill Country/Edwards Plateau destination suited to a slower weekend of hiking, camping, wildlife watching and learning about cave protection. A photograph of limestone formations does not mean visitors can enter a cave freely: cave access, guided activities and any bat-viewing programs are separate from an ordinary campsite booking and must be verified with Texas Parks and Wildlife.",
    "Unlike typical Texas state parks, the public opening schedule is Friday at 8 a.m. to Monday at 4:30 p.m. The park is closed to general entry during the remaining weekday period. That schedule matters for anyone planning an extended midweek road trip from Del Rio, Brackettville or farther away. Confirm any tour departure and the correct park entrance before driving into a remote area with limited nearby services.",
    "The TPWD notice also says the park has no trash service. Everyone must take their own refuse off the property; do not plan around ordinary campground dumpsters. The five full-hookup sites and ten water-only sites have different equipment and pad limits, and large RVs over 36 feet do not fit the developed full-hookup pads. Disconnect towed vehicles where required and check the site designation carefully.",
    "For an introductory visit, prioritize a verified open-day hike or staffed interpretive program, then add a guided cave experience only if the park confirms that space is available. Bring plenty of drinking water and do not enter closed underground areas, disturb roosting wildlife or assume that an overnight reservation overrides the Friday–Monday operating schedule."
  ],
  "visitorFaqs": [
    {
      "question": "Can I visit Kickapoo Cavern on Wednesday?",
      "answer": "Not under TPWD's published schedule. The park opens Friday morning and closes Monday afternoon, and is closed the rest of the week.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/kickapoo-cavern/alert"
    },
    {
      "question": "Are trash bins available at Kickapoo Cavern?",
      "answer": "No. TPWD specifically requires visitors to carry out all trash.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/kickapoo-cavern/alert"
    },
    {
      "question": "Does a campsite reservation include independent cave entry?",
      "answer": "No such access should be assumed. Check official cave-tour and guided-program requirements directly with the park.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/kickapoo-cavern/alert"
    }
  ]
},
  "possum-kingdom-state-park": {
  "entryNote": "Cabins 1–6 close December–February for renovations; ADA kayak launch closed for repairs. Entire park closed to regular visitors Dec 4–7 and Dec 11–14, 2026 during permitted hunts.",
  "body": [
    "Possum Kingdom State Park provides lake-country camping and water recreation on Possum Kingdom Lake, but visitors should not mistake the park's campsites for the many separately owned shore resorts elsewhere around the reservoir. The park's Spanish Oaks, Shady Grove, Lakeview, Chaparral and primitive camping types differ in electric service, RV size allowances and walking distance from parking.",
    "TPWD has announced that cabins one through six will be closed for renovations during December, January and February. A photograph of the lakeside cabins or an undated general lodging description is not a promise of winter availability. The park's accessible kayak launch is also closed for repairs under a separate notice; other boating opportunities must be checked independently rather than declaring every boat facility unusable.",
    "Two full-park permitted-hunting closures exclude regular visitors from 10 p.m. December 4 to 6 a.m. December 7, 2026, and from 10 p.m. December 11 to 6 a.m. December 14. These are not merely restrictions on a small trail section. Avoid planning a family overnight trip across the posted closure windows unless an official permit specifically authorizes entry.",
    "For camping, the Shady Grove RV length limit of twenty-five feet remains important even when that seasonal loop is open. Primitive campers must carry gear from parking and should not expect full-hookup or adjacent restroom facilities. An accurate weekend plan chooses the specific open loop and legal water access point before selecting a private boat tour or outside accommodations."
  ],
  "visitorFaqs": [
    {
      "question": "Can I book Possum Kingdom cabins in January?",
      "answer": "Not cabins 1–6 under the TPWD December-through-February renovation closure notice. Check official inventory for other accommodations.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/possum-kingdom/alert"
    },
    {
      "question": "Is the accessible kayak launch operating?",
      "answer": "TPWD lists the ADA kayak launch closed for repairs; inquire about alternate appropriate lawful access.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/possum-kingdom/alert"
    },
    {
      "question": "Does Possum Kingdom close entirely for hunts in December?",
      "answer": "Yes, the listed December 4–7 and December 11–14, 2026 intervals close the entire park to ordinary visitors.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/possum-kingdom/alert"
    }
  ]
},
  "lake-casa-blanca-international-state-park": {
  "entryNote": "Low water has closed the courtesy dock, but TPWD says the concrete boat ramps remain open with caution. Shoreline launching also remains permitted under the alert. Verify ramp depth before towing a boat.",
  "body": [
    "Lake Casa Blanca International State Park is a Laredo-area park organized around a freshwater lake, where fishing, walking, waterside picnics and overnight stays offer a break from urban South Texas. Its location in Webb County makes it useful for a short trip, but boaters should plan around the named facility they intend to use rather than assuming that all waterfront structures are in service.",
    "TPWD's low-water notice closes the courtesy dock, while expressly stating that the concrete boat ramps remain open. That distinction is consequential: the loss of a floating dock does not automatically close the trailer ramps, and the official notice also permits shoreline launching. Low water still demands caution when placing or removing a watercraft. Recheck current depth, obstructions and park staff guidance before trailering.",
    "The developed camping inventory includes eleven full-hookup water, sewer and electric sites as listed in the current TPWD campsite table, together with fifty-five water-and-electric sites. The same official full-hookup page includes conflicting prose describing ten sites, so availability and numbered pads should be confirmed on the actual reservation screen. It would be incorrect to silently choose whichever number sounds more precise.",
    "Visitors who are not boating can still plan a lakeside outing or a short trail walk subject to normal conditions. Campground utilities, day-use picnic access and boat launch permissions are separate practical questions. Keep an eye on the prevailing South Texas heat, carry drinking water and confirm a legal launch before promising a family that a low-water shoreline is fully accessible."
  ],
  "visitorFaqs": [
    {
      "question": "Are the concrete boat ramps at Lake Casa Blanca closed?",
      "answer": "No. TPWD's low-water notice closes the courtesy dock but states the concrete ramps remain open with caution.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/alert"
    },
    {
      "question": "Can boats launch from the shoreline?",
      "answer": "TPWD's posted notice says shoreline launching is allowed; verify present water and park conditions before attempting it.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/alert"
    },
    {
      "question": "How many full-hookup campsites are there?",
      "answer": "TPWD's inventory lists eleven, while prose on the same page says ten. Verify a specific campsite in the official booking system.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/alert"
    }
  ]
},
  "lake-colorado-city-state-park": {
  "entryNote": "Headquarters closes every Tuesday and Wednesday, but TPWD provides online and self-pay entry options. Courtesy dock closed; verify actual boating access independently.",
  "body": [
    "Lake Colorado City State Park provides lake and open-country recreation in Mitchell County in West Texas, with campsites and day-use facilities around the water. The setting can support fishing, walking and a quiet overnight outing, but the actual boat ramp, courtesy dock and headquarters are distinct parts of the operation. A building closure should not be translated into a whole-park shutdown.",
    "TPWD states the headquarters office is closed every Tuesday and Wednesday. The published alert tells visitors arriving on those days to pay online or use the self-pay station near headquarters. A visitor may therefore have a legal entry process despite no staffed desk at arrival. Check your exact camping reservation and any different after-hours gate instructions before traveling.",
    "The park's courtesy dock is separately listed closed under an October 23, 2025 notice. That does not necessarily mean the boat ramp or all fishing access is unavailable. Anyone planning to launch a boat should speak with park staff about current ramp condition, water level and whether a safe boarding point is available for their boat type.",
    "TPWD lists nine pull-through water-and-electric campsite spaces, sixty-nine additional electric-and-water sites and thirty-four water-only sites. They differ in service and parking geometry, not just the nightly price. A sensible outing starts with the correct campsite category, verifies dock and ramp conditions, and carries appropriate water and sun protection for West Texas exposure."
  ],
  "visitorFaqs": [
    {
      "question": "Is Lake Colorado City State Park closed on Tuesdays?",
      "answer": "The headquarters office closes Tuesdays and Wednesdays, not necessarily the entire park. TPWD provides online and on-site self-pay options.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-colorado-city/alert"
    },
    {
      "question": "Can I use the courtesy dock?",
      "answer": "No. TPWD lists the courtesy dock closed; verify the separate boat ramp independently.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-colorado-city/alert"
    },
    {
      "question": "Can I reserve a pull-through electric campsite?",
      "answer": "TPWD inventories nine such campsites, but actual availability and site dimensions must be checked in its reservation system.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-colorado-city/alert"
    }
  ]
},
  "purtis-creek-state-park": {
  "entryNote": "Only primitive camping area and Beaver Slide Trail close during three short permitted-hunt periods (Oct 23–24, Jan 8–9, Jan 22–23). This is not an entire-park closure.",
  "body": [
    "Purtis Creek State Park in the Athens-area lake country is known for a more relaxed setting around its fishing lake and nature trails. A family camping weekend and an angler's day need different planning: developed campsites near restrooms, fishing and the primitive hike-in trail are separate parts of the park. The lake and shore are not interchangeable with remote primitive camping access.",
    "TPWD's published hunting notice specifically restricts the primitive camping area and Beaver Slide Trail, rather than announcing a full-park closure. Those areas close from 10 p.m. October 23 to noon October 24, 2026, and from 10 p.m. January 8 to noon January 9 and 10 p.m. January 22 to noon January 23, 2027. Only permitted hunters may enter the restricted areas during those dates. Do not cancel a separate developed campground stay without confirming its actual status.",
    "The primitive campsites require a hike of at least about 0.65 mile from the parking area and do not have potable water at the sites. TPWD lists fifty-six developed water-and-electric sites with nearby shower restrooms, which are distinct reservations. Primitive backpackers should bring enough water and check the trail map rather than assume lakeside drive-up facilities.",
    "For an easy first visit, choose a designated fishing access point or a shorter official walk outside the named hunting window. A longer overnight trip should confirm the reserved site, current trail closures, fishing regulations and any temporary fire restrictions. The TPWD notice's explicit partial scope matters more than a generalized phrase such as 'closed for hunting season.'"
  ],
  "visitorFaqs": [
    {
      "question": "Is Purtis Creek closed entirely for the October and January hunts?",
      "answer": "No. TPWD's notice is specifically for the primitive area and Beaver Slide Trail.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/purtis-creek/alert"
    },
    {
      "question": "When do the partial closures take effect?",
      "answer": "The posted windows are October 23–24, 2026 and January 8–9 and 22–23, 2027, from 10 p.m. until noon.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/purtis-creek/alert"
    },
    {
      "question": "Can I drive a vehicle directly to a primitive campsite?",
      "answer": "No. Primitive sites require a hike from parking and have no potable water at the campsite.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/purtis-creek/alert"
    }
  ]
},
  "martin-dies-jr-state-park": {
  "entryNote": "Hen House boat ramp and its 100/200 campsite loops, restrooms and fish-cleaning station are closed for construction. Hen House day-use remains open. Wood and charcoal fires prohibited; propane cooking allowed.",
  "body": [
    "Martin Dies, Jr. State Park straddles a bayou-and-lake landscape in deep East Texas, where the choice of park unit determines the campground, boat ramp and road approach. Hen House Ridge and Walnut Ridge are not a single undifferentiated lakeshore loop. A visitor planning to paddle or camp needs to select the actual unit and current facility rather than navigate only to a generic 'lake' marker.",
    "TPWD's September 18, 2026 notice closes the Hen House boat ramp and expects reopening in spring 2027. The same alert says Hen House's 100 and 200 camping loops, restrooms and fish-cleaning station remain closed for construction through February 2027. The adjacent Hen House day-use area remains open. The exact scope matters: the notice does not say the entire state park is unavailable.",
    "An October 15, 2026 burn ban prohibits wood and charcoal fires but permits containerized cooking fuel stoves such as propane. A visitor with a valid reservation in another open campground must still respect that fire rule. TPWD's campsite categories include full-hookup and electric areas at different locations, and the official inventory includes inconsistent summary totals, so check specific available campsite numbers rather than claim an exact independently reconciled park-wide count.",
    "For a first trip, choose the intended launch or trail and ask park staff for current conditions at that unit before departure. Historic logging-landscape interpretation, wildlife watching and walks can remain worthwhile while a named boat ramp is closed. Never direct campers toward Hen House construction loops or promise an early reopening on the strength of a projected month."
  ],
  "visitorFaqs": [
    {
      "question": "Is the Hen House Ridge boat ramp open?",
      "answer": "No. TPWD lists it closed, with an anticipated spring 2027 reopening rather than a guaranteed date.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/martin-dies-jr/alert"
    },
    {
      "question": "Are all Hen House facilities closed?",
      "answer": "No. The 100 and 200 camping loops, some restrooms and fish-cleaning station are closed, while Hen House day-use remains open.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/martin-dies-jr/alert"
    },
    {
      "question": "Are wood or charcoal campfires permitted?",
      "answer": "No. The October 15 TPWD burn ban prohibits both; contained cooking fuel stoves are allowed.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/martin-dies-jr/alert"
    }
  ]
},
};
export function applySixLaterTPWDAuthorities(destination:Destination):Destination {
 const patch=PARK_AUTHORITY[destination.slug];
 if(!patch || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl??"")) return destination;
 const old=(destination.body??[]).filter(Boolean),combined=old.join(" ");
 return {
  ...destination,
  entryNote:patch.entryNote,
  body:combined.length>1900 ? [...old,...patch.body.filter(x=>!combined.includes(x.slice(0,90)))] : patch.body,
  visitorFaqs:[...(destination.visitorFaqs??[]).filter(q=>!patch.visitorFaqs.some(v=>v.question===q.question)),...patch.visitorFaqs],
  sourceCheckedAt:"2026-10-17"
 };
}
