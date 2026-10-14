import io, urllib.request, xml.etree.ElementTree as ET, zipfile
URLs={"TEA adopted history":"https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx","TEA SOF 2025-26":"https://tea.texas.gov/about-tea/state-funding/fy2025-2026-sof-data.xlsx"}
N={"m":"http://schemas.openxmlformats.org/spreadsheetml/2006/main","r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
for name,url in URLs.items():
 print("SOURCE",name,url,flush=True)
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"}),timeout=45) as response: raw=response.read()
  print("SIZE",len(raw),flush=True)
  with zipfile.ZipFile(io.BytesIO(raw)) as z:
   shared=[]
   if "xl/sharedStrings.xml" in z.namelist(): shared=["".join(node.itertext()) for node in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si",N)]
   w=ET.fromstring(z.read("xl/workbook.xml"))
   rel={x.attrib["Id"]:x.attrib["Target"] for x in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
   for sh in w.findall(".//m:sheet",N):
    target=rel.get(sh.attrib.get("{"+N["r"]+"}id"))
    if not target: continue
    path=target.lstrip("/") if target.startswith("/") else "xl/"+target
    if path not in z.namelist(): print("SKIP",sh.attrib.get("name"),path);continue
    root=ET.fromstring(z.read(path)); data=root.find("m:sheetData",N)
    if data is None: continue
    print("SHEET",sh.attrib.get("name"),"ROWS",len(data),flush=True)
    for row in list(data)[:8]:
     cells=[]
     for c in row:
      v=c.find("m:v",N); inline=c.find("m:is",N)
      value=(v.text or "") if v is not None else ("".join(inline.itertext()) if inline is not None else "")
      if c.attrib.get("t")=="s" and value.isdigit(): value=shared[int(value)]
      if value.strip(): cells.append((c.attrib.get("r"),value[:65]))
     if cells:print("ROW",row.attrib.get("r"),repr(cells[:45])[:4200],flush=True)
 except Exception as exc: print("SOURCE ERROR",repr(exc),flush=True)
