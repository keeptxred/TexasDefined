import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/garner-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/garner-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
