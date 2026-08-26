import { createLazyFileRoute } from "@tanstack/react-router";
import { TexasMusicCityGuide } from "@/components/editorial/TexasMusicCityGuide";
export const Route = createLazyFileRoute("/dallas-fort-worth-music-history")({ component: GuidePage });
function GuidePage() { const guide = Route.useLoaderData(); return <TexasMusicCityGuide guide={guide} />; }
