import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lockhart-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lockhart-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
