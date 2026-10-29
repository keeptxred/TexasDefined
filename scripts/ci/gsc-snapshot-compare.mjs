/**
 * Dated, finalized GSC Web Search page observations. The user must explicitly
 * select both datasets; these snapshots are never treated as live data.
 */
export function parseGscPageCsv(source, origin = 'https://texasdefined.com') {
  const [header, ...lines] = source.trim().split(/\r?\n/);
  if (!['url,clicks,impressions,ctr,average_position', 'key,clicks,impressions,ctr,average_position'].includes(header)) {
    throw new Error('Unsupported finalized GSC page CSV header');
  }
  const rows = new Map();
  const allowedOrigin = new URL(origin).origin;
  for (const [index, line] of lines.entries()) {
    if (!line.trim()) continue;
    const parts = line.split(',');
    if (parts.length < 5) throw new Error('Incomplete GSC page CSV line ' + (index + 2));
    const [clicksRaw, impressionsRaw, ctrRaw, positionRaw] = parts.splice(-4);
    let url = parts.join(',');
    if (url.startsWith('"') && url.endsWith('"')) url = url.slice(1, -1).replace(/""/g, '"');
    let parsed;
    try { parsed = new URL(url); } catch { throw new Error('Invalid GSC URL at line ' + (index + 2)); }
    const clicks = Number(clicksRaw), impressions = Number(impressionsRaw);
    const ctr = Number(ctrRaw), averagePosition = Number(positionRaw);
    if (parsed.origin !== allowedOrigin || parsed.href !== url || !parsed.pathname.startsWith('/')
      || ![clicks, impressions, ctr, averagePosition].every(Number.isFinite)
      || !Number.isInteger(clicks) || !Number.isInteger(impressions)
      || clicks < 0 || impressions < 0 || clicks > impressions
      || ctr < 0 || ctr > 1 || averagePosition < 0 || rows.has(url)) {
      throw new Error('Invalid or duplicate GSC metrics at CSV line ' + (index + 2));
    }
    rows.set(url, { clicks, impressions, ctr, averagePosition });
  }
  return rows;
}

export function compareGscPageWindows(all28, last7) {
  if (!all28 || !last7) return null;
  if (last7.impressions > all28.impressions || last7.clicks > all28.clicks) {
    throw new Error('GSC seven-day metrics exceed twenty-eight-day totals; dates are not aligned');
  }
  const priorImpressions = all28.impressions - last7.impressions;
  const priorClicks = all28.clicks - last7.clicks;
  if (priorClicks < 0 || priorClicks > priorImpressions) {
    throw new Error('GSC previous-window clicks are inconsistent with the dated totals');
  }
  if (!priorImpressions) {
    return { recent: last7, previous21: null, ctrDelta: null, positionDelta: null };
  }
  const priorPosition = (all28.averagePosition * all28.impressions
    - last7.averagePosition * last7.impressions) / priorImpressions;
  if (!Number.isFinite(priorPosition) || priorPosition < 0) throw new Error('Inconsistent GSC weighted positions');
  const previous21 = {
    clicks: priorClicks, impressions: priorImpressions,
    ctr: priorClicks / priorImpressions, averagePosition: priorPosition,
  };
  return {
    recent: last7, previous21,
    ctrDelta: last7.ctr - previous21.ctr,
    positionDelta: last7.averagePosition - previous21.averagePosition,
  };
}
