export type SportsVenueTrafficRow = {
  surfacePath: string;
  pageviews30d: number;
};

export type SportsTrafficReadiness = {
  generatedAt: string;
  windowDays: number;
  totalVenuePageviews30d: number;
  monthlyPageviewTarget: number;
  venuePageviewTarget: number;
  minimumVenuesAtTarget: number;
  venuesAtTarget: number;
  trafficReady: boolean;
  outreachHoldActive: boolean;
  topVenues: SportsVenueTrafficRow[];
};
