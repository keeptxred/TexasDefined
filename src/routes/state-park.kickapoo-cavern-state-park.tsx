import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/kickapoo-cavern-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/kickapoo-cavern-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
