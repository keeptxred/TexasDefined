from pathlib import Path

route_path = Path('src/routes/learn.appraisal-districts.tsx')
validator_path = Path('scripts/data/validate-internal-link-discovery.mjs')

old = "const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"
new = "const priorityCountySlugs = ['polk', 'leon', 'mason', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"

route = route_path.read_text()
validator = validator_path.read_text()
if new not in route:
    raise SystemExit('Updated priority list is missing from appraisal route')
if validator.count(old) != 1:
    raise SystemExit(f'Expected exactly one old priority list in validator; found {validator.count(old)}')
validator_path.write_text(validator.replace(old, new, 1))
