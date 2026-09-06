import { TEXAS_VS_STATE_EVIDENCE } from "./texas-vs-state-evidence.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE7 } from "./texas-vs-state-evidence-wave7.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE8 } from "./texas-vs-state-evidence-wave8.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE9 } from "./texas-vs-state-evidence-wave9.server";
import { texasVsStateProfile } from "./texas-vs-states";

export function loadTexasVsStateProfileServer(name: string) {
  const profile = texasVsStateProfile(name);
  if (!profile) return null;

  return {
    ...profile,
    evidence:
      TEXAS_VS_STATE_EVIDENCE[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE7[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE8[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE9[name],
  };
}
