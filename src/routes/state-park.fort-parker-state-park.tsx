import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/fort-parker-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/fort-parker-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
