/** USGS GNIS official feature-id and point verification, not browser-SPA text scraping. */
const summary=/^https:\/\/edits\.nationalmap\.gov\/apps\/gaz-domestic\/public\/summary\/([0-9]+)\/?$/;
export function gnisQueryForSummary(url){
 const m=summary.exec(url||"");if(!m)return null;
 const u=new URL("https://carto-wfs.nationalmap.gov/arcgis/rest/services/geonames/MapServer/4/query");
 u.searchParams.set("where","gaz_id = "+m[1]);u.searchParams.set("outFields","gaz_id,gaz_name,gaz_featureclass");
 u.searchParams.set("returnGeometry","true");u.searchParams.set("outSR","4326");u.searchParams.set("f","json");
 return {sourceId:Number(m[1]),queryUrl:u.toString()};
}
export function inspectGnisPoint(payload,sourceId,record){
 const features=payload?.features;
 if(!Array.isArray(features)||features.length!==1)return {idMatched:false,nameMatched:false,latMatched:false,lngMatched:false,issue:"GNIS official feature lookup returned other than one point"};
 const f=features[0];
 const idMatched=Number(f?.attributes?.gaz_id)===sourceId;
 const nameMatched=typeof f?.attributes?.gaz_name==="string"&&f.attributes.gaz_name.trim().toLowerCase()===record.sourceNeedle.trim().toLowerCase();
 const latitude=f?.geometry?.y,longitude=f?.geometry?.x;
 const latMatched=Number.isFinite(latitude)&&Math.abs(latitude-record.lat)<=0.00001;
 const lngMatched=Number.isFinite(longitude)&&Math.abs(longitude-record.lng)<=0.00001;
 return {idMatched,nameMatched,latMatched,lngMatched,latitude,longitude,officialName:f?.attributes?.gaz_name??null,issue:idMatched&&nameMatched&&latMatched&&lngMatched?null:"GNIS feature ID, official name or coordinates differ"};
}
