import { createLazyFileRoute } from "@tanstack/react-router";

import { VerifiedTournamentProfile } from "@/components/events/VerifiedTournamentProfile";

export const Route = createLazyFileRoute("/tournament/$slug")({
  component: VerifiedTournamentProfileRoute,
});

function VerifiedTournamentProfileRoute() {
  return <VerifiedTournamentProfile pageData={Route.useLoaderData()} />;
}
