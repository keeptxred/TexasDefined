import { Link } from "@tanstack/react-router";

import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

const HANDBOOK = "https://www.tshaonline.org/handbook/entries/flury-godfrey";
const PBS = "https://austinpbs.org/paintedchurches/praha";
const NATIONAL_REGISTER = "https://atlas.thc.texas.gov/NR/pdfs/83003138/83003138.pdf";
const ARCHIVE = "https://texashistory.unt.edu/ark:/67531/metapth677874/";
const THC_ATLAS = "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138";
const NPS_REGISTER = "https://npgallery.nps.gov/AssetDetail/NRIS/83003138";
const THC_THEMATIC = "https://atlas.thc.texas.gov/NR/pdfs/64000835/64000835.pdf";
const PALM_STUDY = "https://w3.biosci.utexas.edu/prc/Sabal/Praha-hist.html";
const HIGH_HILL_PBS = "https://austinpbs.org/paintedchurches/highhill";
const MORAVIA_PBS = "https://austinpbs.org/paintedchurches/filmupdates";
// Finding aids and catalog records are research leads, not evidence that we examined archival materials.
const BRISCOE_FINDING_AID = "https://txarchives.org/utcah/finding_aids/00092.xml";
const SMITHSONIAN_ARTIST_FILE = "https://sova.si.edu/record/aaa.braddewe/ref14?i=150919&n=10&q=Paper&s=150910&t=A";
const AUSTIN_ARCHIVE_GUIDE = "https://library.austintexas.gov/library/2022-04/Art-Resources-Guide.pdf";

