import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/historic-site/lyndon-b-johnson-state-park-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lyndon-b-johnson-state-park-and-historic-site${location.searchStr || ""}`, statusCode: 301 }); } });
