import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = readFileSync(new URL("../routes/__root.tsx", import.meta.url), "utf8");
const homeRoute = readFileSync(new URL("../routes/index.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

describe("mobile Lighthouse performance contract", () => {
  it("does not block first paint on remote Google Fonts", () => {
    expect(root).not.toContain("fonts.googleapis.com");
    expect(root).not.toContain("fonts.gstatic.com");
  });

  it("renders the primary header without a lazy chunk swap", () => {
    expect(root).toContain('import { Header } from "@/components/layout/Header"');
    expect(root).not.toContain('const Header = lazy(');
    expect(root).toContain("<Header />");
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
});
