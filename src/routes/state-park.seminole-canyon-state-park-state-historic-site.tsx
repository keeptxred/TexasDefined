import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/seminole-canyon-state-park-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/seminole-canyon-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
