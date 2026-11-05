import type { FootballProgramEditorial } from './program-editorial';

// Assigned Batch013: load only individually authored routes; never infer VERIFIED status.
export const BATCH013_AUTHORED_SLUGS = new Set(['cuero','cumby','cushing','cy-fair','cypress-creek']);
export const BATCH013_SECOND_FIVE_SLUGS = new Set(['cypress-falls','cypress-lakes','cypress-park','cypress-ranch','cypress-ridge']);

export const BATCH013_THIRD_GROUP_SLUGS = new Set(['cypress-springs','cypress-woods','daingerfield','dalhart']);

export const BATCH013_DALLAS_FIVE_SLUGS = new Set(['dallas-a','dallas-adams','dallas-adamson','dallas-carter','dallas-conrad']);

export const BATCH013_FINAL_SIX_FIRST_THREE = new Set(['dallas-highland-park','dallas-hillcrest','dallas-jefferson']);

export async function loadBatch013FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (BATCH013_AUTHORED_SLUGS.has(slug)) {
    const { getBatch013FootballProgramEditorial } = await import('./program-editorial-b013');
    return getBatch013FootballProgramEditorial(slug);
  }
  if (BATCH013_SECOND_FIVE_SLUGS.has(slug)) {
    const { getBatch013SecondFiveEditorial } = await import('./program-editorial-b013-group2');
    return getBatch013SecondFiveEditorial(slug);
  }
  if (BATCH013_THIRD_GROUP_SLUGS.has(slug)) {
    const { getBatch013ThirdGroupEditorial } = await import('./program-editorial-b013-group3');
    return getBatch013ThirdGroupEditorial(slug);
  }
  if (BATCH013_DALLAS_FIVE_SLUGS.has(slug)) {
    const { getBatch013DallasFiveEditorial } = await import('./program-editorial-b013-group4');
    return getBatch013DallasFiveEditorial(slug);
  }
  if (BATCH013_FINAL_SIX_FIRST_THREE.has(slug)) {
    const { getBatch013FinalSixFirstThreeEditorial } = await import('./program-editorial-b013-group5');
    return getBatch013FinalSixFirstThreeEditorial(slug);
  }
  return undefined;
}
