/**
 * Public-only Franklin Mountains acceptance: no Cloudflare account/token.
 */
const path = "/destination/franklin-mountains-state-park";
const origins = ["https://texasdefined-site.freddy-coppola.workers.dev", "https://texasdefined.com"];
const photo = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Franklin_Mountains_Panorama_2016.jpg?width=1600";
const expected = [
  "Franklin Mountains State Park",
  "Admission, hours and day-use planning",
  "Franklin Mountains hiking trails compared",
  "Primitive tent, RV and group camping",
  "Four access points",
  "Franklin_Mountains_Panorama_2016.jpg",
  "Susan Barnum",
  "texasstateparks.reserveamerica.com",
];
const stale = [
  "Recent El Paso inventory signals: Ghost tours & nightlife",
  "Tours and experiences near Franklin Mountains State Park",
];
const fingerprint = (process.env.GITHUB_SHA || "manual").slice(0, 12);
const evidence = [];
let errors = 0;

for (const origin of origins) {
  for (const variant of ["canonical", "cache-busting"]) {
    const url = new URL(path, origin);
    if (variant === "cache-busting") url.searchParams.set("fm_authority_probe", fingerprint);
  try {
    const response = await fetch(url, {
      cache: "no-store", redirect: "follow", signal: AbortSignal.timeout(20_000),
      headers: { "cache-control": "no-cache", pragma: "no-cache", "user-agent": "TexasDefined-Franklin-Mountains-Live-QA/1.0" },
    });
    const html = await response.text();
    const missing = expected.filter(fragment => !html.includes(fragment));
    const legacy = stale.filter(fragment => html.includes(fragment));
    const record = { origin, variant, status: response.status, bytes: html.length,
      cacheStatus: response.headers.get("cf-cache-status"),
      missing, legacy };
    evidence.push(record);
    if (!response.ok || html.length < 1500 || missing.length || legacy.length) {
      errors++;
      console.error("::error title=Franklin Mountains page stale or incomplete::" + JSON.stringify(record));
    } else console.log("PASS public Franklin Mountains SSR " + JSON.stringify(record));
  } catch (error) {
    errors++;
    console.error("::error title=Franklin Mountains public fetch error::" + origin + ": " + String(error));
  }
  }
}
if (!errors) {
  try {
    const url = "https://texasdefined.com/media/remote?url=" + encodeURIComponent(photo);
    const response = await fetch(url, {
      cache: "no-store", redirect: "follow", signal: AbortSignal.timeout(20_000),
      headers: { "cache-control": "no-cache", "user-agent": "TexasDefined-Franklin-Mountains-Image-QA/1.0" },
    });
    const type = response.headers.get("content-type") || "";
    const bytes = new Uint8Array(await response.arrayBuffer());
    const valid = response.ok && type.toLowerCase().startsWith("image/") && bytes.length > 1024 &&
      ((bytes[0] === 255 && bytes[1] === 216) || (bytes[0] === 137 && bytes[1] === 80) ||
        (bytes[0] === 82 && bytes[1] === 73 && bytes[8] === 87 && bytes[9] === 69));
    console.log("Franklin Mountains photo " + JSON.stringify({ status: response.status, type, bytes: bytes.length, valid }));
    if (!valid) {
      errors++;
      console.error("::error title=Franklin Mountains photo delivery failed::Proxy returned no verified image bytes");
    }
  } catch (error) {
    errors++;
    console.error("::error title=Franklin Mountains photo fetch failed::" + String(error));
  }
}
if (errors) process.exitCode = 1;
