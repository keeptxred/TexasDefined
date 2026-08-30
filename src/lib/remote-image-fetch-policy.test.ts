import assert from "node:assert/strict";
import test from "node:test";

import {
  REMOTE_IMAGE_ACCEPT,
  REMOTE_IMAGE_USER_AGENT,
  remoteImageRequestHeaders,
} from "./remote-image-fetch-policy.ts";

test("remote image requests identify the TexasDefined image proxy bot", () => {
  assert.match(REMOTE_IMAGE_USER_AGENT, /TexasDefinedImageProxyBot\/\d+\.\d+/);
  assert.match(REMOTE_IMAGE_USER_AGENT, /https:\/\/texasdefined\.com\/about/);
});

test("remote image requests advertise image content and the descriptive user agent", () => {
  assert.deepEqual(remoteImageRequestHeaders(), {
    Accept: REMOTE_IMAGE_ACCEPT,
    "User-Agent": REMOTE_IMAGE_USER_AGENT,
  });
  assert.match(REMOTE_IMAGE_ACCEPT, /image\/\*/);
});
