/**
 * A transient organizer fetch/parser failure must not silently delete an
 * already source-checked FUTURE occurrence. We retain only a still-current
 * explicitly dated row from the exact governed organizer, for at most 120 days
 * after its real source check. This does not create a new annual edition.
 */
const DAY = 86400000;
const MAX_SOURCE_AGE_DAYS = 120;

const validDay = value => {
  if (typeof value !== 'string' || !/^20\d{2}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00.000Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export function retainVerifiedOfficialEvents(rows, existingRows, definitions, {
  today, horizon, now = new Date(),
} = {}) {
  if (!validDay(today) || !validDay(horizon) || today > horizon) {
    throw new Error('An explicit valid date window is required to retain official events');
  }
  const chosen = [...rows];
  const freshKeys = new Set(rows.map(row => row.id?.split(':')[1]).filter(Boolean));
  const definitionByKey = new Map(definitions.map(event => [event.key, event]));
  const existingKeys = new Set();
  for (const row of existingRows) {
    if (!row || typeof row !== 'object') continue;
    const match = typeof row.id === 'string'
      ? /^official:([a-z0-9-]+):(20\d{2}-\d{2}-\d{2})$/.exec(row.id) : null;
    if (!match) continue;
    const key = match[1];
    const event = definitionByKey.get(key);
    if (!event || freshKeys.has(key) || existingKeys.has(key)) continue;
    if (row.name !== event.name || row.city !== event.city
      || row.officialUrl !== event.url || row.category !== event.category
      || row.startDate !== match[2] || !validDay(row.startDate)
      || row.startDate > horizon || !validDay(row.endDate ?? row.startDate)
      || (row.endDate ?? row.startDate) < today
      || (row.endDate ?? row.startDate) < row.startDate
      || (row.endDate ?? row.startDate) > horizon
      || row.status !== 'published' || row.autoPublish !== true
      || Number(row.confidenceScore) < 90 || Number(row.editorialScore) < 90
      || Number(row.confidenceScore) !== event.score) continue;
    const checked = typeof row.sourceCheckedAt === 'string'
      ? Date.parse(row.sourceCheckedAt) : NaN;
    if (!Number.isFinite(checked) || checked > now.getTime()
      || now.getTime() - checked > MAX_SOURCE_AGE_DAYS * DAY) continue;
    chosen.push(row); // Keep the original dated evidence and original check timestamp.
    existingKeys.add(key);
  }
  return chosen.sort((a, b) =>
    a.startDate.localeCompare(b.startDate) || b.editorialScore - a.editorialScore);
}
