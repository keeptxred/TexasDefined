import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-hurricane-home-prep")({
  beforeLoad: () => {
    throw redirect({ href: "/article/texas-hurricane-preparation-homeowners-renters", statusCode: 301 });
  },
});
