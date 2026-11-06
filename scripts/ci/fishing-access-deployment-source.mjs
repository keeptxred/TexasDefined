/**
 * Protected release ancestry checks for source-specific fishing access QA.
 * A superseded deployment may be replaced by a successful descendant on main.
 * Never accept unrelated commits, queued jobs or non-protected statuses.
 */
export function compareIncludesSource(compare) {
  return compare?.status === "ahead" || compare?.status === "identical";
}
export function protectedProductionState(commitStatus) {
  return commitStatus?.statuses?.find(s => s.context === "texasdefined-production")?.state ?? "missing";
}
