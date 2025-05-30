import { showHUD, Clipboard, getSelectedText } from "@raycast/api";
import { writeContentToFile, maybeOpenFinder } from "./api/supporting";

export default async function main() {
  try {
    const selectedText = await getSelectedText();
    if (!selectedText || selectedText.trim() === "") {
      await showHUD("No text found in selection");
      return;
    }

    const filePath = writeContentToFile(selectedText);

    const fileContent: Clipboard.Content = { file: filePath };
    await Clipboard.copy(fileContent);
    await showHUD("Copied file to clipboard");

    await maybeOpenFinder(filePath);
  } catch (error) {
    console.log("Error copying text as file:", error);
    await showHUD("Error");
  }
}
