import { createLazyFileRoute } from "@tanstack/react-router";

import ReturnRefundPolicyPage from "@/components/ReturnRefundPolicyPage";

export const Route = createLazyFileRoute("/return-refund-policy")({
  component: ReturnRefundPolicyPage,
});
