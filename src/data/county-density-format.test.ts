import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { formatDensity } from './county-profile';

describe('county density formatting', () => {
  it('formats dense, moderate, and sparse counties consistently', () => {
    expect(formatDensity(3100.42)).toBe('3,100');
    expect(formatDensity(42.38)).toBe('42.4');
    expect(formatDensity(4.238)).toBe('4.24');
  });

  it('keeps CountyGuideSections wired to the exported formatter', () => {
    const source = fs.readFileSync(path.resolve(process.cwd(), 'src/components/content/CountyGuideSections.tsx'), 'utf8');
    expect(source).toContain("import { formatDensity, type CountyProfile } from '@/data/county-profile';");
    expect(source).toContain('formatDensity(profile.populationDensityPerSquareMile)');
  });
});
