export type TexasRiverBasinReferenceRow = {
  basin: string;
  areaSquareMiles: number;
  riverMilesInTexas: number;
  averageAnnualFlowAcreFeet: number;
};

export const texasMajorRiverBasins: readonly TexasRiverBasinReferenceRow[] = [
  { basin: "Brazos", areaSquareMiles: 42865, riverMilesInTexas: 840, averageAnnualFlowAcreFeet: 6074000 },
  { basin: "Canadian", areaSquareMiles: 12865, riverMilesInTexas: 213, averageAnnualFlowAcreFeet: 196000 },
  { basin: "Colorado", areaSquareMiles: 39428, riverMilesInTexas: 865, averageAnnualFlowAcreFeet: 1904000 },
  { basin: "Cypress", areaSquareMiles: 2929, riverMilesInTexas: 75, averageAnnualFlowAcreFeet: 493700 },
  { basin: "Guadalupe", areaSquareMiles: 5953, riverMilesInTexas: 409, averageAnnualFlowAcreFeet: 1422000 },
  { basin: "Lavaca", areaSquareMiles: 2309, riverMilesInTexas: 117, averageAnnualFlowAcreFeet: 277000 },
  { basin: "Neches", areaSquareMiles: 9937, riverMilesInTexas: 416, averageAnnualFlowAcreFeet: 4323000 },
  { basin: "Nueces", areaSquareMiles: 16700, riverMilesInTexas: 315, averageAnnualFlowAcreFeet: 539700 },
  { basin: "Red", areaSquareMiles: 24297, riverMilesInTexas: 695, averageAnnualFlowAcreFeet: 3464000 },
  { basin: "Rio Grande", areaSquareMiles: 49387, riverMilesInTexas: 889, averageAnnualFlowAcreFeet: 645500 },
  { basin: "Sabine", areaSquareMiles: 7570, riverMilesInTexas: 360, averageAnnualFlowAcreFeet: 5864000 },
  { basin: "San Antonio", areaSquareMiles: 4180, riverMilesInTexas: 238, averageAnnualFlowAcreFeet: 562700 },
  { basin: "San Jacinto", areaSquareMiles: 3936, riverMilesInTexas: 85, averageAnnualFlowAcreFeet: 1365000 },
  { basin: "Sulphur", areaSquareMiles: 3580, riverMilesInTexas: 200, averageAnnualFlowAcreFeet: 932700 },
  { basin: "Trinity", areaSquareMiles: 17913, riverMilesInTexas: 550, averageAnnualFlowAcreFeet: 5727000 },
] as const;

export const texasCoastalRiverBasins = [
  "Neches-Trinity",
  "Trinity-San Jacinto",
  "San Jacinto-Brazos",
  "Brazos-Colorado",
  "Colorado-Lavaca",
  "Lavaca-Guadalupe",
  "San Antonio-Nueces",
  "Nueces-Rio Grande",
] as const;

export const texasRiverBasinHighlights = [
  {
    label: "Largest basin in Texas",
    value: "Rio Grande",
    detail: "49,387 sq. mi. in Texas",
  },
  {
    label: "Longest Texas reach",
    value: "Rio Grande",
    detail: "889 river miles in Texas",
  },
  {
    label: "Highest average flow",
    value: "Brazos",
    detail: "6.074 million acre-feet/year",
  },
] as const;

export const texasRiverBasinReferenceMetadata = {
  sourceName: "Texas Water Development Board",
  sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp",
  lastVerified: "2026-10-03",
  canonicalPage: "https://texasdefined.com/article/texas-rivers-explained",
} as const;
