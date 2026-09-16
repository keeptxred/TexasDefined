import { createLazyFileRoute } from '@tanstack/react-router';
import { VehicleRegistrationRenewalPage } from '@/components/editorial/VehicleRegistrationRenewalPage';

export const Route = createLazyFileRoute('/texas-vehicle-registration-renewal')({
  component: VehicleRegistrationRenewalPage,
});
