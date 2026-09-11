export type SportsVenueGuideSource = {
  label: string;
  href: string;
};

export type SportsVenueGuidePilot = {
  canonicalPath: string;
  city: string;
  subtitle: string;
  venueType: string;
  homeTeam: string;
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
    officialUrl: "https://smumustangs.com/facilities/gerald-j-ford-stadium/2",
    reviewedAt: "2026-09-10",
    sources: [
      {
        label: "SMU Athletics facility facts",
        href: "https://smumustangs.com/facilities/gerald-j-ford-stadium/2",
      },
    ],
  },
};

export function getSportsVenueGuidePilot(slug: string) {
  return SPORTS_VENUE_GUIDE_PILOTS[slug];
}
