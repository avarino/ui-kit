import { isMatch } from "micromatch";

import type { ValidationResult, ValidationInput } from "./types.ts";

const CHANGESET_PATTERN = ".changeset/*.md";

export function validate({
  addedFiles,
  changedFiles,
  policy,
}: ValidationInput): ValidationResult {
  const releaseFiles = changedFiles.filter((file) =>
    isMatch(file, policy.requiredChangeset),
  );

  if (releaseFiles.length === 0) {
    return {
      success: true,
      releaseRequired: false,
      changedFiles,
      releaseFiles: [],
      hasChangeset: false,
      message: "No Release Files changed,",
    };
  }

  const hasChangeset = addedFiles.some((file) =>
    isMatch(file, CHANGESET_PATTERN),
  );

  if (!hasChangeset) {
    return {
      success: false,
      releaseFiles,
      changedFiles,
      hasChangeset: false,
      releaseRequired: true,
      message: "",
    };
  }

  return {
    success: true,

    releaseRequired: true,

    hasChangeset: true,

    changedFiles,

    releaseFiles,

    message: "Changeset found.",
  };
}
