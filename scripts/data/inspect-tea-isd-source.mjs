import * as XLSX from 'npm:xlsx@0.18.5';

const url='https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-adopted-tax-rates-1.xlsx';
const response=await fetch(url,{headers:{'user-agent':'TexasDefined/ISD-Source-Integrity/1.0'},signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error('TEA official file not available HTTP '+response.status);
const bytes=new Uint8Array(await response.arrayBuffer());
if(bytes.length<100000)throw Error('TEA official source appears truncated');
const book=XLSX.read(bytes,{type:'array',raw:true});
const rows=Object.fromEntries(book.SheetNames.map(name=>[name,XLSX.utils.sheet_to_json(book.Sheets[name],{header:1,defval:null,raw:true})]));
console.log('TEA workbooks:',JSON.stringify(book.SheetNames));
for(const name of book.SheetNames){
  const data=rows[name];console.log('SHEET',name,'rows',data.length,'maxcols',Math.max(...data.slice(0,30).map(x=>x.length)));
  for(const [i,row] of data.slice(0,10).entries()){
    console.log('  row',i,JSON.stringify(row.slice(0,75)));
  }
  console.log('  Tolar row snippets:',JSON.stringify(data.filter(row=>row.some(v=>String(v??'').toLowerCase().includes('tolar'))).slice(0,2).map(row=>row.slice(0,75))));
}
