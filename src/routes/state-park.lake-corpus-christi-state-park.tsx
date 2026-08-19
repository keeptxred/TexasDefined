import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/state-park/lake-corpus-christi-state-park")({ beforeLoad: ({ location }) => { throw redirect({ href: `/destination/lake-corpus-christi-state-park${location.searchStr || ""}`, statusCode: 301 }); } });
