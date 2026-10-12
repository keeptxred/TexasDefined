import { createFileRoute } from "@tanstack/react-router";
import {createServerFn} from "@tanstack/react-start";
const isNetworkPublished=createServerFn({method:"GET"}).handler(async()=>{
 const {networkCustomerLaunchArmed}=await import("@/data/network-atomic-launch-readiness.server");
 return {launchReady:networkCustomerLaunchArmed(process.env)&&process.env.NETWORK_ISOLATED_STAGING!=='true'};
});
export const Route = createFileRoute("/network/join")({
  loader:()=>isNetworkPublished(),
  head:({loaderData})=>({
    meta:[
      {title:"Join the Texas Defined Network | Texas Defined"},
      {name:"description",content:"Join the Texas Defined Network. Explore free and enhanced profiles for Texas organizations."},
      {name:"robots",content:loaderData?.launchReady?"index,follow":"noindex,nofollow,noarchive"},
    ],
    links:loaderData?.launchReady ? [{rel:"canonical",href:"https://texasdefined.com/network/join"}] : [],
  }),
});