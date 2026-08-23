import { CountyHistoricSites } from '@/components/content/CountyHistoricSites';
import { CountyMadeBuiltBorn } from '@/components/content/CountyMadeBuiltBorn';
import { CountyStatewideContextSection } from '@/components/content/CountyStatewideContextSection';
import { CountyTaxRateSection } from '@/components/property/CountyTaxRateSection';
import type { CountyProfile } from '@/data/county-profile';

const regionalExplainers: Record<string, Array<{ href: string; label: string }>> = {
  'hill-country': [
    { href: '/article/texas-rivers-explained', label: 'Texas rivers explained' },
    { href: '/article/texas-wildflowers-guide', label: 'Texas wildflowers by season' },
    { href: '/article/texas-trees-guide', label: 'Texas trees explained' },
  ],
  'east-texas': [
    { href: '/article/texas-trees-guide', label: 'Texas trees explained' },
    { href: '/article/texas-rivers-explained', label: 'Texas rivers explained' },
    { href: '/article/texas-wildlife-guide', label: 'Texas wildlife field guide' },
  ],
  'gulf-coast': [
    { href: '/article/texas-rivers-explained', label: 'Texas rivers explained' },
    { href: '/article/texas-wildlife-guide', label: 'Texas wildlife field guide' },
    { href: '/article/texas-home-architecture-regions', label: 'Why Texas homes look different' },
  ],
  'south-texas': [
    { href: '/article/texas-wildlife-guide', label: 'Texas wildlife field guide' },
    { href: '/article/texas-cultural-regions-explained', label: 'Texas cultural regions explained' },
    { href: '/article/buying-land-in-texas-guide', label: 'Buying land in Texas' },
  ],
  'west-texas': [
    { href: '/article/buying-land-in-texas-guide', label: 'Buying land in Texas' },
    { href: '/article/texas-wildlife-guide', label: 'Texas wildlife field guide' },
    { href: '/article/texas-cultural-regions-explained', label: 'Texas cultural regions explained' },
  ],
  panhandle: [
    { href: '/article/texas-farm-to-market-roads-explained', label: 'Farm-to-Market roads explained' },
    { href: '/article/buying-land-in-texas-guide', label: 'Buying land in Texas' },
    { href: '/article/texas-cultural-regions-explained', label: 'Texas cultural regions explained' },
  ],
  'north-texas': [
    { href: '/article/texas-lakes-reservoirs-explained', label: 'Why Texas lakes are mostly reservoirs' },
    { href: '/article/texas-home-architecture-regions', label: 'Why Texas homes look different' },
    { href: '/article/texas-farm-to-market-roads-explained', label: 'Farm-to-Market roads explained' },
  ],
};

const regionalLandscapes: Record<string, Array<{ href: string; label: string }>> = {
  'hill-country': [
    { href: '/explore/landscapes/hill-country', label: 'Texas Hill Country' },
    { href: '/explore/landscapes/edwards-plateau', label: 'Edwards Plateau' },
    { href: '/explore/landscapes/caves-and-karst', label: 'Caves & karst' },
  ],
  'east-texas': [
    { href: '/explore/landscapes/piney-woods', label: 'Piney Woods' },
    { href: '/explore/landscapes/post-oak-savannah', label: 'Post Oak Savannah' },
    { href: '/explore/landscapes/forests', label: 'Texas forests' },
  ],
  'gulf-coast': [
    { href: '/explore/landscapes/gulf-coast', label: 'Texas Gulf Coast' },
    { href: '/explore/landscapes/wetlands-and-marshes', label: 'Wetlands & marshes' },
    { href: '/explore/landscapes/rivers-and-river-valleys', label: 'Rivers & river valleys' },
  ],
  'south-texas': [
    { href: '/explore/landscapes/south-texas-brush-country', label: 'South Texas Brush Country' },
    { href: '/explore/landscapes/rio-grande-valley', label: 'Rio Grande Valley' },
    { href: '/explore/landscapes/prairies-and-grasslands', label: 'Prairies & grasslands' },
  ],
  'west-texas': [
    { href: '/explore/landscapes/permian-basin', label: 'Permian Basin' },
    { href: '/explore/landscapes/trans-pecos-far-west-texas', label: 'Trans-Pecos & Far West Texas' },
    { href: '/explore/landscapes/deserts', label: 'Texas deserts' },
  ],
  panhandle: [
    { href: '/explore/landscapes/texas-panhandle', label: 'Texas Panhandle' },
    { href: '/explore/landscapes/high-plains-llano-estacado', label: 'High Plains & Llano Estacado' },
    { href: '/explore/landscapes/canyons', label: 'Texas canyons' },
  ],
  'north-texas': [
    { href: '/explore/landscapes/cross-timbers', label: 'Cross Timbers' },
    { href: '/explore/landscapes/blackland-prairie', label: 'Blackland Prairie' },
    { href: '/explore/landscapes/lakes-and-reservoirs', label: 'Lakes & reservoirs' },
  ],
};

