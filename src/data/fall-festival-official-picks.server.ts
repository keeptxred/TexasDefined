// Official-source 2026 fall events lacking permanent TexasDefined event guides.
// These are not counted as "verified guides" or as affiliate placements.
// A new year requires fresh organizer evidence; never shift dates by 365 days.
export const FALL_OFFICIAL_PICKS = [
  {
    name: "Texas Pumpkin Fest",
    city: "Leander",
    region: "hill-country",
    startDate: "2026-10-10",
    endDate: "2026-11-01",
    officialUrl: "https://texaspumpkinfest.com/",
    summary: "Pumpkin patch, family entertainment, carnival rides and seasonal food. Runs weekends and selected additional days; check the organizer's operating calendar.",
    sourceCheckedAt: "2026-10-26",
  },
  {
    name: "Houston Pumpkin Festival",
    city: "Houston",
    region: "gulf-coast",
    startDate: "2026-09-19",
    endDate: "2026-11-08",
    officialUrl: "https://www.houstonpumpkinfest.com/",
    summary: "Downtown Houston pumpkin displays, rides and photo opportunities at Discovery Green. Hours and tickets vary by day.",
    sourceCheckedAt: "2026-10-26",
  },
  {
    name: "Uhland Fall Fest",
    city: "Uhland",
    region: "hill-country",
    startDate: "2026-09-26",
    endDate: "2026-11-01",
    officialUrl: "https://uhlandfallfest.com/",
    summary: "Six weekends of pumpkins, farm animals, games, music and artisan vendors near Kyle and San Marcos; verify weekend hours before travel.",
    sourceCheckedAt: "2026-10-26",
  },
] as const;

export function texasToday(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (key: string) => parts.find((value) => value.type === key)?.value ?? "00";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function activeOfficialFallPicks(now = new Date()) {
  const today = texasToday(now);
  return FALL_OFFICIAL_PICKS.filter((event) => event.endDate >= today && event.startDate <= `${today.slice(0, 4)}-11-30`);
}
