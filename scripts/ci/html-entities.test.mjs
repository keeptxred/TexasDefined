import test from "node:test";
import assert from "node:assert/strict";
import { decodeEntities } from "./html-entities.mjs";

test("auditor decodes decimal and hexadecimal numeric apostrophes", () => {
  assert.equal(decodeEntities("Freedmen&#x27;s Town"), "Freedmen's Town");
  assert.equal(decodeEntities("Freedmen&#X27;s Town"), "Freedmen's Town");
  assert.equal(decodeEntities("Freedmen&#39;s Town"), "Freedmen's Town");
});

test("auditor measures the real browser-visible SEO title length", () => {
  const raw = "Dallas Black History: Eight Historic Places, Civil Rights and Freedmen&#x27;s | Texas Defined";
  assert.equal(raw.length, 93);
  assert.equal(decodeEntities(raw).length, 88);
  assert.equal(decodeEntities(raw).length <= 90, true);
});

test("HTML entities preserve readable text across decimal, hex and named forms", () => {
  assert.equal(decodeEntities("Texas &amp; BBQ &quot;guides&quot; &mdash; 2026"), 'Texas & BBQ "guides" — 2026');
  assert.equal(decodeEntities("P&#xED;er &#128508;"), "Píer 🗼");
  assert.equal(decodeEntities("&unknown;"), "&unknown;");
  assert.equal(decodeEntities("&#x110000;"), "\ufffd");
  assert.equal(decodeEntities("&#0;"), "\ufffd");
});
