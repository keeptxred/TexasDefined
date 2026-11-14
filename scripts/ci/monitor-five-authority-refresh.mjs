import assert from "node:assert/strict";
import { readFile, appendFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const config = JSON.parse(await readFile("ops/editorial/five-authority-refresh-groups.json", "utf8"));
const expectedPaths = ["/hunting", "/dogs", "/sports", "/sports/friday-night-lights", "/texas-tailgating-guide"];
assert.equal(config.schemaVersion, 1);
assert.deepEqual(config.groups.map(group => group.path), expectedPaths,
  "All five canonical hubs must remain enrolled in exactly one refresh group");
const tasks = {
  "/hunting": "src/components/hunting/HuntingAuthority.tsx",
  "/dogs": "src/components/dogs/DogsHubPage.tsx",
  "/sports": "src/routes/sports.lazy.tsx",
  "/sports/friday-night-lights": "src/routes/sports.friday-night-lights.lazy.tsx",
  "/texas-tailgating-guide": "src/routes/texas-tailgating-guide.lazy.tsx",
};
const nowDay = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
const selected = config.groups.filter(group =>
  process.argv.includes("--all") || group.runUtcWeekdays.includes(nowDay.getUTCDay()));
const issues = [];
const rows = [];
for (const group of config.groups) {
  const content = await readFile(tasks[group.path], "utf8");
  assert.ok(group.id && group.maxReviewAgeDays >= 1 && group.maxReviewAgeDays <= 90);
  assert.ok(Array.isArray(group.runUtcWeekdays) && group.runUtcWeekdays.length > 0);
  assert.ok(Array.isArray(group.officialSources) && group.officialSources.length > 0);
  assert.ok(Array.isArray(group.requiredLiveMarkers) && group.requiredLiveMarkers.length > 0);
  for (const marker of group.requiredLiveMarkers)
    assert.ok(content.includes(marker), group.path + ": required content absent from source: " + marker);
  for (const item of group.officialSources) {
    assert.equal(new URL(item.url).protocol, "https:", group.path + ": unsafe official source URL");
    assert.ok(item.name && item.containsAny.length > 0, group.path + ": source contract incomplete");
    assert.ok(content.includes(item.url) || group.path === "/sports" || group.path === "/sports/friday-night-lights",
      group.path + ": source not linked from page: " + item.url);
  }
  const reviewed = Date.parse(group.lastFactReviewAt + "T00:00:00Z");
  assert.ok(Number.isFinite(reviewed) && reviewed <= nowDay.getTime(),
    group.path + ": source review date invalid or in the future");
  const days = Math.floor((nowDay.getTime() - reviewed) / 86_400_000);
  rows.push({group:group.id,path:group.path,checked:group.lastFactReviewAt,days,
    maxDays:group.maxReviewAgeDays,selected:selected.includes(group)});
  if (days > group.maxReviewAgeDays)
    issues.push(group.path + ": source facts were not reverified in " + days +
      " days (max " + group.maxReviewAgeDays + "); HTTP reachability cannot advance editorial review date");
}
console.log("FIVE_REFRESH_GROUPS " + JSON.stringify(rows));
console.log("REFRESH_STATIC_PASS five page paths, source registries, review ages and required content");
if (process.argv.includes("--production")) {
  for (const group of config.groups) {
    try {
      const url = "https://texasdefined.com" + group.path +
        "?__td_refresh_proof=" + encodeURIComponent((process.env.GITHUB_RUN_ID || "local") + "-" + randomUUID());
      const response = await fetch(url, {
        headers: {"Cache-Control":"no-cache, no-store, max-age=0",Pragma:"no-cache",
          "User-Agent":"TexasDefined-Authority-Refresh-Registry/2026"},
        redirect:"follow", signal:AbortSignal.timeout(25000),
      });
      const html = await response.text();
      assert.equal(response.status, 200, "HTTP " + response.status);
      assert.ok(html.length > 3000 && response.url.includes("__td_refresh_proof="));
      assert.ok(html.includes('rel="canonical"') &&
        html.includes('href="https://texasdefined.com' + group.path + '"'), "Wrong live canonical");
      assert.ok(!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html), "Unexpected noindex");
      const status = response.headers.get("cf-cache-status") || "unreported";
      const age = response.headers.get("age");
      assert.ok(!["HIT","STALE","UPDATING"].includes(status.toUpperCase()) &&
        (age === null || Number(age) === 0), "Cached HTML: " + status + ", Age " + age);
      for (const marker of group.requiredLiveMarkers)
        assert.ok(html.includes(marker), "Published hub missing current editorial marker " + marker);
      console.log("REFRESH_LIVE_PASS " + group.path + " cache=" + status +
        " age=" + (age ?? "none") + " ray=" + (response.headers.get("cf-ray") || "unreported"));
      if (group.path === "/sports" && html.includes("Archive, not current results") &&
          !html.includes("Featured from the sports desk"))
        issues.push("/sports: No original article in the current 35-day feature window. Older articles are archived. Fresh source-backed magazine reporting remains required; do not re-date old copy.");
    } catch(error) {
      issues.push(group.path + ": live review: " + error.message);
    }
  }
  for (const group of selected) for (const source of group.officialSources) {
    try {
      const response = await fetch(source.url, {
        headers: {"Accept":"text/html,application/xhtml+xml",
          "User-Agent":"TexasDefined-Source-Review-Monitor/2026"},
        redirect:"follow", signal:AbortSignal.timeout(25000),
      });
      const body = await response.text();
      assert.equal(response.status, 200, "HTTP " + response.status);
      assert.ok(body.length > 250, "Official source unexpectedly empty");
      assert.ok(source.containsAny.some(needle => body.toLowerCase().includes(needle.toLowerCase())),
        "Expected topic text absent; source may have changed");
      console.log("REFRESH_SOURCE_REACHABLE " + group.id + " " + source.name +
        " HTTP " + response.status + " bytes=" + Buffer.byteLength(body) +
        " (not editorial fact certification)");
    } catch(error) {
      issues.push(group.path + ": official " + source.name + " source not independently comparable: " + error.message);
    }
  }
}
if (process.env.GITHUB_STEP_SUMMARY) {
  const summary = ["## Five authority hubs — factual source refresh registry", "",
    "HTTP monitoring proves reachability, not a new editorial fact review.", "",
    "| Hub | Group | Last fact review | Age | Max | Source checks today |",
    "|---|---|---|---:|---:|---|",
    ...rows.map(x => "| " + x.path + " | " + x.group + " | " + x.checked +
      " | " + x.days + "d | " + x.maxDays + "d | " + (x.selected ? "Yes":"No") + " |"),
    "", "### Findings",
    ...(issues.length ? issues.map(x => "- " + x) : ["- No monitored regression found; this is not a Google approval or a new source signoff."]),
  ].join("\n");
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
}
if (issues.length) {
  for (const issue of issues) console.error("REFRESH_ACTION_REQUIRED " + issue);
  process.exitCode = 1;
} else console.log("REFRESH_SCHEDULE_PASS source watch and all five hub contracts; fact review dates unchanged");
