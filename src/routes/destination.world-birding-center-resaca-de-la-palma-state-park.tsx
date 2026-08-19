import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/destination/world-birding-center-resaca-de-la-palma-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/resaca-de-la-palma-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
