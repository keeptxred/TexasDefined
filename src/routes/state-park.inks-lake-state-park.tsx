import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/inks-lake-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/inks-lake-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
