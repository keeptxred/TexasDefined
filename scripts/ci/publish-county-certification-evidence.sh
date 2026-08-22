#!/usr/bin/env bash
set -euo pipefail

marker="${1:?usage: publish-county-certification-evidence.sh <marker.json>}"
: "${GH_TOKEN:?GH_TOKEN is required}"
: "${GITHUB_RUN_ID:?GITHUB_RUN_ID is required}"

if [[ ! "$marker" =~ ^\.github/certification/([a-z0-9-]+)-county\.json$ ]]; then
  echo "::error title=Invalid certification marker path::Expected .github/certification/<county>-county.json; got $marker"
  exit 2
fi
county="${BASH_REMATCH[1]}"
if [[ ! -s "$marker" ]]; then
  echo "::error title=Certification evidence missing::No certification marker was produced at $marker"
  exit 1
fi

repository="${GITHUB_REPOSITORY:-keeptxred/TexasDefined}"
branch="automation/county-certification-${county}-${GITHUB_RUN_ID}"
evidence_tmp="$(mktemp)"
cp "$marker" "$evidence_tmp"
trap 'rm -f "$evidence_tmp"' EXIT

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'

pr_url=""
for cycle in 1 2 3; do
  echo "Certification evidence publication cycle $cycle for $county"
  git fetch origin main
  git checkout -B "$branch" origin/main
  mkdir -p "$(dirname "$marker")"
  cp "$evidence_tmp" "$marker"
  git add -- "$marker"

  staged="$(git diff --cached --name-only)"
  if [[ -z "$staged" ]]; then
    echo "Certification evidence is already current on main; no PR required."
    exit 0
  fi
  if [[ "$staged" != "$marker" ]]; then
    echo "::error title=Certification evidence path violation::Refusing to publish files other than $marker"
    printf '%s\n' "$staged"
    exit 1
  fi

  git commit -m "Record ${county^} County production certification evidence"
  git push --force-with-lease origin "$branch"
  head_sha="$(git rev-parse HEAD)"
  parent_sha="$(git rev-parse HEAD^)"

  if [[ -z "$pr_url" ]]; then
    pr_url="$(gh pr create \
      --repo "$repository" \
      --base main \
      --head "$branch" \
      --title "Record ${county^} County certification evidence" \
      --body "Automated county-production certification evidence only. The county-specific source, authority, hero, full validation, deployment, live-page, canonical/legacy, and freshness checks ran before this marker was produced. This PR changes only \`$marker\`. The full TexasDefined validator is explicitly dispatched against the exact evidence commit before merge.")"
    echo "Opened $pr_url"
  fi

  before_run_id="$(gh run list --repo "$repository" --workflow validate.yml --branch "$branch" --event workflow_dispatch --limit 1 --json databaseId --jq '.[0].databaseId // 0')"
  gh workflow run validate.yml --repo "$repository" --ref "$branch"

  verify_run_id=""
  for attempt in $(seq 1 60); do
    verify_run_id="$(gh run list --repo "$repository" --workflow validate.yml --branch "$branch" --event workflow_dispatch --limit 20 --json databaseId,headSha --jq ".[] | select(.headSha == \"$head_sha\" and .databaseId > $before_run_id) | .databaseId" | head -n 1)"
    [[ -n "$verify_run_id" ]] && break
    sleep 2
  done
  if [[ -z "$verify_run_id" ]]; then
    echo "::error title=Certification validation run not found::Could not resolve Validate TexasDefined for evidence commit $head_sha"
    exit 1
  fi

  gh run watch "$verify_run_id" --repo "$repository" --exit-status

  git fetch origin main
  latest_main="$(git rev-parse origin/main)"
  if [[ "$parent_sha" != "$latest_main" ]]; then
    echo "main advanced during evidence validation: $parent_sha -> $latest_main; rebuilding marker-only branch on current main"
    continue
  fi

  gh pr merge "$pr_url" --repo "$repository" --merge
  git fetch origin main
  merged_main="$(git rev-parse origin/main)"
  echo "Certification evidence merged on current main $merged_main after exact-commit validation."
  exit 0
done

echo "::error title=Certification evidence reconciliation exhausted::main moved during all three validated evidence publication cycles."
exit 1
