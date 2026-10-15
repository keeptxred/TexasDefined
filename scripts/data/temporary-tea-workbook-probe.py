import io,json,re,urllib.request,xml.etree.ElementTree as ET,zipfile
N={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
SOURCES={'history':'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx','sof':'https://tea.texas.gov/about-tea/state-funding/fy2025-2026-sof-data.xlsx'}
API='https://ftkznprjljkhymknvhye.supabase.co/functions/v1/public-school-district-tax-rates'
def get(url):
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (TexasDefined public-source comparison)'}),timeout=90) as r:return r.read()
def sheet(url,sheet_name=None):
 with zipfile.ZipFile(io.BytesIO(get(url))) as z:
  shared=[]
  if 'xl/sharedStrings.xml' in z.namelist():shared=[''.join(t.itertext()) for t in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',N)]
  wb=ET.fromstring(z.read('xl/workbook.xml'))
  rel={x.attrib['Id']:x.attrib['Target'] for x in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
  for sh in wb.findall('.//m:sheet',N):
   if sheet_name is not None and sh.attrib.get('name')!=sheet_name:continue
   target=rel.get(sh.attrib.get('{'+N['r']+'}id'))
   if not target:continue
   path=target.lstrip('/') if target.startswith('/') else 'xl/'+target
   data=ET.fromstring(z.read(path)).find('m:sheetData',N)
   rows=[]
   for row in data:
    cells={}
    for c in row:
     v=c.find('m:v',N);inline=c.find('m:is',N)
     if v is None and inline is None:continue
     value=v.text or '' if v is not None else ''.join(inline.itertext())
     if c.attrib.get('t')=='s' and value.isdigit():value=shared[int(value)]
     key=re.match(r'[A-Z]+',c.attrib.get('r',''))
     if key:cells[key.group(0)]=str(value).strip()
    if cells:rows.append(cells)
   return sh.attrib.get('name'),rows
 raise RuntimeError('No matching sheet '+str(sheet_name))
def norm(s):return re.sub(r'[^a-z0-9]+','-',s.lower().replace('&',' and ')).strip('-')
def rate(s):
 try:return float(s)
 except (ValueError,TypeError):return None
def show(label,items):print(label,len(items),json.dumps(items[:40]),flush=True)
name,rr=sheet(SOURCES['history'])
head=rr[0]
mo=next((k for k,v in head.items() if '2024-2025' in v and 'm&o' in v.lower()),None)
debt=next((k for k,v in head.items() if '2024-2025' in v and 'i&s' in v.lower()),None)
print('HISTORY',name,len(rr)-1,'COLUMNS',mo,debt,'LAST_HEADERS',list(head.items())[-6:],flush=True)
if not mo or not debt:raise RuntimeError('Missing TEA 2024 adopted rate history columns')
hist={}
for x in rr[1:]:
 cdn=x.get('A','').zfill(6)
 if cdn.isdigit() and x.get('B'):hist[cdn]={'cdn':cdn,'name':x['B'],'mo':rate(x.get(mo)),'debt':rate(x.get(debt))}
print('HISTORY_RECORDS',len(hist),flush=True)
for cdn in ['200901','099902','220907','223904']:print('HISTORY_KNOWN',cdn,hist.get(cdn),flush=True)
api=json.loads(get(API));production=api['rows']
h_names={norm(x['name']):x for x in hist.values()}
unmatched=[];differences=[]
for x in production:
 h=hist.get(x.get('officialCdn') or '')
 if not h:unmatched.append({'cdn':x.get('officialCdn'),'name':x['name']});continue
 for label,a,b in [('2024 total',x['priorRate'],None if h['mo'] is None or h['debt'] is None else h['mo']+h['debt'])]:
  if a is None or b is None or abs(float(a)-b)>0.00015:differences.append({'cdn':h['cdn'],'name':x['name'],'field':label,'production_2024':a,'TEA_2024':b})
print('PRODUCTION_YEAR',api.get('year'),'PRODUCTION_ROWS',len(production),'HISTORY_CDN_MATCHES',len(production)-len(unmatched),flush=True)
show('UNMATCHED_NAMES',unmatched);show('HISTORY_2024_DIFFERENCES',differences)
sof_name,sr=sheet(SOURCES['sof'],'inputs_lpe')
sh=sr[0];smo=next((k for k,v in sh.items() if v.strip().lower()=='py1_mo_rate_adopt'),None)
si=next((k for k,v in sh.items() if v.strip().lower()=='i_s_rate'),None)
print('SOF',sof_name,'ROWS',len(sr)-1,'RATE_COLUMNS',smo,si,'OTHER_RATE_COLUMNS',[(k,v) for k,v in sh.items() if 'RATE' in v][:24],flush=True)
sd={x.get('A','').zfill(6):x for x in sr[1:] if x.get('A','').zfill(6).isdigit()}
for cdn in ['200901','099902','220907','223904']:
 z=sd.get(cdn,{});print('SOF_KNOWN',cdn,z.get('D'),z.get(smo),z.get(si),flush=True)
if smo and si:
 differences2=[];matches2=0
 for x in production:
  h=hist.get(x.get('officialCdn') or '')
  if not h or h['cdn'] not in sd:continue
  so=sd[h['cdn']];matches2+=1
  for label,a,b in [('M&O',x['maintenanceOperationsRate'],rate(so.get(smo))),('I&S',x['debtServiceRate'],rate(so.get(si)))]:
   if a is None or b is None or abs(float(a)-b)>0.00015:differences2.append({'cdn':h['cdn'],'name':x['name'],'field':label,'production':a,'SOF':b})
 print('SOF_CDN_MATCHES',matches2,flush=True);show('SOF_DIFFERENCES',differences2)
