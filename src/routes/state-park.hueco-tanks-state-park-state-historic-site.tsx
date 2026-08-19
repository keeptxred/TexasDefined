import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/hueco-tanks-state-park-state-historic-site")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/hueco-tanks-state-park-and-historic-site${location.searchStr || ""}`, statusCode: 301 }); } });
