import { createLazyFileRoute } from "@tanstack/react-router";

import HuntingHubPage from "@/components/hunting/HuntingHubPage";

export const Route = createLazyFileRoute("/hunting")({ component: HuntingHubPage });
