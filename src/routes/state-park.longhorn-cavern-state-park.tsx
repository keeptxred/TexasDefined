import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/longhorn-cavern-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/longhorn-cavern-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
