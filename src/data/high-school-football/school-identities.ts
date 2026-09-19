export type VerifiedFootballSchoolIdentity = {
  slug: string;
  mascot: string;
  colors?: string;
  sourceUrl: string;
  sourceLabel: string;
  verifiedAt: string;
};

export const VERIFIED_FOOTBALL_SCHOOL_IDENTITIES: readonly VerifiedFootballSchoolIdentity[] = [
  {
    slug: 'north-shore',
    mascot: 'Mustangs',
    colors: 'Scarlet and White',
    sourceUrl: 'https://nssh.galenaparkisd.com/school-information',
    sourceLabel: 'North Shore Senior High School',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'cypress-ranch',
    mascot: 'Mustangs',
    colors: 'Navy and Gold',
    sourceUrl: 'https://www.cfisd.net/our-district/our-schools-facilities/our-schools/school-mascots-colors',
    sourceLabel: 'Cypress-Fairbanks ISD',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'ce-king',
    mascot: 'Panthers',
    colors: 'Panther Blue and White',
    sourceUrl: 'https://www.sheldonisd.com/departments/athletics/logos-branding',
    sourceLabel: 'Sheldon ISD athletics branding',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'denton-guyer',
    mascot: 'Wildcats',
    colors: 'Black, Silver and Blue',
    sourceUrl: 'https://guyerhs.dentonisd.org/our-school',
    sourceLabel: 'Guyer High School',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'lewisville',
    mascot: 'Fighting Farmers',
    colors: 'Maroon and White',
    sourceUrl: 'https://lhs.lisd.net/our-school/general-information/history-of-lhs-and-mascots',
    sourceLabel: 'Lewisville High School',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'duncanville',
    mascot: 'Panthers',
    colors: 'Red and Blue',
    sourceUrl: 'https://dhs.duncanvilleisd.org/our-school',
    sourceLabel: 'Duncanville High School',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'waxahachie',
    mascot: 'Indians',
    colors: 'Green and White',
    sourceUrl: 'https://www.wisd.org/departments/public-relations',
    sourceLabel: 'Waxahachie ISD',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'south-oak-cliff',
    mascot: 'Golden Bears',
    colors: 'Gold and Black',
    sourceUrl: 'https://soc.dallasisd.org/our-school/general-information',
    sourceLabel: 'South Oak Cliff High School',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'southlake-carroll',
    mascot: 'Dragons',
    sourceUrl: 'https://www.southlakecarroll.edu/district-information/district-departments/athletics',
    sourceLabel: 'Carroll ISD Athletics',
    verifiedAt: '2026-09-19',
  },
];

export function getVerifiedFootballSchoolIdentity(slug: string) {
  return VERIFIED_FOOTBALL_SCHOOL_IDENTITIES.find((identity) => identity.slug === slug);
}
