import type { CountyProfile } from '@/data/county-profile';

export function CountyIdentitySection({ countyName, region, profile }: { countyName: string; region?: string; profile: CountyProfile }) {
  const population = profile.population2020;
  const landArea = profile.landAreaSquareMiles;
  const density = profile.populationDensityPerSquareMile;
  const waterShare = profile.waterSharePercent;
  const seatName = profile.countySeatPlace?.name;
  const otherCommunities = profile.majorCommunities.filter((community) => community !== seatName);
  const hasIdentitySignal = density != null || waterShare != null || region || seatName || otherCommunities.length > 0;

  if (!hasIdentitySignal) return null;

  return (
    <section className="border-b border-border py-12" aria-labelledby="county-identity-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Verified county profile</p>
          <h2 id="county-identity-heading" className="mt-2 font-display text-4xl">What the data says about {countyName}</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {population != null && landArea != null && density != null ? (
            <p>
              The 2020 Census counted <strong className="text-foreground">{population.toLocaleString('en-US')}</strong> residents across about <strong className="text-foreground">{Math.round(landArea).toLocaleString('en-US')} square miles</strong> of land. Dividing those two Census figures gives roughly <strong className="text-foreground">{formatDensity(density)} residents per square mile</strong>.
            </p>
          ) : null}

          {waterShare != null && profile.waterAreaSquareMiles != null ? (
            <p>
              Census geography also records about {Math.round(profile.waterAreaSquareMiles).toLocaleString('en-US')} square miles of water. Water represents approximately {waterShare.toFixed(1)}% of the county's mapped land-and-water area.
            </p>
          ) : null}

          {seatName ? (
            <p>
              <strong className="text-foreground">{seatName}</strong> is the verified county seat{region ? `, and Texas Defined groups the county within ${title(region)} for regional browsing` : ''}.
            </p>
          ) : region ? (
            <p>Texas Defined groups this county within {title(region)} for regional browsing.</p>
          ) : null}

          {otherCommunities.length > 0 ? (
            <p>
              Beyond the county seat, the current structured place directory links this county to {formatList(otherCommunities.slice(0, 5))}{otherCommunities.length > 5 ? ', among additional listed communities' : ''}. This is a directory relationship, not a claim that the list contains every incorporated place or settlement in the county.
            </p>
          ) : (
            <p>Texas Defined does not add an unsourced list of local communities. Additional places appear here only when the structured place directory contains a verified county relationship.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function formatDensity(value: number) {
  if (value >= 100) return Math.round(value).toLocaleString('en-US');
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

function formatList(values: string[]) {
  if (values.length <= 1) return values[0] ?? '';
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
