import { showHUD, Clipboard } from "@raycast/api";
import { writeContentToFile } from "./api/supporting";

export default async function main() {
  const selectedText = await Clipboard.readText();
  if (!selectedText) {
    await showHUD("No text found in Clipboard");
    return;
  }

  const filePath = writeContentToFile(selectedText);

  try {
    const fileContent: Clipboard.Content = { file: filePath };
    await Clipboard.paste(fileContent);
    await showHUD("Pasted file to clipboard");
  } catch (error) {
    await showHUD("Error");
  }
}
