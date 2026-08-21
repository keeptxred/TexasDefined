import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-unemployment")({
  beforeLoad: () => {
    throw redirect({ href: "https://keeptxred.com/guides/texas-unemployment-benefits-eligibility-law", statusCode: 301 });
  },
});
