import type { SportsVenueGuidePilot } from './sports-venue-guide-pilots';

const SPORTS_VENUE_GUIDE_WAVE6: Record<string, SportsVenueGuidePilot> = {
  'reliant-stadium': {
    canonicalPath: '/sports-venue/reliant-stadium',
    city: 'Houston',
    subtitle: 'Reliant Park · Home of the Houston Texans and RODEOHOUSTON',
    venueType: 'Retractable-roof NFL stadium and multipurpose event venue',
    homeTeam: 'Houston Texans',
    capacity: '72,220',
    opened: '2002',
    address: 'Two Reliant Park, Houston, TX 77054',
    officialUrl: 'https://www.houstontexans.com/stadium/',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Houston Texans Reliant Stadium hub', href: 'https://www.houstontexans.com/stadium/' },
      { label: 'Reliant Stadium A–Z guide', href: 'https://www.houstontexans.com/stadium/a-z-guide' },
      { label: 'Reliant Stadium parking and traffic updates', href: 'https://www.houstontexans.com/stadium/traffic-updates' },
    ],
  },
  'darrell-k-royal-texas-memorial-stadium': {
    canonicalPath: '/sports-venue/darrell-k-royal-texas-memorial-stadium',
    city: 'Austin',
    subtitle: 'University of Texas campus · Home of Texas Longhorns football',
    venueType: 'College football stadium',
    homeTeam: 'Texas Longhorns football',
    opened: '1924',
    address: '2139 San Jacinto Blvd., Austin, TX 78712',
    officialUrl: 'https://texaslonghorns.com/facilities/memorial-stadium/1',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Texas Athletics DKR-Texas Memorial Stadium facility page', href: 'https://texaslonghorns.com/facilities/memorial-stadium/1' },
      { label: 'Texas Gameday Parking Central', href: 'https://texaslonghorns.com/sports/2026/1/27/parking-information' },
      { label: 'Texas football fan guide', href: 'https://texaslonghorns.com/sports/2026/2/10/football-fan-guide' },
    ],
  },
  'eagle-stadium-allen': {
    canonicalPath: '/sports-venue/eagle-stadium-allen',
    city: 'Allen',
    subtitle: 'Allen · Major Texas high-school football and UIL playoff venue',
    venueType: 'High-school football and multipurpose stadium',
    homeTeam: 'Allen Eagles football',
    address: '155 Rivercrest Boulevard, Allen, TX 75002',
    officialUrl: 'https://www.allenisd.org/page/eagle-stadium',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Allen ISD Eagle Stadium guide', href: 'https://www.allenisd.org/page/eagle-stadium' },
    ],
  },
  'mckinney-isd-stadium': {
    canonicalPath: '/sports-venue/mckinney-isd-stadium',
    city: 'McKinney',
    subtitle: 'McKinney · District football, soccer, track and community-event stadium',
    venueType: 'High-school football and multipurpose stadium',
    address: '4201 S. Hardin Blvd., McKinney, TX 75070',
    officialUrl: 'https://www.mckinneyisd.net/page/stadium-info',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'McKinney ISD Stadium information', href: 'https://www.mckinneyisd.net/page/stadium-info' },
      { label: 'McKinney ISD stadium directions and parking', href: 'https://www.mckinneyisd.net/page/stadium-direction-parking' },
    ],
  },
  'childrens-health-stadium-prosper': {
    canonicalPath: '/sports-venue/childrens-health-stadium-prosper',
    city: 'Prosper',
    subtitle: 'Prosper · District football, soccer, track and major school-community events',
    venueType: 'High-school football and multipurpose stadium',
    capacity: '12,000 seats',
    officialUrl: 'https://www.prosper-isd.net/page/childrens-health-stadium',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Prosper ISD Children’s Health Stadium', href: 'https://www.prosper-isd.net/page/childrens-health-stadium' },
    ],
  },
  'legacy-stadium-katy': {
    canonicalPath: '/sports-venue/legacy-stadium-katy',
    city: 'Katy',
    subtitle: 'Katy · Katy ISD football and district event stadium',
    venueType: 'High-school football and multipurpose stadium',
    officialUrl: 'https://www.katyisd.org/athletics/facilities/legacy-stadium',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Katy ISD Legacy Stadium', href: 'https://www.katyisd.org/athletics/facilities/legacy-stadium' },
    ],
  },
  'ratliff-stadium': {
    canonicalPath: '/sports-venue/ratliff-stadium',
    city: 'Odessa',
    subtitle: 'Odessa · Permian Basin high-school football landmark and district stadium',
    venueType: 'High-school football and multipurpose stadium',
    officialUrl: 'https://www.ectorcountyisd.org/Page/210',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Ector County ISD Ratliff Stadium information', href: 'https://www.ectorcountyisd.org/Page/210' },
    ],
  },
  'cy-fair-fcu-stadium': {
    canonicalPath: '/sports-venue/cy-fair-fcu-stadium',
    city: 'Cypress',
    subtitle: 'Cypress · CFISD football, soccer, track and district events',
    venueType: 'High-school football and multipurpose stadium',
    capacity: '11,000 seats',
    address: '8877 Barker Cypress, Cypress, TX 77433',
    officialUrl: 'https://www.cfisd.net/athletics/facilities/cy-fair-federal-credit-union-stadium',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'CFISD Cy-Fair Federal Credit Union Stadium', href: 'https://www.cfisd.net/athletics/facilities/cy-fair-federal-credit-union-stadium' },
    ],
  },
  'mesquite-memorial-stadium': {
    canonicalPath: '/sports-venue/mesquite-memorial-stadium',
    city: 'Mesquite',
    subtitle: 'Mesquite · District football, soccer and major school events',
    venueType: 'High-school football and multipurpose stadium',
    officialUrl: 'https://www.mesquiteisd.org/departments/athletics/venues/memorial-stadium',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Mesquite ISD Memorial Stadium', href: 'https://www.mesquiteisd.org/departments/athletics/venues/memorial-stadium' },
    ],
  },
  'ufcu-disch-falk-field': {
    canonicalPath: '/sports-venue/ufcu-disch-falk-field',
    city: 'Austin',
    subtitle: 'University of Texas campus · Home of Texas Longhorns baseball',
    venueType: 'College baseball ballpark',
    homeTeam: 'Texas Longhorns baseball',
    officialUrl: 'https://texaslonghorns.com/facilities/ufcu-disch-falk-field/2',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Texas Athletics UFCU Disch-Falk Field', href: 'https://texaslonghorns.com/facilities/ufcu-disch-falk-field/2' },
    ],
  },
  'lupton-stadium': {
    canonicalPath: '/sports-venue/lupton-stadium',
    city: 'Fort Worth',
    subtitle: 'TCU campus · Home of Horned Frogs baseball',
    venueType: 'College baseball ballpark',
    homeTeam: 'TCU Horned Frogs baseball',
    officialUrl: 'https://gofrogs.com/facilities/lupton-stadium/5',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'TCU Athletics Lupton Stadium', href: 'https://gofrogs.com/facilities/lupton-stadium/5' },
    ],
  },
  'baylor-ballpark': {
    canonicalPath: '/sports-venue/baylor-ballpark',
    city: 'Waco',
    subtitle: 'Baylor campus · Home of Bears baseball',
    venueType: 'College baseball ballpark',
    homeTeam: 'Baylor Bears baseball',
    officialUrl: 'https://baylorbears.com/facilities/baylor-ballpark/2',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Baylor Athletics Baylor Ballpark', href: 'https://baylorbears.com/facilities/baylor-ballpark/2' },
    ],
  },
  'reckling-park': {
    canonicalPath: '/sports-venue/reckling-park',
    city: 'Houston',
    subtitle: 'Rice University campus · Home of Rice Owls baseball',
    venueType: 'College baseball ballpark',
    homeTeam: 'Rice Owls baseball',
    officialUrl: 'https://riceowls.com/facilities/reckling-park/5',
    reviewedAt: '2026-09-11',
    sources: [
      { label: 'Rice Athletics Reckling Park', href: 'https://riceowls.com/facilities/reckling-park/5' },
    ],
  },
};

export function getSportsVenueGuideWave6(slug: string) {
  return SPORTS_VENUE_GUIDE_WAVE6[slug];
}
