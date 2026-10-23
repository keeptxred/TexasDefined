import type { Destination, DestinationAuthorityGuide } from "./types";

/**
 * Deepening overlays for established Waco museum canonicals.
 * Retain the reviewed destination slug and existing approved hero; never
 * create a competing duplicate page simply to attach affiliate offers.
 */
const MUSEUM_AUTHORITY: Readonly<Record<string, DestinationAuthorityGuide>> = {
  "dr-pepper-museum-waco": {
    whyItMatters: "The Dr Pepper Museum occupies an actual 1906 bottling plant, making its home building an object of industrial history rather than a themed replacement. Dr Pepper began at Morrison's Old Corner Drug Store in Waco in 1885; this campus connects the soda fountain, industrial production, packaging, marketing and the growth of a local product into a national brand. The museum is an independent nonprofit, not a company-run promotional attraction.",
    assessment: {
      recommendedVisit: "Plan 1–2 hours for the two-building museum and soda fountain; allow longer during busy periods or for a separately booked experience.",
      physicalEffort: "Low to moderate",
      weatherExposure: "Mostly indoors",
      planningLevel: "Low",
      familyFit: "Family-friendly commercial and cultural history with displays, a recreated corner drug store, fountain drink, and optional separately reserved hands-on activities. Ask the museum about sensory and mobility resources.",
      firstTimeValue: "An especially distinctive Waco stop because the industrial building and local Dr Pepper origin story are inseparable.",
    },
    itineraries: [
      { label: "The essential museum visit", duration: "60–90 minutes", steps: [
        "Buy standard museum admission on arrival; online general admission is not sold by the museum.",
        "Tour the original Artesian Manufacturing and Bottling Company galleries and bottling equipment.",
        "Continue into the Kellum-Rotan building and redeem the fountain drink included with paid admission.",
      ] },
      { label: "Hands-on family afternoon", duration: "2–3 hours", steps: [
        "Review the museum's optional experience calendar in advance; programs such as Make-A-Soda are separate from general admission.",
        "Explore the drug-store, manufacturing and advertising exhibits at a family-friendly pace.",
        "Finish with the soda fountain and a short downtown walk, allowing for heat and queues.",
      ] },
      { label: "Waco business-and-river history", duration: "Half to full day", steps: [
        "Start at the Dr Pepper Museum's 1906 bottling plant and learn how the beverage grew from a Waco drug store.",
        "Walk to Magnolia Market at the Silos for a modern Waco commerce comparison.",
        "Add the historic Waco Suspension Bridge and consider the Texas Ranger Hall of Fame for a different chapter of city history.",
      ] },
    ],
    sources: [
      { label: "Dr Pepper Museum — visitor admission, hours and campus", url: "https://drpeppermuseum.com/plan-your-visit/", scope: "Tickets, included fountain drink, parking, exhibits, accessibility and admission policies" },
      { label: "Dr Pepper Museum — foundation and collection history", url: "https://drpeppermuseum.com/history/history-of-dr-pepper-museum/", scope: "Museum opening in 1991, nonprofit stewardship and 1906 building" },
      { label: "Dr Pepper Museum — drink origin history", url: "https://drpeppermuseum.com/history/", scope: "1885 origin at Morrison's Old Corner Drug Store and early commercial growth" },
      { label: "Dr Pepper Museum — architecture and mission", url: "https://drpeppermuseum.com/about/", scope: "Architect Milton Scott, independence from Keurig Dr Pepper and soft-drink-industry interpretation" },
    ],
  },
  "texas-ranger-hall-of-fame-museum-waco": {
    whyItMatters: "Waco's Texas Ranger Hall of Fame and Museum is a state-authorized public historical center, not just a Texas-themed Western collection. Its artifacts, research library and official Hall of Fame reveal how Ranger service, public memory and changing law-enforcement practices have intersected across generations. The building opened in 1968, with the official Hall of Fame added in 1976.",
    assessment: {
      recommendedVisit: "Allow two hours for the museum galleries and Hall of Fame. Research appointments use separate weekday hours and may require much longer.",
      physicalEffort: "Low to moderate",
      weatherExposure: "Mostly indoors",
      planningLevel: "Low",
      familyFit: "Best for families interested in Texas history, archival objects and the American West; firearms and sometimes difficult historical topics are part of the interpretation.",
      firstTimeValue: "A substantive history-focused counterpart to Magnolia and the Dr Pepper Museum, especially for visitors interested in Texas institutions rather than only shopping.",
    },
    itineraries: [
      { label: "Core museum and Hall of Fame", duration: "2 hours", steps: [
        "Arrive during regular museum hours and use the museum's free parking, checking Baylor-event changes.",
        "Begin with the artifacts and galleries; distinguish historical exhibits from later popular-culture depictions.",
        "Allow time for the official Hall of Fame and any rotating displays.",
      ] },
      { label: "Archival research visit", duration: "Half day or longer", steps: [
        "Review the research center's holdings and service rules before traveling.",
        "Call ahead for weekday staff appointments; research hours and service fees differ from the museum's general admission.",
        "Combine a scheduled archive session with public galleries only if both are available.",
      ] },
      { label: "Waco's three museum stories", duration: "Full day", steps: [
        "Start at the Texas Ranger Hall of Fame and Museum near the Brazos River.",
        "Visit the nearby Mayborn Museum or Texas Sports Hall of Fame depending on your interests.",
        "Move downtown to the Dr Pepper Museum, then walk the Suspension Bridge if the weather cooperates.",
      ] },
    ],
    sources: [
      { label: "Texas Ranger Hall of Fame & Museum — Plan Your Visit", url: "https://www.texasranger.org/Visit", scope: "Hours, admissions, closures, group bookings, research center and free parking" },
      { label: "Museum — Research Center", url: "https://www.texasranger.org/Pages/Research-Center", scope: "Archives, collection scope, research appointments and staff services" },
      { label: "Museum — Artifact Stewardship", url: "https://www.texasranger.org/Get-Involved/Artifact-Stewardship", scope: "Object and archive collection categories, stewardship standards" },
      { label: "Museum — Exhibits and news", url: "https://www.texasranger.org/Home", scope: "Current and rotating gallery exhibits, official programming" },
    ],
  },
};

