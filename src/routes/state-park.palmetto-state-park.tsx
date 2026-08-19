import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/palmetto-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/palmetto-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
