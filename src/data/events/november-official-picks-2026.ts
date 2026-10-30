// Organizer-confirmed 2026 November highlights that do not yet need thin
// permanent /event/ authority guides. Keep separate from verified guide totals.
export interface NovemberOfficialPick {
  name: string;
  city: string;
  region: "hill-country" | "prairies-lakes" | "south-texas";
  category: "sport" | "culture" | "seasonal";
  startDate: string;
  endDate: string;
  venue: string;
  summary: string;
  officialUrl: string;
  sourceCheckedAt: string;
  // True operating windows, not an uninterrupted span across closed days.
  dateWindows?: readonly (readonly [string, string])[];
}

export const NOVEMBER_OFFICIAL_PICKS_2026: readonly NovemberOfficialPick[] = [
  {
    name: "GM Financial Parade of Lights",
    city: "Fort Worth",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-22",
    endDate: "2026-11-22",
    venue: "Downtown Fort Worth",
    summary: "Free downtown illuminated parade on Sunday, November 22 at 6 p.m.; organizers advise arriving early because of street closures. Reserved seating is optional.",
    officialUrl: "https://fortworthparadeoflights.org/plan",
    sourceCheckedAt: "2026-10-30",
  },
  {
    name: "Texas Christkindl Market",
    city: "Arlington",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-20",
    endDate: "2026-12-23",
    dateWindows: [["2026-11-20", "2026-11-22"], ["2026-11-27", "2026-12-23"]],
    venue: "Globe Life Field North Plaza, 1650 E Randol Mill Road",
    summary: "German-inspired outdoor market, with a break November 23–26. The organizer lists November 20–22 and November 27–December 23; free parking is advertised in Lot B, subject to change.",
    officialUrl: "https://txchristkindlmarket.com/",
    sourceCheckedAt: "2026-10-30",
  },
  {
    name: "Austin Studio Tour",
    city: "Austin",
    region: "hill-country",
    category: "culture",
    startDate: "2026-11-14",
    endDate: "2026-11-22",
    dateWindows: [["2026-11-14", "2026-11-15"], ["2026-11-21", "2026-11-22"]],
    venue: "Participating art studios and galleries across Austin",
    summary: "Free self-guided citywide studio visits November 14–15 and 21–22, 11 a.m.–5 p.m. both weekends. Consult the artist directory to build a feasible route.",
    officialUrl: "https://atxstudiotour.com/",
    sourceCheckedAt: "2026-10-30",
  },
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
