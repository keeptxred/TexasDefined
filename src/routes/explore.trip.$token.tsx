import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const supabaseUrl = String(
  import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "",
).replace(/\/$/, "");
const supabaseKey = String(
  import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "",
);

type JsonRecord = Record<string, unknown>;

type LegacyTripStop = {
  name: string;
  period: string;
  durationMinutes: number | null;
  reasons: string[];
  notes: string[];
};

type LegacyTripDay = {
  day: number;
  date: string | null;
  stops: LegacyTripStop[];
};

type LegacySharedTrip = {
  title: string;
  startsOn: string | null;
  endsOn: string | null;
  updatedAt: string | null;
  verificationReminder: string;
  days: LegacyTripDay[];
};

function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(value: unknown): string | null {
  const valueText = text(value);
  return valueText || null;
}

function textList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => text(item)).filter(Boolean)
    : [];
}

function normalizeSharedTrip(row: JsonRecord): LegacySharedTrip {
  const itinerary = record(row.itinerary);
  const rawDays = Array.isArray(itinerary.days) ? itinerary.days : [];
  const days = rawDays
    .map((rawDay, dayIndex): LegacyTripDay => {
      const day = record(rawDay);
      const rawStops = Array.isArray(day.stops) ? day.stops : [];
      const stops = rawStops.map((rawStop): LegacyTripStop => {
        const stop = record(rawStop);
        const entity = record(stop.entity);
        const minutes = typeof stop.durationMinutes === "number" && Number.isFinite(stop.durationMinutes)
          ? Math.max(0, Math.round(stop.durationMinutes))
          : null;
        return {
          name: text(entity.name) || "Texas destination",
          period: text(stop.period) || "stop",
          durationMinutes: minutes,
          reasons: textList(stop.reasons),
          notes: textList(stop.notes),
        };
      });
      return {
        day: typeof day.day === "number" && Number.isFinite(day.day) ? Math.max(1, Math.round(day.day)) : dayIndex + 1,
        date: nullableText(day.date),
        stops,
      };
    })
    .filter((day) => day.stops.length > 0);

  return {
    title: text(row.title) || "Shared Texas itinerary",
    startsOn: nullableText(row.starts_on),
    endsOn: nullableText(row.ends_on),
    updatedAt: nullableText(row.updated_at),
    verificationReminder:
      text(itinerary.verificationReminder) ||
      "Verify current hours, fees, reservations, weather, access conditions, and regulations with official sources before traveling.",
    days,
  };
}

async function getLegacySharedTrip(token: string): Promise<LegacySharedTrip | null> {
  if (token.length < 24 || token.length > 128 || !supabaseUrl || !supabaseKey) return null;

  const params = new URLSearchParams({
    select: "share_token,is_public,title,starts_on,ends_on,itinerary,updated_at",
    share_token: `eq.${token}`,
    is_public: "eq.true",
    limit: "1",
  });
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_trips?${params.toString()}`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`Shared itinerary lookup failed: ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows) || !rows.length) return null;
  return normalizeSharedTrip(record(rows[0]));
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

export const Route = createFileRoute("/explore/trip/$token")({
  loader: async ({ params }) => {
    const trip = await getLegacySharedTrip(params.token);
    if (!trip) throw notFound();
    return trip;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title || "Shared Texas itinerary"} | Texas Defined` },
      {
        name: "description",
        content: "A read-only shared Texas itinerary preserved for travelers using an existing public share link.",
      },
      { name: "robots", content: "noindex, follow, max-image-preview:large" },
    ],
  }),
  component: LegacySharedTripPage,
});

function LegacySharedTripPage() {
  const trip = Route.useLoaderData();
  const start = formatDate(trip.startsOn);
  const end = formatDate(trip.endsOn);

  return (
    <main className="py-12">
      <Container>
        <p className="eyebrow text-primary">Shared Texas itinerary</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{trip.title}</h1>
        {(start || end) && (
          <p className="mt-3 text-sm text-muted-foreground">
            {start && end ? `${start} – ${end}` : start || end}
          </p>
        )}
        <p className="mt-6 max-w-3xl rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
          {trip.verificationReminder}
        </p>

        <div className="mt-10 space-y-10">
          {trip.days.map((day) => (
            <section key={`${day.day}-${day.date || "undated"}`}>
              <h2 className="border-b pb-2 font-display text-3xl">
                Day {day.day}{day.date ? ` · ${formatDate(day.date)}` : ""}
              </h2>
              <ol className="mt-5 space-y-4">
                {day.stops.map((stop, index) => (
                  <li key={`${day.day}-${index}-${stop.name}`} className="rounded-lg border p-5">
                    <p className="eyebrow text-primary">
                      {stop.period}{stop.durationMinutes != null ? ` · ${stop.durationMinutes} minutes` : ""}
                    </p>
                    <h3 className="mt-1 font-display text-2xl">{stop.name}</h3>
                    {stop.reasons.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {stop.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                      </ul>
                    )}
                    {stop.notes.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {stop.notes.map((note) => <li key={note}>{note}</li>)}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            This shared itinerary is preserved read-only. Build a current trip with the latest Texas Defined destination data and planning tools.
          </p>
          <Link to="/explore/trip-planner" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">
            Open the current trip planner →
          </Link>
        </div>
      </Container>
    </main>
  );
}
