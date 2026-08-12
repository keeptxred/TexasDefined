import { describe, expect, it } from 'vitest';

import { countyProfileDescription, type CountyProfile } from '@/data/county-profile';

function profile(overrides: Partial<CountyProfile>): CountyProfile {
  return {
    majorCommunities: [],
    sourceUrls: [],
    ...overrides,
  };
}

describe('countyProfileDescription', () => {
  it('uses derived density for inland county context', () => {
    const description = countyProfileDescription('Example County', profile({
      countySeat: 'Example, Texas',
      population2020: 100_000,
      landAreaSquareMiles: 1_000,
      populationDensityPerSquareMile: 100,
      waterAreaSquareMiles: 10,
      waterSharePercent: 0.99,
      majorCommunities: ['Example', 'Second Place'],
    }));

    expect(description).toContain('roughly 100 residents per square mile');
    expect(description).toContain('Example, Texas is the verified county seat');
    expect(description).toContain('Second Place');
  });

  it('leads with water composition when it is a material geographic signal', () => {
    const description = countyProfileDescription('Water County', profile({
      countySeat: 'Harbor, Texas',
      population2020: 20_000,
      landAreaSquareMiles: 400,
      waterAreaSquareMiles: 100,
      populationDensityPerSquareMile: 50,
      waterSharePercent: 20,
      majorCommunities: ['Harbor'],
    }));

    expect(description).toContain('water accounting for about 20.0%');
    expect(description).toContain('The 2020 Census counted 20,000 residents');
  });

  it('produces materially different descriptions for different verified county profiles', () => {
    const first = countyProfileDescription('First County', profile({
      countySeat: 'First Seat, Texas',
      population2020: 5_000,
      landAreaSquareMiles: 1_000,
      waterAreaSquareMiles: 5,
      populationDensityPerSquareMile: 5,
      waterSharePercent: 0.5,
      majorCommunities: ['First Seat'],
    }));
    const second = countyProfileDescription('Second County', profile({
      countySeat: 'Second Seat, Texas',
      population2020: 500_000,
      landAreaSquareMiles: 500,
      waterAreaSquareMiles: 125,
      populationDensityPerSquareMile: 1_000,
      waterSharePercent: 20,
      majorCommunities: ['Second Seat', 'Alpha', 'Beta', 'Gamma', 'Delta'],
    }));

    expect(first).not.toBe(second);
    expect(first).toContain('5.00 residents per square mile');
    expect(second).toContain('water accounting for about 20.0%');
    expect(second).toContain('Alpha, Beta, Gamma, Delta');
  });
});
