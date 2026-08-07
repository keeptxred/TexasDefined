import { useState } from "react";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import type { Destination } from "@/data/types";

const PAGE_SIZE = 24;

export function RegionalDestinationGrid({ destinations, regionName }: { destinations: Destination[]; regionName: string }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = destinations.slice(0, visibleCount);
  const remaining = Math.max(0, destinations.length - visibleCount);

  return <>
    <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regionName} /></li>)}
    </ul>
    {remaining > 0 && <div className="mt-12 border-t border-border pt-7 text-center"><button type="button" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, destinations.length))} className="eyebrow border-b border-primary pb-1 text-primary">Show {Math.min(PAGE_SIZE, remaining)} more →</button><p className="mt-3 text-xs text-muted-foreground">{visible.length.toLocaleString("en-US")} of {destinations.length.toLocaleString("en-US")} places shown</p></div>}
  </>;
}
