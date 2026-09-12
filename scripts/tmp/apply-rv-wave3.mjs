import fs from 'node:fs';

const registryPath = 'src/data/rv-parks/registry.server.ts';
const smokePath = 'scripts/ci/verify-rv-production.mjs';
const workflowPath = '.github/workflows/validate-rv-parks-authority.yml';
const validatorPath = 'scripts/data/validate-rv-curated-public-wave3.mjs';

function read(path) { return fs.readFileSync(path, 'utf8'); }
function write(path, content) { fs.writeFileSync(path, content); }
function mustReplace(source, needle, replacement, label) {
  if (!source.includes(needle)) throw new Error(`Missing ${label}: ${needle}`);
  return source.replace(needle, replacement);
}

let registry = read(registryPath);
if (!registry.includes('RV_PARK_CURATED_PUBLIC_WAVE3_COUNT')) {
  registry = mustReplace(
    registry,
    'export const RV_PARK_CURATED_PUBLIC_WAVE2_COUNT = 5;\n',
    'export const RV_PARK_CURATED_PUBLIC_WAVE2_COUNT = 5;\nexport const RV_PARK_CURATED_PUBLIC_WAVE3_COUNT = 9;\n',
    'wave 3 count insertion point',
  );
}

const sourceOverrides = `  "lake-mineral-wells-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
    sourceCheckedAt: "2026-09-12",
    address: "100 Park Road 71, Mineral Wells, TX 76067",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.812655, lng: -98.043368 },
  },
  "eisenhower-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/eisenhower",
    sourceCheckedAt: "2026-09-12",
    address: "50 Park Road 20, Denison, TX 75020-4878",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.810339, lng: -96.599971 },
  },
  "monahans-sandhills-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/monahans-sandhills",
    sourceCheckedAt: "2026-09-12",
    address: "101 Park Road 41, Monahans, TX 79756",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 31.618795, lng: -102.812112 },
  },
  "bonham-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/bonham",
    sourceCheckedAt: "2026-09-12",
    address: "1363 State Park 24, Bonham, TX 75418-9285",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.546727, lng: -96.144758 },
  },
  "lake-whitney-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-whitney",
    sourceCheckedAt: "2026-09-12",
    address: "433 FM 1244, Whitney, TX 76692",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 31.931234, lng: -97.356833 },
  },
  "martin-dies-jr-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr",
    sourceCheckedAt: "2026-09-12",
    address: "634 Park Road 48 South, Jasper, TX 75951",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.846627, lng: -94.165869 },
  },
  "lake-livingston-state-park-rv-loops": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-livingston",
    sourceCheckedAt: "2026-09-12",
    address: "300 Park Road 65, Livingston, TX 77351",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.656897, lng: -95.001093 },
  },
  "lake-arrowhead-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-arrowhead",
    sourceCheckedAt: "2026-09-12",
    address: "229 Park Road 63, Wichita Falls, TX 76310",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.758578, lng: -98.395201 },
  },
  "lake-tawakoni-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-tawakoni",
    sourceCheckedAt: "2026-09-12",
    address: "10822 FM 2475, Wills Point, TX 75169",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.841871, lng: -95.993667 },
  },
`;

if (!registry.includes('"lake-mineral-wells-state-park-rv-loop": {')) {
  registry = mustReplace(
    registry,
    '  "caddo-lake-state-park-rv-area": {',
    `${sourceOverrides}  "caddo-lake-state-park-rv-area": {`,
    'source override insertion point',
  );
}

