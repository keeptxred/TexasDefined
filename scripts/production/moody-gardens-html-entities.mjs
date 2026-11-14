/**
 * Normalize only apostrophe spellings introduced by SSR HTML serialization.
 *
 * React can render "Children's" as "Children&#x27;s" in response HTML. A visitor
 * sees the correct text, but a raw HTML .includes() would falsely fail the
 * release check. Preserve the full phrase and other strict markers: never
 * remove the requirement for accurate museum admission language.
 */
export function normalizeMoodyGardensTextEntities(html) {
  if (typeof html !== "string") throw new TypeError("Expected serialized HTML text");
  return html.replace(/&#(?:x0*(?:27|2018|2019)|0*(?:39|8216|8217));|&(?:apos|lsquo|rsquo);|[\u2018\u2019]/gi, "'");
}
