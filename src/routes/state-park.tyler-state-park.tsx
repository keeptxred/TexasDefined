import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/tyler-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/tyler-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
