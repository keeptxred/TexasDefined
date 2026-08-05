import { useState } from "react";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import type { Destination } from "@/data/types";

const PAGE_SIZE = 24;

export function RegionalDestinationGrid({
  destinations,
  regionName,
}: {
  destinations: Destination[];
  regionName: string;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = destinations.slice(0, visibleCount);
  const remaining = Math.max(0, destinations.length - visibleCount);

  return (
    <>
      <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((destination) => (
          <li key={destination.id}>
            <DestinationCard destination={destination} regionLabel={regionName} />
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, destinations.length))}
            className="border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Keep exploring — {Math.min(PAGE_SIZE, remaining)} more places
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            {visible.length.toLocaleString("en-US")} of {destinations.length.toLocaleString("en-US")} places on this page
          </p>
        </div>
      )}
    </>
  );
}
