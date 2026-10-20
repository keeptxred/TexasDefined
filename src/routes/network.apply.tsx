import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const networkIntakeAvailability=createServerFn({method:"GET"}).handler(async()=>({
  applicationsOpen:process.env.NETWORK_INTAKE_ENABLED==="true"
}));

export const Route = createFileRoute("/network/apply")({
  loader:()=>networkIntakeAvailability(),
  head: () => ({ meta: [{ title: "Build Your Business Listing | Texas Defined" }, { name: "robots", content: "noindex,nofollow,noarchive" }] }),
});
