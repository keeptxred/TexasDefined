export type VerifiedPrivateSchoolAdmissions = {
  slug: string;
  admissionsUrl: string;
  sourceLabel: string;
  verifiedAt: string;
  applicationCycle?: string;
};

export const VERIFIED_PRIVATE_SCHOOL_ADMISSIONS: readonly VerifiedPrivateSchoolAdmissions[] = [
  {
    slug: 'liberty-christian-argyle',
    admissionsUrl: 'https://www.libertychristian.com/admissions/admissions-process',
    sourceLabel: 'Liberty Christian School admissions process',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'parish-episcopal',
    admissionsUrl: 'https://www.parish.org/admission/inquire-and-apply',
    sourceLabel: 'Parish Episcopal School inquire and apply',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'fort-bend-christian',
    admissionsUrl: 'https://www.fortbendchristian.org/admissions/process',
    sourceLabel: 'Fort Bend Christian Academy admissions process',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'all-saints-fort-worth',
    admissionsUrl: 'https://www.aseschool.org/admission/process',
    sourceLabel: 'All Saints Episcopal School admission process',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'lubbock-christian',
    admissionsUrl: 'https://www.lubbockchristian.org/admissions/lcs-application.cfm',
    sourceLabel: 'Lubbock Christian School application',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'first-baptist-dallas',
    admissionsUrl: 'https://fbacademy.com/admissions-process/admission-process/',
    sourceLabel: 'First Baptist Academy admissions process',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'san-antonio-central-catholic',
    admissionsUrl: 'https://www.cchs-satx.org/apps/pages/Admissions',
    sourceLabel: 'Central Catholic High School admissions',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'san-antonio-antonian',
    admissionsUrl: 'https://www.antonian.org/application',
    sourceLabel: 'Antonian College Preparatory admissions application',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027',
  },
  {
    slug: 'san-antonio-holy-cross',
    admissionsUrl: 'https://www.holycross-sa.org/vnews/display.v/ART/65b27ed7b3060',
    sourceLabel: 'Holy Cross of San Antonio admissions',
    verifiedAt: '2026-09-19',
    applicationCycle: '2026-27',
  },
  {
    slug: 'san-antonio-christian',
    admissionsUrl: 'https://www.sachristian.org/admissions/apply/',
    sourceLabel: 'San Antonio Christian School apply',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'geneva-boerne',
    admissionsUrl: 'https://www.genevaschooltx.org/apply/',
    sourceLabel: 'Geneva School of Boerne admissions',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'castle-hills',
    admissionsUrl: 'https://castlehills.school/admissions/',
    sourceLabel: 'The Christian School at Castle Hills admissions',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'kinkaid',
    admissionsUrl: 'https://www.kinkaid.org/admission/apply',
    sourceLabel: 'The Kinkaid School admissions',
    verifiedAt: '2026-09-19',
    applicationCycle: '2027-28',
  },
  {
    slug: 'oakridge-arlington',
    admissionsUrl: 'https://www.theoakridgeschool.org/admissions',
    sourceLabel: 'The Oakridge School admissions',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'tmi-episcopal',
    admissionsUrl: 'https://www.tmi-sa.org/Admission/timeline',
    sourceLabel: 'TMI Episcopal admissions timeline',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'grace-academy-georgetown',
    admissionsUrl: 'https://www.gracetx.org/admissions/apply',
    sourceLabel: 'Grace Academy Georgetown admissions',
    verifiedAt: '2026-09-19',
  },
  {
    slug: 'harvest-christian-bartonville',
    admissionsUrl: 'https://www.lantana.hcasaints.org/admissions',
    sourceLabel: 'Harvest Christian Academy Lantana admissions',
    verifiedAt: '2026-09-19',
  },
];

export function getVerifiedPrivateSchoolAdmissions(slug: string) {
  return VERIFIED_PRIVATE_SCHOOL_ADMISSIONS.find((entry) => entry.slug === slug);
}
