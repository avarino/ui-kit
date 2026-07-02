import { getAddedFiles, getChangedFiles } from "./files";

import { summary } from "./github";

import { group, endGroup, notice, error } from "./github";

import { loadPolicy } from "./policy";

import { validate } from "./validator";

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
