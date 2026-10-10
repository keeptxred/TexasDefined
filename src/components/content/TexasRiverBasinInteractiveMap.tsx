import { useEffect, useMemo, useState } from "react";

const gisLayer = "https://gis1.twdb.texas.gov/server/rest/services/WSC-GW-Modeling/GM_Admin_Boundaries/MapServer/0";
const gisMetadata = `${gisLayer}?f=pjson`;
const gisQuery = `${gisLayer}/query?where=1%3D1&outFields=Basin%2CBAYS&returnGeometry=true&outSR=4326&geometryPrecision=3&maxAllowableOffset=0.025&f=geojson`;
const twdbDirectory = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp";

type Ring = number[][];
type AreaGeometry = { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };
type BasinFeature = { type: "Feature"; properties: { Basin?: string; BAYS?: number }; geometry: AreaGeometry };
type BasinCollection = { type: "FeatureCollection"; features: BasinFeature[] };
const normalize = (value: string) => value.replace(/[^a-z0-9]/gi, "").toLowerCase();
const majorNames = ["Brazos", "Canadian", "Colorado", "Cypress", "Guadalupe", "Lavaca", "Neches", "Nueces", "Red", "Rio Grande", "Sabine", "San Antonio", "San Jacinto", "Sulphur", "Trinity"];
const majorKeys = new Set(majorNames.map(normalize));
const x = (lon: number) => ((lon + 107.2) / 14.8) * 1000;
const y = (lat: number) => ((36.7 - lat) / 11.3) * 760;
const n = (number: number) => Math.round(number * 10) / 10;
function polygons(feature: BasinFeature): Ring[][] {
  return feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
}
function svgPath(feature: BasinFeature) {
  return polygons(feature).map((polygon) => polygon.map((ring) => ring
    .filter((point) => point.length >= 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat], index) => `${index ? "L" : "M"}${n(x(lon))},${n(y(lat))}`)
    .join(" ") + " Z").join(" ")).join(" ");
}
function bounds(features: BasinFeature[]) {
  const pts = features.flatMap((feature) => polygons(feature).flat(2));
  if (!pts.length) return "0 0 1000 760";
  const xs = pts.map((point) => x(point[0])), ys = pts.map((point) => y(point[1]));
  const left = Math.max(0, Math.min(...xs) - 65), right = Math.min(1000, Math.max(...xs) + 65);
  const top = Math.max(0, Math.min(...ys) - 65), bottom = Math.min(760, Math.max(...ys) + 65);
  return `${left} ${top} ${Math.max(50, right - left)} ${Math.max(50, bottom - top)}`;
}
/** TWDB returns upper-case names, e.g. BRAZOS-COLORADO (a coastal basin). */
function displayName(raw: string) {
  const title = raw.replace(/_+/g, " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()).replaceAll("-", "–");
  return isMajor(raw) ? `${title} River Basin` : `${title} Coastal Basin`;
}
function isMajor(value: string) {
  return majorKeys.has(normalize(value));
}
const basinGuidePaths: Record<string, string> = {
  brazos: "/article/texas-brazos-river-guide",
  canadian: "/article/texas-canadian-river-guide",
  colorado: "/article/texas-colorado-river-guide",
  cypress: "/article/texas-cypress-river-basin-guide",
  guadalupe: "/article/texas-guadalupe-river-guide",
  lavaca: "/article/texas-lavaca-river-guide",
  neches: "/article/texas-neches-river-guide",
  nueces: "/article/texas-nueces-river-guide",
  red: "/article/texas-red-river-guide",
  riogrande: "/article/texas-rio-grande-river-guide",
  sabine: "/article/texas-sabine-river-guide",
  sanantonio: "/article/texas-san-antonio-river-guide",
  sanjacinto: "/article/texas-san-jacinto-river-guide",
  sulphur: "/article/texas-sulphur-river-guide",
  trinity: "/article/texas-trinity-river-guide",
};
const originalView = "0 0 1000 760";

/** TWDB supplies the coordinates; none of the boundaries are drawn from editorial guesses. */
export function TexasRiverBasinInteractiveMap() {
  const [loaded, setLoaded] = useState(false);
  const [features, setFeatures] = useState<BasinFeature[]>([]);
  const [error, setError] = useState("");
  const [active, setActive] = useState("");
  const [showCoastal, setShowCoastal] = useState(true);
  const [showBays, setShowBays] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const controller = new AbortController();
    fetch(gisQuery, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("TWDB GIS service unavailable"); return response.json(); })
      .then((json: BasinCollection) => {
        if (!Array.isArray(json.features)) throw new Error("TWDB GIS response was not a feature collection");
        const verified = json.features.filter((feature) => feature?.properties?.Basin && feature.geometry &&
          ["Polygon", "MultiPolygon"].includes(feature.geometry.type));
        if (!verified.length) throw new Error("No mapped basins were returned");
        setFeatures(verified);
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Map data could not be loaded");
      });
    return () => controller.abort();
  }, [loaded]);

  const basinNames = useMemo(() => Array.from(new Set(features.map((f) => f.properties.Basin ?? "").filter(Boolean))).sort(), [features]);
  const visible = useMemo(() => features.filter((f) => (showBays || f.properties.BAYS !== 1) &&
    (showCoastal || isMajor(f.properties.Basin ?? ""))), [features, showBays, showCoastal]);
  const selected = visible.filter((f) => (f.properties.Basin ?? "") === active);
  const viewBox = zoom && selected.length ? bounds(selected) : originalView;
  const activeGuidePath = basinGuidePaths[normalize(active)];
  return (
    <section className="mt-7 rounded-sm border border-border bg-background" aria-labelledby="interactive-texas-basin-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">2023 official GIS · interactive atlas</p>
          <h3 id="interactive-texas-basin-heading" className="mt-2 font-display text-2xl sm:text-3xl">Explore the actual Texas river basin boundaries</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Explore the Texas Water Development Board's official August 7, 2023 basin polygons. Select a basin,
            show or hide coastal basins and bays, and magnify its watershed. These are <strong>drainage boundaries</strong>,
            not the river channel, launch points or surveyed property lines.
          </p>
        </div>
        {!loaded && <button type="button" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" onClick={() => setLoaded(true)}>Load interactive basin map</button>}
      </div>
      {loaded && !features.length && !error ? <p role="status" className="border-t border-border p-6 text-sm">Requesting generalized watershed polygons directly from the TWDB mapping service…</p> : null}
      {error ? <p role="alert" className="border-t border-border p-6 text-sm text-muted-foreground">The live TWDB GIS layer is temporarily unavailable or blocks this browser. The official PDF map above and the published basin comparison below remain available. <a href={gisMetadata} target="_blank" rel="noreferrer" className="text-primary underline">Open TWDB source metadata ↗</a></p> : null}
      {features.length > 0 && (
        <div className="grid border-t border-border lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="relative overflow-hidden bg-surface p-2 sm:p-5">
            <div className="mb-2 flex flex-wrap items-center gap-x-5 gap-y-2 px-2 text-xs text-muted-foreground" aria-label="Basin map legend">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-3 w-4 border border-[#456779] bg-[#638f9b]" />15 major river basins</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-3 w-4 border border-[#456779] bg-[#c9b79c]" />8 coastal basins</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block h-3 w-4 border-2 border-[#572c1c] bg-[#bf754f]" />Selected watershed</span>
            </div>
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" role="img"
              aria-label={`Official 2023 TWDB river basin polygons. ${active || "All visible watersheds"} highlighted.`}
              className="h-auto w-full" style={{ maxHeight: 620 }}>
              {visible.map((feature, idx) => {
                const name = feature.properties.Basin ?? "";
                const isActive = active === name;
                return <path key={name + "-" + idx} d={svgPath(feature)} fill={isActive ? "#bf754f" : isMajor(name) ? "#638f9b" : "#c9b79c"}
                  fillOpacity={isActive ? 0.8 : active ? 0.22 : 0.55}
                  stroke={isActive ? "#572c1c" : "#456779"} strokeWidth={isActive ? 2.6 : 0.65}
                  vectorEffect="non-scaling-stroke" fillRule="evenodd"
                  role="button" tabIndex={0} aria-label={`Select ${displayName(name)} basin`}
                  aria-pressed={isActive} onClick={() => setActive(name)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(name); } }}>
                  <title>{displayName(name)} basin</title>
                </path>;
              })}
            </svg>
            <p className="px-2 py-2 text-xs leading-5 text-muted-foreground">Mapped outlines are simplified for screen display using an ArcGIS spatial tolerance. Zoom is for orientation, not legal, survey, or navigational use. Basins include tributary watersheds; the map does not show their channels.</p>
          </div>
          <div className="border-t border-border p-4 lg:border-l lg:border-t-0">
            <label htmlFor="texas-basin-selector" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose watershed</label>
            <select id="texas-basin-selector" value={active} onChange={(event) => { setActive(event.target.value); setZoom(false); }}
              className="mt-2 w-full rounded-sm border border-border bg-background p-2 text-sm">
              <option value="">All basins</option>
              {basinNames.filter((name) => showCoastal || isMajor(name)).map((name) => <option key={name} value={name}>{displayName(name)}</option>)}
            </select>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={showCoastal} onChange={(event) => { setShowCoastal(event.target.checked); setActive(""); setZoom(false); }} />Show eight coastal basins</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={showBays} onChange={(event) => setShowBays(event.target.checked)} />Include bay polygons</label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" disabled={!active} onClick={() => setZoom(!zoom)} className="rounded-sm border border-border px-3 py-2 text-sm disabled:opacity-40">{zoom ? "Full Texas view" : "Zoom to selection"}</button>
              <button type="button" onClick={() => { setActive(""); setZoom(false); }} className="rounded-sm border border-border px-3 py-2 text-sm">Reset</button>
            </div>
            {active && <div className="mt-5 border-t border-border pt-4 text-sm">
              <p role="status"><strong>{displayName(active)}</strong><span className="block text-muted-foreground">Selected watershed; actual boundaries provided by TWDB.</span></p>
              {activeGuidePath ? (
                <a href={activeGuidePath} className="mt-3 inline-block font-semibold text-primary underline underline-offset-2">
                  Read the {displayName(active)} guide →
                </a>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">This is one of the eight coastal drainages between the larger named river basins. Use the TWDB directory below for primary-source context.</p>
              )}
            </div>}
            <p className="mt-6 text-xs leading-5 text-muted-foreground">Source: TWDB Groundwater Modeling / GM_MajorBasins, edited August 7, 2023. Requires access to the public TWDB GIS service. No third-party advertising, account, or location access.</p>
            <a href={gisMetadata} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-semibold text-primary underline">Official GIS layer / metadata ↗</a>
            <a href={twdbDirectory} target="_blank" rel="noreferrer" className="mt-2 block text-xs font-semibold text-primary underline">TWDB descriptions of all 23 basins ↗</a>
          </div>
        </div>
      )}
    </section>
  );
}
