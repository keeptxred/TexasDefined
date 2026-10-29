import { useEffect, useState } from "react";
import { HUNTING_REGULATION_FRESHNESS } from "@/data/hunting/freshness";

/** One fail-closed notice shared by the hub, generic species guides and the
 * dedicated deer/turkey/youth pages. Client date is computed in Texas time to
 * avoid SSR hydration mismatch at midnight on a static edge render. */
export function HuntingRegulationArchiveNotice() {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    // Use date parts, not locale-formatted strings, to avoid date ordering assumptions.
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date());
    const read = (key: string) => parts.find((part) => part.type === key)?.value || "";
    const texasDate = read("year") + "-" + read("month") + "-" + read("day");
    setExpired(Boolean(texasDate && texasDate > HUNTING_REGULATION_FRESHNESS.validThrough));
  }, []);
  if (!expired) return null;
  return <section role="status" aria-label="Archived hunting regulation notice" className="border-b border-border bg-muted/30 py-5">
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <p className="max-w-5xl text-sm leading-7">
        <strong>This guide describes the archived {HUNTING_REGULATION_FRESHNESS.seasonYear} Texas hunting year.</strong>{" "}
        Its dates, county restrictions, permits and legal details are historical. Do not use them to determine whether a hunt is lawful today.{" "}
        <a href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Check TPWD's current Outdoor Annual ↗</a>.
      </p>
    </div>
  </section>;
}
