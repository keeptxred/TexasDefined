export const TEXAS_VS_STATE_GROUPS = [
  { region: "Northeast", states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont", "New Jersey", "New York", "Pennsylvania"] },
  { region: "Midwest", states: ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"] },
  { region: "South", states: ["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "West Virginia", "Alabama", "Kentucky", "Mississippi", "Tennessee", "Arkansas", "Louisiana", "Oklahoma"] },
  { region: "West", states: ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", "Alaska", "California", "Hawaii", "Oregon", "Washington"] },
] as const;

export const TEXAS_VS_STATES = TEXAS_VS_STATE_GROUPS.flatMap((group) => group.states);
export const texasVsStateSlug = (value: string) => value.toLowerCase().replaceAll(" ", "-");
export const texasVsStateName = (slug: string) => TEXAS_VS_STATES.find((state) => texasVsStateSlug(state) === slug) ?? null;

const TEXAS_VS_STATE_CANONICAL_PATH_OVERRIDES: Record<string, string> = {
  California: "/article/texas-vs-california-differences",
  Florida: "/article/texas-vs-florida-differences",
};

export const texasVsStateHref = (state: string) => TEXAS_VS_STATE_CANONICAL_PATH_OVERRIDES[state] ?? `/texas-vs/${texasVsStateSlug(state)}`;

export type TexasVsStateProfile = {
  comparisonFocus: string;
  placeLens: string;
  climateLens: string;
};
