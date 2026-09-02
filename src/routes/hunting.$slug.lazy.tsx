import { createLazyFileRoute } from "@tanstack/react-router";

import HuntingTopicPage from "@/components/hunting/HuntingTopicPage";

export const Route = createLazyFileRoute("/hunting/$slug")({ component: HuntingTopicRoute });

function HuntingTopicRoute() {
  return <HuntingTopicPage topic={Route.useLoaderData()} />;
}