export function CountyIdentitySection({ countyName, region, profile }: { countyName: string; region?: string; profile: CountyProfile }) {
  const population = profile.population2020;
  const landArea = profile.landAreaSquareMiles;
  const density = profile.populationDensityPerSquareMile;
  const waterShare = profile.waterSharePercent;
  const seatName = profile.countySeatPlace?.name;
  const otherCommunities = profile.majorCommunities.filter((community) => community !== seatName);
  const hasIdentitySignal = density != null || waterShare != null || region || seatName || otherCommunities.length > 0;
  const slug = countySlug(countyName);
  const explainers = region && regionalExplainers[region] ? regionalExplainers[region] : [
    { href: '/article/why-texas-has-254-counties', label: 'Why Texas has 254 counties' },
    { href: '/article/texas-cultural-regions-explained', label: 'Texas cultural regions explained' },
    { href: '/texas-explained', label: 'All 10 Texas Explained guides' },
  ];
  const landscapes = region ? regionalLandscapes[region] ?? [] : [];

  if (!hasIdentitySignal) return <><CountyTaxRateSection countySlug={slug} countyName={countyName} /><CountyMadeBuiltBorn countySlug={slug} /></>;

  return (
    <>
      <section className="border-b border-border py-12" aria-labelledby="county-identity-heading">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Verified county profile</p>
            <h2 id="county-identity-heading" className="mt-2 font-display text-4xl">What the data says about {countyName}</h2>
          </div>
          <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
            {population != null && landArea != null && density != null ? (
              <p>The 2020 Census counted <strong className="text-foreground">{population.toLocaleString('en-US')}</strong> residents across about <strong className="text-foreground">{Math.round(landArea).toLocaleString('en-US')} square miles</strong> of land. Dividing those two Census figures gives roughly <strong className="text-foreground">{formatDensity(density)} residents per square mile</strong>.</p>
            ) : null}
            {waterShare != null && profile.waterAreaSquareMiles != null ? <p>Census geography also records about {Math.round(profile.waterAreaSquareMiles).toLocaleString('en-US')} square miles of water. Water represents approximately {waterShare.toFixed(1)}% of the county's mapped land-and-water area.</p> : null}
            {seatName ? <p><strong className="text-foreground">{seatName}</strong> is the verified county seat{region ? `, and Texas Defined groups the county within ${title(region)} for regional browsing` : ''}.</p> : region ? <p>Texas Defined groups this county within {title(region)} for regional browsing.</p> : null}
            {otherCommunities.length > 0 ? <p>Beyond the county seat, the current structured place directory links this county to {formatList(otherCommunities.slice(0, 5))}{otherCommunities.length > 5 ? ', among additional listed communities' : ''}. This is a directory relationship, not a claim that the list contains every incorporated place or settlement in the county.</p> : <p>Texas Defined does not add an unsourced list of local communities. Additional places appear here only when the structured place directory contains a verified county relationship.</p>}
            {landscapes.length ? <div className="border-t border-border pt-5">
              <p className="eyebrow text-primary">Landscape context</p>
              <p className="mt-2 text-sm leading-6">Because county lines can cross ecological boundaries, these are broad landscape guides associated with Texas Defined's <strong className="text-foreground">{title(region!)}</strong> browsing region—not a claim that one ecoregion covers all of {countyName}.</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">{landscapes.map((link) => <a key={link.href} href={link.href} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{link.label}</a>)}</div>
              <a href="/explore/landscapes" className="mt-3 inline-block text-sm font-semibold text-primary">Explore all Texas landscapes →</a>
            </div> : null}
            <div className="border-t border-border pt-5">
              <p className="eyebrow text-primary">Understand the bigger picture</p>
              <p className="mt-2 text-sm leading-6">These Texas Explained guides add statewide context to the geography, settlement and infrastructure behind {countyName}.</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">{explainers.map((link) => <a key={link.href} href={link.href} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{link.label}</a>)}</div>
              <a href="/texas-explained" className="mt-3 inline-block text-sm font-semibold text-primary">Explore Texas Explained →</a>
            </div>
            <CountyHistoricSites countyName={countyName} />
            <CountyStatewideContextSection countyName={countyName} countySlug={slug} />
          </div>
        </div>
      </section>
      <CountyTaxRateSection countySlug={slug} countyName={countyName} />
      <CountyMadeBuiltBorn countySlug={slug} />
    </>
  );
}

function countySlug(countyName: string) { return countyName.replace(/ County$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function formatDensity(value: number) { if (value >= 100) return Math.round(value).toLocaleString('en-US'); if (value >= 10) return value.toFixed(1); return value.toFixed(2); }
function formatList(values: string[]) { if (values.length <= 1) return values[0] ?? ''; if (values.length === 2) return `${values[0]} and ${values[1]}`; return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`; }
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
