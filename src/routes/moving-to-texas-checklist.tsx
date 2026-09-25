import { useEffect, useMemo, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { RelocationToolkitAnd100 } from '@/components/relocation/RelocationToolkitAnd100';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';
import { RELOCATION_CHECKLIST_TOTAL, readRelocationChecklistProgress, setRelocationChecklistItemComplete } from '@/lib/relocation-workspace';

const description = 'The practical things worth handling before the boxes arrive, during your first weeks and after the new address starts to feel like home.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/moving-to-texas-checklist`;
const verifiedLabel = 'Verified Aug. 26, 2026';

type ChecklistItem = { id: string; text: string; sourceName?: string; sourceUrl?: string };
const item = (id: string, text: string, sourceName?: string, sourceUrl?: string): ChecklistItem => ({ id, text, ...(sourceName && sourceUrl ? { sourceName, sourceUrl } : {}) });

const groups = [
  { title: 'Before the moving truck', items: [
    item('before-documents', 'Confirm your lease or closing date and keep digital copies of every signed document.'),
    item('before-utilities', 'Identify electricity, water, wastewater, trash and gas service for the exact address before comparing utility costs.', 'Public Utility Commission of Texas', 'https://www.puc.texas.gov/'),
    item('before-insurance', 'Request insurance quotes that account for wind, flood, hail and foundation concerns where they matter.', 'Texas Department of Insurance', 'https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html'),
    item('before-records', 'Keep school, medical, employment, vehicle, pet and identity records together in one easy-to-reach folder.'),
  ] },
  { title: 'Your first two weeks', items: [
    item('arrival-inspection', 'Photograph the home and complete the move-in inspection before unpacking takes over.'),
    item('arrival-address-change', 'Update your address with banks, employers, insurers, subscriptions and the Postal Service.', 'USPS official change-of-address service', 'https://moversguide.usps.com/'),
    item('arrival-emergency-services', 'Sign up for local emergency alerts and find nearby urgent care, city services and evacuation routes.'),
    item('arrival-schools', 'Confirm the correct school district, enrollment documents and transportation details from the exact address.', 'Texas Education Agency school finder', 'https://tea.texas.gov/families-and-students/finding-school-your-child/finding-school'),
  ] },
  { title: 'Cars, licenses and getting around', items: [
    item('vehicle-registration', 'Check the current TxDMV requirements for registration, title, inspection or emissions requirements and insurance.', 'Texas Department of Motor Vehicles', 'https://www.txdmv.gov/motorists/register-your-vehicle'),
    item('driver-license', 'Schedule any driver-license appointment you need through the Texas Department of Public Safety.', 'Texas Department of Public Safety', 'https://www.dps.texas.gov/section/driver-license'),
    item('vehicle-receipts', 'Save receipts and confirmation numbers for registration, title and licensing visits.'),
    item('toll-accounts', 'Update toll-road accounts and double-check every license-plate number.'),
  ] },
  { title: 'The home, taxes and paperwork', items: [
    item('voter-registration', 'Check voter-registration eligibility and deadlines through the official state election source.', 'VoteTexas.gov', 'https://www.votetexas.gov/register-to-vote/'),
    item('homestead-exemption', 'For an owner-occupied home, review the residence homestead exemption and file when eligible.', 'Texas Comptroller residence homestead FAQ', 'https://comptroller.texas.gov/taxes/property-tax/exemptions/residence-faq.php'),
    item('home-records', 'Keep the deed, closing disclosure, survey, appraisal, insurance paperwork and exemption confirmation together.'),
    item('property-tax-offices', 'Identify the appraisal district and tax offices for the county, then read the first appraisal notice and property-tax bill carefully; the previous owner’s taxable value may not carry over.', 'Texas Comptroller county property-tax directory', 'https://comptroller.texas.gov/taxes/property-tax/county-directory/'),
  ] },
] as const;

const howToSections = groups.map((group, groupIndex) => ({ '@type': 'HowToSection', position: groupIndex + 1, name: group.title, itemListElement: group.items.map((item, itemIndex) => ({ '@type': 'HowToStep', position: itemIndex + 1, name: item.text, text: item.text, url: `${pageUrl}#${item.id}` })) }));

export const Route = createFileRoute('/moving-to-texas-checklist')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: '/moving-to-texas-checklist', title: 'Moving to Texas Checklist: Your First Month', description }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-checklist')],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Moving to Texas Checklist: Your First Month', description, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${pageUrl}#howto` }, breadcrumb: { '@id': `${pageUrl}#breadcrumbs` }, dateModified: '2026-09-12' },
      { '@type': 'HowTo', '@id': `${pageUrl}#howto`, name: 'A moving checklist for your first month in Texas', description, step: howToSections },
      { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` }, { '@type': 'ListItem', position: 3, name: 'First Month Checklist', item: pageUrl }] },
    ] })],
  }),
  component: Page,
});

function Page() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(readRelocationChecklistProgress());
  }, []);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = groups.flatMap((group) => group.items).filter((entry) => completedSet.has(entry.id)).length;

  const toggleChecklistItem = (itemId: string) => {
    const next = setRelocationChecklistItemComplete(itemId, !completedSet.has(itemId));
    setCompleted(next);
  };

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/moving-to-texas" className="hover:text-foreground">Moving Here</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">First Month Checklist</li></ol></nav>
        <p className="eyebrow mt-8 text-primary">The moving checklist</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">A smoother first month in Texas</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Official-source links {verifiedLabel}</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <article className="mx-auto max-w-5xl">
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">Work through the list in order, or jump to the part that matches where you are in the move. Where a statewide agency owns the rule or lookup, the checklist links directly to that official source.</p>
        <aside className="mt-8 border border-border bg-surface p-6" aria-labelledby="checklist-progress-heading">
          <p className="eyebrow text-primary">My Texas Move progress</p>
          <h2 id="checklist-progress-heading" className="mt-2 font-display text-3xl">{completedCount} of {RELOCATION_CHECKLIST_TOTAL} tasks complete</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Check off tasks as you finish them. Progress stays in this browser with My Texas Move; no account or server-side move profile is required.</p>
          <Link to="/moving-to-texas" hash="my-texas-move" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open My Texas Move →</Link>
        </aside>
        <aside className="mt-8 border-y border-border py-6" aria-labelledby="checklist-budget-heading">
          <p className="eyebrow text-primary">Before move day</p>
          <h2 id="checklist-budget-heading" className="mt-2 font-display text-3xl">Price the whole move, not just the truck</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Transportation, packing, travel, storage, deposits and setup costs can land in the same few weeks. Build the one-time budget first, then keep it separate from the new recurring household costs.</p>
          <Link to="/texas-moving-cost-calculator" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">Open the Texas moving cost calculator →</Link>
        </aside>
        <div className="mt-12 border-t-2 border-foreground">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-6 border-b border-border py-9 sm:grid-cols-[9rem_1fr]">
              <div><p className="eyebrow text-primary">Part {groupIndex + 1}</p></div>
              <div>
                <h2 className="font-display text-3xl leading-tight sm:text-4xl">{group.title}</h2>
                <ol className="mt-6 divide-y divide-border">
                  {group.items.map((item, itemIndex) => {
                    const isComplete = completedSet.has(item.id);
                    return (
                      <li id={item.id} key={item.id} className="py-5">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input type="checkbox" checked={isComplete} onChange={() => toggleChecklistItem(item.id)} className="mt-1 h-4 w-4 shrink-0" />
                          <span className={`text-sm leading-7 ${isComplete ? 'text-muted-foreground line-through' : 'text-foreground/90'}`}>
                            <span className="mr-2 font-display text-lg text-primary">{itemIndex + 1}.</span>{item.text}
                          </span>
                        </label>
                        {'sourceUrl' in item && item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="ml-7 mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-4">Official source · {item.sourceName} · {verifiedLabel} ↗</a>}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          ))}
        </div>
        <RelocationToolkitAnd100 />
        <aside className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">Before you rely on it</p><p className="mt-3">Rules, deadlines, service territories and address assignments can change. The official links above were checked on August 26, 2026; confirm the current requirement with the responsible state or local office before acting.</p></aside>
        <footer className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6 text-sm font-semibold"><Link to="/texas-moving-cost-calculator" className="text-primary underline underline-offset-4">Estimate moving costs</Link><Link to="/moving-to-texas" className="text-primary underline underline-offset-4">Back to the Texas relocation hub</Link><Link to="/texas-resources" className="underline underline-offset-4">Texas resources</Link><Link to="/find-my-dmv" className="underline underline-offset-4">Find DMV / county office</Link><Link to="/find-my-school-district" className="underline underline-offset-4">Find school district</Link></footer>
      </article>
    </Container>
  </>;
}