const MUSEUM_VISITOR_UPGRADES: Readonly<Record<string, Partial<Destination>>> = {
  "dr-pepper-museum-waco": {
    entryNote: "Open daily 10 a.m.–5:30 p.m. with last general ticket sold at 4:30 p.m., subject to holiday or special-event changes. The nonprofit museum sells general admission at the gate, not online; paid general admission includes self-guided exhibits across two buildings and a 12-ounce fountain drink. Make-A-Soda and other special experiences require separate booking and payment. The gift shop and fountain are inside the paid-access campus; re-entry is not permitted after leaving. Public parking nearby is paid and general-admission payment is cashless.",
    directions: "Find the historic main building at 300 S. 5th Street and Mary Avenue in downtown Waco. Public parking across Fifth Street is paid; street spaces and other downtown lots may also be available. Magnolia Market at the Silos is walkable, subject to the weather.",
    accessibilityNotes: "The museum publishes resources for sensory, mobility and other accessibility needs. The main building contains multiple levels of exhibits, and the two-building campus may require moving between outdoor areas. Consult the museum's current accessibility guide or contact its staff about elevators, sensory aids and particular needs before arrival.",
    highlights: ["Historic 1906 working-bottling-plant architecture", "1885 Waco soda-fountain origin", "Three floors of industrial and cultural exhibits", "Kellum-Rotan soda fountain and KDP Liquid Lab", "Separate Make-A-Soda experiences", "Independently governed nonprofit history museum"],
    body: [
      "Dr Pepper's story began in 1885, when pharmacist Charles Alderton experimented with fountain flavors at Morrison's Old Corner Drug Store in Waco. The successful drink moved beyond pharmacy-counter service through the efforts of Morrison and beverage chemist Robert S. Lazenby. Their Artesian Manufacturing and Bottling Company helped turn a local beverage into a marketable product. In 1906 architect Milton Scott designed the manufacturing building that later became the museum's centerpiece.",
      "The main museum is not a newly built simulation of a factory. Visitors enter the former Artesian Manufacturing and Bottling Company building, where three exhibit floors document equipment, production, transportation, advertising, entrepreneurship and the wider American soft-drink industry. The structure is listed on the National Register of Historic Places; the building's manufacturing rooms and architectural details are themselves part of the collection. Active bottling ended here decades ago, so displayed bottling machinery is interpretive, not a modern production tour.",
      "The second museum building, the Kellum-Rotan building, houses the soda fountain, KDP Liquid Lab and additional interpretation. General admission includes a fountain beverage for eligible paid ticket holders. Some Liquid Lab presentations may be part of a visit, but personalized Make-A-Soda and other advertised experiences are separate reservations. A Viator listing for nearby Waco tours should never be confused with a ticket to the museum or these add-ons.",
      "The museum opened in 1991 after restoration efforts revived the neglected bottling plant, eventually reopening all floors. Its stewardship and educational mission extend beyond Dr Pepper alone to the history of carbonated drinks, packaging, advertising and free enterprise. It is a nonprofit institution separate from Keurig Dr Pepper, although the company supports its work. This makes it valuable as both a brand-history destination and a broader American business-history museum.",
      "Visitors should budget time carefully. The museum itself recommends one to two hours to experience the exhibits, gift shop and fountain; busy afternoons can require more. Standard tickets are sold on arrival and re-entry is not allowed after exiting. General admission does not pay for parking or optional hands-on experiences. The main gate leads into a paid-access campus, so don't plan to duck into the soda fountain without buying admission.",
      "For a practical Waco day, combine the museum with Magnolia Market at the Silos or another downtown meal; move toward the Waco Suspension Bridge, the Brazos River and the Texas Ranger Hall of Fame for historic variety. The outdoor components can be strenuous in hot weather even though the museum itself is mainly indoors.",
    ],
    visitorFaqs: [
      { question: "Can I buy general-admission tickets online?", answer: "No. According to the museum, standard general-admission tickets are purchased in person on arrival. Special paid programs may be reserved separately online.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
      { question: "Is a Dr Pepper included?", answer: "Yes, qualifying paid general admission includes a 12-ounce soda-fountain drink. Complimentary, library-pass and other free admissions do not necessarily include that drink.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
      { question: "Can I use the gift shop or soda fountain without museum admission?", answer: "No. The museum says both are within the ticketed campus, so visitors need general admission.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
      { question: "Will I see Dr Pepper bottled today?", answer: "No active beverage production takes place in the historic building. The equipment and bottling displays interpret the company's earlier manufacturing era.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
      { question: "Is the museum operated by Keurig Dr Pepper?", answer: "No. The Dr Pepper Museum is an independent nonprofit history institution supported, but not owned or run, by Keurig Dr Pepper.", sourceUrl: "https://drpeppermuseum.com/about/" },
      { question: "Do I have to book a tour?", answer: "General museum exhibits are self-guided; separate programs such as Make-A-Soda may require advance reservations and additional payment.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
      { question: "Can I leave the museum and return using the same ticket?", answer: "No. The museum currently does not permit re-entry once visitors leave the museum campus.", sourceUrl: "https://drpeppermuseum.com/plan-your-visit/" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
  "texas-ranger-hall-of-fame-museum-waco": {
    entryNote: "The museum is normally open daily 9 a.m.–5 p.m. with last admission at 4:30 p.m. and closes on several major holidays. The operator recommends a two-hour visit; parking is free, though Baylor football events can affect access. Groups of 10 or more require reservations. The research center has separate Monday–Friday 9 a.m.–4 p.m. hours, with appointments recommended.",
    directions: "Follow museum signs to 100 Texas Ranger Trail near Interstate 35 and the Brazos River by Baylor University. Free museum parking is provided, but allow extra time when Baylor has a home game or another large event.",
    accessibilityNotes: "Ask the museum about current mobility access, accessible parking, seating, sensory considerations and assisted visits before traveling. Research-library access may be different from the public galleries.",
    highlights: ["State-authorized Texas Ranger historical center", "Museum founded 1968 and Hall of Fame dedicated 1976", "Art, historic firearms, badges and photographs", "Independent archival research center", "Research and interpretation across multiple centuries", "Free regular visitor parking"],
    body: [
      "The Texas Ranger Hall of Fame and Museum is a state-authorized historical center operated by the City of Waco. It began in 1968 from collaboration between the State of Texas, the city and private supporters; the Hall of Fame was added for the Rangers' 150th-anniversary commemoration in 1976. The museum investigates the history of one of the best-known law-enforcement organizations in the American West while also documenting the evolution of the public mythology surrounding it.",
      "Its holdings are more diverse than a display of famous badges and guns. The institution's stewardship catalog covers archival records, photographs, fine art, personal equipment, weapons, books, commemorative objects and popular-culture material. Exhibits can illuminate changing Ranger duties, individuals and public perceptions, including contested episodes of border and law-enforcement history. Visitors should distinguish what contemporary records document from later folklore and entertainment portrayals.",
      "The official Hall of Fame is one part of the larger complex and commemorates individual Rangers; the public galleries provide broader chronological and thematic context. Special and temporary exhibits change. The museum's online calendar and official announcements, rather than a static third-party tour listing, are the most reliable sources for current exhibit offerings.",
      "The Tobin and Anne Armstrong Texas Ranger Research Center turns the museum into a genuine historical research resource. It preserves service records, photographs, correspondence and related holdings, some going back to the 1830s. Researchers seeking genealogy, Ranger employment histories or object identification should check access policies and arrange a weekday appointment in advance. Staff expressly do not appraise or authenticate badges or firearms.",
      "It is worth remembering that the complex's frontier-looking architecture does not mark the exact 1837 Fort Fisher. The museum explains that the original frontier post's location is unknown and the current Fort Fisher Park location was selected near the interstate for visitor convenience. Treat the fort-like building as interpretive architecture, not as an intact nineteenth-century fort.",
      "For most visitors, a two-hour visit balances the Hall of Fame and broader museum galleries. The standard museum admission, hours and free parking are separate from the research center's weekday staffing. The neighborhood also offers Baylor's Mayborn Museum, the Texas Sports Hall of Fame and the Brazos River. Those pairings make a Waco museum day more varied than an isolated Ranger stop.",
    ],
    visitorFaqs: [
      { question: "How long should I spend here?", answer: "The museum recommends approximately two hours for its permanent and rotating public exhibits.", sourceUrl: "https://www.texasranger.org/Visit" },
      { question: "Is parking free?", answer: "The museum lists free parking, subject to potential disruption during Baylor football dates and nearby events.", sourceUrl: "https://www.texasranger.org/Visit" },
      { question: "Do I need reservations for ordinary museum admission?", answer: "Individual general visits ordinarily do not require a group booking. Groups of ten or more are asked to reserve in advance.", sourceUrl: "https://www.texasranger.org/Visit" },
      { question: "Can I do genealogy or archival research there?", answer: "Yes. The separate research center holds records, photographs and correspondence. Contact staff for a weekday appointment before relying on same-day research access.", sourceUrl: "https://www.texasranger.org/Pages/Research-Center" },
      { question: "Will staff authenticate an old badge or firearm?", answer: "No. The research center says staff can assist with identification and research direction but do not appraise or authenticate badges or firearms.", sourceUrl: "https://www.texasranger.org/Pages/Research-Center" },
      { question: "Is the museum the original Fort Fisher?", answer: "No. The museum states that the 1837 Fort Fisher post's location is not known and that today's fort-themed museum campus is a later interpretation.", sourceUrl: "https://www.texasranger.org/Visit" },
      { question: "Is the Hall of Fame separate from the museum?", answer: "It is part of the wider museum complex, which also includes collections, permanent and temporary exhibits and research facilities.", sourceUrl: "https://www.texasranger.org/Visit" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
};

export function applyWacoMuseumAuthority(destination: Destination): Destination {
  const enhanced = MUSEUM_VISITOR_UPGRADES[destination.slug];
  const authorityGuide = MUSEUM_AUTHORITY[destination.slug];
  if (!enhanced || !authorityGuide) return destination;
  return { ...destination, ...enhanced, authorityGuide };
}
