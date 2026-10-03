export interface TexasVsStateSnapshotRow {
  metric: string;
  texas: string;
  state: string;
  difference: string;
  context: string;
}

export interface TexasVsStateSnapshot {
  period: string;
  rows: TexasVsStateSnapshotRow[];
  sources: Array<{ label: string; url: string }>;
}

/**
 * Structured, same-metric state comparisons for the Texas-vs-state pages.
 * Add a state only when both sides can be supported by comparable public data.
 */
export const TEXAS_VS_STATE_SNAPSHOTS: Partial<Record<string, TexasVsStateSnapshot>> = {
  "New York": {
    period: "U.S. Census Bureau QuickFacts, 2020–2024 unless noted; tax treatment current for 2026.",
    rows: [
      {
        metric: "Median owner-occupied home value",
        texas: "$283,800",
        state: "$423,800",
        difference: "New York is about 49% higher statewide.",
        context: "Statewide owner-occupied housing baseline; local metro differences can be much larger.",
      },
      {
        metric: "Median gross rent",
        texas: "$1,403",
        state: "$1,621",
        difference: "New York is about 16% higher statewide.",
        context: "Statewide median gross rent, including contract rent plus estimated utilities when applicable.",
      },
      {
        metric: "Median household income",
        texas: "$78,476",
        state: "$85,974",
        difference: "New York is about 10% higher statewide.",
        context: "2020–2024 estimate in 2024 dollars; compare occupation-specific pay before making a move decision.",
      },
      {
        metric: "Homeownership rate",
        texas: "62.6%",
        state: "54.3%",
        difference: "Texas is 8.3 percentage points higher.",
        context: "Owner-occupied housing unit rate, 2020–2024.",
      },
      {
        metric: "Mean commute",
        texas: "26.7 min",
        state: "32.6 min",
        difference: "New York's statewide mean is 5.9 minutes longer.",
        context: "Mean travel time to work for workers age 16+, 2020–2024.",
      },
      {
        metric: "Population density",
        texas: "111.6 / sq. mi.",
        state: "428.7 / sq. mi.",
        difference: "New York is about 3.8× as dense statewide.",
        context: "2020 Census population per square mile; statewide density does not describe every metro or rural area.",
      },
      {
        metric: "State personal income tax",
        texas: "None",
        state: "Progressive; 10.9% top marginal rate",
        difference: "Texas has no personal state income tax; New York does.",
        context: "New York's 2026 schedule includes lower rates at lower taxable-income levels; local New York City and Yonkers taxes can also matter.",
      },
    ],
    sources: [
      {
        label: "U.S. Census Bureau QuickFacts — Texas",
        url: "https://www.census.gov/quickfacts/fact/table/TX/PST045225",
      },
      {
        label: "U.S. Census Bureau QuickFacts — New York",
        url: "https://www.census.gov/quickfacts/fact/table/NY/PST045225",
      },
      {
        label: "Office of the Texas Governor — Texas tax environment",
        url: "https://gov.texas.gov/initiatives/more-prosperous-texas",
      },
      {
        label: "New York State Department of Taxation and Finance — 2026 personal income tax",
        url: "https://www.tax.ny.gov/data/stats/ter/fiscal-year27/personal-income-tax.htm",
      },
    ],
  },
};
