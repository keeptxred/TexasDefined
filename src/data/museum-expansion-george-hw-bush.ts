import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-08-30";

export const georgeHWBushMuseumDestinations: Destination[] = [
  {
    id: "museum-expansion-george-hw-bush-presidential-library",
    brandId: "texasdefined",
    slug: "george-hw-bush-presidential-library-museum-college-station",
    name: "George H.W. Bush Presidential Library and Museum",
    summary: "The George H.W. Bush Presidential Library and Museum at Texas A&M University interprets the life and presidency of the 41st president through documents, artifacts, interactive galleries, a recreated Oval Office, special exhibitions and the adjacent James A. Baker, III Pavilion.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "College Station",
    county: "Brazos County",
    coordinates: { lat: 30.596572, lng: -96.354433 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/George_H.W._Bush_Presidential_Library_and_Museum_March_2022_02_(exterior).jpg?width=1600",
      alt: "Exterior of the George H.W. Bush Presidential Library and Museum in College Station, Texas",
      width: 1600,
      height: 1067,
      credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0",
    },
    bestSeason: "Year-round indoor museum; fall through spring is especially comfortable for walking the Texas A&M campus, Presidential Pond and landscaped grounds before or after the galleries.",
    entryNote: "The museum currently opens Monday through Saturday from 9:30 a.m. to 5 p.m. and Sunday from noon to 5 p.m. Tickets are available online or at the museum, visitors and belongings are subject to inspection, and holiday closures apply, so confirm the official NARA visitor page before arrival.",
    highlights: ["41st presidency galleries", "Recreated Oval Office", "Presidential records and artifacts", "James A. Baker, III Pavilion"],
    body: [
      "The George H.W. Bush Presidential Library and Museum places a long public career into a museum designed for both casual visitors and researchers. Galleries move through Bush's early life and World War II naval service, his years in Congress and diplomacy, the vice presidency and the 1989–1993 presidency, using records and artifacts from the National Archives alongside immersive spaces and multimedia interpretation. The recreated Oval Office and exhibits on foreign policy, domestic issues and public service give visitors several ways to engage with the period rather than reducing the visit to a chronological biography.",
      "A visit now extends beyond the original museum building. The James A. Baker, III Pavilion, opened in 2024, displays the Union Pacific 4141 locomotive associated with Bush's funeral train and a retired Marine One helicopter used during the Bush presidency. The museum's changing exhibition program also draws directly from National Archives holdings, so repeat visitors can encounter material beyond the permanent presidential galleries. The archival research room follows separate appointment rules and weekday hours, making it important to distinguish a museum visit from a research trip.",
      "The campus setting is part of the experience. The library sits on the west side of Texas A&M University with landscaped grounds, the Presidential Pond and the Bush family burial site nearby, while College Station and Bryan offer additional museums and university attractions within a short drive. Free parking and the museum's substantial indoor footprint make it easy to use as the anchor of a half-day, then connect the visit to Texas A&M traditions, local history or other Brazos Valley cultural stops.",
    ],
    officialUrl: "https://www.bush41library.gov/visit/hours-admission",
    managingAuthority: "National Archives and Records Administration / George H.W. Bush Presidential Library and Museum",
    address: "1000 George Bush Dr W, College Station, TX 77845",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
