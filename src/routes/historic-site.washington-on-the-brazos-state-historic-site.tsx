import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/historic-site/washington-on-the-brazos-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/washington-on-the-brazos-state-historic-site${location.searchStr || ""}`, statusCode: 301 }); } });
