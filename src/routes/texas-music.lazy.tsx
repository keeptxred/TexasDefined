import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Music2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { TEXAS_MUSIC_HISTORIC_PLACES } from "@/data/texas-music-historic-places";
import { TEXAS_MUSIC_TIMELINE } from "@/data/texas-music-timeline";
import {
  TEXAS_MUSIC_DESCRIPTION,
  TEXAS_MUSIC_PRIMARY_SOURCES,
  TEXAS_MUSIC_RELATED_GUIDES,
  TEXAS_MUSIC_TRADITIONS,
} from "@/data/texas-music";
import { getTexasTalentByCategory } from "@/data/texas-talent";

export const Route = createLazyFileRoute("/texas-music")({ component: TexasMusicPage });

const musicTalent = getTexasTalentByCategory("music");

function TexasMusicPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="eyebrow text-primary">Texas Music</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl">
                The roots, sounds and places that made Texas music
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {TEXAS_MUSIC_DESCRIPTION} Texas has never had one sound. Its music grew at crossroads — between the South and the West, the United States and Mexico, rural communities and fast-growing cities.
              </p>
            </div>
            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="eyebrow text-muted-foreground">Start with the big idea</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Texas music is a story of cultures meeting, borrowing, adapting and making something new.
              </p>
              <a href="#traditions" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
                Explore the traditions <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="traditions" className="scroll-mt-32 border-b border-border bg-background">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">The sound of Texas</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Eight traditions to know first</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              These traditions overlap constantly. A dance hall might hold country, conjunto and western swing in the same decade; a guitarist might carry blues phrasing into rock; a Houston artist might move between gospel, R&amp;B, rap and pop. The connections are the point.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {TEXAS_MUSIC_TRADITIONS.map((tradition, index) => (
              <article id={tradition.id} key={tradition.id} className="scroll-mt-32 bg-background p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")} · {tradition.era}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground">{tradition.label}</h3>
                  </div>
                  <Music2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                </div>
                <p className="mt-5 text-base leading-7 text-muted-foreground">{tradition.summary}</p>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex gap-2 text-sm leading-6 text-muted-foreground">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                    <span><strong className="font-semibold text-foreground">Places:</strong> {tradition.places.join(" · ")}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="font-semibold text-foreground">People to know:</strong> {tradition.representativeArtists.join(" · ")}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {tradition.guideHref ? <a href={tradition.guideHref} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Read the deep guide <ArrowRight className="size-4" aria-hidden /></a> : null}
                    <a href={tradition.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-primary">Authority source ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">A working timeline</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Rooms, scenes and turning points</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Texas music did not advance in a straight line. This timeline uses durable milestones to show how community halls, Black performance circuits, radio-era dance music, honky-tonks, counterculture rooms and regional rap systems built on one another.
            </p>
          </div>
          <ol className="mt-10 border-y border-border">
            {TEXAS_MUSIC_TIMELINE.map((entry) => (
              <li key={`${entry.year}-${entry.title}`} className="grid gap-4 border-b border-border py-6 last:border-b-0 md:grid-cols-[7rem_1fr] md:gap-8">
                <div>
                  <p className="font-display text-2xl font-semibold text-primary">{entry.year}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{entry.place}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">{entry.title}</h3>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <a href={entry.href} className="text-primary">Read the related TexasDefined guide →</a>
                    <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.12em] text-primary">{entry.sourceLabel} ↗</a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-border bg-background">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow text-primary">Historic rooms</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Places the modern venue list cannot explain by itself</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Some of the most important Texas music rooms no longer operate in their original form. Others survive because communities preserved them. Keeping those distinctions visible prevents music history from turning into a directory of places that happen to sell tickets today.
              </p>
              <a href="/texas-music-venues" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Browse the live landmark venue hub <ArrowRight className="size-4" aria-hidden /></a>
            </div>
            <div className="grid gap-px border border-border bg-border">
              {TEXAS_MUSIC_HISTORIC_PLACES.map((place) => (
                <article key={place.name} className="bg-background p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-muted-foreground">{place.place} · {place.era}</p>
                      <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground">{place.name}</h3>
                    </div>
                    <span className="border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{place.status}</span>
                  </div>
                  <p className="mt-4 text-base leading-7 text-foreground">{place.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{place.significance}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <a href={place.relatedHref} className="text-primary">{place.relatedLabel} →</a>
                    <a href={place.sourceUrl} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.12em] text-primary">{place.sourceLabel} ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow text-primary">Texas artists</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">People who carry the story</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Texas Defined is building source-reviewed profiles around artists whose Texas connection is central to their story. These names already have research records in the editorial system; profiles remain unpublished until their source, image-rights and internal-link reviews are complete.
              </p>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {musicTalent.map((artist) => (
                <div key={artist.slug} className="bg-background p-5 sm:p-6">
                  <p className="font-display text-2xl font-semibold leading-tight text-foreground">{artist.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{artist.texasConnection}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{artist.primaryPlaces.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Follow the music across Texas</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">The music belongs to places, too</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              A Texas music guide should connect recordings and biographies to the physical state: dance halls, honky-tonks, neighborhoods, border communities, small towns, festival grounds and the roads between them. These existing Texas Defined guides are the first layer of that map.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {TEXAS_MUSIC_RELATED_GUIDES.map((guide) => (
              <a key={guide.href} href={guide.href} className="group border-t border-border py-6">
                <h3 className="font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Open the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-primary">How we source this guide</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">Built from Texas music authorities</h2>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                This hub is an editorial starting point, not a claim that every Texas sound fits neatly into one box. We use institutional and scholarly sources for historical framing and keep artist profiles behind review gates until their factual and image-rights checks are complete.
              </p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {TEXAS_MUSIC_PRIMARY_SOURCES.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="group flex min-h-20 items-center justify-between gap-5 py-4">
                    <span><strong className="block text-base font-semibold text-foreground group-hover:text-primary">{source.label}</strong><span className="mt-1 block text-sm text-muted-foreground">{source.publisher}</span></span>
                    <span className="text-primary" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
