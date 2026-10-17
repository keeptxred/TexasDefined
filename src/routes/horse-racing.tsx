import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/horse-racing')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Texas Horse Racing: All Racetracks, Race Dates & Track Guides',
      description: 'Explore Texas live horse-racing tracks, racing calendars, Fredericksburg fairgrounds, inactive-track history, Texas county guides and licensing sources.',
      canonicalPath: '/horse-racing',
    }),
    links: [canonicalLink(texasDefinedBrand, '/horse-racing')],
  }),
});
