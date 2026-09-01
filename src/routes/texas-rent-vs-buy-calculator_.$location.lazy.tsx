import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalRentVsBuyPage } from '@/components/calculators/LocalRentVsBuyPage';

export const Route = createLazyFileRoute('/texas-rent-vs-buy-calculator/$location')({
  component: LocalRentVsBuyRoute,
});

function LocalRentVsBuyRoute() {
  const { page } = Route.useLoaderData();
  return <LocalRentVsBuyPage profile={page.profile} faqs={page.faqs} />;
}