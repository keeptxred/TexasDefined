import { HuntingAuthorityHub } from "./HuntingAuthority";
import { HuntingHubSchema } from "./HuntingSchema";
import { HuntingRegulationArchiveNotice } from "./HuntingRegulationArchiveNotice";

export default function HuntingHubPage() {
  return (
    <>
      <HuntingHubSchema />
      <HuntingRegulationArchiveNotice />
      <HuntingAuthorityHub />
    </>
  );
}
