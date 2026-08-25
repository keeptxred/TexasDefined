import { STAGED_HOME_NATURE_TOOLS, type StagedHomeNatureTool } from './home-nature-tools';
import { STAGED_HOME_NATURE_TOOL_EXTENSIONS } from './home-nature-tools-expanded';

export const STAGED_HOME_NATURE_TOOL_CATALOG: readonly StagedHomeNatureTool[] = [
  ...STAGED_HOME_NATURE_TOOLS,
  ...STAGED_HOME_NATURE_TOOL_EXTENSIONS,
];

export function stagedHomeNatureToolById(id: string): StagedHomeNatureTool | undefined {
  return STAGED_HOME_NATURE_TOOL_CATALOG.find((tool) => tool.id === id);
}

export function stagedHomeNatureToolByPlannedPath(path: string): StagedHomeNatureTool | undefined {
  return STAGED_HOME_NATURE_TOOL_CATALOG.find((tool) => tool.plannedPath === path);
}

export function stagedHomeNatureToolsDueForReview(
  asOfDate = new Date().toISOString().slice(0, 10),
): StagedHomeNatureTool[] {
  return STAGED_HOME_NATURE_TOOL_CATALOG.filter(
    (tool) => Boolean(tool.reviewBy && tool.reviewBy < asOfDate),
  );
}
