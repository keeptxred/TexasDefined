import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/texas-flowers-wildflowers-guide")({
  beforeLoad: () => {
    throw redirect({ href: "/article/texas-wildflowers-guide", statusCode: 301 });
  },
});
