// Read-only organizer monitoring for the 2026 November collection.
// Never infer dates from an old season or write changes to published listings.
export const targets = [
  { name: "GM Financial Parade of Lights", url: "https://fortworthparadeoflights.org/plan", patterns: [/November\s+22,?\s+2026/i] },
  { name: "Texas Christkindl Market", url: "https://txchristkindlmarket.com/", patterns: [/Nov\.?\s*20\s*[-–]\s*22/i, /Nov\.?\s*27\s*[-–]\s*Dec\.?\s*23/i, /2026/i] },
  { name: "Austin Studio Tour", url: "https://atxstudiotour.com/", patterns: [/November\s+14\s*[-–]\s*15/i, /(?:November\s+|\s*&\s*|\s+and\s+)21\s*[-–]\s*22/i, /2026/i] },
  { name: "Johnson City Lights Spectacular", url: "https://lightsspectacular.com/faqs", patterns: [/November\s+27,?\s+2026/i, /January\s+3,?\s+2027/i] },
  { name: "South Pole Illuminated Festival", url: "https://www.southpoleoftexas.com/", patterns: [/November\s+28\s*[-–]\s*December\s+28/i, /2026/i] },
  { name: "Rockport Songwriter Festival", url: "https://rockportsongwriterassociation.com/festival", patterns: [/(?:November|Nov\.?)\s+5\s*[-–]\s*8,?\s*2026/i] },
  { name: "A Christmas Affair (Austin)", url: "https://www.jlaustin.org/a-christmas-affair/", patterns: [/Nov\.?\s*13\s*[-–]\s*22,?\s*2026/i, /Nov\.?\s*13\s*[-–]\s*15/i, /Nov\.?\s*18\s*[-–]\s*22/i] },
  { name: "UIL Volleyball State Tournament", url: "https://www.uiltexas.org/volleyball/state", patterns: [/November\s+19(?:th)?/i, /November\s+21(?:st)?/i, /2026/i] },
  { name: "Homestead Fair Waco", url: "https://www.homesteadfair.com/", patterns: [/(?:November|Nov\.?)[\s]+27\s*[-–]\s*29,?\s*2026/i] },
  { name: "Houston Diwali", url: "https://www.houstondiwali.com/", patterns: [/NOV\s*14/i, /NOV\s*15\s*2026/i] },
  { name: "Shiner Beer Run 2026 registration", url: "https://runsignup.com/Race/TX/Shiner/ShinerBeerRun", patterns: [/November\s+21,?\s+2026/i, /(?<!half\s)(?<!1\/2\s)\bmarathon\b/i, /10K/i, /5K/i] },
  { name: "ThunderCloud Subs Turkey Trot", url: "https://thundercloud.com/event-info/", patterns: [/November\s+26/i, /2026/i] },
  { name: "Dallas YMCA Turkey Trot", url: "https://ymcadallas.org/press-release/59th-annual-dallas-ymca-turkey-trot-registration-live", patterns: [/November\s+26/i, /2026/i] },
  { name: "Fort Worth YMCA Turkey Trot", url: "https://ymcafw.org/annual-turkey-trot/", patterns: [/(?:November|Nov\.)\s+26/i, /2026/i] },
  { name: "San Antonio Calaveras de Azúcar", url: "https://www.sa.gov/Directory/News-Releases/Celebrate-D%C3%ADa-de-los-Muertos-in-Downtown-San-Antonio-2026", patterns: [/October\s+31/i, /November\s+1/i] },
  {
    name: "Houston Ballet Nutcracker Market venue",
    url: "https://www.houstonballet.org/support-us/special-events/nutcracker-market/about/nutcracker-market/",
    patterns: [/November\s+12\s*[-–]\s*15,?\s*2026/i, /Reliant\s+Center/i],
    // The organizer returns HTTP 403 to GitHub Actions. On blocked or unavailable
    // responses only, confirm the same occurrence with the venue's own schedule.
    // A successful organizer response with changed dates ALWAYS triggers review.
    officialFallback: {
      url: "https://www.reliantpark.com/event/nutcracker-market/",
      patterns: [/November\s+12,?\s+2026\s*[-–]\s*November\s+15,?\s+2026/i, /Reliant\s+Center/i],
    },
  },
  { name: "Dobie Dichos sold-out meal", url: "https://www.dobiedichos.com/tickets-schedule", patterns: [/November\s+6(?:th)?,?\s+2026/i, /Program\s*\+\s*Meal/i, /SOLD\s+OUT/i] },
];

export function textFromHtml(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ").trim();
}

export function verifySource(html, target) {
  const visibleText = textFromHtml(html);
  return target.patterns.every((pattern) => pattern.test(visibleText));
}

// Never substitute a different source merely because an accessible organizer
// page no longer matches its published dates. Only a blocked or transiently
// unavailable response can fall back to another authoritative host schedule.
export async function inspect(target, fetcher = fetch) {
  const sources = [target, ...(target.officialFallback ? [target.officialFallback] : [])];
  const errors = [];
  for (const [index, source] of sources.entries()) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let response;
    try {
      response = await fetcher(source.url, {
        signal: controller.signal,
        headers: { "User-Agent": "TexasDefined-November-Source-Watch/1.0" },
      });
      if (!response.ok) {
        const reason = `HTTP ${response.status}`;
        const retryable = response.status === 403 || response.status === 429 || response.status >= 500;
        if (retryable && index + 1 < sources.length) {
          errors.push(`${source.url}: ${reason}`);
          continue;
        }
        return { name: target.name, status: "review", url: source.url, reason };
      }
      const html = await response.text();
      if (!verifySource(html, source)) {
        return { name: target.name, status: "review", url: source.url, reason: "published dates changed or no longer appear in accessible official text" };
      }
      return { name: target.name, status: "match", url: source.url, ...(index > 0 ? { source: "official-venue-fallback" } : {}) };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      if (index + 1 < sources.length) {
        errors.push(`${source.url}: ${reason}`);
        continue;
      }
      return { name: target.name, status: "review", url: source.url, reason: [...errors, reason].join("; ") };
    } finally {
      clearTimeout(timeout);
    }
  }
  return { name: target.name, status: "review", url: target.url, reason: errors.join("; ") };
}

// Keep CLI and tested multi-source path identical: never forward Array.map's index
// as the fetcher parameter to inspect.
export function inspectAllTargets(targetList = targets, fetcher = fetch) {
  return Promise.all(targetList.map((target) => inspect(target, fetcher)));
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const today = new Date().toISOString().slice(0, 10);
  if (today > "2027-02-28") {
    console.error("2026 November monitor has expired: source-qualified 2027 season needs a new reviewed edition.");
    process.exitCode = 1;
  } else {
    const observations = await inspectAllTargets(targets);
    for (const observation of observations) console.log(JSON.stringify(observation));
    if (observations.some((result) => result.status === "review")) {
      console.error("Organizer-source review required. Preserve existing dates and open a bounded issue; do not auto-correct.");
      process.exitCode = 1;
    }
  }
}
