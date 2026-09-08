const base = process.env.TEXASDEFINED_BASE_URL || "https://texasdefined.com";
const paths = [
  "/article/texas-school-districts-explained",
  "/article/texas-schools-family-life",
];

const required = [
  "Shop Discount School Supply",
  "Affiliate disclosure: TexasDefined may earn a commission",
  "101876465-17106455",
];

for (const path of paths) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!response.ok) throw new Error(`Discount School Supply production verification failed for ${path}: HTTP ${response.status}`);
  const html = await response.text();
  for (const token of required) {
    if (!html.includes(token)) throw new Error(`Discount School Supply production verification failed for ${path}: missing ${token}`);
  }
}

console.log("Discount School Supply production verification passed.");
