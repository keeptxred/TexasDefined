import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Printer, RefreshCw, Save, Share2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { destinationsQuery, regionsQuery } from "@/data/queries";
import type { Destination, TexasRegion } from "@/data/types";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const STORAGE_KEY = "texasdefined.explore.trip.v1";

const interests = ["hiking", "camping", "swimming", "fishing", "boating", "birding", "wildlife", "history", "scenic", "family"] as const;
type Interest = (typeof interests)[number];

type Preferences = {
  title: string;
  region?: TexasRegion;
  days: number;
  adults: number;
  children: number;
  accessible: boolean;
  interests: Interest[];
  maxDrivingMiles: number;
};

type TripStop = { destination: Destination; durationMinutes: number; note: string };
type TripDay = { day: number; stops: TripStop[] };
type GeneratedTrip = { title: string; preferences: Preferences; days: TripDay[] };

export const Route = createFileRoute("/explore/trip-planner")({
  validateSearch: (value: Record<string, unknown>) => ({ destination: typeof value.destination === "string" ? value.destination : undefined, trip: typeof value.trip === "string" ? value.trip : undefined }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/explore/trip-planner", title: "Texas Trip Planner", description: "Build a Texas itinerary around your region, interests, family, accessibility needs and daily driving tolerance." }),
    links: [canonicalLink(texasDefinedBrand, "/explore/trip-planner")],
  }),
  component: TripPlanner,
});

function distanceMiles(a: Destination, b: Destination) {
  const rad = (n: number) => (n * Math.PI) / 180;
  const r = 3958.8;
  const dLat = rad(b.coordinates.lat - a.coordinates.lat);
  const dLng = rad(b.coordinates.lng - a.coordinates.lng);
  const lat1 = rad(a.coordinates.lat);
  const lat2 = rad(b.coordinates.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function destinationText(destination: Destination) {
  return [destination.name, destination.summary, destination.category, destination.bestSeason, destination.entryNote, destination.accessibilityNotes, ...destination.highlights, ...destination.body].filter(Boolean).join(" ").toLowerCase();
}

function interestScore(destination: Destination, selected: Interest[]) {
  const text = destinationText(destination);
  return selected.reduce((score, interest) => {
    const aliases: Record<Interest, string[]> = {
      hiking: ["hike", "trail", "walking"],
      camping: ["camp", "cabin", "rv"],
      swimming: ["swim", "spring", "beach", "water"],
      fishing: ["fish", "angling"],
      boating: ["boat", "paddle", "kayak", "canoe"],
      birding: ["bird", "warbler", "migration"],
      wildlife: ["wildlife", "deer", "animal", "nature"],
      history: ["historic", "history", "museum", "mission", "battle"],
      scenic: ["scenic", "view", "canyon", "landscape", "overlook"],
      family: ["family", "children", "kid"],
    };
    return score + (aliases[interest].some((term) => text.includes(term)) ? 3 : 0);
  }, 0);
}

function scoreDestination(destination: Destination, preferences: Preferences, seedSlug?: string) {
  let score = interestScore(destination, preferences.interests);
  if (preferences.region && destination.region === preferences.region) score += 10;
  if (destination.featured) score += 2;
  if (seedSlug && destination.slug === seedSlug) score += 100;
  if (preferences.accessible && destination.accessibilityNotes) score += 4;
  return score;
}

function buildTrip(destinations: Destination[], preferences: Preferences, seedSlug?: string): GeneratedTrip {
  const candidates = destinations.filter((destination) => !preferences.region || destination.region === preferences.region).filter((destination) => !preferences.accessible || Boolean(destination.accessibilityNotes)).map((destination) => ({ destination, score: scoreDestination(destination, preferences, seedSlug) })).sort((a, b) => b.score - a.score || a.destination.name.localeCompare(b.destination.name));
  const fallback = candidates.length ? candidates : destinations.map((destination) => ({ destination, score: 0 }));
  const desired = Math.min(fallback.length, Math.max(preferences.days * 3, preferences.days));
  const remaining = fallback.slice(0, Math.max(desired * 3, desired)).map((item) => item.destination);
  const chosen: Destination[] = [];

  while (chosen.length < desired && remaining.length) {
    if (!chosen.length) { chosen.push(remaining.shift()!); continue; }
    const previous = chosen[chosen.length - 1];
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    remaining.forEach((destination, index) => { const distance = distanceMiles(previous, destination); if (distance < bestDistance) { bestDistance = distance; bestIndex = index; } });
    chosen.push(remaining.splice(bestIndex, 1)[0]);
  }

  const days: TripDay[] = Array.from({ length: preferences.days }, (_, index) => ({ day: index + 1, stops: [] }));
  let dayIndex = 0;
  let dayDistance = 0;
  let previous: Destination | undefined;

  for (const destination of chosen) {
    const leg = previous ? distanceMiles(previous, destination) : 0;
    if (days[dayIndex].stops.length >= 3 || (days[dayIndex].stops.length > 0 && dayDistance + leg > preferences.maxDrivingMiles)) {
      dayIndex = Math.min(dayIndex + 1, days.length - 1);
      dayDistance = 0;
      previous = undefined;
    }
    const durationMinutes = destination.category === "national-parks" || destination.category === "state-parks" ? 240 : 150;
    days[dayIndex].stops.push({ destination, durationMinutes, note: destination.highlights[0] ?? destination.summary });
    dayDistance += previous ? distanceMiles(previous, destination) : 0;
    previous = destination;
  }

  return { title: preferences.title, preferences, days };
}

function encodeTrip(trip: GeneratedTrip) {
  const compact = { title: trip.title, preferences: trip.preferences, slugs: trip.days.map((day) => day.stops.map((stop) => stop.destination.slug)) };
  return btoa(unescape(encodeURIComponent(JSON.stringify(compact))));
}

function decodeTrip(value: string, destinations: Destination[]): GeneratedTrip | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(value)))) as { title: string; preferences: Preferences; slugs: string[][] };
    const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
    return { title: parsed.title, preferences: parsed.preferences, days: parsed.slugs.map((slugs, index) => ({ day: index + 1, stops: slugs.map((slug) => bySlug.get(slug)).filter((destination): destination is Destination => Boolean(destination)).map((destination) => ({ destination, durationMinutes: 150, note: destination.highlights[0] ?? destination.summary })) })) };
  } catch { return null; }
}

