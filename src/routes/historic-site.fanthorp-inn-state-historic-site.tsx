import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/historic-site/fanthorp-inn-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/fanthorp-inn-state-historic-site${location.searchStr || ""}`, statusCode: 301 }); } });
