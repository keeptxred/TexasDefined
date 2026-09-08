import { createLazyFileRoute } from "@tanstack/react-router";

import DogBreedPage from "@/components/dogs/DogBreedPage";
import DogsHubPage from "@/components/dogs/DogsHubPage";

export const Route = createLazyFileRoute("/dogs/{-$breed}")({
  component: DogsPage,
});

function DogsPage() {
  return Route.useParams().breed ? <DogBreedPage /> : <DogsHubPage />;
}
