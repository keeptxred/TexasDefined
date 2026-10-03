import { createServerFn } from '@tanstack/react-start';

export type FootballResearchRegion = 'Region I' | 'Region II' | 'Region III' | 'Region IV';

export type FootballRegionProgramRow = {
  schoolName: string;
  profilePath: string;
  classification: '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
  division: 1 | 2 | null;
  district: number;
  region: FootballResearchRegion;
  footballType: '6-Man' | '11-Man';
  sourceUrl: string;
};

export type FootballRegionSummaryRow = {
  region: FootballResearchRegion;
  programCount: number;
  sixManPrograms: number;
  elevenManPrograms: number;
  byClassification: Record<'1A' | '2A' | '3A' | '4A' | '5A' | '6A', number>;
};

export type FootballRegionDataset = {
  available: boolean;
  alignmentCycle: '2026-28';
  programCount: number;
  programs: FootballRegionProgramRow[];
  regions: FootballRegionSummaryRow[];
  sourceUrls: string[];
};

const loadFootballRegionResearchFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadFootballRegionResearchServer } = await import('./high-school-football-regions.server');
  return loadFootballRegionResearchServer();
});

export function loadFootballRegionResearch(): Promise<FootballRegionDataset> {
  return loadFootballRegionResearchFn();
}
