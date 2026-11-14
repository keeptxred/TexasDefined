import { WACO_VIATOR_ATTRACTIONS } from "@/data/waco-viator-attraction-links";
import { WacoViatorExperienceCards } from "@/components/monetization/WacoViatorExperienceCards";

/** Related guides and separate supplier products; never claim an overview includes admission. */
export function WacoMagnoliaCrosslinks() {
  return (
    <div className="my-8">
      <nav aria-label="Seven independent Waco attraction guides" className="border-t border-border pt-6">
        <h3 className="font-display text-2xl">Explore seven Waco attractions</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          These are independent visitor guides, not admission tickets. Check the operating attraction for current hours, tours and access.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {WACO_VIATOR_ATTRACTIONS.map((attraction) => (
            <li key={attraction.slug}>
              <a href={attraction.href} className="text-sm font-semibold text-primary underline underline-offset-4">
                {attraction.name} →
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <WacoViatorExperienceCards kind="dallas" title="Compare another independently operated Dallas-to-Waco tour" />
      <nav aria-label="Related Waco tour comparison guides" className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
        <a className="text-primary underline underline-offset-4" href="/waco-attractions">Waco attractions directory →</a>
        <a className="text-primary underline underline-offset-4" href="/dallas-to-waco-magnolia-tours">Dallas departure, itinerary and exclusions →</a>
        <a className="text-primary underline underline-offset-4" href="/waco-ghost-tours">Waco guided and self-guided ghost tours →</a>
      </nav>
    </div>
  );
}
