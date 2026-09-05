import { lazy, Suspense } from "react";
import type { CampingProfile } from "@/data/camping/types";

const DestinationCampingDetailsImpl = lazy(() =>
  import("./DestinationCampingDetailsImpl").then((module) => ({
    default: module.DestinationCampingDetailsImpl,
  })),
);

export function DestinationCampingDetails({ destinationSlug, destinationName, profiles }: { destinationSlug: string; destinationName: string; profiles: CampingProfile[] }) {
  if (!profiles.length) return null;
  return <Suspense fallback={null}><DestinationCampingDetailsImpl destinationSlug={destinationSlug} destinationName={destinationName} profiles={profiles} /></Suspense>;
}
