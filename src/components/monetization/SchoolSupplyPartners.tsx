import { lazy, Suspense } from "react";

const SchoolSupplyPartnersContent = lazy(() =>
  import("./SchoolSupplyPartnersContent").then((module) => ({ default: module.SchoolSupplyPartnersContent })),
);

type SchoolSupplyPartnersProps = {
  placement?: "inline" | "rail";
  className?: string;
  context?: "school" | "homecoming";
};

export function SchoolSupplyPartners(props: SchoolSupplyPartnersProps) {
  return (
    <Suspense fallback={null}>
      <SchoolSupplyPartnersContent {...props} />
    </Suspense>
  );
}
