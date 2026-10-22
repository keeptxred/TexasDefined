// Shared, pure rate-history presentation helpers. These never inject locally
// verified display-only evidence into Comptroller rate calculations.
export type ComparableRatePoint = { year: number; totalRate: number | null };

export function consecutiveRateChanges<T extends ComparableRatePoint>(records: readonly T[]) {
  return records.slice(1).flatMap((record, index) => {
    const previous = records[index];
    // Missing/unreported tax years break a true one-year comparison.
    if (record.year !== previous.year + 1 ||
        record.totalRate == null || previous.totalRate == null) return [];
    return [{ year: record.year, delta: record.totalRate - previous.totalRate }];
  });
}

export function taxHistoryYearPosition(year: number, firstYear: number, lastYear: number, left: number, width: number) {
  if (!Number.isFinite(year) || !Number.isFinite(firstYear) || !Number.isFinite(lastYear) ||
      !Number.isFinite(left) || !Number.isFinite(width)) throw new Error('Invalid tax chart year/geometry');
  return lastYear <= firstYear ? left + width / 2 : left + (year - firstYear) / (lastYear - firstYear) * width;
}

export function formatOfficialTaxRate(value: number) {
  if (!Number.isFinite(value)) throw new Error('Invalid tax rate');
  const six = value.toFixed(6);
  if (Math.abs(value - Number(six)) < 1e-10) return six;
  return value.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
}
