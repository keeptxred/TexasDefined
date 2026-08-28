import { Link, useRouter } from "@tanstack/react-router";

export function NotFoundScreen() {
  return (
    <>
      <title>Page not found | Texas Defined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="bg-background px-4 py-20 sm:py-28">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20">
          <p className="eyebrow text-primary">Wrong turn</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-foreground sm:text-7xl">This road doesn&apos;t go through</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">The page may have moved, but there is plenty more Texas waiting just down the road.</p>
          <div className="mx-auto mt-10 flex max-w-lg flex-col border-t border-border sm:flex-row sm:justify-center">
            <Link to="/" className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">Start from the front page</Link>
            <Link to="/explore" className="px-6 py-4 text-sm font-semibold">Open the Texas guide →</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export function ErrorScreen({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <>
      <title>Page unavailable | Texas Defined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="bg-background px-4 py-20 sm:py-28">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20">
          <p className="eyebrow text-primary">A small detour</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-foreground sm:text-7xl">This page didn&apos;t load</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">Something went sideways on our end. Try the page once more or head back to the front page.</p>
          <div className="mx-auto mt-10 flex max-w-lg flex-col border-t border-border sm:flex-row sm:justify-center">
            <button onClick={() => { router.invalidate(); reset(); }} className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">Try once more</button>
            <a href="/" className="px-6 py-4 text-sm font-semibold">Back to the front page</a>
          </div>
        </section>
      </div>
    </>
  );
}
