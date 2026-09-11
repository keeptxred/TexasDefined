import type { ResolvedEventTicketCta } from "@/data/events/ticketing";

interface EventTicketCtaProps {
  cta: ResolvedEventTicketCta | null | undefined;
  linkClassName?: string;
  wrapperClassName?: string;
  disclosureClassName?: string;
}

/**
 * Outbound-only ticket action. TexasDefined never owns ticket checkout.
 */
export function EventTicketCta({ cta, linkClassName, wrapperClassName, disclosureClassName }: EventTicketCtaProps) {
  if (!cta) return null;

  return <span className={wrapperClassName}>
    <a href={cta.href} target="_blank" rel={cta.rel} className={linkClassName}>{cta.label}</a>
    {cta.disclosure && <> <small className={disclosureClassName}>{cta.disclosure}</small></>}
  </span>;
}
