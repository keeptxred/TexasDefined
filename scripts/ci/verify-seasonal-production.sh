#!/usr/bin/env bash
set -euo pipefail
origin='https://texasdefined.com'
workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT
fetch_assert() {
  local label="$1" path="$2" needle="$3"
  local out="$workdir/${label}.html"
  local attempt
  for attempt in 1 2 3 4 5 6; do
    echo "[$label] attempt $attempt: ${origin}${path}"
    if curl --fail-with-body --silent --show-error --location --max-time 30 \
      "${origin}${path}?verify=${DEPLOY_SHA}-${GITHUB_RUN_ID}-${attempt}" -o "$out"; then
      if grep -Fq "$needle" "$out"; then
        echo "[$label] production content verified: $needle"
        return 0
      fi
      echo "[$label] fetched but expected content is not live yet: $needle"
    fi
    sleep 5
  done
  echo "[$label] production verification failed for ${origin}${path}" >&2
  head -c 1600 "$out" 2>/dev/null || true
  echo >&2
  return 1
}
redirect_assert() {
  local label="$1" path="$2" expected_path="$3"
  local headers="$workdir/${label}.headers"
  local attempt status location
  for attempt in 1 2 3 4 5 6; do
    echo "[$label] attempt $attempt: ${origin}${path}"
    status="$(curl --silent --show-error --max-time 30 --output /dev/null --dump-header "$headers" --write-out '%{http_code}' \
      "${origin}${path}?verify=${DEPLOY_SHA}-${GITHUB_RUN_ID}-${attempt}")"
    location="$(awk 'BEGIN{IGNORECASE=1} /^location:/ {sub(/\r$/,"",$0); sub(/^location:[[:space:]]*/,"",$0); print; exit}' "$headers")"
    if [ "$status" = 301 ] && [[ "$location" == "${origin}${expected_path}"* ]]; then
      echo "[$label] production redirect verified: $status $location"
      return 0
    fi
    echo "[$label] expected 301 to ${expected_path}, got status=${status} location=${location:-missing}"
    sleep 5
  done
  echo "[$label] production redirect verification failed for ${origin}${path}" >&2
  return 1
}

fetch_assert explore-seasonal '/explore' 'Seasonal Texas'
fetch_assert explore-bluebonnets '/explore' 'Bluebonnet season'
fetch_assert explore-fall '/explore' 'Fall colors in Texas'
fetch_assert explore-christmas '/explore' 'Christmas in Texas'

fetch_assert bluebonnet-hub '/article/texas-bluebonnets-complete-guide' 'Bluebonnet Season, Explained'
fetch_assert bluebonnet-best '/article/best-places-to-see-bluebonnets-in-texas' 'Where Texas Turns Blue in Spring'
fetch_assert bluebonnet-law '/article/is-it-illegal-to-pick-bluebonnets-in-texas' 'Is It Illegal to Pick Bluebonnets in Texas?'
fetch_assert bluebonnet-austin '/article/bluebonnets-near-austin' 'Where to See Bluebonnets Near Austin'

fetch_assert christmas-hub '/article/christmas-in-texas-complete-guide' 'Christmas in Texas, From River Lights to Courthouse Squares'
fetch_assert christmas-towns '/article/best-christmas-towns-in-texas' 'The Texas Towns That Go All In for Christmas'
fetch_assert christmas-lights '/article/best-christmas-lights-in-texas' 'The Best Christmas Lights in Texas'
fetch_assert christmas-trains '/article/texas-christmas-train-rides' 'Christmas Train Rides in Texas'
fetch_assert christmas-free-events '/article/free-christmas-events-in-texas' 'Fredericksburg: Christmas Nights of Lights at Marktplatz'

fetch_assert fall-hub '/article/fall-in-texas-complete-guide' 'Where Autumn Actually Shows Up in Texas'
fetch_assert fall-hub-east-link '/article/fall-in-texas-complete-guide' 'Explore East Texas fall colors'
fetch_assert fall-hub-hill-link '/article/fall-in-texas-complete-guide' 'Explore Hill Country fall colors'
fetch_assert fall-road-east-link '/article/texas-fall-foliage-road-trip' 'East Texas foliage alternative'
fetch_assert fall-parks-hill-link '/article/best-texas-state-parks-for-fall-colors' 'Explore Hill Country fall colors'
redirect_assert fall-best-retired '/article/best-places-for-fall-colors-in-texas' '/article/best-texas-state-parks-for-fall-colors'
fetch_assert fall-east '/article/east-texas-fall-colors' 'Where to See Fall Colors in East Texas'
fetch_assert fall-hill-east-link '/article/hill-country-fall-colors' 'Compare East Texas fall colors'
fetch_assert fall-parks '/article/best-texas-state-parks-for-fall-colors' 'The Best Texas State Parks for Fall Colors'

fetch_assert enchanted-bluebonnet '/destination/enchanted-rock-state-natural-area' 'Use the Texas bluebonnet season guide'
fetch_assert caddo-fall '/destination/caddo-lake-state-park' 'Use the Texas fall-color guide'
fetch_assert guadalupe-fall '/destination/guadalupe-river-state-park' 'Use the Texas fall-color guide'
fetch_assert new-braunfels-christmas '/destination/new-braunfels' 'Plan New Braunfels in the Texas Christmas guide'
fetch_assert gruene-christmas '/destination/gruene-historic-district' 'Put Gruene in a Texas Christmas trip'

fetch_assert gillespie-seasonal '/county/gillespie' 'Plan Gillespie County during bluebonnet season'
fetch_assert harrison-seasonal '/county/harrison' 'Plan an East Texas fall-color weekend'
fetch_assert marion-seasonal '/county/marion' 'Build a Caddo Lake fall-color trip'
fetch_assert ellis-bluebonnet '/county/ellis' 'Use the DFW bluebonnet guide for Ennis'
fetch_assert washington-bluebonnet '/county/washington' 'Use the Houston-area bluebonnet guide for Brenham'
fetch_assert burnet-bluebonnet '/county/burnet' 'Plan Burnet County during bluebonnet season'
fetch_assert llano-bluebonnet '/county/llano' 'Use the Texas bluebonnet season guide'
fetch_assert uvalde-fall '/county/uvalde' 'Plan Uvalde County for fall color'
fetch_assert bandera-fall '/county/bandera' 'Use Bandera County in a Hill Country fall trip'
