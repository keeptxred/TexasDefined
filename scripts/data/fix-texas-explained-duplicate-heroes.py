from pathlib import Path

assets = {
    "texas-courthouse-architecture.svg": ("Texas Courthouse Architecture", "Domes, towers and civic design", "#d7c2a6", "#5a3f2d"),
    "texas-main-street-downtowns.svg": ("Texas Main Streets", "Historic downtowns and storefront blocks", "#c9d0c0", "#3d5141"),
    "texas-guadalupe-river.svg": ("The Guadalupe River", "Springs, limestone and Hill Country flow", "#bcd8d5", "#2b6164"),
    "texas-aquifers-springs.svg": ("Texas Aquifers & Springs", "The hidden water beneath the state", "#c7d9ce", "#35594c"),
    "texas-river-basins.svg": ("Texas River Basins", "Watersheds connecting land to the Gulf", "#c9d9e6", "#36566e"),
    "texas-trinity-river.svg": ("The Trinity River", "North Texas headwaters to the coast", "#c7d6cf", "#3f5f52"),
    "texas-prairies-grasslands.svg": ("Texas Prairies", "Grasslands hidden in plain sight", "#ddd4ad", "#655b2f"),
    "texas-ecoregions-habitats.svg": ("Texas Ecoregions", "Rainfall, soils and habitat patterns", "#d0d7b8", "#4c5f34"),
    "texas-highway-designations.svg": ("Texas Highway Designations", "FM, RM, SH, Loop, Spur and more", "#d5d1c5", "#41413f"),
}

for filename, (title, subtitle, bg, ink) in assets.items():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="t d">
<title id="t">{title}</title><desc id="d">Editorial illustration for {title}.</desc>
<rect width="1600" height="900" fill="{bg}"/>
<circle cx="1320" cy="180" r="250" fill="{ink}" opacity="0.10"/>
<circle cx="220" cy="760" r="300" fill="{ink}" opacity="0.08"/>
<path d="M0 690 C260 610 420 760 680 670 S1100 570 1600 690 V900 H0 Z" fill="{ink}" opacity="0.16"/>
<rect x="130" y="150" width="1340" height="520" rx="28" fill="#ffffff" opacity="0.82"/>
<text x="800" y="360" text-anchor="middle" font-family="Georgia,serif" font-size="78" font-weight="700" fill="{ink}">{title}</text>
<text x="800" y="455" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" fill="{ink}" opacity="0.88">{subtitle}</text>
<path d="M540 535h520" stroke="{ink}" stroke-width="7" opacity="0.55"/>
<text x="800" y="610" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" letter-spacing="7" fill="{ink}" opacity="0.72">TEXAS DEFINED</text>
</svg>'''
    Path("public/images/editorial", filename).write_text(svg)

replacements = {
    "src/data/fixtures/texas-explained-support-stubs.ts": {
        '"/images/explore/historic-sites/fort-davis-national-historic-site.jpg"': '"/images/editorial/texas-courthouse-architecture.svg"',
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-river-basins.svg"',
        '"/images/explore/national-parks/big-bend-national-park.jpg"': '"/images/editorial/texas-ecoregions-habitats.svg"',
        '"https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1600&q=82"': '"/images/editorial/texas-highway-designations.svg"',
    },
    "src/data/fixtures/texas-explained-support-articles.ts": {
        '"/images/explore/historic-sites/fort-davis-national-historic-site.jpg"': '"/images/editorial/texas-courthouse-architecture.svg"',
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-river-basins.svg"',
        '"/images/explore/national-parks/big-bend-national-park.jpg"': '"/images/editorial/texas-ecoregions-habitats.svg"',
        '"https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1600&q=82"': '"/images/editorial/texas-highway-designations.svg"',
    },
    "src/data/fixtures/texas-explained-support-stubs-2.ts": {
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-aquifers-springs.svg"',
        '"/images/explore/national-parks/big-bend-national-park.jpg"': '"/images/editorial/texas-prairies-grasslands.svg"',
        '"/images/explore/historic-sites/fort-davis-national-historic-site.jpg"': '"/images/editorial/texas-main-street-downtowns.svg"',
    },
    "src/data/fixtures/texas-explained-support-articles-2.ts": {
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-aquifers-springs.svg"',
        '"/images/explore/national-parks/big-bend-national-park.jpg"': '"/images/editorial/texas-prairies-grasslands.svg"',
        '"/images/explore/historic-sites/fort-davis-national-historic-site.jpg"': '"/images/editorial/texas-main-street-downtowns.svg"',
    },
    "src/data/fixtures/texas-explained-river-profile-stubs.ts": {
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-guadalupe-river.svg"',
        '"/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg"': '"/images/editorial/texas-trinity-river.svg"',
    },
    "src/data/fixtures/texas-explained-river-profiles.ts": {
        '"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"': '"/images/editorial/texas-guadalupe-river.svg"',
        '"/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg"': '"/images/editorial/texas-trinity-river.svg"',
    },
}

for file, mapping in replacements.items():
    path = Path(file)
    text = path.read_text()
    for old, new in mapping.items():
        count = text.count(old)
        if count != 1:
            raise SystemExit(f"{file}: expected one occurrence of {old}, found {count}")
        text = text.replace(old, new, 1)
    path.write_text(text)

print(f"Wrote {len(assets)} unique editorial heroes and patched {len(replacements)} fixture files.")
