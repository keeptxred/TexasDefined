import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const path = 'src/platform/internal-link-policies.ts';
const current = fs.readFileSync(path, 'utf8');
const version = value(current, 'INTERNAL_LINK_POLICY_VERSION');
const reviewedAt = value(current, 'INTERNAL_LINK_POLICY_REVIEWED_AT');
const policyBlock = block(current);
const errors = [];

if (!/^\d+\.\d+\.\d+$/.test(version)) errors.push('Current internal-link policy version is not semantic.');
if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt)) errors.push('Current internal-link policy review date is invalid.');

let previous;
try {
  previous = execFileSync('git', ['show', `HEAD^:${path}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
} catch {
  previous = undefined;
}

if (previous) {
  const previousVersion = value(previous, 'INTERNAL_LINK_POLICY_VERSION');
  const previousReviewedAt = value(previous, 'INTERNAL_LINK_POLICY_REVIEWED_AT');
  if (block(previous) !== policyBlock) {
    if (previousVersion === version) errors.push('Governed internal-link policies changed without a policy version bump.');
    if (previousReviewedAt === reviewedAt) errors.push('Governed internal-link policies changed without refreshing the review date.');
  }
}

if (errors.length) {
  console.error('Internal-link policy release validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Internal-link policy release ${version} reviewed ${reviewedAt} is valid.`);

function value(source, name) {
  return source.match(new RegExp(`${name}\\s*=\\s*['\"]([^'\"]+)['\"]`))?.[1] ?? '';
}

function block(source) {
  const start = source.indexOf('export const INTERNAL_LINK_POLICIES');
  const end = source.indexOf('export type InternalLinkPolicyValidation');
  if (start < 0 || end < 0 || end <= start) return '';
  return source.slice(start, end).replace(/\s+/g, ' ').trim();
}
