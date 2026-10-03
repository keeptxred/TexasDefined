import { useLocation } from '@tanstack/react-router';

import { CitationTrustPanel, type CitationSource } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { paintedChurchAuthorityExpansionDateLabel } from '@/data/painted-church-authority-sources';

type TrustConfig = {
  title: string;
  sources: CitationSource[];
  methodology: string;
  lastVerified: string;
};

const TRUST_BY_PATH: Record<string, TrustConfig> = {
  '/citation-guide': {
    title: 'Citation guide sources',
    sources: [
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'The citation guide explains how TexasDefined reference pages relate to their underlying official and public-data sources. It explains sourcing policy rather than creating a separate factual dataset.',
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
  '/county': {
    title: 'Texas county directory sources',
    sources: [
      { name: 'Texas State Library and Archives Commission — Texas counties', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' },
      { name: 'U.S. Census Bureau — Census data', url: 'https://data.census.gov/' },
    ],
    methodology: 'The county directory provides stable navigation across all 254 Texas counties. County-seat and statewide identity fields come from authoritative Texas records; population and demographic figures should retain their dataset year and Census provenance on the page where they are displayed.',
    lastVerified: 'County reference source hierarchy and directory coverage reviewed October 3, 2026; dataset-specific dates control individual statistics.',
  },
  '/browse/counties': {
    title: 'Texas county comparison sources',
    sources: [
      { name: 'U.S. Census Bureau — Census data', url: 'https://data.census.gov/' },
      { name: 'Texas State Library and Archives Commission — Texas counties', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' },
    ],
    methodology: 'The comparison normalizes county names and stable county relationships while keeping population, area and other measured fields tied to their stated source vintage. Missing values are not inferred from neighboring counties or older datasets.',
    lastVerified: 'County comparison source hierarchy reviewed October 3, 2026; visible dataset years and page-specific verification dates control individual values.',
  },
  '/explore/state-parks': {
    title: 'Texas state parks sources',
    sources: [
      { name: 'Texas Parks & Wildlife Department — State Parks', url: 'https://tpwd.texas.gov/state-parks/' },
      { name: 'Texas Parks & Wildlife Department', url: 'https://tpwd.texas.gov/' },
    ],
    methodology: 'The statewide park reference uses TPWD as the controlling source for official park identity, access, facilities, alerts and visitor rules. TexasDefined may normalize park fields for comparison, but current closures, reservations, fees and operating restrictions remain controlled by TPWD.',
    lastVerified: 'State-park source hierarchy and reference structure reviewed October 3, 2026. Current operating conditions must be checked against each linked TPWD park record.',
  },
  '/explore/lakes-rivers': {
    title: 'Texas lakes and rivers sources',
    sources: [
      { name: 'Texas Water Development Board — Water Data for Texas', url: 'https://waterdatafortexas.org/' },
      { name: 'Texas Parks & Wildlife Department — Inland Fisheries', url: 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/' },
    ],
    methodology: 'The lakes and rivers reference separates physical and hydrologic facts from fishing and recreation guidance. TWDB and other official water records lead for water-system facts; TPWD leads for fishery and lake recreation records. Current conditions are not inferred from historical averages.',
    lastVerified: 'Lakes-and-rivers source hierarchy and reference structure reviewed October 3, 2026; lake-specific conditions and fishery updates retain their own source dates.',
  },
  '/texas-high-school-football-teams': {
    title: 'Texas high-school football team reference sources',
    sources: [
      { name: 'University Interscholastic League — Football', url: 'https://www.uiltexas.org/football' },
      { name: 'Texas Education Agency — AskTED', url: 'https://tealprod.tea.state.tx.us/Tea.AskTed.Web/Forms/Home.aspx' },
    ],
    methodology: 'The football team reference separates UIL competition alignment from TEA school and district identity. Classification and district placement follow the current UIL alignment represented by the page; school identity and district context should be traceable to TEA records where available.',
    lastVerified: 'UIL/TEA source hierarchy and reference structure reviewed October 3, 2026. Alignment-cycle labels on individual pages control current classification claims.',
  },
  '/texas-high-school-football-isds': {
    title: 'Texas high-school football district reference sources',
    sources: [
      { name: 'Texas Education Agency — AskTED', url: 'https://tealprod.tea.state.tx.us/Tea.AskTed.Web/Forms/Home.aspx' },
      { name: 'University Interscholastic League — Football', url: 'https://www.uiltexas.org/football' },
    ],
    methodology: 'The ISD reference uses TEA records for district and campus identity and UIL records for football alignment. It does not infer attendance zones, enrollment eligibility or school quality from football classification.',
    lastVerified: 'TEA/UIL source hierarchy and reference structure reviewed October 3, 2026. District- and alignment-specific records retain their own controlling dates.',
  },
  '/things-unique-to-texas': {
    title: 'Things That Define Texas sources',
    sources: [
      { name: 'Things That Define Texas methodology', url: 'https://texasdefined.com/things-unique-to-texas/methodology' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
    ],
    methodology: 'The 250-entry collection is an editorial map of Texas identity. It separates official designations from folklore, labels Texas adoption separately from Texas origin, and routes current operational facts to deeper pages whose linked public agency or operator remains controlling. Automatic deeper-guide links are limited to exact, well-supported matches.',
    lastVerified: 'Collection structure, methodology and deeper-link policy reviewed August 19, 2026.',
  },
  '/things-unique-to-texas/methodology': {
    title: 'Things That Define Texas methodology sources',
    sources: [
      { name: 'Main 250-item collection', url: 'https://texasdefined.com/things-unique-to-texas' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
    ],
    methodology: 'This page controls the inclusion standard, official-fact-versus-folklore distinction, internal cross-link rules, handling of changing information and correction policy for the 250-item collection.',
    lastVerified: 'Collection methodology documented and reviewed August 19, 2026.',
  },
  '/explore/top-attractions': {
    title: 'Top 25 attraction research and verification',
    sources: [
      { name: 'Top 25 methodology and source policy', url: 'https://texasdefined.com/explore/top-attractions/methodology' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'The Top 25 collection uses each attraction’s linked official visitor source for current operational guidance and keeps those facts separate from TexasDefined editorial assessments of visit length, physical effort, weather exposure, advance-planning needs and trip value. Every child guide carries its own review date, sources and update history.',
    lastVerified: 'Top 25 sourcing framework and collection coverage reviewed August 18, 2026. Current-day hours, prices, closures and reservations remain controlled by each attraction’s linked official source.',
  },
  '/explore/top-attractions/methodology': {
    title: 'Top 25 methodology sources',
    sources: [
      { name: 'Top 25 main collection', url: 'https://texasdefined.com/explore/top-attractions' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
    ],
    methodology: 'This page documents the editorial selection criteria, ranking policy, source precedence, comparison scales and correction rules used across the Top 25. It is the controlling methodology page for the collection rather than an attraction-specific operational source.',
    lastVerified: 'Top 25 selection, sourcing and comparison methodology documented August 18, 2026.',
  },
  '/explore/top-attractions/road-trips': {
    title: 'Top 25 road-trip methodology',
    sources: [
      { name: 'Top 25 main collection', url: 'https://texasdefined.com/explore/top-attractions' },
      { name: 'Top 25 methodology and source policy', url: 'https://texasdefined.com/explore/top-attractions/methodology' },
    ],
    methodology: 'The seven route structures are TexasDefined editorial trip-planning synthesis built only from the main Top-25 attraction guides. They are not live navigation instructions. Each attraction’s official source controls current hours, reservations, closures and operating restrictions.',
    lastVerified: 'Top 25 route groupings and main stop links reviewed August 18, 2026.',
  },
  '/explore/painted-churches': {
    title: 'Painted Churches research and verification',
    sources: [
      { name: 'Texas Historical Commission', url: 'https://thc.texas.gov/' },
      { name: 'Painted Churches methodology and corrections', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
      { name: 'TexasDefined citation policy', url: 'https://texasdefined.com/citation-guide' },
    ],
    methodology: 'The statewide collection separates formal National Register decorative-interior membership, the Schulenburg touring cluster and the broader Painted Churches tradition. Primary and official church-specific records lead for dates, designations and current access; public-history and scholarly sources deepen interpretation. Churches are not added from travel-list mentions alone.',
    lastVerified: `The verified statewide collection, inclusion labels and source hierarchy were reviewed ${paintedChurchAuthorityExpansionDateLabel}; the main collection controls the current church count.`,
  },
  '/explore/painted-churches/methodology': {
    title: 'Painted Churches methodology sources',
    sources: [
      { name: 'Painted Churches main collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Texas Defined editorial accountability', url: 'https://texasdefined.com/about' },
      { name: 'Machine-readable citation index', url: 'https://texasdefined.com/citation-magnets.json' },
    ],
    methodology: 'This is the controlling methodology page for inclusion criteria, source precedence, conflict handling, correction policy and image-rights review across the Painted Churches collection.',
    lastVerified: 'Painted Churches research, correction and image-rights methodology documented August 18, 2026.',
  },
  '/explore/painted-churches/how-many': {
    title: 'Painted Churches count methodology',
    sources: [
      { name: 'Painted Churches main collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Painted Churches methodology', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
    ],
    methodology: 'The count explainer treats the Schulenburg cluster, formal National Register decorative-interior group and broader statewide tradition as distinct definitions. It reports the TexasDefined verified collection count without claiming that every historical or tourism source uses the same scope.',
    lastVerified: 'Collection counts and definition labels reviewed August 18, 2026.',
  },
  '/explore/painted-churches/compare': {
    title: 'Painted Churches comparison sources',
    sources: [
      { name: 'Painted Churches main collection', url: 'https://texasdefined.com/explore/painted-churches' },
      { name: 'Painted Churches methodology', url: 'https://texasdefined.com/explore/painted-churches/methodology' },
    ],
    methodology: 'The comparison table is generated from the same verified church records as the collection hub. It preserves county, denomination and designation flags without filling missing fields or converting broader-tradition churches into formal National Register members.',
    lastVerified: 'Comparison labels and verified collection coverage reviewed August 18, 2026.',
  },
  '/explore/painted-churches/map': {
    title: 'Painted Churches map sources',
    sources: [
      { name: 'Painted Churches main collection', url: 'https://texasdefined.com/explore/painted-churches' },
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
