import assert from "node:assert/strict";

const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const targetPath = "/events/november-events";

function visibleText(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");
}

export function auditNovemberImagery(html) {
  // Ignore code/hydration data: require actual SSR card DOM, not JS source text.
  const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");
  const copy = visibleText(markup);
  assert(copy.includes("Browse November events"), "Missing live November event browser");
  const count = copy.match(/([0-9,]+)\s+of\s+([0-9,]+)\s+organizer-verified events match your filters/);
  assert(count, "Missing November results count");
  const total = Number(count[2].replace(/,/g, ""));
  const filtered = Number(count[1].replace(/,/g, ""));
  assert(total >= 55 && filtered === total, "November landing must expose all 55+ unfiltered verified events");

  const cards = [...markup.matchAll(/<li\b[^>]*\bdata-november-event-card="[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
  assert.equal(cards.length, total, "Every November event must render its own SSR card");
  const summary = { cards: cards.length, photographs: 0, editorial: 0, imageGaps: 0, featured: 0 };
  for (const [index, card] of cards.entries()) {
    const content = card[1];
    const kinds = [...content.matchAll(/\bdata-event-visual="(editorial|photograph)"/g)].map(match => match[1]);
    if (kinds.length !== 1) summary.imageGaps++;
    assert.equal(kinds.length, 1, "November card " + (index + 1) + " missing exactly one validated visual");
    if (kinds[0] === "photograph") {
      summary.photographs++;
      assert(/<img\b[^>]*\balt="[^"]+"/i.test(content), "Event photograph lacks a nonempty alt");
      assert(/<figcaption\b[^>]*>[\s\S]*?<a\b[^>]*\bhref="https:\/\//i.test(content),
        "Event photograph lacks the original source/photographer credit");
    } else {
      summary.editorial++;
      assert(content.includes("not event photography"),
        "Illustration must disclose that it is not documentary event photography");
    }
  }
  const start = markup.indexOf("Start with these November traditions");
  const end = markup.indexOf("Browse November events", start);
  assert(start >= 0 && end > start, "Missing November featured hero section");
  const featured = markup.slice(start, end);
  summary.featured = (featured.match(/\bdata-event-visual="(?:editorial|photograph)"/g) ?? []).length;
  assert.equal(summary.featured, 4, "All four featured November event tiles must have images");
  assert.equal(summary.photographs + summary.editorial, total);
  assert.equal(summary.imageGaps, 0);
  return summary;
}

async function verifyLive() {
  const stamp = process.env.GITHUB_RUN_ID || "manual";
  const uri = origin + targetPath + "?november_imagery_acceptance=" + encodeURIComponent(stamp);
  let response;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      response = await fetch(uri, {
        cache: "no-store",
        redirect: "follow",
        headers: { "user-agent": "TexasDefined-November-Imagery-Release-Acceptance/1.0" },
        signal: AbortSignal.timeout(25000)
      });
      assert(response.ok && response.headers.get("cf-mitigated") !== "challenge",
        "November live page HTTP " + response.status);
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }
  const html = await response.text();
  const summary = auditNovemberImagery(html);
  console.log("[November imagery] " + summary.cards + "/" + summary.cards +
    " visual event cards + " + summary.featured + "/4 featured; " +
    summary.photographs + " licensed source photographs, " + summary.editorial +
    " clearly disclosed editorial illustrations; zero image gaps; production SSR PASS");
}

function selfTest() {
  const illustration = '<div data-event-visual="editorial">Visual guide · not event photography</div>';
  const photograph = '<figure><img alt="Historical event photograph" src="https://example.com/event.jpg" data-event-visual="photograph" /><figcaption><a href="https://example.com/source">Photographer credit</a></figcaption></figure>';
  const cards = Array.from({ length: 55 }, (_, i) =>
    '<li data-november-event-card="Event ' + i + '">' + (i % 2 ? photograph : illustration) + '</li>').join("");
  const good = '<p>Start with these November traditions</p>' + illustration.repeat(4) +
    '<h2>Browse November events</h2><p>55 of 55 organizer-verified events match your filters</p><ul>' + cards + '</ul>';
  const result = auditNovemberImagery(good);
  assert.equal(result.cards, 55);
  assert.equal(result.featured, 4);
  assert.equal(result.imageGaps, 0);
  assert.throws(() => auditNovemberImagery(good.replace('data-event-visual="editorial"', "data-event-visual=\"missing\"")));
  assert.throws(() => auditNovemberImagery(good.replace(photograph, '<figure><img alt="" data-event-visual="photograph" /></figure>')));
  console.log("November imagery SSR acceptance fixture passed");
}

const currentChicago = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit"
}).format(new Date());

if (process.argv.includes("--self-test")) {
  selfTest();
} else if (currentChicago >= "2026-10-29" && currentChicago <= "2026-11-30") {
  await verifyLive();
} else {
  console.log("November 2026 imagery guard is out of season; no production page fetch");
}
