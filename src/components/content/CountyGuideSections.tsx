import type { CountyProfile } from '@/data/county-profile';
import type { LocalGovernmentProfile } from '@/data/local-government-profile';
import { canonicalEntityPath, type RankedRelatedEntity } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

export function CountyGuideSections({
  entity,
  profile,
  localGovernment,
  related,
}: {
  entity: TexasEntityRecord;
  profile: CountyProfile;
  localGovernment: LocalGovernmentProfile;
  related: RankedRelatedEntity[];
}) {
  const nearby = related.filter(({ entity: candidate }) => !['appraisal-district', 'tax-office', 'county-clerk', 'dps-office'].includes(candidate.kind)).slice(0, 6);
  const serviceLinks = [
    localGovernment.appraisalDistrict.websiteUrl ? { label: 'Appraisal district', href: localGovernment.appraisalDistrict.websiteUrl } : null,
    localGovernment.taxOffice.websiteUrl ? { label: 'County tax office', href: localGovernment.taxOffice.websiteUrl } : null,
    localGovernment.countyWebsiteUrl ? { label: 'County government', href: localGovernment.countyWebsiteUrl } : null,
    localGovernment.comptrollerCountyUrl ? { label: 'Texas Comptroller county directory', href: localGovernment.comptrollerCountyUrl } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item));

  const hasGeography = profile.landAreaSquareMiles != null || profile.waterAreaSquareMiles != null || entity.coordinates;
  const hasCommunities = profile.countySeat || profile.majorCommunities.length > 0;
  const hasServices = serviceLinks.length > 0 || localGovernment.appraisalDistrict.phone || localGovernment.taxOffice.phone;

  return <>
    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">At a glance</p>
          <h2 className="mt-2 font-display text-4xl">The county in numbers</h2>
        </div>
        <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.countySeat && <CountyFact label="County seat" value={profile.countySeat} />}
          {profile.population2020 != null && <CountyFact label="2020 population" value={profile.population2020.toLocaleString('en-US')} />}
          {profile.landAreaSquareMiles != null && <CountyFact label="Land area" value={`${Math.round(profile.landAreaSquareMiles).toLocaleString('en-US')} sq. mi.`} />}
          {profile.waterAreaSquareMiles != null && <CountyFact label="Water area" value={`${Math.round(profile.waterAreaSquareMiles).toLocaleString('en-US')} sq. mi.`} />}
        </dl>
      </div>
    </section>

    {hasGeography ? <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Where it is</p>
          <h2 className="mt-2 font-display text-4xl">A sense of place</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {profile.landAreaSquareMiles != null && <p>{entity.name} spans about {Math.round(profile.landAreaSquareMiles).toLocaleString('en-US')} square miles of land{profile.waterAreaSquareMiles != null ? ` and about ${Math.round(profile.waterAreaSquareMiles).toLocaleString('en-US')} square miles of water` : ''}.</p>}
          {entity.coordinates && <p>The county reference point is near {entity.coordinates.latitude.toFixed(3)}° N, {Math.abs(entity.coordinates.longitude).toFixed(3)}° W. Use the map link above for geographic context rather than a mailing address.</p>}
          {entity.region && <p>Texas Defined groups this county within the {title(entity.region)} part of the state for browsing and regional discovery.</p>}
        </div>
      </div>
    </section> : null}

    {hasCommunities ? <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">County seat & communities</p>
          <h2 className="mt-2 font-display text-4xl">Places on the map</h2>
        </div>
        <div>
          {profile.countySeat && <p className="max-w-3xl text-base leading-7 text-muted-foreground"><strong className="text-foreground">{profile.countySeat}</strong> is the county seat.</p>}
          {profile.majorCommunities.length ? <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {profile.majorCommunities.map((community) => <li key={community} className="border-t border-border py-3 text-sm font-medium">{community}</li>)}
          </ul> : null}
        </div>
      </div>
    </section> : null}

    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">What to know</p>
          <h2 className="mt-2 font-display text-4xl">How to use this guide</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>This page combines county-level geography and population data with verified local-government sources. Texas Defined keeps editorial discovery separate from official county services so readers can tell which information comes from public records and which links lead to local offices.</p>
          <p>Population and geography figures come from the U.S. Census Bureau, while the county-seat reference comes from the Texas State Library. Local office links are checked against statewide county and property-tax directories.</p>
        </div>
      </div>
    </section>

    {hasServices ? <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Property & county services</p>
          <h2 className="mt-2 font-display text-4xl">Official local resources</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">Property appraisal</h3>
            {localGovernment.appraisalDistrict.name && <p className="mt-3 text-sm leading-6 text-muted-foreground">Chief appraiser: {localGovernment.appraisalDistrict.name}</p>}
            {localGovernment.appraisalDistrict.phone && <p className="mt-1 text-sm leading-6 text-muted-foreground">Phone: {localGovernment.appraisalDistrict.phone}</p>}
            {localGovernment.appraisalDistrict.address && <p className="mt-1 text-sm leading-6 text-muted-foreground">{localGovernment.appraisalDistrict.address}</p>}
          </div>
          <div>
            <h3 className="font-display text-2xl">Tax office</h3>
            {localGovernment.taxOffice.name && <p className="mt-3 text-sm leading-6 text-muted-foreground">Tax assessor-collector: {localGovernment.taxOffice.name}</p>}
            {localGovernment.taxOffice.phone && <p className="mt-1 text-sm leading-6 text-muted-foreground">Phone: {localGovernment.taxOffice.phone}</p>}
            {localGovernment.taxOffice.address && <p className="mt-1 text-sm leading-6 text-muted-foreground">{localGovernment.taxOffice.address}</p>}
          </div>
          {serviceLinks.length ? <div className="md:col-span-2 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-5 text-sm font-semibold">
            {serviceLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="underline decoration-primary/50 underline-offset-4 hover:text-primary">{link.label} ↗</a>)}
          </div> : null}
        </div>
      </div>
    </section> : null}

    {nearby.length ? <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Nearby places</p>
          <h2 className="mt-2 font-display text-4xl">Keep exploring</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map(({ entity: candidate }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="group border-t border-border py-5 sm:px-4">
            <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{title(candidate.kind)}</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{candidate.name}</strong>
          </a>)}
        </div>
      </div>
    </section> : null}
  </>;
}

function CountyFact({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border py-4"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-2xl">{value}</dd></div>;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
