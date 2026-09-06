import { TEXAS_VS_STATE_EVIDENCE } from "./texas-vs-state-evidence.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE7 } from "./texas-vs-state-evidence-wave7.server";
import { texasVsStateProfile } from "./texas-vs-states";

export function loadTexasVsStateProfileServer(name: string) {
  const profile = texasVsStateProfile(name);
  if (!profile) return null;

  return {
    ...profile,
    evidence: TEXAS_VS_STATE_EVIDENCE[name] ?? TEXAS_VS_STATE_EVIDENCE_WAVE7[name],
  };
}
