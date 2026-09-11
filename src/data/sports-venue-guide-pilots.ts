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
  "cotton-bowl-stadium": {
    canonicalPath: "/sports-venue/cotton-bowl-stadium",
    city: "Dallas",
    subtitle: "Fair Park · Historic home of the Red River Rivalry and State Fair Classic",
    venueType: "Historic outdoor football and multipurpose stadium",
    capacity: "92,100 seats",
    playingSurface: "Natural grass",
    opened: "1930",
    address: "3809 Grand Avenue, Dallas, TX 75210",
    officialUrl: "https://www.fairparkdallas.com/cotton-bowl-stadium",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Cotton Bowl Stadium at Fair Park", href: "https://www.fairparkdallas.com/cotton-bowl-stadium" },
      { label: "Fair Park visitor planning", href: "https://www.fairparkdallas.com/visit/plan-your-visit" },
      { label: "Fair Park history", href: "https://www.fairparkdallas.com/about-fair-park" },
    ],
  },
  "choctaw-stadium": {
    canonicalPath: "/sports-venue/choctaw-stadium",
    city: "Arlington",
    subtitle: "Arlington Entertainment District · Former Rangers ballpark adapted for football, soccer and events",
    venueType: "Multipurpose stadium in a former Major League Baseball ballpark",
    opened: "1994",
    address: "1000 Ballpark Way, Arlington, TX 76011",
    officialUrl: "https://globelifefield.com/choctaw-stadium/",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Choctaw Stadium official venue page", href: "https://globelifefield.com/choctaw-stadium/" },
      { label: "Choctaw Stadium history and current use", href: "https://globelifefield.com/choctaw-stadium-former-rangers-home/" },
      { label: "Globe Life Field and Choctaw Stadium tours", href: "https://globelifefield.com/tours-experiences/" },
    ],
  },
  "ford-center-at-the-star": {
    canonicalPath: "/sports-venue/ford-center-at-the-star",
    city: "Frisco",
    subtitle: "The Star · Dallas Cowboys practices, Frisco ISD football and indoor events",
    venueType: "Indoor multipurpose stadium",
    capacity: "12,000 seats",
    address: "9 Cowboys Way, Frisco, TX 75034",
    officialUrl: "https://www.thestarinfrisco.com/ford-center/",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Ford Center at The Star", href: "https://www.thestarinfrisco.com/ford-center/" },
      { label: "Ford Center guest information", href: "https://www.thestarinfrisco.com/ford-center/guest-information/" },
    ],
  },
  "datcu-stadium": {
    canonicalPath: "/sports-venue/datcu-stadium",
    city: "Denton",
    subtitle: "Denton · Home of North Texas Mean Green football",
    venueType: "College football stadium",
    homeTeam: "North Texas Mean Green football",
    capacity: "30,100 seats",
    opened: "2011",
    address: "1251 S. Bonnie Brae St., Denton, TX",
    officialUrl: "https://meangreensports.com/facilities/apogee-stadium/4",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "DATCU Stadium facility page", href: "https://meangreensports.com/facilities/apogee-stadium/4" },
      { label: "DATCU Stadium parking", href: "https://meangreensports.com/sports/2025/5/13/datcu-stadium-parking" },
      { label: "UNT clear-bag and facility entry policy", href: "https://meangreensports.com/sports/2018/8/15/clearbagpolicy" },
      { label: "2026 DATCU Stadium updates", href: "https://meangreensports.com/news/2026/9/4/datcu-stadium-whats-new-at-datcu-2026" },
    ],
  },
  "riders-field": {
    canonicalPath: "/sports-venue/riders-field",
    city: "Frisco",
    subtitle: "Frisco · Home of the Frisco RoughRiders",
    venueType: "Double-A Minor League Baseball ballpark",
    homeTeam: "Frisco RoughRiders",
    capacity: "10,216 total, including 7,748 fixed seats",
    opened: "2003",
    address: "7300 RoughRiders Trail, Frisco, TX 75034",
    officialUrl: "https://www.milb.com/frisco/ballpark/ballpark",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Riders Field fast facts", href: "https://www.milb.com/frisco/ballpark/ballpark" },
      { label: "Riders Field parking and directions", href: "https://www.milb.com/frisco/ballpark/parking" },
      { label: "Riders Field policies", href: "https://www.milb.com/frisco/ballpark/policies" },
    ],
  },
  "lone-star-park": {
    canonicalPath: "/sports-venue/lone-star-park",
    city: "Grand Prairie",
    subtitle: "Grand Prairie · Seasonal Thoroughbred and Quarter Horse racing with year-round simulcast wagering",
    venueType: "Horse racing and simulcast venue",
    capacity: "Approximately 6,000 grandstand seats",
    address: "1000 Lone Star Parkway, Grand Prairie, TX 75050",
    officialUrl: "https://www.lonestarpark.com/",
    reviewedAt: "2026-09-10",
    sources: [
      { label: "Lone Star Park official site", href: "https://www.lonestarpark.com/" },
      { label: "Lone Star Park facility and grounds", href: "https://www.lonestarpark.com/facility-and-grounds/" },
      { label: "Lone Star Park getting here", href: "https://www.lonestarpark.com/getting-here/" },
      { label: "Lone Star Park FAQ", href: "https://www.lonestarpark.com/faqs/" },
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
