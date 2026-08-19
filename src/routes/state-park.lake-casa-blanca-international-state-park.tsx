import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-casa-blanca-international-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-casa-blanca-international-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
