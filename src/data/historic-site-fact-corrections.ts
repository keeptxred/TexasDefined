import type { Destination } from "./types";

/**
 * Source-backed corrections for historic-site facts that should override
 * older preserved seed values without mutating the 43-site source catalog.
 */
export function applyHistoricSiteFactCorrections(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;

  if (destination.slug === "lipantitlan") {
    return {
      ...destination,
      county: "Nueces",
      coordinates: { lat: 27.96445, lng: -97.81838 },
    };
  }

  if (destination.slug === "sam-houston-memorial-museum-republic-texas-presidential-library-huntsville") {
    return {
      ...destination,
      summary: "The Sam Houston Memorial Museum & Republic of Texas Presidential Library in Huntsville preserves Houston's Woodland Home, the Steamboat House where he died, major artifact and archival collections, and a 15-acre historic landscape tied directly to his family and political life.",
      county: "Walker",
      coordinates: { lat: 30.7155, lng: -95.5516 },
      hero: {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sam_houston_memorial_museum_Huntsville_TX.jpg?width=1600",
        alt: "Sam Houston Memorial Museum building on the historic museum grounds in Huntsville, Texas",
        width: 1600,
        height: 1067,
        credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
      },
      bestSeason: "The indoor galleries work year-round. Fall through spring is the most comfortable period for walking the 15-acre grounds, while summer visits are best planned for the cooler morning hours.",
      entryNote: "Current posted hours are Tuesday-Saturday 9 a.m.-4:30 p.m. and Sunday noon-4:30 p.m.; the museum is closed Mondays and holidays. Self-guided admission is currently $6 adults, $5 seniors 65+, $4 children ages 6-18 and SHSU faculty/staff, and free for children 5 and under, SHSU students with ID and veterans. The grounds are free and open dawn to dusk seven days a week. Historic-building access can vary, so check the museum's current visit and events pages before traveling.",
      highlights: [
        "Woodland Home on the Houston family's original Huntsville property",
        "Steamboat House, where Sam Houston died on July 26, 1863",
        "Largest concentration of Sam Houston artifacts and memorabilia",
        "Republic of Texas Presidential Library and digital research repository",
        "Sam Houston's law office and reconstructed domestic-work spaces",
        "Joshua's Blacksmith Forge and interpretation of enslaved people in the Houston household",
        "Katy & E. Don Walker, Sr. Education Center and changing exhibitions",
        "Free dawn-to-dusk access to the historic grounds and picnic areas",
      ],
      body: [
        "The Sam Houston Memorial Museum & Republic of Texas Presidential Library is not simply a museum about a famous Texan. It occupies part of the Huntsville property Sam and Margaret Houston owned beginning in 1847, so visitors encounter Houston's political career, family life, work spaces and later memory on a landscape directly connected to the people being interpreted. That combination of original setting, historic structures, artifacts and archival material makes the complex one of the most important places in Texas for understanding Sam Houston beyond the familiar San Jacinto legend.",
        "The centerpiece is Woodland Home, the Houston family's Huntsville residence. Sam and Margaret Houston built the house in 1847 while Houston was serving in the United States Senate, and four of their eight children were born there. The home stands on its historic site and is accompanied by the law office and a reconstructed kitchen area, allowing the property to be read as a household and working landscape rather than as a single preserved room. The Texas Historical Commission lists Woodland as both a Recorded Texas Historic Landmark and a National Historic Landmark property associated with Houston's military and political significance.",
        "Woodland matters because it reveals a phase of Houston's life that is often compressed between the Texas Revolution and the Civil War. From this period came his long United States Senate service, debates over annexation and sectional conflict, and the family life that anchored him in Huntsville. The museum's domestic interpretation adds Margaret Lea Houston and the Houston children to a story that is too often told only through offices held and battles won.",
        "The Steamboat House tells a different chapter. Built in the 1850s by Rufus W. Bailey and later rented by the Houston family, it became Houston's final home after his removal from the governorship during the secession crisis. Houston died there of pneumonia on July 26, 1863, and his funeral was held in the upstairs parlor. The house was moved to the museum grounds during the Texas Centennial era and restored, so visitors should understand that it is historically authentic but no longer stands on its original north-Huntsville site. Interior access is periodically limited; the museum directs visitors to its events calendar for special openings when necessary.",
        "The main Memorial Museum building holds the institution's principal artifact collections and permanent interpretation. The museum describes its holdings as the world's largest collection of Sam Houston artifacts, while the broader collection extends into documents, family material, political history and objects connected to nineteenth-century Texas. Recent acquisitions continue to expand the collection, including Houston correspondence and artwork, so this is an active collecting institution rather than a static memorial assembled only in the 1930s.",
        "The Republic of Texas Presidential Library expands the site's mission beyond a conventional house museum. The Texas Legislature authorized the presidential-library concept in 2017, the museum announced plans for the project in 2021, and the Texas State University System Board of Regents approved the expanded institutional name in 2022. Its digital repository is intended to bring together known Houston-related documents and artifacts held by museums, libraries, archives, galleries and private collections across the United States, making the Huntsville institution a research hub as well as a visitor attraction.",
        "The digital repository becomes especially useful when individual records are read together rather than treated as isolated catalog entries. A polished hickory walking cane with a gold head inscribed for Sam Houston gives material scale to the public figure; a December 9, 1841 letter to Margaret Lea Houston moves between intimate family language and anxiety about the Republic's political condition; an 1855 campaign booklet titled Life of Sam Houston shows how supporters packaged his biography during a presidential push; and an April 1861 newspaper record preserves a contemporary publication of his protest after refusing to accept the secession convention's authority.",
        "Those records create a useful research path before or after a museum visit. The campaign booklet can be read as political image-making rather than neutral biography, the private correspondence shows how public crises entered Houston's family letters, the cane turns celebrity and memory into a physical object, and the secession-era newspaper helps connect the final Steamboat House chapter to the political stand that removed him from the governorship. Texas Defined links these records individually in the source list below so readers can move from the visitor guide into the underlying evidence.",
        "A complete interpretation of the Houston household also has to include slavery. Museum educational material identifies Joshua Houston and Eliza as enslaved members of the household and connects them to skilled labor, cooking and childrearing. Joshua Houston, an enslaved blacksmith and wheelwright associated with the Houston family, later became a businessman, church leader, Huntsville alderman and Walker County commissioner after emancipation. The museum grounds include Joshua's Blacksmith Forge and Eliza's Kitchen, giving visitors a place to consider how the household functioned and how Black lives intersected with the public story of a major Texas political figure.",
        "The rest of the grounds widen the visit beyond the two best-known houses. The complex includes historic and reconstructed cabins, work spaces, a pottery area, museum store, education center, picnic areas and landscaped grounds. Some structures were moved to the property from elsewhere in Walker County, so they should be read as interpretive additions to the museum landscape rather than all as buildings that stood on Houston's original farm. That distinction is useful when separating original Houston-associated fabric from later museum development.",
        "The museum itself grew out of preservation work that began before the 1936 Texas Centennial. Sam Houston Normal Institute students and supporters helped secure the Houston property in the early twentieth century, and the site developed through restoration, state appropriations and later museum construction. The Centennial era brought the rotunda museum building and the relocation of the Steamboat House. Understanding that preservation history explains why the campus contains both original-location resources and buildings moved or reconstructed for interpretation.",
        "For a first visit, allow about two to three hours if you want to see the principal galleries, walk the grounds and spend meaningful time at Woodland Home and the Steamboat House exterior. A faster 75- to 90-minute visit can cover the main museum and a loop through the historic core, while researchers and visitors reading exhibits closely can easily spend half a day. Because the grounds cover about 15 acres, heat, rain and mobility needs can materially affect the pace.",
        "The easiest arrival point for most visitors is the Katy & E. Don Walker, Sr. Education Center at 1402 19th Street, where the museum says ample visitor parking is available. Limited parking is also available near the Memorial Museum and Wigwam Neosho Museum Store. Visitors can check in and pay admission at the Memorial Museum, museum store or Walker Education Center. The museum sits directly across from Sam Houston State University, making it easy to combine the historic site with a walk through the university area.",
        "Accessibility is mixed because this is both an indoor museum and an outdoor historic site. The museum provides wheelchair-accessible entrances at the Memorial Museum, museum store and Walker Education Center, elevators in the Memorial Museum and Walker Center, and ramps providing ground-floor access to historic homes and buildings. The institution also notes that weather can make movement across the 15-acre grounds more difficult. Visitors with specific mobility or sensory needs should use the official accessibility guidance and contact the museum if building access is central to the trip.",
        "The strongest Huntsville history itinerary pairs the museum with Sam Houston's grave in Oakwood Cemetery. The two sites bookend Houston's final Huntsville years: the museum preserves his family landscape and the house in which he died, while the cemetery contains his burial place and monument. A second, very different Huntsville history stop is the Texas Prison Museum, which interprets the state's correctional system and helps explain another institution that profoundly shaped Walker County.",
        "Texas Defined treats this page as a living authority guide rather than a one-time attraction listing. Current operating details are checked against the museum's own visitor information; building history is cross-checked against the Texas State Historical Association and Texas Historical Commission; and presidential-library information is tied to the institution's own project documentation. When operating details conflict with historical sources, the museum's current visitor guidance should control the trip-planning decision.",
      ],
      managingAuthority: "Sam Houston State University",
      officialUrl: "https://www.samhoustonmemorialmuseum.com/",
      address: "1836 Sam Houston Ave, Huntsville, TX 77340",
      directions: "The complex is at Sam Houston Avenue (State Highway 75) and 19th Street, directly across from Sam Houston State University. For the easiest parking, use the Katy & E. Don Walker, Sr. Education Center at 1402 19th Street and follow museum visitor-parking signs. Limited parking is also available near the Memorial Museum and Wigwam Neosho Museum Store; bus and RV parking is available at the Walker Education Center.",
      accessibilityNotes: "The museum says wheelchair-accessible entrances are available at the Memorial Museum, Wigwam Neosho Museum Store and Walker Education Center; elevators serve the Memorial Museum and Walker Center, and ramps provide ground-floor access to historic homes and buildings. The site covers roughly 15 acres outdoors, so heat, rain and ground conditions can make movement more difficult. Trained service animals are welcome inside buildings.",
      sourceCheckedAt: "2026-10-01",
      areaGuide: {
        intro: "Build the museum into a Huntsville history day rather than treating it as an isolated stop. The strongest nearby pairings connect Houston's family landscape, burial place, university legacy and the city's separate prison-history story.",
        nearbyAttractions: [
          { name: "Sam Houston's grave at Oakwood Cemetery", description: "Houston was buried in Huntsville after his death in 1863. The grave and monument complete the final-life chapter interpreted at the Steamboat House.", proximity: "About 1 mile" },
          { name: "Sam Houston State University", description: "The university directly across 19th Street carries Houston's name and has been institutionally connected to preservation of the museum property for more than a century.", proximity: "Across the street" },
          { name: "Texas Prison Museum", description: "A separate Huntsville museum interpreting the history of the Texas prison system and another defining institution in Walker County.", proximity: "North Huntsville", href: "/destination/texas-prison-museum-huntsville" },
        ],
        foodAndDrink: [
          { name: "Downtown Huntsville", description: "Use the courthouse-square and downtown area for locally owned restaurants and a break between the museum, cemetery and other historic stops.", proximity: "Short drive" },
        ],
        lodging: [
          { name: "Huntsville", description: "Staying in Huntsville is the simplest choice for a full museum-and-history itinerary and also works for trips that include Huntsville State Park or the Sam Houston National Forest." },
        ],
        neighborhoods: [
          { name: "SHSU and 19th Street", description: "The museum-university edge is the most useful walking context for understanding how Houston's legacy became part of Huntsville's civic and educational identity." },
          { name: "Downtown Huntsville", description: "The historic core adds the courthouse, local businesses and the broader city context around the museum story." },
        ],
        familyStops: [
          { name: "Museum grounds", description: "The open grounds, historic buildings, pond, demonstrations and picnic areas give families room to alternate between exhibit reading and outdoor time." },
          { name: "Huntsville State Park", description: "Pair a history-heavy morning with trails, water and outdoor time south of town.", href: "/destination/huntsville-state-park" },
        ],
        sideTrips: [
          { name: "Walker County guide", description: "Use the county authority page to connect Huntsville with the wider Piney Woods landscape and other Walker County stops.", href: "/county/walker" },
          { name: "Sam Houston: life and legacy", description: "Go deeper on Houston's military, political and personal history before or after visiting the museum.", href: "/article/sam-houston-texas-life-legacy" },
          { name: "Texas history", description: "Place Houston's career inside the larger Republic, annexation, statehood and Civil War chronology.", href: "/texas-history" },
        ],
      },
      authorityGuide: {
        whyItMatters: "Few Texas history sites combine an original political figure's home landscape, family interpretation, major artifact collections, a death-site house, an active archival project and a direct connection to a modern university. The museum lets visitors follow Sam Houston from Republic president and United States senator to governor, husband, father, slaveholder and aging political dissenter while also examining Margaret Houston, their children, Joshua Houston, Eliza and the people whose labor sustained the household. Its Republic of Texas Presidential Library extends that physical interpretation into a growing research network intended to aggregate Houston-related material held across many institutions.",
        assessment: {
          recommendedVisit: "Allow 2-3 hours for the main museum, Woodland Home area and a useful loop of the historic grounds; allow a half day if you read exhibits closely, attend demonstrations or pair the museum with Oakwood Cemetery.",
          physicalEffort: "Low to moderate",
          weatherExposure: "Mixed indoor/outdoor",
          planningLevel: "Low",
          familyFit: "Strong for school-age children and multigenerational groups because the visit mixes objects, furnished historic buildings, outdoor space and periodic living-history demonstrations. Younger children may benefit from alternating galleries with time on the grounds.",
          firstTimeValue: "Very high for visitors trying to understand Sam Houston as a person and political figure rather than only as the commander at San Jacinto. The original property and surviving structures provide context that a biography alone cannot.",
        },
        itineraries: [
          {
            label: "Essential museum visit",
            duration: "75-90 minutes",
            steps: [
              "Start in the Memorial Museum for the chronological and artifact-based overview of Houston's life.",
              "Walk to Woodland Home and the law-office area to see the family landscape on its historic site.",
              "Finish at the Steamboat House exterior and note whether interior access is available that day.",
            ],
          },
          {
            label: "Full authority visit",
            duration: "2-3 hours",
            steps: [
              "Begin at the Walker Education Center or main museum and use the site map to orient yourself across the 15-acre complex.",
              "Study the main galleries, then spend time at Woodland Home, the law office, Eliza's Kitchen and Joshua's Blacksmith Forge to connect political biography with household labor and family life.",
              "Continue through the Steamboat House area and other historic structures, then review the Republic of Texas Presidential Library material and any changing exhibit in the Walker Center.",
            ],
          },
          {
            label: "Huntsville history day",
            duration: "Half day",
            steps: [
              "Give the museum complex two to three hours rather than rushing only the main building.",
              "Drive to Oakwood Cemetery to visit Sam Houston's grave and connect the burial site to the final chapter interpreted at the Steamboat House.",
              "Add downtown Huntsville or the Texas Prison Museum for a second layer of Walker County history, depending on whether your interest is civic history or the state prison system.",
            ],
          },
        ],
        sources: [
          { label: "Sam Houston Memorial Museum — Visit", url: "https://www.samhoustonmemorialmuseum.com/visit/", scope: "Controlling source for current hours, admission, grounds access, parking, check-in locations and accessibility guidance." },
          { label: "Sam Houston Memorial Museum — Museum Grounds Overview", url: "https://www.samhoustonmemorialmuseum.com/visit/grounds-map", scope: "Official description of the 15-acre property, historic structures and current Steamboat House access guidance." },
          { label: "Sam Houston Republic of Texas Presidential Library", url: "https://samhoustonmemorialmuseum.com/presidential-library", scope: "Official history and mission of the Republic of Texas Presidential Library designation and research project." },
          { label: "Republic of Texas Presidential Library digital repository", url: "https://presidential-library.samhoustonmemorialmuseum.com/", scope: "Official digital-repository project describing the effort to aggregate known Sam Houston documents and artifacts across partner collections." },
          { label: "Primary source — Sam Houston walking cane, accession 151.1", url: "https://presidential-library.samhoustonmemorialmuseum.com/digital/collection/myfirst/id/253/", scope: "Museum collection record for Houston's polished knotted-hickory walking cane with an inscribed gold head; useful for material-culture and public-memory context." },
          { label: "Primary source — Sam Houston to Margaret Lea Houston, December 9, 1841", url: "https://presidential-library.samhoustonmemorialmuseum.com/digital/collection/myfirst/id/394/", scope: "Houston's personal correspondence combining intimate family language with discussion of Republic politics and political instability." },
          { label: "Primary source — Life of Sam Houston campaign booklet, circa 1855", url: "https://presidential-library.samhoustonmemorialmuseum.com/digital/collection/myfirst/id/164/", scope: "Campaign-era biography printed in Washington during Houston's presidential ambitions; useful as evidence of nineteenth-century political image-making rather than a neutral modern biography." },
          { label: "Primary-source context — 1861 newspaper record of Houston's secession protest", url: "https://presidential-library.samhoustonmemorialmuseum.com/digital/collection/myfirst/id/1249/", scope: "April 3, 1861 Burlington Daily Times record reproducing part of Houston's protest after refusing the secession convention's authority and oath." },
          { label: "Texas State Historical Association — Sam Houston Memorial Museum", url: "https://www.tshaonline.org/handbook/entries/sam-houston-memorial-museum", scope: "Independent historical context for preservation of the property, museum development, Woodland Home, Steamboat House and the wider complex." },
          { label: "Texas State Historical Association — Steamboat House", url: "https://www.tshaonline.org/handbook/entries/steamboat-house", scope: "Detailed building history, Houston's final months, 1863 death, later ownership and relocation to the museum grounds." },
          { label: "Texas State Historical Association — Joshua Houston", url: "https://www.tshaonline.org/handbook/entries/houston-joshua", scope: "Biographical context for Joshua Houston's enslavement, skilled work, emancipation-era life, business career and public service in Huntsville." },
          { label: "Texas Historical Commission — Woodland, Home of Sam Houston", url: "https://atlas.thc.texas.gov/Details?atlasnumber=5471008482&fn=print", scope: "Recorded Texas Historic Landmark documentation for Woodland and Houston's Huntsville years." },
          { label: "Wikimedia Commons — Sam Houston Memorial Museum photograph", url: "https://commons.wikimedia.org/wiki/File:Sam_houston_memorial_museum_Huntsville_TX.jpg", scope: "Hero photograph source and CC BY 4.0 attribution record." },
        ],
      },
    };
  }

  return destination;
}
