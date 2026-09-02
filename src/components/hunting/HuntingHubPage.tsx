import { HuntingAuthorityHub } from "./HuntingAuthority";
import { HuntingHubSchema } from "./HuntingSchema";

export default function HuntingHubPage() {
  return (
    <>
      <HuntingHubSchema />
      <HuntingAuthorityHub />
    </>
  );
}
