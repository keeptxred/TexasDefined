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
  '/learn/property-taxes': {
    title: 'Texas property-tax explainer sources',
    sources: [
      { name: 'Texas Comptroller — Property Tax Assistance', url: 'https://comptroller.texas.gov/taxes/property-tax/' },
      { name: 'Texas Comptroller — Property Tax System Basics', url: 'https://comptroller.texas.gov/taxes/property-tax/basics.php' },
    ],
    methodology: 'This explainer separates appraisal, exemptions and protests from rate adoption and collection so each decision is attributed to the responsible office. General statewide guidance is not substituted for a property-specific notice or record.',
    lastVerified: 'Guide reviewed August 6, 2026. Local notices and account-specific dates control when they differ from general statewide guidance.',
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
