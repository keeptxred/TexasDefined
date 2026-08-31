import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-08-30";

export const georgeWBushMuseumDestinations: Destination[] = [
  {
    id: "museum-expansion-george-w-bush-presidential-museum",
    brandId: "texasdefined",
    slug: "george-w-bush-presidential-museum-dallas",
    name: "George W. Bush Presidential Museum",
    summary: "The George W. Bush Presidential Museum on the SMU campus in Dallas interprets the 43rd presidency through permanent galleries, presidential records, a full-scale Oval Office, decision-making exhibits, changing exhibitions and the adjacent Laura W. Bush Native Texas Park.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Dallas",
    county: "Dallas County",
    coordinates: { lat: 32.842072, lng: -96.778225 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/George_W._Bush_Presidential_Center_July_2016_1.jpg?width=1600",
      alt: "George W. Bush Presidential Center on the Southern Methodist University campus in Dallas",
      width: 1600,
      height: 1067,
      credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0",
    },
    bestSeason: "Year-round indoor museum; fall through spring is especially pleasant for adding the free 15-acre Laura W. Bush Native Texas Park and a longer SMU campus walk.",
    entryNote: "The Presidential Museum currently opens Monday through Saturday from 9 a.m. to 5 p.m. and Sunday from noon to 5 p.m. Timed tickets are recommended, visitors pass through airport-style security, and special closures or shortened hours can occur, so check the official admission page before arrival.",
    highlights: ["Presidential history galleries", "Full-scale Oval Office", "Decision Points Theater", "Laura W. Bush Native Texas Park"],
    body: [
      "The George W. Bush Presidential Museum gives Dallas one of the National Archives system's modern presidential-library destinations while placing the story of the forty-third presidency directly on the Southern Methodist University campus. Permanent galleries use documents, objects, audiovisual material and large-scale environments to cover the administration's domestic agenda, foreign policy, September 11, the wars in Afghanistan and Iraq, humanitarian initiatives and life inside the White House. A full-scale Oval Office and interactive decision-making exhibits make the visit more experiential than a conventional document display.",
      "The museum works best when visitors allow enough time to separate the historical record from the immersive elements. The Bush Center currently recommends roughly 30 to 45 minutes for a highlights visit and four or more hours for a comprehensive one. The replica Oval Office offers a formal photo opportunity, while the Decision Points Theater asks visitors to work through information and competing advice around major presidential choices. Changing exhibitions add another reason to check the current calendar before deciding how much time to reserve.",
      "The setting broadens the visit beyond presidential politics. The 23-acre Bush Center campus was designed around a brick-and-limestone building by Robert A. M. Stern Architects and a native Texas landscape by Michael Van Valkenburgh Associates. The 15-acre Laura W. Bush Native Texas Park is free and normally open from sunrise to sunset, with paths through landscapes inspired by Blackland Prairie, Post Oak Savannah and Cross Timbers environments. That makes the museum easy to pair with an outdoor walk, SMU campus architecture and other central Dallas cultural stops rather than treating it as an isolated indoor attraction.",
    ],
    officialUrl: "https://www.bushcenter.org/plan-your-visit",
    managingAuthority: "George W. Bush Presidential Center / National Archives and Records Administration",
    address: "2943 SMU Boulevard, Dallas, TX 75205",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
