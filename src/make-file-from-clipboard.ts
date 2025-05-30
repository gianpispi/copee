import { showHUD, Clipboard } from "@raycast/api";
import { writeContentToFile, maybeOpenFinder } from "./api/supporting";

export default async function main() {
  const selectedText = await Clipboard.readText();
  if (!selectedText) {
    await showHUD("No text found in Clipboard");
    return;
  }

  const filePath = writeContentToFile(selectedText);

  try {
    const fileContent: Clipboard.Content = { file: filePath };
    await Clipboard.copy(fileContent);
    await showHUD("Copied file to clipboard");

    await maybeOpenFinder(filePath);
  } catch (error) {
    await showHUD("Error");
  }
}
