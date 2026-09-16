import { createLazyFileRoute } from '@tanstack/react-router';
import { VehicleRegistrationRenewalRouteContent } from '@/components/editorial/VehicleRegistrationAuthorityPages';

export const Route = createLazyFileRoute('/texas-vehicle-registration-renewal')({
  component: VehicleRegistrationRenewalRouteContent,
});
