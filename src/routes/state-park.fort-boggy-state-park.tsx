import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/fort-boggy-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/fort-boggy-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
