import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical starting point for moving, buying, owning a home, finding Texas state agencies and navigating everyday life across the state.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

type ResourceGroup = { title: string; links: ReadonlyArray<readonly [string, string]> };

const groups: ReadonlyArray<ResourceGroup> = [
  {
    title: 'Moving and settling in',
    links: [
      ['Moving Here', '/moving-to-texas'],
      ['Your first-month checklist', '/moving-to-texas-checklist'],
      ['Register your vehicle', '/find-my-dmv'],
      ['Find your school district', '/find-my-school-district'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Money & Property', '/decide/financial-tools'],
      ['Understand property taxes', '/learn/property-taxes'],
      ['Property-tax guide library', '/property-tax-guides'],
      ['Property-tax calculator toolkit', '/property-tax-calculators'],
      ['County property-tax guides', '/property-tax/counties'],
      ['File a homestead exemption', '/do/homestead-exemption'],
      ['Protest your appraisal', '/do/property-tax-protest'],
      ['First-time homebuyer help', '/texas-first-time-homebuyer-programs'],
      ['How sales tax works', '/texas-sales-tax-explained'],
    ],
  },
  {
    title: 'Texas state agencies and services',
    links: [
      ['Texas Secretary of State', '/agency/texas-secretary-of-state'],
      ['Texas Comptroller', '/agency/texas-comptroller'],
      ['Texas Department of Insurance', '/agency/texas-department-insurance'],
      ['Texas Department of Motor Vehicles', '/agency/texas-dmv'],
      ['Texas Commission on Environmental Quality', '/agency/texas-commission-environmental-quality'],
      ['Texas Education Agency', '/agency/texas-education-agency'],
      ['Texas Health and Human Services', '/agency/texas-health-human-services'],
      ['Texas Parks and Wildlife', '/agency/texas-parks-wildlife'],
      ['Texas Department of Public Safety', '/agency/texas-dps'],
      ['Public Utility Commission of Texas', '/agency/public-utility-commission'],
    ],
  },
  {
    title: 'Finding your place',
    links: [
      ['Explore', '/explore'],
      ['Find your county', '/browse/counties'],
      ['Find a city', '/browse/cities'],
      ['Texas Life', '/texas-living'],
    ],
  },
  {
    title: 'Stories and everyday Texas',
    links: [
      ['Sports', '/sports'],
      ['History', '/texas-history'],
      ['Home & Garden', '/home-garden'],
      ['Homes & Land', '/real-estate'],
      ['About Texas Defined', '/about'],
    ],
  },
];

const guideLinks = groups.flatMap((group) => group.links);
const itemListElement = guideLinks.map(([name, path], index) => ({
  '@type': 'ListItem',
  position: index + 1,
  item: { '@type': 'WebPage', name, url: `${siteUrl}${path}` },
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Start Here',
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}#resources` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#resources`,
      name: 'Practical guides and Texas state agency references',
      numberOfItems: itemListElement.length,
      itemListElement,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Start Here', item: pageUrl },
      ],
    },
  ],
};

export const Route = createFileRoute('/texas-resources')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-resources',
      title: 'Texas Resources & State Agencies | Start Here',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-resources')],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(structuredData) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <DepartmentHero current="Start Here" eyebrow="The Texas Guidebook" title="Good answers for everyday Texas life" description={description} />

      <Container className="py-12 sm:py-16">
        <aside className="max-w-3xl border-y border-border py-5 text-sm leading-7 text-muted-foreground">
          <p className="eyebrow text-primary">How to use this page</p>
          <p className="mt-3">Start with the question in front of you. These guides connect practical explanations with Texas Defined reference pages for the state agencies, official offices and records that matter when details need verification.</p>
        </aside>

        <div className="mt-8 divide-y divide-border">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-7 py-10 lg:grid-cols-[15rem_1fr]">
              <div>
                <p className="eyebrow text-primary">Section {String(groupIndex + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{group.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2">
                {group.links.map(([label, to]) => (
                  <Link key={to} to={to} className="group border-t border-border py-4 sm:px-5">
                    <span className="font-display text-xl group-hover:text-primary">{label}</span>
                    <span className="ml-2 text-sm text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Looking for a place rather than a practical guide? <Link to="/explore" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open the Texas travel guide.</Link>
        </footer>
      </Container>
    </>
  );
}
