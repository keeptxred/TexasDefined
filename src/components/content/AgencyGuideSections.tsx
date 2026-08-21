import { lazy, Suspense } from 'react';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

const LazyAgencyGuideSections = lazy(() => import('./AgencyGuideSectionsImpl').then((module) => ({ default: module.AgencyGuideSectionsImpl })));

export function AgencyGuideSections({ entity }: { entity: TexasEntityRecord }) {
  if (entity.kind !== 'agency') return null;
  return <Suspense fallback={null}><LazyAgencyGuideSections entity={entity} /></Suspense>;
}
