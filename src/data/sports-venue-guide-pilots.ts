export type SportsVenueGuideSource = {
  label: string;
  href: string;
};

export type SportsVenueGuidePilot = {
  canonicalPath: string;
  city: string;
  subtitle: string;
  venueType: string;
  homeTeam?: string;
  capacity?: string;
  playingSurface?: string;
  opened?: string;
  address?: string;
  officialUrl?: string;
  reviewedAt?: string;
  sources: readonly SportsVenueGuideSource[];
};

const SPORTS_VENUE_GUIDE_PILOTS: Record<string, SportsVenueGuidePilot> = {
  "amon-g-carter-stadium": {
    canonicalPath: "/sports-venue/amon-g-carter-stadium",
    city: "Fort Worth",
    subtitle: "Fort Worth · Home of TCU Horned Frogs football",
    venueType: "College football stadium",
    homeTeam: "TCU Horned Frogs football",
    capacity: "46,000",
    playingSurface: "Natural grass",
    opened: "1930",
    address: "2850 Stadium Drive, Fort Worth, TX 76109",
    officialUrl: "https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-football-html",
    reviewedAt: "2026-09-10",
    sources: [
      {
        label: "TCU Athletics facility facts",
        href: "https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-football-html",
      },
    ],
  },
  "gerald-j-ford-stadium": {
    canonicalPath: "/sports-venue/gerald-j-ford-stadium",
    city: "Dallas",
    subtitle: "University Park (Dallas) · Home of SMU Mustangs football",
    venueType: "College football stadium",
    homeTeam: "SMU Mustangs football",
    capacity: "33,200",
    playingSurface: "Natural grass",
    opened: "2000",
    address: "5801 Bush Avenue, Dallas, TX",
    officialUrl: "https://smumustangs.com/facilities/gerald-j-ford-stadium/2",
    reviewedAt: "2026-09-11",
    sources: [
      {
        label: "SMU Athletics facility facts",
        href: "https://smumustangs.com/facilities/gerald-j-ford-stadium/2",
      },
      {
        label: "SMU Facilities venue page",
        href: "https://www.smu.edu/businessfinance/facilities/events/for-external/venues/fordstadium",
      },
    ],
  },
  "globe-life-field": {
    canonicalPath: "/sports-venue/globe-life-field",
    city: "Arlington",
    subtitle: "Arlington · Home of the Texas Rangers",
    venueType: "Retractable-roof Major League Baseball ballpark",
    homeTeam: "Texas Rangers",
    capacity: "Approximately 40,300",
    playingSurface: "Shaw Sports Turf B1K synthetic surface",
    opened: "2020",
    address: "734 Stadium Drive, Arlington, TX 76011",
    officialUrl: "https://globelifefield.com/",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Globe Life Field official site", href: "https://globelifefield.com/" },
      { label: "Globe Life Field parking", href: "https://globelifefield.com/parking/" },
      { label: "Globe Life Field A–Z guide", href: "https://globelifefield.com/a-to-z-guide/" },
    ],
  },
  "american-airlines-center": {
    canonicalPath: "/sports-venue/american-airlines-center",
    city: "Dallas",
    subtitle: "Victory Park · Home of the Dallas Mavericks and Dallas Stars",
    venueType: "Multipurpose NBA and NHL arena",
    homeTeam: "Dallas Mavericks · Dallas Stars",
    capacity: "20,000 basketball / 18,532 hockey",
    opened: "2001",
    address: "2500 Victory Avenue, Dallas, TX 75219",
    officialUrl: "https://www.americanairlinescenter.com/",
    reviewedAt: "2026-09-11",
    sources: [
      { label: "American Airlines Center official site", href: "https://www.americanairlinescenter.com/" },
      { label: "American Airlines Center directions", href: "https://www.americanairlinescenter.com/directions" },
      { label: "American Airlines Center arena FAQ", href: "https://www.americanairlinescenter.com/arena-faq" },
    ],
  },
  "texas-motor-speedway": {
    canonicalPath: "/sports-venue/texas-motor-speedway",
    city: "Fort Worth",
    subtitle: "North Fort Worth · Major NASCAR and motorsports venue",
    venueType: "1.5-mile motorsports speedway",
    playingSurface: "Asphalt oval · 1.5 miles · 58-foot minimum width",
    opened: "1997",
    address: "3545 Lone Star Circle, Fort Worth, TX 76177",
    officialUrl: "https://www.texasmotorspeedway.com/",
    reviewedAt: "2026-09-11",
    sources: [
      { label: "Texas Motor Speedway official site", href: "https://www.texasmotorspeedway.com/" },
      { label: "Texas Motor Speedway track facts", href: "https://www.texasmotorspeedway.com/media/track-facts/track-facts.html" },
      { label: "Texas Motor Speedway history", href: "https://www.texasmotorspeedway.com/media/news/texas-motor-speedway-history-racing-excellence-since-1997.html" },
    ],
  },
};

export function getSportsVenueGuidePilot(slug: string) {
  return SPORTS_VENUE_GUIDE_PILOTS[slug];
}
