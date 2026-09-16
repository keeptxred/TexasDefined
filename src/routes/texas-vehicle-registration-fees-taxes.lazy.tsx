import { createLazyFileRoute } from '@tanstack/react-router';
import { VehicleRegistrationFeesTaxesRouteContent } from '@/components/editorial/VehicleRegistrationAuthorityPages';

export const Route = createLazyFileRoute('/texas-vehicle-registration-fees-taxes')({
  component: VehicleRegistrationFeesTaxesRouteContent,
});
