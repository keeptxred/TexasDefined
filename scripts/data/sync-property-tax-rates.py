#!/usr/bin/env python3
"""Sync Texas Comptroller property-tax rates without third-party packages.

Downloads the official annual XLSX files, parses their XML directly with the
Python standard library, normalizes county/city/school/special-district rows,
and writes the TypeScript dataset consumed by TexasDefined.
"""
from __future__ import annotations

import datetime as dt
import html
import io
import json
import math
import re
import sys
import urllib.error
import urllib.request
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "src" / "data" / "property" / "texas-tax-rates.generated.ts"
SOURCE_PAGE = "https://comptroller.texas.gov/taxes/property-tax/rates/"
BASE = "https://comptroller.texas.gov/taxes/property-tax/docs"
YEARS = tuple(range(2021, 2026))
LATEST_FINALIZED_YEAR = 2025
USER_AGENT = "TexasDefined property-tax-rate sync/1.0 (+https://texasdefined.com)"

SOURCES = {
    "county": "{year}-county-rates-levies.xlsx",
    "city": "{year}-city-rates-levies.xlsx",
    "school-district": "{year}-school-district-rates-levies.xlsx",
    "special-district": "{year}-special-district-rates-levies.xlsx",
}

HEADER_ALIASES = {
    "county": (
        "county", "county name", "county names", "county(ies)", "counties",
        "appraisal district county", "county of location",
    ),
    "name": (
        "taxing unit name", "taxing unit", "entity name", "district name",
        "school district name", "city name", "county name", "special district name",
        "name of taxing unit", "name",
    ),
    "total": (
        "total tax rate", "tax rate", "total rate", "adopted tax rate",
        "reported tax rate", "total tax rate per $100",
    ),
    "mo": (
        "m&o", "m & o", "maintenance & operations", "maintenance and operations",
        "maintenance operations", "m&o tax rate", "maintenance and operations rate",
    ),
    "debt": (
        "i&s", "i & s", "interest & sinking", "interest and sinking",
        "debt service", "debt service tax rate", "i&s tax rate",
    ),
    "levy": (
        "levy", "tax levy", "total levy", "calculated levy", "property tax levy",
    ),
}

NS_MAIN = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
NS_REL_OFFICE = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
NS_REL_PACKAGE = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*"})
    with urllib.request.urlopen(request, timeout=45) as response:
        if response.status != 200:
            raise RuntimeError(f"HTTP {response.status} for {url}")
        return response.read()


def clean(value: object) -> str:
    return re.sub(r"\s+", " ", html.unescape(str(value or ""))).strip()


def normalized_header(value: object) -> str:
    return re.sub(r"[^a-z0-9&]+", " ", clean(value).lower()).strip()


def slugify(value: str) -> str:
    value = clean(value).lower().replace("&", " and ")
    value = re.sub(r"\*+$", "", value).strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def county_slug(value: str) -> str:
    value = clean(value)
    value = re.sub(r"^\d{1,3}\s*[-:]?\s*", "", value)
    value = re.sub(r"\s+county$", "", value, flags=re.I)
    return slugify(value)


def split_counties(value: str) -> list[str]:
    value = clean(value)
    if not value:
        return []
    value = re.sub(r"\band\b", ",", value, flags=re.I)
    parts = re.split(r"[,;/|]+", value)
    result = []
    for part in parts:
        slug = county_slug(part)
        if slug and slug not in {"county", "counties", "statewide", "texas"} and slug not in result:
            result.append(slug)
    return result


def parse_number(value: object) -> float | None:
    text = clean(value)
    if not text or text.lower() in {"n/a", "na", "none", "-", "—", "*", "**"}:
        return None
    negative = text.startswith("(") and text.endswith(")")
    text = text.replace("$", "").replace(",", "").replace("%", "")
    text = re.sub(r"[^0-9eE+\-.]", "", text)
    if not text or text in {"-", "."}:
        return None
    try:
        number = float(text)
        return -number if negative else number
    except ValueError:
        return None


