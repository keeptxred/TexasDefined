// Three-page, two-origin production proof for the licensed real-place photography.
// This runs on the existing GitHub-owned monthly and quarterly outdoor review.
// Do not mark sources reviewed merely because HTTP requests succeed.
import { createHash } from "node:crypto";
import fs from "node:fs";

const origins = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const photos = [
  {
    path: "/texas-horseback-riding-guide",
    creator: "Preston Keres",
    name: "20231023-FS_PJK_0003_(53298857455).jpg",
    fileUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/20231023-FS_PJK_0003_%2853298857455%29.jpg/1280px-20231023-FS_PJK_0003_%2853298857455%29.jpg",
    source: "https://commons.wikimedia.org/wiki/File:20231023-FS_PJK_0003_(53298857455).jpg",
    licenseLabel: "U.S. public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  {
    path: "/texas-paddling-guide",
    creator: "Oleg Yunakov",
    name: "Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg",
    fileUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg/1280px-Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg",
  },
  {
    path: "/texas-stargazing-guide",
    creator: "Matthew T Rader",
    name: "Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg",
    fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg/1280px-Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg",
  },
];

const additionalPhotos = [
  {
    "path": "/texas-mountain-biking-guide",
    "creator": "Larry D. Moore",
    "name": "Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg",
    "fileUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg/960px-Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Headwater_Boardwalks_Huntsville_State_Park_Texas_2025.jpg",
    "licenseLabel": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "path": "/texas-horseback-riding-guide",
    "creator": "Fredlyfish4",
    "name": "Dinosaur_Valley_State_Park_Trail.JPG",
    "fileUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dinosaur_Valley_State_Park_Trail.JPG/960px-Dinosaur_Valley_State_Park_Trail.JPG",
    "source": "https://commons.wikimedia.org/wiki/File:Dinosaur_Valley_State_Park_Trail.JPG",
    "licenseLabel": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "path": "/texas-paddling-guide",
    "creator": "Larry D. Moore",
    "name": "Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg",
    "fileUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg/1280px-Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Canoeing_Caddo_Lake_State_Park_Texas_2023.jpg",
    "licenseLabel": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "path": "/texas-stargazing-guide",
    "creator": "Larry D. Moore",
    "name": "Holmes_Creek_Caprock_Canyon_State_Park_Texas_2023.jpg",
    "fileUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Holmes_Creek_Caprock_Canyon_State_Park_Texas_2023.jpg/960px-Holmes_Creek_Caprock_Canyon_State_Park_Texas_2023.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Holmes_Creek_Caprock_Canyon_State_Park_Texas_2023.jpg",
    "licenseLabel": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  }
];
photos.push(...additionalPhotos);

const evidence = [];
const errors = [];
async function get(url, accept) {
  const res = await fetch(url, {
    headers: { accept, "user-agent": "TexasDefined-Outdoor-Authority-Photo-Acceptance/1.0" },
    redirect: "follow",
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok || res.headers.get("cf-mitigated") === "challenge") {
    throw Error("HTTP " + res.status + " or edge challenge on " + url);
  }
  return res;
}
for (const photo of photos) {
  const imagePath = "/media/remote?url=" + encodeURIComponent(photo.fileUrl);
  const digests = [];
  for (const origin of origins) {
    const target = new URL(photo.path, origin);
    // Prevent a successful uncached probe from masking stale visitor HTML.
    for (const suffix of ["", "?outdoor_photo_probe=" + encodeURIComponent(process.env.GITHUB_RUN_ID || "manual")]) {
      const html = await (await get(target.href + suffix, "text/html")).text();
      const visible = html.replace(/&amp;/g, "&");
      if (!visible.includes(imagePath) || !visible.includes(photo.creator) ||
          !visible.includes(photo.source) || !visible.includes(photo.licenseLabel || "CC BY-SA 4.0") ||
          !visible.includes(photo.licenseUrl || "https://creativecommons.org/licenses/by-sa/4.0/") ||
          (!additionalPhotos.includes(photo) && (!visible.includes("application/ld+json") ||
          !visible.includes("ImageObject") ||
          !visible.includes("copyrightNotice") ||
          !visible.includes("acquireLicensePage")))) {
        errors.push(photo.path + " [" + origin + suffix + "]: visible licensed photo or ImageObject provenance absent");
      }
      if (!html.includes('https://texasdefined.com' + photo.path) ||
          /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html)) {
        errors.push(photo.path + " [" + origin + suffix + "]: missing canonical or accidental noindex");
      }
    }
    const file = await get(origin + imagePath, "image/jpeg");
    const bytes = Buffer.from(await file.arrayBuffer());
    const type = file.headers.get("content-type") || "";
    if (!/image\/jpeg/i.test(type) || bytes.length < 10000 ||
        bytes[0] !== 0xff || bytes[1] !== 0xd8) {
      errors.push(photo.path + " [" + origin + "]: image not a complete JPEG; content-type=" + type + ", bytes=" + bytes.length);
    }
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    evidence.push({ page: photo.path, origin, image: imagePath, sha256, bytes: bytes.length, type });
    digests.push(sha256);
  }
  if (digests.length !== 2 || digests[0] !== digests[1]) {
    errors.push(photo.path + ": direct Worker and canonical domain did not deliver byte-identical approved photo");
  }
}
// Federal agency photo of an actual featured OHV site is delivered by NPS, not
// the Wikimedia-only first-party image broker above. Verify SEO provenance and
// live image references without rewriting its licensing context.
const ohvPhoto = "https://www.nps.gov/lamr/planyourvisit/images/Rosita-16-wp.jpg?autorotate=false&maxwidth=1300";
for (const origin of origins) {
  for (const suffix of ["", "?outdoor_photo_probe=" + encodeURIComponent(process.env.GITHUB_RUN_ID || "manual")]) {
    try {
      const html = await (await get(origin + "/texas-ohv-guide" + suffix, "text/html")).text();
      const visible = html.replace(/&amp;/g, "&");
      for (const marker of [
        ohvPhoto,
        "Rosita Flats",
        "National Park Service photo",
        "ImageObject",
        "publicdomain/mark/1.0/",
      ]) {
        if (!visible.includes(marker)) errors.push("OHV NPS photo marker missing [" + origin + suffix + "]: " + marker);
      }
      if (!html.includes('https://texasdefined.com/texas-ohv-guide') ||
          /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html)) {
        errors.push("OHV NPS hero canonical or indexability regression [" + origin + suffix + "]");
      }
    } catch (error) {
      errors.push("OHV NPS photo HTML unavailable [" + origin + suffix + "]: " + String(error.message));
    }
  }
}
try {
  const file = await get(ohvPhoto, "image/jpeg");
  const bytes = Buffer.from(await file.arrayBuffer());
  const type = file.headers.get("content-type") || "";
  if (!/image\/jpeg/i.test(type) || bytes.length < 10000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw Error("NPS Rosita Flats asset is not a valid JPEG");
  }
  evidence.push({ page: "/texas-ohv-guide", origin: "NPS direct", image: ohvPhoto, sha256: createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length, type });
} catch (error) {
  errors.push("NPS OHV hero bytes unavailable: " + error.message);
}
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/outdoor-image-live-authority.json", JSON.stringify({
  checkedAt: new Date().toISOString(), runId: process.env.GITHUB_RUN_ID || null,
  evidence, errors,
}, null, 2) + "\n");
console.log(JSON.stringify({ imagesChecked: photos.length, origins: origins.length, evidence, errors }));
if (errors.length) process.exitCode = 1;
