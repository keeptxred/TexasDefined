/** Exact USGS station identity and geometry via the official OGC monitoring-locations API.
 * The legacy monitoring-location website is a client-rendered presentation, not a
 * reliable HTML contract for checking the three source-reviewed reservoir points.
 * Do not change stored lake positions or reviewedAt from API response data.
 * Source: https://api.waterdata.usgs.gov/docs/ogcapi/migration/
 */
const monitoringPage = /^https:\/\/waterdata\.usgs\.gov\/monitoring-location\/(USGS-[0-9]{8,15})(?:\/statistics)?\/?$/;
const endpoint = "https://api.waterdata.usgs.gov/ogcapi/v1/collections/monitoring-locations/items";

export function usgsQueryForMonitoringPage(url) {
  const m = monitoringPage.exec(url || "");
  if (!m) return null;
  const u = new URL(endpoint);
  u.searchParams.set("f", "json");
  u.searchParams.set("id", m[1]);
  u.searchParams.set("limit", "2");
  return { sourceId: m[1], queryUrl: u.toString() };
}

export function inspectUsgsMonitoringPoint(payload, sourceId, record) {
  const features = payload?.features;
  if (!Array.isArray(features) || features.length !== 1) {
    return { idMatched: false, nameMatched: false, latMatched: false, lngMatched: false,
      issue: "USGS monitoring-location lookup returned other than one station" };
  }
  const feature = features[0];
  const id = feature?.id ?? feature?.properties?.id;
  const name = feature?.properties?.monitoring_location_name;
  const coordinates = feature?.geometry?.type === "Point" ? feature.geometry.coordinates : null;
  const longitude = Array.isArray(coordinates) ? coordinates[0] : undefined;
  const latitude = Array.isArray(coordinates) ? coordinates[1] : undefined;
  const idMatched = id === sourceId;
  const nameMatched = typeof name === "string"
    && typeof record?.sourceNeedle === "string"
    && name.toLowerCase().includes(record.sourceNeedle.trim().toLowerCase());
  const latMatched = Number.isFinite(latitude) && Number.isFinite(record?.lat)
    && Math.abs(latitude - record.lat) <= 0.00001;
  const lngMatched = Number.isFinite(longitude) && Number.isFinite(record?.lng)
    && Math.abs(longitude - record.lng) <= 0.00001;
  return { idMatched, nameMatched, latMatched, lngMatched, latitude, longitude,
    officialName: name ?? null,
    issue: idMatched && nameMatched && latMatched && lngMatched
      ? null : "USGS station ID, official name or source-reviewed coordinates differ" };
}
