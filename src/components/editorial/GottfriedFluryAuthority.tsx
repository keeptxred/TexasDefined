import { Link } from "@tanstack/react-router";

import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

const HANDBOOK = "https://www.tshaonline.org/handbook/entries/flury-godfrey";
const PBS = "https://austinpbs.org/paintedchurches/praha";
const NATIONAL_REGISTER = "https://atlas.thc.texas.gov/NR/pdfs/83003138/83003138.pdf";
const ARCHIVE = "https://texashistory.unt.edu/ark:/67531/metapth677874/";

const chronology = [
  { year: "1864", detail: "Born July 6 in Oensingen, Switzerland. Priests in Solothurn oversaw his education." },
  { year: "1880s", detail: "Immigrated to the United States at about sixteen. When his family returned to Switzerland in 1886, he stayed and worked as a painter." },
  { year: "1891–1892", detail: "Moved to San Antonio in 1891 and Moulton the following year, taking jobs decorating houses and churches." },
  { year: "1895", detail: "Painted the interior of St. Mary's at Praha. On April 16 he married Agnes Valchar in the same church." },
  { year: "1902–1911", detail: "Returned to San Antonio in 1902. In 1911, he opened a sign-painting business at 502 Colorado Street in Austin." },
  { year: "1936", detail: "Died October 28 at his Austin home. Friends later arranged a memorial exhibition at the Elisabet Ney Museum." },
  { year: "1972", detail: "His preliminary sketches and notes were matched to the painted interior at Praha, confirming his connection to the work." },
] as const;

