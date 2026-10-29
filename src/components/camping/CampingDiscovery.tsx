import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import type { CampingDiscoveryProfile } from "@/data/camping/discovery";
import { hasCampingDestinationGuide } from "@/data/camping/destination-guides";
import type { CampingAmenity, CampingStyle } from "@/data/camping/types";
import { CAMPING_OPERATIONAL_ALERTS } from "@/data/camping/official-alerts.generated";

export interface CampingDiscoveryEntry {
  profile: CampingDiscoveryProfile;
}

/**
 * These researched camping profiles have a verified TPWD visitor guide, but
 * their draft TexasDefined destination URLs currently return 404 or a redirect.
 * Never advertise a non-existent on-site authority page or hydrate a trip
 * planner from an unavailable destination merely because the camping profile
 * is complete. Switch back to our own canonical guide only after a live
 * indexability audit verifies it.
 */
const OFFICIAL_ONLY_CAMPING_DESTINATIONS: Readonly<Record<string, string>> = {
  "palo-pinto-mountains-state-park": "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
  "ray-roberts-lake-state-park": "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
  "seminole-canyon-state-park-and-historic-site": "https://tpwd.texas.gov/state-parks/seminole-canyon",
};

// TPWD's generic portal discards the park context. The park-specific official
// campsite page is a safer first step unless a verified deep booking URL exists.
function reservationDestination(profile: CampingDiscoveryProfile) {
  if (profile.reservationUrl === "https://tpwd.texas.gov/state-parks/reservations/") {
    const campsites = profile.sources.find(({ url }) => /^https:\/\/tpwd\.texas\.gov\/state-parks\/.+\/fees-facilities\/campsites\/?$/.test(url));
    return { url: campsites?.url ?? profile.reservationUrl, direct: false };
  }
  return { url: profile.reservationUrl, direct: /recreation\.gov\/camping\/campgrounds\/\d+/.test(profile.reservationUrl) };
}

const styleLabels: Record<CampingStyle, string> = {
  tent: "Tent",
  rv: "RV",
  primitive: "Primitive",
  beach: "Beach",
  backcountry: "Backcountry",
  group: "Group",
  cabin: "Cabin",
  glamping: "Glamping",
  airstream: "Airstream",
  bungalow: "Bungalow",
};

const amenityLabels: Partial<Record<CampingAmenity, string>> = {
  "electric-hookup": "Electric hookup",
  "electric-20": "20 amp",
  "electric-30": "30 amp",
  "electric-50": "50 amp",
  "water-hookup": "Water hookup",
  "sewer-hookup": "Sewer hookup",
  "full-hookup": "Full hookup",
  "dump-station": "Dump station",
  restrooms: "Restrooms",
  showers: "Showers",
  "ada-site": "ADA site",
  pets: "Pet friendly",
  shade: "Shade",
  swimming: "Swimming",
  "lake-access": "Lake access",
  "river-access": "River access",
  "gulf-access": "Gulf access",
  fishing: "Fishing",
  hiking: "Hiking",
};

const regionLabels: Record<string, string> = {
  "hill-country": "Hill Country",
  "gulf-coast": "Gulf Coast",
  "big-bend": "Big Bend & West Texas",
  panhandle: "Panhandle",
  "piney-woods": "Piney Woods",
  "prairies-lakes": "Prairies & Lakes",
  "south-texas": "South Texas",
};

const amenityFilters: Array<{ value: CampingAmenity; label: string }> = [
  { value: "full-hookup", label: "Full hookup" },
  { value: "electric-hookup", label: "Electric service" },
  { value: "restrooms", label: "Restrooms" },
  { value: "showers", label: "Showers" },
  { value: "fishing", label: "Fishing" },
  { value: "hiking", label: "Hiking" },
  { value: "swimming", label: "Swimming" },
  { value: "ada-site", label: "Accessible site" },
  { value: "pets", label: "Pet friendly" },
];

const comparisonAmenityGroups: Array<{ label: string; amenities: CampingAmenity[] }> = [
  { label: "Hookups & electrical", amenities: ["full-hookup", "electric-hookup", "electric-20", "electric-30", "electric-50", "water-hookup", "sewer-hookup", "dump-station"] },
  { label: "Restrooms & showers", amenities: ["restrooms", "showers"] },
  { label: "Water & activities", amenities: ["lake-access", "river-access", "gulf-access", "swimming", "fishing", "hiking"] },
];

