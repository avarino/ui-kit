import path from "node:path";
import process from "node:process";
import micromatch from "micromatch";
import { readFile } from "node:fs/promises";
const ROOT = process.cwd();

const POLICY_PATH = path.join(ROOT, "config", "release-policy.json");
const ENV_CHANGED = "ALL_CHANGED_FILES";

const ENV_ADDED = "ADDED_FILES";

const CHANGESET_PATTERN = ".changeset/*.md";

/** @returns {Promise<ReleasePolicy>} */
async function loadPolicy() {
  try {
    const content = await readFile(POLICY_PATH, "utf8");

    const policy = JSON.parse(content);

    if (
      !Array.isArray(policy.release) ||
      !policy.release.every((item) => typeof item === "string")
    ) {
      throw new Error("release must be an array of strings.");
    }

    if (
      !Array.isArray(policy.ignore) ||
      !policy.ignore.every((item) => typeof item === "string")
    ) {
      throw new Error("ignore must be an array of strings.");
    }

    return policy;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Release policy not found.\nExpected: ${POLICY_PATH}`);
    }

    throw new Error(`Invalid release-policy.json\n\n${error.message}`);
  }
}

/**
 * Returns all files that require a release.
 */
function requiresRelease(files, policy) {
  return files.filter((file) => {
    if (micromatch.isMatch(file, policy.ignore)) {
      return false;
    }

    return micromatch.isMatch(file, policy.release);
  });
}

/**
 * Returns true if THIS PR adds a new Changeset.
 */
function hasChangeset(files) {
  return files.some((file) => micromatch.isMatch(file, CHANGESET_PATTERN));
}

/**
 * Success logger
 */
function success(message) {
  console.log(`::notice::${message}`);
}

/**
 * Error logger
 */
function fail(message) {
  console.log(`::error::${message}`);
  process.exit(1);
}

function parseFiles(value) {
  return value
    .split(/\s+/)
    .map((file) => file.trim())
    .filter(Boolean);
}

function getEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

async function main() {
  try {
    const policy = await loadPolicy();

    const changedFiles = parseFiles(getEnv(ENV_CHANGED));
    const addedFiles = parseFiles(process.env[ENV_ADDED] ?? "");

    console.log("::group::Changeset Validation");

    console.log("Changed files:");

    changedFiles.forEach((file) => {
      console.log(`• ${file}`);
    });

    const releaseFiles = requiresRelease(changedFiles, policy);

    if (releaseFiles.length === 0) {
      success("No release files changed. Changeset is not required.");
      console.log("::endgroup::");
      return;
    }

    console.log("");
    console.log("Release-triggering files:");

    releaseFiles.forEach((file) => {
      console.log(`• ${file}`);
    });

    if (!hasChangeset(addedFiles)) {
      console.log("::endgroup::");

      fail(`
This Pull Request modifies files that require a release but no new Changeset was found.

Release-triggering files:

${releaseFiles.map((file) => `  • ${file}`).join("\n")}

Please run:

    npx changeset

Commit the generated file and push again.
`);
    }

    success("Changeset found. Validation passed.");

    console.log("::endgroup::");
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}

main();
