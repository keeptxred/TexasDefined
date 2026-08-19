import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/destination/world-birding-center-bentsen-rio-grande-valley-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/bentsen-rio-grande-valley-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
