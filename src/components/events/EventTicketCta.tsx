import type { ResolvedEventTicketCta } from "@/data/events/ticketing";
import { trackAffiliateClick } from "@/lib/affiliate-click";

interface EventTicketCtaProps {
  cta: ResolvedEventTicketCta | null | undefined;
  eventId?: string;
  linkClassName?: string;
  wrapperClassName?: string;
  disclosureClassName?: string;
}

/**
 * Outbound-only ticket action. TexasDefined never owns ticket checkout.
 */
export function EventTicketCta({ cta, eventId, linkClassName, wrapperClassName, disclosureClassName }: EventTicketCtaProps) {
  if (!cta) return null;

  const placement = "event-ticket-cta";
  const partner = cta.isAffiliate ? cta.provider : undefined;

  return <span className={wrapperClassName}>
    <a
      href={cta.href}
      target="_blank"
      rel={cta.rel}
      data-affiliate-partner={partner}
      data-affiliate-event-id={partner ? eventId : undefined}
      data-affiliate-placement={partner ? placement : undefined}
      data-commercial-partner={partner}
      data-commercial-placement={partner ? placement : undefined}
      onClick={partner ? () => trackAffiliateClick({ partner, label: cta.label, placement, module: "event-ticketing", eventId }) : undefined}
      className={linkClassName}
    >{cta.label}</a>
    {cta.disclosure && <> <small className={disclosureClassName}>{cta.disclosure}</small></>}
  </span>;
}
