declare module "zod" {
  /**
   * This is a lightweight type-only shim for the `zod` library. It exists so
   * that the project can compile in environments where the actual `zod`
   * package (and its bundled type declarations) are not available. The
   * definitions below intentionally expose only the small subset of Zod's API
   * that the SDK relies on. They are _not_ a full re-implementation of Zod –
   * for production use you should install the real library instead.
   */

  // -----------------------------
  // Base types
  // -----------------------------

  /** Untyped placeholder for any Zod schema instance. */
  export interface ZodTypeAny {
    // A Zod schema is a callable that parses input; the exact signature is
    // intentionally kept generic here.
    parse: (input: unknown) => unknown;
    safeParse: (input: unknown) => { success: boolean; data?: unknown };
    safeParseAsync: (input: unknown) => Promise<{ success: boolean; data?: unknown }>;
  }

  /** The internal Zod definition type – left opaque. */
  export interface ZodTypeDef {}

  export interface ZodType<I = unknown, Def = ZodTypeDef, O = unknown> extends ZodTypeAny {}

  // -----------------------------
  // Primitive schema types
  // -----------------------------

  export interface ZodString extends ZodType<string, ZodTypeDef, string> {}

  // -----------------------------
  // Utility schema types
  // -----------------------------

  export type ZodRawShape = Record<string, ZodTypeAny>;

  export interface ZodObject<Shape extends ZodRawShape> extends ZodType<
    unknown,
    ZodTypeDef,
    { [K in keyof Shape]: unknown }
  > {
    shape: Shape;
  }

  export interface ZodOptional<T extends ZodTypeAny> extends ZodType<
    unknown,
    ZodTypeDef,
    unknown
  > {}

  export type AnyZodObject = ZodObject<ZodRawShape>;

  // -----------------------------
  // Zod namespace-style helper
  // -----------------------------

  export const z: {
    string: () => ZodString;
    object: <T extends ZodRawShape>(shape: T) => ZodObject<T>;
    optional: <T extends ZodTypeAny>(schema: T) => ZodOptional<T>;
  };
}