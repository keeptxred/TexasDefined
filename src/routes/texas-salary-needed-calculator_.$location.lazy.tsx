import { createLazyFileRoute } from '@tanstack/react-router';

import { LocalSalaryNeededPage } from '@/components/calculators/LocalSalaryNeededPage';

export const Route = createLazyFileRoute('/texas-salary-needed-calculator/$location')({
  component: LocalSalaryNeededRoute,
});

function LocalSalaryNeededRoute() {
  const { page } = Route.useLoaderData();
  return <LocalSalaryNeededPage profile={page.profile} faqs={page.faqs} />;
}