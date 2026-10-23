import { createFileRoute } from "@tanstack/react-router";
const canonicalPath = "/explore/big-bend-scenic-drives";
export const Route = createFileRoute("/explore/big-bend-scenic-drives")({
  head: () => ({
    meta: [
      { title: "Big Bend Scenic Drives: Routes, Stops and Road Safety | Texas Defined" },
      { name: "description", content: "Compare Ross Maxwell, Chisos Basin, FM 170 and eastern Big Bend roads with NPS and TPWD sources, driving conditions, stops and trip plans." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});
