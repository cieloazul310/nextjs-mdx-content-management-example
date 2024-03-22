import { readFile } from "fs/promises";
import { z, type ZodObject } from "zod";
import { schemaVaridator, dataFormatter } from "./utils";

export function defineDataFromFile<T extends Record<string, any>>({
  filePath,
  schema,
  format = "yaml",
}: {
  filePath: string;
  schema: ZodObject<T>;
  format?: "yaml" | "json";
}) {
  const { parser } = dataFormatter(format);
  const dataSchema = z.object({ id: z.string() }).merge(schema);
  const varidator = schemaVaridator(dataSchema);

  async function getAll() {
    const file = await readFile(filePath, "utf8");
    const raw = parser(file);
    if (!Array.isArray(raw)) throw new Error("Data must be array");
    const data = raw.filter(varidator);
    return data;
  }

  async function get(key: keyof z.infer<typeof dataSchema>, value: unknown) {
    const data = await getAll();
    return data.find((datum) => datum?.[key] === value);
  }

  return {
    schema: dataSchema,
    get,
    getAll,
  };
}