def column_index(cell_ref: str) -> int:
    letters = re.match(r"[A-Z]+", cell_ref.upper())
    if not letters:
        return 0
    value = 0
    for char in letters.group(0):
        value = value * 26 + (ord(char) - 64)
    return value - 1


def read_shared_strings(zf: zipfile.ZipFile) -> list[str]:
    try:
        root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    strings: list[str] = []
    for si in root.findall(f"{NS_MAIN}si"):
        strings.append("".join(node.text or "" for node in si.iter(f"{NS_MAIN}t")))
    return strings


def workbook_sheets(zf: zipfile.ZipFile) -> list[tuple[str, str]]:
    workbook = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels.findall(f"{NS_REL_PACKAGE}Relationship")}
    sheets: list[tuple[str, str]] = []
    for sheet in workbook.findall(f".//{NS_MAIN}sheet"):
        name = sheet.attrib.get("name", "Sheet")
        rel_id = sheet.attrib.get(f"{NS_REL_OFFICE}id")
        target = rel_map.get(rel_id or "")
        if not target:
            continue
        path = target.lstrip("/")
        if not path.startswith("xl/"):
            path = f"xl/{path}"
        sheets.append((name, path))
    return sheets


def worksheet_rows(zf: zipfile.ZipFile, path: str, shared: list[str]) -> list[list[str]]:
    root = ET.fromstring(zf.read(path))
    rows: list[list[str]] = []
    for row in root.findall(f".//{NS_MAIN}row"):
        values: dict[int, str] = {}
        max_col = -1
        for cell in row.findall(f"{NS_MAIN}c"):
            ref = cell.attrib.get("r", "A1")
            idx = column_index(ref)
            max_col = max(max_col, idx)
            cell_type = cell.attrib.get("t")
            value = ""
            if cell_type == "inlineStr":
                value = "".join(node.text or "" for node in cell.iter(f"{NS_MAIN}t"))
            else:
                node = cell.find(f"{NS_MAIN}v")
                raw = node.text if node is not None and node.text is not None else ""
                if cell_type == "s" and raw:
                    try:
                        value = shared[int(raw)]
                    except (ValueError, IndexError):
                        value = raw
                elif cell_type == "b":
                    value = "TRUE" if raw == "1" else "FALSE"
                else:
                    value = raw
            values[idx] = clean(value)
        if max_col >= 0:
            rows.append([values.get(i, "") for i in range(max_col + 1)])
    return rows


def parse_xlsx(payload: bytes) -> list[tuple[str, list[list[str]]]]:
    with zipfile.ZipFile(io.BytesIO(payload)) as zf:
        shared = read_shared_strings(zf)
        return [(name, worksheet_rows(zf, path, shared)) for name, path in workbook_sheets(zf)]


def match_header(value: str, key: str) -> bool:
    normalized = normalized_header(value)
    aliases = HEADER_ALIASES[key]
    return any(normalized == normalized_header(alias) or normalized_header(alias) in normalized for alias in aliases)


def identify_header(rows: list[list[str]], unit_type: str) -> tuple[int, dict[str, int]] | None:
    best: tuple[int, int, dict[str, int]] | None = None
    for row_index, row in enumerate(rows[:60]):
        mapping: dict[str, int] = {}
        for col_index, value in enumerate(row):
            for key in HEADER_ALIASES:
                if key not in mapping and match_header(value, key):
                    mapping[key] = col_index
        score = 0
        if "total" in mapping:
            score += 5
        if "name" in mapping:
            score += 5
        if "county" in mapping:
            score += 3
        if "mo" in mapping:
            score += 1
        if "debt" in mapping:
            score += 1
        if "levy" in mapping:
            score += 1
        # County files sometimes use one County Name column for both identity and county.
        if unit_type == "county" and "county" in mapping and "name" not in mapping:
            mapping["name"] = mapping["county"]
            score += 5
        candidate = (score, -row_index, mapping)
        if best is None or candidate[:2] > best[:2]:
            best = (score, -row_index, mapping)
    if not best or best[0] < 8:
        return None
    return -best[1], best[2]


def cell(row: list[str], mapping: dict[str, int], key: str) -> str:
    idx = mapping.get(key)
    return row[idx] if idx is not None and idx < len(row) else ""


