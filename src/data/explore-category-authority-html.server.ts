import type { CategorySlug } from "@/data/types";
import { getExploreCategoryAuthorityServer } from "./explore-category-authority.server";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeInternalHref(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? escapeHtml(value) : "#";
}

function safeOfficialUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? escapeHtml(url.toString()) : "#";
  } catch {
    return "#";
  }
}

export function renderExploreCategoryAuthorityHtml(category: CategorySlug): string | null {
  const guide = getExploreCategoryAuthorityServer(category);
  if (!guide) return null;

  const sections = guide.sections.map((section) => {
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const bullets = section.bullets?.length
      ? `<ul class="mt-5 space-y-2 pl-5 text-[1rem] leading-7 text-foreground/85">${section.bullets.map((bullet) => `<li class="list-disc pl-1">${escapeHtml(bullet)}</li>`).join("")}</ul>`
      : "";
    return `<section class="max-w-3xl"><h3 class="font-display text-2xl leading-tight sm:text-3xl">${escapeHtml(section.heading)}</h3><div class="mt-4 space-y-4 text-[1.02rem] leading-8 text-foreground/88">${paragraphs}</div>${bullets}</section>`;
  }).join("");

  const sources = guide.sources.map((source) => `<li><a href="${safeOfficialUrl(source.url)}" target="_blank" rel="noreferrer" class="text-sm font-medium leading-5 text-primary underline-offset-4 hover:underline">${escapeHtml(source.name)}</a></li>`).join("");
  const relatedLinks = guide.relatedLinks.map((item) => `<li><a href="${safeInternalHref(item.href)}" class="text-sm font-medium text-primary underline-offset-4 hover:underline">${escapeHtml(item.label)} →</a></li>`).join("");

  return `<section class="border-y border-border bg-background py-16 sm:py-20" aria-labelledby="${escapeHtml(category)}-authority-title"><div class="container-page"><div class="max-w-3xl"><p class="eyebrow text-primary">Texas field guide</p><h2 id="${escapeHtml(category)}-authority-title" class="mt-3 font-display text-4xl leading-tight sm:text-5xl">${escapeHtml(guide.title)}</h2><p class="mt-5 text-lg leading-8 text-muted-foreground">${escapeHtml(guide.dek)}</p></div><div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14"><div class="space-y-10">${sections}</div><aside class="space-y-8 lg:sticky lg:top-24 lg:self-start"><div class="border border-border bg-surface p-6"><h3 class="font-display text-xl">Official sources</h3><p class="mt-2 text-sm leading-6 text-muted-foreground">Use managing agencies for current hours, closures, permits, reservations and safety notices.</p><ul class="mt-4 space-y-3">${sources}</ul></div><div class="border border-border p-6"><h3 class="font-display text-xl">Keep exploring</h3><ul class="mt-4 space-y-3">${relatedLinks}</ul></div></aside></div></div></section>`;
}
