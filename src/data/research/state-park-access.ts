import { createServerFn } from '@tanstack/react-start';

export type StateParkAccessRow = {
  countyName: string;
  countySlug: string;
  fips: string;
  population2020: number | null;
  referenceLatitude: number;
  referenceLongitude: number;
  nearestParkName: string;
  nearestParkSlug: string;
  parkCounty: string | null;
  distanceMiles: number;
  parkSourceUrl: string | null;
};

export type StateParkAccessDataset = {
  available: boolean;
  rows: StateParkAccessRow[];
  parkCount: number;
  countyCount: number;
  countiesWithin25Miles: number;
  countiesWithin50Miles: number;
  populationInCountiesWithin50Miles: number | null;
  populationWithUsableReferencePoint: number | null;
  lastVerified: string | null;
  sourceUrls: string[];
};

const loadStateParkAccessFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadStateParkAccessServer } = await import('./state-park-access.server');
  return loadStateParkAccessServer();
});

export function loadStateParkAccess(): Promise<StateParkAccessDataset> {
  return loadStateParkAccessFn();
}
