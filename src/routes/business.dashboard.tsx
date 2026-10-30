import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
const ownerPortalAvailability=createServerFn({method:'GET'}).handler(async()=>{
 const {networkCustomerLaunchArmed}=await import("@/data/network-atomic-launch-readiness.server");
 return {ownerPortalOpen:process.env.NETWORK_OWNER_PORTAL_ENABLED==='true'&&networkCustomerLaunchArmed(process.env)};
});
export const Route=createFileRoute('/business/dashboard')({
 loader:()=>ownerPortalAvailability(),
 head:()=>({meta:[{title:'My Business | TexasDefined'},{name:'robots',content:'noindex,nofollow,noarchive'}]}),
});