def infer_counties(unit_type: str, name: str, county_value: str) -> list[str]:
    counties = split_counties(county_value)
    if counties:
        return counties
    if unit_type == "county":
        slug = county_slug(name)
        return [slug] if slug else []
    # Many special districts begin with the county name. Preserve only a clear
    # "X County" prefix rather than guessing from city/school names.
    match = re.match(r"^(.+?)\s+County\b", name, flags=re.I)
    if match:
        slug = county_slug(match.group(1))
        return [slug] if slug else []
    return []


def normalize_rate(number: float | None) -> float | None:
    if number is None or not math.isfinite(number) or number < 0:
        return None
    # State files are reported as dollars per $100 of taxable value. Reject
    # values that are obviously not tax rates rather than silently rescaling.
    if number > 20:
        return None
    return round(number, 8)


def parse_source(payload: bytes, year: int, unit_type: str, source_url: str) -> list[dict]:
    records: list[dict] = []
    parsed = parse_xlsx(payload)
    for sheet_name, rows in parsed:
        header = identify_header(rows, unit_type)
        if not header:
            continue
        header_index, mapping = header
        blanks = 0
        for row in rows[header_index + 1:]:
            name = clean(cell(row, mapping, "name"))
            total = normalize_rate(parse_number(cell(row, mapping, "total")))
            if not name and total is None:
                blanks += 1
                if blanks > 30:
                    break
                continue
            blanks = 0
            if not name or total is None:
                continue
            name = re.sub(r"\*+$", "", name).strip()
            if normalized_header(name) in {"total", "totals", "state total", "texas total"}:
                continue
            counties = infer_counties(unit_type, name, cell(row, mapping, "county"))
            if not counties:
                # County association is required for every TexasDefined county
                # page and calculator. Do not guess if the source row omitted it.
                continue
            mo = normalize_rate(parse_number(cell(row, mapping, "mo")))
            debt = normalize_rate(parse_number(cell(row, mapping, "debt")))
            levy = parse_number(cell(row, mapping, "levy"))
            unit_slug = slugify(name)
            records.append({
                "id": f"{year}:{unit_type}:{unit_slug}",
                "year": year,
                "type": unit_type,
                "name": name,
                "slug": unit_slug,
                "countySlugs": counties,
                "totalRate": total,
                "maintenanceOperationsRate": mo,
                "debtServiceRate": debt,
                "levy": round(levy, 2) if levy is not None and math.isfinite(levy) else None,
                "sourceUrl": source_url,
                "sourceStatus": "reported-final",
                "_sheet": sheet_name,
            })
    return records


def merge_records(records: list[dict]) -> list[dict]:
    grouped: dict[tuple, list[dict]] = defaultdict(list)
    for record in records:
        grouped[(record["year"], record["type"], record["slug"])].append(record)

    merged: list[dict] = []
    for (year, unit_type, unit_slug), rows in grouped.items():
        rates = [row["totalRate"] for row in rows if row["totalRate"] is not None]
        if not rates:
            continue
        # A taxing unit spanning counties should have the same adopted rate in
        # every row. If source rows disagree, retain the most common value and
        # avoid inventing an average tax rate.
        counts: dict[float, int] = defaultdict(int)
        for rate in rates:
            counts[rate] += 1
        total_rate = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[0][0]
        compatible = [row for row in rows if row["totalRate"] == total_rate]
        base = max(compatible, key=lambda row: int(row["maintenanceOperationsRate"] is not None) + int(row["debtServiceRate"] is not None))
        counties = sorted({county for row in compatible for county in row["countySlugs"]})
        levy_values = [row["levy"] for row in compatible if row["levy"] is not None]
        merged.append({
            "id": f"{year}:{unit_type}:{unit_slug}",
            "year": year,
            "type": unit_type,
            "name": base["name"],
            "slug": unit_slug,
            "countySlugs": counties,
            "totalRate": total_rate,
            "maintenanceOperationsRate": base["maintenanceOperationsRate"],
            "debtServiceRate": base["debtServiceRate"],
            "levy": round(sum(levy_values), 2) if levy_values else None,
            "sourceUrl": base["sourceUrl"],
            "sourceStatus": "reported-final",
        })
    return sorted(merged, key=lambda row: (row["year"], row["type"], row["name"].lower()))