const contentOverrides = `  "lake-mineral-wells-state-park-rv-loop": {
    summary: "Lake Mineral Wells State Park RV Loop gives North Texas travelers 77 developed electric campsites beside a 640-acre lake, with hiking, biking, equestrian access and the Penitentiary Hollow climbing area west of Fort Worth.",
    bestSeason: "TPWD lists mid-March through mid-November as the busy season. Summer heat can be intense, and climbing or trail areas can close temporarily, so check current alerts before travel.",
    entryNote: "Enter at 100 Park Road 71 in Mineral Wells. TPWD lists 47 50-amp sites in Live Oak and 30 30-amp sites in Plateau; reserve the exact site and review current fire, trail and climbing alerts before arrival.",
    highlights: ["77 water-and-electric campsites", "640-acre Lake Mineral Wells", "Hiking, biking, equestrian trails and Penitentiary Hollow climbing"],
    body: [
      "Lake Mineral Wells State Park & Trailway is a developed RV base about 45 minutes west of Fort Worth. TPWD currently lists 47 campsites with water and 50-amp electricity in the Live Oak Camping Area plus 30 campsites with water and 30-amp electricity in the Plateau Camping Area. That gives RV travelers two clearly documented electrical service levels without assuming that every overnight site is configured the same way.",
      "The park combines a 640-acre lake with hiking, biking, horseback riding, fishing, boating and swimming. Penitentiary Hollow is one of the relatively uncommon natural rock-climbing areas in North Texas, but climbing and individual trail areas can close because of weather, fire conditions or maintenance. Current park alerts should therefore be part of trip planning rather than treated as static background information.",
      "TPWD lists mid-March through mid-November as the busy season and says the park can reach capacity. Before towing in, reserve the specific campsite, verify the required electrical connection and current vehicle limits, and check active burn bans, trail status and climbing access. The exact-location image on this Texas Defined profile shows Lake Mineral Wells State Park property and carries reusable-license attribution.",
    ],
  },
  "eisenhower-state-park-rv-loop": {
    summary: "Eisenhower State Park RV Loop offers 50 full-hookup and 45 electric campsites on Lake Texoma near Denison, pairing large-RV camping with swimming, fishing, bluff trails and a dedicated OHV trail system.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons. Reserve ahead during warm-weather weekends and check current lake, trail and OHV alerts before arrival.",
    entryNote: "Enter at 50 Park Road 20 in Denison. TPWD lists 50 full-hookup campsites plus 45 water-and-electric campsites; confirm the exact reserved pad, utility configuration and any OHV permit requirements before travel.",
    highlights: ["50 full-hookup campsites", "Lake Texoma swimming, boating and fishing", "Hiking, biking and a permit-required OHV trail"],
    body: [
      "Eisenhower State Park is one of the stronger developed state-park RV options on the Texas side of Lake Texoma. TPWD currently lists 50 full-hookup campsites with water, sewer and electricity plus 45 additional campsites with water and electricity. The park also describes camping choices that include pull-through sites for large RVs, but the individual reservation record should control fit and utility assumptions for a specific rig.",
      "Lake Texoma is central to the stay. Visitors can swim at the park's sandy cove, fish from shore or piers, use the boat ramp, and explore more than four miles of hiking and biking trails along wooded bluffs and shoreline. Eisenhower also maintains an OHV trail, which has separate safety rules and permit requirements, so off-highway riding should be planned through the current TPWD guidance rather than inferred from general park access.",
      "The park is reached from Park Road 20 in Denison and TPWD says it often reaches capacity, especially across its spring, summer and fall busy seasons. Reserve camping and entry ahead of time, check current trail and lake conditions, and confirm the assigned site's dimensions and service before towing in. The Texas Defined hero is an exact-location, rights-cleared Lake Texoma view from Eisenhower State Park.",
    ],
  },
  "monahans-sandhills-state-park-rv-area": {
    summary: "Monahans Sandhills State Park RV Area provides 25 water-and-electric campsites beside a shifting West Texas dune field, with sand-disk sledding, open dune exploration and an 800-acre equestrian area near Interstate 20.",
    bestSeason: "TPWD lists September through March as the busy season. Summer dune surfaces heat quickly, so cooler-season camping is especially practical; check current weather and park alerts before crossing West Texas.",
    entryNote: "Enter from Interstate 20 at Park Road 41 near Monahans. TPWD lists 25 campsites with water and electricity; reserve ahead and confirm the assigned site's electrical service and current heat or wind conditions.",
    highlights: ["25 water-and-electric campsites", "Open exploration of wind-shaped sand dunes", "Sand-disk rentals and an 800-acre equestrian area"],
    body: [
      "Monahans Sandhills State Park offers a very different RV stop from Texas's lake and forest campgrounds. TPWD currently lists 25 developed campsites with water and electricity, with restrooms and showers nearby. The park sits just off Interstate 20, making it a practical overnight base for West Texas travel while still providing a destination experience rather than only a roadside place to park.",
      "The dunes are the attraction. TPWD allows visitors to explore the sand without marked hiking trails and rents sand disks for sliding the slopes. The agency warns that dune surfaces heat quickly in summer and that visitors need to keep track of their route because the wind-shaped landscape lacks conventional trail markers. An 800-acre equestrian area adds another use, with separate horse-entry requirements that should be checked before arrival.",
      "TPWD identifies September through March as the busy season and recommends reservations because the park can reach capacity. Before towing in, verify the assigned campsite, current electrical details, weather and wind, and any active park alerts. The profile image depicts Monahans Sandhills State Park itself and is retained with its open-license source and creator attribution.",
    ],
  },
  "bonham-state-park-rv-loop": {
    summary: "Bonham State Park RV Loop is a small Northeast Texas campground with two full-hookup RV sites and 12 additional electric sites beside a 65-acre lake, CCC history and nearly nine miles of hike-and-bike trails.",
    bestSeason: "The park is open daily and TPWD says it often reaches capacity. Because the RV inventory is small, reserve ahead in any season and check current lake, weather and park alerts before travel.",
    entryNote: "Enter at 1363 State Park 24 southeast of Bonham. TPWD lists two full-hookup RV sites and 12 additional RV-capable electric sites; reserve the exact campsite before towing in.",
    highlights: ["Two full-hookup RV sites plus 12 electric RV-capable sites", "65-acre Bonham State Park Lake", "CCC-built features and 8.75 miles of trails"],
    body: [
      "Bonham State Park is a deliberately small campground, which makes exact campsite selection more important than at larger state parks. TPWD currently lists two full-hookup campsites with water, sewer and 30/50-amp electricity, plus 12 additional campsites where RVs are allowed with water and 20/30/50-amp electrical hookups. The limited inventory means advance reservations are especially important for RV travelers.",
      "The park centers on a 65-acre lake used for fishing, paddling and swimming. TPWD also lists 8.75 miles of hiking and biking trails through woods and prairie, with Civilian Conservation Corps features woven into the landscape. That combination makes Bonham more than an overnight utility stop even though its RV campground is comparatively compact.",
      "The entrance is on State Park 24 southeast of Bonham, and TPWD says the park often reaches capacity. Confirm the exact reservation, site fit, electrical needs and current water or weather conditions before arrival. Texas Defined uses a rights-cleared image of Bonham State Park property rather than a generic RV-resort photograph.",
    ],
  },
  "lake-whitney-state-park-rv-loop": {
    summary: "Lake Whitney State Park RV Loop offers 43 full-hookup and 31 electric campsites on a 23,500-acre reservoir between DFW and Waco, with swimming, boating, fishing and short prairie-and-woodland trails.",
    bestSeason: "TPWD lists March through October as the busy season. Reserve ahead for warm-weather weekends and check lake, storm and park conditions before towing to the shoreline campground.",
    entryNote: "Enter at 433 FM 1244 west of Whitney. TPWD lists 43 full-hookup 50-amp sites and 31 water-and-electric 50-amp sites; confirm the exact loop and site dimensions before arrival.",
    highlights: ["43 full-hookup 50-amp campsites", "31 additional water-and-electric 50-amp campsites", "Lake Whitney fishing, swimming, boating and shoreline trails"],
    body: [
      "Lake Whitney State Park has a substantial developed RV campground on the shore of the 23,500-acre Lake Whitney. TPWD currently lists 43 full-hookup campsites in the Horseshoe Camping Loop with water, sewer and 50-amp electricity, plus 31 campsites with water and 50-amp electricity across the Blue Bird, Road Runner and Sunset Ridge loops. The exact reservation should still control site fit and current restrictions.",
      "The lake supports fishing, swimming, boating and water skiing, while the land side of the park adds hiking, stargazing and wildlife watching. The Two Bridges and Towash Forest trails provide approachable hiking and biking through post oak woodland, prairie remnants and shoreline habitat. Those activities give an RV stay value beyond simply using the campground as a base between Dallas-Fort Worth and Waco.",
      "TPWD lists March through October as the busy season and recommends reservations because the park can reach capacity. Before towing in, confirm the assigned loop, electrical needs and campsite dimensions, then review current lake conditions, storms, fire restrictions and active park alerts. The profile's Lake Whitney State Park image is exact-location media with reusable-license attribution.",
    ],
  },
  "martin-dies-jr-state-park-rv-loop": {
    summary: "Martin Dies Jr. State Park RV Loop gives East Texas campers 118 electric sites beside the B.A. Steinhagen Reservoir, with paddling routes, fishing, swimming and forest trails near the edge of the Big Thicket.",
    bestSeason: "TPWD lists March through Independence Day and September through Thanksgiving as busy periods. Check heat, water, weather and wildlife alerts before planning paddling or campsite time.",
    entryNote: "Enter at 634 Park Road 48 South near Jasper. TPWD lists 85 water-and-50-amp sites plus 33 water-and-30-amp sites; reserve the exact unit and confirm current access before arrival.",
    highlights: ["118 water-and-electric campsites", "B.A. Steinhagen Reservoir paddling and fishing", "Seven miles of hiking and biking plus extensive paddling trails"],
    body: [
      "Martin Dies, Jr. State Park is a large East Texas camping base on the B.A. Steinhagen Reservoir. TPWD currently lists 85 campsites with water and 50-amp electricity plus 33 campsites with water and 30-amp electricity, spread primarily across the Hen House and Walnut Ridge areas. With more than 100 developed electric sites, it offers considerably more RV capacity than many smaller state parks.",
      "Water and forest define the experience. TPWD lists fishing, swimming, canoeing and kayaking, with nearly 14 miles of marked paddling routes through the lake, sloughs and river connections. On land, visitors can hike and bike through mixed pine and hardwood habitat. Alligators live in the park, so current wildlife and water-safety guidance is part of responsible trip planning.",
      "The park is reached from Park Road 48 off U.S. 190 between Woodville and Jasper. TPWD says it often reaches capacity and identifies spring through early July and early fall through Thanksgiving as busy periods. Reserve the exact campground area, confirm electrical needs and current access, and review alerts before towing in. Texas Defined retains an open-license image of Martin Dies, Jr. State Park property with full attribution.",
    ],
  },
  "lake-livingston-state-park-rv-loops": {
    summary: "Lake Livingston State Park RV Loops provide more than 70 full-hookup campsites plus electric-only loops on one of Texas's largest lakes, with boating, fishing, swimming and Pineywoods trails north of Houston.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons. Reserve ahead for weekends and check lake, storm, heat and alligator-safety information before arrival.",
    entryNote: "Enter at 300 Park Road 65 near Livingston. TPWD lists multiple full-hookup loops, including Piney Shores, Red Oak, Yaupon and Pin Oak, plus electric loops; reserve the exact site and verify its utility package.",
    highlights: ["Multiple full-hookup RV loops", "Lake Livingston boating, fishing and swimming", "Pineywoods hiking, biking and wildlife watching"],
    body: [
      "Lake Livingston State Park has one of the more extensive developed state-park RV inventories in East Texas. TPWD currently lists full-hookup camping in several loops, including 22 sites at Piney Shores, 12 at Red Oak, 37 at Yaupon and four at Pin Oak, with water, sewer and electric service documented by loop. Additional Hercules and Pin Oak campsites provide electricity without being presented as equivalent to the full-hookup inventory.",
      "The campground sits on one of the state's largest lakes, where TPWD highlights fishing, boating and swimming along with hiking, mountain biking, birding and geocaching. The park provides boat ramps, fishing access and wooded Pineywoods surroundings. Alligators occur in the area, so visitors should review current wildlife and water-safety guidance rather than treating the shoreline like a conventional swimming resort.",
      "Lake Livingston State Park is about an hour north of Houston and TPWD lists spring, summer and fall as busy seasons. Some weekend reservations in full-hookup loops have minimum-stay rules, so the current reservation record should control timing and site details. Confirm the assigned loop, electrical service, rig fit and active alerts before towing in; the profile image is rights-cleared media from the named park property.",
    ],
  },
  "lake-arrowhead-state-park-rv-loop": {
    summary: "Lake Arrowhead State Park RV Loop offers 48 water-and-50-amp campsites south of Wichita Falls, with fishing, swimming, paddling, boating, disc golf and more than five miles of multiuse prairie trails.",
    bestSeason: "TPWD lists spring and summer as the busy seasons. North Texas heat can be severe in summer, so reserve ahead and check current lake, weather and park alerts before travel.",
    entryNote: "Enter at 229 Park Road 63 south of Wichita Falls. TPWD lists 48 campsites with water and 50-amp electricity; reserve the exact site and verify current lake and campground conditions before arrival.",
    highlights: ["48 water-and-50-amp campsites", "16,200-acre Lake Arrowhead", "Fishing, paddling, disc golf and five-plus miles of multiuse trails"],
    body: [
      "Lake Arrowhead State Park provides a straightforward developed RV campground in the Rolling Plains south of Wichita Falls. TPWD currently lists 48 campsites with water and 50-amp electrical hookups, with restrooms and showers nearby. The park also has lower-service camping, so RV travelers should reserve the documented electric category rather than assuming every overnight site supports a recreational vehicle.",
      "The 16,200-acre lake is the main draw, supporting fishing, swimming, paddling, boating and water skiing. On land, TPWD lists more than five miles of multiuse trails for hiking, biking and horseback riding, along with disc golf and nature watching. Nine boat ramps, a lighted fishing pier and a fish-cleaning station make the park particularly useful for travelers towing both an RV and watercraft.",
      "TPWD lists spring and summer as the busy seasons and says the park can reach capacity. Before arrival, reserve the exact campsite, verify utility needs and rig fit, and review current heat, storm and lake conditions. The Texas Defined image comes from Lake Arrowhead State Park itself and retains its open-license creator and source metadata.",
    ],
  },
  "lake-tawakoni-state-park-rv-area": {
    summary: "Lake Tawakoni State Park RV Area combines 16 full-hookup sites with more than 60 additional electric campsites on a nearly 38,000-acre reservoir east of Dallas, backed by swimming, paddling and trails.",
    bestSeason: "TPWD lists spring and summer as the busy seasons. Reserve ahead during warm-weather weekends and review current lake, heat, storm and park alerts before travel.",
    entryNote: "Enter at 10822 FM 2475 near Wills Point. TPWD lists 16 full-hookup 30/50-amp sites, 16 additional 30/50-amp electric sites and 44 30-amp electric sites; reserve the exact loop for the needed service.",
    highlights: ["16 full-hookup campsites", "More than 60 additional electric campsites", "Lake Tawakoni fishing, swimming, paddling and nearly five miles of trails"],
    body: [
      "Lake Tawakoni State Park gives RV travelers a range of developed campsite service levels on a reservoir east of Dallas. TPWD currently lists 16 full-hookup sites in the Spring Point Camping Loop with 30/50-amp electricity, plus 16 additional Spring Point sites with water and 30/50-amp electricity and 44 electric sites in White Deer Reach. That mix makes it important to reserve the exact category rather than infer hookups from the park name.",
      "Lake Tawakoni covers 37,879 acres, and TPWD highlights boating, fishing, swimming and paddling from the park. On land, nearly five miles of trails support hiking and mountain biking through oak forest and lakeshore habitat. The combination works well for travelers who want a water-focused campground within roughly 50 miles of Dallas without giving up a state-park setting.",
      "TPWD identifies spring and summer as busy seasons and recommends reservations because the park can reach capacity. Before towing in, confirm the exact loop, electrical service, sewer availability where needed, vehicle limits and current lake or weather alerts. Texas Defined uses an exact-location Lake Tawakoni State Park image with reusable-license attribution rather than generic campground photography.",
    ],
  },
`;

