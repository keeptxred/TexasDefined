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
    <Suspense fallback={null}>
      {breed ? <DogBreedPage /> : <DogsHubPage />}
    </Suspense>
  );
}
