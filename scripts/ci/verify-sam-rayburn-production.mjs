const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const nonce = `${Date.now()}-${process.env.GITHUB_RUN_ID ?? 'local'}-${process.env.GITHUB_SHA ?? 'local'}`;

const checks = [
  {
    label: 'Sam Rayburn House',
    path: '/destination/sam-rayburn-house',
    required: [
      'Sam Rayburn House State Historic Site',
      'href="/texas-icons/sam-rayburn"',
      'href="/fishing/lakes/sam-rayburn-reservoir"',
    ],
  },
  {
    label: 'Sam Rayburn profile',
    path: '/texas-icons/sam-rayburn',
    required: [
      'Sam Rayburn',
      'The reservoir named for Rayburn',
      'href="/destination/sam-rayburn-house"',
      'href="/fishing/lakes/sam-rayburn-reservoir"',
    ],
  },
  {
    label: 'Sam Rayburn Reservoir',
    path: '/fishing/lakes/sam-rayburn-reservoir',
    required: [
      'Sam Rayburn Reservoir',
      'Named for Speaker Sam Rayburn',
      'McGee Bend Dam and Reservoir',
      'href="/texas-icons/sam-rayburn"',
      'href="/destination/sam-rayburn-house"',
    ],
  },
];

const failures = [];

for (const check of checks) {
  const url = new URL(check.path, origin);
  url.searchParams.set('sam_rayburn_probe', nonce);

  const response = await fetch(url, {
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'user-agent': 'TexasDefined-Sam-Rayburn-Production-Guard/1.0',
    },
    redirect: 'follow',
  });

  const html = await response.text();

  if (!response.ok) {
    failures.push(`${check.label}: ${response.status} ${response.statusText}`);
    continue;
  }

  for (const required of check.required) {
    if (!html.includes(required)) {
      failures.push(`${check.label}: missing ${JSON.stringify(required)}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Sam Rayburn production relationship verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sam Rayburn production relationship verification passed.');
console.log('- House links to the Sam Rayburn profile and reservoir.');
console.log('- Profile links to the House and reservoir and renders the namesake context.');
console.log('- Reservoir links to the profile and House and renders the McGee Bend naming history.');
