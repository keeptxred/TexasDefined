/** Museum-specific FAQs: discovered from operator FAQ, visitor Q&A and independent visitor-intent research.
 * 'editorial-research' is NOT evidence of measured search frequency. Verify the factual answer
 * from the operator's current source and re-review volatile details before publishing.
 * A museum collection catalog is not an FAQ requirement.
 */
export type MuseumFaqQuestionOrigin = "museum-faq" | "visitor-qna" | "editorial-research";
export interface MuseumVisitorFaq {
  question: string;
  answer: string;
  verificationUrl: string;
  questionOrigin: MuseumFaqQuestionOrigin;
  questionEvidenceUrl: string;
  reviewCycle: "monthly" | "quarterly";
  reviewed: string;
}
export const museumVisitorFaqs: Record<string, MuseumVisitorFaq[]> = {
  "texas-country-music-hall-of-fame-carthage": [
    {
        "question": "When is the Texas Country Music Hall of Fame museum open?",
        "answer": "The Carthage museum posts ordinary gallery hours Monday through Saturday, 10 a.m. to 4 p.m. The yearly induction-weekend schedule has distinct extended and special-event times; check the current museum page or call 903-694-9561 before a holiday visit.",
        "verificationUrl": "https://www.tcmhof.com/museum",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/museum",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "How much does admission to the Carthage museum cost?",
        "answer": "The museum advertises $10 adult admission and $5 child admission. Its published price notice does not specify the child age bracket, so families should ask staff rather than assume a different age cutoff. Special concert tickets are priced separately.",
        "verificationUrl": "https://www.tcmhof.com/contact",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/contact",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Is the Texas Country Music Hall of Fame in Nashville?",
        "answer": "No. This Texas Country Music Hall of Fame and Tex Ritter Museum is at 310 West Panola Street in Carthage, Panola County. The Nashville Country Music Hall of Fame and Museum is a separate institution with its own collections, admission and exhibitions.",
        "verificationUrl": "https://www.tcmhof.com/contact",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/contact",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "What can visitors learn about Tex Ritter in the museum?",
        "answer": "The Carthage museum started as the Tex Ritter Museum and documents the Panola County-born singer and actor's Western film, recording, radio and television work. Read the relevant exhibits as the story of an influential singing cowboy rather than a complete archive of his films.",
        "verificationUrl": "https://www.tcmhof.com/museum",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/museum",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Does the Texas Country Music Hall of Fame have a Jim Reeves exhibit?",
        "answer": "Yes. The museum operator says it expanded its exhibits in 2004 to feature Jim Reeves, including radio equipment from his Henderson station KGRI. Verify which original objects are available on the day rather than promising every photographed piece.",
        "verificationUrl": "https://www.tcmhof.com/museum",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/museum",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Are Hall of Fame induction concerts included in museum admission?",
        "answer": "No. The museum and gift-shop visit should not be confused with the Texas Country Music Hall of Fame weekend concerts and the John Ritter Tribute Showcase at the Carthage Civic Center. Those event schedules and ticket prices are announced separately and can vary by year.",
        "verificationUrl": "https://www.tcmhof.com/schedule",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/schedule",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "What is the John Ritter Tribute Showcase?",
        "answer": "The John Ritter Tribute Showcase is an annual performance competition connected with the Hall of Fame festival and named for Tex Ritter's actor son. Its finalists and location are event-specific, not a permanent daily museum performance.",
        "verificationUrl": "https://www.tcmhof.com/schedule",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/schedule",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Is this an accessible museum for wheelchair users?",
        "answer": "Its official visitor pages do not provide enough specifics to confirm the route through each gallery, restroom access or sensory accommodations. Contact the Carthage museum at 903-694-9561 to confirm individual needs before traveling; Civic Center event seating is separate.",
        "verificationUrl": "https://www.tcmhof.com/contact",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tcmhof.com/contact",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "How did the Carthage museum and Hall of Fame originate?",
        "answer": "The local Tex Ritter Museum arose in the early 1990s, and the statewide Hall of Fame initiative followed in 1998. The present facility opened in 2002. The Texas State Historical Association documents the expansion, which explains why the Ritter collection and newer honorees share a museum.",
        "verificationUrl": "https://www.tshaonline.org/handbook/entries/texas-country-music-hall-of-fame-and-tex-ritter-museum",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.tshaonline.org/handbook/entries/texas-country-music-hall-of-fame-and-tex-ritter-museum",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    }
],
  "bryan-museum-galveston": [
    {
        "question": "What are The Bryan Museum's hours in October and winter?",
        "answer": "For September through February, The Bryan Museum in Galveston publishes Wednesday–Sunday hours of 10 a.m. to 5 p.m. and closes on Mondays and Tuesdays. Its spring/summer pattern is different, so verify the season's operator calendar and holiday closures before traveling.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "How much does admission to The Bryan Museum cost?",
        "answer": "The operator's visitor information currently lists adults $15, seniors 65 and older, teachers and military $14, students $12, children ages 6–12 $7, and free entry for children under six and museum members. Check checkout prices and any special exhibit terms before payment.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Are Bryan Museum tickets refundable and do I need to book ahead?",
        "answer": "The official museum tickets page states that advance online reservations are strongly encouraged, online admission tickets remain valid for one year after purchase, and admission sales are nonrefundable. It does not establish a mandatory timed reservation for all regular visitors.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Was The Bryan Museum originally the Galveston Orphans Home?",
        "answer": "Yes. The museum occupies the restored 1895 Galveston Orphans Home. The Bryan Educational Institute acquired the structure in 2013, and the institution opened its galleries to the public in 2015. Historic-building interpretation is distinct from the Texana objects on display.",
        "verificationUrl": "https://thebryanmuseum.org/about-us/bryan-educational-institute",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/about-us/bryan-educational-institute",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "What galleries are permanent at The Bryan Museum?",
        "answer": "Its official exhibition directory lists an Orientation Gallery, Spanish Colonial Gallery, Texas Frontier Gallery, Statehood and Beyond Gallery, Texas Master Gallery, Rest of the West Gallery and Galveston Orphans Home Gallery, plus a rotating special-exhibition space.",
        "verificationUrl": "https://thebryanmuseum.org/exhibitions",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/exhibitions",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Can I join a guided Galveston Orphans Home building tour?",
        "answer": "The operator advertises a separately bookable 90-minute tour covering the former Orphans Home's interior, exterior and related exhibit. Groups are limited to 20, and it includes general museum admission. Do not assume a standard walk-up museum ticket includes that guided program.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Can families and school groups arrange educational visits?",
        "answer": "The museum offers guided field-trip programs built around four history galleries and age-appropriate learning activities, sometimes with an art, garden or artifact component. Teachers should arrange group participation in advance rather than treat regular admission as an automatically scheduled tour.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Is every gallery at The Bryan Museum wheelchair accessible?",
        "answer": "The museum publishes an ADA provision for venue rentals but not a complete visitor route for every gallery in the historic building. Travelers should phone 409-632-7685 for step-free entrances, available lifts, restrooms and other accommodation specifics before buying tickets.",
        "verificationUrl": "https://thebryanmuseum.org/venue-rental/museum-guidelines",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/venue-rental/museum-guidelines",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "Does the general ticket include special exhibitions and museum grounds?",
        "answer": "The Bryan Museum states that ordinary admission includes permanent galleries, special exhibitions when open, and museum grounds. A specially booked historic Orphans Home tour or Great Storm film package has its own arrangements and should not be assumed part of basic admission.",
        "verificationUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/plan-your-visit/tickets",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-18"
    },
    {
        "question": "How extensive is The Bryan Museum's collection?",
        "answer": "The museum reports approximately 70,000 artifacts and documents spanning some 12,000 years, including about 20,000 rare books and more than 30,000 historical documents. This is the scope of the overall collection, not a promise that every object is displayed in galleries.",
        "verificationUrl": "https://thebryanmuseum.org/exhibitions",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://thebryanmuseum.org/exhibitions",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-18"
    }
],
  "east-texas-oil-museum-kilgore": [
    {
        "question": "What are the East Texas Oil Museum's opening hours and final admission?",
        "answer": "The Kilgore College museum's official visitor page lists Monday–Saturday, 9 a.m.–5 p.m., with last admissions at 4 p.m. It ordinarily closes on Sunday. The operator posts individual 2026 holiday exceptions, so check its visit calendar before setting out.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "How much are adult and child tickets, and can they be bought online?",
        "answer": "As published by the museum, adult admission is $10 and children ages 3–11 pay $7; ages two and younger enter free. Seniors and military visitors receive a ten percent discount, while Kilgore College students and employees are free. Regular admission is sold at the museum, not through an online ticket shop.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "Where can I park when visiting the East Texas Oil Museum?",
        "answer": "The museum is on the Kilgore College campus at 1301 South Henderson Boulevard in Kilgore. The operator directs visitor parking to Ross Avenue behind the museum. Check the operator's directions if navigating the campus during a busy event.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "Is the East Texas Oil Museum wheelchair accessible?",
        "answer": "The museum says its facility is ADA accessible, with a limited number of loan wheelchairs available free from the gift shop in exchange for a photo ID. Service animals on a harness or leash are permitted. Confirm access to any specific sound-effect or simulated exhibit with staff before visiting.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "What is Boomtown USA at the East Texas Oil Museum?",
        "answer": "Boomtown USA is a full-scale indoor reconstruction of a 1930s oil-boom town. The museum describes a general store, drugstore, vintage car exhibits, period streets and the Boomtown Theater. These are historically interpreted reconstructions, not original preserved businesses from 1930.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/welcome/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/welcome/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "Does the East Texas Oil Museum have an actual underground elevator ride?",
        "answer": "The museum advertises an Elevator Ride to the Center of the Earth with Professor Rockbottom that simulates a descent beneath East Texas to interpret geology and oil deposits. It is an exhibit, not a physical 3,800-foot mine trip. Ask staff about current operations or motion and sound sensitivities.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/welcome/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/welcome/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "Can visitors take photographs for a commercial website or news publication?",
        "answer": "Personal photographs are allowed except photographs on display and inside the Boomtown Theater. The museum requires media, public-relations and commercial photography requests to be submitted and scheduled through the museum director. This is separate from reusing a specifically licensed Wikimedia Commons photograph of the building exterior.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "How much time should families allow for this museum?",
        "answer": "The museum itself suggests allowing at least one and a half hours. Families exploring Boomtown's shops, simulated blowout, historical vehicles and audiovisual displays may prefer a longer visit. Last entry is at 4 p.m., so arriving late risks missing the full experience.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/visit/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-17"
    },
    {
        "question": "Can a teacher or group organize an educational museum visit?",
        "answer": "Yes. The East Texas Oil Museum promotes group tours by advance request. A regular museum ticket is not the same as a confirmed docent-led educational visit; use its official group-tour form or call its listed museum contact number before transporting a class or large group.",
        "verificationUrl": "https://easttexasoilmuseum.kilgore.edu/contact/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://easttexasoilmuseum.kilgore.edu/contact/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-17"
    }
],
  "uss-lexington-museum-corpus-christi": [
    {
        "question": "Can visitors buy ordinary USS Lexington admission tickets online?",
        "answer": "No. The museum currently sells normal general admission only at the admission booths when visitors arrive. Online purchase options advertised on the site are for certain special events and booked activities, not everyday entry. Current adult general admission is $25; confirm age discounts and payment surcharges with the operator.",
        "verificationUrl": "https://usslexington.com/visit/hours-admission/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/visit/hours-admission/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "What are USS Lexington Museum's normal opening hours and holidays?",
        "answer": "The operator advertises 9 a.m.–5 p.m. during its Labor Day-to-Memorial Day season and 9 a.m.–6 p.m. in the summer, seven days a week. It closes on Thanksgiving and Christmas. Check changes caused by special programming before driving to North Beach.",
        "verificationUrl": "https://usslexington.com/visit/hours-admission/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/visit/hours-admission/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can a wheelchair user reach USS Lexington's flight deck?",
        "answer": "Yes, the operator specifically identifies the hangar deck and flight deck as wheelchair accessible, with the LEX LIFT elevator providing a route upward. This does not mean every original ladder, tight sailor compartment or lower machinery deck is step-free; request precise access guidance for additional routes.",
        "verificationUrl": "https://usslexington.com/visit/hours-admission/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/attractions/the-flight-deck/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Is there food for sale aboard the USS Lexington Museum?",
        "answer": "Yes. The Mess Deck Café at the rear of the accessible hangar deck advertises snacks, sandwiches and a full lunch menu, with posted hours of 10 a.m.–4 p.m. daily. Museum admission is required to reach the café, and the operator prohibits outside food and beverages.",
        "verificationUrl": "https://usslexington.com/visit/mess-deck-cafe/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/visit/mess-deck-cafe/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "How many self-guided tours can visitors choose aboard USS Lexington?",
        "answer": "The museum publishes five independent self-guided routes that reach multiple levels and interpret shipboard operations. They can be completed selectively rather than as a single continuous mandatory tour. Many original stairs are steep; choose fewer routes when walking capacity or time is limited.",
        "verificationUrl": "https://usslexington.com/tours/self-guided-tours/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/tours/self-guided-tours/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Is the USS Lexington flight deck exposed to outdoor heat and weather?",
        "answer": "Yes. It is a real open carrier flight deck on Corpus Christi Bay. Temperatures, sun exposure and wind can make the outdoor portion more demanding than the indoor hangar-deck exhibits. Plan a morning outdoor visit in hot weather and use indoor spaces for breaks; verify current deck access during weather events.",
        "verificationUrl": "https://usslexington.com/attractions/the-flight-deck/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/attractions/the-flight-deck/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Is the 3D MEGA Theater included with general admission?",
        "answer": "The museum's official attraction listing describes the 3D MEGA Theater as included with general admission. Its separate flight simulator and special events should not be assumed included without operator confirmation; showtimes and individual attractions may change.",
        "verificationUrl": "https://usslexington.com/attractions/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/attractions/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Is USS Lexington a battleship, and is it the carrier lost at Coral Sea?",
        "answer": "Neither. The ship open in Corpus Christi is USS Lexington CV-16, an Essex-class aircraft carrier commissioned in 1943. The earlier USS Lexington CV-2 was lost at Coral Sea in 1942; Battleship Texas BB-35 is a different type of ship preserved in Galveston. This distinction matters when comparing exhibits, warfare and ship histories.",
        "verificationUrl": "https://usslexington.com/about-the-uss-lexington/the-ship/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/about-the-uss-lexington/the-ship/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Where is the USS Lexington and how much is parking?",
        "answer": "The carrier is moored on North Beach at 2914 North Shoreline Boulevard, Corpus Christi, TX 78402, near the Texas State Aquarium. The museum currently lists all-day visitor parking at $5, with parking free for members. Check the North Beach access route before setting out.",
        "verificationUrl": "https://usslexington.com/visit/directions-map-how-to-get-to-lex/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/visit/directions-map-how-to-get-to-lex/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can schools, scout troops or youth groups reserve a visit?",
        "answer": "The museum runs education experiences for schools and other organized youth groups; inquiries are not final reservations. Its education office advises allowing two to three business days for a reply and waiting for the written booking confirmation. Guided specialty tours may impose minimum ages and reservation deadlines.",
        "verificationUrl": "https://usslexington.com/learn/education/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/learn/education/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can I bring pets or food aboard USS Lexington?",
        "answer": "The operator currently prohibits outside food and beverages and does not admit pets apart from service animals. Plan to use the on-board Mess Deck Café or eat elsewhere before boarding, and arrange pet care separately.",
        "verificationUrl": "https://usslexington.com/visit/hours-admission/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://usslexington.com/visit/hours-admission/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    }
],
  "sixth-floor-museum-at-dealey-plaza": [
    {
        "question": "When is The Sixth Floor Museum open and is entry timed?",
        "answer": "The operator currently schedules entry Wednesday through Sunday from 10 a.m. to 5 p.m., with last ticket sales and entry at 4:15 p.m. It is closed on Mondays and Tuesdays. Museum admission uses timed entry, so book a specific date and time ahead rather than assuming walk-up tickets will be immediately available.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "questionOrigin": "museum-faq",
        "questionEvidenceUrl": "https://www.jfk.org/faq/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "How much does admission cost online versus at the museum?",
        "answer": "The museum's published rates currently list adult online tickets at $24 with a $1 convenience fee per ticket, compared with $27 purchased onsite. Senior and youth price bands differ, and ages five and younger are free. Check the operator's live ticket page immediately before payment because prices and discounts can change.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Is the museum accessible by DART or the TRE train?",
        "answer": "Yes. The museum is at 411 Elm Street, about three blocks west of DART's West End Station and five blocks north of Union Station, which connects to the Trinity Railway Express. This can be easier than parking when combining several downtown museums.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/",
        "questionOrigin": "museum-faq",
        "questionEvidenceUrl": "https://www.jfk.org/faq/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Where can wheelchair users enter and are mobility devices available?",
        "answer": "The museum identifies a wheelchair-accessible entrance ramp at the northwest building corner, step-free access to its public levels and complimentary loan wheelchairs at the Visitors Center on a first-come basis. Designated accessible spaces are in the adjacent paid lot. Contact the museum for needs beyond these published accommodations.",
        "verificationUrl": "https://www.jfk.org/accessibility/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/accessibility/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can visitors with sensory sensitivities borrow support equipment?",
        "answer": "The operator provides KultureCity sensory bags to check out in the Visitors Center. The permanent exhibitions also address assassination violence, investigation and historical trauma through photography and media. Ask the museum about specific exhibits or suitable quieter visit periods rather than presuming every gallery's sound or lighting level.",
        "verificationUrl": "https://www.jfk.org/accessibility/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/accessibility/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Are there food options inside the museum galleries?",
        "answer": "No. Museum visitation guidelines prohibit food and drink inside the galleries. The operator provides a walking-distance area-dining directory but does not advertise a full-service restaurant within the historical exhibition. Arrange a meal outside the galleries in the nearby West End.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/plan-your-visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "How do school groups book an educational museum visit?",
        "answer": "The museum's current visitor page describes limited instructional tours, requiring a qualifying K–12 or college class with at least 20 students and a request at least three weeks ahead. Extracurricular groups and sports teams do not automatically qualify. Its older school-year announcement ended August 31, 2026, so organizers must obtain confirmation of current school-year availability directly from education staff.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/plan-your-visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can a regular tourist group arrange a traditional guided tour?",
        "answer": "The museum's visitor information currently says it cannot accommodate traditional group visits. A separately arranged private curatorial orientation requires a substantial donation, can cover up to 50 attendees and does not include museum admission. Small parties can instead book individual timed museum admission subject to capacity.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/plan-your-visit/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "What exactly is exhibited in the historic sixth-floor windows?",
        "answer": "The core exhibition includes a recreated evidentiary corner-window area based on historical crime-scene photographs and interactive interpretation overlooking Dealey Plaza. It also covers the 1960s background, Texas trip, crisis hours, investigations and Kennedy's memory. A reconstruction should not be described as an untouched historic room.",
        "verificationUrl": "https://www.jfk.org/exhibition/john-f-kennedy-and-the-memory-of-a-nation/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/exhibition/john-f-kennedy-and-the-memory-of-a-nation/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Can I bring large bags or rolling luggage into the galleries?",
        "answer": "The museum requires rolling luggage and items larger than 14 by 22 by 9 inches to be checked at the front desk for a $5 per-item fee, payable by credit card. All checked property must be retrieved before departure. Travel light when arriving directly from the airport or rail station.",
        "verificationUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "questionOrigin": "editorial-research",
        "questionEvidenceUrl": "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
        "reviewCycle": "monthly",
        "reviewed": "2026-10-14"
    },
    {
        "question": "Who operates The Sixth Floor Museum at Dealey Plaza?",
        "answer": "The museum is an independent nonprofit operated by the Dallas County Historical Foundation; it is not a National Park Service site. The building itself and its views over Dealey Plaza are essential to the historical interpretation, while the foundation curates exhibitions and collects oral history and archives.",
        "verificationUrl": "https://www.jfk.org/faq/",
        "questionOrigin": "museum-faq",
        "questionEvidenceUrl": "https://www.jfk.org/faq/",
        "reviewCycle": "quarterly",
        "reviewed": "2026-10-14"
    }
],
  "the-history-center-diboll": [
    {
      "question": "Is The History Center in Diboll free to visit?",
      "answer": "Yes. The operator explicitly states admission to the history center and its public exhibits is free. The visitor page also describes free guided tours, but these require advance arrangements; bring the current schedule rather than relying on an old directory listing.",
      "verificationUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is The History Center open on Saturdays?",
      "answer": "The current operator lists Monday through Friday 8 a.m. to 5 p.m. as ordinary public hours. Saturdays are available by appointment with at least two weeks' advance notice, not as an ordinary drop-in period; the center is closed for most major holidays.",
      "verificationUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can children actually climb aboard the steam locomotive at Diboll?",
      "answer": "Yes, the operator describes its 1920 Baldwin Engine 13 and 1948 caboose as accessible stationary railroad exhibits and invites supervised visitors to climb aboard, ring the bell or blow the whistle when the display is available. It is not a working excursion train.",
      "verificationUrl": "https://www.thehistorycenteronline.com/exhibits/outdoor-railroad-exhibit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/exhibits",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does The History Center offer a working train ride?",
      "answer": "No scheduled moving-train excursion is advertised. The locomotive and caboose are restored stationary exhibits used to explain the timber and railroad economy; visitors can explore the preserved equipment rather than buy a railroad passenger ticket.",
      "verificationUrl": "https://www.thehistorycenteronline.com/exhibits/outdoor-railroad-exhibit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What will I see inside the Diboll History Center?",
      "answer": "Its Diboll: An Enduring Community exhibition has 11 panels and more than 100 photographs, interpreting the town's growth and its lumber, railroad and social history. Rotating exhibits may feature other regional history topics, and the extensive archives remain a separate research resource.",
      "verificationUrl": "https://www.thehistorycenteronline.com/exhibits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/exhibits",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long do guided tours take and how early must I book?",
      "answer": "The center says free staff-led guided tours usually take 50 to 60 minutes and should be arranged at least two weeks beforehand. Visitors can ask for an age-appropriate school group tour or a specialized research orientation; call the center to confirm availability.",
      "verificationUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the 1920 engine accessible for visitors using wheelchairs?",
      "answer": "The operator describes its outdoor railroad exhibit as fully accessible and invites visitors to interact with the preserved locomotive and caboose. For a particular wheelchair, walker, stroller or sensory accommodation, verify the exact route with the center ahead of arrival.",
      "verificationUrl": "https://www.thehistorycenteronline.com/exhibits/outdoor-railroad-exhibit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the history center have a full-service restaurant or cafeteria?",
      "answer": "The operator's current visitor guide discusses exhibits, research, gift items and the free tour experience but does not document an on-site cafeteria or full-service restaurant. Plan meals in Diboll or nearby Lufkin instead of assuming food service inside the archives.",
      "verificationUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thehistorycenteronline.com/plan-your-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "texas-broadcast-museum-kilgore": [
    {
      "question": "When can I visit the Texas Broadcast Museum in Kilgore?",
      "answer": "The City of Kilgore and Texas Association of Broadcasters list regular museum hours Friday and Saturday from 10 a.m. to 5 p.m., with group appointments on other days. Because this specialty museum has limited hours, confirm directly before a long drive.",
      "verificationUrl": "https://cityofkilgore.com/293/Kilgore-Cultural-District",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tabshow.org/texas-broadcast-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What does admission to the Texas Broadcast Museum cost?",
      "answer": "A Texas Association of Broadcasters profile lists $10 adults, $8 seniors, students, military and first responders, $5 ages three to eleven and free under age three. Older directories still show lower prices, so treat the current operator's reply as the final price before buying.",
      "verificationUrl": "https://texasbroadcastmuseum.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tabshow.org/texas-broadcast-museum/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I see one of ESPN’s original remote broadcasting trucks?",
      "answer": "Yes. The museum says original ESPN mobile unit 327 has been preserved and is available for public viewing inside the building. It shows how early sports television was produced away from a studio; contact the operator in advance if viewing that exhibit is essential to your trip.",
      "verificationUrl": "https://texasbroadcastmuseum.com/espn-mobile-unit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/espn-mobile-unit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a camera connected with the killing of Lee Harvey Oswald on display?",
      "answer": "The operator lists a broadcast camera associated with the live television coverage of Jack Ruby shooting Lee Harvey Oswald in 1963. It is a serious historical journalism artifact; explain the recording context appropriately for children rather than marketing it as entertainment.",
      "verificationUrl": "https://texasbroadcastmuseum.com/museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/museum/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors try being television news anchors or radio DJs?",
      "answer": "The operator describes functioning radio and TV studio displays where guests can role-play a news anchor, weather reporter or disc jockey. These hands-on opportunities distinguish the museum from a static equipment display, although working equipment can occasionally be unavailable.",
      "verificationUrl": "https://texasbroadcastmuseum.com/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/reviews/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the DuMont Telecruiser and can you see it at the museum?",
      "answer": "The museum identifies a restored 1949 DuMont Telecruiser, a large early mobile television production vehicle. The historic truck demonstrates how complicated remote broadcasting once was; ask staff before travel whether its interior can be accessed by your group.",
      "verificationUrl": "https://texasbroadcastmuseum.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/museum/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum good for young children or teens?",
      "answer": "The broadcast camera, microphone, news set and operating radio studio can appeal to school-age children and especially teens interested in media. Some crime-history interpretation needs parental context. Visitors with younger children should arrange a shorter supervised program.",
      "verificationUrl": "https://texasbroadcastmuseum.com/reviews/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/reviews/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I budget for the Texas Broadcast Museum?",
      "answer": "The museum's own reviews describe guests finding more historic material and hands-on activities than expected. An hour to two hours is a sensible editorial estimate, rather than assuming it is a quick 30-minute stop; ask staff if you need a scheduled tour.",
      "verificationUrl": "https://texasbroadcastmuseum.com/reviews/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/reviews/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a cafeteria or is Studio 4 a restaurant?",
      "answer": "The operator describes Studio 4 as a rentable event space, not a public cafeteria or full-service restaurant. Its public pages do not establish everyday museum food service; plan to eat elsewhere in Kilgore unless staff confirms a specific event's catering.",
      "verificationUrl": "https://texasbroadcastmuseum.com/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasbroadcastmuseum.com/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "the-agricultural-museum-arts-center-boerne": [
    {
      "question": "Is The AgriCultural Museum the same place as Boerne's old Agricultural Heritage Museum?",
      "answer": "Yes. The nonprofit museum began as the Agricultural Heritage Center in 1986 and changed its public name to The AgriCultural Museum & Arts Center in 2018, reflecting its expanded arts and community-program role. It remains at 102 City Park Road in Boerne.",
      "verificationUrl": "https://theagricultural.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://theagricultural.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When is the AgriCultural Museum open and what does admission cost?",
      "answer": "The museum operator advertises Saturdays from 10 a.m. to 4 p.m. at 102 City Park Road. Regular admission is by donation, rather than a fixed price. Private events and special programs can operate at other times and have distinct charges.",
      "verificationUrl": "https://theagricultural.org/visit-the-agricultural/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What will children and adults see at The AgriCultural?",
      "answer": "A five-acre site includes the Big Red Barn with vintage tractors and farm equipment, buggies, a chuck wagon, a blacksmith shop, a woodworking shop and a pioneer house. Younger children will appreciate visible machinery, while older visitors can explore changes in Hill Country farming and crafts.",
      "verificationUrl": "https://theagricultural.org/visit-the-agricultural/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors watch an active blacksmith at The AgriCultural?",
      "answer": "The operator advertises blacksmith demonstrations every Saturday. Times and individual demonstrators can change, and active forge equipment requires appropriate supervision and distance. Confirm the demonstration schedule if it is the main reason for your visit.",
      "verificationUrl": "https://theagricultural.org/visit-the-agricultural/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which Saturdays have live bluegrass music at the museum?",
      "answer": "Regular bluegrass jams take place on the second and fourth Saturdays from 11 a.m. to 1 p.m., and the operator says they are free to the public with donations appreciated. Check the events schedule before arriving, because museum hours alone do not guarantee a jam.",
      "verificationUrl": "https://theagricultural.org/bluegrass-jams/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://theagricultural.org/bluegrass-jams/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a cafeteria, restaurant or bar?",
      "answer": "The regular visitor page does not advertise a cafeteria or full-service dining operation. The City mentions that the woodshop may be converted into a bar for private events, but that does not mean walk-in museum visitors can buy meals or drinks there.",
      "verificationUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the agricultural museum accessible for wheelchairs or strollers?",
      "answer": "The public museum and city pages describe five acres with outdoor equipment and multiple historic structures, but do not establish step-free entry into every building or provide complete accessible-route specifications. Call the operator at 210-445-1080 about routes, restrooms and weather before visiting.",
      "verificationUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I tour the museum without joining a guided group?",
      "answer": "Yes. The City of Boerne encourages a self-guided visit of the museum's buildings and equipment. Group events, private use of the Pioneer House and workshops require separate arrangements; routine museum entry does not include a booked group program.",
      "verificationUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I allow to see The AgriCultural?",
      "answer": "Allow approximately one to two hours for a focused self-guided look at the barn, machinery and historic workshops. This is a TexasDefined editorial planning estimate, not an official time commitment. Tractor pulls, jams, markets or art workshops can make the outing considerably longer.",
      "verificationUrl": "https://theagricultural.org/visit-the-agricultural/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "crow-museum-asian-art-dallas": [
    {
      "question": "Is the Crow Museum in Dallas free?",
      "answer": "Yes. The Crow Museum of Asian Art at the Dallas Arts District provides free general admission. Donations are encouraged but not required.",
      "verificationUrl": "https://crowmuseum.org/dallas-arts-district/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://crowmuseum.org/about-the-museum/faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the Crow Museum's hours?",
      "answer": "The Dallas Arts District site lists Tuesday–Sunday 11 a.m.–5 p.m., closed Mondays and major holidays, with occasional event or weather exceptions.",
      "verificationUrl": "https://crowmuseum.org/dallas-arts-district/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://crowmuseum.org/about-the-museum/faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Crow Museum have two locations?",
      "answer": "Yes. One location is at 2010 Flora Street in Dallas; a second is at UT Dallas in Richardson. Check which campus is showing the exhibition you want before visiting.",
      "verificationUrl": "https://crowmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://crowmuseum.org/about-the-museum/faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park at the Dallas Crow Museum?",
      "answer": "The Trammell Crow Center garage is paid for ordinary nonmember parking. Parking pricing and member benefits differ; verify the current operator parking map and event restrictions.",
      "verificationUrl": "https://crowmuseum.org/dallas-arts-district/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://crowmuseum.org/where-to-park/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors avoid stairs at the Crow Museum entrance?",
      "answer": "Yes. The Flora Street main entrance is step-free. If arriving from the Trammell Crow Center parking garage, alert security for ramp or alternative access assistance; contact the museum for your particular mobility needs.",
      "verificationUrl": "https://crowmuseum.org/where-to-park/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://crowmuseum.org/where-to-park/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Crow Museum appropriate for children?",
      "answer": "The free galleries can work for families and school-age children interested in art, especially when you plan a short selective visit. Look up current family programming rather than expecting a permanent play museum.",
      "verificationUrl": "https://crowmuseum.org/dallas-arts-district/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://crowmuseum.org/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are all Crow Museum exhibitions shown downtown?",
      "answer": "No. The Dallas and Richardson sites publish exhibitions separately. Check the museum's exhibition calendar for the specific venue and closing date.",
      "verificationUrl": "https://crowmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://crowmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a restaurant inside the Crow Museum?",
      "answer": "Official Dallas visitor information does not establish a full-service restaurant inside the museum. Plan food in the surrounding Arts District rather than promising a cafeteria.",
      "verificationUrl": "https://crowmuseum.org/dallas-arts-district/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://crowmuseum.org/dallas-arts-district/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "museum-of-the-american-railroad-frisco": [
    {
      "question": "Where is the Museum of the American Railroad in Frisco?",
      "answer": "The museum's daily operations and check-in are at TrainTopia inside the Frisco Discovery Center, 8004 North Dallas Parkway, Suite 400, Frisco. Do not confuse this with the Grapevine train events.",
      "verificationUrl": "https://www.historictrains.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I tour full-size locomotives on Sunday?",
      "answer": "The indoor TrainTopia exhibit is normally open Sundays 1–5 p.m., but the museum advertises no Sunday walking tours of the outdoor rolling-stock collection.",
      "verificationUrl": "https://www.historictrains.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/traintopia",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much does the Museum of the American Railroad cost?",
      "answer": "Its published prices list adults at $12 for TrainTopia alone and $18 for the combined walking tour and TrainTopia, with reduced rates for ages 3–12 and free entry under age three. Check current tickets and exceptions before booking.",
      "verificationUrl": "https://www.historictrains.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is TrainTopia the same experience as the outdoor railroad tour?",
      "answer": "No. TrainTopia is the indoor G-scale model layout; the walking tour is a guided outdoor visit to historic railroad equipment. Each has different schedules and ticket options.",
      "verificationUrl": "https://www.historictrains.org/traintopia",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors get inside Big Boy locomotive 4018?",
      "answer": "The museum's virtual tour identifies UP Big Boy 4018 among its equipment, but that does not guarantee boarding. Ask about the specific day's guided-tour safety rules and accessible viewing areas.",
      "verificationUrl": "https://www.historictrains.org/virtual-tour",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/virtual-tour",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the outdoor walking tour wheelchair accessible?",
      "answer": "The museum publishes a dedicated walking-tour accessibility contact (jgarbutt@historictrains.org). Conditions around outdoor rolling stock and historic steps differ from the indoor model exhibit; verify accommodations before buying a tour ticket.",
      "verificationUrl": "https://www.historictrains.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum suitable for toddlers?",
      "answer": "TrainTopia's models and scavenger-hunt activities can interest younger children. Outdoor tours involve more walking and safety supervision, so choose separately based on children's interests and stamina.",
      "verificationUrl": "https://www.historictrains.org/traintopia",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a café or on-site lunch service?",
      "answer": "The railroad museum's official visitor page does not confirm a dedicated museum cafeteria or restaurant. Plan meals elsewhere in Frisco or check current Frisco Discovery Center concessions directly.",
      "verificationUrl": "https://www.historictrains.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.historictrains.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "armstrong-browning-library-museum-waco": [
    {
      "question": "Is admission to Baylor's Armstrong Browning Library & Museum free?",
      "answer": "Yes. Baylor explicitly says that the Armstrong Browning Library & Museum is free and open to the public. A museum visit to the public rooms is different from requesting restricted scholarly materials, which requires separate registration.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park, and which entrance should wheelchair visitors use?",
      "answer": "Baylor designates visitor parking along 8th Street and James Avenue near 710 Speight Avenue. The institution specifically directs visitors with disabilities to the rear James Avenue entrance for easy access; campus parking rules can change.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/directions-parking",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/directions-parking",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I tour the Armstrong Browning Library without an appointment?",
      "answer": "Yes. Baylor welcomes walk-in self-guided visitors, while a docent-led tour depends on who is available that day. Groups of ten or more are asked to arrange a scheduled tour at least two weeks ahead.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/tours",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/tours",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is special about the Browning Library's stained glass and Treasure Room?",
      "answer": "The Hankamer Treasure Room displays stained glass inspired by Browning poems, historic portraits and literary objects. The building's galleries are an aesthetic experience in their own right, but the collections are curated and not open-access shelves.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/building-map-online-tour",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/building-map-online-tour",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "May visitors handle rare letters and manuscripts in the museum?",
      "answer": "Not as part of an ordinary walk-in gallery tour. Baylor's noncirculating research items are used under supervision in its third-floor Belew Scholars' Room; researchers must present identification and register and should contact staff ahead of time.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/research-instruction/use-collections",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/research-instruction/use-collections",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a public cafeteria or restaurant?",
      "answer": "Baylor's publicly described museum rooms do not establish a permanent walk-in cafeteria or full-service restaurant. Reception space is used for scheduled university functions, not evidence of a daily dining service; plan food elsewhere on campus.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the Browning Library exhibits suitable for toddlers and school groups?",
      "answer": "Younger children may enjoy the stained glass and architecture, but this is primarily a quiet literary museum and research facility rather than a hands-on children's museum. Baylor offers tailored school tours when arranged in advance.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/tours",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/tours",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I use the library as a venue for wedding portraits?",
      "answer": "Professional or staged portrait photography is subject to separate Baylor approval and permit rules, even though public museum visiting is free. Do not assume that a normal gallery visit includes permission for a formal photo session.",
      "verificationUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/use-our-facility/portrait-policies",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/use-our-facility/portrait-policies",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "bell-county-museum-belton": [
    {
      "question": "How much does admission to the Bell County Museum cost?",
      "answer": "General admission to the Bell County Museum is free. Museum programs or traveling exhibits may have separate reservations or special arrangements, so verify the event description before bringing a school or group.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What days and times is the Bell County Museum open?",
      "answer": "The museum lists noon to 5 p.m. Tuesday through Friday and 10 a.m. to 5 p.m. Saturday, with Sunday and Monday closures. Check official hours for holidays or unusual events before driving to Belton.",
      "verificationUrl": "https://www.bellcountymuseum.org/directions.aspx",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/directions.aspx",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum wheelchair-accessible, including the second floor?",
      "answer": "The institution says all visitor entrances are wheelchair accessible and an elevator reaches the second floor. Accessible restrooms are on the first floor; ask staff about any temporary construction or unusual exhibit layouts.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I take photographs inside Bell County Museum?",
      "answer": "The museum permits photography and video in its galleries but asks visitors to take care around fragile artifacts. Different temporary loans or public events could carry their own restrictions, so follow posted exhibit signs.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "May I bring food, snacks or drinks into the exhibits?",
      "answer": "No. The museum's FAQ asks visitors not to bring food and drink into exhibition galleries. Its visitor information does not substantiate a full-service restaurant on site; plan refreshments or a meal in Belton separately.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the Gault Site exhibit and who will enjoy it?",
      "answer": "The museum highlights the Gault Site archaeology exhibit alongside Bell County history in the historic Carnegie Library. School-age visitors may enjoy the archaeological interpretation, while younger children may prefer a scheduled activity.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I borrow books from the museum genealogy and research library?",
      "answer": "No. Bell County Museum says genealogy and research materials are available for guests to use inside the library, but they cannot be checked out or taken away. Research visits and public gallery exploration have different purposes.",
      "verificationUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/p/visit/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Bell County Museum offer children’s special activities?",
      "answer": "Yes. The museum's posted calendar lists family events and age-specific activities such as Tiny Thinkers and science programming. These are scheduled activities, not permanent daily exhibits, so check dates and any required registration.",
      "verificationUrl": "https://www.bellcountymuseum.org/events",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bellcountymuseum.org/events",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "brenham-heritage-museum": [
    {
      "question": "What is the current admission price at Brenham Heritage Museum?",
      "answer": "The museum lists adult general admission at $10, discounted entry for seniors, students and veterans, $5 for children ages five to twelve, and free entry for ages four and under. Membership and group rates differ, so check current categories.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When is Brenham Heritage Museum open to the public?",
      "answer": "Ordinary hours are Tuesday through Saturday, 10 a.m. to 4 p.m. The museum advertises special extended hours and free admission October 16–18, 2026; those festival exceptions should not be mistaken for its usual calendar.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where can visitors using wheelchairs or strollers enter?",
      "answer": "The operator directs wheelchair and stroller visitors to its rear entrance, which has a ramp and elevator. If you are being dropped off, the museum recommends East Main Street near that rear accessible entrance.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should a charter bus or large school group park?",
      "answer": "The museum warns that ramps into its main lot at 105 South Market Street are steep for buses. Bus drivers are advised to use alternative parking near its office or the fire museum and use the rear entrance drop-off.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are guided tours available for school groups or large parties?",
      "answer": "Yes, but guided tours are arranged by appointment rather than guaranteed on arrival. The museum has different group and school rates and encourages reservations for groups of ten or more.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What displays will I see at Brenham Heritage Museum?",
      "answer": "The permanent interpretation includes Washington County timelines, slavery and Reconstruction, immigration, farming, transportation, Maifest traditions, interactive postal stations and multimedia rooms. Traveling art displays change by date.",
      "verificationUrl": "https://www.bhmtexas.org/visit/exhibits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit/exhibits",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I still see the October 2026 arts festival exhibit later in the year?",
      "answer": "The museum's current page lists the Texas Arts and Music Festival displays as a temporary exhibition from October 1 through October 31, 2026. Do not expect that temporary show to remain after the published end date.",
      "verificationUrl": "https://www.bhmtexas.org/visit/exhibits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit/exhibits",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Brenham Heritage Museum have a restaurant or public cafe?",
      "answer": "Current museum visitor material documents the museum, its admission policies and accessible parking but not a full-service public museum restaurant. Plan lunch in downtown Brenham separately rather than assuming a cafe is inside.",
      "verificationUrl": "https://www.bhmtexas.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.bhmtexas.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "audie-murphy-american-cotton-museum-greenville": [
    {
      "question": "What is the address and regular visiting schedule of the Audie Murphy American Cotton Museum?",
      "answer": "The museum is at 600 Interstate 30 East, Greenville, Texas. It normally opens Tuesday through Saturday from 10 a.m. to 5 p.m. and closes on Sundays, Mondays and major holidays. Check the operator for special arrangements.",
      "verificationUrl": "https://cottonmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the museum's admission prices for children and students?",
      "answer": "The operator lists adult admission at $10, but some current pages disagree about student and youth age brackets and fees. Check the dedicated admissions desk or contact the museum for your exact category rather than relying on conflicting summaries.",
      "verificationUrl": "https://cottonmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Audie Murphy the only subject covered by this museum?",
      "answer": "No. The museum also interprets the cotton economy, plantation-era and later agricultural labor, processing machinery, Hunt County communities and historic domestic life. Its military galleries include other local and national service stories.",
      "verificationUrl": "https://cottonmuseum.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What does the Military Hall of Heroes show visitors?",
      "answer": "The military gallery includes a World War I trench interpretation, weapons and artifacts from later conflicts, and military figures including Audie Murphy. Sensitive depictions of combat can be intense for younger children.",
      "verificationUrl": "https://cottonmuseum.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the historic Ende-Gaillard House part of the museum grounds?",
      "answer": "Yes. The museum describes the nineteenth-century Ende-Gaillard House on the grounds, along with memorial features. Confirm whether the house is staffed and open on the day you intend to visit, since outdoor and historic-building access can vary.",
      "verificationUrl": "https://cottonmuseum.com/about/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/about/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I book a private group tour?",
      "answer": "The museum offers guided tours for groups of at least ten people by advance appointment. Individuals can explore the galleries on a self-guided basis, and the visitor page provides a telephone number for reservation details.",
      "verificationUrl": "https://cottonmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors using wheelchairs explore the museum?",
      "answer": "The museum says its principal visitor facilities are accessible and reports one wheelchair and one walker available on a first-come basis. Confirm the historic home's entrance and outdoor memorial approaches separately if barrier-free access is essential.",
      "verificationUrl": "https://cottonmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a restaurant or place to eat?",
      "answer": "The museum visitor page confirms a picnic area on its grounds, but does not establish a cafeteria or table-service restaurant. Bring suitable picnic provisions or plan dining in Greenville outside the exhibits.",
      "verificationUrl": "https://cottonmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://cottonmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "brazos-valley-museum-natural-history-bryan": [
    {
      "question": "How much are tickets at the Brazos Valley Museum of Natural History?",
      "answer": "Its visitor page lists regular adult admission of five dollars, discounted admission for youth, seniors and students, and free entry for children aged three and under with a paying adult. Check categories at the front desk before the visit.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a dollar admission day?",
      "answer": "Yes. The museum advertises Dollar Days on the first Tuesday of each month, when regular museum admission is one dollar. Confirm the date and any special exhibition or holiday rules before planning a dedicated drive.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When is the Brazos Valley Museum open in Bryan?",
      "answer": "The operator lists Tuesday through Saturday from 10 a.m. to 5 p.m. at 3232 Briarcrest Drive in Bryan. Sunday and Monday are not listed as regular visiting days; programming and holidays may affect the schedule.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Brazos Valley Museum suitable for young children and field trips?",
      "answer": "Yes. The museum provides school programs, children's nature camps, outreach activities and education materials for younger audiences. Some programs require advance reservations and are not available as unscheduled walk-in activities.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/about-the-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/about-the-museum",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What should families expect to learn at the Brazos Valley Museum?",
      "answer": "The institution emphasizes natural and cultural history, including wildlife, science and local heritage. Families should choose the current exhibitions and programs suited to their children's ages rather than assuming every exhibit is hands-on.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/about-the-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/about-the-museum",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Boonville Heritage Park part of an indoor museum ticket?",
      "answer": "Boonville Heritage Park is a separate outdoor historic setting that can complement a museum visit. Do not assume its hours, weather conditions, accessibility or any event entrance requirements are identical to indoor museum admission.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have wheelchair or sensory accessibility services?",
      "answer": "The institution publishes a website accessibility statement, but its webpage does not establish all physical accessibility features. Contact museum visitor services about wheelchair routes, sensory accommodation and specific exhibit access before a trip.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Brazos Valley Museum have an on-site cafeteria or restaurant?",
      "answer": "The museum's public visit and programming descriptions do not establish a full-service public restaurant or permanent cafeteria. Plan food separately in Bryan and ask visitor services about any rules for bringing drinks into galleries.",
      "verificationUrl": "https://www.brazosvalleymuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brazosvalleymuseum.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "czech-heritage-museum-genealogy-center-temple": [
    {
      "question": "What hours is the Czech Heritage Museum in Temple open?",
      "answer": "The institution publishes Thursday, Friday and Saturday hours from 10 a.m. to 4 p.m. Weekday and holiday changes may occur; contact the museum rather than relying on older travel listings for a Monday-to-Wednesday visit.",
      "verificationUrl": "https://czechheritagemuseum.org/contact-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/contact-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What does admission to the Czech Heritage Museum cost?",
      "answer": "The museum currently lists four dollars for adults, three dollars for seniors aged sixty or older and two dollars for children twelve and under. Contact it directly about group packages and special events before assuming general ticket rates apply.",
      "verificationUrl": "https://czechheritagemuseum.org/contact-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/contact-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit the Czech Heritage Museum without a tour guide?",
      "answer": "Yes. The museum explicitly offers a self-guided visit at your own pace as well as booked guided tours. Groups can arrange guided or self-directed visits, with booking policies depending on the group.",
      "verificationUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is there to see beyond genealogical records?",
      "answer": "The museum's visitor resources describe displays on Czech history, immigrant life, cultural artifacts and folk traditions. It is a heritage museum as well as a genealogical center, so visitors without family research interests can still enjoy exhibits.",
      "verificationUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is the Czech Heritage Museum in Temple?",
      "answer": "The museum is at 119 West French Avenue in Temple, on the corner opposite a local business referenced in its directions. It supplies a map on its official visit page, which should be consulted rather than relying on unofficial pins.",
      "verificationUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I trace my family's Czech ancestry on a casual museum visit?",
      "answer": "The museum has a genealogy mission, but focused family-history research benefits from contacting staff before traveling with surnames, locations and known dates. Do not assume records or specialist assistance are instantly available to walk-ins.",
      "verificationUrl": "https://czechheritagemuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are Czech Heritage Museum school or group tours available?",
      "answer": "Yes. The operator offers standard groups and guided group tours for classes, clubs and other organizations, with a reservation process outlined on its plan-your-visit page. Confirm staffing and any extra costs when booking.",
      "verificationUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Czech Heritage Museum have a cafeteria or restaurant?",
      "answer": "Its published visiting resources establish exhibits, tour options, admission and directions, but do not confirm an on-site cafeteria or table-service restaurant. Plan eating in Temple separately and ask about visitor food restrictions.",
      "verificationUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://czechheritagemuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "buffalo-soldiers-national-museum-houston": [
    {
      "question": "Is the Buffalo Soldiers National Museum in Houston open in October 2026?",
      "answer": "No. The museum's official home and visitor pages still say it is temporarily closed for renovations as of October 2026, despite an earlier anticipated summer reopening. Do not book a ticket or arrive expecting access until a dated reopening notice is published.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can schools book an in-person Buffalo Soldiers National Museum tour now?",
      "answer": "Not at present. The museum has posted an explicit notice that all in-person group tours are temporarily cancelled until further notice. Older prices, advance booking policies and tour hours remain online but do not establish available reservations.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/group-tours/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/group-tours/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How can students learn about the Buffalo Soldiers while the museum is closed?",
      "answer": "The museum continues to describe virtual field trips, digital interpretation and education outreach. Their current availability and booking requirements are not confirmed on all older pages, so teachers should contact the museum before scheduling virtual or off-site programming.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What does the museum teach about Black soldiers and civil rights?",
      "answer": "It interprets Black military service from early United States Colored Troops and frontier regiments through the 92nd Infantry Division, the struggle for integration, and contemporary service. These are published interpretation topics rather than presently open gallery displays.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/exhibits/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/exhibits/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the Women Who Served exhibit about?",
      "answer": "The institution highlights Black women in United States military history, including Cathay Williams, who enlisted under an assumed male identity. The public exhibit description is useful background, but an in-person exhibition visit is not possible while the building remains closed.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/exhibits/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/exhibits/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum still have free Thursday admission and parking?",
      "answer": "The website includes pre-renovation Thursday admission promotions and surface parking descriptions, but no regular on-site visits are currently available. Do not treat those older terms as a valid free-entry schedule until reopening and updated visitor policies are confirmed.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Buffalo Soldiers National Museum wheelchair accessible during renovations?",
      "answer": "Its historical visitor profile notes accessibility, but the Houston building is closed for public museum admission. Before any future visit, ask staff to confirm the accessible entrance and whether renovation has changed ramps, restrooms and visitor routes.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What can families visit nearby instead while the museum is closed?",
      "answer": "Plan a different institution that is independently confirmed open and appropriate to your interests. The museum's website may offer off-site events, but event availability must be confirmed directly; do not assume the closed Caroline Street building is a visitor stop.",
      "verificationUrl": "https://buffalosoldiersmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://buffalosoldiersmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "texas-prison-museum-huntsville": [
    {
      "question": "What are the Texas Prison Museum's current hours and admission prices?",
      "answer": "The museum's current homepage lists Monday through Saturday 10 a.m.–5 p.m., Sunday noon–5 p.m., adults $8, children 6–17 $7, qualifying seniors, military, first responders, TDCJ staff and SHSU students $6, and free admission for ages five and under. Group rates are separately published.",
      "verificationUrl": "https://www.txprisonmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Texas Prison Museum the same as the Huntsville Unit prison?",
      "answer": "No. The Texas Prison Museum is a separate public nonprofit museum on Texas Highway 75 North. It explains the history of the state's correctional institutions, including the historic Huntsville Unit called the Walls; the exhibit tour is not a tour inside the operating prison.",
      "verificationUrl": "https://www.txprisonmuseum.org/about-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/about-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum display the real electric chair called Old Sparky?",
      "answer": "Yes. Its official exhibit guide identifies Old Sparky as the decommissioned electric chair once used by Texas. The museum states 361 prisoners were executed using it between 1924 and 1964. The subject is disturbing and requires sensitive interpretation, especially for children.",
      "verificationUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Texas Prison Museum suitable for younger children?",
      "answer": "The museum welcomes school groups, but some displays depict execution equipment, imprisonment, weapons and violent crime. A visit is better planned around each child's maturity; adults may omit the capital-punishment section and choose other social-history interpretation.",
      "verificationUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the Texas Prison Rodeo and can I attend it today?",
      "answer": "The museum interprets a historic prison rodeo that began in 1931 and ran through 1986. Its collections and narratives are historical; there is no current public Texas Prison Rodeo event to attend at the museum.",
      "verificationUrl": "https://www.txprisonmuseum.org/copy-of-captain-joe-byrd-cemetery",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/copy-of-captain-joe-byrd-cemetery",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I allow to see the Texas Prison Museum?",
      "answer": "The museum suggests that a quick visitor may browse in approximately 45 minutes, while readers interested in the full history can spend several hours. Allow more time if discussing sensitive exhibits with family or school visitors.",
      "verificationUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the prison museum have a working restaurant or cafeteria?",
      "answer": "The institution's official admission and exhibits information does not establish an on-site cafeteria or full-service restaurant. Plan dining elsewhere in Huntsville and ask staff whether drinking water or snacks are permitted inside the galleries.",
      "verificationUrl": "https://www.txprisonmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there wheelchair access and are tours of the operating prison included?",
      "answer": "The official museum sources reviewed do not confirm every doorway or gallery accommodation, so contact museum staff about physical access. Public museum admission does not include entry into any functioning Texas prison, and the guide must never imply that it does.",
      "verificationUrl": "https://www.txprisonmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txprisonmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "eisenhower-birthplace": [
    {
      "question": "Where is Dwight Eisenhower's Texas birthplace and how do I reach its parking lot?",
      "answer": "Use 609 South Lamar Avenue in Denison for the Texas Historical Commission visitor center and lot. Some nearby Shepherd, Day and Lamar street approaches have closures, so follow the THC route directions rather than driving directly to a historical house pin.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much do guided tours at Eisenhower Birthplace cost?",
      "answer": "The THC lists adults $6, seniors, teachers and veterans $5, youth $4, children five and under free, and a $12 family admission package. School and adult groups have separate advertised tour prices. Confirm the current category when reserving.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit the Eisenhower Birthplace without a reservation?",
      "answer": "The site offers tours starting on the hour, with walk-ins admitted only as capacity allows. Reserve at least one week ahead if a specific time is essential. Public tours generally run Tuesday through Saturday and Sunday afternoon; holiday changes require checking.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Was Dwight Eisenhower raised in the Denison house?",
      "answer": "No. Dwight Eisenhower was born there on October 14, 1890, while his father worked around railroad shops. His family moved back to Kansas when he was about 18 months old; the Texas house represents his birthplace, not the whole childhood.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/eisenhower-birthplace-history",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/eisenhower-birthplace-history",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Eisenhower Birthplace accessible to wheelchair users?",
      "answer": "THC lists wheelchair-accessible ramps at both the Birthplace house and visitor center, plus accessible restrooms at the picnic pavilion. There is a short walk between the buildings; ask visitor services about specific mobility needs or outdoor surfaces.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Eisenhower Birthplace have a café or allow packed food?",
      "answer": "The operator states that food and drinks are not sold on site and cannot be consumed inside the historic house. You may bring your own food and drinks to the picnic pavilion, where water fountains and restrooms are located.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the tours suitable for school-age children?",
      "answer": "Yes. THC's educational program introduces railroad-era working-family life through a house tour, interpretive video and supervised period activities such as croquet, paper quilting and historic washing. School tours are book-ahead sessions distinct from general public admission.",
      "verificationUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Eisenhower Birthplace the same as the Eisenhower home in Abilene or Gettysburg?",
      "answer": "No. The Denison house marks Eisenhower's 1890 birth. His Kansas boyhood home and Pennsylvania retirement farm are distinct historic locations that describe other life periods, and should not be mistaken for Texas museum sites.",
      "verificationUrl": "https://thc.texas.gov/blog/homes-president-eisenhower",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/blog/homes-president-eisenhower",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "1919-san-augustine-county-jail-museum": [
    {
      "question": "Is the restored 1919 San Augustine County Jail open as a museum?",
      "answer": "Yes. The official local visitor organization describes the restored 1919 jail as a law-enforcement and county-history museum. The former jail itself stopped housing prisoners in 2000. Check the local operator for holiday exceptions.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the 1919 jail museum's hours and admission?",
      "answer": "Visit San Augustine currently lists Monday through Friday 11 a.m.–3 p.m., with free admission and donations welcomed. It is a locally staffed historical attraction; confirm before a long trip rather than relying on the schedule of nearby Mission Dolores.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can you see the original jail cells?",
      "answer": "The building includes jail elements reused from the nineteenth-century predecessor as well as later jail cells. The original historic fabric is a primary attraction, but accessibility to each cell or floor is not described fully online; ask the operator what visitors may enter.",
      "verificationUrl": "https://atlas.thc.texas.gov/Details/5507018848",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/5507018848",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What makes the jail building historically significant?",
      "answer": "Constructed in 1919 with reused bars and cell material from the earlier 1882 jail, the jail served the county until 2000. A 1973 stucco coating was removed during the 2016 restoration; the building carries a Recorded Texas Historic Landmark designation.",
      "verificationUrl": "https://atlas.thc.texas.gov/Details/5507018848",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/5507018848",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the 1919 jail appropriate for children?",
      "answer": "The law-enforcement and local-history exhibits can interest school-age children, especially older students studying civic institutions. The setting involves actual imprisonment and jail cells, so families should decide what is appropriate for younger visitors; this is not a children's play museum.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum offer historical research materials or a photo collection?",
      "answer": "Yes. Local tourism identifies a Texana research library, county records, a rolling photo kiosk with images by Russell Lee and John Vachon, and town history timelines. Arrange detailed document research with staff rather than assuming all holdings are open for self-service.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the former jail wheelchair accessible?",
      "answer": "The publicly available sources do not clearly specify a lift, accessible second-floor route, or which restored cell interiors are step-free. Contact the locally operated museum before visiting if mobility access is essential; preservation status by itself does not guarantee all historic spaces are accessible.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit Mission Dolores on the same ticket or schedule?",
      "answer": "No. Mission Dolores is a separate Texas Historical Commission historic site at 701 South Broadway with its own admission and operating hours. The jail is normally free and open weekdays; verify both schedules independently before planning to combine them.",
      "verificationUrl": "https://thc.texas.gov/historic-sites/mission-dolores",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a restaurant or café in the 1919 jail museum?",
      "answer": "The local tourism listing describes museum exhibits and resources but does not advertise an on-site café, cafeteria or table-service restaurant. Plan to eat in town rather than assuming food service inside the preserved jail.",
      "verificationUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://visitsanaugustinetx.org/local-attractions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "corpus-christi-museum-science-history": [
    {
      "question": "How much is admission to the Corpus Christi Museum of Science and History?",
      "answer": "The current operator page lists adults at $15, ages 3–12 at $11, ages 2 and younger free, and separate senior, teacher and military categories before tax. Reduced Museums for All admission requires eligible SNAP benefits and identification. Check the official page for current prices.",
      "verificationUrl": "https://www.ccmuseum.com/visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g60927-d199035-t538500-How_much_is_it_for_adults_and_children.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I park at the museum?",
      "answer": "The museum states free parking is available on North Chaparral Street directly in front of the entrance and across the street in an adjacent lot. Access and capacity should be confirmed if attending a large event.",
      "verificationUrl": "https://www.ccmuseum.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ccmuseum.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where can I see the La Belle ship itself?",
      "answer": "The conserved La Belle hull is displayed at the Bullock Texas State History Museum in Austin. Corpus Christi is an original La Salle Odyssey museum with related interpretation and other shipwreck material; the hull is not here.",
      "verificationUrl": "https://thc.texas.gov/learn/archeological-spotlight/la-salle-archeology-projects",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.ccmuseum.com/museum-exhibits/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum good for children or school groups?",
      "answer": "The museum provides science and history displays plus family education programs. School and larger group visits require advance arrangements; the operator requests a phone call for groups of ten or more. Select exhibits appropriate to a child's interest rather than assuming every gallery is hands-on.",
      "verificationUrl": "https://www.ccmuseum.com/education-programs/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/Attraction_Review-g60927-d199035-Reviews-Corpus_Christi_Museum_of_Science_and_History-Corpus_Christi_Texas.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the museum have wheelchair rentals or an accessible route?",
      "answer": "The public visit page does not confirm wheelchair rentals or every accessible route. Contact the museum's visitor services at 361-826-4667 to verify current wheelchair availability, elevators, step-free routes and other accommodations before arrival.",
      "verificationUrl": "https://www.ccmuseum.com/visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g60927-d199035-t538500-How_much_is_it_for_adults_and_children.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I eat lunch inside the museum?",
      "answer": "A public visitor Q&A raises the question, but the current official visit page does not establish a specific on-site café or picnic policy. Ask visitor services directly and plan for nearby dining rather than promising food service.",
      "verificationUrl": "https://www.ccmuseum.com/visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/Attraction_Review-g60927-d199035-Reviews-Corpus_Christi_Museum_of_Science_and_History-Corpus_Christi_Texas.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "port-isabel-historical-museum": [
    {
      "question": "Is the Port Isabel Historical Museum open every day?",
      "answer": "No. The City of Port Isabel and South Padre Island Chamber list Wednesday–Saturday, 10 a.m.–4 p.m. The Chamber lists 3:30 p.m. as the last ticket sale. Call (956) 943-7602 before traveling to confirm holiday or event schedule changes.",
      "verificationUrl": "https://business.spichamber.com/list/member/port-isabel-historical-museum-18",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://business.spichamber.com/list/member/port-isabel-historical-museum-18",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is special about the Champion Building?",
      "answer": "Built in 1899 as Charles Champion’s commercial building, it retains a distinctive 1906 exterior fish mural representing the Laguna Madre fishing economy. The Texas Historical Commission confirms the building now houses two floors of museum exhibits.",
      "verificationUrl": "https://thc.texas.gov/blog/beyond-beach",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/blog/beyond-beach",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there an elevator to reach the second floor?",
      "answer": "A past independent visitor reported an elevator, but the museum's current official page does not confirm it is operational. Call ahead to confirm an accessible second-floor route and accessible restrooms before a mobility-dependent visit.",
      "verificationUrl": "https://business.spichamber.com/list/member/port-isabel-historical-museum-18",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/Attraction_Review-g56479-d283951-Reviews-Port_Isabel_Historical_Museum-Port_Isabel_Texas.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much does the Port Isabel Historical Museum cost?",
      "answer": "The museum’s standalone published admission schedule lists $5 for adults, $4 for seniors, $3 for students and children, and $2.50 for military and first responders. Those posted amounts may change. Call (956) 943-7602 to confirm current admission, payment methods and group rates before traveling.",
      "verificationUrl": "https://portisabel-texas.com/blog/history/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://portisabelhistory.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What else should I see near the museum?",
      "answer": "The nearby Port Isabel Lighthouse complements the museum's regional maritime and trade history, while South Padre Island provides a very different barrier-island nature and beach experience across the causeway.",
      "verificationUrl": "https://thc.texas.gov/blog/beyond-beach",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thc.texas.gov/blog/beyond-beach",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "historic-brownsville-museum": [
    {
      "question": "Does Historic Brownsville Museum admission include the locomotive gallery?",
      "answer": "Yes. The Brownsville Historical Association states that ordinary museum admission includes the Simón Celaya Railroad Gallery and the Mary A. Yturria Education Center where exhibitions or programming are available. Verify special access arrangements before departure.",
      "verificationUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When is the Historic Brownsville Museum open and how much does it cost?",
      "answer": "The operator's current page lists Tuesday through Saturday, 10 a.m. to 4 p.m., with closure Sunday and Monday. Listed admission is $6 adults, $4 seniors, $2 students and free for children under six, military personnel, eligible Brownsville school groups and members. Recheck the operator for changes.",
      "verificationUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Historic Brownsville Museum interesting for children?",
      "answer": "The Simon Celaya Railroad Gallery now includes interactive activities and the 1872 locomotive, with displays introducing how steam engines work. Other local-history and art exhibits are more interpretive, so choose a shorter family visit if needed.",
      "verificationUrl": "https://brownsvillehistory.org/simon-celaya-railroad-gallery-brownsville-historical-association.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://brownsvillehistory.org/simon-celaya-railroad-gallery-brownsville-historical-association.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the railroad locomotive from the depot's opening?",
      "answer": "No. The museum occupies a Southern Pacific depot constructed in 1928, while the displayed Rio Grande Railroad locomotive dates to 1872. Comparing the two illustrates different eras of Brownsville transportation.",
      "verificationUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://brownsvillehistory.org/simon-celaya-railroad-gallery-brownsville-historical-association.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I book a guided tour of the Historic Brownsville Museum?",
      "answer": "Yes, the Brownsville Historical Association advertises prearranged museum tours, usually around an hour, with separate pricing and education/group scheduling. Do not assume a guided tour comes with walk-in admission.",
      "verificationUrl": "https://www.brownsvillehistory.org/museum-tours-brownsville-historical-association.html",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/Attraction_Review-g60928-d3404304-Reviews-Historic_Brownsville_Museum-Brownsville_Texas.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I eat at the museum or is it fully wheelchair accessible?",
      "answer": "The museum's current published overview does not establish restaurant service or step-free routes through every historic building. Contact the operator about visitor facilities, accessible entrances and any arrangements required for mobility or sensory needs.",
      "verificationUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "johnny-nelson-katy-heritage-museum": [
    {
      "question": "Is admission to the Johnny Nelson Katy Heritage Museum free?",
      "answer": "Yes. The City of Katy lists free general admission to the Johnny Nelson Katy Heritage Museum at 6002 George Bush Drive. Confirm any special group-program arrangements directly rather than assuming separately scheduled tours are always staffed.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the Katy Heritage Museum's current opening hours?",
      "answer": "The City currently publishes Thursday, Friday and Saturday 10 a.m.–5 p.m. and Sunday 11 a.m.–5 p.m. It does not advertise regular Monday–Wednesday admission. The Texas Historical Commission Atlas contains an older schedule; use the newer City posting and recheck before a holiday visit.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What can children see at the Katy Heritage Museum?",
      "answer": "Children can examine historical tractors, rice-farming machinery, local photographs and household artifacts that explain Katy's development. This is a traditional history museum with physical objects, not a dedicated hands-on play center. Shorter routes may better suit young children.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Katy Heritage Museum the same as Katy Heritage Park?",
      "answer": "No. Johnny Nelson Katy Heritage Museum is a museum building at 6002 George Bush Drive. Neighboring Katy Heritage Park preserves historic houses and a bandstand. The grounds and tours of the houses have different public hours; do not confuse the separate schedules.",
      "verificationUrl": "https://www.katyheritagesociety.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.katyheritagesociety.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the MKT Railroad Depot Museum at the same address?",
      "answer": "No. The MKT Railroad Depot Museum and Katy Railroad Park are at 5615 First Street, a separate historic downtown site with a rail depot, railroad interpretation and a red caboose. Verify its hours independently before adding it to your outing.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cityofkaty.com/visitors/museums",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a school or club arrange a special museum visit?",
      "answer": "The City of Katy explicitly invites schools, clubs and groups to arrange special tours. Ask the museum about staffing, group size, timing and accessibility before arriving; regular free public admission is not a guaranteed private guided tour.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Katy Heritage Museum have a café or cafeteria?",
      "answer": "The City's official museum overview does not advertise a cafeteria, snack counter or restaurant inside Johnny Nelson Katy Heritage Museum. Do not count on on-site meals; plan a separate stop in Katy or confirm any special-event facilities directly.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum wheelchair accessible and can I park nearby?",
      "answer": "The museum's address and visitor contact are published, but the City page does not provide enough detail to confirm every accessible entrance, parking stall, route or restroom. Call museum staff at 281-574-8618 for specific mobility or stroller arrangements before a visit.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should I allow to visit the Katy Heritage Museum?",
      "answer": "A focused 45–90 minutes is a practical independent estimate for the agricultural machinery and historical photographs, not an official museum duration. Add separate time if you plan to visit the adjacent Heritage Park or downtown railroad museum.",
      "verificationUrl": "https://www.cityofkaty.com/visitors/museums",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001108",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "bullock-texas-state-history-museum": [
    {
      "question": "What can I see at the Bullock Texas State History Museum?",
      "answer": "The main Texas history galleries cover Indigenous and early Texas history, the La Belle shipwreck, statehood and the modern state. Temporary exhibitions and films change, so choose any extras after checking the current museum program.",
      "verificationUrl": "https://www.thestoryoftexas.com/visit/exhibits/texas-history-gallery",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thestoryoftexas.com/visit/exhibits/texas-history-gallery",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Bullock Museum good for children?",
      "answer": "Yes. Large objects such as La Belle give families concrete starting points, and younger children can enjoy shorter gallery routes. A child aged 15 or younger must be accompanied by someone at least 16, according to the museum's ticketing rules.",
      "verificationUrl": "https://tickets.thestoryoftexas.com/mainstore?vid=0",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tickets.thestoryoftexas.com/mainstore?vid=0",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Do I need a separate ticket for the Bullock IMAX theater?",
      "answer": "Plan gallery admission and IMAX showtimes as separate ticket decisions. The box office lists different museum and film products, so a gallery ticket should not be assumed to include your selected film.",
      "verificationUrl": "https://tickets.thestoryoftexas.com/mainstore?vid=0",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tickets.thestoryoftexas.com/mainstore?vid=0",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long does a visit to the Bullock Museum take?",
      "answer": "Allow about two to three hours to examine the main Texas history galleries at a comfortable pace. A scheduled IMAX film, special exhibition or detailed reading can extend the outing; this is a planning estimate, not a museum-imposed limit.",
      "verificationUrl": "https://www.thestoryoftexas.com/visit/exhibits/texas-history-gallery",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g30196-d209385-t9169398-I_am_into_history_and_reading_exhibits_How_long.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the Bullock Museum have a cafeteria or restaurant?",
      "answer": "Yes. The Bullock has The Star Cafe on its second floor, serving casual breakfast and lunch items, sandwiches, wraps, salads, coffee and snacks. This is a café with seating, not a separate formal table-service restaurant. The museum lists café hours as 10 a.m.–4 p.m., with hot food until 3 p.m.; museum admission is not required to eat there.",
      "verificationUrl": "https://www.thestoryoftexas.com/visit/the-star-cafe",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.thestoryoftexas.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is parking available at the Bullock Museum?",
      "answer": "The museum operates a visitor parking garage. Charges and capacity can change, particularly around nearby Austin events; consult official directions or contact the museum before traveling.",
      "verificationUrl": "https://www.thestoryoftexas.com/visit",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g30196-d209385-t561280-What_is_the_cost_and_the_hours_Where_to_park.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "perot-museum-nature-science-dallas": [
    {
      "question": "Do Perot Museum tickets require a timed entry?",
      "answer": "Yes. The museum uses timed entry for admission. Its FAQ says visitors have up to one hour after the selected entry time to enter; if delayed beyond that window, ask museum staff rather than assuming rebooking is automatic.",
      "verificationUrl": "https://www.perotmuseum.org/visit/faqs/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.perotmuseum.org/visit/faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can you leave and re-enter the Perot Museum on the same day?",
      "answer": "The museum allows same-day re-entry on a general admission ticket. Traveling exhibitions are one-time entry only, so plan those carefully before stepping outside.",
      "verificationUrl": "https://www.perotmuseum.org/visit/faqs/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.perotmuseum.org/visit/faqs/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Perot Museum suitable for toddlers and young children?",
      "answer": "Yes. The Moody Family Children's Museum is intended for younger visitors, while other permanent halls suit different ages. Bring your own stroller or wagon; availability in the children's area can be restricted on very crowded days.",
      "verificationUrl": "https://www.perotmuseum.org/visit/accessibility/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g55711-d3688568-t338205-Would_a_3_year_4_year_old_enjoy_the_museum_or.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does Perot have a cafeteria, restaurant or café?",
      "answer": "There is an on-site Museum Café serving casual prepared meals and snacks, operated by Wolfgang Puck Catering. It is a museum café rather than a traditional sit-down full-service restaurant; check current hours and menu before planning lunch.",
      "verificationUrl": "https://www.perotmuseum.org/visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ-g55711-d3688568-Perot_Museum_of_Nature_and_Science.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where do you park for the Perot Museum?",
      "answer": "The main visitor parking is Lot B beneath Woodall Rodgers Freeway. The museum currently says Broom Street is CLOSED because of construction, so approach the garage via McKinney Avenue instead. Standard non-member parking is listed at $15 per vehicle, subject to change. Check the museum's current parking map before leaving.",
      "verificationUrl": "https://www.perotmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.perotmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When is the Perot Museum busiest with school groups?",
      "answer": "The museum FAQ reports heavier school visitation before 2 p.m. on Wednesday through Friday during the school year, especially March through May. Visitors preferring a quieter experience can factor that pattern into their plans.",
      "verificationUrl": "https://www.perotmuseum.org/visit/faqs/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.perotmuseum.org/visit/faqs/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are there sensory accommodations at Perot?",
      "answer": "Yes. The museum describes sensory bags, headphone zones and a quiet room on the lower level through its sensory-inclusive program. Check the latest accessibility instructions and ask staff where to collect equipment.",
      "verificationUrl": "https://www.perotmuseum.org/visit/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.perotmuseum.org/visit/accessibility/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    }
  ],
  "witte-museum": [
    {
      "question": "Is the Witte Museum good for children?",
      "answer": "Yes. The museum combines Texas natural history, wildlife, geology and interactive learning, including outdoor elements. For very young children, choose a shorter science-focused route rather than expecting them to complete every gallery.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the Witte Museum have a cafeteria, café or full restaurant?",
      "answer": "The Witte has the Tremblay Family Café, but its current official visitor information says the café is CLOSED for renovation. Do not plan on eating there until the museum announces reopening. The Witte allows food and drink only in designated outdoor picnic areas, not inside museum galleries.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.wittemuseum.org/wp-content/uploads/2026/02/1.9.26_VisitorGuide.pdf",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are food and drinks allowed inside the Witte galleries?",
      "answer": "No. The museum directs visitors to enjoy food and drink outside at picnic tables rather than inside galleries. Families who bring snacks should build an outdoor stop into the schedule.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are wheelchairs available and how far is the parking walk?",
      "answer": "The Witte provides complimentary nonmotorized wheelchairs on request with an ID deposit. Visitor questions specifically raise the walking distance from the garage; consult the current museum map or contact the admissions desk for an accessible drop-off route.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ-g60956-d103611-Witte_Museum.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When is Witte general admission free for Bexar County residents?",
      "answer": "Its visitor page lists free general admission for Bexar County residents on Tuesdays from 3 to 6 p.m. Bring any identification required by the current admission policy and confirm whether special exhibitions have extra charges.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are special exhibitions included with Witte admission?",
      "answer": "Some exhibitions are included with general admission and others may require a surcharge. Check the specific exhibition's ticket rules, particularly for short-run traveling shows, rather than assuming every gallery is covered.",
      "verificationUrl": "https://www.wittemuseum.org/plan-your-visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ-g60956-d103611-Witte_Museum.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "museum-of-the-big-bend-alpine": [
    {
      "question": "Where is the Museum of the Big Bend and where do visitors park?",
      "answer": "The museum is on the Sul Ross State University campus in Alpine. The official directions specify Entrance Four from Harrison Street, with visitor parking across the street from the museum.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Museum of the Big Bend appropriate for young children?",
      "answer": "Yes for families interested in maps, regional history and landscapes, though the experience is more interpretive than a hands-on children's science museum. The visitor page lists admission as free for children 12 and under; verify this when planning.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long should I allow at the Museum of the Big Bend?",
      "answer": "A focused visit of around one to two hours is a reasonable editorial estimate for the regional galleries. Add time for changing art displays, detailed reading or booked guided tours rather than treating the estimate as a fixed requirement.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum accessible to wheelchair users?",
      "answer": "The institution describes the museum as handicap accessible. Visitors with specific mobility or sensory needs should check current entrance and gallery arrangements directly, especially if combining the museum with a campus walk.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I book a private museum tour for a group?",
      "answer": "The museum lists staff-guided private tours for groups of eight or more and an advance reservation requirement. Check its current booking window, fee and school-group policies before making plans.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I bring my dog into the Museum of the Big Bend?",
      "answer": "The museum's official visitor information does not allow pets inside, with exceptions for service animals recognized under the ADA. Make separate arrangements for pets before arriving on campus.",
      "verificationUrl": "https://www.museumofthebigbend.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is there a café or restaurant inside the Museum of the Big Bend?",
      "answer": "The museum's current public visit page does not clearly establish an on-site cafeteria, café or table-service restaurant. For a reliable meal break, plan on dining separately in Alpine unless visitor services confirms a current food option.",
      "verificationUrl": "https://www.museumofthebigbend.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthebigbend.com/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "panhandle-plains-historical-museum-canyon": [
    {
      "question": "Is the Panhandle-Plains Historical Museum open for indoor visits?",
      "answer": "No regular indoor visit should be assumed. The museum currently describes its building as temporarily closed for needed improvements and directs visitors to closure updates; check that notice before traveling to Canyon.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can families still attend Panhandle-Plains programs during the closure?",
      "answer": "The museum says its staff continue traveling exhibitions, pop-up programs and community activities even while the museum building is closed. Consult the current events calendar to confirm a specific family program.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I see Panhandle-Plains collections or exhibitions online?",
      "answer": "The museum's public site links a virtual tour and resources about its collections. Use those remotely during the building closure; a virtual tour does not imply that any pictured room is currently open to visitors.",
      "verificationUrl": "https://www.panhandleplains.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I buy regular gallery tickets right now?",
      "answer": "Do not buy travel or arrange a field trip on the assumption that normal admission is available. The building is described as closed; use the museum's official updates to learn if particular off-site programs or special events require registration.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum still operating or permanently closed?",
      "answer": "The operator explicitly describes a temporary building closure, not dissolution of the institution. Its staff continue education and public programs; reopening depends on improvement planning and future announcements.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What else should I plan around a future visit to Canyon?",
      "answer": "Treat Canyon and the Palo Duro region as a separate itinerary until indoor museum access is confirmed. Research other independently open attractions before traveling; do not confuse outdoor access elsewhere with museum availability.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are food service and other museum amenities currently available?",
      "answer": "The museum building is temporarily closed, so do not plan on a gallery visit, museum café or other on-site visitor amenities. Consult the institution's closure updates for events at separate locations and for any eventual reopening arrangements.",
      "verificationUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "george-ranch-historical-park": [
    {
      "question": "When can the general public visit George Ranch Historical Park?",
      "answer": "The ranch advertises general public admission on Saturdays from 9 a.m. to 5 p.m. Weekday field trips and tours are normally pre-booked Tuesday through Friday; verify special dates before making a drive.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long does a George Ranch visit take?",
      "answer": "Its official FAQ recommends three to four hours and advises arriving by 1:30 p.m. Visitors interested in several houses and demonstrations may need that much time because the site covers a broad outdoor area.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is George Ranch suitable for small children and strollers?",
      "answer": "Families can see living-history demonstrations and animals, but much of the ranch is outdoors. The operator describes a nearly one-mile paved loop and a tractor-pulled tram; check historic-house entry restrictions and weather before bringing a stroller.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the ranch have a restaurant, cafeteria or picnic option?",
      "answer": "Visitors are encouraged to bring a picnic lunch. The Visitor Center sells cold drinks and treats, but that is not the same as a full cafeteria or table-service restaurant; outside alcohol is prohibited.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is there parking, and can you ride horses?",
      "answer": "The ranch FAQ says it provides free parking. Horses may be present as part of ranch operations, but there are no guest horseback rides; do not mistake living-history livestock for a trail-riding attraction.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are pets allowed at George Ranch?",
      "answer": "Pets are not permitted on the property; trained task-performing service animals are allowed. Arrange care for pet dogs before visiting.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is all of George Ranch outdoors?",
      "answer": "No. Some historic buildings are climate-controlled, but much of the route and many demonstrations are outdoors and weather-dependent. The operator recommends comfortable closed-toe shoes, hydration and weather-appropriate clothing.",
      "verificationUrl": "https://www.georgeranch.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can someone using a wheelchair explore the historic buildings and tram?",
      "answer": "The operator lists wheelchair ramps for first-floor access at three historic homes, a wheelchair-accessible tractor tram, marked accessible parking and accessible restrooms. Not every historic space is necessarily barrier-free, so consult the specific route information before traveling.",
      "verificationUrl": "https://www.georgeranch.org/visit/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.georgeranch.org/visit/accessibility/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does George Ranch offer teacher, veteran or military admission discounts?",
      "answer": "The museum's official admissions page lists free general admission for local teachers with school identification and a reduced veteran or active-service admission tier. Older visitor reviews describe different benefits; follow the museum's current published terms, which can change for special events.",
      "verificationUrl": "https://www.georgeranch.org/visit/hours-admissions-directions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.tripadvisor.com/Attraction_Review-g56542-d140031-Reviews-The_George_Ranch-Richmond_Texas.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "texas-maritime-museum-rockport": [
    {
      "question": "Which Texas Maritime Museum exhibitions are scheduled for fall 2026?",
      "answer": "As checked October 14, 2026, the museum advertises Built for Victory (September 30–December 31, 2026), about World War I wooden shipbuilding along the Texas coast, including Orange, Beaumont, Houston, Aransas Pass and Rockport. The operator says the temporary exhibit is in the Main Exhibit Gallery during regular Tuesday–Saturday hours. This is a dated 2026 program, not a permanent exhibit; verify current availability.",
      "verificationUrl": "https://texasmaritimemuseum.org/event/built-for-victory/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/event/built-for-victory/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-14"
    },
    {
      "question": "What is the museum's 2026 Tides of Freedom exhibition?",
      "answer": "Tides of Freedom: Spain & the Battle for American Independence is the museum's 2026 temporary exhibit (scheduled February 2–December 31, 2026). It follows Bernardo de Gálvez, Spanish Gulf and Mississippi campaigns, and support supplied from Texas cattle herds during the Revolutionary War. The museum publishes viewing hours Tuesday–Saturday, 10 a.m.–4 p.m. Confirm before travel; the announced exhibit has a December 2026 end date.",
      "verificationUrl": "https://texasmaritimemuseum.org/event/tides-of-freedom/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/event/tides-of-freedom/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-14"
    },
    {
      "question": "How much does admission to the Texas Maritime Museum cost?",
      "answer": "The museum currently advertises pay-what-you-can, donation-based general admission. This is not necessarily a zero-cost visit for every program; check separately for education events or special activities.",
      "verificationUrl": "https://texasmaritimemuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Texas Maritime Museum good for children?",
      "answer": "Yes. The museum advertises a children's exhibit area and age-specific education programs including STEAM activities and camps. A short visit concentrating on shipwrecks, fishing and interactive displays works well for many families.",
      "verificationUrl": "https://texasmaritimemuseum.org/museum-education-department/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/museum-education-department/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What will I see at the Texas Maritime Museum?",
      "answer": "Exhibit topics include shipbuilding, shipwrecks, Texas coastal industries, fishing and Indigenous maritime connections, in addition to changing special exhibitions. This is a coastal history museum rather than an aquarium.",
      "verificationUrl": "https://texasmaritimemuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What are the museum's regular visitor hours?",
      "answer": "The operator currently lists Tuesday through Saturday, 10 a.m. to 4 p.m. Always recheck for holidays or special-event changes before driving to Rockport.",
      "verificationUrl": "https://texasmaritimemuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can a school or group arrange a guided visit?",
      "answer": "Yes. The education department describes group tours by appointment and separate school-tour arrangements. Verify current requirements, any charges and group size directly with the museum.",
      "verificationUrl": "https://texasmaritimemuseum.org/museum-education-department/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/museum-education-department/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is there a full-service restaurant or cafeteria inside the Texas Maritime Museum?",
      "answer": "Current museum visitor and education pages do not clearly advertise an on-site cafeteria or sit-down restaurant. Plan a meal in Rockport rather than assuming food service inside, and contact the museum if refreshments are essential for your group.",
      "verificationUrl": "https://texasmaritimemuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://texasmaritimemuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "national-museum-pacific-war": [
    {
      "question": "How many hours should I allow for the National Museum of the Pacific War?",
      "answer": "For a highlights visit allow at least two to three hours; visitors who carefully read the exhibits often recommend substantially longer or splitting their visit. Several museum locations and outdoor areas require walking between them.",
      "verificationUrl": "https://www.pacificwarmuseum.org/visit",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g55863-d106301-t2183076-How_long_does_it_take_to_tour_the_museum.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does one ticket cover the whole museum?",
      "answer": "Current general admission covers the major museum galleries and Pacific Combat Zone exhibits for the selected admission date. The separate immersive experience The Rescue requires an add-on ticket; verify specific inclusion before purchase.",
      "verificationUrl": "https://www.pacificwarmuseum.org/purchase-tickets",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.pacificwarmuseum.org/purchase-tickets",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where can I park near the National Museum of the Pacific War?",
      "answer": "The museum is spread across central Fredericksburg rather than one isolated car park. Visitors have asked repeatedly about parking; consult the museum map and current City of Fredericksburg parking information instead of assuming parking immediately at every exhibit.",
      "verificationUrl": "https://www.pacificwarmuseum.org/visit",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g55863-d106301-t5771893-What_about_parking.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are the Japanese Garden of Peace and Memorial Courtyard free?",
      "answer": "The museum's ticket page describes the Memorial Courtyard and Japanese Garden of Peace as free public areas. They have their own operating access conditions; check today's museum information before arrival.",
      "verificationUrl": "https://www.pacificwarmuseum.org/purchase-tickets",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.pacificwarmuseum.org/purchase-tickets",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum appropriate for young children?",
      "answer": "The Pacific War galleries include intense combat history and personal accounts. Adults should decide what is age-appropriate for their children; shorter visits, the garden and age-guided interpretation can be better than attempting every immersive experience.",
      "verificationUrl": "https://www.pacificwarmuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.pacificwarmuseum.org/visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When does the Pacific Combat Zone close?",
      "answer": "The museum lists the Pacific Combat Zone as closing earlier than the main galleries, typically at 3 p.m. Plan that part first if it matters to you; dates, demonstrations and timed performances should be verified separately.",
      "verificationUrl": "https://www.pacificwarmuseum.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.pacificwarmuseum.org/visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can we eat in the Pacific War museum galleries?",
      "answer": "No. Published visitor guidelines prohibit food and drink in the galleries. Plan meals at restaurants in Fredericksburg and build a break into any extended visit.",
      "verificationUrl": "https://www.pacificwarmuseum.org/visit/accessibility-covid-guidelines",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.pacificwarmuseum.org/visit/accessibility-covid-guidelines",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    }
  ],
  "frontier-texas": [
    {
      "question": "How long does it take to visit Frontier Texas!?",
      "answer": "Allow roughly one and a half to two hours if you want to watch the orientation theater and read the exhibits rather than walk straight through. Actual time varies with interest and group size; this question is explicitly raised by visitors.",
      "verificationUrl": "https://www.frontiertexas.com/visit/",
      "questionOrigin": "visitor-qna",
      "questionEvidenceUrl": "https://www.tripadvisor.com/FAQ_Answers-g30138-d549974-t3907559-How_long_should_I_allow_to_visit_the_museum.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Frontier Texas! a good museum for kids?",
      "answer": "It has immersive frontier storytelling and a theater element that can engage school-age children. Sensitive historical themes and sound effects may be less suitable for some very young children; adults should choose an appropriate pace.",
      "verificationUrl": "https://www.frontiertexas.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What time is the last Frontier Texas! theater show?",
      "answer": "The museum's visit page lists last normal theater showings at 4:30 p.m. Monday through Saturday and 3:30 p.m. Sunday, earlier than the building close. Holiday schedules can alter the timing.",
      "verificationUrl": "https://www.frontiertexas.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Frontier Texas! only a museum or also a visitor center?",
      "answer": "It serves as the official visitor center for Abilene and the Texas Forts Trail Region as well as a Western heritage attraction. Stop there for regional trip ideas after seeing the exhibits.",
      "verificationUrl": "https://www.frontiertexas.com/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I buy souvenirs or gifts at Frontier Texas!?",
      "answer": "Yes. The on-site General Store sells Texas-themed books, clothing, gifts and local goods. That is retail service, not proof that the museum has a full-service restaurant; arrange meals separately.",
      "verificationUrl": "https://www.frontiertexas.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Frontier Texas! open while the expansion work continues?",
      "answer": "The museum's construction update says it remains open during its facility expansion. Check the current update and the visitor page for changing access, parking and temporary gallery arrangements.",
      "verificationUrl": "https://www.frontiertexas.com/museum-updates/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/museum-updates/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I buy a meal at Frontier Texas! or is there only a gift shop?",
      "answer": "Frontier Texas! advertises its General Store for gifts and souvenirs, but its published visitor information does not establish a cafeteria or full-service restaurant. Plan a separate meal in Abilene rather than assuming on-site dining.",
      "verificationUrl": "https://www.frontiertexas.com/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.frontiertexas.com/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "texas-energy-museum-beaumont": [
    {
      "question": "What does the Texas Energy Museum explain?",
      "answer": "The museum introduces the 1901 Spindletop discovery, the geology and engineering of petroleum extraction, and how oil transformed Beaumont and modern industry. Its exhibits are educational rather than an operating refinery tour.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Texas Energy Museum suitable for children?",
      "answer": "Yes. The museum's own visit guide promotes interactive displays for all ages and separate educational programs. For younger children, focus on a few hands-on displays rather than expecting them to follow every technical detail.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can schools and organized groups book tours?",
      "answer": "The museum advertises group rates by reservation and educational materials tailored to different ages. Contact the museum before arrival to confirm group fees, staffing and available programs.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where is the Texas Energy Museum located?",
      "answer": "Its visitor page places it at 600 Main Street in downtown Beaumont. For accessibility, parking and building entry, confirm the current approach with the museum rather than assuming the historic downtown street layout is unchanged.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the Texas Energy Museum have a cafeteria or restaurant?",
      "answer": "Its current public visit information does not clearly describe a dedicated on-site café or restaurant. Plan a downtown Beaumont meal separately unless the museum confirms food service for your visit.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Texas Energy Museum the same as the Spindletop-Gladys City Boomtown Museum?",
      "answer": "No. The Texas Energy Museum is a downtown Beaumont interpretive museum focused on energy history and technology; Spindletop-Gladys City Boomtown is a separate destination. They complement one another but have separate visits and policies.",
      "verificationUrl": "https://www.texasenergymuseum.org/visit1.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasenergymuseum.org/visit1.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    }
  ],
  "1940-air-terminal-museum-houston": [
    {
      "question": "Is the 1940 Air Terminal Museum still open to visitors?",
      "answer": "No. The Houston Aeronautical Heritage Society's official homepage states that the museum has ceased operations. A March 2, 2026 closure announcement overrides older indexed pages that still show tickets, hours and visitor directions.",
      "verificationUrl": "https://www.1940airterminal.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.click2houston.com/news/local/2026/07/01/texas-historical-commission-signs-short-term-lease-for-1940-air-terminal-museum-pauses-artifact-removal/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Why did the 1940 Air Terminal Museum close in 2026?",
      "answer": "The former operator described unsustainable finances and lease difficulties. Its May 2026 letter said the nonprofit had defaulted on the lease and was preparing to vacate; a later Texas Historical Commission lease allowed preservation assessment, but not public reopening.",
      "verificationUrl": "https://www.1940airterminal.org/news/hahs-letter-to-city-of-houston-amp-thc",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.click2houston.com/news/local/2026/07/01/texas-historical-commission-signs-short-term-lease-for-1940-air-terminal-museum-pauses-artifact-removal/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can you buy tickets or tour the old 1940 terminal building?",
      "answer": "No public museum ticket should be assumed available. The former museum is closed, and the building stands on an operating airport site. Avoid attempting to enter museum galleries, hangars or other airport premises without advance authorization.",
      "verificationUrl": "https://www.1940airterminal.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.1940airterminal.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What was displayed at Houston's 1940 Air Terminal Museum?",
      "answer": "The former galleries interpreted Houston aviation from early flights through the jet era, including historic airline photographs, uniforms, business aviation, models and accounts of the Women Airforce Service Pilots. This describes former exhibitions, not an active visitor program.",
      "verificationUrl": "https://www.1940airterminal.org/houston-municipal-airport",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.1940airterminal.org/houston-municipal-airport",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Will the 1940 Air Terminal Museum reopen as a Texas historic site?",
      "answer": "Reopening is not confirmed. In July 2026, the Texas Historical Commission leased the property temporarily to evaluate preservation and the possible future of the building and collections. A study, lease or historic designation is not a museum-opening announcement.",
      "verificationUrl": "https://www.1940airterminal.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.click2houston.com/news/local/2026/07/01/texas-historical-commission-signs-short-term-lease-for-1940-air-terminal-museum-pauses-artifact-removal/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the old museum have a working cafeteria, accessible tour or public parking?",
      "answer": "Not as an operating museum. Historical visitor instructions about parking or museum facilities should not be used to plan a visit after the closure. The terminal is at an active airport, so arrange any access questions with the responsible operator.",
      "verificationUrl": "https://www.1940airterminal.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.1940airterminal.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "african-american-museum-dallas-fair-park": [
    {
      "question": "Is admission to the African American Museum in Dallas free?",
      "answer": "Yes. Normal individual admission is free without an advance ticket, according to the museum. Reserved field trips or tours with more than ten people have different booking and possible charge requirements. Do not pay an unrelated ticket reseller for entry.",
      "verificationUrl": "https://aamdallas.org/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What are the African American Museum Dallas opening hours?",
      "answer": "The official page is internally inconsistent: its main hours table says Tuesday–Saturday 10 a.m.–5 p.m., while the detailed FAQ says Tuesday–Friday 11 a.m.–5 p.m. and Saturday 10 a.m.–5 p.m. The State Fair note lists daily 10 a.m.–7 p.m. during the fair. A temporary-closure banner gives no year. Call the museum at 214-565-9026 to verify opening, Gate 5, and event-day access before travel.",
      "verificationUrl": "https://aamdallas.org/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where should I park and which Fair Park gate should I use?",
      "answer": "The operator directs most visitors to enter Fair Park through Gate 5 at 3536 Grand Avenue. Parking is generally available, but event days such as the State Fair can involve fees, security controls and different entry arrangements.",
      "verificationUrl": "https://aamdallas.org/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Nelson Mandela exhibition suitable for young children?",
      "answer": "The current Mandela exhibition is recommended for ages eleven and up; families are welcome, but its accounts of apartheid, injustice and imprisonment may be emotionally intense for younger visitors. Adults should consider each child's readiness.",
      "verificationUrl": "https://aamdallas.org/nelson-mandela-exhibition-plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://aamdallas.org/exhibits/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How much time should I spend at the African American Museum Dallas?",
      "answer": "Allow about 60 to 90 minutes for the Mandela exhibition's four gallery environments, according to its official visitor guide. A longer visit makes sense if other galleries or public programs are available that day.",
      "verificationUrl": "https://aamdallas.org/nelson-mandela-exhibition-plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the museum have a cafeteria or allow outside food?",
      "answer": "The museum's visitor FAQ says food and drinks are not permitted inside, and there are no bag-lunch facilities within the institution. Do not assume it has a cafeteria or full-service restaurant; arrange meals elsewhere in Dallas or Fair Park.",
      "verificationUrl": "https://aamdallas.org/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum wheelchair accessible and reachable by public transit?",
      "answer": "The operator describes wheelchair-accessible exhibition spaces and subtitled media for the Mandela show. DART rail service reaches Fair Park Station, but visitors should confirm the best gate and accessible walking route on the day of the visit.",
      "verificationUrl": "https://aamdallas.org/nelson-mandela-exhibition-plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can a teacher book a school tour without reservations?",
      "answer": "No. The museum requires large groups and school tours to request and confirm a reservation in advance, even though ordinary individual admission is free. Ask about appropriate exhibition content and any charges before arriving with students.",
      "verificationUrl": "https://aamdallas.org/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aamdallas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "texas-forestry-museum-lufkin": [
    {
      "question": "Is admission to the Texas Forestry Museum in Lufkin free?",
      "answer": "Yes. The museum says general admission is free, with donations gratefully accepted. Special educational programs, booked group sessions and some events may carry separate charges, so check the specific reservation page before booking.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Texas Forestry Museum suitable for toddlers and younger children?",
      "answer": "Yes. The Children's Wing, indoor train table, sawmill play setting, scavenger hunts, Nature Playscape and nature-art activities are suited to family learning. Adults should choose age-appropriate outdoor activities and supervise children around railroad equipment.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/exhibit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What can you see at the Texas Forestry Museum?",
      "answer": "Highlights include the Sawmill Town history exhibits, Paper Mill Room, historic logging train and caboose, a children's area and outdoor Urban Wildscape Trail. The interpretive focus is Texas forest history and products, not only botanical displays.",
      "verificationUrl": "https://www.treetexas.com/exhibit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/exhibit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long should a visit to the Texas Forestry Museum take?",
      "answer": "Allow roughly one to two hours for the indoor exhibits and selected outdoor highlights; families using the nature playscape or following the approximately 0.4-mile trail may prefer a longer visit. This is an independent planning estimate.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/exhibits/urban-wildscape-trail",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can someone using a wheelchair or with sensory sensitivities visit?",
      "answer": "The museum advertises accessible restrooms, paved outdoor paths, ramps to the locomotive and Children's Wing, and free sensory backpacks. Not every outdoor surface or event is identical, so ask staff for the recommended route when arranging a visit.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Do Texas Forestry Museum school and adult tours require reservations?",
      "answer": "Yes. The official tour program asks school and organized adult groups to book ahead. Sawmill, paper-mill and outdoor railway topics can be combined. The separate adult tour form lists a fee for groups from outside Angelina County.",
      "verificationUrl": "https://www.treetexas.com/exhibits-1/paper-mill-room",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/blank-6",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is there a museum cafeteria, restaurant or somewhere to eat a picnic?",
      "answer": "The museum visitor page advertises bottled water, a drinking fountain and outdoor picnic tables, but does not document a full-service on-site restaurant. Plan a picnic or meal elsewhere in Lufkin rather than assuming indoor food service.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Texas Forestry Museum open on Sunday or holidays?",
      "answer": "The operator lists Monday through Saturday, 10 a.m. to 5 p.m., with closures on major holidays. Sunday is not included in its regular visiting schedule; consult the official page for holiday events and exceptions.",
      "verificationUrl": "https://www.treetexas.com/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.treetexas.com/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "babe-didrikson-zaharias-museum-beaumont": [
    {
      "question": "Is admission to the Babe Didrikson Zaharias Museum free?",
      "answer": "Yes. The museum's official visitor FAQ and the Babe Didrikson Zaharias Foundation both list free regular admission. Call the museum if planning an organized group or a special event, since ordinary admission terms do not guarantee a hosted tour.",
      "verificationUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Babe Zaharias Museum open on Saturdays?",
      "answer": "Published hours conflict: the museum and Babe Zaharias Foundation say Monday–Saturday 9 a.m.–5 p.m., but Beaumont's municipal facility listing says Monday–Friday and Saturday closed. Telephone 409-833-4622 before making a Saturday or holiday trip; no one schedule can be treated as confirmed.",
      "verificationUrl": "https://bdzfoundation.com/contact/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.beaumonttexas.gov/facilities/facility/details/Babe-Zaharias-Museum-Visitor-Center-74",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where is the Babe Didrikson Zaharias Museum located?",
      "answer": "The museum is at 1750 I-10 Frontage Road in Beaumont, in a distinctive circular brick building near the freeway. Do not confuse the museum with nearby Babe Zaharias Park or her namesake golf course, which are different locations.",
      "verificationUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What sporting achievements and trophies can visitors see at the museum?",
      "answer": "The museum interprets Babe's track-and-field and golf careers and displays awards, memorabilia and the famous Dead Head golf trophy. Exhibit availability may change, so confirm any object you especially want to see before making the trip.",
      "verificationUrl": "https://www.babezahariasmuseum.com/babe-zaharias/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Babe Zaharias Museum suitable for children?",
      "answer": "School-age children interested in athletes, Olympic records and women's sports may enjoy the museum's stories and memorabilia. It is an interpretive sports-history museum, not a confirmed hands-on children's science or play museum.",
      "verificationUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/babe-zaharias/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long should I plan to spend at the Babe Zaharias Museum?",
      "answer": "About 45–90 minutes is a reasonable independent estimate for a focused visit to the museum exhibits. This is not an operator-guaranteed visit length; visitors with a special interest in sports history may wish to allow longer.",
      "verificationUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/babe-zaharias/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is Babe Zaharias Museum wheelchair accessible?",
      "answer": "The Babe Zaharias Foundation describes the Museum & Visitor Center as accessible and welcoming to disabled visitors, but the public pages do not fully specify step-free gallery routes, accessible parking or sensory features. Confirm your particular needs directly with museum staff.",
      "verificationUrl": "https://bdzfoundation.com/contact/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://bdzfoundation.com/contact/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does Babe Zaharias Museum have a cafeteria or restaurant?",
      "answer": "The museum's official visitor and foundation pages do not clearly establish an on-site café, cafeteria or full-service restaurant. Plan to eat elsewhere in Beaumont rather than assuming food service is available inside the museum.",
      "verificationUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "20th-century-technology-museum-wharton": [
    {
      "question": "What are the real opening hours for the 20th Century Technology Museum?",
      "answer": "The technology museum's own visitor notice, updated for 2025, states Tuesday and Thursday 11 a.m.–3 p.m., while the host Wharton County Historical Museum lists Monday–Friday 9 a.m.–4 p.m. These are different schedules; call 979-488-7773 to confirm access to the technology wing.",
      "verificationUrl": "https://www.20thcenturytech.com/location.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.whartoncountymuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is there an admission charge to visit the Wharton technology museum?",
      "answer": "Both the technology museum's independent visitor page and the host county museum say admission is free, with voluntary donations encouraged. That does not establish whether an organized program or separate special event has a fee.",
      "verificationUrl": "https://www.20thcenturytech.com/location.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.20thcenturytech.com/location.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where is the 20th Century Technology Museum today?",
      "answer": "The current museum is housed with Wharton County Historical Museum at 3615 North Richmond Road, Wharton, Texas. Older descriptions refer to its original 2005 location in the former county jail, but the combined building opened in 2012.",
      "verificationUrl": "https://www.20thcenturytech.com/location.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.whartoncountymuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are the arcade games and old computers available for visitors to play?",
      "answer": "The host operator lists vintage arcade machines and personal computers among the exhibits, but does not guarantee that every device is switched on or available for unsupervised use. Ask a museum docent which demonstrations are available that day.",
      "verificationUrl": "https://www.whartoncountymuseum.org/tech-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.20thcenturytech.com/location.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What makes Wharton's technology museum enjoyable for children?",
      "answer": "Younger visitors can compare toys, computers and 1970s–1980s arcade cabinets with the modern devices they know. It is a dense collection-oriented museum rather than a dedicated toddler play center, so parents should select activities based on age and interest.",
      "verificationUrl": "https://www.whartoncountymuseum.org/tech-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.whartoncountymuseum.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What exhibits are inside the 20th Century Technology Museum?",
      "answer": "The host's current exhibit page highlights old personal computers, toys, arcade machines and airplanes. Historical descriptions also discuss household electronics, radios and telephones; check today's exhibit arrangement before expecting every older object to be on display.",
      "verificationUrl": "https://www.whartoncountymuseum.org/tech-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200001087",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I visit the technology museum and Wharton County Museum together?",
      "answer": "Yes, the technology wing is part of the same current Wharton County Historical Museum complex at 3615 North Richmond Road, but the wing publishes more limited hours. Call before arrival if you want to see both on the same visit.",
      "verificationUrl": "https://www.whartoncountymuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.20thcenturytech.com/location.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does Wharton's technology museum have a restaurant or cafeteria?",
      "answer": "Neither the contemporary host's visit page nor the museum's independent visiting instructions establishes an on-site restaurant or cafeteria. Plan to dine elsewhere in Wharton and ask the museum about water and food policies for groups.",
      "verificationUrl": "https://www.whartoncountymuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.whartoncountymuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "elisabet-ney-museum-austin": [
    {
      "question": "Is the Elisabet Ney Museum open to visitors in October 2026?",
      "answer": "No. The City of Austin says the museum is closed for renovations that began December 30, 2024. Regular interior gallery admission and tours are not currently offered, even though the official site may list separate events and online collections.",
      "verificationUrl": "https://www.austintexas.gov/ney",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When will Elisabet Ney Museum reopen after renovation?",
      "answer": "Austin currently anticipates reopening in spring 2027, but that is a projected season, not a confirmed reopening date or ticket offer. Check the city museum page and renovation updates for an actual reopening announcement before planning a visit.",
      "verificationUrl": "https://www.austintexas.gov/parks/projects/elisabet-ney-museum-improvements",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I walk around Formosa or see Ney's sculpture while the building is closed?",
      "answer": "The city has not established normal public museum access during construction. Some separately announced landscape programs and events may take place at 304 East 44th Street, but that does not mean sculpture galleries or studio interiors are open. Follow the specific event instructions.",
      "verificationUrl": "https://www.austintexas.gov/ney/programs-education",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What can I see online from the Elisabet Ney Museum collections?",
      "answer": "The City of Austin advertises the online exhibition Elisabet Ney: Art for Humanity's Sake, bringing together more than eighty items from the collection. It is a useful way to explore her portrait sculpture during the physical museum renovation.",
      "verificationUrl": "https://www.austintexas.gov/ney/elisabet-ney-museum-exhibits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney/programs-education",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Which famous Texans did Elisabet Ney sculpt in Austin?",
      "answer": "Ney made portraits of Sam Houston and Stephen F. Austin as part of her Texas work at Formosa. Her European work also portrayed figures such as Otto von Bismarck and Arthur Schopenhauer. Historic display information does not guarantee those objects are physically viewable while the museum is closed.",
      "verificationUrl": "https://www.austintexas.gov/ney/about-elisabet-ney-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney/elisabet-ney-museum-exhibits",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Elisabet Ney Museum free, and do I need a ticket now?",
      "answer": "The City of Austin describes the museum's ordinary admission as free, but the building is presently closed for renovation, so there is no normal ticketed interior visit. Any separately scheduled event may have its own access and registration instructions.",
      "verificationUrl": "https://www.austintexas.gov/ney",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does Elisabet Ney Museum offer accessible family or school programming during construction?",
      "answer": "Normal on-site tours are suspended. Austin advertises the Breaking the Mold mobile art education initiative and separately announced events, but those programs differ from opening the historic house. For accessibility and school participation in any specific event, contact the museum directly.",
      "verificationUrl": "https://www.austintexas.gov/ney/programs-education",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/ney/contact",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ],
  "amon-carter-museum-american-art-fort-worth": [
    {
      "question": "Is Amon Carter Museum admission free, including special exhibitions?",
      "answer": "The Carter says museum admission is always free, including current regular gallery exhibitions; individual special events may carry their own fee. Confirm the event listing rather than paying a general-admission ticket reseller.",
      "verificationUrl": "https://www.cartermuseum.org/frequently-asked-questions",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.cartermuseum.org/frequently-asked-questions",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What time does the Amon Carter Museum close on Thursdays and Sundays?",
      "answer": "The posted schedule closes at 8 p.m. on Thursdays, 5 p.m. on Tuesday, Wednesday, Friday and Saturday, and 5 p.m. on Sundays after a noon opening. The museum is closed Mondays and selected holidays.",
      "verificationUrl": "https://www.cartermuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the Carter offer a café or a full-service restaurant?",
      "answer": "The Carter offers a locally catered FOOD CART near the Museum Shop serving sandwiches, wraps and small bites; it is not a full-service restaurant or cafeteria. Eating is not permitted in the art galleries, but the plaza and outdoor tables are available.",
      "verificationUrl": "https://www.cartermuseum.org/museum-shop",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.cartermuseum.org/frequently-asked-questions",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where can I park for free during the 2026 Camp Bowie road construction?",
      "answer": "The Carter's lot off Camp Bowie Boulevard remains free and is expected to stay accessible despite work along the street. The museum posts detours and alternatives such as weekend UNT Health Science Center parking and paid nearby lots. Check its roadwork page before leaving.",
      "verificationUrl": "https://www.cartermuseum.org/camp-bowie-boulevard-construction",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the Amon Carter Museum good for toddlers or young children?",
      "answer": "Yes. The Carter advertises early-childhood art programs, family workshops, ARTivity Totes and a second-floor family pop-up area, although that pop-up space is not open every day. Parents can ask staff which family activities are available on their visit.",
      "verificationUrl": "https://www.cartermuseum.org/plan-your-visit/family-visits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can visitors borrow a wheelchair or stroller at Amon Carter?",
      "answer": "Yes. Free wheelchairs and forward-facing strollers are available first-come, first-served at the information desk. Museum entrances and gallery floors are accessible, but wagons pulled behind a visitor are prohibited in galleries.",
      "verificationUrl": "https://www.cartermuseum.org/plan-your-visit/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/plan-your-visit/family-visits",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I photograph the artworks at Amon Carter?",
      "answer": "Personal, noncommercial photographs without flash are allowed for most artworks, unless a particular gallery or artwork prohibits photography. Tripods, monopods, gimbals and selfie sticks are not allowed, and commercial image use requires permission.",
      "verificationUrl": "https://www.cartermuseum.org/plan-your-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.cartermuseum.org/museum-policies/photo-and-video-policy",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are the Georgia O'Keeffe and Statue of Liberty exhibitions open now?",
      "answer": "The Carter lists Georgia O'Keeffe and the Carter through September 2027, The Statue of Liberty from Bartholdi to Warhol through January 3, 2027, and Re/Framed rotations into April 2027. Check exhibition updates before traveling because particular works or spaces can rotate.",
      "verificationUrl": "https://www.cartermuseum.org/exhibitions",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/exhibitions",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How long should I plan to spend at the Carter?",
      "answer": "Roughly one to two hours is a practical independent estimate for visitors choosing highlights and a current temporary exhibition. A full collection or guided program needs more time; the museum does not promise a fixed duration for self-guided visits.",
      "verificationUrl": "https://www.cartermuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.cartermuseum.org/exhibitions",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    }
  ],
  "dallas-museum-of-art": [
    {
      "question": "Is the Dallas Museum of Art free and do I need a ticket?",
      "answer": "General admission is free, but every visitor, including children, needs a general-admission ticket obtained in advance online or at Guest Services. Some temporary exhibitions require an additional paid reservation; free entry does not guarantee access to all shows.",
      "verificationUrl": "https://dma.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "When is Dallas Museum of Art open during the week?",
      "answer": "The museum's current public schedule is Wednesday through Sunday, 11 a.m.–5 p.m., closed Mondays and Tuesdays and on Thanksgiving, Christmas and New Year's Day. Its café and special events follow separate calendars.",
      "verificationUrl": "https://dma.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the DMA have a restaurant or just a snack counter?",
      "answer": "The DMA Cafe near the north entrance is a real café with soups, salads, sandwiches and drinks, usually Wednesday through Sunday 11 a.m.–4 p.m. Separately, the plaza's Al Fresco stand offers desserts and beverages on selected event dates. Neither is a full-service formal restaurant.",
      "verificationUrl": "https://dma.org/visit/dma-cafe",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How much does it cost to park at the Dallas Museum of Art?",
      "answer": "The museum uses a paid underground garage and has advertised a $25 card-only garage fee for certain 2026 museum programs; that is not a promise of a universal rate at every date or time. Check current garage pricing before your visit and consider local transit.",
      "verificationUrl": "https://cms.dma.org/visit/DMA-Free-First-Sundays",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I bring a baby bottle, snacks or a stroller into the galleries?",
      "answer": "Children are welcome, but no food or beverages, including baby bottles and children's snack cups, are permitted in the art galleries. Strollers are allowed subject to visitor guidelines, and visitors under age twelve require adult supervision.",
      "verificationUrl": "https://dma.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does the DMA have wheelchair access and programs for sensory needs?",
      "answer": "All public galleries, entrances and restrooms are wheelchair accessible; a limited number of wheelchairs is available at the north entrance. Accessible garage parking is on P1, P2 and P3, and the museum offers accommodations for sensory, hearing, vision and other needs by prior request.",
      "verificationUrl": "https://dma.org/programs/access-programs",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does a school group need to book ahead at the Dallas Museum of Art?",
      "answer": "School and other organized youth groups of ten or more students must use the separate school group program, reserve at least two weeks ahead and submit any required payment. Public general-admission tickets are not a substitute for school reservations.",
      "verificationUrl": "https://dma.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/programs/school-programs/guided-visits",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Which exhibitions at Dallas Museum of Art are currently available?",
      "answer": "For October 2026 the museum lists X Marks the Spot through November 8, Paradise on Earth: Florals in Indian Textiles through November 15, and ongoing or longer-running Bauhaus, Sonia Boyce and contemporary galleries. Exhibition dates and additional admission rules should be reconfirmed.",
      "verificationUrl": "https://dma.org/art/exhibitions",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Can I do the Dallas Museum of Art in ninety minutes?",
      "answer": "Yes, a 90-minute highlights visit is a reasonable independent planning estimate if you choose two or three collections or exhibitions first. The DMA is much larger than one short gallery route, so a complete exploration takes longer.",
      "verificationUrl": "https://dma.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://dma.org/art/exhibitions",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    }
  ],
  "amarillo-museum-of-art": [
    {
      "question": "Is admission to the Amarillo Museum of Art free?",
      "answer": "Yes. AMoA's official visitor page says that admission is always free. Educational programs or certain ticketed events may still require bookings; check the specific event rather than assuming every course and event is free.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What days and times is Amarillo Museum of Art open?",
      "answer": "Regular public hours are Wednesday through Saturday, 11 a.m. to 5 p.m., and Sunday, 1 p.m. to 5 p.m. The museum is closed Mondays, Tuesdays and specified holidays. Administrative-office hours are not gallery hours.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park when visiting the Amarillo Museum of Art?",
      "answer": "AMoA recommends Amarillo College lots 5 (north) and 6 (east), with designated accessible parking in lot 8 (south). Two museum-reserved spaces are east of the building across Van Buren. Campus parking does not require a permit for visitors.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which entrance should I use at the Amarillo Museum of Art?",
      "answer": "The main visitor entrance is at the Fine Arts Plaza on the building's west side, not the Van Buren administrative door. The official visit page gives driving directions from I-40 and I-27; school groups may use lot 5 for unloading.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Amarillo Museum of Art wheelchair accessible?",
      "answer": "AMoA reports accessible parking in lot 8, ramps at the plaza and lot 5, an elevator connecting its three gallery floors, and loaner wheelchairs on a first-come basis. An additional single-person elevator serves the Van Buren entrance.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I take pictures or sketch inside the Amarillo Museum of Art?",
      "answer": "Personal noncommercial photography is sometimes allowed, depending on the exhibition. Ask about the current rule before shooting, use no flash or tripods where prohibited, and keep a distance from works. Sketchpads with pencil are permitted under posted guidelines; wet media and pens are not.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Amarillo Museum of Art have a cafeteria or full restaurant?",
      "answer": "The museum's visitor guide does not advertise an on-site cafeteria or full-service restaurant, and food or drinks are prohibited in the galleries. Make meal plans elsewhere on or near the Amarillo College campus, rather than assuming food service inside.",
      "verificationUrl": "https://www.amoa.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the 2026 Route 66 photography exhibits still on display?",
      "answer": "No, the operator lists Edward Keating's Route 66 photography exhibit as a past exhibition that ended August 16, 2026. Current highlighted shows include Jack Craft: Land Mass through January 3, 2027 and Hills Snyder: Strays through December 13, 2026; check before travelling.",
      "verificationUrl": "https://www.amoa.org/past-exhibitions",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.amoa.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "holocaust-museum-houston": [
    {
      "question": "How much does a ticket to Holocaust Museum Houston cost?",
      "answer": "The operator currently lists $22 for general adult admission, with separate senior and military rates. Visitors aged 18 and younger and college students with a valid student ID can enter free. Pricing can change, so the museum's Visit page controls.",
      "verificationUrl": "https://hmh.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When can I visit Holocaust Museum Houston for free?",
      "answer": "The museum advertises free admission on Thursdays from 2 to 5 p.m., as well as free regular admission for visitors aged 18 or younger and college students with valid ID. Its special free-date listings change annually, so verify your date directly.",
      "verificationUrl": "https://hmh.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the visiting hours and last entry time at Holocaust Museum Houston?",
      "answer": "The regular schedule is Tuesday through Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., with Monday closures except posted exceptions. Last entry is 4:30 p.m. A shorter late-day visit may not provide enough time for all galleries.",
      "verificationUrl": "https://hmh.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Holocaust Museum Houston have a real café or restaurant?",
      "answer": "Yes, the second-floor Bagel Shop @ The Museum is a café serving bagels, wraps, salads, pastries and coffee, not a formal full-service restaurant. The operator lists Tuesday through Saturday, 10 a.m. to 4 p.m., separately from museum operating hours.",
      "verificationUrl": "https://hmh.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Holocaust Museum Houston wheelchair accessible and are there reduced admission rules?",
      "answer": "All publicly accessible areas are described as wheelchair-accessible, with elevators and loaner manual wheelchairs. The museum admits visitors who identify as having a disability and a primary caregiver free of charge. Contact admissions@hmh.org for accommodations.",
      "verificationUrl": "https://hmh.org/visit/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit/accessibility/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "May I photograph exhibits at Holocaust Museum Houston?",
      "answer": "Photography is generally prohibited in first-floor galleries unless indicated otherwise; non-flash photography is ordinarily allowed on the second floor. The institution can restrict photography at any time, so follow current signs and staff direction.",
      "verificationUrl": "https://hmh.org/visit/tour-and-photo-guidelines/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit/tour-and-photo-guidelines/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I bring a backpack or food to Holocaust Museum Houston?",
      "answer": "Security inspects bags and visitors pass through screening. Large bags and backpacks are restricted; necessary medical equipment receives accommodation from Visitor Services. Outside meals and sack lunches may not be brought into the museum, and gallery food/drink is prohibited.",
      "verificationUrl": "https://hmh.org/visit/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit/tour-and-photo-guidelines/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are guided tours available for schoolchildren and other groups?",
      "answer": "The museum offers guided and self-guided group options. Docent tours last approximately one hour and require one adult chaperone for every fifteen visitors younger than 18. Book school and group experiences before travel and account for intense content.",
      "verificationUrl": "https://hmh.org/visit/tour-and-photo-guidelines/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the 2026 Selling the Myth exhibit appropriate for younger children?",
      "answer": "The museum began featuring Selling the Myth: Nazi Propaganda on October 3, 2026. The exhibition deals with antisemitism and the manipulative use of propaganda. There is no universal age cutoff in the cited listing; adults should consider their child's readiness and contact educators for recommendations.",
      "verificationUrl": "https://hmh.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://hmh.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "san-antonio-museum-of-art": [
    {
      "question": "When is San Antonio Museum of Art free to Bexar County residents?",
      "answer": "Residents who can show Bexar County residency get free general admission Tuesday from 4 to 7 p.m. and on the second Sunday of each month from 10 a.m. to noon. Special exhibition surcharges may still apply, and nonresidents pay normal rates.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much is admission to the San Antonio Museum of Art?",
      "answer": "The museum's current standard price is $24 for adults and free for children aged twelve and younger, with published senior, military, student and SNAP discounts. The SNAP Museums for All rate is $3 per person for up to four qualifying family members, purchased onsite. Recheck before traveling.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How late does SAMA stay open on Tuesdays and Fridays?",
      "answer": "SAMA's galleries are open 10 a.m. to 7 p.m. on Tuesday and Friday, and 10 a.m. to 5 p.m. Wednesday, Thursday, Saturday and Sunday. It closes Mondays and various holidays. Tre Trattoria has a separate evening dining schedule.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does San Antonio Museum of Art have a proper restaurant, not just a snack bar?",
      "answer": "Yes. Tre Trattoria is a separately operated full-service Italian restaurant in the museum's historic Hops House overlooking the river. Its kitchen serves lunch and dinner and dining can continue after galleries close; use the Sculpture Garden or West Courtyard side entrance after museum hours.",
      "verificationUrl": "https://www.samuseum.org/visit/restaurant/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/restaurant/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How does parking work at the San Antonio Museum of Art?",
      "answer": "The public lot opposite the museum uses Metropolis vehicle registration and is not automatically free for nonmembers. Museum members have a separate complimentary parking registration program, and accessible spaces are provided. Guests can also approach by River Walk or VIA bus.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I arrive at the San Antonio Museum of Art from the River Walk?",
      "answer": "Yes. The museum sits on the Museum Reach of the San Antonio River Walk with access for GoRio river taxis. The operator describes approximately ten minutes' walking from the Pearl and roughly thirty minutes from central downtown hotels, depending on route and walking pace.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are wheelchairs and service animals permitted inside SAMA?",
      "answer": "The museum offers first-come loaner wheelchairs and lightweight cane-stools, and service animals are permitted. Pets are not allowed on the museum campus. Visitors who need a precise step-free route through the old brewery can call 210-978-8100.",
      "verificationUrl": "https://www.samuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can Texas school groups visit SAMA for free?",
      "answer": "The official school tour rules state that Texas students and the required chaperones generally receive free admission on a confirmed school booking. Docent tours last about 50 minutes and need at least two weeks' advance reservation, with one adult chaperone for every ten students and separate rules for commercial travel groups.",
      "verificationUrl": "https://www.samuseum.org/visit/tour/public-and-charter-schools/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/tour/public-and-charter-schools/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which ancient art collections are highlights at San Antonio Museum of Art?",
      "answer": "SAMA holds significant galleries devoted to ancient Mediterranean cultures alongside Asian and Latin American art. For short visits, choose a region and compare a few objects; no particular object is guaranteed to be on view at all times. Temporary Etruscan programming is scheduled to begin October 31, 2026.",
      "verificationUrl": "https://www.samuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.samuseum.org/visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "kimbell-art-museum-fort-worth": [
    {
      "question": "Is the Kimbell Art Museum in Fort Worth free to visit?",
      "answer": "The Kimbell's permanent collection is always free, including regular access to its Kahn Building galleries. Special exhibitions are separately ticketed; the museum currently lists $18 for general adult exhibition admission and different reduced rates for eligible visitors.",
      "verificationUrl": "https://kimbellart.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which days is Kimbell Art Museum open late?",
      "answer": "The operator schedules Friday hours from noon until 8 p.m. Tuesdays through Thursdays and Saturdays are 10 a.m. to 5 p.m.; Sundays noon to 5 p.m.; Mondays closed. Last entry to ticketed special exhibitions is 30 minutes before closing.",
      "verificationUrl": "https://kimbellart.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How can I get half-price tickets to a Kimbell special exhibition?",
      "answer": "Kimbell advertises half-price special exhibition admission Tuesday from 10 a.m. to 5 p.m. and Friday from 5 to 8 p.m. Friday discounted tickets must be purchased at the Piano Pavilion box office; verify special-exhibition dates before reserving.",
      "verificationUrl": "https://kimbellart.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/tickets",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is parking free at Kimbell Art Museum?",
      "answer": "Yes. The official visit page describes free parking in the underground garage and the museum's designated Kahn and Kimbell East lots, along with available free on-street parking. Follow the current parking map, since Cultural District events may complicate nearby roads.",
      "verificationUrl": "https://kimbellart.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which Kimbell building and entrance should wheelchair users choose?",
      "answer": "Most campus spaces are accessible, but the west entrance of the Louis Kahn Building is not wheelchair accessible. Use its east entrance on Van Cliburn Way. The Piano Pavilion is accessible through the underground garage and from designated drop-off; staff can assist with transfer between buildings.",
      "verificationUrl": "https://kimbellart.org/visit/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Kimbell Art Museum have a café or full restaurant?",
      "answer": "The Kimbell Café in the Kahn Building serves seated lunch, take-away options and afternoon tea, including a rotating selection of soups, sandwiches and quiche. The Piano Café is currently listed as temporarily closed. It is a museum café, not a formal table-service restaurant.",
      "verificationUrl": "https://kimbellart.org/visit/dine",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit/dine",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can children and visitors with sensory needs use the Kimbell?",
      "answer": "The Kimbell offers free regular collection access, child-friendly learning material, advance-booked sensory hours, social narratives and communication tools. Limited loaner wheelchairs and mobility assistance are available, but check any family studio opening for your chosen day.",
      "verificationUrl": "https://kimbellart.org/visit/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/visit/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the Kimbell's 2026 photography exhibition?",
      "answer": "Photography's First Century: Masterworks from the Bibliothèque nationale de France is scheduled October 4, 2026 through January 17, 2027. It requires a special-exhibition ticket, unlike the museum's permanent collection; check the gallery and booking rules for the date.",
      "verificationUrl": "https://kimbellart.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/tickets",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How far ahead must group tours be arranged at the Kimbell?",
      "answer": "Operator tour guidance asks for at least three weeks' advance notice for arranged docent-led and self-guided group visits. Guided visits generally last about an hour, and the tour format depends on group size and museum availability.",
      "verificationUrl": "https://kimbellart.org/content/tours",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://kimbellart.org/content/tours",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "nasher-sculpture-center-dallas": [
    {
      "question": "Is the Nasher Sculpture Center open on Tuesdays?",
      "answer": "The museum's current Plan a Visit page lists Wednesday through Sunday, 11 a.m.–5 p.m., with Monday and Tuesday closed. An older Hours and Admissions page still shows Tuesday opening; use the current Plan a Visit page and contact the museum about special events.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/hours-admissions",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Nasher Sculpture Center free, and are children free?",
      "answer": "General adult admission is currently $10, while children younger than twelve, members, and qualifying military, first responders, SNAP EBT cardholders and some other groups enter free. Public Free First Saturdays usually waive admission; ticketed events can vary.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Nasher's ticket include the sculpture garden and special exhibitions?",
      "answer": "Yes. The operator says ordinary admission includes interior galleries, outdoor sculpture garden and special exhibitions. Outdoor access may be affected by weather or private events, and particular exhibitions change.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where can visitors park for the Nasher Sculpture Center?",
      "answer": "The Nasher does not operate a general-public parking garage. Paid underground parking is available at Dallas Museum of Art and nearby private garages; metered street parking also exists. Nasher members get complimentary parking at the DMA garage when visiting, subject to availability and proof of membership.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Nasher have an actual cafe or only a snack bar?",
      "answer": "Nasher Cafe serves seasonal soups, salads and sandwiches Wednesday through Sunday from 11 a.m. to 2:30 p.m. A museum admission ticket is required to reach it. Cafe-purchased food and drinks may be consumed in the garden, but do not assume the cafe is accessible separately from museum admission.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/cafe",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/cafe",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Nasher's outdoor sculpture garden wheelchair accessible?",
      "answer": "The operator confirms a curbless main entrance, access to all museum galleries and garden paths with ramps on both sides. Wheelchairs, portable seats, a quiet room and sensory kits are available on request, and service animals are welcome.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Nasher Sculpture Center good for young children?",
      "answer": "It has free family guides, creative activity kits, sensory resources and rotating Free First Saturdays family programming. Children need supervision around vulnerable art; the sculpture garden is an art space, not a playground. A short focused visit is usually more suitable than trying every display.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/visit-resources",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit the Nasher and Dallas Museum of Art in the same day?",
      "answer": "Yes. They are adjacent in the Dallas Arts District and can be paired on foot. They have different admissions and museum experiences: the Nasher specializes in sculpture and a garden, while DMA has a broader world-art collection and its own ticketing rules.",
      "verificationUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.nashersculpturecenter.org/visit/plan-a-visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "national-cowgirl-museum-hall-fame-fort-worth": [
    {
      "question": "Is the National Cowgirl Museum open in late October 2026?",
      "answer": "No. The museum's October 2026 announcement says it will close to the general public beginning October 19 and reopen on November 7 for its expansion celebration. Do not plan a regular gallery visit between October 19 and November 6; special announcements are not general admission.",
      "verificationUrl": "https://thecowgirl.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thecowgirl.org/event/expansion-grand-opening/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When can the public enter the Cowgirl Museum on November 7, 2026?",
      "answer": "The expansion opening announcement schedules a members-only preview beginning at 10 a.m. November 7 and a public opening at noon, with a parade affecting nearby roads. Verify the event details again on the day of travel.",
      "verificationUrl": "https://thecowgirl.org/event/expansion-grand-opening/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thecowgirl.org/event/expansion-grand-opening/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the normal Cowgirl Museum admission prices and hours?",
      "answer": "Outside the announced closure, the museum lists Tuesday–Saturday 10 a.m.–5 p.m., Sunday noon–5 p.m., closed Monday. Standard admission is $10 for adults, $7 seniors, and $4 children ages 4–12. Children three or younger are free with a full-price adult; rates and event admissions may vary.",
      "verificationUrl": "https://thecowgirl.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thecowgirl.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much does parking cost at the National Cowgirl Museum?",
      "answer": "The current museum parking page lists city-managed parking at $6 for up to two hours, $12 for over two hours, and $15 for over three hours, with event-specific charges and member discounts subject to restrictions. Stock Show events and the November opening can change traffic and rates.",
      "verificationUrl": "https://thecowgirl.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thecowgirl.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can children try the Cowgirl Museum's bucking bronc and interactive galleries?",
      "answer": "The Western Design and Bucking Bronc rooms were partially reopened in April 2026 and support hands-on interpretation. They will be affected by the October 19–November 6 closure. New galleries and the carousel are part of the November expansion, not guaranteed before the reopening.",
      "verificationUrl": "https://thecowgirl.org/event/expansion-grand-opening/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thecowgirl.org/news/the-cowgirl-reopens-second-floor-immersive-experiences/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are Cowgirl Museum school field trips running in October 2026?",
      "answer": "The museum says school field trips will resume after Thanksgiving 2026. Do not bring a class expecting walk-in docent tours or a routine October booking. The group visit page also notes reservations and self-guided options for eligible visits.",
      "verificationUrl": "https://thecowgirl.org/field-trips/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thecowgirl.org/field-trips/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is food allowed inside the Cowgirl Museum and is there a restaurant?",
      "answer": "Food and drink are not allowed in museum galleries. The museum recommends outside benches near its entrance and picnic tables in Alice Walton Park for visitor-brought food. Its current plan-a-visit guide does not establish a full-service on-site restaurant.",
      "verificationUrl": "https://thecowgirl.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thecowgirl.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Cowgirl Museum accessible with a wheelchair or stroller?",
      "answer": "Wheelchairs, scooters, walkers and canes are welcome under the museum's mobility-device policy. Oversized and double strollers and wagons are restricted in galleries, as are large bags. The expanded galleries may have different routes once the November reopening is complete, so check accessibility details with visitor staff.",
      "verificationUrl": "https://thecowgirl.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thecowgirl.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the Hitting the Mark Wild West Show gallery?",
      "answer": "It is the museum's permanent exhibition on women who performed in Wild West shows. Interpretive highlights include historic posters, an Annie Oakley presentation, letters and other artifacts. Check whether the gallery has reopened after the expansion work before traveling.",
      "verificationUrl": "https://thecowgirl.org/exhibitions/hitting-the-mark-cowgirls-and-wild-west-shows-gallery/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thecowgirl.org/event/expansion-grand-opening/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "fort-worth-museum-science-history": [
    {
      "question": "Where is the public entrance for the Fort Worth Museum of Science and History in 2026?",
      "answer": "General visitors and members must use the Omni Theater entrance on Lansford Lane. Since August 11, 2026, the former Gendy Street entrance is for school groups, chaperones and field trips only. The Western Heritage Garage accessed via Gate 19 on Gendy is nearest the new public entrance.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Fort Worth Omni Theater included with general museum admission?",
      "answer": "No. The Jane & John Justin Foundation Omni Theater has separately priced tickets and reserved movie times. Public Noble Planetarium shows and the Cattle Raisers Museum are included with regular museum admission, subject to the current schedule and capacity.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is admission to the Fort Worth Museum of Science and History?",
      "answer": "The operator lists museum general admission at $16 for adults ages 12–64, $14 seniors ages 65 and over, $12 children ages 3–11, and free for children under three. Omni Theater film tickets cost extra. Prices and discounts should be rechecked when booking.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should families park, and is parking free?",
      "answer": "The museum suggests the city-managed Western Heritage Garage accessed through Gate 19 on Gendy. The currently published ordinary rates are $6 up to two hours, $12 for two to three hours, and $15 for longer stays. Event dates can carry different rates, and ordinary museum admission does not include parking.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Fort Worth Children's Gallery suitable for a toddler or school child?",
      "answer": "The TCU Children's Gallery focuses on the museum's youngest learners. Its school field-trip rules currently limit the Children's Museum to second grade and below; independent families can choose age-appropriate exhibits such as DinoDig and design activities for older children.",
      "verificationUrl": "https://www.fwmuseum.org/learn/field-trips/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a real café at the Fort Worth Museum of Science and History?",
      "answer": "Yes. Exhibit Café serves sandwiches, salads, flatbreads and other light meals inside the museum, generally Tuesday–Friday 11 a.m.–3 p.m. and Saturday 10:30 a.m.–3 p.m. It is listed as closed Sunday. This is a museum café, not a formal full-service restaurant.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum support wheelchair users and visitors with sensory needs?",
      "answer": "The operator describes wheelchair-accessible public facilities, a limited number of loaner wheelchairs, a Calming Room, sensory backpacks, communication boards and sensory-friendly programs. The Calming Room is reserved for one family at a time.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does a Fort Worth school field trip use the new Lansford Lane public entrance?",
      "answer": "No. Under the August 2026 separation of visitor entrances, field-trip groups and chaperones use the Gendy Street school-group entrance while ordinary visitors use the Lansford Lane/Omni entrance. Book school trips through the separate group program.",
      "verificationUrl": "https://www.fwmuseum.org/learn/field-trips/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should a family allow at the Fort Worth Museum of Science and History?",
      "answer": "A focused family visit of about two to three hours is a reasonable independent estimate. Reserve additional time for a separately ticketed Omni film or limited-seat planetarium show. The museum does not guarantee every exhibition is fully accessible or that every presentation runs continuously.",
      "verificationUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.fwmuseum.org/visit/plan-your-visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "dallas-holocaust-human-rights-museum": [
    {
      "question": "When is Dallas Holocaust and Human Rights Museum closed?",
      "answer": "The current official visitor FAQ lists 10 a.m.–5 p.m. on regular open days with Tuesday closed, plus published holiday exceptions. The entrance to the permanent exhibition closes at 4 p.m., so do not arrive near closing time expecting the full experience.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Dallas Holocaust and Human Rights Museum suitable for a child under 12?",
      "answer": "The museum recommends that visitors be at least 12 because the permanent Holocaust exhibition includes disturbing historical subject matter. Some temporary exhibitions may be more appropriate for younger children. Guardians should evaluate content before booking.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I plan for Dallas Holocaust and Human Rights Museum?",
      "answer": "The institution recommends roughly two to three hours to experience the permanent wings, current special exhibition and theaters. Weekday afternoons after 1 p.m. or weekends can be less busy than school-group mornings.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does a general admission ticket include Dimensions in Testimony?",
      "answer": "Yes, the interactive recorded-survivor theater is part of general admission, along with the permanent exhibition and other museum theaters. A timed reservation from Guest Services is needed when spaces are limited. Admission alone does not guarantee an immediate session.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much are admission and parking at Dallas Holocaust Museum?",
      "answer": "The operator lists general admission at $19 for adults, $17 for certain groups including seniors 55+, and $12 for students. Parking is available across the street at 301 N. Houston; its garage is paid except for qualifying members, and rates can change. DART West End Station is about one block away.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I bring a stroller, backpack or camera to the museum?",
      "answer": "Security screening applies to visitors and belongings. Bags larger than 19×17×8 inches are prohibited; there is no bag or coat check, and strollers are not allowed inside the theaters. Non-flash personal still photography is allowed where permitted, but flash, video, livestreaming, tripods and selfie sticks are prohibited.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Dallas Holocaust Museum have a cafeteria, café or restaurant?",
      "answer": "The current visitor FAQ prohibits outside food and drink but does not identify an operating in-house dining venue. The 'Piccadilly Cafeteria' mentioned in the Pivot to America Wing is a historical interpretation of a Dallas civil-rights sit-in, not a public restaurant inside the museum. Plan food in the nearby West End.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.dhhrm.org/exhibitions/pivot-to-america-wing/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the Dallas Holocaust and Human Rights Museum's permanent galleries?",
      "answer": "The three permanent wings are Holocaust/Shoah, Human Rights, and Pivot to America. Interactive survivor testimony and a reflection room complement them. The Disney Studios and World War II exhibition ended September 10, 2026 and must not be described as current.",
      "verificationUrl": "https://www.dhhrm.org/exhibitions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.dhhrm.org/exhibitions/pivot-to-america-wing/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Dallas Holocaust and Human Rights Museum accessible?",
      "answer": "The museum describes accessible entrances, galleries, theaters and restrooms, permits ADA-defined service animals, and offers English and Spanish captioning. Its security and stroller restrictions still apply; request specific accommodations directly when booking.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which entrance should an individual use versus a school group?",
      "answer": "The main visitor entrance is 300 N. Houston Street, while group tours enter on Ross Avenue. Visitors should plan for bag screening. The West End DART rail stop is about a block away.",
      "verificationUrl": "https://www.dhhrm.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.dhhrm.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "modern-art-museum-fort-worth": [
    {
      "question": "Are the galleries at the Modern Art Museum of Fort Worth open in October 2026?",
      "answer": "No. The museum officially closes its exhibition galleries September 29 through October 30, 2026 while installing the next collection presentation. The rest of the building offers FREE In the Making sculpture-making activities, cinema and performance programming, its shop and Café Modern. Verify the announced October 31 gallery reopening before making a gallery-focused trip.",
      "verificationUrl": "https://www.themodern.org/exhibition/making-sculpture-project",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/visit/hours-and-admission",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Modern free to visit in October 2026?",
      "answer": "Yes for its special October 2026 lobby sculpture project and museum entry during gallery installation, according to the operator. Galleries are closed the entire September 29–October 30 period. Outside this temporary arrangement regular adult gallery admission is $16, with the museum's weekly free-Friday and half-price Sunday policies.",
      "verificationUrl": "https://www.themodern.org/exhibition/making-sculpture-project",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/exhibition/making-sculpture-project",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When are regular museum galleries normally open?",
      "answer": "Ordinary public hours are Tuesday–Thursday 10 a.m.–5 p.m., Friday 10 a.m.–8 p.m., Saturday and Sunday 10 a.m.–5 p.m., closed Monday and major holidays. These hours do not mean the exhibition galleries are open during the October 2026 installation period.",
      "verificationUrl": "https://www.themodern.org/visit/hours-and-admission",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/visit/hours-and-admission",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Café Modern serve a full meal or just snacks?",
      "answer": "Café Modern is a full-service restaurant and bar with indoor and patio tables, lunch Tuesday–Friday 11 a.m.–2:30 p.m., brunch Saturday 11 a.m.–2:30 p.m. and Sunday 10 a.m.–3 p.m., and Friday dinner seatings starting at 5 p.m. Reservations are available; its menu and hours are distinct from gallery admission.",
      "verificationUrl": "https://www.themodern.org/caf%C3%A9-modern",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.themodern.org/caf%C3%A9-modern",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Modern Art Museum of Fort Worth offer free Fridays or half-price Sundays?",
      "answer": "Yes, during normal gallery operations Fridays offer free general museum admission and Sundays offer half-price tickets. The October 2026 gallery closure supersedes normal expectations; visitors may instead attend free public lobby programs.",
      "verificationUrl": "https://www.themodern.org/visit/hours-and-admission",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/visit/hours-and-admission",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are there children's programs and Sunday family tours during the October installation?",
      "answer": "The free In the Making: The Sculpture Project provides hands-on artmaking suitable for families during the October closure. The operator separately states there are no normal Public Tours or Sunday Family Tours in October 2026, with family tour dates advertised to resume after reopening.",
      "verificationUrl": "https://www.themodern.org/tours",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/exhibition/making-sculpture-project",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum wheelchair accessible, including Café Modern?",
      "answer": "Yes. The operator describes wheelchair-accessible public entrances, elevators, galleries when open, theater, restrooms, Café Modern and its shop, plus accessible parking. Borrowed wheelchairs and portable seats are available first come, and some screenings offer assisted listening or captions.",
      "verificationUrl": "https://www.themodern.org/accessibility",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is Modern Art Museum of Fort Worth and how long should I allow?",
      "answer": "The Modern is at 3200 Darnell Street in Fort Worth's Cultural District, a short walk from the Kimbell and Amon Carter. During October 2026 an architecture, free artmaking and restaurant visit may be shorter than a conventional gallery outing. When exhibition rooms reopen, allow roughly 90 minutes to two hours for a selective art-focused visit; this is an editorial estimate.",
      "verificationUrl": "https://www.themodern.org/visit/hours-and-admission",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.themodern.org/exhibition/making-sculpture-project",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are visitors allowed to take photos, bring food, or sketch in galleries?",
      "answer": "Personal non-flash photography is generally permitted outside restricted works and loan exhibitions. No food or drinks are permitted in galleries, and visitors must keep their distance from artworks. Pencil sketching is allowed within size restrictions, while large bags and bulky items must be checked. Check staff signs for current exhibition-specific rules.",
      "verificationUrl": "https://www.themodern.org/visit/hours-and-admission",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.themodern.org/visit/hours-and-admission",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "american-quarter-horse-hall-of-fame-museum-amarillo": [
    {
      "question": "What are the current museum hours and is it open Mondays?",
      "answer": "The museum-specific operator contact page lists Tuesday–Saturday 9 a.m.–5 p.m., while the 2024 Texas Historical Commission record still shows Tuesday–Friday until 4 p.m. and Saturday until 5 p.m.; much older brochures give Monday hours. These conflicting published sources are not grounds to assume Monday opening. Call 806-376-5181 to confirm.",
      "verificationUrl": "https://aqha-museum.myshopify.com/pages/contact-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://atlas.thc.texas.gov/Details/4200000009",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much is admission to American Quarter Horse Hall of Fame Museum?",
      "answer": "Visit Amarillo labels regular museum admission as paid, but the accessible operator information reviewed here does not establish a reliable current adult ticket amount. Special free family events in 2026 are not a permanent free-admission policy. Confirm normal ticket prices and discounts with the museum before traveling.",
      "verificationUrl": "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.newschannel10.com/2026/07/09/american-quarter-horse-hall-fame-museum-host-family-fun-day-saturday/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is the American Quarter Horse Hall of Fame Museum?",
      "answer": "The museum is at 2601 East Interstate Drive, Amarillo, Texas 79104, near I-40, distinct from American Quarter Horse Foundation administrative office visits. Its museum telephone number is 806-376-5181 and museum email is museum@aqha.org.",
      "verificationUrl": "https://aqha-museum.myshopify.com/pages/contact-us",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://aqha-museum.myshopify.com/pages/contact-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the American Quarter Horse Museum undergoing renovation?",
      "answer": "Yes. A 2026 local operator interview described five renovation phases to create classroom space, interactive galleries, a shop and live-horse demonstrations, with work expected through the end of the decade. Some exhibits may move or be unavailable while work proceeds, although the museum has maintained its general operations.",
      "verificationUrl": "https://www.telemundoamarillo.com/2026/02/27/grandes-renovaciones-estn-en-marcha-para-el-museo-american-quarter-horse-hall-fame/?outputType=amp",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.telemundoamarillo.com/2026/02/27/grandes-renovaciones-estn-en-marcha-para-el-museo-american-quarter-horse-hall-fame/?outputType=amp",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can families meet or ride a real American Quarter Horse at the museum?",
      "answer": "The museum introduced its Wagonhound Paddock at a July 2026 family event with a live-horse demonstration, but there is no evidence that a live horse is present for every regular visit or that horseback riding is offered. Ask for the schedule of actual animal programs before promising a child a live encounter.",
      "verificationUrl": "https://www.newschannel10.com/2026/07/09/american-quarter-horse-hall-fame-museum-host-family-fun-day-saturday/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the Hall of Fame exhibits about?",
      "answer": "Visitors learn how the American Quarter Horse became known for short-distance speed, ranch work, racing and showing, and about famous horses and the people who bred, trained or rode them. Historical artifacts, western art and rotating interactive experiences support these themes; individual displays may be relocated during renovations.",
      "verificationUrl": "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.aqha.com/museum",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Quarter Horse Hall of Fame suitable for a young child?",
      "answer": "Its Hall of Fame stories, horse-themed art and family educational activities can appeal to school-age children, and individual free Family Fun Days have included crafts and demonstrations. Family programming should not be mistaken for guaranteed toddler play space or continuous animal experiences. Check program dates.",
      "verificationUrl": "https://www.newschannel10.com/2026/07/09/american-quarter-horse-hall-fame-museum-host-family-fun-day-saturday/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a cafeteria or full-service restaurant?",
      "answer": "The museum advertises a shop and private-event rental spaces, but the current public visitor sources do not establish a daily cafeteria or full-service restaurant. Private events may hire outside caterers; this does not mean visitors can buy meals on a normal museum day. Plan eating elsewhere in Amarillo.",
      "verificationUrl": "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.aqha.com/resource-detail-view/-/asset_publisher/D6hvXWsL9zzH/content/rental-program",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum wheelchair accessible during the 2026 renovation?",
      "answer": "The operator accepts accommodation requests for booked events, but the publicly available current museum information does not establish a complete step-free route or guarantee that every gallery is accessible during phased construction. Contact museum staff in advance about entrances, restrooms, surfaces and group needs.",
      "verificationUrl": "https://aqha-museum.myshopify.com/pages/contact-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://aqha-museum.myshopify.com/pages/faqs",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "museum-of-fine-arts-houston": [
    {
      "question": "How much is general admission to the Museum of Fine Arts, Houston?",
      "answer": "The museum currently lists All Access tickets at $24 for adults 19+, $20 for youth 13–18 and $20 for seniors 65+ with ID; children 12 and younger enter free. Special program or exhibition admissions may differ. Confirm prices at purchase, not from a stale screenshot.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit/admission-information",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit MFAH for free on Thursday?",
      "answer": "Yes. Thursday general admission to the permanent collection is free for everyone. Special exhibitions still require a separate discounted All Access ticket, so the Thursday promotion does not mean every temporary show is free.",
      "verificationUrl": "https://www.mfah.org/visit/admission-information",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is MFAH open late on Thursday and Friday?",
      "answer": "The current Sarofim Campus schedule lists Thursday and Friday 11 a.m.–9 p.m. It lists Wednesday 11 a.m.–5 p.m., Saturday 11 a.m.–6 p.m., Sunday 12:30–6 p.m., and closures Monday and Tuesday. Special programs and holiday dates may differ.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park for the Kinder Building or MFAH?",
      "answer": "The MFAH official campus map directs visitors to Beck Garage at 1144 Binz Street, Glassell Garage at 5101 Montrose Boulevard and Kinder Garage at 5500 Main Street. Choose the building and entry point before driving, and use current garage rates.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Museum of Fine Arts Houston have a cafeteria or full restaurant?",
      "answer": "MFAH operates Cafe Leonelli on the main campus and another Leonelli at the Glassell School for casual Italian food, drinks and snacks. Le Jardinier is a separate full-service fine-dining restaurant; this is not one generic cafeteria. Confirm dining hours and reservations separately.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Museum of Fine Arts Houston good for kids and strollers?",
      "answer": "Yes, with a selective family visit. Children 12 or younger have free admission. Strollers and soft front-facing baby carriers are allowed, but pull wagons, rolling luggage and large bags are prohibited. Food and drinks must stay outside galleries.",
      "verificationUrl": "https://www.mfah.org/visit/visiting-guidelines",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does MFAH offer sensory-friendly options or a quieter visit time?",
      "answer": "Yes. The operator provides sensory-processing kits at Beck and Kinder coat checks, accessible audio formats and other assistance. It suggests Wednesday and Friday between approximately 1–4 p.m. as generally quieter periods; those are estimates, not guaranteed low-crowd appointments.",
      "verificationUrl": "https://www.mfah.org/visit/accessibility-resources/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit/accessibility-resources/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Bayou Bend or Rienzi inside the MFAH main museum?",
      "answer": "No. Bayou Bend and Rienzi are separately located MFAH house museums near Memorial Park, with their own ticketing and visitor arrangements. They are not inside the Sarofim Campus's three main gallery buildings.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a group of ten visit MFAH without arranging a group reservation?",
      "answer": "Individuals may purchase tickets normally, but groups of ten or more seeking group pricing or a private guided tour are directed to advance group booking. School program rules are separate; contact the museum in advance for school visits.",
      "verificationUrl": "https://www.mfah.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.mfah.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "art-museum-south-texas-corpus-christi": [
    {
      "question": "Is the Art Museum of South Texas still closed because of the July 2026 air-conditioning failure?",
      "answer": "No. The museum announced it reopened July 3, 2026 after a July 1 HVAC closure. Treat the temporary closure notice as historical, not an ongoing closure; check the latest visitor page for new developments.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/temporary-closure-update/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is admission to the Art Museum of South Texas always free?",
      "answer": "No blanket free-admission policy can be inferred from its summer promotion. The museum specifically advertised free entry June 1–July 31, 2026. That promotion ended; check the current Admission & Hours page for today's price and any designated free days.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/free-admission-to-the-art-museum-of-south-texas-summer-2026/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the address of the Art Museum of South Texas?",
      "answer": "The museum is at 1902 North Shoreline Boulevard, Corpus Christi, Texas 78401, on the bayfront. It has more than one building within its waterfront complex; use the museum's visitor information for accessible parking and a preferred entrance.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Art Museum of South Texas have a real restaurant?",
      "answer": "Yes. Elizabeth's is a restaurant/café in the museum complex, not just a vending area. The museum gives 361-882-8785 for dining information and reservations. Confirm its schedule and seating directly rather than assuming it stays open for every gallery hour.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can young children use the ArtCade at the Art Museum of South Texas?",
      "answer": "When open to the public, the first-floor Johnson Building ArtCade has drawing, animation, a reading area and other hands-on creative activities. It is closed to public drop-ins during summer camps, so confirm activity-room access before promising it to children.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What age is required for the Art Museum of South Texas Digital Studio?",
      "answer": "The Blanche Moore Digital Studio's supervised sessions serve adults and children age ten and older accompanied by an adult. Its hours are reserved and session fees can vary; check the museum events calendar before planning a special computer-art visit.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Art Museum of South Texas wheelchair accessible?",
      "answer": "The operator advertises ADA-compliant parking in its lots and ADA service-animal policies. Visitors needing customized accommodation should contact 361-825-3500. It also supports use of the ReBokeh iOS visual-accessibility tool. Do not assume every historic or special-event room has identical access.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I allow at the Art Museum of South Texas?",
      "answer": "One to two hours is a reasonable independent planning estimate for a focused gallery visit. Families attending an ArtCade or Digital Studio session may need longer, and availability of those activities varies.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are Elizabeth's restaurant and the ArtCade always open whenever the galleries are open?",
      "answer": "No. Dining hours and reservations are separate, and the ArtCade is closed during some camp periods. Check restaurant staff and the museum's daily activity schedule rather than planning those facilities from gallery hours alone.",
      "verificationUrl": "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.artmuseumofsouthtexas.org/temporary-closure-update/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "houston-museum-of-natural-science": [
    {
      "question": "Does one HMNS ticket include the planetarium, Butterfly Center and every exhibition?",
      "answer": "No. A regular permanent-hall ticket includes most permanent exhibitions but does not automatically include the Burke Baker Planetarium, Wortham Giant Screen Theatre, Cockrell Butterfly Center or certain ticketed special exhibits. Verify individual admission and timed-entry reservations before purchasing.",
      "verificationUrl": "https://www.hmns.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is actually free at the Houston Museum of Natural Science on Tuesday evenings?",
      "answer": "Permanent exhibition halls at HMNS in Hermann Park are free on Tuesdays from 5 to 8 p.m. This does not include the Butterfly Center, planetarium, giant screen theater, paid special exhibits or parking. Free-Tuesday tickets are distributed in person and cannot be reserved in advance.",
      "verificationUrl": "https://help.hmns.org/support/solutions/articles/151000051328/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://help.hmns.org/support/solutions/articles/151000051328/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much do HMNS general admission and parking cost?",
      "answer": "The operator currently lists permanent-hall admission at $25 for adults and $16 for children ages 3–11 or seniors 62 and older. The attached garage currently charges $30 for nonmembers or $10 for members, including Free Tuesdays. Check live prices and any eligibility discounts before leaving.",
      "verificationUrl": "https://www.hmns.org/visit/directions-parking/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which hours and address apply to the main Houston science museum?",
      "answer": "HMNS at Hermann Park is at 5555 Hermann Park Drive, Houston, not the separately operated Sugar Land location. Its visitor FAQ lists Monday–Thursday 9 a.m.–5 p.m. and Friday–Sunday 9 a.m.–6 p.m., with seasonal changes and closures on Thanksgiving and Christmas. Confirm daily updates before visiting.",
      "verificationUrl": "https://www.hmns.org/visit/faq/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park and can I reserve a space?",
      "answer": "The attached HMNS garage is first-come, not reservable, and has a 6-foot-8-inch height limit. Accessible spaces are available on garage levels, with some alternatives near Caroline Street. Parking rates are separate from museum tickets; allow extra time during Museum District events.",
      "verificationUrl": "https://www.hmns.org/visit/directions-parking/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/visit/directions-parking/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the gem hall and the insect hall currently open at HMNS?",
      "answer": "Not currently. The museum identifies Cullen Hall of Gems & Minerals as closed for a makeover and Brown Hall of Entomology as closed for renovations. The independently ticketed Cockrell Butterfly Center remains a separate attraction. Do not plan around the closed galleries until HMNS posts reopening dates.",
      "verificationUrl": "https://www.hmns.org/hmns-exhibits/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hmns.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can families take a stroller through the Cockrell Butterfly Center?",
      "answer": "Ordinary strollers and wagons are not permitted inside the live butterfly conservatory, because they present an escape risk to butterflies. A stroller parking area is provided. Wheelchairs and mobility devices required for accessibility can use the center's accessible routes and elevators.",
      "verificationUrl": "https://www.hmns.org/exhibits/cockrell-butterfly-center/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/exhibits/cockrell-butterfly-center/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Houston Museum of Natural Science have an on-site restaurant?",
      "answer": "It has casual food service rather than a conventional table-service restaurant. Periodic Table is a bistro-style counter near the Butterfly Center with sandwiches, salads, snacks and coffee; Elements Grill serves burgers, fries, hot dogs, chicken and some vegetarian choices. Check service hours separately from museum hours.",
      "verificationUrl": "https://www.hmns.org/visit/dining/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hmns.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the science museum accessible for wheelchairs and visitors with sensory sensitivities?",
      "answer": "HMNS provides elevators across exhibit levels, designated accessible parking, adult-changing tables in two family restrooms, and detailed visual and sensory guidance that describes lighting, sound and other stimuli by exhibition area. Some attractions have different accommodation and stroller policies, so consult the museum's current accessibility guide.",
      "verificationUrl": "https://www.hmns.org/visit/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hmns.org/visit/faq/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should a family allow at HMNS?",
      "answer": "Allow roughly two to three hours for a selective visit to the main permanent halls, or three to five hours when adding timed attractions and meal breaks. These are independent planning estimates, not minimum museum requirements. For toddlers, plan one or two highlight halls rather than an exhaustive circuit.",
      "verificationUrl": "https://www.hmns.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hmns.org/visit/faq/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors leave HMNS for lunch and come back?",
      "answer": "The museum says a permanent-exhibit admission ticket allows visitors to exit and re-enter the permanent halls throughout the day, so a meal break is possible. Some special exhibits are single-entry only. Schools have separate lunch-storage and preorder procedures, so confirm them before a field trip.",
      "verificationUrl": "https://www.hmns.org/visit/accessibility/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hmns.org/visit/dining/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "el-paso-museum-of-art": [
    {
      "question": "Is the El Paso Museum of Art free to enter?",
      "answer": "Yes. El Paso Museum of Art says general admission is always free. Museum art-school workshops and separately organized events can require a separate registration or tuition, so free museum admission does not imply a free class.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/art-school/classes-and-registration",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which days and hours is the El Paso Museum of Art open?",
      "answer": "The operator lists Wednesday–Saturday 10 a.m.–6 p.m. and Sunday 11 a.m.–3 p.m., with Monday, Tuesday and major-holiday closures. Exhibition openings and event hours may differ. Confirm with the museum before a holiday visit.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park for the El Paso Museum of Art?",
      "answer": "There is no blanket promise of free museum parking. The museum lists nearby fee-bearing downtown garages including JPMorgan Chase, Mills and One Civic Center Plaza, plus metered street parking. Check the lot's actual price and entrances before travel.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the El Paso Museum of Art provide wheelchairs and accessible access?",
      "answer": "The museum says it is fully accessible, welcomes trained service animals, and can lend a wheelchair at reception without charge. For special mobility, interpretation or sensory requests, contact museum visitor services at 915-212-0300.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I take photos at the El Paso Museum of Art?",
      "answer": "Ordinary personal noncommercial photos are generally permitted without flash unless a specific work carries a no-photo sign. No tripods, monopods, selfie sticks, gimbals or commercial photo shoots without museum approval. Keep clear of doorways and stay back from exhibits.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the El Paso Museum of Art good for children?",
      "answer": "The free galleries can support a short family outing, while the museum's separately registered art school offers programs for children ages 6–13, teens and adults. Classes are not automatically free. Choose a few objects by interest rather than expecting a dedicated toddler play center.",
      "verificationUrl": "https://epma.art/art-school/classes-and-registration",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the October 2026 student-art and Zoe Diaz exhibitions permanent?",
      "answer": "No. The museum lists EPISD Creativity Through Our Eyes from August 22 through October 25, 2026, and America, The Beautiful: Selections from the Zoe Diaz Collection from July 25, 2026 through January 3, 2027. Both are dated displays; check the current exhibition page before travel.",
      "verificationUrl": "https://epma.art/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does El Paso Museum of Art have a cafeteria or restaurant?",
      "answer": "Its official visitor guide does not establish a full-service on-site restaurant or cafeteria, and food and drink are prohibited in galleries. Make meal plans in downtown El Paso rather than promising museum food service.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time do visitors need for El Paso Museum of Art?",
      "answer": "About 60–120 minutes is an independent planning estimate for a few exhibitions and collection galleries. The museum sets no fixed time requirement, and visitors with children or a special interest may adjust.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "arlington-museum-of-art": [
    {
      "question": "Where is Arlington Museum of Art now—downtown or Ballpark Way?",
      "answer": "The museum moved into the Arlington Entertainment District at 1200 Ballpark Way and opened there in March 2024. Older downtown museum addresses and photographs are outdated. The building is part of the large complex associated with Esports Stadium Arlington.",
      "verificationUrl": "https://arlingtonmuseum.org/visitor-info",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/visitor-info",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the Arlington Museum of Art hours in October 2026?",
      "answer": "Its dated visitor page says that through October 17, 2026, it opens Tuesday–Friday 10 a.m.–5 p.m., with Saturday–Monday closed. Since older museum pages show different weekend hours and this schedule ends October 17, check the current live schedule for any later visit.",
      "verificationUrl": "https://arlingtonmuseum.org/visitor-info",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/visitor-info",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are tickets to Arlington Museum of Art free?",
      "answer": "Do not assume general admission is free. The Arlington Museum of Art sells exhibition-specific tickets, with discounts for groups of at least ten. Members receive free entry to its exhibitions under the stated membership benefits. Confirm the current show, price and ticket availability directly.",
      "verificationUrl": "https://arlingtonmuseum.org/visitor-info",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/visitor-info",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is parking free at Arlington Museum of Art?",
      "answer": "The closest City parking lot west of the building is listed at $10, accessible from Ballpark Way. Accessible spaces are also available near the south entrance; additional Entertainment District lots have varying prices and operators.",
      "verificationUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can younger children visit Arlington Museum of Art?",
      "answer": "Yes, but all children aged fifteen or younger must be accompanied by a parent or guardian and keep a safe distance from art unless an interactive object is explicitly marked. Sensory suitability depends on each ticketed or immersive exhibition.",
      "verificationUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the new Arlington Museum of Art wheelchair accessible?",
      "answer": "The museum says all exhibition rooms are on the main level, restrooms are wheelchair accessible, and accessible parking is close to the south-side museum entrance. Bus drop-off is also near the south entrance, and service animals are welcome.",
      "verificationUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I bring snacks, drinks, a backpack or stroller inside Arlington Museum of Art?",
      "answer": "Food and drinks—including water and baby bottles—cannot be consumed in gallery rooms. The operator allows strollers and soft front baby carriers, but has no staffed bag check and recommends leaving large bags elsewhere.",
      "verificationUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Arlington Museum of Art have an on-site restaurant or cafeteria?",
      "answer": "The institution points visitors to the many restaurants and cafés in Arlington's Entertainment District. Its visitor FAQ does not establish an in-museum full-service restaurant or cafeteria, so plan a meal outside the galleries.",
      "verificationUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Arlington 150 exhibition currently open, and what happened to the soccer exhibition?",
      "answer": "As reviewed October 13, 2026, Arlington 150: Stories of a Legacy is scheduled to begin October 17 and run through February 28, 2027, so it is not yet open. The World Cup-themed More Than a Match exhibition ended August 30, 2026 and is no longer a current attraction.",
      "verificationUrl": "https://arlingtonmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.arlingtontx.gov/News-Articles/2026/May/Arlington-Museum-of-Arts-More-Than-a-Match-Extended-Through-Aug.-30",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How should a school or large group arrange a visit?",
      "answer": "Request a guided school or youth tour at least two weeks in advance. Groups of ten or more may qualify for discounted tickets, groups over fifty should make special arrangements, and buses can use the south-side loading area without leaving vehicles unattended.",
      "verificationUrl": "https://arlingtonmuseum.org/visitor-info",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://arlingtonmuseum.org/visitor-info",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "art-museum-southeast-texas-beaumont": [
    {
      "question": "Is admission to Art Museum of Southeast Texas free?",
      "answer": "Yes. AMSET says general admission is always free for visitors. Special classes or separately priced adult workshops may require registration and payment, which is different from regular gallery admission.",
      "verificationUrl": "https://amset.org/visit-us-visitanos/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/visit-us-visitanos/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What days and hours is Art Museum of Southeast Texas open?",
      "answer": "The museum lists Monday–Friday 9 a.m.–5 p.m., Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., with major-holiday closures. Temporary exhibition changes and special programming may affect access, so consult the operator calendar.",
      "verificationUrl": "https://amset.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the address of the Art Museum of Southeast Texas in Beaumont?",
      "answer": "AMSET is at 500 Main Street, downtown Beaumont. Texas Energy Museum is nearby at 600 Main Street, making the two a practical multi-museum outing when both institutions are open.",
      "verificationUrl": "https://amset.org/visit-us-visitanos/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/visit-us-visitanos/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should visitors spend at AMSET?",
      "answer": "Allow roughly 60–90 minutes for the main galleries and a current temporary exhibition, an independent estimate rather than an operator-required visit duration. A guided education group or adult workshop can take longer.",
      "verificationUrl": "https://amset.org/visit-us-visitanos/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Art Museum of Southeast Texas have guided school and group tours?",
      "answer": "Yes. AMSET offers free tours for audiences from preschool through senior citizens, with tours booked at least two weeks ahead. The minimum is ten children or seven adults, and advance requests can cover Spanish or ASL guidance.",
      "verificationUrl": "https://amset.org/schedule-a-tour/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/schedule-a-tour/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is AMSET suitable for young children and family groups?",
      "answer": "Yes, the museum offers age-adapted guided experiences and special family art programming. Family Arts Day is advertised for October 17, 2026, but art-making activities and concessions on an event day are not promises of permanent toddler play areas or everyday dining.",
      "verificationUrl": "https://amset.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/schedule-a-tour/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What exhibits are on view at AMSET during October 2026?",
      "answer": "The operator lists Delilah Montoya: Activating Chicana Resistance from October 6, 2026 through January 3, 2027, and Samantha Harrison: Land and Light through November 8, 2026. Both are time-limited. Confirm current and closing dates immediately before traveling.",
      "verificationUrl": "https://amset.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does AMSET have an on-site restaurant or café?",
      "answer": "AMSET's official visit and tour information does not establish a regular full-service museum restaurant or cafeteria. Some special events advertise concessions, but visitors should plan ordinary meals separately in downtown Beaumont.",
      "verificationUrl": "https://amset.org/visit-us-visitanos/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/visit-us-visitanos/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What accessibility accommodations does AMSET offer?",
      "answer": "The museum's public visitor and tour pages do not provide a complete accessible entrance, restroom, wheelchair-loan or sensory-support specification. For particular access needs, call 409-832-3432 before visiting. Do not rely on amenities belonging to nearby Beaumont museums.",
      "verificationUrl": "https://amset.org/visit-us-visitanos/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://amset.org/visit-us-visitanos/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "museum-of-the-gulf-coast-port-arthur": [
    {
      "question": "What does admission cost at Museum of the Gulf Coast?",
      "answer": "Official pages conflict: the homepage and permanent exhibitions page list $8 adults and $6 seniors, but its separate admissions/history page lists $10 adults and $8 seniors. The museum also lists $3 for ages 4–18 and free admission for children under four. Confirm the current price at 409-982-7000 before a trip.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where do I park and enter Museum of the Gulf Coast?",
      "answer": "The street address is 700 Procter Street, Port Arthur, but the museum specifically directs visitor parking and the entrance to the back of the building along Lakeshore Drive. Do not rely only on the front street address to locate its public entry.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/permanent",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/permanent",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Museum of the Gulf Coast open on Sundays?",
      "answer": "No. The current museum pages list Monday–Saturday from 9 a.m. until 5 p.m. and closures on Sundays and holidays. Check the museum's posted holiday calendar for a trip around a school break.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I see Janis Joplin's psychedelic Porsche at the museum?",
      "answer": "The museum identifies its famous psychedelic Porsche as a reproduction, not Janis Joplin's original vehicle. The music galleries also include other objects connected with regional musicians; check current display changes before promising an exact item.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/permanent",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/halls-of-fame",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the associated Pompeiian Villa open for tours?",
      "answer": "No. The museum's official homepage currently identifies the Pompeiian Villa as closed for renovations. Do not include an interior visit in a same-day itinerary until the operator explicitly announces reopening.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Museum of the Gulf Coast interesting for children?",
      "answer": "School-age children often have several approachable topics to choose from: a 13½-foot mounted alligator, a sweeping Gulf Coast history mural, a maritime lighthouse lens and music/sports galleries. Its exhibits are history-focused, not a dedicated children's play area; choose topics based on interests.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/permanent",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can schools and other large groups get tours or discounts?",
      "answer": "Groups of ten or more can arrange tours ahead of time. The museum advertises group discounts and free school tours but its pages differ on grade eligibility and booking notice. The museum recommends planning at least two weeks ahead for a preferred date and guide.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a museum restaurant or cafeteria?",
      "answer": "The museum's official visitor, admissions and permanent-exhibit pages do not establish an everyday on-site full-service restaurant or cafeteria. Arrange meals separately in Port Arthur, and ask about food policies for field trips.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How accessible are the two floors of Museum of the Gulf Coast?",
      "answer": "The museum's visitor pages identify two exhibit floors but do not fully document the current elevator, wheelchair, restroom and sensory-support arrangements. Call 409-982-7000 with specific access needs before making the trip.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/permanent",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/permanent",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I bring food or drinks into the Museum of the Gulf Coast?",
      "answer": "No. The museum's published visitor policy prohibits food and drinks in the museum. Arrange snacks and lunch elsewhere in Port Arthur, and contact its education coordinator ahead of a school group outing to confirm any approved meal arrangements.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are pets allowed, and can I take flash photographs at the Museum of the Gulf Coast?",
      "answer": "The museum lists no pets except service animals and prohibits flash photography. It also prohibits unattended minors and firearms. Contact museum staff if you need permission for a specific photography project or group accommodation.",
      "verificationUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.museumofthegulfcoast.org/copy-of-about-the-museum",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "fire-museum-of-texas-beaumont": [
    {
      "question": "Is admission to the Fire Museum of Texas free?",
      "answer": "Yes. The official visiting page states that ordinary museum admission is free. Birthday parties, private rental, and special booked activities are separately priced and are not part of general admission.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Fire Museum of Texas open on weekends?",
      "answer": "No. The operator lists Monday through Friday, 8 a.m.–4:30 p.m., with Saturdays and Sundays closed. Museum event schedules or third-party weekend listings should not be treated as normal walk-in hours.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the giant spotted fire hydrant outside the Fire Museum?",
      "answer": "The enormous white Dalmatian-painted hydrant is a working fire hydrant installed with a Disney donation for the 1999 101 Dalmatians release. Outdoor water demonstrations are not guaranteed daily.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.beaumontcvb.com/listing/fire-museum-of-texas/20/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Will young children enjoy the Fire Museum of Texas?",
      "answer": "The museum offers a children's museum area, a fire-safety house, Smokey Bear fire-prevention education and fire engines. The children's learning theme is safety rather than an unrestricted indoor play center, so adult supervision is needed.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors see a fire engine connected to Lyndon B. Johnson?",
      "answer": "Yes. The museum says a 1915 LaFrance engine used at LBJ's former ranch is one of its historical display highlights. It also shows how firefighting equipment developed across generations.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Fire Museum accessible to wheelchair users?",
      "answer": "The operator refers to both downstairs and upstairs museum spaces but does not publish a complete elevator or stair-free route. Contact staff at 409-880-3927 to confirm the exhibits and restroom facilities accessible to a particular visitor.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Fire Museum of Texas have a cafeteria or restaurant?",
      "answer": "The museum advertises a kitchen and optional popcorn-machine rental for privately booked events, not a normal public café or full-service restaurant. Plan meals elsewhere in Beaumont unless your booked event specifies catering.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can you reserve the Fire Museum for birthday parties?",
      "answer": "Yes. The operator advertises birthday and small-event rental packages that include access to children's exhibit areas and, in some packages, a fire engine visit. Rates and deposits are separate from its free everyday admission; confirm booking availability directly.",
      "verificationUrl": "https://www.firemuseumoftexas.com/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.firemuseumoftexas.com/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "spindletop-gladys-city-boomtown-museum-beaumont": [
    {
      "question": "What does it cost to enter Spindletop Gladys City Boomtown Museum?",
      "answer": "Lamar University lists standard admission as $5 adults, $3 seniors age 60+, $2 ages 6–12, with ages five or under free. Certain Lamar-affiliated visitors and eligible military personnel receive ID-based free admission. Check current event pricing and qualifications.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When does Spindletop Boomtown close and what is its last admission time?",
      "answer": "The official visiting page lists Tuesday–Saturday 10 a.m.–5 p.m. and Sunday 1–5 p.m., closed Mondays and major holidays. Last admission is 4 p.m.; arriving shortly before closing is not ideal for the open-air museum.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the Gladys City storefronts original buildings from 1901?",
      "answer": "The historic boomtown streets and buildings are reconstructions that interpret life during the 1901 Spindletop oil boom. They are not the original intact town, so treat period settings as museum interpretation rather than untouched nineteenth-century buildings.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/index.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Spindletop Gladys City Boomtown accessible with a wheelchair or stroller?",
      "answer": "Lamar says much of the complex is wheelchair accessible, with benches on several porches. Outdoor surfaces and thresholds differ between reconstructed buildings; ask the museum for an actual route instead of assuming every display is step-free.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are dogs allowed at the Boomtown Museum?",
      "answer": "Leashed pets are allowed on the premises but not inside exhibition buildings, according to Lamar University's visitor page. Service animals are allowed inside according to the museum's service-animal rule; confirm any special accommodation directly.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have guided tours and field trips?",
      "answer": "Tours can be guided when docents are available, otherwise self-guided. Groups of 10 or more should book ahead; the operator does not give guided tours to groups over 30 people at once, although larger youth groups may be split. School-year and summer prices differ, and educators should confirm chaperone rules.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum recreate the 1901 Lucas gusher every day?",
      "answer": "The museum interprets the 1901 Lucas gusher through replica derricks, reconstructed commercial buildings and occasional scheduled events. Do not assume a live gusher demonstration or reenactors are available on every ordinary visit.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/index.html",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/index.html",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Spindletop Boomtown have a restaurant or cafe?",
      "answer": "The operator's current plan-your-visit page does not establish a regular full-service café or restaurant; there is a gift shop but that is not a dining facility. Plan an outdoor-appropriate outing and meals elsewhere in Beaumont.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should we allow for Spindletop Gladys City Boomtown?",
      "answer": "An estimated 75–120 minutes is reasonable for a selective walk among recreated shops and derricks, accounting for heat, shade and individual mobility. It is an editorial estimate, not the museum's required tour length.",
      "verificationUrl": "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lamar.edu/spindletop-boomtown-museum/index.html",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    }
  ],
  "national-museum-funeral-history-houston": [
    {
      "question": "How much does admission to the National Museum of Funeral History cost?",
      "answer": "The operator lists $15 for adults, $12 for seniors age 55 or older and veterans, $7 for children ages 6–11, and free entry for children ages five and younger. SCI employees with identification may qualify for a separate discount. Event tickets and group rates differ.",
      "verificationUrl": "https://nmfh.org/the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://nmfh.org/the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is parking free at the National Museum of Funeral History?",
      "answer": "Yes. The museum's published visitor FAQ confirms free on-site parking at 415 Barren Springs Drive in north Houston. This is not in the central Houston Museum District; approaching from I-45 and Richey Road is more practical than planning a Museum District walk.",
      "verificationUrl": "https://nmfh.org/faq-page/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://nmfh.org/faq-page/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should I allow for the National Museum of Funeral History?",
      "answer": "The museum FAQ recommends about two to four hours for someone touring all exhibits, depending on reading and viewing time. An approximately 60–90 minute selective tour of a few themes is an independent planning estimate, not the operator's full-tour duration.",
      "verificationUrl": "https://nmfh.org/faq-page/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://nmfh.org/faq-page/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is this funeral museum appropriate for children or is it scary?",
      "answer": "The museum recommends visitors generally be over seven years old and describes its displays as educational rather than deliberately gruesome or spooky. Some exhibits feature coffins, grief and historical deaths; choose galleries based on a child's readiness, and ask about family scavenger-hunt activities.",
      "verificationUrl": "https://nmfh.org/faq-page/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://nmfh.org/for-families/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit the National Museum of Funeral History on Sundays?",
      "answer": "The museum's published regular schedule is noon to 5 p.m. on Sundays, 10 a.m. to 4 p.m. Monday through Friday, and 10 a.m. to 5 p.m. Saturday. Holidays and private events may change access; check current announcements before setting out.",
      "verificationUrl": "https://nmfh.org/the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://nmfh.org/the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are tours self-guided or do I need to book a docent?",
      "answer": "Normal museum visits are self-guided. Groups may book a docent-led tour in advance by calling 281-876-3063 or writing to contact@nmfh.org. The museum has a limited supply of wireless listening headsets for tours; identification is required as a deposit.",
      "verificationUrl": "https://nmfh.org/book-a-tour/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://nmfh.org/faq-page/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can wheelchair users or visitors with hearing and vision disabilities visit?",
      "answer": "The operator says its museum is wheelchair accessible and provides benches. It asks visitors who need specific hearing or vision accommodations to contact staff in advance, and docent tours can use wireless listening headsets. Confirm the suitability of individual arrangements before traveling.",
      "verificationUrl": "https://nmfh.org/faq-page/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://nmfh.org/faq-page/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Shroud of Turin in the Houston museum the original?",
      "answer": "No. The exhibit uses a certified replica of the Shroud of Turin, not the original religious textile in Italy. The museum also interprets funeral customs and rites involving popes in a separate exhibit. Do not advertise the copy as the original.",
      "verificationUrl": "https://nmfh.org/exhibitions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://nmfh.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a restaurant or cafeteria?",
      "answer": "The operator advertises a gift shop, but its standard visitor, tour and FAQ pages do not establish a regularly operating on-site cafeteria or full-service restaurant. Plan a meal elsewhere in north Houston and contact staff about group food arrangements if needed.",
      "verificationUrl": "https://nmfh.org/the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://nmfh.org/the-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a school class or large group receive a discount or guided tour?",
      "answer": "The museum offers advance-booked guided tours and separate group rates, generally for groups of at least 25, and educational field-trip options. Arrange the itinerary with museum staff rather than assuming an unreserved class can obtain discounted admission.",
      "verificationUrl": "https://nmfh.org/the-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://nmfh.org/book-a-tour/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "texas-ranger-hall-of-fame-museum-waco": [
    {
      "question": "What does admission to the Texas Ranger Hall of Fame and Museum cost?",
      "answer": "Current official prices: adults $10.50, children 6–12 $4, under 6 free, seniors age 60+ $8.50 and military with ID $8.50. The museum lists separate law enforcement and other eligible discounts; prices should be confirmed for the actual visit.",
      "verificationUrl": "https://www.texasranger.org/Visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/Visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long do most people spend at the Texas Ranger Hall of Fame and Museum?",
      "answer": "The museum recommends approximately two hours for a self-directed visit. An organized guided tour is usually about 45 minutes, but the operator advises allowing at least 90 minutes so the group can explore the galleries and shop.",
      "verificationUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Texas Ranger Hall of Fame Museum open every day?",
      "answer": "Regular public hours are seven days a week, 9 a.m.–5 p.m., with final admission at 4:30 p.m. The museum closes on Easter Sunday, Thanksgiving, Christmas Eve, Christmas Day and New Year's Day according to the operator.",
      "verificationUrl": "https://www.texasranger.org/Visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/Visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is parking at the Waco Texas Ranger museum free?",
      "answer": "Yes, ordinary museum parking is listed as free on the operator visit page. Baylor game days and special events can affect nearby roads and spaces; check current directions for the chosen date rather than relying on an old parking map.",
      "verificationUrl": "https://www.texasranger.org/Visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/Visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a school or large group arrive without booking?",
      "answer": "Groups of ten or more need advance reservations. Museum tour guidance asks arriving 10–15 minutes before the start; groups of 25–50 may be split into smaller tours. If the group is late or attendance changes, telephone 254-750-8631.",
      "verificationUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are photos allowed inside the Texas Ranger museum?",
      "answer": "The museum's group-tour FAQ says personal photography of the exhibits is welcomed. Visitors should follow any gallery-specific notices or staff instructions on the day.",
      "verificationUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Texas Ranger museum have a cafeteria or restaurant?",
      "answer": "Official group rules prohibit food and drinks inside museum exhibits. The published visit guide does not establish an on-site full-service restaurant or cafeteria; plan a meal elsewhere in Waco instead of expecting one in the galleries.",
      "verificationUrl": "https://www.texasranger.org/Pages/Education/FAQ",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/Visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Texas Ranger Research Center keep the same hours as the museum?",
      "answer": "No. The adjacent Armstrong research facility lists Monday–Friday 9 a.m.–4 p.m. and asks researchers to call ahead for an appointment; the museum galleries generally open every day. A museum ticket does not itself guarantee research assistance.",
      "verificationUrl": "https://www.texasranger.org/Visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/News-articles/Rangers-Through-Time",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is the 2026 Rangers Through Time exhibition?",
      "answer": "The museum announced a special exhibit in May 2026 in Spindletop Tower at the Armstrong Research Center. It uses paintings, photographs, medals, firearms and sculpture to examine Ranger imagery from the 1840s to 1990s. Check availability before planning around it.",
      "verificationUrl": "https://www.texasranger.org/News-articles/Rangers-Through-Time",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.texasranger.org/News-articles/Rangers-Through-Time",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "texas-transportation-museum-san-antonio": [
    {
      "question": "Are train rides included with Texas Transportation Museum admission?",
      "answer": "Yes, regular train rides are included with general admission when the railroad is operating. The museum says rides last roughly 10–15 minutes and passengers can ride more than once, subject to safe capacity and operating conditions. Special event tickets follow their own rules.",
      "verificationUrl": "https://www.txtransportationmuseum.org/train-rides",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/train-rides",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Texas Transportation Museum open Fridays?",
      "answer": "Ordinary public visiting days are selected Saturdays and Sundays, and Fridays are reserved for school or booked groups. Opening hours are date-dependent, so check the live calendar before travelling. Last regular public admission is generally 3 p.m.",
      "verificationUrl": "https://www.txtransportationmuseum.org/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much are tickets to the Texas Transportation Museum?",
      "answer": "The current general admission page lists adults 13+ $12, children 4–12 $10, under age four free and seniors 65+ $9. Event days and discounts may be priced differently; the separate admissions page may show older prices, so use the current Visit Us calendar and checkout total.",
      "verificationUrl": "https://www.txtransportationmuseum.org/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/tickets",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are train rides at Texas Transportation Museum wheelchair accessible?",
      "answer": "The operator says the covered flatcar is accessible to people using wheelchairs but the historic caboose is not. Some preserved rolling stock is also inaccessible. Arrange any particular access accommodation before visiting.",
      "verificationUrl": "https://www.txtransportationmuseum.org/train-rides",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/train-rides",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the Texas Transportation Museum have paved accessible parking?",
      "answer": "Most of the museum parking area is gravel; the operator identifies accessible spaces beside the depot ramp and a paved space near the platform and main display building. Parking is free. Confirm the route that works for your mobility needs.",
      "verificationUrl": "https://www.txtransportationmuseum.org/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are Texas Transportation Museum steam engines running now?",
      "answer": "Do not assume so. The operator's current train-ride page says that no live-steam days are scheduled because of inspection and maintenance. Its normal public ride can use diesel equipment; confirm at the museum before setting expectations for a steam-hauled trip.",
      "verificationUrl": "https://www.txtransportationmuseum.org/train-rides",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/train-rides",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors ride in the locomotive driver's cab?",
      "answer": "Current ticket information says diesel cab rides are suspended due to mechanical repairs. This is distinct from ordinary passenger rides and should not be sold or promised until the museum explicitly resumes it.",
      "verificationUrl": "https://www.txtransportationmuseum.org/tickets",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/train-rides",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors bring food or pets to the Texas Transportation Museum?",
      "answer": "The museum allows well-behaved leashed pets and outside food at its picnic tables. Drinks are available in the depot, while snacks generally appear only during special events. There is no documented on-site full-service café or cafeteria.",
      "verificationUrl": "https://www.txtransportationmuseum.org/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What if rain or another problem cancels the museum train?",
      "answer": "The museum may close early during inclement weather or change services for equipment issues. Its Visit Us page says rainchecks or refunds may be offered. Always check the event calendar and current notices before setting out.",
      "verificationUrl": "https://www.txtransportationmuseum.org/visit-us",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.txtransportationmuseum.org/visit-us",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "dr-pepper-museum-waco": [
    {
      "question": "Do I need to reserve a Dr Pepper Museum ticket online?",
      "answer": "No. The museum sells regular self-guided admission at the gate and does not sell general-admission tickets online. As of the official visitor listing, guests age 5 and up pay $12 and children age 4 and younger enter free. Make-A-Soda and other special experiences may be separately priced and reserved.",
      "verificationUrl": "https://drpeppermuseum.com/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does a Dr Pepper Museum admission ticket include a soda?",
      "answer": "Yes, each paid general-admission ticket includes a complimentary 12-ounce fountain drink or equivalent credit for an upgrade. Children admitted for free, some passes and other complimentary admissions do not automatically include a free soda voucher.",
      "verificationUrl": "https://drpeppermuseum.com/plan-your-visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I enter the Dr Pepper Museum soda fountain without admission?",
      "answer": "No. The operator says the soda fountain, gift shop and the World's Largest Dr Pepper Bottle are inside the ticketed museum campus. You must pay for museum admission to reach them even if you only want a drink or shop.",
      "verificationUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should I park at the Dr Pepper Museum, and is parking free?",
      "answer": "The public museum lot across South 5th Street is paid, approximately $10 plus fees for five hours, with no come-and-go privileges. There may be free on-street parking nearby. Do not park in the staff-only lot under the red neon sign; accessible parking with qualifying placard or plates has its own designated spaces.",
      "verificationUrl": "https://drpeppermuseum.com/parking-information/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/parking-information/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I leave the Dr Pepper Museum and come back the same day?",
      "answer": "The museum's current visitor FAQ says there is no reentry after exiting the museum campus. Finish the galleries, soda fountain and shop before leaving; public parking also does not provide a come-and-go privilege.",
      "verificationUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How accessible is the historic Dr Pepper Museum for wheelchair or sensory-sensitive visitors?",
      "answer": "Both buildings have accessible entrances, with elevators in the former bottling plant; wheelchairs may be borrowed subject to availability. The museum offers sensory-support resources and captioning or transcripts. Contact staff before arrival about individualized access or a specific Make-A-Soda program.",
      "verificationUrl": "https://drpeppermuseum.com/accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://drpeppermuseum.com/accessibility/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors bring large strollers or wagons into the Dr Pepper Museum?",
      "answer": "The operator allows standard-sized strollers but not oversized strollers or wagons inside its buildings; those must be left in designated stroller parking areas.",
      "verificationUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/frequently-asked-questions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Dr Pepper Museum suitable for young children and school trips?",
      "answer": "The bottling displays and fountain are popular family options, but toddlers may need short routes. School groups should book in advance and follow chaperone and group parking procedures. Paid museum admission does not include every add-on beverage experience.",
      "verificationUrl": "https://drpeppermuseum.com/group-tour-field-trip-faqs/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://drpeppermuseum.com/plan-your-visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are there tables where my group can eat at the Dr Pepper Museum?",
      "answer": "The museum has public courtyard picnic tables but does not guarantee or reserve them for ordinary groups. The on-campus soda fountain is a drink and dessert counter, not a full-service restaurant. School and other groups should plan food logistics before arrival.",
      "verificationUrl": "https://drpeppermuseum.com/group-tour-field-trip-faqs/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://drpeppermuseum.com/group-tour-field-trip-faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "texas-sports-hall-of-fame-waco": [
    {
      "question": "How much does admission to the Texas Sports Hall of Fame cost?",
      "answer": "Current posted prices are adults $10, seniors age 60 and up $8, students K–college $6, children under six free, and active-duty military and veterans free. Ticket sales take place at the museum; group arrangements are separate.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Texas Sports Hall of Fame open Sundays?",
      "answer": "No. The official visitor details list Monday through Saturday 9 a.m.–5 p.m. and Sunday closed. Special programs may have different schedules, so verify holiday and event days before a dedicated trip.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where can I park at the Texas Sports Hall of Fame?",
      "answer": "The museum is at 1108 South University Parks Drive by Baylor University and offers free on-site visitor parking. Nearby sporting events may change traffic routes, but the official visitor guide does not list a routine museum parking charge.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Do I need advance tickets or a tour reservation?",
      "answer": "Individual visitors can usually buy a general ticket when they arrive. Organized groups and guided tours should arrange a reservation in advance, since a standard admission ticket does not guarantee a staffed tour.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What kinds of sports can I learn about at the Texas Sports Hall of Fame?",
      "answer": "The Hall interprets athletes and coaches across football, baseball, basketball, track, golf, rodeo and other sports. Texas High School Football and the former Southwest Conference provide important subtopics rather than being separate daily admission venues.",
      "verificationUrl": "https://tshof.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How much time should I allow for the Texas Sports Hall of Fame?",
      "answer": "About one to two hours is an independent planning estimate, depending on whether the visitor focuses on one sport or studies many inductee displays. The operator does not promise an exact average visit duration.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a full-service restaurant inside Texas Sports Hall of Fame?",
      "answer": "The museum's official contact and visitor information does not establish an on-site café or full-service restaurant. Baylor-area dining is nearby but separate from the Hall. Plan food and dietary arrangements independently.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Texas Sports Hall of Fame wheelchair accessible?",
      "answer": "The operator's basic visitor listing gives the location and free parking but does not document exact accessible parking spaces, step-free routes or sensory accommodations. Call 254-756-1633 before visiting if a particular accommodation is necessary.",
      "verificationUrl": "https://tshof.org/contact-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://tshof.org/contact-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "austin-nature-and-science-center": [
    {
      "question": "Is there an entry fee for the Austin Nature & Science Center?",
      "answer": "No. General individual and family admission to the exhibits and outdoor center is free. School and organized groups of fifteen or more require registration and may face charges for instructor-led sessions, which have separate booking arrangements.",
      "verificationUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is the Austin Nature & Science Center's entrance and where should I park?",
      "answer": "Use the visitor address 2389 Stratford Drive, Austin. Free car parking is under MoPac across Stratford Drive, with accessible spaces connecting to the entrance sidewalk. The separate mailing address at 301 Nature Center Drive is not the recommended visitor arrival.",
      "verificationUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Dino Pit a good activity for young children?",
      "answer": "Yes. The outdoor Dino Pit offers hands-on fossil exploration and is among the center's signature family experiences. Younger children should be supervised and plan for sun, heat, uneven outdoor activity surfaces and appropriate clothing.",
      "verificationUrl": "https://www.austintexas.gov/parks/austin-nature-science-center-exhibits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/locations/austin-nature-and-science-center",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can children bring rocks, feathers or fossils to the Trade Counter?",
      "answer": "The Naturalist Workshop's Trade Counter accepts eligible nature objects under strict restrictions and is staffed only at selected hours. Do not bring anything collected from public preserves, bird parts, human artifacts, endangered or purchased items, or things killed to trade. Ask staff before collecting or bringing an uncertain object.",
      "verificationUrl": "https://www.austintexas.gov/parks/austin-nature-science-center-exhibits",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors pet the animals or bring a dog to the center?",
      "answer": "No pets are allowed on the center or nature-preserve property under the City of Austin's rules. Animal ambassadors are injured or imprinted wildlife receiving permanent care and are educational displays, not a petting zoo. Service animal accommodations should be discussed with the operator.",
      "verificationUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/austin-nature-science-center-exhibits",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a cafeteria or an indoor place to eat lunch at the Austin Nature & Science Center?",
      "answer": "No. The City's group guidance explicitly says there are no indoor or covered dining facilities. Groups may use a limited number of outdoor Meadow picnic tables when space and weather permit, and must pack out their trash. Do not plan an indoor lunch at the center.",
      "verificationUrl": "https://www.austintexas.gov/parks/austin-nature-science-center-school-programs-and-group-reservations",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Do school field trips or large family groups need a reservation?",
      "answer": "Yes. The City requires a Group Reservation for fifteen or more visitors, including schools, camps, homeschools and large family parties. Instructors and school programs have separate registration and fees; buses must use designated drop-off and parking, not the public car parking under MoPac.",
      "verificationUrl": "https://www.austintexas.gov/parks/austin-nature-science-center-school-programs-and-group-reservations",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the nearby nature preserve open at the same hours as the center?",
      "answer": "Not exactly. The City describes the adjoining preserve as open from dawn to dusk, but some access gates and parking areas lock by 5 p.m. The former gate from the Birds of Prey area into the preserve is closed; use designated external trailheads and do not go off trail.",
      "verificationUrl": "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.austintexas.gov/parks/locations/austin-nature-and-science-center",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "harry-ransom-center-austin": [
    {
      "question": "Is the Harry Ransom Center free to visit?",
      "answer": "Yes. Admission to the public exhibition galleries is free. The research Reading Room is a different facility with its own identification and registration process; free entry to galleries does not automatically permit immediate access to archival manuscripts.",
      "verificationUrl": "https://www.hrc.utexas.edu/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/frequently-asked-questions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are the Harry Ransom Center Reading Room and exhibitions open on the same days?",
      "answer": "No. Current gallery hours are Tuesday through Friday 10 a.m.–5 p.m. and Saturday–Sunday noon–5 p.m., with galleries closed Mondays. The Reading Room generally opens Monday through Saturday 9 a.m.–5 p.m. and is closed Sundays; holiday schedules differ.",
      "verificationUrl": "https://www.hrc.utexas.edu/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/frequently-asked-questions/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors see the Gutenberg Bible and the earliest surviving photograph?",
      "answer": "The Gutenberg Bible and Niépce Heliograph are signature displayed objects in the public exhibition area. Conservation, loans or temporary display changes can interrupt availability, so consult the current official exhibition listing before making a special trip for one item.",
      "verificationUrl": "https://www.hrc.utexas.edu/exhibitions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Which Harry Ransom Center exhibitions are open in autumn 2026?",
      "answer": "The official schedule lists Houdini's Library through January 24, 2027 and The Worlds of Gertrude Stein through January 10, 2027. Those are time-limited exhibitions, not permanent galleries; check the museum's live exhibition directory on the day of travel.",
      "verificationUrl": "https://www.hrc.utexas.edu/exhibitions/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should visitors park near the Harry Ransom Center?",
      "answer": "Metered Guadalupe Street parking may be available and is free on Sundays; nearby University of Texas garages generally charge. Designated accessible parking in garages also has a fee, and some curbside ADA spaces are only available at specified evening or weekend hours.",
      "verificationUrl": "https://www.hrc.utexas.edu/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/group-tours/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a visitor photograph exhibits, bring bags or eat inside?",
      "answer": "Personal non-flash photography is generally permitted in exhibition galleries unless gallery signage says otherwise. Large bags and backpacks must be stored in available lockers; eating and drinking are not permitted in galleries, theater or the research Reading Room.",
      "verificationUrl": "https://www.hrc.utexas.edu/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/group-tours/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a teacher or family arrange a private tour at the Ransom Center?",
      "answer": "Docent-led group visits for ten or more people must be requested at least two weeks ahead and are normally capped at thirty visitors. Walk-up groups cannot assume a docent is available. Standard organized tours run approximately one hour.",
      "verificationUrl": "https://www.hrc.utexas.edu/group-tours/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Harry Ransom Center accessible for visitors using wheelchairs or ASL interpretation?",
      "answer": "The public spaces and restrooms are ADA-compliant, and a wheelchair is available for visitors. Contact hrctours@austin.utexas.edu at least five business days before a visit to arrange ASL or specific accessibility accommodations; garage parking may have a fee.",
      "verificationUrl": "https://www.hrc.utexas.edu/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.hrc.utexas.edu/group-tours/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "thinkery-austin-childrens-museum": [
    {
      "question": "How much is Thinkery general admission for babies, children and adults?",
      "answer": "The Mueller museum's current general-admission price is $19.95 for visitors ages one year and older; babies under one are free, while members get ordinary admission without that ticket charge. Special programs, Baby Bloomers and eligibility-based discounts have different prices and rules.",
      "verificationUrl": "https://thinkeryaustin.org/visit-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thinkeryaustin.org/guidelines/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What days is Thinkery in Austin open and how long does a visit take?",
      "answer": "Thinkery lists Tuesday through Sunday, 10 a.m.–5 p.m., with Mondays closed outside special programs. The operator says families typically spend 1.5–2 hours exploring and advises allowing at least 90 minutes. Separate early morning Baby Bloomers sessions use different tickets.",
      "verificationUrl": "https://thinkeryaustin.org/visit-us/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thinkeryaustin.org/guidelines/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should we park for Thinkery and is parking free?",
      "answer": "The museum offers up to three hours of validated parking in designated McBee Street District and Simond garages during qualifying visits. Current parking instructions require a Metropolis account; verify the exact garage and redemption requirements before arriving. Metered street parking is another option.",
      "verificationUrl": "https://thinkeryaustin.org/visit-us/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thinkeryaustin.org/guidelines/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can children be dropped off at Thinkery without an adult?",
      "answer": "No. A guardian aged eighteen or older must accompany and supervise children throughout the galleries. Thinkery requires at least one supervising adult for every five children on the exhibit floor; museum staff do not serve as individual babysitters.",
      "verificationUrl": "https://thinkeryaustin.org/guidelines/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thinkeryaustin.org/visit-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there a café or can families bring snacks to Thinkery?",
      "answer": "Outside food and drinks are allowed in the designated Snack Area, not inside the interactive exhibit galleries. The official visitor FAQ does not promise a full-service on-site restaurant; plan a meal or picnic separately in Mueller if your family needs more than a snack.",
      "verificationUrl": "https://thinkeryaustin.org/guidelines/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://thinkeryaustin.org/visit-us/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Thinkery suitable for toddlers and children sensitive to loud sounds or flashing lights?",
      "answer": "Baby Bloomers is a separately scheduled program for the youngest visitors, and Fresh! Farmers Market is designed for early learners. Sound-reducing earmuffs and sensory aids are available in limited numbers. Light Lab includes a bright strobe effect in Frozen Shadows, so light-sensitive children may prefer other exhibits.",
      "verificationUrl": "https://thinkeryaustin.org/museum-accessibility/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thinkeryaustin.org/exhibit/light-lab/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Thinkery offer wheelchair access and reduced or free admissions?",
      "answer": "Thinkery's two Mueller floors are accessible by elevator, with a limited loaner wheelchair supply at Admissions. The museum also offers eligibility-based reduced admission and in-person ACM/ASTC reciprocal benefits; bring the required photo ID and membership or program documents. Some offers do not apply online.",
      "verificationUrl": "https://thinkeryaustin.org/resources/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thinkeryaustin.org/museum-accessibility/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are Thinkery and Thinkery Del Valle the same destination?",
      "answer": "No. The Meredith Learning Lab is at 1830 Simond Avenue in Austin's Mueller neighborhood. Thinkery also operates a separate Del Valle location with its own admission policies, audience and parking. Make sure you book tickets for the intended site rather than assuming one location's benefits apply to the other.",
      "verificationUrl": "https://thinkeryaustin.org/visit-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://thinkeryaustin.org/delvalle/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "lbj-presidential-library-austin": [
    {
      "question": "How much does it cost to visit the LBJ Presidential Library?",
      "answer": "Regular admission is currently $16 for adults, $12 seniors aged 62 or older, $6 students and youth aged 13–18, and free for children under twelve. Tuesdays are half price, and the museum posts selected free-admission days. Check the current price chart before booking.",
      "verificationUrl": "https://www.lbjlibrary.org/visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the LBJ Presidential Library free on Tuesdays or certain holidays?",
      "answer": "The library advertises half-price admission every Tuesday and specific free-admission dates, including President Johnson's birthday and several designated holidays. Not every public holiday is free, and access can vary around university events, so verify the posted calendar.",
      "verificationUrl": "https://www.lbjlibrary.org/visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should visitors park for the LBJ Library in Austin?",
      "answer": "Use the visitor lot number 38 off Red River Street at 2313 Red River Street; ordinary car parking is free. On UT football days, Red River traffic and drop-off points can be disrupted, and the operator recommends checking local conditions before departure.",
      "verificationUrl": "https://www.lbjlibrary.org/visit",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long should a family spend at the LBJ Presidential Library?",
      "answer": "The library recommends 90 minutes to two hours for a normal visit, adding roughly half an hour for special exhibitions. Its official quick-visit route takes about 30–45 minutes and includes the Oval Office, Lady Bird's office and animatronic LBJ.",
      "verificationUrl": "https://lbjlibrary.org/visit/know-before-you-go",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can visitors see the actual Oval Office at the LBJ Library?",
      "answer": "The tenth-floor Oval Office exhibition is a replica of the president's White House workspace, not the original Oval Office in Washington. It is useful alongside Lady Bird Johnson's office and recordings that interpret Johnson's public decisions.",
      "verificationUrl": "https://lbjlibrary.org/visit/know-before-you-go",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/exhibitions",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the LBJ Presidential Library wheelchair accessible?",
      "answer": "The visitor lot 38 has accessible parking and a ramped route across the plaza. Public exhibits are reached by elevators, with wheelchairs available free, accessible restrooms, captioned videos and printed transcripts. Staff need advance notice for ASL or a vision-impairment escort.",
      "verificationUrl": "https://lbjlibrary.org/visit/accessibility",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://lbjlibrary.org/visit/accessibility",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a school or family group walk into the library with more than fourteen people?",
      "answer": "An organized group of fifteen or more must make a reservation. Adult group reservations currently require at least three weeks' notice, and school field trips follow separate procedures. The ordinary museum ticket does not itself reserve a docent-led group program.",
      "verificationUrl": "https://www.lbjlibrary.org/visit/group-visits",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://www.lbjlibrary.org/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the LBJ Library have a cafeteria or a restaurant inside?",
      "answer": "Current operator visitor pages describe the ticket desk, store and museum amenities but do not establish a reliable, operating full-service cafeteria. Plan dining elsewhere on or around campus instead of assuming the museum itself provides lunch.",
      "verificationUrl": "https://www.lbjlibrary.org/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://lbjlibrary.org/visit/know-before-you-go",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "blanton-museum-of-art-austin": [
    {
      "question": "Is the Blanton Museum of Art free on Tuesdays?",
      "answer": "Yes. Blanton offers free museum admission every Tuesday through a dedicated entry-ticket arrangement. Regular non-Tuesday prices currently include $15 adults, $12 seniors 65 and older, $8 ages 6–17, and free children five and under and UT ID holders.",
      "verificationUrl": "https://blantonmuseum.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the regular Blanton Museum opening hours?",
      "answer": "Current operator hours are Tuesday through Friday 10 a.m.–5 p.m., Saturday 10 a.m.–8 p.m., and Sunday 10 a.m.–5 p.m. The museum is closed Mondays. Holiday closures and university-campus events can change access, so check the calendar on your visit date.",
      "verificationUrl": "https://blantonmuseum.org/visit/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where should Blanton visitors park and how much does it cost?",
      "answer": "Parking is in paid University of Texas garages, including Brazos Garage for many visitors. The published price table currently starts at $6 for one to two hours and $9 for two to three hours; member and home-football-game arrangements differ.",
      "verificationUrl": "https://blantonmuseum.org/visit/parking/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/accessibility/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Blanton's new museum café already open?",
      "answer": "The official visitor FAQ still describes the new café as under construction, with an opening planned during 2026. A projected opening date is not proof of current food service, so arrange meals at nearby restaurants or an allowed outdoor picnic area unless the operator confirms reopening.",
      "verificationUrl": "https://blantonmuseum.org/visit/faqs/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can I visit Ellsworth Kelly's Austin without another admission charge?",
      "answer": "The freestanding colored-glass artwork Austin by Ellsworth Kelly is a permanent part of the Blanton collection, and entry is included with the museum ticket, including qualifying free Tuesday admission. Visitors should treat it as a quiet, reflective artwork.",
      "verificationUrl": "https://blantonmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://blantonmuseum.org/permanent-collection/austin/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Blanton Museum wheelchair accessible and can I request ASL?",
      "answer": "Museum buildings, elevators, accessible restrooms and Ellsworth Kelly's Austin have accessible routes; loaner wheelchairs are available. The Brazos Street drop-off supports accessible arrival. Request ASL interpretation at least two weeks in advance for events or guided programs.",
      "verificationUrl": "https://blantonmuseum.org/visit/accessibility/",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/accessibility/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Do groups need a reservation to tour the Blanton?",
      "answer": "Non-UT groups of eight or more must register at least two weeks ahead, including a self-guided group. Unauthorized commercial or third-party guided lecturing is not permitted, and paid guided visits follow different admission rules than general admission.",
      "verificationUrl": "https://blantonmuseum.org/visit/group-visits/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/faqs/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is Blanton Museum a good visit with children under twelve?",
      "answer": "Yes. The museum offers activity boxes, family art events and public tours, but children younger than twelve must be supervised by adults throughout. Ellsworth Kelly's Austin is not a play room; pick a few works and galleries appropriate to each child's interests.",
      "verificationUrl": "https://blantonmuseum.org/visit/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://blantonmuseum.org/visit/families/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "alvin-historical-museum": [
    {
      "question": "What days and times is Alvin Historical Museum open?",
      "answer": "The museum society lists Tuesday through Saturday, 11 a.m. to 3 p.m. Since local volunteers operate the museum, verify holiday or staffing changes directly at 281-331-4469 before making a dedicated trip.",
      "verificationUrl": "https://alvinmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Do I need an appointment for the Slover–Rogers Cottage?",
      "answer": "Yes. The separately located Slover–Rogers Cottage at 113 East Dumble Street is only available by appointment. Its historic-house tours are not included automatically in a normal walk-in visit to the downtown historical museum.",
      "verificationUrl": "https://alvinmuseum.org/slover-rogers-cottage/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/slover-rogers-cottage/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the Nolan Ryan exhibit part of the Alvin Historical Museum?",
      "answer": "Yes. The museum lists personal objects covering Nolan Ryan's youth and career, including a Little League home plate and a jersey associated with his final professional appearance. Which individual objects are on display can change.",
      "verificationUrl": "https://alvinmuseum.org/alvin-musuem/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/alvin-musuem/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is Alvin Historical Museum and is it still in the old post office?",
      "answer": "The Alvin Museum Society now lists 300 West Sealy Street as its address. The site occupies Alvin's former 1940 post office, with historic architectural elements and a restored mural. Older directory records list a different West Sealy street number, so use the museum's current instructions.",
      "verificationUrl": "https://alvinmuseum.org/tour-01_intro-to-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/tour-01_intro-to-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can wheelchair users visit the former Alvin post office building?",
      "answer": "The museum reports that an accessible door was installed on the east wall when the old post-office building was adapted. Ask staff at 281-331-4469 about gallery routes, restroom access, and any needs the published building history does not address.",
      "verificationUrl": "https://alvinmuseum.org/tour-01_intro-to-museum/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/tour-01_intro-to-museum/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "How long does a typical visit to the Alvin museum take?",
      "answer": "A focused visit of about 60–90 minutes is an independent planning estimate for selected galleries about railroad, baseball, school and town history; it is not a museum-issued timed ticket. A Slover–Rogers Cottage tour requires a separate appointment.",
      "verificationUrl": "https://alvinmuseum.org/alvin-musuem/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does Alvin Museum have a café or gift shop?",
      "answer": "The museum has a volunteer-run gift shop in the former post-office foyer, usually open during museum hours. Its official pages do not establish a cafeteria or full-service restaurant; plan meals elsewhere in Alvin.",
      "verificationUrl": "https://alvinmuseum.org/alvin-musuem/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/alvin-musuem/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is there an admission fee to Alvin Historical Museum?",
      "answer": "The museum homepage clearly gives public visiting hours but does not publish a dependable current admission price. Rather than assume entry is free, call the society at 281-331-4469 to check admission or group costs before traveling.",
      "verificationUrl": "https://alvinmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://alvinmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "el-paso-holocaust-museum": [
    {
      "question": "Is admission to El Paso Holocaust Museum free?",
      "answer": "Yes. The museum's current visit page explicitly states that general admission is free and that donations are appreciated. Guided school groups and special programs still need to follow their own reservation instructions.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What are the museum's hours and can I visit on Sunday?",
      "answer": "The museum lists Tuesday–Friday 9 a.m.–5 p.m., Saturday 1–5 p.m., Monday closed, and Sunday visits by appointment only. Self-guided visits must begin at least 30 minutes before closing and listed religious or public holiday closures can override regular hours.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Where is the visitor entrance and is parking free?",
      "answer": "The postal address is 715 North Oregon Street, but the visitor entrance is on Yandell Drive between Oregon and El Paso streets. The operator advertises free parking adjacent to the museum at the intersection of Yandell and El Paso streets.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Are El Paso Holocaust Museum exhibits available in Spanish?",
      "answer": "The museum says its permanent gallery materials are presented in English and Spanish. It also rotates a Spanish-language Dimensions in Testimony experience with survivor Lea Noverra; check that week's schedule before expecting that particular testimony.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/about-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/dimensions-in-testimony/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What is Dimensions in Testimony and can visitors speak with a survivor?",
      "answer": "The interactive exhibit uses digitally recorded testimony and language technology so visitors can ask questions and hear prerecorded answers from a Holocaust survivor or liberator. It is not a live conversation. The featured biography changes weekly and presentation times are separate from ordinary gallery hours.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/dimensions-in-testimony/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/dimensions-in-testimony/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is El Paso Holocaust Museum suitable for young children?",
      "answer": "The museum includes explicit historical accounts of persecution, concentration camps, death and survivor experiences. There is no blanket published minimum age on its general visitor page; caregivers and teachers should judge readiness and contact the education team for age-appropriate group guidance.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/about-us/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can a teacher arrange a Holocaust education group tour?",
      "answer": "Yes. The museum invites schools and other groups to reserve guided visits and offers curriculum trunks and outreach speakers. Booking ahead is important even though ordinary self-guided entry is free. Call 915-351-0048 for group program details.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the museum have a cafeteria or accessible gallery entrances?",
      "answer": "The official visitor material documents a Yandell Drive public entrance and free adjoining parking, but does not substantiate an on-site cafeteria or give comprehensive step-free gallery and restroom details. Confirm food and specific accessibility needs with the museum before arrival.",
      "verificationUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://elpasoholocaustmuseum.org/hours-and-closures/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ],
  "el-paso-museum-of-archaeology": [
    {
      "question": "Is the El Paso Museum of Archaeology free and what days is it open?",
      "answer": "Yes. The City of El Paso states that regular admission to the archaeological galleries is free. Its normal public schedule is Tuesday through Saturday, 9 a.m. to 5 p.m., with city-holiday closures; ticketed events or performances may have separate costs.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "When does the El Paso archaeology museum parking lot close?",
      "answer": "The museum expressly locks its lot gates at 5 p.m. and recommends parking outside the gates if visitors intend to access the trails after 4 p.m. Do not plan on leaving a car inside the gated lot for an evening desert hike.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the El Paso Museum of Archaeology require advance booking for school tours?",
      "answer": "Yes. Free museum-guided tours are offered to groups but must be scheduled at least two weeks in advance. Ordinary self-guided public entry does not require that group reservation; confirm any classroom programming details with museum staff.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is the museum wheelchair accessible and does it lend wheelchairs?",
      "answer": "The operator lists ADA-focused indoor access, accessible restrooms and first-come wheelchairs at the front desk. The outdoor desert trails have a different terrain and exposure profile; ask staff about mobility suitability before selecting a trail.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "What archaeological periods and cultures are explored at this museum?",
      "answer": "The institution describes approximately fourteen thousand years of El Paso and Southwestern prehistory, with dioramas and exhibits on Indigenous lifeways from Paleoindian communities to modern descendants. Exhibitions and the objects on display change over time.",
      "verificationUrl": "https://epmarch.org/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/about-epmarch",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Can families hike the desert trails after visiting the archaeology galleries?",
      "answer": "Yes, the museum grounds connect with Wilderness Park's native-plants and nature-trail areas, but trail suitability depends on heat, daylight and terrain. The parking gates lock at 5 p.m.; outdoor access does not mean a late parking pass.",
      "verificationUrl": "https://visitelpaso.com/places/el-paso-museum-of-archaeology-wilderness-park",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Is visitor photography permitted inside the museum?",
      "answer": "The official visitor page permits ordinary visitor photos with restrictions and asks visitors to respect exhibits and other people. Commercial media shoots or press interviews need advance approval through the City's public-information office.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    },
    {
      "question": "Does the El Paso Museum of Archaeology have a cafeteria or restaurant?",
      "answer": "The official visitor guidance describes an on-site museum store and outdoor nature trails but does not establish a café or full-service restaurant. Bring appropriate water for outdoor conditions and make dining plans outside the museum.",
      "verificationUrl": "https://epmarch.org/about/plan-your-visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epmarch.org/about/plan-your-visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-13"
    }
  ]
};
export const museumVisitorFaqFor = (slug: string): readonly MuseumVisitorFaq[] => museumVisitorFaqs[slug] ?? [];
