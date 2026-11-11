import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { imageRightsFor } from "./image-rights.ts";

// Photo identity, copyright and reuse terms checked against the *individual*
// Commons file pages. The URLs below are the published hero asset addresses,
// not arbitrary photos of the same locations.
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const photos = [
  {
    page: "texas-high-school-football-playoffs-explained",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Celina_High_School%2C_Friday_Night_Football.jpg",
    file: "Celina_High_School,_Friday_Night_Football.jpg",
    creator: "Heidi Knapp",
    fixture: "src/data/fixtures/texas-high-school-football-playoffs.ts",
  },
  {
    page: "texas-six-man-football-rules-explained",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bart_Coan_Field_from_west.jpg?width=1600",
    file: "Bart_Coan_Field_from_west.jpg",
    creator: "Fortguy",
    fixture: "src/data/fixtures/texas-six-man-football-explained.ts",
  },
  {
    page: "texas-cultural-regions-explained",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Panna_Maria_%281_of_1%29.jpg",
    file: "Panna_Maria_(1_of_1).jpg",
    creator: "Renelibrary",
    fixture: "src/data/fixtures/texas-cultural-regions-explained.ts",
  },
  {
    page: "texas-major-cities-regional-differences",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Houston_texas_usa_skyline.jpg/1280px-Houston_texas_usa_skyline.jpg",
    file: "Houston_texas_usa_skyline.jpg",
    creator: "Leeannoneal",
    fixture: "src/data/fixtures/texas-life-split-source.ts",
  },
  {
    page: "south-padre-island",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/South_Padre_Island_beach_panorama.jpg?width=1600",
    file: "South_Padre_Island_beach_panorama.jpg",
    creator: "Spheroidite",
    fixture: "src/data/coastal-heritage-authority.ts",
  },
] as const;

test("five licensed Commons hero images emit creator, real ownership, license and acquisition page", () => {
  for (const photo of photos) {
    const rights = imageRightsFor(photo.src);
    assert.ok(rights, photo.page);
    assert.equal(rights.creator.name, photo.creator, photo.page);
    assert.equal(rights.creator["@type"], "Person", photo.page);
    assert.equal(rights.copyrightNotice, `© ${photo.creator}`, photo.page);
    assert.equal(rights.license, CC_BY_SA_4, photo.page);
    assert.equal(rights.acquireLicensePage, `https://commons.wikimedia.org/wiki/File:${photo.file}`, photo.page);
    const fixture = readFileSync(photo.fixture, "utf8");
    // Prevent replacing a photo without updating its verified attribution.
    assert.ok(fixture.includes(photo.creator), photo.fixture);
    assert.ok(fixture.includes(photo.file.split(",")[0].split("(")[0]), photo.fixture);
  }
});

test("delivered /remote proxy and nested percent encoding keep verified Commons provenance", () => {
  for (const photo of photos) {
    const proxied = "/remote?url=" + encodeURIComponent(photo.src);
    const twiceProxied = "/remote?url=" + encodeURIComponent(proxied);
    for (const src of [proxied, twiceProxied]) {
      assert.deepEqual(imageRightsFor(src), imageRightsFor(photo.src), photo.page);
    }
  }
});

test("Blue Bell factory photo uses verified 2008 photographer rights on exact Commons source only", () => {
  const file = "Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg";
  const src = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${file}`;
  const expected = {
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Person", name: "Larry D. Moore" },
    copyrightNotice: "© 2008 Larry D. Moore",
    acquireLicensePage: `https://commons.wikimedia.org/wiki/File:${file}`,
  };
  for (const candidate of [
    src,
    src + "?width=1600",
    "/media/remote?url=" + encodeURIComponent(src),
    "/remote?url=" + encodeURIComponent("/media/remote?url=" + encodeURIComponent(src)),
  ]) assert.deepEqual(imageRightsFor(candidate), expected, candidate);
  for (const candidate of [
    `https://example.com/wiki/Special:Redirect/file/${file}`,
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/replaced-${file}`,
    `https://commons.wikimedia.org/wiki/File:${file}`,
    `/media/remote?url=${encodeURIComponent("https://example.com/" + file)}`,
  ]) assert.equal(imageRightsFor(candidate), null, candidate);
  const route = readFileSync("src/routes/article.$slug.tsx", "utf8");
  assert.ok(route.includes("Modern_Blue_Bell_Creameries_factory_located_in_Brenham"));
  assert.ok(route.includes("...(imageRights ?? {})"));
  const ledger = readFileSync("src/data/heritage-photo-license-links.ts", "utf8");
  assert.ok(ledger.includes("File:Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg"));
});

