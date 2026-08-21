export type StagedHomeNatureTool = {
  id: string;
  title: string;
  domain: 'hurricanes' | 'pools' | 'home';
  publicationState: 'staged';
  plannedPath: string;
  description: string;
  sourceIds: string[];
};

const GALLONS_PER_CUBIC_FOOT = 7.48052;

const finiteNonNegative = (value: number, field: string) => {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${field} must be a finite non-negative number.`);
  return value;
};

const finitePositive = (value: number, field: string) => {
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${field} must be a finite positive number.`);
  return value;
};

export type EmergencyWaterInput = {
  people: number;
  days?: number;
  gallonsPerPersonPerDay?: number;
  additionalGallons?: number;
};

export type EmergencyWaterEstimate = {
  householdGallons: number;
  additionalGallons: number;
  totalGallons: number;
  days: number;
  gallonsPerPersonPerDay: number;
};

/**
 * Planning-only water estimator. The default follows Ready.gov's basic-kit
 * guidance of one gallon per person per day for at least three days. Callers
 * can increase days, per-person allowance, or additional gallons for pets,
 * medical needs, heat, or other household circumstances.
 */
export function estimateEmergencyWaterGallons(input: EmergencyWaterInput): EmergencyWaterEstimate {
  const people = finitePositive(input.people, 'people');
  const days = finitePositive(input.days ?? 3, 'days');
  const gallonsPerPersonPerDay = finitePositive(input.gallonsPerPersonPerDay ?? 1, 'gallonsPerPersonPerDay');
  const additionalGallons = finiteNonNegative(input.additionalGallons ?? 0, 'additionalGallons');
  const householdGallons = people * days * gallonsPerPersonPerDay;
  return {
    householdGallons,
    additionalGallons,
    totalGallons: householdGallons + additionalGallons,
    days,
    gallonsPerPersonPerDay,
  };
}

export type RectangularPoolVolumeInput = {
  lengthFeet: number;
  widthFeet: number;
  shallowDepthFeet: number;
  deepDepthFeet: number;
};

export type PoolVolumeEstimate = {
  surfaceAreaSquareFeet: number;
  averageDepthFeet: number;
  cubicFeet: number;
  gallons: number;
};

/**
 * Estimates a rectangular/sloped pool using average depth. Irregular shapes,
 * shelves, spas, benches, radii, and varying widths require shape-specific
 * adjustments before this estimate is used for chemical dosing.
 */
export function estimateRectangularPoolVolumeGallons(input: RectangularPoolVolumeInput): PoolVolumeEstimate {
  const lengthFeet = finitePositive(input.lengthFeet, 'lengthFeet');
  const widthFeet = finitePositive(input.widthFeet, 'widthFeet');
  const shallowDepthFeet = finiteNonNegative(input.shallowDepthFeet, 'shallowDepthFeet');
  const deepDepthFeet = finitePositive(input.deepDepthFeet, 'deepDepthFeet');
  if (deepDepthFeet < shallowDepthFeet) throw new Error('deepDepthFeet must be greater than or equal to shallowDepthFeet.');
  const averageDepthFeet = (shallowDepthFeet + deepDepthFeet) / 2;
  const surfaceAreaSquareFeet = lengthFeet * widthFeet;
  const cubicFeet = surfaceAreaSquareFeet * averageDepthFeet;
  return {
    surfaceAreaSquareFeet,
    averageDepthFeet,
    cubicFeet,
    gallons: cubicFeet * GALLONS_PER_CUBIC_FOOT,
  };
}

export type PoolWaterLossInput = {
  surfaceAreaSquareFeet: number;
  waterLossInches: number;
};

export type PoolWaterLossEstimate = {
  cubicFeetLost: number;
  gallonsLost: number;
};

/**
 * Converts a measured drop in pool water level into gallons. This intentionally
 * does not predict evaporation from weather because wind, humidity, water
 * temperature, air temperature, covers, splash-out, and leaks all matter.
 */
export function estimatePoolWaterLossGallons(input: PoolWaterLossInput): PoolWaterLossEstimate {
  const surfaceAreaSquareFeet = finitePositive(input.surfaceAreaSquareFeet, 'surfaceAreaSquareFeet');
  const waterLossInches = finiteNonNegative(input.waterLossInches, 'waterLossInches');
  const cubicFeetLost = surfaceAreaSquareFeet * (waterLossInches / 12);
  return {
    cubicFeetLost,
    gallonsLost: cubicFeetLost * GALLONS_PER_CUBIC_FOOT,
  };
}

export type PreparednessChecklistItem = {
  id: string;
  label: string;
  sourceIds: string[];
};

export type PreparednessChecklistStage = {
  hoursBefore: 72 | 48 | 24;
  items: PreparednessChecklistItem[];
};

