import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import type { CampingDiscoveryProfile } from "@/data/camping/discovery";
import type { CampingAmenity, CampingStyle } from "@/data/camping/types";

export interface CampingDiscoveryEntry {
  profile: CampingDiscoveryProfile;
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
  { value: "showers", label: "Showers" },
  { value: "fishing", label: "Fishing" },
  { value: "swimming", label: "Swimming" },
  { value: "ada-site", label: "Accessible site" },
  { value: "pets", label: "Pet friendly" },
];

function profileAnchor(profile: CampingDiscoveryProfile) {
  return profile.profileSlug || profile.destinationSlug;
}

function toggleValue<T extends string>(current: T[], value: T) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export function CampingDiscovery({ entries }: { entries: CampingDiscoveryEntry[] }) {
  const [query, setQuery] = useState("");
  const [styles, setStyles] = useState<CampingStyle[]>([]);
  const [region, setRegion] = useState("all");
  const [amenities, setAmenities] = useState<CampingAmenity[]>([]);
  const [waterCamping, setWaterCamping] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter(({ profile }) => {
      if (styles.length && !styles.some((style) => profile.styles.includes(style))) return false;
      if (region !== "all" && profile.region !== region) return false;
      if (amenities.length && !amenities.every((amenity) => profile.amenities.includes(amenity))) return false;
      if (waterCamping && !profile.amenities.some((amenity) => ["lake-access", "river-access", "gulf-access", "swimming"].includes(amenity))) return false;
      if (normalizedQuery) {
        const haystack = [
          profile.name,
          profile.county,
          profile.managingAgency,
          regionLabels[profile.region] ?? profile.region,
          profile.destinationSlug,
          profile.profileSlug,
        ].filter(Boolean).join(" ").toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [amenities, entries, query, region, styles, waterCamping]);

  const hasFilters = Boolean(query || styles.length || region !== "all" || amenities.length || waterCamping);

  const reset = () => {
    setQuery("");
    setStyles([]);
    setRegion("all");
    setAmenities([]);
    setWaterCamping(false);
  };

  return <>
    <div className="mt-8 border border-border bg-background p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <label className="text-sm">
          <span className="block font-semibold">Where do you want to camp?</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Park, campground, county or agency"
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
      </div>

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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground" aria-live="polite">Showing <strong className="text-foreground">{filtered.length}</strong> of {entries.length} verified profiles.</p>
        {hasFilters ? <button type="button" onClick={reset} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Clear all filters</button> : null}
      </div>
    </div>

    {filtered.length ? <div className="mt-7 grid gap-6 lg:grid-cols-2">
      {filtered.map(({ profile }) => {
        const countySlug = profile.county.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const anchor = profileAnchor(profile);
        const isParentDestination = anchor === profile.destinationSlug;
        return <article id={anchor} key={anchor} className="scroll-mt-28 overflow-hidden border border-border bg-background">
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <span>{regionLabels[profile.region] ?? profile.region}</span><span>·</span><span>{profile.county} County</span><span>·</span><span>Verified {profile.verifiedAt}</span>
            </div>
            <h3 className="mt-3 font-display text-3xl leading-tight">{profile.name}</h3>
            {!isParentDestination ? <p className="mt-2 text-sm font-semibold text-primary">Campground profile</p> : null}
            <p className="mt-3 leading-7 text-muted-foreground">{profile.reservationPolicy}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.styles.map((item) => <span key={item} className="border border-border px-2.5 py-1 text-xs font-semibold">{styleLabels[item]}</span>)}
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="font-semibold">Verified facilities</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.amenities.map((amenity) => amenityLabels[amenity] ?? amenity).join(" · ") || "No amenity fields verified yet"}</dd></div>
              {profile.siteLengthNote ? <div><dt className="font-semibold">RV/site length</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.siteLengthNote}</dd></div> : null}
              {profile.generatorRules ? <div><dt className="font-semibold">Generator rules</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.generatorRules}</dd></div> : null}
            </dl>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <Link to="/destination/$slug" params={{ slug: profile.destinationSlug }} className="text-primary underline-offset-4 hover:underline">{isParentDestination ? "Destination guide" : "Parent destination guide"}</Link>
              <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="text-primary underline-offset-4 hover:underline">{profile.county} County</Link>
              <a href={profile.reservationUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">Official reservations/details ↗</a>
            </div>

            <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
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