if (!registry.includes('summary: "Lake Mineral Wells State Park RV Loop')) {
  registry = mustReplace(
    registry,
    '\n};\n\nlet order = 0;',
    `\n${contentOverrides}};\n\nlet order = 0;`,
    'content override insertion point',
  );
}
write(registryPath, registry);

let smoke = read(smokePath);
const smokeEntries = `  { path: '/destination/lake-mineral-wells-state-park-rv-loop', name: 'Lake Mineral Wells State Park RV Loop' },
  { path: '/destination/eisenhower-state-park-rv-loop', name: 'Eisenhower State Park RV Loop' },
  { path: '/destination/monahans-sandhills-state-park-rv-area', name: 'Monahans Sandhills State Park RV Area' },
  { path: '/destination/bonham-state-park-rv-loop', name: 'Bonham State Park RV Loop' },
  { path: '/destination/lake-whitney-state-park-rv-loop', name: 'Lake Whitney State Park RV Loop' },
  { path: '/destination/martin-dies-jr-state-park-rv-loop', name: 'Martin Dies Jr. State Park RV Loop' },
  { path: '/destination/lake-livingston-state-park-rv-loops', name: 'Lake Livingston State Park RV Loops' },
  { path: '/destination/lake-arrowhead-state-park-rv-loop', name: 'Lake Arrowhead State Park RV Loop' },
  { path: '/destination/lake-tawakoni-state-park-rv-area', name: 'Lake Tawakoni State Park RV Area' },
`;
if (!smoke.includes("/destination/lake-mineral-wells-state-park-rv-loop")) {
  smoke = mustReplace(smoke, '];\nconst guardedProfile =', `${smokeEntries}];\nconst guardedProfile =`, 'production smoke curated profile list');
}
write(smokePath, smoke);

