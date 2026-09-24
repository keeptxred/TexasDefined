import { createLazyFileRoute } from "@tanstack/react-router";
import { TexasGamingAuthorityPage } from "@/components/gaming/TexasGamingAuthorityPage";
export const Route = createLazyFileRoute("/gaming/$slug")({ component: GamingAuthorityRoute });
function GamingAuthorityRoute() { const page = Route.useLoaderData(); return <TexasGamingAuthorityPage page={page} />; }
