import { trackAffiliateClick } from "@/lib/affiliate-click";
import { abracadabraAffiliateLink, type AbracadabraDestination } from "@/data/abracadabra-affiliate";

interface AbracadabraCosplayCardProps {
  destination: AbracadabraDestination;
  placement: string;
  title?: string;
  body?: string;
  className?: string;
}

export function AbracadabraCosplayCard({
  destination,
  placement,
  title = "Need a costume, wig, makeup or prop?",
  body = "Abracadabra NYC is a New York-based costume and specialty retailer. It is an optional shopping resource, not a Texas convention sponsor or official event partner. Always check the event's current costume and prop rules before buying or carrying an item.",
  className = "",
}: AbracadabraCosplayCardProps) {
  const link = abracadabraAffiliateLink(destination);

  return (
    <aside className={`border-y border-border py-7 ${className}`} aria-label="Optional costume shopping resource">
      <p className="eyebrow text-primary">Optional retail resource</p>
      <h2 className="mt-2 font-display text-3xl leading-tight">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{body}</p>
      <a
        href={link.href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        data-affiliate-partner="abracadabra-nyc"
        data-affiliate-placement={placement}
        data-commercial-partner="abracadabra-nyc"
        data-commercial-placement={placement}
        onClick={() => trackAffiliateClick({
          partner: "abracadabra-nyc",
          label: link.label,
          placement,
          module: "cosplay-fandom",
        })}
        className="mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {link.label} →
      </a>
      <p className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying Abracadabra NYC purchases, at no additional cost to you.
      </p>
    </aside>
  );
}
