export const ANOMALY_MONITORING_STARTED_AT = '2026-09-27';
export const ANOMALY_MIN_PAGE_IMPRESSIONS = 100;
export const ANOMALY_MIN_PARTNER_IMPRESSIONS = 25;
export const ANOMALY_MIN_PARTNERS = 3;

function count(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

export function detectAffiliateImpressionAnomalies(rows) {
  const groups = new Map();

  for (const row of Array.isArray(rows) ? rows : []) {
    const metricDate = String(row?.metric_date || '');
    const partner = String(row?.partner || '');
    const pagePath = String(row?.page_path || '');
    if (
      metricDate < ANOMALY_MONITORING_STARTED_AT
      || !metricDate
      || !partner
      || !pagePath
      || partner === '__pipeline__'
      || partner === 'expedia-search'
    ) continue;

    const impressions = count(row?.impression_count);
    const clicks = count(row?.click_count);
    if (!impressions && !clicks) continue;

    const key = `${metricDate}\u0000${pagePath}`;
    const group = groups.get(key) ?? {
      metricDate,
      pagePath,
      totalImpressions: 0,
      totalClicks: 0,
      partnerImpressions: new Map(),
    };
    group.totalImpressions += impressions;
    group.totalClicks += clicks;
    group.partnerImpressions.set(partner, (group.partnerImpressions.get(partner) ?? 0) + impressions);
    groups.set(key, group);
  }

  return [...groups.values()]
    .map((group) => {
      const partners = [...group.partnerImpressions.entries()]
        .map(([partner, impressions]) => ({ partner, impressions }))
        .filter((row) => row.impressions >= ANOMALY_MIN_PARTNER_IMPRESSIONS)
        .sort((a, b) => b.impressions - a.impressions || a.partner.localeCompare(b.partner));
      return { ...group, partners };
    })
    .filter((group) => (
      group.totalClicks === 0
      && group.totalImpressions >= ANOMALY_MIN_PAGE_IMPRESSIONS
      && group.partners.length >= ANOMALY_MIN_PARTNERS
    ))
    .sort((a, b) => b.totalImpressions - a.totalImpressions || a.pagePath.localeCompare(b.pagePath))
    .map(({ partnerImpressions: _partnerImpressions, ...group }) => group);
}
