type SamRayburnContextProps = {
  surface: "reservoir" | "profile" | "house";
};

export function SamRayburnContext({ surface }: SamRayburnContextProps) {
  if (surface === "reservoir") {
    return (
      <section className="border-t border-border bg-muted/25">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="eyebrow text-primary">Why it is called Sam Rayburn Reservoir</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Named for Speaker Sam Rayburn</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            This reservoir impounds the Angelina River. The project was originally known as McGee Bend Dam and Reservoir; Congress renamed it Sam Rayburn Dam and Reservoir in 1963 in honor of longtime U.S. House Speaker Sam Rayburn, a prominent advocate of soil and water conservation.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
            <a href="/texas-icons/sam-rayburn" className="border-b border-primary pb-1">Who was Sam Rayburn? →</a>
            <a href="/destination/sam-rayburn-house" className="border-b border-primary pb-1">Visit the Sam Rayburn House →</a>
          </div>
        </div>
      </section>
    );
  }

  if (surface === "house") {
    return (
      <section className="border-y border-border bg-muted/25">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="eyebrow text-primary">The person behind the place</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Who was Sam Rayburn?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Sam Rayburn represented North Texas in the U.S. House of Representatives for nearly 49 years and served as Speaker for more than 17 years across three periods. His Bonham-area home preserves the private setting behind that public career and helps connect his life in Fannin County with the national institutions and Texas landscapes that still carry his name.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
            <a href="/texas-icons/sam-rayburn" className="border-b border-primary pb-1">Read the Sam Rayburn biography →</a>
            <a href="/fishing/lakes/sam-rayburn-reservoir" className="border-b border-primary pb-1">Explore Sam Rayburn Reservoir →</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Namesake</p>
        <h2 className="mt-2 font-display text-3xl">The reservoir named for Rayburn</h2>
      </div>
      <div className="max-w-3xl">
        <p className="text-base leading-8 text-muted-foreground">
          Sam Rayburn Reservoir is an impoundment of the Angelina River in East Texas. Originally authorized as McGee Bend Dam and Reservoir, the project was renamed by Congress in 1963 for Rayburn, who had died in 1961 and had long supported soil and water conservation.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
          <a href="/fishing/lakes/sam-rayburn-reservoir" className="border-b border-primary pb-1">Explore Sam Rayburn Reservoir →</a>
          <a href="/destination/sam-rayburn-house" className="border-b border-primary pb-1">Visit the Sam Rayburn House →</a>
        </div>
      </div>
    </section>
  );
}
