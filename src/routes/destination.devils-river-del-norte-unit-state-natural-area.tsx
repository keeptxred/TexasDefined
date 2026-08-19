import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/destination/devils-river-del-norte-unit-state-natural-area")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/devils-river-state-natural-area${location.searchStr || ""}`, statusCode: 301 }); } });