/**
 * Editorial checklist staging data only. Timing is an organizational aid, not
 * a substitute for evacuation orders, watches/warnings, or local instructions.
 */
export const TEXAS_HURRICANE_PREP_CHECKLIST: PreparednessChecklistStage[] = [
  {
    hoursBefore: 72,
    items: [
      { id: 'review-local-plan', label: 'Review local emergency information, evacuation routes, and household communication plans.', sourceIds: ['tdem-emergency', 'ready-gov'] },
      { id: 'build-supply-kit', label: 'Check emergency food, water, medications, batteries, lighting, radios, chargers, first-aid supplies, and pet needs.', sourceIds: ['ready-gov', 'tdem-emergency'] },
      { id: 'document-property', label: 'Update household/property photos and keep important documents accessible and protected.', sourceIds: ['ready-gov'] },
    ],
  },
  {
    hoursBefore: 48,
    items: [
      { id: 'secure-exterior', label: 'Bring in or secure loose outdoor items and continue following official storm updates.', sourceIds: ['nws-hurricanes', 'tdem-emergency'] },
      { id: 'fuel-charge', label: 'Charge communication devices and prepare transportation according to the household emergency plan.', sourceIds: ['ready-gov', 'tdem-emergency'] },
      { id: 'cold-storage-plan', label: 'Prepare for possible power interruption and minimize unnecessary refrigerator/freezer opening if power is lost.', sourceIds: ['ready-gov'] },
    ],
  },
  {
    hoursBefore: 24,
    items: [
      { id: 'follow-orders', label: 'Follow evacuation orders and other instructions from local emergency officials without waiting for this checklist.', sourceIds: ['tdem-emergency', 'nws-hurricanes'] },
      { id: 'final-kit', label: 'Place emergency kits, medications, documents, pet supplies, and communication gear where they can leave with you.', sourceIds: ['ready-gov'] },
      { id: 'alerts', label: 'Keep official alerts available and monitor local weather/emergency information.', sourceIds: ['nws-hurricanes', 'tdem-emergency'] },
    ],
  },
];

export const TEXAS_FREEZE_PREP_CHECKLIST: PreparednessChecklistItem[] = [
  { id: 'official-forecast', label: 'Monitor official local forecasts and warnings before freezing weather arrives.', sourceIds: ['noaa'] },
  { id: 'people-pets', label: 'Plan for people, pets, medications, transportation, and possible power interruption.', sourceIds: ['ready-gov', 'tdem-emergency'] },
  { id: 'home-specific', label: 'Follow manufacturer, utility, plumber, pool-equipment, and local guidance for protecting systems specific to the property.', sourceIds: ['tdem-emergency'] },
];

export const STAGED_HOME_NATURE_TOOLS: StagedHomeNatureTool[] = [
  {
    id: 'texas-emergency-water-planner',
    title: 'Texas Emergency Water Planner',
    domain: 'hurricanes',
    publicationState: 'staged',
    plannedPath: '/texas-emergency-water-planner',
    description: 'Estimate baseline household emergency water and add extra capacity for household-specific needs.',
    sourceIds: ['ready-gov', 'tdem-emergency'],
  },
  {
    id: 'texas-pool-volume-calculator',
    title: 'Texas Pool Volume Calculator',
    domain: 'pools',
    publicationState: 'staged',
    plannedPath: '/texas-pool-volume-calculator',
    description: 'Estimate rectangular pool volume from length, width, and average depth.',
    sourceIds: [],
  },
  {
    id: 'texas-pool-water-loss-calculator',
    title: 'Texas Pool Water Loss Calculator',
    domain: 'pools',
    publicationState: 'staged',
    plannedPath: '/texas-pool-water-loss-calculator',
    description: 'Convert a measured water-level drop into estimated gallons lost without pretending to diagnose evaporation or leaks.',
    sourceIds: [],
  },
  {
    id: 'texas-hurricane-72-48-24-checklist',
    title: 'Texas Hurricane 72/48/24 Checklist',
    domain: 'hurricanes',
    publicationState: 'staged',
    plannedPath: '/texas-hurricane-72-48-24-checklist',
    description: 'A staged household organization checklist that defers to official warnings, evacuation orders, and local instructions.',
    sourceIds: ['ready-gov', 'tdem-emergency', 'nws-hurricanes'],
  },
  {
    id: 'texas-freeze-prep-checklist',
    title: 'Texas Freeze Prep Checklist',
    domain: 'home',
    publicationState: 'staged',
    plannedPath: '/texas-freeze-prep-checklist',
    description: 'A staged freeze-planning checklist that avoids universal equipment instructions and points users to property-specific guidance.',
    sourceIds: ['ready-gov', 'tdem-emergency', 'noaa'],
  },
];
