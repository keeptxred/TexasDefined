import type { FootballProgramEditorial } from './program-editorial';
import { getBatch018FortBendCrawfordEditorial } from './program-editorial-b018-fort-bend-crawford';
import { getBatch018FortBendDullesEditorial } from './program-editorial-b018-fort-bend-dulles';
import { getBatch018FortBendElkinsEditorial } from './program-editorial-b018-fort-bend-elkins';
import { getBatch018FortBendHightowerEditorial } from './program-editorial-b018-fort-bend-hightower';
import { getBatch018FortBendKempnerEditorial } from './program-editorial-b018-fort-bend-kempner';

// Source-authored cohort; NOT production Chrome certified.
export function getBatch018FifthFiveEditorial(slug: string): FootballProgramEditorial | undefined {
  return getBatch018FortBendCrawfordEditorial(slug) ?? getBatch018FortBendDullesEditorial(slug) ?? getBatch018FortBendElkinsEditorial(slug) ?? getBatch018FortBendHightowerEditorial(slug) ?? getBatch018FortBendKempnerEditorial(slug);
}
