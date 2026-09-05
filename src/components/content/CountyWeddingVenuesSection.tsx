import { use } from 'react';

import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { getCountyWeddingVenues } from '@/data/wedding-venues.functions';
import { CountyWeddingVenues } from './CountyWeddingVenues';

export function CountyWeddingVenuesSection({ county }: { county: TexasEntityRecord }) {
  const venues = use(getCountyWeddingVenues(county.slug));
  return <CountyWeddingVenues county={county} venues={venues} />;
}
