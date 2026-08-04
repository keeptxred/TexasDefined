import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const policyPath = 'src/platform/internal-link-policies.ts';
const historyPath = 'src/platform/internal-link-policy-history.ts';
const current = fs.readFileSync(policyPath, 'utf8');
const history = fs.readFileSync(historyPath, 'utf8');
const version = value(current, 'INTERNAL_LINK_POLICY_VERSION');
const reviewedAt = value(current, 'INTERNAL_LINK_POLICY_REVIEWED_AT');
const policyBlock = block(current);
const errors = [];

if (!/^\d+\.\d+\.\d+$/.test(version)) errors.push('Current internal-link policy version is not semantic.');
if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt)) errors.push('Current internal-link policy review date is invalid.');
if (!history.includes(`version: '${version}'`)) errors.push(`Policy release history does not contain version ${version}.`);
if (!history.includes(`reviewedAt: '${reviewedAt}'`)) errors.push(`Policy release history does not contain review date ${reviewedAt}.`);
if (!history.includes('fingerprint: internalLinkPolicyFingerprint()')) errors.push('Current policy history release must record the generated policy fingerprint.');

let previous;
try {
  previous = execFileSync('git', ['show', `HEAD^:${policyPath}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
} catch {
  previous = undefined;
}

let changeType = 'major';
if (previous) {
  const previousVersion = value(previous, 'INTERNAL_LINK_POLICY_VERSION');
  const previousReviewedAt = value(previous, 'INTERNAL_LINK_POLICY_REVIEWED_AT');
  if (block(previous) !== policyBlock) {
    changeType = classifyPolicyChange(previous, current);
    if (previousVersion === version) errors.push('Governed internal-link policies changed without a policy version bump.');
    if (previousReviewedAt === reviewedAt) errors.push('Governed internal-link policies changed without refreshing the review date.');
    if (!satisfiesBump(previousVersion, version, changeType)) errors.push(`Policy change requires a ${changeType} semantic-version bump; ${previousVersion} → ${version} is insufficient.`);
    if (!history.includes(`changeType: '${changeType}'`)) errors.push(`Policy release history must classify version ${version} as ${changeType}.`);
  }
}

if (errors.length) {
  console.error('Internal-link policy release validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Internal-link policy release ${version} reviewed ${reviewedAt} is valid (${changeType}).`);

function value(source, name) {
  return source.match(new RegExp(`${name}\\s*=\\s*['\"]([^'\"]+)['\"]`))?.[1] ?? '';
}

function block(source) {
  const start = source.indexOf('export const INTERNAL_LINK_POLICIES');
  const end = source.indexOf('export type InternalLinkPolicyValidation');
  if (start < 0 || end < 0 || end <= start) return '';
  return source.slice(start, end).replace(/\s+/g, ' ').trim();
}

function classifyPolicyChange(before, after) {
  const beforeSurfaces = surfaceSignatures(before);
  const afterSurfaces = surfaceSignatures(after);
  const beforeIds = [...beforeSurfaces.keys()].sort().join(',');
  const afterIds = [...afterSurfaces.keys()].sort().join(',');
  if (beforeIds !== afterIds) return 'major';
  for (const id of afterSurfaces.keys()) {
    const oldSurface = beforeSurfaces.get(id);
    const newSurface = afterSurfaces.get(id);
    if (!oldSurface || !newSurface) return 'major';
    if (oldSurface.topic !== newSurface.topic || oldSurface.excludedKinds !== newSurface.excludedKinds) return 'major';
  }
  return 'minor';
}

function surfaceSignatures(source) {
  const result = new Map();
  const policySource = block(source);
  const pattern = /(?:^|\s)(article|destination|'property-tax-guide'|'entity-page'):\s*\{([\s\S]*?)\n\s*\},/g;
  for (const match of policySource.matchAll(pattern)) {
    const id = match[1].replaceAll("'", '');
    const body = match[2];
    result.set(id, {
      topic: body.match(/topic:\s*'([^']+)'/)?.[1] ?? '',
      excludedKinds: normalizeList(body.match(/excludedKinds:\s*\[([^\]]*)\]/)?.[1] ?? ''),
    });
  }
  return result;
}

function normalizeList(value) {
  return value.split(',').map((item) => item.trim().replaceAll("'", '')).filter(Boolean).sort().join(',');
}

function satisfiesBump(previousVersion, currentVersion, required) {
  const previousParts = previousVersion.split('.').map(Number);
  const currentParts = currentVersion.split('.').map(Number);
  if (previousParts.length !== 3 || currentParts.length !== 3 || [...previousParts, ...currentParts].some(Number.isNaN)) return false;
  const [oldMajor, oldMinor, oldPatch] = previousParts;
  const [major, minor, patch] = currentParts;
  if (required === 'major') return major > oldMajor;
  if (required === 'minor') return major > oldMajor || (major === oldMajor && minor > oldMinor);
  return major > oldMajor || (major === oldMajor && (minor > oldMinor || (minor === oldMinor && patch > oldPatch)));
}
