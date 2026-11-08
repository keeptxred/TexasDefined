import test from "node:test";
import assert from "node:assert/strict";
import { extractAccessFacilityHeadings } from "./parse-tpwd-access-facilities.mjs";

test("TPWD sidebar and footer headings are not access facilities", () => {
  const html = `<aside>
    <h4>Fishing</h4><h4>Water Resources</h4><h4>Local Information</h4>
    <h4>Nearby State Parks</h4>
    </aside><main><h1>Lake Meredith</h1><h2>Public Access Facilities</h2>
    <h6>Sanford Yake</h6><h6>Cedar Canyon</h6>
    <h6>Fritch Fortress</h6><h6>Harbor Bay</h6>
    <h2>Sign Up for Email Updates.</h2><h6>Privacy Policy</h6></main>`;
  assert.deepEqual(extractAccessFacilityHeadings(html), [
    "Sanford Yake", "Cedar Canyon", "Fritch Fortress", "Harbor Bay"
  ]);
});

test("only Lake Houston article facilities are retained, not sidebar navigation", () => {
  const html = `<h4>Fishing</h4><h4>Water Resources</h4><h4>Nearby State Parks</h4>
    <h1>Lake Houston</h1><h2 class="title">Public Access Facilities</h2>
    <h6>BJ&#39;s Marina</h6><h6>Ponderosa Marina</h6>
    <h6>Lake Houston Marina</h6><h6>Duessen Park</h6>
    <h2>Sign Up for Email Updates</h2><h6>Back to Top</h6>`;
  assert.deepEqual(extractAccessFacilityHeadings(html), [
    "BJ's Marina", "Ponderosa Marina", "Lake Houston Marina", "Duessen Park"
  ]);
});

test("missing access article never promotes unrelated headings", () => {
  const html = "<h4>Fishing</h4><h4>Water Resources</h4><h6>Shoreline</h6>";
  assert.deepEqual(extractAccessFacilityHeadings(html), []);
});

test("TPWD alternate heading depth, deduplication, and link text are supported", () => {
  const html = `<h2>Public Access Facilities</h2>
    <h3><a href="#public-access">North &amp; South Ramp</a></h3>
    <h5>North &amp; South Ramp</h5><h6>Fishing Reports</h6>
    <h3>Return to Lake Access</h3><h6>West Bay Park</h6>
    <h2>Other Facilities</h2><h6>Unrelated</h6>`;
  assert.deepEqual(extractAccessFacilityHeadings(html), ["North & South Ramp", "West Bay Park"]);
});
