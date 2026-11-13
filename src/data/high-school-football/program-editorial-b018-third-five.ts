import type { FootballProgramEditorial } from './program-editorial';
import { getBatch018FloresvilleEditorial } from './program-editorial-b018-floresville';
import { getBatch018FloydadaEditorial } from './program-editorial-b018-floydada';
import { getBatch018FollettEditorial } from './program-editorial-b018-follett';
import { getBatch018ForestburgEditorial } from './program-editorial-b018-forestburg';
import { getBatch018ForneyEditorial } from './program-editorial-b018-forney';

// Source-authored cohort; NOT production Chrome certified.
export function getBatch018ThirdFiveEditorial(slug: string): FootballProgramEditorial | undefined {
  return getBatch018FloresvilleEditorial(slug) ?? getBatch018FloydadaEditorial(slug) ?? getBatch018FollettEditorial(slug) ?? getBatch018ForestburgEditorial(slug) ?? getBatch018ForneyEditorial(slug);
}
