/** Pure date classification for the verified TPWD calendar; never infers whether an individual county is open. */
export type YouthDateStatus = "Upcoming" | "In progress" | "Ended" | "Verify with TPWD";
export type YouthDateWindow = { label: string; status: YouthDateStatus };
const MONTHS: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };
const RANGE = /^([A-Za-z]+)\.?\s+(\d{1,2})\s*[–-]\s*(?:([A-Za-z]+)\.?\s+)?(\d{1,2}),?\s+(20\d{2})$/;
const key = (year: number, month: number, day: number) => year * 10000 + month * 100 + day;

/** Uses the Texas calendar day, not browser/device timezone or UTC at midnight. */
export function texasTodayKey(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return key(get("year"), get("month"), get("day"));
}

/** Each semicolon-separated interval is evaluated independently, including later windows for the same species. */
export function youthSeasonWindows(dates: string, todayKey = texasTodayKey()): YouthDateWindow[] {
  return dates.split(";").map((item) => {
    const label = item.trim();
    const match = RANGE.exec(label);
    if (!match) return { label, status: "Verify with TPWD" };
    const startMonth = MONTHS[match[1].toLowerCase()];
    const endMonth = match[3] ? MONTHS[match[3].toLowerCase()] : startMonth;
    const startDay = Number(match[2]);
    const endDay = Number(match[4]);
    const endYear = Number(match[5]);
    if (!startMonth || !endMonth) return { label, status: "Verify with TPWD" };
    const startYear = startMonth > endMonth ? endYear - 1 : endYear;
    const startKey = key(startYear, startMonth, startDay);
    const endKey = key(endYear, endMonth, endDay);
    if (startKey > endKey || !Number.isInteger(todayKey)) return { label, status: "Verify with TPWD" };
    return { label, status: todayKey < startKey ? "Upcoming" : todayKey <= endKey ? "In progress" : "Ended" };
  });
}
