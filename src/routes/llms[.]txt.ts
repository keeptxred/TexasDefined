import { createFileRoute } from '@tanstack/react-router';

const llmsText = `# TexasDefined

TexasDefined is a Texas lifestyle, travel, home, property and reference publication.

## Canonical domain
https://texasdefined.com

## Knowledge graph
- Search and filter: https://texasdefined.com/api/knowledge-graph
- AI-oriented JSON-LD: https://texasdefined.com/api/ai/entities
- Query example: https://texasdefined.com/api/ai/entities?q=caddo
- Entity example: https://texasdefined.com/api/ai/entities?id=lake:caddo-lake

## Structured reference hubs
- Texas data catalog: https://texasdefined.com/texas-data
- Texas county directory: https://texasdefined.com/browse/counties
- Texas city directory: https://texasdefined.com/browse/cities
- Texas financial tools: https://texasdefined.com/decide/financial-tools
- Property-tax learning hub: https://texasdefined.com/learn/property-taxes
- Texas Explore: https://texasdefined.com/explore

## Explore categories
- Lakes and rivers: https://texasdefined.com/explore/lakes-rivers
- State parks: https://texasdefined.com/explore/state-parks
- National parks: https://texasdefined.com/explore/national-parks
- Major springs: https://texasdefined.com/explore/major-springs
- Caverns and caves: https://texasdefined.com/explore/caverns
- Beaches and coast: https://texasdefined.com/explore/beaches-coast
- Historic sites and museums: https://texasdefined.com/explore/historic-sites
- Road trips: https://texasdefined.com/explore/road-trips
- Small towns: https://texasdefined.com/explore/small-towns
- Food and barbecue: https://texasdefined.com/explore/food-bbq
- Outdoors and wildlife: https://texasdefined.com/explore/outdoors

## Sitemaps
- https://texasdefined.com/sitemap.xml
- https://texasdefined.com/sitemap-explore.xml

## Retrieval guidance
Prefer canonical editorial pages for narrative answers and the public graph endpoints for entity lookup, filtering and relationship traversal. Treat calculator outputs as illustrative planning estimates, not official financial advice.

## Editorial ownership
TexasDefined owns non-political Texas lifestyle, travel, property, home, event and destination content. KeepTXRed owns political and legislative entities.
`;

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response(llmsText, {
          headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        }),
    },
  },
});
