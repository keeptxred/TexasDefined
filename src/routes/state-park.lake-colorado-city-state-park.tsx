import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-colorado-city-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-colorado-city-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
