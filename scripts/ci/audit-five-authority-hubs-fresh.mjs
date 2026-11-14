import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

/**
 * Independent five-hub editorial review evidence. Fetch an unrepeatable URL
 * with explicit no-cache headers so this DOES NOT grade previously cached HTML.
 * Exit nonzero on a cache HIT, stale Age, wrong canonical, noindex, or bad HTTP.
 * Metrics are review evidence, NOT an automated Google policy certification.
 */
const origin = "https://texasdefined.com";
const pages = [
  "/hunting",
  "/dogs",
  "/sports",
  "/sports/friday-night-lights",
  "/texas-tailgating-guide",
];
const decode = text => text
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&apos;|&#39;|&#x27;/gi, "'")
  .replace(/&nbsp;/gi, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const textOf = html => decode(html
  .replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
  .replace(/<\/(p|h[1-6]|li|div|section|table|tr|article|main)>/gi, "\n")
  .replace(/<[^>]*>/g, " ")
  .replace(/[ \t]+/g, " ")
  .replace(/\n\s*\n+/g, "\n")
  .trim());
const tagValue = (html, tag) => textOf((html.match(new RegExp("<" + tag + "\\b[^>]*>([\\s\\S]*?)<\\/" + tag + ">", "i")) ?? [,""])[1]);
const attr = (tag, name) => {
  const m = tag.match(new RegExp("\\b" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))", "i"));
  return m ? decode(m[1] ?? m[2] ?? m[3]) : "";
};
const extract = (html, regex) => [...html.matchAll(regex)].map(m => m[0]);
const failed = [];
for (const path of pages) {
  try {
    const freshUrl = origin + path + "?__td_fresh_authority_audit=" +
      encodeURIComponent((process.env.GITHUB_RUN_ID || "manual") + "-" + randomUUID());
    const response = await fetch(freshUrl, {
      redirect: "follow",
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        "Pragma": "no-cache",
        "User-Agent": "TexasDefined-Fresh-FiveHub-Authority-Audit/20261114",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(25000),
    });
    const html = await response.text();
    const cacheStatus = response.headers.get("cf-cache-status") || "unreported";
    const age = response.headers.get("age");
    const cacheControl = response.headers.get("cache-control");
    const title = tagValue(html, "title");
    const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) ?? [,""])[1];
    const visible = textOf(main || html);
    const words = visible.split(/\s+/).filter(Boolean);
    const h1 = extract(main || html, /<h1\b[^>]*>[\s\S]*?<\/h1>/gi).map(textOf);
    const h2 = extract(main || html, /<h2\b[^>]*>[\s\S]*?<\/h2>/gi).map(textOf);
    const headings = extract(main || html, /<h[1-4]\b[^>]*>[\s\S]*?<\/h[1-4]>/gi).map(textOf);
    const links = extract(main || html, /<a\b[^>]*>/gi).map(t => attr(t, "href"));
    const externals = [...new Set(links.filter(l => /^https?:\/\//.test(l)).map(l => { try { return new URL(l).hostname; } catch { return "invalid"; } }))];
    const internal = [...new Set(links.filter(l => l.startsWith("/") && !l.startsWith("//")))];
    const imgs = extract(main || html, /<img\b[^>]*>/gi);
    const missingAlt = imgs.filter(t => !/\balt\s*=/i.test(t));
    const meta = extract(html.slice(0, html.indexOf("</head>") + 7 || 5000), /<meta\b[^>]*>/gi);
    const description = attr(meta.find(m => attr(m, "name").toLowerCase() === "description") || "", "content");
    const robots = attr(meta.find(m => attr(m, "name").toLowerCase() === "robots") || "", "content");
    const canonical = attr(extract(html, /<link\b[^>]*>/gi).find(t => attr(t, "rel").toLowerCase() === "canonical") || "", "href");
    const ld = extract(html, /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi);
    const schemaTypes = [];
    for (const block of ld) {
      try {
        const rawJson = block.replace(/^[\s\S]*?>/, "").replace(/<\/script>[\s\S]*$/i, "");
        const obj = JSON.parse(rawJson);
        const scan = x => {
          if (!x || typeof x !== "object") return;
          if (Array.isArray(x)) return x.forEach(scan);
          if (x["@type"]) schemaTypes.push(String(x["@type"]));
          if (x["@graph"]) scan(x["@graph"]);
        };
        scan(obj);
      } catch { schemaTypes.push("INVALID_JSON_LD"); }
    }
    const result = {
      path,
      audited_at_utc: new Date().toISOString(),
      fetched_url: response.url,
      http_status: response.status,
      cache_status: cacheStatus,
      age,
      cache_control: cacheControl,
      content_type: response.headers.get("content-type"),
      cf_ray: response.headers.get("cf-ray"),
      bytes: Buffer.byteLength(html),
      canonical,
      robots,
      title,
      description,
      h1,
      h2,
      headings,
      main_word_count: words.length,
      main_images: imgs.length,
      missing_alt_attributes: missingAlt.length,
      main_internal_links: internal.length,
      internal_examples: internal.slice(0, 22),
      external_domains: externals,
      structured_data_types: schemaTypes,
      editorial_desk_link: links.some(l => /editorial/i.test(l)),
      affiliate_disclosure_visible: /affiliate disclosure|may earn a commission/i.test(visible),
      selection_labels: ["This month’s selection", "Featured from the sports desk", "Plan a safe Texas dog outing in four checks"].filter(s => visible.includes(s)),
      text_excerpt: visible.slice(0, 6500),
    };
    console.log("FRESH_AUDIT_JSON " + JSON.stringify(result));
    assert.equal(response.status, 200, path + " expected HTTP 200");
    assert.ok(html.length > 2000 && words.length > 150, path + " unexpectedly thin/empty");
    assert.ok(response.url.includes("__td_fresh_authority_audit="), path + " audit nonce stripped");
    assert.ok(!["HIT", "STALE", "UPDATING"].includes(cacheStatus.toUpperCase()), path + " CDN returned cached HTML: " + cacheStatus);
    assert.ok(age == null || Number(age) === 0, path + " cached age " + age);
    assert.equal(canonical.replace(/\/$/, ""), origin + path, path + " canonical mismatch");
    assert.ok(!/\bnoindex\b/i.test(robots), path + " nonindexable");
    assert.equal(h1.length, 1, path + " needs exactly one H1");
    assert.ok(!schemaTypes.includes("INVALID_JSON_LD"), path + " invalid JSON-LD");
    console.log("FRESH PASS " + path + " cache=" + cacheStatus + " age=" + (age ?? "none") + " words=" + words.length);
  } catch (e) {
    failed.push(path + ": " + e.message);
    console.error("FRESH FAIL " + path + ": " + e.message);
  }
}
if (failed.length) throw new Error("Fresh five-hub audit incomplete:\n" + failed.join("\n"));
console.log("FRESH ACCEPTANCE 5/5 nonce requests, no evidence of cached HTML; review JSON metrics for quality");
