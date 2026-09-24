import { createLazyFileRoute } from "@tanstack/react-router";
import { TexasGamingHub } from "@/components/gaming/TexasGamingAuthorityPage";
export const Route = createLazyFileRoute("/gaming")({ component: TexasGamingHub });
