const monthNumbers = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function isoDate(year, month, day) {
  if (!month || year < 2020 || year > 2100 || day < 1 || day > 31) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  return String(year) + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
}

/** Only parse exact TPWD date formats. Unknown or changed formats must never be called open. */
export function readRange(fragment) {
  const match = fragment.trim().match(/^([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:,\s*(20\d{2}))?\s*[-–]\s*(?:([A-Za-z]{3,9})\.?\s+)?(\d{1,2}),?\s*(20\d{2})$/);
  if (!match) return null;
  const firstMonth = monthNumbers[match[1].slice(0, 3).toLowerCase()];
  const lastMonth = match[4] ? monthNumbers[match[4].slice(0, 3).toLowerCase()] : firstMonth;
  const endYear = Number(match[6]);
  const startYear = match[3] ? Number(match[3]) : endYear - (firstMonth > lastMonth ? 1 : 0);
  const start = isoDate(startYear, firstMonth, Number(match[2]));
  const end = isoDate(endYear, lastMonth, Number(match[5]));
  return start && end && start <= end ? { start, end } : null;
}

export function windowStatus(row, today) {
  if (/^no closed season$/i.test(row.dates.trim())) return "year-round";
  const periods = row.start && row.end
    ? [{ start: row.start, end: row.end }]
    : row.dates.split(/\s*(?:&|;)\s*/).map(readRange);
  if (!periods.length || periods.some((period) => period === null)) return "unknown";
  if (periods.some((period) => period && period.start <= today && today <= period.end)) return "today";
  if (periods.some((period) => period && period.start > today)) return "upcoming";
  return "ended";
}

export function statusLabel(status) {
  switch (status) {
    case "today": return "Date window includes today";
    case "upcoming": return "Upcoming listed dates";
    case "ended": return "Listed dates have passed";
    case "year-round": return "No closed season in statewide table";
    default: return "Confirm dates with TPWD";
  }
}
