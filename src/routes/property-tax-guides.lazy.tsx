import { createLazyFileRoute } from '@tanstack/react-router';
import { PropertyTaxHubPage } from '@/components/guides/PropertyTaxHubPage';

export const Route = createLazyFileRoute('/property-tax-guides')({
  component: PropertyTaxHubPage,
});
