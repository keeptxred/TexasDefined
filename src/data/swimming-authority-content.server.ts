// Bundle the researched public guide in the production SSR worker so a self-HTTP
// fetch (DNS, bot challenges, temporary network outages) cannot silently turn
// an authoritative indexable guide into a thin noindex shell.
// CI enforces byte-for-byte parity with the independently addressable public file.
import swimmingHtml from "./swimming-holes-river-tubing.html?raw";

export const swimmingAuthorityHtml = swimmingHtml;
