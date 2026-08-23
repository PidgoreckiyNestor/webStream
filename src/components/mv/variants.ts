export const VARIANT_IDS = ["v1", "v2", "v3", "v4"] as const;
export type VariantId = (typeof VARIANT_IDS)[number];
