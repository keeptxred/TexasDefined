#!/usr/bin/env python3
"""Inspect official TEA M&O/I&S workbook schema without altering site data."""
from io import BytesIO
from hashlib import sha256
from urllib.request import Request, urlopen
from openpyxl import load_workbook

SOURCE = ("https://tea.texas.gov/about-tea/state-funding/"
          "additional-finance-resources/school-district-adopted-tax-rates-1.xlsx")
req = Request(SOURCE, headers={"User-Agent": "TexasDefined/1.0 (+https://texasdefined.com)", "Accept":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
with urlopen(req, timeout=30) as response:
    raw = response.read(5_000_000)
if not raw.startswith(b"PK"):
    raise ValueError("TEA source was not a valid XLSX archive; fail closed")
print(f"source={SOURCE}\nsha256={sha256(raw).hexdigest()} bytes={len(raw)}")
wb = load_workbook(BytesIO(raw), read_only=True, data_only=True)
print("sheets:", [(s.title, s.max_row, s.max_column) for s in wb.worksheets])
for sheet in wb.worksheets:
    print("\nSHEET:", sheet.title)
    for i, row in enumerate(sheet.iter_rows(values_only=True)):
        if i < 8:
            print("HEADER", i + 1, repr([str(v)[:90] if v is not None else None for v in row[:22]]))
        if i > 10000: break
        values = [str(x).strip() if x is not None else "" for x in row]
        if any(x == "111903" or x.lower() == "tolar" or "tolar isd" in x.lower() for x in values[:10]):
            print("TOLAR SAMPLE", i + 1, repr(values[:42]))
    print("END SHEET")
