import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const route = readFileSync(new URL('../routes/find-my-dmv.tsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../routes/find-my-dmv.lazy.tsx', import.meta.url), 'utf8');

describe('Find My DMV migration search intent', () => {
  it('keeps the migrated URL aligned with the task users and Google already know', () => {
    expect(route).toContain("canonicalPath = '/find-my-dmv'");
    expect(route).toContain("Find My DMV in Texas: Vehicle Registration & County Tax Offices");
    expect(page).toContain('{pageTitle}');
    expect(route).not.toContain('Getting Your Car Settled in Texas');
  });

  it('routes Texans to the correct official office for the transaction', () => {
    expect(page).toContain('https://www.txdmv.gov/find-your-local-tax-office-dmv');
    expect(page).toContain('https://www.txdmv.gov/regional-service-centers');
    expect(page).toContain('https://www.dps.texas.gov/apps/Rolodex/index.asp');
    expect(page).toContain('to="/texas-vehicle-registration"');
  });
});
