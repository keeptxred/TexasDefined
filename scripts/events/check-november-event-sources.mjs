// Read-only organizer monitoring for the 2026 November collection.
// Never infer dates from an old season or write changes to published listings.
export const targets = [
  { name: "Houston Ballet Nutcracker Market venue", url: "https://www.houstonballet.org/support-us/special-events/nutcracker-market/about/nutcracker-market/", patterns: [/November\s+12\s*[-–]\s*15,?\s*2026/i, /Reliant\s+Center/i] },
  { name: "Dobie Dichos sold-out meal", url: "https://www.dobiedichos.com/tickets-schedule", patterns: [/November\s+6(?:th)?,?\s+2026/i, /Program\s*\+\s*Meal/i, /SOLD\s+OUT/i] },
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

async function inspect(target) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(target.url, { signal: controller.signal, headers: { "User-Agent": "TexasDefined-November-Source-Watch/1.0" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    if (!verifySource(html, target)) throw new Error("published dates changed or no longer appear in accessible organizer text");
    return { name: target.name, status: "match", url: target.url };
  } catch (error) {
    return { name: target.name, status: "review", url: target.url, reason: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const today = new Date().toISOString().slice(0, 10);
  if (today > "2027-02-28") {
    console.error("2026 November monitor has expired: source-qualified 2027 season needs a new reviewed edition.");
    process.exitCode = 1;
  } else {
    const observations = await Promise.all(targets.map(inspect));
    for (const observation of observations) console.log(JSON.stringify(observation));
    if (observations.some((result) => result.status === "review")) {
      console.error("Organizer-source review required. Preserve existing dates and open a bounded issue; do not auto-correct.");
      process.exitCode = 1;
    }
  }
}
