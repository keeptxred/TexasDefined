import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/martin-creek-lake-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/martin-creek-lake-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
