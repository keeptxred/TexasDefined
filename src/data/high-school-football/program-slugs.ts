export function footballProgramSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function footballProgramProfilePath(value: string) {
  return `/texas-high-school-football-teams/${footballProgramSlug(value)}`;
}

export function footballClassificationRank(classification: string) {
  const match = classification.match(/^([1-6])A$/);
  return match ? Number(match[1]) : 0;
}
