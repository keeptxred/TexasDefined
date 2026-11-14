#!/usr/bin/env python3
"""Protect UIL football reciprocal directory links and canonical/indexing policy.

Static code contract only; existing build and SSR checks validate runtime pages.
No dependencies beyond Python 3.
"""
from __future__ import annotations

from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[2]
problems = []


def source(name):
    file = root / name
    if not file.is_file():
        problems.append(f"Missing {name}")
        return ""
    return file.read_text(encoding="utf-8")


def verify(ok, reason):
    if not ok:
        problems.append(reason)


alignment = source("src/data/high-school-football/uil-football-alignments-2026.server.ts")
district = source("src/routes/texas-high-school-football-districts_.$slug.lazy.tsx")
team = source("src/routes/texas-high-school-football-teams_.$slug.lazy.tsx")
profile = source("src/data/high-school-football/football-program-profile.server.ts")
index = source("src/routes/texas-high-school-football-teams.lazy.tsx")
district_route = source("src/routes/texas-high-school-football-districts_.$slug.tsx")
team_route = source("src/routes/texas-high-school-football-teams_.$slug.tsx")
sitemap_data = source("src/data/high-school-football/football-sitemap.server.ts")
sitemap = source("src/routes/sitemap[.]xml.ts")
robots = source("public/robots.txt")

blocks = re.findall(
    r"\{\s*classification:'[1-6]A',\s*division:(?:1|2|null),"
    r"\s*footballType:'(?:6-Man|11-Man)',\s*sourceUrl:'[^']+',"
    r"\s*districts:\[([\s\S]*?)\]\s*\}", alignment
)
rows = [match[0] or match[1] for block in blocks for match in re.findall(
    r"""(?:'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)")""", block
)]
count = sum(len(row.split(";")) for row in rows)
verify(len(blocks) == 11, f"Expected 11 UIL classification blocks, found {len(blocks)}")
verify(len(rows) == 192, f"Expected 192 UIL districts, found {len(rows)}")
verify(count == 1268, f"Expected 1,268 UIL member teams, found {count}")
verify(all(all(member.strip() for member in row.split(";")) for row in rows), "Empty UIL member found")

parent = re.search(r'<nav aria-labelledby="football-district-team-directory">([\s\S]*?)</nav>', district)
verify(parent is not None, "District page lacks semantic member-team nav")
if parent:
    body = parent.group(1)
    verify("<ul " in body and "</ul>" in body, "District member nav lacks HTML list")
    verify("district.programs.map((program, index) => <li" in body,
           "District page must emit all members from its source-data array")
    verify("href={program.profilePath}" in body and "</a></li>" in body,
           "District member list must use direct canonical HTML links")
verify('id="football-district-team-directory"' in district, "Member directory lacks accessible heading")

verify("districtPath: footballDistrictProfilePath(seed.classification, seed.division, seed.district)" in profile,
       "Team loader no longer derives its canonical parent district")
verify("{program && <section" in team, "Do not fabricate UIL links for non-UIL schools")
child = re.search(r'<nav aria-label="UIL football district"([\s\S]*?)</nav>', team)
verify(child is not None, "Team page lacks contextual parent district nav")
if child:
    verify("href={districtPath}" in child.group(1), "Team back link must use canonical districtPath")
    verify("alignmentLabel(program)" in child.group(1), "Team parent link lacks classification")
verify('href="/texas-high-school-football-districts"' in index,
       "Team index must link to the district directory without JS interaction")

verify("expected 1,268 school profiles" in sitemap_data, "1,268-school sitemap contract removed")
verify("expected 192 district profiles" in sitemap_data, "192-district sitemap contract removed")
verify("footballProgramSitemapEntries" in sitemap, "Core teams removed from main sitemap")
verify("footballDistrictSitemapEntries" in sitemap, "Core districts removed from main sitemap")
verify("/texas-high-school-football-teams/$" + "{slug}" in team_route, "Team canonical path changed")
verify("canonicalLink(texasDefinedBrand, canonicalPath)" in team_route, "Team self canonical removed")
verify("canonicalLink(texasDefinedBrand, canonicalPath)" in district_route, "District self canonical removed")
# A reviewable Googlebot-only eligibility gate replaced the historical blanket-index
# policy. Missing loader data during streamed SSR must not leave a sticky noindex.
# Bing remains governed by the unchanged generic robots meta.
verify(team_route.count("'noindex'") == 0
       and "applyGoogleOnlyNoindex(buildMeta(" in team_route
       and "isFootballTeamGoogleIndexReady(slug)" in team_route,
       "Team route must use only the protected Googlebot-specific policy")
verify(district_route.count("'noindex'") == 0
       and "applyGoogleOnlyNoindex(buildMeta(" in district_route
       and "isFootballDistrictGoogleIndexReady(loaderData.slug)" in district_route,
       "District route must use only the protected Googlebot-specific policy")
verify("if (!loaderData) return { meta: applyGoogleOnlyNoindex(" in team_route
       and "isFootballTeamGoogleIndexReady(params.slug)" in team_route,
       "Streamed team head must preserve the protected-slug boundary before loader resolves")
verify("if (!loaderData) return { meta: applyGoogleOnlyNoindex(" in district_route
       and "isFootballDistrictGoogleIndexReady(params.slug)" in district_route,
       "Streamed district head must preserve the protected-slug boundary before loader resolves")
google_meta = source("src/lib/google-only-indexing.ts")
manifest = source("src/data/high-school-football/google-index-eligibility.generated.json")
verify("name?.toLowerCase() !== 'googlebot'" in google_meta
       and "name: 'googlebot', content: 'noindex, follow'" in google_meta,
       "Google-only helper must preserve generic robots metadata for Bing")
verify('"teamIndexableSlugs": [' in manifest and '"districtIndexableSlugs": [' in manifest,
       "Required Google-specific allowlists are missing")
verify("/texas-high-school-football-districts/" in district_route, "District canonical path changed")
verify("Disallow: /texas-high-school-football" not in robots, "robots.txt blocks football URLs")
verify(re.search(r"User-agent:\s*Googlebot[\s\S]*?Allow:\s*/", robots) is not None,
       "Googlebot must retain Allow: /")

if problems:
    for problem in problems:
        print("FAIL:", problem, file=sys.stderr)
    raise SystemExit(f"Failed {len(problems)} football directory safeguard(s)")
print(f"PASS: {count} UIL teams, {len(rows)} districts; HTML linking, sitemap and canonical safeguards")
