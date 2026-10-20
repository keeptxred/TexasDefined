import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const requireMatch = (source, needle, label) => {
  if (!source.includes(needle)) throw new Error("Lake / county crosslink regression: " + label);
};
const repo = {
  haskell: read("src/data/fixtures/haskell-county-haskell-rice-springs-railroads-brazos-rolling-plains-texas.ts"),
  nolan: read("src/data/fixtures/nolan-county-sweetwater-wasp-wind-railroads-big-country-texas.ts"),
  jones: read("src/data/fixtures/jones-county-anson-stamford-fort-phantom-rolling-plains-texas.ts"),
  mitchell: read("src/data/fixtures/mitchell-county-colorado-city-profile.ts"),
  lakes: read("src/data/fishing/statewide-lake-network.ts"),
  routing: read("src/data/fishing/slugs.ts"),
  showcase: read("src/data/fishing/showcase-lake-routing.ts"),
  directory: read("src/routes/fishing.lakes.tsx"),
  search: read("src/data/fishing/search.ts"),
  countyRenderer: read("src/components/content/CountyGuideSections.tsx"),
  explainer: read("src/data/fixtures/texas-lakes-reservoirs-explained.ts"),
  explore: read("src/routes/explore.$category.lazy.tsx"),
};

const expectedCountyRoutes = [
  ["haskell", "lake-stamford"],
  ["nolan", "lake-sweetwater"],
  ["jones", "lake-stamford"],
  ["mitchell", "lake-sweetwater"],
];
for (const [county, lake] of expectedCountyRoutes) {
  // All county editorial fixtures expose links under internalLinks, not inert body text.
  const fixture = repo[county];
  const linkBlock = fixture.slice(fixture.indexOf("internalLinks: ["), fixture.indexOf("relatedCollections:"));
  const target = `href: "/fishing/lakes/${lake}"`;
  requireMatch(linkBlock, target, `${county} missing ${lake} editorial link`);
  if (linkBlock.split(target).length - 1 !== 1) throw new Error(`Duplicate county navigation link: ${county} → ${lake}`);
  const links = [...linkBlock.matchAll(/href: "/g)].length;
  if (links > 8) throw new Error(`County editorial navigation slice(0, 8) would hide ${county}'s lake link`);
}

for (const lake of ["lake-stamford", "lake-sweetwater"]) {
  requireMatch(repo.routing, `"${lake}"`, `${lake} not published by complete-lake registry`);
  requireMatch(repo.lakes, `slug: "${lake}", name:`, `${lake} missing official lake data`);
  requireMatch(repo.explainer, `href: "/fishing/lakes/${lake}"`, `${lake} missing statewide reservoir explainer link`);
  requireMatch(repo.explore, `to="/fishing/lakes/${lake}"`, `${lake} missing explore lakes-rivers discovery link`);
}
for (const [lake, county] of [["lake-stamford", "Haskell"], ["lake-sweetwater", "Nolan"]]) {
  const block = repo.lakes.slice(repo.lakes.indexOf(`slug: "${lake}", name:`));
  requireMatch(block.slice(0, 850), `counties: ["${county}"]`, `${lake} missing correct county identity`);
}
requireMatch(repo.lakes, "href: `/county/${countySlug(county)}`", "shared lake template must provide reciprocal county links");
requireMatch(repo.explore, 'match.slug === "lakes-rivers"', "lake links must only be in relevant explore section");
for (const c of ["haskell", "nolan"]) requireMatch(repo.explore, `to="/county/${c}"`, `explore lake discovery missing ${c} county link`);
requireMatch(repo.lakes, '{slug:"lake-stamford",name:"Lake Stamford"}', "neighboring lake route back to Stamford is missing");
requireMatch(repo.lakes, '{slug:"lake-sweetwater",name:"Lake Sweetwater"}', "neighboring lake route back to Sweetwater is missing");
requireMatch(repo.countyRenderer, "countySeriesArticle.internalLinks ?? []", "county landing pages no longer consume editorial cross-links");
requireMatch(repo.countyRenderer, ").slice(0, 8)", "county landing-page link visibility contract changed");
requireMatch(repo.showcase, "STATEWIDE_NETWORK_SHOWCASE_LAKE_SLUGS", "showcase routing missing statewide lake registry");
requireMatch(repo.directory, "isCompleteFishingLakeSlug(lake.slug)", "directory no longer shows all complete lake guides");
requireMatch(repo.search, "fishingFoundationAnchor(\"lake\", lake.slug)", "site search no longer indexes lake guide URLs");

// Guard against promoting Lake Sweetwater's poor fishery as a recommended angling destination.
requireMatch(repo.nolan, "golden-alga impacts", "county page missing Lake Sweetwater fishery warning");
requireMatch(repo.mitchell, "golden algae", "neighboring county link missing Lake Sweetwater fishery caution");
requireMatch(repo.haskell, "began impounding Paint Creek in 1953", "Haskell county guide reverted to wrong impoundment year");

console.log("Lake authority cross-links validated: Haskell, Nolan, Jones, Mitchell; 2 statewide explainers and explore cards; reciprocal county/lake and related-lake links; fishing directory/site-search; dated safety context.");
