#!/usr/bin/env python3
"""Read-only cross-source audit: TEA adopted school M&O/I&S vs 2021-23 Comptroller totals.

No writes to Supabase, no altered source statuses, and no inferred components.
The 2021-22 TEA *school* year is the 2021 property tax year.
"""
from collections import Counter
from decimal import Decimal, InvalidOperation
from hashlib import sha256
from io import BytesIO
import json
import os
import re
import sys
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from openpyxl import load_workbook

SOURCE = ("https://tea.texas.gov/about-tea/state-funding/"
          "additional-finance-resources/school-district-adopted-tax-rates-1.xlsx")
YEARS = (2021, 2022, 2023)
TOL_EXACT = Decimal("0.000002")
TOL_REPORTED_PRECISION = Decimal("0.0001")
PROJECT = os.getenv("SUPABASE_URL", "https://ftkznprjljkhymknvhye.supabase.co").rstrip("/")
TOKEN = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not TOKEN:
    raise SystemExit("Existing Supabase service-role secret is missing; no public credential fallback")

def source_file():
    req = Request(SOURCE, headers={"User-Agent": "TexasDefined official tax-source audit/1.0"})
    with urlopen(req, timeout=40) as res:
        payload = res.read(3_000_000)
    if not payload.startswith(b"PK"): raise RuntimeError("Official TEA response is not XLSX")
    return payload

def parse_number(v):
    if v is None or isinstance(v, bool) or str(v).strip() == "":
        return None
    try:
        n = Decimal(str(v).strip().replace(",", "")).quantize(Decimal("0.00000001"))
        if n.is_finite() and Decimal("0") <= n <= Decimal("3"):
            return n
    except InvalidOperation: pass
    return None

def official_id(row):
    ids = row.get("official_taxing_unit_ids") or []
    if isinstance(ids, str):
        ids = [ids]
    matches = set()
    for item in ids:
        match = re.match(r"^(\d{3})-(\d{3})-02(?:-|$)", str(item))
        if match: matches.add(match.group(1) + match.group(2))
    return next(iter(matches)) if len(matches) == 1 else None

def fetch_rows():
    out = []
    start = 0
    while True:
        select = "slug,year,name,total_rate,maintenance_operations_rate,debt_service_rate,official_taxing_unit_ids,source_status,rate_unavailable"
        qs = urlencode({"select": select, "type": "eq.school-district", "year": "in.(2021,2022,2023)", "order": "year.asc,slug.asc"})
        url = PROJECT + "/rest/v1/texas_property_tax_rates?" + qs
        req = Request(url, headers={
            "apikey": TOKEN, "Authorization": "Bearer " + TOKEN,
            "Range": f"{start}-{start+999}", "Accept": "application/json"})
        with urlopen(req, timeout=35) as res:
            batch = json.load(res)
        if not isinstance(batch, list):
            raise RuntimeError("Supabase returned non-row JSON")
        out.extend(batch)
        print(f"source_rows={len(out)}", flush=True)
        if len(batch) < 1000: break
        start += len(batch)
        if start > 6000: raise RuntimeError("Unexpected history page count: stopping")
    return out

