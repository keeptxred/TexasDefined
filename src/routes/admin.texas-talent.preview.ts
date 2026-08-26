import { createFileRoute } from "@tanstack/react-router";

const TAGLINE = "The Stars of Texas Shine Bright";
const PREVIEW_CATEGORIES = ["music", "film-tv", "literature", "visual-arts", "comedy-performance"] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function buildPreviewHtml() {
  const { loadTexasTalentProfilesServer } = await import("@/data/texas-talent.server");
  const profiles = loadTexasTalentProfilesServer().filter((profile) => profile.readiness.imageReview.heroImage);
  const featured = PREVIEW_CATEGORIES.flatMap((category) =>
    profiles.filter((profile) => profile.category === category).slice(0, 2),
  );
  const cards = featured.map((profile) => {
    const image = profile.readiness.imageReview.heroImage;
    if (!image) return "";
    return `<article class="card"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy"><div class="card-body"><p class="eyebrow">${escapeHtml(profile.category)}</p><h3>${escapeHtml(profile.name)}</h3><p>${escapeHtml(profile.texasConnection)}</p><a href="/admin/texas-talent/${encodeURIComponent(profile.slug)}">Preview profile →</a></div></article>`;
  }).join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><title>Texas Talent Public Preview | Texas Defined</title><style>body{margin:0;font-family:system-ui,sans-serif;color:#191919;background:#fff}main{min-height:100vh}.wrap{width:min(1180px,calc(100% - 40px));margin:auto}.hero{position:relative;overflow:hidden;background:#171717;color:#fff}.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,23,23,.98),rgba(23,23,23,.82),rgba(23,23,23,.45))}.hero .wrap{position:relative;padding:96px 0}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:800;color:#b47a33}h1,h2,h3{font-family:Georgia,serif;margin:0}h1{font-size:clamp(56px,9vw,104px);line-height:.95}.tagline{font-family:Georgia,serif;font-size:clamp(28px,4vw,48px);font-style:italic;color:#d6a15b}.lead{max-width:760px;line-height:1.75;color:#ddd}.badge{display:inline-block;border:1px solid #b47a33;padding:12px 16px;margin-top:20px;color:#d6a15b;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.16em}.intro{padding:56px 0}.intro h2,.boundary h2{font-size:clamp(36px,5vw,56px);max-width:900px}.intro p{max-width:760px;line-height:1.8;color:#666}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:20px;padding-bottom:64px}.card{border:1px solid #ddd;background:#fff;overflow:hidden}.card img{width:100%;aspect-ratio:4/5;object-fit:cover}.card-body{padding:18px}.card h3{font-size:24px}.card-body>p:not(.eyebrow){color:#666;line-height:1.5}.card a,.boundary a{color:#a46724;font-weight:700;text-decoration:none}.boundary{background:#171717;color:#fff;padding:56px 0}.boundary p{max-width:760px;color:#bbb;line-height:1.75}.boundary a{display:inline-block;border:1px solid #555;color:#fff;padding:14px 18px;margin-top:12px}</style></head><body><main><section class="hero"><img src="/images/editorial/texas-talent-hero.webp" alt="Illustrated Texas Talent banner"><div class="shade"></div><div class="wrap"><p class="eyebrow">Texas Defined · Internal launch preview</p><h1>Texas Talent</h1><p class="tagline">${TAGLINE}</p><p class="lead">Texas stories behind the musicians, actors, filmmakers, writers, artists and performers who carried part of the state into the wider world.</p><span class="badge">Preview only · noindex</span></div></section><section class="intro wrap"><p class="eyebrow">A Texas people pillar</p><h2>The people who gave Texas a voice, a camera, a canvas and a stage.</h2><p>Birthplaces, hometowns, universities, venues, landscapes, scenes and communities are part of each profile and part of the larger Texas Defined knowledge graph.</p></section><section class="grid wrap">${cards}</section><section class="boundary"><div class="wrap"><p class="eyebrow">Launch boundary</p><h2>Built like the public pillar. Still safely behind the curtain.</h2><p>This preview exists for design and editorial review before Texas Talent receives a public URL. Search engines, the sitemap, homepage and navigation remain untouched.</p><a href="/admin/texas-talent">Open editorial workbench →</a></div></section></main></body></html>`;
}

export const Route = createFileRoute("/admin/texas-talent/preview")({
  server: {
    handlers: {
      GET: async () => new Response(await buildPreviewHtml(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }),
    },
  },
});
