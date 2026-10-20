#!/usr/bin/env python3
"""Ingest 2026–27 UIL softball-specific district alignment PDFs.

Unlike the UIL general reclassification PDF or football district listings,
these documents identify *softball* groupings, including smaller 1A schools
that appear in the official 2A softball alignment. Every row retains source.
Generated data is intentionally a district *listing*, not proof of roster,
active game schedule, school contact details or postseason designation.
"""
from __future__ import annotations
import csv
import datetime
import json
import re
import sys
import urllib.request
from pathlib import Path

import fitz

SOURCES = {
    "2A": "https://www.uiltexas.org/files/alignments/2ASB_Rvsd6-15.pdf",
    "3A": "https://www.uiltexas.org/files/alignments/263ASB.pdf",
    "4A": "https://www.uiltexas.org/files/alignments/264ASB.pdf",
    "5A": "https://www.uiltexas.org/files/alignments/265ASB.pdf",
    "6A": "https://www.uiltexas.org/files/alignments/266ASB.pdf",
}
ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / "src/data/softball/uil-2026-27-registry.json"
CSV_DEST = ROOT / "public/data/texas-softball-uil-2026-27.csv"
DAY = "2026-10-11"
MINIMUMS = {"2A": 170, "3A": 170, "4A": 170, "5A": 180, "6A": 180}

def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "TexasDefined research (public UIL softball alignment; contact editorial@texasdefined.com)"})
    with urllib.request.urlopen(req, timeout=35) as response:
        data = response.read()
    if len(data) < 10000 or not data.startswith(b"%PDF"):
        raise RuntimeError(f"Invalid or incomplete original UIL PDF: {url}")
    return data

def parse(conf: str, raw: bytes):
    doc = fitz.open(stream=raw, filetype="pdf")
    if len(doc) != 1:
        raise ValueError(f"{conf} source is no longer a single-page UIL matrix; investigate")
    pg = doc[0]
    title = pg.get_text()
    if f"CONFERENCE {conf}" not in title or "2026-27 OFFICIAL DISTRICT ALIGNMENT" not in title:
        raise ValueError(f"{conf} source heading does not match the reviewed 2026–27 version")
    lines = []
    for block in pg.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            t = "".join(s["text"] for s in line["spans"]).strip()
            if t and line["bbox"][1] > 85:
                lines.append((float(line["bbox"][0]), float(line["bbox"][1]), t))
    origins = sorted({round(x, 1) for x, y, s in lines if s == "District"})
    if len(origins) != 8:
        raise ValueError(f"{conf}: expected 8 aligned UIL columns, got {origins}")
    by_col: list[list[tuple[float,float,str]]] = [[] for _ in origins]
    for x,y,t in lines:
        closest = min(range(len(origins)), key=lambda i: abs(x - origins[i]))
        if abs(x - origins[closest]) > 48:
            # Region labels/title rather than aligned school record
            continue
        by_col[closest].append((x,y,t))
    records = []
    district_counts = {}
    for col, items in enumerate(by_col):
        items.sort(key=lambda a:(a[1],a[0]))
        current = None
        last_y = None
        first_school_y = None
        for i,(x,y,t) in enumerate(items):
            if t == "District":
                d = col*4 + 1 + sum(1 for _x,_y,_t in items[:i] if _t == "District")
                nearby = [int(s) for _x,_y,s in items if s.isdigit() and abs(_y-y)<2.5]
                if nearby and nearby != [d]:
                    raise ValueError(f"{conf} expected district {d} but found heading numbers {nearby}")
                current = d
                last_y = None
                first_school_y = None
                district_counts[d] = 0
                continue
            if t.isdigit():
                continue
            if current is None:
                continue
            if first_school_y is not None and (y-last_y < 10 or x > origins[col]+2.0):
                if not records or records[-1]["district"] != current:
                    raise ValueError(f"{conf} orphan continuation {t}")
                records[-1]["name"] += " " + t
            else:
                records.append({
                    "name": t,
                    "conference": conf,
                    "district": current,
                    "region": (current-1)//8 + 1,
                })
                district_counts[current] += 1
            first_school_y = y
            last_y = y
    if sorted(district_counts) != list(range(1,33)):
        raise ValueError(f"{conf} missing/duplicate districts: {sorted(district_counts)}")
    if not MINIMUMS[conf] <= len(records) <= 350:
        raise ValueError(f"{conf} unexpected school count {len(records)}")
    if any(v<3 or v>13 for v in district_counts.values()):
        raise ValueError(f"{conf} implausible district team counts {district_counts}")
    for entry in records:
        entry["name"] = re.sub(r"\s+", " ", entry["name"]).strip()
    pairs=[(x["conference"], x["name"].casefold()) for x in records]
    if len(set(pairs)) != len(pairs):
        raise ValueError(f"{conf} duplicate school names: {len(pairs)-len(set(pairs))}")
    for x in records:
        if len(x["name"])<3 or x["name"].startswith("District"):
            raise ValueError(f"{conf} corrupt school entry: {x}")
    return records,district_counts

def main():
    all_entries=[]
    summaries=[]
    for conf, url in SOURCES.items():
        records, counts = parse(conf, fetch(url))
        for item in records:
            item["sourceUrl"]=url
        all_entries+=records
        summaries.append({"conference":conf,"schoolCount":len(records),"districtCount":len(counts),"sourceUrl":url,
                          "minDistrictSize":min(counts.values()),"maxDistrictSize":max(counts.values())})
        print(f"{conf}: {len(records)} listed school entries, {len(counts)} districts", flush=True)
        for district in [1,10,32]:
            names=[r["name"] for r in records if r["district"]==district]
            print(f"  D{district}: {names}", flush=True)
    obj={
      "season":"2026-27",
      "lastReviewed":DAY,
      "publisher":"University Interscholastic League",
      "description":"Official UIL 2026–27 SOFTBALL district matrix, including listed smaller schools in 2A alignment; not a general school classification or proof of participation/eligibility.",
      "sources":summaries,
      "schools":all_entries,
    }
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(json.dumps(obj,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    CSV_DEST.parent.mkdir(parents=True, exist_ok=True)
    with CSV_DEST.open("w",encoding="utf-8",newline="") as output:
        writer=csv.DictWriter(output,fieldnames=["name","conference","district","region","sourceUrl"])
        writer.writeheader()
        writer.writerows(all_entries)
    print(f"PASS TOTAL {len(all_entries)} named UIL softball alignment entries; wrote {DEST} and {CSV_DEST}",flush=True)

if __name__=="__main__":
    main()
