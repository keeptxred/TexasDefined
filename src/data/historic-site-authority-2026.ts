import type { Destination, DestinationAuthorityGuide } from "./types";

// Source-reviewed 2026-10-12 against operator visitor and history pages.
// Existing slugs/canonicals remain unchanged; keep ticket prices and fixed hours on operators' live pages.
const historicAuthority: Record<string, { extraBody: string[]; authorityGuide?: DestinationAuthorityGuide; hero?: Destination["hero"] }> = {
  "fort-davis-national-historic-site": {
    "extraBody": [
      "The National Park Service distinguishes the original 1854 post from the larger installation reoccupied and rebuilt after the Civil War. Exploring the surviving parade ground and furnished structures with that distinction in mind explains why the post looks as it does today.",
      "For families, a visitor-center film and Junior Ranger materials provide orientation before walking among the buildings. There is no lodging or camping inside the national historic site; nearby Fort Davis and Davis Mountains State Park are separate places to investigate for an overnight stay.",
      "The fort’s layout is a useful historical document in its own right. The National Park Service describes six furnished buildings, more than twenty additional buildings and approximately one hundred ruins. Visitors should compare what has been restored with what survives only as foundations; the post was not all constructed at one time and was rebuilt on a new alignment beginning in 1867.",
      "The first military occupation began in 1854 beside the San Antonio–El Paso Road, then ended during the Civil War. When the U.S. Army returned in 1867, the 9th Cavalry and later Black Regular regiments helped turn it into the larger post represented by Officers’ Row and the parade ground. That rebuilding explains both the scale of the ruins and the variety of surviving architecture.",
      "Fort Davis also provides a place to discuss the interests of the people the Army confronted. Protecting migrants, mail and freight was part of federal westward expansion into territories that Indigenous peoples already occupied; the campaigns involving Comanche, Kiowa and Apache communities must remain central rather than reduced to a brief note about frontier danger.",
      "For an efficient visit, begin with the official visitor-center orientation, then inspect furnished and unfurnished spaces in sequence. The mountain trails provide a different way to read the fort’s strategic position, but are optional and require separate attention to heat and exertion. The national historic site itself offers neither lodging nor camping."
    ],
    "authorityGuide": {
      "whyItMatters": "Fort Davis illustrates how the U.S. Army guarded the San Antonio–El Paso Road and how the post shaped — and was shaped by — travel, trade and conflict over Indigenous homelands. Its surviving buildings also make the service of Black Regular Army soldiers, civilian workers and military families tangible.",
      "assessment": {
        "recommendedVisit": "Allow about 1–2 hours for the core fort, more for trails and a nearby Davis Mountains stop.",
        "physicalEffort": "Moderate",
        "weatherExposure": "Mostly outdoors",
        "planningLevel": "Low",
        "familyFit": "Good for families using the visitor-center film, furnished buildings and Junior Ranger activities.",
        "firstTimeValue": "Start at the visitor center, then walk the post in building order instead of treating the ruins as isolated photo stops."
      },
      "itineraries": [
        {
          "label": "Quick post walk",
          "duration": "60–90 minutes",
          "steps": [
            "Start with the visitor-center orientation.",
            "Visit the furnished barracks and officers' quarters.",
            "Compare the parade ground with the mountain backdrop."
          ]
        },
        {
          "label": "History-focused visit",
          "duration": "2–3 hours",
          "steps": [
            "Watch the orientation film and study the site map.",
            "Explore the furnished buildings and ruins, looking for Buffalo Soldier stories.",
            "Use exhibits to contrast the 1854 and 1867 military posts."
          ]
        },
        {
          "label": "Davis Mountains history day",
          "duration": "Half to full day",
          "steps": [
            "Spend a deliberate morning at the fort.",
            "Add the trails or scenic overlooks if conditions allow.",
            "Continue to Fort Davis town or Davis Mountains State Park; check separate access requirements."
          ]
        }
      ],
      "sources": [
        {
          "label": "NPS — Fort Davis visit planning",
          "url": "https://www.nps.gov/foda/planyourvisit/index.htm",
          "scope": "Official orientation, facilities, self-guided touring and visit planning."
        },
        {
          "label": "NPS — Fort Davis frontier post",
          "url": "https://www.nps.gov/foda/fortdavisfrontierpost.htm",
          "scope": "Post history, San Antonio–El Paso Road and military frontier context."
        }
      ]
    }
  },
  "san-jacinto-battleground": {
    "extraBody": [
      "The Texas Historical Commission lists battleground access separately from the monument and museum, making a day-of-week check especially important. The outdoor battlefield can still be the focus of a visit when indoor attractions are operating on a different schedule.",
      "Read the battlefield topography before focusing on the obelisk: the 1836 fight unfolded across coastal prairie and wetlands, while the modern Houston Ship Channel radically altered the surroundings. The historic battleship long associated with San Jacinto is no longer a dependable on-site companion attraction.",
      "The battle site should be understood separately from the San Jacinto Monument and museum. The monument is a twentieth-century act of commemoration; the important historical evidence outside is the surviving field, river approach and wetland terrain where the battle unfolded in 1836. A museum-only visit and a battlefield-only visit answer different questions.",
      "The nearby bayous and marshes help explain why movement and retreat were difficult during the April 21 battle. The changing shoreline and later construction of the Houston Ship Channel also mean that a modern visitor is not looking at an untouched battlefield. Interpretive maps and archaeological findings are essential companions to the visible landscape.",
      "The political consequence of the battle should not be confused with an immediate, universally recognized international settlement. Texas independence was declared at Washington-on-the-Brazos weeks earlier; San Jacinto transformed the military campaign, but Mexico did not recognize the Republic during its lifetime. That difference makes pairing the two sites intellectually useful.",
      "Plan the day around the operator’s separate schedules for the battleground and interior monument/museum activities. The area can be hot and humid, and there is little reason to force an outdoor visit into the middle of a summer afternoon when interpretation indoors or a shorter field walk would work better."
    ],
    "authorityGuide": {
      "whyItMatters": "San Jacinto connects the April 21, 1836 battle with the political and military aftermath of the Texas Revolution. The battlefield's prairie, bayou and marsh geography is the central primary evidence for understanding why the armies met here; the monument and museum explain how Texans later remembered the encounter.",
      "assessment": {
        "recommendedVisit": "Plan roughly 1.5–3 hours for museum, monument and battlefield context, longer for a ranger or guided walk.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mixed indoor/outdoor",
        "planningLevel": "Moderate",
        "familyFit": "Museum orientation works well before an outdoor battlefield walk; keep heat and open terrain in mind.",
        "firstTimeValue": "Check battleground and monument/museum hours separately. They do not necessarily share the same opening days."
      },
      "itineraries": [
        {
          "label": "Battlefield overview",
          "duration": "60–90 minutes",
          "steps": [
            "Orient yourself at the battlefield signage.",
            "Walk a short section of the battlefield landscape.",
            "Locate the monument relative to the bayou and prairie."
          ]
        },
        {
          "label": "Monument and museum",
          "duration": "2–3 hours",
          "steps": [
            "Check the monument and museum's operating day before departure.",
            "Visit exhibitions or the observation level if available.",
            "Revisit the field using the interpretation and site map."
          ]
        },
        {
          "label": "Revolution history day",
          "duration": "Half to full day",
          "steps": [
            "Begin at San Jacinto.",
            "Follow the military story back through the Alamo and Goliad using TexasDefined's Revolution route.",
            "Use La Porte or Bay Area Houston as a practical base for the return drive."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — San Jacinto Battleground",
          "url": "https://thc.texas.gov/historic-sites/san-jacinto-battleground",
          "scope": "Site access, monument and museum visitor guidance."
        },
        {
          "label": "THC — plan your San Jacinto visit",
          "url": "https://thc.texas.gov/state-historic-sites/san-jacinto-battleground/plan-your-visit-san-jacinto-battleground",
          "scope": "Tour durations, on-site facilities and reservations."
        }
      ]
    }
  },
  "the-alamo": {
    "extraBody": [
      "The best interpretation distinguishes the 1718 mission community, the nineteenth-century military occupation, the 1836 siege and later efforts to preserve and reconstruct the grounds. Current exhibits and archaeology reveal a site that changed repeatedly rather than a single building frozen in March 1836.",
      "The Alamo's official visitor guide confirms that a timed reservation is required for free church admission, while the Alamo Exhibit and guided experiences have separate ticketing. Treat its construction and preservation program as a live visitor-planning variable and confirm the current entrance route before a downtown trip.",
      "Mission San Antonio de Valero preceded the famous battle by more than a century. Reading the Alamo as a mission, a military post, a siege site and an evolving preservation landscape provides a more accurate chronology than treating the surviving church façade as an unchanged snapshot of 1836.",
      "Visitors should distinguish the historic church, archaeological remnants, reconstructed or later architectural features, memorial installations and modern exhibition spaces. The present Alamo Plaza experience reflects substantial later alteration and preservation choices; surviving colonial materials and modern interpretation do not all date to the same period.",
      "A serious visit should include the people and communities associated with the mission before the siege, including Indigenous residents and Spanish colonial officials, alongside the Texian and Mexican forces of 1836. José Antonio Navarro’s nearby historic home is a useful companion for understanding Tejano political leadership beyond a battlefield-only account.",
      "Official Alamo guidance currently requires free timed church reservations, while the Alamo Exhibit, guided experiences and other attractions may use different tickets. Visitors should confirm active entrances and any construction-related changes through Alamo Trust rather than assuming one reservation covers every attraction."
    ]
  },
  "goliad-state-park": {
    "extraBody": [
      "The mission buildings visible today reflect major preservation work by the Civilian Conservation Corps in the 1930s, not an unchanged eighteenth-century complex. TPWD's interpretation covers the mission's Spanish colonial ranching economy and the Indigenous people whose lives the mission system affected.",
      "The park is also a recreation destination, with camping, trails and San Antonio River access described by TPWD. Visitors planning to fish or paddle should research current water and park conditions rather than assuming the historic-site visit includes any particular river activity.",
      "Mission Espíritu Santo interpreted at the park was part of a system of Spanish colonial settlement, livestock production and religious conversion along the San Antonio River. Understanding the mission requires attention to Indigenous populations and labor as well as missionaries, ranching and the architectural remains.",
      "Much of the chapel and adjacent fabric visible today reflects the extensive 1930s work of the Civilian Conservation Corps. This does not diminish the site, but it changes how visitors should read its architecture: the mission is a preserved and reconstructed historical interpretation rather than a complete untouched eighteenth-century building.",
      "Goliad offers an unusually clear opportunity to compare a mission with its associated military presidio. The two properties have separate operators and visitor arrangements. The mission helps explain a Spanish and Mexican-era community, while Presidio La Bahía also preserves military and Texas Revolution associations.",
      "Outside the mission, TPWD identifies camping, riverside trails and wildlife viewing among the park’s activities. These can make Goliad a full weekend rather than an indoor history visit, but trip planners should distinguish park camping reservations from any tour admission or operating schedule at the neighboring presidio."
    ],
    "authorityGuide": {
      "whyItMatters": "Goliad State Park makes the colonial mission-and-ranching system legible within the San Antonio River landscape, while also connecting the Spanish period to Indigenous history and the later Goliad campaign. The mission and the nearby presidio are different sites with distinct operators and visiting arrangements.",
      "assessment": {
        "recommendedVisit": "Allow 1.5–2.5 hours for the mission and river-side park, more if camping or linking several Goliad historic properties.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mixed indoor/outdoor",
        "planningLevel": "Moderate",
        "familyFit": "The restored chapel, exhibits and river-side grounds provide varied stops; separate camping and water activities from historical touring.",
        "firstTimeValue": "Do not confuse Mission Espíritu Santo inside the state park with nearby Presidio La Bahía; check each site's hours and admission."
      },
      "itineraries": [
        {
          "label": "Mission orientation",
          "duration": "60–90 minutes",
          "steps": [
            "Start at the park's mission exhibits.",
            "Visit the restored Mission Espíritu Santo chapel.",
            "Review the mission's agricultural and ranching role."
          ]
        },
        {
          "label": "Park and mission visit",
          "duration": "2–3 hours",
          "steps": [
            "Explore mission buildings and interpretation.",
            "Walk a manageable stretch of park trail or the river setting.",
            "Check the El Camino Real visitor materials on site."
          ]
        },
        {
          "label": "Goliad history circuit",
          "duration": "Half to full day",
          "steps": [
            "Visit Mission Espíritu Santo first.",
            "Continue to separately operated Presidio La Bahía.",
            "If time permits, add Fannin Battleground or downtown Goliad."
          ]
        }
      ],
      "sources": [
        {
          "label": "TPWD — Goliad State Park",
          "url": "https://tpwd.texas.gov/state-parks/goliad",
          "scope": "State-park mission, camping, trails and San Antonio River activities."
        },
        {
          "label": "TPWD — Goliad area historic sites",
          "url": "https://tpwd.texas.gov/state-parks/goliad/goliad-area-historic-sites",
          "scope": "Mission Espíritu Santo and nearby Goliad heritage sites."
        }
      ]
    },
    "hero": {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mission_Esp%C3%ADritu_Santo%2C_Goliad_TX.jpg?width=1600",
      "alt": "Front of the restored Mission Espíritu Santo chapel in Goliad State Park, with its white stucco facade and bell tower",
      "width": 1600,
      "height": 1200,
      "credit": "Ernest Mettendorf · Public domain · Wikimedia Commons"
    }
  },
  "fort-lancaster": {
    "extraBody": [
      "Texas Historical Commission interpretation identifies the remnants of more than thirty buildings at this frontier post and explains the role of Army camel expeditions. A useful visit begins indoors with the site layout, then follows the foundations to reconstruct how troops were supplied in such an isolated location.",
      "Accessible travel requires advance planning: the official visitor guide describes gravel surfaces and limited wheelchair accessibility, with golf-cart assistance subject to availability. This site should not be approached as a paved urban museum or a convenient last-minute roadside stop.",
      "Fort Lancaster began as Camp Lancaster in August 1855 and was formally named a fort in 1856. Its position on Live Oak Creek near the San Antonio–El Paso Road shows that reliable water and a workable wagon road mattered more to military logistics than commanding architecture.",
      "The surviving foundations reveal an infantry post built with local stone and adobe. Visitors should not expect the number of intact rooms found at Fort McKavett. The site becomes more informative when a plan of the barracks, storehouses and support functions is matched against the remains in the ground.",
      "Fort Lancaster has two especially distinctive stories that a generic fort itinerary misses. The Army camel experiments passed through the site, and in December 1867 Company K of the 9th U.S. Cavalry fought a major attack associated with Kickapoo and allied warriors. Both episodes belong inside broader, contested stories of Army mobility and Indigenous resistance.",
      "Texas Historical Commission excavations in the twentieth century uncovered foundations and material culture left by soldiers, civilians, earlier inhabitants and later ranching activity. On site, visitors should distinguish the nineteenth-century archaeological evidence from the modern interpretive route, and treat remoteness, summer heat and limited services as primary planning considerations."
    ],
    "authorityGuide": {
      "whyItMatters": "Fort Lancaster's exposed ruins explain the military logistics of the San Antonio–El Paso road in a place where distance and limited supplies remain obvious. The post's history includes the Army's camel expeditions, Civil War occupation and later service by Buffalo Soldiers.",
      "assessment": {
        "recommendedVisit": "THC lists Tuesday–Saturday 9 a.m.–5 p.m., with an approximately one-hour self-guided route through widely spaced ruins. Gravel paths are not ADA-rated; guided battlefield tours and limited golf-cart assistance are separate options.",
        "physicalEffort": "Moderate",
        "weatherExposure": "Fully outdoors",
        "planningLevel": "High",
        "familyFit": "Best for families comfortable walking among exposed ruins after a visitor-center orientation; carry water.",
        "firstTimeValue": "It is a remote landscape-first stop. Confirm current staffed hours, conditions and the route before leaving a service town."
      },
      "itineraries": [
        {
          "label": "Ruins overview",
          "duration": "About 1 hour",
          "steps": [
            "Orient at the visitor center.",
            "Walk the most accessible surviving foundations.",
            "Look back across Live Oak Creek and the overland route."
          ]
        },
        {
          "label": "Frontier fort study",
          "duration": "2–3 hours",
          "steps": [
            "Explore Army road and transport interpretation.",
            "Trace the former fort's building plan and material remains.",
            "Review the camel experiment, Civil War and Buffalo Soldier chapters."
          ]
        },
        {
          "label": "West Texas frontier circuit",
          "duration": "Half to full day",
          "steps": [
            "Drive prepared with fuel, water and weather in mind.",
            "Give the fort enough time for interpretive stops and ruins.",
            "Continue toward Sheffield or Ozona for services and broader regional history."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — Fort Lancaster and Battlefield",
          "url": "https://thc.texas.gov/historic-sites/fort-lancaster",
          "scope": "Site overview, historic structures and access information."
        },
        {
          "label": "THC — visit Fort Lancaster",
          "url": "https://thc.texas.gov/state-historic-sites/fort-lancaster/plan-your-visit-fort-lancaster",
          "scope": "Public touring, accessibility and visitor facilities."
        }
      ]
    }
  },
  "fort-griffin": {
    "extraBody": [
      "Fort Griffin is more than a set of military ruins. The Texas Historical Commission also manages the Official State of Texas Longhorn Herd here, and its visitor guidance describes hiking, stargazing and overnight camping as parts of the site experience.",
      "The fort was established in 1867 above the Clear Fork of the Brazos. Interpreting nearby cattle trails, buffalo hunting and the boomtown known as the Flat helps explain the economics and social disruption of the Texas frontier without reducing the story to an Army timeline.",
      "Camp Wilson was founded in July 1867 above the Clear Fork of the Brazos and was renamed Fort Griffin. Despite plans for permanent construction, shortages of money and materials left the post with many temporary structures, making its surviving ruins a useful contrast to better-restored forts elsewhere in Texas.",
      "The civilian settlement below the post, called the Flat or Hide Town, drew soldiers, merchants, drovers, buffalo hunters and people participating in a violent and fast-changing frontier economy. The boomtown should not be treated as a colorful anecdote; it explains how federal military spending, hides, cattle trails and new settlement interacted.",
      "Fort Griffin supported campaigns associated with the Red River War of 1874–1875. Accounts of Army operations must also explain the lives of Native nations displaced and attacked, and why the destruction of the bison herds mattered materially to Southern Plains communities.",
      "Today, the official longhorn herd, outdoor recreation and camping add substantial visitor value beyond the fort ruins. These experiences have their own timing and conditions, so check the Texas Historical Commission’s latest visitor guidance and do not assume cattle viewing, night-sky programs or guided interpretation occur at every visit."
    ],
    "authorityGuide": {
      "whyItMatters": "Fort Griffin joins Army frontier history with the cattle-trail economy, buffalo-hunting boomtowns and the fate of the southern bison herds. It is also unusual among the forts on this list because visitors can connect preserved ruins with the Official State of Texas Longhorn Herd and outdoor recreation.",
      "assessment": {
        "recommendedVisit": "Allow 1–2 hours for core exhibits and fort ruins; extend for the longhorn herd, trails or camping.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mostly outdoors",
        "planningLevel": "Low",
        "familyFit": "Good variety of ruins, longhorn heritage and outdoor recreation when weather permits.",
        "firstTimeValue": "Start at the visitor center, then choose between the fort site, herd viewing and available trails rather than assuming one short loop covers everything."
      },
      "itineraries": [
        {
          "label": "Historic fort overview",
          "duration": "60–90 minutes",
          "steps": [
            "Start at the visitor center.",
            "Walk the fort ruins.",
            "Orient to the Clear Fork of the Brazos landscape."
          ]
        },
        {
          "label": "Fort and herd",
          "duration": "2–3 hours",
          "steps": [
            "Explore the post's Army history.",
            "Learn about the nearby settlement known as the Flat and the cattle trails.",
            "Add the longhorn herd and trail interpretation if access permits."
          ]
        },
        {
          "label": "Albany country weekend",
          "duration": "Half to full day",
          "steps": [
            "Spend the morning at Fort Griffin.",
            "Add hiking, stargazing or camping according to the site's current rules.",
            "Continue into Albany for food, lodging and local history."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — Fort Griffin",
          "url": "https://thc.texas.gov/historic-sites/fort-griffin",
          "scope": "Site history, longhorn herd and camping information."
        },
        {
          "label": "THC — plan a Fort Griffin visit",
          "url": "https://thc.texas.gov/state-historic-sites/fort-griffin/plan-your-visit-fort-griffin",
          "scope": "Touring options, exhibits and on-site activities."
        }
      ]
    }
  },
  "fort-mckavett": {
    "extraBody": [
      "Fort McKavett's restored quarters, hospital, schoolhouse and headquarters let visitors compare the daily routines of officers, enlisted soldiers and the people who supported post life. The site is especially useful for understanding the Black Regular Army soldiers commonly called Buffalo Soldiers.",
      "The Texas Historical Commission describes much of the historic property as not wheelchair accessible, while the visitor center and museum have better access. Its optional golf-cart arrangements and the weather-exposed grounds make the operator's current visit guide an essential planning source.",
      "The original post dates to March 1852, but the fort’s later form reflects a different phase of frontier military expansion. The Army left in 1859, while an 1868 reoccupation turned Fort McKavett into a major logistical depot until its final military abandonment in 1883.",
      "Rather than treating the barracks, schoolhouse, hospital and officers’ homes as disconnected ruins, imagine how supplies were delivered, food stored, soldiers housed and medical care provided before dependable rail connections. The proximity of everyday buildings around the parade ground is part of what makes this fort unusually legible.",
      "Fort McKavett was used by Black Regular Army soldiers as well as other federal units, and those soldiers’ service coexisted with discrimination and wider Army campaigns against Native communities. The historic buildings preserve traces of civilian, enlisted, officer and military families’ lives rather than just battlefield history.",
      "The post was occupied briefly during the Civil War and used as a prisoner-of-war camp before Texas forces abandoned it in April 1862. The 1868 return and expanded supply role explain why different phases of the site should not be collapsed into one date or a single army story.",
      "THC documents soldiers from all four Buffalo Soldier regiments serving here. Sgt. Emanuel Stance of the 9th Cavalry earned the first post-Civil War Medal of Honor awarded to an African American soldier; his service belongs within a fuller account of Black Regulars facing discrimination and participating in campaigns that displaced Indigenous communities.",
      "Women working as Army laundresses, civilians, children and later town residents are part of Fort McKavett's history. After the Army left in 1883, civilians occupied former military buildings for decades; the final residents departed original buildings in 1973, showing why surviving structures record more than their initial military uses.",
      "Visitor mobility deserves direct treatment. The state’s official guidance distinguishes more accessible visitor-center facilities from uneven and less accessible historic areas. A careful guide should say what can be experienced comfortably in a shorter visit and when assistance or a different route should be arranged."
    ],
    "authorityGuide": {
      "whyItMatters": "Fort McKavett's surviving buildings offer an unusually readable plan of a nineteenth-century frontier garrison. Its military, civilian and Buffalo Soldier history becomes more meaningful when the visitor traces everyday functions such as housing, medical care, schooling and supply around the parade ground.",
      "assessment": {
        "recommendedVisit": "The historic site is listed open daily 8 a.m.–5 p.m., while the 1–2-hour self-guided tour operates 8 a.m.–4 p.m. without advance reservations. Most historic grounds are not wheelchair accessible; the visitor center is accessible and $5 golf-cart rentals may assist with some areas. Groups and school tours have separate scheduling.",
        "physicalEffort": "Moderate",
        "weatherExposure": "Mostly outdoors",
        "planningLevel": "High",
        "familyFit": "Excellent for a building-by-building history activity; children can identify the hospital, schoolhouse, barracks and other post functions.",
        "firstTimeValue": "The visitor center is a logical first stop and has different accessibility characteristics than much of the historic terrain."
      },
      "itineraries": [
        {
          "label": "Parade-ground circuit",
          "duration": "60–90 minutes",
          "steps": [
            "Start at the historic hospital visitor center.",
            "Walk the main restored buildings and parade ground.",
            "Compare living quarters and work spaces."
          ]
        },
        {
          "label": "Post and people",
          "duration": "2–3 hours",
          "steps": [
            "Use interpretation to identify Buffalo Soldiers and civilians.",
            "Visit the barracks, schoolhouse and medical buildings.",
            "Add the original quarry or spring area if access and conditions allow."
          ]
        },
        {
          "label": "Menard frontier history day",
          "duration": "Half to full day",
          "steps": [
            "Spend an unrushed morning at Fort McKavett.",
            "Explore the surrounding plateau views.",
            "Continue to Menard and the San Saba River corridor for settlement history."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — Fort McKavett",
          "url": "https://thc.texas.gov/historic-sites/fort-mckavett",
          "scope": "Official site history, buildings and programs."
        },
        {
          "label": "THC — plan a Fort McKavett visit",
          "url": "https://thc.texas.gov/state-historic-sites/fort-mckavett/plan-your-visit-fort-mckavett",
          "scope": "Self-guided touring, accessibility and facilities."
        },
        {
          "label": "THC — Fort McKavett history",
          "url": "https://thc.texas.gov/state-historic-sites/fort-mckavett/fort-mckavett-history",
          "scope": "1852 founding, 1859 and 1883 military closures, Civil War occupation, Buffalo Soldiers, laundresses and civilian reuse."
        }
      ]
    }
  },
  "washington-on-the-brazos": {
    "extraBody": [
      "The Texas Historical Commission now distinguishes free access to the visitor-center grounds on certain days from ticketed museum, townsite and Barrington Farm experiences on others. Visitors should check the individual operating schedule rather than assuming every part of the historic complex is open whenever the grounds are accessible.",
      "The declaration of independence in March 1836 was a political event occurring during a military crisis. Pairing the convention landscape with domestic and agricultural interpretation allows visitors to ask not just how a republic was declared but whose labor sustained the society its leaders envisioned.",
      "The convention held at Washington in March 1836 did more than issue a famous document: delegates confronted immediate questions of government, military power and political legitimacy while an armed conflict was still underway. The townsite’s modest river location helps restore the uncertainty of that moment.",
      "A visit becomes more complete when the townsite and independence interpretation are paired with the Star of the Republic Museum and Barrington Farm. These three places ask different historical questions: political rupture, institutional development and daily agricultural life. They should not be collapsed into one undifferentiated stop.",
      "Barrington Farm’s interpretation is particularly important because household and agricultural life cannot be understood solely through presidents and legislators. Historical questions about the labor systems of early Texas, including enslavement, should be addressed in the broader context of the Republic rather than omitted from a heritage itinerary.",
      "Timing is unusually important at this complex. Public grounds, exhibitions, reconstructed buildings and live interpretation have different schedules. Travelers should confirm which parts are open on their chosen weekday before assuming a short roadside stop can include museum exhibits and farm demonstrations.",
      "The $57 million Washington-on-the-Brazos redevelopment reopened to the public in November 2025, with a reconstructed Republic-era streetscape, a substantially upgraded Star of the Republic Museum, new historical buildings, and an updated visitor center. This is a reconstruction and modern interpretation of the 1836 townscape, not an intact nineteenth-century town; understanding that distinction improves the visit.",
      "The operator currently separates two access patterns: Wednesday through Sunday includes ticketed museum and townsite activities, while on Monday and Tuesday the visitor center and public grounds open without tickets but the museum, Townsite and Barrington Farm are closed. The museum and farm close on their own schedules, so plan enough time for each and recheck current details before traveling."
    ],
    "authorityGuide": {
      "whyItMatters": "Washington-on-the-Brazos is both the landscape of the 1836 independence convention and a complex that interprets the Republic's government, household labor and farm life. The declaration, townsite, museum and Barrington living-history farm are connected but distinct parts of the experience.",
      "assessment": {
        "recommendedVisit": "Allow about 2–4 hours for townsite, museum and living-history portions when those facilities are open; verify individual opening days.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mixed indoor/outdoor",
        "planningLevel": "Moderate",
        "familyFit": "Useful for family history visits when indoor artifacts are paired with outdoor living-history activity.",
        "firstTimeValue": "Choose a day when the museum and farm are open if those are priorities; grounds access and ticketed facilities have different schedules."
      },
      "itineraries": [
        {
          "label": "Independence landscape",
          "duration": "60–90 minutes",
          "steps": [
            "Start at the visitor center.",
            "Walk the convention/townsite interpretation.",
            "Use the Brazos River geography to understand the 1836 settlement."
          ]
        },
        {
          "label": "Republic history half day",
          "duration": "3–4 hours",
          "steps": [
            "Explore Independence Hall interpretation.",
            "Visit the Star of the Republic Museum if open.",
            "Continue to Barrington living-history farm if operating that day."
          ]
        },
        {
          "label": "Brazos River history circuit",
          "duration": "Half to full day",
          "steps": [
            "Begin at Washington-on-the-Brazos.",
            "Add the museum and farm with sufficient time.",
            "Continue to Brenham or San Felipe de Austin for wider Republic-era context."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — Washington-on-the-Brazos",
          "url": "https://thc.texas.gov/historic-sites/washington-brazos",
          "scope": "Official schedule, ticketing and site overview."
        },
        {
          "label": "THC — Plan Your Visit to Washington-on-the-Brazos",
          "url": "https://thc.texas.gov/washington-brazos-complex/plan-your-visit-washington-brazos",
          "scope": "Accessibility, trail surfaces, picnic amenities, visitor schedules and suggested itineraries."
        },
        {
          "label": "THC — Rebirth on the Brazos (January 2026)",
          "url": "https://thc.texas.gov/blog/rebirth-brazos",
          "scope": "Primary source for November 2025 reopening, modern reconstructed streetscape, $57 million redevelopment, and upgraded museum interpretation."
        }
      ]
    },
    "hero": {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Independence%20Hall%2C%20Washington%20on%20the%20Brazos%2C%20Texas.jpg?width=1600",
      "alt": "Independence Hall replica at Washington-on-the-Brazos State Historic Site",
      "width": 1437,
      "height": 748,
      "credit": "Noconatom · CC BY-SA 4.0 · Wikimedia Commons"
    }
  },
  "presidio-la-bahia": {
    "extraBody": [
      "The present presidio location dates to 1749. Its restored walls and active chapel represent a longer Spanish and Mexican history than the 1836 campaign alone, and the Texas Historical Commission now provides both self-guided and scheduled group interpretation.",
      "The official visitor page currently warns that the presidio's overnight Quarters are unavailable for rental because of plumbing work. This is distinct from ordinary museum and chapel admission; travelers should verify restoration and overnight-use status directly before making plans.",
      "Presidio La Bahía was placed at its current Goliad location in 1749, decades before Texas independence. The site belongs to an older world of Spanish colonial military protection, mission settlements and cross-cultural conflict as well as to its better-known role during the 1836 campaign.",
      "The Battle of Coleto and Fannin’s surrender happened away from the presidio. Prisoners were then taken to Goliad, and the March 1836 executions became central to Texian remembrance of the war. Explaining the geographic sequence from Coleto to the presidio gives more clarity than compressing everything into one monument.",
      "The present walls, chapel, barracks and visitor exhibits combine surviving historical fabric and later restoration. The chapel remains a place of Catholic worship and should be approached as an active religious setting as well as a museum stop. Tours connect the military past with the fort’s twentieth-century preservation.",
      "For multi-site planning, begin with the mission at Goliad State Park for Spanish colonial context, then visit the presidio and finally Coleto if following the campaign backward; reverse the order if interpreting the 1836 military sequence first. The presidio’s overnight quarters have a separate availability status from ordinary day admission."
    ],
    "authorityGuide": {
      "whyItMatters": "Presidio La Bahía connects the Spanish colonial military system, Mexican Texas and the Goliad campaign within one surviving fortification. Its chapel, barracks and walls turn the aftermath of the Battle of Coleto into a more concrete story of soldiers, prisoners and historical memory.",
      "assessment": {
        "recommendedVisit": "Allow about 1–2 hours for the presidio and chapel; spend much longer if also touring Mission Espíritu Santo and Fannin Battleground.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mixed indoor/outdoor",
        "planningLevel": "Low",
        "familyFit": "The compact fortified complex is good for a focused history stop; pair exhibits with a short courtyard walk.",
        "firstTimeValue": "Presidio La Bahía and Goliad State Park are separate properties; verify hours and fees independently."
      },
      "itineraries": [
        {
          "label": "Fort and chapel",
          "duration": "60–90 minutes",
          "steps": [
            "Start with the introductory interpretation and museum.",
            "Visit the chapel and barracks.",
            "Walk the walls or courtyard where permitted."
          ]
        },
        {
          "label": "Goliad campaign focus",
          "duration": "2–3 hours",
          "steps": [
            "Use the exhibits to establish the 1749 Spanish presidio context.",
            "Trace the 1836 surrender and prisoner history.",
            "Review the connection with Coleto and the Goliad executions."
          ]
        },
        {
          "label": "Three-site Goliad day",
          "duration": "Half to full day",
          "steps": [
            "Visit Mission Espíritu Santo at Goliad State Park.",
            "Continue to Presidio La Bahía.",
            "Finish at Fannin Battleground or the Goliad town center as conditions allow."
          ]
        }
      ],
      "sources": [
        {
          "label": "THC — Presidio La Bahía",
          "url": "https://thc.texas.gov/historic-sites/presidio-la-bahia",
          "scope": "Official visitor rules, fort history and restoration context."
        },
        {
          "label": "THC — plan a Presidio La Bahía visit",
          "url": "https://thc.texas.gov/state-historic-sites/presidio-la-bahia/plan-your-visit-presidio-la-bahia",
          "scope": "Guided and self-guided tour descriptions, chapel and exhibits."
        }
      ]
    }
  },
  "palo-alto-battlefield-national-historical-park": {
    "extraBody": [
      "The National Park Service recommends beginning at the visitor center for a park map and interpretive orientation. The 1846 battlefield's largely open terrain is a historical asset, but it also exposes visitors to South Texas heat, wind and changing weather.",
      "A stronger visit compares Palo Alto's artillery-friendly prairie with the much brushier terrain at Resaca de la Palma, where fighting continued the next day. That comparison explains more about battlefield decisions than visiting either place without a map or military chronology.",
      "Palo Alto cannot be interpreted without the disputed boundary between the Nueces River and the Rio Grande. After U.S. annexation, troops moved into territory contested by Mexico and the United States, making the May 1846 fighting part of an unresolved international political conflict rather than a routine defense of a settled border.",
      "At Palo Alto the broad coastal prairie favored visibility and long-range artillery. Visitors can use the battlefield trail and NPS maps to imagine how U.S. and Mexican lines faced each other, how guns shaped the contest and why open ground made the engagement different from later fighting.",
      "The next day’s battle at Resaca de la Palma occurred in brush and resaca terrain that reduced long-range sightlines and made close fighting more important. A two-battle itinerary therefore shows how a change of geography altered battlefield tactics within twenty-four hours.",
      "Military history travelers should connect the battlefield with Brownsville’s Fort Brown area and Port Isabel, which formed part of the Gulf supply network. The open grassland remains environmentally exposed, so weather, hydration, trail status and visitor-center hours deserve as much advance attention as historic dates."
    ],
    "authorityGuide": {
      "whyItMatters": "Palo Alto preserves the open prairie of the May 8, 1846 clash between armies commanded by Zachary Taylor and Mariano Arista. It is essential to understanding the territorial dispute following U.S. annexation of Texas and the larger U.S.–Mexican War from both sides of the border.",
      "assessment": {
        "recommendedVisit": "Allow 1.5–2.5 hours for orientation and trail walking; add more time for Resaca de la Palma or a lower Rio Grande trip.",
        "physicalEffort": "Low to moderate",
        "weatherExposure": "Mostly outdoors",
        "planningLevel": "Low",
        "familyFit": "Ranger interpretation and relatively open battlefield sightlines help families understand the terrain; bring sun protection.",
        "firstTimeValue": "Start with the park visitor center and trail guide, and check its schedule separately from the grounds."
      },
      "itineraries": [
        {
          "label": "Battlefield orientation",
          "duration": "60–90 minutes",
          "steps": [
            "Begin at the visitor center when open.",
            "Follow the principal interpretive trail.",
            "Compare the open prairie with maps of troop positions."
          ]
        },
        {
          "label": "Two-battle study",
          "duration": "2–4 hours",
          "steps": [
            "Learn how the Rio Grande boundary dispute led to fighting.",
            "Walk Palo Alto's prairie terrain.",
            "Extend to Resaca de la Palma if conditions and travel plans allow."
          ]
        },
        {
          "label": "Lower Rio Grande history day",
          "duration": "Half to full day",
          "steps": [
            "Visit Palo Alto first.",
            "Continue toward Resaca de la Palma and Brownsville.",
            "Connect the campaign with Fort Brown or Port Isabel's historical corridor."
          ]
        }
      ],
      "sources": [
        {
          "label": "NPS — plan your Palo Alto visit",
          "url": "https://www.nps.gov/paal/planyourvisit/index.htm",
          "scope": "Official grounds, visitor center and trip planning."
        },
        {
          "label": "NPS — things to do at Palo Alto",
          "url": "https://www.nps.gov/paal/planyourvisit/things2do.htm",
          "scope": "Trail, visitor orientation and interpretive activity guidance."
        }
      ]
    }
  }
};

export const historicAuthoritySlugs = Object.keys(historicAuthority);

// Historic authority overlays apply to their existing published slug.
// These three places can also resolve through a state-park/heritage catalog
// rather than the historic-sites category. Never skip the researched material
// just because the resolved destination was curated under another category.
const HISTORIC_LEGACY_ALIASES: Record<string, string> = {
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "san-jacinto-battleground-state-historic-site": "san-jacinto-battleground",
  "washington-on-the-brazos-state-historic-site": "washington-on-the-brazos",
};

export const historicAuthorityCanonicalSlugs = Object.keys(historicAuthority);

export function enrichTexasHistoricSiteAuthority(destination: Destination): Destination {
  const sourceSlug = HISTORIC_LEGACY_ALIASES[destination.slug] ?? destination.slug;
  const detail = historicAuthority[sourceSlug];
  if (!detail) return destination;
  const additions = detail.extraBody.filter((paragraph) => !destination.body.includes(paragraph));
  return {
    ...destination,
    body: [...destination.body, ...additions],
    hero: detail.hero ?? destination.hero,
    authorityGuide: destination.authorityGuide ?? detail.authorityGuide,
    sourceCheckedAt: "2026-10-12",
    ...(sourceSlug === "washington-on-the-brazos" ? {
      entryNote: "Current THC schedule: Wednesday–Sunday, tickets required for museum, Townsite and Barrington Farm (museum 10 a.m.–5 p.m.; Townsite/farm 10 a.m.–4:30 p.m.; grounds/visitor center 9:30 a.m.–5 p.m.). Monday–Tuesday grounds and visitor center are accessible without tickets 9:30 a.m.–5 p.m., but other facilities are closed. Check the operator's current schedule and ticket policies before arrival.",
    } : {}),
  };
}
