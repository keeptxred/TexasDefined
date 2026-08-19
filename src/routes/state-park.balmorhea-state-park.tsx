import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/balmorhea-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/balmorhea-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
