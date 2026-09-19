export type OfficialFootballEnrollmentLink = {
  districtName: string;
  aliases: readonly string[];
  enrollmentUrl: string;
  sourceLabel: string;
  verifiedAt: string;
  schoolYear?: string;
};

export const OFFICIAL_FOOTBALL_ENROLLMENT_LINKS: readonly OfficialFootballEnrollmentLink[] = [
  {
    districtName: 'Denton ISD',
    aliases: ['Denton Independent School District'],
    enrollmentUrl: 'https://www.dentonisd.org/families/registration/new-student-enrollment',
    sourceLabel: 'Denton ISD new student enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Prosper ISD',
    aliases: ['Prosper Independent School District'],
    enrollmentUrl: 'https://www.prosper-isd.net/page/new-student-enrollment-26-27',
    sourceLabel: 'Prosper ISD new student enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Anna ISD',
    aliases: ['Anna Independent School District'],
    enrollmentUrl: 'https://www.annaisd.org/parents-students/enrollment-registration/new-student-enrollment',
    sourceLabel: 'Anna ISD new student enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Aledo ISD',
    aliases: ['Aledo Independent School District'],
    enrollmentUrl: 'https://www.aledoisd.org/parents-students/new-and-returning-student-registration/registration-frequently-asked-questions',
    sourceLabel: 'Aledo ISD registration',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Eanes ISD',
    aliases: ['Eanes Independent School District'],
    enrollmentUrl: 'https://www.eanesisd.net/parents/enrollment',
    sourceLabel: 'Eanes ISD enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Lake Travis ISD',
    aliases: ['Lake Travis Independent School District'],
    enrollmentUrl: 'https://www.ltisdschools.org/families/enrollment/new-student-enrollment-2026-2027',
    sourceLabel: 'Lake Travis ISD new student enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Lamar CISD',
    aliases: ['Lamar Consolidated ISD', 'Lamar Consolidated Independent School District'],
    enrollmentUrl: 'https://www.lcisd.org/88787_3',
    sourceLabel: 'Lamar CISD students new to the district',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Sheldon ISD',
    aliases: ['Sheldon Independent School District'],
    enrollmentUrl: 'https://www.sheldonisd.com/about-us/back-to-school/registration-for-school',
    sourceLabel: 'Sheldon ISD registration',
    verifiedAt: '2026-09-19',
  },
  {
    districtName: 'Galena Park ISD',
    aliases: ['Galena Park Independent School District'],
    enrollmentUrl: 'https://www.galenaparkisd.com/departments/student-services-department/student-services-department-new',
    sourceLabel: 'Galena Park ISD enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Katy ISD',
    aliases: ['Katy Independent School District'],
    enrollmentUrl: 'https://www.katyisd.org/registration/home',
    sourceLabel: 'Katy ISD online enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Rockwall ISD',
    aliases: ['Rockwall Independent School District'],
    enrollmentUrl: 'https://www.rockwallisd.com/new-student',
    sourceLabel: 'Rockwall ISD new student enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Humble ISD',
    aliases: ['Humble Independent School District'],
    enrollmentUrl: 'https://www.humbleisd.net/o/humbleisd/page/enrollment',
    sourceLabel: 'Humble ISD enrollment',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
  {
    districtName: 'Coppell ISD',
    aliases: ['Coppell Independent School District'],
    enrollmentUrl: 'https://www.coppellisd.com/page/parents',
    sourceLabel: 'Coppell ISD parent enrollment hub',
    verifiedAt: '2026-09-19',
    schoolYear: '2026-27',
  },
];

function normalizeDistrictName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\bindependent\s+school\s+district\b/g, ' ')
    .replace(/\bconsolidated\s+independent\s+school\s+district\b/g, ' ')
    .replace(/\bschool\s+district\b/g, ' ')
    .replace(/\bcisd\b/g, ' ')
    .replace(/\bisd\b/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getOfficialFootballEnrollmentLink(districtName?: string) {
  if (!districtName) return undefined;
  const key = normalizeDistrictName(districtName);
  return OFFICIAL_FOOTBALL_ENROLLMENT_LINKS.find((entry) =>
    [entry.districtName, ...entry.aliases]
      .map(normalizeDistrictName)
      .includes(key),
  );
}
