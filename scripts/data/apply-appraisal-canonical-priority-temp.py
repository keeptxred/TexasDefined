from pathlib import Path

route_path = Path('src/routes/learn.appraisal-districts.tsx')
validator_path = Path('scripts/data/validate-internal-link-discovery.mjs')

old = "const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"
new = "const priorityCountySlugs = ['polk', 'leon', 'mason', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"

route = route_path.read_text()
validator = validator_path.read_text()
if route.count(old) != 1:
    raise SystemExit(f'Expected exactly one old priority list in route; found {route.count(old)}')
if validator.count(old) != 1:
    raise SystemExit(f'Expected exactly one old priority list in validator; found {validator.count(old)}')

route = route.replace(old, new, 1)
route = route.replace('className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"', 'className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"', 1)
validator = validator.replace(old, new, 1)

route_path.write_text(route)
validator_path.write_text(validator)
