import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

import { HighSchoolFootballLookup } from './HighSchoolFootballLookup';

export function CountyHighSchoolFootball({ county }: { county: TexasEntityRecord }) {
  const countyName = / County$/i.test(county.name) ? county.name : `${county.name} County`;
  return <HighSchoolFootballLookup
    countyName={countyName}
    compact
    showSearch={false}
    showAllByDefault
    heading={`High school football in ${countyName}`}
    intro={`See current UIL football programs whose TEA school-directory records are in ${countyName}. Use the statewide finder to compare a specific high school or ISD before choosing where to live.`}
  />;
}
