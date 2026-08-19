import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/palo-duro-canyon-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/palo-duro-canyon-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
