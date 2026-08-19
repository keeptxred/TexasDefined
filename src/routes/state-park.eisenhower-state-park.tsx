import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/eisenhower-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/eisenhower-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
