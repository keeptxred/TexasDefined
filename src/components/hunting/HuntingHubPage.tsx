import { HuntingAuthorityHub } from "./HuntingAuthority";
import { HuntingHubSchema } from "./HuntingSchema";
import { HuntingRegulationArchiveNotice } from "./HuntingRegulationArchiveNotice";
import { HuntingCountyProvider } from "./HuntingCountyContext";

export default function HuntingHubPage() {
  return (
    <>
      <HuntingHubSchema />
      <HuntingRegulationArchiveNotice />
      <HuntingCountyProvider><HuntingAuthorityHub /></HuntingCountyProvider>
    </>
  );
}
