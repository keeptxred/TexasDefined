import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/brazos-bend-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/brazos-bend-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
