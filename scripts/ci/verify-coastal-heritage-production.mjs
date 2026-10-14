#!/usr/bin/env node
/**
 * Post-deploy production acceptance for the coastal heritage authority network.
 * Unlike catalog-only CI, this checks rendered public SSR, image attribution,
 * reciprocal visitor links, canonical URLs and indexability.
 */
import { mkdir, writeFile } from "node:fs/promises";

const origin = (process.env.TD_PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/+$/, "");
const deploySha = process.env.DEPLOY_SHA || "manual";
const cases = [
  {
    slug: "la-salle-odyssey-texas-coast",
    heroFile: "Texas_Maritime_Museum_Rockport_Texas_2024.jpg",
    title: "La Salle Odyssey: Seven Texas Coastal Museums",
    phrases: ["City by the Sea Museum", "La Belle"],
    photo: "Larry D. Moore",
    links: ["texas-maritime-museum-rockport", "corpus-christi-museum-science-history"],
  },
  {
    slug: "goose-island-big-tree",
    heroFile: "Big_Tree_Texas_2024.jpg",
    title: "The Big Tree at Goose Island State Park",
    phrases: ["exact age", "Goose Island"],
    photo: "Larry D. Moore",
    links: ["goose-island-state-park"],
  },
  {
    slug: "south-padre-island",
    heroFile: "South_Padre_Island_beach_panorama.jpg",
    title: "South Padre Island",
    phrases: ["Laguna Madre", "Port Isabel"],
    photo: "Spheroidite",
    links: ["port-isabel-historical-museum"],
  },
  {
    slug: "corpus-christi-museum-science-history",
    heroFile: "Corpus_christi_museum_of_science_history.jpg",
    title: "Corpus Christi Museum of Science and History",
    phrases: ["South Texas", "archaeology"],
    photo: "Larry D. Moore",
    links: ["la-salle-odyssey-texas-coast"],
  },
  {
    slug: "port-isabel-historical-museum",
    heroFile: "Champion_Building",
    title: "Port Isabel Historical Museum",
    phrases: ["Champion Building", "fish mural"],
    photo: "Carol M. Highsmith",
    links: ["south-padre-island"],
  },
  {
    slug: "historic-brownsville-museum",
    heroFile: "Southern_Pacific_Railroad_Passenger_Depot_Brownsville_Texas.jpg",
    title: "Historic Brownsville Museum",
    phrases: ["Southern Pacific", "Brownsville"],
    photo: "25or6to4",
    links: ["palmito-ranch-battlefield"],
  },
];

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&(?:amp|quot|apos|nbsp|lt|gt);/g, (entity) =>
      ({ "&amp;": "&", "&quot;": '"', "&apos;": "'", "&nbsp;": " ", "&lt;": "<", "&gt;": ">" })[entity] || entity)
    .replace(/\s+/g, " ").trim();
}

function canonicalFor(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  const link = links.find((tag) => /\brel=["']canonical["']/i.test(tag));
  return link?.match(/\bhref=["']([^"']+)["']/i)?.[1] || null;
}

function noindexFound(html) {
  return (html.match(/<meta\b[^>]*>/gi) || []).some(
    (tag) => /\bname=["']robots["']/i.test(tag) && /\bnoindex\b/i.test(tag)
  );
}

function heroPreloadUrl(html) {
  // SSR must expose the actual lead image, not merely an attribution embedded in JSON-LD.
  const preloads = html.match(/<link\b[^>]*>/gi) || [];
  const lead = preloads.find((tag) => /\bas=["']image["']/i.test(tag) && !/texasdefined-logo/i.test(tag));
  const href = lead?.match(/\bhref=["']([^"']+)["']/i)?.[1];
  return href ? new URL(href.replace(/&amp;/gi, "&"), origin).toString() : null;
}

function decodedImageReference(url) {
  let value = url;
  for (let i = 0; i < 2; i++) {
    try { value = decodeURIComponent(value); } catch { break; }
  }
  return value;
}

async function checkHeroImage(url) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(18000),
    headers: {
      "User-Agent": "TexasDefined-Coastal-Production-Authority-Check/1.0",
      "Accept": "image/avif,image/webp,image/*",
      "Range": "bytes=0-65535",
    },
  });
  const mime = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  const reader = response.body?.getReader();
  const first = reader ? await reader.read() : null;
  const bytes = first?.value?.byteLength || 0;
  await reader?.cancel().catch(() => {});
  return {
    url,
    status: response.status,
    mime,
    firstChunkBytes: bytes,
    ok: [200, 206].includes(response.status) && mime.startsWith("image/") && bytes > 64,
  };
}

async function probe(item) {
  const path = "/destination/" + item.slug;
  let result;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const url = origin + path + "?coastal_verify=" + encodeURIComponent(deploySha + "-" + Date.now() + "-" + attempt);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
        headers: { "User-Agent": "TexasDefined-Coastal-Production-Authority-Check/1.0", "Cache-Control": "no-cache" },
      });
      const html = await response.text();
      const text = visibleText(html).toLowerCase();
      const canonical = canonicalFor(html);
      const failures = [];
      if (response.status !== 200) failures.push("HTTP " + response.status);
      if (!String(response.headers.get("content-type") || "").includes("text/html")) failures.push("not HTML");
      if (!text.includes(item.title.toLowerCase())) failures.push("title not rendered: " + item.title);
      for (const phrase of item.phrases) if (!text.includes(phrase.toLowerCase())) failures.push("missing research: " + phrase);
      if (!text.includes(item.photo.toLowerCase())) failures.push("missing photo credit: " + item.photo);
      for (const slug of item.links) if (!html.includes("/destination/" + slug)) failures.push("missing internal link: " + slug);
      if (canonical !== origin + path) failures.push("incorrect canonical: " + String(canonical));
      if (noindexFound(html)) failures.push("noindex on authoritative visitor guide");
      const heroUrl = heroPreloadUrl(html);
      let heroImage = null;
      if (!heroUrl) {
        failures.push("SSR hero image preload is missing");
      } else if (!decodedImageReference(heroUrl).includes(item.heroFile)) {
        failures.push("incorrect hero location/source: " + heroUrl);
      } else {
        try {
          heroImage = await checkHeroImage(heroUrl);
          if (!heroImage.ok) failures.push("hero image delivery failed: " + heroImage.status + " " + heroImage.mime + " first=" + heroImage.firstChunkBytes);
        } catch (imageError) {
          failures.push("hero image request failed: " + String(imageError));
        }
      }
      result = { path, status: response.status, bytes: html.length, canonical, heroImage, failures };
      if (!failures.length) {
        console.log("PASS " + path + " (" + html.length + " HTML characters)");
        return result;
      }
      console.error("Attempt " + attempt + " " + path + ": " + failures.join("; "));
    } catch (error) {
      result = { path, failures: ["request error: " + String(error)] };
      console.error("Attempt " + attempt + " " + path + ": " + String(error));
    }
    if (attempt < 5) await new Promise((resolve) => setTimeout(resolve, 4000));
  }
  return result;
}

const outcomes = [];
for (const item of cases) outcomes.push(await probe(item));
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  deploySha,
  passed: outcomes.filter((item) => !item.failures.length).length,
  total: outcomes.length,
  outcomes,
};
await mkdir("artifacts/coastal-heritage", { recursive: true });
await writeFile("artifacts/coastal-heritage/production-acceptance.json", JSON.stringify(report, null, 2) + "\n");
console.log("Coastal production acceptance: " + report.passed + "/" + report.total + " passed.");
if (report.passed !== report.total) process.exitCode = 1;
