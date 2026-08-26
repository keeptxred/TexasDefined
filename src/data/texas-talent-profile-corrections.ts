import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentProfileCorrection = Partial<TexasTalentProfile>;

const reviewed = "2026-08-25";
const mirandaReviewed = "2026-08-26";

export const TEXAS_TALENT_PROFILE_CORRECTIONS: Readonly<Record<string, TexasTalentProfileCorrection>> = {
  "larry-mcmurtry": {
    texasConnection:
      "Born in Wichita Falls, raised first on his family's Archer County ranch and then in Archer City, whose ranch country, small-town life and contradictions became central to his writing.",
    primaryPlaces: ["Wichita Falls", "Archer County", "Archer City"],
    plannedCrossLinks: ["Wichita County", "Archer County", "Archer City", "Texas literature", "Texas history"],
    dek:
      "Larry McMurtry was born in Wichita Falls and grew up in Archer County, turning the ranch country and small-town life around Archer City into a body of fiction that reshaped how modern readers imagine Texas and the American West.",
    overview: [
      "Larry McMurtry was born in Wichita Falls, Texas, in 1936. His family lived with his paternal grandparents on an Archer County ranch before moving to Archer City before he entered second grade. The ranch country, small towns and tensions between old cattle culture and modern Texas later became central to his fiction.",
      "Works including Horseman, Pass By, The Last Picture Show and Lonesome Dove moved between contemporary small-town life and the mythic cattle-drive past. McMurtry was also a major bookseller, essayist and screenwriter, giving his career an unusually broad place in American letters.",
    ],
    timeline: [
      { year: "1936", event: "Born in Wichita Falls, Texas." },
      { year: "1940s", event: "Moves with his family from the Archer County ranch to Archer City before second grade." },
      { year: "1961", event: "Publishes Horseman, Pass By." },
      { year: "1986", event: "Lonesome Dove wins the Pulitzer Prize for Fiction." },
      { year: "2006", event: "Wins an Academy Award for co-writing Brokeback Mountain." },
    ],
    texasPlaces: [
      { name: "Wichita Falls", context: "Birthplace in Wichita County." },
      { name: "Archer County", context: "Early-childhood ranch country that shaped McMurtry's understanding of cattle culture and rural Texas." },
      { name: "Archer City", context: "Childhood home, later bookselling base and the small-town landscape most closely associated with his Texas fiction." },
    ],
    sources: [
      { label: "Texas State Historical Association — Larry McMurtry", url: "https://www.tshaonline.org/handbook/entries/mcmurtry-larry-jeff" },
      { label: "Pulitzer Prizes — Larry McMurtry", url: "https://www.pulitzer.org/winners/larry-mcmurtry" },
    ],
    lastReviewedAt: reviewed,
  },
  "miranda-lambert": {
    sources: [
      { label: "Recording Academy — Miranda Lambert", url: "https://www.grammy.com/artists/miranda-lambert/4851/" },
      { label: "Recording Academy — Miranda Lambert's early Texas career", url: "https://www.grammy.com/news/and-the-grammy-went-to-miranda-lambert/" },
      { label: "Country Music Hall of Fame — Miranda Lambert: Backstage Access", url: "https://countrymusichalloffame.org/press/releases/miranda-lambert-backstage-access-exhibition-to-open-may-16-at-the-country-music-hall-of-fame-and-museum-2/" },
    ],
    lastReviewedAt: mirandaReviewed,
  },
};
