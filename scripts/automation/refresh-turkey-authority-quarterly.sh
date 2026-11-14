#!/usr/bin/env bash
set -euo pipefail

node --test scripts/data/refresh-turkey-authority-quarterly.test.mjs
if [[ "$GITHUB_EVENT_NAME" == "pull_request" ]]; then
  node --check scripts/data/refresh-turkey-authority-quarterly.mjs
  exit 0
fi
# Source publication is permitted only from protected main.
if [[ "$GITHUB_REF" != "refs/heads/main" ]]; then
  echo "Quarterly publication skipped outside main"
  exit 0
fi

report_failure() {
  status=$?
  if [[ "$status" == 0 ]]; then return; fi
  quarter=$(( (10#$(date -u +%m)-1)/3+1 ))
  title="TPWD quarterly turkey authority source verification needs attention ($(date -u +%Y)-Q$quarter)"
  existing="$(gh issue list --state open --search "$title in:title" --json number --jq '.[0].number // empty')" || true
  if [[ -z "$existing" ]]; then
    gh issue create --title "$title" --body "The source-backed quarterly turkey review failed closed (exit status $status). No unsafe regulations, new season year or unverified public hunting facts were published. Check the failure in https://github.com/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID. Human editorial review is required for legal drift or season-year changes." || true
  fi
}
trap report_failure EXIT

# Do not publish public-hunt facts while core TPWD legal facts or date sources drift.
node scripts/data/check-turkey-regulations.mjs
node scripts/data/refresh-turkey-season-calendar.mjs --check-only --strict-check-only
node scripts/data/refresh-turkey-authority-quarterly.mjs
node scripts/data/validate-hunting-authority.mjs

file="src/data/hunting/turkey-quarterly-facts.json"
if git diff --quiet -- "$file"; then
  echo "TPWD quarterly facts already checked today; no change required"
  exit 0
fi
existing="$(gh pr list --base main --state open --json headRefName --jq '[.[].headRefName | select(startswith("automation/turkey-quarterly-"))] | length')"
if [[ "$existing" != '0' ]]; then
  echo "Protected quarterly turkey refresh PR already open; refusing duplicate"
  exit 0
fi
branch="automation/turkey-quarterly-$GITHUB_RUN_ID"
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git checkout -b "$branch"
git add "$file"
git commit -m 'data: refresh TPWD turkey public draws and summer survey'
git push origin "$branch"
gh pr create --base main --head "$branch" \
  --title 'Refresh verified TPWD turkey public draws and survey' \
  --body 'Automatic bounded data-only quarterly refresh. The TPWD draw category and independent area pages must match, the 2026 summer survey narrative and table must agree, and all legal regulations and season-year details remain fail-closed. A separate protected GitHub workflow will recheck live sources and validate the exact one-file PR before auto-merge.'
