import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/bonham-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/bonham-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
