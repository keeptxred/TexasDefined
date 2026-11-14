/**
 * Houston Botanic Garden / H-E-B Texas Recycles, Nov. 13–15, 2026.
 * The official offer runs on Central Standard Time (UTC−6 in November);
 * only official daytime redemption hours are eligible (Friday 9 a.m. through Sunday 5 p.m. CST).
 * https://hbg.org/visit/texas-recycles/
 */
export const HBG_RECYCLES_2026 = {
  startsAt: "2026-11-13T15:00:00.000Z",
  expiresAt: "2026-11-15T23:00:00.000Z",
  officialUrl: "https://hbg.org/visit/texas-recycles/",
} as const;

export function isHoustonBotanicRecyclingOfferActive(now = Date.now()): boolean {
  return Number.isFinite(now)
    && now >= Date.parse(HBG_RECYCLES_2026.startsAt)
    && now < Date.parse(HBG_RECYCLES_2026.expiresAt);
}
