import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { getLiveLakeLevel } from "@/data/fishing/live-lake-level.functions";
import type { LiveLakeLevelSnapshot } from "@/data/fishing/live-lake-level.server";

export function LiveLakeLevelStrip({
  lakeName,
  sourceUrl,
  snapshot,
}: {
  lakeName: string;
  sourceUrl: string;
  snapshot: LiveLakeLevelSnapshot | null;
}) {
  const [liveSnapshot, setLiveSnapshot] = useState(snapshot);
  const [checking, setChecking] = useState(snapshot == null);

  useEffect(() => {
    let active = true;
    setChecking(true);

    void getLiveLakeLevel({ data: { sourceUrl } })
      .then((nextSnapshot) => {
        if (!active || !nextSnapshot) return;
        setLiveSnapshot(nextSnapshot);
      })
      .catch(() => {
        // Keep any server-provided reading visible; the graceful fallback below handles a cold failure.
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [sourceUrl]);

  return (
    <div className="border-b border-border bg-muted/35">
      <Container className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div>
            <span className="font-semibold">Live lake level:</span>{" "}
            {liveSnapshot ? (
              <>
                <span>{liveSnapshot.percentFull.toFixed(1)}% full</span>
                {liveSnapshot.elevationFeet != null ? <span> · {liveSnapshot.elevationFeet.toFixed(2)} ft</span> : null}
                <span className="text-muted-foreground"> · measured {formatLakeLevelDate(liveSnapshot.measuredAt)}</span>
                {checking ? <span className="text-muted-foreground"> · refreshing…</span> : null}
              </>
            ) : checking ? (
              <span className="text-muted-foreground">Checking current reading…</span>
            ) : (
              <span className="text-muted-foreground">Current reading could not be loaded right now.</span>
            )}
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="eyebrow border-b border-primary pb-1 text-primary"
          >
            Water Data for Texas →
          </a>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          TexasDefined checks {lakeName}'s official Water Data for Texas page when this page opens; the reading is not stored as evergreen copy.
        </p>
      </Container>
    </div>
  );
}

function formatLakeLevelDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (!Number.isFinite(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
