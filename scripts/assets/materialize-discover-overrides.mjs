import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const entries = [
  [
    "chappell-hill-bluebonnet-festival",
    "/images/events/chappell-hill-bluebonnet-festival-20260914.webp"
  ],
  [
    "ima-hogg-texas-legacy",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/ImaHogg.jpg?width=1200"
  ],
  [
    "camping-in-texas-with-your-dog",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/CSP_tent_camping.jpg?width=1600"
  ],
  [
    "texas-high-school-football-scores-schedules",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eagle_Stadium.jpg?width=1600"
  ],
  [
    "best-lighthouses-to-visit-in-texas",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel_Texas_Lighthouse.jpg?width=1600"
  ],
  [
    "texas-medal-of-honor-heroes",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audie_Murphy.jpg?width=1600"
  ],
  [
    "texas-red-river-war-guide",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ledger-sm2.jpg?width=1600"
  ],
  [
    "republic-of-texas-government-trail",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/First_Capitol_of_the_Republic_of_Texas_%283967003172%29.jpg"
  ],
  [
    "brazoria-plantations-slavery-emancipation-history",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Levi_Jordan_Plantation_State_Historic_Site.jpg"
  ],
  [
    "texas-frontier-forts-road-trip",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/0011FortGriffinTxAdminBuilding.jpg"
  ],
  [
    "collin-county",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Collin_County_Courthouse_%281927%29%2C_McKinney%2C_Texas_%2828181193439%29.jpg?width=1600"
  ],
  [
    "xtreme-raceway-park",
    "/images/sports-venues/xtreme-raceway-park.jpg"
  ],
  [
    "freeman-coliseum",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Carnival_scene_outside_the_San_Antonio_Stock_Show_and_Rodeo_on_the_grounds_of_the_Freeman_Coliseum,_San_Antonio,_Texas_LCCN2014631343.tif?width=1600"
  ],
  [
    "eagle-stadium-allen",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eagle_Stadium.jpg?width=1600"
  ],
  [
    "mesquite-memorial-stadium",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mesquite_Memorial_Stadium_from_End_Zone.jpg?width=1600"
  ],
  [
    "fossil-rim-wildlife-center",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fossil_Rim_Wildlife_Center_(49193476352).jpg"
  ],
  [
    "sea-life-san-antonio-aquarium",
    "/images/aquariums/sea-life-san-antonio.jpg"
  ],
  [
    "san-antonio-aquarium",
    "/images/aquariums/san-antonio-aquarium.jpg"
  ],
  [
    "houston-interactive-aquarium-animal-preserve",
    "/images/aquariums/houston-interactive-aquarium.jpg"
  ],
  [
    "ut-marine-science-institute-patton-center",
    "/images/aquariums/utmsi-patton-center.jpg"
  ],
  [
    "texas-hill-country-olive-co",
    "/images/viator-destinations/texas-hill-country-olive-co-ai.webp"
  ],
  [
    "brazos-bend-state-park",
    "/images/state-parks/brazos-bend-state-park.jpg"
  ],
  [
    "devils-river-state-natural-area",
    "/images/explore/lakes-rivers/devils-river-state-natural-area.jpg"
  ],
  [
    "lake-corpus-christi-state-park",
    "/images/state-parks/lake-corpus-christi-state-park.jpg"
  ],
  [
    "science-mill-johnson-city",
    "https://s3.amazonaws.com/texasstandard.org/txstandard/wp-content/uploads/2015/06/m.jpg"
  ],
  [
    "silent-wings-museum-lubbock",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Silent_Wings_Museum_SPAAF_sign_2009.jpg?width=2000"
  ],
  [
    "governor-jim-hogg-city-park-quitman",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jim_hogg.jpg?width=1200"
  ],
  [
    "messina-hof-hill-country",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Messina_Hof_Vineyard.jpg?width=1200"
  ],
  [
    "blanton-museum-of-art-austin",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanton_Museum.JPG?width=1600"
  ],
  [
    "umlauf-sculpture-garden-museum-austin",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Umlauf_garden1_2006.jpg?width=1600"
  ],
  [
    "texas-science-natural-history-museum-austin",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mosasaur_0847_W.jpg?width=1600"
  ],
  [
    "dr-pepper-museum-waco",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dr_Pepper_Museum.jpg?width=1600"
  ],
  [
    "texas-ranger-hall-of-fame-museum-waco",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranger_museum_entry.jpg?width=1600"
  ],
  [
    "my-story-museum-crystal-city",
    "/images/museums/my-story-museum-crystal-city.webp"
  ],
  [
    "gonzales",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gonzales%20courthouse%202005.jpg?width=1600"
  ],
  [
    "clifton",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown%20Clifton%20Wiki%203%20(1%20of%201).jpg?width=1600"
  ],
  [
    "la-grange",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fayette%20County%20courthouse%20-%20La%20Grange%20TX.jpg?width=1600"
  ],
  [
    "high-hill-nativity-of-mary",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/St.%20Mary%20Catholic%20Church%20in%20High%20Hill%2C%20Texas.jpg"
  ],
  [
    "dubina-saints-cyril-methodius",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sts%20Cyril%20%26%20Methodius%20Catholic%20Church%20in%20Dubina%2C%20Texas.jpg"
  ],
  [
    "umbarger-st-marys-catholic-church",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/St.%20Mary%27s%20(Umbarger%2C%20TX)%20from%20S%201.JPG"
  ],
  [
    "lindsay-st-peters-catholic-church",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lindsay%20June%202017%201%20(St.%20Peter%27s%20Catholic%20Church).jpg"
  ],
  [
    "fredericksburg-st-marys-catholic-church",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/St.%20Mary%27s%20Catholic%20Church%20(Fredericksburg%2C%20Texas).jpg"
  ]
];

