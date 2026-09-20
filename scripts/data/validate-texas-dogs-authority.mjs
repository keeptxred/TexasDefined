import { readFile } from "node:fs/promises";

const files = {
  hub: "src/components/dogs/DogsHubPage.tsx",
  plan: "src/data/texas-dogs-editorial-plan.ts",
  practical: "src/data/fixtures/texas-dogs-practical.ts",
  registration: "src/data/fixtures/supplemental-editorial-registration.ts",
  smoke: "scripts/ci/verify-dogs-production.mjs",
  route: "src/routes/dogs.{-$breed}.tsx",
};

const text = Object.fromEntries(
  await Promise.all(Object.entries(files).map(async ([key, path]) => [key, await readFile(path, "utf8")])),
);

const requiredPracticalSlugs = [
  "texas-dog-heat-safety",
  "taking-your-dog-to-texas-state-parks",
];

for (const slug of requiredPracticalSlugs) {
  if (!text.practical.includes(`slug: "${slug}"`)) {
    throw new Error(`Texas Dogs practical authority fixture is missing ${slug}`);
  }
  if (!text.hub.includes(`slug: "${slug}"`)) {
    throw new Error(`Texas Dogs hub does not discover ${slug}`);
  }
  if (!text.plan.includes(`slug: "${slug}"`)) {
    throw new Error(`Texas Dogs editorial plan does not track ${slug}`);
  }
}

for (const source of [
  "https://tpwd.texas.gov/state-parks/park-information/safety/heat-safety-info",
  "https://tpwd.texas.gov/state-parks/park-information/frequently-asked-questions",
]) {
  if (!text.practical.includes(source)) {
    throw new Error(`Texas Dogs practical authority content is missing first-party source ${source}`);
  }
}

for (const requirement of [
  "five-second ground test",
  "leash no longer than six feet",
  "cannot be left unattended",
  "designated swimming areas",
]) {
  if (!text.practical.toLowerCase().includes(requirement.toLowerCase())) {
    throw new Error(`Texas Dogs practical authority content is missing protected guidance: ${requirement}`);
  }
}

if (!text.registration.includes('import { texasDogsPracticalArticles } from "./texas-dogs-practical";')) {
  throw new Error("Texas Dogs practical articles are not imported by supplemental editorial registration");
}
if (!text.registration.includes("...texasDogsPracticalArticles")) {
  throw new Error("Texas Dogs practical articles are not registered for public article lookup");
}
if (!text.hub.includes('slug: "best-dog-friendly-texas-trip-ideas"')) {
  throw new Error("Texas Dogs hub does not expose the established dog-friendly Texas trip guide");
}
if (!text.route.includes('await import("@/data/texas-dogs.data")')) {
  throw new Error("Texas Dogs route lost its server-function data boundary");
}
if (!text.smoke.includes("invalid breed 404") || !text.smoke.includes("dogs sitemap") || !text.smoke.includes("dogs robots")) {
  throw new Error("Texas Dogs production smoke lost 404, sitemap, or robots coverage");
}
if (text.hub.includes('from "@/data/fixtures/texas-dogs-practical"')) {
  throw new Error("Texas Dogs practical article fixture must not be imported into the lazy client hub");
}

console.log("Texas Dogs authority validation passed: practical heat and state-park guides are first-party sourced, registered, hub-discoverable, server-boundary safe, and protected by production smoke coverage.");
