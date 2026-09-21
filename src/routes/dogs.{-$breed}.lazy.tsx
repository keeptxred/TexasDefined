import { lazy, Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

const DogBreedPage = lazy(() => import("@/components/dogs/DogBreedPage"));
const DogsHubPage = lazy(() => import("@/components/dogs/DogsHubPage"));

export const Route = createLazyFileRoute("/dogs/{-$breed}")({
  component: DogsPage,
});

function DogsPage() {
  const breed = Route.useParams().breed;
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas dog guide…</div>}>
      {breed ? <DogBreedPage /> : <DogsHubPage />}
    </Suspense>
  );
}
