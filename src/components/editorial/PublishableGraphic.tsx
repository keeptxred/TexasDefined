import { useState } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";
const CREDIT = "TexasDefined.com";
const CREDIT_LINE = "Publish this graphic — free for editorial use. Credit: TexasDefined.com.";
const STYLE_PROPERTIES = [
  "color",
  "fill",
  "fill-opacity",
  "stroke",
  "stroke-opacity",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "opacity",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "letter-spacing",
  "text-anchor",
] as const;

type PublishableGraphicProps = {
  targetId: string;
  filename: string;
  title: string;
  methodologyHref?: string;
  sourceNote?: string;
  compact?: boolean;
};

function prepareStandaloneSvg(targetId: string, title: string) {
  const source = document.getElementById(targetId);
  if (!(source instanceof SVGSVGElement)) return null;

  const clone = source.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);
  clone.setAttribute("role", "img");

  const viewBox = source.viewBox.baseVal;
  if (viewBox.width > 0 && viewBox.height > 0) {
    clone.setAttribute("width", String(Math.round(viewBox.width)));
    clone.setAttribute("height", String(Math.round(viewBox.height)));
  }

  const sourceElements = [source, ...Array.from(source.querySelectorAll("*"))];
  const cloneElements = [clone, ...Array.from(clone.querySelectorAll("*"))];

  sourceElements.forEach((element, index) => {
    const copy = cloneElements[index];
    if (!(copy instanceof SVGElement)) return;
    const computed = getComputedStyle(element);
    const inline = STYLE_PROPERTIES.map((property) => {
      const value = computed.getPropertyValue(property).trim();
      return value ? `${property}:${value}` : "";
    }).filter(Boolean).join(";");
    if (inline) copy.setAttribute("style", inline);
    copy.removeAttribute("class");
    copy.removeAttribute("tabindex");
    if (copy.getAttribute("role") === "button") copy.removeAttribute("role");
    copy.removeAttribute("aria-label");
  });

  const metadata = document.createElementNS(SVG_NS, "metadata");
  metadata.textContent = `${title}. Original graphic by TexasDefined.com. Free for editorial use with visible credit: ${CREDIT}. A backlink is appreciated but not required.`;
  clone.insertBefore(metadata, clone.firstChild);

  return clone;
}

function serializeSvg(targetId: string, title: string) {
  const clone = prepareStandaloneSvg(targetId, title);
  if (!clone) return null;
  return new XMLSerializer().serializeToString(clone);
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function PublishableGraphic({
  targetId,
  filename,
  title,
  methodologyHref,
  sourceNote,
  compact = false,
}: PublishableGraphicProps) {
  const [copied, setCopied] = useState(false);

  const downloadSvg = () => {
    const serialized = serializeSvg(targetId, title);
    if (!serialized) return;
    saveBlob(new Blob([serialized], { type: "image/svg+xml;charset=utf-8" }), `${filename}.svg`);
  };

  const downloadPng = () => {
    const serialized = serializeSvg(targetId, title);
    const source = document.getElementById(targetId);
    if (!serialized || !(source instanceof SVGSVGElement)) return;

    const viewBox = source.viewBox.baseVal;
    const baseWidth = viewBox.width || source.clientWidth || 1_200;
    const baseHeight = viewBox.height || source.clientHeight || 800;
    const scale = Math.max(1, Math.min(3, 2_400 / baseWidth));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(baseWidth * scale);
    canvas.height = Math.round(baseHeight * scale);
    const context = canvas.getContext("2d");
    if (!context) return;

    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((png) => {
        if (png) saveBlob(png, `${filename}.png`);
      }, "image/png");
    };
    image.onerror = () => URL.revokeObjectURL(url);
    image.src = url;
  };

  const copyCredit = async () => {
    try {
      await navigator.clipboard.writeText(CREDIT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className={`${compact ? "mt-4" : "mt-5"} border border-border bg-background p-4 sm:p-5`} aria-label={`Reuse ${title}`}>
      <p className="text-sm font-semibold leading-6 text-foreground">{CREDIT_LINE}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">A backlink to the source page is appreciated, but never required. Please preserve labels and context when resizing or cropping.</p>
      {sourceNote ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{sourceNote}</p> : null}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-semibold uppercase" style={{ letterSpacing: "0.08em" }}>
        <button type="button" onClick={downloadPng} className="border-b border-primary pb-1 text-primary">Download PNG</button>
        <button type="button" onClick={downloadSvg} className="border-b border-primary pb-1 text-primary">Download SVG</button>
        <button type="button" onClick={copyCredit} className="border-b border-border pb-1 text-foreground">{copied ? "Credit copied" : "Copy credit"}</button>
        {methodologyHref ? <a href={methodologyHref} className="border-b border-border pb-1 text-foreground">Source methodology</a> : null}
      </div>
    </aside>
  );
}
