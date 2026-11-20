import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { lazy, Suspense } from 'react';
import type { Route as TaxingUnitRoute } from '@/routes/property-tax.taxing-unit.$unit';
import austinEsd3Sources from '@/data/property/austin-county-esd3-adopted.json';
import { westWhartonHospitalDistrict as whartonEvidence } from '@/data/property/west-wharton-hospital-district';

const latestAustinEsd3Adopted = austinEsd3Sources.rates.at(-1)!;
const AustinCountyEsd3Authority = lazy(() => import('@/components/property/AustinCountyEsd3Authority').then((m) => ({ default: m.AustinCountyEsd3Authority })));
const IsdTaxAuthority = lazy(() => import('@/components/property/IsdTaxAuthority').then((m) => ({ default: m.IsdTaxAuthority })));
const WestWhartonHospitalDistrictAuthority = lazy(() => import('@/components/property/WestWhartonHospitalDistrictAuthority').then((m) => ({ default: m.WestWhartonHospitalDistrictAuthority })));

export function TaxingUnitRatePage({ data }: { data: ReturnType<typeof TaxingUnitRoute.useLoaderData> }) {
  const { latest, history, peers, isdEvidence } = data;
  const displayHistory = history.map((record) => {
    const local = record.localVerification;
    const locallyVerified = local?.mode === 'supplement';
    const historyComponents = isdEvidence?.historicalComponents.find((item) => item.year === record.year)?.components ?? null;
    return {
      ...record,
      displayTotalRate: locallyVerified ? local.totalRate : record.totalRate,
      displayOperationsRate: locallyVerified ? local.maintenanceOperationsRate : (record.maintenanceOperationsRate ?? historyComponents?.maintenanceOperationsRate ?? null),
      displayDebtRate: locallyVerified ? local.debtServiceRate : (record.debtServiceRate ?? historyComponents?.debtServiceRate ?? null),
      verifiedHistoryComponentSource: historyComponents?.sourceUrl ?? null,
      verifiedHistoryComponentAgency: historyComponents?.sourceAgency ?? null,
      localSourceUrl: local?.sourceUrl ?? null,
      localComponentSourceUrl: local?.componentSourceUrl ?? null,
      localSourceAgency: local?.sourceAgency ?? null,
      localEvidenceNote: local?.evidenceNote ?? null,
      localVerifiedOn: local?.verifiedOn ?? null,
      localMode: local?.mode ?? null,
      localTotalRate: local?.totalRate ?? null,
    };
  });
  const latestLocal = latest.localVerification?.mode === 'supplement' ? latest.localVerification : null;
  const latestConflict = latest.localVerification?.mode === 'conflict' ? latest.localVerification : null;
  const rateCount = displayHistory.filter((record) => record.displayTotalRate != null).length;
  const westWharton2025 = history.find((record) => record.year === 2025);
  const westWharton2024 = history.find((record) => record.year === 2024);
  // Never keep rendering historical locally verified levy analysis if a later
  // statewide import materially revises either referenced official row.
  const westWhartonAuthorityReconciled = latest.slug === whartonEvidence.slug
    && westWharton2025?.rateUnavailable === false
    && westWharton2024?.rateUnavailable === false
    && Math.abs((westWharton2025?.totalRate ?? -1) - whartonEvidence.adoptedRate2025) < 0.0000001
    && Math.abs((westWharton2024?.totalRate ?? -1) - whartonEvidence.priorRate2024) < 0.0000001
    && westWharton2025?.levy === whartonEvidence.statewideLevy.current
    && westWharton2024?.levy === whartonEvidence.statewideLevy.prior;
  const showWestWharton2026Adoption = latest.slug === whartonEvidence.slug && whartonEvidence.localAdopted2026.year > latest.year;
  const hasEsd3Adoption = latest.slug === austinEsd3Sources.unitSlug;
  const verifiedSchoolAdoption = isdEvidence?.adoption ?? null;
  const showSchoolAdoption = !!verifiedSchoolAdoption && isdEvidence!.officialYear >= latest.year;
  const showLocallyAdoptedHistoryRow = hasEsd3Adoption && latestAustinEsd3Adopted.year > latest.year;
  const showLocallyAdoptedSchoolHistoryRow = showSchoolAdoption && isdEvidence!.officialYear > latest.year;
  const chartMaximum = Math.max(0.01, ...displayHistory.map((record) => record.displayTotalRate ?? 0), ...(showWestWharton2026Adoption ? [whartonEvidence.localAdopted2026.totalRate] : []), ...(showLocallyAdoptedHistoryRow ? [latestAustinEsd3Adopted.totalRate] : []), ...(showLocallyAdoptedSchoolHistoryRow ? [verifiedSchoolAdoption!.totalRate] : []));
  const first = history[0];
  const rateChange = latest.totalRate != null && first?.totalRate != null ? latest.totalRate - first.totalRate : null;
  const countyLinks = latest.countySlugs.map((slug) => ({ slug, name: title(slug) + ' County' }));

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Property tax</Link><span className="mx-2">/</span>{latest.name}</nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end"><div><p className="eyebrow text-primary">{latest.type === 'city' ? 'Municipal taxing unit' : latest.type.replaceAll('-', ' ')}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{latest.name} property tax rate</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Comptroller tax-rate history, with local records labeled. This is {latest.type === 'city' ? 'city tax only' : 'one jurisdiction’s tax only'}. Combine only taxes actually levied on your parcel.</p></div><dl className="border-l border-border pl-6 text-sm"><Fact label="Latest Comptroller workbook year" value={String(latest.year)}/>{latest.type === 'school-district' && latest.importedAt && Number.isFinite(Date.parse(latest.importedAt)) ? <Fact label="Statewide source row ingested (not a human verification date)" value={new Date(latest.importedAt).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric',timeZone:'UTC'})}/> : null}<Fact label={latest.type === 'city' ? 'Latest municipal rate' : latest.type === 'school-district' ? `Comptroller ${latest.year} school rate (state workbook)` : latest.slug === whartonEvidence.slug ? `Latest statewide rate (Comptroller ${latest.year})` : 'Latest unit rate'} value={latest.totalRate == null ? 'Not reported / withheld from calculation' : `${formatTaxRate(latest.totalRate)} per $100`}/><Fact label="Years with numeric source records" value={`${rateCount} of ${history.length}`}/>{showWestWharton2026Adoption ? <><Fact label="2026 locally adopted hospital district rate (separate Wharton County record)" value={`${formatTaxRate(whartonEvidence.localAdopted2026.totalRate)} per $100`}/><dt className="text-muted-foreground">2026 adopted-rate source</dt><dd><a href={whartonEvidence.sources.county2026AdoptedTable} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">Wharton County Tax Office (Oct. 2026 PDF) ↗</a></dd></> : null}{showSchoolAdoption ? <><Fact label={`${isdEvidence!.officialYear} locally adopted school rate (separate official source)`} value={`${formatTaxRate(verifiedSchoolAdoption!.totalRate)} per $100`}/><dt className="text-muted-foreground">Latest locally verified source</dt><dd><a href={isdEvidence!.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">Hood CAD adopted-rate table ↗</a></dd></> : null}{latestLocal ? <><Fact label="Latest independently verified local rate (display only)" value={`${formatTaxRate(latestLocal.totalRate)} per $100`}/><dt className="text-muted-foreground">Local source</dt><dd><a href={latestLocal.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">{latestLocal.sourceAgency} ↗</a></dd></> : null}</dl></header>


    {showWestWharton2026Adoption ? <section id="wwchd-current-rate" aria-labelledby="wwchd-current-rate-heading" className="border-b border-border py-8">
      <p className="mb-4 text-sm leading-6 text-muted-foreground">Source research and editorial review: <Link to="/authors/$author" params={{ author: 'a-homes-land' }} className="font-semibold text-primary underline underline-offset-2">Texas Defined Homes &amp; Property Desk</Link>. Official government tax records last checked <time dateTime={whartonEvidence.lastVerified}>November 20, 2026</time>. Independent reporting; not the district tax assessor or a substitute for an official parcel record.</p>
      <p className="eyebrow text-primary">Current adopted tax rate · official Wharton County record</p>
      <h2 id="wwchd-current-rate-heading" className="mt-2 font-display text-3xl sm:text-4xl">West Wharton hospital district — 2026 tax rate</h2>
      <p className="mt-4 max-w-4xl text-lg leading-8">
        <strong className="tabular-nums">${formatTaxRate(whartonEvidence.localAdopted2026.totalRate)} per $100 of district-taxable value.</strong>
        {' '}Wharton County's October 2026 adopted-rate table lists ${formatTaxRate(whartonEvidence.localAdopted2026.maintenanceOperationsRate)} for operations and ${formatTaxRate(whartonEvidence.localAdopted2026.debtServiceRate)} for debt service.
        The rate is unchanged from the district's 2025 Comptroller-reported rate.
      </p>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        This is a <strong>locally adopted 2026 rate</strong>, not a 2026 statewide Comptroller rate or a finalized 2026 levy.
        A fixed $250,000 district-taxable value would produce <strong>$580.25 in hospital-district tax alone</strong>; an actual bill depends on the parcel's taxing units, taxable valuation and exemptions.
        Confirm the district is on your property account with the Wharton Central Appraisal District before combining tax rates.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a className="font-semibold text-primary underline underline-offset-2" href={whartonEvidence.sources.county2026AdoptedTable} target="_blank" rel="noopener noreferrer">Wharton County's official 2026 tax-rate table (PDF) ↗</a>
        <a className="font-semibold text-primary underline underline-offset-2" href={whartonEvidence.sources.appraisal} target="_blank" rel="noopener noreferrer">Verify parcel jurisdictions with Wharton CAD ↗</a>
        <a className="font-semibold text-primary underline underline-offset-2" href="#wwchd-2026">See the sourced 2026 comparison</a>
      </p>
    </section> : null}

    {westWhartonAuthorityReconciled ? <Suspense fallback={<p className="border-b border-border py-6 text-sm text-muted-foreground">Loading verified local hospital-district tax research…</p>}><WestWhartonHospitalDistrictAuthority latestWorkbookYear={latest.year}/></Suspense> : null}
    {latest.slug === whartonEvidence.slug && !westWhartonAuthorityReconciled ? <section className="border-b border-border py-6 text-sm leading-7"><strong>Local historical analysis is under source review.</strong> The imported 2024 or 2025 Comptroller rate/levy now differs from the previously verified official record. To prevent an outdated comparison, the historical district narrative has been withheld until the sources are reconciled. <a href={whartonEvidence.sources.comptrollerRates} target="_blank" rel="noopener noreferrer" className="text-primary underline">Check current statewide data ↗</a>.</section> : null}
    {hasEsd3Adoption ? <Suspense fallback={<p className="border-b border-border py-6 text-sm text-muted-foreground">Loading official ESD #3 records…</p>}><AustinCountyEsd3Authority history={history}/></Suspense> : null}
    {latest.type === 'school-district' ? <Suspense fallback={<p className="border-b border-border py-6 text-sm text-muted-foreground">Loading school district homeowner guidance…</p>}><IsdTaxAuthority history={history} peers={peers}/></Suspense> : null}

    {latestConflict ? <section className="border-b border-border py-7"><p className="max-w-4xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Unresolved official-source discrepancy.</strong> For {latest.year}, the Comptroller statewide record lists {formatTaxRate(latest.totalRate!)} per $100 while {latestConflict.sourceAgency} independently reports {formatTaxRate(latestConflict.totalRate)} per $100. The statewide record is retained unchanged; the locally verified evidence is displayed separately rather than substituted into tax calculators. <a className="font-semibold text-primary underline underline-offset-2" href={latestConflict.sourceUrl} target="_blank" rel="noopener noreferrer">Review the official local tax-rate document ↗</a>.</p></section> : null}

    {latest.rateUnavailable ? <section className="border-b border-border py-7"><p className="max-w-3xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Rate not used for calculation.</strong> {statusMessage(latest.sourceStatus)} TexasDefined keeps the taxing-unit reference visible for research but does not substitute an unverified numeric rate.</p></section> : null}

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Latest rate</p><h2 className="mt-2 font-display text-3xl">What the Comptroller reported</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><RateFact label="Total rate" value={latest.totalRate}/><RateFact label="Operations (M&O)" value={latest.maintenanceOperationsRate}/><RateFact label="Debt service (I&S)" value={latest.debtServiceRate}/><div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Change since {first?.year ?? latest.year}</span><strong className="mt-1 block font-display text-2xl">{rateChange == null ? 'Not comparable' : `${rateChange >= 0 ? '+' : ''}${formatTaxRate(rateChange)}`}</strong><span className="text-xs text-muted-foreground">per $100 of taxable value</span></div></div></section>

    <section className="border-b border-border py-10"><p className="eyebrow text-primary">Counties associated with this taxing unit</p><h2 className="mt-2 font-display text-3xl">Local county context</h2><div className="mt-5 flex flex-wrap gap-3">{countyLinks.map(({slug,name}) => <a key={slug} href={`/property-tax/county/${slug}`} className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary">{name}</a>)}</div><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">County association narrows the geography but does not prove that every parcel in the county belongs to this taxing unit. Verify the exact account before combining rates.</p></section>

    <section id="taxing-unit-rate-history" className="scroll-mt-24 border-b border-border py-10">
      <p className="eyebrow text-primary">Rate history</p>
      <h2 className="mt-2 font-display text-3xl">Annual tax rates, with source distinctions</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Rates are per $100 of taxable value. Locally verified rates are labeled. Missing M&amp;O or debt components are not zero. Reported levy is not actual tax collection.</p>
      <div className="mt-6 space-y-3" aria-label="Historical taxing-unit rates visualized by year">
        {displayHistory.map((record) => <div key={record.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm">
          <span className="font-semibold">{record.year}</span>
          <div className="h-4 overflow-hidden rounded-sm bg-muted" role="img" aria-label={record.displayTotalRate == null ? `${record.year}: rate unavailable` : `${record.year}: ${formatTaxRate(record.displayTotalRate)} dollars per 100 dollars of taxable value`}>
            {record.displayTotalRate != null ? <div className="h-full bg-primary" style={{ width: `${(record.displayTotalRate / chartMaximum) * 100}%` }} /> : null}
          </div>
          <span className="text-right tabular-nums">{(record.displayTotalRate == null ? undefined : formatTaxRate(record.displayTotalRate)) ?? 'Unavailable'}</span>
        </div>)}
        {showWestWharton2026Adoption ? <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm"><span className="font-semibold">{whartonEvidence.localAdopted2026.year}</span><div className="h-4 overflow-hidden rounded-sm bg-muted" role="img" aria-label={`2026 locally adopted hospital district rate ${formatTaxRate(whartonEvidence.localAdopted2026.totalRate)} per $100`}><div className="h-full bg-primary" style={{width:`${whartonEvidence.localAdopted2026.totalRate / chartMaximum * 100}%`}} /></div><span className="text-right tabular-nums">{formatTaxRate(whartonEvidence.localAdopted2026.totalRate)}</span></div> : null}
        {showLocallyAdoptedHistoryRow ? <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm"><span className="font-semibold">{latestAustinEsd3Adopted.year}</span><div className="h-4 overflow-hidden rounded-sm bg-muted" role="img" aria-label={`${latestAustinEsd3Adopted.year}: locally adopted rate ${formatTaxRate(latestAustinEsd3Adopted.totalRate)} per $100`}><div className="h-full bg-primary" style={{width: `${(latestAustinEsd3Adopted.totalRate / chartMaximum) * 100}%`}} /></div><span className="text-right tabular-nums">{formatTaxRate(latestAustinEsd3Adopted.totalRate)}</span></div> : null}
        {showLocallyAdoptedSchoolHistoryRow ? <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm"><span className="font-semibold">{isdEvidence!.officialYear}</span><div className="h-4 overflow-hidden rounded-sm bg-muted" role="img" aria-label={`${isdEvidence!.officialYear}: independently verified locally adopted school rate ${formatTaxRate(verifiedSchoolAdoption!.totalRate)} per $100`}><div className="h-full bg-primary" style={{ width: `${(verifiedSchoolAdoption!.totalRate / chartMaximum) * 100}%` }} /></div><span className="text-right tabular-nums">{formatTaxRate(verifiedSchoolAdoption!.totalRate)}</span></div> : null}
      </div>
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[42rem] text-left text-sm">
        <thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Total / $100</th><th>Operations (M&amp;O)</th><th>Debt service (I&amp;S)</th><th>Status / source</th><th>Reported levy</th></tr></thead>
        <tbody>{showWestWharton2026Adoption ? <tr className="border-b border-border"><td className="py-3 font-semibold">{whartonEvidence.localAdopted2026.year}</td><td className="tabular-nums">{formatTaxRate(whartonEvidence.localAdopted2026.totalRate)}</td><td className="tabular-nums">{formatTaxRate(whartonEvidence.localAdopted2026.maintenanceOperationsRate)}</td><td className="tabular-nums">{formatTaxRate(whartonEvidence.localAdopted2026.debtServiceRate)}</td><td>Locally adopted, Wharton County October 2026 entity-rate table; <a href={whartonEvidence.sources.county2026AdoptedTable} target="_blank" rel="noopener noreferrer" className="text-primary underline">official adopted rates (PDF) ↗</a>. Not a 2026 Comptroller statewide workbook record.</td><td>— (not established by this source)</td></tr> : null}{showLocallyAdoptedSchoolHistoryRow ? <tr className="border-b border-border"><td className="py-3 font-semibold">{isdEvidence!.officialYear}</td><td className="tabular-nums">{formatTaxRate(verifiedSchoolAdoption!.totalRate)}</td><td className="tabular-nums">{formatTaxRate(verifiedSchoolAdoption!.maintenanceOperationsRate)}</td><td className="tabular-nums">{formatTaxRate(verifiedSchoolAdoption!.debtServiceRate)}</td><td>Locally adopted, independently sourced; <a href={isdEvidence!.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Hood CAD adopted-rate table ↗</a>. Not a Comptroller workbook row.</td><td>—</td></tr> : null}{showLocallyAdoptedHistoryRow ? <tr className="border-b border-border"><td className="py-3 font-semibold">{latestAustinEsd3Adopted.year}</td><td className="tabular-nums">{formatTaxRate(latestAustinEsd3Adopted.totalRate)}</td><td className="tabular-nums">{formatTaxRate(latestAustinEsd3Adopted.maintenanceOperationsRate)}</td><td className="tabular-nums">{formatTaxRate(latestAustinEsd3Adopted.debtServiceRate)}</td><td>Locally adopted, independently sourced; <a href={latestAustinEsd3Adopted.resolutionUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">district resolution ↗</a>. Not a Comptroller workbook row.</td><td>—</td></tr> : null}{[...displayHistory].reverse().map((record) => <tr key={record.id} className="border-b border-border">
          <td className="py-3 font-semibold">{record.year}</td>
          <td className="tabular-nums">{(record.displayTotalRate == null ? undefined : formatTaxRate(record.displayTotalRate)) ?? '—'}</td>
          <td className="tabular-nums">{(record.displayOperationsRate == null ? undefined : formatTaxRate(record.displayOperationsRate)) ?? '—'}</td>
          <td className="tabular-nums">{(record.displayDebtRate == null ? undefined : formatTaxRate(record.displayDebtRate)) ?? '—'}</td>
          <td>{record.localSourceUrl ? <><span>{record.localMode === 'conflict' ? `Local and statewide reports disagree (local ${record.localTotalRate == null ? 'unknown' : formatTaxRate(record.localTotalRate)} vs statewide ${record.totalRate == null ? 'unavailable' : formatTaxRate(record.totalRate)}); statewide record retained. ` : record.localMode === 'corroborated' ? 'Locally corroborated. ' : 'Locally verified; absent from statewide file. '}</span><a className="font-semibold text-primary underline underline-offset-2" href={record.localSourceUrl} target="_blank" rel="noopener noreferrer">{record.localSourceAgency} report ↗</a>{record.localComponentSourceUrl ? <><span> · </span><a className="font-semibold text-primary underline underline-offset-2" href={record.localComponentSourceUrl} target="_blank" rel="noopener noreferrer">M&amp;O and I&amp;S documentation ↗</a></> : null}</> : record.verifiedHistoryComponentSource ? <>Statewide total; missing components independently corroborated against <a href={record.verifiedHistoryComponentSource} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">{record.verifiedHistoryComponentAgency ?? 'Official government'} {record.year} adopted-rate series ↗</a></> : record.totalRate != null && (record.maintenanceOperationsRate == null || record.debtServiceRate == null) ? 'Finalized total; components unavailable' : statusLabel(record.sourceStatus, record.variableRate)}{latest.slug === whartonEvidence.slug && record.year === whartonEvidence.county2023Reconciliation.year ? <span className="mt-1 block text-sm leading-6"><strong>Unresolved county/state source difference:</strong> Wharton County's five-year summary lists ${formatTaxRate(whartonEvidence.county2023Reconciliation.countyFiveYearSummaryRate)} for 2023; the imported statewide rate is retained above. <a href={whartonEvidence.sources.countyFiveYearSummary} target="_blank" rel="noopener noreferrer" className="text-primary underline">County's official historical table (PDF) ↗</a>. <a href="#wwchd-2023-sources" className="text-primary underline">Read the comparison</a>.</span> : null}</td>
          <td>{record.levy != null ? money(record.levy) : '—'}</td>
        </tr>)}</tbody></table></div>
      {displayHistory.some((record) => record.localSourceUrl) ? <details className="mt-6 border-t border-border pt-4 text-sm">
        <summary className="cursor-pointer font-semibold text-foreground">How the locally sourced rates were verified</summary>
        <div className="mt-4 space-y-4 text-muted-foreground">{displayHistory.filter((record) => record.localSourceUrl).map((record) =>
          <p key={record.id}><strong className="text-foreground">{record.year} · {record.localSourceAgency}:</strong> {record.localEvidenceNote || 'Reviewed against the cited official local source.'} {record.localVerifiedOn ? <>Evidence last checked by Texas Defined on <time dateTime={record.localVerifiedOn}>{record.localVerifiedOn}</time>.</> : null} These source notes do not authorize using local figures in statewide comparisons or parcel tax calculators.</p>
        )}</div>
      </details> : null}
      {displayHistory.filter((record) => record.localMode === 'supplement').map((record) => <p key={record.id} className="mt-4 text-sm leading-6 text-muted-foreground">The Comptroller did not report {record.name}’s {record.year} rate. {record.displayTotalRate === 0 ? <>{record.localSourceAgency} independently confirms that the city did not levy municipal property tax that year. A zero <strong>city</strong> rate does not mean the parcel's complete property-tax bill was zero: county, school, and other applicable taxing units can still levy taxes.</> : <>{record.localSourceAgency} independently publishes a {(record.displayTotalRate == null ? undefined : formatTaxRate(record.displayTotalRate))} rate per $100 of taxable value{record.displayOperationsRate != null && record.displayDebtRate != null ? `, comprising ${formatTaxRate(record.displayOperationsRate)} for M&O and ${formatTaxRate(record.displayDebtRate)} for debt service` : ''}.{record.type === 'county' ? ' The county general rate may not include separately levied local districts or road/F&M taxes.' : ''}</>} These documented local figures are display-only and are not substituted into statewide records or parcel calculators.</p>)}
    </section>

    <section className="grid gap-6 border-b border-border py-10 md:grid-cols-3"><a href="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine this rate with the other taxing units serving a parcel.</span></a><a href="/texas-property-tax-rate-history" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Rate history explorer</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Search and compare another Texas taxing unit.</span></a><a href="/texas-property-tax-bill-breakdown" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Bill breakdown</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See the share attributable to every selected taxing unit.</span></a></section>

    <section className="pt-8 text-sm leading-6 text-muted-foreground"><p><strong className="text-foreground">Sources and methodology:</strong> Texas Comptroller Tax Rates and Levies, plus individually labeled local sources. Rates are per $100 taxable. Parcel jurisdiction and exemptions vary; levy is not collected revenue. Missing or conflicting state rates are excluded from calculators.</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-3"><a href={latest.sourceUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Latest Comptroller source workbook ↗</a>{displayHistory.filter((record) => record.localSourceUrl).map((record) => <span key={record.id} className="flex flex-wrap gap-x-6 gap-y-3"><a href={record.localSourceUrl!} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{record.year} {record.localSourceAgency} local report ↗</a>{record.localComponentSourceUrl ? <a href={record.localComponentSourceUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{record.year} M&amp;O/I&amp;S breakdown ↗</a> : null}</span>)}</div></section>
  </article></Container>;
}

function statusLabel(status:string,variable:boolean){if(status==='cross-source-conflict')return 'Conflicting state records — verify locally';if(status==='not-reported')return 'Not reported';if(variable)return 'Variable rate — verify parcel';if(status==='partial-reporting')return 'Partially reported';return 'Finalized rate'}
function statusMessage(status:string){if(status==='not-reported')return 'The Comptroller workbook marks this taxing unit as not having supplied the requested rate.';if(status==='cross-source-conflict')return 'The reported figure conflicts with a separate authoritative state source and requires local verification.';if(status==='partial-reporting')return 'Only part of the statewide reporting set supplied a usable rate.';return 'The statewide rate record requires verification.'}
function Fact({label,value}:{label:string;value:string}){return <div className="mb-4"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold text-foreground">{value}</dd></div>}
// Comptroller totals use six decimals; verified local rates may use seven
// or eight. Keep source precision rather than silently rounding.
function formatTaxRate(value: number): string {
  const six = value.toFixed(6);
  if (Math.abs(value - Number(six)) < 1e-10) return six;
  return value.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
}
function RateFact({label,value}:{label:string;value:number|null}){return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value == null ? 'Not separately reported' : formatTaxRate(value)}</strong>{value != null ? <span className="text-xs text-muted-foreground">per $100</span> : null}</div>}
function title(value:string){return value.replaceAll('-',' ').replace(/\b\w/g,(char)=>char.toUpperCase())}
function money(value:number){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)}
