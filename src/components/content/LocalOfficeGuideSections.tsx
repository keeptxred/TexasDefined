import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { LocalGovernmentProfile, LocalOfficeProfile } from '@/data/local-government-profile';

export function LocalOfficeGuideSections({ entity, profile }: { entity: TexasEntityRecord; profile: LocalGovernmentProfile | null }) {
  if (!entity.countySlug || !['appraisal-district', 'tax-office'].includes(entity.kind)) return null;
  const countyName = `${title(entity.countySlug)} County`;
  const appraisal = entity.kind === 'appraisal-district';
  const office = profile ? (appraisal ? profile.appraisalDistrict : profile.taxOffice) : undefined;

  return <>
    <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Verified local office</p>
        <h2 className="mt-2 font-display text-4xl">{appraisal ? 'Property appraisal contacts' : 'Tax and vehicle contacts'}</h2>
      </div>
      <div>
        <OfficeFacts office={office} fallbackUrl={entity.officialUrl} />
        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
          {appraisal
            ? `${entity.name} is the local appraisal authority for ${countyName}. It maintains appraisal records, determines appraised values, administers qualifying property-tax exemptions and special appraisals, and receives property-value protests. The district does not set the tax rates adopted by the county, city, school district, MUD, or other taxing units, and it generally does not collect the final tax bill.`
            : `${entity.name} is the county tax assessor-collector reference for ${countyName}. The office commonly handles property-tax billing and payment functions and many vehicle title and registration transactions performed locally on behalf of the state. It does not determine the appraised value of your property; value, exemptions, and protests belong with the county appraisal district.`}
        </p>
      </div>
    </section>

    <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Who handles what</p>
        <h2 className="mt-2 font-display text-4xl">Avoid the wrong office</h2>
        <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
          {appraisal ? <>
            <Task title="Property value or appraisal record">Start with the appraisal district. This is where you verify the property account, ownership details used for appraisal purposes, appraised value, property characteristics, and valuation history available in the local system.</Task>
            <Task title="Homestead or other exemption">The appraisal district administers exemptions. Use the district’s official application instructions and verify any required ownership, occupancy, age, disability, veteran, agricultural, or other eligibility documentation.</Task>
            <Task title="Value protest">File with the appraisal district and its appraisal review board process, not the tax office. Check the notice and official district materials for the applicable deadline and filing method.</Task>
            <Task title="Tax rate or tax bill">The appraisal district can show the taxable value, but taxing units adopt rates and the tax office or other collector handles the bill and payment. Use the bill to identify every taxing unit included.</Task>
          </> : <>
            <Task title="Property-tax payment or receipt">Start with the tax office or the collector named on the bill. Confirm the account number, payment methods, due dates, delinquency status, and whether another entity collects for a particular taxing unit.</Task>
            <Task title="Vehicle title or registration">County tax offices perform many TxDMV title and registration transactions. Verify the transaction-specific documents and fees before visiting because requirements differ for renewals, title transfers, gifts, inherited vehicles, and other cases.</Task>
            <Task title="Appraised value or exemption">Go to the county appraisal district. The tax office generally cannot change the appraised value, grant a homestead exemption, or resolve an appraisal protest.</Task>
            <Task title="Driver license or state ID">Go to Texas DPS, not the county tax office. Vehicle registration and driver licensing are separate systems in Texas.</Task>
          </>}
        </div>
      </div>
      <div>
        <p className="eyebrow text-primary">Before you contact the office</p>
        <h2 className="mt-2 font-display text-4xl">Have the record in front of you</h2>
        <ol className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
          {(appraisal ? [
            'Find the property account or parcel number if one is available. An address alone can be ambiguous when ownership, legal descriptions, or multiple accounts are involved.',
            'Open the most recent appraisal notice or online property record. Note the appraised value, assessed or taxable value, exemptions, property description, and the year you are questioning.',
            'For a protest, collect comparable sales, photographs, repair estimates, condition evidence, closing documents, or other records relevant to the specific valuation issue.',
            'For an exemption, use the official district checklist and submit sensitive documents only through the district’s approved method.',
          ] : [
            'Have the property account number and most recent tax bill for a property-tax question, or the plate, VIN, title, and ownership documents for a vehicle transaction.',
            'Confirm whether the office requires an appointment, original documents, specific identification, or a particular form of payment before traveling to the office.',
            'For delinquent property taxes, ask for a current payoff rather than relying on an older bill because penalties, interest, attorney fees, or collection status can change the amount due.',
            'For a vehicle ownership change, verify TxDMV forms and signatures for the exact transaction rather than assuming a standard renewal checklist applies.',
          ]).map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-3"><span className="font-display text-xl text-primary">{index + 1}</span><span>{item}</span></li>)}
        </ol>
      </div>
    </section>

    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Property-tax workflow</p>
          <h2 className="mt-2 font-display text-4xl">Where this office fits</h2>
        </div>
        <div className="grid gap-x-8 md:grid-cols-2">
          <Stage number="1" title="Appraisal">The appraisal district identifies and appraises taxable property and administers exemptions and special appraisal programs.</Stage>
          <Stage number="2" title="Review and protest">Property owners can challenge certain appraisal actions through the local protest and appraisal review board process.</Stage>
          <Stage number="3" title="Tax rates">Counties, cities, school districts, special districts, and other taxing units adopt their own rates under Texas law.</Stage>
          <Stage number="4" title="Billing and collection">The tax assessor-collector or another designated collector applies the adopted rates to taxable values, sends bills, receives payments, and handles delinquent accounts.</Stage>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Next steps</p>
          <h2 className="mt-2 font-display text-4xl">{countyName} tools and guides</h2>
        </div>
        <div className="grid sm:grid-cols-2">
          <GuideLink href={`/county/${entity.countySlug}`} title={`${countyName} guide`}>County facts, communities, government resources, destinations, and local context.</GuideLink>
          <GuideLink href={`/property-tax/county/${entity.countySlug}`} title={`${countyName} property-tax guide`}>County-specific property-tax data and local-office connections when the page has passed our source-quality gate.</GuideLink>
          {appraisal ? <>
            <GuideLink href="/learn/appraisal-districts" title="Texas appraisal districts explained">Understand appraisal records, values, notices, exemptions, and the role of the appraisal review board.</GuideLink>
            <GuideLink href="/do/property-tax-protest" title="Texas property-tax protest guide">Prepare for the protest process, deadlines, evidence, and next steps.</GuideLink>
            <GuideLink href="/do/homestead-exemption" title="Texas homestead exemption guide">Learn what the exemption does and how the local application process fits into the tax system.</GuideLink>
          </> : <>
            <GuideLink href="/learn/property-tax-payments" title="Paying Texas property taxes">Understand bills, collectors, due dates, payment records, and delinquency basics.</GuideLink>
            <GuideLink href="/texas-vehicle-registration" title="Texas vehicle registration guide">Renewals, title and registration responsibilities, TxDMV, and county offices.</GuideLink>
            <GuideLink href="/find-my-dmv" title="Find the right vehicle office">Separate county tax-office transactions from DPS driver-license services.</GuideLink>
          </>}
        </div>
      </div>
    </section>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
      <div><p className="eyebrow text-primary">Source notes</p><h2 className="mt-2 font-display text-3xl">Verify the live local record</h2></div>
      <div className="max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
        <p>Texas Defined uses official Texas Comptroller county-directory information and local-government sources when they are available. Officeholders, addresses, phone numbers, websites, and local procedures can change, so use the official office site for a transaction.</p>
        {profile?.comptrollerCountyUrl ? <a href={profile.comptrollerCountyUrl} target="_blank" rel="noreferrer" className="block font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Texas Comptroller county directory entry ↗</a> : null}
        {profile?.countyWebsiteUrl ? <a href={profile.countyWebsiteUrl} target="_blank" rel="noreferrer" className="block font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Official {countyName} website ↗</a> : null}
      </div>
    </section>
  </>;
}

function OfficeFacts({ office, fallbackUrl }: { office?: LocalOfficeProfile; fallbackUrl?: string }) {
  const website = office?.websiteUrl ?? fallbackUrl;
  const facts = [
    office?.name ? ['Officeholder', office.name] : undefined,
    office?.phone ? ['Phone', office.phone] : undefined,
    office?.email ? ['Email', office.email] : undefined,
    office?.address ? ['Street address', office.address] : undefined,
    office?.lastUpdated ? ['Directory updated', formatDate(office.lastUpdated)] : undefined,
  ].filter((item): item is string[] => Boolean(item));
  return <div className="grid gap-4 sm:grid-cols-2">
    {facts.map(([label, value]) => <div key={label} className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span><strong className="mt-1 block text-sm leading-6">{value}</strong></div>)}
    {website ? <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Official website</span><a href={website} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Open office website ↗</a></div> : null}
  </div>;
}

function Task({ title: heading, children }: { title: string; children: React.ReactNode }) { return <div className="border-t border-border pt-4"><h3 className="font-display text-2xl text-foreground">{heading}</h3><p className="mt-2">{children}</p></div>; }
function Stage({ number, title: heading, children }: { number: string; title: string; children: React.ReactNode }) { return <div className="border-t border-border py-5"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Step {number}</span><h3 className="mt-2 font-display text-2xl">{heading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></div>; }
function GuideLink({ href, title: heading, children }: { href: string; title: string; children: React.ReactNode }) { return <a href={href} className="group border-b border-border py-6 sm:px-5"><strong className="block font-display text-2xl group-hover:text-primary">{heading}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{children}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">Open guide →</span></a>; }
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
