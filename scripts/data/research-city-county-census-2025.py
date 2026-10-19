#!/usr/bin/env python3
"""Research-only: compare TexasDefined's 57 place-to-county rows with Census ACS 2025 TIGERweb polygons.

No geography is automatically accepted, altered, or certified by this script:
geometric slivers, limited-purpose annexations, 2025 vintage, and official current
municipal limits must be reconciled separately before a public correction.
"""
from __future__ import annotations
import datetime as dt
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter

from pyproj import Transformer
from shapely.geometry import shape
from shapely.ops import transform
from shapely.strtree import STRtree

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "artifacts" / "city-county-census-2025"
SERVICE = "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2025/MapServer"
UA = "TexasDefined/1.0 (editorial geographic boundary research; https://texasdefined.com)"
MIN_AREA_M2 = 10000  # 0.01 square kilometers: candidate filter only, never certification.
TO_METERS = Transformer.from_crs("EPSG:4326", "EPSG:5070", always_xy=True).transform


def load_directory():
    content = (ROOT / "src" / "data" / "texas-places.ts").read_text()
    section = content.split("export const TEXAS_CITIES", 1)[1].split("].map(", 1)[0]
    entries = re.findall(r"\['([^']+)','([^']+)','([^']+)'\]", section)
    if len(entries) != 57 or len({x[0] for x in entries}) != len(entries):
        raise ValueError("Unexpected city-registry size/duplicates; inspect before geography audit")
    relationships = (ROOT / "src" / "data" / "city-county-relationships.ts").read_text()
    mapping = relationships.split("const ADDITIONAL_COUNTIES_BY_CITY", 1)[1].split("\n};", 1)[0]
    extra = {}
    for match in re.finditer(r"(?m)^\s*(?:'([^']+)'|([A-Za-z]+)):\s*\[([^\]]*)\],?", mapping):
        extra[match.group(1) or match.group(2)] = re.findall(r"'([^']+)'", match.group(3))
    if len(extra) != 30 or set(extra) - {x[0] for x in entries}:
        raise ValueError("Unexpected 30-place multi-county mapping contract")
    return [{"name": name, "expected": [primary] + extra.get(name, []),
             "type": "cdp" if name == "The Woodlands" else "incorporated"} for name, primary, _ in entries]


def census_query(layer, where, fields, limit):
    url = f"{SERVICE}/{layer}/query"
    payload = urllib.parse.urlencode({
        "f": "geojson", "where": where, "outFields": fields,
        "outSR": "4326", "returnGeometry": "true",
        "resultRecordCount": str(limit), "geometryPrecision": "6",
    }).encode()
    request = urllib.request.Request(url, data=payload, headers={
        "Content-Type": "application/x-www-form-urlencoded", "User-Agent": UA}, method="POST")
    start = time.monotonic()
    with urllib.request.urlopen(request, timeout=115) as response:
        parsed = json.load(response)
    if "error" in parsed or parsed.get("type") != "FeatureCollection":
        raise RuntimeError(f"Invalid TIGERweb response {layer}: {str(parsed)[:500]}")
    features = parsed["features"]
    if len(features) > limit:
        raise ValueError(f"Truncated TIGERweb result for layer {layer}")
    print(f"Fetched TIGERweb layer {layer}: {len(features)} features in {round(time.monotonic()-start,1)}s", flush=True)
    return features


def geometry(feature):
    item = shape(feature["geometry"])
    if not item.is_valid:
        item = item.buffer(0)
    if item.is_empty:
        raise ValueError("Empty Census source geometry for " + str(feature.get("properties")))
    return transform(TO_METERS, item)


def main():
    places = load_directory()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = {"asOf": dt.datetime.now(dt.timezone.utc).isoformat(),
              "source": SERVICE, "vintage": "January 1, 2025",
              "caveat": "Census geometry is independent evidence, NOT proof of present-day legal city limits.",
              "threshold_sq_m": MIN_AREA_M2, "places": [], "errors": []}
    try:
        # Pull state-filtered official Census polygons. Do not use postal ZIP, ETJ or metro area geometries.
        names = ", ".join("'" + p["name"].replace("'", "''") + "'" for p in places if p["type"] == "incorporated")
        cities = census_query(28, "STATE = '48' AND BASENAME IN (" + names + ")", "BASENAME,NAME,GEOID,STATE,PLACE", 150)
        cdp = census_query(30, "STATE = '48' AND BASENAME = 'The Woodlands'", "BASENAME,NAME,GEOID,STATE,PLACE", 10)
        counties = census_query(82, "STATE = '48'", "BASENAME,NAME,GEOID,STATE,COUNTY", 300)
        if len(counties) != 254 or len(cities) != 56 or len(cdp) != 1:
            raise ValueError(f"Unexpected Census polygon count cities={len(cities)} CDPs={len(cdp)} counties={len(counties)}")
        county_names = [f["properties"].get("BASENAME") for f in counties]
        if len(set(county_names)) != 254:
            raise ValueError("Duplicate Census county names")
        county_geoms = [geometry(c) for c in counties]
        tree = STRtree(county_geoms)
        census_places = {f["properties"]["BASENAME"]: f for f in cities + cdp}
        if len(census_places) != 57:
            raise ValueError("Census place name ambiguity: " + str(Counter(f["properties"]["BASENAME"] for f in cities + cdp)))
        for p in places:
            ft = census_places.get(p["name"])
            if ft is None:
                raise ValueError("Missing Census place: " + p["name"])
            geom = geometry(ft)
            area = geom.area
            candidates = []
            for county_id in tree.query(geom):
                ci = int(county_id)
                intersection = geom.intersection(county_geoms[ci])
                if intersection.is_empty or intersection.area <= 0:
                    continue
                share = round(intersection.area * 100 / area, 6)
                candidates.append({"county": county_names[ci], "intersection_sq_m": round(intersection.area),
                                   "place_land_water_area_pct": share, "substantial": intersection.area >= MIN_AREA_M2})
            candidates.sort(key=lambda q: q["intersection_sq_m"], reverse=True)
            substantial = [c["county"] for c in candidates if c["substantial"]]
            missing = [c for c in substantial if c not in p["expected"]]
            current_only = [c for c in p["expected"] if c not in substantial]
            report["places"].append({"name": p["name"], "geography": p["type"], "censusGEOID": ft["properties"]["GEOID"],
                                     "websiteCountyList": p["expected"], "censusSubstantial": substantial,
                                     "censusAnyContact": candidates, "censusMissingFromWebsite": missing,
                                     "websiteNotInCensus2025": current_only})
            label = "DIFFERENCE" if missing or current_only else "MATCH"
            print(f"{label} {p['name']}: site={','.join(p['expected'])} census={','.join(substantial)}", flush=True)
    except Exception as err:
        report["errors"].append(f"{type(err).__name__}: {err}")
        print("Census polygon research failure: " + str(err), file=sys.stderr)
    finally:
        report["counts"] = {
            "places_analyzed": len(report["places"]),
            "census_possible_omissions": sum(bool(p["censusMissingFromWebsite"]) for p in report["places"]),
            "website_only_2026_or_sliver": sum(bool(p["websiteNotInCensus2025"]) for p in report["places"]),
            "source_errors": len(report["errors"]),
        }
        (OUTPUT / "report.json").write_text(json.dumps(report, indent=2) + "\n")
        print("SUMMARY " + json.dumps(report["counts"]), flush=True)
    if report["errors"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
