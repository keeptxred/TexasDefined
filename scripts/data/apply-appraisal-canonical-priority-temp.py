from pathlib import Path

route_path = Path('src/routes/learn.appraisal-districts.tsx')
validator_path = Path('scripts/data/validate-internal-link-discovery.mjs')

old = "const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"
new = "const priorityCountySlugs = ['polk', 'leon', 'mason', 'terrell', 'lubbock', 'hidalgo', 'sabine'];"

route = route_path.read_text()
if old not in route:
    raise SystemExit('Expected appraisal priority slug list not found in route')
route = route.replace(old, new, 1)
route = route.replace('className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"', 'className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"', 1)
route_path.write_text(route)

validator = validator_path.read_text()
marker = f'  "{old}",'
replacement = f'  "{new}",'
if marker not in validator:
    raise SystemExit('Expected appraisal priority slug list not found in validator')
validator = validator.replace(marker, replacement, 1)
validator_path.write_text(validator)
