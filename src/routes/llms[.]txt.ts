import { createFileRoute } from '@tanstack/react-router';

const llmsText = `# TexasDefined

TexasDefined is a Texas lifestyle, travel, home, property and reference publication.

## Canonical domain
https://texasdefined.com

## Knowledge graph
- Search and filter: https://texasdefined.com/api/knowledge-graph
- AI-oriented JSON-LD: https://texasdefined.com/api/ai/entities
- Query by destination: https://texasdefined.com/api/ai/entities?q=dinosaur
- Query by activity or facility: https://texasdefined.com/api/ai/entities?q=camping
- Verified entity example: https://texasdefined.com/api/ai/entities?id=state-park:dinosaur-valley-state-park
- Canonical destination page: https://texasdefined.com/destination/dinosaur-valley-state-park

Public destination records may include official source URLs, source-check dates, source confidence, coordinates, county or regional containment, managing authority, and activity or amenity keywords. Missing fields are omitted rather than inferred.

## Structured reference hubs
- Texas data catalog: https://texasdefined.com/texas-data
- Texas county directory: https://texasdefined.com/browse/counties
- Texas city directory: https://texasdefined.com/browse/cities
- Texas financial tools: https://texasdefined.com/decide/financial-tools
- Property-tax learning hub: https://texasdefined.com/learn/property-taxes
- Texas Explore: https://texasdefined.com/explore
- Destination search: https://texasdefined.com/explore/search

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

## Explore regions
- Hill Country: https://texasdefined.com/explore/region/hill-country
- Gulf Coast: https://texasdefined.com/explore/region/gulf-coast
- Big Bend: https://texasdefined.com/explore/region/big-bend
- Panhandle: https://texasdefined.com/explore/region/panhandle
- Piney Woods: https://texasdefined.com/explore/region/piney-woods
- Prairies and Lakes: https://texasdefined.com/explore/region/prairies-lakes
- South Texas: https://texasdefined.com/explore/region/south-texas

## Sitemaps
- https://texasdefined.com/sitemap.xml
- https://texasdefined.com/sitemap-explore.xml

## Retrieval guidance
Prefer canonical destination and editorial pages for reader-facing answers. Use the public graph endpoints for entity lookup, source verification, filtering and relationship traversal. Prefer fields backed by official source URLs and source-check dates. Do not infer hours, fees, access, reservations, accessibility, activities or amenities when a field is absent. Treat calculator outputs as illustrative planning estimates, not official financial advice.

## Catalog behavior
TexasDefined reads the shared public and verified Explore catalog first. A reduced core remote query protects availability when optional enrichment relationships are unavailable. Local fixtures are outage-only fallback records and should not be treated as the authoritative catalog when remote records are available.

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
