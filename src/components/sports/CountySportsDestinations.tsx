import { lazy, Suspense } from 'react';

import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { CountySportsDestinations as CountySportsDestinationsCore } from './CountySportsDestinationsCore';

const CountyRvParks = lazy(() => import('@/components/explore/CountyRvParks'));

export function CountySportsDestinations({ county, venues }: { county: TexasEntityRecord; venues: TexasEntityRecord[] }) {
  return <>
    <Suspense fallback={null}><CountyRvParks county={county} /></Suspense>
    <CountySportsDestinationsCore county={county} venues={venues} />
  </>;
}
