import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `# TexasDefined\n\nTexasDefined is a Texas lifestyle, travel, home, property and reference publication.\n\n## Canonical domain\nhttps://texasdefined.com\n\n## Knowledge graph\n- Search and filter: https://texasdefined.com/api/knowledge-graph\n- AI-oriented JSON-LD: https://texasdefined.com/api/ai/entities\n- Query example: https://texasdefined.com/api/ai/entities?q=caddo\n- Entity example: https://texasdefined.com/api/ai/entities?id=lake:caddo-lake\n\n## Sitemaps\n- https://texasdefined.com/sitemap.xml\n- https://texasdefined.com/sitemap-explore.xml\n- https://texasdefined.com/sitemap-explore-locations.xml\n\n## Editorial ownership\nTexasDefined owns non-political Texas lifestyle, travel, property, home, event and destination content. KeepTXRed owns political and legislative entities.\n`,
          {
            headers: {
              'content-type': 'text/plain; charset=utf-8',
              'cache-control': 'public, max-age=3600',
            },
          },
        ),
    },
  },
});
