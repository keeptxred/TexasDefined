import { createLazyFileRoute } from "@tanstack/react-router";

import { FoodAuthorityGuidePage } from "@/components/food/FoodAuthorityGuidePage";

export const Route = createLazyFileRoute("/texas-kolache-guide")({ component: GuidePage });

function GuidePage() {
  const data = Route.useLoaderData();
  return <FoodAuthorityGuidePage {...data} />;
}
