import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
const ownerPortalAvailability=createServerFn({method:"GET"}).handler(async()=>({
 ownerPortalOpen:process.env.NETWORK_OWNER_PORTAL_ENABLED==="true"
}));
export const Route = createFileRoute("/network/billing")({
  loader:()=>ownerPortalAvailability(),
  head: () => ({
    meta: [
      { title: "Manage Your Network Membership | Texas Defined" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
});
