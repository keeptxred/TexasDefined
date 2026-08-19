import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/daingerfield-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/daingerfield-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
