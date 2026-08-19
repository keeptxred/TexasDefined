import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/destination/world-birding-center-estero-llano-grande-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/estero-llano-grande-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
