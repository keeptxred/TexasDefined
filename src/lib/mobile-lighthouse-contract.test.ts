import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = readFileSync(new URL("../routes/__root.tsx", import.meta.url), "utf8");
const homeRoute = readFileSync(new URL("../routes/index.tsx", import.meta.url), "utf8");
const homeView = readFileSync(new URL("../routes/index.lazy.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

describe("mobile Lighthouse performance contract", () => {
  it("does not block first paint on remote Google Fonts", () => {
    expect(root).not.toContain("fonts.googleapis.com");
    expect(root).not.toContain("fonts.gstatic.com");
  });

  it("keeps the primary header code split while reserving stable geometry", () => {
    expect(root).toContain('const Header = lazy(');
    expect(root).toContain('function HeaderFallback()');
    expect(root).toContain('h-[4.25rem] border-b border-border/70');
    expect(root).toContain('h-[2.75rem]');
    expect(root).toContain('h-[4.5rem] lg:hidden');
    expect(root).toContain('<Suspense fallback={<HeaderFallback />}><Header /></Suspense>');
  });

  it("preloads the homepage hero image used for LCP", () => {
    expect(homeRoute).toContain('rel: "preload"');
    expect(homeRoute).toContain('as: "image"');
    expect(homeRoute).toContain('fetchPriority: "high"');
  });

  it("uses stable local font stacks and stronger muted text contrast", () => {
    expect(styles).toContain('--font-family-display: "Iowan Old Style"');
    expect(styles).toContain('--font-family-sans: "Segoe UI"');
    expect(styles).toContain("--muted-foreground: oklch(0.43 0.026 58)");
  });

  it("does not skip from the homepage h1 directly to FAQ h3 headings", () => {
    expect(homeView).toContain('<dt><h2 className="font-display text-lg font-semibold">');
    expect(homeView).not.toContain('<dt><h3 className="font-display text-lg font-semibold">');
  });
});
