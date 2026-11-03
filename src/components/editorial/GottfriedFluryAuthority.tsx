import { Link } from "@tanstack/react-router";

import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

const HANDBOOK = "https://www.tshaonline.org/handbook/entries/flury-godfrey";
const PBS = "https://austinpbs.org/paintedchurches/praha";
const NATIONAL_REGISTER = "https://atlas.thc.texas.gov/NR/pdfs/83003138/83003138.pdf";
const ARCHIVE = "https://texashistory.unt.edu/ark:/67531/metapth677874/";

const chronology = [
  { year: "1864", detail: "Born July 6 in Oensingen, Switzerland; educated in Solothurn." },
  { year: "1880s", detail: "Immigrated to the United States and worked as a decorative painter in New York and the Midwest. Sources differ on the exact immigration year." },
  { year: "1891–1892", detail: "Relocated to San Antonio, then Moulton, where he undertook residential and church decorating." },
  { year: "1895", detail: "Commissioned to decorate the newly completed St. Mary's Church of the Assumption at Praha." },
  { year: "1902–1911", detail: "Returned to San Antonio as a commercial artist, then established a sign-painting business in Austin." },
  { year: "1936", detail: "Died October 28 in Austin; friends subsequently organized an exhibition at the Elisabet Ney Museum." },
  { year: "1972", detail: "Preparatory sketches and notes were used to authenticate the attribution of the Praha interior to Flury." },
] as const;

