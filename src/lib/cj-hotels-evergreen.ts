/**
 * Hotels.com CJ publisher-approved 2026 Evergreen Deep Link.
 * Generated directly by CJ for TexasDefined.com PID 101876465, link 15734399.
 * This is a referral click URL, not proof of sales or commissions.
 */
export const CJ_HOTELS_EVERGREEN_BASE = "https://www.anrdoezrs.net/click-101876465-15734399";
export const PALESTINE_HOTELS_SID = "td_polar_palestine";

export function hotelsComPageSid(pathname: string): string {
  const normalizedPath = "/" + String(pathname).split("?")[0].replace(/^\/+|\/+$/g, "").toLowerCase();
  if (normalizedPath === "/event/polar-express-palestine") return PALESTINE_HOTELS_SID;
  const key = normalizedPath.slice(1).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "home";
  if (key.length <= 53) return "td_" + key;
  // Stable, bounded suffix protects long-slug IDs from collisions.
  let hash = 2166136261;
  for (const character of normalizedPath) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  }
  return "td_" + key.slice(0, 47) + "_" + hash.toString(36).padStart(7, "0");
}

export function buildHotelsComEvergreenClick(destination: string, sid: string): string {
  const parsed = new URL(destination);
  if (parsed.protocol !== "https:" || parsed.hostname !== "www.hotels.com" ||
    parsed.username || parsed.password || parsed.hash) {
    throw new Error("Unapproved Hotels.com deep-link destination");
  }
  if (!/^td_[a-z0-9_]{1,60}$/.test(sid) || sid.length > 64) {
    throw new Error("Unsafe Hotels.com CJ SID");
  }
  const url = new URL(CJ_HOTELS_EVERGREEN_BASE);
  url.searchParams.set("sid", sid);
  url.searchParams.set("url", parsed.toString());
  return url.toString();
}
