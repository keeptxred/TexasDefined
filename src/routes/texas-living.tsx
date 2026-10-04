import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { articlesQuery } from '@/data/queries';
import type { Article } from '@/data/types';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical guide to living in Texas: costs, homes, moving, utilities, property taxes, everyday life and the traditions that make the state feel different.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-living`;

const startHere = [
  ['Moving to Texas', '/moving-to-texas', 'Compare places, understand costs and plan the practical details before a move.', 'Plan a Texas move →'],
  ['Homes & Land', '/real-estate', 'Buying, owning, financing, insuring and maintaining a home or piece of land in Texas.', 'Explore homes & land →'],
  ['Money & Property', '/decide/financial-tools', 'Calculators and explainers for housing, paychecks, utilities, insurance and property taxes.', 'Use Texas money tools →'],
  ['Texas Resources', '/texas-resources', 'Official services, practical references and task-focused help for everyday life in Texas.', 'Find Texas resources →'],
] as const;

const everydayLife = [
  ['Home & Garden', '/home-garden', 'Texas homes, yards, seasons and the practical projects that come with them.'],
  ['Sports', '/sports', 'The teams, rivalries, school traditions and game-day culture woven into everyday life.'],
  ['Texas History', '/texas-history', 'The people, places and turning points that still shape communities across the state.'],
  ['Explore Texas', '/explore', 'Parks, lakes, small towns, road trips and destinations that help explain the state by experiencing it.'],
] as const;

const cultureGuides = [
  ['/texas-food-history', 'Texas Food History', 'How migration, ranching, border culture and local communities shaped the foods now associated with Texas.'],
  ['/texas-natural-wonders-bucket-list', 'Texas Natural Wonders', 'Twelve landscapes showing how Texas changes from desert mountains and canyons to springs, swamps and barrier islands.'],
  ['/texas-dance-halls-honky-tonks', 'Dance Halls & Honky-Tonks', 'Historic halls, Western swing, the two-step and the social spaces where Texas music is still experienced together.'],
  ['/german-czech-texas-towns', 'German & Czech Texas Towns', 'Food, churches, dance halls, festivals and historic communities across Central Texas and the Hill Country.'],
  ['/texas-homecoming-mums', 'Texas Homecoming Mums', 'How a simple chrysanthemum became an oversized tradition of school spirit and local identity.'],
  ['/texas-slang-explained', 'Texas Slang Explained', 'Y’all, fixin’ to, bilingual influence and the context behind familiar Texas sayings.'],
] as const;

const financeGuides = [
  ['/article/texas-utility-costs-guide', 'Estimate Texas utility costs', 'Build an address-specific budget for electricity, water, wastewater, gas, internet, trash, pools and irrigation.'],
  ['/article/texas-closing-costs-guide', 'Understand closing costs and cash to close', 'Separate the down payment from lender charges, title services, prepaids, escrow deposits and the final cash needed at settlement.'],
  ['/article/salary-needed-to-buy-a-house-in-texas', 'Work backward from a sustainable home payment', 'Use the complete housing payment, recurring debts, reserves and household budget instead of one statewide salary headline.'],
] as const;

const texasLivingPhotoOverrides: Partial<Record<string, Article['hero']>> = {
  'texas-homeowners-insurance-guide': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Gillette_House_%28Houston%2C_Texas%29.JPG',
    alt: 'Front exterior of a Texas house in Houston for a homeowners insurance guide',
    width: 1600,
    height: 1200,
    credit: 'Safety Cap · CC BY 3.0 · Wikimedia Commons',
  },
  'should-you-refinance-texas-mortgage': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/James_L_Autry_House_on_Courtlandt_Place_in_Houston%2C_Texas.jpg',
    alt: 'Texas house in Houston representing the property behind a mortgage refinance decision',
    width: 1600,
    height: 1280,
    credit: 'Wikimedia Commons · licensed photograph',
  },
  'texas-utility-costs-guide': {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&h=900&q=82',
    alt: 'Residential house representing electricity, water, gas and other household utility costs',
    width: 1600,
    height: 900,
    credit: 'Unsplash',
  },
  'moving-to-austin-guide': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Lady_Bird_Lake_in_Austin%2C_Texas.jpg',
    alt: 'Austin skyline reflected in Lady Bird Lake',
    width: 1600,
    height: 1200,
    credit: 'Rish0203 · CC0 · Wikimedia Commons',
  },
  'moving-to-san-antonio-guide': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/River_walk_-_san_antonio.jpg',
    alt: 'San Antonio River Walk with water, trees and pedestrian paths',
    width: 1600,
    height: 1200,
    credit: 'Martious · CC BY-SA 3.0 · Wikimedia Commons',
  },
  'moving-to-dallas-fort-worth-guide': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Dallas_Texas_Skyline.jpg',
    alt: 'Dallas skyline viewed across the Trinity River',
    width: 1600,
    height: 1067,
    credit: 'Tony Webster · CC BY 2.0 · Wikimedia Commons',
  },
  'moving-to-houston-address-checklist': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Houston_texas_usa_skyline.jpg/1280px-Houston_texas_usa_skyline.jpg',
    alt: 'Houston skyline in Texas',
    width: 1280,
    height: 1038,
    credit: 'Leeannoneal · CC BY-SA 4.0 · Wikimedia Commons',
  },
  'moving-to-texas-what-nobody-tells-you': {
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&h=900&q=82',
    alt: 'Open Texas road through a wide landscape representing a move across the state',
    width: 1600,
    height: 900,
    credit: 'Unsplash',
  },
};

const withTexasLivingPhoto = (article: Article): Article => ({
  ...article,
  hero: texasLivingPhotoOverrides[article.slug] ?? article.hero,
});

export const Route = createFileRoute('/texas-living')({
  loader: async ({ context }) => {
    const [homeArticles, movingArticles] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: 'real-estate' })),
      context.queryClient.ensureQueryData(articlesQuery({ category: 'moving-to-texas' })),
    ]);
    return { homeArticles, movingArticles };
  },
  head: ({ loaderData }) => {
    const articles = [...(loaderData?.homeArticles ?? []), ...(loaderData?.movingArticles ?? [])];
    const startItems = startHere.map(([name, path, copy]) => ({ name, path, copy }));
    const everydayItems = everydayLife.map(([name, path, copy]) => ({ name, path, copy }));
    const cultureItems = cultureGuides.map(([path, name, copy]) => ({ name, path, copy }));
    const financeItems = financeGuides.map(([path, name, copy]) => ({ name, path, copy }));
    const topicItems = [...startItems, ...everydayItems, ...cultureItems, ...financeItems].map(({ name, path, copy }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'WebPage', name, description: copy, url: `${siteUrl}${path}` },
    }));
    const articleItems = articles.map((article, index) => ({
      '@type': 'ListItem',
      position: topicItems.length + index + 1,
      item: { '@type': 'Article', name: article.title, description: article.dek, url: `${siteUrl}/article/${article.slug}` },
    }));

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: '/texas-living',
        title: 'Living in Texas: Cost, Homes & Everyday Life',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, '/texas-living')],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: 'Living in Texas',
              description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              mainEntity: { '@id': `${pageUrl}#topics` },
              breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
            },
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#topics`,
              name: 'Living in Texas guides and resources',
              numberOfItems: topicItems.length + articleItems.length,
              itemListElement: [...topicItems, ...articleItems],
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Texas Life', item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
  component: TexasLivingPage,
});