test("Big Tex, Magoffin Home and Fredericksburg Marktplatz use exact source-verified rights", () => {
  const cases = [
    ["State_Fair_of_Texas_September_2019_13_(Big_Tex).jpg", "Michael Barera",
      "https://creativecommons.org/licenses/by-sa/4.0/", "© Michael Barera"],
    ["Magoffin_home_2009.jpg", "Larry D. Moore",
      "https://creativecommons.org/licenses/by/4.0/", "© 2009 Larry D. Moore"],
    ["Fredericksburg July 2017 5 (Marktplatz).jpg", "Michael Barera",
      "https://creativecommons.org/licenses/by-sa/4.0/", "© Michael Barera"],
  ];
  for (const [file, creator, license, copyrightNotice] of cases) {
    const src = "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + encodeURIComponent(file);
    const expected = {
      license, creator: { "@type": "Person", name: creator },
      copyrightNotice,
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:" + file.replaceAll(" ", "_"),
    };
    for (const candidate of [
      src, "/remote?url=" + encodeURIComponent(src),
      "/media/remote?url=" + encodeURIComponent(src),
    ]) assert.deepEqual(imageRightsFor(candidate), expected, candidate);
    for (const candidate of [
      "https://example.com/wiki/Special:Redirect/file/" + encodeURIComponent(file),
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/replaced-" + encodeURIComponent(file),
    ]) assert.equal(imageRightsFor(candidate), null, candidate);
  }
  const route = readFileSync("src/routes/article.$slug.tsx", "utf8");
  for (const marker of ["State_Fair_of_Texas_September_2019_13", "Magoffin_home_2009", "Fredericksburg(?:%20| )July"]) {
    assert.ok(route.includes(marker), marker);
  }
});

test("Ocho Restaurant cafe-table photo uses independently sourced Nan Palmero CC BY 2.0 rights", () => {
  const file = "Cafe_Table_at_Ocho_Restaurant,_San_Antonio,_Texas_(2014-12-10_16.51.3_by_Nan_Palmero).jpg";
  const source = "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + file;
  const expected = {
    license: "https://creativecommons.org/licenses/by/2.0/",
    creator: { "@type": "Person", name: "Nan Palmero" },
    copyrightNotice: "© Nan Palmero",
    acquireLicensePage: "https://commons.wikimedia.org/wiki/File:" + file,
  };
  for (const candidate of [
    source,
    source + "?width=1600",
    "/remote?url=" + encodeURIComponent(source),
    "/media/remote?url=" + encodeURIComponent(source),
    "/remote?url=" + encodeURIComponent("/media/remote?url=" + encodeURIComponent(source)),
  ]) assert.deepEqual(imageRightsFor(candidate), expected, candidate);
  for (const candidate of [
    "https://example.com/wiki/Special:Redirect/file/" + file,
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/replaced-" + file,
    "https://commons.wikimedia.org/wiki/File:" + file,
    "/remote?url=" + encodeURIComponent("https://example.com/" + file),
  ]) assert.equal(imageRightsFor(candidate), null, candidate);
  const route = readFileSync("src/routes/article.$slug.tsx", "utf8");
  assert.ok(route.includes("Cafe_Table_at_Ocho_Restaurant"));
  assert.ok(route.includes("...(imageRights ?? {})"));
});