const quickMatches: Array<{
  label: string;
  styles?: CampingStyle[];
  amenities?: CampingAmenity[];
  waterCamping?: boolean;
}> = [
  { label: "Full-hookup RV", styles: ["rv"], amenities: ["full-hookup"] },
  { label: "Beach camping", styles: ["beach"] },
  { label: "Primitive camping", styles: ["primitive"] },
  { label: "Cabins & glamping", styles: ["cabin", "glamping", "airstream", "bungalow"] },
  { label: "Fishing", amenities: ["fishing"] },
  { label: "Swimming", amenities: ["swimming"] },
  { label: "Water-focused", waterCamping: true },
  { label: "Accessible sites", amenities: ["ada-site"] },
  { label: "Pet friendly", amenities: ["pets"] },
];

const metroShortcuts = [
  { label: "Houston area", query: "Houston" },
  { label: "Austin area", query: "Austin" },
  { label: "San Antonio area", query: "San Antonio" },
  { label: "Dallas area", query: "Dallas" },
  { label: "Fort Worth area", query: "Fort Worth" },
] as const;

// This finder deliberately uses text-first profile cards: a park-wide photo or
// wildlife close-up is not a verified photograph of an individual campground.
// Only introduce site-specific imagery with traceable subject and usage rights.
function profileAnchor(profile: CampingDiscoveryProfile) {
  return profile.profileSlug || profile.destinationSlug;
}

function toggleValue<T extends string>(current: T[], value: T) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function profileMatchesAmenity(profile: CampingDiscoveryProfile, amenity: CampingAmenity) {
  if (amenity === "electric-hookup") {
    return profile.amenities.some((item) => ["electric-hookup", "electric-20", "electric-30", "electric-50", "full-hookup"].includes(item));
  }
  return profile.amenities.includes(amenity);
}

function verifiedAmenityText(profile: CampingDiscoveryProfile, amenities: CampingAmenity[]) {
  const values = amenities.filter((amenity) => profile.amenities.includes(amenity));
  return values.length ? values.map((amenity) => amenityLabels[amenity] ?? amenity).join(" · ") : "Not verified in this guide";
}

