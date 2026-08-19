import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-livingston-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-livingston-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