function TripPlanner() {
  const search = Route.useSearch();
  const { data: destinations } = useSuspenseQuery(destinationsQuery({}));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const [trip, setTrip] = useState<GeneratedTrip | null>(null);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const seed = useMemo(() => destinations.find((destination) => destination.slug === search.destination), [destinations, search.destination]);

  useEffect(() => {
    if (search.trip) {
      const shared = decodeTrip(search.trip, destinations);
      if (shared) { setTrip(shared); return; }
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try { setTrip(JSON.parse(stored) as GeneratedTrip); } catch { window.localStorage.removeItem(STORAGE_KEY); }
  }, [destinations, search.trip]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedInterests = formData.getAll("interests").map(String) as Interest[];
    const region = String(formData.get("region") || "") as TexasRegion | "";
    const preferences: Preferences = {
      title: String(formData.get("title") || "My Texas trip"),
      region: region || undefined,
      days: Math.min(14, Math.max(1, Number(formData.get("days") || 2))),
      adults: Math.max(1, Number(formData.get("adults") || 2)),
      children: Math.max(0, Number(formData.get("children") || 0)),
      accessible: formData.get("accessible") === "on",
      interests: selectedInterests,
      maxDrivingMiles: Math.min(500, Math.max(25, Number(formData.get("maxDrivingMiles") || 150))),
    };
    setTrip(buildTrip(destinations, preferences, seed?.slug));
    setSaved(false);
    setMessage("");
  }

  function moveStop(dayIndex: number, stopIndex: number, offset: -1 | 1) {
    setTrip((current) => {
      if (!current) return current;
      const days = current.days.map((day) => ({ ...day, stops: [...day.stops] }));
      const next = stopIndex + offset;
      if (next < 0 || next >= days[dayIndex].stops.length) return current;
      [days[dayIndex].stops[stopIndex], days[dayIndex].stops[next]] = [days[dayIndex].stops[next], days[dayIndex].stops[stopIndex]];
      return { ...current, days };
    });
  }

  function replaceStop(dayIndex: number, stopIndex: number) {
    setTrip((current) => {
      if (!current) return current;
      const used = new Set(current.days.flatMap((day) => day.stops.map((stop) => stop.destination.slug)));
      const replacement = destinations.filter((destination) => !used.has(destination.slug)).filter((destination) => !current.preferences.region || destination.region === current.preferences.region).sort((a, b) => scoreDestination(b, current.preferences) - scoreDestination(a, current.preferences))[0];
      if (!replacement) return current;
      return { ...current, days: current.days.map((day, d) => d !== dayIndex ? day : { ...day, stops: day.stops.map((stop, s) => s !== stopIndex ? stop : { destination: replacement, durationMinutes: 150, note: replacement.highlights[0] ?? replacement.summary }) }) };
    });
  }

  function saveTrip() {
    if (!trip) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
    setSaved(true);
    setMessage("Trip saved on this device.");
  }

  async function shareTrip() {
    if (!trip) return;
    const params = new URLSearchParams();
    params.set("trip", encodeTrip(trip));
    const url = `${window.location.origin}/explore/trip-planner?${params.toString()}`;
    await navigator.clipboard.writeText(url);
    setMessage("Share link copied.");
  }

  function reorderRoute() {
    setTrip((current) => {
      if (!current) return current;
      return { ...current, days: current.days.map((day) => {
        if (day.stops.length < 3) return day;
        const [first, ...rest] = day.stops;
        const ordered = [first];
        const remaining = [...rest];
        while (remaining.length) {
          const previous = ordered[ordered.length - 1].destination;
          remaining.sort((a, b) => distanceMiles(previous, a.destination) - distanceMiles(previous, b.destination));
          ordered.push(remaining.shift()!);
        }
        return { ...day, stops: ordered };
      }) };
    });
  }

  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">Trip Planner</li></ol></nav>
          <p className="eyebrow mt-8 text-primary">The Texas trip planner</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Build the route before you fill the tank.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Choose the part of Texas, the pace and the things you care about. The planner will build a practical itinerary from the Texas Defined destination guide.</p>
          {seed && <p className="eyebrow mt-6 border-t border-border pt-4 text-muted-foreground">Starting point · <strong className="text-foreground">{seed.name}</strong></p>}
        </Container>
      </section>

      <Container className="py-10 sm:py-12 print:hidden">
        <section aria-labelledby="painted-churches-planner" className="grid gap-8 border-t-2 border-foreground pt-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <p className="eyebrow text-primary">Curated heritage route</p>
            <h2 id="painted-churches-planner" className="mt-3 font-display text-4xl sm:text-5xl">Painted Churches of Texas</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Use the Schulenburg four-church loop for a focused first day, then expand to Moravia, St. John or the wider statewide historic collection. Each church guide includes its designation, visitor notes and image credits.</p>
          </div>
          <div className="border-l border-border pl-6">
            <p className="eyebrow text-muted-foreground">18 verified guides</p>
            <Link to="/explore/painted-churches" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-medium text-primary">Explore the painted churches</Link>
          </div>
        </section>
      </Container>

      <Container className="py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-16">
          <form onSubmit={submit} className="space-y-6 border-t-2 border-foreground pt-6 print:hidden">
            <div><p className="eyebrow text-primary">Build your trip</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Set the basics. You can adjust the route after it is generated.</p></div>
            <Field label="Trip title" name="title" defaultValue="My Texas trip" required />
            <label className="block"><span className="eyebrow text-muted-foreground">Region</span><select name="region" defaultValue={seed?.region ?? ""} className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary"><option value="">Anywhere in Texas</option>{regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}</select></label>
            <div className="grid grid-cols-3 gap-4"><Field label="Days" name="days" type="number" defaultValue="2" min="1" max="14" required /><Field label="Adults" name="adults" type="number" defaultValue="2" min="1" max="20" required /><Field label="Children" name="children" type="number" defaultValue="0" min="0" max="20" required /></div>
            <Field label="Max daily driving (miles)" name="maxDrivingMiles" type="number" defaultValue="150" min="25" max="500" required />
            <fieldset><legend className="eyebrow text-muted-foreground">Interests</legend><div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">{interests.map((interest) => <label key={interest} className="flex items-center gap-2 text-sm capitalize"><input type="checkbox" name="interests" value={interest} defaultChecked={["scenic", "history"].includes(interest)} />{interest}</label>)}</div></fieldset>
            <label className="flex items-start gap-2 border-t border-border pt-5 text-sm leading-6"><input type="checkbox" name="accessible" className="mt-1" /><span>Only include places with accessibility information</span></label>
            <Button type="submit" className="w-full rounded-none bg-foreground text-background hover:bg-foreground/85">Build itinerary</Button>
          </form>

          <section aria-live="polite">
            {!trip ? (
              <div className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Your route</p><h2 className="mt-3 font-display text-4xl">Start with the details on the left.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">The finished itinerary will appear here with daily stops, suggested time at each place and links back into the full Texas Defined guide.</p></div>
            ) : (
              <div className="trip-print">
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
                  <div><p className="eyebrow text-primary">Your Texas itinerary</p><h2 className="mt-2 font-display text-5xl leading-tight">{trip.title}</h2><p className="mt-3 text-sm text-muted-foreground">{trip.preferences.days} days · {trip.preferences.adults} adults{trip.preferences.children ? ` · ${trip.preferences.children} children` : ""}</p></div>
                  <div className="flex flex-wrap gap-2 print:hidden"><Button variant="outline" className="rounded-none" onClick={saveTrip}><Save />{saved ? "Saved" : "Save"}</Button><Button variant="outline" className="rounded-none" onClick={shareTrip}><Share2 />Share</Button><Button variant="outline" className="rounded-none" onClick={reorderRoute}><RefreshCw />Reorder</Button><Button variant="outline" className="rounded-none" onClick={() => window.print()}><Printer />Print</Button><Button variant="outline" className="rounded-none" onClick={() => { setTrip(null); setSaved(false); setMessage(""); window.localStorage.removeItem(STORAGE_KEY); }}><Trash2 />Clear</Button></div>
                </div>
                {message && <p className="mt-4 text-sm text-primary">{message}</p>}
                <p className="mt-6 border-y border-border py-4 text-sm leading-7 text-muted-foreground">Hours, fees, reservations, road conditions and seasonal closures can change. Verify time-sensitive details with the official source before leaving.</p>

                <div className="mt-10 space-y-14">
                  {trip.days.map((day, dayIndex) => <section key={day.day} className="break-inside-avoid"><div className="flex items-baseline gap-4 border-b border-border pb-3"><p className="eyebrow text-primary">Day {day.day}</p><h3 className="font-display text-3xl">On the route</h3></div>{day.stops.length === 0 ? <p className="mt-5 text-muted-foreground">No matching destinations were available for this day.</p> : <ol className="divide-y divide-border">{day.stops.map((stop, stopIndex) => <li key={`${stop.destination.slug}-${stopIndex}`} className="py-7"><div className="grid gap-5 sm:grid-cols-[160px_1fr_auto]"><img src={stop.destination.hero.src} alt={stop.destination.hero.alt} width={stop.destination.hero.width} height={stop.destination.hero.height} className="aspect-[4/3] w-full object-cover" /><div><p className="eyebrow text-primary">{stop.destination.nearestTown} · {regions.find((region) => region.id === stop.destination.region)?.name}</p><h4 className="mt-2 font-display text-3xl leading-tight"><Link to="/destination/$slug" params={{ slug: stop.destination.slug }} className="hover:text-primary">{stop.destination.name}</Link></h4><p className="mt-3 text-sm leading-7 text-muted-foreground">{stop.destination.summary}</p><div className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><p><span className="eyebrow mr-2 text-muted-foreground">Allow</span>{Math.round(stop.durationMinutes / 60 * 10) / 10} hours</p><p><span className="eyebrow mr-2 text-muted-foreground">Why here</span>{stop.note}</p></div>{stop.destination.officialUrl && <a href={stop.destination.officialUrl} target="_blank" rel="noreferrer" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official information</a>}</div><div className="flex gap-1 print:hidden sm:flex-col"><Button size="icon" variant="ghost" onClick={() => moveStop(dayIndex, stopIndex, -1)} disabled={stopIndex === 0} aria-label="Move stop up"><ArrowUp /></Button><Button size="icon" variant="ghost" onClick={() => moveStop(dayIndex, stopIndex, 1)} disabled={stopIndex === day.stops.length - 1} aria-label="Move stop down"><ArrowDown /></Button><Button size="sm" variant="outline" className="rounded-none" onClick={() => replaceStop(dayIndex, stopIndex)}>Swap</Button></div></div></li>)}</ol>}</section>)}
                </div>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="block"><span className="eyebrow text-muted-foreground">{label}</span><input {...props} className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none focus:border-primary" /></label>;
}
