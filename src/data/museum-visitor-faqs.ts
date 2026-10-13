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
  ]
};
export const museumVisitorFaqFor = (slug: string): readonly MuseumVisitorFaq[] => museumVisitorFaqs[slug] ?? [];
