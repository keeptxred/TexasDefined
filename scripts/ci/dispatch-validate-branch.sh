#!/usr/bin/env bash
set -euo pipefail

branch="${1:?usage: dispatch-validate-branch.sh <branch>}"
workflow="${2:-validate.yml}"
sha="$(git rev-parse HEAD)"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "::error title=GitHub token required::GH_TOKEN must be set to dispatch and inspect validation runs."
  exit 1
fi

echo "Dispatching ${workflow} for ${branch} at ${sha}."
gh workflow run "$workflow" --ref "$branch"

run_id=""
for attempt in $(seq 1 30); do
  run_id="$(
    gh run list \
      --workflow "$workflow" \
      --branch "$branch" \
      --event workflow_dispatch \
      --limit 20 \
      --json databaseId,headSha \
      --jq ".[] | select(.headSha == \"$sha\") | .databaseId" \
      | head -n 1
  )"
  if [[ -n "$run_id" ]]; then
    break
  fi
  echo "Waiting for dispatched validation run to appear (attempt ${attempt}/30)."
  sleep 2
done

if [[ -z "$run_id" ]]; then
  echo "::error title=Validation dispatch not found::No ${workflow} workflow_dispatch run appeared for ${branch} at ${sha}."
  exit 1
fi

echo "Watching validation run ${run_id} for ${sha}."
gh run watch "$run_id" --exit-status

echo "Validation run ${run_id} passed for ${branch} at ${sha}."
