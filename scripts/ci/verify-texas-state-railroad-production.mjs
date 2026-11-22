// Read-only production acceptance for the Texas State Railroad authority page.
// Never assert that old movie cars or active hospital/prison grounds are visitor sites.
const slug = "/article/texas-state-railroad-rusk-palestine-history-guide";
const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const failures = [];
for (const origin of origins) {
  const url = origin + slug + "?__railroad_authority_verify=" + Date.now();
  let html = "", status = 0, contentType = "";
  for (let attempt=1;attempt<=2;attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/html", "Cache-Control":"no-cache", "User-Agent":"TexasDefinedRailroadAuthorityValidator/1.0" },
        signal: AbortSignal.timeout(24000),
        redirect: "follow",
      });
      status = response.status;
      contentType = response.headers.get("content-type") || "";
      html = await response.text();
      if (status === 200 && html.length > 1200) break;
    } catch (error) {
      if (attempt === 2) failures.push(origin + ": network error " + String(error));
    }
  }
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<!--[\s\S]*?-->/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim() || "";
  const canonical = html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*href=["']([^"']+)["']/i)?.[1] || "";
  const hasNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const result = {origin,status,htmlBytes:html.length,contentType,title:title.slice(0,180),h1:h1.slice(0,180),canonical,hasNoindex};
  console.log(JSON.stringify(result));
  if (status !== 200 || !contentType.includes("text/html")) failures.push(origin + ": no 200 HTML response");
  if (!title.includes("Texas State Railroad")) failures.push(origin + ": missing railroad browser title");
  if (!h1.includes("Texas State Railroad")) failures.push(origin + ": missing railroad opening H1");
  if (canonical !== "https://texasdefined.com"+slug) failures.push(origin + ": missing/incorrect self-canonical");
  if (hasNoindex) failures.push(origin + ": article accidentally noindexed");
}
if (failures.length) {
  for (const failure of failures) console.error("::error::" + failure);
  process.exitCode = 1;
} else {
  console.log("Texas State Railroad production authority: canonical and direct Worker 200, title, H1, canonical, indexable.");
}
