import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-somerville-trailway-newman-bottom-th-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-somerville-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
