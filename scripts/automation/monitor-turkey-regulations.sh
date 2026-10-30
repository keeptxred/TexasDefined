#!/usr/bin/env bash
set -euo pipefail

# Keep the workflow YAML small and parseable. Never advance legal review dates.
if [[ "$GITHUB_EVENT_NAME" == "pull_request" ]]; then
  node --check scripts/data/check-turkey-regulations.mjs
  exit 0
fi
log="$RUNNER_TEMP/turkey-legal-source-check.log"
set +e
node scripts/data/check-turkey-regulations.mjs > "$log" 2>&1
code=$?
set -e
cat "$log"
if [[ "$code" == 0 ]]; then exit 0; fi
case "$code" in
  2)
    title="Review changed TPWD turkey regulations (2026–27)"
    summary="An official TPWD regulation no longer matches the editor-reviewed guide. Review the legal change, county exceptions and new official source before publishing."
    ;;
  3)
    title="TPWD turkey regulation source unavailable (2026–27)"
    summary="Official TPWD source transport failed. This does not prove legal-rule drift. Retain the guide's last editorial review date and investigate."
    ;;
  *)
    title="TPWD turkey regulation monitor failed unexpectedly"
    summary="The monitored TPWD source check failed with status $code. Inspect the log before changing legal hunting guidance."
    ;;
esac
existing="$(gh issue list --state open --search "$title in:title" --json number --jq '.[0].number // empty')"
if [[ -z "$existing" ]]; then
  {
    echo "$summary"
    echo
    echo "Exit code: $code"
    echo "Run: https://github.com/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
    echo "Page: https://texasdefined.com/hunting/turkey-hunting"
    echo
    echo '~~~'
    cat "$log"
    echo '~~~'
  } > "$RUNNER_TEMP/turkey-source-alert.md"
  gh issue create --title "$title" --body-file "$RUNNER_TEMP/turkey-source-alert.md"
fi
exit "$code"