def validate(records: list[dict]) -> None:
    if not records:
        raise RuntimeError("No property-tax-rate records parsed from official workbooks")
    latest = [record for record in records if record["year"] == LATEST_FINALIZED_YEAR]
    county_records = [record for record in latest if record["type"] == "county"]
    school_records = [record for record in latest if record["type"] == "school-district"]
    city_records = [record for record in latest if record["type"] == "city"]
    special_records = [record for record in latest if record["type"] == "special-district"]
    if len(county_records) < 240:
        raise RuntimeError(f"Expected near-statewide county coverage; parsed only {len(county_records)} counties")
    if len(school_records) < 900:
        raise RuntimeError(f"Expected statewide school-district coverage; parsed only {len(school_records)} districts")
    if len(city_records) < 800:
        raise RuntimeError(f"Expected statewide city coverage; parsed only {len(city_records)} cities")
    if len(special_records) < 500:
        raise RuntimeError(f"Expected broad special-district coverage; parsed only {len(special_records)} districts")
    for record in records:
        if record["totalRate"] < 0 or record["totalRate"] > 20:
            raise RuntimeError(f"Out-of-range tax rate for {record['id']}: {record['totalRate']}")
        if not record["countySlugs"]:
            raise RuntimeError(f"Missing county mapping for {record['id']}")


def render(records: list[dict]) -> str:
    years = sorted({record["year"] for record in records})
    generated = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    payload = json.dumps(records, ensure_ascii=False, separators=(",", ":"))
    return f'''// AUTO-GENERATED by scripts/data/sync-property-tax-rates.py. DO NOT EDIT BY HAND.\n\nexport type TexasTaxingUnitType = 'county' | 'city' | 'school-district' | 'special-district';\n\nexport type TexasTaxRateRecord = {{\n  id: string;\n  year: number;\n  type: TexasTaxingUnitType;\n  name: string;\n  slug: string;\n  countySlugs: string[];\n  totalRate: number;\n  maintenanceOperationsRate: number | null;\n  debtServiceRate: number | null;\n  levy: number | null;\n  sourceUrl: string;\n  sourceStatus: 'reported-final';\n}};\n\nexport const TEXAS_TAX_RATE_DATASET_META = {{\n  sourceName: 'Texas Comptroller of Public Accounts — Property Tax Assistance Division',\n  sourcePage: '{SOURCE_PAGE}',\n  latestFinalizedYear: {LATEST_FINALIZED_YEAR},\n  availableYears: {json.dumps(years)},\n  generatedAt: '{generated}',\n  recordCount: {len(records)},\n  status: 'synced' as const,\n}};\n\nexport const TEXAS_TAX_RATE_RECORDS: TexasTaxRateRecord[] = {payload};\n'''


def main() -> int:
    all_rows: list[dict] = []
    failures: list[str] = []
    for year in YEARS:
        for unit_type, pattern in SOURCES.items():
            source_url = f"{BASE}/{pattern.format(year=year)}"
            try:
                payload = fetch(source_url)
                rows = parse_source(payload, year, unit_type, source_url)
                if not rows:
                    raise RuntimeError("workbook parsed but yielded zero normalized rows")
                print(f"{year} {unit_type}: {len(rows)} source rows")
                all_rows.extend(rows)
            except (urllib.error.URLError, RuntimeError, zipfile.BadZipFile, ET.ParseError, KeyError) as exc:
                failures.append(f"{source_url}: {exc}")
                print(f"WARN {source_url}: {exc}", file=sys.stderr)

    records = merge_records(all_rows)
    validate(records)
    OUTPUT.write_text(render(records), encoding="utf-8")
    print(f"Wrote {len(records)} normalized tax-rate records across {len(set(r['year'] for r in records))} years to {OUTPUT}")
    if failures:
        print(f"Completed with {len(failures)} source warning(s); validation still passed.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
