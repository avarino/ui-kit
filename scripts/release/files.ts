const CHANGED_FILES = "ALL_CHANGED_FILES";
const ADDED_FILES = "ADDED_FILES";

function parse(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean);
}

function env(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing enviroment variable: ${name}`);
  }

  return value;
}

export function getChangedFiles() {
  return parse(env(CHANGED_FILES));
}

export function getAddedFiles() {
  return parse(process.env[ADDED_FILES] ?? "");
}