def main():
    raw = source_file()
    source_digest = sha256(raw).hexdigest()
    wb = load_workbook(BytesIO(raw), read_only=True, data_only=True)
    if len(wb.worksheets) != 1:
        raise RuntimeError(f"Official TEA sheet count changed: {len(wb.worksheets)}")
    sheet = wb.worksheets[0]
    iterator = sheet.iter_rows(values_only=True)
    header = next(iterator)
    if tuple(str(v).strip() for v in header[:2]) != ("CDN", "School District"):
        raise RuntimeError("TEA CDN identity columns shifted")
    position = {}
    for year in YEARS:
        matching_mo = [i for i, col in enumerate(header) if isinstance(col, str) and re.search(fr"\b{year}-{year+1}\s+M&O\s+Tax Rate", col.strip(), re.I)]
        matching_debt = [i for i, col in enumerate(header) if isinstance(col, str) and re.search(fr"\b{year}-{year+1}\s+I&S\s+Tax Rate", col.strip(), re.I)]
        if len(matching_mo) != 1 or len(matching_debt) != 1:
            raise RuntimeError(f"TEA fiscal year {year} rate headers not uniquely identified")
        position[year] = (matching_mo[0], matching_debt[0])
    tea = {}
    for row in iterator:
        if row[0] is None: continue
        cdn = str(row[0]).strip().zfill(6)
        if not re.fullmatch(r"\d{6}", cdn):
            continue
        if cdn in tea: raise RuntimeError(f"Duplicate TEA CDN {cdn}")
        tea[cdn] = row
    if "111903" not in tea: raise RuntimeError("Missing known Tolar CDN 111903")
    print(f"TEA_SOURCE_SHA256={source_digest} DISTRICTS={len(tea)} SHEET={sheet.title!r} TAX_COLUMNS={position}")
    rows = fetch_rows()
    seen = set()
    counters = Counter()
    details = []
    for item in rows:
        key = (item["slug"], item["year"])
        if key in seen: raise RuntimeError(f"Duplicate source tax row identity: {key}")
        seen.add(key)
        if item["maintenance_operations_rate"] is not None and item["debt_service_rate"] is not None:
            counters["already_complete"] += 1
            continue
        if item["source_status"] != "reported-final" or item["rate_unavailable"] or item["total_rate"] is None:
            counters["state_nonfinal"] += 1
            continue
        cdn = official_id(item)
        if not cdn:
            counters["no_unique_cdn"] += 1
            continue
        if cdn not in tea:
            counters["not_in_tea"] += 1
            continue
        col_mo, col_debt = position[item["year"]]
        mo = parse_number(tea[cdn][col_mo])
        debt = parse_number(tea[cdn][col_debt])
        if mo is None or debt is None:
            counters["tea_non_numeric"] += 1
            continue
        comptroller = Decimal(str(item["total_rate"]))
        diff = abs(mo + debt - comptroller)
        if diff <= TOL_EXACT:
            category = "exact"
        elif diff <= TOL_REPORTED_PRECISION:
            category = "rounded_source_difference"
        else:
            category = "conflict_requires_adjudication"
        counters[category] += 1
        details.append({
            "slug": item["slug"], "year": item["year"], "cdn": cdn,
            "mo_tea": str(mo), "debt_tea": str(debt), "comptroller_total": str(comptroller),
            "difference": str(diff), "status": category,
            "tea_school_name": str(tea[cdn][1]), "source": SOURCE,
            "source_sha256": source_digest,
        })
    print("MATCH_RESULTS="+json.dumps(dict(counters), sort_keys=True))
    print("MATCH_SAMPLES="+json.dumps(details[:6]))
    for row in details:
        if row["slug"] == "tolar-isd":
            print("TOLAR_RECONCILIATION="+json.dumps(row))
    # Copy only exact-ID/year/total source matches into an immutable candidate
    # allowlist. The page still checks the original statewide total on every read.
    accepted = [
        {"slug": row["slug"], "year": row["year"], "cdn": row["cdn"],
         "mo": row["mo_tea"], "debt": row["debt_tea"],
         "total": row["comptroller_total"], "delta": row["difference"],
         "precision": row["status"], "teaName": row["tea_school_name"]}
        for row in details if row["status"] in ("exact", "rounded_source_difference")
    ]
    generated = {
        "sourceUrl": SOURCE, "sourceSha256": source_digest,
        "dataVersion": 1,
        "fiscalYearRule": "TEA 2021-2022 school year corresponds to 2021 tax year",
        "explanation": "No state record is changed. TEA components are never inferred, and lower-precision differences up to 0.0001 are separately labeled.",
        "coverage": {"exact": counters["exact"], "lowerPrecision": counters["rounded_source_difference"],
                     "conflictExcluded": counters["conflict_requires_adjudication"],
                     "missingDistrictExcluded": counters["not_in_tea"]},
        "records": accepted,
    }
    os.makedirs("src/data/property", exist_ok=True)
    with open("src/data/property/tea-isd-history.generated.json", "w", encoding="utf-8") as f:
        json.dump(generated, f, sort_keys=True, separators=(",", ":"))
        f.write(chr(10))
    output = {"source": SOURCE, "sha256": source_digest, "source_rows": len(rows), "matched": dict(counters), "details": details}
    os.makedirs("/tmp/texasdefined", exist_ok=True)
    with open("/tmp/texasdefined/tea-isd-matches.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)
    summary = os.getenv("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as f:
            f.write(f"## TEA vs Comptroller 2021-23 school tax source reconciliation\n\nTEA workbook SHA: \`{output['sha256']}\`\n")
            f.write(f"\nRows: {len(rows)}, TEA districts: {len(tea)}. **No database or site writes.**\n\n")
            f.write("| Source status | Count |\n|---|---:|\n")
            for k, v in sorted(counters.items()):
                f.write(f"| {k} | {v} |\n")
    if len(rows) < 3000: raise RuntimeError("State source row count unexpectedly below 3,000")
    if counters["exact"] + counters["rounded_source_difference"] < 1000:
        raise RuntimeError("Low confidence in TEA crosswalk; refusing coverage claim")

if __name__ == "__main__":
    main()
