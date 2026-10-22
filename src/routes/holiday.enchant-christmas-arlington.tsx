import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/holiday/enchant-christmas-arlington";
const title = "Enchant Christmas in Arlington: Is It Returning for 2026?";
const description = "Enchant Christmas has previously operated a Texas-area holiday light maze, but the organizer's live 2026 city list does not include Arlington or Dallas. This guide preserves the destination's history and explains how to verify a future Texas return without advertising nonexistent 2026 dates or tickets.";
export const Route = createFileRoute("/holiday/enchant-christmas-arlington")({
  head: () => ({
    meta: [{ title: `${title} | TexasDefined` }, { name: "description", content: description }],
    links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
  }),
});

