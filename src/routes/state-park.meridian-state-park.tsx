import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/meridian-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/meridian-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
