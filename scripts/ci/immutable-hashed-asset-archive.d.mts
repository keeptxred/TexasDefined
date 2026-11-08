// Types for the shared, Worker-safe immutable asset adapter.
// No runtime impact: Workers KV and ASSETS are injected only after
// independent prepublication and separate approved binding activation.
export function immutableAssetPath(path: unknown): path is string;

export interface ExistingStaticAssets {
  fetch(request: Request): Promise<Response>;
}
export interface OriginalImmutableObject {
  value: ArrayBuffer | null;
  metadata: unknown;
}
export interface ImmutableAssetArchiveNamespace {
  getWithMetadata(key: string, type: 'arrayBuffer'): Promise<OriginalImmutableObject>;
}
export function serveHashedAssetWithArchive(
  request: Request,
  assets: ExistingStaticAssets | null | undefined,
  namespace: ImmutableAssetArchiveNamespace | null | undefined,
): Promise<Response | null>;
