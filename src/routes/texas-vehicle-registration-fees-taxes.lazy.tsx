import { createLazyFileRoute } from '@tanstack/react-router';
import { VehicleRegistrationFeesTaxesPage } from '@/components/editorial/VehicleRegistrationFeesTaxesPage';

export const Route = createLazyFileRoute('/texas-vehicle-registration-fees-taxes')({
  component: VehicleRegistrationFeesTaxesPage,
});
