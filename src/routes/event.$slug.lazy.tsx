import { createLazyFileRoute } from "@tanstack/react-router";

import { ExpediaStaySearch } from "@/components/affiliate/ExpediaStaySearch";

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

function MajorEventGuidePage() {
  const { page } = Route.useLoaderData();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.jsonLd }} />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8">
        <article dangerouslySetInnerHTML={{ __html: page.html }} />
        <ExpediaStaySearch />
      </main>
    </>
  );
}
