import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sam-houston-museum-huntsville")({
  beforeLoad: () => {
    throw redirect({
      href: "/destination/sam-houston-memorial-museum-republic-texas-presidential-library-huntsville",
      statusCode: 301,
    });
  },
});
