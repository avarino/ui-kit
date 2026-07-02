import { describe, expect, it } from "vitest";

import { validate } from "./validator";

const policy = {
  requiredChangeset: ["src/**"],
};

describe("validate()", () => {
  it("passes when no release files changed", () => {
    const result = validate({
      changedFiles: ["README.md", ".github/workflows/ci.yml"],
      addedFiles: [],
      policy,
    });

    expect(result.success).toBe(true);

    expect(result.releaseRequired).toBe(false);

    expect(result.hasChangeset).toBe(false);
  });

  it("fails when release files changed without changeset", () => {
    const result = validate({
      changedFiles: ["src/Button.tsx"],
      addedFiles: [],
      policy,
    });

    expect(result.success).toBe(false);

    expect(result.releaseRequired).toBe(true);

    expect(result.hasChangeset).toBe(false);
    expect(result.releaseFiles).toEqual(["src/Button.tsx"]);
  });

  it("passes when release files changed with changeset", () => {
    const result = validate({
      changedFiles: ["src/Button.tsx"],
      addedFiles: [".changeset/button.md"],
      policy,
    });

    expect(result.success).toBe(true);

    expect(result.releaseRequired).toBe(true);

    expect(result.hasChangeset).toBe(true);
  });

  it("passes for README changes", () => {
    const result = validate({
      changedFiles: ["README.md"],
      addedFiles: [],
      policy,
    });

    expect(result.success).toBe(true);
  });

  it("passes with multiple release files and changeset", () => {
    const result = validate({
      changedFiles: ["src/Button.tsx", "src/Input.tsx", "README.md"],
      addedFiles: [".changeset/ui-kit.md"],
      policy,
    });

    expect(result.success).toBe(true);

    expect(result.releaseFiles).toEqual(["src/Button.tsx", "src/Input.tsx"]);
  });

  it("passes when no files changed", () => {
    const result = validate({
      changedFiles: [],
      addedFiles: [],
      policy,
    });

    expect(result.success).toBe(true);

    expect(result.releaseRequired).toBe(false);
  });

  it("fails when release files changed and addedFiles is empty", () => {
    const result = validate({
      changedFiles: ["src/Button.tsx"],
      addedFiles: [],
      policy,
    });

    expect(result.success).toBe(false);
    expect(result.hasChangeset).toBe(false);
  });
});
