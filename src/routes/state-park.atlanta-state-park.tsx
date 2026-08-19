import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/atlanta-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/atlanta-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
