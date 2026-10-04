import {
  SAM_RAYBURN_HOUSE_PATH,
  SAM_RAYBURN_MUSEUM_PATH,
  SAM_RAYBURN_PROFILE_PATH,
  SAM_RAYBURN_RESERVOIR_PATH,
} from "@/data/sam-rayburn-crosslinks";

type SamRayburnContextProps = {
  surface: "reservoir" | "profile" | "house" | "museum";
};

const linkClassName = "border-b border-primary pb-1";

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
            <a href={SAM_RAYBURN_PROFILE_PATH} className={linkClassName}>Who was Sam Rayburn? →</a>
            <a href={SAM_RAYBURN_HOUSE_PATH} className={linkClassName}>Visit the Sam Rayburn House →</a>
            <a href={SAM_RAYBURN_MUSEUM_PATH} className={linkClassName}>Visit the Sam Rayburn Museum →</a>
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
            Sam Rayburn served 48 years in the U.S. House of Representatives and a total of 17 years, two months and two days as Speaker, the longest Speakership in House history. His Bonham-area home preserves the private setting behind that public career and connects his life in Fannin County with the Texas places that still carry his name.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
            <a href={SAM_RAYBURN_PROFILE_PATH} className={linkClassName}>Read the Sam Rayburn biography →</a>
            <a href={SAM_RAYBURN_MUSEUM_PATH} className={linkClassName}>Visit the Sam Rayburn Museum →</a>
            <a href={SAM_RAYBURN_RESERVOIR_PATH} className={linkClassName}>Explore Sam Rayburn Reservoir →</a>
          </div>
        </div>
      </section>
    );
  }

  if (surface === "museum") {
    return (
      <section className="border-y border-border bg-muted/25">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="eyebrow text-primary">Continue the Sam Rayburn story</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">From the museum to the places tied to his life</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            The museum preserves Rayburn's papers, books, furnishings and political memorabilia, while the nearby Sam Rayburn House preserves the Bonham-area home where he lived. Use the Texas Defined profile for the broader biography, then follow the reservoir connection to see how his name remains part of the Texas landscape.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
            <a href={SAM_RAYBURN_PROFILE_PATH} className={linkClassName}>Read the Sam Rayburn biography →</a>
            <a href={SAM_RAYBURN_HOUSE_PATH} className={linkClassName}>Visit the Sam Rayburn House →</a>
            <a href={SAM_RAYBURN_RESERVOIR_PATH} className={linkClassName}>Explore Sam Rayburn Reservoir →</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Places in the story</p>
        <h2 className="mt-2 font-display text-3xl">Visit Sam Rayburn's Texas connections</h2>
      </div>
      <div className="max-w-3xl">
        <p className="text-base leading-8 text-muted-foreground">
          Bonham preserves both Rayburn's home and the museum collection devoted to his public career. Farther south in East Texas, Sam Rayburn Reservoir carries the name Congress gave the McGee Bend project in 1963.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
          <a href={SAM_RAYBURN_HOUSE_PATH} className={linkClassName}>Visit the Sam Rayburn House →</a>
          <a href={SAM_RAYBURN_MUSEUM_PATH} className={linkClassName}>Visit the Sam Rayburn Museum →</a>
          <a href={SAM_RAYBURN_RESERVOIR_PATH} className={linkClassName}>Explore Sam Rayburn Reservoir →</a>
        </div>
      </div>
    </section>
  );
}
