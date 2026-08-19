import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/historic-site/lipantitlan-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lipantitlan-state-historic-site${location.searchStr || ""}`, statusCode: 301 }); } });
