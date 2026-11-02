import { useState } from "react";
import { MapPreview } from "./MapPreview";
import { maps } from "@/services/maps";
import type { ExperiencePlace, VerifiedOffer, VisitorRoute } from "@/data/authority/experience-registry";
export type VisitorPlanningProfile = {
  title: string; subjectPlural: string; destinationSlug: string;
  places: ExperiencePlace[]; offers: VerifiedOffer[]; routes: readonly VisitorRoute[];
};

/**
 * Page-specific data; reusable comparison, map, itinerary and estimate UI.
 * The site-wide destination catalog owns all place facts. No new SEO URLs.
 */
export function VisitorPlanningToolkit({ profile }: { profile: VisitorPlanningProfile }) {
  const places = profile.places;
  const offers = profile.offers;
  const [activeSlug, setActiveSlug] = useState(places[0]?.slug ?? "");
  const [mapOpen, setMapOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>(profile.routes[0].id);
  const [partySize, setPartySize] = useState(2);
  const [selectedOffer, setSelectedOffer] = useState(offers[0]?.id ?? "");
  const [lodging, setLodging] = useState(0);
  const [food, setFood] = useState(0);
  const [transport, setTransport] = useState(0);
  const activePlace = places.find((place) => place.slug === activeSlug) ?? places[0];
  const selected = offers.find((offer) => offer.id === selectedOffer) ?? null;
  const route = profile.routes.find((item) => item.id === activeRoute)
    ?? profile.routes[0];
  const quotedPriceApplicable = Boolean(selected && partySize >= 1 && (selected.maxParty === null || partySize <= selected.maxParty));
  const costs = lodging + food + transport + (quotedPriceApplicable && selected ? partySize * selected.priceUsd : 0);
  const money = (amount: number) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(amount);
  const markers = places.flatMap((place) =>
    place.coordinates && Number.isFinite(place.coordinates.lat) && Number.isFinite(place.coordinates.lng)
      ? [{ id: place.slug, label: place.name, point: place.coordinates }] : [],
  );
  const num = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.min(100000, Math.max(0, parsed)) : 0;
  };

  return (
    <section className="mt-12 space-y-10 border-t border-border pt-10" data-authority-visitor-tools aria-label={profile.title + " visitor tools"}>
      <header>
        <p className="eyebrow text-primary">Plan with verified details</p>
        <h2 className="mt-3 font-display text-3xl">Compare {profile.subjectPlural}, plan routes and estimate your trip</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          These tools draw from the same destination records used by Texas Defined destination profiles.
          Current operator prices appear only while their verification is recent; omitted prices are unknown,
          not free. Confirm reservations, accessibility and policies directly before visiting.
        </p>
      </header>

      <section aria-labelledby="winery-compare-title">
        <h3 id="winery-compare-title" className="font-display text-2xl">Which experience fits your visit?</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-border">
                {["Winery", "Area", "Suggested visit", "Details and reservations"].map((name) =>
                  <th key={name} scope="col" className="px-3 py-3 font-semibold">{name}</th>)}
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr key={place.slug} className="border-b border-border align-top">
                  <th scope="row" className="px-3 py-3 font-semibold">{place.name}</th>
                  <td className="px-3 py-3">{place.nearestTown}</td>
                  <td className="px-3 py-3">{place.visitDuration ?? "Confirm with venue"}</td>
                  <td className="px-3 py-3">
                    <a className="text-primary underline underline-offset-4" href={place.guidePath ?? place.officialUrl}> {place.guidePath ? "Full venue guide" : "Official venue details"}</a>
                    {" · "}
                    <a className="text-primary underline underline-offset-4" href={place.reservationUrl ?? place.officialUrl} target="_blank" rel="noopener noreferrer">Official booking or details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          This is a selected, source-backed comparison—not a comprehensive winery directory.
          Unmapped locations use operator-published addresses. Each individual venue guide remains the owner of its detailed story.
        </p>
      </section>

      <section aria-labelledby="winery-prices-title">
        <h3 id="winery-prices-title" className="font-display text-2xl">Verified offering prices and durations</h3>
        {offers.length ? (
          <>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {offers.map((offer) => (
                <div key={offer.id} className="border border-border p-4">
                  <p className="font-semibold">{offer.label}</p>
                  <p className="mt-1 text-lg font-semibold">{money(offer.priceUsd)} per guest · {offer.durationMinutes === null ? "Confirm duration" : String(offer.durationMinutes) + " minutes"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {offer.maxParty === null ? "Confirm group limit" : "Up to " + offer.maxParty + " guests"} · {offer.minAge === null ? "Confirm age policy" : String(offer.minAge) + "+"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{offer.notes}</p>
                  <a className="mt-2 inline-block text-sm text-primary underline underline-offset-4"
                    href={offer.sourceUrl} target="_blank" rel="noopener noreferrer">Official experience details</a>
                  <p className="mt-1 text-xs text-muted-foreground">Checked <time dateTime={offer.checkedAt}>{offer.checkedAt}</time></p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Operator price checks have expired. Follow the official booking links in the comparison for current quotes.
          </p>
        )}
      </section>

      <section aria-labelledby="winery-map-title">
        <h3 id="winery-map-title" className="font-display text-2xl">Explore locations and routes</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a verified stop to view its location and open an interactive route map.
          Downtown tasting rooms may have different addresses from their estate winery.
        </p>
        {markers.length ? <MapPreview markers={markers} directionsLabel="Fredericksburg-area wineries" variant="list" className="mt-4" /> : null}
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Select a mapped place">
          {places.map((place) => (
            <button type="button" key={place.slug} onClick={() => setActiveSlug(place.slug)}
              aria-pressed={activeSlug === place.slug}
              className={"rounded-full border px-3 py-2 text-sm " + (activeSlug === place.slug ? "border-primary font-semibold text-primary" : "border-border")}>
              {place.name}
            </button>
          ))}
        </div>
        {activePlace ? (
          <div className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6">
            <p className="font-semibold">{activePlace.name} · {activePlace.nearestTown}</p>
            {activePlace.address ? <p>{activePlace.address}</p> : null}
            {activePlace.accessibilityNotes ? (
              <p className="mt-1 text-muted-foreground">Accessibility: {activePlace.accessibilityNotes}</p>
            ) : (
              <p className="mt-1 text-muted-foreground">Accessibility details unverified; contact the venue.</p>
            )}
            {activePlace.coordinates ? (
              <>
                <button type="button" onClick={() => setMapOpen((open) => !open)}
                  aria-expanded={mapOpen} aria-controls="authority-interactive-map"
                  className="mt-3 block rounded border border-border px-3 py-2 text-sm font-semibold text-primary">
                  {mapOpen ? "Hide interactive map" : "Show interactive map for this stop"}
                </button>
                {mapOpen ? (
                  <div id="authority-interactive-map" className="mt-3">
                    <iframe
                      title={"Interactive OpenStreetMap centered on " + activePlace.name}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="h-80 w-full border border-border"
                      src={"https://www.openstreetmap.org/export/embed.html?bbox="
                        + (activePlace.coordinates.lng - 0.035) + "%2C"
                        + (activePlace.coordinates.lat - 0.025) + "%2C"
                        + (activePlace.coordinates.lng + 0.035) + "%2C"
                        + (activePlace.coordinates.lat + 0.025)
                        + "&layer=mapnik&marker="
                        + activePlace.coordinates.lat + "%2C" + activePlace.coordinates.lng}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Map data © <a href="https://www.openstreetmap.org/copyright"
                        target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap contributors</a>.
                      Approximate view only; use live directions to plan driving.
                    </p>
                  </div>
                ) : null}
              </>
            ) : <p className="mt-2 text-xs text-muted-foreground">An embedded map is unavailable until this location has verified coordinates; use the official address link below.</p>}
            <a href={activePlace.coordinates
              ? maps.directionsUrl(activePlace.coordinates, activePlace.name)
              : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(activePlace.address ?? activePlace.name + " Texas")}
              target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary underline underline-offset-4">
              Open interactive map and current directions
            </a>
          </div>
        ) : null}
      </section>

      <section aria-labelledby="winery-routes-title">
        <h3 id="winery-routes-title" className="font-display text-2xl">Choose a realistic itinerary</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.routes.map((item) => (
            <button type="button" key={item.id} onClick={() => setActiveRoute(item.id)}
              aria-pressed={activeRoute === item.id}
              className={"rounded-full border px-3 py-2 text-sm " + (activeRoute === item.id ? "border-primary font-semibold text-primary" : "border-border")}>
              {item.duration}
            </button>
          ))}
        </div>
        <h4 className="mt-5 font-semibold">{route.label}</h4>
        <ol className="mt-3 space-y-3">
          {route.stops.map((stop) => (
            <li key={stop.time} className="grid gap-x-4 border-l-2 border-border pl-4 text-sm sm:grid-cols-[9rem_1fr]">
              <strong>{stop.time}</strong>
              <span>{stop.activity} {stop.link ? <a href={stop.link} className="text-primary underline underline-offset-4">Visit details</a> : null}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Editorial pacing only, not real-time hours, drive times, reservations or availability.
        </p>
        <a href={"/explore/trip-planner?destination=" + encodeURIComponent(profile.destinationSlug)} className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">
          Customize this trip in the Texas Trip Planner
        </a>
      </section>

      <section aria-labelledby="winery-budget-title">
        <h3 id="winery-budget-title" className="font-display text-2xl">Estimate your group budget</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Calculations stay in your browser. Add your own lodging, food and transportation allowances;
          only recent operator-published prices are prefilled.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Guests
            <input type="number" min={1} max={100} value={partySize} onChange={(event) =>
              setPartySize(Math.min(100, Math.max(1, num(event.target.value))))}
              className="mt-1 block w-full rounded border border-border bg-surface p-2" />
          </label>
          <label className="text-sm font-medium">Selected offering
            <select className="mt-1 block w-full rounded border border-border bg-surface p-2"
              value={selectedOffer} onChange={(event) => setSelectedOffer(event.target.value)}>
              <option value="">No verified offering selected</option>
              {offers.map((offer) => <option key={offer.id} value={offer.id}>{offer.label} · {money(offer.priceUsd)}</option>)}
            </select>
          </label>
          {([["Lodging total ($)", lodging, setLodging], ["Food total ($)", food, setFood],
            ["Transportation total ($)", transport, setTransport]] as const).map(([label, value, setter]) => (
            <label key={label} className="text-sm font-medium">{label}
              <input type="number" min={0} step={10} value={value}
                onChange={(event) => setter(num(event.target.value))}
                className="mt-1 block w-full rounded border border-border bg-surface p-2" />
            </label>
          ))}
        </div>
        {!quotedPriceApplicable && selected ? (
          <p className="mt-3 text-sm text-primary" role="status">
            This published tasting is limited to {selected.maxParty} guests; its tasting charge is excluded from this estimate.
            Contact the operator for a large-group quote.
          </p>
        ) : null}
        <p className="mt-5 border-t border-border pt-4 text-xl font-semibold" aria-live="polite">
          Planning total: {money(costs)}
          <span className="ml-3 text-sm font-normal text-muted-foreground">({money(costs / Math.max(1, partySize))} per guest)</span>
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Not a booking offer. Taxes, tips, additional tastings, deposits and unentered expenses are excluded.
          Confirm the current price and availability with the operator.
        </p>
      </section>
    </section>
  );
}
