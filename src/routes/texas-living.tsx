import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { articlesQuery } from '@/data/queries';
import type { Article } from '@/data/types';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Homes, history, sports, moving and the practical details of making a life in Texas — gathered into one magazine department.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-living`;
const sections = [
  ['Things That Define Texas', '/things-unique-to-texas', '250 foods, places, traditions, wildlife, sayings and icons that make Texas feel like Texas.'],
  ['Explore', '/explore', 'Parks, lakes, small towns, road trips and places worth making time for.'],
  ['Sports', '/sports', 'The games, rivalries and rituals that are part of life here.'],
  ['History', '/texas-history', 'The people, places and turning points that still shape the state.'],
  ['Home & Garden', '/home-garden', 'Texas homes, yards, seasons and the practical projects that come with them.'],
  ['Moving Here', '/moving-to-texas', 'Compare places, understand the costs and arrive with fewer surprises.'],
  ['Homes & Land', '/real-estate', 'Home buying, ownership, mortgages, insurance, equity and land.'],
  ['Guides', '/guides', 'Useful answers for the decisions and details that come with living in Texas.'],
  ['Money & Property', '/decide/financial-tools', 'Calculators and explainers for housing, paychecks, utilities, insurance and property taxes.'],
] as const;

const cultureGuides = [
  ['/texas-food-history', 'Texas Food History', 'The parent guide connecting barbecue, chili, chicken-fried steak, breakfast tacos, Ranch Water, puffy tacos, barbacoa, immigrant foodways and Texas-born brands to the communities that shaped them.'],
  ['/texas-food-trail', 'Texas Food Trail', 'Barbecue, breakfast tacos, Czech bakeries, Gulf seafood and regional food traditions built into a statewide road-trip guide.'],
  ['/texas-breakfast-taco-guide', 'Texas Breakfast Tacos', 'Tortillas, eggs, beans, potatoes, barbacoa, carne guisada, migas and the salsa habits that shape an everyday Texas breakfast.'],
  ['/texas-chili-con-carne-history', 'Texas Chili Con Carne', 'San Antonio Chili Queens, commercial chili powder, Terlingua cookoff culture and the difference between food history and folklore.'],
  ['/texas-chicken-fried-steak-guide', 'Texas Chicken-Fried Steak', 'A disputed origin, regional breading styles, cream gravy and the texture that makes the classic Texas plate work.'],
  ['/texas-ranch-water-guide', 'Texas Ranch Water', 'A simple tequila highball whose strong Texas identity is better documented than its exact first origin.'],
  ['/san-antonio-puffy-taco-history', 'San Antonio Puffy Tacos', 'Fresh masa, hot oil and West Side food culture explain one of San Antonio’s most recognizable regional tacos.'],
  ['/barbacoa-big-red-san-antonio', 'Barbacoa & Big Red', 'An older Sunday barbacoa tradition and a Waco-born soda became one of San Antonio’s strongest food-and-memory pairings.'],
  ['/texas-natural-wonders-bucket-list', 'Texas Natural Wonders', 'Twelve landscapes that show how Texas shifts from desert mountains and canyons to cypress swamp, springs and barrier islands.'],
  ['/texas-dance-halls-honky-tonks', 'Dance Halls & Honky-Tonks', 'Historic halls, Western swing, the two-step and the social spaces where Texas music is still experienced together.'],
  ['/german-czech-texas-towns', 'German & Czech Texas Towns', 'Food, churches, dance halls, festivals and historic communities across Central Texas and the Hill Country.'],
  ['/texas-homecoming-mums', 'Texas Homecoming Mums', 'How a simple chrysanthemum became an enormous wearable tradition of school spirit and local identity.'],
  ['/texas-slang-explained', 'Texas Slang Explained', 'Y’all, fixin’ to, ranch imagery, bilingual influence and the context behind familiar Texas sayings.'],
  ['/texas-blue-norther-weather-guide', 'Texas Blue Northers & Spring Storms', 'Texas weather language and storm-watching culture, separated from the meteorology and National Weather Service guidance that should control real safety decisions.'],
  ['/texas-roadside-oddities', 'Texas Roadside Oddities', 'Giant art, neon, tiny towns and strange stops that can turn a highway drive into a real Texas road trip.'],
  ['/texas-brand-origin-stories', 'Texas Brand Origin Stories', "H-E-B, Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's—where they started and how Texas routines made them cultural shorthand."],
  ['/dr-pepper-texas-history', 'Dr Pepper in Texas', 'How an 1885 Waco soda-fountain drink became a nationally recognized brand while its birthplace remained part of the identity.'],
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
    const sectionItems = sections.map(([name, path, copy]) => ({ name, path, copy }));
    const cultureItems = cultureGuides.map(([path, name, copy]) => ({ name, path, copy }));
    const financeItems = financeGuides.map(([path, name, copy]) => ({ name, path, copy }));
    const topicItems = [...sectionItems, ...cultureItems, ...financeItems].map(({ name, path, copy }, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'WebPage', name, description: copy, url: `${siteUrl}${path}` } }));
    const articleItems = articles.map((article, index) => ({ '@type': 'ListItem', position: topicItems.length + index + 1, item: { '@type': 'Article', name: article.title, description: article.dek, url: `${siteUrl}/article/${article.slug}` } }));
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-living', title: 'Texas Life', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-living')],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Life', description, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${pageUrl}#topics` }, breadcrumb: { '@id': `${pageUrl}#breadcrumbs` } },
        { '@type': 'ItemList', '@id': `${pageUrl}#topics`, name: 'Texas Life departments and guides', numberOfItems: topicItems.length + articleItems.length, itemListElement: [...topicItems, ...articleItems] },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Texas Life', item: pageUrl }] },
      ] }) }],
    };
  },
  component: TexasLivingPage,
});

function TexasLivingPage() {
  const { homeArticles, movingArticles } = Route.useLoaderData();
  return <>
    <DepartmentHero current="Texas Life" eyebrow="Texas Life" title="Home, history and everyday life across Texas" description={description} />
    <Container className="py-12 sm:py-16">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map(([title, to, copy], index) => <Link key={to} to={to} className="group border-t border-border pt-5">
          <span className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
          <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open section →</span>
        </Link>)}
      </div>
    </Container>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Signature Texas guides" title="Go deeper on the traditions that make the state feel different" description="These evergreen TexasDefined guides turn the 250-item Things That Define Texas collection into practical cultural, historical and travel-focused reading." actionLabel="See all 250 Texas icons" actionTo="/things-unique-to-texas" />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {cultureGuides.map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-6">
            <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Read guide →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Money decisions" title="Start with the costs that change the household budget" description="Three focused guides connect everyday Texas housing decisions with the calculators used to test the numbers." actionLabel="Open financial tools" actionTo="/decide/financial-tools" />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {financeGuides.map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-6">
            <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Read guide →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    {homeArticles.length > 0 && <Section><Container><SectionHeader eyebrow="Homes & ownership" title="What it costs to own a home in Texas" description="Mortgages, closing costs, insurance, equity, utilities and the true cost of owning a home in Texas." actionLabel="See all home guides" actionTo="/real-estate" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{homeArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={withTexasLivingPhoto(article)} size="compact" /></li>)}</ul></Container></Section>}

    {movingArticles.length > 0 && <Section><Container><SectionHeader eyebrow="Moving here" title="What to know before you unpack" description="City-by-city help with commutes, schools, utilities, taxes, insurance and regional costs." actionLabel="See all moving guides" actionTo="/moving-to-texas" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{movingArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={withTexasLivingPhoto(article)} size="compact" /></li>)}</ul></Container></Section>}
  </>;
}