test("Britten USA hero photo uses exact Commons-verified Dustin Moore CC BY 2.0 provenance", () => {
  const source = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Britten%20USA.jpg?width=1600";
  const expected = {
    license: "https://creativecommons.org/licenses/by/2.0/",
    creator: { "@type": "Person", name: "Dustin Moore" },
    copyrightNotice: "© Dustin Moore",
    acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Britten_USA.jpg",
  };
  for (const candidate of [
    source,
    "/remote?url=" + encodeURIComponent(source),
    "/media/remote?url=" + encodeURIComponent(source),
    "/remote?url=" + encodeURIComponent("/media/remote?url=" + encodeURIComponent(source)),
  ]) assert.deepEqual(imageRightsFor(candidate), expected, candidate);
  for (const candidate of [
    "https://example.com/wiki/Special:Redirect/file/Britten%20USA.jpg",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/replaced-Britten%20USA.jpg",
    "https://commons.wikimedia.org/wiki/File:Britten_USA.jpg",
    "/remote?url=" + encodeURIComponent("https://example.com/Britten%20USA.jpg"),
  ]) assert.equal(imageRightsFor(candidate), null, candidate);
  const route = readFileSync("src/routes/article.$slug.tsx", "utf8");
  assert.ok(route.includes("Britten(?:%20| )USA"));
  assert.ok(route.includes("...(imageRights ?? {})"));
});

test("public-domain Army Corps image does not falsely claim a private copyright owner", () => {
  const path = "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg";
  for (const src of [path, `https://texasdefined.com${path}`]) {
    const rights = imageRightsFor(src);
    assert.ok(rights);
    assert.equal(rights.creator["@type"], "Organization");
    assert.equal(rights.creator.name, "U.S. Army Corps of Engineers");
    assert.match(rights.copyrightNotice, /public domain/i);
    assert.match(rights.copyrightNotice, /no copyright claim/i);
    assert.equal(rights.license, "https://commons.wikimedia.org/wiki/File:USACE_Ray_Roberts_Lake_and_Dam.jpg");
    assert.equal(rights.acquireLicensePage, rights.license);
  }
  const article = readFileSync("src/data/fixtures/texas-lakes-reservoirs-explained.ts", "utf8");
  const ledger = readFileSync("src/data/fishing/lake-photo-governance.ts", "utf8");
  assert.ok(article.includes(path));
  assert.ok(ledger.includes("USACE Ray Roberts Lake and Dam.jpg"));
  assert.ok(ledger.includes(path));
});

test("unrelated, replaced or spoofed photos never inherit another creator's rights", () => {
  for (const src of [
    "https://example.com/images/Celina_High_School,_Friday_Night_Football.jpg",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/unverified-photo.jpg",
    "/images/explore/lakes-rivers/replacement.jpg",
    "/remote?url=https%3A%2F%2Fexample.com%2FCelina_High_School%2C_Friday_Night_Football.jpg",
    "",
  ]) assert.equal(imageRightsFor(src), null, src);
});

test("historically verified fall photos keep their existing rights", () => {
  const rights = imageRightsFor("https://upload.wikimedia.org/wikipedia/commons/Daingerfield_sp_reflection.jpg");
  assert.ok(rights);
  assert.equal(rights.creator.name, "Larry D. Moore");
  assert.equal(rights.license, "https://creativecommons.org/licenses/by/4.0/");
});

test("both SEO head routes attach the verified data to the published ImageObject", () => {
  const article = readFileSync("src/routes/article.$slug.tsx", "utf8");
  const destination = readFileSync("src/routes/destination.$slug.tsx", "utf8");
  assert.ok(article.includes("imageRightsFor(article.hero.src)"));
  assert.ok(article.includes("...(imageRights ?? {})"));
  assert.ok(article.includes("ray-roberts-lake-isle-du-bois-unit"));
  for (const photo of photos.slice(0, 4)) {
    assert.ok(article.includes(photo.file.split("_")[0]), photo.page);
  }
  assert.ok(article.includes("href={imageRights.acquireLicensePage}"),
    "Readers must receive the image's original source and reuse information");
  assert.ok(article.includes("href={imageRights.license}"),
    "Creative Commons licensing link must be visible next to attribution");
  assert.ok(destination.includes("imageRightsFor(destination.hero.src)"));
  assert.ok(destination.includes("...magoffinImageRights, ...moodyGardensImageRights"),
    "Existing one-off verified rights must not be removed");
});
