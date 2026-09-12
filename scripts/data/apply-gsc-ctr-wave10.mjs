import fs from 'node:fs';

const seoPath = 'src/lib/seo.ts';
const validationPath = 'scripts/data/validate-gsc-page-one-ctr.mjs';

let seo = fs.readFileSync(seoPath, 'utf8');
const seoAnchor = '\n} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS';
if (!seo.includes(seoAnchor)) throw new Error('SEO insertion anchor not found');

const seoInsert = `
  "/article/texas-brazos-river-guide": {
    title: "Brazos River Texas: Basin, Tributaries, Lakes & Gulf Guide",
    description: "Follow the Brazos River across Texas from its upper forks to the Gulf, with major tributaries, reservoirs, basin geography and water-planning context.",
  },
  "/article/texas-guadalupe-river-guide": {
    title: "Guadalupe River Texas: Canyon Lake, Springs & Basin Guide",
    description: "Follow the Guadalupe River from the Hill Country to San Antonio Bay, including Canyon Lake, spring-fed tributaries, aquifers, access and basin geography.",
  },
  "/article/texas-trinity-river-guide": {
    title: "Trinity River Texas: Dallas-Fort Worth, Basin & Gulf Guide",
    description: "Follow the Trinity River through North Texas toward Trinity Bay, with its forks, Dallas-Fort Worth watershed, reservoirs and basin geography explained.",
  },
`;

if (!seo.includes('"/article/texas-brazos-river-guide"')) {
  seo = seo.replace(seoAnchor, `${seoInsert}} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS`);
  fs.writeFileSync(seoPath, seo);
}

let validation = fs.readFileSync(validationPath, 'utf8');
const validationAnchor = '\nconst settlementLandingSelection = {';
if (!validation.includes(validationAnchor)) throw new Error('Validation insertion anchor not found');

const validationInsert = `
const tenthWave = [
  { path: "/article/texas-brazos-river-guide", title: "Brazos River Texas: Basin, Tributaries, Lakes & Gulf Guide", description: "Follow the Brazos River across Texas from its upper forks to the Gulf" },
  { path: "/article/texas-guadalupe-river-guide", title: "Guadalupe River Texas: Canyon Lake, Springs & Basin Guide", description: "Follow the Guadalupe River from the Hill Country to San Antonio Bay" },
  { path: "/article/texas-trinity-river-guide", title: "Trinity River Texas: Dallas-Fort Worth, Basin & Gulf Guide", description: "Follow the Trinity River through North Texas toward Trinity Bay" },
];

for (const experiment of tenthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Tenth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (tenthWave.length !== 3) {
  failures.push('Expected exactly 3 tenth-wave GSC CTR experiments, found ' + tenthWave.length + '.');
}
`;

if (!validation.includes('const tenthWave = [')) {
  validation = validation.replace(validationAnchor, `${validationInsert}${validationAnchor}`);
  fs.writeFileSync(validationPath, validation);
}
