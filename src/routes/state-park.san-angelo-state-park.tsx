import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/san-angelo-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/san-angelo-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
