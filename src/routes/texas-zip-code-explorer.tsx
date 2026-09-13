import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-zip-code-explorer';
const title = 'Texas ZIP Code Explorer and Address Research Tool';
const description = 'Use a Texas ZIP code as the starting point for address research, then verify county, school, utilities, broadband, flood risk and local services with authoritative sources.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'ReferenceApplication', operatingSystem: 'Web' })],
  }),
  component: Page,
});

const researchLinks = [
  ['School district', 'https://tea2.tea.texas.gov/families-and-students/school-district-locator/school-district-locator', 'Texas Education Agency district locator'],
  ['Water and sewer utility', 'https://www.puc.texas.gov/WaterSearch/SearchAddress/Find', 'Public Utility Commission address search'],
  ['Broadband availability', 'https://broadbandmap.fcc.gov/home', 'FCC National Broadband Map'],
  ['Flood map', 'https://msc.fema.gov/portal/home', 'FEMA Flood Map Service Center'],
  ['Community services', 'https://www.211texas.org/', '2-1-1 Texas resource search'],
  ['ZIP code confirmation', 'https://tools.usps.com/zip-code-lookup.htm', 'USPS ZIP Code Lookup'],
] as const;

function Page() {
  const [zip, setZip] = useState('');
  const cleanZip = zip.replace(/\D/g, '').slice(0, 5);
  const valid = /^\d{5}$/.test(cleanZip);

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page" className="text-foreground">ZIP explorer</span></nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"><div><p className="eyebrow text-primary">Address research</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Start Texas address research with a ZIP code</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></div><p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">ZIP codes are mail-delivery geography. They are not reliable substitutes for city limits, county lines, school districts, utility territories or emergency-service boundaries.</p></header>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Your starting point</p><h2 className="mt-2 font-display text-3xl">Enter a 5-digit ZIP</h2></div><div><label htmlFor="texas-zip" className="text-sm font-semibold">ZIP code</label><input id="texas-zip" inputMode="numeric" autoComplete="postal-code" value={cleanZip} onChange={(event) => setZip(event.target.value)} placeholder="77493" className="mt-2 min-h-12 w-full max-w-sm border border-border bg-background px-4 text-lg tracking-widest outline-none focus:border-primary" /><p className="mt-3 text-sm leading-6 text-muted-foreground">TexasDefined intentionally does not invent a county, district or provider from the ZIP alone. {valid ? `Use ${cleanZip} as the search value when an official service below accepts ZIP or address input.` : 'Enter all five digits to begin the research workflow.'}</p></div></section>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Verify the address</p><h2 className="mt-2 font-display text-3xl">Research the boundaries that actually matter</h2></div><div className="divide-y divide-border border-y border-border">{researchLinks.map(([label, href, source]) => <a key={label} href={href} target="_blank" rel="noreferrer noopener" className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr_auto] sm:items-center"><strong className="font-display text-xl">{label}</strong><span className="text-sm text-muted-foreground">{source}{valid ? ` · start with ${cleanZip} or the full address` : ''}</span><span className="font-semibold text-primary">Open ↗</span></a>)}</div></section>

    <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">TexasDefined tools</p><h2 className="mt-2 font-display text-3xl">Add local context</h2></div><div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2"><Link to="/find-my-county" className="bg-background p-5 font-semibold hover:text-primary">Find the county →</Link><Link to="/find-my-school-district" className="bg-background p-5 font-semibold hover:text-primary">Find the school district →</Link><Link to="/find-my-utilities" className="bg-background p-5 font-semibold hover:text-primary">Find utilities →</Link><Link to="/find-my-emergency-services" className="bg-background p-5 font-semibold hover:text-primary">Find community services →</Link></div></section>
  </article></Container>;
}
