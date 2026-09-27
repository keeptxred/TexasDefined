type FishShape = "bass" | "striped" | "catfish" | "crappie" | "sunfish" | "gar";

function shapeForSpecies(speciesId: string): FishShape {
  if (speciesId.includes("catfish")) return "catfish";
  if (speciesId.includes("crappie")) return "crappie";
  if (speciesId === "sunfish" || speciesId === "bluegill") return "sunfish";
  if (speciesId.includes("gar")) return "gar";
  if (speciesId.includes("striped") || speciesId === "white-bass") return "striped";
  return "bass";
}

export function FishSpeciesVisual({ speciesId, name, className = "" }: { speciesId: string; name: string; className?: string }) {
  const shape = shapeForSpecies(speciesId);
  return (
    <div className={`overflow-hidden border border-border bg-muted/30 ${className}`}>
      <svg
        viewBox="0 0 320 180"
        role="img"
        aria-label={`${name} illustration`}
        className="h-full w-full text-foreground"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="320" height="180" fill="currentColor" opacity="0.025" />
        {shape === "catfish" ? <Catfish /> : shape === "crappie" ? <Crappie /> : shape === "sunfish" ? <Sunfish /> : shape === "gar" ? <Gar /> : <Bass striped={shape === "striped"} />}
      </svg>
    </div>
  );
}

function Bass({ striped = false }: { striped?: boolean }) {
  return <>
    <path d="M52 92c24-35 63-53 112-50 41 3 73 18 93 43l29-22-8 31 8 31-29-22c-21 25-54 40-95 42-46 2-84-13-110-43l-20 10 7-20-7-20 20 10Z" fill="currentColor" opacity="0.14" />
    <path d="M56 90c28-32 65-45 108-42 41 3 71 18 90 41-19 24-50 38-92 40-44 2-80-11-106-39Z" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M254 89l30-20-7 21 7 21-30-21" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M88 70c24-16 53-21 86-17M88 110c23 14 51 18 83 14" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.55" />
    <path d="M140 51l16-18 14 20M132 126l18 19 13-20" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.65" />
    <circle cx="82" cy="82" r="4.5" fill="currentColor" />
    <path d="M56 94c13 4 25 4 38-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    {striped ? <>
      <path d="M110 65c42 8 83 8 122 0M104 78c49 7 94 7 134 0M103 91c52 6 98 6 137 0M106 104c48 5 90 4 129-1" fill="none" stroke="currentColor" strokeWidth="2.3" opacity="0.48" />
    </> : <path d="M122 96c36 7 69 7 101 0" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.5" />}
  </>;
}

function Catfish() {
  return <>
    <path d="M56 92c20-29 58-43 111-40 42 2 74 14 96 36l27-17-8 21 8 21-28-17c-22 22-55 34-99 36-50 2-86-10-107-40Z" fill="currentColor" opacity="0.14" />
    <path d="M58 91c24-26 59-37 107-34 43 2 75 14 96 35-21 21-54 33-98 34-48 2-83-10-105-35Z" fill="none" stroke="currentColor" strokeWidth="3.2" />
    <path d="M261 92l29-20-8 20 8 20-29-20" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
    <circle cx="82" cy="82" r="4.2" fill="currentColor" />
    <path d="M56 95c14 5 28 5 40 0M74 97c-24 5-39 13-48 24M77 100c-16 11-25 23-27 35M74 91c-24-2-41-7-52-16M78 88c-17-10-29-20-35-31" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity="0.72" />
    <path d="M142 56l16-18 15 19M132 125l18 18 14-18" fill="none" stroke="currentColor" strokeWidth="2.1" opacity="0.62" />
  </>;
}

function Crappie() {
  return <>
    <path d="M70 89c13-33 43-51 88-53 39-2 70 13 91 44l34-19-10 28 10 28-34-18c-22 31-53 46-92 44-45-2-75-20-87-54Z" fill="currentColor" opacity="0.14" />
    <path d="M72 89c14-31 43-46 85-48 39-1 68 13 88 42-20 29-49 44-88 43-42-1-71-16-85-47Z" fill="none" stroke="currentColor" strokeWidth="3.1" />
    <path d="M246 84l37-21-10 26 10 25-37-18" fill="none" stroke="currentColor" strokeWidth="3.1" strokeLinejoin="round" />
    <circle cx="92" cy="76" r="4.2" fill="currentColor" />
    <path d="M119 55l20-19 18 18M116 120l19 20 19-18" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.68" />
    <g fill="currentColor" opacity="0.28">
      <circle cx="126" cy="73" r="6" /><circle cx="149" cy="58" r="5" /><circle cx="169" cy="78" r="7" /><circle cx="194" cy="64" r="5" /><circle cx="213" cy="84" r="6" /><circle cx="139" cy="98" r="5" /><circle cx="173" cy="106" r="6" /><circle cx="205" cy="104" r="5" />
    </g>
  </>;
}

function Sunfish() {
  return <>
    <path d="M88 89c8-39 35-61 75-64 39-3 68 16 85 56l32-20-9 28 9 28-32-20c-17 40-46 59-85 56-40-3-67-25-75-64Z" fill="currentColor" opacity="0.14" />
    <path d="M91 89c9-36 34-55 72-58 37-2 64 16 80 54-16 38-43 56-80 54-38-3-63-22-72-50Z" fill="none" stroke="currentColor" strokeWidth="3.1" />
    <path d="M243 84l37-23-9 28 9 28-37-23" fill="none" stroke="currentColor" strokeWidth="3.1" strokeLinejoin="round" />
    <circle cx="111" cy="76" r="4.2" fill="currentColor" />
    <path d="M144 36l15-20 16 20M142 139l17 20 15-21" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.65" />
    <path d="M126 62c19 10 40 15 64 16M124 78c24 10 48 14 73 13M125 96c24 7 47 9 69 6M133 112c19 4 37 4 54 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.36" />
  </>;
}

function Gar() {
  return <>
    <path d="M35 91c31-18 73-26 126-24 45 1 84 8 116 21l20-14-5 17 5 17-20-14c-35 14-76 21-122 20-51-1-91-9-120-23Z" fill="currentColor" opacity="0.13" />
    <path d="M38 91c31-15 72-22 121-20 46 1 84 8 114 20-31 13-71 19-119 18-49-1-88-7-116-18Z" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M273 91l24-16-5 16 5 16-24-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M38 91L12 82l26 3M38 91l-26 9 26-3" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="49" cy="84" r="3.8" fill="currentColor" />
    <path d="M116 72l18-14 15 15M114 108l18 14 15-14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.58" />
    <path d="M82 86c46-6 95-5 145 2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.32" />
  </>;
}
