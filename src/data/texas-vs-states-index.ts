export const TEXAS_VS_STATE_GROUPS = [
  { region: "Northeast", states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont", "New Jersey", "New York", "Pennsylvania"] },
  { region: "Midwest", states: ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"] },
  { region: "South", states: ["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "West Virginia", "Alabama", "Kentucky", "Mississippi", "Tennessee", "Arkansas", "Louisiana", "Oklahoma"] },
  { region: "West", states: ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", "Alaska", "California", "Hawaii", "Oregon", "Washington"] },
] as const;

export const TEXAS_VS_STATES = TEXAS_VS_STATE_GROUPS.flatMap((group) => group.states);
// A fixed first-six list strands the states at each group's tail with no peer
// inlinks. Rotate the same six-link budget around the regional ring instead.
export function texasVsRelatedStates(name: string): string[] {
  const group = TEXAS_VS_STATE_GROUPS.find((entry) => entry.states.some((state) => state === name));
  if (!group) return [];
  const states: readonly string[] = group.states;
  const origin = states.indexOf(name);
  return Array.from({ length: Math.min(6, states.length - 1) }, (_, offset) => states[(origin + offset + 1) % states.length]);
}

export const texasVsStateSlug = (value: string) => value.toLowerCase().replaceAll(" ", "-");
export const texasVsCanonicalPath = (state: string) => {
  const slug = texasVsStateSlug(state);
  return slug === "california" || slug === "florida" ? `/article/texas-vs-${slug}-differences` : `/texas-vs/${slug}`;
};
export const texasVsStateName = (slug: string) => TEXAS_VS_STATES.find((state) => texasVsStateSlug(state) === slug) ?? null;

export type TexasVsStateSourceTopic = "tax" | "housing" | "jobs" | "risk" | "transport";

export type TexasVsStateSource = {
  label: string;
  url: string;
  topic: TexasVsStateSourceTopic;
};

export type TexasVsStateEvidence = {
  reviewedAt: string;
  taxLens: string;
  housingLens: string;
  jobsLens: string;
  riskLens: string;
  transportationLens: string;
  metroLens: string;
  sources: TexasVsStateSource[];
};

export type TexasVsStateProfile = {
  comparisonFocus: string;
  placeLens: string;
  climateLens: string;
  evidence?: TexasVsStateEvidence;
};