const outDir = path.resolve("public/images/discover");
await fs.mkdir(outDir, { recursive: true });
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "td-discover-"));
const command = ["magick", "convert"].find((candidate) => spawnSync(candidate, ["-version"], { stdio: "ignore" }).status === 0);
if (!command) throw new Error("ImageMagick is required to materialize governed Discover derivatives.");

async function sourceFile(slug, source) {
  if (source.startsWith("/")) {
    const local = path.resolve("public", source.slice(1));
    if (!fsSync.existsSync(local)) throw new Error(`Missing governed local source for ${slug}: ${local}`);
    return local;
  }
  const response = await fetch(source, {
    redirect: "follow",
    headers: { "user-agent": "TexasDefined-Discover-Materializer/1.0", accept: "image/*,*/*;q=0.8" },
    signal: AbortSignal.timeout(45_000),
  });
  if (!response.ok) throw new Error(`Unable to fetch governed source for ${slug}: ${response.status} ${source}`);
  const type = response.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("image/")) throw new Error(`Governed source is not an image for ${slug}: ${type}`);
  const input = path.join(tmpDir, `${slug}.source`);
  await fs.writeFile(input, Buffer.from(await response.arrayBuffer()));
  return input;
}

for (const [slug, source] of entries) {
  const output = path.join(outDir, `${slug}.webp`);
  if (fsSync.existsSync(output)) continue;
  const input = await sourceFile(slug, source);
  const result = spawnSync(command, [
    input,
    "-auto-orient",
    "-resize", "1600x900^",
    "-gravity", "center",
    "-extent", "1600x900",
    "-strip",
    "-quality", "82",
    output,
  ], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`ImageMagick failed for ${slug}: ${result.stderr || result.stdout}`);
  const identify = spawnSync(command === "magick" ? "magick" : "identify",
    command === "magick" ? ["identify", "-format", "%wx%h", output] : ["-format", "%wx%h", output],
    { encoding: "utf8" });
  if (identify.status !== 0 || identify.stdout.trim() !== "1600x900") {
    throw new Error(`Discover derivative dimensions invalid for ${slug}: ${identify.stdout.trim() || identify.stderr}`);
  }
  console.log(`Materialized ${slug} from governed source.`);
}
await fs.rm(tmpDir, { recursive: true, force: true });
console.log(`Discover derivative materialization complete: ${entries.length} governed routes.`);
