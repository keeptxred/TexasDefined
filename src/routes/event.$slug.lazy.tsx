import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.jsonLd }} />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8">
        <article dangerouslySetInnerHTML={{ __html: page.html }} />
        <ParkingMapPanel map={parkingMap} contextName={page.venue ?? page.title} />
      </main>
    </>
  );
}
