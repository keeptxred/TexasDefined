import { useLocation } from '@tanstack/react-router';

import { CitationTrustPanel, type CitationSource } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';

type TrustConfig = {
  title: string;
  sources: CitationSource[];
  methodology: string;
  lastVerified: string;
};

const TRUST_BY_PATH: Record<string, TrustConfig> = {
  '/citation-guide': {
    title: 'Citation policy provenance',
    sources: [
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'The citation guide explains how TexasDefined reference pages relate to their underlying official and public-data sources. It is a policy layer rather than an independent factual dataset.',
    lastVerified: 'Citation policy and manifest relationship reviewed August 11, 2026.',
  },
  '/texas-data': {
    title: 'Texas data catalog sources',
    sources: [
      { name: 'U.S. Census Bureau', url: 'https://www.census.gov/' },
      { name: 'Texas State Library and Archives Commission', url: 'https://www.tsl.texas.gov/ref/abouttx/' },
    ],
    methodology: 'The Texas Data hub is a catalog across multiple public datasets. Each dataset page controls its own source list, year, methodology and freshness; the hub does not create a synthetic catalog-wide verification date.',
    lastVerified: 'Catalog source hierarchy reviewed August 11, 2026. Dataset-specific source and modification dates control individual figures.',
  },
  '/explore/top-attractions': {
    title: 'Top 25 attraction research and verification',
    sources: [
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'The Top 25 collection uses each attraction’s linked official visitor source for current operational guidance and keeps those facts separate from TexasDefined editorial assessments of visit length, physical effort, weather exposure, advance-planning needs and trip value. Every child guide carries its own review date, sources and review log.',
    lastVerified: 'Top 25 authority framework and collection coverage reviewed August 17, 2026. Current-day hours, prices, closures and reservations remain controlled by each attraction’s linked official source.',
  },
  '/learn/property-taxes': {
    title: 'Texas property-tax explainer sources',
    sources: [
      { name: 'Texas Comptroller — Property Tax Assistance', url: 'https://comptroller.texas.gov/taxes/property-tax/' },
      { name: 'Texas Comptroller — Property Tax System Basics', url: 'https://comptroller.texas.gov/taxes/property-tax/basics.php' },
    ],
    methodology: 'This explainer separates appraisal, exemptions and protests from rate adoption and collection so each decision is attributed to the responsible office. General statewide guidance is not substituted for a property-specific notice or record.',
    lastVerified: 'Guide reviewed August 6, 2026. Local notices and account-specific dates control when they differ from general statewide guidance.',
  },
  '/find-my-dmv': {
    title: 'Texas vehicle and licensing sources',
    sources: [
      { name: 'Texas Department of Motor Vehicles — New to Texas', url: 'https://www.txdmv.gov/motorists/new-to-texas' },
      { name: 'Texas Department of Public Safety — Driver License', url: 'https://www.dps.texas.gov/section/driver-license' },
    ],
    methodology: 'The guide keeps vehicle registration and driver licensing separate because they are handled by different public offices. Current local-office details are not inferred and should be checked on the linked official pages.',
    lastVerified: 'Official-source routing reviewed August 11, 2026. Current office details and requirements should be rechecked with the responsible agency before a visit.',
  },
  '/find-my-school-district': {
    title: 'Texas school lookup sources',
    sources: [
      { name: 'Texas Education Agency — Texas Schools', url: 'https://tea.texas.gov/texas-schools' },
      { name: 'TXschools.gov', url: 'https://txschools.gov/' },
    ],
    methodology: 'The guide treats city, ZIP code, district and attendance-zone boundaries as separate concepts. A school assignment is confirmed through the responsible district rather than inferred from a nearby school name.',
    lastVerified: 'Official-source routing reviewed August 11, 2026. District boundaries and campus assignments should be confirmed with the responsible district for the relevant property.',
  },
};

export function CitationCollectionTrustRouter() {
  const pathname = useLocation({ select: (location) => location.pathname.replace(/\/+$/, '') || '/' });
  const config = TRUST_BY_PATH[pathname];
  if (!config) return null;

  return (
    <Container className="mt-12">
      <CitationTrustPanel
        sources={config.sources}
        methodology={config.methodology}
        lastVerified={config.lastVerified}
        title={config.title}
      />
    </Container>
  );
}

export default CitationCollectionTrustRouter;
