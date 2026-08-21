export type LiveLakeLevelSnapshot = {
  sourceUrl: string;
  measuredAt: string;
  percentFull: number;
  elevationFeet?: number | null;
};

const TIMEOUT_MS = 5000;

function stripHtml(value: string) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(value: string | undefined) {
  if (!value) return null;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseWaterDataForTexasReservoirPage(sourceUrl: string, html: string): LiveLakeLevelSnapshot | null {
  const text = stripHtml(html);

  const headline = text.match(/([A-Za-z0-9 .&'()\/-]+):\s*([0-9]{1,3}(?:\.[0-9]+)?)%\s+full\s+as\s+of\s+(\d{4}-\d{2}-\d{2})/i);
  const alternate = text.match(/([0-9]{1,3}(?:\.[0-9]+)?)%\s+full[^0-9]{0,80}(\d{4}-\d{2}-\d{2})/i);
  const percentFull = parseNumber(headline?.[2] ?? alternate?.[1]);
  const measuredAt = headline?.[3] ?? alternate?.[2] ?? null;

  if (percentFull == null || percentFull < 0 || percentFull > 150 || !measuredAt) return null;

  const elevationMatch = text.match(/(?:water\s+level|elevation)[^0-9]{0,30}([0-9]{2,4}(?:\.[0-9]+)?)\s*(?:ft|feet)/i);
  const elevationFeet = parseNumber(elevationMatch?.[1]);

  return {
    sourceUrl,
    measuredAt,
    percentFull,
    elevationFeet,
  };
}

export async function loadLiveLakeLevel(sourceUrl: string): Promise<LiveLakeLevelSnapshot | null> {
  if (!/^https:\/\/(?:www\.)?waterdatafortexas\.org\/reservoirs\/individual\//i.test(sourceUrl)) return null;

  try {
    const response = await fetch(sourceUrl, {
      cache: "no-store",
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "TexasDefined-Live-Lake-Level/1.0",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return parseWaterDataForTexasReservoirPage(sourceUrl, await response.text());
  } catch {
    return null;
  }
}
