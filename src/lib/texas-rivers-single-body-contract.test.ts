import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleRoute = readFileSync(new URL("../routes/article.$slug.tsx", import.meta.url), "utf8");
const articleBody = readFileSync(new URL("../components/editorial/ArticleBody.tsx", import.meta.url), "utf8");

describe("Texas rivers single-body article contract", () => {
  it("inserts the basin reference without splitting the article into two ArticleBody instances", () => {
    expect(articleRoute).not.toContain("riverBodyBeforeBasinReference");
    expect(articleRoute).not.toContain("riverBodyAfterBasinReference");
    expect(articleRoute).toContain("insertBeforeIndex={riverBasinInsertIndex > 0 ? riverBasinInsertIndex : undefined}");
    expect(articleRoute).toContain("insertBefore={<Suspense");
    expect(articleRoute).toContain("<TexasRiverBasinReference />");
  });

  it("keeps one ArticleBody link budget across the inserted module", () => {
    expect(articleBody).toContain("insertBeforeIndex?: number; insertBefore?: ReactNode");
    expect(articleBody).toContain("insertBeforeIndex === index && insertBefore");
    expect(articleBody).toContain("{insertBefore}{rendered}");
  });

  it("preserves the Texas rivers quick-answer card layout", () => {
    expect(articleBody).toContain('blocks[index - 1]?.text === "Texas Rivers at a Glance"');
    expect(articleBody).toContain('<dl key={index} className="my-8 grid gap-3 sm:grid-cols-2">');
  });
});
