import { Container } from "@/components/layout/Container";

const TRIBUTE_EXPIRES_AT = Date.parse("2026-09-04T20:28:00Z");

const lifeChapters = [
  {
    year: "1946",
    title: "A Smoky Mountain beginning",
    copy: "Dolly Rebecca Parton was born January 19 in Sevier County, Tennessee, the fourth of 12 children. She grew up near Locust Ridge in the Great Smoky Mountains, where family, faith and mountain life became lasting themes in her writing.",
  },
  {
    year: "1950s–60s",
    title: "From local radio to Nashville",
    copy: "She sang in church, appeared on local radio and television, and headed to Nashville while still young. Songwriting opened doors first; national attention followed when she joined Porter Wagoner’s television show and road act.",
  },
  {
    year: "1970s",
    title: "Songs that became part of American life",
    copy: "As a solo artist she turned sharply observed stories into standards, including “Coat of Many Colors,” “Jolene” and “I Will Always Love You.” Her voice was unmistakable, but the empathy inside the songs mattered just as much.",
  },
  {
    year: "1980s–90s",
    title: "Music, movies and a bigger stage",
    copy: "“9 to 5” carried her into a new level of crossover fame, while film roles, touring and business ventures broadened her reach. Dollywood became both a major destination and a lasting investment in the East Tennessee community that shaped her.",
  },
  {
    year: "1995 onward",
    title: "A legacy measured in books, too",
    copy: "She launched Dolly Parton’s Imagination Library in Sevier County, inspired in part by her father’s inability to read and write. The program grew far beyond Tennessee and has mailed hundreds of millions of free books to young children.",
  },
  {
    year: "2026",
    title: "The songs remain",
    copy: "Dolly Parton died August 25 in Nashville at age 80. She leaves a catalog that crossed country, pop, gospel, film and generations — and a model of generosity that reached far beyond music.",
  },
] as const;

const sources = [
  { label: "Dolly Parton official biography", href: "https://dollyparton.com/about-dolly-parton" },
  { label: "Imagination Library", href: "https://imaginationlibrary.com/" },
  { label: "Associated Press", href: "https://apnews.com/article/87156f3e6a1547b88bf414529b644ad3" },
  { label: "Reuters", href: "https://www.reuters.com/lifestyle/dolly-parton-has-died-family-says-2026-08-25/" },
] as const;

export function DollyPartonTribute() {
  if (Date.now() >= TRIBUTE_EXPIRES_AT) return null;

  return (
    <section aria-labelledby="dolly-parton-tribute-title" className="border-b border-background/20 bg-foreground py-12 text-background sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="eyebrow text-background/70">In memoriam · 1946–2026</p>
            <h2 id="dolly-parton-tribute-title" className="mt-4 font-display text-5xl leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              Dolly Parton, a voice that made America feel closer
            </h2>
            <p className="mt-7 text-xl leading-8 text-background/90 sm:text-2xl sm:leading-9">
              Texas sits a long way from the Smokies, but Dolly Parton’s songs never felt far away. She wrote about work, home, heartache, dignity, family and the courage to begin again — subjects that cross state lines easily.
            </p>
            <p className="mt-6 text-base leading-7 text-background/75 sm:text-lg sm:leading-8">
              She made ambition look joyful, success look generous and kindness feel like a strength. Her legacy lives in songs people still know by heart, stories that gave working people a voice, and children who opened a book because she decided they should have one.
            </p>
            <p className="mt-6 text-base leading-7 text-background/75 sm:text-lg sm:leading-8">
              From a porch in Locust Ridge to stages around the world, Dolly kept the mountains with her. For ten days, Texas Defined is setting aside the top of our homepage to say thank you: for the songs, the laughter, the grit, the generosity, and the reminder that a person can become larger than life without outgrowing where they came from.
            </p>
            <a
              href="https://imaginationlibrary.com/"
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-8 inline-block border-b-2 border-background pb-1 text-background transition-opacity hover:opacity-75"
            >
              Carry the kindness forward through the Imagination Library →
            </a>
          </div>

          <figure>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Dolly_Parton_at_%27Blue_Smoke_World_Tour%27_in_Knoxville.jpg/960px-Dolly_Parton_at_%27Blue_Smoke_World_Tour%27_in_Knoxville.jpg"
              alt="Dolly Parton performing on the Blue Smoke World Tour in Knoxville in 2014"
              width={960}
              height={1280}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption className="mt-3 text-xs leading-5 text-background/60">
              Dolly Parton in Knoxville, 2014. Photo: Kristopher Harris / Wikimedia Commons, {" "}
              <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer" className="underline underline-offset-2">CC BY 2.0</a>. Display crop. {" "}
              <a href="https://commons.wikimedia.org/wiki/File:Dolly_Parton_at_%27Blue_Smoke_World_Tour%27_in_Knoxville.jpg" target="_blank" rel="noreferrer" className="underline underline-offset-2">Source</a>
            </figcaption>
          </figure>
        </div>

        <div className="mt-14 border-t border-background/20 pt-10 sm:mt-16 sm:pt-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <p className="eyebrow text-background/60">Her life in chapters</p>
              <ol className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {lifeChapters.map((chapter) => (
                  <li key={chapter.year} className="border-t border-background/20 pt-5">
                    <p className="eyebrow text-background/60">{chapter.year}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight">{chapter.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-background/70">{chapter.copy}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
              <figure>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Young-Dolly-Parton.jpg"
                  alt="Dolly Parton in a 1977 RCA Records publicity portrait"
                  width={765}
                  height={941}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <figcaption className="mt-3 text-xs leading-5 text-background/60">
                  RCA Records publicity portrait, 1977. Public domain in the United States via Wikimedia Commons. {" "}
                  <a href="https://commons.wikimedia.org/wiki/File:Young-Dolly-Parton.jpg" target="_blank" rel="noreferrer" className="underline underline-offset-2">Source</a>
                </figcaption>
              </figure>

              <figure>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Dolly_Parton_in_Nashville_cropped.jpg"
                  alt="Dolly Parton at the Grand Ole Opry in Nashville in 2005"
                  width={530}
                  height={707}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <figcaption className="mt-3 text-xs leading-5 text-background/60">
                  Grand Ole Opry, 2005. U.S. Air Force photo by Tech. Sgt. Cherie A. Thurlby. Public domain. {" "}
                  <a href="https://commons.wikimedia.org/wiki/File:Dolly_Parton_in_Nashville_cropped.jpg" target="_blank" rel="noreferrer" className="underline underline-offset-2">Source</a>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-background/20 pt-7 text-xs leading-5 text-background/60 sm:grid-cols-[1fr_auto] sm:items-end">
          <p>
            Life-history sources: {sources.map((source, index) => (
              <span key={source.href}>
                {index > 0 ? " · " : ""}
                <a href={source.href} target="_blank" rel="noreferrer" className="underline underline-offset-2">{source.label}</a>
              </span>
            ))}
          </p>
          <p>Homepage memorial scheduled to conclude September 4, 2026.</p>
        </div>
      </Container>
    </section>
  );
}
