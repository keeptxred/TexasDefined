/**
 * Houston Botanic Garden / H-E-B Texas Recycles, Nov. 13–15, 2026.
 * The official offer runs on Central Standard Time (UTC−6 in November);
 * the very first instant of Nov. 16 CST must stop emitting the notice.
 * https://hbg.org/visit/texas-recycles/
 */
export const HBG_RECYCLES_2026 = {
  startsAt: "2026-11-13T06:00:00.000Z",
  expiresAt: "2026-11-16T06:00:00.000Z",
  officialUrl: "https://hbg.org/visit/texas-recycles/",
} as const;

export function isHoustonBotanicRecyclingOfferActive(now = Date.now()): boolean {
  return Number.isFinite(now)
    && now >= Date.parse(HBG_RECYCLES_2026.startsAt)
    && now < Date.parse(HBG_RECYCLES_2026.expiresAt);
}
