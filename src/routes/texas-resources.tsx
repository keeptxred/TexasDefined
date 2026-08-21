import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical starting point for moving to Texas, driving, buying and owning a home, exploring the state and handling everyday Texas life.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

type ResourceGroup = { title: string; links: ReadonlyArray<readonly [string, string]> };

const groups: ReadonlyArray<ResourceGroup> = [
  {
    title: 'Everyday Texas services',
    links: [
      ['Texas driver license', '/texas-drivers-license'],
      ['Texas DMV', '/texas-dmv'],
      ['Texas vehicle registration', '/texas-vehicle-registration'],
      ['Find your DMV or county office', '/find-my-dmv'],
      ['Texas fishing license', '/texas-fishing-license'],
      ['Find your school district', '/find-my-school-district'],
    ],
  },
  {
    title: 'Moving and settling in',
    links: [
      ['Moving to Texas', '/moving-to-texas'],
      ['Your first-month checklist', '/moving-to-texas-checklist'],
      ['Texas moving-cost calculator', '/texas-moving-cost-calculator'],
      ['Texas cost-of-living calculator', '/texas-cost-of-living-calculator'],
      ['Texas utility-cost calculator', '/texas-utility-cost-calculator'],
      ['Register your vehicle', '/texas-vehicle-registration'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Money & Property', '/decide/financial-tools'],
      ['How Texas sales tax works', '/texas-sales-tax-explained'],
      ['Understand property taxes', '/learn/property-taxes'],
      ['Property-tax guide library', '/property-tax-guides'],
      ['Property-tax calculator toolkit', '/property-tax-calculators'],
      ['County property-tax guides', '/property-tax/counties'],
      ['File a homestead exemption', '/do/homestead-exemption'],
      ['Protest your appraisal', '/do/property-tax-protest'],
      ['First-time homebuyer help', '/texas-first-time-homebuyer-programs'],
      ['Texas mortgage calculator', '/texas-mortgage-calculator'],
      ['Texas home-insurance calculator', '/texas-home-insurance-calculator'],
    ],
  },
  {
    title: 'Finding your place',
    links: [
      ['Explore Texas', '/explore'],
      ['Best places to go camping in Texas', '/best-places-to-go-camping-in-texas'],
      ['Texas state parks', '/explore/state-parks'],
      ['Texas lakes and rivers', '/explore/lakes-rivers'],
      ['Texas small towns', '/explore/small-towns'],
      ['Find your county', '/browse/counties'],
      ['Find a city', '/browse/cities'],
      ['Build a Texas trip', '/explore/trip-planner'],
    ],
  },
  {
    title: 'Texas culture and traditions',
    links: [
      ['Texas vs every other state', '/texas-vs-every-state'],
      ['State Fair of Texas', '/texas-state-fair'],
      ['Texas flag', '/texas-flag'],
      ['Texas Two Step', '/texas-two-step'],
      ['Texas Explained', '/texas-explained'],
      ['Texas facts', '/texas-facts'],
      ['Things unique to Texas', '/things-unique-to-texas'],
      ['Texas food history', '/texas-food-history'],
    ],
  },
  {
    title: 'Stories and everyday Texas',
    links: [
      ['Texas Life', '/texas-living'],
      ['Sports', '/sports'],
      ['History', '/texas-history'],
      ['Home & Garden', '/home-garden'],
      ['Homes & Land', '/real-estate'],
      ['Guides & Tools', '/guides'],
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
      name: 'Practical Texas Defined guides and tools',
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
      title: 'Texas Resources, Guides & Everyday Tools | Start Here',
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
          <p className="mt-3">Start with the task in front of you. Texas Defined focuses here on practical life in Texas: moving, driving, property, money, travel, outdoors, culture and the tools that help you make a decision.</p>
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
                  <Link key={`${group.title}-${to}-${label}`} to={to} className="group border-t border-border py-4 sm:px-5">
                    <span className="font-display text-xl group-hover:text-primary">{label}</span>
                    <span className="ml-2 text-sm text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="border-t border-border py-8 text-sm leading-7 text-muted-foreground">
          <p className="eyebrow text-primary">Government, elections and public officials</p>
          <p className="mt-3 max-w-3xl">Those reference pages belong on Keep TX Red rather than Texas Defined. Use the KTR Texas Government section for agencies, elected offices, laws, policy and election coverage.</p>
          <a href="https://keeptxred.com/texas-government" className="mt-4 inline-block font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open Texas Government on Keep TX Red →</a>
        </aside>

        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Looking for a place rather than a practical guide? <Link to="/explore" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open the Texas travel guide.</Link>
        </footer>
      </Container>
    </>
  );
}
