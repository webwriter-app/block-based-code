/**
 * Get all possible paths of an object
 */
type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

/**
 * Get all possible paths to leaves of an object
 */
export type Leaves<T> = T extends object
  ? {
    [K in keyof T]-?: Join<K, Leaves<T[K]>>;
  }[keyof T]
  : "";
