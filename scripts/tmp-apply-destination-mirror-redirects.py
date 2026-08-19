from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected exactly one match for {old!r}, found {count}")
    p.write_text(text.replace(old, new, 1))

replace_once(
    "src/data/knowledge-graph/relationships.ts",
    "const DESTINATION_MIRROR_KINDS = new Set([",
    "export const DESTINATION_MIRROR_KINDS = new Set([",
)

replace_once(
    "src/routes/$kind.$slug.tsx",
    "import { createFileRoute, notFound } from '@tanstack/react-router';",
    "import { createFileRoute, notFound, redirect } from '@tanstack/react-router';",
)
replace_once(
    "src/routes/$kind.$slug.tsx",
    "import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';",
    "import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';\nimport { destinationQuery } from '@/data/queries';",
)
replace_once(
    "src/routes/$kind.$slug.tsx",
    "  canonicalEntityPath,\n  isIndexableEntityPage,",
    "  canonicalEntityPath,\n  DESTINATION_MIRROR_KINDS,\n  isIndexableEntityPage,",
)
replace_once(
    "src/routes/$kind.$slug.tsx",
    "  loader: async ({ params }) => {",
    "  loader: async ({ context, params }) => {",
)
replace_once(
    "src/routes/$kind.$slug.tsx",
    "    if (!entity || entity.kind !== params.kind) throw notFound();\n    const related = rankRelatedEntities(entity, graph, 12);",
    "    if (!entity || entity.kind !== params.kind) throw notFound();\n    if (DESTINATION_MIRROR_KINDS.has(entity.kind)) {\n      const destination = await context.queryClient.ensureQueryData(destinationQuery(entity.slug));\n      if (destination) throw redirect({ href: `/destination/${entity.slug}`, statusCode: 301 });\n    }\n    const related = rankRelatedEntities(entity, graph, 12);",
)

validator = Path("scripts/data/validate-entity-template-quality.mjs")
text = validator.read_text()
needle = "if (errors.length) {"
if text.count(needle) != 1:
    raise SystemExit("validate-entity-template-quality.mjs: unexpected errors block count")
block = """for (const feature of [
  'export const DESTINATION_MIRROR_KINDS = new Set([',
  \"import { createFileRoute, notFound, redirect } from '@tanstack/react-router';\",
  \"import { destinationQuery } from '@/data/queries';\",
  'DESTINATION_MIRROR_KINDS.has(entity.kind)',
  'context.queryClient.ensureQueryData(destinationQuery(entity.slug))',
  'statusCode: 301',
]) {
  const source = feature.startsWith('export const DESTINATION_MIRROR_KINDS') ? entityRelationships : entityRoute;
  if (!source.includes(feature)) errors.push(`Destination mirror redirect contract missing: ${feature}`);
}

"""
validator.write_text(text.replace(needle, block + needle, 1))

print("Applied destination mirror redirect patch with asserted anchors.")
