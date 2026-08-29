/** Brand-agnostic formatting and slug helpers. No React, no fetching. */

export function formatDate(iso: string, locale = "en-US"): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateRange(startIso: string, endIso?: string, locale = "en-US"): string {
  if (!endIso || endIso === startIso) return formatDate(startIso, locale);
  const start = new Date(`${startIso}T12:00:00Z`);
  const end = new Date(`${endIso}T12:00:00Z`);
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth();
  const month = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" });
  if (sameMonth) {
    return `${month.format(start)} ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  }
  return `${formatDate(startIso, locale)} – ${formatDate(endIso, locale)}`;
}

export function formatPrice(cents: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);
}

export function formatReadingTime(minutes: number): string {
  return `About ${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

/** Great-circle distance in miles. Used by maps and future proximity search. */
export function distanceMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function chunk<T>(rows: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size));
  return out;
}
