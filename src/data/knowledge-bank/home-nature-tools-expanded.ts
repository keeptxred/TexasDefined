import {
  estimateEmergencyWaterGallons,
  estimatePoolWaterLossGallons,
  type EmergencyWaterInput,
  type StagedHomeNatureTool,
} from './home-nature-tools';

export type HurricaneSupplyBaselineInput = EmergencyWaterInput;

export type HurricaneSupplyBaselineEstimate = {
  people: number;
  days: number;
  waterGallons: number;
  foodPersonDays: number;
};

/**
 * Converts household size and planning horizon into a basic emergency-supply
 * planning baseline. `foodPersonDays` is intentionally not converted into
 * meals, calories, or packages because dietary and medical needs vary.
 */
export function estimateHurricaneSupplyBaseline(
  input: HurricaneSupplyBaselineInput,
): HurricaneSupplyBaselineEstimate {
  const water = estimateEmergencyWaterGallons(input);
  return {
    people: input.people,
    days: water.days,
    waterGallons: water.totalGallons,
    foodPersonDays: input.people * water.days,
  };
}

export type PoolOpeningRefillInput = {
  surfaceAreaSquareFeet: number;
  refillInches: number;
};

/**
 * Estimates only the water required to raise pool level by a measured number
 * of inches. It deliberately does not calculate chemical doses; opening water
 * chemistry should be based on current test results and product/equipment
 * instructions rather than a generic statewide formula.
 */
export function estimatePoolOpeningRefillGallons(input: PoolOpeningRefillInput): number {
  return estimatePoolWaterLossGallons({
    surfaceAreaSquareFeet: input.surfaceAreaSquareFeet,
    waterLossInches: input.refillInches,
  }).gallonsLost;
}

export const STAGED_HOME_NATURE_TOOL_EXTENSIONS: StagedHomeNatureTool[] = [
  {
    id: 'texas-hurricane-supply-calculator',
    title: 'Texas Hurricane Supply Calculator',
    domain: 'hurricanes',
    publicationState: 'staged',
    plannedPath: '/texas-hurricane-supply-calculator',
    description: 'Turn household size and planning horizon into a water baseline and food person-days without inventing one-size-fits-all meal quantities.',
    sourceIds: ['ready-gov', 'tdem-emergency'],
    evidenceUrls: ['https://www.ready.gov/sites/default/files/documents/files/checklist3.pdf', 'https://tdem.texas.gov/'],
    reviewBy: '2027-08-01',
  },
  {
    id: 'texas-pool-opening-refill-calculator',
    title: 'Texas Pool Opening Refill Calculator',
    domain: 'pools',
    publicationState: 'staged',
    plannedPath: '/texas-pool-opening-refill-calculator',
    description: 'Estimate gallons needed to raise pool water by a measured number of inches while leaving chemical dosing to current water-test results.',
    sourceIds: [],
  },
];
