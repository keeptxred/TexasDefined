export const CITY_AUTHORITY_INDEX = [
  { name: 'Houston', slug: 'houston' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'Fort Worth', slug: 'fort-worth' },
  { name: 'Austin', slug: 'austin' },
  { name: 'San Antonio', slug: 'san-antonio' },
  { name: 'El Paso', slug: 'el-paso' },
  { name: 'Arlington', slug: 'arlington' },
  { name: 'Corpus Christi', slug: 'corpus-christi' },
  { name: 'Plano', slug: 'plano' },
  { name: 'Lubbock', slug: 'lubbock' },
] as const;

export const CITY_AUTHORITY_SLUGS: ReadonlySet<string> = new Set(CITY_AUTHORITY_INDEX.map((city) => city.slug));

export function cityAuthorityPath(slug: string) {
  return `/city/${slug}`;
}
