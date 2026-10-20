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
    imageFile: "Texas_Maritime_Museum_Rockport_Texas_2024.jpg",
    title: "La Salle Odyssey: Seven Texas Coastal Museums",
    phrases: ["City by the Sea Museum", "La Belle"],
    photo: "Larry D. Moore",
    links: ["texas-maritime-museum-rockport", "corpus-christi-museum-science-history"],
  },
  {
    slug: "goose-island-big-tree",
    imageFile: "Big_Tree_Texas_2024.jpg",
    title: "The Big Tree at Goose Island State Park",
    phrases: ["exact age", "Goose Island"],
    photo: "Larry D. Moore",
    links: ["goose-island-state-park"],
  },
  {
    slug: "south-padre-island",
    imageFile: "South_Padre_Island_beach_panorama.jpg",
    title: "South Padre Island",
    phrases: ["Laguna Madre", "Port Isabel"],
    photo: "Spheroidite",
    links: ["port-isabel-historical-museum"],
  },
  {
    slug: "corpus-christi-museum-science-history",
    imageFile: "Corpus_christi_museum_of_science_history.jpg",
    faqQuestion: "How much is admission to the Corpus Christi Museum of Science and History?",
    title: "Corpus Christi Museum of Science and History",
    phrases: ["South Texas", "archaeology"],
    photo: "Larry D. Moore",
    links: ["la-salle-odyssey-texas-coast"],
  },
  {
    slug: "port-isabel-historical-museum",
    imageFile: "LCCN2014630503.tif",
    faqQuestion: "Is the Port Isabel Historical Museum open every day?",
    title: "Port Isabel Historical Museum",
    phrases: ["Champion Building", "fish mural"],
    photo: "Carol M. Highsmith",
    links: ["south-padre-island"],
  },
  {
    slug: "historic-brownsville-museum",
    imageFile: "Southern_Pacific_Railroad_Passenger_Depot_Brownsville_Texas.jpg",
    faqQuestion: "Does Historic Brownsville Museum admission include the locomotive gallery?",
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

/**
 * An attribution string is not proof of a working hero image. Fetch the exact
 * image URL emitted by SSR (direct Wikimedia image or governed site media proxy)
 * and reject 404, HTML error bodies, empty responses and non-image MIME types.
 */
async function verifyHeroImage(html, item) {
  const preloadTags = html.match(/<link\b[^>]*>/gi) || [];
  const imageUrls = preloadTags
    .filter((tag) => /\bas=["']image["']/i.test(tag))
    .map((tag) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1]?.replace(/&amp;/g, "&"))
    .filter(Boolean);
  // The site logo is also preloaded. Match the exact destination photograph
  // rather than relying on preload ordering.
  const src = imageUrls.find((url) => url.includes(item.imageFile));
  if (!src) return "expected destination hero preload missing: " + item.imageFile;
  const url = new URL(src, origin);
  if (!["texasdefined.com", "commons.wikimedia.org"].includes(url.hostname) || url.protocol !== "https:") {
    return "untrusted hero media host: " + url.hostname;
  }
  try {
    const image = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: {
        "User-Agent": "TexasDefined-Coastal-Image-Acceptance/1.0 (editorial attribution audit)",
        "Accept": "image/avif,image/webp,image/jpeg,image/png,image/*",
      },
    });
    const mime = String(image.headers.get("content-type") || "").toLowerCase();
    if (!image.ok || !mime.startsWith("image/")) {
      await image.body?.cancel();
      return "hero HTTP " + image.status + " with MIME " + mime + " at " + url.pathname;
    }
    const bytes = new Uint8Array(await image.arrayBuffer());
    if (bytes.length < 500) return "hero returned fewer than 500 bytes: " + bytes.length;
    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const isWebp = new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF"
      && new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
    const isGif = new TextDecoder().decode(bytes.slice(0, 3)) === "GIF";
    const isAvif = new TextDecoder().decode(bytes.slice(4, 12)).includes("avif");
    if (!(isJpeg || isPng || isWebp || isGif || isAvif)) return "hero image has invalid file signature; MIME " + mime + "; bytes " + bytes.length + "; prefix " + Array.from(bytes.slice(0, 20), (b) => b.toString(16).padStart(2, "0")).join(" ");
    return null;
  } catch (error) {
    return "hero image request failed: " + String(error);
  }
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
      if (item.faqQuestion && !text.includes(item.faqQuestion.toLowerCase())) failures.push("missing sourced museum FAQ: " + item.faqQuestion);
      for (const slug of item.links) if (!html.includes("/destination/" + slug)) failures.push("missing internal link: " + slug);
      if (canonical !== origin + path) failures.push("incorrect canonical: " + String(canonical));
      if (noindexFound(html)) failures.push("noindex on authoritative visitor guide");
      const heroFailure = await verifyHeroImage(html, item);
      if (heroFailure) failures.push(heroFailure);
      result = { path, status: response.status, bytes: html.length, canonical, failures };
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
