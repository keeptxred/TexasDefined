import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/monahans-sandhills-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/monahans-sandhills-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
