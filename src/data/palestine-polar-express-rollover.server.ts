import seasonRecord from "./generated/palestine-polar-express-season.json";

type SeasonDate = { date: string; times: string[] };
type ConfirmedSeason = {
  year: number;
  status: string;
  startDate: string;
  endDate: string;
  dates: SeasonDate[];
  sourceUrl: string;
  calendarImages: string[];
  verifiedAt: string;
};

const stored = seasonRecord as ConfirmedSeason;
const trustedSource = "https://texasstaterailroad.net/the-polar-express/";
const safeDate = (s: string) => /^2027-(?:11|12)-\d{2}$/.test(s)
  && !Number.isNaN(Date.parse(s + "T00:00:00Z"))
  && new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s;

// This guards the content adapter even if a generated JSON change slips into a PR.
// Never promote an unverified season based only on an annual recurrence.
function isVerified2027(s: ConfirmedSeason) {
  return s.year === 2027 && s.status === "verified" &&
    s.sourceUrl === trustedSource && /^2027-\d{2}-\d{2}$/.test(s.verifiedAt) &&
    Array.isArray(s.calendarImages) && s.calendarImages.length === 2 &&
    s.calendarImages.every(url => /^https:\/\/([a-z0-9-]+\.)?texasstaterailroad\.net\/wp-content\/uploads\//i.test(url)) &&
    Array.isArray(s.dates) && s.dates.length >= 20 && s.dates.length <= 55 &&
    s.dates.every(item => safeDate(item.date) && Array.isArray(item.times) && item.times.length >= 1 &&
      item.times.length <= 8 && item.times.every(time => /^(?:1[0-2]|[1-9]):(?:00|30) (?:AM|PM)$/.test(time))) &&
    new Set(s.dates.map(item => item.date)).size === s.dates.length &&
    s.dates[0].date === s.startDate && s.dates.at(-1)?.date === s.endDate;
}

export function getPalestinePolarExpressRollover(now = new Date()) {
  const texasDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => texasDate.find(p => p.type === type)?.value || "00";
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  const next = isVerified2027(stored) ? stored : null;
  const awaiting = today > "2026-12-28" && !next;
  return { next, awaiting, today, sourceUrl: trustedSource };
}
