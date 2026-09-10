import fs from 'node:fs'

const workflow = fs.readFileSync('.github/workflows/dallas-news-production-smoke.yml', 'utf8')

const required = [
  "grep -Fq 'id=\"county-feature-heading\"' /tmp/dallas.html",
  "grep -Eq 'The story of (<!-- -->)?Dallas County' /tmp/dallas.html",
  "grep -Fq 'Old Red Courthouse' /tmp/dallas.html",
  "grep -Fq 'The county in numbers' /tmp/dallas.html",
]

const missing = required.filter((needle) => !workflow.includes(needle))
if (missing.length) {
  console.error(`Dallas smoke contract regression: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('Dallas smoke contract accepts React text boundaries while preserving rendered-section requirements.')