export function GottfriedFluryAuthority() {
  const images = paintedChurchGalleryBySlug("praha-st-marys-assumption").slice(0, 2);

  return (
    <div className="space-y-14">
      <section aria-labelledby="flury-biography" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">The artist behind Praha’s painted ceiling</p>
        <h2 id="flury-biography" className="mt-3 font-display text-3xl sm:text-4xl">Who was Gottfried (Godfrey) Flury?</h2>
        <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>At <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="border-b border-primary text-primary">St. Mary’s Church of the Assumption in Praha</Link>, blue-painted timber arches rise above flowers, gold scrollwork and columns made to look like carved stone. Much of that decoration was the work of <strong className="text-foreground">Gottfried Flury</strong>, also known as <strong className="text-foreground">Godfrey Flury</strong>, a Swiss-born painter commissioned to decorate the church in 1895. Flury (July 6, 1864 – October 28, 1936) also earned his living painting signs, courthouse ceilings and Texas landscapes.</p>
          <p>Flury was born in Oensingen, Switzerland, and educated by priests in Solothurn. At sixteen he immigrated with his family, but stayed in America when they returned home in 1886. Painting took him from New York City to Buffalo and Kansas City. He reached San Antonio in 1891 and moved to Moulton the following year, where he decorated houses and churches. The <a href={HANDBOOK} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Handbook of Texas</a> records those moves and his later work.</p>
          <p>Praha became the commission for which he is best remembered. The Czech Catholic congregation completed its Gothic Revival church in 1895, and Flury painted its tongue-and-groove ceiling sky blue. He traced false ribs across the vault to suggest stonework and added Gothic-style capitals to the columns. Flowers, vines and religious images filled the spaces between. The <a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">1983 National Register nomination</a> also records the church’s architecture and decoration.</p>
          <p>On April 16, 1895, Flury married Agnes Valchar at St. Mary’s. Other work followed, including the pressed-steel ceilings of the Lavaca County Courthouse, which have since been repainted. He returned to San Antonio in 1902, then settled in Austin in 1911 and opened a sign shop at 502 Colorado Street. In Austin he designed parade floats and painted familiar scenes such as Barton Springs, Hill Country wildflowers and local landmarks. He died at home in 1936.</p>
        </div>
      </section>

      <section aria-labelledby="flury-chronology" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Chronology</p>
        <h2 id="flury-chronology" className="mt-3 font-display text-3xl">Key dates in Flury’s life and legacy</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {chronology.map((item) => <li key={item.year} className="border-l-2 border-primary pl-5"><span className="font-semibold text-foreground">{item.year}</span><p className="mt-1 text-sm leading-7 text-muted-foreground">{item.detail}</p></li>)}
        </ol>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The records differ on his arrival in America. The Handbook of Texas says he was sixteen; the National Register gives 1881, when he would have been seventeen.</p>
      </section>

      <section aria-labelledby="flury-art" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Inside St. Mary’s</p>
        <h2 id="flury-art" className="mt-3 font-display text-3xl sm:text-4xl">What Flury painted at Praha</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <article><h3 className="font-display text-2xl">A blue ceiling and false stone ribs</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The ceiling is made of wooden planks, but its blue surface and painted ribs suggest a soaring stone vault. Flury used <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "trompe-loeil-architectural-illusion" }} className="border-b border-primary text-primary">trompe-l’oeil</Link> to give a modest material the appearance of Gothic masonry.</p></article>
          <article><h3 className="font-display text-2xl">Flowers and gilded scrolls</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Vines wind across the panels alongside flowers and curling gold ornament. Flury also painted Gothic-style capitals on the wooden columns. See how <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "freehand" }} className="border-b border-primary text-primary">freehand painting</Link> and <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: "stenciling" }} className="border-b border-primary text-primary">stenciling</Link> create different effects in a painted church.</p></article>
          <article><h3 className="font-display text-2xl">Images of faith and home</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Above the altar Flury pictured a cathedral in Prague and a nearby convent. Angels, a cross and symbols such as a chalice and a radiant eye complete the scene. The Prague buildings recall the congregation’s <Link to="/explore/painted-churches/heritage/$slug" params={{ slug: "czech-moravian" }} className="border-b border-primary text-primary">Czech roots</Link>.</p></article>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">The <a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">1983 National Register study</a> notes similar painted palm and leaf garlands at Praha and <Link to="/explore/painted-churches/$slug" params={{ slug: "moravia-ascension-of-our-lord" }} className="border-b border-primary text-primary">Ascension of Our Lord in Moravia</Link>, while identifying different painters for the two churches. The shared decorative vocabulary reflects a broader tradition; similar motifs alone are not proof that Flury painted another church.</p>
      </section>

      {images.length > 0 && <section aria-labelledby="flury-gallery" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Photographs</p>
        <h2 id="flury-gallery" className="mt-3 font-display text-3xl">The painted interior at Praha</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These photographs were taken on March 24, 2018, and show St. Mary’s after later care, repainting and additions by other artists. They do not document exactly how the interior looked when Flury completed his work.</p>
        <div className="mt-6 grid gap-7 md:grid-cols-2">
          {images.map((photo) => <figure key={photo.sourceUrl} className="min-w-0">
            <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="block overflow-hidden border border-border">
              <img src={`${photo.src}?width=960`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-80 w-full object-cover" />
            </a>
            <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">{photo.caption} <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit} · photograph and credit</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.license} license</a>.</figcaption>
          </figure>)}
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">The Portal to Texas History also holds a <a href={ARCHIVE} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">1977 photograph of the interior</a> taken for the Texas Historical Commission. We link to that archive rather than reproduce the photograph without permission.</p>
      </section>}

      <section aria-labelledby="flury-attribution" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Documented versus uncertain work</p>
        <h2 id="flury-attribution" className="mt-3 font-display text-3xl">Which works can be credited to him?</h2>
        <div className="mt-6 grid gap-7 lg:grid-cols-2">
          <div><h3 className="font-display text-2xl">Supported attributions</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">Praha, St. Mary's (1895):</strong> the principal ceiling and decorative-painting commission, named in the National Register nomination and independently documented in the Handbook of Texas.</li><li><strong className="text-foreground">Lavaca County Courthouse:</strong> a later commission for decorated pressed-metal ceilings, now repainted, documented by the Handbook.</li></ul></div>
          <div><h3 className="font-display text-2xl">Attributions requiring caution</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">St. John's near Schulenburg and the church at Cestohowa:</strong> sketches or historical attribution suggest a connection, but too little original work remains to establish secure authorship.</li><li><strong className="text-foreground">Historic homes in Flatonia:</strong> painted ceilings have been attributed to Flury; a direct, independently verified commission record is not established in the cited biography.</li></ul></div>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">What visitors see at Praha is not solely Flury’s work. Father Louis Netardus painted additional scenes after becoming pastor in 1901; later, Gene A. Mikulik restored statues and worked on the altars. <a href={PBS} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Austin PBS records their contributions</a>. Flury’s own connection to the 1895 decoration was established more firmly in 1972, when his sketches and notes were matched with the church interior.</p>
      </section>

      <section aria-labelledby="flury-sources" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Further reading</p>
        <h2 id="flury-sources" className="mt-3 font-display text-3xl">Sources for Flury’s life and paintings</h2>
        <ul className="mt-5 space-y-5 text-sm leading-7 text-muted-foreground">
          <li><a href={HANDBOOK} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Kendall Curlee, “Flury, Godfrey” — Handbook of Texas</a>. Birth and death dates, biographical chronology, commissions, and the 1972 sketch-based identification.</li>
          <li><a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Texas Historical Commission / National Register — St. Mary's Church of the Assumption (1983)</a>. Pages 21–22 document interior craftsmanship, building details, decorative methods and historical significance.</li>
          <li><a href={PBS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin PBS — Painted Churches: Praha</a>. Identifies Flury's principal contribution and distinguishes the later work of Rev. Louis Netardus and Gene Mikulik.</li>
          <li><a href={ARCHIVE} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">The Portal to Texas History — 1977 interior photograph</a>. Archival visual record; linked for study with item-level reuse restrictions.</li>
        </ul>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">Visiting Praha? The <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="border-b border-primary text-primary">St. Mary’s church guide</Link> covers the building, visitor access and nearby stops.</p>
      </section>
    </div>
  );
}