export function CampingDiscovery({ entries }: { entries: CampingDiscoveryEntry[] }) {
  const [query, setQuery] = useState("");
  const [styles, setStyles] = useState<CampingStyle[]>([]);
  const [region, setRegion] = useState("all");
  const [agency, setAgency] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [amenities, setAmenities] = useState<CampingAmenity[]>([]);
  const [waterCamping, setWaterCamping] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const agencies = useMemo(
    () => [...new Set(entries.map(({ profile }) => profile.managingAgency))].sort((a, b) => a.localeCompare(b)),
    [entries],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = entries.filter(({ profile }) => {
      if (styles.length && !styles.some((style) => profile.styles.includes(style))) return false;
      if (region !== "all" && profile.region !== region) return false;
      if (agency !== "all" && profile.managingAgency !== agency) return false;
      if (amenities.length && !amenities.every((amenity) => profileMatchesAmenity(profile, amenity))) return false;
      if (waterCamping && !profile.amenities.some((amenity) => ["lake-access", "river-access", "gulf-access", "swimming"].includes(amenity))) return false;
      if (normalizedQuery) {
        const haystack = [
          profile.name,
          profile.county,
          profile.managingAgency,
          regionLabels[profile.region] ?? profile.region,
          profile.destinationSlug,
          profile.profileSlug,
          ...(profile.searchTerms ?? []),
        ].filter(Boolean).join(" ").toLowerCase();
        const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
        if (!queryTokens.every((token) => haystack.includes(token))) return false;
      }
      return true;
    });
    if (sortBy === "name") return [...matches].sort((a, b) => a.profile.name.localeCompare(b.profile.name));
    if (sortBy === "region") return [...matches].sort((a, b) => (regionLabels[a.profile.region] ?? a.profile.region).localeCompare(regionLabels[b.profile.region] ?? b.profile.region) || a.profile.name.localeCompare(b.profile.name));
    if (sortBy === "verified") return [...matches].sort((a, b) => b.profile.verifiedAt.localeCompare(a.profile.verifiedAt) || a.profile.name.localeCompare(b.profile.name));
    // Keep each national/state park overview beside its individual campgrounds
    // without affecting explicit alphabetical, region or date sorting.
    const firstByDestination = new Map<string, number>();
    entries.forEach(({ profile }, index) => {
      if (!firstByDestination.has(profile.destinationSlug)) firstByDestination.set(profile.destinationSlug, index);
    });
    return [...matches].sort((a, b) =>
      (firstByDestination.get(a.profile.destinationSlug) ?? 0) - (firstByDestination.get(b.profile.destinationSlug) ?? 0)
      || Number(profileAnchor(a.profile) !== a.profile.destinationSlug) - Number(profileAnchor(b.profile) !== b.profile.destinationSlug)
      || a.profile.name.localeCompare(b.profile.name)
    );
  }, [agency, amenities, entries, query, region, sortBy, styles, waterCamping]);

  const comparedProfiles = useMemo(
    () => compareIds
      .map((id) => entries.find(({ profile }) => profileAnchor(profile) === id)?.profile)
      .filter((profile): profile is CampingDiscoveryProfile => Boolean(profile)),
    [compareIds, entries],
  );

  const hasFilters = Boolean(query || styles.length || region !== "all" || agency !== "all" || amenities.length || waterCamping);

  const toggleComparison = (profile: CampingDiscoveryProfile) => {
    const id = profileAnchor(profile);
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  };

  const reset = () => {
    setQuery("");
    setStyles([]);
    setRegion("all");
    setAgency("all");
    setSortBy("recommended");
    setAmenities([]);
    setWaterCamping(false);
  };

  const applyQuickMatch = (match: (typeof quickMatches)[number]) => {
    setQuery("");
    setRegion("all");
    setAgency("all");
    setStyles(match.styles ?? []);
    setAmenities(match.amenities ?? []);
    setWaterCamping(Boolean(match.waterCamping));
  };

  return <>
    <div className="mt-8 border border-border bg-background p-5 md:p-6">
      <div>
        <p className="text-sm font-semibold">Quick matches</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">Start with a common trip type, then fine-tune the filters below.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickMatches.map((match) => <button
            key={match.label}
            type="button"
            onClick={() => applyQuickMatch(match)}
            className="border border-border bg-muted/30 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-muted"
          >{match.label}</button>)}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-sm font-semibold">Camp near a major metro</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {metroShortcuts.map((item) => <button
            key={item.label}
            type="button"
            onClick={() => {
              setQuery(item.query);
              setRegion("all");
              setAgency("all");
            }}
            className="border border-border bg-background px-3 py-2 text-sm font-semibold text-primary"
          >{item.label}</button>)}
        </div>
      </div>

      <div className="mt-6 grid gap-5 border-t border-border pt-6 lg:grid-cols-3">
        <label className="text-sm">
          <span className="block font-semibold">Where do you want to camp?</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Park, campground, county, agency or nearby city"
            className="mt-2 w-full border border-border bg-background px-3 py-3"
          />
        </label>
        <label className="text-sm">
          <span className="block font-semibold">Region</span>
          <select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-3">
            <option value="all">All Texas regions</option>
            {Object.entries(regionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="block font-semibold">Managing agency</span>
          <select value={agency} onChange={(event) => setAgency(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-3">
            <option value="all">All managing agencies</option>
            {agencies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <details className="mt-5 border-t border-border pt-4">
        <summary className="cursor-pointer py-2 text-sm font-semibold text-primary">More filters: camping styles, facilities and sorting</summary>
        <div className="mt-3">
      <label className="block max-w-xs text-sm">
        <span className="block font-semibold">Sort results</span>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-3">
          <option value="recommended">TexasDefined order</option>
          <option value="name">Name A–Z</option>
          <option value="region">Region</option>
          <option value="verified">Most recently verified</option>
        </select>
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Camping style <span className="font-normal text-muted-foreground">· choose one or more</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(styleLabels).map(([value, label]) => {
            const style = value as CampingStyle;
            const checked = styles.includes(style);
            return <label key={value} className={`cursor-pointer border px-3 py-2 text-sm font-semibold transition-colors ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}>
              <input type="checkbox" checked={checked} onChange={() => setStyles((current) => toggleValue(current, style))} className="sr-only" />
              {label}
            </label>;
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Verified facilities & trip features</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {amenityFilters.map(({ value, label }) => {
            const checked = amenities.includes(value);
            return <label key={value} className={`cursor-pointer border px-3 py-2 text-sm font-semibold transition-colors ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}>
              <input type="checkbox" checked={checked} onChange={() => setAmenities((current) => toggleValue(current, value))} className="sr-only" />
              {label}
            </label>;
          })}
          <label className={`cursor-pointer border px-3 py-2 text-sm font-semibold transition-colors ${waterCamping ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}>
            <input type="checkbox" checked={waterCamping} onChange={(event) => setWaterCamping(event.target.checked)} className="sr-only" />
            Water-focused
          </label>
        </div>
      </fieldset>

        </div>
      </details>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground" aria-live="polite">Showing <strong className="text-foreground">{filtered.length}</strong> of {entries.length} verified profiles. Recommended results group individual campgrounds with their parent destinations.</p>
        {hasFilters ? <button type="button" onClick={reset} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Clear all filters</button> : null}
      </div>
    </div>

    {comparedProfiles.length ? <section id="campground-comparison" className="mt-7 border border-border bg-background p-5 md:p-6" aria-labelledby="campground-comparison-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">Compare campgrounds</p>
          <h3 id="campground-comparison-heading" className="mt-2 font-display text-3xl">Compare up to 3 verified profiles</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{comparedProfiles.length === 1 ? "Add at least one more campground to compare the verified details side by side." : "Use the same verified fields from the finder to compare the practical differences before opening the official reservation pages."}</p>
        </div>
        <button type="button" onClick={() => setCompareIds([])} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Clear comparison</button>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {comparedProfiles.map((profile) => <article key={profileAnchor(profile)} className="border border-border bg-muted/30 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span>{regionLabels[profile.region] ?? profile.region}</span><span>·</span><span>{profile.county} County</span>
          </div>
          <h4 className="mt-3 font-display text-2xl leading-tight">{profile.name}</h4>
          {profile.whyCampHere ? <p className="mt-3 text-sm leading-6 text-foreground">{profile.whyCampHere}</p> : null}
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="font-semibold">Camping styles</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.styles.map((style) => styleLabels[style]).join(" · ")}</dd></div>
            {comparisonAmenityGroups.map((group) => <div key={group.label}><dt className="font-semibold">{group.label}</dt><dd className="mt-1 leading-6 text-muted-foreground">{verifiedAmenityText(profile, group.amenities)}</dd></div>)}
            <div><dt className="font-semibold">Accessibility</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.amenities.includes("ada-site") ? "Accessible campsite feature verified" : "Not verified in this guide"}</dd></div>
            <div><dt className="font-semibold">Pet policy</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.amenities.includes("pets") ? "Pet-friendly camping verified" : "Not verified in this guide"}</dd></div>
            <div><dt className="font-semibold">Managed by</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.managingAgency}</dd></div>
            <div><dt className="font-semibold">Reservations</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.reservationPolicy}</dd></div>
            {profile.planningDetail ? <div><dt className="font-semibold">Planning detail</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.planningDetail}</dd></div> : null}
            {profile.siteLengthNote ? <div><dt className="font-semibold">RV/site length</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.siteLengthNote}</dd></div> : null}
            {profile.generatorRules ? <div><dt className="font-semibold">Generator rules</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.generatorRules}</dd></div> : null}
            <div><dt className="font-semibold">Source verification</dt><dd className="mt-1 leading-6 text-muted-foreground">Verified {profile.verifiedAt}</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            <a href={reservationDestination(profile).url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Official campground instructions ↗</a>
            <button type="button" onClick={() => toggleComparison(profile)} className="text-primary underline-offset-4 hover:underline">Remove</button>
          </div>
        </article>)}
      </div>
    </section> : null}

    {filtered.length ? <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
      {filtered.map(({ profile }) => {
        const countySlug = profile.county.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const anchor = profileAnchor(profile);
        const isParentDestination = anchor === profile.destinationSlug;
        const officialOnlyGuide = OFFICIAL_ONLY_CAMPING_DESTINATIONS[profile.destinationSlug];
        const hasDestinationGuide = hasCampingDestinationGuide(profile.destinationSlug) && !officialOnlyGuide;
        const selectedForCompare = compareIds.includes(anchor);
        const compareLimitReached = compareIds.length >= 3 && !selectedForCompare;
        const alert = CAMPING_OPERATIONAL_ALERTS.find((item) => item.destinationSlug === profile.destinationSlug);
        return <article id={anchor} key={anchor} className="scroll-mt-28 overflow-hidden border border-border bg-background">
          <div className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <span>{regionLabels[profile.region] ?? profile.region}</span><span>·</span><span>{profile.county} County</span><span>·</span><span>Verified {profile.verifiedAt}</span>
            </div>
            <h3 className="mt-2 font-display text-2xl leading-snug">{profile.name}</h3>
            {alert ? <aside className="mt-4 border-l-4 border-primary bg-muted/30 p-4 text-sm leading-6 text-foreground" aria-label={`Official park notice for ${profile.name}`}>
              <strong>{alert.status === "confirmed" ? "Official park advisory" : "Park notice changed — recheck"}</strong>
              <p className="mt-1">{alert.notice}</p>
              <p className="mt-1 text-xs">{alert.status === "confirmed" ? "Advisory verified" : "Advisory last checked"}: {alert.checkedAt}. Conditions may change sooner.</p>
              <a className="underline font-semibold" href={alert.sourceUrl} target="_blank" rel="noopener noreferrer">{alert.sourceUrl.includes("nps.gov") ? "Read current NPS conditions ↗" : "Read current TPWD park alerts ↗"}</a>
            </aside> : null}
            {!isParentDestination ? <p className="mt-2 text-sm font-semibold text-primary">Campground profile</p> : null}
            {profile.whyCampHere ? <p className="mt-3 text-sm leading-6 text-foreground">{profile.whyCampHere}</p> : null}
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Managed by {profile.managingAgency}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.styles.map((item) => <span key={item} className="border border-border bg-muted/20 px-2 py-1 text-xs font-semibold">{styleLabels[item]}</span>)}
            </div>

            <details className="group mt-4 border-t border-border pt-3">
              <summary className="cursor-pointer py-1 text-sm font-semibold text-primary">Facilities, reservations &amp; site rules</summary>
              <dl className="mt-3 space-y-3 text-sm">
                        <div><dt className="font-semibold">Verified facilities</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.amenities.map((amenity) => amenityLabels[amenity] ?? amenity).join(" · ") || "No amenity fields verified yet"}</dd></div>
              <div><dt className="font-semibold">Reservations</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.reservationPolicy}</dd></div>
              {profile.planningDetail ? <div><dt className="font-semibold">Planning detail</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.planningDetail}</dd></div> : null}
              {profile.siteLengthNote ? <div><dt className="font-semibold">RV/site length</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.siteLengthNote}</dd></div> : null}
              {profile.generatorRules ? <div><dt className="font-semibold">Generator rules</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.generatorRules}</dd></div> : null}
              </dl>
            </details>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <button
                type="button"
                aria-pressed={selectedForCompare}
                disabled={compareLimitReached}
                onClick={() => toggleComparison(profile)}
                className={selectedForCompare ? "border border-primary bg-muted/30 px-3 py-2 text-primary" : "border border-border px-3 py-2 text-primary"}
              >{selectedForCompare ? "Added to compare" : compareLimitReached ? "Compare limit reached" : "Compare"}</button>
              {hasDestinationGuide ? <Link to="/destination/$slug" params={{ slug: profile.destinationSlug }} className="text-primary underline-offset-4 hover:underline">{isParentDestination ? "Destination guide" : "Parent destination guide"}</Link> : null}
              {hasDestinationGuide ? <Link to="/explore/trip-planner" search={{ destination: profile.destinationSlug }} className="text-primary underline-offset-4 hover:underline">Build trip</Link> : null}
              {officialOnlyGuide ? <a href={officialOnlyGuide} target="_blank" rel="noreferrer noopener" className="text-primary underline-offset-4 hover:underline">Official park guide ↗</a> : null}
              <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="text-primary underline-offset-4 hover:underline">{profile.county} County</Link>
              <a href={reservationDestination(profile).url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">{reservationDestination(profile).direct ? "Book this campground ↗" : "Park camping / reservation instructions ↗"}</a>
            </div>

            <div className="mt-4 border-t border-border pt-3 text-xs leading-5 text-muted-foreground">
              Sources: {profile.sources.map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{source.label}</a></span>)}
            </div>
          </div>
        </article>;
      })}
    </div> : <div className="mt-7 border border-border bg-background p-8 text-center">
      <h3 className="font-display text-2xl">No verified campground matches those filters yet.</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Try removing one facility requirement or clearing the region. Missing data is treated as unverified instead of assuming an amenity is present.</p>
      <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline">Clear all filters</button>
    </div>}
  </>;
}
