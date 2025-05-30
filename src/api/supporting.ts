import { writeFileSync } from "fs";
import path from "path";
import os from "os";
import { getPreferenceValues, showInFinder } from "@raycast/api";

export function writeContentToFile(content: string): string {
  const fileName = getPreferenceValues<ExtensionPreferences>().fileName;
  var directory = getPreferenceValues<ExtensionPreferences>().fileDirectory;

  if (!directory || directory.trim() === "" || directory === "/") {
    directory = os.tmpdir();
  }

  const filePath = path.join(directory, fileName);

  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

export async function maybeOpenFinder(filePath: string): Promise<void> {
  if (getPreferenceValues<ExtensionPreferences>().openInFinder) {
    await showInFinder(filePath);
  }
}
