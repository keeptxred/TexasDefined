import { getTexasVsStateEvidence } from "./texas-vs-state-evidence.server";
import { texasVsStateProfile } from "./texas-vs-states";

export function loadTexasVsStateProfileServer(name: string) {
  const profile = texasVsStateProfile(name);
  if (!profile) return null;
  const evidence = getTexasVsStateEvidence(name);
  return evidence ? { ...profile, evidence } : profile;
}
