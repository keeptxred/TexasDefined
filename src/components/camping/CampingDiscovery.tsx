import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import type { CampingDiscoveryProfile } from "@/data/camping/discovery";
import type { CampingAmenity, CampingStyle } from "@/data/camping/types";
import type { Destination } from "@/data/types";

export interface CampingDiscoveryEntry {
  profile: CampingDiscoveryProfile;
  destination?: Destination;
}

const styleLabels: Record<CampingStyle, string> = {
  tent: "Tent",
  rv: "RV",
  primitive: "Primitive",
  beach: "Beach",
  backcountry: "Backcountry",
  group: "Group",
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

function profileAnchor(profile: CampingDiscoveryProfile) {
  const profileSlug = (profile as CampingDiscoveryProfile & { profileSlug?: unknown }).profileSlug;
  return typeof profileSlug === "string" && profileSlug ? profileSlug : profile.destinationSlug;
}

export function CampingDiscovery({ entries }: { entries: CampingDiscoveryEntry[] }) {
  const [style, setStyle] = useState<CampingStyle | "all">("all");
  const [region, setRegion] = useState("all");
  const [fullHookup, setFullHookup] = useState(false);
  const [waterCamping, setWaterCamping] = useState(false);

  const filtered = useMemo(() => entries.filter(({ profile }) => {
    if (style !== "all" && !profile.styles.includes(style)) return false;
    if (region !== "all" && profile.region !== region) return false;
    if (fullHookup && !profile.amenities.includes("full-hookup")) return false;
    if (waterCamping && !profile.amenities.some((amenity) => ["lake-access", "river-access", "gulf-access", "swimming"].includes(amenity))) return false;
    return true;
  }), [entries, fullHookup, region, style, waterCamping]);

  return <>
    <div className="mt-8 grid gap-4 rounded-sm border border-border bg-background p-5 md:grid-cols-2 lg:grid-cols-4">
      <label className="text-sm"><span className="block font-semibold">Camping style</span><select value={style} onChange={(event) => setStyle(event.target.value as CampingStyle | "all")} className="mt-2 w-full border border-border bg-background px-3 py-2"><option value="all">All styles</option>{Object.entries(styleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="text-sm"><span className="block font-semibold">Region</span><select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2"><option value="all">All regions</option>{Object.entries(regionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="flex items-center gap-3 border border-border px-4 py-3 text-sm"><input type="checkbox" checked={fullHookup} onChange={(event) => setFullHookup(event.target.checked)} /><span><strong className="block">Full hookup</strong><span className="text-muted-foreground">Only when explicitly verified</span></span></label>
      <label className="flex items-center gap-3 border border-border px-4 py-3 text-sm"><input type="checkbox" checked={waterCamping} onChange={(event) => setWaterCamping(event.target.checked)} /><span><strong className="block">Water-focused</strong><span className="text-muted-foreground">Lake, river, Gulf or swimming</span></span></label>
    </div>

    <p className="mt-5 text-sm text-muted-foreground">Showing {filtered.length} of {entries.length} verified public-camping profiles. Missing amenity data means “not yet verified,” not “not available.”</p>

    <div className="mt-7 grid gap-6 lg:grid-cols-2">
      {filtered.map(({ profile, destination }) => {
        const countySlug = profile.county.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const anchor = profileAnchor(profile);
        return <article id={anchor} key={anchor} className="scroll-mt-28 border border-border bg-background p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground"><span>{regionLabels[profile.region] ?? profile.region}</span><span>·</span><span>{profile.county} County</span><span>·</span><span>Verified {profile.verifiedAt}</span></div>
          <h3 className="mt-3 font-display text-3xl leading-tight">{profile.name}</h3>
          {destination?.summary && <p className="mt-3 leading-7 text-muted-foreground">{destination.summary}</p>}
          <div className="mt-5 flex flex-wrap gap-2">{profile.styles.map((item) => <span key={item} className="border border-border px-2.5 py-1 text-xs font-semibold">{styleLabels[item]}</span>)}</div>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="font-semibold">Verified facilities</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.amenities.map((amenity) => amenityLabels[amenity] ?? amenity).join(" · ") || "No amenity fields verified yet"}</dd></div>
            <div><dt className="font-semibold">Reservations</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.reservationPolicy}</dd></div>
            {profile.siteLengthNote && <div><dt className="font-semibold">RV/site length</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.siteLengthNote}</dd></div>}
            {profile.generatorRules && <div><dt className="font-semibold">Generator rules</dt><dd className="mt-1 leading-6 text-muted-foreground">{profile.generatorRules}</dd></div>}
          </dl>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            {destination && <Link to="/destination/$slug" params={{ slug: destination.slug }} className="text-primary underline-offset-4 hover:underline">{anchor === profile.destinationSlug ? "Destination guide" : "Parent destination guide"}</Link>}
            <Link to="/$kind/$slug" params={{ kind: "county", slug: countySlug }} className="text-primary underline-offset-4 hover:underline">{profile.county} County</Link>
            <Link to="/explore/trip-planner" search={{}} className="text-primary underline-offset-4 hover:underline">Trip Planner</Link>
            <a href={profile.reservationUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">Reservations ↗</a>
          </div>
          <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">Sources: {profile.sources.map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{source.label}</a></span>)}</div>
        </article>;
      })}
    </div>
  </>;
}
