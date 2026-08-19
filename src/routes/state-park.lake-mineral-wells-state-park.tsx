import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-mineral-wells-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-mineral-wells-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
