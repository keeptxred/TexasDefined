import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/mother-neff-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/mother-neff-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
