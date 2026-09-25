import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const economicsPath = path.join(root, 'src/data/affiliate-economics.ts');
const dashboardPath = path.join(root, 'src/routes/admin.partner-referrals.lazy.tsx');
const schoolSupplyPath = path.join(root, 'src/components/monetization/SchoolSupplyPartners.tsx');
const gamingPath = path.join(root, 'src/data/gaming.ts');

const economics = fs.readFileSync(economicsPath, 'utf8');
const dashboard = fs.readFileSync(dashboardPath, 'utf8');
const schoolSupply = fs.readFileSync(schoolSupplyPath, 'utf8');
const gaming = fs.readFileSync(gamingPath, 'utf8');
const failures = [];

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) failures.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['AFFILIATE_ECONOMICS_REVIEWED_AT = "2026-09-24"', 'economics review date'],
  ['partner: "GearUP"', 'GearUP registry record'],
  ['70% of the first paid subscription from a new referred user', 'GearUP payout guard'],
  ['partner: "Rexing"', 'Rexing registry record'],
  ['15% standard CJ commission', 'Rexing payout guard'],
  ['45-day referral period', 'Rexing attribution guard'],
  ['status: "approved-awaiting-link"', 'approved-awaiting-link status'],
  ['partner: "Viator"', 'Viator registry record'],
  ['8% on completed experience bookings', 'Viator payout guard'],
  ['partner: "Booking.com car rentals"', 'Booking.com car-rental record'],
  ['payout: "From 6%"', 'Booking.com car-rental payout guard'],
  ['partner: "RVshare"', 'RVshare registry record'],
  ['5% on completed RV stays; $7 for each new RV listed', 'RVshare payout guard'],
  ['partner: "Discount School Supply"', 'Discount School Supply sunset record'],
  ['status: "sunset"', 'sunset status'],
]) requireText(economics, needle, label);

for (const [needle, label] of [
  ["AFFILIATE_ECONOMICS", 'dashboard economics registry import'],
  ["Verified payout & routing registry", 'dashboard economics heading'],
  ["Routing role", 'dashboard routing-role column'],
  ["Status", 'dashboard status column'],
]) requireText(dashboard, needle, label);

for (const [needle, label] of [
  ['const discountSchoolSupplyPaidTermsEndAt = Date.parse("2026-10-01T17:00:00Z")', 'Discount School Supply paid-term cutoff'],
  ['const discountSchoolSupplyPaidTermsActive = Date.now() < discountSchoolSupplyPaidTermsEndAt', 'Discount School Supply fail-closed gate'],
]) requireText(schoolSupply, needle, label);

for (const [needle, label] of [
  ['id: "17255582"', 'GearUP evergreen CJ link ID'],
  ['url: "https://www.anrdoezrs.net/click-101876465-17255582"', 'GearUP clean CJ tracking link'],
]) requireText(gaming, needle, label);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (/\.(?:js|jsx|ts|tsx)$/.test(entry.name)) files.push(absolute);
  }
  return files;
}

for (const file of walk(path.join(root, 'src'))) {
  if (file === economicsPath) continue;
  const source = fs.readFileSync(file, 'utf8');
  if (/data-affiliate-partner=["']rexing["']/i.test(source) || /https?:\/\/(?:www\.)?rexing\.com/i.test(source)) {
    failures.push(`${path.relative(root, file)} activates Rexing before a verified account-generated CJ tracking link is available.`);
  }
}

if (failures.length) {
  console.error('Affiliate economics governance validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Affiliate economics governance validation passed: payout snapshots are centralized in the private referral dashboard; high-value GearUP, Viator, Booking.com car-rental and RVshare placements remain governed; Discount School Supply retains its documented paid-term cutoff; and Rexing cannot be activated before a verified CJ tracking link exists.');
