import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/explore/breweries/$slug')({
  loader: async ({params}) => {
    const { texasBreweryBySlug } = await import('@/data/breweries/roster');
    const brewery = texasBreweryBySlug.get(params.slug);
    if (!brewery) throw notFound();
    return brewery;
  },
  head: ({loaderData}) => {
    const item = loaderData;
    const canonicalPath = '/explore/breweries/' + (item?.slug || '');
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: item ? item.name + ' | ' + item.city + ', Texas Brewery License' : 'Texas brewery directory',
        description: item ? item.name + ' in ' + item.city + ', ' + item.county + ' County: TABC brewing authorization location, licensing information and county travel links.' : 'Texas brewery license directory.',
        robots: 'noindex,follow',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
