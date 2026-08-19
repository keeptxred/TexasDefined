import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/mustang-island-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/mustang-island-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
