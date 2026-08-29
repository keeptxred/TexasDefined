import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-wildlife-guide")({
  beforeLoad: () => {
    throw redirect({ href: "/article/texas-wildlife-guide", statusCode: 301 });
  },
});
