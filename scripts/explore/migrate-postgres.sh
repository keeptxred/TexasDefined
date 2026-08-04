#!/usr/bin/env bash
set -euo pipefail

: "${EXPLORE_SOURCE_DATABASE_URL:?Set EXPLORE_SOURCE_DATABASE_URL to the shared KeepTXRed Supabase Postgres connection string}"

mapfile -t tables < <(
  psql "$EXPLORE_SOURCE_DATABASE_URL" -Atc \
    "select schemaname || '.' || tablename from pg_tables where schemaname = 'public' and tablename like 'explore_%' order by tablename"
)

if [[ ${#tables[@]} -eq 0 ]]; then
  echo "No public.explore_* tables found." >&2
  exit 1
fi

printf 'Shared Explore tables (%s):\n' "${#tables[@]}"
for table in "${tables[@]}"; do
  count=$(psql "$EXPLORE_SOURCE_DATABASE_URL" -Atc "select count(*) from $table")
  printf '  %s: %s\n' "$table" "$count"
done

entity_count=$(psql "$EXPLORE_SOURCE_DATABASE_URL" -Atc "select count(*) from public.explore_entities")
echo "Explore shared-backend verification complete: $entity_count entities."
