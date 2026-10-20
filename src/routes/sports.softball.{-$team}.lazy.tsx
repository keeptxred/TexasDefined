import { createLazyFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const SoftballHubPage = lazy(() => import('@/components/softball/SoftballHubPage').then((m) => ({ default: m.SoftballHubPage })));
const ParisJuniorCollegePage = lazy(() => import('@/components/softball/ParisJuniorCollegePage').then((m) => ({ default: m.ParisJuniorCollegePage })));
const SoftballSchoolsDirectory = lazy(() => import('@/components/softball/SoftballSchoolsDirectory').then((m) => ({ default: m.SoftballSchoolsDirectory })));
const TexasVoltsPage = lazy(() => import('@/components/softball/TexasVoltsPage').then((m) => ({ default: m.TexasVoltsPage })));
const SoftballPublishedTeamAuthorityPage = lazy(() => import('@/components/softball/SoftballPublishedTeamAuthorityPage').then((m) => ({ default: m.SoftballPublishedTeamAuthorityPage })));

export const Route = createLazyFileRoute('/sports/softball/{-$team}')({ component: SoftballAuthorityPage });

function SoftballAuthorityPage() {
  const { team } = Route.useParams();
  const approvedProfile = Route.useLoaderData();
  const content = approvedProfile
    ? <SoftballPublishedTeamAuthorityPage profile={approvedProfile} />
    : team === 'schools'
    ? <SoftballSchoolsDirectory />
    : team === 'paris-junior-college'
    ? <ParisJuniorCollegePage />
    : team === 'texas-volts'
      ? <TexasVoltsPage />
      : <SoftballHubPage />;
  return <Suspense fallback={<div role="status" className="mx-auto max-w-6xl px-6 py-24 text-sm text-muted-foreground">Loading softball research…</div>}>
    {content}
  </Suspense>;
}
