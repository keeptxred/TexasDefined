#!/usr/bin/env bash
set -euo pipefail

branch="${1:?usage: dispatch-validate-branch.sh <branch>}"
workflow="${2:-validate.yml}"
sha="$(git rev-parse HEAD)"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "::error title=GitHub token required::GH_TOKEN must be set to dispatch and inspect validation runs."
  exit 1
fi

mapfile -t preexisting_run_ids < <(
  gh run list \
    --workflow "$workflow" \
    --branch "$branch" \
    --event workflow_dispatch \
    --limit 100 \
    --json databaseId,headSha \
    --jq ".[] | select(.headSha == \"$sha\") | .databaseId"
)

echo "Dispatching ${workflow} for ${branch} at ${sha}."
gh workflow run "$workflow" --ref "$branch"

run_id=""
for attempt in $(seq 1 30); do
  new_run_ids=()

  while IFS= read -r candidate_id; do
    [[ -z "$candidate_id" ]] && continue

    is_preexisting=false
    for existing_id in "${preexisting_run_ids[@]}"; do
      if [[ "$candidate_id" == "$existing_id" ]]; then
        is_preexisting=true
        break
      fi
    done

    if [[ "$is_preexisting" == false ]]; then
      new_run_ids+=("$candidate_id")
    fi
  done < <(
    gh run list \
      --workflow "$workflow" \
      --branch "$branch" \
      --event workflow_dispatch \
      --limit 100 \
      --json databaseId,headSha \
      --jq ".[] | select(.headSha == \"$sha\") | .databaseId"
  )

  if (( ${#new_run_ids[@]} > 1 )); then
    echo "::error title=Ambiguous validation dispatch::Multiple new ${workflow} workflow_dispatch runs appeared for ${branch} at ${sha}: ${new_run_ids[*]}. Refusing to guess which run belongs to this dispatch."
    exit 1
  fi

  if (( ${#new_run_ids[@]} == 1 )); then
    run_id="${new_run_ids[0]}"
    break
  fi

  echo "Waiting for newly dispatched validation run to appear (attempt ${attempt}/30)."
  sleep 2
done

if [[ -z "$run_id" ]]; then
  echo "::error title=Validation dispatch not found::No new ${workflow} workflow_dispatch run appeared for ${branch} at ${sha}."
  exit 1
fi

echo "Watching newly dispatched validation run ${run_id} for ${sha}."
# Poll the authoritative run endpoint instead of gh run watch, which also
# requests job lists and aborts on transient GitHub API 5xx responses.
# Never retry a completed failing validation or accept a different SHA.
deadline=$((SECONDS + 5400))
poll_failures=0
while (( SECONDS < deadline )); do
  if run_json="$(gh api "repos/{owner}/{repo}/actions/runs/$run_id")"; then
    poll_failures=0
    if ! jq -e --arg sha "$sha" --arg branch "$branch" \
      '.head_sha == $sha and .head_branch == $branch and .event == "workflow_dispatch"' \
      <<< "$run_json" >/dev/null; then
      echo "::error::Validation run identity mismatch for $run_id."
      exit 1
    fi
    if [[ "$(jq -r .status <<< "$run_json")" == completed ]]; then
      conclusion="$(jq -r .conclusion <<< "$run_json")"
      if [[ "$conclusion" != success ]]; then
        echo "::error::Validation run $run_id completed with $conclusion."
        exit 1
      fi
      break
    fi
  else
    poll_failures=$((poll_failures + 1))
    echo "::warning::Validation status request failed ($poll_failures/8); retrying the same run."
    if (( poll_failures >= 8 )); then
      echo "::error::Unable to verify validation run $run_id after eight attempts."
      exit 1
    fi
  fi
  sleep 15
done
if [[ "${conclusion:-}" != success ]]; then
  echo "::error::Timed out verifying validation run $run_id."
  exit 1
fi

echo "Validation run ${run_id} passed for ${branch} at ${sha}."
