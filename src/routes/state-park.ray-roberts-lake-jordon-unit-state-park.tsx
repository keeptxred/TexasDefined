import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/ray-roberts-lake-jordon-unit-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/ray-roberts-lake-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
