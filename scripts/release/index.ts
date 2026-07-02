import { getAddedFiles, getChangedFiles } from "./files.ts";

import { summary } from "./github.ts";

import { group, endGroup, notice, error } from "./github.ts";

import { loadPolicy } from "./policy.ts";

import { validate } from "./validator.ts";

async function main() {
  group("Changeset Validation");

  const policy = await loadPolicy();

  const changedFiles = getChangedFiles();

  const addedFiles = getAddedFiles();

  const result = validate({
    changedFiles,
    addedFiles,
    policy,
  });

  if (result.success) {
    notice(result.message);

    await summary(`
# Changeset Validation

✅ ${result.message}
`);

    endGroup();

    return;
  }

  error(result.message);

  await summary(`
# Changeset Validation

❌ ${result.message}

## Files requiring release

${result.releaseFiles.map((file) => `- ${file}`).join("\n")}
`);

  endGroup();

  process.exit(1);
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});
