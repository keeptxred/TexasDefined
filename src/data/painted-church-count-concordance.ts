export type PaintedChurchCountConcordanceEntry = {
  id: string;
  label: string;
  countText: string;
  numericCount?: number;
  dateOrEra: string;
  scope: string;
  interpretation: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const paintedChurchCountConcordance: PaintedChurchCountConcordanceEntry[] = [
  {
    id: "schulenburg-six",
    label: "Greater Schulenburg Chamber touring circuit",
    countText: "6 churches",
    numericCount: 6,
    dateOrEra: "Current touring program, checked August 2026",
    scope: "Local visitor circuit centered on Schulenburg",
    interpretation: "Ammannsville, Dubina, High Hill, Moravia, Praha and St. John. This is a tourism circuit, not a statewide historical census.",
    sourceLabel: "Greater Schulenburg Chamber of Commerce — Painted Churches",
    sourceUrl: "https://www.schulenburgchamber.org/painted-churches",
  },
  {
    id: "thc-current-mps",
    label: "Texas Historical Commission current MPS index",
    countText: "14 associated entries",
    numericCount: 14,
    dateOrEra: "Current THC Atlas presentation",
    scope: "Properties currently surfaced under the National Register Multiple Property Submission 'Churches with Decorative Interior Painting'",
    interpretation: "This is the current THC index view of the MPS. It should not be treated as the only historical count of the thematic study.",
    sourceLabel: "Texas Historical Commission — Churches with Decorative Interior Painting MPS",
    sourceUrl: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12",
  },
  {
    id: "historic-thematic-fifteen",
    label: "Original decorative-interior thematic study",
    countText: "15 churches",
    numericCount: 15,
    dateOrEra: "1982–1983 National Register thematic study",
    scope: "The original statewide study of churches with decorative interior painting",
    interpretation: "The historic study included St. Joseph's Church in Galveston. St. Joseph's had already been individually listed in the National Register in 1976, explaining why a historical 15-church study can coexist with a current THC MPS index showing 14 associated entries.",
    sourceLabel: "National Park Service — Churches with Decorative Interior Painting thematic nomination",
    sourceUrl: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13",
  },
  {
    id: "austin-pbs-more-than-twenty",
    label: "Austin PBS statewide interpretation",
    countText: "More than 20",
    dateOrEra: "Austin PBS Painted Churches project",
    scope: "Broader statewide Painted Churches tradition",
    interpretation: "Austin PBS uses a broader cultural and documentary definition than the formal National Register thematic group.",
    sourceLabel: "Austin PBS — Favorite Painted Churches",
    sourceUrl: "https://austinpbs.org/paintedchurches/churches",
  },
  {
    id: "houston-chronicle-32",
    label: "Houston Chronicle travel-history project",
    countText: "32 remain",
    numericCount: 32,
    dateOrEra: "April 27, 2022",
    scope: "Surviving churches described collectively as the Painted Churches of Texas",
    interpretation: "This is a journalistic statewide count using a broader surviving-tradition definition, not an official register total.",
    sourceLabel: "Houston Chronicle — Central Texas' must-see painted churches",
    sourceUrl: "https://www.houstonchronicle.com/projects/2022/painted-churches-texas/",
  },
  {
    id: "anthony-head-up-to-35",
    label: "Anthony Head research estimate",
    countText: "Up to 35 surviving churches",
    dateOrEra: "Research published 2023",
    scope: "Churches with similarly painted elements discovered during book research",
    interpretation: "This is a research estimate rather than a fixed official list. Texas Defined uses it as a reason to keep a transparent statewide candidate ledger rather than declaring the present verified set exhaustive.",
    sourceLabel: "Anthony Head — expert guide based on Painted Churches book research",
    sourceUrl: "https://precisionhomeremodeling.com/2023/07/03/an-experts-guide-to-the-hidden-gem-painted-churches-of-texas/",
  },
];
