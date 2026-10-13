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
      "answer": "The museum's visitor page lists Tuesday through Saturday from 10 a.m. to 5 p.m., closed on Sundays and Mondays in the ordinary schedule. Special events, holidays and exhibitions may alter access; check museum updates before leaving.",
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
  "el-paso-museum-of-art": [
    {
      "question": "Is El Paso Museum of Art free to enter?",
      "answer": "Yes. The El Paso Museum of Art advertises free general admission year-round, including ordinary exhibits and free museum-led tours when arranged in advance. Some separately ticketed programs are not described by standard gallery entry, so consult the specific event before visiting.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What days and hours is El Paso Museum of Art open?",
      "answer": "The museum lists Wednesday through Saturday from 10 a.m. to 6 p.m., and Sunday 11 a.m. to 3 p.m. It is closed on Monday, Tuesday and major holidays. Check current temporary exhibit and construction notices before making a dedicated trip.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Where do visitors park for El Paso Museum of Art?",
      "answer": "The museum is at One Arts Festival Plaza in central El Paso. Nearby facilities include the JPMorgan Chase, Mills and One Civic Center Plaza garages; garages and downtown meters charge fees that vary, so the museum recommends comparing parking locations and using the Park 915 app.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit/tours",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Is the museum wheelchair accessible and are service animals permitted?",
      "answer": "Yes. The official visitor guide states that the facility is fully accessible, welcomes service animals and can lend a wheelchair without charge from the reception desk. Contact 915-212-0300 to arrange any additional accommodation or route information.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are children and school groups welcome at the El Paso Museum of Art?",
      "answer": "Yes. The museum offers family activity guides at Visitor Services, drawing activities and occasional augmented-reality art interpretation. School groups can reserve no-cost guided visits; students from kindergarten through twelfth grade may qualify for a guided Tour + Studio arts session.",
      "verificationUrl": "https://epma.art/visit/tours",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "How far ahead should I book an El Paso Museum of Art tour?",
      "answer": "The museum's tour FAQ says guided tours for groups of 10–50 should be requested at least two weeks in advance and typically last 45–60 minutes. Tour + Studio programs for school groups require about four weeks' advance booking, and may last around 90 minutes.",
      "verificationUrl": "https://epma.art/visit/tours",
      "questionOrigin": "museum-faq",
      "questionEvidenceUrl": "https://epma.art/visit/tours",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "May visitors photograph art inside the museum?",
      "answer": "Yes, for personal noncommercial use if the individual work is not marked otherwise. The museum prohibits flash, tripods, selfie sticks and disruptive staged shoots without prior permission. Any artwork marked with a no-photography symbol must not be photographed.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Does El Paso Museum of Art have a cafeteria or restaurant?",
      "answer": "The museum's current public visitor and tour pages do not clearly confirm an in-gallery café, full-service restaurant or cafeteria. Food and drink are prohibited inside gallery spaces, so plan a meal elsewhere downtown rather than assuming the museum offers dining.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Which art should I see at the El Paso Museum of Art?",
      "answer": "Start with whichever European Kress masterpieces, Mexican retablos, American paintings and changing contemporary exhibitions are actually on view. These collection themes are stable, but displays move during conservation or special programs; the published exhibition calendar is the source for today's galleries.",
      "verificationUrl": "https://epma.art/art/collections",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/art/collections/european",
      "reviewCycle": "quarterly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "Are all second-floor European and American galleries reopened after the HVAC project?",
      "answer": "The city temporarily closed the museum during a 2025–early 2026 HVAC improvement project. Current visitor information lists the museum open and promotes European and American collection areas, but individual galleries can change. Confirm the specific room's availability with Visitor Services rather than relying on older renovation FAQs.",
      "verificationUrl": "https://epma.art/visit",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    },
    {
      "question": "What temporary exhibits are open in October 2026?",
      "answer": "As of October 12, 2026, the museum lists EPISD Creativity Through Our Eyes until October 25, 2026, and America, The Beautiful: Zoe Diaz collection selections through January 3, 2027. Both are date-bound; check EPMA's updated calendar rather than relying on these dates after they pass.",
      "verificationUrl": "https://epma.art/",
      "questionOrigin": "editorial-research",
      "questionEvidenceUrl": "https://epma.art/visit",
      "reviewCycle": "monthly",
      "reviewed": "2026-10-12"
    }
  ]
};
export const museumVisitorFaqFor = (slug: string): readonly MuseumVisitorFaq[] => museumVisitorFaqs[slug] ?? [];
