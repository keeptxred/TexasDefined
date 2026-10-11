import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const networkIntakeAvailability=createServerFn({method:"GET"}).handler(async()=>{
  const {networkCustomerLaunchArmed}=await import("@/data/network-atomic-launch-readiness.server");
  return {applicationsOpen:process.env.NETWORK_INTAKE_ENABLED==="true"&&networkCustomerLaunchArmed(process.env)};
});

export const Route = createFileRoute("/network/apply")({
  loader:()=>networkIntakeAvailability(),
  head: () => ({ meta: [{ title: "Build Your Business Listing | Texas Defined" }, { name: "robots", content: "noindex,nofollow,noarchive" }] }),
});
