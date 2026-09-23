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
    <Suspense
      fallback={
        <div
          role="status"
          aria-live="polite"
          className="mx-auto max-w-7xl px-5 py-12 text-sm text-muted-foreground sm:px-8"
        >
          Loading Texas Dogs Defined…
        </div>
      }
    >
      {breed ? <DogBreedPage /> : <DogsHubPage />}
    </Suspense>
  );
}
