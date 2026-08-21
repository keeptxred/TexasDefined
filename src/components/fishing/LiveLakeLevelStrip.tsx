import type { LiveLakeLevelSnapshot } from "@/data/fishing/live-lake-level.server";
import { Container } from "@/components/layout/Container";

export function LiveLakeLevelStrip({
  lakeName,
  sourceUrl,
  snapshot,
}: {
  lakeName: string;
  sourceUrl: string;
  snapshot: LiveLakeLevelSnapshot | null;
}) {
  return (
    <div className="border-b border-border bg-muted/35">
      <Container className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div>
            <span className="font-semibold">Live lake level:</span>{" "}
            {snapshot ? (
              <>
                <span>{snapshot.percentFull.toFixed(1)}% full</span>
                {snapshot.elevationFeet != null ? <span> · {snapshot.elevationFeet.toFixed(2)} ft</span> : null}
                <span className="text-muted-foreground"> · measured {formatLakeLevelDate(snapshot.measuredAt)}</span>
              </>
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
          TexasDefined checks {lakeName}'s official Water Data for Texas page when this page loads; the reading is not stored as evergreen copy.
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
