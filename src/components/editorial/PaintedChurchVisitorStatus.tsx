import { expandedPaintedChurchBySlug } from "@/data/painted-churches-expanded";
import { resolvePaintedChurchVisitorStatus } from "@/data/painted-church-visitor-status";

const statusLabel: Record<ReturnType<typeof resolvePaintedChurchVisitorStatus>["status"], string> = {
  "touring-guidance-available": "Current touring guidance available",
  "visitors-welcome": "Visitors welcome — verify schedule",
  "arrange-ahead": "Arrange sightseeing access ahead",
  "verify-before-travel": "Verify before travel",
};

export function PaintedChurchVisitorStatus({ slug }: { slug: string }) {
  const church = expandedPaintedChurchBySlug(slug);
  if (!church) return null;
  const status = resolvePaintedChurchVisitorStatus(slug);
  const checked = new Date(`${status.checkedAt}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;

  return (
    <section aria-labelledby="visitor-status" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Current visitor status</p>
      <h2 id="visitor-status" className="mt-3 font-display text-4xl">{statusLabel[status.status]}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{status.summary}</p>
      <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
        <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Address / map target</dt><dd className="mt-2 text-sm leading-7">{church.address ?? `${church.city}, Texas`}</dd></div>
        <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Visitor guidance checked</dt><dd className="mt-2 text-sm leading-7">{checked}</dd></div>
        <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Rule</dt><dd className="mt-2 text-sm leading-7">Services, funerals, weddings, holy days, prayer and parish events override sightseeing. Missing access details are left unknown rather than inferred.</dd></div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open exact location in Maps</a>
        {status.controllingSourceUrl ? <a href={status.controllingSourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{status.controllingSourceLabel ?? "Check current official guidance"}</a> : null}
      </div>
    </section>
  );
}