const chronology = [
  { year: "1864", detail: "Born July 6 in Oensingen, Switzerland. Priests in Solothurn oversaw his education." },
  { year: "1880s", detail: "Immigrated to the United States at about sixteen. When his family returned to Switzerland in 1886, he stayed and worked as a painter." },
  { year: "1891–1892", detail: "Moved to San Antonio in 1891 and Moulton the following year, taking jobs decorating houses and churches." },
  { year: "1895", detail: "Painted the interior of St. Mary's at Praha. On April 16 he married Agnes Valchar in the same church." },
  { year: "1902–1911", detail: "Returned to San Antonio in 1902. In 1911, he opened a sign-painting business at 502 Colorado Street in Austin." },
  { year: "1918", detail: "Became a naturalized United States citizen, after decades working as a painter in the country." },
  { year: "1929–1934", detail: "Sold his advertising company in 1929. In 1934 he enrolled as a freshman at the University of Texas to study mechanical engineering." },
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
          <p>On April 16, 1895, Flury married Agnes Valchar at St. Mary’s; the <a href={HANDBOOK} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Handbook of Texas</a> identifies this as his second marriage. Other work followed, including the pressed-steel ceilings of the Lavaca County Courthouse, which have since been repainted. He returned to San Antonio in 1902, then settled in Austin in 1911 and opened a sign shop at 502 Colorado Street.</p>
          <p>His Austin career took him beyond churches. He designed parade floats, worked in advertising and painted scenes of Barton Springs, Hill Country wildflowers and local landmarks. He became a naturalized United States citizen in 1918 and sold his advertising company in 1929. In 1934 he entered the University of Texas as a freshman to study mechanical engineering. He died at home in 1936. Those later chapters help explain why records of Flury’s work extend far beyond the painted churches.</p>
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


      <section aria-labelledby="flury-leaf-study" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">An overlooked detail in the ceiling</p>
        <h2 id="flury-leaf-study" className="mt-3 font-display text-3xl sm:text-4xl">Did Praha’s palm trees find their way into Flury’s paintings?</h2>
        <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
          <p>
            Among the leaves painted across the ceiling, some spread out like open fans instead of
            the long, feather-shaped fronds often seen in church decoration. Bob Harms, writing in
            a <a href={PALM_STUDY} target="_blank" rel="noreferrer" className="underline underline-offset-2">University of Texas at Austin study of Praha’s palmettos</a>,
            identified these as resembling the fan-shaped leaves of <em>Sabal</em> palms.
            That is a more specific observation than simply calling the ceiling’s plants “floral ornament.”
          </p>
          <p>
            Harms also recorded 2004 interviews about palms once growing near the church rectory.
            He suggested that Flury may have used local palms as models. The timing of those trees’
            planting is not established, however, and there is no surviving commission note tying
            a particular tree to a particular painted leaf. The botanical resemblance is observable;
            the proposed local inspiration remains a hypothesis.
          </p>
        </div>
      </section>

      <section aria-labelledby="flury-comparisons" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Compare the artists, not just the colors</p>
        <h2 id="flury-comparisons" className="mt-3 font-display text-3xl sm:text-4xl">Praha, High Hill and Moravia: three different painting campaigns</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
          All three churches use painted decoration to transform plain building materials,
          but their dated commissions show why repeated vines, false stonework or religious
          motifs do not establish a single artist. The differences are easier to see when
          the painter, date and technique are kept together.
        </p>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <article className="border border-border p-5">
            <h3 className="font-display text-2xl">Praha · 1895</h3>
            <p className="mt-1 text-sm font-semibold text-foreground">Gottfried Flury</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              He painted a blue wooden ceiling, false vault ribs and botanical designs.
              The decorative work uses the architecture itself as its canvas.
            </p>
            <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2">Examine the Praha church</Link>
          </article>
          <article className="border border-border p-5">
            <h3 className="font-display text-2xl">High Hill · 1912</h3>
            <p className="mt-1 text-sm font-semibold text-foreground">Ferdinand Stockert and Hermann Kern</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Their scheme also creates Gothic illusion, but parish accounts
              describe images painted on canvas and pasted onto wooden walls.
              <a href={HIGH_HILL_PBS} target="_blank" rel="noreferrer" className="ml-1 underline underline-offset-2">Austin PBS documents the method.</a>
            </p>
            <Link to="/explore/painted-churches/$slug" params={{ slug: "high-hill-nativity-of-mary" }} className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2">Examine the High Hill church</Link>
          </article>
          <article className="border border-border p-5">
            <h3 className="font-display text-2xl">Moravia · 1923</h3>
            <p className="mt-1 text-sm font-semibold text-foreground">Fred Donecker and his sons</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Their later painted interior uses ornament and a ceiling medallion
              that suggests modeled plaster. Unlike Praha, the
              <a href={MORAVIA_PBS} target="_blank" rel="noreferrer" className="ml-1 underline underline-offset-2">documented commission</a> belongs to the Donecker family.
            </p>
            <Link to="/explore/painted-churches/$slug" params={{ slug: "moravia-ascension-of-our-lord" }} className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2">Examine the Moravia church</Link>
          </article>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
          The <a href={THC_THEMATIC} target="_blank" rel="noreferrer" className="underline underline-offset-2">1983 National Register thematic study</a> separately notes botanical similarities
          between Praha and Moravia and painted vault illusions at both Praha and High Hill.
          Similar methods are useful for comparing these buildings; documentary records are
          needed before giving any painter credit for work elsewhere.
        </p>
      </section>


      <section aria-labelledby="flury-layers" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Who painted what — and when</p>
        <h2 id="flury-layers" className="mt-3 font-display text-3xl sm:text-4xl">A church made by more than one pair of hands</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
          Look up at Praha’s blue ceiling, then toward the altars and statues: the decorations share a room,
          but not all of them were made in the same decade. The records distinguish Flury’s original ceiling
          from later paintings and restoration.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <article className="border border-border p-5">
            <p className="text-sm font-semibold text-primary">1895 · Gottfried Flury</p>
            <h3 className="mt-2 font-display text-xl">The painted vault</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Flury’s documented commission includes the sky-blue plank ceiling, simulated stone ribs,
              floral panels and painted column capitals. Both the Handbook of Texas and the National
              Register nomination connect him to this early work.
            </p>
          </article>
          <article className="border border-border p-5">
            <p className="text-sm font-semibold text-primary">After 1901 · Father Louis Netardus</p>
            <h3 className="mt-2 font-display text-xl">New religious paintings</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Netardus became pastor in 1901 and added paintings of his own. Austin PBS describes an
              archival photograph of him holding a brush beside his depiction of Saints Cyril and Methodius.
              It is evidence for his work, not for Flury’s.
            </p>
          </article>
          <article className="border border-border p-5">
            <p className="text-sm font-semibold text-primary">Later 20th century · Gene A. Mikulik</p>
            <h3 className="mt-2 font-display text-xl">Restoration and new devotional art</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Mikulik restored statues, painted and gilded altars, and made <em>Our Lady of Victory</em>,
              commemorating parish soldiers who died in World War II. These additions belong to the
              church’s later history, not its 1895 painted-ceiling commission.
            </p>
          </article>
          <article className="border border-border p-5">
            <p className="text-sm font-semibold text-primary">1972 and 1983 · Documentary record</p>
            <h3 className="mt-2 font-display text-xl">How the attribution was established</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              In 1972 researchers matched Flury’s sketches and notes with the church interior. The
              church was listed on the National Register on June 21, 1983, for its art, architecture and
              religious history. The listing recognizes the building; it does not make Flury the author
              of every piece visible inside.
            </p>
          </article>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Sources: <a href={HANDBOOK} target="_blank" rel="noreferrer" className="underline underline-offset-2">Handbook of Texas</a>,
          {" "}<a href={PBS} target="_blank" rel="noreferrer" className="underline underline-offset-2">Austin PBS’s Praha history</a>,
          {" "}and the <a href={THC_ATLAS} target="_blank" rel="noreferrer" className="underline underline-offset-2">Texas Historical Commission listing</a>.
        </p>
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
          <li>
            <a href={THC_ATLAS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Texas Historical Commission — St. Mary’s at Praha, National Register record 83003138</a>.
            The official property listing gives the June 21, 1983 designation date, architect O. Kramer, Gothic Revival classification and significance in art, architecture and religion.
            {" "}The <a href={NATIONAL_REGISTER} target="_blank" rel="noreferrer" className="underline underline-offset-2">1983 nomination PDF</a> provides a more detailed account of the interior; if the PDF is unavailable, use the record page and open its Files tab.
          </li>
          <li><a href={PBS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin PBS — Painted Churches: Praha</a>. Identifies Flury's principal contribution and distinguishes the later work of Rev. Louis Netardus and Gene Mikulik.</li>
          <li><a href={NPS_REGISTER} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">National Park Service — official National Register record 83003138</a>. A second official catalog route to St. Mary’s 1983 designation and its nomination materials.</li>
          <li><a href={THC_THEMATIC} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Texas Historical Commission — 1983 statewide decorative-interior thematic nomination</a>. Describes the five painting techniques used in the nominated churches, the repeated palm and leaf forms at Praha and Moravia, and the painted vault illusions at Praha and High Hill; accessible separately from the individual Praha record.</li>
          <li><a href={PALM_STUDY} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Bob Harms, University of Texas at Austin — Recent History of the Praha Palmettos</a>. Observes fan-shaped palm motifs on Flury’s ceiling and records a possible local botanical influence. The identification is a visual interpretation, not documented proof of the original model.</li>
          <li><a href={HIGH_HILL_PBS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin PBS — High Hill</a>. Dated 1912 Stockert and Kern interior, including accounts of canvas-applied painting.</li>
          <li><a href={MORAVIA_PBS} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin PBS — Moravia research update</a>. Identifies the 1923 Donecker-family work and distinguishes its later painting campaign from Praha’s.</li>
          <li><a href={ARCHIVE} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">The Portal to Texas History — 1977 interior photograph</a>. Archival visual record; linked for study with item-level reuse restrictions.</li>
          <li><a href={BRISCOE_FINDING_AID} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Dolph Briscoe Center for American History — Godfrey Flury Collection, 1887–1981</a>. The University of Texas at Austin indexes this manuscript collection; the finding aid is a starting point for arranging archival research, not proof that we inspected its contents.</li>
          <li><a href={SMITHSONIAN_ARTIST_FILE} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Smithsonian Archives of American Art — Godfrey Flury artist file</a>. The Dewey C. Bradford papers catalog lists a Flury file on microfilm reel 2335, frames 757–764. The catalog’s reuse conditions apply to any underlying archival images.</li>
          <li><a href={AUSTIN_ARCHIVE_GUIDE} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin History Center — Godfrey Flury Scrapbook (library arts inventory, PDF)</a>. The city library indexes a scrapbook of clippings about Flury’s career. This is a collection description, not a review of the scrapbook itself.</li>
        </ul>

        <div className="mt-8 max-w-4xl border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">Research and responsibility:</strong> Texas Defined History &amp; Heritage Desk.
            Published-source and archival-catalog cross-check completed November 10, 2026, against the Handbook of Texas, Austin PBS,
            the Texas Historical Commission’s National Register record and the three catalog listings above. This is documentary research;
            we have not inspected the original Flury papers, sketches or the sanctuary in person. A botanical and inter-church source cross-check completed November 11, 2026 covered the Texas Historical Commission thematic nomination, Austin PBS church histories and Bob Harms’s University of Texas palm study.</p>
          <p className="mt-2">
            <Link to="/about" className="underline underline-offset-2">About Texas Defined</Link>
            {" · "}<Link to="/editorial-policy" className="underline underline-offset-2">Editorial Policy</Link>
            {" · "}<Link to="/corrections-policy" className="underline underline-offset-2">Request a correction</Link>
          </p>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">Visiting Praha? The <Link to="/explore/painted-churches/$slug" params={{ slug: "praha-st-marys-assumption" }} className="border-b border-primary text-primary">St. Mary’s church guide</Link> covers the building, visitor access and nearby stops.</p>
      </section>
    </div>
  );
}
