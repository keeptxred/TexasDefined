import { lazy, Suspense } from 'react';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { LocalGovernmentProfile } from '@/data/local-government-profile';

const LazyLocalOfficeGuideSections = lazy(() => import('./LocalOfficeGuideSectionsImpl').then((module) => ({ default: module.LocalOfficeGuideSectionsImpl })));

export function LocalOfficeGuideSections({ entity, profile }: { entity: TexasEntityRecord; profile: LocalGovernmentProfile | null }) {
  if (!entity.countySlug || !['appraisal-district', 'tax-office'].includes(entity.kind)) return null;
  return <Suspense fallback={null}><LazyLocalOfficeGuideSections entity={entity} profile={profile} /></Suspense>;
}
