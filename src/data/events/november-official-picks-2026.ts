// Organizer-confirmed 2026 November highlights that do not yet need thin
// permanent /event/ authority guides. Keep separate from verified guide totals.
export interface NovemberOfficialPick {
  name: string;
  city: string;
  region: "hill-country" | "prairies-lakes" | "south-texas";
  category: "sport" | "culture";
  startDate: string;
  endDate: string;
  venue: string;
  summary: string;
  officialUrl: string;
  sourceCheckedAt: string;
}

export const NOVEMBER_OFFICIAL_PICKS_2026: readonly NovemberOfficialPick[] = [
  {
    name: "Calaveras de Azúcar Festival",
    city: "San Antonio",
    region: "south-texas",
    category: "culture",
    startDate: "2026-10-31",
    endDate: "2026-11-01",
    venue: "Historic Market Square",
    summary: "A free Día de los Muertos celebration with altars, music and local vendors; Sunday, November 1 is part of the confirmed 2026 run.",
    officialUrl: "https://www.sa.gov/Directory/News-Releases/Celebrate-D%C3%ADa-de-los-Muertos-in-Downtown-San-Antonio-2026",
    sourceCheckedAt: "2026-10-29",
  },
  {
    name: "ThunderCloud Subs Turkey Trot",
    city: "Austin",
    region: "hill-country",
    category: "sport",
    startDate: "2026-11-26",
    endDate: "2026-11-26",
    venue: "The Long Center",
    summary: "Thanksgiving morning 5-mile run, 1-mile walk and kids race benefiting Caritas of Austin; registration and exact starts are on the organizer site.",
    officialUrl: "https://thundercloud.com/event-info/",
    sourceCheckedAt: "2026-10-29",
  },
  {
    name: "Dallas YMCA Turkey Trot",
    city: "Dallas",
    region: "prairies-lakes",
    category: "sport",
    startDate: "2026-11-26",
    endDate: "2026-11-26",
    venue: "Dallas City Hall",
    summary: "Downtown Dallas Thanksgiving morning 5K and 8-mile races. Consult the YMCA for route, packet pickup and timed-coral details.",
    officialUrl: "https://ymcadallas.org/press-release/59th-annual-dallas-ymca-turkey-trot-registration-live",
    sourceCheckedAt: "2026-10-29",
  },
  {
    name: "Fort Worth YMCA Turkey Trot",
    city: "Fort Worth",
    region: "prairies-lakes",
    category: "sport",
    startDate: "2026-11-26",
    endDate: "2026-11-26",
    venue: "General Worth Square",
    summary: "Thanksgiving morning 1K, 5K and 8K events. Check the YMCA for registration and start times before traveling.",
    officialUrl: "https://ymcafw.org/annual-turkey-trot/",
    sourceCheckedAt: "2026-10-29",
  },
];
