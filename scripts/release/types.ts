export interface ReleasePolicy {
  /**
   * Files matching these patterns require a changeset
   */
  requiredChangeset: string[];

  /**
   * Branches where validation runs.
   * Empty = every branches
   */
  branches?: string[];

  /**
   * Warning instead of failing
   */
  warningOnly?: boolean;
}

export interface ValidationInput {
  changedFiles: string[];
  addedFiles: string[];
  policy: ReleasePolicy;
}

export interface ValidationResult {
  success: boolean;
  releaseRequired: boolean;
  hasChangeset: boolean;
  changedFiles: string[];
  releaseFiles: string[];
  message: string;
}
