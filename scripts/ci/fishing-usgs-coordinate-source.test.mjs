import test from "node:test";
import assert from "node:assert/strict";
import { usgsQueryForMonitoringPage, inspectUsgsMonitoringPoint } from "./fishing-usgs-coordinate-source.mjs";

const records = [
  ["calaveras-lake", "USGS-291938098210101", 29.3274592942846, -98.3505687406803, "Calaveras Lk at Foster Rd"],
  ["white-rock-lake", "USGS-324940096433701", 32.827905078433, -96.7272208610833, "White Rk Lk, mid-lk"],
  ["lake-bastrop", "USGS-300850097161401", 30.1472222222222, -97.2705555555556, "Lake Bastrop nr Bastrop"],
];
function feature(id, lat, lng, name) {
  return { type: "Feature", id,
    properties: { monitoring_location_name: name },
    geometry: { type: "Point", coordinates: [lng, lat] } };
}
for (const [slug, id, lat, lng, name] of records) {
  test(slug + " exact USGS monitoring source lookup and reviewed point", () => {
    const source = "https://waterdata.usgs.gov/monitoring-location/" + id
      + (slug === "lake-bastrop" ? "/statistics/" : "/");
    const query = usgsQueryForMonitoringPage(source);
    assert.equal(query.sourceId, id);
    const u = new URL(query.queryUrl);
    assert.equal(u.origin, "https://api.waterdata.usgs.gov");
    assert.equal(u.pathname, "/ogcapi/v1/collections/monitoring-locations/items");
    assert.equal(u.searchParams.get("id"), id);
    assert.equal(u.searchParams.get("limit"), "2");
    const result = inspectUsgsMonitoringPoint(
      { features: [feature(id, lat, lng, name + " TX")] }, id,
      { lat, lng, sourceNeedle: name },
    );
    assert.equal(result.issue, null);
    assert.equal(result.idMatched, true);
    assert.equal(result.nameMatched, true);
  });
}
test("reject untrusted URLs and other station API paths", () => {
  for (const source of [
    "http://waterdata.usgs.gov/monitoring-location/USGS-291938098210101",
    "https://waterdata.usgs.gov.evil.test/monitoring-location/USGS-291938098210101/",
    "https://api.waterdata.usgs.gov/ogcapi/v1/collections/monitoring-locations/items?id=USGS-291938098210101",
    "https://waterdata.usgs.gov/monitoring-location/USGS-291938098210101/other",
    "https://waterdata.usgs.gov/monitoring-location/USGS-291938098210101/?x=wrong",
    "https://waterdata.usgs.gov/monitoring-location/USGS-INVALID/",
  ]) assert.equal(usgsQueryForMonitoringPage(source), null, source);
});
test("fail closed on absent, duplicate and mismatched USGS features", () => {
  const id="USGS-291938098210101",lat=29.3274592942846,lng=-98.3505687406803;
  const record={lat,lng,sourceNeedle:"Calaveras Lk at Foster Rd"};
  const good=feature(id,lat,lng,"Calaveras Lk at Foster Rd");
  const bad=[
    {},
    {features:[]},
    {features:[good,good]},
    {features:[feature("USGS-291938098210102",lat,lng,record.sourceNeedle)]},
    {features:[feature(id,lat,lng,"Unrelated Lake")]},
    {features:[feature(id,lat+0.001,lng,record.sourceNeedle)]},
    {features:[feature(id,lat,lng-0.001,record.sourceNeedle)]},
    {features:[{...good,geometry:null}]},
    {features:[{...good,geometry:{type:"LineString",coordinates:[lng,lat]}}]},
    {features:[{...good,geometry:{type:"Point",coordinates:["-98.3505","29.3274"]}}]},
  ];
  for(const response of bad)assert.notEqual(inspectUsgsMonitoringPoint(response,id,record).issue,null);
});
