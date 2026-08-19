import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/abilene-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/abilene-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
