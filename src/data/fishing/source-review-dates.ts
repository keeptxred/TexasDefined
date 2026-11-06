/**
 * Conservatively describe the newest source-reviewed record in a directory.
 *
 * The date is driven by evidenced records, never by a page view, build,
 * deployment, or scheduled source reachability check. It must not invent a
 * current review when the underlying provider has not been rechecked.
 */
export function latestFishingSourceReviewDate(
  records: ReadonlyArray<{ verifiedAt?: string | null }>,
  fallbackDate: string,
): string {
  const today = new Date().toISOString().slice(0, 10);
  return records.reduce((latest, record) => {
    const day = record.verifiedAt?.slice(0, 10);
    if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day)) || day > today) {
      return latest;
    }
    return day > latest ? day : latest;
  }, fallbackDate);
}
