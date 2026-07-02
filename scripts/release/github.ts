import { appendFile } from "fs/promises";

export function group(title: string) {
  console.log(`::group::${title}`);
}

export function endGroup() {
  console.log("::endgroup::");
}

export function notice(message: string) {
  console.log(`::notice::${message}`);
}

export function warning(message: string) {
  console.log(`::warning::${message}`);
}

export function error(message: string) {
  console.log(`::error::${message}`);
}

export async function summary(text: string) {
  const file = process.env.GITHUB_STEP_SUMMARY;

  if (!file) {
    return;
  }

  await appendFile(file, text + "\n");
}
