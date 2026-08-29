import { createFileRoute } from "@tanstack/react-router";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function metric(label: string, value: number) {
  return `<article class="metric"><strong>${value}</strong><span>${escapeHtml(label)}</span></article>`;
}

async function buildAuditHtml() {
  const { loadTexasTalentNetworkCoverageAuditServer } = await import("@/data/texas-talent-network-audit.server");
  const audit = await loadTexasTalentNetworkCoverageAuditServer();

  const relationshipRows = audit.relationshipBacklog.map((row) => `
    <tr>
      <td><a href="/admin/texas-talent/${encodeURIComponent(row.slug)}">${escapeHtml(row.name)}</a></td>
      <td>${escapeHtml(row.category)}</td>
      <td>${row.relatedCount}</td>
      <td>${row.relatedWithSharedContext}</td>
      <td>${row.sharedDestinationCount}</td>
      <td>${row.categoryOnlyFallback ? "taxonomy fallback" : row.relatedCount === 0 ? "no related profiles" : "needs stronger context"}</td>
    </tr>`).join("");

  const experienceRows = audit.experienceBacklog.map((row) => `
    <tr>
      <td><a href="/admin/texas-talent/${encodeURIComponent(row.slug)}">${escapeHtml(row.name)}</a></td>
      <td>${escapeHtml(row.category)}</td>
      <td>${row.safeInternalLinkCount}</td>
      <td>${row.experienceLinkCount}</td>
      <td>${row.experienceStatus === "context-only" ? "county/culture context only" : "no safe link"}</td>
    </tr>`).join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><title>Texas Talent Network Audit | Texas Defined</title><style>
body{margin:0;font-family:system-ui,sans-serif;background:#f6f4ef;color:#1b1b1b}.wrap{width:min(1220px,calc(100% - 40px));margin:auto}.hero{background:#181818;color:#fff;padding:64px 0}.eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:800;color:#b87a31}h1,h2{font-family:Georgia,serif;margin:.3em 0}h1{font-size:clamp(44px,7vw,76px)}h2{font-size:clamp(30px,4vw,46px)}p{line-height:1.75;color:#666}.hero p{color:#c8c8c8;max-width:850px}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:#d6d1c8;border:1px solid #d6d1c8;margin:32px 0}.metric{background:#fff;padding:22px}.metric strong{display:block;font-family:Georgia,serif;font-size:36px;color:#a26724}.metric span{display:block;margin-top:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#666}.section{padding:44px 0;border-bottom:1px solid #d6d1c8}.note{max-width:880px}.table-wrap{overflow:auto;background:#fff;border:1px solid #d6d1c8;margin-top:22px}table{border-collapse:collapse;width:100%;min-width:760px}th,td{text-align:left;padding:13px 14px;border-bottom:1px solid #e7e3db;font-size:13px}th{text-transform:uppercase;letter-spacing:.08em;font-size:10px;color:#666;background:#f8f7f3}a{color:#985d1d;font-weight:700;text-decoration:none}.empty{background:#fff;border:1px solid #d6d1c8;padding:22px;margin-top:20px}.footer{padding:36px 0 60px}.boundary{display:inline-block;border:1px solid #b87a31;padding:10px 13px;color:#b87a31;text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:800}
</style></head><body><main><section class="hero"><div class="wrap"><p class="eyebrow">Texas Talent · Internal QA</p><h1>Network coverage audit</h1><p>Relationship strength and visitable-place readiness across all ${audit.totalProfiles} hidden profiles. This audit distinguishes genuine shared Texas context from category-only recommendations, and it does not count county or culture pages as places a reader can physically experience.</p><span class="boundary">Noindex · editorial tooling only</span></div></section>
<section class="section"><div class="wrap"><p class="eyebrow">Relationship quality</p><h2>Are the profiles connected by more than a category?</h2><div class="metrics">${metric("Profiles tracked", audit.totalProfiles)}${metric("With related profiles", audit.profilesWithRelatedProfiles)}${metric("With shared Texas context", audit.profilesWithSharedContextRelationships)}${metric("Category-only fallback", audit.categoryOnlyFallbackProfiles)}${metric("No related profiles", audit.profilesWithoutRelatedProfiles)}</div><p class="note">A shared-context relationship requires at least one common safe Texas Defined destination. Same-discipline matches remain useful as a fallback, but they should not be mistaken for a place-based knowledge-graph connection.</p>${relationshipRows ? `<div class="table-wrap"><table><thead><tr><th>Profile</th><th>Category</th><th>Related</th><th>Shared-context matches</th><th>Shared destinations</th><th>Backlog reason</th></tr></thead><tbody>${relationshipRows}</tbody></table></div>` : `<div class="empty">Every profile has at least one related profile connected through shared Texas context.</div>`}</div></section>
<section class="section"><div class="wrap"><p class="eyebrow">Experience readiness</p><h2>Can a reader go somewhere connected to the story?</h2><div class="metrics">${metric("With city/destination links", audit.profilesWithExperienceLinks)}${metric("Context-only links", audit.contextOnlyExperienceProfiles)}${metric("No safe internal links", audit.profilesWithoutSafeInternalLinks)}</div><p class="note">For this audit, a visitable experience link must resolve to a currently indexable city or destination entity. County authority pages and broad culture hubs are valuable context, but they do not satisfy the editorial promise of “where to experience the story in Texas.”</p>${experienceRows ? `<div class="table-wrap"><table><thead><tr><th>Profile</th><th>Category</th><th>Safe links</th><th>Visitable links</th><th>Backlog reason</th></tr></thead><tbody>${experienceRows}</tbody></table></div>` : `<div class="empty">Every profile has at least one safe city or destination link.</div>`}</div></section>
<section class="footer"><div class="wrap"><a href="/admin/texas-talent">← Texas Talent workbench</a><p>This page is server-rendered, private/no-store, and never changes stored readiness, editorial approval, publication status, sitemap membership or public route ownership.</p></div></section></main></body></html>`;
}

export const Route = createFileRoute("/admin/texas-talent/network-audit")({
  server: {
    handlers: {
      GET: async () => new Response(await buildAuditHtml(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }),
    },
  },
});
