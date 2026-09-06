import { MetroRelocationAuthority } from "@/components/relocation/MetroRelocationAuthority";
import { WildflowerSpeciesGrid } from "@/components/editorial/WildflowerSpeciesGrid";

const WILDFLOWER_GUIDE_PATH = "/article/texas-wildflowers-guide";

export function ArticleAuthorityEnhancement({ articlePath }: { articlePath: string }) {
  if (articlePath === WILDFLOWER_GUIDE_PATH) return <WildflowerSpeciesGrid />;
  return <MetroRelocationAuthority articlePath={articlePath} />;
}
