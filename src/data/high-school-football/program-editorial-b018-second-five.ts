import type { FootballProgramEditorial } from './program-editorial';
import { getBatch018FarwellEditorial } from './program-editorial-b018-farwell';
import { getBatch018FerrisEditorial } from './program-editorial-b018-ferris';
import { getBatch018FirstBaptistDallasEditorial } from './program-editorial-b018-first-baptist-dallas';
import { getBatch018FlatoniaEditorial } from './program-editorial-b018-flatonia';
import { getBatch018FlorenceEditorial } from './program-editorial-b018-florence';

// Source-authored cohort; NOT production Chrome certified.
export function getBatch018SecondFiveEditorial(slug: string): FootballProgramEditorial | undefined {
  return getBatch018FarwellEditorial(slug) ?? getBatch018FerrisEditorial(slug) ?? getBatch018FirstBaptistDallasEditorial(slug) ?? getBatch018FlatoniaEditorial(slug) ?? getBatch018FlorenceEditorial(slug);
}