let workflow = read(workflowPath);
if (!workflow.includes('validate-rv-curated-public-wave3.mjs')) {
  workflow = workflow.replaceAll(
    "      - 'scripts/data/validate-rv-curated-public-wave2.mjs'\n",
    "      - 'scripts/data/validate-rv-curated-public-wave2.mjs'\n      - 'scripts/data/validate-rv-curated-public-wave3.mjs'\n",
  );
  workflow = mustReplace(
    workflow,
    '      - name: Validate curated public RV wave two\n        run: node scripts/data/validate-rv-curated-public-wave2.mjs\n',
    '      - name: Validate curated public RV wave two\n        run: node scripts/data/validate-rv-curated-public-wave2.mjs\n      - name: Validate curated public RV wave three\n        run: node scripts/data/validate-rv-curated-public-wave3.mjs\n',
    'wave 3 validation step',
  );
}
write(workflowPath, workflow);

const validator = `import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const registry = read('src/data/rv-parks/registry.server.ts');
const images = read('src/data/rv-parks/images.server.ts');
const productionSmoke = read('scripts/ci/verify-rv-production.mjs');
const rawInventory = [
  'src/data/rv-parks/hill-country.ts',
  'src/data/rv-parks/gulf-coast.ts',
  'src/data/rv-parks/piney-woods-east-texas.ts',
  'src/data/rv-parks/panhandle-north-texas.ts',
  'src/data/rv-parks/big-bend-west-texas.ts',
].map(read).join('\\n');

const wave3 = [
  ['lake-mineral-wells-state-park-rv-loop', 'Lake Mineral Wells State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-mineral-wells'],
  ['eisenhower-state-park-rv-loop', 'Eisenhower State Park RV Loop', 'https://tpwd.texas.gov/state-parks/eisenhower'],
  ['monahans-sandhills-state-park-rv-area', 'Monahans Sandhills State Park RV Area', 'https://tpwd.texas.gov/state-parks/monahans-sandhills'],
  ['bonham-state-park-rv-loop', 'Bonham State Park RV Loop', 'https://tpwd.texas.gov/state-parks/bonham'],
  ['lake-whitney-state-park-rv-loop', 'Lake Whitney State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-whitney'],
  ['martin-dies-jr-state-park-rv-loop', 'Martin Dies Jr. State Park RV Loop', 'https://tpwd.texas.gov/state-parks/martin-dies-jr'],
  ['lake-livingston-state-park-rv-loops', 'Lake Livingston State Park RV Loops', 'https://tpwd.texas.gov/state-parks/lake-livingston'],
  ['lake-arrowhead-state-park-rv-loop', 'Lake Arrowhead State Park RV Loop', 'https://tpwd.texas.gov/state-parks/lake-arrowhead'],
  ['lake-tawakoni-state-park-rv-area', 'Lake Tawakoni State Park RV Area', 'https://tpwd.texas.gov/state-parks/lake-tawakoni'],
];

const errors = [];
const requireText = (haystack, needle, message) => { if (!haystack.includes(needle)) errors.push(message); };
requireText(registry, 'export const RV_PARK_CURATED_PUBLIC_WAVE3_COUNT = 9;', 'Wave 3 curated-profile count must remain exactly nine.');
const contentStart = registry.indexOf('const CONTENT_OVERRIDES');
const contentEnd = registry.indexOf('\\n};\\n\\nlet order = 0;', contentStart);
const contentOverrides = contentStart >= 0 && contentEnd > contentStart ? registry.slice(contentStart, contentEnd) : '';
if (!contentOverrides) errors.push('Unable to isolate RV content overrides.');

for (const [slug, name, officialUrl] of wave3) {
  requireText(rawInventory, slug, name + ' is missing from the original 250-record RV seed inventory.');
  const sourceIndex = registry.indexOf('"' + slug + '": {');
  if (sourceIndex < 0) errors.push(name + ' is missing a registry source override.');
  else {
    const sourceEnd = registry.indexOf('\\n  },', sourceIndex);
    const sourceBlock = registry.slice(sourceIndex, sourceEnd > sourceIndex ? sourceEnd : undefined);
    requireText(sourceBlock, 'officialUrl: "' + officialUrl + '"', name + ' must retain its official TPWD source.');
    requireText(sourceBlock, 'sourceCheckedAt: "2026-09-12"', name + ' must retain the latest first-party review date.');
    requireText(sourceBlock, 'managingAuthority: "Texas Parks and Wildlife Department"', name + ' must retain TPWD as managing authority.');
    requireText(sourceBlock, 'coordinates: { lat:', name + ' must retain verified non-zero coordinates.');
    requireText(sourceBlock, 'address: "', name + ' must retain its verified TPWD address.');
  }

  const contentIndex = contentOverrides.indexOf('"' + slug + '": {');
  if (contentIndex < 0) errors.push(name + ' is missing substantive curated content.');
  else {
    const nextIndex = contentOverrides.indexOf('\\n  "', contentIndex + slug.length + 8);
    const block = contentOverrides.slice(contentIndex, nextIndex > contentIndex ? nextIndex : undefined);
    for (const field of ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body: [']) requireText(block, field, name + ' content is missing ' + field.replace(':', '') + '.');
    const bodyParagraphs = (block.match(/^\\s{6}".+",?$/gm) ?? []).length;
    if (bodyParagraphs < 3) errors.push(name + ' must retain at least three substantive body paragraphs.');
  }

  const imageIndex = images.indexOf("'" + slug + "': {");
  if (imageIndex < 0) errors.push(name + ' is missing its exact-location licensed image record.');
  else {
    const nextImageIndex = images.indexOf("\\n  '", imageIndex + slug.length + 8);
    const imageBlock = images.slice(imageIndex, nextImageIndex > imageIndex ? nextImageIndex : undefined);
    requireText(imageBlock, 'actualLocation: true', name + ' image must remain verified as actual-location media.');
    requireText(imageBlock, 'licenseUrl:', name + ' image must retain explicit reuse-license metadata.');
    requireText(imageBlock, 'sourceUrl:', name + ' image must retain source attribution metadata.');
  }
  requireText(productionSmoke, "{ path: '/destination/" + slug + "', name: '" + name + "' }", name + ' must remain in deployment-coupled production smoke.');
}

if (contentOverrides.includes('"caddo-lake-state-park-rv-area": {')) errors.push('Caddo Lake must remain outside curated content overrides as the negative indexing control.');
requireText(productionSmoke, "const guardedProfile = { path: '/destination/caddo-lake-state-park-rv-area'", 'Caddo Lake must remain the explicit noindex production control.');

if (errors.length) {
  console.error('RV curated public wave 3 validation failed:');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}
console.log('RV curated public wave 3 validation passed: nine additional TPWD-sourced, exact-image profiles are protected and Caddo Lake remains the noindex control.');
`;
write(validatorPath, validator);

console.log('RV wave 3 patch applied.');
