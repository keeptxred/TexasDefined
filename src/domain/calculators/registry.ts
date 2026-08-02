/**
 * Calculator contracts only — no math is implemented in Phase 1.
 *
 * Each entry declares a typed input/output shape so the shared package can
 * later host the implementation and both brands consume the same contract.
 */

export interface CalculatorField {
  name: string;
  label: string;
  kind: "currency" | "percent" | "number" | "text" | "select";
  helper?: string;
  options?: { label: string; value: string }[];
}

export interface CalculatorContract<TInput = unknown, TOutput = unknown> {
  id: string;
  name: string;
  description: string;
  inputs: CalculatorField[];
  outputs: CalculatorField[];
  /** Implemented in a later phase, in the shared package. */
  compute?: (input: TInput) => TOutput;
}

export interface PropertyTaxInput {
  assessedValueCents: number;
  countyRatePercent: number;
  homesteadExemptionCents: number;
}

export interface PropertyTaxOutput {
  annualTaxCents: number;
  monthlyEscrowCents: number;
  effectiveRatePercent: number;
}

export interface CostOfLivingInput {
  currentCity: string;
  targetCity: string;
  householdIncomeCents: number;
}

export interface CostOfLivingOutput {
  indexDelta: number;
  equivalentIncomeCents: number;
  categoryDeltas: { category: string; deltaPercent: number }[];
}

export interface RoadTripInput {
  legMiles: number[];
  milesPerGallon: number;
  fuelPricePerGallonCents: number;
  averageSpeedMph: number;
}

export interface RoadTripOutput {
  totalMiles: number;
  fuelCostCents: number;
  drivingMinutes: number;
}

export interface WaterBudgetInput {
  squareFeet: number;
  month: number;
  plantFactor: number;
}

export interface WaterBudgetOutput {
  gallonsPerWeek: number;
  minutesPerZone: number;
}

const currency = (name: string, label: string, helper?: string): CalculatorField => ({
  name,
  label,
  kind: "currency",
  ...(helper ? { helper } : {}),
});

export const propertyTaxCalculator: CalculatorContract<PropertyTaxInput, PropertyTaxOutput> = {
  id: "property-tax",
  name: "Texas Property Tax Estimator",
  description:
    "Estimates an annual property tax bill from assessed value, the combined county rate and a homestead exemption.",
  inputs: [
    currency("assessedValueCents", "Assessed value"),
    { name: "countyRatePercent", label: "Combined tax rate", kind: "percent" },
    currency("homesteadExemptionCents", "Homestead exemption"),
  ],
  outputs: [
    currency("annualTaxCents", "Estimated annual tax"),
    currency("monthlyEscrowCents", "Monthly escrow"),
    { name: "effectiveRatePercent", label: "Effective rate", kind: "percent" },
  ],
};

export const costOfLivingCalculator: CalculatorContract<CostOfLivingInput, CostOfLivingOutput> = {
  id: "cost-of-living",
  name: "Cost of Living Comparison",
  description: "Compares a current city with a Texas metro across housing, utilities and taxes.",
  inputs: [
    { name: "currentCity", label: "Current city", kind: "text" },
    { name: "targetCity", label: "Texas city", kind: "text" },
    currency("householdIncomeCents", "Household income"),
  ],
  outputs: [
    { name: "indexDelta", label: "Cost index change", kind: "percent" },
    currency("equivalentIncomeCents", "Equivalent income"),
  ],
};

export const roadTripCalculator: CalculatorContract<RoadTripInput, RoadTripOutput> = {
  id: "road-trip",
  name: "Road Trip Fuel & Time Planner",
  description: "Totals distance, fuel cost and realistic driving time across a multi-leg route.",
  inputs: [
    { name: "legMiles", label: "Legs (miles)", kind: "number" },
    { name: "milesPerGallon", label: "Vehicle MPG", kind: "number" },
    currency("fuelPricePerGallonCents", "Fuel price per gallon"),
    { name: "averageSpeedMph", label: "Average speed", kind: "number" },
  ],
  outputs: [
    { name: "totalMiles", label: "Total miles", kind: "number" },
    currency("fuelCostCents", "Fuel cost"),
    { name: "drivingMinutes", label: "Driving time", kind: "number" },
  ],
};

export const waterBudgetCalculator: CalculatorContract<WaterBudgetInput, WaterBudgetOutput> = {
  id: "water-budget",
  name: "Native Plant Water Budget",
  description: "Estimates supplemental irrigation for a Texas landscape by month and plant factor.",
  inputs: [
    { name: "squareFeet", label: "Planted area", kind: "number" },
    { name: "month", label: "Month", kind: "number" },
    { name: "plantFactor", label: "Plant factor", kind: "number" },
  ],
  outputs: [
    { name: "gallonsPerWeek", label: "Gallons per week", kind: "number" },
    { name: "minutesPerZone", label: "Minutes per zone", kind: "number" },
  ],
};

export const calculatorRegistry: Record<string, CalculatorContract> = {
  [propertyTaxCalculator.id]: propertyTaxCalculator as CalculatorContract,
  [costOfLivingCalculator.id]: costOfLivingCalculator as CalculatorContract,
  [roadTripCalculator.id]: roadTripCalculator as CalculatorContract,
  [waterBudgetCalculator.id]: waterBudgetCalculator as CalculatorContract,
};

export function getCalculator(id: string | undefined): CalculatorContract | null {
  if (!id) return null;
  return calculatorRegistry[id] ?? null;
}
