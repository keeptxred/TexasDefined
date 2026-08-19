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
    lastVerified: 'Citation policy and manifest relationship reviewed August 18, 2026.',
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
      { name: 'Top 25 methodology and source policy', url: 'https://texasdefined.com/explore/top-attractions/methodology' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'The Top 25 collection uses each attraction’s linked official visitor source for current operational guidance and keeps those facts separate from TexasDefined editorial assessments of visit length, physical effort, weather exposure, advance-planning needs and trip value. Every child guide carries its own review date, sources and review log.',
    lastVerified: 'Top 25 authority framework and collection coverage reviewed August 18, 2026. Current-day hours, prices, closures and reservations remain controlled by each attraction’s linked official source.',
  },
  '/explore/top-attractions/methodology': {
    title: 'Top 25 methodology provenance',
    sources: [
      { name: 'Top 25 canonical collection', url: 'https://texasdefined.com/explore/top-attractions' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
    ],
    methodology: 'This page documents the editorial selection criteria, ranking policy, source precedence, comparison scales and correction rules used across the Top 25. It is the controlling methodology page for the collection rather than an attraction-specific operational source.',
    lastVerified: 'Top 25 selection, sourcing and comparison methodology documented August 18, 2026.',
  },
  '/explore/top-attractions/road-trips': {
    title: 'Top 25 road-trip methodology',
    sources: [
      { name: 'Top 25 canonical collection', url: 'https://texasdefined.com/explore/top-attractions' },
      { name: 'Top 25 methodology and source policy', url: 'https://texasdefined.com/explore/top-attractions/methodology' },
    ],
    methodology: 'The seven route structures are TexasDefined editorial trip-planning synthesis built only from canonical Top-25 attraction guides. They are not live navigation instructions. Each attraction’s official source controls current hours, reservations, closures and operating restrictions.',
    lastVerified: 'Top 25 route groupings and canonical stop links reviewed August 18, 2026.',
  },
  '/explore/painted-churches': {
    title: 'Painted Churches research and verification',
    sources: [
      { name: 'Texas Historical Commission', url: 'https://thc.texas.gov/' },
      { name: 'Painted Churches methodology and corrections', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
    ],
    methodology: 'The statewide collection separates formal National Register decorative-interior membership, the Schulenburg touring cluster and the broader Painted Churches tradition. Primary and official church-specific records lead for dates, designations and current access; public-history and scholarly sources deepen interpretation. Churches are not added from travel-list mentions alone.',
    lastVerified: 'The 22-church verified collection, inclusion labels and source hierarchy were reviewed August 18, 2026.',
  },
  '/explore/painted-churches/methodology': {
    title: 'Painted Churches methodology provenance',
    sources: [
      { name: 'Painted Churches canonical collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'This is the controlling methodology page for inclusion criteria, source precedence, conflict handling, correction policy and image-rights review across the Painted Churches collection.',
    lastVerified: 'Painted Churches research, correction and image-rights methodology documented August 18, 2026.',
  },
  '/explore/painted-churches/how-many': {
    title: 'Painted Churches count methodology',
    sources: [
      { name: 'Painted Churches canonical collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Painted Churches methodology', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
    ],
    methodology: 'The count explainer treats the Schulenburg cluster, formal National Register decorative-interior group and broader statewide tradition as distinct definitions. It reports the TexasDefined verified collection count without claiming that every historical or tourism source uses the same scope.',
    lastVerified: 'Collection counts and definition labels reviewed August 18, 2026.',
  },
  '/explore/painted-churches/compare': {
    title: 'Painted Churches comparison provenance',
    sources: [
      { name: 'Painted Churches canonical collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Painted Churches methodology', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
    ],
    methodology: 'The comparison table is generated from the same verified church records as the collection hub. It preserves county, denomination and designation flags without filling missing fields or converting broader-tradition churches into formal National Register members.',
    lastVerified: 'Comparison labels and verified collection coverage reviewed August 18, 2026.',
  },
  '/explore/painted-churches/map': {
    title: 'Painted Churches location-directory provenance',
    sources: [
      { name: 'Painted Churches canonical collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Painted Churches methodology', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
    ],
    methodology: 'The statewide location directory is a geographic distribution of the verified church collection. Map searches use a verified address when available and otherwise the named church and community; the directory does not infer public access from map presence.',
    lastVerified: 'Regional grouping, church identity and location-link logic reviewed August 18, 2026.',
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
