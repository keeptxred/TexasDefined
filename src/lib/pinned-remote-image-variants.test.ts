import assert from "node:assert/strict";
import test from "node:test";
import { PINNED_PHOTO_PATHS, pinnedRemoteImageVariant } from "./pinned-remote-image-variants.ts";

test("only the exact two approved licensed Wikimedia photographs map to pinned photos", () => {
  assert.equal(pinnedRemoteImageVariant(new URL("https://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg")), PINNED_PHOTO_PATHS[0]);
  assert.equal(pinnedRemoteImageVariant(new URL("https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Holocaust_%26_Human_Rights_Museum_Photo.png?width=1600")), PINNED_PHOTO_PATHS[1]);
  assert.equal(pinnedRemoteImageVariant(new URL("https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Holocaust_%26_Human_Rights_Museum_Photo.png")), PINNED_PHOTO_PATHS[1]);
});

test("foreign hosts, HTTP, different photos and extra query strings never reuse pinned assets", () => {
  for (const source of [
    "http://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg",
    "https://upload.wikimedia.org.evil.invalid/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg?foo=bar",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Other_Photograph.png?width=1600",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Holocaust_%26_Human_Rights_Museum_Photo.png?file=other.png",
  ]) {
    assert.equal(pinnedRemoteImageVariant(new URL(source)), null, source);
  }
});
