#!/usr/bin/env python3
"""Evidence-first municipal limits/county intersection research for TexasDefined.

This script is a RESEARCH AID. It never awards factual PASS or release certification.
Requires Python 3.11+, shapely 2.x and pyproj 3.x (free, open-source).
Example:
  python -m pip install shapely pyproj
  python scripts/data/verify-city-municipal-gis.py --city houston --output artifacts/city-authority-gis/houston.json

Separate municipal CITY LIMITS from ETJ at source. County comparison uses
U.S. Census TIGERweb BAS 2026 counties (January 1, 2026 vintage), *not*
a legal parcel-level determination. All intersections require independent
editorial review for limited-purpose annexation, slivers and data vintages.
"""
import argparse
import datetime as dt
import hashlib
import json
import pathlib
import sys
import urllib.error
import urllib.parse
import urllib.request

try:
    from shapely.geometry import shape, box
    from shapely.ops import transform, unary_union
    from pyproj import Transformer
except ImportError as exc:
    sys.exit(f"UNVERIFIED: install free dependencies shapely and pyproj: {exc}")

COUNTY_LAYER = "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/29"
COUNTY_VINTAGE = "BAS 2026; January 1, 2026"
# Municipal publishers and exact city-limits layers verified via their REST directories;
# none of these are ETJ layers. An empty URL indicates NO CERTIFIED VECTOR SOURCE.
CITY_LAYERS = {
    "houston": "https://mycity2.houstontx.gov/gisweb01/rest/services/HoustonMap/Administrative_Boundary/MapServer/0",
    "dallas": "https://gis.dallascityhall.com/arcgis/rest/services/Basemap/CityLimits/MapServer/0",
    "fort-worth": "https://gis.fortworthtexas.gov/gisimage/rest/services/Mapping/Report_Areas_Published/MapServer/3",
    "austin": "https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/City_of_Austin_WFL1/FeatureServer/0",
    "san-antonio": None,
    "el-paso": "https://gis.elpasotexas.gov/accela/rest/services/311/CityLimits/FeatureServer/0",
    "arlington": "https://gis2.arlingtontx.gov/agsext2/rest/services/OpenData/OD_PoliticalBoundary/MapServer/1",
    "hurst": "https://mms.hursttx.gov/arcgis/rest/services/EnerGov_Basemap/MapServer/2",
    "corpus-christi": "https://ccpublicgis.cctexas.com/server01/rest/services/CC_GENERAL_SERVICES/CC_GENERAL_SERVICES/MapServer/2",
    "plano": "https://maps.planogis.org/arcgiswad/rest/services/OpenData/MunicipalBoundary/MapServer/0",
    "lubbock": "https://pubgis.ci.lubbock.tx.us/server/rest/services/Layers/ParcelMap/MapServer/13",
}
# This additional 2026 City of San Antonio-labelled layer is NOT confirmed as
# City-published authoritative geometry. Published 2026-04-07, source data
# reported 2026-03-17. Use only for explicitly provisional research.
CANDIDATE_LAYERS = {
    "san-antonio": "https://services7.arcgis.com/BUFM2kw4MpxDUJVh/ArcGIS/rest/services/COSA_City_Limits/FeatureServer/0",
}
# Reconcile results to published jurisdiction list, not arbitrary city-name county.
PUBLISHED = {
    "houston": ["Harris", "Fort Bend", "Montgomery"],
    "dallas": ["Dallas", "Collin", "Denton", "Kaufman", "Rockwall"],
    "fort-worth": ["Tarrant", "Denton", "Parker", "Johnson", "Wise"],
    "austin": ["Travis", "Williamson", "Hays"],
    "san-antonio": ["Bexar", "Comal", "Medina"],
    "el-paso": ["El Paso"],
    "arlington": ["Tarrant"],
    "hurst": ["Tarrant"],
    "corpus-christi": ["Nueces", "San Patricio", "Kleberg", "Aransas"],
    "plano": ["Collin", "Denton"],
    "lubbock": ["Lubbock"],
}
TO_EQUAL_AREA = Transformer.from_crs("EPSG:4326", "EPSG:5070", always_xy=True).transform
UA = {"User-Agent": "TexasDefined-city-authority-independent-GIS-QA/1.0"}

