import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const VehicleRegistrationRenewalRouteContent = lazy(() =>
  import('@/components/editorial/VehicleRegistrationAuthorityPages').then((module) => ({
    default: module.VehicleRegistrationRenewalRouteContent,
  })),
);

const canonicalPath = '/texas-vehicle-registration-renewal';
const title = 'Texas Vehicle Registration Renewal: Online & In Person';
const description = 'Renew Texas vehicle registration online, by mail or in person. Check renewal timing, emissions rules, expired-registration limits and sticker delivery.';
const pageHead = {
  meta: [
    { title },
    { name: 'description', content: description },
  ],
  links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
};

export const Route = createFileRoute('/texas-vehicle-registration-renewal')({
  head: () => pageHead,
  component: VehicleRegistrationRenewalRoute,
});

function VehicleRegistrationRenewalRoute() {
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <VehicleRegistrationRenewalRouteContent />
    </Suspense>
  );
}
