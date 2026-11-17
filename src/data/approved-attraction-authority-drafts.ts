import type { Destination } from "./types";
import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";

/**
 * Owner-approved development records only (2026-11-17).
 * Keep on unmerged editorial branch until finished-page publication approval.
 * Image placeholders are intentional: do not claim rights to operator photos.
 */
export const approvedAttractionDraftDestinations: Destination[] = [
  {
    id: "authority-texas-freshwater-fisheries-center",
    brandId: "texasdefined",
    slug: "texas-freshwater-fisheries-center",
    name: "Texas Freshwater Fisheries Center",
    summary: "Plan a visit to Athens' state freshwater-fisheries center, with aquariums, beginner fishing, a wetland trail and practical guidance on seasonal hours, admission and hatchery-tour changes.",
    category: "outdoors",
    region: "prairies-lakes",
    nearestTown: "Athens",
    county: "Henderson County",
    coordinates: { lat: 32.2186, lng: -95.7643 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cichlid_Texas_Freshwater_Fisheries_Center_2025.jpg?width=1600", alt: "Lone Star cichlid photographed in an aquarium at the Texas Freshwater Fisheries Center in Athens in July 2025", width: 1600, height: 1067, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Cichlid_Texas_Freshwater_Fisheries_Center_2025.jpg · https://creativecommons.org/licenses/by/4.0/" },
    bestSeason: "March through August offers an extra Tuesday opening day; fall and winter use a shorter weekly schedule. Check holiday closures and outdoor conditions.",
    entryNote: "March–August: Tuesday–Saturday 9 a.m.–4 p.m., Sunday 1–4 p.m. September–February: Wednesday–Saturday 9 a.m.–4 p.m., Sunday 1–4 p.m. Admission: ages 17–64 $5.50, 65+ $4.50, ages 4–16 $3.50, ages 3 and under free. Verify closures before travel; pets are not allowed.",
    highlights: [
      "Texas freshwater fish aquariums and conservation interpretation",
      "Beginner fishing with rods, reels and bait provided",
      "1.2-mile round-trip wetlands trail",
      "Hatchery tram suspended until summer 2027; stationary talk instead",
    ],
    body: [
      "The Texas Freshwater Fisheries Center in Athens brings freshwater fish, angling and conservation into one visitor experience. Texas Parks and Wildlife operates the center as an educational facility associated with fish production and management, not simply an aquarium. Visitors can connect the fish in exhibit tanks to the state's rivers, reservoirs and stocking programs.",
      "Start indoors with the native-fish aquariums and fisheries interpretation, then decide whether to spend time fishing or walking the wetlands trail. The trail is a 1.2-mile round trip on concrete and boardwalk surfaces; it offers a chance to understand wetland habitat, although wildlife sightings are never guaranteed.",
      "At the Brookshire's Angler's Pavilion, TPWD supplies rods, reels and bait without an additional equipment charge. Personal fishing gear must be checked in; single barbless or flattened-barb hooks are required, treble hooks are prohibited, and outside freshwater organisms cannot be brought onto the property. These restrictions protect the center's waters.",
      "The hatchery tram tour is suspended during construction until summer 2027. TPWD currently offers a stationary hatchery talk at the visitor center. Travelers should not plan around a ride or assume a particular reopening day. Seasonal trout harvest is a separate program, generally Thanksgiving through February, requiring a purchased harvest tag before fishing or harvesting, with a five-trout limit per tag.",
      "A major renovation reopened the center in July 2025, updating aquariums, interpretive spaces and fishing facilities. That recent investment makes the center a useful stop for families, school groups and experienced anglers interested in how Texas manages its freshwater resources. Groups of ten or more can request dedicated activity times in advance.",
      "Before leaving for Athens, consult TPWD's detailed hours-and-fees page rather than relying on the shorter overview, which may display the fall/winter schedule. Holiday and maintenance closures can override regular hours. Bring weather-appropriate walking gear, and verify the calendar for special events rather than assuming an annual event is occurring on a specific date.",
    ],
    visitorFaqs: [
      { question: "Is the hatchery tram operating?", answer: "No. TPWD says tram tours are suspended until summer 2027; a stationary hatchery program is offered instead.", sourceUrl: "https://tpwd.texas.gov/fishing/tffc/exhibits/" },
      { question: "Can beginners fish without bringing equipment?", answer: "Yes. TPWD supplies rods, reels and bait at the Angler's Pavilion. Visitors must follow the center's gear and hook rules.", sourceUrl: "https://tpwd.texas.gov/fishing/tffc/exhibits/" },
      { question: "What are the seasonal opening days?", answer: "March through August includes Tuesday–Sunday; September through February includes Wednesday–Sunday. Hours vary by day and closures apply.", sourceUrl: "https://tpwd.texas.gov/fishing/tffc/hours-and-fees/" },
    ],
    officialUrl: "https://tpwd.texas.gov/fishing/tffc/",
    managingAuthority: "Texas Parks and Wildlife Department",
    address: "5550 FM 2495, Athens, TX 75752",
    accessibilityNotes: "TPWD describes concrete and boardwalk wetland-trail surfaces; contact the center for individual mobility needs and current access.",
    sourceCheckedAt: "2026-11-17",
    updatedAt: "2026-11-17",
  },
  {
    id: "authority-national-ranching-heritage-center-lubbock",
    brandId: "texasdefined",
    slug: "national-ranching-heritage-center-lubbock",
    name: "National Ranching Heritage Center",
    summary: "A practical Lubbock guide to the free indoor ranching museum, historic ranch buildings, family exhibits and outdoor historical park, with hours and photography restrictions.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Lubbock",
    county: "Lubbock County",
    coordinates: { lat: 33.59006, lng: -101.88297 },
    hero: { src: DESTINATION_PHOTO_PLACEHOLDER, alt: "National Ranching Heritage Center — site photography requires written commercial-use permission", width: 1600, height: 1067 },
    bestSeason: "Spring and fall are comfortable for exploring the outdoor historical park; indoor galleries are useful year-round.",
    entryNote: "General admission is free; donations are appreciated. Monday–Saturday 10 a.m.–5 p.m., Sunday 1–5 p.m.; closed on Texas Tech University holidays. Confirm events and outdoor access before travel.",
    highlights: [
      "19-acre Foy Proctor Historical Park and historic ranch buildings",
      "Indoor exhibits explaining North American ranching history",
      "Cash Family Ranch Life Learning Center and Hank the Cowdog",
      "Free general admission, with separate arrangements for group tours",
    ],
    body: [
      "The National Ranching Heritage Center in Lubbock connects the architecture of ranching to the work and communities that shaped the American West. Its 19-acre Foy Proctor Historical Park allows visitors to encounter historic ranch structures in an outdoor setting, while the indoor museum provides the broader historical and cultural context.",
      "A useful visit begins in the galleries before moving outside. Indoor interpretation helps visitors understand why buildings, equipment and ranching methods changed over time. In the historical park, the structures make those changes visible in the scale and materials of everyday working places.",
      "The outdoor walk should be planned around West Texas heat, wind and weather. The operator describes wheelchair and stroller accessibility, but visitors with specific needs should ask about entry into individual historic structures and current pathway conditions.",
      "Families can prioritize the Cash Family Ranch Life Learning Center, which includes Hank the Cowdog's M-Cross Ranch. The center also schedules special programs and events; these should not be represented as daily offerings unless confirmed on the current calendar.",
      "General admission is free, but special arrangements may cost extra. The operator's adult-group information describes scheduled guided visits for groups of 25–50 requested at least two weeks in advance, subject to staffing, with a $50 group-tour fee. This is distinct from ordinary admission.",
      "The operator lists no full-service restaurant on site, although snacks and drinks are available at its shop. Only service animals are permitted. The center closes on Texas Tech University holidays, so check the official visitor page before a dedicated trip.",
      "Photography requires unusual care: the center's policy restricts commercial use of images of its structures without prior written executive-director permission. An image's Creative Commons photographer license alone is not sufficient evidence that this separate restriction has been cleared. Until written permission is documented, the guide must not use recognizable NRHC structure photographs as commercial site media.",
    ],
    visitorFaqs: [
      { question: "Does the National Ranching Heritage Center charge admission?", answer: "The operator lists free general admission and welcomes donations. Guided group tours may carry a separate fee.", sourceUrl: "https://ranchingheritage.org/about-us/visit/" },
      { question: "Is the museum entirely indoors?", answer: "No. The 19-acre Foy Proctor Historical Park is an important outdoor part of the visit.", sourceUrl: "https://ranchingheritage.org/about-us/visit/" },
      { question: "Can a commercial guide reuse photos of the historic buildings?", answer: "Not without clearing the operator's commercial photography and publication policy; written permission may be required.", sourceUrl: "https://ranchingheritage.org/wp-content/uploads/2021/07/Photo-Policy-1.pdf" },
    ],
    officialUrl: "https://ranchingheritage.org/about-us/visit/",
    managingAuthority: "National Ranching Heritage Center, Texas Tech University",
    address: "3121 4th Street, Lubbock, TX 79409-3200",
    accessibilityNotes: "The operator describes wheelchair and stroller access; verify access to specific historic structures directly.",
    sourceCheckedAt: "2026-11-17",
    updatedAt: "2026-11-17",
  },
];
