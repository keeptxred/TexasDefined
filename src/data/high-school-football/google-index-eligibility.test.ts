import { describe, it, expect } from 'vitest';
import { applyGoogleOnlyNoindex } from '@/lib/google-only-indexing';
import { isFootballTeamGoogleIndexReady, isFootballDistrictGoogleIndexReady } from './google-index-eligibility';
import manifest from './google-index-eligibility.generated.json';
describe('Google-only football index eligibility',()=>{
 it('protects verified and historically clicked pages',()=>{expect(isFootballTeamGoogleIndexReady('abbott')).toBe(true);expect(isFootballTeamGoogleIndexReady('jarrell')).toBe(true);expect(isFootballDistrictGoogleIndexReady('6a-district-7')).toBe(true);});
 it('noindexes only Googlebot for staged school pages',()=>{expect(isFootballTeamGoogleIndexReady('colorado-city-colorado')).toBe(false); const input=[{name:'robots',content:'index, follow'},{name:'googlebot',content:'index, follow'}];expect(applyGoogleOnlyNoindex(input,false)).toEqual([{name:'robots',content:'index, follow'},{name:'googlebot',content:'noindex, follow'}]);expect(applyGoogleOnlyNoindex(input,true)).toBe(input);});
 it('has bounded index exclusions',()=>{expect(manifest.teamIndexableSlugs.length).toBeGreaterThanOrEqual(900);expect(manifest.districtIndexableSlugs.length).toBeGreaterThanOrEqual(130);});
});