function TexasLivingPage() {
  const { homeArticles, movingArticles } = Route.useLoaderData();

  return <>
    <DepartmentHero
      current="Texas Life"
      eyebrow="Texas Life"
      title="Living in Texas"
      description="A practical starting point for the real decisions behind life in Texas: where to live, what housing costs, how utilities and property taxes affect a budget, what to know before moving, and the culture that makes different parts of the state feel distinct."
    />

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
        <div>
          <p className="eyebrow text-primary">The short version</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">What is living in Texas actually like?</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>There is no single Texas lifestyle. Houston, Dallas–Fort Worth, Austin, San Antonio, the Gulf Coast, East Texas, West Texas, the Panhandle and the Rio Grande Valley differ in climate, housing, commute patterns, insurance exposure, jobs and day-to-day costs.</p>
            <p>The practical side matters as much as the mythology. Housing prices can vary sharply by metro and neighborhood, property taxes are local, electricity and utility costs depend on the home and service area, and long driving distances shape many household budgets.</p>
            <p>This hub organizes the subjects that matter most when deciding whether to move, buy, rent, budget or simply understand everyday life here.</p>
          </div>
        </div>
        <aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="eyebrow text-muted-foreground">Use the right TexasDefined page</p>
          <div className="mt-5 space-y-5 text-sm leading-6 text-muted-foreground">
            <p><Link to="/moving-to-texas" className="font-semibold text-foreground hover:text-primary">Moving to Texas</Link> is for relocation planning.</p>
            <p><Link to="/texas-resources" className="font-semibold text-foreground hover:text-primary">Texas Resources</Link> is for official services and practical tasks.</p>
            <p><Link to="/guides" className="font-semibold text-foreground hover:text-primary">Guides</Link> is the broader reference library.</p>
            <p><Link to="/texas-explained" className="font-semibold text-foreground hover:text-primary">Texas Explained</Link> is for understanding why Texas systems, places and institutions work the way they do.</p>
          </div>
        </aside>
      </div>
    </Container>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Start here" title="Choose the part of Texas life you are trying to figure out" description="Four clear paths replace a second site navigation menu and send you directly to the most useful next step." />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {startHere.map(([title, to, copy, cta]) => <Link key={to} to={to} className="group bg-background p-6 sm:p-8">
            <h2 className="font-display text-3xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">{cta}</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Money decisions" title="Start with the costs that change the household budget" description="Housing, utilities, closing costs and affordability are more useful near the top of this hub than buried beneath cultural reading." actionLabel="Open financial tools" actionTo="/decide/financial-tools" />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {financeGuides.map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-6">
            <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Use this guide →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    {homeArticles.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Homes & ownership" title="What it costs to own a home in Texas" description="Mortgages, closing costs, insurance, equity, utilities and the true cost of ownership." actionLabel="See all home guides" actionTo="/real-estate" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{homeArticles.slice(0, 6).map((article) => <li key={article.id}><ArticleCard article={withTexasLivingPhoto(article)} size="compact" /></li>)}</ul></Container></Section>}

    {movingArticles.length > 0 && <Section><Container><SectionHeader eyebrow="Moving here" title="What to know before you unpack" description="Practical relocation guidance for commutes, schools, utilities, taxes, insurance and regional costs." actionLabel="See all moving guides" actionTo="/moving-to-texas" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{movingArticles.slice(0, 6).map((article) => <li key={article.id}><ArticleCard article={withTexasLivingPhoto(article)} size="compact" /></li>)}</ul></Container></Section>}

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Everyday Texas" title="The parts of daily life that do not fit on a moving checklist" description="Home projects, sports, history and places to explore all matter once Texas is more than a destination on a moving truck." />
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {everydayLife.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border pt-5">
            <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Explore {title.toLowerCase()} →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Texas culture" title="A few traditions that help explain what makes the state feel different" description="A focused selection belongs here; the full culture library lives in Things That Define Texas." actionLabel="Explore Things That Define Texas" actionTo="/things-unique-to-texas" />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {cultureGuides.map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-6">
            <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Read guide →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Keep exploring" title="Go to the hub that matches what you need next" description="Texas Living is the orientation page. The deeper hubs below handle relocation, official resources, explanation and statewide discovery." />
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm font-semibold">
          <Link to="/moving-to-texas" className="border-b border-primary pb-1 text-primary">Moving to Texas →</Link>
          <Link to="/texas-resources" className="border-b border-primary pb-1 text-primary">Texas Resources →</Link>
          <Link to="/texas-explained" className="border-b border-primary pb-1 text-primary">Texas Explained →</Link>
          <Link to="/guides" className="border-b border-primary pb-1 text-primary">All Guides →</Link>
          <Link to="/explore" className="border-b border-primary pb-1 text-primary">Explore Texas →</Link>
        </div>
      </Container>
    </Section>
  </>;
}
