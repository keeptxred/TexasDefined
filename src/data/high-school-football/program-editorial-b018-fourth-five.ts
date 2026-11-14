import type { FootballProgramEditorial } from './program-editorial';
import { getBatch018ForsanEditorial } from './program-editorial-b018-forsan';
import { getBatch018FortBendAustinEditorial } from './program-editorial-b018-fort-bend-austin';
import { getBatch018FortBendBushEditorial } from './program-editorial-b018-fort-bend-bush';
import { getBatch018FortBendChristianEditorial } from './program-editorial-b018-fort-bend-christian';
import { getBatch018FortBendClementsEditorial } from './program-editorial-b018-fort-bend-clements';

// Source-authored cohort; NOT production Chrome certified.
export function getBatch018FourthFiveEditorial(slug: string): FootballProgramEditorial | undefined {
  return getBatch018ForsanEditorial(slug) ?? getBatch018FortBendAustinEditorial(slug) ?? getBatch018FortBendBushEditorial(slug) ?? getBatch018FortBendChristianEditorial(slug) ?? getBatch018FortBendClementsEditorial(slug);
}
