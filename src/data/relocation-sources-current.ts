import {
  RELOCATION_SOURCES as BASE_RELOCATION_SOURCES,
  type RelocationSource,
} from "@/data/relocation-authority";

export const RELOCATION_SOURCE_VERIFIED_CURRENT = "August 27, 2026";

export const CURRENT_RELOCATION_SOURCES = {
  ...BASE_RELOCATION_SOURCES,
  censusPopulation: {
    name: "U.S. Census Bureau — Vintage 2025 Population Estimates",
    url: "https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html",
    purpose: "Current consistent Texas population estimates and components of change, including domestic migration, international migration and natural change.",
    freshness: "Vintage 2025 is the most recent completed vintage; released January 27, 2026",
  },
  blsMetro: {
    ...BASE_RELOCATION_SOURCES.blsMetro,
    freshness: "June 2026 preliminary release; July 2026 metro release scheduled September 2, 2026",
  },
} satisfies Record<keyof typeof BASE_RELOCATION_SOURCES, RelocationSource>;

export type RelocationFreshnessContract = {
  sourceKey: keyof typeof CURRENT_RELOCATION_SOURCES;
  dataVintage: string;
  checkedAt: string;
  reviewAfter?: string;
  note: string;
};

export const RELOCATION_FRESHNESS_CONTRACTS: RelocationFreshnessContract[] = [
  {
    sourceKey: "censusPopulation",
    dataVintage: "Vintage 2025",
    checkedAt: "2026-08-27",
    note: "Census states Vintage 2025 is the most recent completed, internally consistent vintage and older vintages are superseded.",
  },
  {
    sourceKey: "censusMigration",
    dataVintage: "2024 ACS one-year state-to-state flows",
    checkedAt: "2026-08-27",
    note: "State-to-state flow data are a separate ACS product from annual population-estimate components.",
  },
  {
    sourceKey: "blsMetro",
    dataVintage: "June 2026 preliminary",
    checkedAt: "2026-08-27",
    reviewAfter: "2026-09-03",
    note: "BLS schedules the July 2026 metropolitan-area release for September 2, 2026; recheck after that release before another production deployment.",
  },
  {
    sourceKey: "tdiInsurance",
    dataVintage: "2025 preliminary homeowners market",
    checkedAt: "2026-08-27",
    note: "TDI statewide and county homeowners data remain preliminary for 2025 and should be relabeled if TDI finalizes or revises the series.",
  },
  {
    sourceKey: "txdotTraffic",
    dataVintage: "Current statewide monitoring program",
    checkedAt: "2026-08-27",
    note: "Traffic-count coverage describes the monitoring system, not current congestion on a candidate route.",
  },
];
