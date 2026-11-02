import assert from "node:assert/strict";
import test from "node:test";
import { optimizedRemoteImageUpstream, REMOTE_IMAGE_MAX_WIDTH } from "./remote-image-upstream.ts";

test("Wikimedia Commons special-file links keep the same photo and bound oversized widths", () => {
  const source = new URL("https://commons.wikimedia.org/wiki/Special:Redirect/file/San%20Solomon%20Springs.jpg?width=1600");
  const image = optimizedRemoteImageUpstream(source);
  assert.equal(image.pathname, source.pathname);
  assert.equal(image.searchParams.get("width"), String(REMOTE_IMAGE_MAX_WIDTH));
  assert.equal(source.searchParams.get("width"), "1600");
});

test("Special:FilePath and published Wikimedia redirect query forms are bounded", () => {
  const a = optimizedRemoteImageUpstream(new URL("https://commons.wikimedia.org/wiki/Special:FilePath/Example.jpg"));
  assert.equal(a.searchParams.get("width"), "1200");
  const b = optimizedRemoteImageUpstream(new URL("https://commons.wikimedia.org/w/index.php?title=Special%3ARedirect%2Ffile%2FExample.jpg&width=720"));
  assert.equal(b.searchParams.get("width"), "720");
});

test("full-resolution Commons upload URLs use the Wikimedia supported redirect for the identical filename", () => {
  const original = new URL("https://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town.jpg");
  const image = optimizedRemoteImageUpstream(original);
  assert.equal(image.hostname, "commons.wikimedia.org");
  assert.equal(image.searchParams.get("title"), "Special:Redirect/file/Tenth_Street_Historic_District_Freedmen's_Town.jpg");
  assert.equal(image.searchParams.get("width"), "1200");
});

test("do not rewrite existing thumbnails, GIFs, unknown hosts or unrecognized paths", () => {
  for (const url of [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/test.jpg/800px-test.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a1/animation.gif",
    "https://basemap.nationalmap.gov/example.jpg",
    "https://research.fs.usda.gov/example.jpg",
    "https://commons.wikimedia.org/wiki/File:Example.jpg",
  ]) {
    assert.equal(optimizedRemoteImageUpstream(new URL(url)).href, url);
  }
});

test("Unsplash clamps size/quality while keeping photo ID and crop params", () => {
  const original = new URL("https://images.unsplash.com/photo-123?fit=crop&w=4000&q=100");
  const image = optimizedRemoteImageUpstream(original);
  assert.equal(image.pathname, original.pathname);
  assert.equal(image.searchParams.get("fit"), "crop");
  assert.equal(image.searchParams.get("w"), "1200");
  assert.equal(image.searchParams.get("q"), "78");
  assert.equal(image.searchParams.get("auto"), "format");
});
