Gateway readiness commands

Audit all gateway articles:
  node scripts/data/audit-texas-gateway-production-readiness.mjs

Machine-readable manifest:
  node scripts/data/audit-texas-gateway-production-readiness.mjs --json

Write a point-in-time manifest artifact:
  node scripts/data/audit-texas-gateway-production-readiness.mjs --write ops/editorial/texas-gateway-production-manifest.json

Validate all currently promoted gateway articles:
  node scripts/data/validate-texas-gateway-production-readiness.mjs

Dry-run a promotion:
  node scripts/data/promote-texas-gateway.mjs <slug>

Write a promotion after all gates pass:
  node scripts/data/promote-texas-gateway.mjs <slug> --write
