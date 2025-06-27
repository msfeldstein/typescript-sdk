declare module "zod-to-json-schema" {
  import { ZodSchema } from "zod";

  /**
   * Options accepted by zod-to-json-schema. Only a subset is represented here
   * because the SDK only relies on the `strictUnions` flag. Other properties
   * are typed as `unknown` so they don\'t interfere with type-checking.
   */
  export interface ZodToJsonSchemaOptions {
    strictUnions?: boolean;
    // Allow additional options defined by the upstream library.
    [key: string]: unknown;
  }

  /**
   * Converts a Zod schema to an equivalent JSON Schema representation.
   *
   * @param schema  The Zod schema to convert.
   * @param options Optional conversion settings supported by the library.
   * @returns       A JSON Schema object.
   */
  export default function zodToJsonSchema(
    schema: ZodSchema,
    options?: ZodToJsonSchemaOptions,
  ): unknown;
}