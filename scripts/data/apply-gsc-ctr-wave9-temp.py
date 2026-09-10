from pathlib import Path

seo_path = Path('src/lib/seo.ts')
validator_path = Path('scripts/data/validate-gsc-page-one-ctr.mjs')
seo = seo_path.read_text()
validator = validator_path.read_text()

entries = [
    ('/article/texas-railroads-town-growth-explained', 'Texas Railroad Towns: How Rail Lines Shaped City Growth', 'See how railroads shaped Texas town growth, depot districts, commerce and settlement patterns as rail lines redirected travel and trade across the state.'),
    ('/event/great-texas-balloon-race', 'Great Texas Balloon Race: Dates, Tickets & Longview Guide', 'Plan the Great Texas Balloon Race in Longview with the latest organizer date status, ticket information, balloon events and official planning links.'),
    ('/sports-venue/freeman-coliseum', 'Freeman Coliseum San Antonio: Parking, Events & Visitor Guide', 'Plan a Freeman Coliseum visit in San Antonio with parking, directions, event and official venue information for arena shows and community events.'),
    ('/sports-venue/hodgetown', 'HODGETOWN Amarillo: Parking, Tickets & Sod Poodles Games', 'Plan a HODGETOWN visit in Amarillo with parking, tickets, directions and event information for Amarillo Sod Poodles baseball and ballpark events.'),
    ('/sports-venue/reckling-park', 'Reckling Park Houston: Parking, Tickets & Rice Baseball', 'Plan a Reckling Park visit in Houston with parking, tickets, directions and official Rice baseball venue information.'),
    ('/sports-venue/southwest-university-park', 'Southwest University Park El Paso: Parking, Tickets & Baseball', 'Plan a Southwest University Park visit in El Paso with parking, tickets, directions and event information for El Paso Chihuahuas baseball.'),
    ('/sports-venue/ufcu-disch-falk-field', 'UFCU Disch-Falk Field Austin: Parking, Tickets & Texas Baseball', 'Plan a UFCU Disch-Falk Field visit in Austin with parking, tickets, directions and official Texas Longhorns baseball venue information.'),
    ('/sports-venue/don-haskins-center', 'Don Haskins Center El Paso: Parking, Events & UTEP Basketball', 'Plan a Don Haskins Center visit in El Paso with parking, directions, event and official venue information for UTEP basketball and arena events.'),
    ('/texas-symbols/nickname', 'Texas State Nickname: Why Texas Is the Lone Star State', 'Learn why Texas is called the Lone Star State, how the nickname connects to the state flag and independence, and its place among Texas symbols.'),
    ('/texas-symbols/grass', 'Texas State Grass: Sideoats Grama Facts & History', 'Learn about sideoats grama, the official Texas state grass, including its designation, range, habitat and role in Texas prairie landscapes.'),
    ('/texas-symbols/sea-turtle', "Texas State Sea Turtle: Kemp's Ridley Facts & History", "Learn about Kemp's ridley, the official Texas state sea turtle, including its designation, Gulf Coast habitat, nesting and conservation context."),
    ('/texas-vs/nebraska', 'Texas vs Nebraska: Cost of Living, Taxes, Climate & Lifestyle', 'Compare Texas and Nebraska on cost of living, taxes, housing, climate, jobs, geography and daily life in a practical side-by-side state guide.'),
]

marker = '\n} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS'
if '"/article/texas-railroads-town-growth-explained": {' not in seo:
    block = ''
    for path, title, description in entries:
        block += f'  "{path}": {{\n    title: "{title}",\n    description: "{description}",\n  }},\n'
    if marker not in seo:
        raise SystemExit('SEO insertion marker missing')
    seo = seo.replace(marker, '\n' + block + '} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS', 1)

if 'const ninthWave = [' not in validator:
    lines = ['const ninthWave = [']
    for path, title, description in entries:
        short_desc = description[:92].rstrip()
        lines.append(f'  {{ path: "{path}", title: "{title}", description: "{short_desc}" }},')
    lines += ['];', '', 'for (const experiment of ninthWave) {', "  for (const required of ['\"' + experiment.path + '\"', experiment.title, experiment.description]) {", "    if (!seo.includes(required)) failures.push('Ninth-wave CTR contract missing for ' + experiment.path + ': ' + required);", '  }', '}', '', 'if (ninthWave.length !== 12) {', "  failures.push('Expected exactly 12 ninth-wave GSC CTR experiments, found ' + ninthWave.length + '.');", '}', '']
    vmarker = 'const settlementLandingSelection = {'
    if vmarker not in validator:
        raise SystemExit('Validator insertion marker missing')
    validator = validator.replace(vmarker, '\n'.join(lines) + '\n' + vmarker, 1)

seo_path.write_text(seo)
validator_path.write_text(validator)
