import test from "node:test";
import assert from "node:assert/strict";
import { findOfficial2027CalendarImages, validateMonthlyCalendar, refresh } from "./refresh-palestine-polar-express-season.mjs";

const official = "https://texasstaterailroad.net/wp-content/uploads/2027/";
const markup = '<h1>THE POLAR EXPRESS</h1>' +
  '<img alt="November 2027 Polar Express Calendar" src="' + official + 'November-2027.png">' +
  '<img alt="December 2027 Polar Express Calendar" src="' + official + 'December-2027.png">';
const weekday = date => new Intl.DateTimeFormat("en-US",{weekday:"long",timeZone:"UTC"}).format(new Date(date+"T00:00:00Z"));
const days = (month, start, count) => {
  const dates=[];
  for(let day=start;day<start+count;day++){
    const date="2027-"+String(month).padStart(2,"0")+"-"+String(day).padStart(2,"0");
    dates.push({date,weekday:weekday(date),times:["3:00 PM","5:30 PM"]});
  }
  return {year:2027,month,calendarYearVisible:true,calendarMonthVisible:true,ambiguous:false,dates};
};
const nov=days(11,10,8),dec=days(12,10,14);
test("only accepts official 2027 month-calendar images",()=>{
  assert.deepEqual(findOfficial2027CalendarImages(markup),{november:official+"November-2027.png",december:official+"December-2027.png"});
  assert.equal(findOfficial2027CalendarImages(markup.replaceAll("2027","2026")),null);
  assert.equal(findOfficial2027CalendarImages(markup.replaceAll("texasstaterailroad.net","untrusted.example")),null);
});
test("rejects incorrect year, weekday, duplicate and invented time",()=>{
  assert.equal(validateMonthlyCalendar(nov,11).length,8);
  assert.throws(()=>validateMonthlyCalendar({...nov,year:2026},11));
  assert.throws(()=>validateMonthlyCalendar({...nov,dates:[{...nov.dates[0],weekday:"Sunday"},...nov.dates.slice(1)]},11));
  assert.throws(()=>validateMonthlyCalendar({...nov,dates:[nov.dates[0],nov.dates[0],...nov.dates.slice(1)]},11));
  assert.throws(()=>validateMonthlyCalendar({...nov,dates:[{...nov.dates[0],times:["25:00 PM"]},...nov.dates.slice(1)]},11));
});
test("two matching reads can generate a bounded 2027 schedule",async()=>{
  const parsed=await refresh({html:markup,current:{year:2026},checkedAt:"2027-09-01",
    images:async url=>url,
    vision:async (_image,month)=>validateMonthlyCalendar(month===11?nov:dec,month)});
  assert.equal(parsed.changed,true);
  assert.equal(parsed.next.year,2027);
  assert.equal(parsed.next.startDate,"2027-11-10");
  assert.equal(parsed.next.endDate,"2027-12-23");
  assert.equal(parsed.next.dates.length,22);
  const unchanged=await refresh({html:markup,current:parsed.next,checkedAt:"2027-09-08",
    images:async url=>url,
    vision:async (_image,month)=>validateMonthlyCalendar(month===11?nov:dec,month)});
  assert.equal(unchanged.changed,false);
});
test("no 2027 images means no rollover even with old 2026 material",async()=>{
  const r=await refresh({html:'<h1>THE POLAR EXPRESS 2026</h1>',current:{year:2026},
    checkedAt:"2027-05-01",images:async()=>{throw Error("should not fetch images")},
    vision:async()=>{throw Error("should not use vision")}});
  assert.equal(r.changed,false);
});
test("inconsistent independent image reads fail closed",async()=>{
  let calls=0;
  await assert.rejects(()=>refresh({html:markup,current:{year:2026},checkedAt:"2027-09-01",
    images:async url=>url,
    vision:async (_image,month)=>{calls++; const rows=validateMonthlyCalendar(month===11?nov:dec,month);
      if(calls===2)return [{...rows[0],times:["4:00 PM"]},...rows.slice(1)];return rows}}),/disagree/);
});
