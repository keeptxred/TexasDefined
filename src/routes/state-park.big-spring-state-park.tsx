import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/big-spring-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/big-spring-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
