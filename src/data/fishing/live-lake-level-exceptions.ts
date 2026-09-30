export type LiveLakeLevelExceptionReason = "noPublicLiveLevelSource";

export type LiveLakeLevelException = {
  reason: LiveLakeLevelExceptionReason;
  checkedAt: string;
  manager: string;
  officialSourceUrl: string;
  checkedSystems: readonly string[];
  note: string;
};

export const liveLakeLevelExceptions = {
  "calaveras-lake": {
    reason: "noPublicLiveLevelSource",
    checkedAt: "2026-09-30",
    manager: "CPS Energy",
    officialSourceUrl: "https://www.cpsenergy.com/content/corporate/en/about-us/community/lakes-and-parks.html",
    checkedSystems: [
      "CPS Energy cooling-lake and park information",
      "Texas Water Development Board reservoir inventory",
      "USGS Water Data for the Nation / NWIS",
      "NOAA National Water Prediction Service",
      "Texas Commission on Environmental Quality monitoring",
      "San Antonio Water System public water information",
      "City of San Antonio public GIS and water resources",
    ],
    note: "No public real-time Calaveras Lake pool-elevation series was found. The USGS Calaveras Lake monitoring location (USGS-291938098210101) has no continuous or daily data; nearby creek and air-monitoring stations are not substitutes for lake elevation.",
  },
} as const satisfies Record<string, LiveLakeLevelException>;
