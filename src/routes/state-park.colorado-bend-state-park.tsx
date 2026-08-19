import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/colorado-bend-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/colorado-bend-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
