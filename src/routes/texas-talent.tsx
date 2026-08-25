import { createFileRoute } from "@tanstack/react-router";

const description = "Texas Talent explores the musicians, actors, filmmakers, writers, artists and performers whose Texas stories helped shape their work and their influence.";

export const Route = createFileRoute("/texas-talent")({
  head: () => ({
    meta: [
      { title: "Texas Talent | The Stars of Texas Shine Bright" },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
