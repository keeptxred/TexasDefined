import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/cleburne-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/cleburne-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
