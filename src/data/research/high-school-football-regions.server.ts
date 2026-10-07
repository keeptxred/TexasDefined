import { footballProgramProfilePath } from '@/data/high-school-football/program-slugs';
import {
  UIL_FOOTBALL_ALIGNMENT_SOURCES,
  UIL_FOOTBALL_PROGRAM_COUNT,
  UIL_FOOTBALL_PROGRAMS_2026,
} from '@/data/high-school-football/uil-football-alignments-2026.server';
import type {
  FootballRegionDataset,
  FootballRegionProgramRow,
  FootballRegionSummaryRow,
  FootballResearchRegion,
} from './high-school-football-regions';

const classifications = ['1A', '2A', '3A', '4A', '5A', '6A'] as const;
const regionNames: readonly FootballResearchRegion[] = ['Region I', 'Region II', 'Region III', 'Region IV'];

function regionForDistrict(district: number): FootballResearchRegion {
  if (district <= 4) return 'Region I';
  if (district <= 8) return 'Region II';
  if (district <= 12) return 'Region III';
  return 'Region IV';
}

export function loadFootballRegionResearchServer(): FootballRegionDataset {
  const programs: FootballRegionProgramRow[] = UIL_FOOTBALL_PROGRAMS_2026.map((program) => ({
    schoolName: program.schoolName,
    profilePath: footballProgramProfilePath(program.schoolName),
    classification: program.classification,
    division: program.division,
    district: program.district,
    region: regionForDistrict(program.district),
    footballType: program.footballType,
    sourceUrl: program.sourceUrl,
  })).sort((a, b) => a.region.localeCompare(b.region) || Number(b.classification[0]) - Number(a.classification[0]) || a.district - b.district || a.schoolName.localeCompare(b.schoolName));

  const regions: FootballRegionSummaryRow[] = regionNames.map((region) => {
    const group = programs.filter((program) => program.region === region);
    const byClassification = Object.fromEntries(classifications.map((classification) => [classification, group.filter((program) => program.classification === classification).length])) as FootballRegionSummaryRow['byClassification'];
    return {
      region,
      programCount: group.length,
      sixManPrograms: group.filter((program) => program.footballType === '6-Man').length,
      elevenManPrograms: group.filter((program) => program.footballType === '11-Man').length,
      byClassification,
    };
  });

  const sourceUrls = [...new Set(UIL_FOOTBALL_ALIGNMENT_SOURCES.map((source) => source.sourceUrl))];
  const validDistricts = programs.every((program) => Number.isInteger(program.district) && program.district >= 1 && program.district <= 16);
  const summarizedTotal = regions.reduce((sum, region) => sum + region.programCount, 0);

  return {
    available: UIL_FOOTBALL_PROGRAM_COUNT === 1268 && programs.length === 1268 && summarizedTotal === 1268 && validDistricts,
    alignmentCycle: '2026-28',
    programCount: programs.length,
    programs,
    regions,
    sourceUrls,
  };
}
