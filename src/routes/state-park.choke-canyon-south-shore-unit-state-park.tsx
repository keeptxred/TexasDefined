import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/choke-canyon-south-shore-unit-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/choke-canyon-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
