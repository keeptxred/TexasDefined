import { createLazyFileRoute } from "@tanstack/react-router";

import { FoodAuthorityGuidePage } from "@/components/food/FoodAuthorityGuidePage";

export const Route = createLazyFileRoute("/texas-gulf-seafood-guide")({ component: GuidePage });

function GuidePage() {
  const data = Route.useLoaderData();
  return <FoodAuthorityGuidePage {...data} />;
}