export function GottfriedFluryAuthority() {
  const images = paintedChurchGalleryBySlug("praha-st-marys-assumption").slice(0, 2);

  return (
    <div className="space-y-14">
      <section aria-labelledby="flury-biography" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Documented biography</p>
        <h2 id="flury-biography" className="mt-3 font-display text-3xl sm:text-4xl">Who was Gottfried (Godfrey) Flury?</h2>
        <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Gottfried Flury (July 6, 1864 – October 28, 1936), also known professionally as <strong className="text-foreground">Godfrey Flury</strong>, was a Swiss-born decorative painter who became an important contributor to Texas church art. His best-documented surviving interior is the 1895 painting campaign at <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="border-b border-primary text-primary">St. Mary's Church of the Assumption in Praha</Link>, Fayette County. His biography extends beyond church painting to commercial signs, civic displays, and landscape art.</p>
          <p>Born in Oensingen and educated in Solothurn, Switzerland, Flury later worked as a painter and decorator in the United States. His early American career included work in New York and the Midwest; the National Register nomination specifically records theatrical scenery painting in New York. He arrived in San Antonio in 1891, moved to Moulton the following year, and took commissions for interior and exterior decoration. The <a href={HANDBOOK} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Handbook of Texas biography</a> provides the principal life chronology.</p>
          <p>Praha gave Flury an exceptionally prominent artistic setting: a substantial new Gothic Revival church built for a Czech Catholic congregation. His painted treatment helped give wooden construction the visual richness of vaulted stone architecture while filling the sanctuary with stylized nature and religious imagery. These details are described in both the <a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">1983 National Register nomination</a> and the Handbook of Texas.</p>
          <p>Flury later painted the pressed-metal ceilings of the Lavaca County Courthouse, though those surfaces have since been repainted. After moving to San Antonio in 1902 and Austin in 1911, his work shifted toward commercial painting and public displays. He continued to paint Texas landscapes and landmarks in later life. His importance is not that he personally produced every visible painting at Praha, but that documentary evidence connects him to the central decorative campaign.</p>
        </div>
      </section>

      <section aria-labelledby="flury-chronology" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Chronology</p>
        <h2 id="flury-chronology" className="mt-3 font-display text-3xl">Flury's life and the evidence trail</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {chronology.map((item) => <li key={item.year} className="border-l-2 border-primary pl-5"><span className="font-semibold text-foreground">{item.year}</span><p className="mt-1 text-sm leading-7 text-muted-foreground">{item.detail}</p></li>)}
        </ol>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The Handbook of Texas places his immigration at about age sixteen; the National Register describes an 1881 arrival at age seventeen. The chronology intentionally does not present one of these as an uncontested exact date.</p>
      </section>

      <section aria-labelledby="flury-art" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Artistic interpretation</p>
        <h2 id="flury-art" className="mt-3 font-display text-3xl sm:text-4xl">What his work at Praha looks like</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <article><h3 className="font-display text-2xl">A sky instead of plain timber</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The church's wooden ceiling was painted blue, with simulated ribs that make the vault appear more elaborate than its structural framing. The effect is a form of <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "trompe-loeil-architectural-illusion" }} className="border-b border-primary text-primary">trompe-l'oeil architectural illusion</Link>.</p></article>
          <article><h3 className="font-display text-2xl">Botanical ornament</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Vines, leaves, flowers, color fields and curving ornament soften the geometry of the building. The National Register describes individually varied plant forms and a palette rich in greens and blues. The interior as a whole combines <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "freehand" }} className="border-b border-primary text-primary">freehand</Link> and <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "stenciling" }} className="border-b border-primary text-primary">stenciled work</Link>.</p></article>
          <article><h3 className="font-display text-2xl">Faith and cultural memory</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Decorative motifs include religious emblems and celestial effects. The upper sanctuary also includes painted church buildings associated with Prague, linking the program to the congregation's <Link to="/explore/painted-churches/heritage/$slug" params={{ slug: "czech-moravian" }} className="border-b border-primary text-primary">Czech heritage</Link>. Not every surviving feature can be individually credited to Flury.</p></article>
        </div>
      </section>

      {images.length > 0 && <section aria-labelledby="flury-gallery" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Verified location photography</p>
        <h2 id="flury-gallery" className="mt-3 font-display text-3xl">The painted interior at Praha</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These photographs document the church interior, not a portrait of Flury or an untouched record of every surface as painted in 1895. Later parish artists and restorers also contributed to what visitors see today.</p>
        <div className="mt-6 grid gap-7 md:grid-cols-2">
          {images.map((photo) => <figure key={photo.sourceUrl} className="min-w-0">
            <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="block overflow-hidden border border-border">
              <img src={`${photo.src}?width=960`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-80 w-full object-cover" />
            </a>
            <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">{photo.caption} <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit} · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">{photo.license} license</a> · source and attribution</a>.</figcaption>
          </figure>)}
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">For a dated historical comparison, see the <a href={ARCHIVE} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">1977 Texas Historical Commission interior photograph</a> held by the Portal to Texas History. Its separate permissions terms apply; that archival image is linked rather than republished here.</p>
      </section>}

      <section aria-labelledby="flury-attribution" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Documented versus uncertain work</p>
        <h2 id="flury-attribution" className="mt-3 font-display text-3xl">Which works can be credited to him?</h2>
        <div className="mt-6 grid gap-7 lg:grid-cols-2">
          <div><h3 className="font-display text-2xl">Supported attributions</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">Praha, St. Mary's (1895):</strong> the principal ceiling and decorative-painting commission, named in the National Register nomination and independently documented in the Handbook of Texas.</li><li><strong className="text-foreground">Lavaca County Courthouse:</strong> a later commission for decorated pressed-metal ceilings, now repainted, documented by the Handbook.</li></ul></div>
          <div><h3 className="font-display text-2xl">Attributions requiring caution</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">St. John's near Schulenburg and the church at Cestohowa:</strong> sketches or historical attribution suggest a connection, but too little original work remains to establish secure authorship.</li><li><strong className="text-foreground">Historic homes in Flatonia:</strong> painted ceilings have been attributed to Flury; a direct, independently verified commission record is not established in the cited biography.</li></ul></div>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The distinction matters because the interior at Praha was subsequently enriched by Rev. Louis Netardus and cared for and embellished by Gene A. Mikulik. <a href={PBS} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Austin PBS identifies all three contributors</a>. The attribution of the original Flury campaign was further supported in 1972 by preparatory sketches and notes that matched the church's interior.</p>
      </section>

      <section aria-labelledby="flury-sources" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Research sources</p>
        <h2 id="flury-sources" className="mt-3 font-display text-3xl">Read the underlying records</h2>
        <ul className="mt-5 space-y-5 text-sm leading-7 text-muted-foreground">
          <li><a href={HANDBOOK} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Kendall Curlee, “Flury, Godfrey” — Handbook of Texas</a>. Birth and death dates, biographical chronology, commissions, and the 1972 sketch-based identification.</li>
          <li><a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Texas Historical Commission / National Register — St. Mary's Church of the Assumption (1983)</a>. Pages 21–22 document interior craftsmanship, building details, decorative methods and historical significance.</li>
          <li><a href={PBS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin PBS — Painted Churches: Praha</a>. Identifies Flury's principal contribution and distinguishes the later work of Rev. Louis Netardus and Gene Mikulik.</li>
          <li><a href={ARCHIVE} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">The Portal to Texas History — 1977 interior photograph</a>. Archival visual record; linked for study with item-level reuse restrictions.</li>
        </ul>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">To plan a visit, use the <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="border-b border-primary text-primary">Praha church authority profile</Link> for architecture, updated access guidance, visitor sources and routes; this biography concentrates on the painter and evidence for his work.</p>
      </section>
    </div>
  );
}
