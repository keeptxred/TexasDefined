#!/usr/bin/env node

const SUPABASE_URL = String(process.env.TEXASDEFINED_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SERVICE_KEY = String(process.env.TEXASDEFINED_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "");
const DRY_RUN = process.argv.includes("--dry-run");

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing TEXASDEFINED_SUPABASE_URL or TEXASDEFINED_SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const SOURCES = [
  {
    key: "tpwd-calendar",
    name: "Texas Parks and Wildlife Department",
    url: "https://tpwd.texas.gov/calendar",
    authority: 100,
    kind: "tpwd-html",
  },
];

const ANNUAL_EVENTS = [
  ["state-fair-of-texas", "State Fair of Texas", "Dallas", "prairies-lakes", "seasonal", "https://bigtex.com/", 98],
  ["houston-livestock-show-and-rodeo", "Houston Livestock Show and Rodeo", "Houston", "gulf-coast", "rodeo", "https://www.rodeohouston.com/", 98],
  ["fiesta-san-antonio", "Fiesta San Antonio", "San Antonio", "south-texas", "culture", "https://fiestasanantonio.org/", 96],
  ["wurstfest", "Wurstfest", "New Braunfels", "hill-country", "food", "https://wurstfest.com/", 94],
  ["ennis-bluebonnet-trails", "Ennis Bluebonnet Trails", "Ennis", "prairies-lakes", "seasonal", "https://www.bluebonnettrail.org/", 92],
  ["marfa-lights-festival", "Marfa Lights Festival", "Marfa", "big-bend", "music", "https://visitmarfa.com/", 88],
];

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return stripHtml(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

function regionFromPlace(place) {
  const value = String(place || "").toLowerCase();
  if (/marfa|alpine|terlingua|fort davis|big bend/.test(value)) return "big-bend";
  if (/amarillo|canyon|lubbock|palo duro|caprock/.test(value)) return "panhandle";
  if (/beaumont|tyler|nacogdoches|caddo|east texas/.test(value)) return "piney-woods";
  if (/corpus|galveston|houston|port aransas|coast/.test(value)) return "gulf-coast";
  if (/san antonio|laredo|mcallen|brownsville|valley/.test(value)) return "south-texas";
  if (/austin|fredericksburg|wimberley|new braunfels|hill country/.test(value)) return "hill-country";
  return "prairies-lakes";
}

function categoryFromText(value) {
  const text = String(value || "").toLowerCase();
  if (/rodeo|livestock/.test(text)) return "rodeo";
  if (/concert|music|dance/.test(text)) return "music";
  if (/food|cook|fair|festival/.test(text)) return "food";
  if (/run|race|sport|bike/.test(text)) return "sport";
  if (/history|culture|art|museum|heritage/.test(text)) return "culture";
  return "seasonal";
}

function editorialBlurb(name, venue, sourceText) {
  const clean = stripHtml(sourceText).replace(new RegExp(`^${name}\\s*`, "i"), "");
  if (clean.length >= 45) return clean.slice(0, 210).replace(/\s+\S*$/, "").replace(/[,:;\-\s]+$/, "") + ".";
  if (venue) return `${name} brings visitors to ${venue} for a distinctly Texas day out.`;
  return `${name} is an upcoming Texas event worth putting on the calendar.`;
}

function parseTpwd(html) {
  const rows = [];
  const blockPattern = /<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>([\s\S]*?)(?=<h3|<h2|$)/gi;
  let match;
  while ((match = blockPattern.exec(html))) {
    const href = new URL(match[1], "https://tpwd.texas.gov").toString();
    const name = stripHtml(match[2]);
    const tail = stripHtml(match[3]);
    const dateMatch = match[0].match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:,\s+\d{4})?/i);
    if (!name || !dateMatch) continue;
    const parsed = new Date(`${dateMatch[0]} ${new Date().getFullYear()}`);
    if (Number.isNaN(parsed.getTime())) continue;
    if (parsed < new Date(Date.now() - 86400000 * 2)) parsed.setFullYear(parsed.getFullYear() + 1);
    const venue = tail.split(/(?<=[.!?])\s/)[0]?.slice(0, 120) || "Texas state park";
    const startDate = parsed.toISOString().slice(0, 10);
    rows.push({
      source_key: "tpwd-calendar",
      source_event_id: href,
      source_url: href,
      source_name: "Texas Parks and Wildlife Department",
      source_checked_at: new Date().toISOString(),
      name,
      slug: `${slugify(name)}-${startDate}`,
      blurb: editorialBlurb(name, venue, tail),
      city: venue.replace(/State Park|State Natural Area|Historic Site/gi, "").trim() || "Texas",
      region: regionFromPlace(venue),
      venue,
      start_date: startDate,
      end_date: null,
      category: categoryFromText(`${name} ${tail}`),
      official_url: href,
      confidence_score: 94,
      editorial_score: /festival|fair|rodeo|concert|star|paddle|bird|history|tour/i.test(`${name} ${tail}`) ? 84 : 68,
      auto_publish: true,
      status: "published",
      raw_payload: { excerpt: tail.slice(0, 500) },
    });
  }
  return rows;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "TexasDefined event calendar (+https://texasdefined.com)" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function annualAnchorRows() {
  const rows = [];
  for (const [key, name, city, region, category, url, score] of ANNUAL_EVENTS) {
    try {
      const html = await fetchText(url);
      const text = stripHtml(html).slice(0, 12000);
      const dateMatches = [...text.matchAll(/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*[–-]\s*\d{1,2})?,?\s+20\d{2}/gi)];
      const candidate = dateMatches.map((item) => item[0]).find((item) => new Date(item.replace(/–/g, "-")).getTime() >= Date.now() - 86400000 * 7);
      if (!candidate) continue;
      const firstDate = candidate.split(/[–-]/)[0].trim();
      const parsed = new Date(firstDate);
      if (Number.isNaN(parsed.getTime())) continue;
      const startDate = parsed.toISOString().slice(0, 10);
      rows.push({
        source_key: `official-${key}`,
        source_event_id: `${key}-${startDate}`,
        source_url: url,
        source_name: name,
        source_checked_at: new Date().toISOString(),
        name,
        slug: `${key}-${startDate}`,
        blurb: editorialBlurb(name, city, text.slice(Math.max(0, text.toLowerCase().indexOf(name.toLowerCase())), 800)),
        city,
        region,
        venue: city,
        start_date: startDate,
        end_date: null,
        category,
        official_url: url,
        confidence_score: score,
        editorial_score: score,
        auto_publish: score >= 90,
        status: score >= 90 ? "published" : "pending",
        raw_payload: { detected_date: candidate },
      });
    } catch (error) {
      console.warn(`Annual source ${name} skipped: ${error.message}`);
    }
  }
  return rows;
}

function dedupe(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = `${slugify(row.name)}:${row.start_date}:${slugify(row.city)}`;
    const current = map.get(key);
    if (!current || row.confidence_score + row.editorial_score > current.confidence_score + current.editorial_score) map.set(key, row);
  }
  return [...map.values()];
}

async function upsert(rows) {
  if (DRY_RUN) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  const response = await fetch(`${SUPABASE_URL}/rest/v1/texas_events?on_conflict=source_key,source_event_id`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!response.ok) throw new Error(`Event upsert failed ${response.status}: ${await response.text()}`);

  await fetch(`${SUPABASE_URL}/rest/v1/rpc/expire_texas_events`, {
    method: "POST",
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" },
    body: "{}",
  });
}

const collected = [];
for (const source of SOURCES) {
  try {
    const html = await fetchText(source.url);
    if (source.kind === "tpwd-html") collected.push(...parseTpwd(html));
  } catch (error) {
    console.warn(`${source.name} skipped: ${error.message}`);
  }
}
collected.push(...await annualAnchorRows());
const rows = dedupe(collected).filter((row) => row.start_date && row.official_url && row.blurb);
await upsert(rows);
console.log(`Texas events sync complete: ${rows.length} authoritative events processed.`);
