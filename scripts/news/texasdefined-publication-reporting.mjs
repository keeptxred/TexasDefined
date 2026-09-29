export function parsePostgrestExactCount(contentRange, fallbackCount) {
  const totalToken = String(contentRange || '').split('/')[1];
  if (!totalToken || totalToken === '*') return fallbackCount;
  const total = Number(totalToken);
  if (!Number.isSafeInteger(total) || total < 0) {
    throw new Error(`Invalid PostgREST exact count: ${totalToken}`);
  }
  return total;
}

export function buildPublicationRunSummary({
  mode,
  eligible,
  selected,
  published = 0,
  failed = 0,
  ids = [],
}) {
  if (!['dry-run', 'publish'].includes(mode)) throw new Error(`Unsupported publication summary mode: ${mode}`);
  for (const [name, value] of Object.entries({ eligible, selected, published, failed })) {
    if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${name} must be a non-negative integer`);
  }
  if (selected > eligible) throw new Error('selected cannot exceed eligible');
  if (published + failed > selected) throw new Error('published + failed cannot exceed selected');
  const consumed = mode === 'dry-run' ? selected : published + failed;
  return {
    mode: `${mode}-summary`,
    eligible,
    selected,
    published,
    skipped: Math.max(eligible - consumed, 0),
    failed,
    ids,
  };
}
