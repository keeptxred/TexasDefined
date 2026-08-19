import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/blanco-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/blanco-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
