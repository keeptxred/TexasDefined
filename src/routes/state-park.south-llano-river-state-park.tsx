import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/south-llano-river-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/south-llano-river-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
