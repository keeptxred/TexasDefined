import type { FishIdentification } from "@/data/fishing/species-identification";

export function FishIdentificationSection({ speciesName, identification }: {
  speciesName: string;
  identification: FishIdentification | null | undefined;
}) {
  if (!identification) return null;
  return (
    <section className="border-b border-border py-12" aria-labelledby="field-identification">
      <p className="eyebrow text-primary">Texas field identification</p>
      <h2 id="field-identification" className="mt-3 font-display text-4xl">How to Identify {speciesName}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        A fish's shape, fin arrangement and markings matter more than a single color.
        These are identification clues, not a substitute for checking the official species account
        when a fish is difficult to distinguish or a species-specific rule applies.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Look for these markings</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.markings}</p>
        </article>
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Compare with similar fish</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.similarSpecies}</p>
        </article>
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Size in the field guide</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.fieldSize}</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">Typical field sizes are not maximum sizes, legal limits or record claims.</p>
        </article>
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Texas waters and habitat</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.texasHabitat}</p>
        </article>
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">On-the-water approach</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.approach}</p>
        </article>
        <article className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Important distinction</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{identification.caution}</p>
        </article>
      </div>
      <p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">
        Species accounts and size descriptions are drawn from Texas Parks & Wildlife Department sources;
        fishing techniques are practical editorial interpretation, not a prediction of local conditions.
      </p>
      <a className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary"
        href={identification.sourceUrl} target="_blank" rel="noopener noreferrer">
        Official TPWD species identification and biology →
      </a>
    </section>
  );
}
