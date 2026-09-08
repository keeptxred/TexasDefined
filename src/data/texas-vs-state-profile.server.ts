import { TEXAS_VS_STATE_EVIDENCE } from "./texas-vs-state-evidence.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE7 } from "./texas-vs-state-evidence-wave7.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE8 } from "./texas-vs-state-evidence-wave8.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE9 } from "./texas-vs-state-evidence-wave9.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE10 } from "./texas-vs-state-evidence-wave10.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE11 } from "./texas-vs-state-evidence-wave11.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE12 } from "./texas-vs-state-evidence-wave12.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE13 } from "./texas-vs-state-evidence-wave13.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE14 } from "./texas-vs-state-evidence-wave14.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE15 } from "./texas-vs-state-evidence-wave15.server";
import { TEXAS_VS_STATE_EVIDENCE_WAVE16 } from "./texas-vs-state-evidence-wave16.server";
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
      TEXAS_VS_STATE_EVIDENCE_WAVE9[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE10[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE11[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE12[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE13[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE14[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE15[name] ??
      TEXAS_VS_STATE_EVIDENCE_WAVE16[name],
  };
}
