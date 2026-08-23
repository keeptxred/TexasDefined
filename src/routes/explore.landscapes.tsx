import { createFileRoute } from '@tanstack/react-router';

import { getTexasLandscapeHub } from '@/data/texas-landscapes.functions';

const canonicalPath = '/explore/landscapes';
const title = 'Texas Landscapes: The Complete Guide';
const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';

export const Route = createFileRoute('/explore/landscapes')({
  loader: () => getTexasLandscapeHub(),
  head: ({ loaderData }) => loaderData?.head ?? {
    meta: [
      { title: title },
      { name: 'description', content: description },
    ],
    links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
  },
});
