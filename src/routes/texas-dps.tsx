import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-dps")({
  beforeLoad: () => {
    throw redirect({ href: "https://keeptxred.com/texas-government/agencies/texas-department-public-safety", statusCode: 301 });
  },
});
