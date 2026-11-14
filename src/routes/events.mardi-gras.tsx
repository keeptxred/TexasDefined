import { createFileRoute } from "@tanstack/react-router";
const canonicalPath = "/events/mardi-gras";
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: "Texas Mardi Gras 2027 | Texas Defined" },
      { name: "description", content: "Compare confirmed 2027 Mardi Gras festivals across Texas: Galveston, Port Arthur, Jefferson, Bandera, Kemah and more. Find official parade dates and practical travel guides." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});
