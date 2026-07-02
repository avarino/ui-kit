import { readFile } from "node:fs/promises";
import path from "node:path";
import z from "zod";

const POLICY_PATH = path.join(process.cwd(), "config", "release-policy.json");

const ReleasePolicySchema = z.object({
  requiredChangeset: z.array(z.string().min(1)),
  branches: z.array(z.string()).default([]),
  warningOnly: z.boolean().default(false),
});

export type ReleasePolicy = z.infer<typeof ReleasePolicySchema>;

export async function loadPolicy() {
  const content = await readFile(POLICY_PATH, "utf-8");

  return ReleasePolicySchema.parse(JSON.parse(content));
}

console.log(await loadPolicy());
