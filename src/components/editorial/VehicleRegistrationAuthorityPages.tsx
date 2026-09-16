import { VehicleRegistrationFeesTaxesPage } from '@/components/editorial/VehicleRegistrationFeesTaxesPage';
import { VehicleRegistrationRenewalPage } from '@/components/editorial/VehicleRegistrationRenewalPage';
import {
  VehicleRegistrationFeesTaxesSchema,
  VehicleRegistrationRenewalSchema,
} from '@/components/editorial/VehicleRegistrationAuthoritySchema';

export function VehicleRegistrationRenewalRouteContent() {
  return (
    <>
      <VehicleRegistrationRenewalSchema />
      <VehicleRegistrationRenewalPage />
    </>
  );
}

export function VehicleRegistrationFeesTaxesRouteContent() {
  return (
    <>
      <VehicleRegistrationFeesTaxesSchema />
      <VehicleRegistrationFeesTaxesPage />
    </>
  );
}