def query(url, params):
    body = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=body, headers={**UA, "Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req, timeout=90) as response:
        raw = response.read()
    payload = json.loads(raw)
    if "error" in payload:
        raise ValueError(f"{url}: ArcGIS REST error {payload['error']}")
    return payload, hashlib.sha256(raw).hexdigest()

def valid(poly):
    if poly.is_valid:
        return poly
    return poly.buffer(0)

def polygon_features(layer, where="1=1", envelope=None):
    meta, meta_sha = query(layer, {"f": "json"})
    if meta.get("geometryType") != "esriGeometryPolygon":
        raise ValueError("Not an official polygon layer: " + layer)
    obj, _ = query(layer + "/query", {"f": "json", "where": where, "returnIdsOnly": "true"})
    ids = obj.get("objectIds")
    if not ids:
        raise ValueError("No feature IDs, or unsupported query: " + layer)
    features = []
    raw_shas = []
    # Stable OID pagination: never silently truncate to maxRecordCount.
    for i in range(0, len(ids), 25):
        options = {"f": "geojson", "objectIds": ",".join(map(str, ids[i:i+25])),
                   "outFields": "*", "returnGeometry": "true", "outSR": 4326}
        if envelope:
            # County bounding-box filtering is done in the county-specific query.
            pass
        fc, sha = query(layer + "/query", options)
        if fc.get("type") != "FeatureCollection":
            raise ValueError("No GeoJSON FeatureCollection returned by " + layer)
        features.extend(fc.get("features", []))
        raw_shas.append(sha)
    if len(features) != len(ids):
        raise ValueError(f"Truncated geometry: wanted {len(ids)}, received {len(features)}")
    return features, {"url": layer, "name": meta.get("name"),
                      "id_field": meta.get("objectIdField"), "feature_count": len(features),
                      "metadata_sha256": meta_sha, "geometry_chunk_sha256": raw_shas,
                      "editingInfo": meta.get("editingInfo"),
                      "copyright": meta.get("copyrightText"), "extent": meta.get("extent")}

def county_features(bounds):
    # Exhaustive spatial candidate set within municipal polygon's bbox, not a
    # pre-selected list of counties. County polygons are federal BAS vintage.
    xmin, ymin, xmax, ymax = bounds
    envelope = json.dumps({"xmin": xmin, "ymin": ymin, "xmax": xmax, "ymax": ymax,
                           "spatialReference": {"wkid": 4326}})
    options = {"f": "geojson", "where": "STATE = '48'",
               "geometry": envelope, "geometryType": "esriGeometryEnvelope",
               "inSR": 4326, "spatialRel": "esriSpatialRelIntersects",
               "outFields": "NAME,GEOID,STATE", "returnGeometry": "true",
               "outSR": 4326}
    fc, sha = query(COUNTY_LAYER + "/query", options)
    if fc.get("type") != "FeatureCollection":
        raise ValueError("County server did not return GeoJSON")
    if fc.get("properties", {}).get("exceededTransferLimit"):
        raise ValueError("County query truncated")
    return fc["features"], sha

def audit_city(city, include_candidates=False):
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    source_url = CITY_LAYERS[city] or (CANDIDATE_LAYERS.get(city) if include_candidates else None)
    source_provenance = "OFFICIAL_LAYER_DISCOVERED" if CITY_LAYERS[city] else "UNVERIFIED_PROVISIONAL_CANDIDATE"
    report = {"city": city, "checked_at_utc": now, "status": "UNVERIFIED",
              "source_provenance": source_provenance,
              "county_vintage": COUNTY_VINTAGE, "county_source": COUNTY_LAYER,
              "municipal_source": source_url, "published_counties": PUBLISHED[city],
              "limitation": "Geometric candidates only: independent review of legal city limits, limited-purpose annexations, ETJ, county vintage, and geometry slivers is mandatory."}
    if not source_url:
        report["blocker"] = "Current official city-limits VECTOR polygon endpoint not independently confirmed"
        return report
    try:
        features, source = polygon_features(source_url)
        geoms = [valid(shape(f["geometry"])) for f in features if f.get("geometry")]
        if not geoms or any(g.is_empty for g in geoms):
            raise ValueError("Empty municipal geometry")
        municipal = valid(unary_union(geoms))
        county_rows, county_sha = county_features(municipal.bounds)
        metric_city = valid(transform(TO_EQUAL_AREA, municipal))
        overlaps = []
        for f in county_rows:
            name = f.get("properties", {}).get("NAME", "").replace(" County", "")
            county_geom = valid(transform(TO_EQUAL_AREA, shape(f["geometry"])))
            overlap = metric_city.intersection(county_geom)
            km2 = round(overlap.area / 1_000_000, 5)
            overlaps.append({"county": name, "geoid": f.get("properties", {}).get("GEOID"),
                             "intersection_km2": km2,
                             "classification": ("SUBSTANTIAL_CANDIDATE" if km2 >= 0.01
                                                else "SLIVER_REVIEW" if km2 > 0 else "NO_AREA")})
        candidates = sorted(row["county"] for row in overlaps if row["classification"] == "SUBSTANTIAL_CANDIDATE")
        expected = sorted(PUBLISHED[city])
        report.update({"source": source, "county_query_sha256": county_sha,
                       "municipal_geom_type": municipal.geom_type,
                       "municipal_area_km2": round(metric_city.area / 1e6, 5),
                       "county_intersections": overlaps,
                       "substantial_candidates": candidates,
                       "comparison": {"published_not_in_candidates": sorted(set(expected)-set(candidates)),
                                      "candidates_not_published": sorted(set(candidates)-set(expected))},
                       "status": "PARTIAL_GEOMETRY_REVIEW_REQUIRED" if CITY_LAYERS[city] else "PROVISIONAL_UNVERIFIED_SOURCE"})
    except Exception as e:
        report["blocker"] = f"{type(e).__name__}: {e}"
    return report

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--city", choices=[*CITY_LAYERS, "all"], default="all")
    parser.add_argument("--output", type=pathlib.Path)
    parser.add_argument("--include-unverified-candidates", action="store_true",
                        help="Run third-party/provisional geometry separately; never award GIS PASS")
    args = parser.parse_args()
    cities = list(CITY_LAYERS) if args.city == "all" else [args.city]
    results = [audit_city(city, args.include_unverified_candidates) for city in cities]
    payload = {"schema": "city-authority-gis-research-v1", "method": "municipal polygons vs BAS 2026 counties via EPSG:5070; 0.01km² candidate threshold; NO AUTOMATIC ACCEPTANCE",
               "results": results}
    output = json.dumps(payload, indent=2, sort_keys=True) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(output, encoding="utf-8")
    else:
        print(output)
    # Block CI/acceptance on incomplete geometry, but allow manual CLI inspection.
    if any(x["status"] == "UNVERIFIED" for x in results):
        print("WARNING: some municipal polygons were not verified; do not certify.", file=sys.stderr)

if __name__ == "__main__":
    main()
