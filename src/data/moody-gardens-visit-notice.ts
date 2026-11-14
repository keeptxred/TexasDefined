/**
 * One-off operator-confirmed visit disruption.
 *
 * The alert is deliberately time-bounded in Central Standard Time (UTC-6).
 * It must disappear automatically after Monday, November 16, 2026, without
 * requiring another content deployment or advancing the general review date.
 * Source checked November 13, 2026:
 * https://www.moodygardens.com/visitor-info/hours
 */
export const moodyGardensNov16Notice = {
  heading: "Monday, Nov. 16: attractions close early",
  explanation:
    "Moody Gardens says the last entry to its attractions will be at 1 p.m. on Monday, November 16, ahead of a scheduled power outage beginning at 2 p.m. Plan a shorter visit or choose another day.",
  sourceUrl: "https://www.moodygardens.com/visitor-info/hours",
  sourceReviewed: "November 13, 2026",
  startsAt: "2026-11-13T00:00:00Z",
  expiresAt: "2026-11-17T06:00:00Z",
} as const;

export function isMoodyGardensNov16NoticeActive(now = Date.now()): boolean {
  return Number.isFinite(now)
    && now >= Date.parse(moodyGardensNov16Notice.startsAt)
    && now < Date.parse(moodyGardensNov16Notice.expiresAt);
}
