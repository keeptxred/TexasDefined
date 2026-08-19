import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/purtis-creek-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/purtis-creek-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
