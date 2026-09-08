import fs from "node:fs";

const component = fs.readFileSync("src/components/commerce/DiscountSchoolSupplyAffiliate.tsx", "utf8");
const articleBody = fs.readFileSync("src/components/editorial/ArticleBody.tsx", "utf8");

for (const required of [
  "https://www.anrdoezrs.net/click-101876465-17106455",
  "https://www.lduhtrp.net/image-101876465-17106455",
  'rel="sponsored noopener noreferrer"',
  "Affiliate disclosure: TexasDefined may earn a commission",
  "texas-school-districts-explained",
  "texas-schools-family-life",
]) {
  if (!component.includes(required)) throw new Error(`Discount School Supply validation failed: missing ${required}`);
}

for (const required of [
  "DISCOUNT_SCHOOL_SUPPLY_ARTICLE_SLUGS",
  "showDiscountSchoolSupplyAffiliate",
  "<DiscountSchoolSupplyAffiliate />",
]) {
  if (!articleBody.includes(required)) throw new Error(`Discount School Supply placement validation failed: missing ${required}`);
}

console.log("Discount School Supply affiliate validation passed.");
