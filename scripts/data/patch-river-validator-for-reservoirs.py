from pathlib import Path

path = Path('scripts/data/validate-texas-explained-river-profiles.mjs')
text = path.read_text()
replacements = [
    ('10 core guides · 15 deeper explainers', '10 core guides · 20 deeper explainers'),
    ('Fifteen focused explainers behind the core guides', 'Twenty focused explainers behind the core guides'),
]
for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'Expected exactly one river-validator marker {old!r}, found {count}')
    text = text.replace(old, new, 1)
path.write_text(text)
print('River profile validator updated for the 30-article Texas Explained hub.')
