import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/cooper-lake-south-sulphur-unit-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/cooper-lake-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
